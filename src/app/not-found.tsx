"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Home, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-transparent flex flex-col justify-center items-center px-4 relative overflow-hidden">
      {/* Background radial spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[500px] bg-gradient-to-b from-accent-purple/5 to-transparent blur-[120px] pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 -z-10" />

      {/* Decorative Blur Blob */}
      <div className="absolute top-[20%] right-[-10%] h-[300px] w-[300px] rounded-full bg-accent-blue/5 blur-[100px] -z-10 animate-float-slow" />

      <div className="text-center max-w-md space-y-6 flex flex-col items-center">
        {/* Animated code label */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-xs font-mono text-accent-purple border border-accent-purple/20 bg-accent-purple/5 px-3 py-1 rounded-full"
        >
          ERROR CODE: 404
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl font-bold tracking-tight text-[#111827] font-sans"
        >
          Page Not Found.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm sm:text-base text-foreground/50 leading-relaxed font-light"
        >
          The system was unable to find the requested resource. The endpoint may have been moved, deleted, or does not exist.
        </motion.p>

        {/* Back to Home Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-4"
        >
          <Button
            variant="primary"
            glow
            onClick={() => window.location.href = '/'}
            className="group"
          >
            <Home className="h-4 w-4 mr-2" />
            <span>Return to Command Center</span>
            <ArrowRight className="h-4 w-4 ml-1 opacity-30 group-hover:translate-x-0.5 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
