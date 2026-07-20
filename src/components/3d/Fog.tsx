/* eslint-disable react-hooks/immutability */
'use client';

import React from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Vignette } from '@react-three/postprocessing';
import { useCameraMotion } from '@/context/CameraMotionContext';

interface FogProps {
  scrollProgressRef: React.RefObject<number>;
}

export function Fog({ scrollProgressRef }: FogProps) {
  const fogRef = React.useRef<THREE.FogExp2>(null);
  const { scene } = useThree();
  const { stateRef } = useCameraMotion();

  // Adjust fog color and density adaptively during scroll
  useFrame((state) => {
    if (!fogRef.current) return;
    const fog = fogRef.current;
    const s = stateRef.current;

    // Normalize camera height (y ranges from 4 to 24)
    const height = state.camera.position.y;
    const heightFactor = THREE.MathUtils.clamp((height - 4.0) / 20.0, 0.0, 1.0);

    // 1. Atmospheric Color Grading (cooler blue tones at higher altitudes)
    // Valley sky: deep black-blue (#03050a)
    // Peak sky: cooler midnight blue (#071124)
    const valleySky = new THREE.Color('#03050a');
    const peakSky = new THREE.Color('#071124');
    const targetSkyColor = valleySky.clone().lerp(peakSky, heightFactor);

    // Adjust for specific zones/tunnels
    if (s.environment.tunnelFactor > 0.1) {
      targetSkyColor.set('#010204'); // Pitch black in tunnel
    } else if (s.environment.zone === 'forest') {
      targetSkyColor.lerp(new THREE.Color('#030c0a'), 0.4); // Deep forest tint
    }

    // Smoothly transition background and fog colors
    scene.background = (scene.background as THREE.Color || new THREE.Color()).lerp(targetSkyColor, 0.05);
    fog.color.copy(scene.background as THREE.Color);

    // 2. Height-based Haze (denser in valleys, sharper at peaks/overlooks)
    let baseDensity = THREE.MathUtils.lerp(0.0038, 0.0016, heightFactor);
    
    // Add zone-specific factors (e.g. forest mist)
    if (s.environment.zone === 'forest') {
      baseDensity += s.environment.fogFactor * 0.0015;
    }
    
    // Fade fog slightly inside tunnels to keep it dark but clear
    const finalDensity = baseDensity * (1.0 - s.environment.tunnelFactor * 0.8);
    fog.density = THREE.MathUtils.lerp(fog.density, finalDensity, 0.05);
  });

  return (
    <>
      <fogExp2 ref={fogRef} attach="fog" args={['#03050a', 0.0038]} />
      <EffectComposer enableNormalPass={false}>
        {/* Subtle Cinematic Edge Vignette to keep text focused */}
        <Vignette eskil={false} offset={0.2} darkness={0.65} />
      </EffectComposer>
    </>
  );
}
