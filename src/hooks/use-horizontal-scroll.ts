"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface HorizontalScrollState {
  /** 0 → 1 scroll progress through the horizontal travel */
  scrollProgress: number;
  /** true while the section is in its pinned phase */
  isActive: boolean;
}

/**
 * Converts the user's vertical scroll into a 0→1 progress value while the
 * section occupies the viewport.
 *
 * @param sectionRef   ref attached to the outer scroll-height wrapper
 * @param trackRef     ref attached to the horizontally overflowing strip
 * @param enabled      false on mobile / reduced-motion to skip all logic
 */
export function useHorizontalScroll(
  sectionRef: React.RefObject<HTMLElement | null>,
  trackRef: React.RefObject<HTMLElement | null>,
  enabled: boolean
): HorizontalScrollState {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!enabled || !sectionRef.current || !trackRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const updateTrigger = () => {
      const parentWidth =
        trackRef.current?.parentElement?.clientWidth || window.innerWidth;
      const stripWidth =
        trackRef.current?.scrollWidth || trackRef.current?.offsetWidth || 0;
      return Math.max(0, stripWidth - parentWidth);
    };

    let travel = updateTrigger();

    const triggerInstance = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: () => `+=${travel}`,
      scrub: true,
      onUpdate: (self) => {
        setScrollProgress(self.progress);
        setIsActive(self.isActive);
      },
    });

    const handleResize = () => {
      travel = updateTrigger();
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // ResizeObserver watches the track element for width changes
    const observer = new ResizeObserver(() => {
      travel = updateTrigger();
      ScrollTrigger.refresh();
    });
    observer.observe(trackRef.current);

    // Initial sync
    setScrollProgress(triggerInstance.progress);
    setIsActive(triggerInstance.isActive);

    return () => {
      triggerInstance.kill();
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, [enabled, sectionRef, trackRef]);

  return { scrollProgress, isActive };
}

