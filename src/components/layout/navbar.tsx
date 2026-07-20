"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useScrollPosition } from '@/hooks/use-scroll-position';
import { useActiveSection } from '@/hooks/use-active-section';
import { Button } from '@/components/ui/button';
import { CameraReactive } from '@/components/ui/CameraReactive';

/** Inline SHP Stacks isometric logo mark */
const SHPLogoMark = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <polygon points="15,30 50,13 85,30 50,47" fill="currentColor" />
    <polygon points="15,30 15,40 50,57 50,47" fill="currentColor" opacity="0.6" />
    <polygon points="85,30 85,40 50,57 50,47" fill="currentColor" opacity="0.4" />
    <polygon points="15,58 50,41 85,58 50,75" fill="currentColor" />
    <polygon points="15,58 15,68 50,85 50,75" fill="currentColor" opacity="0.6" />
    <polygon points="85,58 85,68 50,85 50,75" fill="currentColor" opacity="0.4" />
  </svg>
);

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const scrollY = useScrollPosition();
  const [scrollProgress, setScrollProgress] = useState(0);

  const sectionIds = ['hero', 'about', 'services', 'projects', 'why-choose-us', 'tech-stack', 'process', 'faq'];
  const activeSection = useActiveSection(sectionIds);

  const navLinks = [
    { label: 'About',    href: '#about',    section: 'about'    },
    { label: 'Services', href: '#services', section: 'services' },
    { label: 'Projects', href: '#projects', section: 'projects' },
    { label: 'Process',  href: '#process',  section: 'process'  },
    { label: 'FAQ',      href: '#faq',      section: 'faq'      },
  ];

  useEffect(() => {
    const handleProgress = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) setScrollProgress((window.scrollY / totalHeight) * 100);
    };
    window.addEventListener('scroll', handleProgress);
    return () => window.removeEventListener('scroll', handleProgress);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          scrollY > 20 ? "glass-nav py-3" : "bg-transparent py-5 border-b border-transparent"
        )}
      >
        {/* Scroll Progress Bar — SHP Red */}
        <div
          className="absolute top-0 left-0 h-[2px] transition-all duration-75"
          style={{
            width: `${scrollProgress}%`,
            background: 'linear-gradient(90deg, #E8372A, #F04438)',
          }}
        />

        <CameraReactive depth="nav" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">

            {/* ── Logo ── */}
            <a
              href="#hero"
              onClick={(e) => handleLinkClick(e, '#hero')}
              className="flex items-center gap-2.5 group cursor-pointer"
            >
              <div className="relative h-7 w-7 flex-shrink-0">
                <SHPLogoMark className="h-7 w-7 text-[#E8372A] group-hover:text-[#F04438] transition-colors duration-300" />
              </div>
              <span className="font-sans text-base leading-none">
                <span className="font-black tracking-tight" style={{ color: '#F0F1F3' }}>SHP</span>
                <span className="font-light tracking-tight" style={{ color: '#E8372A' }}>Stacks</span>
              </span>
            </a>

            {/* ── Desktop Nav ── */}
            <nav className="hidden md:flex items-center gap-7">
              {navLinks.map((link) => {
                const isActive = activeSection === link.section;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="relative text-sm font-medium transition-colors duration-200 py-1.5 cursor-pointer"
                    style={{ color: isActive ? '#F0F1F3' : '#6B7080' }}
                    onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = '#A8ACBA'; }}
                    onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = '#6B7080'; }}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full"
                        style={{ background: '#E8372A' }}
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* ── Desktop CTA ── */}
            <div className="hidden md:flex items-center gap-4">
              <Button
                variant="primary"
                onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}
                className="group"
              >
                <span>Start Your Project</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </div>

            {/* ── Mobile Toggle ── */}
            <div className="flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 cursor-pointer focus:outline-none transition-colors duration-200"
                style={{ color: '#6B7080' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#F0F1F3')}
                onMouseLeave={e => (e.currentTarget.style.color = '#6B7080')}
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </CameraReactive>

        {/* ── Mobile Drawer ── */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden overflow-hidden absolute top-full left-0 right-0"
              style={{
                background: 'rgba(10,11,13,0.97)',
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div className="px-4 pt-4 pb-6 space-y-1 flex flex-col items-start">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.section;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="w-full text-base font-medium py-3 cursor-pointer transition-colors duration-200"
                      style={{
                        color: isActive ? '#E8372A' : '#6B7080',
                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                        fontWeight: isActive ? 600 : 400,
                      }}
                    >
                      {link.label}
                    </a>
                  );
                })}
                <Button
                  variant="primary"
                  onClick={() => {
                    setIsOpen(false);
                    document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full justify-between group mt-4"
                >
                  <span>Start Your Project</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
