'use client';

import React from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Vignette } from '@react-three/postprocessing';

interface FogProps {
  scrollProgressRef: React.RefObject<number>;
}

export function Fog({ scrollProgressRef }: FogProps) {
  const { scene } = useThree();

  // Initialize atmospheric linear fog
  React.useEffect(() => {
    scene.fog = new THREE.FogExp2('#090d16', 0.0028);
    return () => {
      scene.fog = null;
    };
  }, [scene]);

  // Adjust fog color and density adaptively during scroll
  useFrame(() => {
    if (!scene.fog) return;
    const p = scrollProgressRef.current || 0;
    const fog = scene.fog as THREE.FogExp2;

    // Darker, denser fog during sunset/contact section for high text contrast
    let targetColor = new THREE.Color('#090d16');
    let targetDensity = 0.0028;

    if (p > 0.8) {
      targetColor = new THREE.Color('#110a18'); // Deep warm twilight fog
      targetDensity = 0.0035;
    } else if (p > 0.25 && p < 0.5) {
      targetColor = new THREE.Color('#061412'); // Forest fog
      targetDensity = 0.0032;
    }

    fog.color.lerp(targetColor, 0.05);
    fog.density = THREE.MathUtils.lerp(fog.density, targetDensity, 0.05);
  });

  return (
    <EffectComposer enableNormalPass={false}>
      {/* Subtle Cinematic Edge Vignette to keep text focused */}
      <Vignette eskil={false} offset={0.2} darkness={0.65} />
    </EffectComposer>
  );
}
