import { useEffect, useState } from 'react';

const navLinks = [
  { id: 'projects', label: 'Projects' },
  { id: 'case-studies', label: 'Case Studies' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

const stats = [
  { value: '5x', label: 'Scene authoring speed' },
  { value: '98%+', label: 'Multi-step workflow success' },
  { value: '150ms', label: 'Vision Pro pipeline latency' },
  { value: '90%', label: 'Asset turnaround cut' },
];

const projects = [
  {
    title: 'AI Scene Orchestrator',
    tag: 'AI Agents',
    description: 'Deterministic task-execution system for real-time 3D scene generation.',
    points: ['High-level planning separated from low-level spatial computation', '98%+ success on multi-step motion workflows'],
    image: '/IMG_8011.JPG',
    links: [
      { label: 'Case study', href: '#case-agent' },
    ],
  },
  {
    title: 'Vision Pro Spatial Reader',
    tag: 'Fullstack',
    description: 'Swift + RealityKit app that renders parsed PDF content as spatial overlays.',
    points: ['Event-driven backend for text and speech APIs', 'Gaze-driven interactions and UI flow'],
    image: '/taskimg.jpg',
    links: [
      { label: 'Case study', href: '#case-vision' },
    ],
  },
  {
    title: 'AI Test Failure Analyzer',
    tag: 'Python',
    description: 'AST + traceback analysis to surface likely root causes and fixes.',
    points: ['Heuristic ranking of suspect lines', 'Reduced debug time on flaky tests'],
    image: '/guessing.jpg',
    links: [
      { label: 'Code', href: 'https://github.com/garybs16/AutoFix-Bug-Fixer' },
      { label: 'Case study', href: '#case-autofix' },
    ],
  },
];

const caseStudies = [
  {
    id: 'case-agent',
    title: 'AI Agent for 3D Scene Generation',
    summary: 'Built deterministic execution for real-time scene generation with strict timing constraints.',
    bullets: [
      'Separated high-level planning from spatial computation for maintainable pipelines.',
      'Coordinated object motion, camera state, and timing constraints across steps.',
      'Integrated external asset-generation services with validation for consistency.',
    ],
    link: { label: 'Role details', href: '#experience' },
  },
  {
    id: 'case-vision',
    title: 'Vision Pro Spatial Reader',
    summary: 'Rendered PDFs as spatial UI with text-processing and speech-synthesis services.',
    bullets: [
      'Event-driven backend with 120-150 ms end-to-end latency.',
      'Gaze-driven interactions tailored the UI to user attention.',
      'SwiftUI + RealityKit pipeline for anchored 3D overlays.',
    ],
    link: { label: 'Role details', href: '#experience' },
  },
  {
    id: 'case-autofix',
    title: 'AutoFix Test Failure Analyzer',
    summary: 'Python tooling to triage failing tests with AST + traceback analysis.',
    bullets: [
      'Heuristics for failing assertions and recent diff hotspots.',
      'Outputs suspect file + line with actionable fix hints.',
      'Focus on deterministic analysis, no source mutation.',
    ],
    link: { label: 'View code', href: 'https://github.com/garybs16/AutoFix-Bug-Fixer' },
  },
];

const skills = [
  {
    title: 'Languages',
    items: ['Python', 'JavaScript/TypeScript', 'C++', 'Java', 'SQL'],
  },
  {
    title: 'Frameworks',
    items: ['FastAPI', 'React', 'Node.js (Express)', 'Django/Flask'],
  },
  {
    title: 'Tools',
    items: ['LLM tooling', 'Vector search', 'REST APIs', 'Testing (PyTest, JUnit)', 'Docker (basics)'],
  },
];

const experience = [
  {
    role: 'AI Agent Developer',
    company: 'UnstableML, San Jose',
    timeframe: 'Nov 2025 - Present',
    bullets: [
      'Designed deterministic task execution for real-time 3D scene generation; reduced authoring time by 5x.',
      'Separated planning from spatial computation, reaching >98% success on multi-step workflows.',
      'Integrated external asset-generation services with validation to cut turnaround time by 90%.',
    ],
    link: 'https://github.com/garybs16',
  },
  {
    role: 'Selected Hackathon Participant',
    company: 'HackHarvard 2025, Cambridge',
    timeframe: 'Oct 2025',
    bullets: [
      'Built an Apple Vision Pro app with Swift, SwiftUI, and RealityKit for spatial PDF overlays.',
      'Integrated text-processing + speech-synthesis APIs with 120-150 ms latency.',
      'Developed gaze-driven interactions that adapted UI based on attention signals.',
    ],
    link: 'https://github.com/garybs16',
  },
  {
    role: 'Fullstack Developer',
    company: 'Independent',
    timeframe: '2023 - Present',
    bullets: [
      'Built Python automation and React apps with clean service boundaries.',
      'Delivered real-time features with WebSockets and event-driven backends.',
      'Shipped developer tooling focused on reliability and observability.',
    ],
    link: 'https://github.com/garybs16',
  },
];

const education = [
  {
    school: 'California State University, Fullerton',
    program: 'B.S. Computer Science',
    timeframe: 'Expected May 2027',
    details: 'Coursework: Data Structures & Algorithms, Compiler Design, Algorithm Engineering, OS, Artificial Intelligence.',
  },
  {
    school: 'Santa Ana College',
    program: 'A.S. Computer Science',
    timeframe: 'Completed 2023',
    details: 'Coursework: Programming Fundamentals, Object-Oriented Programming, Discrete Math.',
  },
];

const tickerItems = [
  'AI Agents',
  'Python',
  'FastAPI',
  'LLM Tooling',
  'Vector Search',
  'React',
  'Node.js',
  'Fullstack',
  'Realtime',
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(stored || (prefersDark ? 'dark' : 'light'));
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const nodes = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 900) setMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <div className="app">
      <a className="skip" href="#main">Skip to content</a>

      <div className="top-bar">
        Open to internships and junior SWE roles | US-based | Remote or hybrid
      </div>

      <header className="site-header">
        <div className="container header-content">
          <a className="logo" href="#home">
            <span className="logo-mark">GS</span>
            <span className="logo-text">Gary Samuel</span>
          </a>

          <nav className="nav-desktop" aria-label="Primary">
            {navLinks.map((link) => (
              <a key={link.id} href={`#${link.id}`} className="nav-link">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            <button
              type="button"
              className="theme-toggle"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle color theme"
            >
              {theme === 'dark' ? 'Light' : 'Dark'}
            </button>
            <a className="button button-solid" href="/resume_gary.pdf" download>
              Resume
            </a>
            <button
              type="button"
              className="menu-button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              Menu
            </button>
          </div>
        </div>

        <div id="mobile-menu" className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="mobile-link"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      </header>

      <main id="main">
        <section id="home" className="hero">
          <div className="container hero-grid">
            <div className="hero-copy reveal" style={{ '--delay': '0ms' }}>
              <p className="eyebrow">Software Engineer</p>
              <h1>
                I build AI agents and Python systems with fullstack experience and real-time rigor.
              </h1>
              <p className="lead">
                Focused on deterministic AI workflows, tooling, and product-grade integrations.
                Comfortable across Python, TypeScript, and spatial computing stacks.
              </p>
              <div className="hero-actions">
                <a className="button button-solid" href="https://github.com/garybs16" target="_blank" rel="noreferrer">
                  GitHub
                </a>
                <a className="button button-ghost" href="https://www.linkedin.com/in/gary-samuel-3954261b2/" target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
                <a className="button button-accent" href="#projects">
                  View work
                </a>
              </div>
              <div className="hero-tags">
                <span>AI agent systems</span>
                <span>Python + FastAPI</span>
                <span>Fullstack delivery</span>
              </div>
            </div>

            <div className="hero-visual reveal" style={{ '--delay': '120ms' }}>
              <div className="portrait-card">
                <div className="portrait-glow" />
                <img src="new_pfp.jpg" alt="Gary Samuel" />
              </div>
              <div className="floating-card">
                <p>Currently exploring</p>
                <strong>Realtime systems + DX tooling</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="stats">
          <div className="container stats-grid reveal" style={{ '--delay': '0ms' }}>
            {stats.map((stat) => (
              <div key={stat.label} className="stat-card">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="ticker">
          <div className="ticker-track">
            {tickerItems.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <div className="ticker-track" aria-hidden="true">
            {tickerItems.map((item) => (
              <span key={`${item}-clone`}>{item}</span>
            ))}
          </div>
        </section>

        <section id="projects" className="section">
          <div className="container">
            <div className="section-head reveal" style={{ '--delay': '0ms' }}>
              <div>
                <p className="eyebrow">Selected projects</p>
                <h2>AI-first builds with fullstack depth.</h2>
              </div>
              <a className="link" href="https://github.com/garybs16" target="_blank" rel="noreferrer">
                More on GitHub
              </a>
            </div>

            <div className="project-grid">
              {projects.map((project, index) => (
                <article key={project.title} className="project-card reveal" style={{ '--delay': `${index * 90}ms` }}>
                  <div className="project-media">
                    <img src={project.image} alt={project.title} loading="lazy" />
                  </div>
                  <div className="project-content">
                    <div className="project-header">
                      <h3>{project.title}</h3>
                      <span className="chip">{project.tag}</span>
                    </div>
                    <p>{project.description}</p>
                    <ul>
                      {project.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                    <div className="project-links">
                      {project.links.map((link) => (
                        <a key={link.label} href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel={link.href.startsWith('http') ? 'noreferrer' : undefined}>
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="case-studies" className="section section-contrast">
          <div className="container">
            <div className="section-head reveal" style={{ '--delay': '0ms' }}>
              <div>
                <p className="eyebrow">Case studies</p>
                <h2>How I design AI systems that ship.</h2>
              </div>
            </div>

            <div className="case-grid">
              {caseStudies.map((study, index) => (
                <article key={study.id} id={study.id} className="case-card reveal" style={{ '--delay': `${index * 90}ms` }}>
                  <h3>{study.title}</h3>
                  <p>{study.summary}</p>
                  <ul>
                    {study.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                  <a className="link" href={study.link.href} target="_blank" rel="noreferrer">
                    {study.link.label}
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="section">
          <div className="container">
            <div className="section-head reveal" style={{ '--delay': '0ms' }}>
              <div>
                <p className="eyebrow">Skills</p>
                <h2>Python-first, fullstack ready.</h2>
              </div>
            </div>

            <div className="skills-grid">
              {skills.map((group, index) => (
                <div key={group.title} className="skill-card reveal" style={{ '--delay': `${index * 90}ms` }}>
                  <h3>{group.title}</h3>
                  <div className="pill-row">
                    {group.items.map((item) => (
                      <span key={item} className="pill">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="section section-contrast">
          <div className="container">
            <div className="section-head reveal" style={{ '--delay': '0ms' }}>
              <div>
                <p className="eyebrow">Experience</p>
                <h2>AI agents, spatial computing, and delivery.</h2>
              </div>
            </div>

            <div className="timeline">
              {experience.map((role, index) => (
                <article key={role.role} className="timeline-card reveal" style={{ '--delay': `${index * 90}ms` }}>
                  <div className="timeline-head">
                    <div>
                      <h3>{role.role}</h3>
                      <p>{role.company}</p>
                    </div>
                    <span>{role.timeframe}</span>
                  </div>
                  <ul>
                    {role.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                  <a className="link" href={role.link} target="_blank" rel="noreferrer">
                    Reference
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="education" className="section">
          <div className="container">
            <div className="section-head reveal" style={{ '--delay': '0ms' }}>
              <div>
                <p className="eyebrow">Education</p>
                <h2>Computer science with AI focus.</h2>
              </div>
            </div>

            <div className="education-grid">
              {education.map((item, index) => (
                <article key={item.school} className="education-card reveal" style={{ '--delay': `${index * 90}ms` }}>
                  <h3>{item.school}</h3>
                  <p className="edu-program">{item.program}</p>
                  <span className="edu-time">{item.timeframe}</span>
                  <p>{item.details}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section contact">
          <div className="container contact-grid">
            <div className="contact-card reveal" style={{ '--delay': '0ms' }}>
              <p className="eyebrow">Contact</p>
              <h2>Let's build the next AI product.</h2>
              <p className="lead">
                Email is best. I am open to AI agent, Python, and fullstack roles.
              </p>
              <div className="contact-links">
                <a className="button button-solid" href="mailto:garysamuel16@gmail.com">
                  Email Gary
                </a>
                <a className="button button-ghost" href="https://linkedin.com/in/gary-samuel-3954261b2" target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              </div>
              <div className="contact-meta">
                <span>Based in California</span>
                <span>Remote friendly</span>
              </div>
            </div>

            <form
              className="contact-form reveal"
              style={{ '--delay': '120ms' }}
              method="POST"
              action="https://formspree.io/f/your_id"
            >
              <label>
                Name
                <input type="text" name="name" placeholder="Your name" required />
              </label>
              <label>
                Email
                <input type="email" name="email" placeholder="you@email.com" required />
              </label>
              <label>
                Message
                <textarea name="message" placeholder="Tell me about the project" rows="5" required />
              </label>
              <button className="button button-accent" type="submit">
                Send message
              </button>
              <p className="form-note">Replace the Formspree ID to enable this form.</p>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-content">
          <p>Copyright {new Date().getFullYear()} Gary Samuel. All rights reserved.</p>
          <a href="#home" className="link">Back to top</a>
        </div>
      </footer>
    </div>
  );
}
