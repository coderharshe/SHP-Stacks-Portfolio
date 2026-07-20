"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, Layers, Zap, Layout, ShieldCheck, BarChart3, Brain, Wrench 
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { CameraReactive } from '@/components/ui/CameraReactive';

export const WhyChooseUs: React.FC = () => {
  const reasons = [
    {
      title: 'Enterprise Quality',
      desc: 'No shortcut wrappers. We write production-grade code backed by strict TypeScript standards and comprehensive unit testing.',
      icon: Shield,
      color: 'blue' as const,
    },
    {
      title: 'Scalable Architecture',
      desc: 'Engineered for expansion. Our databases (Pgvector, PostgreSQL) and container runtimes (Docker) handle scaling dynamically.',
      icon: Layers,
      color: 'purple' as const,
    },
    {
      title: 'Fast Delivery',
      desc: 'Accelerated execution. We run weekly sprints, continuous staging previews, and automated deployment pipelines.',
      icon: Zap,
      color: 'cyan' as const,
    },
    {
      title: 'Modern UI & UX',
      desc: 'Stunning aesthetics. We design minimal, luxury interfaces matching the visual excellence of Stripe and Vercel.',
      icon: Layout,
      color: 'default' as const,
    },
    {
      title: 'Secure Backend',
      desc: 'Bulletproof safeguards. We build precise role-based access control, input validations, and strict rate-limiting policies.',
      icon: ShieldCheck,
      color: 'blue' as const,
    },
    {
      title: 'Business-first Thinking',
      desc: 'We map technology to balance sheets. Our software aims to reduce operating expense, boost margins, or increase client acquisition.',
      icon: BarChart3,
      color: 'purple' as const,
    },
    {
      title: 'AI Expertise',
      desc: 'Practical machine learning. We deploy custom prompt workflows, contextual RAG, and autonomous agent loops that perform actual work.',
      icon: Brain,
      color: 'cyan' as const,
    },
    {
      title: 'Dedicated Support',
      desc: 'Direct founder access. We establish shared Slack channels, weekly loom updates, and SLA-backed systems monitoring.',
      icon: Wrench,
      color: 'default' as const,
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <section id="why-choose-us" className="relative py-24 sm:py-32 border-t border-border overflow-hidden bg-transparent">
      {/* Section background overlay */}
      <div className="absolute inset-0 -z-10" />

      {/* Decorative Blur Blob */}
      <div className="absolute top-[30%] left-[-10%] h-[350px] w-[350px] rounded-full bg-accent-purple/5 blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <CameraReactive depth="hero-title" sectionProgressTarget={0.50}>
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest font-semibold" style={{ color: '#E8372A' }}>
              WHY SHP STACKS
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight font-sans" style={{ color: '#F0F1F3' }}>
              Built for Serious Operations.
            </h2>
            <p className="text-sm sm:text-base leading-relaxed font-light" style={{ color: '#6B7080' }}>
              We operate as your core technical co-founders, building software designed to secure user trust and drive long-term business value.
            </p>
          </div>
        </CameraReactive>

        {/* Reasons Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-2%" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {reasons.map((reason, idx) => {
            const Icon = reason.icon;
            return (
              <CameraReactive key={idx} depth="card" tiltOnHover={true} sectionProgressTarget={0.50}>
                <motion.div variants={cardVariants} className="group h-full">
                  <Card
                    glowColor={reason.color}
                    className="p-6 h-full flex flex-col justify-start hover:border-[rgba(255,255,255,0.13)] glass-card"
                  >
                    <div className="space-y-4">
                      <div
                        className="h-10 w-10 rounded-lg flex items-center justify-center transition-colors"
                        style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}
                      >
                        <Icon className="h-5 w-5" style={{ color: '#6B7080' }} />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-base font-semibold tracking-tight" style={{ color: '#F0F1F3' }}>
                          {reason.title}
                        </h3>
                        <p className="text-xs sm:text-sm leading-relaxed font-light" style={{ color: '#6B7080' }}>
                          {reason.desc}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </CameraReactive>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
