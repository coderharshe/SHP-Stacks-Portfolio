"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Server, Cpu, Workflow, Layers, Cloud, Smartphone, 
  ArrowRight, ChevronDown 
} from 'lucide-react';
import { CameraReactive } from '@/components/ui/CameraReactive';

// ─── Types & Schema Definitions ──────────────────────────────────────────────
interface TechChip {
  name: string;
  level: string;
  built: number;
  useCase: string;
}

interface CapabilityDetails {
  overview: string;
  businessValue: string;
  typicalClients: string;
  techStack: TechChip[];
  timeline: string;
  complexity: string;
  roi: string;
  deployment: string;
  industries: string[];
}

interface Capability {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  shortDesc: string;
  details: CapabilityDetails;
}

// ─── SVG Topology Components (Center Panel) ──────────────────────────────────

// 1. Enterprise Software Diagram
const EnterpriseTopology: React.FC = () => (
  <svg className="w-full h-full min-h-[380px] md:min-h-[460px]" viewBox="0 0 520 360" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="520" height="360" rx="16" fill="rgba(10,11,13,0.6)" stroke="rgba(255,255,255,0.06)" />
    
    {/* Grid Lines */}
    <path d="M 0 90 L 520 90 M 0 180 L 520 180 M 0 270 L 520 270" stroke="rgba(255,255,255,0.02)" strokeDasharray="4 4" />
    <path d="M 130 0 L 130 360 M 260 0 L 260 360 M 390 0 L 390 360" stroke="rgba(255,255,255,0.02)" strokeDasharray="4 4" />

    {/* Load Balancer */}
    <rect x="185" y="25" width="150" height="46" rx="10" fill="rgba(255,92,0,0.08)" stroke="rgba(255,92,0,0.35)" />
    <text x="260" y="52" fill="#FFFFFF" fontSize="12" fontWeight="bold" fontFamily="monospace" textAnchor="middle">LOAD BALANCER</text>
    <text x="260" y="63" fill="#FF5C00" fontSize="9" fontFamily="monospace" textAnchor="middle">HA PROXY / NGINX</text>
    
    {/* API Nodes */}
    <rect x="30" y="145" width="130" height="46" rx="10" fill="rgba(255,92,0,0.05)" stroke="rgba(255,92,0,0.25)" />
    <text x="95" y="172" fill="#F0F1F3" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">API NODE 01</text>
    <text x="95" y="183" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="monospace" textAnchor="middle">GO / GOLANG</text>

    <rect x="195" y="145" width="130" height="46" rx="10" fill="rgba(255,92,0,0.08)" stroke="rgba(255,92,0,0.4)" />
    <text x="260" y="172" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">API NODE 02</text>
    <text x="260" y="183" fill="#FF5C00" fontSize="9" fontFamily="monospace" textAnchor="middle">ACTIVE WORKER</text>

    <rect x="360" y="145" width="130" height="46" rx="10" fill="rgba(255,92,0,0.05)" stroke="rgba(255,92,0,0.25)" />
    <text x="425" y="172" fill="#F0F1F3" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">API NODE 03</text>
    <text x="425" y="183" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="monospace" textAnchor="middle">AUTO SCALED</text>

    {/* Database Nodes */}
    <rect x="100" y="270" width="145" height="48" rx="10" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" />
    <text x="172.5" y="297" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">DB MASTER (WRITE)</text>
    <text x="172.5" y="308" fill="#FF5C00" fontSize="9" fontFamily="monospace" textAnchor="middle">POSTGRES 16</text>

    <rect x="275" y="270" width="145" height="48" rx="10" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" />
    <text x="347.5" y="297" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">DB REPLICA (READ)</text>
    <text x="347.5" y="308" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="monospace" textAnchor="middle">ASYNC SYNC</text>

    {/* Connecting Paths */}
    <path d="M 260 71 L 95 145" stroke="rgba(255,255,255,0.15)" strokeDasharray="4 4" strokeWidth="1.5" />
    <path d="M 260 71 L 260 145" stroke="#FF5C00" strokeWidth="2" />
    <path d="M 260 71 L 425 145" stroke="rgba(255,255,255,0.15)" strokeDasharray="4 4" strokeWidth="1.5" />
    
    <path d="M 95 191 L 172.5 270" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
    <path d="M 260 191 L 172.5 270" stroke="#FF5C00" strokeWidth="2" />
    <path d="M 425 191 L 347.5 270" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
    
    {/* Animated Data Packets */}
    <circle r="4.5" fill="#FF5C00">
      <animateMotion dur="2.2s" repeatCount="indefinite" path="M 260 71 L 260 145 L 172.5 270" />
    </circle>
    <circle r="3.5" fill="#FFA726">
      <animateMotion dur="3.0s" repeatCount="indefinite" path="M 260 71 L 425 145 L 347.5 270" />
    </circle>
  </svg>
);

// 2. AI Systems Diagram (RAG Pipeline)
const AISystemsTopology: React.FC = () => (
  <svg className="w-full h-full min-h-[380px] md:min-h-[460px]" viewBox="0 0 520 360" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="520" height="360" rx="16" fill="rgba(10,11,13,0.6)" stroke="rgba(255,255,255,0.06)" />
    
    {/* User Prompt Entry */}
    <circle cx="70" cy="180" r="28" fill="rgba(255,92,0,0.12)" stroke="rgba(255,92,0,0.4)" strokeWidth="2" />
    <text x="70" y="184" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">USER PROMPT</text>
    
    {/* Embedding Node */}
    <rect x="150" y="75" width="140" height="46" rx="10" fill="rgba(255,92,0,0.08)" stroke="rgba(255,92,0,0.35)" />
    <text x="220" y="102" fill="#FFFFFF" fontSize="12" fontWeight="bold" fontFamily="monospace" textAnchor="middle">EMBEDDINGS</text>
    <text x="220" y="113" fill="#FF5C00" fontSize="9" fontFamily="monospace" textAnchor="middle">ADA-002 / TEXT-3</text>

    {/* Vector Database */}
    <rect x="340" y="75" width="140" height="46" rx="10" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" />
    <text x="410" y="102" fill="#FFFFFF" fontSize="12" fontWeight="bold" fontFamily="monospace" textAnchor="middle">VECTOR DB</text>
    <text x="410" y="113" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="monospace" textAnchor="middle">PGVECTOR / PINECONE</text>

    {/* LLM Engine */}
    <rect x="340" y="240" width="140" height="46" rx="10" fill="rgba(255,92,0,0.08)" stroke="rgba(255,92,0,0.4)" />
    <text x="410" y="267" fill="#FFFFFF" fontSize="12" fontWeight="bold" fontFamily="monospace" textAnchor="middle">LLM ENGINE</text>
    <text x="410" y="278" fill="#FF5C00" fontSize="9" fontFamily="monospace" textAnchor="middle">CLAUDE SONNET / GPT-4o</text>

    {/* Context Compiler */}
    <rect x="150" y="240" width="140" height="46" rx="10" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" />
    <text x="220" y="267" fill="#FFFFFF" fontSize="12" fontWeight="bold" fontFamily="monospace" textAnchor="middle">CONTEXT WINDOW</text>
    <text x="220" y="278" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="monospace" textAnchor="middle">128K RAG INJECTION</text>

    {/* Paths */}
    <path d="M 98 180 L 150 98" stroke="#FF5C00" strokeWidth="2" />
    <path d="M 290 98 L 340 98" stroke="#FF5C00" strokeWidth="2" />
    <path d="M 410 121 L 410 240" stroke="rgba(255,255,255,0.2)" strokeDasharray="4 4" strokeWidth="1.5" />
    <path d="M 340 263 L 290 263" stroke="#FF5C00" strokeWidth="2" />
    <path d="M 150 263 L 98 180" stroke="#FF5C00" strokeWidth="2" />

    {/* Animated Pipeline Particle */}
    <circle r="4.5" fill="#FF5C00">
      <animateMotion dur="3.2s" repeatCount="indefinite" path="M 98 180 L 150 98 L 340 98 L 410 240 L 290 263 L 150 263 L 98 180" />
    </circle>
  </svg>
);

// 3. Automation Graph
const AutomationTopology: React.FC = () => (
  <svg className="w-full h-full min-h-[380px] md:min-h-[460px]" viewBox="0 0 520 360" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="520" height="360" rx="16" fill="rgba(10,11,13,0.6)" stroke="rgba(255,255,255,0.06)" />
    
    {/* Trigger Node */}
    <rect x="30" y="155" width="125" height="50" rx="10" fill="rgba(255,92,0,0.08)" stroke="rgba(255,92,0,0.4)" strokeWidth="1.5" />
    <text x="92.5" y="181" fill="#FFFFFF" fontSize="12" fontWeight="bold" fontFamily="monospace" textAnchor="middle">API TRIGGER</text>
    <text x="92.5" y="193" fill="#FF5C00" fontSize="9" fontFamily="monospace" textAnchor="middle">WEBHOOK / EVENT</text>

    {/* Router / Rule Engine */}
    <rect x="200" y="155" width="125" height="50" rx="10" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.15)" />
    <text x="262.5" y="181" fill="#FFFFFF" fontSize="12" fontWeight="bold" fontFamily="monospace" textAnchor="middle">RULE ENGINE</text>
    <text x="262.5" y="193" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="monospace" textAnchor="middle">n8n / TEMPORAL</text>

    {/* Integration targets */}
    <rect x="375" y="45" width="120" height="44" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" />
    <text x="435" y="72" fill="rgba(255,255,255,0.8)" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">CRM UPDATE</text>

    <rect x="375" y="158" width="120" height="44" rx="8" fill="rgba(255,92,0,0.08)" stroke="rgba(255,92,0,0.3)" />
    <text x="435" y="185" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">INVOICE SYNC</text>

    <rect x="375" y="270" width="120" height="44" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" />
    <text x="435" y="297" fill="rgba(255,255,255,0.8)" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">SLACK NOTIFY</text>

    {/* Links */}
    <path d="M 155 180 L 200 180" stroke="#FF5C00" strokeWidth="2.5" />
    <path d="M 325 180 L 350 180 L 350 67 L 375 67" stroke="rgba(255,255,255,0.15)" strokeDasharray="3 3" strokeWidth="1.5" />
    <path d="M 325 180 L 375 180" stroke="#FF5C00" strokeWidth="2" />
    <path d="M 325 180 L 350 180 L 350 292 L 375 292" stroke="rgba(255,255,255,0.15)" strokeDasharray="3 3" strokeWidth="1.5" />

    {/* Active pulse */}
    <circle r="4.5" fill="#FF5C00">
      <animateMotion dur="2.2s" repeatCount="indefinite" path="M 155 180 L 200 180 L 375 180" />
    </circle>
  </svg>
);

// 4. SaaS Platforms
const SaaSPlatformsTopology: React.FC = () => (
  <svg className="w-full h-full min-h-[380px] md:min-h-[460px]" viewBox="0 0 520 360" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="520" height="360" rx="16" fill="rgba(10,11,13,0.6)" stroke="rgba(255,255,255,0.06)" />
    
    {/* Tenant ingress */}
    <circle cx="65" cy="80" r="18" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" />
    <text x="65" y="84" fill="rgba(255,255,255,0.8)" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">TENANT A</text>

    <circle cx="65" cy="180" r="22" fill="rgba(255,92,0,0.12)" stroke="rgba(255,92,0,0.4)" strokeWidth="2" />
    <text x="65" y="184" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">TENANT B</text>

    <circle cx="65" cy="280" r="18" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" />
    <text x="65" y="284" fill="rgba(255,255,255,0.8)" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">TENANT C</text>

    {/* Edge Router */}
    <rect x="150" y="130" width="120" height="100" rx="12" fill="rgba(255,92,0,0.06)" stroke="rgba(255,92,0,0.3)" />
    <text x="210" y="175" fill="#FFFFFF" fontSize="12" fontWeight="bold" fontFamily="monospace" textAnchor="middle">EDGE ROUTER</text>
    <text x="210" y="190" fill="#FF5C00" fontSize="9" fontFamily="monospace" textAnchor="middle">& ISOLATION</text>

    {/* Stripe / Auth */}
    <rect x="330" y="60" width="145" height="46" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" />
    <text x="402.5" y="87" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">STRIPE / AUTH 0</text>

    {/* Schema Router DB */}
    <rect x="330" y="157" width="145" height="46" rx="8" fill="rgba(255,92,0,0.08)" stroke="rgba(255,92,0,0.35)" />
    <text x="402.5" y="184" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">SCHEMA ROUTER</text>

    <rect x="330" y="255" width="145" height="46" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" />
    <text x="402.5" y="282" fill="rgba(255,255,255,0.8)" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">POOLED RLS DB</text>

    {/* Connections */}
    <path d="M 83 80 L 150 150" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
    <path d="M 87 180 L 150 180" stroke="#FF5C00" strokeWidth="2.5" />
    <path d="M 83 280 L 150 210" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
    
    <path d="M 270 160 L 330 83" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
    <path d="M 270 180 L 330 180" stroke="#FF5C00" strokeWidth="2.5" />
    <path d="M 270 200 L 330 278" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />

    {/* Inbound data animation */}
    <circle r="4.5" fill="#FF5C00">
      <animateMotion dur="2.4s" repeatCount="indefinite" path="M 87 180 L 150 180 L 270 180 L 330 180" />
    </circle>
  </svg>
);

// 5. Cloud Infrastructure (AWS / K8s Cluster)
const CloudTopology: React.FC = () => (
  <svg className="w-full h-full min-h-[380px] md:min-h-[460px]" viewBox="0 0 520 360" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="520" height="360" rx="16" fill="rgba(10,11,13,0.6)" stroke="rgba(255,255,255,0.06)" />
    
    {/* ALB load balancer */}
    <circle cx="65" cy="180" r="26" fill="rgba(255,92,0,0.1)" stroke="rgba(255,92,0,0.4)" strokeWidth="2" />
    <text x="65" y="184" fill="#FFFFFF" fontSize="12" fontWeight="bold" fontFamily="monospace" textAnchor="middle">AWS ALB</text>

    {/* Kubernetes Target Group Boundary */}
    <rect x="150" y="45" width="345" height="270" rx="12" fill="rgba(255,92,0,0.02)" stroke="rgba(255,92,0,0.2)" strokeDasharray="6 6" />
    <text x="322.5" y="68" fill="#FF5C00" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">KUBERNETES CLUSTER (AWS VPC)</text>

    {/* Pods */}
    <rect x="180" y="95" width="130" height="46" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" />
    <text x="245" y="122" fill="rgba(255,255,255,0.8)" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">POD REPLICA 01</text>

    <rect x="180" y="157" width="130" height="46" rx="8" fill="rgba(255,92,0,0.08)" stroke="rgba(255,92,0,0.4)" />
    <text x="245" y="184" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">POD REPLICA 02</text>

    <rect x="180" y="220" width="130" height="46" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" />
    <text x="245" y="247" fill="rgba(255,255,255,0.8)" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">POD REPLICA 03</text>

    {/* Auto-scaling group */}
    <rect x="355" y="157" width="120" height="46" rx="8" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" />
    <text x="415" y="184" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">AUTO SCALER</text>

    {/* Routing links */}
    <path d="M 91 180 L 180 118" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
    <path d="M 91 180 L 180 180" stroke="#FF5C00" strokeWidth="2.5" />
    <path d="M 91 180 L 180 243" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
    
    <path d="M 310 180 L 355 180" stroke="#FF5C00" strokeWidth="2.5" />

    <circle r="4.5" fill="#FF5C00">
      <animateMotion dur="2.4s" repeatCount="indefinite" path="M 91 180 L 180 180 L 310 180 L 355 180" />
    </circle>
  </svg>
);

// 6. Mobile Application (Offline sync topology)
const MobileTopology: React.FC = () => (
  <svg className="w-full h-full min-h-[380px] md:min-h-[460px]" viewBox="0 0 520 360" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="520" height="360" rx="16" fill="rgba(10,11,13,0.6)" stroke="rgba(255,255,255,0.06)" />
    
    {/* Smartphone boundary */}
    <rect x="35" y="55" width="130" height="250" rx="16" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
    <text x="100" y="82" fill="rgba(255,255,255,0.8)" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">MOBILE DEVICE</text>

    {/* Local SQLite */}
    <rect x="50" y="155" width="100" height="46" rx="8" fill="rgba(255,92,0,0.08)" stroke="rgba(255,92,0,0.35)" />
    <text x="100" y="182" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">SQLITE DB</text>
    
    {/* Sync Queue */}
    <rect x="210" y="150" width="125" height="56" rx="10" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" />
    <text x="272.5" y="177" fill="#FFFFFF" fontSize="12" fontWeight="bold" fontFamily="monospace" textAnchor="middle">SYNC QUEUE</text>
    <text x="272.5" y="190" fill="#FF5C00" fontSize="9" fontFamily="monospace" textAnchor="middle">OFFLINE STORAGE</text>

    {/* WebSocket Gateway */}
    <rect x="375" y="150" width="125" height="56" rx="10" fill="rgba(255,92,0,0.08)" stroke="rgba(255,92,0,0.4)" />
    <text x="437.5" y="177" fill="#FFFFFF" fontSize="12" fontWeight="bold" fontFamily="monospace" textAnchor="middle">WEBSOCKET</text>
    <text x="437.5" y="190" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="monospace" textAnchor="middle">GATEWAY SERVER</text>

    {/* Connectors */}
    <path d="M 150 178 L 210 178" stroke="#FF5C00" strokeWidth="2.5" />
    <path d="M 335 178 L 375 178" stroke="#FF5C00" strokeWidth="2.5" />

    {/* Sync flow indicator */}
    <circle r="4.5" fill="#FF5C00">
      <animateMotion dur="2.2s" repeatCount="indefinite" path="M 150 178 L 210 178 L 335 178 L 375 178" />
    </circle>
  </svg>
);

// Map components for quick lookup
const topologyMap: Record<string, React.ComponentType> = {
  'enterprise-software': EnterpriseTopology,
  'ai-systems': AISystemsTopology,
  'automation': AutomationTopology,
  'saas-platforms': SaaSPlatformsTopology,
  'cloud-infrastructure': CloudTopology,
  'mobile-applications': MobileTopology
};

// ─── Data Arrays (Control center capabilities config) ────────────────────────
const CAPABILITIES_DATA: Capability[] = [
  {
    id: 'enterprise-software',
    title: 'Enterprise Software',
    icon: Server,
    shortDesc: 'Robust operational systems and backends designed for enterprise reliability.',
    details: {
      overview: 'Bespoke corporate engines that scale workflows, integrate siloed systems, and handle complex processes safely.',
      businessValue: 'Eliminate legacy SaaS subscription lock-ins, claim absolute data ownership, and reduce operation lag.',
      typicalClients: 'Multinationals, logistics operators, manufacturing factories.',
      techStack: [
        { name: 'Go / Golang', level: 'Production Grade', built: 14, useCase: 'High performance microservices' },
        { name: 'Node.js', level: 'Advanced', built: 32, useCase: 'I/O intensive API backends' },
        { name: 'PostgreSQL', level: 'Expert', built: 40, useCase: 'Relational data structures' },
        { name: 'Docker', level: 'Production Grade', built: 45, useCase: 'Consistent localized runs' }
      ],
      timeline: '8 - 12 Weeks',
      complexity: 'High',
      roi: '350% process speedup, 40% reduction in delay bottlenecks',
      deployment: 'AWS ECS / Dedicated On-Prem VPC',
      industries: ['Logistics', 'FinTech', 'Manufacturing']
    }
  },
  {
    id: 'ai-systems',
    title: 'AI Systems',
    icon: Cpu,
    shortDesc: 'Context-aware RAG pipelines and reasoning agentic architectures.',
    details: {
      overview: 'Go beyond simple chatbot windows. We build vector indexing networks that contextually understand enterprise docs.',
      businessValue: 'Autonomously extract data from PDFs, query system records semantically, and scale customer support natively.',
      typicalClients: 'Scaling startups, law groups, document heavy enterprises.',
      techStack: [
        { name: 'OpenAI / GPT-4o', level: 'Advanced', built: 18, useCase: 'Complex cognitive decision making' },
        { name: 'Claude Sonnet', level: 'Expert', built: 22, useCase: 'Deep reasoning and coding agents' },
        { name: 'Pgvector', level: 'Advanced', built: 12, useCase: 'High-speed database vector search' },
        { name: 'Python', level: 'Production Grade', built: 15, useCase: 'RAG scripts and prompt engineering' }
      ],
      timeline: '6 - 10 Weeks',
      complexity: 'Extremely High',
      roi: '60% Customer Support volume diversion, instant report parsing',
      deployment: 'Serverless Cloud Workers & Vector Stores',
      industries: ['LegalTech', 'B2B SaaS', 'Support']
    }
  },
  {
    id: 'automation',
    title: 'Automation',
    icon: Workflow,
    shortDesc: 'Distributed workflow sync servers connecting isolated services.',
    details: {
      overview: 'Real-time automation networks that process payloads, execute conditional routing, and monitor queues.',
      businessValue: 'Eliminate manual double-entry, link separate SaaS APIs automatically, and run processes 24/7.',
      typicalClients: 'E-commerce operations, marketing networks, finance divisions.',
      techStack: [
        { name: 'n8n', level: 'Expert', built: 50, useCase: 'Visual orchestration pipelines' },
        { name: 'RabbitMQ', level: 'Advanced', built: 8, useCase: 'High throughput event queueing' },
        { name: 'Node.js', level: 'Expert', built: 30, useCase: 'Bespoke event listener scripts' },
        { name: 'PostgreSQL', level: 'Advanced', built: 25, useCase: 'Persistent status logging' }
      ],
      timeline: '4 - 6 Weeks',
      complexity: 'Medium - High',
      roi: '250+ manual hours saved per team monthly, zero entry errors',
      deployment: 'Self-hosted Dockerized Nodes with redundancy',
      industries: ['E-commerce', 'Operations', 'Finance']
    }
  },
  {
    id: 'saas-platforms',
    title: 'SaaS Platforms',
    icon: Layers,
    shortDesc: 'Scale-ready multi-tenant architectures with integrated subscriptions.',
    details: {
      overview: 'Turn ideas into digital operations. We construct tenant-isolated database models and secure billing pipelines.',
      businessValue: 'Deploy multi-user commercial products to market with zero platform structural debt.',
      typicalClients: 'SaaS founders, commercial businesses, product innovators.',
      techStack: [
        { name: 'Next.js', level: 'Expert', built: 28, useCase: 'Optimized server rendered frontends' },
        { name: 'Supabase', level: 'Expert', built: 20, useCase: 'Serverless auth and database clusters' },
        { name: 'Stripe', level: 'Production Grade', built: 15, useCase: 'Multi-tiered recurring billing flows' },
        { name: 'Tailwind CSS', level: 'Advanced', built: 30, useCase: 'High fidelity interface setups' }
      ],
      timeline: '8 - 14 Weeks',
      complexity: 'High',
      roi: '100% compliant secure baseline, launch-ready commercial backend',
      deployment: 'Vercel Edge Servers + Multi-region DB routing',
      industries: ['B2B SaaS', 'E-Learning', 'Marketplaces']
    }
  },
  {
    id: 'cloud-infrastructure',
    title: 'Cloud Infrastructure',
    icon: Cloud,
    shortDesc: 'Zero-downtime, secure, and auto-scaling architecture environments.',
    details: {
      overview: 'Modern cloud provisioning configured as code (IaC) to protect client databases and support active deploys.',
      businessValue: 'Ensure service uptime, establish secure firewalls, and minimize cloud invoice costs.',
      typicalClients: 'Startups entering production scale, audit-heavy corporations.',
      techStack: [
        { name: 'AWS', level: 'Production Grade', built: 22, useCase: 'Virtual networks, VPC and EC2/ECS node storage' },
        { name: 'Terraform', level: 'Advanced', built: 10, useCase: 'IaC cloud infrastructure blueprints' },
        { name: 'Kubernetes', level: 'Advanced', built: 6, useCase: 'Self-healing auto-scaling pod layouts' },
        { name: 'Cloudflare', level: 'Expert', built: 35, useCase: 'Edge security WAF and CDN routing' }
      ],
      timeline: '4 - 8 Weeks',
      complexity: 'Extremely High',
      roi: '99.99% system uptime, zero deployment-related disruptions',
      deployment: 'Terraform scripted multi-zone infrastructure',
      industries: ['FinTech', 'HealthTech', 'E-commerce']
    }
  },
  {
    id: 'mobile-applications',
    title: 'Mobile Applications',
    icon: Smartphone,
    shortDesc: 'High-performance offline-first applications with background sync.',
    details: {
      overview: 'Fluid interfaces with local SQLite caching systems that sync data with background backends when connectivity returns.',
      businessValue: 'Provide field staff and customers with immediate mobile functionality anywhere.',
      typicalClients: 'On-demand platforms, logistics groups, retail networks.',
      techStack: [
        { name: 'React Native', level: 'Expert', built: 16, useCase: 'Cross-platform native engine code' },
        { name: 'Expo', level: 'Expert', built: 18, useCase: 'Rapid mobile building & OTA updates' },
        { name: 'SQLite', level: 'Advanced', built: 12, useCase: 'Robust database caching on-device' },
        { name: 'TypeScript', level: 'Expert', built: 45, useCase: 'Strong static compilation logic' }
      ],
      timeline: '8 - 12 Weeks',
      complexity: 'High',
      roi: 'Increased customer touchpoints, faster data tracking in physical environments',
      deployment: 'Apple App Store & Google Play Console',
      industries: ['Logistics', 'Retail', 'Field Operations']
    }
  }
];

// Telemetry Stats config
const TELEMETRY_STATS = [
  { label: 'AVG DEPLOYMENT TIME', value: '14 mins' },
  { label: 'PROJECTS COMPLETED', value: '40+' },
  { label: 'AI AUTOMATIONS ACTIVE', value: '120+' },
  { label: 'INFRASTRUCTURE UPTIME', value: '99.98%' },
  { label: 'API REQUESTS / MO', value: '4.8M' },
  { label: 'CLOUD REGIONS', value: '8' }
];

export const Services: React.FC = () => {
  const [activeId, setActiveId] = useState<string>('enterprise-software');
  const activeCapability = CAPABILITIES_DATA.find(c => c.id === activeId) || CAPABILITIES_DATA[0];
  const ActiveTopology = topologyMap[activeCapability.id] || EnterpriseTopology;

  // Track cursor movement for dynamic parallax highlights
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const dashboardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frameId: number;
    const handleMouseMove = (e: MouseEvent) => {
      if (!dashboardRef.current) return;
      const rect = dashboardRef.current.getBoundingClientRect();
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        setMousePos({
          x: (e.clientX - rect.left) / rect.width - 0.5,
          y: (e.clientY - rect.top) / rect.height - 0.5
        });
      });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <section id="services" className="relative py-24 sm:py-32 border-t border-border overflow-hidden bg-transparent">
      
      {/* Dynamic ambient grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 -z-10" />

      {/* Floating active capability glow */}
      <div 
        className="absolute w-[450px] h-[450px] rounded-full blur-[140px] transition-all duration-700 pointer-events-none -z-10" 
        style={{
          background: 'rgba(232, 55, 42, 0.04)',
          left: `calc(50% + ${mousePos.x * 120}px - 225px)`,
          top: `calc(50% + ${mousePos.y * 120}px - 225px)`
        }}
      />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <CameraReactive depth="hero-title" sectionProgressTarget={0.45} revealProgressOffset={-0.18}>
          <div className="max-w-3xl mb-16 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest font-semibold" style={{ color: '#FF5C00' }}>
              CAPABILITIES CONTROL CENTER
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight font-sans leading-tight" style={{ color: '#F0F1F3' }}>
              Architecting Digital Ecosystems.
            </h2>
            <p className="text-base sm:text-lg leading-relaxed font-light" style={{ color: 'var(--text-tertiary)' }}>
              We design, build, and deploy complete software infrastructures. Explore our system capabilities below.
            </p>
          </div>
        </CameraReactive>

        {/* 1. DESKTOP & TABLET VIEW (Split Dashboard Layout) */}
        <div ref={dashboardRef} className="hidden md:grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT PANEL: Capability Navigator */}
          <div className="md:col-span-12 lg:col-span-3 flex flex-col justify-center">
            <div className="text-xs font-mono tracking-widest text-slate-400 font-semibold uppercase mb-4">SYSTEM MODULES</div>
            <div className="grid grid-cols-3 lg:flex lg:flex-col gap-2.5">
              {CAPABILITIES_DATA.map((cap) => {
                const Icon = cap.icon;
                const isActive = cap.id === activeId;
                return (
                  <button
                    key={cap.id}
                    onClick={() => setActiveId(cap.id)}
                    className={`relative text-left p-4 rounded-xl flex items-center gap-4 transition-all duration-300 border cursor-pointer select-none group ${
                      isActive 
                        ? 'bg-white/[0.06] border-white/20 shadow-[0_4px_24px_-8px_rgba(255,92,0,0.15)]' 
                        : 'bg-transparent border-white/[0.03] hover:bg-white/[0.02] hover:border-white/10'
                    }`}
                  >
                    {/* Active accent vertical line */}
                    <div 
                      className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r transition-all duration-300"
                      style={{
                        background: isActive ? 'linear-gradient(to bottom, #FF5C00, #FF8C00)' : 'transparent',
                        boxShadow: isActive ? '0 0 10px rgba(255, 92, 0, 0.7)' : 'none'
                      }}
                    />

                    {/* Module Status Dot */}
                    <div 
                      className={`h-2 w-2 rounded-full transition-all duration-300 ${
                        isActive ? 'bg-[#FF5C00] scale-110 animate-pulse' : 'bg-slate-600'
                      }`}
                    />

                    {/* Icon */}
                    <Icon className={`h-5 w-5 transition-colors duration-300 ${isActive ? 'text-[#FF5C00]' : 'text-slate-400 group-hover:text-slate-200'}`} />

                    {/* Text */}
                    <span className={`text-sm font-semibold tracking-tight transition-colors duration-300 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}>
                      {cap.title}
                    </span>

                    {/* Hover Glow Light Shift */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-xl overflow-hidden">
                      <div 
                        className="absolute w-24 h-24 rounded-full blur-xl bg-white/[0.02] -translate-x-12 -translate-y-12"
                        style={{
                          left: `${mousePos.x * 200 + 100}px`,
                          top: `${mousePos.y * 200 + 100}px`
                        }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* CENTER PANEL: Live Topology Visualization */}
          <div className="md:col-span-6 lg:col-span-5 flex flex-col justify-center border border-white/[0.06] bg-black/40 rounded-2xl p-6 md:p-8 relative overflow-hidden backdrop-blur-md min-h-[440px] md:min-h-[500px]">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-4 mb-6">
              <div className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-[#22C55E] animate-pulse" />
                <span className="text-xs font-mono tracking-widest text-slate-300 font-semibold uppercase">LIVE TOPOLOGY MAP</span>
              </div>
              <span className="text-xs font-mono font-semibold text-[#FF5C00]">NODE_STATUS: ACTIVE</span>
            </div>

            <div className="flex-grow flex items-center justify-center relative w-full h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeId}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full flex items-center justify-center"
                >
                  <ActiveTopology />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT PANEL: Capability Intelligence Specs */}
          <div className="md:col-span-6 lg:col-span-4 flex flex-col justify-between border border-white/[0.06] bg-black/40 rounded-2xl p-6 md:p-8 backdrop-blur-md">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6 flex-grow"
              >
                {/* Header */}
                <div className="space-y-1.5 border-b border-white/[0.06] pb-4">
                  <span className="text-xs font-mono text-[#FF5C00] font-semibold tracking-widest uppercase">MODULE SPECS</span>
                  <h3 className="text-2xl font-bold tracking-tight text-white">{activeCapability.title}</h3>
                </div>

                {/* Specs Table */}
                <div className="space-y-4 text-xs font-mono">
                  
                  <div className="grid grid-cols-3 py-1.5 border-b border-white/[0.03]">
                    <span className="text-slate-400 font-semibold uppercase">OVERVIEW</span>
                    <span className="col-span-2 text-slate-200 font-normal leading-relaxed font-sans text-sm">{activeCapability.details.overview}</span>
                  </div>

                  <div className="grid grid-cols-3 py-1.5 border-b border-white/[0.03]">
                    <span className="text-slate-400 font-semibold uppercase">VALUE PROP</span>
                    <span className="col-span-2 text-slate-200 font-normal leading-relaxed font-sans text-sm">{activeCapability.details.businessValue}</span>
                  </div>

                  <div className="grid grid-cols-3 py-1.5 border-b border-white/[0.03]">
                    <span className="text-slate-400 font-semibold uppercase">CLIENT PROFILE</span>
                    <span className="col-span-2 text-slate-200 font-sans font-normal text-sm">{activeCapability.details.typicalClients}</span>
                  </div>

                  <div className="grid grid-cols-3 py-1.5 border-b border-white/[0.03]">
                    <span className="text-slate-400 font-semibold uppercase">TIMELINE</span>
                    <span className="col-span-2 text-[#FF5C00] font-bold text-sm">{activeCapability.details.timeline}</span>
                  </div>

                  <div className="grid grid-cols-3 py-1.5 border-b border-white/[0.03]">
                    <span className="text-slate-400 font-semibold uppercase">COMPLEXITY</span>
                    <span className="col-span-2 text-white font-semibold text-sm">{activeCapability.details.complexity}</span>
                  </div>

                  <div className="grid grid-cols-3 py-1.5 border-b border-white/[0.03]">
                    <span className="text-slate-400 font-semibold uppercase">ESTIMATED ROI</span>
                    <span className="col-span-2 text-slate-200 font-sans font-normal text-sm">{activeCapability.details.roi}</span>
                  </div>

                  <div className="grid grid-cols-3 py-1.5 border-b border-white/[0.03]">
                    <span className="text-slate-400 font-semibold uppercase">DEPLOY MODEL</span>
                    <span className="col-span-2 text-slate-200 font-sans font-normal text-sm">{activeCapability.details.deployment}</span>
                  </div>

                  <div className="grid grid-cols-3 py-1.5 border-b border-white/[0.03]">
                    <span className="text-slate-400 font-semibold uppercase">TARGET SEC</span>
                    <span className="col-span-2 text-slate-200 font-sans font-normal text-sm">{activeCapability.details.industries.join(', ')}</span>
                  </div>
                </div>

                {/* Tech Chips */}
                <div className="space-y-3 pt-3">
                  <div className="text-xs font-mono tracking-widest text-slate-400 font-semibold uppercase">STACK SPECIFICATION</div>
                  <div className="flex flex-wrap gap-2">
                    {activeCapability.details.techStack.map((tech) => (
                      <div 
                        key={tech.name}
                        className="group/chip relative px-3 py-1.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.03] hover:border-white/15 text-xs text-[var(--text-secondary)] hover:text-white font-sans transition-all duration-200 cursor-help"
                      >
                        {tech.name}

                        {/* Tech Chip Hover Tooltip */}
                        <div className="absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-52 bg-black/60 backdrop-blur-md border border-white/10 rounded-lg p-3 shadow-xl opacity-0 scale-95 group-hover/chip:opacity-100 group-hover/chip:scale-100 transition-all duration-200 pointer-events-none z-50 text-left">
                          <div className="text-[10px] font-mono font-semibold text-[#FF5C00] uppercase mb-1">{tech.level}</div>
                          <div className="text-xs font-bold text-white mb-2">{tech.name}</div>
                          <div className="text-[10px] leading-relaxed text-slate-300 font-light mb-1.5">Use Case: {tech.useCase}</div>
                          <div className="text-[10px] font-mono text-slate-400 border-t border-white/10 pt-1.5">Projects built: {tech.built}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Inquire Action */}
            <div className="mt-8 pt-4 border-t border-white/[0.04]">
              <button 
                onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full py-3.5 rounded-xl bg-white/[0.04] hover:bg-[#FF5C00] border border-white/10 hover:border-[#FF5C00] text-xs font-mono font-bold tracking-wider uppercase text-white hover:shadow-[0_0_24px_rgba(255,92,0,0.4)] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 group"
              >
                <span>Initialize Module Inquiry</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

        </div>

        {/* 2. MOBILE VIEW (Accordion Layout with Sticky/Inline Visualization) */}
        <div className="block md:hidden space-y-4">
          <div className="text-xs font-mono tracking-widest text-slate-400 font-semibold uppercase mb-4">SYSTEM MODULES</div>
          <div className="space-y-3">
            {CAPABILITIES_DATA.map((cap) => {
              const Icon = cap.icon;
              const isOpen = cap.id === activeId;
              const CapTopology = topologyMap[cap.id] || EnterpriseTopology;
              
              return (
                <div 
                  key={cap.id}
                  className={`border rounded-xl transition-all duration-300 overflow-hidden ${
                    isOpen ? 'bg-white/[0.03] border-white/20' : 'bg-transparent border-white/[0.03]'
                  }`}
                >
                  {/* Accordion Trigger */}
                  <button
                    onClick={() => setActiveId(isOpen ? '' : cap.id)}
                    className="w-full p-4 flex items-center justify-between text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`h-2 w-2 rounded-full ${isOpen ? 'bg-[#FF5C00] animate-pulse' : 'bg-slate-600'}`} />
                      <Icon className={`h-5 w-5 ${isOpen ? 'text-[#FF5C00]' : 'text-slate-400'}`} />
                      <span className={`text-sm font-semibold tracking-tight ${isOpen ? 'text-white' : 'text-slate-300'}`}>
                        {cap.title}
                      </span>
                    </div>
                    <ChevronDown className={`h-4 w-4 text-[var(--text-tertiary)] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Accordion Content */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="p-4 pt-0 border-t border-white/[0.02] space-y-6">
                          
                          {/* Inline Topology Map */}
                          <div className="border border-white/[0.04] bg-black/20 rounded-xl p-3 flex items-center justify-center">
                            <CapTopology />
                          </div>

                          {/* Specs Details */}
                          <div className="space-y-4 text-xs font-mono">
                            <div className="flex flex-col gap-1 border-b border-white/[0.02] pb-2">
                              <span className="text-[var(--text-disabled)] text-[9px] uppercase">OVERVIEW</span>
                              <span className="text-[var(--text-secondary)] font-light font-sans leading-relaxed">{cap.details.overview}</span>
                            </div>
                            <div className="flex flex-col gap-1 border-b border-white/[0.02] pb-2">
                              <span className="text-[var(--text-disabled)] text-[9px] uppercase">VALUE PROP</span>
                              <span className="text-[var(--text-secondary)] font-light font-sans leading-relaxed">{cap.details.businessValue}</span>
                            </div>
                            <div className="flex flex-col gap-1 border-b border-white/[0.02] pb-2">
                              <span className="text-[var(--text-disabled)] text-[9px] uppercase">TIMELINE</span>
                              <span className="text-[#FF5A4B] font-semibold">{cap.details.timeline}</span>
                            </div>
                            <div className="flex flex-col gap-1 border-b border-white/[0.02] pb-2">
                              <span className="text-[var(--text-disabled)] text-[9px] uppercase">COMPLEXITY</span>
                              <span className="text-white">{cap.details.complexity}</span>
                            </div>
                            <div className="flex flex-col gap-1 border-b border-white/[0.02] pb-2">
                              <span className="text-[var(--text-disabled)] text-[9px] uppercase">ESTIMATED ROI</span>
                              <span className="text-white font-sans font-light leading-relaxed">{cap.details.roi}</span>
                            </div>
                          </div>

                          {/* Tech stack */}
                          <div className="space-y-2">
                            <span className="text-[var(--text-disabled)] text-[9px] font-mono uppercase">STACK SPECIFICATION</span>
                            <div className="flex flex-wrap gap-1.5">
                              {cap.details.techStack.map((tech) => (
                                <span key={tech.name} className="px-2.5 py-1 rounded bg-white/[0.02] border border-white/[0.04] text-[9px] text-[var(--text-secondary)]">
                                  {tech.name}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Inquire Action Button */}
                          <button 
                            onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}
                            className="w-full py-2.5 rounded-lg bg-white/[0.03] hover:bg-[#E8372A] border border-white/10 text-[10px] font-mono font-semibold tracking-wider uppercase text-white transition-all duration-300 cursor-pointer"
                          >
                            Inquire About Module
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* BOTTOM PANEL: Telemetry Indicators */}
        <div className="mt-12 p-6 rounded-2xl border border-white/[0.04] bg-white/[0.01] backdrop-blur-md">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {TELEMETRY_STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1 text-left border-l border-white/5 pl-4 first:border-l-0">
                <span className="text-[8px] font-mono tracking-widest text-[var(--text-disabled)] uppercase leading-none">{stat.label}</span>
                <span className="text-xl font-bold font-sans tracking-tight text-[#F0F1F3] mt-1.5">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
