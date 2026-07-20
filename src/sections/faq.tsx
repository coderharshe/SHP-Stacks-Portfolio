"use client";

import React from 'react';
import { Accordion } from '@/components/ui/accordion';
import { FAQ_DATA } from '@/constants/data';

export const FAQ: React.FC = () => {
  return (
    <section id="faq" className="relative py-24 sm:py-32 border-t border-border overflow-hidden bg-transparent" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2500&auto=format&fit=crop')", backgroundSize: 'cover', backgroundAttachment: 'fixed', backgroundPosition: 'center' }}>
      {/* Parallax Overlay */}
      <div className="absolute inset-0 bg-[#F8FAF9]/90 -z-10" />

      {/* Decorative Blob */}
      <div className="absolute top-[40%] right-[-10%] h-[300px] w-[300px] rounded-full bg-accent-blue/5 blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-accent-cyan font-semibold">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#111827] font-sans">
            Frequently Asked Questions.
          </h2>
          <p className="text-sm sm:text-base text-foreground/50 leading-relaxed font-light">
            Find immediate answers regarding pricing, project timelines, hosting arrangements, and codebase ownership.
          </p>
        </div>

        {/* Accordions */}
        <div className="max-w-3xl mx-auto">
          <Accordion items={FAQ_DATA} />
        </div>
        
      </div>
    </section>
  );
};
