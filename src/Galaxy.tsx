import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/*
 * A spiral galaxy of ~60k particles rendered as additive point sprites.
 * Colour runs from a warm core to cool arms, the way star temperature
 * reads in a real galaxy image. The camera drifts with the pointer and
 * pulls back slowly as the page scrolls.
 */

const vertexShader = /* glsl */ `
  attribute float aSize;
  attribute vec3 aColor;
  attribute float aPhase;
  uniform float uTime;
  uniform float uPixelRatio;
  varying vec3 vColor;
  varying float vTwinkle;

  void main() {
    vColor = aColor;
    vec3 p = position;

    // Differential rotation: inner stars orbit faster than outer ones.
    float r = length(p.xz);
    float speed = 0.9 / (0.35 + r * 0.55);
    float a = uTime * 0.045 * speed;
    float c = cos(a);
    float s = sin(a);
    p.xz = mat2(c, -s, s, c) * p.xz;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;

    vTwinkle = 0.75 + 0.25 * sin(uTime * 1.3 + aPhase);
    gl_PointSize = aSize * uPixelRatio * (34.0 / -mv.z) * vTwinkle;
  }
`;

const fragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vTwinkle;
  void main() {
    vec2 d = gl_PointCoord - 0.5;
    float dist = length(d);
    if (dist > 0.5) discard;
    float core = smoothstep(0.5, 0.0, dist);
    float glow = core * core;
    gl_FragColor = vec4(vColor * (0.4 + glow), glow * vTwinkle);
  }
`;

function buildGalaxy(count: number) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const phases = new Float32Array(count);

  const core = new THREE.Color('#ffd9a8');
  const mid = new THREE.Color('#f3f0ff');
  const edge = new THREE.Color('#7fb4ff');
  const tmp = new THREE.Color();

  const arms = 3;
  const armSpread = 0.38;
  const radius = 6.4;

  let seed = 1337;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  const gauss = () => (rand() + rand() + rand() - 1.5) * 0.82;

  for (let i = 0; i < count; i++) {
    const t = Math.pow(rand(), 0.6); // bias towards the centre
    const r = t * radius;
    const arm = Math.floor(rand() * arms);
    const theta = (arm / arms) * Math.PI * 2 + r * 1.35 + gauss() * armSpread * (0.6 + t);

    const scatter = (1 - t) * 0.55 + 0.12;
    const x = Math.cos(theta) * r + gauss() * scatter;
    const z = Math.sin(theta) * r + gauss() * scatter;
    const y = gauss() * (0.42 * (1 - t) + 0.07);

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    if (t < 0.3) tmp.copy(core).lerp(mid, t / 0.3);
    else tmp.copy(mid).lerp(edge, (t - 0.3) / 0.7);
    tmp.offsetHSL(0, 0, (rand() - 0.5) * 0.08);
    colors[i * 3] = tmp.r;
    colors[i * 3 + 1] = tmp.g;
    colors[i * 3 + 2] = tmp.b;

    const bright = rand();
    sizes[i] = bright > 0.985 ? 2.8 + rand() * 2.2 : 0.75 + rand() * 1.2;
    phases[i] = rand() * Math.PI * 2;
  }

  return { positions, colors, sizes, phases };
}

/* Large, very faint sprites strung along the arms: reads as nebula dust. */
function buildDust(count: number) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const phases = new Float32Array(count);
  const palette = ['#4f63ff', '#8a63ff', '#3f8cff', '#6a4dff'].map((c) => new THREE.Color(c));
  const tmp = new THREE.Color();

  let seed = 90210;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  const gauss = () => (rand() + rand() + rand() - 1.5) * 0.82;

  for (let i = 0; i < count; i++) {
    const t = 0.18 + rand() * 0.82;
    const r = t * 6.4;
    const arm = Math.floor(rand() * 3);
    const theta = (arm / 3) * Math.PI * 2 + r * 1.35 + gauss() * 0.32;
    positions[i * 3] = Math.cos(theta) * r + gauss() * 0.4;
    positions[i * 3 + 1] = gauss() * 0.14;
    positions[i * 3 + 2] = Math.sin(theta) * r + gauss() * 0.4;
    tmp.copy(palette[Math.floor(rand() * palette.length)]).multiplyScalar(0.035 + rand() * 0.04);
    colors[i * 3] = tmp.r;
    colors[i * 3 + 1] = tmp.g;
    colors[i * 3 + 2] = tmp.b;
    sizes[i] = 20 + rand() * 30;
    phases[i] = rand() * Math.PI * 2;
  }
  return { positions, colors, sizes, phases };
}

/* A sparse halo of distant stars behind everything. */
function buildHalo(count: number) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const phases = new Float32Array(count);
  const c = new THREE.Color();
  for (let i = 0; i < count; i++) {
    const u = Math.random() * 2 - 1;
    const phi = Math.random() * Math.PI * 2;
    const rr = 22 + Math.random() * 30;
    const s = Math.sqrt(1 - u * u);
    positions[i * 3] = s * Math.cos(phi) * rr;
    positions[i * 3 + 1] = u * rr;
    positions[i * 3 + 2] = s * Math.sin(phi) * rr;
    c.setHSL(0.6, 0.3, 0.75 + Math.random() * 0.2);
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
    sizes[i] = 1.2 + Math.random() * 1.6;
    phases[i] = Math.random() * Math.PI * 2;
  }
  return { positions, colors, sizes, phases };
}

function makePoints(data: ReturnType<typeof buildGalaxy>, uniforms: Record<string, THREE.IUniform>) {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(data.positions, 3));
  geometry.setAttribute('aColor', new THREE.BufferAttribute(data.colors, 3));
  geometry.setAttribute('aSize', new THREE.BufferAttribute(data.sizes, 1));
  geometry.setAttribute('aPhase', new THREE.BufferAttribute(data.phases, 1));
  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  return new THREE.Points(geometry, material);
}

export default function Galaxy({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const small = window.matchMedia('(max-width: 760px)').matches;
    const count = small ? 18000 : 60000;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: 'high-performance' });
    } catch {
      return; // No WebGL: the CSS fallback gradient stays visible.
    }
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    renderer.setPixelRatio(dpr);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 200);
    const basePos = new THREE.Vector3(0, 5.2, 10.5);
    camera.position.copy(basePos);
    camera.lookAt(0, 0, 0);

    const uniforms = { uTime: { value: 0 }, uPixelRatio: { value: dpr } };
    const galaxy = makePoints(buildGalaxy(count), uniforms);
    const halo = makePoints(buildHalo(small ? 500 : 1400), uniforms);
    const dust = makePoints(buildDust(small ? 350 : 1100), uniforms);
    galaxy.rotation.x = 0.12;
    dust.rotation.x = 0.12;
    scene.add(dust, galaxy, halo);
    // Keep the bright core clear of the headline on wide screens.
    // On phones, drop the core into the open space below the buttons.
    scene.position.x = small ? 0.4 : 3.1;
    scene.position.y = small ? -2.6 : 0;

    const pointer = new THREE.Vector2(0, 0);
    const target = new THREE.Vector2(0, 0);
    let scroll = 0;
    let visible = true;
    let frame = 0;
    const clock = new THREE.Clock();

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = canvas;
      if (w === 0 || h === 0) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();

    const onPointer = (e: PointerEvent) => {
      target.set((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1);
    };
    const onScroll = () => {
      scroll = Math.min(window.scrollY / window.innerHeight, 1.2);
    };
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: 0 });
    io.observe(canvas);
    const onVisibility = () => { if (!document.hidden && visible) loop(); };

    const render = () => {
      pointer.lerp(target, 0.04);
      camera.position.x = basePos.x + pointer.x * 1.4;
      camera.position.y = basePos.y - pointer.y * 0.8 + scroll * 3.5;
      camera.position.z = basePos.z + scroll * 7;
      camera.lookAt(0, -scroll * 1.2, 0);
      renderer.render(scene, camera);
    };

    const loop = () => {
      cancelAnimationFrame(frame);
      if (document.hidden || !visible) return;
      uniforms.uTime.value = reduceMotion ? 0 : clock.getElapsedTime();
      render();
      if (!reduceMotion) frame = requestAnimationFrame(loop);
    };

    const ro = new ResizeObserver(() => { resize(); if (reduceMotion) render(); });
    ro.observe(canvas);
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    if (!reduceMotion) window.addEventListener('pointermove', onPointer, { passive: true });

    // Restart the loop when the hero scrolls back into view.
    const io2 = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) loop(); }, { threshold: 0 });
    io2.observe(canvas);

    loop();

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      io2.disconnect();
      ro.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', onPointer);
      document.removeEventListener('visibilitychange', onVisibility);
      for (const points of [galaxy, halo, dust]) {
        points.geometry.dispose();
        (points.material as THREE.Material).dispose();
      }
      renderer.dispose();
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
