/* eslint-disable react-hooks/immutability */
'use client';

import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useCameraMotion } from '@/context/CameraMotionContext';
import { roadCurve } from './RoadPath';
import { RoadShader } from './Shaders/RoadShader';

export function Road() {
  const { stateRef } = useCameraMotion();
  const railLeftRef = useRef<THREE.Mesh>(null);
  const railRightRef = useRef<THREE.Mesh>(null);

  // Road surface geometry generated along spline
  const { roadGeometry, guardrailLeft, guardrailRight } = useMemo(() => {
    const tubularSegments = 400;
    
    // Custom road ribbon geometry
    const points = roadCurve.getSpacedPoints(tubularSegments);
    const frenzyFrames = roadCurve.computeFrenetFrames(tubularSegments, false);
    
    const vertCount = (tubularSegments + 1) * 2;
    const positions = new Float32Array(vertCount * 3);
    const uvs = new Float32Array(vertCount * 2);
    const normals = new Float32Array(vertCount * 3);
    const indices = [];

    const halfWidth = 3.2;

    for (let i = 0; i <= tubularSegments; i++) {
      const pt = points[i];
      const binormal = frenzyFrames.binormals[i];
      const normal = frenzyFrames.normals[i];
      const progress = i / tubularSegments;

      // Left edge
      const leftPt = pt.clone().add(binormal.clone().multiplyScalar(-halfWidth));
      positions[i * 6] = leftPt.x;
      positions[i * 6 + 1] = leftPt.y;
      positions[i * 6 + 2] = leftPt.z;
      uvs[i * 4] = 0.0;
      uvs[i * 4 + 1] = progress * 40.0;
      normals[i * 6] = normal.x;
      normals[i * 6 + 1] = normal.y;
      normals[i * 6 + 2] = normal.z;

      // Right edge
      const rightPt = pt.clone().add(binormal.clone().multiplyScalar(halfWidth));
      positions[i * 6 + 3] = rightPt.x;
      positions[i * 6 + 4] = rightPt.y;
      positions[i * 6 + 5] = rightPt.z;
      uvs[i * 4 + 2] = 1.0;
      uvs[i * 4 + 3] = progress * 40.0;
      normals[i * 6 + 3] = normal.x;
      normals[i * 6 + 4] = normal.y;
      normals[i * 6 + 5] = normal.z;

      if (i < tubularSegments) {
        const row1 = i * 2;
        const row2 = (i + 1) * 2;
        indices.push(row1, row2, row1 + 1);
        indices.push(row1 + 1, row2, row2 + 1);
      }
    }

    const roadGeo = new THREE.BufferGeometry();
    roadGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    roadGeo.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
    roadGeo.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
    roadGeo.setIndex(indices);

    // Guardrail paths offset from road left and right
    const railGeoLeft = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(
        points.map((pt, idx) => pt.clone().add(frenzyFrames.binormals[idx].clone().multiplyScalar(-halfWidth - 0.2)).add(new THREE.Vector3(0, 0.6, 0)))
      ),
      200,
      0.1,
      6,
      false
    );

    const railGeoRight = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(
        points.map((pt, idx) => pt.clone().add(frenzyFrames.binormals[idx].clone().multiplyScalar(halfWidth + 0.2)).add(new THREE.Vector3(0, 0.6, 0)))
      ),
      200,
      0.1,
      6,
      false
    );

    return {
      roadGeometry: roadGeo,
      guardrailLeft: railGeoLeft,
      guardrailRight: railGeoRight
    };
  }, []);

  const roadMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.clone(RoadShader.uniforms),
      vertexShader: RoadShader.vertexShader,
      fragmentShader: RoadShader.fragmentShader,
      side: THREE.DoubleSide
    });
  }, []);

  // Update moonlight intensity and guardrail reflections dynamically
  useFrame(() => {
    const s = stateRef.current;
    const tunnelFade = THREE.MathUtils.clamp(1.0 - s.environment.tunnelFactor * 1.5, 0.0, 1.0);

    // Moonlight is stronger in open sections (alpine, lakeside, sunset)
    const isOpen = s.environment.zone === 'alpine' || s.environment.zone === 'lakeside' || s.environment.zone === 'sunset';
    const moonlightIntensity = (isOpen ? 0.95 : 0.45) * tunnelFade;

    // 1. Brighten road edges based on moonlight intensity
    if (roadMaterial.uniforms.uMoonlightIntensity) {
      roadMaterial.uniforms.uMoonlightIntensity.value = THREE.MathUtils.lerp(
        roadMaterial.uniforms.uMoonlightIntensity.value,
        moonlightIntensity,
        0.05
      );
    }

    // 2. Add faint specular highlight glow on guardrails
    if (railLeftRef.current && railRightRef.current) {
      const matLeft = railLeftRef.current.material as THREE.MeshStandardMaterial;
      const matRight = railRightRef.current.material as THREE.MeshStandardMaterial;
      
      const targetEmissiveIntensity = (0.04 + (isOpen ? 0.12 : 0.0)) * tunnelFade;
      matLeft.emissiveIntensity = THREE.MathUtils.lerp(matLeft.emissiveIntensity, targetEmissiveIntensity, 0.05);
      matRight.emissiveIntensity = THREE.MathUtils.lerp(matRight.emissiveIntensity, targetEmissiveIntensity, 0.05);
    }
  });

  return (
    <group>
      {/* Asphalt Ribbon */}
      <mesh geometry={roadGeometry} material={roadMaterial} receiveShadow />

      {/* Steel Guardrails with moonlight response */}
      <mesh ref={railLeftRef} geometry={guardrailLeft}>
        <meshStandardMaterial 
          color="#94a3b8" 
          metalness={0.9} 
          roughness={0.2} 
          emissive="#bae6fd" 
          emissiveIntensity={0.04}
        />
      </mesh>
      <mesh ref={railRightRef} geometry={guardrailRight}>
        <meshStandardMaterial 
          color="#94a3b8" 
          metalness={0.9} 
          roughness={0.2} 
          emissive="#bae6fd" 
          emissiveIntensity={0.04}
        />
      </mesh>

      {/* Scenic Valley Bridge Pillars at Testimonials section (Z = -330) */}
      <group position={[0, -2, -330]}>
        <mesh position={[-5, -15, 0]}>
          <boxGeometry args={[1.5, 30, 1.5]} />
          <meshStandardMaterial color="#475569" roughness={0.7} />
        </mesh>
        <mesh position={[5, -15, 0]}>
          <boxGeometry args={[1.5, 30, 1.5]} />
          <meshStandardMaterial color="#475569" roughness={0.7} />
        </mesh>
        <mesh position={[0, 10, 0]}>
          <boxGeometry args={[12, 1, 6]} />
          <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>
    </group>
  );
}
