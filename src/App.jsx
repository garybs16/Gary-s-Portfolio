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
  { value: '38%', label: 'LCP improvement' },
  { value: '42ms', label: 'p95 chat latency' },
  { value: '100', label: 'Lighthouse a11y' },
  { value: '88%', label: 'Test coverage' },
];

const projects = [
  {
    title: 'Portfolio Website',
    tag: 'Web',
    description: 'Performance-tuned marketing site with accessible navigation and clean IA.',
    points: ['Image optimization and lazy loading', 'Keyboard-first UX with visible focus states'],
    image: '/IMG_8011.JPG',
    links: [
      { label: 'Live', href: 'https://www.missionkaizen.org/' },
      { label: 'Case study', href: '#case-portfolio' },
    ],
  },
  {
    title: 'Task Manager Web App',
    tag: 'Backend',
    description: 'Python CRUD app with deadlines, priorities, and a clean service layer.',
    points: ['Structured tests for core workflows', 'Role-based permissions and reminders'],
    image: '/taskimg.jpg',
    links: [
      { label: 'Code', href: 'https://github.com/garybs16/Python-Project-FULLSTACK-' },
      { label: 'Case study', href: '#case-taskapp' },
    ],
  },
  {
    title: 'Realtime Support Chat',
    tag: 'Web',
    description: 'Node + Socket.IO live chat for support with reliable routing.',
    points: ['Typing indicators and queue routing', 'Scaled to peak traffic with low latency'],
    image: '/guessing.jpg',
    links: [
      { label: 'Code', href: 'https://github.com/garybs16/BimmerPlug_Work' },
      { label: 'Case study', href: '#case-chat' },
    ],
  },
];

const caseStudies = [
  {
    id: 'case-portfolio',
    title: 'Mission Kaizen Marketing Site',
    summary: 'Rebuilt the marketing site with a focus on performance, scannability, and accessibility.',
    bullets: [
      'Trimmed CSS and optimized media to reduce LCP from 3.9s to 1.6s on 4G.',
      'Introduced an IA refresh with clear content hierarchy and consistent navigation.',
      'Improved Lighthouse accessibility to 100 with focus management and contrast fixes.',
    ],
    link: { label: 'Visit site', href: 'https://www.missionkaizen.org/' },
  },
  {
    id: 'case-taskapp',
    title: 'Task Manager Platform',
    summary: 'Built a CRUD system with deadlines, priorities, and service isolation for maintainability.',
    bullets: [
      'Separated domain logic from routes for easier testing and refactors.',
      'Added deadline reminders and audit logging for accountability.',
      'Expanded tests to cover priority edge cases and filtering.',
    ],
    link: { label: 'View code', href: 'https://github.com/garybs16/Python-Project-FULLSTACK-' },
  },
  {
    id: 'case-chat',
    title: 'Realtime Support Chat',
    summary: 'Delivered a Socket.IO chat platform with routing, presence, and observability.',
    bullets: [
      'Reduced time-to-first-response by 37% with routing automation.',
      'Added presence tracking and agent availability for smooth handoffs.',
      'Instrumented request logs and basic metrics for reliability.',
    ],
    link: { label: 'View code', href: 'https://github.com/garybs16/BimmerPlug_Work' },
  },
];

const skills = [
  {
    title: 'Languages',
    items: ['JavaScript/TypeScript', 'Python', 'C++', 'Java', 'SQL'],
  },
  {
    title: 'Frameworks',
    items: ['React', 'Node.js (Express)', 'Django/Flask', 'Vue/Angular'],
  },
  {
    title: 'Tools',
    items: ['Git/GitHub', 'REST APIs', 'WebSockets', 'Testing (PyTest, JUnit)', 'Docker (basics)'],
  },
];

const experience = [
  {
    role: 'Software Engineer (Contract)',
    company: 'Bimmer Plug',
    timeframe: 'Feb 2025 - Aug 2025',
    bullets: [
      'Shipped Node.js + Socket.IO chat with routing, presence, and typing indicators.',
      'Reduced time-to-first-response by 37% with automation and notifications.',
      'Added observability and rate limits; CI for lint, build, and tests.',
    ],
    link: 'https://github.com/garybs16/BimmerPlug_Work',
  },
  {
    role: 'Lead Project Developer',
    company: 'Mission Kaizen',
    timeframe: 'Mar 2023 - Jun 2024',
    bullets: [
      'Improved LCP from 4.2s to 2.3s with media optimization and CSS trimming.',
      'Implemented accessible navigation, dark mode, and mobile-first layout.',
      'Delivered a performance-driven design system for consistent pages.',
    ],
    link: 'https://www.missionkaizen.org/',
  },
  {
    role: 'Academic + Personal Projects',
    company: 'Independent',
    timeframe: '2023 - Present',
    bullets: [
      'AutoFix: AST + traceback analyzer that reduces test debug time by ~30%.',
      'Task Manager: service-based CRUD with deadlines, priorities, and tests.',
      'Compiler toolkit: educational lexing and symbol table tooling.',
    ],
    link: 'https://github.com/garybs16',
  },
];

const education = [
  {
    school: 'California State University, Fullerton',
    program: 'B.S. Computer Science',
    timeframe: 'Expected 2027',
    details: 'Coursework: Data Structures, Algorithms, Operating Systems, Databases, Networks.',
  },
  {
    school: 'Santa Ana College',
    program: 'A.S. Computer Science',
    timeframe: 'Completed 2023',
    details: 'Coursework: Programming Fundamentals, Object-Oriented Programming, Discrete Math.',
  },
];

const tickerItems = [
  'React',
  'Node.js',
  'Socket.IO',
  'TypeScript',
  'Python',
  'Performance',
  'Accessibility',
  'Testing',
  'Observability',
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
                I build fast, human-centered web apps that feel premium and ship reliably.
              </h1>
              <p className="lead">
                Performance, accessibility, and clean abstractions. Comfortable across the
                stack with JavaScript/TypeScript, Python, and C++.
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
                <span>Performance obsessed</span>
                <span>Accessible by default</span>
                <span>Product-minded</span>
              </div>
            </div>

            <div className="hero-visual reveal" style={{ '--delay': '120ms' }}>
              <div className="portrait-card">
                <div className="portrait-glow" />
                <img src="/IMG_4711.jpg" alt="Gary Samuel" />
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
                <h2>Work that ships and scales.</h2>
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
                <h2>How I think about outcomes.</h2>
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
                <h2>The stack I build with.</h2>
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
                <h2>Teams, roles, and impact.</h2>
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
                <h2>Foundations and focus.</h2>
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
              <h2>Let's build the next launch.</h2>
              <p className="lead">
                Email is best. I am open to internships, junior roles, and collaborative projects.
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
