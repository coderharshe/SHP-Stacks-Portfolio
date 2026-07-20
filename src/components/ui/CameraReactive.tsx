'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useCameraMotion, CameraMotionState } from '@/context/CameraMotionContext';

export type DepthPreset =
  | 'nav'          // Z = 0.2 (Parallax ~3%)
  | 'hero-badge'   // Z = 0.4 (Parallax ~5%)
  | 'hero-title'   // Z = 0.7 (Parallax ~8%)
  | 'paragraph'    // Z = 0.8 (Parallax ~10%)
  | 'button'       // Z = 1.0 (Parallax ~12%)
  | 'card'         // Z = 1.4 (Parallax ~15%)
  | 'landmark'     // Z = 2.0 (Parallax ~20%)
  | number;

interface CameraReactiveProps {
  depth?: DepthPreset;
  tiltOnHover?: boolean;
  sectionProgressTarget?: number;
  revealProgressOffset?: number;
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  as?: React.ElementType;
}

const PRESET_DEPTHS: Record<string, { z: number; parallax: number }> = {
  'nav': { z: 0.2, parallax: 0.03 },
  'hero-badge': { z: 0.4, parallax: 0.05 },
  'hero-title': { z: 0.7, parallax: 0.08 },
  'paragraph': { z: 0.8, parallax: 0.10 },
  'button': { z: 1.0, parallax: 0.12 },
  'card': { z: 1.4, parallax: 0.15 },
  'landmark': { z: 2.0, parallax: 0.20 },
};

export const CameraReactive: React.FC<CameraReactiveProps> = ({
  depth = 'button',
  tiltOnHover = false,
  sectionProgressTarget,
  revealProgressOffset,
  className = '',
  children,
  style = {},
  as: Component = 'div'
}) => {
  const containerRef = useRef<HTMLElement | null>(null);
  const { subscribe, isReducedMotion } = useCameraMotion();

  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0, active: false });
  const [dynamicTarget, setDynamicTarget] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (typeof window === 'undefined' || sectionProgressTarget === undefined || sectionProgressTarget === 0.0) return;
    const calculateTarget = () => {
      const el = containerRef.current;
      if (!el) return;
      const section = el.closest('section') || el;
      const rect = section.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const sectionTop = rect.top + scrollTop;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const maxScroll = docHeight - winHeight;
      if (maxScroll <= 0) return;
      const sectionCenter = sectionTop + section.offsetHeight / 2;
      const targetScroll = sectionCenter - winHeight / 2;
      const targetProgress = Math.max(0, Math.min(1, targetScroll / maxScroll));
      setDynamicTarget(targetProgress);
    };
    calculateTarget();
    const timer1 = setTimeout(calculateTarget, 100);
    const timer2 = setTimeout(calculateTarget, 500);
    window.addEventListener('resize', calculateTarget, { passive: true });
    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(calculateTarget);
      resizeObserver.observe(document.body);
    }
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener('resize', calculateTarget);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [sectionProgressTarget]);

  const baseTarget = dynamicTarget !== undefined ? dynamicTarget : sectionProgressTarget;
  const elementTarget = baseTarget !== undefined
    ? (revealProgressOffset !== undefined ? baseTarget + revealProgressOffset : baseTarget)
    : undefined;

  let zDepth = 1.0;
  let parallaxFactor = 0.12;

  if (typeof depth === 'number') {
    zDepth = depth;
    parallaxFactor = depth * 0.1;
  } else if (PRESET_DEPTHS[depth]) {
    zDepth = PRESET_DEPTHS[depth].z;
    parallaxFactor = PRESET_DEPTHS[depth].parallax;
  }

  useEffect(() => {
    if (isReducedMotion) return;

    const unsubscribe = subscribe((state: CameraMotionState) => {
      const el = containerRef.current;
      if (!el) return;

      const { pitch, yaw, roll, progress, velocity } = state;

      const shiftX = Math.max(-12, Math.min(12, -yaw * zDepth * 0.35));
      const shiftY = Math.max(-12, Math.min(12, pitch * zDepth * 0.25));
      const bankRotate = Math.max(-0.9, Math.min(0.9, -roll * zDepth * 0.7));
      const pitchRotate = Math.max(-0.9, Math.min(0.9, pitch * zDepth * 0.15));
      const yawRotate = Math.max(-0.9, Math.min(0.9, -yaw * zDepth * 0.15));

      const parallaxY = -(progress * 60 * parallaxFactor);

      let emergenceY = 0;
      let emergenceBlur = 0;
      let emergenceOpacity = 1;

      if (elementTarget !== undefined && baseTarget !== undefined) {
        if (elementTarget === 0.0) {
          if (progress > 0.15) {
            const t = Math.max(0, 1 - (progress - 0.15) / 0.08);
            emergenceOpacity = t;
          }
        } else {
          let revealStart = elementTarget - 0.15;
          let revealEnd = elementTarget - 0.05;

          if (typeof depth === 'string') {
            if (depth === 'hero-title' || depth === 'hero-badge') {
              revealStart = elementTarget - 0.20;
              revealEnd = elementTarget - 0.10;
            } else if (depth === 'paragraph') {
              revealStart = elementTarget - 0.17;
              revealEnd = elementTarget - 0.07;
            } else if (depth === 'card' || depth === 'landmark') {
              revealStart = elementTarget - 0.14;
              revealEnd = elementTarget - 0.04;
            } else if (depth === 'button') {
              revealStart = elementTarget - 0.10;
              revealEnd = elementTarget - 0.01;
            }
          }

          const fadeOutThreshold = Math.max(baseTarget + 0.25, elementTarget + 0.20);

          if (progress < revealStart) {
            emergenceOpacity = 0;
            emergenceY = 20;
            emergenceBlur = 4;
          } else if (progress < revealEnd) {
            const t = (progress - revealStart) / (revealEnd - revealStart);
            emergenceOpacity = t;
            emergenceY = (1 - t) * 18;
            emergenceBlur = (1 - t) * 3;
          } else if (progress <= fadeOutThreshold) {
            emergenceOpacity = 1;
            emergenceY = 0;
            emergenceBlur = 0;
          } else {
            const t = Math.max(0, 1 - (progress - fadeOutThreshold) / 0.10);
            emergenceOpacity = t;
            emergenceY = 0;
            emergenceBlur = 0;
          }
        }
      }

      let hoverZ = 0;
      let hoverRotX = 0;
      let hoverRotY = 0;

      if (hoverPos.active && tiltOnHover) {
        hoverZ = 8;
        hoverRotX = -hoverPos.y * 6;
        hoverRotY = hoverPos.x * 6;
      }

      const totalX = shiftX;
      const totalY = shiftY + parallaxY + emergenceY;
      const totalZ = hoverZ;
      const totalRotX = pitchRotate + hoverRotX;
      const totalRotY = yawRotate + hoverRotY;
      const totalRotZ = bankRotate;

      el.style.transform = `perspective(1000px) translate3d(${totalX.toFixed(2)}px, ${totalY.toFixed(2)}px, ${totalZ.toFixed(2)}px) rotateX(${totalRotX.toFixed(2)}deg) rotateY(${totalRotY.toFixed(2)}deg) rotateZ(${totalRotZ.toFixed(2)}deg)`;
      el.style.opacity = `${emergenceOpacity.toFixed(2)}`;
      
      if (emergenceBlur > 0.1) {
        el.style.filter = `blur(${emergenceBlur.toFixed(1)}px)`;
      } else {
        el.style.filter = 'none';
      }
    });

    return () => unsubscribe();
  }, [subscribe, isReducedMotion, zDepth, parallaxFactor, baseTarget, elementTarget, hoverPos, tiltOnHover]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!tiltOnHover || isReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setHoverPos({ x, y, active: true });
  };

  const handleMouseLeave = () => {
    if (!tiltOnHover) return;
    setHoverPos({ x: 0, y: 0, active: false });
  };

  return (
    <div
      ref={(node: HTMLDivElement | null) => {
        containerRef.current = node;
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`will-change-transform ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        // Default visible — subscriber overrides when scroll position warrants hiding
        opacity: 1,
        filter: 'none',
        ...style
      }}
    >
      {children}
    </div>
  );
};
