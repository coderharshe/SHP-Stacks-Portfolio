"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { TEAM_MEMBERS } from '@/constants/data';
import { Card } from '@/components/ui/card';
import { Shield, Sparkles, Terminal } from 'lucide-react';

export const Team: React.FC = () => {
  const icons = [Sparkles, Terminal, Shield];
  const glowColors = ['blue' as const, 'purple' as const, 'cyan' as const];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <section id="team" className="relative py-24 sm:py-32 border-t border-border overflow-hidden bg-[#2A2B2A]">
      {/* Decorative Blob */}
      <div className="absolute top-[40%] left-[10%] h-[300px] w-[300px] rounded-full bg-accent-blue/5 blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-accent-purple font-semibold">
            THE TEAM
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-sans">
            Our Founding Engineers.
          </h2>
          <p className="text-sm sm:text-base text-foreground/50 leading-relaxed font-light">
            We are hands-on developers and architects who design systems and manage pipelines directly, ensuring maximum delivery quality.
          </p>
        </div>

        {/* Founders Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-5%" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {TEAM_MEMBERS.map((member, idx) => {
            const IconComponent = icons[idx] || Terminal;
            const glowColor = glowColors[idx] || 'default';
            return (
              <motion.div key={member.name} variants={cardVariants} className="group">
                <Card 
                  glowColor={glowColor}
                  className="p-6 md:p-8 h-full flex flex-col justify-between border-white/5 hover:border-white/10"
                >
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl border border-border bg-white/2 flex items-center justify-center group-hover:border-white/12 transition-colors">
                        <IconComponent className="h-5 w-5 text-white/80" />
                      </div>
                      <div className="space-y-0.5">
                        <h3 className="text-lg font-bold text-white tracking-tight">
                          {member.name}
                        </h3>
                        <p className="text-xs font-mono text-foreground/40 font-medium">
                          {member.role}
                        </p>
                      </div>
                    </div>

                    {/* Bio */}
                    <p className="text-xs sm:text-sm text-foreground/50 leading-relaxed font-light">
                      {member.bio}
                    </p>

                    {/* Focus Skills */}
                    <div className="space-y-2.5 pt-4 border-t border-white/5">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-white/35 block">
                        Technical Focus
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {member.focus.map((skill, sIdx) => (
                          <span 
                            key={sIdx}
                            className="text-[9px] font-mono bg-white/5 border border-white/5 text-foreground/75 px-2 py-0.5 rounded-md"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Available indicator */}
                  <div className="mt-8 flex items-center gap-2 text-[9px] font-mono text-white/40">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>ACTIVE ON PROJECTS</span>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
