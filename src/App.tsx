import { useState, type ElementType, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowDownRight,
  ArrowUpRight,
  BrainCircuit,
  Code2,
  Download,
  Github,
  Linkedin,
  Mail,
  Menu,
  Sparkles,
  X,
} from 'lucide-react';

const baseUrl = import.meta.env.BASE_URL;

const links = {
  email: 'mailto:garysamuel16@gmail.com',
  github: 'https://github.com/garybs16',
  linkedin: 'https://www.linkedin.com/in/gary-samuel-3954261b2/',
  resume: `${baseUrl}resume_gary.pdf`,
};

const navigation = [
  ['About', '#about'],
  ['Experience', '#experience'],
  ['Work', '#work'],
  ['Skills', '#skills'],
  ['Contact', '#contact'],
];

const proof = [
  ['100M+', 'single-cell profiles processed'],
  ['40%', 'faster product-page loads'],
  ['85%', 'fewer inventory update errors'],
  ['500+', 'test cases analyzed by AutoFix'],
];

const experience = [
  {
    period: 'May 2024 — Present',
    role: 'Math & Computer Science Instructor',
    company: 'Tutoring Club & Novel Prep',
    wins: [
      'Guide students through Python projects, algorithm debugging, and data-structure optimization, contributing to a 4.3 average AP score.',
      'Built a project-learning platform that increased engagement 35% and reduced repetitive grading time 50%.',
    ],
    stack: 'Python · Git · GitHub · Web development',
    tag: 'Current',
  },
  {
    period: 'Feb 2025 — Aug 2025',
    role: 'Shopify Developer Intern',
    company: 'Bimmer Plug · Irvine, CA',
    wins: [
      'Improved page-load performance 40% across an API-driven catalog of 700+ SKUs.',
      'Reduced inventory errors 85%, supported 1,000+ concurrent chat interactions, and cut deployment time 60% with CI/CD.',
    ],
    stack: 'JavaScript · Node.js · WebSockets · Shopify APIs · GitHub Actions',
    tag: 'Internship',
  },
  {
    period: 'Jun 2024 — Dec 2024',
    role: 'Open Source Contributor',
    company: 'AsyncAPI',
    wins: [
      'Implemented features and fixed core bugs across JavaScript, TypeScript, and Go SDK tooling.',
      'Strengthened schema validation and documentation workflows, reducing configuration errors by 30%.',
    ],
    stack: 'TypeScript · JavaScript · Go · Event-driven architecture',
    tag: 'Open source',
  },
  {
    period: 'Mar 2023 — Jun 2024',
    role: 'Lead Project Developer',
    company: 'Mission Kaizen · San Jose, CA',
    wins: [
      'Led a three-person engineering team to ship a production site that increased engagement 45%.',
      'Created a custom content framework that reduced update time 70% and supported 3× projected growth.',
    ],
    stack: 'Leadership · Responsive UI · CMS architecture · Deployment',
    tag: 'Leadership',
  },
];

const projects = [
  {
    number: '01',
    name: 'First Step Healthcare Academy',
    category: 'Live product · Technical co-founder',
    image: `${baseUrl}first-step-home.png`,
    href: 'https://firststepha.com/',
    metric: 'Live',
    description: 'A production admissions and enrollment platform for a CNA training academy.',
    detail: 'Public program discovery, registration, payments, and protected operations in one platform.',
    stack: ['React', 'Node.js', 'Express', 'SQLite', 'Stripe'],
  },
  {
    number: '02',
    name: 'UCLA Gene Expression Analysis',
    category: 'Research computing',
    image: 'https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&w=1400&q=90',
    href: 'https://github.com/garybs16/UCLA-gene-expression-analysis',
    metric: '100M+',
    description: 'A reproducible pipeline for large-scale single-cell expression analysis.',
    detail: 'Streaming Tahoe-100M data into PCA, clustering, and portable analysis artifacts.',
    stack: ['Python', 'SciPy', 'scikit-learn', 'Datasets'],
  },
  {
    number: '03',
    name: 'AutoFix Bug Fixer',
    category: 'Developer tooling',
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1400&q=90',
    href: 'https://github.com/garybs16/AutoFix-Bug-Fixer',
    metric: '60%',
    description: 'A debugging assistant for finding the likely source of failing Python tests.',
    detail: 'Cut triage time across 500+ test cases with AST parsing, O(1) lookups, and fix suggestions.',
    stack: ['Python', 'AST', 'PyTest', 'Tracebacks'],
  },
  {
    number: '04',
    name: 'LambdaCDM N-Body Simulator',
    category: 'Scientific computing',
    image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1400&q=90',
    href: 'https://github.com/garybs16/cosmosim-lambdaCDM',
    metric: 'C++20',
    description: 'A C++ cosmology simulator for observing a changing universe in motion.',
    detail: 'Barnes-Hut tree gravity, Hubble expansion, OpenMP, and persistent scientific snapshots.',
    stack: ['C++20', 'OpenMP', 'Numerics', 'Simulation'],
  },
];

const skillGroups = [
  ['Languages', 'Python · C · C++ · Java · JavaScript · TypeScript · Swift · SQL · Bash'],
  ['Frameworks', 'React · Node.js · FastAPI · Socket.IO · SwiftUI · RealityKit'],
  ['Ship with', 'Docker · GitHub Actions · PyTest · Git · REST APIs · Shopify APIs'],
];

const heroItem = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ExternalLink({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  const external = href.startsWith('http');
  return <a className={className} href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>{children}</a>;
}

function SectionIntro({ overline, title, children }: { overline: string; title: string; children: ReactNode }) {
  return <Reveal className="section-intro"><p className="overline">{overline}</p><h2>{title}</h2><p>{children}</p></Reveal>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <header className="site-header">
        <a href="#top" className="wordmark" aria-label="Gary Samuel home"><span>Gary</span> Samuel</a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle navigation">
          {menuOpen ? <X /> : <Menu />}
        </button>
        <nav className={menuOpen ? 'nav-open' : ''} aria-label="Main navigation">
          {navigation.map(([label, href]) => <a key={label} href={href} onClick={closeMenu}>{label}</a>)}
          <ExternalLink href={links.resume} className="resume-link"><Download /> Resume</ExternalLink>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-sun" aria-hidden="true" />
        <div className="hero-orbit orbit-one" aria-hidden="true" />
        <div className="hero-orbit orbit-two" aria-hidden="true" />
        <motion.div
          className="hero-copy"
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.11, delayChildren: 0.12 } } }}
        >
          <motion.p className="overline" variants={heroItem}>CS + Data Science @ CSUF · May 2027</motion.p>
          <motion.h1 variants={heroItem}>Gary<br /><em>Samuel.</em></motion.h1>
          <motion.p className="hero-summary" variants={heroItem}><strong>I turn complicated systems into software that performs.</strong> Production web platforms, developer tools, and research pipelines — built with measurable outcomes.</motion.p>
          <motion.div className="hero-actions" variants={heroItem}>
            <a className="button button-dark" href="#work">See my work <ArrowDownRight /></a>
            <ExternalLink href={links.resume} className="text-link">View résumé <ArrowUpRight /></ExternalLink>
          </motion.div>
        </motion.div>
        <motion.div className="hero-portrait" initial={{ opacity: 0, scale: 0.92, rotate: -2 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.95, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}>
          <div className="portrait-crop"><img src={`${baseUrl}IMG_4711.jpg`} alt="Gary Samuel" /></div>
          <div className="portrait-note"><Sparkles /> <span>Open to 2026–27<br />SWE opportunities.</span></div>
        </motion.div>
        <p className="hero-side-note">CS student · builder · researcher<br />California, USA</p>
      </section>

      <div className="story-break" aria-hidden="true"><div className="story-track"><span>From questions to code</span><i /><span>And into the world</span><b>✦</b><span>From questions to code</span><i /><span>And into the world</span><b>✦</b></div></div>

      <section className="proof-strip" aria-label="Selected impact">
        <p>Impact at a glance</p>
        <div>{proof.map(([value, label]) => <article key={label}><strong>{value}</strong><span>{label}</span></article>)}</div>
      </section>

      <section className="about section" id="about">
        <SectionIntro overline="Engineer, researcher, teacher" title="I build like the outcome matters.">
          I move comfortably from algorithms and data pipelines to product interfaces and deployment. The through-line is simple: understand the real constraint, then ship the clearest solution.
        </SectionIntro>
        <Reveal className="about-grid" delay={0.08}>
          <div className="about-statement"><span>01</span><p>Production experience, open-source contributions, research at scale, and the communication skills to bring people with me.</p></div>
          <div className="about-details"><p>I’m completing a B.S. in Computer Science with a Data Science minor at Cal State Fullerton, with coursework spanning algorithms, compilers, operating systems, and computer architecture.</p><p>Teaching CS sharpened how I explain systems. Shipping for real customers taught me to measure them. Research taught me to stay rigorous when the answer is not obvious.</p><ExternalLink href={links.linkedin} className="text-link">More on LinkedIn <ArrowUpRight /></ExternalLink></div>
        </Reveal>
      </section>

      <section className="experience section" id="experience">
        <SectionIntro overline="Building in the open" title="Experience">
          Production engineering, open source, technical teaching, and team leadership — with the numbers to show what changed.
        </SectionIntro>
        <div className="experience-list">
          {experience.map((item, index) => <Reveal key={item.role} delay={index * 0.05}><article className="experience-item"><div className="experience-index">{String(index + 1).padStart(2, '0')}</div><div><p className="period">{item.period} <span>{item.tag}</span></p><h3>{item.role}</h3><h4>{item.company}</h4><p className="experience-stack">{item.stack}</p></div><ul className="experience-copy">{item.wins.map((win) => <li key={win}>{win}</li>)}</ul></article></Reveal>)}
        </div>
      </section>

      <section className="work section" id="work">
        <SectionIntro overline="Things I’ve made" title="Selected work">
          Four builds, four different engineering muscles: product ownership, machine-learning infrastructure, developer tooling, and high-performance simulation.
        </SectionIntro>
        <div className="project-grid">
          {projects.map((project, index) => <Reveal key={project.name} delay={(index % 2) * 0.08}><article className="project-card"><div className="project-image"><img src={project.image} alt="" /><span>{project.number}</span></div><div className="project-body"><div className="project-meta"><p className="project-category">{project.category}</p><strong>{project.metric}</strong></div><h3>{project.name}</h3><p className="project-summary">{project.description}</p><p className="project-detail">{project.detail}</p><div className="project-bottom"><div className="tags">{project.stack.map((tag) => <span key={tag}>{tag}</span>)}</div><ExternalLink href={project.href} className="project-open" aria-label={`Open ${project.name}`}><ArrowUpRight /></ExternalLink></div></div></article></Reveal>)}
        </div>
      </section>

      <section className="skills section" id="skills">
        <div className="skills-illustration" aria-hidden="true"><BrainCircuit /><Code2 /><i /><i /><i /></div>
        <SectionIntro overline="My toolkit" title="Technical, but never just technical.">
          Broad enough to move across the stack, grounded enough to choose the simplest tool that can carry the job.
        </SectionIntro>
        <Reveal className="skill-rows" delay={0.1}>{skillGroups.map(([label, value], index) => <div key={label}><span>{String(index + 1).padStart(2, '0')}</span><h3>{label}</h3><p>{value}</p></div>)}</Reveal>
      </section>

      <section className="contact section" id="contact">
        <Reveal className="contact-panel"><p className="overline">Let’s make something useful</p><h2>Have a question<br />worth building on?</h2><p>I’m always glad to meet people thinking carefully about software, research, and what comes next.</p><div className="contact-actions"><ExternalLink href={links.email} className="button button-light"><Mail /> Say hello</ExternalLink><ExternalLink href={links.github} className="text-link light-link"><Github /> GitHub</ExternalLink><ExternalLink href={links.linkedin} className="text-link light-link"><Linkedin /> LinkedIn</ExternalLink></div></Reveal>
      </section>

      <footer><span>© {new Date().getFullYear()} Gary Samuel</span><span>Made with curiosity and coffee.</span></footer>
    </main>
  );
}

export default App;
