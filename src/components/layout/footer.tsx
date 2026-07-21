"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowUp, Github, Linkedin, Mail, Phone } from 'lucide-react';

const SHPLogoMark = ({ className }: { className?: string }) => (
  <img
    src="/shp-stacks-logo.png"
    alt="SHP Stacks Logo"
    className={cn('object-contain', className)}
  />
);

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: 'About Us',      href: '#about'         },
      { label: 'Why Choose Us', href: '#why-choose-us' },
    ],
    services: [
      { label: 'Custom Software', href: '#services' },
      { label: 'AI Applications', href: '#services' },
      { label: 'Web Development', href: '#services' },
      { label: 'SaaS Solutions',  href: '#services' },
    ],
    resources: [
      { label: 'Featured Projects', href: '#projects' },
      { label: 'Process Timeline',  href: '#process'  },
      { label: 'FAQ',               href: '#faq'      },
    ],
  };

  const handleSectionScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      className="relative pt-16 pb-12 z-10 overflow-hidden"
      style={{
        borderTop: '1px solid rgba(255,255,255,0.08)',
        background: 'rgba(15, 17, 21, 0.92)',
      }}
    >
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.10] -z-10" />

      {/* Orange ambient blob */}
      <div
        className="absolute bottom-0 left-[-5%] h-[180px] w-[280px] rounded-full -z-10"
        style={{ background: 'rgba(255,92,0,0.06)', filter: 'blur(80px)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12">

          {/* Brand */}
          <div className="lg:col-span-2 space-y-6">
            <a href="#hero" onClick={(e) => handleSectionScroll(e, '#hero')} className="flex items-center gap-2.5 group w-fit">
              <SHPLogoMark className="h-9 w-9" />
              <span className="font-sans text-base leading-none">
                <span className="font-black tracking-tight" style={{ color: '#F0F1F3' }}>SHP</span>
                <span className="font-light tracking-tight" style={{ color: '#E8372A' }}>Stacks</span>
              </span>
            </a>

            <p className="text-sm max-w-sm leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>
              Engineering Modern Software. Building Businesses. We combine strict engineering
              standards with high-end design to solve complex industrial problems.
            </p>

            {/* Contact info */}
            <div className="space-y-3">
              <a
                href="mailto:shpstack@gmail.com"
                className="flex items-center gap-3 group"
              >
                <div
                  className="h-8 w-8 rounded-md flex items-center justify-center shrink-0 transition-colors"
                  style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(232,55,42,0.30)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)')}
                >
                  <Mail className="h-3.5 w-3.5" style={{ color: '#E8372A' }} />
                </div>
                <span
                  className="text-sm transition-colors duration-200"
                  style={{ color: 'var(--text-tertiary)' }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#E8372A')}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text-tertiary)')}
                >
                  shpstack@gmail.com
                </span>
              </a>

              <a
                href="tel:+919279381411"
                className="flex items-center gap-3 group"
              >
                <div
                  className="h-8 w-8 rounded-md flex items-center justify-center shrink-0 transition-colors"
                  style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(232,55,42,0.30)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)')}
                >
                  <Phone className="h-3.5 w-3.5" style={{ color: '#E8372A' }} />
                </div>
                <span
                  className="text-sm transition-colors duration-200"
                  style={{ color: 'var(--text-tertiary)' }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#E8372A')}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text-tertiary)')}
                >
                  +91 92793 81411
                </span>
              </a>

              {/* Social icon links */}
              <div className="flex items-center gap-2 pt-1">
                {[
                  { href: 'https://github.com',  icon: <Github   className="h-4 w-4" />, label: 'GitHub'   },
                  { href: 'https://linkedin.com', icon: <Linkedin className="h-4 w-4" />, label: 'LinkedIn' },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="rounded-lg p-2 transition-all duration-300"
                    style={{ color: 'var(--text-tertiary)', border: '1px solid rgba(255,255,255,0.07)' }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.color = '#E8372A';
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(232,55,42,0.25)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.color = 'var(--text-tertiary)';
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)';
                    }}
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-widest capitalize" style={{ color: 'var(--text-disabled)' }}>
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleSectionScroll(e, link.href)}
                      className="text-sm transition-colors duration-200"
                      style={{ color: 'var(--text-tertiary)' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#E8372A')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-tertiary)')}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div className="text-xs font-mono" style={{ color: 'var(--text-disabled)' }}>
            &copy; {currentYear} SHP Stacks. All rights reserved.
          </div>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 text-xs font-mono transition-colors duration-200 cursor-pointer group"
            style={{ color: 'var(--text-disabled)' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#E8372A')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-disabled)')}
          >
            <span>BACK TO TOP</span>
            <span
              className="rounded-full p-1.5 transition-all group-hover:bg-[rgba(232,55,42,0.08)]"
              style={{ border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <ArrowUp className="h-3 w-3 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};
