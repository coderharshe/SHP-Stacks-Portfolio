'use client';

import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface LightingProps {
  scrollProgressRef: React.RefObject<number>;
}

export function Lighting({ scrollProgressRef }: LightingProps) {
  const dirLightRef = useRef<THREE.DirectionalLight>(null);
  const ambientLightRef = useRef<THREE.AmbientLight>(null);
  const hemiLightRef = useRef<THREE.HemisphereLight>(null);

  // Smoothly interpolate light color & position matching scroll section continuous journey
  useFrame(() => {
    const p = scrollProgressRef.current || 0;

    if (!dirLightRef.current || !ambientLightRef.current || !hemiLightRef.current) return;

    // Color definitions per journey keyframe
    const sunriseSun = new THREE.Color('#f97316'); // Warm orange
    const forestSun = new THREE.Color('#fbbf24');  // Amber forest sun
    const alpineSun = new THREE.Color('#fef08a');  // Crisp high sun
    const sunsetSun = new THREE.Color('#ec4899');  // Deep golden sunset

    const ambientBase = new THREE.Color('#1e1b4b'); // Deep dusk slate blue
    const ambientDay = new THREE.Color('#38bdf8');  // Sky blue

    let targetSunColor = sunriseSun;
    let targetSunPos = new THREE.Vector3(120, 30, -50);
    let targetIntensity = 1.2;

    if (p < 0.25) {
      // Sunrise -> Forest transition
      const t = p / 0.25;
      targetSunColor = sunriseSun.clone().lerp(forestSun, t);
      targetSunPos = new THREE.Vector3(120, 30 + t * 40, -50 - t * 80);
      targetIntensity = 1.2 + t * 0.4;
    } else if (p < 0.55) {
      // Forest -> Alpine Pass transition
      const t = (p - 0.25) / 0.3;
      targetSunColor = forestSun.clone().lerp(alpineSun, t);
      targetSunPos = new THREE.Vector3(120 - t * 40, 70 + t * 50, -130 - t * 130);
      targetIntensity = 1.6;
    } else if (p < 0.8) {
      // Alpine Pass -> Lakeside & Bridge
      const t = (p - 0.55) / 0.25;
      targetSunColor = alpineSun.clone().lerp(sunriseSun, t);
      targetSunPos = new THREE.Vector3(80 - t * 120, 120 - t * 70, -260 - t * 100);
      targetIntensity = 1.6 - t * 0.3;
    } else {
      // Bridge -> Golden Sunset Overlook
      const t = (p - 0.8) / 0.2;
      targetSunColor = sunriseSun.clone().lerp(sunsetSun, t);
      targetSunPos = new THREE.Vector3(-40 - t * 60, 50 - t * 35, -360 - t * 100);
      targetIntensity = 1.8;
    }

    // Smooth lerping to prevent lighting jumps
    dirLightRef.current.color.lerp(targetSunColor, 0.05);
    dirLightRef.current.position.lerp(targetSunPos, 0.05);
    dirLightRef.current.intensity = THREE.MathUtils.lerp(dirLightRef.current.intensity, targetIntensity, 0.05);

    hemiLightRef.current.color.lerp(targetSunColor, 0.05);
  });

  return (
    <group>
      {/* Sun / Directional Shadow Light */}
      <directionalLight
        ref={dirLightRef}
        position={[120, 30, -50]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={600}
        shadow-camera-left={-150}
        shadow-camera-right={150}
        shadow-camera-top={150}
        shadow-camera-bottom={-150}
      />

      {/* Atmospheric Soft Ambient Light */}
      <ambientLight ref={ambientLightRef} intensity={0.6} color="#1e293b" />

      {/* Hemisphere Sky / Ground Light */}
      <hemisphereLight
        ref={hemiLightRef}
        color="#38bdf8"
        groundColor="#0f172a"
        intensity={0.8}
      />
    </group>
  );
}
