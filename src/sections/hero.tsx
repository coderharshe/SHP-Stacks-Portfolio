"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CameraReactive } from '@/components/ui/CameraReactive';

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
      transition: { staggerChildren: 0.08, delayChildren: 0 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1, y: 0,
      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const handleScrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="hero"
      className="relative min-h-[95vh] flex flex-col justify-center items-center pt-28 pb-16 overflow-hidden z-10">
      {/* Parallax Overlay */}
      <div className="absolute inset-0 -z-10" />

      {/* Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 -z-10" />

      {/* Glow Blob 1 — subtle white (top-left) */}
      <div className="absolute top-[10%] left-[8%] h-[380px] w-[380px] rounded-full blur-[130px] animate-float-slow -z-10" style={{ background: 'rgba(255,255,255,0.02)' }} />

      {/* Glow Blob 2 — SHP Red (bottom-right) */}
      <div className="absolute bottom-[8%] right-[8%] h-[420px] w-[420px] rounded-full blur-[140px] animate-float-medium -z-10" style={{ background: 'rgba(232,55,42,0.07)' }} />

      {/* Glow Blob 3 — Red top-center */}
      <div className="absolute top-[-5%] left-[44%] h-[240px] w-[240px] rounded-full blur-[100px] animate-float-fast -z-10" style={{ background: 'rgba(232,55,42,0.05)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl flex flex-col items-center"
        >
          {/* Badge (Z = 0.4) */}
          <CameraReactive depth="hero-badge" sectionProgressTarget={0.0}>
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8"
              style={{
                border: '1px solid rgba(232,55,42,0.20)',
                background: 'rgba(232,55,42,0.06)',
              }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#E8372A] animate-pulse" />
              <span className="text-xs font-mono tracking-widest uppercase" style={{ color: 'var(--text-secondary)' }}>
                AI-First Software Engineering Agency
              </span>
            </motion.div>
          </CameraReactive>

          {/* Heading (Z = 0.7) */}
          <CameraReactive depth="hero-title" sectionProgressTarget={0.0}>
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-8 font-sans leading-[1.06]"
            >
              <span className="text-gradient-white">Engineering Software That</span>
              <br />
              <span className="text-gradient-blue-purple">Moves Businesses Forward.</span>
            </motion.h1>
          </CameraReactive>

          {/* Subheading (Z = 0.8) */}
          <CameraReactive depth="paragraph" sectionProgressTarget={0.0}>
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl text-[#111827]/50 max-w-2xl mb-10 leading-relaxed font-light"
            >
              We build enterprise software, AI solutions, SaaS platforms, automation systems,
              and high-performance web applications for ambitious businesses.
            </motion.p>
          </CameraReactive>

          {/* CTAs (Z = 1.0) */}
          <CameraReactive depth="button" tiltOnHover={true} sectionProgressTarget={0.0}>
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
          </CameraReactive>

          {/* Stats (Z = 1.4) */}
          <CameraReactive depth="card" sectionProgressTarget={0.0}>
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-4 md:gap-16 border-t border-b py-8 w-full max-w-3xl glass-card rounded-xl px-6"
              style={{ borderColor: 'rgba(255,255,255,0.06)' }}
            >
              {stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center px-2">
                  <span className="text-2xl sm:text-4xl font-bold font-sans tracking-tight mb-1.5 tabular-nums" style={{ color: '#F0F1F3' }}>
                    {stat.value}
                  </span>
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-widest font-mono text-center leading-tight" style={{ color: 'var(--text-disabled)' }}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </CameraReactive>
        </motion.div>
      </div>

      <div
        className="w-full mt-20 relative py-5 overflow-hidden select-none"
        style={{
          borderTop: '1px solid rgba(255,255,255,0.04)',
          borderBottom: '1px solid rgba(255,255,255,0.04)',
        }}
      >
        <div
          className="absolute inset-y-0 left-0 w-24 z-10"
          style={{ background: 'linear-gradient(to right, #0A0B0D, transparent)' }}
        />
        <div
          className="absolute inset-y-0 right-0 w-24 z-10"
          style={{ background: 'linear-gradient(to left, #0A0B0D, transparent)' }}
        />

        <div className="flex gap-16 w-max animate-marquee">
          {[...technologies, ...technologies, ...technologies].map((tech, idx) => (
            <div
              key={idx}
              className="text-xs sm:text-sm font-mono tracking-wider transition-colors duration-300"
              style={{ color: 'var(--text-disabled)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-disabled)')}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
