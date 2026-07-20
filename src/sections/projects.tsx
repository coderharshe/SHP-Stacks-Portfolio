"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Laptop, Smartphone, Tablet, Monitor, CheckCircle, 
  ArrowRight, Shield, Code, ChevronRight
} from 'lucide-react';
import { PROJECTS_DATA, ProjectItem } from '@/constants/data';
import { Button } from '@/components/ui/button';
import { CameraReactive } from '@/components/ui/CameraReactive';

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem>(PROJECTS_DATA[0]);


  // CSS Mockup components inside
  const renderMockup = (project: ProjectItem) => {
    const accentBg = project.accentColor === 'blue' 
      ? 'from-blue-600/20 to-indigo-600/20' 
      : project.accentColor === 'purple' 
      ? 'from-purple-600/20 to-pink-600/20' 
      : 'from-cyan-600/20 to-teal-600/20';

    const accentBorder = project.accentColor === 'blue' 
      ? 'border-blue-500/20' 
      : project.accentColor === 'purple' 
      ? 'border-purple-500/20' 
      : 'border-cyan-500/20';

    switch (project.deviceType) {
      case 'phone':
        return (
          <div className="relative flex justify-center items-center h-full w-full py-8">
            <div className="relative w-[210px] h-[420px] rounded-[36px] border-[6px] border-neutral-800 bg-neutral-950 shadow-2xl flex-shrink-0 overflow-hidden">
              {/* Dynamic Island */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-neutral-800 rounded-full z-20 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-neutral-900 rounded-full ml-auto mr-2" />
              </div>
              {/* Screen Content */}
              <div className={`h-full w-full bg-gradient-to-b ${accentBg} p-4 pt-10 flex flex-col justify-between text-[10px] select-none font-mono`}>
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-[#111827]/5 pb-2">
                    <span className="text-[#111827]/40">SYSTEM OK</span>
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-8 rounded bg-white/5 border border-[#111827]/10 p-1 flex items-center gap-1.5">
                      <div className="h-2 w-2 rounded bg-purple-500" />
                      <div className="h-1 w-20 bg-white/20 rounded" />
                    </div>
                    <div className="h-14 rounded bg-white/5 border border-[#111827]/10 p-1.5 space-y-1">
                      <div className="h-1.5 w-10 bg-white/30 rounded" />
                      <div className="grid grid-cols-3 gap-1">
                        <div className="h-4 bg-white/5 rounded" />
                        <div className="h-4 bg-white/5 rounded" />
                        <div className="h-4 bg-white/5 rounded" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-16 rounded bg-neutral-900/80 border border-[#111827]/10 p-1.5 flex flex-col justify-between">
                  <div className="flex justify-between items-center text-[8px] text-[#111827]/50">
                    <span>OPS DELAY</span>
                    <span>1.8s</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded overflow-hidden">
                    <div className="h-full w-[85%] bg-gradient-to-r from-accent-purple to-accent-cyan rounded" />
                  </div>
                  <div className="flex justify-between items-center text-[7px] text-[#111827]/45">
                    <span>99.9% ACCURACY</span>
                    <span>BATCH #290</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'tablet':
        return (
          <div className="relative flex justify-center items-center h-full w-full py-8">
            <div className="relative w-[340px] h-[255px] rounded-[24px] border-[8px] border-neutral-800 bg-neutral-950 shadow-2xl flex-shrink-0 overflow-hidden">
              {/* Screen Content */}
              <div className={`h-full w-full bg-gradient-to-b ${accentBg} p-4 flex flex-row gap-3 text-[10px] select-none font-mono`}>
                {/* Sidebar */}
                <div className="w-1/4 border-r border-[#111827]/5 pr-2 flex flex-col justify-between h-full">
                  <div className="space-y-1.5">
                    <div className="h-2.5 w-12 bg-white/30 rounded mb-4" />
                    <div className="h-4 rounded bg-white/10 border border-[#111827]/5" />
                    <div className="h-4 rounded bg-white/5" />
                    <div className="h-4 rounded bg-white/5" />
                  </div>
                  <div className="h-4 bg-white/5 rounded" />
                </div>
                {/* Main panel */}
                <div className="flex-grow flex flex-col justify-between h-full">
                  <div className="flex justify-between items-center border-b border-[#111827]/5 pb-2">
                    <div className="h-2 w-16 bg-white/20 rounded" />
                    <div className="h-2 w-8 bg-white/10 rounded" />
                  </div>
                  <div className="grid grid-cols-2 gap-2 my-2">
                    <div className="h-16 rounded bg-white/5 border border-[#111827]/10 p-2 flex flex-col justify-between">
                      <div className="h-1.5 w-8 bg-cyan-400 rounded" />
                      <div className="h-4 bg-white/10 rounded" />
                    </div>
                    <div className="h-16 rounded bg-white/5 border border-[#111827]/10 p-2 flex flex-col justify-between">
                      <div className="h-1.5 w-8 bg-purple-400 rounded" />
                      <div className="h-4 bg-white/10 rounded" />
                    </div>
                  </div>
                  <div className="h-14 rounded bg-neutral-900/60 border border-[#111827]/5 p-2 flex items-center justify-center text-center">
                    <div className="space-y-1.5">
                      <span className="text-[9px] text-[#111827]/50">FACE INDEX COMPILATION</span>
                      <div className="flex justify-center gap-1.5">
                        <div className="h-2 w-2 rounded-full bg-white/40" />
                        <div className="h-2 w-2 rounded-full bg-white/40 animate-pulse" />
                        <div className="h-2 w-2 rounded-full bg-white/40" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'desktop':
      case 'laptop':
      default:
        return (
          <div className="relative flex justify-center items-center h-full w-full py-8">
            <div className="flex flex-col items-center">
              {/* Screen Body */}
              <div className="relative w-[420px] h-[260px] rounded-t-2xl border-[6px] border-neutral-800 bg-neutral-950 shadow-2xl overflow-hidden">
                {/* Browser bar */}
                <div className="h-6 border-b border-[#111827]/5 bg-neutral-900 px-3 flex items-center gap-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-neutral-700" />
                  <div className="h-1.5 w-1.5 rounded-full bg-neutral-700" />
                  <div className="h-1.5 w-1.5 rounded-full bg-neutral-700" />
                  <div className="h-3 w-40 bg-neutral-950/80 rounded ml-4 border border-[#111827]/5 flex items-center justify-center text-[7px] text-[#111827]/30 font-mono">
                    https://shpstacks.com/dashboard
                  </div>
                </div>
                {/* Content */}
                <div className={`h-[calc(100%-24px)] w-full bg-gradient-to-b ${accentBg} p-4 flex flex-col justify-between text-[10px] select-none font-mono`}>
                  <div className="flex justify-between items-center border-b border-[#111827]/5 pb-2">
                    <span className="text-[#111827]/40">CORE LEDGER</span>
                    <span className="text-[8px] bg-white/10 px-1.5 py-0.5 rounded text-[#111827]/60">STABLE</span>
                  </div>
                  
                  {/* Grid layout mock */}
                  <div className="grid grid-cols-3 gap-2 my-2">
                    <div className="h-16 rounded bg-neutral-900/70 border border-[#111827]/10 p-2 flex flex-col justify-between">
                      <div className="h-1.5 w-8 bg-white/30 rounded" />
                      <div className="h-4 bg-white/15 rounded" />
                      <div className="h-1 w-10 bg-white/10 rounded" />
                    </div>
                    <div className="h-16 rounded bg-neutral-900/70 border border-[#111827]/10 p-2 flex flex-col justify-between">
                      <div className="h-1.5 w-8 bg-white/30 rounded" />
                      <div className="h-4 bg-white/15 rounded" />
                      <div className="h-1 w-10 bg-white/10 rounded" />
                    </div>
                    <div className="h-16 rounded bg-neutral-900/70 border border-[#111827]/10 p-2 flex flex-col justify-between">
                      <div className="h-1.5 w-8 bg-white/30 rounded" />
                      <div className="h-4 bg-white/15 rounded" />
                      <div className="h-1 w-10 bg-white/10 rounded" />
                    </div>
                  </div>

                  {/* Flow chart mock */}
                  <div className="h-16 rounded bg-white/5 border border-[#111827]/5 p-2 flex flex-col justify-between">
                    <div className="flex justify-between text-[8px] text-[#111827]/30">
                      <span>TRAFFIC TRAIL</span>
                      <span>15,200 REQS / MIN</span>
                    </div>
                    <div className="flex items-end gap-1 h-8 pt-1">
                      <div className="h-2 w-full bg-white/20 rounded-t" />
                      <div className="h-4 w-full bg-white/20 rounded-t" />
                      <div className="h-6 w-full bg-gradient-to-t from-accent-blue to-accent-purple rounded-t" />
                      <div className="h-3 w-full bg-white/20 rounded-t" />
                      <div className="h-5 w-full bg-white/20 rounded-t" />
                      <div className="h-7 w-full bg-gradient-to-t from-accent-purple to-accent-cyan rounded-t" />
                      <div className="h-4 w-full bg-white/20 rounded-t" />
                    </div>
                  </div>
                </div>
              </div>
              {/* Laptop hinge base */}
              {project.deviceType === 'laptop' && (
                <div className="h-2 w-[460px] bg-neutral-800 rounded-b-xl border-t border-neutral-700/50" />
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <section id="projects" className="relative py-24 sm:py-32 border-t border-border overflow-hidden bg-transparent">
      {/* Section background overlay */}
      <div className="absolute inset-0 -z-10" />

      {/* Background blobs */}
      <div className="absolute top-[40%] left-[-10%] h-[300px] w-[300px] rounded-full bg-accent-purple/5 blur-[100px] -z-10 animate-float-slow" />
      <div className="absolute bottom-[20%] right-[-10%] h-[350px] w-[350px] rounded-full bg-accent-blue/5 blur-[120px] -z-10 animate-float-medium" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <CameraReactive depth="hero-title" sectionProgressTarget={0.60}>
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest font-semibold" style={{ color: '#E8372A' }}>
              FEATURED PROJECTS
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight font-sans" style={{ color: '#F0F1F3' }}>
              Products Built to Perform.
            </h2>
            <p className="text-sm sm:text-base leading-relaxed font-bold" style={{ color: '#F0F1F3' }}>
              Review the real technical outcomes, database architectures, and business impact of applications engineered by SHP Stacks.
            </p>
          </div>
        </CameraReactive>

        {/* Project Pane Container (Landmark Perspective Event) */}
        <CameraReactive depth="landmark" tiltOnHover={true} sectionProgressTarget={0.60}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Navigation list (col span 4) */}
          <div className="lg:col-span-4 flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 gap-3 no-scrollbar lg:h-[600px] lg:justify-start">
            {PROJECTS_DATA.map((project) => {
              const isSelected = selectedProject.id === project.id;
              const btnClass = isSelected
                ? 'bg-[#181C26]/95 border border-[#E8372A]/50 shadow-xl'
                : 'bg-[#12151E]/95 border border-[rgba(255,255,255,0.12)] shadow-md hover:border-[rgba(255,255,255,0.25)] hover:bg-[#151822]/95';
              return (
                <button
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className={`flex-shrink-0 text-left px-5 py-4 rounded-xl border transition-all duration-300 cursor-pointer lg:w-full flex items-center justify-between group ${btnClass}`}
                >
                  <div className="space-y-1 overflow-hidden">
                    <span className={`text-[10px] font-mono tracking-wider uppercase block ${
                      isSelected ? 'text-[#E8372A]' : 'text-[#3D4150]'
                    }`}>
                      {project.category}
                    </span>
                    <h3 className="text-sm sm:text-base font-semibold truncate" style={{ color: isSelected ? '#F0F1F3' : '#6B7080' }}>
                      {project.title}
                    </h3>
                  </div>
                  <ChevronRight className={`hidden lg:block h-4 w-4 transition-transform duration-300 ${
                    isSelected ? 'translate-x-0.5 text-[#E8372A]' : 'opacity-0 group-hover:opacity-20 group-hover:translate-x-0.5'
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Project Details and Mockup Showcase (col span 8) */}
          <div className="lg:col-span-8 glass-card bg-[#12151E]/95 border border-[rgba(255,255,255,0.12)] rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-xl min-h-[500px]">
            
            {/* Mockup screen pane (left on md+, top on mobile) */}
            <div className="w-full md:w-1/2 border-b md:border-b-0 md:border-r border-border bg-[#0D0F14]/95 flex items-center justify-center min-h-[300px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedProject.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full flex items-center justify-center"
                >
                  {renderMockup(selectedProject)}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Project Details Info pane */}
            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto no-scrollbar max-h-[600px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedProject.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Category and Title */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono tracking-widest text-accent-purple uppercase">
                      {selectedProject.category}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-[#111827] tracking-tight">
                      {selectedProject.title}
                    </h3>
                  </div>

                  {/* Overview */}
                  <p className="text-xs sm:text-sm text-[#F0F1F3] leading-relaxed font-bold">
                    {selectedProject.overview}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.techStack.map((tech, idx) => (
                      <span 
                        key={idx} 
                        className="text-[10px] font-mono bg-[#1A1E29]/95 border border-[rgba(255,255,255,0.14)] text-[#F0F1F3] px-2.5 py-1 rounded-md font-bold shadow-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Problem & Solution block */}
                  <div className="space-y-3.5 bg-[#181C26]/95 border border-[rgba(255,255,255,0.12)] p-4 rounded-xl shadow-md text-xs">
                    <div className="space-y-1">
                      <span className="font-bold text-[#E8372A] block uppercase text-[10px] tracking-wider">The Challenge</span>
                      <p className="text-[#F0F1F3] leading-relaxed font-bold">{selectedProject.problem}</p>
                    </div>
                    <div className="space-y-1 pt-2 border-t border-[rgba(255,255,255,0.06)]">
                      <span className="font-bold text-[#E8372A] block uppercase text-[10px] tracking-wider">The Engineering Outcome</span>
                      <p className="text-[#F0F1F3] leading-relaxed font-bold">{selectedProject.solution}</p>
                    </div>
                  </div>

                  {/* Results Bullet points */}
                  <div className="bg-[#181C26]/95 border border-[rgba(255,255,255,0.12)] p-4 rounded-xl shadow-md space-y-2.5">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#A8ACBA] block mb-2 font-bold">
                      Key Metrics & Impact
                    </span>
                    {selectedProject.results.map((result, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-[#F0F1F3] font-bold leading-relaxed">
                        <CheckCircle className="h-4 w-4 text-[#E8372A] flex-shrink-0 mt-0.5" />
                        <span>{result}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Inquire CTA Button */}
              <div className="mt-8 border-t border-border pt-6 flex justify-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    const el = document.getElementById('cta');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="group w-full md:w-auto text-xs py-2 px-4 hover:border-accent-purple/40"
                >
                  <span>Build A Similar Solution</span>
                  <ArrowRight className="h-3.5 w-3.5 opacity-30 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </div>

            </div>

          </div>
        </div>
      </CameraReactive>
      </div>
    </section>
  );
};
