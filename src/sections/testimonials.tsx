"use client";

import React from 'react';
import { Card } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section className="relative py-20 border-t border-border overflow-hidden bg-background" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556761175-5973dc0f32b7?q=80&w=2500&auto=format&fit=crop')", backgroundSize: 'cover', backgroundAttachment: 'fixed', backgroundPosition: 'center' }}>
      {/* Parallax Overlay */}
      <div className="absolute inset-0 bg-[#F8FAF9]/90 -z-10" />

      <div className="absolute inset-0 bg-grid-pattern opacity-10 -z-10" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card 
          glowColor="purple"
          className="p-8 md:p-12 text-center flex flex-col items-center gap-6 border-[#111827]/5 shadow-2xl relative overflow-hidden"
        >
          {/* Animated decorative ring */}
          <div className="absolute -top-12 -left-12 h-24 w-24 rounded-full bg-accent-purple/5 blur-xl" />
          <div className="absolute -bottom-12 -right-12 h-24 w-24 rounded-full bg-accent-blue/5 blur-xl" />

          {/* Icon */}
          <div className="h-12 w-12 rounded-full border border-border bg-white/2 flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-accent-purple animate-pulse" />
          </div>

          {/* Copy block */}
          <div className="space-y-3.5 max-w-lg">
            <h3 className="text-xl md:text-2xl font-bold text-[#111827] tracking-tight">
              Active Project Delivery
            </h3>
            <p className="text-sm text-foreground/50 leading-relaxed font-light">
              Currently delivering custom software architectures and intelligent AI applications for growing businesses. Client success stories and comprehensive case studies coming soon.
            </p>
          </div>

          {/* Subtext info */}
          <div className="text-[10px] font-mono text-foreground/30 uppercase tracking-widest pt-4 border-t border-[#111827]/5 w-full max-w-xs">
            NDAs STRICTLY OBSERVED
          </div>
        </Card>
      </div>
    </section>
  );
};
