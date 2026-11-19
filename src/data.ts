const baseUrl = import.meta.env.BASE_URL;

// Content mirrors resume_gary.pdf (November 2026). Keep the two in sync.

export const links = {
  email: 'garysamuel16@gmail.com',
  github: 'https://github.com/garybs16',
  linkedin: 'https://www.linkedin.com/in/gary-samuel-3954261b2/',
  resume: `${baseUrl}resume_gary.pdf`,
  source: 'https://github.com/garybs16/Gary-s-Portfolio',
  cosmosim: 'https://github.com/garybs16/cosmosim-lambdaCDM',
};

export const photo = `${baseUrl}profile.jpg`;

export const navigation: [string, string][] = [
  ['Work', 'work'],
  ['Experience', 'experience'],
  ['About', 'about'],
  ['Contact', 'contact'],
];

export type Stat = { value: number; decimals?: number; suffix?: string; label: string };

export const stats: Stat[] = [
  { value: 95, suffix: '%+', label: 'LLM agent task success on UnstableML’s camera and scene evals' },
  { value: 80, suffix: '%', label: 'fewer order-fulfillment errors from validated webhook services' },
  { value: 100, suffix: 'M+', label: 'single-cell gene-expression profiles through reproducible pipelines' },
  { value: 10000, suffix: '+', label: 'HackHarvard 2025 applicants I was selected from' },
];

export const featured = {
  name: 'First Step Healthcare Academy',
  role: 'Technical co-founder & full-stack engineer',
  href: 'https://firststepha.com/',
  domain: 'firststepha.com',
  image: `${baseUrl}first-step-home.png`,
  summary:
    'The production platform for a CNA training academy in Orange, California. I architected and shipped it, and I own it end to end: requirements, API design, launch, and ongoing support.',
  points: [
    'Admissions, cohort enrollment, waitlists and inquiries',
    'Online payments and REST APIs',
    'Authenticated admin tools, data exports and automated backups',
  ],
  stack: ['React', 'Node.js', 'Express', 'SQLite', 'Stripe'],
};

export type Project = {
  name: string;
  context: string;
  href: string;
  summary: string;
  stack: string[];
  visual: 'bridge' | 'quadtree' | 'clusters' | 'spatial';
  status?: string;
};

export const projects: Project[] = [
  {
    name: 'BridgeWatch',
    context: 'Sponsored by SonarX · Team lead',
    status: 'In progress',
    href: 'https://github.com/garybs16/CPSC490-G16-Neuroprosthetic',
    summary:
      'Real-time detection of cross-chain bridge exploits. It learns baseline hourly withdrawal volumes from bridge vaults and flags exploit-scale spikes. I lead a four-engineer team; we validate by replaying real exploits like the Orbit Chain hack and measuring false alarms on normal traffic.',
    stack: ['Python', 'Anomaly detection', 'Blockchain data'],
    visual: 'bridge',
  },
  {
    name: 'Single-cell gene expression pipeline',
    context: 'Research computing · UCLA',
    href: 'https://github.com/garybs16/UCLA-gene-expression-analysis',
    summary:
      'Reproducible Python pipelines, built with UCLA researchers, for cleaning, normalization, dimensionality reduction and similarity analysis across 100M+ single-cell gene-expression profiles from Tahoe-100M.',
    stack: ['Python', 'Pandas', 'NumPy', 'scikit-learn'],
    visual: 'clusters',
  },
  {
    name: 'Vision Pro reading assistant',
    context: 'HackHarvard 2025 · Selected from 10,000+',
    href: 'https://github.com/garybs16/Hackharvard-2025',
    summary:
      'A Vision Pro app that renders interactive 3D text in mixed reality. It anchors parsed PDFs in space, summarizes with Gemini, narrates with ElevenLabs in under 150 ms, and adapts highlighting to where you look.',
    stack: ['Swift', 'SwiftUI', 'RealityKit'],
    visual: 'spatial',
  },
  {
    name: 'CosmoSim',
    context: 'Scientific computing',
    href: 'https://github.com/garybs16/cosmosim-lambdaCDM',
    summary:
      'An N-body simulator for a Lambda-CDM universe: Barnes-Hut tree gravity in comoving coordinates, Hubble expansion, OpenMP parallelism, and snapshots you can resume from.',
    stack: ['C++20', 'OpenMP', 'Barnes-Hut'],
    visual: 'quadtree',
  },
];

export type Role = {
  period: string;
  role: string;
  company: string;
  location: string;
  current?: boolean;
  visual?: 'agent';
  points: string[];
};

// Wrap a phrase in **double asterisks** to highlight it.
export const experience: Role[] = [
  {
    period: 'Apr 2026 – Present',
    role: 'Technical co-founder & full-stack engineer',
    company: 'First Step Healthcare Academy',
    location: 'Orange, CA',
    current: true,
    points: [
      'Architected and shipped a **production full-stack platform** powering admissions, cohort enrollment, waitlists, inquiries and payments, owning requirements, API design, launch and ongoing support.',
      'Designed REST APIs and authenticated admin tooling for student tracking, data exports and automated backups.',
      'Owned production reliability, writing **runbooks** that let non-technical staff operate and recover the system.',
    ],
  },
  {
    period: 'Nov 2025 – Aug 2026',
    role: 'Software engineer intern',
    company: 'UnstableML',
    location: 'San Jose, CA',
    visual: 'agent',
    points: [
      'Engineered **production LLM agent orchestration** for real-time 3D scene and AI video generation in Python with LangGraph, LangChain, and the Claude and OpenAI APIs.',
      'Turned ambiguous prompts into deterministic function calls controlling object motion, camera paths and scenes.',
      'Built an automated evaluation harness of repeatable prompts and test cases, reaching **95%+ task success** across orbit, follow, dolly, pan and tracking-shot workflows.',
    ],
  },
  {
    period: 'Feb – Aug 2025',
    role: 'Full-stack developer intern',
    company: 'Bimmer Plug',
    location: 'Irvine, CA',
    points: [
      'Cut order-fulfillment errors **80%** with event-driven Node.js webhook services that validate SKU, inventory and product data via the Shopify Admin API.',
      'Implemented Storefront API workflows and debugged production data-sync failures, keeping live inventory and personalized collections accurate.',
      'Improved Core Web Vitals **30–45%** on SEO-critical pages by optimizing JavaScript, Liquid and rendering.',
    ],
  },
  {
    period: 'Mar 2023 – Jun 2024',
    role: 'Frontend developer (part-time)',
    company: 'Mission Kaizen',
    location: 'San Jose, CA',
    points: [
      'Increased program engagement **45%** by launching a responsive, redesigned website with user-focused navigation.',
      'Built reusable React and Wix/Velo components and registration flows so staff could publish updates independently.',
    ],
  },
];

export const facts: [string, string][] = [
  ['Based in', 'Orange County, California'],
  ['Studying', 'B.S. Computer Science, Data Science minor · Cal State Fullerton · May 2027'],
  ['Right now', 'Running the First Step platform and leading the BridgeWatch capstone'],
  ['Leadership', 'Selected judge & mentor at HackMIT, coaching teams on system design and debugging'],
  ['Focus', 'Full-stack products, LLM agents and data pipelines'],
  ['Looking for', 'Software engineering internships and new-grad roles'],
];

export const skills: [string, string[]][] = [
  ['Languages', ['Python', 'TypeScript', 'JavaScript', 'SQL', 'C++', 'Swift']],
  ['Frameworks & libraries', ['React', 'Next.js', 'Node.js', 'FastAPI', 'LangGraph', 'LangChain', 'Pandas', 'NumPy', 'scikit-learn']],
  ['AI / LLM', ['LLM agents', 'Function calling', 'Evaluation harnesses', 'Claude API', 'OpenAI API']],
  ['Tools & platforms', ['Git', 'Docker', 'AWS', 'CI/CD', 'Render', 'REST APIs', 'Webhooks', 'Shopify APIs']],
];
