'use client';

import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export function Clouds() {
  const cloudGroupRef = useRef<THREE.Group>(null);

  const cloudPuffs = useMemo(() => {
    const puffs = [];
    const count = 35;
    for (let i = 0; i < count; i++) {
      puffs.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 350,
          25 + Math.random() * 30,
          -Math.random() * 500
        ),
        scale: 8 + Math.random() * 16,
        speed: 0.2 + Math.random() * 0.4
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
