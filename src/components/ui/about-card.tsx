"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

export interface AboutCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  accentColor?: string;
  isActive?: boolean;
  index?: number;
  style?: React.CSSProperties;
}

export const AboutCard = React.forwardRef<HTMLElement, AboutCardProps>(
  ({ title, description, icon: Icon, isActive = false, index = 0, style }, ref) => {
    return (
      <article
        ref={ref as React.Ref<HTMLElement>}
        aria-label={`About card ${index + 1}: ${title}`}
        style={{
          transformStyle: "preserve-3d",
          transform: isActive
            ? "perspective(1000px) translate3d(0, 0, 0px) rotateY(0deg) scale(1)"
            : "perspective(1000px) translate3d(0, 0, -40px) rotateY(4deg) scale(0.92)",
          borderColor: isActive ? 'rgba(232,55,42,0.25)' : 'rgba(255,255,255,0.06)',
          ...style
        }}
        className={cn(
          "relative flex flex-col gap-6 rounded-2xl border p-8 md:p-10",
          "w-[min(80vw,360px)] flex-shrink-0",
          "glass-card",
          "transition-all duration-300 ease-out",
          isActive
            ? "opacity-100 shadow-[0_8px_40px_rgba(0,0,0,0.4)]"
            : "opacity-35 shadow-none",
        )}
      >
        {/* Icon badge */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center border transition-colors duration-300"
          style={{
            borderColor: isActive ? 'rgba(232,55,42,0.25)' : 'rgba(255,255,255,0.07)',
            background: isActive ? 'rgba(232,55,42,0.07)' : 'rgba(255,255,255,0.03)',
          }}
        >
          <Icon
            className="h-5 w-5 transition-colors duration-300"
            style={{ color: isActive ? '#E8372A' : '#3D4150' }}
            aria-hidden="true"
          />
        </div>

        {/* Text content */}
        <div className="space-y-3 flex-1">
          <h3 className="text-lg font-semibold tracking-tight" style={{ color: '#F0F1F3' }}>
            {title}
          </h3>
          <p className="text-sm leading-relaxed font-bold" style={{ color: '#F0F1F3' }}>
            {description}
          </p>
        </div>

        {/* Active accent underline */}
        <div
          className="absolute bottom-0 left-8 right-8 h-[2px] rounded-full transition-all duration-300"
          style={{
            background: isActive ? '#E8372A' : 'transparent',
            opacity: isActive ? 1 : 0,
          }}
          aria-hidden="true"
        />
      </article>
    );
  }
);

AboutCard.displayName = "AboutCard";
