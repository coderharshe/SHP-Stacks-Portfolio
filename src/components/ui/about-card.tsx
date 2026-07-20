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
        style={style}
        className={cn(
          "relative flex flex-col gap-5 p-8 md:p-10 rounded-3xl backdrop-blur-md",
          "w-[min(80vw,360px)] flex-shrink-0",
          "transition-all duration-300 ease-out",
          isActive 
            ? "bg-white/[0.05] border border-[#FF5C00]/40 shadow-[0_0_35px_rgba(255,92,0,0.20),inset_0_0_15px_rgba(255,92,0,0.08)]"
            : "bg-black/20 border border-white/[0.03]"
        )}
      >
        {/* Orange glow behind active card */}
        {isActive && (
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none -z-10"
            style={{
              background: 'radial-gradient(ellipse 90% 90% at 50% 50%, rgba(255,92,0,0.18) 0%, rgba(255,92,0,0.04) 60%, transparent 80%)',
            }}
            aria-hidden="true"
          />
        )}

        {/* Icon with orange ring */}
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300"
          style={{
            background: isActive
              ? 'linear-gradient(135deg, rgba(255,92,0,0.30) 0%, rgba(255,107,0,0.18) 100%)'
              : 'rgba(255,255,255,0.04)',
            boxShadow: isActive ? '0 0 24px rgba(255,92,0,0.35)' : 'none',
            border: isActive ? '1px solid rgba(255,92,0,0.40)' : '1px solid rgba(255,255,255,0.05)',
          }}
        >
          <Icon
            className="h-6 w-6 transition-colors duration-300"
            style={{ color: isActive ? '#FF5C00' : 'rgba(255,255,255,0.35)' }}
            aria-hidden="true"
          />
        </div>

        {/* Orange active bar */}
        <div
          className="h-0.5 rounded-full transition-all duration-500"
          style={{
            background: isActive
              ? 'linear-gradient(90deg, #FF5C00, #FF8C00)'
              : 'rgba(255,255,255,0.08)',
            width: isActive ? '2.5rem' : '1rem',
          }}
          aria-hidden="true"
        />

        {/* Text content */}
        <div className="space-y-2.5 flex-1">
          <h3
            className="text-xl font-bold tracking-tight transition-all duration-300"
            style={{
              color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.4)',
            }}
          >
            {title}
          </h3>
          <p
            className="text-base leading-relaxed transition-colors duration-300"
            style={{ color: isActive ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.28)' }}
          >
            {description}
          </p>
        </div>

        {/* Subtle bottom separator line */}
        <div
          className="absolute bottom-0 left-8 right-8 h-px transition-all duration-300"
          style={{
            background: isActive
              ? 'linear-gradient(90deg, transparent, rgba(255,92,0,0.5), transparent)'
              : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)',
          }}
          aria-hidden="true"
        />
      </article>
    );
  }
);

AboutCard.displayName = "AboutCard";

