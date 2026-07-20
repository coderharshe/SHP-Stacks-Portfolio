'use client';

import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export function Environment() {
  const lakeRef = React.useRef<THREE.Mesh>(null);
  const waterfallRef = React.useRef<THREE.Mesh>(null);

  // Animate water subtle surface ripple
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (lakeRef.current) {
      lakeRef.current.position.y = -1.2 + Math.sin(t * 1.5) * 0.15;
    }
  });

  return (
    <group>
      {/* Alpine Lake near Lakeside Road section (Z = -260) */}
      <mesh ref={lakeRef} position={[-80, -1.2, -260]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[180, 220]} />
        <meshStandardMaterial
          color="#0f4c81"
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.88}
        />
      </mesh>

      {/* Waterfall Stream flowing down mountain cliff */}
      <mesh ref={waterfallRef} position={[45, 18, -190]} rotation={[0, -Math.PI / 4, 0]}>
        <boxGeometry args={[4, 35, 0.4]} />
        <meshStandardMaterial
          color="#38bdf8"
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.75}
        />
      </mesh>

      {/* Scenic Road Signs at curve bends */}
      <group position={[14, 2, -45]} rotation={[0, -0.4, 0]}>
        {/* Post */}
        <mesh position={[0, 1.5, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 3]} />
          <meshStandardMaterial color="#64748b" metalness={0.8} />
        </mesh>
        {/* Sign Diamond */}
        <mesh position={[0, 2.7, 0]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[1, 1, 0.05]} />
          <meshStandardMaterial color="#eab308" roughness={0.4} />
        </mesh>
      </group>

      {/* Distant Alpine Village in valley background */}
      <group position={[120, 5, -360]}>
        {[...Array(6)].map((_, i) => (
          <mesh key={i} position={[(i % 3) * 10, 1.5, Math.floor(i / 3) * 12]}>
            <boxGeometry args={[5, 3, 6]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.6} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
