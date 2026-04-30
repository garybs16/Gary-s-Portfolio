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

const portfolioImages = [
  `${baseUrl}IMG_8011.JPG`,
  `${baseUrl}taskimg.jpg`,
  `${baseUrl}guessing.jpg`,
  `${baseUrl}profile.jpg`,
  `${baseUrl}IMG_4711.jpg`,
];

const marqueeImages = [
  ...portfolioImages,
  ...portfolioImages,
  ...portfolioImages,
  ...portfolioImages,
  `${baseUrl}IMG_8011.JPG`,
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

const projects = [
  {
    number: '01',
    name: 'AI Scene Orchestrator',
    category: 'UnstableML',
    href: githubUrl,
    images: [`${baseUrl}IMG_8011.JPG`, `${baseUrl}taskimg.jpg`, `${baseUrl}guessing.jpg`],
  },
  {
    number: '02',
    name: 'Vision Pro Spatial Reader',
    category: 'HackHarvard',
    href: githubUrl,
    images: [`${baseUrl}taskimg.jpg`, `${baseUrl}IMG_8011.JPG`, `${baseUrl}profile.jpg`],
  },
  {
    number: '03',
    name: 'AutoFix Analyzer',
    category: 'Python Tooling',
    href: 'https://github.com/garybs16/AutoFix-Bug-Fixer',
    images: [`${baseUrl}guessing.jpg`, `${baseUrl}taskimg.jpg`, `${baseUrl}IMG_4711.jpg`],
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

function ContactButton() {
  return (
    <a
      href={`mailto:${email}`}
      className="rounded-full px-8 py-3 text-xs font-medium uppercase tracking-widest text-white outline outline-2 -outline-offset-[3px] outline-white sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base"
      style={{
        background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
      }}
    >
      Contact Me
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
    <section className="relative flex h-screen flex-col overflow-x-clip bg-[#0C0C0C]">
      <FadeIn as="nav" delay={0} y={-20} className="z-20 flex justify-between px-6 pt-6 md:px-10 md:pt-8">
        {[
          ['About', '#about'],
          ['Skills', '#services'],
          ['Projects', '#projects'],
          ['Contact', `mailto:${email}`],
        ].map(([label, href]) => (
          <a
            key={label}
            href={href}
            className="text-sm font-medium uppercase tracking-wider text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70 md:text-lg lg:text-[1.4rem]"
          >
            {label}
          </a>
        ))}
      </FadeIn>

      <div className="absolute left-1/2 top-1/2 z-10 w-[280px] -translate-x-1/2 -translate-y-1/2 sm:bottom-0 sm:top-auto sm:w-[360px] sm:translate-y-0 md:w-[440px] lg:w-[520px]">
        <FadeIn delay={0.6} y={30}>
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
          >
          <img src={portraitUrl} alt="Gary Samuel" className="w-full select-none rounded-[40px] object-cover" draggable={false} />
          </Magnet>
        </FadeIn>
      </div>

      <div className="relative z-0 mt-6 overflow-hidden sm:mt-4 md:-mt-5">
        <FadeIn as="h1" delay={0.15} y={40} className="hero-heading w-full whitespace-nowrap text-[14vw] font-black uppercase leading-none tracking-tight sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw]">
          Hi, i&apos;m Gary
        </FadeIn>
      </div>

      <div className="relative z-20 mt-auto flex items-end justify-between px-6 pb-7 sm:pb-8 md:px-10 md:pb-10">
        <FadeIn
          as="p"
          delay={0.35}
          y={20}
          className="max-w-[160px] text-[clamp(0.75rem,1.4vw,1.5rem)] font-light uppercase leading-snug tracking-wide text-[#D7E2EA] sm:max-w-[220px] md:max-w-[260px]"
        >
          AI agent developer building deterministic workflows, Python tooling, and fullstack systems
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
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

  const renderRow = (images: string[]) =>
    images.map((src, index) => (
      <img
        key={`${src}-${index}`}
        src={src}
        alt=""
        loading="lazy"
        className="h-[270px] w-[420px] shrink-0 rounded-2xl object-cover"
      />
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

      <div className="relative z-10 flex flex-col items-center gap-10 text-center sm:gap-14 md:gap-16">
        <FadeIn as="h2" delay={0} y={40} className="hero-heading text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight">
          About me
        </FadeIn>
        <div className="flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
          <AnimatedText text="I am Gary Samuel, a computer science student at California State University, Fullerton and an AI Agent Developer at UnstableML. I build deterministic AI workflows, Python tooling, spatial computing experiments, and fullstack product systems that turn messy technical ideas into software teams can actually use." />
          <ContactButton />
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="services" className="rounded-t-[40px] bg-white px-5 py-20 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32">
      <FadeIn as="h2" y={40} className="mb-16 text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight text-[#0C0C0C] sm:mb-20 md:mb-28">
        Skills
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
    <div ref={ref} className="h-[85vh]">
      <motion.article
        className="sticky rounded-[40px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:rounded-[50px] sm:p-6 md:rounded-[60px] md:p-8"
        style={{ top: `calc(6rem + ${index * 28}px)`, scale }}
      >
        <div className="mb-6 flex flex-col gap-5 text-[#D7E2EA] md:mb-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-8">
            <span className="text-[clamp(3rem,10vw,140px)] font-black leading-none text-[#D7E2EA]">
              {project.number}
            </span>
            <div className="pb-2">
              <p className="text-sm font-medium uppercase tracking-widest opacity-70 sm:text-base">{project.category}</p>
              <h3 className="text-[clamp(1.5rem,4vw,4.2rem)] font-black uppercase leading-none tracking-tight">
                {project.name}
              </h3>
            </div>
          </div>
          <LiveProjectButton href={project.href} label={project.name === 'AutoFix Analyzer' ? 'View Code' : 'View Work'} />
        </div>
        <div className="grid gap-4 md:grid-cols-[40%_60%]">
          <div className="grid gap-4">
            <img
              src={project.images[0]}
              alt={`${project.name} preview 1`}
              loading="lazy"
              className="h-[clamp(130px,16vw,230px)] w-full rounded-[40px] object-cover sm:rounded-[50px] md:rounded-[60px]"
            />
            <img
              src={project.images[1]}
              alt={`${project.name} preview 2`}
              loading="lazy"
              className="h-[clamp(160px,22vw,340px)] w-full rounded-[40px] object-cover sm:rounded-[50px] md:rounded-[60px]"
            />
          </div>
          <img
            src={project.images[2]}
            alt={`${project.name} preview 3`}
            loading="lazy"
            className="h-full min-h-[320px] w-full rounded-[40px] object-cover sm:rounded-[50px] md:rounded-[60px]"
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
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
    </main>
  );
}
