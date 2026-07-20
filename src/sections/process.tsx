"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TIMELINE_PROCESS } from '@/constants/data';
import { Check } from 'lucide-react';

export const Process: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll position of the timeline container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Transform scroll progress to height percentage
  const progressLineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section 
      id="process" 
      ref={containerRef} 
      className="relative py-24 sm:py-32 border-t border-border overflow-hidden bg-[#2A2B2A]"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-10 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-24 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-accent-blue font-semibold">
            DEVELOPMENT PROCESS
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-sans">
            How We Build Systems.
          </h2>
          <p className="text-sm sm:text-base text-foreground/50 leading-relaxed font-light">
            Our systematic approach ensures all custom software assets are delivered on time, securely configured, and fully verified.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          
          {/* Vertical Progress Line (Desktop & Tablet) */}
          <div className="absolute left-[30px] md:left-1/2 top-4 bottom-4 w-[2px] bg-white/10 -translate-x-1/2 -z-10">
            <motion.div 
              style={{ height: progressLineHeight }}
              className="w-full bg-gradient-to-b from-accent-blue via-accent-purple to-accent-cyan origin-top rounded-full"
            />
          </div>

          {/* Timeline Nodes */}
          <div className="space-y-20">
            {TIMELINE_PROCESS.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div 
                  key={step.step}
                  className="relative flex flex-col md:flex-row items-start md:justify-between"
                >
                  
                  {/* Left Side Content (Desktop: step & duration, Mobile: stacked above) */}
                  <div className="hidden md:flex w-[45%] flex-col items-end text-right pr-12 space-y-1">
                    <span className="text-xs font-mono text-foreground/35 uppercase tracking-widest">
                      STAGE {step.step}
                    </span>
                    <span className="text-sm font-mono text-accent-blue font-medium">
                      {step.duration}
                    </span>
                  </div>

                  {/* Center Node Bullet */}
                  <div className="absolute left-[30px] md:left-1/2 top-1.5 h-6.5 w-6.5 rounded-full border border-border bg-neutral-900 flex items-center justify-center -translate-x-1/2 z-10 shadow-lg">
                    <div className="h-2 w-2 rounded-full bg-accent-blue" />
                  </div>

                  {/* Right Side / Content Card (Mobile: offsets from left line, Desktop: left or right depending on parity) */}
                  <div className="pl-14 md:pl-0 md:w-[45%] space-y-4">
                    {/* Mobile Stage Badge */}
                    <div className="flex md:hidden items-center gap-3 text-xs font-mono text-foreground/40 mb-2">
                      <span className="text-accent-blue font-semibold">STAGE {step.step}</span>
                      <span>•</span>
                      <span>{step.duration}</span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg md:text-xl font-semibold text-white tracking-tight">
                        {step.title}
                      </h3>
                      <p className="text-sm text-foreground/50 leading-relaxed font-light">
                        {step.desc}
                      </p>
                    </div>

                    {/* Bullet Specs List */}
                    <ul className="space-y-2 pt-2 border-t border-white/5">
                      {step.details.map((detail, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2.5 text-xs text-foreground/75 font-light leading-relaxed">
                          <Check className="h-4 w-4 text-accent-blue/60 flex-shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
