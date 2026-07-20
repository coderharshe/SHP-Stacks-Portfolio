"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Eye, ShieldCheck, Cpu } from 'lucide-react';
import { Card } from '@/components/ui/card';

export const About: React.FC = () => {
  const cards = [
    {
      title: 'Our Mission',
      desc: 'To build software assets that drive business equity. We solve hard problems with structured, reliable, and clean solutions.',
      icon: Cpu,
      color: 'blue' as const,
    },
    {
      title: 'Our Vision',
      desc: 'To establish the engineering benchmark for software development, helping enterprises transition into AI-driven operational efficiency.',
      icon: Eye,
      color: 'purple' as const,
    },
    {
      title: 'Engineering Philosophy',
      desc: 'No shortcut frameworks. We utilize strong static typing, server-side caching, secure authorization models, and modular architecture.',
      icon: ShieldCheck,
      color: 'cyan' as const,
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <section id="about" className="relative py-24 sm:py-32 border-t border-border overflow-hidden" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2500&auto=format&fit=crop')", backgroundSize: 'cover', backgroundAttachment: 'fixed', backgroundPosition: 'center' }}>
      {/* Parallax Overlay */}
      <div className="absolute inset-0 bg-[#F8FAF9]/90 -z-10" />

      <div className="absolute inset-0 bg-transparent -z-20" />
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 h-[300px] w-[500px] rounded-full bg-accent-blue/5 blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-12 items-start"
        >
          {/* Text Section */}
          <div className="lg:col-span-2 space-y-6">
            <motion.span 
              variants={textVariants}
              className="text-xs font-mono uppercase tracking-widest text-accent-blue font-semibold"
            >
              ABOUT SHP STACKS
            </motion.span>
            <motion.h2 
              variants={textVariants}
              className="text-3xl sm:text-4xl font-bold tracking-tight text-[#111827] font-sans"
            >
              We Build Software That Scales Businesses.
            </motion.h2>
            <motion.p 
              variants={textVariants}
              className="text-sm sm:text-base text-foreground/50 leading-relaxed font-light"
            >
              SHP Stacks is a premium software development firm. We partner with ambitious enterprises and scaling SaaS companies to build mission-critical digital products, internal operations platforms, and AI-enabled systems.
            </motion.p>
            <motion.p 
              variants={textVariants}
              className="text-sm sm:text-base text-foreground/50 leading-relaxed font-light"
            >
              We don&rsquo;t believe in templated outcomes. We dive deep into your processes, map out your technical challenges, and code bespoke systems that integrate smoothly, run efficiently, and stand the test of technical longevity.
            </motion.p>
          </div>

          {/* Cards Section */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-6">
            {cards.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div key={idx} variants={cardVariants}>
                  <Card 
                    glowColor={item.color} 
                    className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start"
                  >
                    <div className="rounded-lg border border-border p-3 bg-white/2 flex-shrink-0">
                      <Icon className="h-6 w-6 text-[#111827]" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-[#111827]">
                        {item.title}
                      </h3>
                      <p className="text-sm text-foreground/50 leading-relaxed font-light">
                        {item.desc}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
