import { lazy, Suspense, useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Copy, FileText, Github, Linkedin, Mail, Menu, X } from 'lucide-react';
import Tilt from './Tilt';
import { AgentViz, ProjectVisual } from './visuals';
import { useActiveSection, useCountUp, useReveal, useScroll } from './hooks';
import { experience, facts, featured, links, navigation, photo, projects, skills, stats, type Stat } from './data';

// three.js is large; load it after the text has painted.
const Galaxy = lazy(() => import('./Galaxy'));

const delay = (i: number) => ({ '--d': i }) as CSSProperties;

function External({ href, children, className, label }: { href: string; children: ReactNode; className?: string; label?: string }) {
  return (
    <a className={className} href={href} target="_blank" rel="noreferrer" aria-label={label}>
      {children}
    </a>
  );
}

/** Renders **highlighted** phrases from the content strings. */
function Rich({ text }: { text: string }) {
  return <>{text.split('**').map((part, i) => (i % 2 ? <strong key={i}>{part}</strong> : part))}</>;
}

function SectionHead({ index, label, title, children }: { index: string; label: string; title: ReactNode; children?: ReactNode }) {
  return (
    <header className="section-head" data-reveal>
      <p className="eyebrow"><span className="eyebrow-index">{index}</span>{label}</p>
      <h2 className="display">{title}</h2>
      {children && <p className="section-lede">{children}</p>}
    </header>
  );
}

function StatTile({ stat, index }: { stat: Stat; index: number }) {
  const { ref, text } = useCountUp(stat.value, stat.decimals);
  return (
    <li className="stat" data-reveal style={delay(index)}>
      <p className="stat-value">
        <span className="sr-only">{text}{stat.suffix}</span>
        <span aria-hidden="true"><span ref={ref}>{text}</span>{stat.suffix}</span>
      </p>
      <p className="stat-label">{stat.label}</p>
    </li>
  );
}

function Tags({ items }: { items: string[] }) {
  return <ul className="tags">{items.map((item) => <li key={item}>{item}</li>)}</ul>;
}

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(links.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${links.email}`;
    }
  };
  return (
    <button type="button" className="btn btn-ghost btn-icon" onClick={copy} aria-label={copied ? 'Email copied' : 'Copy email address'}>
      {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
      <span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
    </button>
  );
}

export default function App() {
  const { scrolled, progress } = useScroll();
  const active = useActiveSection(['home', ...navigation.map(([, id]) => id)]);
  const [menuOpen, setMenuOpen] = useState(false);
  useReveal();

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const headerClass = ['site-header', scrolled && 'is-scrolled', menuOpen && 'menu-open'].filter(Boolean).join(' ');

  return (
    <>
      <a className="skip-link" href="#work">Skip to content</a>
      <div className="starfield" aria-hidden="true" />

      <header className={headerClass} style={{ '--progress': progress } as CSSProperties}>
        <div className="container header-inner">
          <a href="#home" className="wordmark" onClick={() => setMenuOpen(false)}>
            <span className="monogram" aria-hidden="true">GS</span>
            Gary Samuel
          </a>
          <nav aria-label="Main" id="site-nav">
            {navigation.map(([label, id]) => (
              <a key={id} href={`#${id}`} className={active === id ? 'is-active' : undefined} aria-current={active === id ? 'true' : undefined} onClick={() => setMenuOpen(false)}>
                {label}
              </a>
            ))}
            <External href={links.resume} className="nav-resume">
              <FileText aria-hidden="true" /> Resume
            </External>
          </nav>
          <button type="button" className="menu-toggle" aria-expanded={menuOpen} aria-controls="site-nav" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen((o) => !o)}>
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
        <span className="progress" aria-hidden="true" />
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-sky" aria-hidden="true" />
          <Suspense fallback={null}>
            <Galaxy className="hero-canvas" />
          </Suspense>
          <div className="hero-scrim" aria-hidden="true" />

          <div className="container hero-content">
            <p className="hero-status">
              <span className="dot" aria-hidden="true" />
              Open to SWE internships &amp; new-grad roles
            </p>
            <h1>
              Gary <span className="h1-last">Samuel</span>
            </h1>
            <p className="hero-lede">
              Software engineer building <span className="grad">full-stack products and LLM agents</span>, from the live admissions platform I co-founded to production agent orchestration at UnstableML.
            </p>
            <p className="hero-sub">B.S. Computer Science &amp; Data Science minor · Cal State Fullerton · May 2027</p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#work">
                See my work <ArrowRight aria-hidden="true" />
              </a>
              <External className="btn btn-ghost" href={links.resume}>
                <FileText aria-hidden="true" /> Resume
              </External>
              <span className="hero-social">
                <External className="icon-link" href={links.github} label="GitHub"><Github aria-hidden="true" /></External>
                <External className="icon-link" href={links.linkedin} label="LinkedIn"><Linkedin aria-hidden="true" /></External>
                <a className="icon-link" href={`mailto:${links.email}`} aria-label="Email"><Mail aria-hidden="true" /></a>
              </span>
            </div>
          </div>

          <div className="container hero-foot">
            <p className="hero-caption">
              A 60,000-star spiral galaxy, rendered live in WebGL. A nod to my <External href={links.cosmosim}>N-body simulator</External>.
            </p>
            <a className="hero-scroll" href="#impact" aria-label="Scroll down">
              <ArrowDown aria-hidden="true" />
            </a>
          </div>
        </section>

        <section className="container impact" id="impact" aria-label="Impact at a glance">
          <ul className="stats">
            {stats.map((stat, i) => <StatTile key={stat.label} stat={stat} index={i} />)}
          </ul>
        </section>

        <section className="section container" id="work">
          <div className="aurora aurora-a" aria-hidden="true" />
          <SectionHead index="01" label="Work" title={<>Selected <span className="grad">work</span></>}>
            A live product I co-founded, plus the capstone, research and hackathon work around it.
          </SectionHead>

          <div data-reveal>
            <Tilt className="featured" max={3}>
              <article className="card card-featured">
                <External href={featured.href} className="browser" label={`Open ${featured.name}`}>
                  <span className="browser-bar" aria-hidden="true">
                    <span className="browser-dots"><i /><i /><i /></span>
                    <span className="browser-url">{featured.domain}</span>
                  </span>
                  <span className="browser-view">
                    <img src={featured.image} alt={`Homepage of ${featured.name}`} loading="lazy" />
                  </span>
                </External>
                <div className="card-text">
                  <p className="card-kicker">
                    <span className="badge badge-live"><span className="dot" aria-hidden="true" />Live</span>
                    {featured.role}
                  </p>
                  <h3>{featured.name}</h3>
                  <p>{featured.summary}</p>
                  <ul className="checks">
                    {featured.points.map((p) => <li key={p}><Check aria-hidden="true" />{p}</li>)}
                  </ul>
                  <Tags items={featured.stack} />
                  <External href={featured.href} className="btn btn-primary btn-sm">
                    Visit {featured.domain} <ArrowUpRight aria-hidden="true" />
                  </External>
                </div>
              </article>
            </Tilt>
          </div>

          <div className="project-grid">
            {projects.map((project, i) => (
              <div key={project.name} data-reveal style={delay(i % 2)}>
                <Tilt>
                  <article className="card card-project">
                    <div className={`card-visual card-visual-${project.visual}`}>
                      <ProjectVisual kind={project.visual} />
                    </div>
                    <div className="card-text">
                      <p className="card-kicker">
                        {project.status && <span className="badge badge-progress">{project.status}</span>}
                        {project.context}
                      </p>
                      <h3>
                        <External href={project.href} className="card-link">
                          {project.name}
                          <ArrowUpRight aria-hidden="true" />
                        </External>
                      </h3>
                      <p>{project.summary}</p>
                      <Tags items={project.stack} />
                    </div>
                  </article>
                </Tilt>
              </div>
            ))}
          </div>

          <p className="more" data-reveal>
            <External href={links.github} className="btn btn-ghost">
              <Github aria-hidden="true" /> More on GitHub <ArrowUpRight aria-hidden="true" />
            </External>
          </p>
        </section>

        <section className="section container" id="experience">
          <SectionHead index="02" label="Experience" title={<>Where I’ve <span className="grad">worked</span></>}>
            Founding, interning and running production systems, most recent first.
          </SectionHead>

          <ol className="timeline">
            {experience.map((item) => (
              <li key={item.role + item.company} className={item.current ? 'is-current' : undefined} data-reveal>
                <span className="timeline-node" aria-hidden="true" />
                <div className="timeline-meta">
                  <p className="period">{item.period}</p>
                  <p className="location">{item.location}</p>
                </div>
                <div className="timeline-body">
                  <h3>
                    {item.role} <span className="at">· {item.company}</span>
                  </h3>
                  <ul>
                    {item.points.map((point) => <li key={point}><Rich text={point} /></li>)}
                  </ul>
                  {item.visual === 'agent' && <AgentViz />}
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="section container" id="about">
          <div className="aurora aurora-b" aria-hidden="true" />
          <SectionHead index="03" label="About" title={<>A little <span className="grad">about me</span></>} />

          <div className="about">
            <figure className="portrait" data-reveal>
              <span className="portrait-ring">
                <img src={photo} alt="Portrait of Gary Samuel" loading="lazy" width={800} height={800} />
              </span>
            </figure>
            <div className="about-text" data-reveal style={delay(1)}>
              <p className="about-lead">
                I like building software people actually use, and I care about the unglamorous parts that make it hold up: validation, evals, runbooks, and pages that load fast.
              </p>
              <p>
                I’m the technical co-founder of First Step Healthcare Academy, where I architected and run the production platform behind its admissions and payments. At UnstableML I built LLM agent orchestration for real-time 3D scene and video generation, and before that I built Shopify integrations at Bimmer Plug. On the side I gravitate to scientific computing; the galaxy at the top of this page is a nod to my N-body simulator.
              </p>
              <dl className="facts">
                {facts.map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="toolkit">
            <h3 className="toolkit-title" data-reveal>Toolkit</h3>
            <div className="skill-grid">
              {skills.map(([group, list], i) => (
                <div key={group} className="skill-card" data-reveal style={delay(i)}>
                  <p className="skill-group">{group}</p>
                  <ul className="chips">{list.map((s) => <li key={s}>{s}</li>)}</ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container contact-wrap" id="contact">
          <div className="contact" data-reveal>
            <div className="contact-glow" aria-hidden="true" />
            <div className="orbit" aria-hidden="true">
              <div className="orbit-plane">
                <span className="orbit-ring"><i /></span>
                <span className="orbit-ring"><i /></span>
                <span className="orbit-ring"><i /></span>
              </div>
              <span className="orbit-core" />
            </div>
            <p className="eyebrow"><span className="eyebrow-index">04</span>Contact</p>
            <h2 className="display">
              Let’s build something <span className="grad">worth shipping.</span>
            </h2>
            <p className="contact-lede">
              I’m looking for software engineering internships and new-grad roles. If you’re hiring, or want to talk about any of the work above, email is the fastest way to reach me.
            </p>
            <div className="email-row">
              <a className="contact-email" href={`mailto:${links.email}`}>{links.email}</a>
              <CopyEmail />
            </div>
            <div className="contact-actions">
              <a className="btn btn-primary" href={`mailto:${links.email}`}>
                <Mail aria-hidden="true" /> Email me
              </a>
              <External className="btn btn-ghost" href={links.linkedin}><Linkedin aria-hidden="true" /> LinkedIn</External>
              <External className="btn btn-ghost" href={links.github}><Github aria-hidden="true" /> GitHub</External>
              <External className="btn btn-ghost" href={links.resume}><FileText aria-hidden="true" /> Resume</External>
            </div>
          </div>
        </section>
      </main>

      <footer className="container site-footer">
        <span>© {new Date().getFullYear()} Gary Samuel · Designed and built with React and Three.js</span>
        <External href={links.source}>Source on GitHub <ArrowUpRight aria-hidden="true" /></External>
      </footer>
    </>
  );
}
