"use client";

import React, { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
  glowColor?: 'blue' | 'gold' | 'purple' | 'cyan' | 'default';
  noPad?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, glow = true, glowColor = 'default', noPad = false, ...props }, ref) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const [isFocused, setIsFocused] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    // Dark-system spotlight map — subtle, not garish
    const spotlightColorMap = {
      default: 'rgba(255,255,255,0.03)',
      blue:    'rgba(232,55,42,0.06)',   // Red glow on dark
      gold:    'rgba(168,172,186,0.04)',
      purple:  'rgba(232,55,42,0.05)',
      cyan:    'rgba(232,55,42,0.06)',
    };

    const borderGlowMap = {
      default: 'rgba(255,255,255,0.06)',
      blue:    'rgba(232,55,42,0.20)',
      gold:    'rgba(168,172,186,0.12)',
      purple:  'rgba(232,55,42,0.18)',
      cyan:    'rgba(232,55,42,0.20)',
    };

    return (
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsFocused(true)}
        onMouseLeave={() => setIsFocused(false)}
        className={cn(
          "relative rounded-xl overflow-hidden glass-card bg-[#12151E]/95 border border-[rgba(255,255,255,0.12)] shadow-xl transition-all duration-500",
          className
        )}
        {...props}
      >
        {/* Cursor spotlight overlay */}
        {glow && isFocused && (
          <>
            <div
              className="pointer-events-none absolute inset-0 rounded-xl transition duration-300"
              style={{
                background: `radial-gradient(380px circle at ${coords.x}px ${coords.y}px, ${spotlightColorMap[glowColor]}, transparent 80%)`,
              }}
            />
            <div
              className="pointer-events-none absolute -inset-px rounded-xl transition duration-300"
              style={{
                background: `radial-gradient(380px circle at ${coords.x}px ${coords.y}px, ${borderGlowMap[glowColor]}, transparent 80%)`,
              }}
            />
          </>
        )}

        <div className={cn("relative z-10 h-full flex flex-col", !noPad && "p-6")}>
          {children}
        </div>
      </div>
    );
  }
);

Card.displayName = 'Card';
