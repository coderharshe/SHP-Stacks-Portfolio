'use client';

import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export function Birds() {
  const birdsGroupRef = useRef<THREE.Group>(null);

  const birdPositions = useMemo(() => {
    const arr = [];
    
    // Stateless deterministic pseudo-random generator
    const random = (idx: number) => {
      const s = idx * 15485863;
      const r = (s * s * s) % 233280;
      return Math.abs(r) / 233280;
    };

    for (let i = 0; i < 16; i++) {
      const idx = i * 4;
      arr.push({
        offset: new THREE.Vector3(
          (random(idx) - 0.5) * 40,
          random(idx + 1) * 10,
          (random(idx + 2) - 0.5) * 30
        ),
        speed: 1 + random(idx + 3) * 0.5
      });
    }
    return arr;
  }, []);

  // Simple V-wing geometry
  const birdGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const verts = new Float32Array([
      0, 0, 0.4,
      -0.8, 0.2, -0.4,
      0, 0, -0.2,

      0, 0, 0.4,
      0, 0, -0.2,
      0.8, 0.2, -0.4,
    ]);
    geo.setAttribute('position', new THREE.BufferAttribute(verts, 3));
    geo.computeVertexNormals();
    return geo;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (birdsGroupRef.current) {
      birdsGroupRef.current.position.set(
        Math.sin(t * 0.2) * 60,
        35 + Math.cos(t * 0.3) * 5,
        -200 + Math.cos(t * 0.15) * 120
      );
      birdsGroupRef.current.rotation.y = t * 0.15;
    }
  });

  return (
    <group ref={birdsGroupRef}>
      {birdPositions.map((b, i) => (
        <mesh key={i} position={b.offset} geometry={birdGeometry}>
          <meshBasicMaterial color="#1e293b" side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}
