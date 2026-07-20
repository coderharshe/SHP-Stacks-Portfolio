"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TIMELINE_PROCESS } from '@/constants/data';
import { Check } from 'lucide-react';
import { CameraReactive } from '@/components/ui/CameraReactive';

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
      className="relative py-24 sm:py-32 border-t border-border overflow-hidden bg-transparent"
    >
      {/* Section background overlay */}
      <div className="absolute inset-0 -z-10" />

      <div className="absolute inset-0 bg-grid-pattern opacity-10 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <CameraReactive depth="hero-title" sectionProgressTarget={0.72}>
          <div className="text-center max-w-3xl mx-auto mb-24 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest font-semibold" style={{ color: '#E8372A' }}>
              DEVELOPMENT PROCESS
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight font-sans" style={{ color: '#F0F1F3' }}>
              How We Build Systems.
            </h2>
            <p className="text-sm sm:text-base leading-relaxed font-bold" style={{ color: '#F0F1F3' }}>
              Our systematic approach ensures all custom software assets are delivered on time, securely configured, and fully verified.
            </p>
          </div>
        </CameraReactive>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          
          {/* Vertical Progress Line (Desktop & Tablet) */}
          <div className="absolute left-[30px] md:left-1/2 top-4 bottom-4 w-[2px] -translate-x-1/2 -z-10" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <motion.div
              style={{
                height: progressLineHeight,
                background: 'linear-gradient(to bottom, #E8372A, rgba(232,55,42,0.30))'
              }}
              className="w-full origin-top rounded-full"
            />
          </div>

          {/* Timeline Nodes */}
          <div className="space-y-20">
            {TIMELINE_PROCESS.map((step, idx) => {
              const nodeTargetProgress = 0.72 + idx * 0.03;
              return (
                <CameraReactive
                  key={step.step}
                  depth="card"
                  tiltOnHover={true}
                  sectionProgressTarget={nodeTargetProgress}
                >
                  <div className="relative flex flex-col md:flex-row items-start md:justify-between glass-card p-6 md:p-8 rounded-2xl">
                    
                    {/* Left Side Content (Desktop: step & duration, Mobile: stacked above) */}
                    <div className="hidden md:flex w-[45%] flex-col items-end text-right pr-12 space-y-1">
                      <span className="text-xs font-mono text-foreground/35 uppercase tracking-widest">
                        STAGE {step.step}
                      </span>
                      <span className="text-sm font-mono text-accent-blue font-medium">
                        {step.duration}
                      </span>
                    </div>

                    <div
                      className="absolute left-[30px] md:left-1/2 top-1.5 h-6 w-6 rounded-full flex items-center justify-center -translate-x-1/2 z-10"
                      style={{
                        border: '1px solid rgba(255,255,255,0.10)',
                        background: '#111318',
                        boxShadow: '0 0 12px rgba(232,55,42,0.15)',
                      }}
                    >
                      <div className="h-2 w-2 rounded-full" style={{ background: '#E8372A' }} />
                    </div>

                      <div className="pl-14 md:pl-0 md:w-[45%] space-y-4">
                        <div className="flex md:hidden items-center gap-3 text-xs font-mono mb-2" style={{ color: '#3D4150' }}>
                          <span style={{ color: '#E8372A', fontWeight: 600 }}>STAGE {step.step}</span>
                          <span>•</span>
                          <span>{step.duration}</span>
                        </div>

                        <div className="space-y-2">
                          <h3 className="text-lg md:text-xl font-semibold tracking-tight" style={{ color: '#F0F1F3' }}>
                            {step.title}
                          </h3>
                          <p className="text-sm leading-relaxed font-bold" style={{ color: '#F0F1F3' }}>
                            {step.desc}
                          </p>
                        </div>

                        <ul className="space-y-2 pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                          {step.details.map((detail, dIdx) => (
                            <li key={dIdx} className="flex items-start gap-2.5 text-xs font-bold leading-relaxed" style={{ color: '#F0F1F3' }}>
                              <Check className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: 'rgba(232,55,42,0.55)' }} />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                  </div>
                </CameraReactive>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
