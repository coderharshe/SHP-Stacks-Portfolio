"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, ArrowRight, ChevronRight, Wifi, Clock, Compass, Activity, 
  MapPin, Cpu, Server, Shield, Radio, Sparkles
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
    timeline: '6 Months',
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
    timeline: '3 Months',
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
    timeline: '4 Months',
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
    timeline: '2 Months',
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
    timeline: '5 Months',
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
    timeline: '6 Months',
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
    timeline: '3 Months',
    region: 'ap-northeast-1',
    latency: '18ms',
    sprint: 'S-22',
    buildVer: 'v2.1.0',
    statusText: 'WAYPOINT STANDBY',
    objective: 'Synchronize physical warehouse stock levels with external API marketplaces.',
  },
  'future-saas-products': {
    distance: '155 km',
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
          <div className="relative w-full h-full min-h-[220px] bg-neutral-950/80 rounded-xl p-3 overflow-hidden border border-white/5 font-mono text-[9px] text-[#A0A5B5] flex flex-col justify-between">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="text-[#E8372A] font-semibold flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E8372A] animate-pulse" />
                ● WMS RACK MAPPING
              </span>
              <span className="text-white/40">SYS_ID: OCEON_WMS_09</span>
            </div>
            <div className="grid grid-cols-8 gap-1 my-3 flex-grow justify-center items-center">
              {Array.from({ length: 24 }).map((_, i) => {
                const isActive = [2, 5, 11, 14, 18, 21].includes(i);
                return (
                  <div
                    key={i}
                    className={`h-5 rounded flex items-center justify-center border transition-all duration-500 text-[8px] ${
                      isActive
                        ? 'bg-[#E8372A]/10 border-[#E8372A]/40 text-[#E8372A] shadow-[0_0_8px_rgba(232,55,42,0.15)] font-bold'
                        : 'bg-white/5 border-white/5 text-white/20'
                    }`}
                  >
                    {isActive ? 'SLOT' : 'EMPTY'}
                  </div>
                );
              })}
            </div>
            <div className="border-t border-white/5 pt-2 flex justify-between items-center text-[7.5px] text-white/30">
              <div className="flex gap-2">
                <span>RACK: ZONE_F3</span>
                <span>CAPACITY: 79.4%</span>
              </div>
              <div className="flex items-center gap-1 text-emerald-400">
                <div className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
                <span>LEDGER FEED OK</span>
              </div>
            </div>
          </div>
        );

      case 'ai-barcode-intelligence':
        return (
          <div className="relative w-full h-full min-h-[220px] bg-neutral-950/80 rounded-xl overflow-hidden border border-white/5 font-mono text-[9px] text-[#A0A5B5] flex flex-col justify-between">
            <div className="absolute inset-x-0 h-[1px] bg-[#E8372A]/40 animate-[hud-scan-line_2.5s_linear_infinite] shadow-[0_0_6px_#E8372A] z-10" />
            <div className="p-3 z-10 flex flex-col justify-between h-full flex-grow">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="flex items-center gap-1.5 text-[#E8372A] font-semibold">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#E8372A] animate-ping" />
                  VISION_SCANNER_CONNECTED
                </span>
                <span className="text-white/40">LATENCY: 42ms</span>
              </div>
              
              <div className="relative w-32 h-16 border border-emerald-500/50 bg-emerald-500/5 mx-auto rounded my-3 flex flex-col justify-between p-1.5 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-emerald-400" />
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-emerald-400" />
                <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-emerald-400" />
                <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-emerald-400" />
                <div className="text-[6.5px] text-emerald-400 bg-neutral-900/90 px-1 py-0.5 rounded self-start">
                  TAG: DEPOSIT_BOX
                </div>
                <div className="text-[6.5px] text-emerald-400 font-bold self-end bg-neutral-900/90 px-1 py-0.5 rounded">
                  UPC: 99.8% ACC
                </div>
              </div>

              <div className="flex justify-between text-[7.5px] text-white/30 border-t border-white/5 pt-2">
                <span>BARCODE ID: 9780134</span>
                <span>DEVICES: 4 APES ACTIVE</span>
              </div>
            </div>
          </div>
        );

      case 'face-recognition-photo':
        return (
          <div className="relative w-full h-full min-h-[220px] bg-neutral-950/80 rounded-xl p-3 overflow-hidden border border-white/5 font-mono text-[9px] text-[#A0A5B5] flex flex-col justify-between">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="text-[#E8372A] font-semibold">● COSINE VECTOR ALIGNMENT</span>
              <span className="text-white/40">DB_NODE: PGVECTOR</span>
            </div>
            
            <div className="relative h-24 my-2 border border-white/5 rounded bg-black/40 flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full opacity-35" viewBox="0 0 200 100">
                <circle cx="40" cy="30" r="2.5" fill="#E8372A" />
                <circle cx="160" cy="35" r="2.5" fill="#888899" />
                <circle cx="95" cy="65" r="2.5" fill="#888899" />
                <circle cx="105" cy="20" r="3" fill="#E8372A" className="animate-pulse" />
                <line x1="105" y1="20" x2="40" y2="30" stroke="#E8372A" strokeWidth="0.75" strokeDasharray="3,3" />
                <line x1="105" y1="20" x2="95" y2="65" stroke="#888899" strokeWidth="0.5" />
                <line x1="160" y1="35" x2="95" y2="65" stroke="#888899" strokeWidth="0.5" />
              </svg>
              <div className="absolute bottom-2 left-2 text-[6.5px] text-white/50 bg-neutral-900/90 px-1 py-0.5 rounded border border-white/5">
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
          <div className="relative w-full h-full min-h-[220px] bg-neutral-950/80 rounded-xl p-3 overflow-hidden border border-white/5 font-mono text-[9px] text-[#A0A5B5] flex flex-col justify-between">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="text-[#E8372A] font-semibold">● WEB PERFORMANCE METRICS</span>
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
          <div className="relative w-full h-full min-h-[220px] bg-neutral-950/80 rounded-xl p-3 overflow-hidden border border-white/5 font-mono text-[9px] text-[#A0A5B5] flex flex-col justify-between">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="text-[#E8372A] font-semibold">● COGNITIVE AGENT PIPELINE</span>
              <span className="text-white/40">SERVER: SELF-HOSTED</span>
            </div>
            
            <div className="flex items-center justify-between gap-1 my-3 flex-grow px-2">
              {[
                { name: 'TRIGGER', active: true },
                { name: 'RAG_LLM', active: true },
                { name: 'OUTCOME', active: true }
              ].map((node, i) => (
                <React.Fragment key={i}>
                  <div className="border border-white/10 rounded px-2 py-1.5 bg-black/60 text-center shadow-md relative">
                    <span className="text-[6px] block text-white/30">NODE_0{i+1}</span>
                    <span className="text-white font-bold text-[7.5px] tracking-tight">{node.name}</span>
                  </div>
                  {i < 2 && (
                    <div className="flex-grow h-0.5 bg-[#E8372A]/40 relative">
                      <div className="absolute top-1/2 -translate-y-1/2 left-0 h-1.5 w-1.5 bg-[#E8372A] rounded-full animate-ping" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="border-t border-white/5 pt-2 text-[7px] text-[#E8372A] truncate">
              &gt; WORKFLOW_LOG: &quot;Executing structured context assembly...&quot;
            </div>
          </div>
        );

      case 'custom-erp-dashboard':
        return (
          <div className="relative w-full h-full min-h-[220px] bg-neutral-950/80 rounded-xl p-3 overflow-hidden border border-white/5 font-mono text-[9px] text-[#A0A5B5] flex flex-col justify-between">
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
          <div className="relative w-full h-full min-h-[220px] bg-neutral-950/80 rounded-xl p-3 overflow-hidden border border-white/5 font-mono text-[9px] text-[#A0A5B5] flex flex-col justify-between">
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

      case 'future-saas-products':
      default:
        return (
          <div className="relative w-full h-full min-h-[220px] bg-neutral-950/80 rounded-xl p-3 overflow-hidden border border-white/5 font-mono text-[9px] text-[#A0A5B5] flex flex-col justify-between">
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
      <div className="relative w-full h-full min-h-[220px] bg-neutral-950/80 rounded-xl p-3 overflow-hidden border border-white/5 font-mono text-[9px] text-[#A0A5B5] flex flex-col justify-between">
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
      <div className="relative w-full h-full min-h-[220px] bg-neutral-950/80 rounded-xl p-3 overflow-hidden border border-white/5 font-mono text-[9px] text-[#A0A5B5] flex flex-col justify-between">
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
      <div key={idx} className="flex-grow flex-shrink basis-[150px] bg-[#0F1115]/35 border border-[#2D313A]/25 border-t-[#3D4250]/40 rounded-xl p-3 flex flex-col justify-between items-center text-center font-mono relative overflow-hidden backdrop-blur-md shadow-lg select-none">
        <div className="absolute top-1.5 right-1.5 flex gap-1 items-center">
          <div className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
        </div>
        
        <div className="relative w-14 h-14 flex items-center justify-center mb-1.5 bg-black/20 rounded-full border border-white/5">
          <span className="text-[10px] font-bold text-white/90 tracking-tighter">{value}</span>
          <svg className="absolute inset-0 w-full h-full rotate-[-90deg]">
            <circle cx="28" cy="28" r="23" stroke="rgba(255,255,255,0.03)" strokeWidth="1.5" fill="transparent" />
            <circle 
              cx="28" 
              cy="28" 
              r="23" 
              stroke="#E8372A" 
              strokeWidth="1.5" 
              fill="transparent" 
              strokeDasharray="144.5" 
              strokeDashoffset={144.5 - (144.5 * progress) / 100} 
              className="transition-all duration-1000 ease-out opacity-85"
            />
          </svg>
        </div>

        <span className="text-[8.5px] font-bold text-white/60 tracking-wider uppercase">{label}</span>
        <span className="text-[7px] text-white/35 mt-0.5 truncate max-w-full">{subtext}</span>
      </div>
    );
  };

  return (
    <section id="projects" className="relative py-20 overflow-hidden bg-transparent select-none font-mono min-h-screen flex flex-col justify-center">

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

      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full relative z-10 flex flex-col gap-6 mt-24">
        
        {/* Main Interface Cockpit Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* LEFT PANEL: GPS Destination Selector */}
          <div className="lg:col-span-3 flex flex-col">
            <CameraReactive depth="card" className="flex flex-col h-full">
              <div className="flex flex-col gap-3 h-full justify-start bg-[#0F1115]/30 border border-[#2D313A]/25 border-t-[#3D4250]/40 rounded-2xl p-4 backdrop-blur-md shadow-lg">
                <div className="border-b border-white/5 pb-2.5 flex justify-between items-center">
                  <span className="text-[7.5px] uppercase tracking-widest text-white/30 font-bold flex items-center gap-1.5">
                    <MapPin className="h-3 w-3 text-[#E8372A]" />
                    DESTINATIONS SELECT
                  </span>
                  <span className="text-[7px] text-white/20">COUNT: {PROJECTS_DATA.length}</span>
                </div>
                
                <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-y-auto lg:overflow-x-visible pb-2 lg:pb-0 gap-2.5 no-scrollbar lg:max-h-[460px] flex-grow pr-0 lg:pr-1">
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
                            ? 'bg-neutral-950/60 border-[#E8372A]/40 text-white hud-glow-red'
                            : 'bg-transparent border-white/5 text-white/30 hover:bg-white/5 hover:text-white/55'
                        }`}
                      >
                        <div className="flex justify-between items-center text-[8px] tracking-wider uppercase font-semibold">
                          <span className={`flex items-center gap-1 ${isSelected ? 'text-[#E8372A]' : 'text-white/30'}`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${isSelected ? 'bg-[#E8372A] animate-pulse' : 'bg-white/20'}`} />
                            {project.category}
                          </span>
                          <span className="text-[7px] opacity-75">{ext.distance}</span>
                        </div>

                        <h3 className={`text-xs font-semibold truncate transition-colors duration-300 ${
                          isSelected ? 'text-white font-bold' : 'text-white/50'
                        }`}>
                          {project.title}
                        </h3>

                        <div className="flex justify-between items-center gap-2 mt-0.5 text-[6.5px] opacity-70">
                          <div className="flex-grow h-[3px] bg-white/5 rounded-full overflow-hidden flex">
                            <div 
                              className={`h-full transition-all duration-1000 ${
                                isSelected ? 'bg-[#E8372A] w-[100%]' : 'bg-white/10 w-[40%]'
                              }`} 
                            />
                          </div>
                          <span className="text-[7px] uppercase font-bold shrink-0">{isSelected ? 'ACTIVE DEST' : 'STANDBY'}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </CameraReactive>
          </div>

          {/* CENTER PANEL: Infotainment Screen Display */}
          <div className="lg:col-span-5 flex flex-col">
            <CameraReactive depth="landmark" className="flex flex-col h-full">
              <div className="flex flex-col justify-between bg-[#0F1115]/30 border border-[#2D313A]/25 border-t-[#3D4250]/40 rounded-2xl p-4 backdrop-blur-md shadow-lg relative overflow-hidden min-h-[460px] flex-grow">
                <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-[#E8372A]/40 to-transparent" />
                
                {/* Infotainment Tab Selector bar */}
                <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
                  <div className="flex gap-1.5">
                    {(['console', 'gps', 'diagnostics'] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-2.5 py-1 rounded text-[8px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                          activeTab === tab
                            ? 'bg-[#E8372A]/10 border border-[#E8372A]/40 text-[#E8372A] shadow-[0_0_8px_rgba(232,55,42,0.12)]'
                            : 'bg-transparent border border-white/5 text-white/35 hover:text-white/60'
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
          <div className="lg:col-span-4 flex flex-col">
            <CameraReactive depth="card" className="flex flex-col h-full">
              <div className="flex flex-col justify-between bg-[#0F1115]/30 border border-[#2D313A]/25 border-t-[#3D4250]/40 rounded-2xl p-4.5 backdrop-blur-md shadow-lg font-mono text-[9px] relative overflow-hidden min-h-[460px] flex-grow">
                <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-[#E8372A]/40 to-transparent" />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedProject.id}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-3.5 flex-grow flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start border-b border-white/5 pb-2.5 mb-3">
                        <div>
                          <span className="text-[7px] uppercase tracking-widest text-white/25 block">MISSION TARGET</span>
                          <h3 className="text-sm font-bold text-white tracking-tight">{selectedProject.title}</h3>
                        </div>
                        <span className="text-[7.5px] bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 px-1.5 py-0.5 rounded flex items-center gap-1 font-bold tracking-widest animate-pulse uppercase">
                          ● ONLINE
                        </span>
                      </div>

                      <div className="mb-3">
                        <span className="block text-[7px] text-white/25 uppercase tracking-widest mb-0.5 font-bold flex items-center gap-1">
                          <Radio className="h-3 w-3 text-[#E8372A]" />
                          MISSION OBJECTIVE
                        </span>
                        <p className="text-white/70 leading-relaxed text-[8px] font-sans font-medium">
                          {extDetails.objective}
                        </p>
                      </div>

                      <div className="mb-3">
                        <span className="block text-[7px] text-white/25 uppercase tracking-widest mb-0.5 font-bold flex items-center gap-1">
                          <Shield className="h-3 w-3 text-white/30" />
                          SYSTEM BOTTLENECK
                        </span>
                        <p className="text-white/60 leading-relaxed text-[8px] font-sans">
                          {selectedProject.problem}
                        </p>
                      </div>

                      <div className="mb-3.5">
                        <span className="block text-[7px] text-white/25 uppercase tracking-widest mb-0.5 font-bold flex items-center gap-1">
                          <Activity className="h-3 w-3 text-white/30" />
                          ENGINEERING SOLUTION
                        </span>
                        <p className="text-white/60 leading-relaxed text-[8px] font-sans">
                          {selectedProject.solution}
                        </p>
                      </div>

                      <div className="border-t border-white/5 pt-3.5 space-y-1.5">
                        <span className="block text-[7px] text-white/25 uppercase tracking-widest font-bold">OPERATIONAL METRICS</span>
                        {selectedProject.results.map((result, idx) => (
                          <div key={idx} className="flex items-start gap-1.5 text-[7.5px] text-white/65">
                            <CheckCircle className="h-3 w-3 text-[#E8372A] flex-shrink-0 mt-0.5" />
                            <span className="font-sans leading-tight">{result}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-white/5 pt-2.5 flex justify-between items-center text-[7px] text-white/25">
                      <span>INFRA DEPLOYMENT</span>
                      <span className="text-white/70 font-bold uppercase tracking-wider">{selectedProject.techStack.slice(0, 3).join(' / ')}</span>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* CTA Inquire Trigger Button */}
                <div className="border-t border-white/5 pt-3.5 flex justify-end shrink-0">
                  <Button
                    variant="outline"
                    onClick={() => {
                      const el = document.getElementById('cta');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="group w-full text-[8px] font-bold py-1.5 border-white/5 text-white/70 hover:border-[#E8372A]/40 hover:text-white uppercase transition-all duration-300 flex items-center justify-center gap-1 cursor-pointer bg-neutral-950/20"
                  >
                    <span>Activate Interface Routing</span>
                    <ArrowRight className="h-3 w-3 text-[#E8372A] opacity-75 group-hover:translate-x-0.5 transition-transform" />
                  </Button>
                </div>
              </div>
            </CameraReactive>
          </div>

        </div>

        {/* BOTTOM DASHBOARD: Luxury Vehicle Dashboard Instrument Cluster */}
        <div className="w-full mt-4">
          <CameraReactive depth="button" className="w-full">
            <div className="flex flex-wrap lg:flex-nowrap gap-3.5 w-full justify-between items-stretch">
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
