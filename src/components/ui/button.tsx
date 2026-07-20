"use client";

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  glow?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant = 'primary', glow = false, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium transition-all duration-300 active:scale-[0.97] cursor-pointer overflow-hidden focus:outline-none",

          // ── Primary: Royal Blue ──
          variant === 'primary' &&
            "bg-[#3454D1] text-white hover:bg-[#2c47b8] border border-[#3454D1]/80 shadow-[0_4px_24px_rgba(52,84,209,0.3)]",

          // ── Secondary: Gold-tinted card ──
          variant === 'secondary' &&
            "bg-[#1E1F1E] text-[#F1FFFA] hover:bg-[#252625] border border-[#F1FFFA]/08",

          // ── Outline: Mint border ──
          variant === 'outline' &&
            "bg-transparent text-[#F1FFFA] border border-[#F1FFFA]/15 hover:bg-[#F1FFFA]/05 hover:border-[#F1FFFA]/30",

          // ── Ghost ──
          variant === 'ghost' &&
            "bg-transparent text-[#F1FFFA]/70 hover:text-[#F1FFFA] hover:bg-[#F1FFFA]/05",

          className
        )}
        {...props}
      >
        {/* Blue glow for primary */}
        {glow && variant === 'primary' && (
          <span className="absolute inset-0 -z-10 block rounded-lg bg-[#3454D1] opacity-50 blur-xl transition-opacity duration-300 hover:opacity-70" />
        )}

        {/* Gold glow for secondary */}
        {glow && variant === 'secondary' && (
          <span className="absolute inset-0 -z-10 block rounded-lg bg-[#B79E36] opacity-20 blur-xl transition-opacity duration-300 hover:opacity-40" />
        )}

        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
      </button>
    );
  }
);

Button.displayName = 'Button';
