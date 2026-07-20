'use client';

import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useCameraMotion } from '@/context/CameraMotionContext';

interface LightingProps {
  scrollProgressRef: React.RefObject<number>;
}

export function Lighting({ scrollProgressRef }: LightingProps) {
  const { stateRef } = useCameraMotion();
  const dirLightRef = useRef<THREE.DirectionalLight>(null);
  const ambientLightRef = useRef<THREE.AmbientLight>(null);
  const hemiLightRef = useRef<THREE.HemisphereLight>(null);

  // Smoothly interpolate light color & position matching scroll section continuous journey
  useFrame((state) => {
    const s = stateRef.current;
    const p = s.progress;
    const tunnelFactor = s.environment.tunnelFactor;

    if (!dirLightRef.current || !ambientLightRef.current || !hemiLightRef.current) return;

    // 1. Calculate matching moon position for shadow casting directionality
    const xOffset = 110 - p * 80;
    const yOffset = 70 + p * 60;
    const zOffset = -480;
    const targetMoonPos = state.camera.position.clone().add(new THREE.Vector3(xOffset, yOffset, zOffset));

    // 2. Moonlight color temperatures & intensities depending on section progress
    const moonColor = new THREE.Color('#bae6fd'); // Default crisp frozen ice blue-white
    let targetIntensity = 1.3;

    if (p < 0.1) {
      // Hero: Bright moon
      moonColor.set('#bae6fd');
      targetIntensity = 1.4;
    } else if (p < 0.23) {
      // About: Cloudy overcast dims light
      moonColor.set('#94a3b8');
      targetIntensity = 0.85;
    } else if (p < 0.55) {
      // Services -> Projects: Dense stars / Milky Way
      moonColor.set('#7dd3fc');
      targetIntensity = 1.35;
    } else if (p < 0.75) {
      // Process: Moving fog / mist scatters light
      moonColor.set('#60a5fa');
      targetIntensity = 0.95;
    } else if (p < 0.88) {
      // Testimonials: Clear sky
      moonColor.set('#bae6fd');
      targetIntensity = 1.4;
    } else {
      // Contact: Highest zenith position (bright illumination)
      moonColor.set('#e0f2fe');
      targetIntensity = 1.6;
    }

    // Tunnel fades environmental lights completely
    const tunnelFade = THREE.MathUtils.clamp(1.0 - tunnelFactor * 1.5, 0.0, 1.0);
    const finalIntensity = targetIntensity * tunnelFade;

    // Smooth lerping to prevent lighting jumps
    dirLightRef.current.color.lerp(moonColor, 0.05);
    dirLightRef.current.position.lerp(targetMoonPos, 0.08);
    dirLightRef.current.intensity = THREE.MathUtils.lerp(dirLightRef.current.intensity, finalIntensity, 0.05);

    hemiLightRef.current.color.lerp(moonColor, 0.05);
    hemiLightRef.current.intensity = THREE.MathUtils.lerp(hemiLightRef.current.intensity, 0.4 * tunnelFade, 0.05);

    ambientLightRef.current.color.set('#030712'); // Deep black-blue night sky ambient
    ambientLightRef.current.intensity = THREE.MathUtils.lerp(ambientLightRef.current.intensity, 0.18 * tunnelFade, 0.05);
  });

  return (
    <group>
      {/* Moon Directional Light for Shadow casting */}
      <directionalLight
        ref={dirLightRef}
        position={[120, 70, -480]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={10}
        shadow-camera-far={800}
        shadow-camera-left={-200}
        shadow-camera-right={200}
        shadow-camera-top={200}
        shadow-camera-bottom={-200}
      />

      {/* Atmospheric Soft Ambient Light */}
      <ambientLight ref={ambientLightRef} intensity={0.2} color="#030712" />

      {/* Hemisphere Sky / Ground Light */}
      <hemisphereLight
        ref={hemiLightRef}
        color="#7dd3fc"
        groundColor="#020617"
        intensity={0.4}
      />
    </group>
  );
}
