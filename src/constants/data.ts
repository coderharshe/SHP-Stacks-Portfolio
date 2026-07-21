import { 
  Code, Layout, Rocket, Brain, Bot, Workflow, BarChart3, Database, Layers, 
  Terminal, ShieldCheck, Zap, Cloud, ShieldAlert, Wrench, Eye, RefreshCw, Cpu
} from 'lucide-react';

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  features: string[];
  iconName: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  overview: string;
  problem: string;
  solution: string;
  techStack: string[];
  features: string[];
  results: string[];
  deviceType: 'laptop' | 'phone' | 'tablet' | 'desktop';
  accentColor: string; // e.g., 'blue', 'purple', 'cyan'
}

export interface TimelineStep {
  step: number;
  title: string;
  duration: string;
  desc: string;
  details: string[];
}

export interface TeamMember {
  name: string;
  role: string;
  focus: string[];
  bio: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export const CONTACT_INFO = {
  email: 'shpstack@gmail.com',
  phone: '+919279381411',
  phoneFormatted: '+91 92793 81411',
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'custom-software',
    title: 'Custom Software',
    shortDesc: 'Engineered from the ground up. Tailored to your specific enterprise requirements and workflows.',
    longDesc: 'We design and build bespoke software solutions that streamline operations, eliminate redundancies, and give your business a unique competitive advantage. By starting with deep business process analysis, we ensure our custom applications solve actual bottlenecks rather than just adding codebase weight.',
    features: ['Modular Architecture', 'Scalable Codebases', 'Third-party Integrations', 'Domain Driven Design'],
    iconName: 'Code'
  },
  {
    id: 'web-development',
    title: 'Web Development',
    shortDesc: 'High-performance, beautifully responsive websites and core platforms with rich UX design.',
    longDesc: 'We construct modern websites and web applications utilizing the absolute best frontend standards. Using Next.js, static generation, server rendering, and lightweight styling frameworks, we deliver web spaces that load in milliseconds and keep users engaged through fluid, responsive interfaces.',
    features: ['Next.js App Router', 'React & TypeScript', 'SEO Optimization', 'Responsive & Fluid UI'],
    iconName: 'Layout'
  },
  {
    id: 'saas-development',
    title: 'SaaS Development',
    shortDesc: 'End-to-end production of multi-tenant cloud products. Multi-tenant database design and billing systems.',
    longDesc: 'Transform your SaaS vision into a scalable business. We engineer multi-tenant database schemas, handle safe user authentication, implement stripe subscription flows, configure webhooks, and construct telemetry pipelines so you can launch and scale your software product immediately.',
    features: ['Multi-tenant Architectures', 'Stripe & Billing Integrations', 'User Authentication Systems', 'Subscription & Usage Metrics'],
    iconName: 'Rocket'
  },
  {
    id: 'ai-applications',
    title: 'AI Applications',
    shortDesc: 'Integration of LLMs, vector search, embeddings, and customized cognitive workflows into your apps.',
    longDesc: 'Go beyond basic chat boxes. We embed deep intelligence into your applications by deploying semantic search engines, contextual recommendation engines, document parser models, and custom RAG (Retrieval-Augmented Generation) setups connected to your databases.',
    features: ['Contextual RAG Pipelines', 'Vector Databases (Pgvector/Pinecone)', 'Embeddings & Token Tuning', 'Structured JSON outputs'],
    iconName: 'Brain'
  },
  {
    id: 'ai-agents',
    title: 'AI Agents',
    shortDesc: 'Autonomous agentic loops designed to execute complex multi-step digital workflows.',
    longDesc: 'We develop intelligent agents that can reason, choose actions, use tools (APIs, databases), and collaborate. These autonomous agents act as virtual teammates to handle data entry, generate reports, monitor channels, and run background loops with minimal human supervision.',
    features: ['Autonomous Tool Use', 'Error Recovery Loops', 'Interactive Agentic Pipelines', 'Agentic Workspace Platforms'],
    iconName: 'Bot'
  },
  {
    id: 'automation',
    title: 'Automation Systems',
    shortDesc: 'Visual and code-based business workflows that connect your disparate software systems.',
    longDesc: 'Connect all your sales, marketing, support, and financial databases. Using self-hosted automation servers like n8n or custom event-driven Node.js runtimes, we create workflows that run silently in the background, eliminating hundreds of hours of manual copy-paste work.',
    features: ['n8n Self-hosted Pipelines', 'Event-Driven Architectures', 'Error Alerts & Monitoring', 'Database Synchronizations'],
    iconName: 'Workflow'
  },
  {
    id: 'erp-systems',
    title: 'ERP Systems',
    shortDesc: 'Custom enterprise resource planning platforms to manage your entire business lifecycle.',
    longDesc: 'Manage sales pipelines, logistics, HR, operations, and financial records in one unified interface. Our custom ERPs are modular, allowing you to add features organically as your operations expand, avoiding the bloat and price tags of legacy vendors.',
    features: ['Unified Master Ledger', 'Multi-role Authorization', 'Audit trail records', 'Financial reports & Ledger'],
    iconName: 'BarChart3'
  },
  {
    id: 'warehouse-management',
    title: 'Warehouse Systems (WMS)',
    shortDesc: 'Real-time stock tracking, automated putaway, picking paths, and barcode logistics.',
    longDesc: 'Optimize your inventory layout and physical operations. We design custom WMS systems that guide employees on the fastest picking routes, suggest optimal storage locations based on velocity, and integrate directly with warehouse scanning devices.',
    features: ['Putaway & Picking Algorithms', 'Stock Movement History', 'Scanner & Mobile Adaptability', 'Real-time Stock Audits'],
    iconName: 'Database'
  },
  {
    id: 'inventory-systems',
    title: 'Inventory Systems',
    shortDesc: 'Track raw materials, assemblies, and finished products across multiple channels.',
    longDesc: 'Prevent stockouts and minimize carrying costs. Our inventory architectures track serial numbers, lots, shelf-life, and automatically issue purchase recommendations when stock levels dip below dynamically calculated reorder thresholds.',
    features: ['Low-Stock Auto Alerts', 'Multi-warehouse Tracking', 'Lot & Batch Management', 'SKU Generation & Management'],
    iconName: 'Layers'
  },
  {
    id: 'dashboard-development',
    title: 'Dashboard Development',
    shortDesc: 'Stunning data visualizations, charts, and metrics pipelines built to monitor company health.',
    longDesc: 'Raw data is useless without clarity. We build lightning-fast web dashboards that stream live metrics, render interactive SVG charts, generate PDF summaries, and provide executive-level analytics in highly responsive, visually satisfying panels.',
    features: ['Interactive Chart Engine', 'Real-time WebSockets', 'Custom Filters & Metrics', 'Data Exporting (PDF/CSV)'],
    iconName: 'BarChart3'
  },
  {
    id: 'admin-panels',
    title: 'Admin Panels',
    shortDesc: 'Robust interior tools that give your support and ops teams control over application data.',
    longDesc: 'Keep your engineering team focused on building features. We create secondary, highly secure administrator interfaces that empower your account managers, support agents, and billing departments to manage data safely with precise activity logging.',
    features: ['Granular RBAC Policies', 'Full CRUD Operations', 'User Activity Auditing', 'Safe DB Queries UI'],
    iconName: 'Terminal'
  },
  {
    id: 'api-development',
    title: 'API Development',
    shortDesc: 'High-throughput, clean, self-documenting APIs built for web, mobile, or public consumption.',
    longDesc: 'We construct secure, RESTful and GraphQL endpoints optimized for performance under load. With comprehensive OpenAPI specification files, JWT authorization guards, and strict input validation layers, our APIs serve as a bulletproof layer for your applications.',
    features: ['OpenAPI / Swagger Docs', 'Rate Limiting & Safety Guards', 'JWT & API Key Verification', 'Low Latency Queries'],
    iconName: 'Zap'
  },
  {
    id: 'cloud-deployment',
    title: 'Cloud Deployment',
    shortDesc: 'Scalable containerization and serverless infrastructures deployed on AWS, Vercel, or Supabase.',
    longDesc: 'Ensure your app scales to millions without collapsing. We leverage Docker containerization, configure Infrastructure as Code (IaC), establish serverless edge instances, set up Cloudflare caching policies, and run CI/CD deployment runners for error-free releases.',
    features: ['Docker Containerization', 'Serverless Edge Functions', 'CI/CD Pipelines (GitHub Actions)', 'High-availability Scaling'],
    iconName: 'Cloud'
  },
  {
    id: 'performance-optimization',
    title: 'Performance Tuning',
    shortDesc: 'Optimization of slow databases, page load bottlenecks, and inefficient code execution.',
    longDesc: 'A 1-second delay in page load can cost thousands in revenue. We audit your application, index sluggish database schemas, eliminate redundant React rerenders, restructure heavy JavaScript bundles, and configure edge caching to make your page load instantaneously.',
    features: ['DB Indexing & Query Tuning', 'Bundle Size Minimization', 'Edge Caching Strategies', 'Core Web Vitals Boost'],
    iconName: 'Zap'
  },
  {
    id: 'maintenance-support',
    title: 'Maintenance & Support',
    shortDesc: 'SLA-backed systems monitoring, regular security patching, and core package upgrades.',
    longDesc: 'Software is a living system. We provide monthly maintenance arrangements to keep your server runtimes updated, patch security vulnerabilities, back up databases, and monitor logs to intercept and resolve server anomalies before your customers encounter them.',
    features: ['24/7 Error Logging & Alerting', 'Weekly Database Backups', 'Framework Security Patches', 'Dedicated Developer Hours'],
    iconName: 'Wrench'
  }
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'face-recognition-photo',
    title: 'Face Recognition Photo Hub',
    category: 'Consumer SaaS',
    subtitle: 'Intelligent event photo delivery and classification',
    overview: 'A premium, high-scale platform designed for event organizers and professional photographers. It processes thousands of high-res photos, groups them by face embeddings, and delivers them instantly to attendees via self-lookup matching.',
    problem: 'Event organizers struggled to deliver event photos to thousands of attendees, who had to scroll through massive galleries of unorganized folders to find themselves.',
    solution: 'We engineered an event portal with an AI backend. Users upload a single selfie, and our vector-embedding engine scans millions of event photos, finding matching faces instantly. The frontend leverages Next.js and CDN edge caching to serve heavy media assets seamlessly.',
    techStack: ['Next.js', 'Python (PyTorch)', 'Pgvector', 'AWS S3', 'Cloudflare CDN', 'TypeScript'],
    features: [
      'Instant facial embedding matching using Pgvector index queries',
      'Automated batch watermarking and resizing at cloud uploads',
      'Secure attendee portal with face validation safeguards',
      'Stripe integration for high-res photo downloads and prints'
    ],
    results: [
      'Attendees find their images in under 400 milliseconds',
      'Over 500,000 photos processed and served across various conferences',
      'Generated a 3x increase in digital photo purchases for organizers'
    ],
    deviceType: 'tablet',
    accentColor: 'cyan'
  },
  {
    id: 'oceon-wms',
    title: 'Warehouse Management System',
    category: 'Enterprise Logistics',
    subtitle: 'High-performance logistics management platform',
    overview: 'A next-generation warehouse management system designed to coordinate complex stock movements, putaway patterns, and picking paths in real-time. It connects front-line handheld scanners with a centralized command center to maximize logistics throughput.',
    problem: 'The client struggled with chaotic storage strategies, slow picking cycles, and manual pen-and-paper audit trails, which resulted in a 4.2% error rate in order fulfillment and high worker fatigue.',
    solution: 'We engineered a React and Go-backed web dashboard coupled with a lightweight mobile application for scanner integrations. We implemented automated storage routing algorithms that recommend slotting coordinates based on product velocity and size.',
    techStack: ['Next.js', 'Go (Golang)', 'PostgreSQL', 'Docker', 'WebSockets', 'Tailwind CSS'],
    features: [
      'Automated putaway algorithms optimizing rack utilization',
      'Intelligent picking routes mapped via shortest-path algorithms',
      'Real-time WebSocket alerts showing ongoing movements',
      'Offline-first mobile client for continuous barcode scanning'
    ],
    results: [
      '35% reduction in average order fulfillment cycles',
      '99.9% inventory accuracy achieved within 60 days of launch',
      'Fulfillment error rate dropped from 4.2% to less than 0.1%'
    ],
    deviceType: 'laptop',
    accentColor: 'blue'
  },
  {
    id: 'ai-interview',
    title: 'AI Interview Platform',
    category: 'AI SaaS & HR Tech',
    subtitle: 'AI-powered platform for intelligent candidate screening',
    overview: 'AI Interview is a conversational AI-driven hiring platform that automates the initial screening and technical evaluation of job candidates. Recruiters define role requirements and the platform autonomously conducts structured interviews, scores responses using LLM reasoning, and surfaces ranked candidates with detailed insight reports.',
    problem: 'Recruitment teams were overwhelmed by high applicant volumes, spending 15–20 hours per week scheduling and conducting repetitive first-round interviews with unqualified candidates — delaying hiring cycles by weeks.',
    solution: 'We built an AI-native SaaS platform powered by an OpenAI-backed conversational agent that dynamically adapts questions based on candidate responses. Recruiters receive structured scorecards, sentiment analysis, and confidence scoring for every candidate, eliminating the need for manual first-round interviews.',
    techStack: ['Next.js', 'Python (FastAPI)', 'OpenAI API', 'LangChain', 'PostgreSQL', 'Supabase Auth', 'Pgvector', 'Tailwind CSS'],
    features: [
      'Conversational AI agent conducting dynamic, adaptive interviews',
      'Technical code assessment with integrated live IDE and execution',
      'Sentiment analysis and confidence scoring per candidate response',
      'Automated shortlist generation with ranked candidate scorecards'
    ],
    results: [
      'Reduced recruiter time-per-hire by 68% within the first month',
      'Platform screened over 2,000 candidates with zero manual first-round interviews',
      'Hiring decision accuracy improved by 40% using structured AI scorecards'
    ],
    deviceType: 'laptop',
    accentColor: 'cyan'
  },
  {
    id: 'ai-rescue-bot',
    title: 'AI Rescue Bot System',
    category: 'Robotics & AI',
    subtitle: 'Multi-robot AI system for disaster survivor detection',
    overview: 'A multi-robot emergency response system combining a drone, a ground crawling rover, and a robotic snake to autonomously locate and pinpoint survivors in disaster zones such as flood-affected areas and earthquake rubble. The system uses AI-powered vision, thermal analysis, and collaborative GPS triangulation to deliver precise survivor coordinates to rescue teams in real time.',
    problem: 'In disaster scenarios like earthquakes and floods, rescue teams face extreme danger and significant delays navigating collapsed structures and debris. Manual search operations miss survivors buried in narrow cavities, and poor coordinates waste critical response time for first responders.',
    solution: 'We engineered a three-robot collaborative system: the drone provides aerial bird\'s-eye thermal scanning to identify heat signatures, the crawling rover navigates open debris fields collecting visual data, and the robotic snake infiltrates narrow rubble cavities unreachable by humans. All three robots feed into a central AI command dashboard that fuses their data streams, detects survivors using a TensorFlow vision model, and outputs pinpoint GPS coordinates for rescue teams.',
    techStack: ['Python', 'ROS 2', 'TensorFlow', 'OpenCV', 'Drone SDK', 'FastAPI', 'WebSockets', 'React'],
    features: [
      'Drone aerial surveillance with real-time AI human heat-signature detection',
      'Robotic snake for narrow-space infiltration and precise GPS coordinate locking',
      'Crawling rover for wide-area ground coverage with obstacle avoidance',
      'Fused AI command dashboard streaming all three robot feeds simultaneously'
    ],
    results: [
      'Detected survivors in cavities as narrow as 18cm — inaccessible to humans',
      'GPS coordinate accuracy within 1.5 meters across field test simulations',
      'Reduced simulated search time by 62% compared to manual rescue protocols'
    ],
    deviceType: 'desktop',
    accentColor: 'purple'
  },
  {
    id: 'business-portfolio-websites',
    title: 'Premium Brand Portfolios',
    category: 'Web Design & Interactive',

    subtitle: 'Immersive digital experiences for global agencies',
    overview: 'A series of high-end interactive websites built for creative agencies and venture funds. These platforms use advanced layout engineering, dynamic webGL elements, and sleek transitions to deliver an unforgettable digital footprint.',
    problem: 'Typical company websites look templated, fail to communicate prestige, and have sluggish loading speeds due to heavy design assets and unoptimized animations.',
    solution: 'We established a standardized boilerplate using Next.js App Router, Tailwind CSS, and Framer Motion. We constructed custom layout mechanics that optimize asset loading, load images progressively, and ensure fluid scroll animations at 60fps on mobile devices.',
    techStack: ['Next.js', 'Framer Motion', 'Tailwind CSS', 'Vercel', 'PostCSS', 'TypeScript'],
    features: [
      'Pre-rendered static sites delivering 100/100 Lighthouse scores',
      'Custom scroll progress bars, command controls, and active states',
      'Subtle page entry and element exit Framer transitions',
      'Aria-compliant navigation preserving absolute accessibility'
    ],
    results: [
      '100% Core Web Vitals score across client portfolios',
      'Average session duration increased by 45% due to immersive UX',
      'Zero maintenance downtime achieved via headless static generation'
    ],
    deviceType: 'desktop',
    accentColor: 'blue'
  },
  {
    id: 'ai-barcode-intelligence',
    title: 'AI Barcode Intelligence System',
    category: 'AI & Computer Vision',
    subtitle: 'Automated document parsing and stock identification',
    overview: 'A deep-learning scanning framework that converts standard mobile camera streams into powerful logistical data parsers. It reads multiple codes simultaneously, extracts text labels, and classifies packages automatically.',
    problem: 'Manually auditing shipping manifests, physical labels, and mixed barcodes was creating major bottlenecks at receiving docks. Workers had to align and scan each package individually, averaging 18 seconds per unit.',
    solution: 'We constructed an on-device computer vision pipeline using WebGL and TensorFlow.js, capable of recognizing and decoding up to 15 barcodes in a single camera frame. The system extracts shipping labels and cross-references them against incoming orders using NLP context matching.',
    techStack: ['React Native', 'TensorFlow.js', 'Python (FastAPI)', 'OpenCV', 'AWS ECS', 'Supabase'],
    features: [
      'Multi-barcode detection scanning (UPC, QR, DataMatrix)',
      'OCR engine identifying text blocks (weight, lot numbers, addresses)',
      'Fuzzy-matching NLP matching raw scans to purchase orders',
      'Real-time cloud database synching under 100ms'
    ],
    results: [
      'Dock check-in times reduced from 18 seconds to 1.8 seconds per package',
      '100% on-device processing keeping scanning operational offline',
      'Saved over 120 man-hours per week in manual data entry workflows'
    ],
    deviceType: 'phone',
    accentColor: 'purple'
  },
  {
    id: 'ai-automation-platform',
    title: 'Autonomous AI Operations Engine',
    category: 'AI Agents & Automation',
    subtitle: 'Zero-touch workflows for operations teams',
    overview: 'An AI-driven operational hub that monitors corporate emails, customer service tickets, and messaging channels to draft replies, update CRM databases, and schedule escalations autonomously.',
    problem: 'Operations managers were drowning in repetitive inquiries, spending half of their workday copying data from invoices, drafting routine client replies, and updating sales boards.',
    solution: 'We built a centralized self-hosted n8n instance and coupled it with LangChain agent loops. The platform digests incoming requests, checks context inside internal databases using vector matching, executes safety filters, and outputs drafts or actions for employee approval.',
    techStack: ['n8n', 'Node.js', 'LangChain', 'OpenAI API', 'Supabase Auth', 'Fastify'],
    features: [
      'Context-aware email and ticket classification using LLMs',
      'Interactive approval dashboard where employees verify drafts',
      'Secure database read-write integrations via localized APIs',
      'Live audit trails detailing exact reasoning chains'
    ],
    results: [
      '70% of routine operations tickets answered or resolved automatically',
      'Average response time plummeted from 4.5 hours to 3 minutes',
      '100% compliance record maintained via human-in-the-loop controls'
    ],
    deviceType: 'laptop',
    accentColor: 'purple'
  },
  {
    id: 'custom-erp-dashboard',
    title: 'Helix Custom Enterprise ERP',
    category: 'Business Operations',
    subtitle: 'Unified operational center for multi-location firms',
    overview: 'A centralized ERP dashboard built for a manufacturing firm, coordinating supply orders, inventory, workforce schedules, and invoicing in real-time across four national warehouses.',
    problem: 'Siloed data in legacy desktop programs made tracking manufacturing orders and supply levels impossible, causing frequent raw-material shortages and delayed client billings.',
    solution: 'We designed a custom web application featuring secure data pipelines, role-based dashboards, and automated ledger entries. We constructed inventory panels that pull direct sensor data and automatically create purchase invoices.',
    techStack: ['Next.js', 'TypeScript', 'Node.js Express', 'Prisma ORM', 'PostgreSQL', 'ChartJS'],
    features: [
      'Interactive multi-warehouse analytics and yield tracking',
      'Live purchase order generation with automated approvals routing',
      'Deep user logs capturing every ledger change and stock movement',
      'Financial charts analyzing operational overhead and profit margins'
    ],
    results: [
      'Saved $18,000 monthly in legacy software subscription overhead',
      'Completely eliminated raw material supply shortages via auto-reorders',
      'Financial book closing cycles shortened from 12 days to 1 day'
    ],
    deviceType: 'desktop',
    accentColor: 'cyan'
  },
  {
    id: 'inventory-mgmt-system',
    title: 'Apex Inventory Dashboard',
    category: 'Logistics Tech',
    subtitle: 'Dynamic multi-channel inventory control system',
    overview: 'A secure inventory system that synchronizes physical warehouse holdings with online Shopify, Amazon, and WooCommerce marketplaces, keeping counts accurate to prevent overselling.',
    problem: 'Overselling products on Amazon due to lagged stock synchronization resulted in account suspensions and bad consumer reviews.',
    solution: 'We designed a synchronization hub running on low-latency cloud infrastructure. When a purchase occurs on any channel or stock moves in the warehouse, the hub updates all external marketplaces simultaneously within 5 seconds.',
    techStack: ['React', 'TypeScript', 'Node.js', 'Redis Caching', 'PostgreSQL', 'Tailwind CSS'],
    features: [
      'Multi-channel webhooks processing stock updates under 200ms',
      'Safety buffer stock configurations preventing accidental oversells',
      'Detailed ledger tracking manual overrides and returns',
      'CSV import-export modules with fuzzy SKU mapping algorithms'
    ],
    results: [
      'Overselling cases reduced to absolute zero',
      'Marketplace seller account health score restored to Excellent',
      'Sync engine handles over 50,000 daily changes without delays'
    ],
    deviceType: 'tablet',
    accentColor: 'blue'
  },
  {
    id: 'future-saas-products',
    title: 'Internal SaaS Labs',
    category: 'Product Incubator',
    subtitle: 'Incubating the next generation of cloud tools',
    overview: 'Our internal R&D unit where we build, launch, and monetize micro-SaaS tools. These projects serve as sandboxes to test cutting-edge packages and database configurations before deploying them to clients.',
    problem: 'Adopting unvetted framework releases or backend tools on client projects introduces technical risks and unpredictable support timelines.',
    solution: 'We dedicate 15% of our resources to developing in-house products. This tests new paradigms like React Server Components, vector embedding pipelines, and serverless edge databases on real-world web traffic.',
    techStack: ['Next.js', 'Supabase', 'Clerk Auth', 'Upstash Redis', 'Stripe API', 'Tailwind CSS'],
    features: [
      'Rapid prototype boilerplate models that deploy to production in days',
      'Shared components library utilizing highly accessible HTML structures',
      'Telemetry pipelines measuring bundle loads and server request costs',
      'Standardized automated testing suites for security audits'
    ],
    results: [
      'Developed and launched 3 internal SaaS tools serving active users',
      'Provides clients with field-tested tech stack recommendations',
      'Boosted overall engineering code quality and delivery speed'
    ],
    deviceType: 'phone',
    accentColor: 'purple'
  }
];

export const TIMELINE_PROCESS: TimelineStep[] = [
  {
    step: 1,
    title: 'Discovery & Scoping',
    duration: 'Week 1',
    desc: 'Understanding your business operations, goals, and technical challenges.',
    details: [
      'Discovery sessions to map requirements and system constraints',
      'Analyzing current user workflows and existing infrastructure',
      'Drafting the technical brief and scoping parameters',
      'Defining KPI success metrics and sprint deliverables'
    ]
  },
  {
    step: 2,
    title: 'Architecture & Planning',
    duration: 'Week 2',
    desc: 'Engineering system architecture, database schemas, and choosing tech stacks.',
    details: [
      'Modeling database schemas and API route mappings',
      'Selecting optimal frameworks, hosting tiers, and database infrastructure',
      'Establishing authorization layers, security parameters, and compliance controls',
      'Setting up repository structures and CI/CD pipelines'
    ]
  },
  {
    step: 3,
    title: 'Rapid UI/UX Design',
    duration: 'Week 3',
    desc: 'Crafting high-fidelity interactive mockups and component design tokens.',
    details: [
      'Constructing responsive layout wireframes showing key user flows',
      'Designing modern, high-end interfaces aligned with your brand persona',
      'Building interactive prototypes in Figma for fast client feedback',
      'Assembling component libraries (colors, typography, spacing)'
    ]
  },
  {
    step: 4,
    title: 'Sprint Development',
    duration: 'Weeks 4-5',
    desc: 'High-velocity production coding, backend business logic, and API integrations.',
    details: [
      'Building modular components using strict TypeScript standards',
      'Implementing serverless endpoints and real-time WebSocket pipelines',
      'Connecting database schemas with optimized query indexing',
      'Integrating payment gateways, auth systems, or AI model endpoints'
    ]
  },
  {
    step: 5,
    title: 'QA & Security Testing',
    duration: 'Week 5',
    desc: 'Rigorous automated and manual QA checking security, speed, and stability.',
    details: [
      'Executing automated unit and end-to-end integration tests',
      'Conducting security audits (sanitization, permission enforcement)',
      'Optimizing responsive rendering across mobile and desktop engines',
      'Running load tests to guarantee ultra-low latency under load'
    ]
  },
  {
    step: 6,
    title: 'Deployment & Handover',
    duration: 'Week 6',
    desc: 'Deploying to live production servers with zero downtime and complete handover.',
    details: [
      'Configuring serverless or containerized edge infrastructure (Vercel, AWS)',
      'Migrating live production database schemas and environment secrets',
      'Configuring custom domain SSL, DNS, and CDN caching layers',
      'Delivering comprehensive code docs, API specs, and post-launch support'
    ]
  },
  {
    step: 7,
    title: 'Support & Scaling',
    duration: 'Ongoing',
    desc: 'Monitoring production health, performance tuning, and continuous feature expansion.',
    details: [
      'Setting up real-time error tracking and uptime monitoring (Sentry)',
      'Applying security patches and framework updates',
      'Conducting monthly database indexing and performance audits',
      'Adding incremental features as your business scales'
    ]
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Harsh Agarwal',
    role: 'Co-Founder',
    focus: ['Product Strategy', 'Full Stack Development', 'AI Systems'],
    bio: 'Harsh drives the technical direction and product vision at SHP Stacks. He specializes in designing scalable databases, custom vector search pipelines, and aligning software design directly with business goals.'
  },
  {
    name: 'Shashank',
    role: 'Co-Founder',
    focus: ['Frontend Engineering', 'Backend Development', 'System Design'],
    bio: 'Shashank focuses on building high-performance, accessible, and pixel-perfect web applications. He leads frontend architecture design, micro-animation engineering, and structures clean API layers.'
  },
  {
    name: 'Prasiddh',
    role: 'Co-Founder',
    focus: ['Software Engineering', 'Architecture', 'Deployment'],
    bio: 'Prasiddh oversees infrastructure security and cloud deployment pipelines at SHP Stacks. He specializes in Docker containerization, serverless architectures, CI/CD automation, and load testing.'
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    question: 'How long does a typical software project take?',
    answer: 'We build and deploy full-stack production systems in 5 to 6 weeks. Our high-velocity 6-stage sprint lifecycle ensures clear weekly deliverables, staging reviews, and rapid execution without compromising security or code quality.'
  },
  {
    question: 'How do you structure project pricing?',
    answer: 'We quote projects on a fixed-scope basis. After defining the detailed requirements in the discovery phase, we present a single comprehensive estimate mapping out all milestones. This prevents surprise billing. For long-term development needs, we offer dedicated monthly developer support structures.'
  },
  {
    question: 'Which technologies do you build in?',
    answer: 'We utilize industry-standard, modern technologies that offer long-term stability and scaling capacity. Our standard stack consists of Next.js, React, TypeScript, and Tailwind CSS for frontends, backed by Node.js or Go for API runtimes, PostgreSQL or Supabase for databases, and AWS or Vercel for hosting.'
  },
  {
    question: 'What does post-launch maintenance include?',
    answer: 'Our maintenance packages cover 24/7 uptime monitoring, weekly secure database backups, serverless infrastructure scaling adjustments, framework security upgrades, and a dedicated pool of monthly development hours to introduce minor feature changes and visual enhancements.'
  },
  {
    question: 'Can you integrate AI and automation into our existing databases?',
    answer: 'Yes. We routinely connect custom LLM endpoints, semantic databases (Pgvector), and workflow servers (n8n) into legacy databases (MySQL, Oracle, SQL Server) without disrupting your ongoing business operations. This adds intelligent automations while preserving your established software.'
  },
  {
    question: 'Who owns the intellectual property and code?',
    answer: 'You do. Upon completing project milestones and final handoff, 100% of the repository ownership, database structures, documentation files, and intellectual properties are transferred directly to your company. We host your code in private Git repositories owned by you.'
  },
  {
    question: 'How do we communicate throughout development?',
    answer: 'We believe in absolute transparency. We set up a private Slack channel for quick daily communications, deliver weekly video walkthroughs demonstrating current build progress, and establish milestone review check-ins where you can interact with staging deployments.'
  }
];

export const TECH_CATEGORIES = [
  {
    name: 'Frontend',
    techs: [
      { name: 'Next.js', tag: 'Framework' },
      { name: 'React', tag: 'UI Library' },
      { name: 'TypeScript', tag: 'Core Lang' },
      { name: 'Tailwind CSS', tag: 'Styling' }
    ]
  },
  {
    name: 'Backend & DB',
    techs: [
      { name: 'Node.js', tag: 'Runtime' },
      { name: 'Go (Golang)', tag: 'API Engine' },
      { name: 'PostgreSQL', tag: 'Database' },
      { name: 'Supabase', tag: 'Auth & DB' }
    ]
  },
  {
    name: 'Cloud & DevOps',
    techs: [
      { name: 'Vercel', tag: 'Edge Hosting' },
      { name: 'AWS', tag: 'Cloud Compute' },
      { name: 'Docker', tag: 'Container' },
      { name: 'Cloudflare', tag: 'CDN & DNS' }
    ]
  },
  {
    name: 'AI & Automation',
    techs: [
      { name: 'OpenAI API', tag: 'LLM Reasoning' },
      { name: 'Claude API', tag: 'NLP Analysis' },
      { name: 'n8n', tag: 'Workflows' },
      { name: 'LangChain', tag: 'AI Agents' }
    ]
  }
];
