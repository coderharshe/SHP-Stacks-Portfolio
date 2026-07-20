"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Eye, ShieldCheck, Cpu, Lightbulb, Users, Zap } from "lucide-react";
import { AboutCard } from "@/components/ui/about-card";
import { useHorizontalScroll } from "@/hooks/use-horizontal-scroll";
import { CameraReactive } from "@/components/ui/CameraReactive";

// ─── Card Data ────────────────────────────────────────────────────────────────
const CARDS = [
  {
    title: "Our Mission",
    description:
      "To build software assets that drive business equity. We solve hard problems with structured, reliable, and clean solutions.",
    icon: Cpu,
  },
  {
    title: "Our Vision",
    description:
      "To establish the engineering benchmark for software development, helping enterprises transition into AI-driven operational efficiency.",
    icon: Eye,
  },
  {
    title: "Engineering Philosophy",
    description:
      "No shortcut frameworks. We utilize strong static typing, server-side caching, secure authorization models, and modular architecture.",
    icon: ShieldCheck,
  },
  {
    title: "Innovation First",
    description:
      "We stay ahead of the curve — adopting proven emerging technologies strategically so our clients lead, not follow.",
    icon: Lightbulb,
  },
  {
    title: "Client Partnership",
    description:
      "We embed ourselves in your processes and goals. Transparent communication and collaborative planning are non-negotiable.",
    icon: Users,
  },
  {
    title: "Delivery at Speed",
    description:
      "Structured sprints, rigorous CI/CD, and automated testing pipelines ensure we ship fast without sacrificing quality.",
    icon: Zap,
  },
] as const;

// ─── Animation variants (used in mobile / reduced-motion paths) ───────────────
const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

// ─── Shared Static Content Layer ────────────────────────────────────────────────
function SectionHeader() {
  return (
    <div className="space-y-4 max-w-lg">
      <span className="text-xs font-mono uppercase tracking-widest font-semibold" style={{ color: '#E8372A' }}>
        About SHP Stacks
      </span>
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight font-sans leading-tight" style={{ color: '#F0F1F3' }}>
        We Build Software<br />That Scales Businesses.
      </h2>
      <p className="text-sm sm:text-base leading-relaxed font-bold max-w-sm" style={{ color: '#F0F1F3' }}>
        SHP Stacks is a premium software development firm. We partner with
        ambitious enterprises and scaling SaaS companies to build
        mission&#8209;critical digital products.
      </p>
    </div>
  );
}

// ─── Desktop horizontal-scroll inner component ────────────────────────────────
// ─── Desktop horizontal-scroll inner component ────────────────────────────────
function DesktopAbout() {
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [parentWidth, setParentWidth] = useState(1200);
  const [travel, setTravel] = useState(0);

  // scrollProgress 0→1, isActive = currently pinned
  const { scrollProgress, isActive } = useHorizontalScroll(
    outerRef as React.RefObject<HTMLElement | null>,
    stripRef as React.RefObject<HTMLElement | null>,
    true
  );

  // Dynamically compute the outer height so that 1px scroll = 1px horizontal travel
  const [outerHeight, setOuterHeight] = useState("100vh");

  const updateCalculations = useCallback(() => {
    if (!stripRef.current || !trackRef.current) return;
    const pWidth = trackRef.current.clientWidth || window.innerWidth;
    const stripWidth = stripRef.current.scrollWidth || stripRef.current.offsetWidth;
    const trav = Math.max(0, stripWidth - pWidth);
    
    setParentWidth(pWidth);
    setTravel(trav);
    setOuterHeight(`calc(100vh + ${trav}px)`);

    // Apply horizontal translate directly to DOM node
    const xVal = -(scrollProgress * trav);
    stripRef.current.style.transform = `translate3d(${xVal}px, 0, 0)`;

    // Calculate which card is closest to the center
    const cardWidthWithGap = 360 + 24; // 384
    const idealIndex = (-xVal - (pWidth / 2)) / cardWidthWithGap;
    let closestIndex = Math.round(idealIndex);
    closestIndex = Math.max(0, Math.min(CARDS.length - 1, closestIndex));
    setActiveIndex(closestIndex);
  }, [scrollProgress]);

  useEffect(() => {
    updateCalculations();
    const observer = new ResizeObserver(updateCalculations);
    if (stripRef.current) observer.observe(stripRef.current);
    window.addEventListener("resize", updateCalculations, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateCalculations);
    };
  }, [updateCalculations]);

  const x = -(scrollProgress * travel);

  return (
    // Outer: provides the scroll height that the browser actually scrolls through
    <div
      ref={outerRef}
      style={{ height: outerHeight }}
      className="relative"
      aria-label="About section — scroll to explore"
    >
      {/* Pinned Container — Stays fixed while outer is in viewport */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        
        {/* Background (Fixed) */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div
            className="absolute top-1/2 left-1/4 -translate-y-1/2 h-[500px] w-[700px] rounded-full bg-[rgba(239,68,68,0.04)] blur-[140px]"
            aria-hidden="true"
          />
        </div>

        {/* Progress indicator */}
        <div
          className="absolute top-0 left-0 h-[2px] transition-none z-50"
          style={{ width: `${scrollProgress * 100}%`, opacity: isActive ? 1 : 0, background: '#E8372A' }}
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col gap-12 w-full h-full justify-center max-w-[1600px] mx-auto">
          
          {/* Layer 1: Static Content Layer (Never moves vertically or horizontally) */}
          <div className="px-6 sm:px-12 lg:px-20 w-full flex-shrink-0">
            <SectionHeader />
          </div>

          {/* Layer 2: Horizontal Card Track (Only this translates) */}
          <div ref={trackRef} className="overflow-hidden w-full flex-shrink-0">
            <div
              ref={stripRef}
              className="flex gap-6 w-max items-center will-change-transform"
              role="list"
              aria-label="About cards"
            >
              {/* Left padding sentinel: Starts exactly centered (50vw - 180px) */}
              <div className="flex-shrink-0 w-[calc(50vw-180px)]" aria-hidden="true" />

              {CARDS.map((card, i) => {
                // Calculate dynamic proximity styles
                const cardWidthWithGap = 360 + 24; // 384
                const dist = i * cardWidthWithGap + x;
                const factor = Math.min(1, Math.max(0, Math.abs(dist) / cardWidthWithGap));

                // Interpolated styling values
                const opacity = 1.0 - 0.65 * factor;
                const scale = 1.0 - 0.08 * factor;
                const zTranslate = -40 * factor;
                const rotateY = (dist > 0 ? 4 : -4) * factor;

                // Border color interpolation
                const redOpacity = 0.25 * (1 - factor);
                const borderOpacity = 0.06 + redOpacity;
                const borderColor = `rgba(${Math.round(232 * (1 - factor) + 255 * factor)}, ${Math.round(55 * (1 - factor) + 255 * factor)}, ${Math.round(42 * (1 - factor) + 255 * factor)}, ${borderOpacity})`;

                return (
                  <div key={card.title} role="listitem" className="flex-shrink-0">
                    <AboutCard
                      title={card.title}
                      description={card.description}
                      icon={card.icon}
                      isActive={i === activeIndex}
                      index={i}
                      style={{
                        opacity,
                        transform: `perspective(1000px) translate3d(0, 0, ${zTranslate}px) rotateY(${rotateY}deg) scale(${scale})`,
                        borderColor,
                        transition: "none", // Avoids fighting real-time scroll updates
                      }}
                    />
                  </div>
                );
              })}

              {/* Right padding sentinel: Last card centered on exit */}
              <div className="flex-shrink-0 w-[calc(50vw-180px)]" aria-hidden="true" />
            </div>
          </div>

          {/* Static Scroll Hint */}
          <div
            className="px-6 sm:px-12 lg:px-20 flex items-center gap-3 transition-opacity duration-500 flex-shrink-0"
            style={{ opacity: isActive ? 0 : 0.5 }}
            aria-hidden="true"
          >
            <div className="flex gap-1">
              {CARDS.map((_, i) => (
                <div
                  key={i}
                  className="h-1 rounded-full transition-all duration-300"
                  style={{
                    width: i === activeIndex ? "24px" : "6px",
                    background: i === activeIndex ? "#E8372A" : "rgba(255,255,255,0.12)",
                  }}
                />
              ))}
            </div>
            <span className="text-xs font-mono" style={{ color: '#3D4150' }}>Scroll to explore</span>
          </div>
        </div>
      </div>
    </div>
  );
}


// ─── Mobile vertical-stack fallback ───────────────────────────────────────────
function MobileAbout() {
  return (
    <div className="py-20 px-5 space-y-10">
      <SectionHeader />

      <div className="space-y-5" role="list" aria-label="About cards">
        {CARDS.map((card, i) => (
          <motion.div
            key={card.title}
            role="listitem"
            custom={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-2%" }}
          >
            <AboutCard
              title={card.title}
              description={card.description}
              icon={card.icon}
              isActive
              index={i}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Reduced-motion static grid ────────────────────────────────────────────────
function StaticAbout() {
  return (
    <div className="py-24 px-6 sm:px-12 lg:px-20 space-y-12">
      <SectionHeader />
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        role="list"
        aria-label="About cards"
      >
        {CARDS.map((card, i) => (
          <div key={card.title} role="listitem">
            <AboutCard
              title={card.title}
              description={card.description}
              icon={card.icon}
              isActive
              index={i}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Root exported component ───────────────────────────────────────────────────
export const About: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const mq = window.matchMedia("(max-width: 767px)");
    const rmq = window.matchMedia("(prefers-reduced-motion: reduce)");

    setIsMobile(mq.matches);
    setReducedMotion(rmq.matches);

    const onMQ = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    const onRMQ = (e: MediaQueryListEvent) => setReducedMotion(e.matches);

    mq.addEventListener("change", onMQ);
    rmq.addEventListener("change", onRMQ);
    return () => {
      mq.removeEventListener("change", onMQ);
      rmq.removeEventListener("change", onRMQ);
    };
  }, []);

  // Avoid hydration mismatch — render nothing until client confirms env
  if (!mounted) return null;

  return (
    <section
      id="about"
      className="relative border-t border-[rgba(255,255,255,0.05)] bg-transparent"
    >
      {reducedMotion ? (
        <StaticAbout />
      ) : isMobile ? (
        <MobileAbout />
      ) : (
        <DesktopAbout />
      )}
    </section>
  );
};
