'use client';

import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollControllerProps {
  scrollProgressRef: React.MutableRefObject<number>;
  children?: React.ReactNode;
}

export function ScrollController({ scrollProgressRef, children }: ScrollControllerProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5
    });

    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    // 2. Global ScrollTrigger binding across whole document length
    const st = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        scrollProgressRef.current = self.progress;
      }
    });

    // 3. Optional subtle 2px to 8px card parallax floating effect on UI elements
    const cards = document.querySelectorAll('.card-parallax, [data-parallax]');
    cards.forEach((card) => {
      gsap.to(card, {
        y: -6,
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });

    return () => {
      st.kill();
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, [scrollProgressRef]);

  return <>{children}</>;
}
