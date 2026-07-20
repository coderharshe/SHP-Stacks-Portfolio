'use client';

import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

// ─── Shader: individual star points with twinkling ───────────────────────────
const StarShader = {
  uniforms: { uTime: { value: 0 } },
  vertexShader: `
    uniform float uTime;
    attribute float aSize;
    attribute float aPhase;
    attribute vec3 aColor;
    varying vec3 vColor;
    varying float vAlpha;
    void main() {
      vColor = aColor;
      float twinkle = 0.5 + 0.5 * sin(uTime * 2.0 + aPhase * 6.2832);
      vAlpha = 0.6 + 0.4 * twinkle;
      vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = aSize * (300.0 / -mvPos.z) * (0.8 + 0.2 * twinkle);
      gl_Position = projectionMatrix * mvPos;
    }
  `,
  fragmentShader: `
    varying vec3 vColor;
    varying float vAlpha;
    void main() {
      float d = length(gl_PointCoord - vec2(0.5));
      if (d > 0.5) discard;
      float glow = 1.0 - smoothstep(0.1, 0.5, d);
      gl_FragColor = vec4(vColor, glow * vAlpha);
    }
  `,
};

// ─── Shader: soft nebula gas cloud ──────────────────────────────────────────
const NebulaShader = {
  uniforms: { uTime: { value: 0 } },
  vertexShader: `
    attribute float aSize;
    attribute vec3 aColor;
    attribute float aPhase;
    varying vec3 vColor;
    varying float vAlpha;
    uniform float uTime;
    void main() {
      vColor = aColor;
      vAlpha = 0.4 + 0.25 * sin(uTime * 0.3 + aPhase * 3.14);
      vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = aSize * (400.0 / -mvPos.z);
      gl_Position = projectionMatrix * mvPos;
    }
  `,
  fragmentShader: `
    varying vec3 vColor;
    varying float vAlpha;
    void main() {
      float d = length(gl_PointCoord - vec2(0.5));
      if (d > 0.5) discard;
      float glow = 1.0 - smoothstep(0.0, 0.5, d);
      gl_FragColor = vec4(vColor, glow * glow * vAlpha * 0.18);
    }
  `,
};

// ─── Galaxy spiral arms ────────────────────────────────────────────────────
function GalaxySpiral() {
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const { positions, colors, sizes, phases } = useMemo(() => {
    const COUNT = 80000;
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);
    const phases = new Float32Array(COUNT);

    const ARMS = 3;
    const ARM_SPREAD = 0.55;
    const GALAXY_RADIUS = 280;
    const SPIN = 3.5;

    const coreColor = new THREE.Color('#ffd4a0');
    const arm1Color = new THREE.Color('#a78bfa');
    const arm2Color = new THREE.Color('#38bdf8');
    const arm3Color = new THREE.Color('#f472b6');
    const rimColor  = new THREE.Color('#1e3a5f');

    for (let i = 0; i < COUNT; i++) {
      const arm = Math.floor(Math.random() * ARMS);
      const r = Math.pow(Math.random(), 0.6) * GALAXY_RADIUS;
      const angle = (arm / ARMS) * Math.PI * 2 + r * SPIN * 0.01 + (Math.random() - 0.5) * ARM_SPREAD;
      const spread = (Math.random() - 0.5) * r * 0.25 * (1 + r / GALAXY_RADIUS);

      positions[i * 3 + 0] = Math.cos(angle) * r + spread;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12 * (1 - r / GALAXY_RADIUS);
      positions[i * 3 + 2] = Math.sin(angle) * r + spread;

      const t = r / GALAXY_RADIUS;
      let starColor: THREE.Color;
      if (t < 0.18) {
        starColor = coreColor.clone().lerp(arm1Color, t / 0.18);
      } else {
        const armColor = arm === 0 ? arm1Color : arm === 1 ? arm2Color : arm3Color;
        starColor = armColor.clone().lerp(rimColor, (t - 0.18) / 0.82);
      }

      colors[i * 3 + 0] = starColor.r;
      colors[i * 3 + 1] = starColor.g;
      colors[i * 3 + 2] = starColor.b;
      sizes[i] = 0.3 + Math.random() * 1.8 * (1 - t * 0.7);
      phases[i] = Math.random() * Math.PI * 2;
    }

    return { positions, colors, sizes, phases };
  }, []);

  useFrame((state) => {
    if (matRef.current) matRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
  });

  return (
    <points rotation={[0.25, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aColor"   args={[colors,    3]} />
        <bufferAttribute attach="attributes-aSize"    args={[sizes,     1]} />
        <bufferAttribute attach="attributes-aPhase"   args={[phases,    1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={matRef}
        vertexShader={StarShader.vertexShader}
        fragmentShader={StarShader.fragmentShader}
        uniforms={StarShader.uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ─── Background deep-field stars ─────────────────────────────────────────────
function DeepFieldStars() {
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const { positions, colors, sizes, phases } = useMemo(() => {
    const COUNT = 12000;
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);
    const phases = new Float32Array(COUNT);

    const palette = [
      new THREE.Color('#ffffff'),
      new THREE.Color('#bae6fd'),
      new THREE.Color('#e0e7ff'),
      new THREE.Color('#fde68a'),
      new THREE.Color('#fca5a5'),
      new THREE.Color('#d8b4fe'),
    ];

    for (let i = 0; i < COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 500 + Math.random() * 300;
      positions[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3 + 0] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
      sizes[i] = 0.2 + Math.random() * 0.9;
      phases[i] = Math.random() * Math.PI * 2;
    }
    return { positions, colors, sizes, phases };
  }, []);

  useFrame((state) => {
    if (matRef.current) matRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aColor"   args={[colors,    3]} />
        <bufferAttribute attach="attributes-aSize"    args={[sizes,     1]} />
        <bufferAttribute attach="attributes-aPhase"   args={[phases,    1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={matRef}
        vertexShader={StarShader.vertexShader}
        fragmentShader={StarShader.fragmentShader}
        uniforms={{ uTime: { value: 0 } }}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ─── Nebula gas clouds ────────────────────────────────────────────────────────
function NebulaClouds() {
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const { positions, colors, sizes, phases } = useMemo(() => {
    const COUNT = 3000;
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);
    const phases = new Float32Array(COUNT);

    const clusters = [
      { center: new THREE.Vector3(-80, 20, 60),  color: new THREE.Color('#7c3aed'), spread: 60 },
      { center: new THREE.Vector3(90, -15, -50), color: new THREE.Color('#0ea5e9'), spread: 50 },
      { center: new THREE.Vector3(20, 30, -100), color: new THREE.Color('#ec4899'), spread: 45 },
      { center: new THREE.Vector3(-40, -20, 30), color: new THREE.Color('#f59e0b'), spread: 35 },
    ];

    for (let i = 0; i < COUNT; i++) {
      const cl = clusters[i % clusters.length];
      positions[i * 3 + 0] = cl.center.x + (Math.random() - 0.5) * cl.spread * 2;
      positions[i * 3 + 1] = cl.center.y + (Math.random() - 0.5) * cl.spread;
      positions[i * 3 + 2] = cl.center.z + (Math.random() - 0.5) * cl.spread * 2;
      const mix = Math.random();
      const c = cl.color.clone().lerp(new THREE.Color('#ffffff'), mix * 0.3);
      colors[i * 3 + 0] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
      sizes[i] = 5 + Math.random() * 20;
      phases[i] = Math.random() * Math.PI * 2;
    }
    return { positions, colors, sizes, phases };
  }, []);

  useFrame((state) => {
    if (matRef.current) matRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
  });

  return (
    <points rotation={[0.25, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aColor"   args={[colors,    3]} />
        <bufferAttribute attach="attributes-aSize"    args={[sizes,     1]} />
        <bufferAttribute attach="attributes-aPhase"   args={[phases,    1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={matRef}
        vertexShader={NebulaShader.vertexShader}
        fragmentShader={NebulaShader.fragmentShader}
        uniforms={{ uTime: { value: 0 } }}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ─── Galactic dust haze around the core ──────────────────────────────────────
function GalacticDust() {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const COUNT = 5000;
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const r = 10 + Math.random() * 90;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * 0.3;
      positions[i * 3 + 0] = r * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * 4;
      positions[i * 3 + 2] = r * Math.sin(theta);
      const c = new THREE.Color().setHSL(0.08 + Math.random() * 0.08, 0.6, 0.4);
      colors[i * 3 + 0] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (pointsRef.current) pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.008;
  });

  return (
    <points ref={pointsRef} rotation={[0.25, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors,    3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.8}
        vertexColors
        transparent
        opacity={0.12}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ─── Galaxy Camera: slow drift & scroll-driven zoom ───────────────────────────
interface GalaxyCameraProps {
  scrollProgressRef: React.RefObject<number>;
}

function GalaxyCamera({ scrollProgressRef }: GalaxyCameraProps) {
  const smooth = useRef(0);

  useFrame((state, delta) => {
    const raw = scrollProgressRef.current ?? 0;
    smooth.current = THREE.MathUtils.lerp(smooth.current, raw, delta * 1.5);
    const p = smooth.current;
    const t = state.clock.getElapsedTime();

    const driftX = Math.sin(t * 0.07) * 8;
    const driftY = Math.cos(t * 0.05) * 4;
    const camZ = 350 - p * 280;
    const camY = 40 - p * 30 + driftY;
    const camX = driftX + p * 20;

    state.camera.position.lerp(new THREE.Vector3(camX, camY, camZ), delta * 0.8);
    state.camera.lookAt(0, 0, 0);
  });

  return null;
}

// ─── Main exported component ──────────────────────────────────────────────────
interface GalaxySceneContentsProps {
  scrollProgressRef: React.RefObject<number>;
}

export function GalaxySceneContents({ scrollProgressRef }: GalaxySceneContentsProps) {
  return (
    <>
      <GalaxyCamera scrollProgressRef={scrollProgressRef} />
      <color attach="background" args={['#01010d']} />
      <ambientLight intensity={0.05} color="#1a1040" />
      <pointLight position={[0, 0, 0]} intensity={2.0} distance={200} color="#ffd4a0" decay={2} />
      <GalaxySpiral />
      <NebulaClouds />
      <GalacticDust />
      <DeepFieldStars />
    </>
  );
}
