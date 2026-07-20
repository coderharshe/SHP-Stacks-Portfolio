"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

export const TechStack: React.FC = () => {
  const categories = [
    {
      name: 'Frontend',
      techs: [
        { name: 'Next.js', tag: 'Core Framework' },
        { name: 'React', tag: 'UI Library' },
        { name: 'TypeScript', tag: 'Safe Type Lang' },
        { name: 'Tailwind CSS', tag: 'Utility Styling' }
      ]
    },
    {
      name: 'Backend',
      techs: [
        { name: 'Node.js', tag: 'Runtime Engine' },
        { name: 'Go (Golang)', tag: 'High-Scale API' },
        { name: 'Express / Fastify', tag: 'API Routing' }
      ]
    },
    {
      name: 'Database',
      techs: [
        { name: 'PostgreSQL', tag: 'Relational Store' },
        { name: 'Supabase', tag: 'Edge Database' },
        { name: 'Redis', tag: 'Caching Ledger' }
      ]
    },
    {
      name: 'Cloud Hosting',
      techs: [
        { name: 'AWS', tag: 'Cloud Compute' },
        { name: 'Vercel', tag: 'Edge Hosting' }
      ]
    },
    {
      name: 'DevOps',
      techs: [
        { name: 'Docker', tag: 'Containerization' },
        { name: 'GitHub Actions', tag: 'CI/CD Pipelines' }
      ]
    },
    {
      name: 'AI Engineering',
      techs: [
        { name: 'OpenAI API', tag: 'LLM Reasoning' },
        { name: 'Claude API', tag: 'Deep Analysis' },
        { name: 'LangChain', tag: 'Agent Workflows' }
      ]
    },
    {
      name: 'Automation',
      techs: [
        { name: 'n8n', tag: 'Workflow Server' },
        { name: 'Webhooks', tag: 'Event Handlers' }
      ]
    },
    {
      name: 'Design Assets',
      techs: [
        { name: 'Figma', tag: 'UI UX Wireframes' },
        { name: 'Framer Motion', tag: 'Core Animations' }
      ]
    }
  ];

  const [activeCategory, setActiveCategory] = useState<string>('Frontend');

  return (
    <section id="tech-stack" className="relative py-24 sm:py-32 border-t border-border overflow-hidden bg-transparent" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2500&auto=format&fit=crop')", backgroundSize: 'cover', backgroundAttachment: 'fixed', backgroundPosition: 'center' }}>
      {/* Parallax Overlay */}
      <div className="absolute inset-0 bg-[#F8FAF9]/90 -z-10" />

      {/* Background blobs */}
      <div className="absolute top-[20%] right-[-10%] h-[300px] w-[300px] rounded-full bg-accent-purple/5 blur-[100px] -z-10" />
      <div className="absolute bottom-[20%] left-[-10%] h-[350px] w-[350px] rounded-full bg-accent-blue/5 blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-accent-cyan font-semibold">
            TECHNOLOGY HUB
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#111827] font-sans">
            Our Production Tech Stack.
          </h2>
          <p className="text-sm sm:text-base text-foreground/50 leading-relaxed font-light">
            We build exclusively with modern, battle-tested technologies that ensure performance, type-safety, and seamless integrations.
          </p>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 max-w-4xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`px-4 py-2 text-xs font-mono rounded-full border transition-all duration-300 cursor-pointer ${
                activeCategory === cat.name
                  ? 'bg-white text-black border-[#111827]'
                  : 'bg-transparent text-foreground/60 border-border hover:text-[#111827] hover:border-[#111827]/20'
              }`}
            >
              {cat.name.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Tech Grid */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
          >
            {categories
              .find((cat) => cat.name === activeCategory)
              ?.techs.map((tech, idx) => (
                <Card
                  key={idx}
                  glowColor="cyan"
                  className="p-6 flex flex-col justify-between h-36 border-[#111827]/5 hover:border-[#111827]/12"
                >
                  <div className="space-y-1">
                    <span className="text-xs font-mono text-accent-cyan font-medium block">
                      {tech.tag}
                    </span>
                    <h3 className="text-lg font-bold text-[#111827] tracking-tight">
                      {tech.name}
                    </h3>
                  </div>
                  <div className="text-[10px] font-mono text-foreground/30">
                    VERIFIED PRODUCTIVE
                  </div>
                </Card>
              ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
