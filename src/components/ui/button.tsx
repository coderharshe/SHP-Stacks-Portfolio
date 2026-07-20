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
          "relative inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium transition-all duration-200 active:scale-[0.97] cursor-pointer overflow-hidden focus:outline-none",

          // ── Primary: SHP Red ──
          variant === 'primary' &&
            "bg-[#E8372A] text-white hover:bg-[#F04438] active:bg-[#C42F22] border border-[#E8372A]/60 shadow-[0_4px_20px_rgba(232,55,42,0.25)]",

          // ── Secondary: Dark glass ──
          variant === 'secondary' &&
            "bg-[rgba(255,255,255,0.06)] text-[#F0F1F3] hover:bg-[rgba(255,255,255,0.09)] border border-[rgba(255,255,255,0.10)]",

          // ── Outline: Hairline border ──
          variant === 'outline' &&
            "bg-transparent text-[#A8ACBA] border border-[rgba(255,255,255,0.12)] hover:border-[rgba(255,255,255,0.22)] hover:text-[#F0F1F3]",

          // ── Ghost ──
          variant === 'ghost' &&
            "bg-transparent text-[#6B7080] hover:text-[#F0F1F3] hover:bg-[rgba(255,255,255,0.04)]",

          className
        )}
        {...props}
      >
        {/* Red ambient glow for primary */}
        {glow && variant === 'primary' && (
          <span className="absolute inset-0 -z-10 block rounded-lg bg-[#E8372A] opacity-40 blur-xl transition-opacity duration-300 hover:opacity-60" />
        )}

        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
      </button>
    );
  }
);

Button.displayName = 'Button';
