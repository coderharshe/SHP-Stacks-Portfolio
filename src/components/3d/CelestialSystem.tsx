'use client';

import React, { useMemo, useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useCameraMotion } from '@/context/CameraMotionContext';

// Custom shaders for high-performance star rendering and independent twinkling
const StarShader = {
  uniforms: {
    uTime: { value: 0 },
    uOpacity: { value: 1 },
  },
  vertexShader: `
    uniform float uTime;
    attribute float aSize;
    attribute float aPhase;
    attribute vec3 aColor;
    varying vec3 vColor;
    varying float vAlpha;
    void main() {
      vColor = aColor;
      // Twinkle calculation based on time and individual star phase offset
      float twinkle = 0.45 + 0.55 * sin(uTime * 2.5 + aPhase * 6.28);
      vAlpha = twinkle;
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = aSize * (260.0 / -mvPosition.z) * twinkle;
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    varying vec3 vColor;
    varying float vAlpha;
    uniform float uOpacity;
    void main() {
      // Circle billboard formatting
      float dist = length(gl_PointCoord - vec2(0.5));
      if (dist > 0.5) discard;
      float alpha = (1.0 - smoothstep(0.25, 0.5, dist)) * vAlpha * uOpacity;
      gl_FragColor = vec4(vColor, alpha);
    }
  `
};

// Custom shader for soft Milky Way gaseous background
const NebulaShader = {
  uniforms: {
    uOpacity: { value: 0 },
  },
  vertexShader: `
    attribute float aSize;
    attribute vec3 aColor;
    varying vec3 vColor;
    void main() {
      vColor = aColor;
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = aSize * (350.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    varying vec3 vColor;
    uniform float uOpacity;
    void main() {
      float dist = length(gl_PointCoord - vec2(0.5));
      if (dist > 0.5) discard;
      float glow = 1.0 - smoothstep(0.0, 0.5, dist);
      gl_FragColor = vec4(vColor, glow * uOpacity * 0.14);
    }
  `
};

// Custom shader for dynamic moon phase rendering
const MoonShader = {
  uniforms: {
    uPhase: { value: 0 },
    uColor: { value: new THREE.Color('#bae6fd') },
  },
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vViewPosition = -mvPosition.xyz;
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    uniform float uPhase;
    uniform vec3 uColor;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    void main() {
      float angle = uPhase * 2.0 * 3.14159265;
      vec3 lightDir = normalize(vec3(sin(angle), 0.0, cos(angle)));
      float diff = dot(vNormal, lightDir);
      float illuminance = smoothstep(-0.06, 0.06, diff);
      float crater = sin(vUv.x * 25.0 + sin(vUv.y * 12.0)) * cos(vUv.y * 25.0) * 0.12
                   + sin(vUv.x * 55.0) * cos(vUv.y * 55.0) * 0.04;
      vec3 surface = uColor * (1.0 + crater);
      vec3 ashLight = vec3(0.04, 0.08, 0.16) * 0.35;
      vec3 color = mix(ashLight, surface, illuminance);
      float alpha = mix(0.2, 0.96, illuminance);
      gl_FragColor = vec4(color, alpha);
    }
  `
};

// Custom shader for volumetric cloud scattering (silver lining backlights)
const CloudShader = {
  uniforms: {
    uOpacity: { value: 0 },
    uMoonPosition: { value: new THREE.Vector3() },
    uCameraPosition: { value: new THREE.Vector3() },
  },
  vertexShader: `
    varying vec3 vWorldPosition;
    varying vec3 vNormal;
    varying vec2 vUv;
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vec4 worldPosition = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPosition.xyz;
      gl_Position = projectionMatrix * viewMatrix * worldPosition;
    }
  `,
  fragmentShader: `
    uniform float uOpacity;
    uniform vec3 uMoonPosition;
    uniform vec3 uCameraPosition;
    varying vec3 vWorldPosition;
    varying vec3 vNormal;
    varying vec2 vUv;
    void main() {
      vec3 toMoon = normalize(uMoonPosition - vWorldPosition);
      float diffuse = max(dot(vNormal, toMoon), 0.0);
      vec3 viewDir = normalize(uCameraPosition - vWorldPosition);
      float scattering = pow(max(dot(viewDir, toMoon), 0.0), 12.0);
      float edgeAlpha = 1.0 - pow(max(dot(vNormal, viewDir), 0.0), 2.0);
      vec3 baseColor = vec3(0.03, 0.06, 0.12);
      vec3 silverLining = vec3(0.75, 0.91, 1.0);
      vec3 color = mix(baseColor, silverLining, diffuse * 0.25 + scattering * 0.85);
      float alpha = uOpacity * (0.35 + 0.65 * edgeAlpha + scattering * 0.45);
      gl_FragColor = vec4(color, alpha);
    }
  `
};

// Custom radial light shafts radiating outward from the moon
const LightShaftsShader = {
  uniforms: {
    uTime: { value: 0 },
    uOpacity: { value: 0 },
    uColor: { value: new THREE.Color('#bae6fd') },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform float uOpacity;
    uniform vec3 uColor;
    varying vec2 vUv;
    float hash(float n) { return fract(sin(n) * 43758.5453); }
    float noise(float x) {
      float i = floor(x);
      float f = fract(x);
      float u = f * f * (3.0 - 2.0 * f);
      return mix(hash(i), hash(i + 1.0), u);
    }
    void main() {
      vec2 rel = vUv - vec2(0.5);
      float dist = length(rel);
      float angle = atan(rel.y, rel.x);
      float ray1 = noise(angle * 7.0 + uTime * 0.25);
      float ray2 = noise(angle * 15.0 - uTime * 0.45) * 0.5;
      float ray3 = noise(angle * 30.0 + uTime * 0.75) * 0.25;
      float rays = (ray1 + ray2 + ray3) / 1.75;
      float falloff = smoothstep(0.5, 0.04, dist);
      float centerMask = smoothstep(0.08, 0.24, dist);
      float alpha = rays * falloff * centerMask * uOpacity;
      gl_FragColor = vec4(uColor, alpha * 0.45);
    }
  `
};

export function CelestialSystem() {
  const { stateRef, isReducedMotion } = useCameraMotion();
  const { camera } = useThree();

  const starMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const nebulaMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const moonRef = useRef<THREE.Mesh>(null);
  const moonMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const moonGlowRef = useRef<THREE.Sprite>(null);
  const cloudGroupRef = useRef<THREE.Group>(null);
  const lightShaftsRef = useRef<THREE.Mesh>(null);
  const lightShaftsMaterialRef = useRef<THREE.ShaderMaterial>(null);

  // Volumetric Star Field geometry attributes (Z-layers: Near, Medium, Far)
  const starGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const count = 1200;

    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const phases = new Float32Array(count);

    // Stateless deterministic pseudo-random generator
    const random = (idx: number) => {
      const s = idx * 15485863;
      const r = (s * s * s) % 233280;
      return Math.abs(r) / 233280;
    };

    // Color temperatures mapping
    const colorTemps = [
      new THREE.Color('#e0f2fe'), // Blue-white (Hot star)
      new THREE.Color('#fef08a'), // Warm white (Medium)
      new THREE.Color('#fef3c7'), // Soft yellow (Cool)
      new THREE.Color('#ffffff'), // Pure white
    ];

    for (let i = 0; i < count; i++) {
      const idx = i * 6;
      
      // Multi-layer positioning (Distribute volumetric depth between Z = -550 and Z = 0)
      const x = (random(idx) - 0.5) * 450;
      const y = 30 + random(idx + 1) * 160;
      const z = -random(idx + 2) * 550;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Assign random color temperature
      const tempColor = colorTemps[Math.floor(random(idx + 3) * colorTemps.length)];
      colors[i * 3] = tempColor.r;
      colors[i * 3 + 1] = tempColor.g;
      colors[i * 3 + 2] = tempColor.b;

      // Size variations
      sizes[i] = 1.0 + random(idx + 4) * 2.2;
      
      // Twinkle phase offset
      phases[i] = random(idx + 5);
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
    geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1));

    return geo;
  }, []);

  // Milky Way Nebula particle geometry
  const nebulaGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const count = 300;

    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const random = (idx: number) => {
      const s = idx * 15485863;
      const r = (s * s * s) % 233280;
      return Math.abs(r) / 233280;
    };

    const coreColor = new THREE.Color('#a855f7'); // Purple nebula core
    const outerColor = new THREE.Color('#2563eb'); // Deep blue wings

    for (let i = 0; i < count; i++) {
      const idx = i * 4;
      
      // Spiral band clustering
      const t = random(idx);
      const angle = t * Math.PI * 0.6 - 0.3;
      const dist = (random(idx + 1) - 0.5) * 60;
      
      const x = -80 + Math.cos(angle) * 160 + dist;
      const y = 80 + Math.sin(angle) * 120 + (random(idx + 2) - 0.5) * 30;
      const z = -450 + (random(idx + 3) - 0.5) * 80;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Blend core and outer colors
      const lerpedColor = coreColor.clone().lerp(outerColor, random(idx + 2));
      colors[i * 3] = lerpedColor.r;
      colors[i * 3 + 1] = lerpedColor.g;
      colors[i * 3 + 2] = lerpedColor.b;

      sizes[i] = 45 + random(idx + 3) * 60;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
    geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));

    return geo;
  }, []);

  // Moon atmospheric glow soft canvas gradient texture
  const moonGlowTexture = useMemo(() => {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(224, 242, 254, 1)');
      grad.addColorStop(0.25, 'rgba(186, 230, 253, 0.55)');
      grad.addColorStop(0.55, 'rgba(125, 211, 252, 0.12)');
      grad.addColorStop(1, 'rgba(125, 211, 252, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  // Procedural Cloud positions & speeds
  const cloudPuffs = useMemo(() => {
    const puffs = [];
    const count = 28;
    const random = (idx: number) => {
      const s = idx * 15485863;
      const r = (s * s * s) % 233280;
      return Math.abs(r) / 233280;
    };

    for (let i = 0; i < count; i++) {
      const idx = i * 5;
      puffs.push({
        position: new THREE.Vector3(
          (random(idx) - 0.5) * 380,
          35 + random(idx + 1) * 45,
          -random(idx + 2) * 500
        ),
        scale: 12 + random(idx + 3) * 22,
        speed: 0.15 + random(idx + 4) * 0.3
      });
    }
    return puffs;
  }, []);

  // METEOR SHOWER CONFIGURATION
  const METEOR_COUNT = 3;
  const meteorRef = useRef(
    Array.from({ length: METEOR_COUNT }).map(() => ({
      start: new THREE.Vector3(),
      current: new THREE.Vector3(),
      velocity: new THREE.Vector3(),
      active: false,
      lifetime: 0,
      maxLifetime: 0,
    }))
  );
  
  const meteorLines = useMemo(() => {
    return Array.from({ length: METEOR_COUNT }).map(() => {
      const lineGeo = new THREE.BufferGeometry();
      const positions = new Float32Array(2 * 3);
      lineGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      
      const mat = new THREE.LineBasicMaterial({
        color: '#ffffff',
        transparent: true,
        linewidth: 1.5,
        blending: THREE.AdditiveBlending,
        opacity: 0,
      });
      
      const lineMesh = new THREE.Line(lineGeo, mat);
      lineMesh.visible = false;
      return lineMesh;
    });
  }, []);

  const meteorMeshRefs = useRef<Array<THREE.Line | null>>([]);

  useEffect(() => {
    meteorMeshRefs.current = meteorLines;
  }, [meteorLines]);

  // Animate Celestial System in real-time driven by scroll timeline
  useFrame((state, delta) => {
    const s = stateRef.current;
    const p = s.progress;
    const tunnelFactor = s.environment.tunnelFactor;
    const time = state.clock.getElapsedTime();

    // 1. Calculate moon coordinates based on scroll and camera position
    // Moon rises and shifts slowly as scroll progress moves from 0 to 1
    const xOffset = 110 - p * 80;
    const yOffset = 70 + p * 60;
    const zOffset = -480;

    const targetMoonPos = camera.position.clone().add(new THREE.Vector3(xOffset, yOffset, zOffset));

    if (moonRef.current) {
      moonRef.current.position.copy(targetMoonPos);
    }
    if (moonGlowRef.current) {
      moonGlowRef.current.position.copy(targetMoonPos);
    }

    // 2. Adjust visibility based on environment zones & tunnel factors
    // Tunnel block: stars/nebula fade out completely; Moon glows fade
    const tunnelFade = THREE.MathUtils.clamp(1.0 - tunnelFactor * 1.5, 0.0, 1.0);
    
    // Section integrations opacity values
    // Hero: Clear, About: Cloudy, Services/Projects: Dense stars & Milky Way
    let targetCloudOpacity = 0.05;
    let targetStarOpacity = 0.85;

    if (p < 0.1) {
      // Hero: Clear sky, bright moon
      targetCloudOpacity = 0.0;
      targetStarOpacity = 0.9;
    } else if (p < 0.23) {
      // About: Clouds increase
      const t = (p - 0.1) / 0.13;
      targetCloudOpacity = t * 0.65;
      targetStarOpacity = 0.9 - t * 0.45;
    } else if (p < 0.55) {
      // Services -> Projects: Milky Way becomes visible, stars dense, clouds fade
      const t = (p - 0.23) / 0.32;
      targetCloudOpacity = 0.65 - t * 0.55;
      targetStarOpacity = 0.45 + t * 0.55;
    } else if (p < 0.75) {
      // Process: Clouds/Mist returns slightly
      const t = (p - 0.55) / 0.2;
      targetCloudOpacity = 0.1 + t * 0.4;
    } else if (p < 0.88) {
      // Testimonials: Clear sky
      const t = (p - 0.75) / 0.13;
      targetCloudOpacity = 0.5 - t * 0.45;
      targetStarOpacity = 0.85 + t * 0.15;
    } else {
      // Contact: Sky becomes calm & clear
      targetCloudOpacity = 0.05;
      targetStarOpacity = 1.0;
    }

    const finalCloudOpacity = targetCloudOpacity * tunnelFade;

    // Altitude factor (0.0 valley to 1.0 peaks)
    const heightFactor = THREE.MathUtils.clamp((camera.position.y - 4.0) / 20.0, 0.0, 1.0);

    // Milky Way is visible in open mountain sections: alpine, lakeside, sunset
    let openMountainFactor = 0.0;
    if (s.environment.zone === 'alpine') {
      openMountainFactor = 0.8;
    } else if (s.environment.zone === 'lakeside') {
      openMountainFactor = 0.65;
    } else if (s.environment.zone === 'sunset') {
      openMountainFactor = 0.75;
    }

    const targetNebulaOpacity = openMountainFactor * (0.35 + 0.65 * heightFactor) * (1.0 - s.environment.fogFactor) * 0.8;
    const finalNebulaOpacity = targetNebulaOpacity * tunnelFade;

    // Star density increases at higher altitude
    const altitudeStarBonus = 0.2 * heightFactor;
    const finalStarOpacity = (targetStarOpacity + altitudeStarBonus) * tunnelFade;

    if (starMaterialRef.current) {
      starMaterialRef.current.uniforms.uTime.value = isReducedMotion ? 0 : time;
      starMaterialRef.current.uniforms.uOpacity.value = finalStarOpacity;
    }

    if (nebulaMaterialRef.current) {
      nebulaMaterialRef.current.uniforms.uOpacity.value = finalNebulaOpacity;
    }

    // Update Moon Phase (wax/wane subtly as journey progresses)
    const moonPhase = p * 0.35;
    if (moonMaterialRef.current) {
      moonMaterialRef.current.uniforms.uPhase.value = moonPhase;
    }

    // 3. Move Clouds and update CloudShader uniforms
    if (cloudGroupRef.current) {
      cloudGroupRef.current.children.forEach((meshChild, idx) => {
        const cloudMesh = meshChild as THREE.Mesh;
        const mat = cloudMesh.material as THREE.ShaderMaterial;
        
        if (mat.uniforms) {
          mat.uniforms.uOpacity.value = finalCloudOpacity;
          mat.uniforms.uMoonPosition.value.copy(targetMoonPos);
          mat.uniforms.uCameraPosition.value.copy(camera.position);
        }

        if (!isReducedMotion) {
          cloudMesh.position.x += cloudPuffs[idx].speed * delta * 4;
          if (cloudMesh.position.x > 180) {
            cloudMesh.position.x = -180;
          }
        }
      });
    }

    // 4. Calculate Cloud Overlap & Position Light Shafts
    let maxOverlap = 0.0;
    if (cloudGroupRef.current && moonRef.current) {
      const moonPos = moonRef.current.position;
      cloudGroupRef.current.children.forEach((meshChild) => {
        const cloudMesh = meshChild as THREE.Mesh;
        const cloudPos = cloudMesh.position;

        const toMoon = moonPos.clone().sub(camera.position).normalize();
        const toCloud = cloudPos.clone().sub(camera.position).normalize();

        const alignment = toMoon.dot(toCloud);
        const distMoon = camera.position.distanceTo(moonPos);
        const distCloud = camera.position.distanceTo(cloudPos);

        if (alignment > 0.992 && distCloud < distMoon) {
          const factor = (alignment - 0.992) / 0.008; // 0 to 1
          maxOverlap = Math.max(maxOverlap, factor);
        }
      });
    }

    const finalLightShaftOpacity = maxOverlap * finalCloudOpacity * tunnelFade;

    if (lightShaftsRef.current && lightShaftsMaterialRef.current) {
      // Position slightly in front of the moon facing the camera
      const toCam = camera.position.clone().sub(targetMoonPos).normalize();
      lightShaftsRef.current.position.copy(targetMoonPos).addScaledVector(toCam, 5.0);
      lightShaftsRef.current.lookAt(camera.position);

      lightShaftsMaterialRef.current.uniforms.uTime.value = isReducedMotion ? 0 : time;
      lightShaftsMaterialRef.current.uniforms.uOpacity.value = THREE.MathUtils.lerp(
        lightShaftsMaterialRef.current.uniforms.uOpacity.value,
        finalLightShaftOpacity,
        0.1
      );
    }

    // 5. Rare shooting star simulation (roughly once every 90 seconds)
    const spawnProb = 0.00018;
    const canSpawnMeteor = tunnelFactor < 0.1 && !isReducedMotion;

    meteorRef.current.forEach((meteor, idx) => {
      const lineMesh = meteorMeshRefs.current[idx];

      if (meteor.active) {
        meteor.current.addScaledVector(meteor.velocity, delta);
        meteor.lifetime -= delta;

        if (lineMesh) {
          lineMesh.visible = true;
          const posAttr = lineMesh.geometry.attributes.position as THREE.BufferAttribute;
          posAttr.setXYZ(0, meteor.current.x, meteor.current.y, meteor.current.z);
          const trail = meteor.current.clone().addScaledVector(meteor.velocity, -0.06);
          posAttr.setXYZ(1, trail.x, trail.y, trail.z);
          posAttr.needsUpdate = true;
          
          const mat = lineMesh.material as THREE.LineBasicMaterial;
          mat.opacity = THREE.MathUtils.clamp(meteor.lifetime / meteor.maxLifetime, 0.0, 1.0) * tunnelFade;
        }

        if (meteor.lifetime <= 0) {
          meteor.active = false;
          if (lineMesh) lineMesh.visible = false;
        }
      } else if (canSpawnMeteor && Math.random() < spawnProb) {
        const startX = (Math.random() - 0.3) * 200;
        const startY = 80 + Math.random() * 60;
        const startZ = -450 + Math.random() * 150;

        meteor.start.set(startX, startY, startZ);
        meteor.current.copy(meteor.start);
        
        meteor.velocity.set(
          -120 - Math.random() * 60,
          -60 - Math.random() * 40,
          50 + Math.random() * 50
        );

        meteor.lifetime = 0.4 + Math.random() * 0.6;
        meteor.maxLifetime = meteor.lifetime;
        meteor.active = true;
      } else {
        if (lineMesh) lineMesh.visible = false;
      }
    });
  });

  return (
    <group>
      {/* Volumetric Layered Stars */}
      <points geometry={starGeo}>
        <shaderMaterial
          ref={starMaterialRef}
          args={[StarShader]}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Milky Way Nebular Layer */}
      <points geometry={nebulaGeo}>
        <shaderMaterial
          ref={nebulaMaterialRef}
          args={[NebulaShader]}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Dynamic Moon Sphere with MoonShader */}
      <mesh ref={moonRef}>
        <sphereGeometry args={[4.2, 32, 32]} />
        <shaderMaterial 
          ref={moonMaterialRef}
          args={[MoonShader]}
          transparent
          depthWrite={true}
        />
      </mesh>

      {/* Moon soft atmospheric scattering halo sprite */}
      {moonGlowTexture && (
        <sprite ref={moonGlowRef} scale={[30, 30, 1]}>
          <spriteMaterial 
            map={moonGlowTexture} 
            transparent 
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            opacity={0.5}
          />
        </sprite>
      )}

      {/* Crepuscular Rays / Light Shafts */}
      <mesh ref={lightShaftsRef}>
        <planeGeometry args={[90, 90]} />
        <shaderMaterial
          ref={lightShaftsMaterialRef}
          args={[LightShaftsShader]}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Dynamic Cloud Puffs using CloudShader */}
      <group ref={cloudGroupRef}>
        {cloudPuffs.map((puff, i) => (
          <mesh key={i} position={puff.position}>
            <dodecahedronGeometry args={[puff.scale, 1]} />
            <shaderMaterial
              args={[CloudShader]}
              transparent
              depthWrite={false}
            />
          </mesh>
        ))}
      </group>

      {/* Dynamic Line segments for Meteors */}
      {meteorLines.map((lineMesh, idx) => (
        <primitive key={idx} object={lineMesh} />
      ))}
    </group>
  );
}
