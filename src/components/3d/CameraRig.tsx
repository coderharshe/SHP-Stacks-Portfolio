'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { roadCurve } from './RoadPath';
import { useCameraMotion } from '@/context/CameraMotionContext';

interface CameraRigProps {
  scrollProgressRef: React.RefObject<number>;
}

export function CameraRig({ scrollProgressRef }: CameraRigProps) {
  const { updateCameraPhysics } = useCameraMotion();

  const currentProgress = useRef(0);
  const previousProgress = useRef(0);
  const targetCamPos = useRef(new THREE.Vector3());
  const targetLookAt = useRef(new THREE.Vector3());
  const dirVector = useRef(new THREE.Vector3());

  // Check prefers-reduced-motion
  const isReducedMotion = useRef(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      isReducedMotion.current = mediaQuery.matches;
    }
  }, []);

  useFrame((state, delta) => {
    const { camera } = state;
    if (isReducedMotion.current) {
      // Static overview position for accessibility
      camera.position.set(0, 15, 25);
      camera.lookAt(0, 5, -50);
      return;
    }

    const rawProgress = scrollProgressRef.current || 0;
    
    // Smooth momentum lerp on progress
    currentProgress.current = THREE.MathUtils.lerp(
      currentProgress.current,
      rawProgress,
      Math.min(delta * 15.0, 0.3)
    );

    const p = Math.max(0.001, Math.min(0.99, currentProgress.current));

    // Calculate camera velocity
    const progressDelta = Math.abs(currentProgress.current - previousProgress.current);
    const velocity = Math.min(1.0, progressDelta / Math.max(delta, 0.001) * 2.5);
    previousProgress.current = currentProgress.current;

    // Get point on road spline
    const pointOnRoad = roadCurve.getPointAt(p);
    
    // Camera is elevated slightly above the road like a vehicle/drone camera
    const cameraOffset = new THREE.Vector3(0, 2.2, 0);
    const desiredPos = pointOnRoad.clone().add(cameraOffset);

    // Look-ahead target along curve
    const lookAheadP = Math.min(0.999, p + 0.04);
    const lookAheadPoint = roadCurve.getPointAt(lookAheadP).add(new THREE.Vector3(0, 1.8, 0));

    // Corner banking calculation based on tangent change
    const tangent1 = roadCurve.getTangentAt(p);
    const tangent2 = roadCurve.getTangentAt(Math.min(0.999, p + 0.01));
    const curveCross = tangent1.clone().cross(tangent2);
    const bankAngle = THREE.MathUtils.clamp(curveCross.y * 12.0, -0.15, 0.15);

    // Smoothly update camera vectors
    targetCamPos.current.lerp(desiredPos, 0.08);
    targetLookAt.current.lerp(lookAheadPoint, 0.08);

    camera.position.copy(targetCamPos.current);
    camera.lookAt(targetLookAt.current);
    camera.rotation.z += bankAngle;

    // Compute Pitch (X-rotation) and Yaw (Y-rotation) in degrees
    dirVector.current.subVectors(targetLookAt.current, targetCamPos.current).normalize();
    const yawDeg = THREE.MathUtils.radToDeg(Math.atan2(dirVector.current.x, -dirVector.current.z));
    const pitchDeg = THREE.MathUtils.radToDeg(Math.asin(dirVector.current.y));
    const rollDeg = THREE.MathUtils.clamp(bankAngle * 57.2958, -0.9, 0.9); // max < 1 deg

    // Environment Zone state calculation
    let zone: 'sunrise' | 'forest' | 'alpine' | 'lakeside' | 'sunset' = 'sunrise';
    let tunnelFactor = 0;
    let fogFactor = 0;
    let overlookFactor = 0;
    const sunAngle = 45 + p * 90;
    let lightColor = '#f97316';
    let ambientIntensity = 0.6;

    if (p < 0.2) {
      zone = 'sunrise';
      lightColor = '#f97316';
    } else if (p < 0.45) {
      zone = 'forest';
      lightColor = '#fbbf24';
      fogFactor = THREE.MathUtils.clamp((p - 0.2) / 0.15, 0, 1);
      if (p > 0.3 && p < 0.38) {
        tunnelFactor = THREE.MathUtils.clamp((p - 0.3) / 0.04, 0, 1);
      }
    } else if (p < 0.65) {
      zone = 'alpine';
      lightColor = '#fef08a';
      ambientIntensity = 0.8;
    } else if (p < 0.82) {
      zone = 'lakeside';
      lightColor = '#f97316';
    } else {
      zone = 'sunset';
      lightColor = '#ec4899';
      overlookFactor = THREE.MathUtils.clamp((p - 0.82) / 0.15, 0, 1);
    }

    // Broadcast live camera physics & environment to context
    updateCameraPhysics({
      progress: p,
      velocity,
      camPos: targetCamPos.current,
      lookAt: targetLookAt.current,
      pitch: pitchDeg,
      yaw: yawDeg,
      roll: rollDeg,
      bankAngle,
      environment: {
        zone,
        tunnelFactor,
        fogFactor,
        overlookFactor,
        sunAngle,
        lightColor,
        ambientIntensity
      }
    });
  });

  return null;
}

