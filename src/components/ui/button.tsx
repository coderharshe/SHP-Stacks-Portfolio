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

          // ── Primary: Red ──
          variant === 'primary' &&
            "bg-[#EF4444] text-white hover:bg-[#dc2626] border border-[#EF4444]/80 shadow-[0_4px_24px_rgba(239,68,68,0.3)]",

          // ── Secondary: White card ──
          variant === 'secondary' &&
            "bg-[#FFFFFF] text-[#111827] hover:bg-gray-50 border border-[#111827]/10",

          // ── Outline: Dark border ──
          variant === 'outline' &&
            "bg-transparent text-[#111827] border border-[#111827]/20 hover:bg-[#111827]/05 hover:border-[#111827]/40",

          // ── Ghost ──
          variant === 'ghost' &&
            "bg-transparent text-[#111827]/70 hover:text-[#111827] hover:bg-[#111827]/05",

          className
        )}
        {...props}
      >
        {/* Red glow for primary */}
        {glow && variant === 'primary' && (
          <span className="absolute inset-0 -z-10 block rounded-lg bg-[#EF4444] opacity-50 blur-xl transition-opacity duration-300 hover:opacity-70" />
        )}

        {/* Subtle shadow glow for secondary */}
        {glow && variant === 'secondary' && (
          <span className="absolute inset-0 -z-10 block rounded-lg bg-[#111827] opacity-5 blur-xl transition-opacity duration-300 hover:opacity-10" />
        )}

        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
      </button>
    );
  }
);

Button.displayName = 'Button';
