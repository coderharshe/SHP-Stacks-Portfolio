'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollController } from './ScrollController';
import { GalaxySceneContents } from './GalaxySceneContents';

export function Scene() {
  const scrollProgressRef = useRef<number>(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const frameId = requestAnimationFrame(() => setIsMounted(true));
    return () => cancelAnimationFrame(frameId);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <ScrollController scrollProgressRef={scrollProgressRef}>
      {/* 3D Fixed Background Canvas — Galaxy */}
      <div className="fixed inset-0 w-full h-full -z-20 pointer-events-none overflow-hidden">
        <Canvas
          camera={{ position: [0, 40, 350], fov: 75, near: 0.1, far: 1200 }}
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance',
          }}
        >
          <GalaxySceneContents scrollProgressRef={scrollProgressRef} />
        </Canvas>
      </div>
    </ScrollController>
  );
}

export default Scene;
