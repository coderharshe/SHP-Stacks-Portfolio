"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, ArrowRight, Compass, Activity, Wifi, Clock,
  MapPin, Cpu, Shield, Radio
} from 'lucide-react';
import { PROJECTS_DATA, ProjectItem } from '@/constants/data';
import { Button } from '@/components/ui/button';
import { CameraReactive } from '@/components/ui/CameraReactive';

// Extended technical metadata for the luxury automotive dashboard mapping
const PROJECT_DETAILS_EXT: Record<string, {
  distance: string;
  industry: string;
  role: string;
  timeline: string;
  region: string;
  latency: string;
  sprint: string;
  buildVer: string;
  statusText: string;
  objective: string;
}> = {
  'oceon-wms': {
    distance: '32 km',
    industry: 'Logistics',
    role: 'System Architect',
    timeline: '6 Weeks',
    region: 'us-east-1',
    latency: '12ms',
    sprint: 'S-24',
    buildVer: 'v2.4.1',
    statusText: 'ACTIVE DESTINATION',
    objective: 'Deploy automated storage routing algorithms and high-velocity scanner integrations.',
  },
  'ai-barcode-intelligence': {
    distance: '48 km',
    industry: 'Computer Vision',
    role: 'Lead AI Engineer',
    timeline: '4 Weeks',
    region: 'us-west-2',
    latency: '42ms',
    sprint: 'S-18',
    buildVer: 'v1.8.0',
    statusText: 'WAYPOINT MARKED',
    objective: 'Embed lightweight computer vision models on-device for multi-barcode scanning OCR.',
  },
  'face-recognition-photo': {
    distance: '65 km',
    industry: 'SaaS / Events',
    role: 'Frontend & ML Dev',
    timeline: '5 Weeks',
    region: 'eu-west-1',
    latency: '8ms',
    sprint: 'S-31',
    buildVer: 'v1.2.4',
    statusText: 'WAYPOINT STANDBY',
    objective: 'Structure vector databases and CDN caching rules for sub-500ms facial search queries.',
  },
  'business-portfolio-websites': {
    distance: '82 km',
    industry: 'Creative Agency',
    role: 'UX Architect',
    timeline: '3 Weeks',
    region: 'global-edge',
    latency: '3ms',
    sprint: 'S-06',
    buildVer: 'v3.0.1',
    statusText: 'WAYPOINT STANDBY',
    objective: 'Establish serverless edge layouts with pre-rendered assets for maximum speed metrics.',
  },
  'ai-automation-platform': {
    distance: '98 km',
    industry: 'Operations Auto',
    role: 'Systems Architect',
    timeline: '5 Weeks',
    region: 'us-east-2',
    latency: '15ms',
    sprint: 'S-14',
    buildVer: 'v0.9.4-beta',
    statusText: 'WAYPOINT STANDBY',
    objective: 'Deploy self-hosted automation node clusters with secure RAG agent routing.',
  },
  'custom-erp-dashboard': {
    distance: '115 km',
    industry: 'Manufacturing',
    role: 'Lead Backend Eng',
    timeline: '6 Weeks',
    region: 'us-east-1',
    latency: '24ms',
    sprint: 'S-40',
    buildVer: 'v4.1.2',
    statusText: 'WAYPOINT STANDBY',
    objective: 'Coordinate multi-warehouse supply orders, inventory ledgers, and financial logs.',
  },
  'inventory-mgmt-system': {
    distance: '132 km',
    industry: 'E-commerce Log',
    role: 'Full Stack Engineer',
    timeline: '4 Weeks',
    region: 'ap-northeast-1',
    latency: '18ms',
    sprint: 'S-22',
    buildVer: 'v2.1.0',
    statusText: 'WAYPOINT STANDBY',
    objective: 'Synchronize physical warehouse stock levels with external API marketplaces.',
  },
  'ai-rescue-bot': {
    distance: '158 km',
    industry: 'Robotics / Defense',
    role: 'Lead Robotics Engineer',
    timeline: '6 Weeks',
    region: 'field-deployed',
    latency: '8ms',
    sprint: 'S-33',
    buildVer: 'v2.0.1',
    statusText: 'MISSION ACTIVE',
    objective: 'Deploy tri-robot collaborative swarm to locate and GPS-pin survivors in earthquake and flood disaster zones.',
  },
  'ai-interview': {
    distance: '168 km',
    industry: 'HR Tech / AI SaaS',
    role: 'Lead AI Architect',
    timeline: '5 Weeks',
    region: 'us-west-2',
    latency: '22ms',
    sprint: 'S-27',
    buildVer: 'v1.3.0',
    statusText: 'WAYPOINT STANDBY',
    objective: 'Deploy conversational LLM agents with adaptive question routing and real-time candidate scoring.',
  },
  'future-saas-products': {
    distance: '168 km',
    industry: 'Product Labs',
    role: 'Product Engineer',
    timeline: 'Ongoing',
    region: 'global-edge',
    latency: '4ms',
    sprint: 'S-08',
    buildVer: 'v1.0.2',
    statusText: 'WAYPOINT STANDBY',
    objective: 'Incubate micro-SaaS boilerplate engines to vet emerging web frameworks under scale.',
  }
};

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem>(PROJECTS_DATA[0]);
  const [activeTab, setActiveTab] = useState<'console' | 'gps' | 'diagnostics'>('console');
  const [time, setTime] = useState<string>('');

  // Clock Update Effect
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  const extDetails = PROJECT_DETAILS_EXT[selectedProject.id] || {
    distance: '30 km',
    industry: 'Software',
    role: 'Engineer',
    timeline: 'Ongoing',
    region: 'us-east-1',
    latency: '10ms',
    sprint: 'S-01',
    buildVer: 'v1.0.0',
    statusText: 'ACTIVE',
    objective: 'Engineer custom, highly optimized software architectures.',
  };

  // Infotainment Interactive Console Module Rendering
  const renderConsoleApp = (project: ProjectItem) => {
    switch (project.id) {
      case 'oceon-wms':
        return (
          <div className="relative w-full h-full min-h-[220px] bg-black/30 backdrop-blur-md rounded-xl p-3 overflow-hidden border border-white/5 font-mono text-[9px] text-[#A0A5B5] flex flex-col justify-between">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="text-[#FF5C00] font-semibold flex items-center gap-1.5 text-xs">
                <span className="h-2 w-2 rounded-full bg-[#FF5C00] animate-pulse" />
                ● WMS RACK MAPPING
              </span>
              <span className="text-white/40 text-xs font-mono">SYS_ID: OCEON_WMS_09</span>
            </div>
            <div className="grid grid-cols-8 gap-1.5 my-3 flex-grow justify-center items-center">
              {Array.from({ length: 24 }).map((_, i) => {
                const isActive = [2, 5, 11, 14, 18, 21].includes(i);
                return (
                  <div
                    key={i}
                    className={`h-6 rounded flex items-center justify-center border transition-all duration-500 text-[10px] ${
                      isActive
                        ? 'bg-[#FF5C00]/15 border-[#FF5C00]/50 text-[#FF5C00] shadow-[0_0_10px_rgba(255,92,0,0.25)] font-bold'
                        : 'bg-white/5 border-white/5 text-white/30'
                    }`}
                  >
                    {isActive ? 'SLOT' : 'EMPTY'}
                  </div>
                );
              })}
            </div>
            <div className="border-t border-white/5 pt-2 flex justify-between items-center text-xs text-white/40 font-mono">
              <div className="flex gap-3">
                <span>RACK: ZONE_F3</span>
                <span>CAPACITY: 79.4%</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>LEDGER FEED OK</span>
              </div>
            </div>
          </div>
        );

      case 'ai-barcode-intelligence':
        return (
          <div className="relative w-full h-full min-h-[220px] bg-black/30 backdrop-blur-md rounded-xl overflow-hidden border border-white/5 font-mono text-xs text-[#A0A5B5] flex flex-col justify-between">
            <div className="absolute inset-x-0 h-[1.5px] bg-[#FF5C00]/50 animate-[hud-scan-line_2.5s_linear_infinite] shadow-[0_0_8px_#FF5C00] z-10" />
            <div className="p-3 z-10 flex flex-col justify-between h-full flex-grow">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="flex items-center gap-1.5 text-[#FF5C00] font-semibold text-xs">
                  <span className="h-2 w-2 rounded-full bg-[#FF5C00] animate-ping" />
                  VISION_SCANNER_CONNECTED
                </span>
                <span className="text-white/40 text-xs">LATENCY: 42ms</span>
              </div>
              
              <div className="relative w-36 h-20 border border-emerald-500/50 bg-emerald-500/5 mx-auto rounded my-3 flex flex-col justify-between p-2 shadow-[0_0_12px_rgba(16,185,129,0.15)]">
                <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-emerald-400" />
                <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-emerald-400" />
                <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-emerald-400" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-emerald-400" />
                <div className="text-[9px] text-emerald-400 font-bold bg-neutral-900/90 px-1.5 py-0.5 rounded self-start">
                  TAG: DEPOSIT_BOX
                </div>
                <div className="text-[9px] text-emerald-400 font-bold self-end bg-neutral-900/90 px-1.5 py-0.5 rounded">
                  UPC: 99.8% ACC
                </div>
              </div>

              <div className="flex justify-between text-xs text-white/40 border-t border-white/5 pt-2">
                <span>BARCODE ID: 9780134</span>
                <span>DEVICES: 4 APES ACTIVE</span>
              </div>
            </div>
          </div>
        );

      case 'face-recognition-photo':
        return (
          <div className="relative w-full h-full min-h-[220px] bg-black/30 backdrop-blur-md rounded-xl p-3 overflow-hidden border border-white/5 font-mono text-xs text-[#A0A5B5] flex flex-col justify-between">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="text-[#FF5C00] font-semibold text-xs">● COSINE VECTOR ALIGNMENT</span>
              <span className="text-white/40 text-xs">DB_NODE: PGVECTOR</span>
            </div>
            
            <div className="relative h-28 my-2 border border-white/5 rounded bg-black/40 flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full opacity-45" viewBox="0 0 200 100">
                <circle cx="40" cy="30" r="3" fill="#FF5C00" />
                <circle cx="160" cy="35" r="3" fill="#888899" />
                <circle cx="95" cy="65" r="3" fill="#888899" />
                <circle cx="105" cy="20" r="4" fill="#FF5C00" className="animate-pulse" />
                <line x1="105" y1="20" x2="40" y2="30" stroke="#FF5C00" strokeWidth="1" strokeDasharray="3,3" />
                <line x1="105" y1="20" x2="95" y2="65" stroke="#888899" strokeWidth="0.75" />
                <line x1="160" y1="35" x2="95" y2="65" stroke="#888899" strokeWidth="0.75" />
              </svg>
              <div className="absolute bottom-2 left-2 text-[9px] font-bold text-white/70 bg-neutral-900/90 px-1.5 py-0.5 rounded border border-white/10">
                INDEX DISTANCE: 0.124 (MATCH)
              </div>
              <div className="absolute top-2 right-2 text-[6.5px] text-emerald-400 bg-neutral-900/90 px-1 py-0.5 rounded border border-white/5">
                VEC_INDEX: SECURE
              </div>
            </div>

            <div className="flex justify-between items-center text-[7.5px] text-white/30 border-t border-white/5 pt-2">
              <span>MATCH TIME: 3.8ms</span>
              <span>INDEX: HNSW</span>
            </div>
          </div>
        );

      case 'business-portfolio-websites':
        return (
          <div className="relative w-full h-full min-h-[220px] bg-black/30 backdrop-blur-md rounded-xl p-3 overflow-hidden border border-white/5 font-mono text-[9px] text-[#A0A5B5] flex flex-col justify-between">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="text-[#FF5C00] font-semibold">● WEB PERFORMANCE METRICS</span>
              <span className="text-white/40">EDGE RUNTIME: OK</span>
            </div>
            
            <div className="flex justify-around items-center my-3 flex-grow">
              {[
                { label: 'PERF', val: 100, color: 'text-emerald-400' },
                { label: 'SEO', val: 100, color: 'text-emerald-400' },
                { label: 'ACCESSIBILITY', val: 100, color: 'text-emerald-400' }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1">
                  <div className="relative w-10 h-10 flex items-center justify-center border border-white/5 rounded-full bg-black/30">
                    <span className="text-[9px] font-bold text-white">{item.val}</span>
                    <svg className="absolute inset-0 w-full h-full rotate-[-90deg]">
                      <circle cx="20" cy="20" r="18" stroke="rgba(16,185,129,0.15)" strokeWidth="1.5" fill="transparent" />
                      <circle cx="20" cy="20" r="18" stroke="#10b981" strokeWidth="1.5" fill="transparent" strokeDasharray="113" strokeDashoffset="0" />
                    </svg>
                  </div>
                  <span className="text-[6.5px] text-white/40 uppercase tracking-widest font-semibold">{item.label}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between text-[7.5px] text-white/30 border-t border-white/5 pt-2">
              <span>LCP INDEX: 0.38s</span>
              <span>CACHE HIT: 100%</span>
            </div>
          </div>
        );

      case 'ai-automation-platform':
        return (
          <div className="relative w-full min-h-[220px] bg-black/30 backdrop-blur-md rounded-xl p-3 overflow-hidden border border-white/5 font-mono text-[9px] text-[#A0A5B5] flex flex-col gap-3">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="text-[#FF5C00] font-semibold text-xs">● COGNITIVE AGENT PIPELINE</span>
              <span className="text-white/40 text-xs">PIPELINE: ACTIVE</span>
            </div>

            {/* Pipeline flow diagram */}
            <div className="flex items-center justify-between gap-2 px-2 py-3 bg-black/20 rounded-lg border border-white/5">
              <div className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-[10px] text-white font-bold">IN</div>
                <span className="text-[8px] text-white/30 font-bold">DOCS</span>
              </div>
              <div className="flex-grow h-[2px] bg-[#FF5C00]/30 relative rounded-full overflow-visible">
                <div className="absolute top-1/2 -translate-y-1/2 left-1/4 h-2.5 w-2.5 bg-[#FF5C00] rounded-full animate-ping opacity-70" />
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-full border-2 border-[#FF5C00]/60 bg-[#FF5C00]/10 flex items-center justify-center text-xs font-bold text-[#FF5C00] shadow-[0_0_16px_rgba(255,92,0,0.3)]">RAG</div>
                <span className="text-[8px] text-[#FF5C00] font-bold">EMBED</span>
              </div>
              <div className="flex-grow h-[2px] bg-[#FF5C00]/30 relative rounded-full overflow-visible">
                <div className="absolute top-1/2 -translate-y-1/2 right-1/4 h-2.5 w-2.5 bg-[#FF5C00] rounded-full animate-ping opacity-70" style={{ animationDelay: '0.5s' }} />
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-[10px] text-white font-bold">OUT</div>
                <span className="text-[8px] text-white/30 font-bold">JSON</span>
              </div>
            </div>

            {/* Live log stream */}
            <div className="flex-grow bg-black/40 border border-white/5 rounded-lg p-2 space-y-1">
              <div className="text-[8px] text-emerald-400">[OK] CONTEXT_RETRIEVAL: 3 chunks matched</div>
              <div className="text-[8px] text-white/40">[LLM] Prompt tokens: 1,842 | Cost: $0.0003</div>
              <div className="text-[8px] text-[#FF5C00] animate-pulse">&gt; WORKFLOW_LOG: &quot;Executing structured context assembly...&quot;</div>
            </div>

            <div className="border-t border-white/5 pt-2 flex justify-between text-[7.5px] text-white/30">
              <span>AGENT LOOPS: 14 active</span>
              <span>QUEUE: 0 pending</span>
            </div>
          </div>
        );

      case 'custom-erp-dashboard':
        return (
          <div className="relative w-full h-full min-h-[220px] bg-black/30 backdrop-blur-md rounded-xl p-3 overflow-hidden border border-white/5 font-mono text-[9px] text-[#A0A5B5] flex flex-col justify-between">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="text-[#E8372A] font-semibold">● MASTER DATA LEDGER</span>
              <span className="text-white/40">ENCRYPTION: SHIELD</span>
            </div>
            
            <div className="my-2 space-y-1 flex-grow overflow-hidden flex flex-col justify-center">
              {[
                { tx: 'TX-8012', src: 'WH_NORTH', dest: 'WH_EAST', status: 'DONE' },
                { tx: 'TX-8013', src: 'WH_SOUTH', dest: 'WH_WEST', status: 'DONE' },
                { tx: 'TX-8014', src: 'WH_EAST', dest: 'WH_NORTH', status: 'PENDING' }
              ].map((row, idx) => (
                <div key={idx} className="flex justify-between items-center bg-black/40 border border-white/5 p-1 rounded">
                  <span className="text-white font-bold">{row.tx}</span>
                  <span className="text-white/55">{row.src} &gt; {row.dest}</span>
                  <span className={row.status === 'DONE' ? 'text-emerald-400 font-bold' : 'text-amber-500 font-bold'}>{row.status}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between text-[7.5px] text-white/30 border-t border-white/5 pt-2">
              <span>INTEGRITY SIGNATURE: PASS</span>
              <span>NODES: 4 LOCALIZED</span>
            </div>
          </div>
        );

      case 'inventory-mgmt-system':
        return (
          <div className="relative w-full h-full min-h-[220px] bg-black/30 backdrop-blur-md rounded-xl p-3 overflow-hidden border border-white/5 font-mono text-[9px] text-[#A0A5B5] flex flex-col justify-between">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="text-[#E8372A] font-semibold">● MULTI-CHANNEL WEBHOOKS</span>
              <span className="text-white/40">SYNC_CLOCK: 4.8ms</span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 my-2 flex-grow justify-center items-center">
              {[
                { label: 'Shopify Sync', delay: '2ms' },
                { label: 'Amazon MWS', delay: '9ms' },
                { label: 'WooCommerce', delay: '5ms' },
                { label: 'Local Store', delay: '1ms' }
              ].map((ch, idx) => (
                <div key={idx} className="bg-black/35 border border-white/5 p-1.5 rounded flex items-center justify-between">
                  <div>
                    <span className="text-white block font-semibold">{ch.label}</span>
                    <span className="text-white/40 text-[6.5px]">Delay: {ch.delay}</span>
                  </div>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse animate-duration-1000" />
                </div>
              ))}
            </div>

            <div className="flex justify-between text-[7.5px] text-white/30 border-t border-white/5 pt-2">
              <span>QUEUE RETRIES: 0</span>
              <span>SYNCS TOTAL: 49,204</span>
            </div>
          </div>
        );

      case 'ai-interview':
        return (
          <div className="relative w-full min-h-[220px] bg-black/30 backdrop-blur-md rounded-xl p-3 overflow-hidden border border-white/5 font-mono text-[9px] text-[#A0A5B5] flex flex-col gap-3">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="text-[#FF5C00] font-semibold text-xs">● AI INTERVIEW ENGINE</span>
              <span className="text-white/40 text-xs">AGENT: LIVE</span>
            </div>

            {/* Candidate scoring panel */}
            <div className="space-y-1.5 flex-grow">
              {[
                { name: 'Candidate #2847', score: 94, tag: 'SHORTLIST', color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/5' },
                { name: 'Candidate #2848', score: 71, tag: 'REVIEW', color: 'text-amber-400 border-amber-500/30 bg-amber-500/5' },
                { name: 'Candidate #2849', score: 38, tag: 'REJECT', color: 'text-red-400 border-red-500/30 bg-red-500/5' },
              ].map((c, idx) => (
                <div key={idx} className="flex items-center justify-between bg-black/30 border border-white/5 rounded p-1.5 gap-2">
                  <span className="text-white/70 truncate text-[8px] font-bold">{c.name}</span>
                  <div className="flex-grow h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-[#FF5C00] rounded-full" style={{ width: `${c.score}%` }} />
                  </div>
                  <span className="text-[8px] font-bold shrink-0">{c.score}%</span>
                  <span className={`text-[7px] font-bold px-1.5 py-0.5 rounded border shrink-0 ${c.color}`}>{c.tag}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-white/5 pt-2 flex justify-between text-[7.5px] text-white/30">
              <span>INTERVIEWS TODAY: 47</span>
              <span>LLM MODEL: GPT-4o</span>
            </div>
          </div>
        );

      case 'ai-rescue-bot':
        return (
          <div className="relative w-full min-h-[220px] bg-black/30 backdrop-blur-md rounded-xl p-3 overflow-hidden border border-white/5 font-mono text-[9px] text-[#A0A5B5] flex flex-col gap-2.5">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="text-[#FF5C00] font-semibold text-xs flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#FF5C00] animate-ping" />
                ● RESCUE COMMAND CENTER
              </span>
              <span className="text-emerald-400 text-[8px] font-bold">MISSION: ACTIVE</span>
            </div>

            {/* Robot status grid */}
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: 'DRONE-01', type: 'Aerial', status: 'SCANNING', lat: '26.84°N', lon: '80.94°E', color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/5' },
                { id: 'SNAKE-01', type: 'Infiltrate', status: 'IN CAVITY', lat: '26.84°N', lon: '80.94°E', color: 'text-[#FF5C00] border-[#FF5C00]/30 bg-[#FF5C00]/5' },
                { id: 'ROVER-01', type: 'Ground', status: 'NAVIGATING', lat: '26.84°N', lon: '80.94°E', color: 'text-blue-400 border-blue-500/30 bg-blue-500/5' },
              ].map((bot, idx) => (
                <div key={idx} className={`border rounded p-1.5 flex flex-col gap-0.5 ${bot.color}`}>
                  <span className="text-[8px] font-bold">{bot.id}</span>
                  <span className="text-[7px] text-white/40">{bot.type}</span>
                  <span className="text-[7px] font-bold animate-pulse">{bot.status}</span>
                </div>
              ))}
            </div>

            {/* Survivor pings */}
            <div className="flex-grow bg-black/40 border border-white/5 rounded p-1.5 space-y-1">
              <div className="text-[7.5px] text-white/30 font-bold uppercase mb-1">SURVIVOR COORDINATES LOCKED</div>
              {[
                { id: 'SUR-001', coords: '26.8412°N, 80.9438°E', depth: '1.8m rubble', conf: '97%', agent: 'SNAKE-01' },
                { id: 'SUR-002', coords: '26.8408°N, 80.9441°E', depth: 'surface', conf: '99%', agent: 'DRONE-01' },
              ].map((s, i) => (
                <div key={i} className="flex items-center justify-between text-[7.5px] border-b border-white/5 pb-1">
                  <span className="text-[#FF5C00] font-bold">{s.id}</span>
                  <span className="text-white/50">{s.coords}</span>
                  <span className="text-emerald-400 font-bold">{s.conf}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-white/5 pt-1.5 flex justify-between text-[7px] text-white/30">
              <span>ROBOTS ACTIVE: 3/3</span>
              <span>SURVIVORS FOUND: 2</span>
            </div>
          </div>
        );

      case 'future-saas-products':
      default:
        return (
          <div className="relative w-full h-full min-h-[220px] bg-black/30 backdrop-blur-md rounded-xl p-3 overflow-hidden border border-white/5 font-mono text-[9px] text-[#A0A5B5] flex flex-col justify-between">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="text-[#E8372A] font-semibold">● NEXTJS EDGE SANDBOX</span>
              <span className="text-white/40">US-EAST-1 (VERCEL)</span>
            </div>
            
            <div className="bg-black/90 border border-white/10 p-2 rounded flex-grow my-2 font-mono text-[7.5px] text-emerald-400 space-y-1 overflow-hidden h-24 flex flex-col justify-end">
              <div>$ next dev - Sandbox Edge Node Active</div>
              <div>[SYSTEM] Local mock instance loaded</div>
              <div>[GET] /api/metrics - 200 OK (2.2ms)</div>
              <div>[POST] /api/webhooks/stripe - 200 OK (91ms)</div>
              <div className="animate-pulse">_</div>
            </div>

            <div className="flex justify-between text-[7.5px] text-white/30 border-t border-white/5 pt-2">
              <span>DEPLOYMENT VERSION: v1.0.2</span>
              <span>BUILD CODE: COMPLETE</span>
            </div>
          </div>
        );
    }
  };

  // Infotainment Route Guidance Display
  const renderGPSRoute = (project: ProjectItem) => {
    const ext = PROJECT_DETAILS_EXT[project.id] || { distance: '20 km' };
    return (
      <div className="relative w-full h-full min-h-[220px] bg-black/30 backdrop-blur-md rounded-xl p-3 overflow-hidden border border-white/5 font-mono text-[9px] text-[#A0A5B5] flex flex-col justify-between">
        <div className="flex justify-between items-center border-b border-white/5 pb-2">
          <span className="text-[#E8372A] font-semibold flex items-center gap-1.5">
            <Compass className="h-3 w-3 animate-spin-slow" />
            ROUTE GUIDANCE PATH
          </span>
          <span className="text-white/40">TARGET: {project.id.toUpperCase()}</span>
        </div>

        <div className="relative h-24 my-2 border border-white/5 rounded bg-black/50 overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:14px_14px]" />
          
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 100">
            {/* Background highway coordinate spline */}
            <path 
              d="M 20 80 Q 70 25 110 55 T 180 25" 
              fill="transparent" 
              stroke="rgba(255,255,255,0.06)" 
              strokeWidth="2.5" 
            />
            {/* Glowing route line */}
            <path 
              d="M 20 80 Q 70 25 110 55 T 180 25" 
              fill="transparent" 
              stroke="#E8372A" 
              strokeWidth="2" 
              strokeDasharray="4,4"
              className="animate-[hud-dash-flow_8s_linear_infinite]"
            />
            
            {/* Target waypoint indicator */}
            <circle cx="180" cy="25" r="4.5" fill="#E8372A" className="animate-pulse" />
            <circle cx="180" cy="25" r="8" stroke="#E8372A" strokeWidth="0.75" fill="transparent" className="animate-ping" />
            <text x="110" y="20" fill="#E8372A" fontSize="6.5" fontWeight="bold">DEST: {project.title.substring(0, 10)}...</text>
            
            {/* Current traveler position */}
            <circle cx="65" cy="52.5" r="4" fill="#fff" />
            <circle cx="65" cy="52.5" r="7.5" stroke="#fff" strokeWidth="0.5" fill="transparent" />
          </svg>

          <div className="absolute bottom-1.5 left-2 text-[6.5px] text-white/50 bg-neutral-900/95 px-1.5 py-0.5 rounded border border-white/5 flex gap-1.5">
            <span>LAT: 37.7749° N</span>
            <span>LON: -122.4194° W</span>
          </div>

          <div className="absolute top-1.5 right-2 text-[6.5px] text-white/50 bg-neutral-900/95 px-1.5 py-0.5 rounded border border-white/5">
            HDG: NW 284°
          </div>
        </div>

        <div className="flex justify-between items-center text-[7.5px] text-white/30 border-t border-white/5 pt-2">
          <span>DISTANCE: {ext.distance}</span>
          <span>ETA: 14m @ 84 km/h</span>
        </div>
      </div>
    );
  };

  // Infotainment Telemetry Diagnostics Display
  const renderTelemetryDiagnostics = (project: ProjectItem) => {
    const ext = PROJECT_DETAILS_EXT[project.id] || { latency: '12ms', sprint: 'S-24', buildVer: 'v2.4.1' };
    return (
      <div className="relative w-full h-full min-h-[220px] bg-black/30 backdrop-blur-md rounded-xl p-3 overflow-hidden border border-white/5 font-mono text-[9px] text-[#A0A5B5] flex flex-col justify-between">
        <div className="flex justify-between items-center border-b border-white/5 pb-2">
          <span className="text-[#E8372A] font-semibold flex items-center gap-1.5">
            <Cpu className="h-3 w-3" />
            SYSTEM CORE METRICS
          </span>
          <span className="text-white/40">VER: {ext.buildVer}</span>
        </div>

        <div className="grid grid-cols-3 gap-2 my-2.5 flex-grow items-center">
          <div className="bg-black/35 border border-white/5 p-2 rounded text-center">
            <span className="text-white/40 text-[6px] block uppercase">CPU LOAD</span>
            <span className="text-white font-bold text-[11px] block mt-0.5">14.8%</span>
            <div className="h-1 bg-white/5 rounded-full mt-1.5 overflow-hidden">
              <div className="h-full bg-emerald-500 w-[15%]" />
            </div>
          </div>
          
          <div className="bg-black/35 border border-white/5 p-2 rounded text-center">
            <span className="text-white/40 text-[6px] block uppercase">RTT LATENCY</span>
            <span className="text-[#E8372A] font-bold text-[11px] block mt-0.5">{ext.latency}</span>
            <div className="h-1 bg-white/5 rounded-full mt-1.5 overflow-hidden">
              <div className="h-full bg-[#E8372A] w-[12%]" />
            </div>
          </div>

          <div className="bg-black/35 border border-white/5 p-2 rounded text-center">
            <span className="text-white/40 text-[6px] block uppercase">SPRINT CYCLE</span>
            <span className="text-white font-bold text-[11px] block mt-0.5">{ext.sprint}</span>
            <div className="h-1 bg-white/5 rounded-full mt-1.5 overflow-hidden">
              <div className="h-full bg-blue-500 w-[75%]" />
            </div>
          </div>
        </div>

        <div className="text-[7px] text-white/40 space-y-0.5 border-t border-white/5 pt-2">
          <div className="flex justify-between">
            <span>REPOSITORY MATURITY</span>
            <span className="text-emerald-400 font-bold">STABLE (99.98% SUCCESS)</span>
          </div>
          <div className="flex justify-between">
            <span>SECURITY PIPELINE</span>
            <span className="text-emerald-400 font-bold">ACTIVE (TLS 1.3 SHIELD)</span>
          </div>
          <div className="flex justify-between">
            <span>LAST INTEGRATED COMMIT</span>
            <span className="text-white/70">TODAY, 14:04 UTC</span>
          </div>
        </div>
      </div>
    );
  };

  // Dashboard gauge telemetry renderer
  const renderGauge = (label: string, value: string, subtext: string, progress: number, idx: number) => {
    return (
      <div key={idx} className="flex-1 bg-[#0F1115]/35 border border-[#2D313A]/25 border-t-[#3D4250]/40 rounded-xl px-2 py-2 flex flex-col justify-between items-center text-center font-mono relative overflow-hidden backdrop-blur-md shadow-lg select-none">
        <div className="absolute top-1 right-1 flex gap-1 items-center">
          <div className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
        </div>
        
        <div className="relative w-14 h-14 flex items-center justify-center bg-black/20 rounded-full border border-white/5">
          <svg className="absolute inset-0 w-full h-full rotate-[-90deg]">
            <circle cx="28" cy="28" r="24" stroke="rgba(255,255,255,0.05)" strokeWidth="2" fill="transparent" />
            <circle 
              cx="28" 
              cy="28" 
              r="24" 
              stroke="#E8372A" 
              strokeWidth="2" 
              fill="transparent" 
              strokeDasharray="150.8" 
              strokeDashoffset={150.8 - (150.8 * progress) / 100} 
              className="transition-all duration-1000 ease-out opacity-90"
            />
          </svg>
          <span className="relative z-10 text-[12px] font-bold text-white tracking-tighter">{value}</span>
        </div>

        <span className="text-[9px] font-bold text-white/70 tracking-wider uppercase leading-tight">{label}</span>
        <span className="text-[8px] text-white/45 truncate max-w-full">{subtext}</span>
      </div>
    );
  };


  return (
    <section id="projects" className="relative overflow-hidden bg-transparent select-none font-mono flex flex-col" style={{ height: '100dvh' }}>

      {/* Top HUD overlay (Attached to Glass) */}
      <CameraReactive depth="nav" className="absolute top-6 left-0 right-0 z-20 px-4 md:px-8 max-w-7xl mx-auto flex justify-between items-start pointer-events-none">
        {/* Top Left: REC details */}
        <div className="flex items-center gap-3 bg-neutral-950/45 border border-white/5 p-2 rounded-lg backdrop-blur-sm shadow-md">
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E8372A] animate-ping" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#E8372A] absolute" />
            <span className="font-bold text-white tracking-wider text-[8.5px]">REC</span>
          </div>
          <div className="h-3 w-[1px] bg-white/10" />
          <span className="text-white/60 text-[8px]">1080P</span>
          <span className="text-white/60 text-[8px]">60 FPS</span>
          <div className="h-3 w-[1px] bg-white/10" />
          <span className="text-white/40 text-[7.5px]">CAM_HUD_FRONT_A</span>
        </div>

        {/* Top Right: System coordinates & clock */}
        <div className="flex items-center gap-4 bg-neutral-950/45 border border-white/5 p-2 rounded-lg backdrop-blur-sm shadow-md">
          <div className="flex items-center gap-1.5 text-white/60 text-[8px]">
            <Wifi className="h-3 w-3 text-emerald-400" />
            <span>LATENCY: 14ms</span>
          </div>
          <div className="h-3 w-[1px] bg-white/10" />
          <div className="flex items-center gap-1 text-white/60 text-[8px]">
            <Clock className="h-3 w-3" />
            <span>{time || '21:03:01'}</span>
          </div>
          <div className="h-3 w-[1px] bg-white/10" />
          <div className="flex items-center gap-1 text-emerald-400 font-bold uppercase tracking-widest text-[8px]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            SYS: ONLINE
          </div>
        </div>
      </CameraReactive>

      {/* Windshield Center Overlay: Compass & Horizon Details */}
      <CameraReactive depth="hero-badge" className="absolute top-20 left-1/2 -translate-x-1/2 z-20 w-[280px] pointer-events-none flex flex-col items-center text-white/30">
        {/* Compass tape */}
        <div className="flex flex-col items-center w-full bg-neutral-950/20 px-3 py-1.5 border border-white/5 rounded-md backdrop-blur-[2px]">
          <div className="flex justify-between items-center w-full px-6 border-b border-white/5 pb-1 text-[8px]">
            <span>W</span>
            <span className="text-white/80 font-bold">NW 284°</span>
            <span>N</span>
          </div>
          <div className="w-full h-1 relative mt-1 flex justify-center">
            <div className="w-full h-[1px] bg-white/10 absolute top-0" />
            <div className="w-[1px] h-2 bg-[#E8372A] absolute -top-1" />
            <div className="flex justify-between w-full px-1 mt-0.5 text-[6.5px]">
              <span>260</span>
              <span>270</span>
              <span>280</span>
              <span>290</span>
              <span>300</span>
            </div>
          </div>
        </div>

        {/* Horizon crosshair */}
        <div className="flex items-center justify-between w-[160px] mt-4 relative h-3">
          <div className="w-10 h-[1px] bg-white/10" />
          <div className="relative w-3 h-3 flex items-center justify-center">
            <div className="absolute w-1.5 h-1.5 border border-white/15 rounded-full" />
            <div className="absolute w-[1px] h-2.5 bg-white/15" />
            <div className="absolute w-2.5 h-[1px] bg-white/15" />
          </div>
          <div className="w-10 h-[1px] bg-white/10" />
        </div>

        {/* Horizon metrics */}
        <div className="flex justify-between w-[200px] mt-1 text-[7px] uppercase font-semibold">
          <div className="flex flex-col items-start">
            <span>SPEED: 84 KM/H</span>
            <span>ALT: 412 M</span>
          </div>
          <div className="flex flex-col items-end">
            <span>TEMP: 19.5°C</span>
            <span>TRIP: 48%</span>
          </div>
        </div>
      </CameraReactive>

      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full relative z-10 flex flex-col gap-3 flex-1 min-h-0 pt-[148px] pb-3 overflow-hidden">
        
        {/* Main Interface Cockpit Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch flex-1 min-h-0 overflow-hidden">
          
          {/* LEFT PANEL: GPS Destination Selector */}
          <div className="lg:col-span-3 flex flex-col overflow-hidden">
            <CameraReactive depth="card" className="flex flex-col h-full">
              <div className="flex flex-col gap-3 h-full justify-start bg-[#0F1115]/30 border border-[#2D313A]/25 border-t-[#3D4250]/40 rounded-2xl p-4 backdrop-blur-md shadow-lg overflow-hidden">
                <div className="border-b border-white/5 pb-2.5 flex justify-between items-center shrink-0">
                  <span className="text-[7.5px] uppercase tracking-widest text-white/30 font-bold flex items-center gap-1.5">
                    <MapPin className="h-3 w-3 text-[#E8372A]" />
                    DESTINATIONS SELECT
                  </span>
                  <span className="text-[7px] text-white/20">COUNT: {PROJECTS_DATA.length}</span>
                </div>
                
                <div className="flex flex-col overflow-y-auto gap-2.5 flex-grow pr-1" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,92,0,0.3) transparent' }}>
                  {PROJECTS_DATA.map((project) => {
                    const isSelected = selectedProject.id === project.id;
                    const ext = PROJECT_DETAILS_EXT[project.id] || {
                      distance: '20 km',
                      statusText: 'STANDBY',
                    };
                    
                    return (
                      <button
                        key={project.id}
                        onClick={() => setSelectedProject(project)}
                        className={`relative w-[210px] lg:w-full shrink-0 text-left p-3 rounded-xl border font-mono transition-all duration-500 cursor-pointer flex flex-col justify-between gap-1.5 select-none ${
                          isSelected
                            ? 'bg-neutral-950/60 border-[#FF5C00]/50 text-white hud-glow-orange'
                            : 'bg-transparent border-white/5 text-white/30 hover:bg-white/5 hover:text-white/55'
                        }`}
                      >
                        <div className="flex justify-between items-center text-xs tracking-wider uppercase font-semibold">
                          <span className={`flex items-center gap-1.5 ${isSelected ? 'text-[#FF5C00]' : 'text-white/40'}`}>
                            <span className={`h-2 w-2 rounded-full ${isSelected ? 'bg-[#FF5C00] animate-pulse' : 'bg-white/20'}`} />
                            {project.category}
                          </span>
                          <span className="text-[9px] opacity-75 font-mono">{ext.distance}</span>
                        </div>

                        <h3 className={`text-sm font-semibold truncate transition-colors duration-300 ${
                          isSelected ? 'text-white font-bold' : 'text-white/50'
                        }`}>
                          {project.title}
                        </h3>

                        <div className="flex justify-between items-center gap-2 mt-0.5 text-xs opacity-70">
                          <div className="flex-grow h-[3px] bg-white/5 rounded-full overflow-hidden flex">
                            <div 
                              className={`h-full transition-all duration-1000 ${
                                isSelected ? 'bg-[#FF5C00] w-[100%]' : 'bg-white/10 w-[40%]'
                              }`} 
                            />
                          </div>
                          <span className="text-[9px] uppercase font-bold shrink-0">{isSelected ? 'ACTIVE DEST' : 'STANDBY'}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </CameraReactive>
          </div>

          {/* CENTER PANEL: Infotainment Screen Display */}
          <div className="lg:col-span-5 flex flex-col overflow-hidden">
            <CameraReactive depth="landmark" className="flex flex-col h-full">
              <div className="flex flex-col justify-between bg-[#0F1115]/30 border border-[#2D313A]/25 border-t-[#3D4250]/40 rounded-2xl p-4 backdrop-blur-md shadow-lg relative overflow-hidden h-full">
                <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-[#FF5C00]/50 to-transparent" />
                
                {/* Infotainment Tab Selector bar */}
                <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
                  <div className="flex gap-1.5">
                    {(['console', 'gps', 'diagnostics'] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                          activeTab === tab
                            ? 'bg-[#FF5C00]/15 border border-[#FF5C00]/50 text-[#FF5C00] shadow-[0_0_12px_rgba(255,92,0,0.2)]'
                            : 'bg-transparent border border-white/5 text-white/40 hover:text-white/70'
                        }`}
                      >
                        {tab === 'console' ? 'Console App' : tab === 'gps' ? 'Route Guidance' : 'Telemetry'}
                      </button>
                    ))}
                  </div>
                  <span className="text-[7.5px] text-white/20 uppercase tracking-widest font-bold">INFOTAINMENT_UNIT_01</span>
                </div>

                {/* Simulated dynamic view */}
                <div className="flex-grow my-4 flex items-center justify-center relative min-h-[220px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedProject.id + '-' + activeTab}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full h-full flex items-center justify-center"
                    >
                      {activeTab === 'console' && renderConsoleApp(selectedProject)}
                      {activeTab === 'gps' && renderGPSRoute(selectedProject)}
                      {activeTab === 'diagnostics' && renderTelemetryDiagnostics(selectedProject)}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Console Metadata metrics underneath */}
                <div className="border-t border-white/5 pt-3.5 font-mono text-[8.5px] text-white/40 grid grid-cols-4 gap-1">
                  <div>
                    <span className="block text-white/20 text-[6.5px] uppercase tracking-wider">PROJECT ROLE</span>
                    <span className="text-white/80 font-bold truncate block">{extDetails.role}</span>
                  </div>
                  <div>
                    <span className="block text-white/20 text-[6.5px] uppercase tracking-wider">TIMELINE</span>
                    <span className="text-white/80 font-bold truncate block">{extDetails.timeline}</span>
                  </div>
                  <div>
                    <span className="block text-white/20 text-[6.5px] uppercase tracking-wider">SECTOR</span>
                    <span className="text-white/80 font-bold truncate block">{extDetails.industry}</span>
                  </div>
                  <div>
                    <span className="block text-white/20 text-[6.5px] uppercase tracking-wider">DEPLOY REGION</span>
                    <span className="text-white/80 font-bold truncate block uppercase">{extDetails.region}</span>
                  </div>
                </div>
              </div>
            </CameraReactive>
          </div>

          {/* RIGHT PANEL: Project Intelligence Panel */}
          <div className="lg:col-span-4 flex flex-col overflow-hidden">
            <CameraReactive depth="card" className="flex flex-col h-full">
              <div className="flex flex-col justify-between bg-[#0F1115]/30 border border-[#2D313A]/25 border-t-[#3D4250]/40 rounded-2xl p-4.5 backdrop-blur-md shadow-lg font-mono text-[9px] relative overflow-hidden h-full">
                <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-[#FF5C00]/50 to-transparent" />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedProject.id}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex-grow flex flex-col min-h-0"
                  >
                    {/* Scrollable content area */}
                    <div className="flex-grow overflow-y-auto pr-1 space-y-3.5" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,92,0,0.2) transparent' }}>
                      <div className="flex justify-between items-start border-b border-white/5 pb-2.5">
                        <div>
                          <span className="text-xs uppercase tracking-widest text-white/40 font-mono block">MISSION TARGET</span>
                          <h3 className="text-base font-bold text-white tracking-tight">{selectedProject.title}</h3>
                        </div>
                        <span className="text-xs bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 px-2 py-0.5 rounded flex items-center gap-1.5 font-bold tracking-widest animate-pulse uppercase">
                          ● ONLINE
                        </span>
                      </div>

                      <div>
                        <span className="block text-xs text-white/40 uppercase tracking-widest mb-1 font-bold font-mono flex items-center gap-1.5">
                          <Radio className="h-4 w-4 text-[#FF5C00]" />
                          MISSION OBJECTIVE
                        </span>
                        <p className="text-slate-200 leading-relaxed text-sm font-sans font-normal">
                          {extDetails.objective}
                        </p>
                      </div>

                      <div>
                        <span className="block text-xs text-white/40 uppercase tracking-widest mb-1 font-bold font-mono flex items-center gap-1.5">
                          <Shield className="h-4 w-4 text-white/40" />
                          SYSTEM BOTTLENECK
                        </span>
                        <p className="text-slate-300 leading-relaxed text-sm font-sans font-normal">
                          {selectedProject.problem}
                        </p>
                      </div>

                      <div>
                        <span className="block text-xs text-white/40 uppercase tracking-widest mb-1 font-bold font-mono flex items-center gap-1.5">
                          <Activity className="h-4 w-4 text-white/40" />
                          ENGINEERING SOLUTION
                        </span>
                        <p className="text-slate-300 leading-relaxed text-sm font-sans font-normal">
                          {selectedProject.solution}
                        </p>
                      </div>

                      <div className="border-t border-white/5 pt-3 space-y-2">
                        <span className="block text-xs text-white/40 uppercase tracking-widest font-bold font-mono">OPERATIONAL METRICS</span>
                        {selectedProject.results.map((result, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                            <CheckCircle className="h-4 w-4 text-[#FF5C00] flex-shrink-0 mt-0.5" />
                            <span className="font-sans leading-relaxed">{result}</span>
                          </div>
                        ))}
                      </div>

                      <div className="border-t border-white/5 pt-2 flex justify-between items-center text-xs text-white/40 font-mono">
                        <span>INFRA DEPLOYMENT</span>
                        <span className="text-white/80 font-bold uppercase tracking-wider">{selectedProject.techStack.slice(0, 3).join(' / ')}</span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* CTA pinned at bottom */}
                <div className="border-t border-white/5 pt-3.5 flex justify-end shrink-0 mt-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      const el = document.getElementById('cta');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="group w-full text-xs font-bold py-2.5 border-white/10 text-white/80 hover:border-[#FF5C00]/50 hover:text-white uppercase transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer bg-neutral-950/40"
                  >
                    <span>Activate Interface Routing</span>
                    <ArrowRight className="h-3.5 w-3.5 text-[#FF5C00] group-hover:translate-x-0.5 transition-transform" />
                  </Button>
                </div>
              </div>
            </CameraReactive>
          </div>

        </div>

        {/* BOTTOM DASHBOARD: Compact gauge strip */}
        <div className="w-full shrink-0 h-[112px] overflow-hidden">
          <CameraReactive depth="button" className="w-full">
            <div className="flex gap-2.5 w-full justify-between items-stretch">
              {renderGauge('Core Assets', '50+', 'Active Portfolios', 100, 0)}
              {renderGauge('Client Ret', '94.0%', 'Long-term SLA', 94, 1)}
              {renderGauge('Sys Uptime', '99.9%', 'Continuous Ops', 99.9, 2)}
              {renderGauge('Global Reach', '08', 'Countries Served', 80, 3)}
              {renderGauge('Perf Gain', '+320%', 'Core Optimization', 92, 4)}
              {renderGauge('Success Rt', '99.98%', 'Error-Free Run', 99.98, 5)}
            </div>
          </CameraReactive>
        </div>

      </div>
    </section>
  );
};
