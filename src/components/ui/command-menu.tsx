"use client";

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Hash, Code, Briefcase, FileText, X } from 'lucide-react';
import { SERVICES_DATA, PROJECTS_DATA } from '@/constants/data';
import { useLockBodyScroll } from '@/hooks/use-lock-body-scroll';

export const CommandMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useLockBodyScroll(isOpen);

  // Listen for Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  interface CommandItem {
    id: string;
    name: string;
    type: string;
    sectionId?: string;
    icon: React.ComponentType<{ className?: string }>;
  }

  // Handle select callback
  const handleSelect = React.useCallback((item: CommandItem) => {
    setIsOpen(false);
    const targetId = item.sectionId || item.id;
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
        setSearch('');
        setSelectedIndex(0);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Command items definition
  const navigationItems: CommandItem[] = [
    { id: 'hero', name: 'Home / Hero Section', type: 'section', icon: Hash },
    { id: 'about', name: 'About SHP Stacks', type: 'section', icon: FileText },
    { id: 'services', name: 'Our Services', type: 'section', icon: Code },
    { id: 'projects', name: 'Featured Projects', type: 'section', icon: Briefcase },
    { id: 'why-choose-us', name: 'Why Choose Us', type: 'section', icon: Hash },
    { id: 'tech-stack', name: 'Technologies We Use', type: 'section', icon: Hash },
    { id: 'process', name: 'Our Development Process', type: 'section', icon: Hash },
    { id: 'team', name: 'Meet the Founders', type: 'section', icon: Hash },
    { id: 'faq', name: 'Frequently Asked Questions', type: 'section', icon: Hash },
    { id: 'cta', name: 'Start a Project / Contact Us', type: 'section', icon: Hash },
  ];

  const projectItems: CommandItem[] = PROJECTS_DATA.map(p => ({
    id: `project-${p.id}`,
    name: `Project: ${p.title}`,
    type: 'project',
    sectionId: 'projects',
    icon: Briefcase
  }));

  const serviceItems: CommandItem[] = SERVICES_DATA.map(s => ({
    id: `service-${s.id}`,
    name: `Service: ${s.title}`,
    type: 'service',
    sectionId: 'services',
    icon: Code
  }));

  const allItems = [...navigationItems, ...serviceItems, ...projectItems];

  // Filter items
  const filteredItems = allItems.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // Handle arrow key selections
  useEffect(() => {
    const handleKeys = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          handleSelect(filteredItems[selectedIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeys);
    return () => window.removeEventListener('keydown', handleKeys);
  }, [isOpen, filteredItems, selectedIndex, handleSelect]);

  // Adjust scroll position when navigating with arrow keys
  useEffect(() => {
    if (!scrollRef.current) return;
    const selectedElement = scrollRef.current.children[selectedIndex] as HTMLElement;
    if (!selectedElement) return;

    const container = scrollRef.current;
    const selectedTop = selectedElement.offsetTop;
    const selectedBottom = selectedTop + selectedElement.offsetHeight;
    const containerTop = container.scrollTop;
    const containerBottom = containerTop + container.clientHeight;

    if (selectedTop < containerTop) {
      container.scrollTop = selectedTop;
    } else if (selectedBottom > containerBottom) {
      container.scrollTop = selectedBottom - container.clientHeight;
    }
  }, [selectedIndex]);

  return (
    <>
      {/* Floating CMD+K Indicator in bottom-right corner for mouse users */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-20 z-40 hidden md:flex items-center gap-2 rounded-full border border-border bg-card/85 px-4 py-2 text-xs text-foreground/50 hover:text-white hover:border-white/20 transition-all duration-300 backdrop-blur-md cursor-pointer shadow-lg"
      >
        <Search className="h-3.5 w-3.5" />
        <span>Search site</span>
        <kbd className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-mono border border-white/5">Ctrl K</kbd>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-9999 flex items-start justify-center pt-[15vh] px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Dialog Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              ref={containerRef}
              className="relative w-full max-w-lg overflow-hidden rounded-xl border border-border bg-card/95 shadow-[0_32px_64px_rgba(0,0,0,0.6)] backdrop-blur-md flex flex-col"
            >
              {/* Search Header */}
              <div className="flex items-center border-b border-border px-4 py-3.5">
                <Search className="h-5 w-5 text-foreground/40 mr-3 flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Type a command or search..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setSelectedIndex(0);
                  }}
                  className="w-full bg-transparent text-sm text-foreground placeholder-foreground/30 focus:outline-none"
                />
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded text-foreground/40 hover:bg-white/5 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Items List */}
              <div
                ref={scrollRef}
                className="max-h-[320px] overflow-y-auto p-2 no-scrollbar"
              >
                {filteredItems.length > 0 ? (
                  filteredItems.map((item, idx) => {
                    const IconComponent = item.icon;
                    const isSelected = idx === selectedIndex;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSelect(item)}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-all duration-150 cursor-pointer ${
                          isSelected 
                            ? 'bg-white/10 text-white font-medium shadow-[0_0_15px_rgba(255,255,255,0.03)]' 
                            : 'text-foreground/75 hover:bg-white/5 hover:text-foreground'
                        }`}
                      >
                        <IconComponent className={`h-4 w-4 flex-shrink-0 ${
                          isSelected ? 'text-accent-blue' : 'text-foreground/40'
                        }`} />
                        <span className="flex-grow truncate">{item.name}</span>
                        <span className="text-[10px] text-foreground/30 uppercase tracking-wider font-mono">
                          {item.type}
                        </span>
                      </button>
                    );
                  })
                ) : (
                  <div className="py-8 text-center text-sm text-foreground/45">
                    No results found for &ldquo;{search}&rdquo;.
                  </div>
                )}
              </div>

              {/* Footer Help */}
              <div className="flex items-center justify-between border-t border-border px-4 py-2.5 text-[10px] text-foreground/40 font-mono">
                <div className="flex items-center gap-3">
                  <span>↑↓ Navigate</span>
                  <span>↵ Select</span>
                </div>
                <span>ESC to Close</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
