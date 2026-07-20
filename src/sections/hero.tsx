"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Hero: React.FC = () => {
  const stats = [
    { value: '40+',   label: 'Deliveries Made'   },
    { value: '99.8%', label: 'Uptime Maintained'  },
    { value: '100%',  label: 'IP Transferred'     },
  ];

  const technologies = [
    'Next.js', 'React', 'TypeScript', 'Supabase', 'PostgreSQL',
    'Docker', 'Node.js', 'OpenAI', 'Claude', 'n8n', 'Vercel', 'AWS',
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1, y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const handleScrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="hero"
      className="relative min-h-[95vh] flex flex-col justify-center items-center pt-28 pb-16 overflow-hidden z-10"
     style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2500&auto=format&fit=crop')", backgroundSize: 'cover', backgroundAttachment: 'fixed', backgroundPosition: 'center' }}>
      {/* Parallax Overlay */}
      <div className="absolute inset-0 bg-[#F8FAF9]/90 -z-10" />

      {/* Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 -z-10" />

      {/* Glow Blob 1 — Gold (top-left) */}
      <div className="absolute top-[10%] left-[8%] h-[380px] w-[380px] rounded-full bg-[#111827]/08 blur-[130px] animate-float-slow -z-10" />

      {/* Glow Blob 2 — Royal Blue (bottom-right) */}
      <div className="absolute bottom-[8%] right-[8%] h-[420px] w-[420px] rounded-full bg-[#EF4444]/10 blur-[140px] animate-float-medium -z-10" />

      {/* Glow Blob 3 — Subtle blue (top-center) */}
      <div className="absolute top-[-5%] left-[44%] h-[240px] w-[240px] rounded-full bg-[#EF4444]/08 blur-[100px] animate-float-fast -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl flex flex-col items-center"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8"
            style={{
              border: '1px solid rgba(52,84,209,0.25)',
              background: 'rgba(52,84,209,0.08)',
            }}
          >
            {/* Gold dot */}
            <span className="h-1.5 w-1.5 rounded-full bg-[#111827] animate-pulse" />
            <span className="text-xs font-mono tracking-widest text-[#111827]/70 uppercase">
              AI-First Software Engineering Agency
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-8 font-sans leading-[1.06]"
          >
            <span className="text-gradient-white">Engineering Software That</span>
            <br />
            <span className="text-gradient-blue-purple">Moves Businesses Forward.</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl text-[#111827]/50 max-w-2xl mb-10 leading-relaxed font-light"
          >
            We build enterprise software, AI solutions, SaaS platforms, automation systems,
            and high-performance web applications for ambitious businesses.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4 mb-16"
          >
            <Button
              variant="primary"
              glow
              onClick={() => handleScrollTo('cta')}
              className="group w-full sm:w-auto"
            >
              <span>Start Your Project</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Button>
            <Button
              variant="outline"
              onClick={() => handleScrollTo('projects')}
              className="group w-full sm:w-auto"
            >
              <span>Explore Our Work</span>
              <ChevronRight className="h-4 w-4 opacity-50 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-4 md:gap-16 border-t border-b border-[#111827]/08 py-8 w-full max-w-3xl"
          >
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center px-2">
                <span className="text-2xl sm:text-4xl font-bold font-sans tracking-tight text-[#111827] mb-1.5 tabular-nums">
                  {stat.value}
                </span>
                <span className="text-[9px] sm:text-[10px] text-[#111827]/40 uppercase tracking-widest font-mono text-center leading-tight">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Technology Marquee */}
      <div
        className="w-full mt-20 relative py-5 overflow-hidden select-none border-t border-b border-[#111827]/06"
        style={{ background: 'rgba(241,255,250,0.015)' }}
      >
        <div
          className="absolute inset-y-0 left-0 w-24 z-10"
          style={{ background: 'linear-gradient(to right, #2A2B2A, transparent)' }}
        />
        <div
          className="absolute inset-y-0 right-0 w-24 z-10"
          style={{ background: 'linear-gradient(to left, #2A2B2A, transparent)' }}
        />

        <div className="flex gap-16 w-max animate-marquee">
          {[...technologies, ...technologies, ...technologies].map((tech, idx) => (
            <div
              key={idx}
              className="text-xs sm:text-sm font-mono tracking-wider text-[#111827]/30 hover:text-[#111827] transition-colors duration-300"
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
