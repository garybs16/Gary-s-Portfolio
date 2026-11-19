/*
 * Small generative illustrations for the project cards. Each one is a
 * deterministic SVG computed once at module load, drawn to echo what the
 * project actually does rather than a stock image.
 */
import type { CSSProperties } from 'react';
import type { Project } from './data';

function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}
const gaussian = (r: () => number) => (r() + r() + r() + r() - 2) / 1.15;
const f = (n: number) => n.toFixed(1);

/* BridgeWatch: two days of hourly vault outflow, a learned normal band,
 * and the moment withdrawals spike far above it. */
const bridge = (() => {
  const r = rng(42);
  const n = 48;
  const x = (i: number) => 14 + i * (372 / (n - 1));
  const y = (v: number) => 150 - v * 0.8;
  const base = (i: number) => 58 + 22 * Math.sin((2 * Math.PI * ((i % 24) - 8)) / 24);
  const spike: Record<number, number> = { 40: 104, 41: 150, 42: 156, 43: 118, 44: 82 };
  const values = Array.from({ length: n }, (_, i) => spike[i] ?? base(i) + gaussian(r) * 6);

  const line = values.map((v, i) => `${i ? 'L' : 'M'}${f(x(i))} ${f(y(v))}`).join(' ');
  const hot = values.slice(39, 46).map((v, k) => `${k ? 'L' : 'M'}${f(x(39 + k))} ${f(y(v))}`).join(' ');
  const upper = Array.from({ length: n }, (_, i) => `${f(x(i))} ${f(y(base(i) + 17))}`);
  const lower = Array.from({ length: n }, (_, i) => `${f(x(i))} ${f(y(base(i) - 17))}`).reverse();
  const band = `M${upper.join(' L')} L${lower.join(' L')} Z`;
  const threshold = Array.from({ length: n }, (_, i) => `${i ? 'L' : 'M'}${f(x(i))} ${f(y(base(i) + 36))}`).join(' ');
  return { line, hot, band, threshold, peak: { x: x(42), y: y(values[42]) }, ticks: [0, 12, 24, 36].map((i) => ({ x: x(i), label: i % 24 ? '12:00' : '00:00' })) };
})();

function BridgeViz() {
  return (
    <svg viewBox="0 0 400 175" className="viz" role="img" aria-label="Chart of hourly bridge vault outflow following a daily rhythm inside a learned normal band, then spiking far above the alert threshold.">
      <defs>
        <linearGradient id="bw-fade" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#ff6b81" stopOpacity="0.35" />
          <stop offset="1" stopColor="#ff6b81" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[30, 60, 90, 120].map((gy) => <line key={gy} x1="14" x2="386" y1={gy} y2={gy} className="viz-grid" />)}
      <path d={bridge.band} className="viz-band" />
      <path d={bridge.threshold} className="viz-threshold" />
      <path d={bridge.line} className="viz-line viz-draw" pathLength={1} />
      <path d={`${bridge.hot} L${f(bridge.peak.x + 26)} 150 L${f(bridge.peak.x - 26)} 150 Z`} fill="url(#bw-fade)" className="viz-fade-in" />
      <path d={bridge.hot} className="viz-line viz-line-hot viz-draw viz-draw-late" pathLength={1} />
      <g className="viz-alert" transform={`translate(${f(bridge.peak.x)} ${f(bridge.peak.y)})`}>
        <circle r="10" className="viz-pulse" />
        <circle r="3.5" className="viz-peak" />
      </g>
      <g className="viz-fade-in viz-label" transform={`translate(${f(bridge.peak.x - 30)} ${f(bridge.peak.y + 4)})`}>
        <rect x="-178" y="-11" width="178" height="22" rx="6" />
        <text x="-168" y="4">ALERT · outflow ≫ normal</text>
      </g>
      {bridge.ticks.map((t, i) => <text key={i} x={t.x} y="168" className="viz-tick">{t.label}</text>)}
    </svg>
  );
}

/* CosmoSim: particles bucketed by a Barnes-Hut quadtree. */
const quadtree = (() => {
  const r = rng(7);
  const W = 400;
  const H = 175;
  const pts: { x: number; y: number; m: number }[] = [];
  const clumps: [number, number, number, number][] = [[150, 84, 46, 80], [292, 106, 28, 38], [86, 145, 14, 12], [330, 34, 11, 8]];
  for (const [cx, cy, s, count] of clumps) {
    for (let i = 0; i < count; i++) {
      const a = r() * Math.PI * 2;
      const d = Math.pow(r(), 1.7) * s;
      pts.push({ x: cx + Math.cos(a) * d * 1.35, y: cy + Math.sin(a) * d * 0.85, m: r() });
    }
  }
  for (let i = 0; i < 18; i++) pts.push({ x: 8 + r() * (W - 16), y: 8 + r() * (H - 16), m: r() * 0.5 });

  const lines: { d: string; depth: number }[] = [];
  const split = (x: number, y: number, w: number, h: number, list: typeof pts, depth: number) => {
    if (list.length <= 1 || depth > 6) return;
    const mx = x + w / 2;
    const my = y + h / 2;
    lines.push({ d: `M${f(mx)} ${f(y)} V${f(y + h)} M${f(x)} ${f(my)} H${f(x + w)}`, depth });
    const quads: [number, number][] = [[x, y], [mx, y], [x, my], [mx, my]];
    for (const [qx, qy] of quads) {
      split(qx, qy, w / 2, h / 2, list.filter((p) => p.x >= qx && p.x < qx + w / 2 && p.y >= qy && p.y < qy + h / 2), depth + 1);
    }
  };
  split(0, 0, W, H, pts, 0);
  return { pts, lines };
})();

function QuadtreeViz() {
  return (
    <svg viewBox="0 0 400 175" className="viz" role="img" aria-label="Particles clustered into small galaxies, partitioned by a Barnes-Hut quadtree that subdivides more finely where particles are dense.">
      <defs>
        <radialGradient id="qt-glow">
          <stop offset="0" stopColor="#ffcf99" stopOpacity="0.45" />
          <stop offset="1" stopColor="#ffcf99" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="150" cy="84" rx="90" ry="52" fill="url(#qt-glow)" />
      <ellipse cx="292" cy="106" rx="46" ry="28" fill="url(#qt-glow)" opacity="0.7" />
      <rect x="0.5" y="0.5" width="399" height="174" className="viz-qt" style={{ opacity: 0.5 }} />
      {quadtree.lines.map((l, i) => (
        <path key={i} d={l.d} className="viz-qt viz-qt-line" strokeOpacity={Math.max(0.16, 0.7 - l.depth * 0.09)} style={{ ['--i' as string]: l.depth }} />
      ))}
      {quadtree.pts.map((p, i) => (
        <circle key={i} cx={f(p.x)} cy={f(p.y)} r={f(0.8 + p.m * 1.5)} className={p.m > 0.92 ? 'viz-star viz-star-bright' : 'viz-star'} />
      ))}
    </svg>
  );
}

/* Gene expression: cells projected onto two principal components,
 * coloured by cluster. */
const clusters = (() => {
  const r = rng(2024);
  const groups: [number, number, number, number, number, string][] = [
    [96, 50, 26, 11, 0.5, '#8ec5ff'],
    [170, 116, 30, 13, -0.4, '#b9a6ff'],
    [248, 56, 24, 13, 0.9, '#ffcf99'],
    [326, 118, 26, 11, 0.3, '#6ee7b7'],
    [72, 124, 18, 10, -0.8, '#f9a8d4'],
    [340, 42, 18, 10, -0.2, '#67e8f9'],
  ];
  const dots: { x: number; y: number; c: string; i: number }[] = [];
  let k = 0;
  for (const [cx, cy, sx, sy, rot, c] of groups) {
    for (let i = 0; i < 34; i++) {
      const gx = gaussian(r) * sx;
      const gy = gaussian(r) * sy;
      dots.push({ x: cx + gx * Math.cos(rot) - gy * Math.sin(rot), y: cy + gx * Math.sin(rot) + gy * Math.cos(rot), c, i: k++ });
    }
  }
  return dots.sort(() => r() - 0.5);
})();

function ClusterViz() {
  return (
    <svg viewBox="0 0 400 175" className="viz" role="img" aria-label="Scatter plot of cells on the first two principal components, forming six coloured clusters.">
      <path d="M24 6 V150 H392" className="viz-axis" />
      <text x="392" y="166" className="viz-tick" textAnchor="end">PC 1</text>
      <text x="12" y="8" className="viz-tick" transform="rotate(-90 12 8)" textAnchor="end">PC 2</text>
      {clusters.map((d) => (
        <circle key={d.i} cx={f(d.x)} cy={f(d.y)} r="2.4" fill={d.c} className="viz-dot" style={{ ['--i' as string]: d.i % 40 }} />
      ))}
    </svg>
  );
}

/* Vision Pro: a parsed PDF page becomes a floating text panel over a
 * spatial floor grid; the gazed-at line lights up, and a summary panel
 * narrates alongside. */
const spatial = (() => {
  const top = 122;
  const spread = (t: number) => 16 + t * 46; // radial line spacing from horizon (t=0) to bottom (t=1)
  const radial = Array.from({ length: 15 }, (_, k) => k - 7).map((i) => `M${f(200 + i * spread(0))} ${top} L${f(200 + i * spread(1))} 175`);
  const across = [125, 130, 138, 150, 168].map((y) => {
    const half = 7 * spread((y - top) / 53);
    return `M${f(200 - half)} ${y} H${f(200 + half)}`;
  });
  const main = [118, 96, 124, 132, 104, 120, 70];
  const ghost = [40, 34, 42, 30, 38, 34, 24];
  const wave = [4, 8, 12, 7, 10, 14, 9, 6, 11, 7, 5, 3];
  return { floor: [...radial, ...across].join(' '), main, ghost, wave };
})();

function SpatialViz() {
  const hot = 3;
  const lineY = (k: number) => 32 + k * 9.5;
  return (
    <svg viewBox="0 0 400 175" className="viz" role="img" aria-label="A PDF page parsed into a floating 3D text panel above a spatial grid. The line being looked at is highlighted, and a summary panel narrates beside it.">
      <defs>
        <linearGradient id="sp-floor" gradientUnits="userSpaceOnUse" x1="0" y1="122" x2="0" y2="175">
          <stop offset="0" stopColor="#8ec5ff" stopOpacity="0" />
          <stop offset="1" stopColor="#8ec5ff" stopOpacity="0.45" />
        </linearGradient>
      </defs>
      <path d={spatial.floor} stroke="url(#sp-floor)" strokeWidth="0.75" fill="none" />

      <g transform="matrix(1 0.1 0 1 0 -4)" className="viz-seq" style={{ ['--i' as string]: 0 }} opacity="0.6">
        <rect x="40" y="30" width="56" height="74" rx="4" className="viz-panel-ghost" />
        {spatial.ghost.map((w, k) => <rect key={k} x="47" y={40 + k * 8} width={w} height="2.4" rx="1.2" className="viz-text-line" />)}
      </g>
      <path d="M100 70 C110 70 108 62 118 62" className="viz-threshold viz-seq" style={{ ['--i' as string]: 1 }} />

      <g transform="matrix(1 0.06 0 1 0 -10)">
        <rect x="118" y="14" width="152" height="100" rx="7" className="viz-panel viz-seq" style={{ ['--i' as string]: 1 }} />
        <rect x="130" y="22" width="64" height="4" rx="2" className="viz-text-title viz-seq" style={{ ['--i' as string]: 2 }} />
        <rect x="126" y={lineY(hot) - 3} width={spatial.main[hot] + 8} height="9" rx="3" className="viz-gaze-glow viz-fade-in" />
        {spatial.main.map((w, k) => (
          <rect key={k} x="130" y={lineY(k)} width={w} height="3.2" rx="1.6" className={`viz-seq ${k === hot ? 'viz-text-hot' : 'viz-text-line'}`} style={{ ['--i' as string]: k + 3 }} />
        ))}
        <g className="viz-alert" transform={`translate(${130 + spatial.main[hot] - 14} ${lineY(hot) + 1.6})`}>
          <circle r="8" className="viz-pulse viz-pulse-warm" />
          <circle r="5" className="viz-reticle" />
          <circle r="1.4" className="viz-reticle-dot" />
        </g>
      </g>

      <g transform="matrix(1 -0.07 0 1 0 22)" className="viz-seq" style={{ ['--i' as string]: 6 }}>
        <rect x="284" y="34" width="88" height="60" rx="6" className="viz-panel viz-panel-alt" />
        <text x="292" y="45" className="viz-tiny">SUMMARY</text>
        {[66, 58, 44].map((w, k) => <rect key={k} x="292" y={52 + k * 7} width={w} height="2.6" rx="1.3" className="viz-text-alt" />)}
        {spatial.wave.map((h, j) => (
          <rect key={j} x={292 + j * 6} y={83 - h / 2} width="3" height={h} rx="1.5" className="viz-wave" style={{ ['--i' as string]: j }} />
        ))}
      </g>
    </svg>
  );
}

/* UnstableML: a vague prompt resolved into deterministic tool calls,
 * checked by the evaluation harness. */
/*
 * A replayed agent session. Lines appear on a timeline when the case study
 * scrolls into view; typed lines reveal one character per step (--n is the
 * character count, --at the start time in ms).
 */
const line = (at: number, n?: number) => ({ '--at': `${at}ms`, ...(n ? { '--n': n } : {}) }) as CSSProperties;

export function AgentViz({ className = '' }: { className?: string }) {
  return (
    <div
      className={`term ${className}`}
      role="img"
      aria-label="A replayed agent session: the prompt 'orbit the car, then dolly in' is parsed by a LangGraph agent into two deterministic camera calls, orbit and dolly. Running the evaluation suite across orbit, follow, dolly, pan and tracking shots reports 95%+ task success."
    >
      <div className="term-bar" aria-hidden="true">
        <span className="browser-dots"><i /><i /><i /></span>
        <span className="term-title">camera-agent — zsh</span>
      </div>
      <div className="viz-terminal term-body" aria-hidden="true">
        <p className="t-type" style={line(300, 32)}><span className="t-prompt">❯</span> "orbit the car, then dolly in"</p>
        <p className="t-dim" style={line(1500)}>  langgraph  intent → plan → tool calls</p>
        <p style={line(2000)}><span className="t-accent">→</span> <span className="t-file">orbit</span>(target="car", speed=0.25)</p>
        <p style={line(2250)}><span className="t-accent">→</span> <span className="t-file">dolly</span>(target="car", dist=-2.0)</p>
        <p style={line(2600)}><span className="t-good">✓</span> 2 deterministic calls · scene updated</p>
        <p className="t-type" style={line(3300, 16)}><span className="t-prompt">❯</span> run eval-suite</p>
        <p className="t-dim" style={line(4100)}>  shots  orbit · follow · dolly · pan · tracking</p>
        <p style={line(4700)}><span className="t-good">✓</span> <span className="t-good">95%+</span> task success<span className="t-caret" /></p>
      </div>
    </div>
  );
}

export function ProjectVisual({ kind }: { kind: Project['visual'] }) {
  switch (kind) {
    case 'bridge': return <BridgeViz />;
    case 'quadtree': return <QuadtreeViz />;
    case 'clusters': return <ClusterViz />;
    case 'spatial': return <SpatialViz />;
  }
}
