"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Eye, ShieldCheck, Cpu, Lightbulb, Users, Zap } from "lucide-react";
import { AboutCard } from "@/components/ui/about-card";
import { useHorizontalScroll } from "@/hooks/use-horizontal-scroll";

// ─── Card Data ────────────────────────────────────────────────────────────────
const CARDS = [
  {
    title: "Our Mission",
    description: (
      <>
        To build <span style={{color:'#FF5C00',fontWeight:600}}>software assets</span> that drive <span style={{color:'#FF5C00',fontWeight:600}}>business equity</span>. We solve hard problems with structured, reliable, and clean solutions.
      </>
    ),
    icon: Cpu,
  },
  {
    title: "Our Vision",
    description: (
      <>
        To establish the <span style={{color:'#FF5C00',fontWeight:600}}>engineering benchmark</span> for software development, helping enterprises transition into <span style={{color:'#FF5C00',fontWeight:600}}>AI-driven operational efficiency</span>.
      </>
    ),
    icon: Eye,
  },
  {
    title: "Engineering Philosophy",
    description: (
      <>
        <span style={{color:'#FF5C00',fontWeight:600}}>No shortcut frameworks</span>. We utilize strong static typing, server-side caching, secure authorization models, and <span style={{color:'#FF5C00',fontWeight:600}}>modular architecture</span>.
      </>
    ),
    icon: ShieldCheck,
  },
  {
    title: "Innovation First",
    description: (
      <>
        We stay <span style={{color:'#FF5C00',fontWeight:600}}>ahead of the curve</span> — adopting proven emerging technologies strategically so our clients <span style={{color:'#FF5C00',fontWeight:600}}>lead, not follow</span>.
      </>
    ),
    icon: Lightbulb,
  },
  {
    title: "Client Partnership",
    description: (
      <>
        We <span style={{color:'#FF5C00',fontWeight:600}}>embed ourselves</span> in your processes and goals. Transparent communication and collaborative planning are non-negotiable.
      </>
    ),
    icon: Users,
  },
  {
    title: "Delivery at Speed",
    description: (
      <>
        <span style={{color:'#FF5C00',fontWeight:600}}>Structured sprints</span>, rigorous CI/CD, and automated testing pipelines ensure we <span style={{color:'#FF5C00',fontWeight:600}}>ship fast</span> without sacrificing quality.
      </>
    ),
    icon: Zap,
  },
];

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
    <div className="space-y-5 max-w-lg">
      <span className="text-xs font-mono uppercase tracking-widest font-semibold" style={{ color: '#FF5C00' }}>
        About SHP Stacks
      </span>
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight font-sans leading-tight" style={{ color: '#FFFFFF' }}>
        We Build Software<br />That Scales Businesses.
      </h2>
      <div className="w-12 h-0.5 rounded-full" style={{ background: 'linear-gradient(90deg, #FF5C00, #E8372A)' }} />
      <p className="text-sm sm:text-base leading-relaxed max-w-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
        SHP Stacks is a premium software development firm. We partner with
        ambitious enterprises and scaling SaaS companies to build
        mission&#8209;critical digital products.
      </p>
    </div>
  );
}

// ─── Desktop horizontal-scroll inner component ────────────────────────────────
function DesktopAbout() {
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
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
    
    setTravel(trav);
    setOuterHeight(`calc(100vh + ${trav}px)`);

    // Apply horizontal translate directly to DOM node
    const xVal = -(scrollProgress * trav);
    stripRef.current.style.transform = `translate3d(${xVal}px, 0, 0)`;

    // Calculate which card is closest to the center of the viewport
    const cardWidthWithGap = 360 + 24; // 384
    const idealIndex = -xVal / cardWidthWithGap;
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
            className="absolute top-1/2 left-1/4 -translate-y-1/2 h-[500px] w-[700px] rounded-full bg-[rgba(255,92,0,0.06)] blur-[140px]"
            aria-hidden="true"
          />
        </div>

        {/* Progress indicator */}
        <div
          className="absolute top-0 left-0 h-[2px] transition-none z-50"
          style={{ width: `${scrollProgress * 100}%`, opacity: isActive ? 1 : 0, background: '#FF5C00' }}
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
                const opacity = 1.0 - 0.45 * factor;
                const scale = 1.0 - 0.05 * factor;
                const zTranslate = -25 * factor;
                const rotateY = (dist > 0 ? 2.5 : -2.5) * factor;

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
                        transform: `perspective(1200px) translate3d(0, 0, ${zTranslate}px) rotateY(${rotateY}deg) scale(${scale})`,
                        transition: "none",
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
            style={{ opacity: isActive ? 0 : 0.6 }}
            aria-hidden="true"
          >
            <div className="flex gap-1.5">
              {CARDS.map((_, i) => (
                <div
                  key={i}
                  className="h-[3px] rounded-full transition-all duration-400"
                  style={{
                    width: i === activeIndex ? '28px' : '6px',
                    background: i === activeIndex
                      ? 'linear-gradient(90deg, #FF5C00, #E8372A)'
                      : 'rgba(255,255,255,0.1)',
                  }}
                />
              ))}
            </div>
            <span className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.3)' }}>Scroll to explore</span>
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
    const mq = window.matchMedia("(max-width: 767px)");
    const rmq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const onMQ = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    const onRMQ = (e: MediaQueryListEvent) => setReducedMotion(e.matches);

    mq.addEventListener("change", onMQ);
    rmq.addEventListener("change", onRMQ);

    const frameId = requestAnimationFrame(() => {
      setMounted(true);
      setIsMobile(mq.matches);
      setReducedMotion(rmq.matches);
    });

    return () => {
      cancelAnimationFrame(frameId);
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
