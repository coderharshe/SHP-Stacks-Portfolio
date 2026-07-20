"use client";

import React from 'react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';

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
        borderTop: '1px solid rgba(255,255,255,0.06)',
        background: 'transparent',
      }}
    >
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.15] -z-10" />

      {/* Red ambient blob */}
      <div
        className="absolute bottom-0 left-[-5%] h-[180px] w-[280px] rounded-full -z-10"
        style={{ background: 'rgba(232,55,42,0.06)', filter: 'blur(80px)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12">

          {/* Brand */}
          <div className="lg:col-span-2 space-y-6">
            <a href="#hero" onClick={(e) => handleSectionScroll(e, '#hero')} className="flex items-center gap-2.5 group w-fit">
              <SHPLogoMark className="h-8 w-8 text-[#E8372A] group-hover:text-[#F04438] transition-colors duration-300" />
              <span className="font-sans text-base leading-none">
                <span className="font-black tracking-tight" style={{ color: '#F0F1F3' }}>SHP</span>
                <span className="font-light tracking-tight" style={{ color: '#E8372A' }}>Stacks</span>
              </span>
            </a>

            <p className="text-sm max-w-sm leading-relaxed" style={{ color: '#6B7080' }}>
              Engineering Modern Software. Building Businesses. We combine strict engineering
              standards with high-end design to solve complex industrial problems.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {[
                { href: 'https://github.com',          icon: <Github  className="h-4 w-4" />, label: 'GitHub'   },
                { href: 'https://linkedin.com',         icon: <Linkedin className="h-4 w-4" />, label: 'LinkedIn' },
                { href: 'mailto:contact@shpstacks.com', icon: <Mail    className="h-4 w-4" />, label: 'Email'    },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={item.label}
                  className="rounded-lg p-2 transition-all duration-300 group"
                  style={{
                    color: '#6B7080',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.color = '#E8372A';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(232,55,42,0.25)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.color = '#6B7080';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)';
                  }}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-widest capitalize" style={{ color: '#3D4150' }}>
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleSectionScroll(e, link.href)}
                      className="text-sm transition-colors duration-200"
                      style={{ color: '#6B7080' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#E8372A')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#6B7080')}
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
          <div className="text-xs font-mono" style={{ color: '#3D4150' }}>
            &copy; {currentYear} SHP Stacks. All rights reserved.
          </div>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 text-xs font-mono transition-colors duration-200 cursor-pointer group"
            style={{ color: '#3D4150' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#E8372A')}
            onMouseLeave={e => (e.currentTarget.style.color = '#3D4150')}
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
