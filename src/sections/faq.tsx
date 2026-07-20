"use client";

import React from 'react';
import { Accordion } from '@/components/ui/accordion';
import { FAQ_DATA } from '@/constants/data';

export const FAQ: React.FC = () => {
  return (
    <section id="faq" className="relative py-24 sm:py-32 border-t border-border overflow-hidden bg-transparent">
      {/* Section background overlay */}
      <div className="absolute inset-0 -z-10" />

      {/* Decorative Blob */}
      <div className="absolute top-[40%] right-[-10%] h-[300px] w-[300px] rounded-full bg-accent-blue/5 blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest font-semibold" style={{ color: '#E8372A' }}>
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight font-sans" style={{ color: '#F0F1F3' }}>
            Frequently Asked Questions.
          </h2>
          <p className="text-sm sm:text-base leading-relaxed font-bold" style={{ color: '#F0F1F3' }}>
            Find immediate answers regarding pricing, project timelines, hosting arrangements, and codebase ownership.
          </p>
        </div>

        {/* Accordions */}
        <div className="max-w-3xl mx-auto rounded-2xl p-6 md:p-8 glass-card bg-[#12151E] border border-[rgba(255,255,255,0.12)] shadow-xl">
          <Accordion items={FAQ_DATA} />
        </div>
        
      </div>
    </section>
  );
};
