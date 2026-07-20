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

    const spotlightColorMap = {
      default: 'rgba(17, 24, 39, 0.03)',
      blue:    'rgba(239, 68, 68, 0.05)',  // Red
      gold:    'rgba(17, 24, 39, 0.05)',   // Dark gray
      purple:  'rgba(17, 24, 39, 0.05)',
      cyan:    'rgba(239, 68, 68, 0.05)',
    };

    const borderGlowMap = {
      default: 'rgba(17, 24, 39, 0.08)',
      blue:    'rgba(239, 68, 68, 0.20)',  // Red border
      gold:    'rgba(17, 24, 39, 0.20)',   // Dark gray border
      purple:  'rgba(17, 24, 39, 0.20)',
      cyan:    'rgba(239, 68, 68, 0.20)',
    };

    return (
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsFocused(true)}
        onMouseLeave={() => setIsFocused(false)}
        className={cn(
          "relative rounded-xl overflow-hidden glass-card transition-all duration-500",
          className
        )}
        {...props}
      >
        {/* Spotlight spotlight overlay */}
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
