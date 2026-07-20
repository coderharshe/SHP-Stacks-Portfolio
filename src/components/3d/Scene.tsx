'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { CameraRig } from './CameraRig';
import { Lighting } from './Lighting';
import { Fog } from './Fog';
import { Road } from './Road';
import { Mountains } from './Mountains';
import { Environment } from './Environment';
import { Clouds } from './Clouds';
import { Birds } from './Birds';
import { ScrollController } from './ScrollController';

export function Scene() {
  const scrollProgressRef = useRef<number>(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <ScrollController scrollProgressRef={scrollProgressRef}>
      {/* 3D Fixed Background Canvas */}
      <div className="fixed inset-0 w-full h-full -z-20 pointer-events-none overflow-hidden">
        <Canvas
          shadows
          camera={{ position: [0, 4, 0], fov: 60, near: 0.1, far: 800 }}
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance'
          }}
        >
          <color attach="background" args={['#090d16']} />
          <CameraRig scrollProgressRef={scrollProgressRef} />
          <Lighting scrollProgressRef={scrollProgressRef} />
          <Fog scrollProgressRef={scrollProgressRef} />
          <Road />
          <Mountains />
          <Environment />
          <Clouds />
          <Birds />
        </Canvas>
      </div>
    </ScrollController>
  );
}

export default Scene;
