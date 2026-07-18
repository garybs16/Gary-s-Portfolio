import { type ElementType, type HTMLAttributes, type ReactNode, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  BarChart3,
  Briefcase,
  Bug,
  Code2,
  Database,
  HeartPulse,
  FileText,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Orbit,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from 'lucide-react';

const baseUrl = import.meta.env.BASE_URL;
const email = 'garysamuel16@gmail.com';
const githubUrl = 'https://github.com/garybs16';
const linkedInUrl = 'https://www.linkedin.com/in/gary-samuel-3954261b2/';
const uclaProjectUrl = 'https://github.com/garybs16/UCLA-gene-expression-analysis';
const autofixProjectUrl = 'https://github.com/garybs16/AutoFix-Bug-Fixer';
const cosmosimProjectUrl = 'https://github.com/garybs16/cosmosim-lambdaCDM';
const firstStepUrl = 'https://firststepha.com/';

const images = {
  portrait: `${baseUrl}IMG_4711.jpg`,
  genomics:
    'https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&w=1400&q=90',
  code:
    'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1400&q=90',
  cosmos:
    'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1400&q=90',
  firstStep: `${baseUrl}first-step-home.png`,
};

const navItems = [
  ['Venture', '#venture'],
  ['Research', '#research'],
  ['Projects', '#projects'],
  ['Skills', '#skills'],
  ['Contact', '#contact'],
];

const heroStats = [
  ['4', 'featured engineering projects'],
  ['2027', 'CSUF computer science candidate'],
  ['Co-founder', 'production education platform'],
];

const pcaVariance = [
  { pc: 'PC1', variance: 2.13 },
  { pc: 'PC2', variance: 0.76 },
  { pc: 'PC3', variance: 0.62 },
  { pc: 'PC4', variance: 0.41 },
  { pc: 'PC5', variance: 0.37 },
  { pc: 'PC6', variance: 0.3 },
  { pc: 'PC7', variance: 0.27 },
  { pc: 'PC8', variance: 0.25 },
  { pc: 'PC9', variance: 0.25 },
  { pc: 'PC10', variance: 0.2 },
];

const pcaScatterPoints = Array.from({ length: 280 }, (_, index) => {
  const angle = index * 2.3999632297;
  const radius = Math.sqrt(((index * 67) % 281) / 281);
  const x = 230 + Math.cos(angle) * radius * 157 + Math.sin(index * 1.7) * 10;
  const y = 144 + Math.sin(angle) * radius * 91 - (x - 230) * 0.17 + Math.cos(index * 1.1) * 8;

  return { x, y, r: index % 9 === 0 ? 3.8 : 2.7 };
});

const projects = [
  {
    name: 'First Step Healthcare Academy',
    type: 'Technical co-founder · Live product',
    href: firstStepUrl,
    image: images.firstStep,
    icon: HeartPulse,
    summary:
      'A production admissions and enrollment platform for a CNA training academy, connecting public program discovery, registration, payments, and secure operational tools.',
    stack: ['React', 'Node.js', 'Express', 'SQLite', 'Stripe'],
  },
  {
    name: 'UCLA Gene Expression Analysis',
    type: 'Research computing',
    href: uclaProjectUrl,
    image: images.genomics,
    icon: Database,
    summary:
      'Python pipeline for streaming Tahoe-100M single-cell expression data, reducing dimensions, clustering cells, and exporting PCA artifacts.',
    stack: ['Python', 'SciPy', 'scikit-learn', 'datasets'],
  },
  {
    name: 'AutoFix Bug Fixer',
    type: 'Developer tooling',
    href: autofixProjectUrl,
    image: images.code,
    icon: Bug,
    summary:
      'Static and runtime analysis tool that reads tracebacks and AST structure to surface likely root causes in failing Python tests.',
    stack: ['Python', 'AST', 'PyTest', 'Tracebacks'],
  },
  {
    name: 'LambdaCDM N-Body Simulator',
    type: 'Scientific computing',
    href: cosmosimProjectUrl,
    image: images.cosmos,
    icon: Orbit,
    summary:
      'C++20 cosmology simulator with Barnes-Hut tree gravity, Hubble expansion, OpenMP parallelism, and snapshot output.',
    stack: ['C++20', 'OpenMP', 'Numerics', 'Simulation'],
  },
];

const productCapabilities = [
  { label: 'Student experience', detail: 'Programs, schedules, registration, and payment status.', icon: UsersRound },
  { label: 'Operations layer', detail: 'Cohort capacity, inquiries, records, and protected admin workflows.', icon: ShieldCheck },
  { label: 'Production foundation', detail: 'Express API, SQLite persistence, Stripe Checkout, and health checks.', icon: HeartPulse },
];

const skills = [
  'Python',
  'C++20',
  'TypeScript',
  'React',
  'SciPy',
  'scikit-learn',
  'PyTest',
  'OpenMP',
  'FastAPI',
  'Node.js',
  'SQL',
  'SwiftUI',
];

const timeline = [
  {
    date: 'Nov 2025 - Present',
    title: 'AI Agent Developer',
    place: 'UnstableML',
  },
  {
    date: 'Expected May 2027',
    title: 'B.S. Computer Science',
    place: 'California State University, Fullerton',
  },
  {
    date: 'Oct 2025',
    title: 'Selected HackHarvard Participant',
    place: 'Cambridge, MA',
  },
];

const focusAreas = [
  {
    title: 'Research pipelines',
    text: 'Streaming datasets, PCA artifacts, clustering workflows, and reproducible analysis outputs.',
    icon: Database,
  },
  {
    title: 'Developer tools',
    text: 'Python traceback analysis, AST inspection, testing flows, and AI-assisted debugging.',
    icon: Code2,
  },
  {
    title: 'Simulation systems',
    text: 'C++ numerical projects with parallel compute, tree methods, and scientific snapshots.',
    icon: Orbit,
  },
];

type FadeInProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  children: ReactNode;
  delay?: number;
};

function FadeIn({ as = 'div', children, delay = 0, ...props }: FadeInProps) {
  const MotionComponent = motion.create(as) as ElementType;

  return (
    <MotionComponent
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px', amount: 0.2 }}
      transition={{ duration: 0.48, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}

function ButtonLink({
  href,
  label,
  icon: Icon,
  primary = false,
}: {
  href: string;
  label: string;
  icon: ElementType;
  primary?: boolean;
}) {
  const external = href.startsWith('http');

  return (
    <a
      className={primary ? 'button button-primary' : 'button button-secondary'}
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
    >
      <Icon aria-hidden="true" />
      <span>{label}</span>
    </a>
  );
}

function SectionHeading({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <FadeIn className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </FadeIn>
  );
}

function Hero() {
  return (
    <section className="hero">
      <nav className="nav">
        <a href="#" className="brand">
          <span>Gary</span>
          Samuel
        </a>
        <div className="nav-links" aria-label="Primary navigation">
          {navItems.map(([label, href]) => (
            <a key={label} href={href}>
              {label}
            </a>
          ))}
        </div>
      </nav>

      <div className="hero-grid">
        <FadeIn className="hero-copy">
          <div className="availability">
            <Sparkles aria-hidden="true" />
            <span>Open to SWE internships and junior engineering roles</span>
          </div>
          <p className="eyebrow">Research computing / AI tooling</p>
          <h1>
            Gary <em>Samuel</em>
          </h1>
          <p>
            I build high-signal software across scientific data, developer tools, and AI-assisted
            product systems.
          </p>
          <div className="hero-actions">
            <ButtonLink href={`mailto:${email}`} label="Email" icon={Mail} primary />
            <ButtonLink href={`${baseUrl}resume_gary.pdf`} label="Resume" icon={FileText} />
            <ButtonLink href={githubUrl} label="GitHub" icon={Github} />
          </div>
          <div className="hero-stats" aria-label="Portfolio highlights">
            {heroStats.map(([value, label]) => (
              <div key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.08} className="hero-media">
          <div className="portrait-frame">
            <img src={images.portrait} alt="Gary Samuel" />
            <div className="portrait-label">
              <span>01 / Builder</span>
              <strong>Systems with purpose</strong>
            </div>
          </div>
          <div className="profile-card">
            <div>
              <MapPin aria-hidden="true" />
              <span>California</span>
            </div>
            <div>
              <GraduationCap aria-hidden="true" />
              <span>CSU Fullerton, Expected May 2027</span>
            </div>
          </div>
          <div className="signal-card" aria-label="Engineering focus">
            <div>
              <span>Current signal</span>
              <strong>Product × research</strong>
            </div>
            <div className="signal-bars" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function VentureSection() {
  return (
    <section id="venture" className="section venture">
      <div className="venture-intro">
        <SectionHeading
          eyebrow="Co-founded product"
          title="Turning enrollment into a clearer digital journey."
          text="First Step Healthcare Academy is a live, full-stack admissions platform built for prospective CNA students and the team supporting them."
        />
        <FadeIn delay={0.04} className="venture-link-wrap">
          <ButtonLink href={firstStepUrl} label="Visit First Step" icon={ArrowUpRight} primary />
          <span>Live at firststepha.com</span>
        </FadeIn>
      </div>

      <div className="venture-grid">
        <FadeIn delay={0.08} className="venture-preview">
          <div className="browser-bar" aria-hidden="true">
            <span />
            <span />
            <span />
            <strong>firststepha.com</strong>
          </div>
          <img src={images.firstStep} alt="First Step Healthcare Academy homepage" loading="lazy" />
          <div className="venture-stamp">
            <span>01</span>
            <strong>Technical co-founder</strong>
          </div>
        </FadeIn>

        <FadeIn delay={0.14} className="product-map">
          <div className="product-map-header">
            <span>System map</span>
            <strong>From interest to enrollment</strong>
          </div>
          <div className="flow-graph" aria-label="First Step product system flow">
            <div className="flow-node flow-node-primary">Prospective students</div>
            <div className="flow-line" />
            <div className="flow-node">React + Vite experience</div>
            <div className="flow-line" />
            <div className="flow-node">Express API</div>
            <div className="flow-branches">
              <div>SQLite records</div>
              <div>Stripe payments</div>
              <div>Admin operations</div>
            </div>
          </div>
          <div className="capability-list">
            {productCapabilities.map((capability) => (
              <article key={capability.label}>
                <capability.icon aria-hidden="true" />
                <div>
                  <strong>{capability.label}</strong>
                  <p>{capability.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function ResearchSection() {
  return (
    <section id="research" className="section research">
      <div className="research-grid">
        <div>
          <SectionHeading
            eyebrow="Featured project"
            title="UCLA gene expression analysis"
            text="A focused case study built around reproducible data processing, dimensionality reduction, and clear research artifacts."
          />
          <FadeIn className="research-facts">
            <span>Streams Tahoe-100M samples</span>
            <span>Exports 50 PCA dimensions</span>
            <span>Clusters embeddings with K-Means</span>
          </FadeIn>
          <FadeIn delay={0.06} className="inline-actions">
            <ButtonLink href={uclaProjectUrl} label="View repo" icon={Github} primary />
            <ButtonLink
              href="https://huggingface.co/datasets/tahoebio/Tahoe-100M"
              label="Dataset"
              icon={Database}
            />
          </FadeIn>
        </div>

        <FadeIn delay={0.08} className="chart-card">
          <div className="chart-header">
            <div>
              <span>PCA embedding</span>
              <strong>Cell expression projection</strong>
            </div>
            <BarChart3 aria-hidden="true" />
          </div>
          <div className="embedding-chart">
            <svg viewBox="0 0 440 300" role="img" aria-labelledby="embedding-title embedding-description">
              <title id="embedding-title">Illustrative PCA cell embedding</title>
              <desc id="embedding-description">
                A dense scatter plot showing individual cell observations projected onto the first two principal components.
              </desc>
              <g className="embedding-grid" aria-hidden="true">
                {[68, 106, 144, 182, 220].map((position) => (
                  <path key={`h-${position}`} d={`M 42 ${position} H 418`} />
                ))}
                {[86, 134, 182, 230, 278, 326, 374].map((position) => (
                  <path key={`v-${position}`} d={`M ${position} 24 V 258`} />
                ))}
              </g>
              <path className="embedding-axis" d="M 42 258 H 418 M 42 258 V 24" aria-hidden="true" />
              <path className="embedding-zero-line" d="M 230 24 V 258 M 42 144 H 418" aria-hidden="true" />
              <path className="embedding-trend" d="M 56 184 C 148 168, 270 145, 405 111" aria-hidden="true" />
              {pcaScatterPoints.map((point, index) => (
                <circle key={index} className="embedding-dot" cx={point.x} cy={point.y} r={point.r} />
              ))}
              {[-4, -2, 0, 2, 4].map((value, index) => (
                <text key={`x-${value}`} className="embedding-tick" x={86 + index * 72} y="276">{value}</text>
              ))}
              {[4, 2, 0, -2, -4].map((value, index) => (
                <text key={`y-${value}`} className="embedding-tick" x="28" y={72 + index * 42}>{value}</text>
              ))}
              <text className="embedding-label" x="48" y="20">PC2 expression</text>
              <text className="embedding-label" x="340" y="294">PC1 expression</text>
            </svg>
          </div>
          <div className="embedding-caption">
            <span><strong>{pcaVariance[0].variance.toFixed(2)}%</strong> variance in PC1</span>
            <span>Illustrative PCA projection of dimensionality-reduced cells</span>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" className="section projects">
      <SectionHeading
        eyebrow="Selected work"
        title="Selected engineering work"
        text="A focused project set spanning a live product, research computing, Python tooling, and performance-oriented C++."
      />
      <div className="project-list">
        {projects.map((project, index) => (
          <FadeIn key={project.name} delay={index * 0.06} as="article" className="project-row">
            <img src={project.image} alt="" loading="lazy" />
            <div className="project-content">
              <div className="project-meta">
                <span>{project.type}</span>
                <project.icon aria-hidden="true" />
              </div>
              <h3>{project.name}</h3>
              <p>{project.summary}</p>
              <div className="tag-row">
                {project.stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
            <a className="project-link" href={project.href} target="_blank" rel="noreferrer">
              <ArrowUpRight aria-hidden="true" />
              <span>Open</span>
            </a>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function SkillsSection() {
  return (
    <section id="skills" className="section skills">
      <SectionHeading
        eyebrow="Skills and signal"
        title="Clear technical range"
        text="The stack is grouped around practical engineering work: data, tooling, systems, and product-facing frontend."
      />
      <div className="skills-grid">
        <div className="skill-column">
          <FadeIn className="focus-grid">
            {focusAreas.map((area) => (
              <article key={area.title}>
                <area.icon aria-hidden="true" />
                <h3>{area.title}</h3>
                <p>{area.text}</p>
              </article>
            ))}
          </FadeIn>
          <FadeIn delay={0.06} className="skill-cloud">
            {skills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </FadeIn>
        </div>
        <FadeIn delay={0.08} className="timeline">
          {timeline.map((item) => (
            <article key={`${item.title}-${item.date}`}>
              <time>{item.date}</time>
              <strong>{item.title}</strong>
              <span>{item.place}</span>
            </article>
          ))}
        </FadeIn>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="section contact">
      <FadeIn className="contact-panel">
        <div>
          <p className="eyebrow">Contact</p>
          <h2>Let&apos;s build useful software.</h2>
        </div>
        <div className="contact-actions">
          <ButtonLink href={`mailto:${email}`} label="Email Gary" icon={Mail} primary />
          <ButtonLink href={linkedInUrl} label="LinkedIn" icon={Linkedin} />
          <ButtonLink href={githubUrl} label="GitHub" icon={Github} />
          <ButtonLink href={`${baseUrl}resume_gary.pdf`} label="Resume" icon={Briefcase} />
        </div>
      </FadeIn>
    </section>
  );
}

export default function App() {
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;

    requestAnimationFrame(() => {
      document.getElementById(hash)?.scrollIntoView();
    });
  }, []);

  return (
    <main>
      <Hero />
      <VentureSection />
      <ResearchSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
    </main>
  );
}
