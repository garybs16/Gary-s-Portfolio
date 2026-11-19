import { useEffect, useRef, useState } from 'react';

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Adds `is-visible` to every [data-reveal] element as it scrolls into view. */
export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('[data-reveal]');
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/** Which section is under the middle of the viewport. */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState('');
  const key = ids.join(',');
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    for (const id of key.split(',')) {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, [key]);
  return active;
}

/** Scroll position as 0–1 of the page, plus whether we've left the very top. */
export function useScroll() {
  const [state, setState] = useState({ scrolled: false, progress: 0 });
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setState({ scrolled: window.scrollY > 24, progress: max > 0 ? Math.min(window.scrollY / max, 1) : 0 });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
  return state;
}

/** Counts a number up from zero the first time it scrolls into view. */
export function useCountUp(value: number, decimals = 0) {
  const ref = useRef<HTMLSpanElement>(null);
  const format = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !('IntersectionObserver' in window)) return;
    el.textContent = format(0);
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const duration = 1600;
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          el.textContent = format(value * (1 - Math.pow(1 - p, 4)));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      el.textContent = format(value);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, decimals]);

  return { ref, text: format(value) };
}

/**
 * Cursor-tracking glow on every [data-spot] element. One delegated listener
 * for the whole page; it writes the pointer position as CSS variables and the
 * stylesheet draws the lit border. Mouse only.
 */
export function useSpotlight() {
  useEffect(() => {
    let current: HTMLElement | null = null;
    let raf = 0;
    let last: PointerEvent | null = null;

    const apply = () => {
      raf = 0;
      const e = last;
      if (!e) return;
      const el = (e.target as Element | null)?.closest?.<HTMLElement>('[data-spot]') ?? null;
      if (el !== current) {
        current?.classList.remove('is-spot');
        current = el;
        current?.classList.add('is-spot');
      }
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--sx', `${(e.clientX - r.left).toFixed(0)}px`);
      el.style.setProperty('--sy', `${(e.clientY - r.top).toFixed(0)}px`);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      last = e;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onLeave = () => { current?.classList.remove('is-spot'); current = null; };

    document.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, []);
}

/**
 * Scroll-linked progress for the experience timeline: the rail fills down to
 * the reading line (55% of the viewport) and each role lights up as the line
 * reaches it.
 */
export function useTimelineProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const wrap = ref.current;
    if (!wrap) return;
    const nodes = Array.from(wrap.querySelectorAll<HTMLElement>('.timeline-node'));
    const items = nodes.map((n) => n.closest('li'));
    if (nodes.length < 2) return;
    const still = prefersReducedMotion();
    let raf = 0;

    const update = () => {
      raf = 0;
      const box = wrap.getBoundingClientRect();
      const centers = nodes.map((n) => {
        const r = n.getBoundingClientRect();
        return r.top + r.height / 2;
      });
      const first = centers[0];
      const lastC = centers[centers.length - 1];
      const line = window.innerHeight * 0.55;
      const fill = still ? 1 : Math.min(Math.max((line - first) / (lastC - first), 0), 1);
      wrap.style.setProperty('--rail-top', `${(first - box.top).toFixed(1)}px`);
      wrap.style.setProperty('--rail-h', `${(lastC - first).toFixed(1)}px`);
      wrap.style.setProperty('--fill', fill.toFixed(4));
      centers.forEach((c, i) => items[i]?.classList.toggle('is-reached', still || c <= line + 1));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };

    wrap.classList.add('is-armed');
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    const ro = new ResizeObserver(onScroll);
    ro.observe(wrap);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      ro.disconnect();
    };
  }, []);
  return ref;
}
