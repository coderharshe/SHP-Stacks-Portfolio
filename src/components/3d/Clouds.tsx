'use client';

import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export function Clouds() {
  const cloudGroupRef = useRef<THREE.Group>(null);

  const cloudPuffs = useMemo(() => {
    const puffs = [];
    const count = 35;

    // Stateless deterministic pseudo-random generator
    const random = (idx: number) => {
      const s = idx * 15485863;
      const r = (s * s * s) % 233280;
      return Math.abs(r) / 233280;
    };

    for (let i = 0; i < count; i++) {
      const idx = i * 5;
      puffs.push({
        position: new THREE.Vector3(
          (random(idx) - 0.5) * 350,
          25 + random(idx + 1) * 30,
          -random(idx + 2) * 500
        ),
        scale: 8 + random(idx + 3) * 16,
        speed: 0.2 + random(idx + 4) * 0.4
      });
    }
    return puffs;
  }, []);

  useFrame((state, delta) => {
    if (cloudGroupRef.current) {
      cloudGroupRef.current.children.forEach((child, i) => {
        child.position.x += cloudPuffs[i].speed * delta * 4;
        if (child.position.x > 180) {
          child.position.x = -180;
        }
      });
    }
  });

  return (
    <group ref={cloudGroupRef}>
      {cloudPuffs.map((puff, i) => (
        <mesh key={i} position={puff.position}>
          <dodecahedronGeometry args={[puff.scale, 1]} />
          <meshStandardMaterial
            color="#f8fafc"
            transparent
            opacity={0.45}
            roughness={1}
            flatShading
          />
        </mesh>
      ))}
    </group>
  );
}
