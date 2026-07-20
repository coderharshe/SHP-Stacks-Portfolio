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
  <svg className="w-full h-full min-h-[220px] md:min-h-[300px]" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="300" rx="12" fill="rgba(10,11,13,0.4)" stroke="rgba(255,255,255,0.03)" />
    
    {/* Load Balancer */}
    <rect x="160" y="30" width="80" height="32" rx="6" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" />
    <text x="200" y="50" fill="#E2E8F0" fontSize="8" fontFamily="monospace" textAnchor="middle">LOAD BALANCER</text>
    
    {/* API Nodes */}
    <rect x="50" y="110" width="80" height="32" rx="6" fill="rgba(255,90,75,0.05)" stroke="rgba(255,90,75,0.2)" />
    <text x="90" y="130" fill="#E2E8F0" fontSize="8" fontFamily="monospace" textAnchor="middle">API NODE 01</text>

    <rect x="160" y="110" width="80" height="32" rx="6" fill="rgba(255,90,75,0.05)" stroke="rgba(255,90,75,0.2)" />
    <text x="200" y="130" fill="#E2E8F0" fontSize="8" fontFamily="monospace" textAnchor="middle">API NODE 02</text>

    <rect x="270" y="110" width="80" height="32" rx="6" fill="rgba(255,90,75,0.05)" stroke="rgba(255,90,75,0.2)" />
    <text x="310" y="130" fill="#E2E8F0" fontSize="8" fontFamily="monospace" textAnchor="middle">API NODE 03</text>

    {/* Database replications */}
    <rect x="100" y="210" width="90" height="32" rx="6" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" />
    <text x="145" y="230" fill="var(--text-secondary)" fontSize="8" fontFamily="monospace" textAnchor="middle">DB MASTER (WRITE)</text>

    <rect x="210" y="210" width="90" height="32" rx="6" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" />
    <text x="255" y="230" fill="var(--text-secondary)" fontSize="8" fontFamily="monospace" textAnchor="middle">DB REPLICA (READ)</text>

    {/* Connecting lines */}
    <path d="M 200 62 L 90 110" stroke="rgba(255,255,255,0.1)" strokeDasharray="3 3" />
    <path d="M 200 62 L 200 110" stroke="rgba(255,90,75,0.3)" />
    <path d="M 200 62 L 310 110" stroke="rgba(255,255,255,0.1)" strokeDasharray="3 3" />
    
    <path d="M 90 142 L 145 210" stroke="rgba(255,255,255,0.1)" />
    <path d="M 200 142 L 145 210" stroke="rgba(255,90,75,0.3)" />
    <path d="M 310 142 L 255 210" stroke="rgba(255,255,255,0.1)" />
    
    {/* Animated Data Packets */}
    <circle r="3" fill="#FF5A4B">
      <animateMotion dur="2.4s" repeatCount="indefinite" path="M 200 62 L 200 110 L 145 210" />
    </circle>
    <circle r="2.5" fill="#FFA726">
      <animateMotion dur="3.2s" repeatCount="indefinite" path="M 200 62 L 310 110 L 255 210" />
    </circle>
  </svg>
);

// 2. AI Systems Diagram (RAG Pipeline)
const AISystemsTopology: React.FC = () => (
  <svg className="w-full h-full min-h-[220px] md:min-h-[300px]" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="300" rx="12" fill="rgba(10,11,13,0.4)" stroke="rgba(255,255,255,0.03)" />
    
    {/* User Prompt */}
    <circle cx="50" cy="150" r="18" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" />
    <text x="50" y="153" fill="#E2E8F0" fontSize="7" fontFamily="monospace" textAnchor="middle">PROMPT</text>
    
    {/* Embedding Node */}
    <rect x="110" y="70" width="80" height="30" rx="4" fill="rgba(255,90,75,0.05)" stroke="rgba(255,90,75,0.2)" />
    <text x="150" y="88" fill="#E2E8F0" fontSize="7" fontFamily="monospace" textAnchor="middle">EMBEDDING</text>
    
    {/* Vector Database */}
    <rect x="220" y="70" width="80" height="30" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" />
    <text x="260" y="88" fill="var(--text-secondary)" fontSize="7" fontFamily="monospace" textAnchor="middle">VECTOR DB</text>

    {/* LLM Engine */}
    <rect x="220" y="200" width="80" height="30" rx="4" fill="rgba(255,90,75,0.05)" stroke="rgba(255,90,75,0.2)" />
    <text x="260" y="218" fill="#E2E8F0" fontSize="7" fontFamily="monospace" textAnchor="middle">LLM ENGINE</text>

    {/* Context compiler */}
    <rect x="110" y="200" width="80" height="30" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" />
    <text x="150" y="218" fill="var(--text-secondary)" fontSize="7" fontFamily="monospace" textAnchor="middle">CONTEXT WINDOW</text>

    {/* Paths */}
    <path d="M 68 150 L 110 85" stroke="rgba(255,255,255,0.1)" />
    <path d="M 190 85 L 220 85" stroke="rgba(255,90,75,0.3)" />
    <path d="M 260 100 L 260 200" stroke="rgba(255,255,255,0.1)" strokeDasharray="3 3" />
    <path d="M 220 215 L 190 215" stroke="rgba(255,90,75,0.3)" />
    <path d="M 110 215 L 68 150" stroke="rgba(255,255,255,0.1)" />

    {/* Animated pipeline particles */}
    <circle r="3" fill="#FF5A4B">
      <animateMotion dur="3s" repeatCount="indefinite" path="M 68 150 L 110 85 L 220 85 L 260 200 L 110 215 L 68 150" />
    </circle>
  </svg>
);

// 3. Automation Graph
const AutomationTopology: React.FC = () => (
  <svg className="w-full h-full min-h-[220px] md:min-h-[300px]" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="300" rx="12" fill="rgba(10,11,13,0.4)" stroke="rgba(255,255,255,0.03)" />
    
    {/* Trigger Node */}
    <rect x="25" y="130" width="70" height="40" rx="6" fill="rgba(255,90,75,0.05)" stroke="rgba(255,90,75,0.25)" />
    <text x="60" y="150" fill="#E2E8F0" fontSize="8" fontFamily="monospace" textAnchor="middle">API TRIGGER</text>
    <text x="60" y="160" fill="#FF5A4B" fontSize="6" fontFamily="monospace" textAnchor="middle">WEBHOOK</text>

    {/* Router */}
    <rect x="145" y="130" width="70" height="40" rx="6" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" />
    <text x="180" y="153" fill="#E2E8F0" fontSize="8" fontFamily="monospace" textAnchor="middle">RULE ENGINE</text>

    {/* Integration targets */}
    <rect x="270" y="40" width="90" height="30" rx="4" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" />
    <text x="315" y="58" fill="var(--text-secondary)" fontSize="7" fontFamily="monospace" textAnchor="middle">CRM UPDATE</text>

    <rect x="270" y="135" width="90" height="30" rx="4" fill="rgba(255,90,75,0.03)" stroke="rgba(255,90,75,0.15)" />
    <text x="315" y="153" fill="#E2E8F0" fontSize="7" fontFamily="monospace" textAnchor="middle">VERIFY INVOICE</text>

    <rect x="270" y="230" width="90" height="30" rx="4" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" />
    <text x="315" y="248" fill="var(--text-secondary)" fontSize="7" fontFamily="monospace" textAnchor="middle">SLACK SYNC</text>

    {/* Links */}
    <path d="M 95 150 L 145 150" stroke="#FF5A4B" strokeWidth="1.2" />
    <path d="M 215 150 L 240 150 L 240 55 L 270 55" stroke="rgba(255,255,255,0.1)" strokeDasharray="2 2" />
    <path d="M 215 150 L 270 150" stroke="rgba(255,90,75,0.3)" />
    <path d="M 215 150 L 240 150 L 240 245 L 270 245" stroke="rgba(255,255,255,0.1)" strokeDasharray="2 2" />

    {/* Active pulse */}
    <circle r="3" fill="#FF5A4B">
      <animateMotion dur="2s" repeatCount="indefinite" path="M 95 150 L 145 150 L 270 150" />
    </circle>
  </svg>
);

// 4. SaaS Platforms
const SaaSPlatformsTopology: React.FC = () => (
  <svg className="w-full h-full min-h-[220px] md:min-h-[300px]" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="300" rx="12" fill="rgba(10,11,13,0.4)" stroke="rgba(255,255,255,0.03)" />
    
    {/* Tenant ingress */}
    <circle cx="50" cy="80" r="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" />
    <text x="50" y="94" fill="var(--text-secondary)" fontSize="5" fontFamily="monospace" textAnchor="middle">TENANT A</text>

    <circle cx="50" cy="150" r="10" fill="rgba(255,90,75,0.05)" stroke="rgba(255,90,75,0.2)" />
    <text x="50" y="164" fill="#E2E8F0" fontSize="5" fontFamily="monospace" textAnchor="middle">TENANT B</text>

    <circle cx="50" cy="220" r="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" />
    <text x="50" y="234" fill="var(--text-secondary)" fontSize="5" fontFamily="monospace" textAnchor="middle">TENANT C</text>

    {/* Edge Router */}
    <rect x="110" y="110" width="70" height="80" rx="6" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" />
    <text x="145" y="145" fill="#E2E8F0" fontSize="7" fontFamily="monospace" textAnchor="middle">EDGE ROUTING</text>
    <text x="145" y="155" fill="#FF5A4B" fontSize="6" fontFamily="monospace" textAnchor="middle">& ISOLATION</text>

    {/* Stripe / Middlewares */}
    <rect x="210" y="55" width="80" height="30" rx="4" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" />
    <text x="250" y="73" fill="var(--text-secondary)" fontSize="7" fontFamily="monospace" textAnchor="middle">STRIPE VERIFY</text>

    {/* Shared Schema DB */}
    <rect x="210" y="135" width="80" height="30" rx="4" fill="rgba(255,90,75,0.05)" stroke="rgba(255,90,75,0.2)" />
    <text x="250" y="153" fill="#E2E8F0" fontSize="7" fontFamily="monospace" textAnchor="middle">SCHEMA ROUTER</text>

    <rect x="310" y="135" width="70" height="30" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" />
    <text x="345" y="153" fill="var(--text-secondary)" fontSize="7" fontFamily="monospace" textAnchor="middle">POOLED DB</text>

    {/* Connections */}
    <path d="M 60 80 L 110 130" stroke="rgba(255,255,255,0.08)" />
    <path d="M 60 150 L 110 150" stroke="rgba(255,90,75,0.3)" />
    <path d="M 60 220 L 110 170" stroke="rgba(255,255,255,0.08)" />
    
    <path d="M 180 140 L 210 70" stroke="rgba(255,255,255,0.08)" />
    <path d="M 180 150 L 210 150" stroke="rgba(255,90,75,0.3)" />
    <path d="M 290 150 L 310 150" stroke="#FF5A4B" />

    {/* Inbound data animation */}
    <circle r="2.5" fill="#FF5A4B">
      <animateMotion dur="2.2s" repeatCount="indefinite" path="M 60 150 L 110 150 L 180 150 L 210 150 L 310 150" />
    </circle>
  </svg>
);

// 5. Cloud Infrastructure (AWS / K8s Cluster)
const CloudTopology: React.FC = () => (
  <svg className="w-full h-full min-h-[220px] md:min-h-[300px]" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="300" rx="12" fill="rgba(10,11,13,0.4)" stroke="rgba(255,255,255,0.03)" />
    
    {/* ALB load balancer */}
    <rect x="50" y="130" width="40" height="40" rx="20" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" />
    <text x="70" y="153" fill="#E2E8F0" fontSize="7" fontFamily="monospace" textAnchor="middle">ALB</text>

    {/* Kubernetes Target Group */}
    <rect x="140" y="40" width="220" height="220" rx="8" fill="rgba(255,90,75,0.02)" stroke="rgba(255,90,75,0.15)" strokeDasharray="4 4" />
    <text x="250" y="55" fill="#FF5A4B" fontSize="7" fontFamily="monospace" textAnchor="middle">KUBERNETES CLUSTER (VPC)</text>

    {/* Pods */}
    <rect x="160" y="80" width="70" height="30" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" />
    <text x="195" y="98" fill="var(--text-secondary)" fontSize="7" fontFamily="monospace" textAnchor="middle">POD REPLICA</text>

    <rect x="160" y="135" width="70" height="30" rx="4" fill="rgba(255,90,75,0.05)" stroke="rgba(255,90,75,0.2)" />
    <text x="195" y="153" fill="#E2E8F0" fontSize="7" fontFamily="monospace" textAnchor="middle">POD REPLICA</text>

    <rect x="160" y="190" width="70" height="30" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" />
    <text x="195" y="208" fill="var(--text-secondary)" fontSize="7" fontFamily="monospace" textAnchor="middle">POD REPLICA</text>

    {/* Auto-scaling group */}
    <rect x="270" y="135" width="70" height="30" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" />
    <text x="305" y="153" fill="var(--text-secondary)" fontSize="6" fontFamily="monospace" textAnchor="middle">AUTO SCALER</text>

    {/* Routing links */}
    <path d="M 90 150 L 160 95" stroke="rgba(255,255,255,0.08)" />
    <path d="M 90 150 L 160 150" stroke="rgba(255,90,75,0.3)" />
    <path d="M 90 150 L 160 205" stroke="rgba(255,255,255,0.08)" />
    
    <path d="M 230 150 L 270 150" stroke="rgba(255,90,75,0.3)" />

    <circle r="3" fill="#FF5A4B">
      <animateMotion dur="2.5s" repeatCount="indefinite" path="M 90 150 L 160 150 L 230 150 L 270 150" />
    </circle>
  </svg>
);

// 6. Mobile Application (Offline sync topology)
const MobileTopology: React.FC = () => (
  <svg className="w-full h-full min-h-[220px] md:min-h-[300px]" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="300" rx="12" fill="rgba(10,11,13,0.4)" stroke="rgba(255,255,255,0.03)" />
    
    {/* Smartphone boundary */}
    <rect x="30" y="60" width="80" height="180" rx="12" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.12)" />
    <text x="70" y="80" fill="var(--text-secondary)" fontSize="7" fontFamily="monospace" textAnchor="middle">MOBILE DEVICE</text>

    {/* Local SQLite */}
    <rect x="40" y="120" width="60" height="30" rx="4" fill="rgba(255,90,75,0.05)" stroke="rgba(255,90,75,0.2)" />
    <text x="70" y="138" fill="#E2E8F0" fontSize="7" fontFamily="monospace" textAnchor="middle">SQLITE</text>
    
    {/* Sync Queue */}
    <rect x="150" y="120" width="80" height="40" rx="6" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" />
    <text x="190" y="140" fill="#E2E8F0" fontSize="7" fontFamily="monospace" textAnchor="middle">SYNC QUEUE</text>
    <text x="190" y="150" fill="#FF5A4B" fontSize="6" fontFamily="monospace" textAnchor="middle">(OFFLINE STORAGE)</text>

    {/* WebSocket Gateway */}
    <rect x="270" y="120" width="90" height="40" rx="6" fill="rgba(255,90,75,0.05)" stroke="rgba(255,90,75,0.2)" />
    <text x="315" y="140" fill="#E2E8F0" fontSize="7" fontFamily="monospace" textAnchor="middle">WEBSOCKET</text>
    <text x="315" y="150" fill="var(--text-secondary)" fontSize="6" fontFamily="monospace" textAnchor="middle">SYNC SERVER</text>

    {/* Connectors */}
    <path d="M 100 135 L 150 135" stroke="rgba(255,90,75,0.3)" />
    <path d="M 230 140 L 270 140" stroke="#FF5A4B" strokeWidth="1.2" />

    {/* Sync flow indicator */}
    <circle r="3" fill="#FF5A4B">
      <animateMotion dur="2s" repeatCount="indefinite" path="M 100 135 L 150 135 L 230 135 L 270 135" />
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
            <span className="text-xs font-mono uppercase tracking-widest font-semibold" style={{ color: '#E8372A' }}>
              CAPABILITIES CONTROL CENTER
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight font-sans leading-tight" style={{ color: '#F0F1F3' }}>
              Architecting Digital Ecosystems.
            </h2>
            <p className="text-sm sm:text-base leading-relaxed font-light" style={{ color: 'var(--text-tertiary)' }}>
              We design, build, and deploy complete software infrastructures. Explore our system capabilities below.
            </p>
          </div>
        </CameraReactive>

        {/* 1. DESKTOP & TABLET VIEW (Split Dashboard Layout) */}
        <div ref={dashboardRef} className="hidden md:grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT PANEL: Capability Navigator */}
          <div className="md:col-span-12 lg:col-span-3 flex flex-col justify-center">
            <div className="text-[10px] font-mono tracking-widest text-[var(--text-disabled)] uppercase mb-4">SYSTEM MODULES</div>
            <div className="grid grid-cols-3 lg:flex lg:flex-col gap-2">
              {CAPABILITIES_DATA.map((cap) => {
                const Icon = cap.icon;
                const isActive = cap.id === activeId;
                return (
                  <button
                    key={cap.id}
                    onClick={() => setActiveId(cap.id)}
                    className={`relative text-left p-4 rounded-xl flex items-center gap-4 transition-all duration-300 border cursor-pointer select-none group ${
                      isActive 
                        ? 'bg-white/[0.04] border-white/20 shadow-[0_4px_20px_-10px_rgba(255,255,255,0.05)]' 
                        : 'bg-transparent border-white/[0.03] hover:bg-white/[0.01] hover:border-white/10'
                    }`}
                  >
                    {/* Active accent vertical line */}
                    <div 
                      className="absolute left-0 top-3 bottom-3 w-[2px] rounded-r transition-all duration-300"
                      style={{
                        background: isActive ? 'linear-gradient(to bottom, #E8372A, #FF5A4B)' : 'transparent',
                        boxShadow: isActive ? '0 0 8px rgba(232, 55, 42, 0.6)' : 'none'
                      }}
                    />

                    {/* Module Status Dot */}
                    <div 
                      className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                        isActive ? 'bg-[#E8372A] scale-110 animate-pulse' : 'bg-[var(--text-disabled)]'
                      }`}
                    />

                    {/* Icon */}
                    <Icon className={`h-4.5 w-4.5 transition-colors duration-300 ${isActive ? 'text-[#FF5A4B]' : 'text-[var(--text-tertiary)] group-hover:text-[var(--text-secondary)]'}`} />

                    {/* Text */}
                    <span className={`text-xs font-semibold tracking-tight transition-colors duration-300 ${isActive ? 'text-white' : 'text-[#888B96] group-hover:text-white'}`}>
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
          <div className="md:col-span-6 lg:col-span-5 flex flex-col justify-center border border-white/[0.04] bg-white/[0.01] rounded-2xl p-6 md:p-8 relative overflow-hidden backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-white/[0.04] pb-4 mb-6">
              <div className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E] animate-pulse" />
                <span className="text-[10px] font-mono tracking-widest text-[var(--text-tertiary)] uppercase">LIVE TOPOLOGY MAP</span>
              </div>
              <span className="text-[9px] font-mono text-[var(--text-disabled)]">NODE_STATUS: ACTIVE</span>
            </div>

            <div className="flex-grow flex items-center justify-center relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeId}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full flex items-center justify-center"
                >
                  <ActiveTopology />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT PANEL: Capability Intelligence Specs */}
          <div className="md:col-span-6 lg:col-span-4 flex flex-col justify-between border border-white/[0.04] bg-white/[0.01] rounded-2xl p-6 md:p-8 backdrop-blur-md">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6 flex-grow"
              >
                {/* Header */}
                <div className="space-y-1.5 border-b border-white/[0.04] pb-4">
                  <span className="text-[9px] font-mono text-[#E8372A] tracking-widest uppercase">MODULE SPECS</span>
                  <h3 className="text-xl font-bold tracking-tight text-white">{activeCapability.title}</h3>
                </div>

                {/* Specs Table */}
                <div className="space-y-4 text-xs font-mono">
                  
                  <div className="grid grid-cols-3 py-1.5 border-b border-white/[0.02]">
                    <span className="text-[var(--text-disabled)] uppercase">OVERVIEW</span>
                    <span className="col-span-2 text-[var(--text-secondary)] font-light leading-relaxed font-sans">{activeCapability.details.overview}</span>
                  </div>

                  <div className="grid grid-cols-3 py-1.5 border-b border-white/[0.02]">
                    <span className="text-[var(--text-disabled)] uppercase">VALUE PROP</span>
                    <span className="col-span-2 text-[var(--text-secondary)] font-light leading-relaxed font-sans">{activeCapability.details.businessValue}</span>
                  </div>

                  <div className="grid grid-cols-3 py-1.5 border-b border-white/[0.02]">
                    <span className="text-[var(--text-disabled)] uppercase">CLIENT PROFILE</span>
                    <span className="col-span-2 text-[var(--text-secondary)] font-sans font-light">{activeCapability.details.typicalClients}</span>
                  </div>

                  <div className="grid grid-cols-3 py-1.5 border-b border-white/[0.02]">
                    <span className="text-[var(--text-disabled)] uppercase">TIMELINE</span>
                    <span className="col-span-2 text-[#FF5A4B] font-semibold">{activeCapability.details.timeline}</span>
                  </div>

                  <div className="grid grid-cols-3 py-1.5 border-b border-white/[0.02]">
                    <span className="text-[var(--text-disabled)] uppercase">COMPLEXITY</span>
                    <span className="col-span-2 text-white">{activeCapability.details.complexity}</span>
                  </div>

                  <div className="grid grid-cols-3 py-1.5 border-b border-white/[0.02]">
                    <span className="text-[var(--text-disabled)] uppercase">ESTIMATED ROI</span>
                    <span className="col-span-2 text-white font-sans font-light">{activeCapability.details.roi}</span>
                  </div>

                  <div className="grid grid-cols-3 py-1.5 border-b border-white/[0.02]">
                    <span className="text-[var(--text-disabled)] uppercase">DEPLOY MODEL</span>
                    <span className="col-span-2 text-[var(--text-secondary)] font-sans font-light">{activeCapability.details.deployment}</span>
                  </div>

                  <div className="grid grid-cols-3 py-1.5 border-b border-white/[0.02]">
                    <span className="text-[var(--text-disabled)] uppercase">TARGET SEC</span>
                    <span className="col-span-2 text-[var(--text-secondary)] font-sans font-light">{activeCapability.details.industries.join(', ')}</span>
                  </div>
                </div>

                {/* Tech Chips */}
                <div className="space-y-3 pt-3">
                  <div className="text-[9px] font-mono tracking-widest text-[var(--text-disabled)] uppercase">STACK SPECIFICATION</div>
                  <div className="flex flex-wrap gap-2">
                    {activeCapability.details.techStack.map((tech) => (
                      <div 
                        key={tech.name}
                        className="group/chip relative px-3 py-1.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.03] hover:border-white/15 text-xs text-[var(--text-secondary)] hover:text-white font-sans transition-all duration-200 cursor-help"
                      >
                        {tech.name}

                        {/* Tech Chip Hover Tooltip */}
                        <div className="absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-48 bg-[#0D0F12] border border-white/10 rounded-lg p-3 shadow-xl opacity-0 scale-95 group-hover/chip:opacity-100 group-hover/chip:scale-100 transition-all duration-200 pointer-events-none z-50 text-left">
                          <div className="text-[9px] font-mono text-[#E8372A] uppercase mb-1">{tech.level}</div>
                          <div className="text-[10px] font-bold text-white mb-2">{tech.name}</div>
                          <div className="text-[9px] leading-relaxed text-[var(--text-tertiary)] font-light mb-1.5">Use Case: {tech.useCase}</div>
                          <div className="text-[8px] font-mono text-[var(--text-secondary)] border-t border-white/5 pt-1.5">Projects built: {tech.built}</div>
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
                className="w-full py-3 rounded-xl bg-white/[0.03] hover:bg-[#E8372A] border border-white/10 hover:border-[#E8372A] text-xs font-mono font-semibold tracking-wider uppercase text-white hover:shadow-[0_0_20px_rgba(232,55,42,0.3)] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 group"
              >
                <span>Initialize Module Inquiry</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

        </div>

        {/* 2. MOBILE VIEW (Accordion Layout with Sticky/Inline Visualization) */}
        <div className="block md:hidden space-y-4">
          <div className="text-[10px] font-mono tracking-widest text-[var(--text-disabled)] uppercase mb-4">SYSTEM MODULES</div>
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
                      <div className={`h-1.5 w-1.5 rounded-full ${isOpen ? 'bg-[#E8372A] animate-pulse' : 'bg-[var(--text-disabled)]'}`} />
                      <Icon className={`h-4.5 w-4.5 ${isOpen ? 'text-[#FF5A4B]' : 'text-[var(--text-tertiary)]'}`} />
                      <span className={`text-xs font-semibold tracking-tight ${isOpen ? 'text-white' : 'text-[#888B96]'}`}>
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
