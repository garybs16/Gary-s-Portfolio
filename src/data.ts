const baseUrl = import.meta.env.BASE_URL;

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
  { value: 40, suffix: '%', label: 'faster product pages across a 700-SKU Shopify catalog' },
  { value: 1000, suffix: '+', label: 'concurrent customer chats on a Node.js + WebSocket system' },
  { value: 100, suffix: 'M', label: 'single-cell profiles streamed through PCA and clustering' },
  { value: 4.3, decimals: 1, label: 'average AP CS Principles score across students I teach' },
];

export const featured = {
  name: 'First Step Healthcare Academy',
  role: 'Technical co-founder',
  href: 'https://firststepha.com/',
  domain: 'firststepha.com',
  image: `${baseUrl}first-step-home.png`,
  summary:
    'The public site and admissions system for a CNA training academy in Orange, California. Students browse programs and schedules, register, and pay a deposit; staff run enrollment from a protected admin area.',
  points: ['Program catalog and live schedules', 'Online registration with Stripe deposits', 'Admin dashboard for enrollment'],
  stack: ['React', 'Node.js', 'Express', 'SQLite', 'Stripe'],
};

export type Project = {
  name: string;
  context: string;
  href: string;
  summary: string;
  stack: string[];
  visual: 'bridge' | 'quadtree' | 'clusters' | 'terminal';
  status?: string;
};

export const projects: Project[] = [
  {
    name: 'BridgeWatch',
    context: 'Senior capstone · Team lead',
    status: 'In progress',
    href: 'https://github.com/garybs16/CPSC490-G16-Neuroprosthetic',
    summary:
      'Real-time detection of cross-chain bridge exploits on SonarX data. Learns how much normally leaves each bridge vault hour by hour, flags withdrawals that jump far above it, and explains the alert in one sentence. I lead the four-person team.',
    stack: ['Python', 'Anomaly detection', 'Blockchain data'],
    visual: 'bridge',
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
  {
    name: 'Gene expression at scale',
    context: 'Research computing · UCLA',
    href: 'https://github.com/garybs16/UCLA-gene-expression-analysis',
    summary:
      'A reproducible pipeline, built with UCLA undergraduate researchers, that streams the 100M-cell Tahoe-100M dataset through normalization, PCA and clustering without loading it into memory.',
    stack: ['Python', 'SciPy', 'scikit-learn'],
    visual: 'clusters',
  },
  {
    name: 'AutoFix',
    context: 'Developer tooling',
    href: 'https://github.com/garybs16/AutoFix-Bug-Fixer',
    summary:
      'A CLI that points at the likely cause of a failing pytest run by walking the traceback and the AST, then suggests a fix. Cut triage time roughly 60% across a 500-case suite.',
    stack: ['Python', 'ast', 'pytest'],
    visual: 'terminal',
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
    period: 'May 2024 – Present',
    role: 'Math & computer science instructor',
    company: 'Tutoring Club & Novel Prep',
    location: 'Part-time',
    current: true,
    points: [
      'Teach AP Computer Science Principles through Python projects; students average a **4.3** on the exam.',
      'Built the project-based learning platform the program runs on, with code review built in. Engagement rose **35%** and repetitive grading time fell by **half**.',
    ],
  },
  {
    period: 'Oct 2025',
    role: 'Selected hacker',
    company: 'HackHarvard 2025',
    location: 'Cambridge, MA',
    points: [
      'Built an Apple Vision Pro reading assistant in Swift, SwiftUI and RealityKit that anchors text overlays in 3D space from parsed PDFs.',
      'Wired Gemini for summarization and ElevenLabs for speech into a pipeline that responds in **under 150 ms**, with gaze tracking that adapts highlighting and narration speed.',
    ],
  },
  {
    period: 'Feb – Aug 2025',
    role: 'Shopify developer intern',
    company: 'Bimmer Plug',
    location: 'Irvine, CA',
    points: [
      'Rebuilt product pages on the Storefront API for a 700-SKU catalog; pages loaded **40% faster**.',
      'Automated inventory updates through the Admin API with validation, cutting update errors **85%**.',
      'Shipped a Node.js and WebSocket chat system handling **1,000+ concurrent conversations**, plus GitHub Actions CI/CD that cut deploy time **60%**.',
    ],
  },
  {
    period: 'Jun – Dec 2024',
    role: 'Open source contributor',
    company: 'AsyncAPI',
    location: 'Volunteer',
    points: [
      'Implemented features and fixed core bugs across the JavaScript, TypeScript and Go SDKs.',
      'Tightened schema validation and docs workflows, reducing configuration errors by about **30%**.',
    ],
  },
  {
    period: 'Mar 2023 – Jun 2024',
    role: 'Lead project developer',
    company: 'Mission Kaizen',
    location: 'San Jose, CA',
    points: [
      'Led a three-person team shipping the organization’s production site; engagement rose **45%**.',
      'Designed a content framework that cut update time **70%** and scaled to **3×** the projected traffic.',
    ],
  },
];

export const facts: [string, string][] = [
  ['Based in', 'Orange County, California'],
  ['Studying', 'B.S. Computer Science, Data Science minor · Cal State Fullerton · May 2027'],
  ['Right now', 'Leading the BridgeWatch capstone and teaching AP CS Principles'],
  ['Looking for', 'Software engineering internships and new-grad roles'],
];

export const skills: [string, string[]][] = [
  ['Languages', ['Python', 'TypeScript', 'JavaScript', 'C++', 'C', 'Java', 'Swift', 'SQL', 'Bash']],
  ['Frameworks', ['React', 'Node.js', 'Express', 'FastAPI', 'Socket.IO', 'Three.js', 'SwiftUI', 'RealityKit']],
  ['Tools', ['Git', 'GitHub Actions', 'Docker', 'pytest', 'REST APIs', 'Stripe', 'Shopify APIs', 'OpenMP']],
  ['Coursework', ['Data structures & algorithms', 'Compiler design', 'Algorithm engineering', 'Operating systems', 'Computer architecture']],
];
