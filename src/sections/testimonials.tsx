"use client";

import React from 'react';
import { Card } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section className="relative py-20 border-t border-border overflow-hidden bg-transparent">
      {/* Section background overlay */}
      <div className="absolute inset-0 -z-10" />

      <div className="absolute inset-0 bg-grid-pattern opacity-10 -z-10" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card 
          glowColor="purple"
          className="p-8 md:p-12 text-center flex flex-col items-center gap-6 border-[#111827]/5 shadow-2xl relative overflow-hidden"
        >
          {/* Animated decorative ring */}
          <div className="absolute -top-12 -left-12 h-24 w-24 rounded-full bg-accent-purple/5 blur-xl" />
          <div className="absolute -bottom-12 -right-12 h-24 w-24 rounded-full bg-accent-blue/5 blur-xl" />

          <div className="h-12 w-12 rounded-full flex items-center justify-center" style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.03)' }}>
            <Sparkles className="h-5 w-5 animate-pulse" style={{ color: '#E8372A' }} />
          </div>

          <div className="space-y-3.5 max-w-lg">
            <h3 className="text-xl md:text-2xl font-bold tracking-tight" style={{ color: '#F0F1F3' }}>
              Active Project Delivery
            </h3>
            <p className="text-sm leading-relaxed font-light" style={{ color: '#6B7080' }}>
              Currently delivering custom software architectures and intelligent AI applications for growing businesses. Client success stories and comprehensive case studies coming soon.
            </p>
          </div>

          <div className="text-[10px] font-mono uppercase tracking-widest pt-4 w-full max-w-xs" style={{ color: '#3D4150', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            NDAs STRICTLY OBSERVED
          </div>
        </Card>
      </div>
    </section>
  );
};
