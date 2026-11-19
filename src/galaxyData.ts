/*
 * Star data for the hero galaxy: positions, colours, sizes and twinkle
 * phases for three point clouds. Pure functions with no DOM access, so the
 * same code runs in a Web Worker (galaxy.worker.ts) or, as a fallback, on
 * the main thread.
 */

type Vec3 = [number, number, number];

export type Cloud = { positions: Float32Array; colors: Float32Array; sizes: Float32Array; phases: Float32Array; count: number };
export type Clouds = { dust: Cloud; stars: Cloud; halo: Cloud };

/** Hex sRGB to linear RGB, so colours blend the way light does. */
function linear(hex: string): Vec3 {
  const n = parseInt(hex.slice(1), 16);
  const ch = (v: number) => { const c = v / 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
  return [ch(n >> 16), ch((n >> 8) & 255), ch(n & 255)];
}

function hslToRgb(h: number, s: number, l: number): Vec3 {
  if (s === 0) return [l, l, l];
  const q = l <= 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const hue = (t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * 6 * (2 / 3 - t);
    return p;
  };
  return [hue(h + 1 / 3), hue(h), hue(h - 1 / 3)];
}

function shiftLightness([r, g, b]: Vec3, dl: number): Vec3 {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  const clamp = (v: number) => Math.min(1, Math.max(0, v));
  if (max === min) return hslToRgb(0, 0, clamp(l + dl));
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  const h = (max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4) / 6;
  return hslToRgb(h, s, clamp(l + dl));
}

const mix = (a: Vec3, b: Vec3, t: number): Vec3 => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function alloc(count: number): Cloud {
  return { positions: new Float32Array(count * 3), colors: new Float32Array(count * 3), sizes: new Float32Array(count), phases: new Float32Array(count), count };
}

/* Three logarithmic arms, a warm core fading to cool blue at the rim. */
function buildStars(count: number): Cloud {
  const out = alloc(count);
  const core = linear('#ffd9a8');
  const mid = linear('#f3f0ff');
  const edge = linear('#7fb4ff');
  const rand = seeded(1337);
  const gauss = () => (rand() + rand() + rand() - 1.5) * 0.82;

  for (let i = 0; i < count; i++) {
    const t = Math.pow(rand(), 0.6); // bias towards the centre
    const r = t * 6.4;
    const arm = Math.floor(rand() * 3);
    const theta = (arm / 3) * Math.PI * 2 + r * 1.35 + gauss() * 0.38 * (0.6 + t);
    const scatter = (1 - t) * 0.55 + 0.12;
    out.positions[i * 3] = Math.cos(theta) * r + gauss() * scatter;
    out.positions[i * 3 + 2] = Math.sin(theta) * r + gauss() * scatter;
    out.positions[i * 3 + 1] = gauss() * (0.42 * (1 - t) + 0.07);

    const base = t < 0.3 ? mix(core, mid, t / 0.3) : mix(mid, edge, (t - 0.3) / 0.7);
    out.colors.set(shiftLightness(base, (rand() - 0.5) * 0.08), i * 3);
    out.sizes[i] = rand() > 0.985 ? 2.8 + rand() * 2.2 : 0.75 + rand() * 1.2;
    out.phases[i] = rand() * Math.PI * 2;
  }
  return out;
}

/* Large, very faint sprites strung along the arms: reads as nebula dust. */
function buildDust(count: number): Cloud {
  const out = alloc(count);
  const palette = ['#4f63ff', '#8a63ff', '#3f8cff', '#6a4dff'].map(linear);
  const rand = seeded(90210);
  const gauss = () => (rand() + rand() + rand() - 1.5) * 0.82;

  for (let i = 0; i < count; i++) {
    const r = (0.18 + rand() * 0.82) * 6.4;
    const theta = (Math.floor(rand() * 3) / 3) * Math.PI * 2 + r * 1.35 + gauss() * 0.32;
    out.positions.set([Math.cos(theta) * r + gauss() * 0.4, gauss() * 0.14, Math.sin(theta) * r + gauss() * 0.4], i * 3);
    const c = palette[Math.floor(rand() * palette.length)];
    const k = 0.035 + rand() * 0.04;
    out.colors.set([c[0] * k, c[1] * k, c[2] * k], i * 3);
    out.sizes[i] = 20 + rand() * 30;
    out.phases[i] = rand() * Math.PI * 2;
  }
  return out;
}

/* A sparse halo of distant stars behind everything. */
function buildHalo(count: number): Cloud {
  const out = alloc(count);
  const rand = seeded(4242);
  for (let i = 0; i < count; i++) {
    const u = rand() * 2 - 1;
    const phi = rand() * Math.PI * 2;
    const rr = 22 + rand() * 30;
    const s = Math.sqrt(1 - u * u);
    out.positions.set([s * Math.cos(phi) * rr, u * rr, s * Math.sin(phi) * rr], i * 3);
    out.colors.set(hslToRgb(0.6, 0.3, 0.75 + rand() * 0.2), i * 3);
    out.sizes[i] = 1.2 + rand() * 1.6;
    out.phases[i] = rand() * Math.PI * 2;
  }
  return out;
}

export function buildClouds(small: boolean): Clouds {
  return {
    dust: buildDust(small ? 350 : 1100),
    stars: buildStars(small ? 18000 : 60000),
    halo: buildHalo(small ? 500 : 1400),
  };
}

/** Every underlying ArrayBuffer, for zero-copy transfer out of the worker. */
export function transferables(c: Clouds): ArrayBuffer[] {
  return [c.dust, c.stars, c.halo].flatMap((cl) => [cl.positions.buffer, cl.colors.buffer, cl.sizes.buffer, cl.phases.buffer] as ArrayBuffer[]);
}
