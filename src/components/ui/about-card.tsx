"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

export interface AboutCardProps {
  title: string;
  description: React.ReactNode;
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
          borderColor: isActive ? 'rgba(252,97,0,0.8)' : 'rgba(43,22,10,0.9)',
          ...style
        }}
        className={cn(
          "relative flex flex-col gap-6 rounded-2xl p-8 md:p-10",
          "w-[min(80vw,360px)] flex-shrink-0",
          "wood-tray-card",
          isActive && "active",
          "transition-all duration-300 ease-out",
          isActive ? "opacity-100" : "opacity-45"
        )}
      >
        {/* Icon badge */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center border transition-colors duration-300"
          style={{
            borderColor: isActive ? 'rgba(252,97,0,0.4)' : 'rgba(255,255,255,0.08)',
            background: isActive ? 'rgba(252,97,0,0.15)' : 'rgba(255,255,255,0.03)',
          }}
        >
          <Icon
            className="h-5 w-5 transition-colors duration-300"
            style={{ color: isActive ? 'var(--blaze-orange)' : '#7D6A5E' }}
            aria-hidden="true"
          />
        </div>

        {/* Text content */}
        <div className="space-y-3 flex-1">
          <h3 
            className="text-lg font-bold tracking-tight transition-all duration-300" 
            style={{ 
              color: isActive ? 'var(--vanilla-custard)' : '#F5EFEB',
              textShadow: '0 2px 4px rgba(0,0,0,0.5)'
            }}
          >
            {title}
          </h3>
          <p 
            className="text-sm leading-relaxed font-light transition-colors duration-300" 
            style={{ color: isActive ? '#DED4CC' : '#A3958C' }}
          >
            {description}
          </p>
        </div>

        {/* Active accent underline */}
        <div
          className="absolute bottom-0 left-8 right-8 h-[2.5px] rounded-full transition-all duration-300"
          style={{
            background: 'linear-gradient(90deg, var(--blaze-orange), var(--vanilla-custard))',
            opacity: isActive ? 1 : 0
          }}
          aria-hidden="true"
        />
      </article>
    );
  }
);

AboutCard.displayName = "AboutCard";
