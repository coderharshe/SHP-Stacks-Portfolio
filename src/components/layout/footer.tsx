"use client";

import React from 'react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';

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

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: 'About Us',      href: '#about'          },
      { label: 'Team',          href: '#team'           },
      { label: 'Why Choose Us', href: '#why-choose-us'  },
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
      className="relative border-t pt-16 pb-12 z-10 overflow-hidden"
      style={{
        borderColor: 'rgba(241,255,250,0.07)',
        background: '#222323',
      }}
    >
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.08] -z-10" />

      {/* Subtle gold blob bottom-left */}
      <div
        className="absolute bottom-0 left-[-5%] h-[200px] w-[300px] rounded-full -z-10"
        style={{ background: 'rgba(183,158,54,0.04)', filter: 'blur(80px)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12">

          {/* Brand */}
          <div className="lg:col-span-2 space-y-6">
            <a href="#hero" onClick={(e) => handleSectionScroll(e, '#hero')} className="flex items-center gap-2.5 group w-fit">
              <SHPLogoMark className="h-8 w-8 text-[#F1FFFA] group-hover:text-[#B79E36] transition-colors duration-300" />
              <span className="font-sans text-[#F1FFFA] text-base leading-none">
                <span className="font-black tracking-tight">SHP</span>
                <span className="font-light tracking-tight">Stacks</span>
              </span>
            </a>

            <p className="text-sm text-[#F1FFFA]/45 max-w-sm leading-relaxed">
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
                  className="rounded-lg p-2 text-[#F1FFFA]/40 transition-all duration-300 hover:text-[#F1FFFA] hover:bg-[#F1FFFA]/06"
                  style={{ border: '1px solid rgba(241,255,250,0.08)' }}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#F1FFFA]/35 capitalize">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleSectionScroll(e, link.href)}
                      className="text-sm text-[#F1FFFA]/55 hover:text-[#F1FFFA] transition-colors duration-200"
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
          className="border-t pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderColor: 'rgba(241,255,250,0.06)' }}
        >
          <div className="text-xs text-[#F1FFFA]/35 font-mono">
            &copy; {currentYear} SHP Stacks. All rights reserved.
          </div>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 text-xs font-mono text-[#F1FFFA]/35 hover:text-[#F1FFFA] group transition-colors duration-200 cursor-pointer"
          >
            <span>BACK TO TOP</span>
            <span
              className="rounded-full p-1.5 group-hover:bg-[#F1FFFA]/05 transition-all"
              style={{ border: '1px solid rgba(241,255,250,0.08)' }}
            >
              <ArrowUp className="h-3 w-3 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};
