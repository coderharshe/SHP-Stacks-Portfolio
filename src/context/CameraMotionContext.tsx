'use client';

import React, { createContext, useContext, useRef, useEffect, useState, ReactNode } from 'react';
import * as THREE from 'three';

export interface CameraMotionState {
  progress: number;
  velocity: number;
  camPos: THREE.Vector3;
  lookAt: THREE.Vector3;
  pitch: number;    // degrees
  yaw: number;      // degrees
  roll: number;     // degrees (bank angle)
  bankAngle: number;// radians
  environment: {
    zone: 'sunrise' | 'forest' | 'alpine' | 'lakeside' | 'sunset';
    tunnelFactor: number;  // 0..1
    fogFactor: number;     // 0..1
    overlookFactor: number;// 0..1
    sunAngle: number;      // degrees
    lightColor: string;
    ambientIntensity: number;
  };
  isReducedMotion: boolean;
}

const defaultState: CameraMotionState = {
  progress: 0,
  velocity: 0,
  camPos: new THREE.Vector3(0, 4, 0),
  lookAt: new THREE.Vector3(0, 4, -10),
  pitch: 0,
  yaw: 0,
  roll: 0,
  bankAngle: 0,
  environment: {
    zone: 'sunrise',
    tunnelFactor: 0,
    fogFactor: 0,
    overlookFactor: 0,
    sunAngle: 45,
    lightColor: '#f97316',
    ambientIntensity: 0.6
  },
  isReducedMotion: false
};

interface CameraMotionContextType {
  stateRef: React.MutableRefObject<CameraMotionState>;
  subscribe: (callback: (state: CameraMotionState) => void) => () => void;
  updateCameraPhysics: (newState: Partial<CameraMotionState>) => void;
  isReducedMotion: boolean;
}

const CameraMotionContext = createContext<CameraMotionContextType | null>(null);

export const CameraMotionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const stateRef = useRef<CameraMotionState>({ ...defaultState });
  const subscribersRef = useRef<Set<(state: CameraMotionState) => void>>(new Set());
  const [isReducedMotion, setIsReducedMotion] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      stateRef.current.isReducedMotion = mediaQuery.matches;

      const handleChange = (e: MediaQueryListEvent) => {
        setIsReducedMotion(e.matches);
        stateRef.current.isReducedMotion = e.matches;
      };
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  const updateCameraPhysics = (newState: Partial<CameraMotionState>) => {
    const s = stateRef.current;
    
    if (newState.progress !== undefined) s.progress = newState.progress;
    if (newState.velocity !== undefined) s.velocity = newState.velocity;
    if (newState.camPos !== undefined) s.camPos.copy(newState.camPos);
    if (newState.lookAt !== undefined) s.lookAt.copy(newState.lookAt);
    if (newState.pitch !== undefined) s.pitch = newState.pitch;
    if (newState.yaw !== undefined) s.yaw = newState.yaw;
    if (newState.roll !== undefined) s.roll = newState.roll;
    if (newState.bankAngle !== undefined) s.bankAngle = newState.bankAngle;
    if (newState.environment !== undefined) {
      s.environment = { ...s.environment, ...newState.environment };
    }

    // Direct CSS variable updates on document root for high performance glass/shadow response
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      
      // Yaw/Pitch/Roll CSS variables
      const yawShift = -s.yaw * 1.5; // px
      const pitchShift = s.pitch * 1.2; // px
      const bankRoll = -s.roll; // deg (capped)

      root.style.setProperty('--cam-yaw-shift', `${yawShift.toFixed(2)}px`);
      root.style.setProperty('--cam-pitch-shift', `${pitchShift.toFixed(2)}px`);
      root.style.setProperty('--cam-bank-roll', `${bankRoll.toFixed(2)}deg`);
      root.style.setProperty('--cam-progress', `${s.progress.toFixed(4)}`);
      root.style.setProperty('--cam-velocity', `${s.velocity.toFixed(4)}`);

      // Environment lighting & glass reflection custom variables
      const { zone, tunnelFactor, fogFactor, sunAngle, lightColor } = s.environment;

      // Sun angle driven shadow translation
      const shadowX = Math.sin((sunAngle * Math.PI) / 180) * 10;
      const shadowY = Math.cos((sunAngle * Math.PI) / 180) * 10;
      root.style.setProperty('--ui-shadow-x', `${shadowX.toFixed(2)}px`);
      root.style.setProperty('--ui-shadow-y', `${shadowY.toFixed(2)}px`);
      root.style.setProperty('--ui-light-color', lightColor);

      // Tunnel darkens glass; Sunset adds warm highlights; Fog softens
      if (tunnelFactor > 0.3) {
        root.style.setProperty('--ui-glass-bg', 'rgba(10, 15, 25, 0.88)');
        root.style.setProperty('--ui-glass-border', 'rgba(255, 255, 255, 0.08)');
        root.style.setProperty('--ui-glass-reflection', 'linear-gradient(135deg, rgba(255,255,255,0.05), transparent)');
      } else if (zone === 'sunset') {
        root.style.setProperty('--ui-glass-bg', 'rgba(24, 15, 28, 0.75)');
        root.style.setProperty('--ui-glass-border', 'rgba(236, 72, 153, 0.3)');
        root.style.setProperty('--ui-glass-reflection', 'linear-gradient(135deg, rgba(251, 146, 60, 0.25), rgba(236, 72, 153, 0.1))');
      } else if (zone === 'forest') {
        root.style.setProperty('--ui-glass-bg', 'rgba(12, 24, 22, 0.75)');
        root.style.setProperty('--ui-glass-border', 'rgba(16, 185, 129, 0.25)');
        root.style.setProperty('--ui-glass-reflection', 'linear-gradient(135deg, rgba(52, 211, 153, 0.2), rgba(6, 182, 212, 0.1))');
      } else {
        // Sunrise / Alpine / Morning — dynamic cool blue moonlight reflections
        root.style.setProperty('--ui-glass-bg', 'rgba(10, 20, 32, 0.45)');
        root.style.setProperty('--ui-glass-border', 'rgba(186, 230, 253, 0.25)');
        root.style.setProperty('--ui-glass-reflection', 'linear-gradient(135deg, rgba(186, 230, 253, 0.16) 0%, rgba(255, 255, 255, 0.02) 60%, transparent 100%)');
      }

      root.style.setProperty('--ui-fog-blur', `${(fogFactor * 8).toFixed(1)}px`);
    }

    // Notify subscribers
    subscribersRef.current.forEach((cb) => cb(s));
  };

  const subscribe = (callback: (state: CameraMotionState) => void) => {
    subscribersRef.current.add(callback);
    return () => subscribersRef.current.delete(callback);
  };

  return (
    <CameraMotionContext.Provider
      value={{
        stateRef,
        subscribe,
        updateCameraPhysics,
        isReducedMotion
      }}
    >
      {children}
    </CameraMotionContext.Provider>
  );
};

export const useCameraMotion = () => {
  const context = useContext(CameraMotionContext);
  if (!context) {
    throw new Error('useCameraMotion must be used within a CameraMotionProvider');
  }
  return context;
};
