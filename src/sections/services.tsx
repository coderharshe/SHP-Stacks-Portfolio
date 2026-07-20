"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Code, Layout, Rocket, Brain, Bot, Workflow, BarChart3, Database, Layers, 
  Terminal, ShieldCheck, Zap, Cloud, Wrench, ArrowRight, CheckCircle2 
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Modal } from '@/components/ui/modal';
import { SERVICES_DATA, ServiceItem } from '@/constants/data';
import { Button } from '@/components/ui/button';

const iconMap: Record<string, React.ComponentType<any>> = {
  Code,
  Layout,
  Rocket,
  Brain,
  Bot,
  Workflow,
  BarChart3,
  Database,
  Layers,
  Terminal,
  ShieldCheck,
  Zap,
  Cloud,
  Wrench
};

export const Services: React.FC = () => {
  const [activeService, setActiveService] = useState<ServiceItem | null>(null);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05
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
    <section id="services" className="relative py-24 sm:py-32 border-t border-border overflow-hidden bg-[#2A2B2A]">
      {/* Decorative Blur Blob */}
      <div className="absolute top-[20%] right-[-10%] h-[350px] w-[350px] rounded-full bg-accent-cyan/5 blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-accent-cyan font-semibold">
            SERVICES
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-sans">
            Complete Engineering Capabilities.
          </h2>
          <p className="text-sm sm:text-base text-foreground/50 leading-relaxed font-light">
            We handle everything from initial system design and database modeling to high-scale deployment and active performance auditing.
          </p>
        </div>

        {/* Services Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-5%" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {SERVICES_DATA.map((service) => {
            const Icon = iconMap[service.iconName] || Code;
            return (
              <motion.div 
                key={service.id} 
                variants={cardVariants}
                className="group cursor-pointer"
                onClick={() => setActiveService(service)}
              >
                <Card 
                  glowColor="default" 
                  className="p-6 md:p-8 h-full flex flex-col justify-between hover:border-white/15 transition-all"
                >
                  <div className="space-y-4">
                    {/* Icon wrapper */}
                    <div className="h-11 w-11 rounded-lg border border-border bg-white/2 flex items-center justify-center group-hover:border-white/20 transition-colors">
                      <Icon className="h-5 w-5 text-white/80 group-hover:text-white transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-base sm:text-lg font-semibold text-white tracking-tight group-hover:text-accent-cyan transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-foreground/50 leading-relaxed font-light line-clamp-3">
                        {service.shortDesc}
                      </p>
                    </div>
                  </div>

                  {/* Read More link */}
                  <div className="mt-6 flex items-center gap-1 text-xs font-mono text-white/40 group-hover:text-white transition-colors">
                    <span>EXPLORE SPECS</span>
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Details Modal */}
      <Modal
        isOpen={!!activeService}
        onClose={() => setActiveService(null)}
        title={activeService?.title || ''}
      >
        {activeService && (
          <div className="space-y-6">
            <p className="text-sm sm:text-base text-foreground/75 leading-relaxed font-light">
              {activeService.longDesc}
            </p>
            
            <div className="border-t border-border pt-6">
              <h4 className="text-xs font-mono uppercase tracking-widest text-white/50 mb-4">
                Core Capabilities
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeService.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-foreground/80 font-light">
                    <CheckCircle2 className="h-4 w-4 text-accent-cyan flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-border pt-6 flex justify-end">
              <Button
                variant="primary"
                onClick={() => {
                  setActiveService(null);
                  const el = document.getElementById('cta');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span>Inquire About This Service</span>
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};
