import type { DiagramSpec } from './Diagram';
import { bridgeWatchArchitecture, firstStepArchitecture, unstableMlArchitecture } from './architecture';

const baseUrl = import.meta.env.BASE_URL;

/*
 * Content mirrors resume_gary.pdf (November 2026). Case-study details come
 * from the projects themselves: First Step's repository and deployment guide,
 * BridgeWatch's design document. BridgeWatch results and UnstableML internals
 * stay at the level of the resume: both come from non-public work.
 */

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

export const credentials = {
  builtAt: ['UnstableML', 'First Step Healthcare Academy', 'Bimmer Plug', 'Mission Kaizen'],
  recognition: [
    { name: 'HackHarvard 2025', detail: 'selected from 10,000+' },
    { name: 'HackMIT', detail: 'judge & mentor' },
    { name: 'SonarX', detail: 'sponsored capstone lead' },
  ],
};

export type Stat = { value: number; decimals?: number; suffix?: string; label: string };

export const stats: Stat[] = [
  { value: 95, suffix: '%+', label: 'LLM agent task success on UnstableML’s camera and scene evals' },
  { value: 80, suffix: '%', label: 'fewer order-fulfillment errors from validated webhook services' },
  { value: 45, suffix: '%', label: 'higher program engagement after the Mission Kaizen redesign' },
  { value: 100, suffix: 'M+', label: 'single-cell gene-expression profiles through reproducible pipelines' },
];

export type CaseStudy = {
  id: string;
  index: string;
  org: string;
  role: string;
  period: string;
  status?: { label: string; tone: 'live' | 'progress' };
  title: string;
  summary: string;
  metrics: { value: string; label: string }[];
  media: 'firststep' | 'agent' | 'bridge';
  diagram: DiagramSpec;
  diagramCaption: string;
  diagramNote?: string;
  problem: string;
  builtLabel: string;
  built: string[];
  /** Wrap a phrase in **double asterisks** to highlight it. */
  decisions: string[];
  roleNote?: string;
  stack: string[];
  links: { label: string; href: string }[];
};

export const firstStepShot = {
  href: 'https://firststepha.com/',
  domain: 'firststepha.com',
  image: `${baseUrl}first-step-home.webp`,
};

export const caseStudies: CaseStudy[] = [
  {
    id: 'first-step',
    index: '01',
    org: 'First Step Healthcare Academy',
    role: 'Technical co-founder & full-stack engineer',
    period: 'Apr 2026 – Present',
    status: { label: 'Live', tone: 'live' },
    title: 'Shipping and running the platform behind a healthcare academy',
    summary:
      'I architected, shipped and operate the production system that takes a student from finding a CNA program to a paid enrollment. I own it end to end: requirements, API design, launch and support.',
    metrics: [
      { value: 'Live', label: 'in production at firststepha.com' },
      { value: '7', label: 'automated gates before every deploy' },
      { value: '5', label: 'workflows: admissions, cohorts, waitlists, inquiries, payments' },
    ],
    media: 'firststep',
    diagram: firstStepArchitecture,
    diagramCaption: 'Production architecture',
    problem:
      'A CNA training academy needed students to find programs, enroll in cohorts with limited seats and pay online, while non-technical staff run enrollment and keep the system healthy without an engineer on call.',
    builtLabel: 'What I built',
    built: [
      'React and Vite site for programs, schedules, admissions and registration',
      'Express API with zod-validated routes for enrollment, inquiries, waitlists and payments',
      'Stripe Checkout for full tuition or weekly and biweekly payment plans',
      'Admin dashboard with TOTP MFA, CSRF protection, PBKDF2 password hashes and an audit log',
    ],
    decisions: [
      '**Payments confirm by signed webhook**, not the browser redirect, so a closed tab can’t lose an enrollment.',
      '**Seats are held during checkout** and released when the hold expires, so abandoned checkouts don’t lock up a cohort.',
      '**SQLite on persistent storage**, right-sized for one academy, with encrypted automated backups and a documented path to managed Postgres.',
      '**Every deploy passes 7 gates**: build, dependency audit, tests, content, readiness, API contract and production checks, then a live health check. Runbooks let staff recover without me.',
    ],
    stack: ['React', 'Vite', 'Node.js', 'Express', 'zod', 'SQLite', 'Stripe', 'GitHub Actions', 'AWS Lightsail', 'nginx'],
    links: [{ label: 'Visit firststepha.com', href: 'https://firststepha.com/' }],
  },
  {
    id: 'unstableml',
    index: '02',
    org: 'UnstableML',
    role: 'Software engineer intern',
    period: 'Nov 2025 – Aug 2026',
    title: 'Turning vague creative prompts into deterministic camera work',
    summary:
      'I engineered production LLM agent orchestration for real-time 3D scene and AI video generation, and built the evaluation harness that measured it at 95%+ task success.',
    metrics: [
      { value: '95%+', label: 'task success on the evaluation harness' },
      { value: '5', label: 'shot types: orbit, follow, dolly, pan, tracking' },
      { value: '2', label: 'model providers: Claude and OpenAI' },
    ],
    media: 'agent',
    diagram: unstableMlArchitecture,
    diagramCaption: 'Agent pipeline',
    diagramNote: 'Simplified; proprietary details left out.',
    problem:
      'People describe shots the way they talk: “orbit the car, then dolly in.” A real-time 3D and video pipeline needs exact, repeatable instructions for object motion, camera paths and scene setup.',
    builtLabel: 'What I built',
    built: [
      'Agent orchestration in Python with LangGraph and LangChain',
      'Integrations with the Claude and OpenAI APIs',
      'A function-calling layer that resolves ambiguous requests into deterministic calls',
      'An automated evaluation harness of repeatable prompts and test cases',
    ],
    decisions: [
      '**The model picks intent; code executes motion.** Deterministic function calls keep camera paths and object motion predictable and testable.',
      '**Measured, not eyeballed**: a fixed suite of prompts and test cases across orbit, follow, dolly, pan and tracking shots, scored automatically, reaching **95%+ task success**.',
    ],
    stack: ['Python', 'LangGraph', 'LangChain', 'Claude API', 'OpenAI API', 'Function calling', 'Evaluation harnesses'],
    links: [],
  },
  {
    id: 'bridgewatch',
    index: '03',
    org: 'BridgeWatch · SonarX-sponsored capstone',
    role: 'Team lead, four engineers',
    period: '2026 – 2027',
    status: { label: 'In progress', tone: 'progress' },
    title: 'Catching cross-chain bridge exploits in real time',
    summary:
      'Anomaly detection that learns each bridge vault’s normal hourly withdrawals and flags exploit-scale spikes as they happen, with an alert that explains itself. We validate it by replaying real-world exploits such as the Orbit Chain hack.',
    metrics: [
      { value: '4', label: 'engineers on the team I lead' },
      { value: 'SonarX', label: 'industry sponsor' },
      { value: '2-week', label: 'sprints with peer-reviewed pull requests' },
    ],
    media: 'bridge',
    diagram: bridgeWatchArchitecture,
    diagramCaption: 'Prototype architecture',
    diagramNote: 'Dashed: planned SonarX source.',
    problem:
      'A bridge keeps everyone’s deposits in one vault, which makes it a favorite target. Every transaction is public, so a hack can be seen while it happens; the hard part is alerting fast without crying wolf on every large, honest withdrawal.',
    builtLabel: 'What we built',
    built: [
      'Ingest of confirmed vault transfers, priced in USD at ingest, with SonarX as a drop-in source',
      'A detector with an hour-of-day baseline and five rules, plus cooldowns and incident grouping',
      'A SQLite store, an at-least-once webhook notifier, a FastAPI service and an operator dashboard',
      'Replay and evaluation tools that rerun real exploits and measure false alarms on normal traffic',
    ],
    decisions: [
      '**Robust statistics**: median and MAD, so one whale withdrawal doesn’t skew the baseline.',
      '**Check, then commit**: the detector sees every transfer before it’s stored, so nothing lands in the database unchecked.',
      '**Validated against reality**: replaying real-world exploits such as the Orbit Chain hack, and measuring the false-alarm rate on normal traffic, because an alert nobody trusts is worse than none.',
    ],
    roleNote: 'I lead the four-engineer team, running two-week sprints with peer-reviewed pull requests. The prototype is a team build.',
    stack: ['Python', 'FastAPI', 'SQLite', 'Ethereum JSON-RPC', 'Chainlink prices', 'pytest', 'Docker'],
    links: [],
  },
];

export type Project = {
  name: string;
  context: string;
  href: string;
  summary: string;
  stack: string[];
  visual: 'bridge' | 'quadtree' | 'clusters' | 'spatial';
};

export const projects: Project[] = [
  {
    name: 'Single-cell gene expression pipeline',
    context: 'Research computing · UCLA',
    href: 'https://github.com/garybs16/UCLA-gene-expression-analysis',
    summary:
      'Reproducible Python pipelines, built with UCLA researchers, for cleaning, normalization, dimensionality reduction and similarity analysis across 100M+ single-cell profiles from Tahoe-100M.',
    stack: ['Python', 'Pandas', 'NumPy', 'scikit-learn'],
    visual: 'clusters',
  },
  {
    name: 'Vision Pro reading assistant',
    context: 'HackHarvard 2025 · Selected from 10,000+',
    href: 'https://github.com/garybs16/Hackharvard-2025',
    summary:
      'Interactive 3D text in mixed reality. It anchors parsed PDFs in space, summarizes with Gemini, narrates with ElevenLabs in under 150 ms, and adapts highlighting to where you look.',
    stack: ['Swift', 'SwiftUI', 'RealityKit'],
    visual: 'spatial',
  },
  {
    name: 'CosmoSim',
    context: 'Scientific computing',
    href: 'https://github.com/garybs16/cosmosim-lambdaCDM',
    summary:
      'An N-body simulator for a Lambda-CDM universe: Barnes-Hut tree gravity in comoving coordinates, Hubble expansion, OpenMP parallelism and resumable snapshots.',
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
