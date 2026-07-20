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
import { CameraReactive } from '@/components/ui/CameraReactive';

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

const getRevealOffset = (idx: number): number => {
  if (idx === 0) return -0.15;
  if (idx === 1) return -0.07;
  if (idx === 2) return -0.01;
  if (idx >= 3 && idx <= 5) return 0.01 + ((idx - 3) / 2) * 0.04;
  if (idx >= 6 && idx <= 9) return 0.07 + ((idx - 6) / 3) * 0.06;
  if (idx >= 10 && idx <= 12) return 0.15 + ((idx - 10) / 2) * 0.04;
  return 0.21 + (idx - 13) * 0.02;
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
    hidden: { opacity: 0, y: 14 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <section id="services" className="relative py-24 sm:py-32 border-t border-border overflow-hidden bg-transparent">
      {/* Section background overlay */}
      <div className="absolute inset-0 -z-10" />

      {/* Decorative Blur Blob */}
      <div className="absolute top-[20%] right-[-10%] h-[350px] w-[350px] rounded-full bg-accent-cyan/5 blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <CameraReactive depth="hero-title" sectionProgressTarget={0.45} revealProgressOffset={-0.18}>
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest font-semibold" style={{ color: '#E8372A' }}>
              SERVICES
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight font-sans" style={{ color: '#F0F1F3' }}>
              Complete Engineering Capabilities.
            </h2>
            <p className="text-sm sm:text-base leading-relaxed font-light" style={{ color: '#6B7080' }}>
              We handle everything from initial system design and database modeling to high-scale deployment and active performance auditing.
            </p>
          </div>
        </CameraReactive>

        {/* Services Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-2%" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {SERVICES_DATA.map((service, idx) => {
            const Icon = iconMap[service.iconName] || Code;
            return (
              <CameraReactive
                key={service.id}
                depth="card"
                tiltOnHover={true}
                sectionProgressTarget={0.45}
                revealProgressOffset={getRevealOffset(idx)}
              >
                <motion.div 
                  variants={cardVariants}
                  className="group cursor-pointer h-full"
                  onClick={() => setActiveService(service)}
                >
                  <Card
                    glowColor="default"
                    className="p-6 md:p-8 h-full flex flex-col justify-between hover:border-[rgba(255,255,255,0.14)] transition-all glass-card"
                  >
                    <div className="space-y-4">
                      <div
                        className="h-11 w-11 rounded-lg flex items-center justify-center group-hover:border-[rgba(232,55,42,0.20)] transition-colors"
                        style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}
                      >
                        <Icon className="h-5 w-5 transition-colors" style={{ color: '#6B7080' }}
                          onMouseEnter={(e: React.MouseEvent<SVGSVGElement>) => (e.currentTarget.style.color = '#F0F1F3')}
                          onMouseLeave={(e: React.MouseEvent<SVGSVGElement>) => (e.currentTarget.style.color = '#6B7080')}
                        />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-base sm:text-lg font-semibold tracking-tight transition-colors group-hover:text-[#E8372A]" style={{ color: '#F0F1F3' }}>
                          {service.title}
                        </h3>
                        <p className="text-xs sm:text-sm leading-relaxed font-light line-clamp-3" style={{ color: '#6B7080' }}>
                          {service.shortDesc}
                        </p>
                      </div>
                    </div>
                    <div className="mt-6 flex items-center gap-1 text-xs font-mono transition-colors group-hover:text-[#A8ACBA]" style={{ color: '#3D4150' }}>
                      <span>EXPLORE SPECS</span>
                      <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </Card>
              </motion.div>
            </CameraReactive>
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
            <p className="text-sm sm:text-base leading-relaxed font-light" style={{ color: '#A8ACBA' }}>
              {activeService.longDesc}
            </p>

            <div className="border-t pt-6" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              <h4 className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: '#3D4150' }}>
                Core Capabilities
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeService.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm font-light" style={{ color: '#A8ACBA' }}>
                    <CheckCircle2 className="h-4 w-4 flex-shrink-0" style={{ color: '#E8372A' }} />
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
