import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const baseUrl = import.meta.env.BASE_URL;
const portraitUrl = `${baseUrl}IMG_4711.jpg`;
const email = 'garysamuel16@gmail.com';
const githubUrl = 'https://github.com/garybs16';
const linkedInUrl = 'https://www.linkedin.com/in/gary-samuel-3954261b2/';

const onlineImages = {
  aiCircuit:
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1800&q=90',
  cyberConsole:
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1800&q=90',
  spatialHeadset:
    'https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=1800&q=90',
  dataCenter:
    'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1800&q=90',
  codeWall:
    'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1800&q=90',
  laptopCode:
    'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1800&q=90',
  robotics:
    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1800&q=90',
  productDesk:
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1800&q=90',
  serverRack:
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1800&q=90',
  developerSetup:
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1800&q=90',
};

const portfolioImages = [
  { src: onlineImages.aiCircuit, label: 'AI Agents', detail: 'Deterministic workflows' },
  { src: onlineImages.spatialHeadset, label: 'Vision Pro', detail: 'Spatial interfaces' },
  { src: onlineImages.codeWall, label: 'AutoFix', detail: 'Traceback analysis' },
  { src: onlineImages.dataCenter, label: 'Backends', detail: 'Reliable services' },
  { src: onlineImages.robotics, label: 'Automation', detail: 'Applied intelligence' },
  { src: onlineImages.developerSetup, label: 'Fullstack', detail: 'React + APIs' },
  { src: onlineImages.serverRack, label: 'Infrastructure', detail: 'Cloud-ready systems' },
  { src: onlineImages.laptopCode, label: 'Python Tooling', detail: 'Clean diagnostics' },
  { src: onlineImages.cyberConsole, label: 'Validation', detail: 'Robust execution' },
  { src: onlineImages.productDesk, label: 'Product Build', detail: 'Useful software' },
];

const marqueeImages = [
  ...portfolioImages,
  ...portfolioImages,
  ...portfolioImages,
  ...portfolioImages,
  { src: `${baseUrl}IMG_8011.JPG`, label: 'Impact', detail: '5x faster authoring' },
];

const decorativeImages = {
  moon: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png',
  object:
    'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png',
  lego: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png',
  group:
    'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png',
};

const services = [
  {
    number: '01',
    name: 'AI Agent Systems',
    description:
      'Deterministic task execution for real-time 3D scene generation, separating planning from spatial computation for reliable multi-step workflows.',
  },
  {
    number: '02',
    name: 'Python Tooling',
    description:
      'Automation, AST analysis, test-failure triage, and backend utilities built with clean, inspectable logic and practical developer output.',
  },
  {
    number: '03',
    name: 'Fullstack Apps',
    description:
      'React, Node.js, FastAPI, REST APIs, and event-driven services for product workflows that need frontend polish and backend reliability.',
  },
  {
    number: '04',
    name: 'Spatial Computing',
    description:
      'SwiftUI and RealityKit experiences for Apple Vision Pro, including gaze-driven interactions and spatial PDF overlays.',
  },
  {
    number: '05',
    name: 'LLM Integrations',
    description:
      'LLM tooling, vector search, validation layers, and API integrations designed to make AI workflows useful, measurable, and shippable.',
  },
];

const stats = [
  { value: '5x', label: 'faster scene authoring' },
  { value: '98%+', label: 'multi-step workflow success' },
  { value: '120ms', label: 'Vision Pro API latency' },
  { value: '90%', label: 'asset turnaround cut' },
];

const heroHighlights = [
  'AI agent developer at UnstableML',
  'CS student at CSU Fullerton',
  'Open to SWE internships and junior roles',
];

const techStack = [
  'Python',
  'FastAPI',
  'React',
  'TypeScript',
  'Node.js',
  'SwiftUI',
  'RealityKit',
  'LLM Tooling',
  'Vector Search',
  'PyTest',
  'Docker',
  'SQL',
];

const projects = [
  {
    number: '01',
    name: 'AI Scene Orchestrator',
    category: 'UnstableML',
    href: githubUrl,
    summary:
      'Deterministic execution layer for real-time 3D scene generation, coordinating planning, spatial operations, assets, camera state, and timing.',
    bullets: ['5x faster authoring loops', '98%+ multi-step workflow success', 'External asset validation pipeline'],
    stack: ['Python', 'LLM tooling', '3D pipelines'],
    details: [
      { label: 'Problem', text: 'Scene generation needed repeatable multi-step execution instead of fragile prompt-only output.' },
      { label: 'Built', text: 'A deterministic orchestration layer for planning, assets, spatial operations, and camera state.' },
      { label: 'Result', text: 'Improved authoring speed and workflow completion for complex generated scenes.' },
    ],
    images: [onlineImages.robotics, onlineImages.aiCircuit, onlineImages.dataCenter],
  },
  {
    number: '02',
    name: 'Vision Pro Spatial Reader',
    category: 'HackHarvard',
    href: githubUrl,
    summary:
      'Apple Vision Pro app that turns PDF content into spatial overlays with text-processing, speech synthesis, and gaze-driven interactions.',
    bullets: ['SwiftUI + RealityKit interface', '120-150 ms event-driven backend path', 'Attention-aware spatial UI'],
    stack: ['SwiftUI', 'RealityKit', 'Node.js'],
    details: [
      { label: 'Problem', text: 'Dense reading workflows are hard to navigate inside spatial computing environments.' },
      { label: 'Built', text: 'A Vision Pro reader with spatial PDF overlays, speech support, and gaze-aware interaction.' },
      { label: 'Result', text: 'Created a fast event-driven prototype for immersive reading and accessibility.' },
    ],
    images: [onlineImages.spatialHeadset, onlineImages.productDesk, onlineImages.cyberConsole],
  },
  {
    number: '03',
    name: 'AutoFix Analyzer',
    category: 'Python Tooling',
    href: 'https://github.com/garybs16/AutoFix-Bug-Fixer',
    summary:
      'Python test-failure analyzer that reads tracebacks and AST structure to identify likely root causes without mutating source code.',
    bullets: ['AST + traceback analysis', 'Ranked suspect lines', 'Actionable fix hints for failing tests'],
    stack: ['Python', 'AST', 'PyTest'],
    details: [
      { label: 'Problem', text: 'Failing tests often hide the useful signal across stack traces and source files.' },
      { label: 'Built', text: 'A static analyzer that ranks likely suspect lines and explains actionable fixes.' },
      { label: 'Result', text: 'Makes debugging faster while keeping source files unchanged and inspectable.' },
    ],
    images: [onlineImages.codeWall, onlineImages.laptopCode, onlineImages.developerSetup],
  },
];

const experience = [
  {
    role: 'AI Agent Developer',
    company: 'UnstableML, San Jose',
    time: 'Nov 2025 - Present',
  },
  {
    role: 'Selected Hackathon Participant',
    company: 'HackHarvard 2025, Cambridge',
    time: 'Oct 2025',
  },
  {
    role: 'B.S. Computer Science',
    company: 'California State University, Fullerton',
    time: 'Expected May 2027',
  },
];

type FadeInProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  children: ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
};

function FadeIn({
  as = 'div',
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  ...props
}: FadeInProps) {
  const MotionComponent = motion.create(as) as ElementType;

  return (
    <MotionComponent
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ delay, duration, ease: [0.25, 0.1, 0.25, 1] }}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}

type MagnetProps = {
  children: ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
};

function Magnet({
  children,
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  className,
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<CSSProperties>({
    transform: 'translate3d(0, 0, 0)',
    transition: inactiveTransition,
    willChange: 'transform',
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const node = ref.current;
      if (!node) return;

      const rect = node.getBoundingClientRect();
      const withinX = event.clientX >= rect.left - padding && event.clientX <= rect.right + padding;
      const withinY = event.clientY >= rect.top - padding && event.clientY <= rect.bottom + padding;

      if (!withinX || !withinY) {
        setStyle({
          transform: 'translate3d(0, 0, 0)',
          transition: inactiveTransition,
          willChange: 'transform',
        });
        return;
      }

      const x = (event.clientX - rect.left - rect.width / 2) / strength;
      const y = (event.clientY - rect.top - rect.height / 2) / strength;
      setStyle({
        transform: `translate3d(${x}px, ${y}px, 0)`,
        transition: activeTransition,
        willChange: 'transform',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [activeTransition, inactiveTransition, padding, strength]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}

function ContactButton({ href = `mailto:${email}`, label = 'Contact Me' }: { href?: string; label?: string }) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noreferrer' : undefined}
      className="rounded-full px-8 py-3 text-xs font-medium uppercase tracking-widest text-white outline outline-2 -outline-offset-[3px] outline-white sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base"
      style={{
        background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
      }}
    >
      {label}
    </a>
  );
}

function GhostButton({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noreferrer' : undefined}
      className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#D7E2EA] px-6 py-3 text-xs font-medium uppercase tracking-widest text-[#D7E2EA] transition-colors duration-200 hover:bg-[#D7E2EA]/10 sm:px-8 sm:text-sm md:px-10 md:py-4 md:text-base"
    >
      {label}
      <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
    </a>
  );
}

function LiveProjectButton({ href, label = 'View Work' }: { href: string; label?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-full border-2 border-[#D7E2EA] px-8 py-3 text-sm font-medium uppercase tracking-widest text-[#D7E2EA] transition-colors duration-200 hover:bg-[#D7E2EA]/10 sm:px-10 sm:py-3.5 sm:text-base"
    >
      {label}
      <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
    </a>
  );
}

function ProjectImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className: string;
}) {
  return (
    <figure className={`group relative overflow-hidden bg-[#D7E2EA]/5 ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(215,226,234,0.24),transparent_32%),linear-gradient(180deg,transparent_48%,rgba(0,0,0,0.72))]" />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-[#D7E2EA]/15" />
    </figure>
  );
}

function AnimatedCharacter({
  character,
  index,
  length,
  scrollYProgress,
}: {
  character: string;
  index: number;
  length: number;
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}) {
  const start = index / length;
  const end = Math.min(1, start + 0.16);
  const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
  const display = character === ' ' ? '\u00A0' : character;

  return (
    <span className="relative inline-block">
      <span className="opacity-0">{display}</span>
      <motion.span aria-hidden="true" className="absolute inset-0" style={{ opacity }}>
        {display}
      </motion.span>
    </span>
  );
}

function AnimatedText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });

  return (
    <p
      ref={ref}
      className="max-w-[560px] text-center text-[clamp(1rem,2vw,1.35rem)] font-medium leading-relaxed text-[#D7E2EA]"
    >
      {text.split('').map((character, index) => (
        <AnimatedCharacter
          key={`${character}-${index}`}
          character={character}
          index={index}
          length={text.length}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </p>
  );
}

function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-[#0C0C0C]">
      <img
        src={onlineImages.aiCircuit}
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.16]"
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(12,12,12,0.76),rgba(12,12,12,0.98)),radial-gradient(circle_at_72%_38%,rgba(182,0,168,0.28),transparent_36%)]" />

      <FadeIn
        as="nav"
        delay={0}
        y={-20}
        className="relative z-30 mx-auto flex w-full max-w-7xl items-center justify-between px-5 pt-5 sm:px-8 md:px-10 md:pt-7"
      >
        <a href="#" className="text-sm font-black uppercase tracking-widest text-[#D7E2EA] sm:text-base">
          Gary Samuel
        </a>
        <div className="flex items-center gap-4 sm:gap-6 md:gap-9">
        {[
          ['About', '#about'],
          ['Skills', '#services'],
          ['Projects', '#projects'],
        ].map(([label, href]) => (
          <a
            key={label}
            href={href}
            className="text-xs font-medium uppercase tracking-wider text-[#D7E2EA]/80 transition-opacity duration-200 hover:opacity-70 sm:text-sm"
          >
            {label}
          </a>
        ))}
        </div>
      </FadeIn>

      <div className="relative z-20 mx-auto grid w-full max-w-7xl flex-1 items-center gap-8 px-5 py-10 sm:px-8 md:grid-cols-[1.05fr_0.95fr] md:px-10 md:py-12">
        <div className="max-w-4xl">
          <FadeIn
            as="p"
            delay={0.1}
            y={16}
            className="mb-4 text-xs font-medium uppercase tracking-[0.34em] text-[#D7E2EA]/60 sm:text-sm"
          >
            Software engineer focused on useful AI systems
          </FadeIn>
          <FadeIn
            as="h1"
            delay={0.18}
            y={24}
            className="hero-heading max-w-[980px] text-[clamp(4.2rem,13vw,11rem)] font-black uppercase leading-[0.78] tracking-normal"
          >
            Gary Samuel
          </FadeIn>
          <FadeIn
            as="p"
            delay={0.28}
            y={22}
            className="mt-6 max-w-2xl text-[clamp(1.05rem,2vw,1.55rem)] font-light leading-relaxed text-[#D7E2EA]/80"
          >
            I build deterministic AI workflows, Python debugging tools, spatial computing prototypes,
            and fullstack apps with clear product outcomes.
          </FadeIn>

          <FadeIn delay={0.36} y={20} className="mt-7 flex flex-wrap gap-2">
            {heroHighlights.map((item) => (
              <span
                key={item}
                className="rounded-full border border-[#D7E2EA]/20 bg-[#D7E2EA]/5 px-4 py-2 text-xs font-medium uppercase tracking-wider text-[#D7E2EA]/80"
              >
                {item}
              </span>
            ))}
          </FadeIn>

          <FadeIn delay={0.44} y={20} className="mt-8 flex flex-wrap items-center gap-3">
            <ContactButton label="Email Gary" />
            <GhostButton href={`${baseUrl}resume_gary.pdf`} label="Resume" />
            <GhostButton href={githubUrl} label="GitHub" />
          </FadeIn>
        </div>

        <FadeIn delay={0.25} y={24} className="justify-self-center md:justify-self-end">
          <Magnet
            padding={120}
            strength={5}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
          >
            <div className="relative w-[min(78vw,430px)] overflow-hidden rounded-[30px] border border-[#D7E2EA]/20 bg-[#D7E2EA]/5 p-2 shadow-[0_34px_100px_rgba(0,0,0,0.72)] backdrop-blur">
              <img
                src={portraitUrl}
                alt="Gary Samuel"
                className="aspect-[4/5] w-full select-none rounded-[24px] object-cover object-center"
                draggable={false}
              />
              <div className="absolute inset-x-2 bottom-2 rounded-b-[24px] bg-gradient-to-t from-black/78 to-transparent p-5">
                <p className="text-xs font-medium uppercase tracking-[0.28em] text-[#D7E2EA]/70">Based in California</p>
                <p className="mt-1 text-lg font-black uppercase leading-none text-[#D7E2EA]">AI Agent Developer</p>
              </div>
            </div>
          </Magnet>
        </FadeIn>
      </div>

      <FadeIn delay={0.5} y={18} className="relative z-20 mx-auto w-full max-w-7xl px-5 pb-6 sm:px-8 md:px-10 md:pb-8">
        <div className="grid overflow-hidden rounded-[24px] border border-[#D7E2EA]/15 bg-[#D7E2EA]/5 backdrop-blur md:grid-cols-4">
            {stats.map((stat) => (
            <div key={stat.label} className="border-b border-[#D7E2EA]/15 px-5 py-4 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
              <strong className="block text-[clamp(1.8rem,4vw,3rem)] font-black leading-none text-[#D7E2EA]">{stat.value}</strong>
              <span className="mt-2 block text-xs font-light uppercase leading-tight tracking-wider text-[#D7E2EA]/70">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
      </FadeIn>
    </section>
  );
}

function FeaturedWorkSection() {
  return (
    <section id="featured" className="bg-[#D7E2EA] px-5 py-16 text-[#0C0C0C] sm:px-8 md:px-10 md:py-20">
      <div className="mx-auto max-w-7xl">
        <FadeIn className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.34em] text-[#0C0C0C]/50">Featured work</p>
            <h2 className="mt-3 max-w-3xl text-[clamp(2.4rem,7vw,6rem)] font-black uppercase leading-[0.86]">
              Built for real technical workflows.
            </h2>
          </div>
          <p className="max-w-md text-base font-light leading-relaxed text-[#0C0C0C]/60 md:text-lg">
            Three projects that show the range: AI orchestration, spatial computing, and Python developer tooling.
          </p>
        </FadeIn>

        <div className="grid gap-4 md:grid-cols-3">
          {projects.map((project, index) => (
            <FadeIn
              key={project.name}
              delay={index * 0.08}
              className="group overflow-hidden rounded-[24px] border border-[#0C0C0C]/10 bg-white"
            >
              <img
                src={project.images[0]}
                alt={`${project.name} featured preview`}
                loading="lazy"
                className="aspect-[16/10] w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="p-5">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#0C0C0C]/50">{project.category}</p>
                <h3 className="mt-3 text-2xl font-black uppercase leading-none">{project.name}</h3>
                <p className="mt-4 text-sm font-light leading-relaxed text-[#0C0C0C]/60">{project.details[2].text}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[#0C0C0C]/10 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-wider text-[#0C0C0C]/60"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function MarqueeSection() {
  const ref = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);
  const rowOne = [...marqueeImages.slice(0, 11), ...marqueeImages.slice(0, 11), ...marqueeImages.slice(0, 11)];
  const rowTwo = [...marqueeImages.slice(11), ...marqueeImages.slice(11), ...marqueeImages.slice(11)];

  useEffect(() => {
    const updateOffset = () => {
      if (!ref.current) return;
      const sectionTop = ref.current.getBoundingClientRect().top + window.scrollY;
      setOffset((window.scrollY - sectionTop + window.innerHeight) * 0.3);
    };

    updateOffset();
    window.addEventListener('scroll', updateOffset, { passive: true });
    window.addEventListener('resize', updateOffset);
    return () => {
      window.removeEventListener('scroll', updateOffset);
      window.removeEventListener('resize', updateOffset);
    };
  }, []);

  const renderRow = (images: typeof marqueeImages) =>
    images.map((item, index) => (
      <article
        key={`${item.src}-${index}`}
        className="group relative h-[230px] w-[360px] shrink-0 overflow-hidden rounded-[28px] border border-[#D7E2EA]/15 bg-[#D7E2EA]/5 sm:h-[270px] sm:w-[420px]"
      >
        <img
          src={item.src}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-5">
          <p className="text-sm font-black uppercase tracking-widest text-[#D7E2EA]">{item.label}</p>
          <p className="text-xs font-light uppercase tracking-wider text-[#D7E2EA]/70">{item.detail}</p>
        </div>
      </article>
    ));

  return (
    <section ref={ref} className="overflow-hidden bg-[#0C0C0C] pb-10 pt-24 sm:pt-32 md:pt-40">
      <div className="flex flex-col gap-3">
        <div className="flex w-max gap-3" style={{ transform: `translate3d(${offset - 200}px, 0, 0)`, willChange: 'transform' }}>
          {renderRow(rowOne)}
        </div>
        <div className="flex w-max gap-3" style={{ transform: `translate3d(${-(offset - 200)}px, 0, 0)`, willChange: 'transform' }}>
          {renderRow(rowTwo)}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0C0C0C] px-5 py-20 sm:px-8 md:px-10">
      <FadeIn delay={0.1} duration={0.9} x={-80} y={0} className="absolute left-[1%] top-[4%] w-[120px] sm:left-[2%] sm:w-[160px] md:left-[4%] md:w-[210px]">
        <img src={decorativeImages.moon} alt="" loading="lazy" />
      </FadeIn>
      <FadeIn delay={0.25} duration={0.9} x={-80} y={0} className="absolute bottom-[8%] left-[3%] w-[100px] sm:left-[6%] sm:w-[140px] md:left-[10%] md:w-[180px]">
        <img src={decorativeImages.object} alt="" loading="lazy" />
      </FadeIn>
      <FadeIn delay={0.15} duration={0.9} x={80} y={0} className="absolute right-[1%] top-[4%] w-[120px] sm:right-[2%] sm:w-[160px] md:right-[4%] md:w-[210px]">
        <img src={decorativeImages.lego} alt="" loading="lazy" />
      </FadeIn>
      <FadeIn delay={0.3} duration={0.9} x={80} y={0} className="absolute bottom-[8%] right-[3%] w-[130px] sm:right-[6%] sm:w-[170px] md:right-[10%] md:w-[220px]">
        <img src={decorativeImages.group} alt="" loading="lazy" />
      </FadeIn>

      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center gap-10 text-center sm:gap-14 md:gap-16">
        <FadeIn as="h2" delay={0} y={40} className="hero-heading text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight">
          About me
        </FadeIn>
        <div className="flex flex-col items-center gap-12 sm:gap-16 md:gap-20">
          <AnimatedText text="I am Gary Samuel, a computer science student at California State University, Fullerton and an AI Agent Developer at UnstableML. I build deterministic AI workflows, Python tooling, spatial computing experiments, and fullstack product systems that turn messy technical ideas into software teams can actually use." />
          <div className="grid w-full gap-3 sm:grid-cols-3">
            {experience.map((item) => (
              <FadeIn key={`${item.role}-${item.time}`} y={20} className="rounded-[28px] border border-[#D7E2EA]/15 bg-[#D7E2EA]/5 p-5 text-left backdrop-blur">
                <span className="text-xs font-medium uppercase tracking-widest text-[#D7E2EA]/55">{item.time}</span>
                <h3 className="mt-3 text-xl font-black uppercase leading-none text-[#D7E2EA]">{item.role}</h3>
                <p className="mt-2 text-sm font-light uppercase tracking-wide text-[#D7E2EA]/70">{item.company}</p>
              </FadeIn>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <ContactButton />
            <GhostButton href={linkedInUrl} label="LinkedIn" />
            <GhostButton href={githubUrl} label="GitHub" />
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="services" className="rounded-t-[40px] bg-white px-5 py-20 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32">
      <FadeIn as="h2" y={40} className="mb-16 text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight text-[#0C0C0C] sm:mb-20 md:mb-28">
        Capabilities
      </FadeIn>
      <div className="mx-auto max-w-5xl">
        {services.map((service, index) => (
          <FadeIn
            key={service.number}
            delay={index * 0.1}
            className="flex gap-6 border-t border-[rgba(12,12,12,0.15)] py-8 last:border-b sm:gap-10 sm:py-10 md:gap-16 md:py-12"
          >
            <span className="min-w-[34%] text-[clamp(3rem,10vw,140px)] font-black leading-none text-[#0C0C0C]">
              {service.number}
            </span>
            <div className="flex flex-col justify-center">
              <h3 className="text-[clamp(1rem,2.2vw,2.1rem)] font-medium uppercase text-[#0C0C0C]">
                {service.name}
              </h3>
              <p className="mt-3 max-w-2xl text-[clamp(0.85rem,1.6vw,1.25rem)] font-light leading-relaxed text-[#0C0C0C] opacity-60">
                {service.description}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
      <FadeIn className="mx-auto mt-16 flex max-w-5xl flex-wrap justify-center gap-3 sm:mt-20">
        {techStack.map((item) => (
          <span
            key={item}
            className="rounded-full border border-[#0C0C0C]/15 px-5 py-2 text-sm font-medium uppercase tracking-wider text-[#0C0C0C] transition-colors duration-200 hover:bg-[#0C0C0C] hover:text-white"
          >
            {item}
          </span>
        ))}
      </FadeIn>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  totalCards,
}: {
  project: (typeof projects)[number];
  index: number;
  totalCards: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.75', 'end 0.25'],
  });
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div ref={ref} className="mb-10 md:h-[85vh]">
      <motion.article
        className="overflow-hidden rounded-[28px] border border-[#D7E2EA]/70 bg-[#0C0C0C] p-4 shadow-[0_40px_140px_rgba(0,0,0,0.75)] sm:p-6 md:sticky md:rounded-[34px] md:p-8"
        style={{ top: `calc(6rem + ${index * 28}px)`, scale }}
      >
        <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-[#7621B0]/20 blur-[90px]" />
        <div className="mb-6 flex flex-col gap-5 text-[#D7E2EA] md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-8">
            <span className="text-[clamp(3rem,8vw,110px)] font-black leading-none text-[#D7E2EA]">
              {project.number}
            </span>
            <div className="pb-2">
              <p className="text-sm font-medium uppercase tracking-widest opacity-70 sm:text-base">{project.category}</p>
              <h3 className="max-w-[280px] break-words text-[clamp(1.25rem,7vw,3.4rem)] font-black uppercase leading-[0.94] tracking-normal sm:max-w-[620px] md:max-w-[780px] md:text-[clamp(1.45rem,3.2vw,3.4rem)] md:leading-[0.9]">
                {project.name}
              </h3>
            </div>
          </div>
          <LiveProjectButton href={project.href} label={project.name === 'AutoFix Analyzer' ? 'View Code' : 'View Work'} />
        </div>
        <p className="mb-5 max-w-4xl text-[clamp(0.95rem,1.5vw,1.2rem)] font-light leading-relaxed text-[#D7E2EA]/75">
          {project.summary}
        </p>

        <div className="mb-4 grid gap-3 md:grid-cols-3">
          {project.details.map((item) => (
            <div key={item.label} className="rounded-[18px] border border-[#D7E2EA]/15 bg-[#D7E2EA]/5 p-4">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.24em] text-[#D7E2EA]/50">{item.label}</p>
              <p className="mt-2 text-sm font-light leading-relaxed text-[#D7E2EA]/70">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {[...project.stack, ...project.bullets].map((bullet) => (
            <span key={bullet} className="rounded-full border border-[#D7E2EA]/15 px-4 py-2 text-xs font-medium uppercase tracking-wider text-[#D7E2EA]/75">
              {bullet}
            </span>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-[40%_60%]">
          <div className="grid gap-4">
            <ProjectImage
              src={project.images[0]}
              alt={`${project.name} preview 1`}
              className="h-[clamp(110px,12vw,180px)] w-full rounded-[22px] md:rounded-[26px]"
            />
            <ProjectImage
              src={project.images[1]}
              alt={`${project.name} preview 2`}
              className="h-[clamp(130px,15vw,230px)] w-full rounded-[22px] md:rounded-[26px]"
            />
          </div>
          <ProjectImage
            src={project.images[2]}
            alt={`${project.name} preview 3`}
            className="h-full min-h-[240px] w-full rounded-[22px] md:rounded-[26px]"
          />
        </div>
      </motion.article>
    </div>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" className="relative z-10 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-5 py-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:py-32">
      <FadeIn as="h2" y={40} className="hero-heading mb-16 text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight sm:mb-20 md:mb-28">
        Projects
      </FadeIn>
      <div className="mx-auto max-w-7xl">
        {projects.map((project, index) => (
          <ProjectCard key={project.name} project={project} index={index} totalCards={projects.length} />
        ))}
      </div>
      <FadeIn className="mx-auto mt-12 grid max-w-7xl gap-6 rounded-[40px] border border-[#D7E2EA]/20 bg-[#D7E2EA]/5 p-6 text-[#D7E2EA] sm:p-8 md:grid-cols-[1fr_auto] md:items-center md:rounded-[56px] md:p-10">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#D7E2EA]/55">Open to internships and junior SWE roles</p>
          <h2 className="mt-4 max-w-4xl text-[clamp(2.4rem,7vw,7rem)] font-black uppercase leading-[0.85] tracking-[-0.08em]">
            Let&apos;s build useful AI software.
          </h2>
        </div>
        <div className="flex flex-wrap gap-3 md:justify-end">
          <ContactButton label="Email Gary" />
          <GhostButton href={linkedInUrl} label="LinkedIn" />
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
    <main className="min-h-screen overflow-x-clip bg-[#0C0C0C] font-kanit">
      <HeroSection />
      <FeaturedWorkSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
    </main>
  );
}
