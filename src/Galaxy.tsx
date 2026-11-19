import { useEffect, useRef } from 'react';
import { buildClouds, type Clouds } from './galaxyData';

/*
 * A spiral galaxy of ~60k stars in raw WebGL: one shader program, three
 * point clouds (nebula dust, stars, distant halo), additive blending, and no
 * 3D library. Star data is generated in a Web Worker so the main thread stays
 * free; stars orbit with differential rotation in the vertex shader, so each
 * frame the CPU only updates a time uniform and the camera. The camera drifts
 * with the pointer and pulls back as the page scrolls.
 */

const VERT = `
precision highp float;
attribute vec3 aPosition;
attribute vec3 aColor;
attribute float aSize;
attribute float aPhase;
uniform mat4 uProjection;
uniform mat4 uView;
uniform mat4 uModel;
uniform float uTime;
uniform float uPixelRatio;
varying vec3 vColor;
varying float vTwinkle;

void main() {
  vColor = aColor;
  vec3 p = aPosition;

  // Differential rotation: inner stars orbit faster than outer ones.
  float r = length(p.xz);
  float a = uTime * 0.045 * (0.9 / (0.35 + r * 0.55));
  float c = cos(a);
  float s = sin(a);
  p.xz = mat2(c, -s, s, c) * p.xz;

  vec4 mv = uView * uModel * vec4(p, 1.0);
  gl_Position = uProjection * mv;
  vTwinkle = 0.75 + 0.25 * sin(uTime * 1.3 + aPhase);
  gl_PointSize = aSize * uPixelRatio * (34.0 / -mv.z) * vTwinkle;
}`;

const FRAG = `
precision mediump float;
varying vec3 vColor;
varying float vTwinkle;

void main() {
  float dist = length(gl_PointCoord - 0.5);
  if (dist > 0.5) discard;
  float core = 1.0 - smoothstep(0.0, 0.5, dist);
  float glow = core * core;
  gl_FragColor = vec4(vColor * (0.4 + glow), glow * vTwinkle);
}`;

type Vec3 = [number, number, number];

function perspective(fovY: number, aspect: number, near: number, far: number) {
  const f = 1 / Math.tan(fovY / 2);
  const nf = 1 / (near - far);
  return new Float32Array([f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, (far + near) * nf, -1, 0, 0, 2 * far * near * nf, 0]);
}

function lookAt(eye: Vec3, target: Vec3) {
  const norm = (v: Vec3): Vec3 => { const l = Math.hypot(...v) || 1; return [v[0] / l, v[1] / l, v[2] / l]; };
  const cross = (a: Vec3, b: Vec3): Vec3 => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const dot = (a: Vec3, b: Vec3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const z = norm([eye[0] - target[0], eye[1] - target[1], eye[2] - target[2]]);
  const x = norm(cross([0, 1, 0], z));
  const y = cross(z, x);
  return new Float32Array([x[0], y[0], z[0], 0, x[1], y[1], z[1], 0, x[2], y[2], z[2], 0, -dot(x, eye), -dot(y, eye), -dot(z, eye), 1]);
}

/** Translate, then tilt about the x axis. */
function model(tx: number, ty: number, tilt: number) {
  const c = Math.cos(tilt);
  const s = Math.sin(tilt);
  return new Float32Array([1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, tx, ty, 0, 1]);
}

type Gpu = {
  program: WebGLProgram;
  attribs: Record<'aPosition' | 'aColor' | 'aSize' | 'aPhase', number>;
  uniforms: Record<'uProjection' | 'uView' | 'uModel' | 'uTime' | 'uPixelRatio', WebGLUniformLocation | null>;
  buffers: { position: WebGLBuffer; color: WebGLBuffer; size: WebGLBuffer; phase: WebGLBuffer; count: number; model: Float32Array }[];
};

/** Starts rendering into the canvas; returns a function that stops it. */
function startRenderer(canvas: HTMLCanvasElement, clouds: Clouds, small: boolean, reduceMotion: boolean): () => void {
  const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
  const gl = canvas.getContext('webgl', { alpha: true, antialias: false, premultipliedAlpha: true, powerPreference: 'high-performance' });
  if (!gl) return () => {}; // No WebGL: the CSS gradient behind the canvas stays visible.

  // Keep the bright core clear of the headline on wide screens; on phones,
  // drop it into the open space below the buttons.
  const offset: [number, number] = small ? [0.4, -2.6] : [3.1, 0];
  const layers = [
    { data: clouds.dust, tilt: 0.12 },
    { data: clouds.stars, tilt: 0.12 },
    { data: clouds.halo, tilt: 0 },
  ];

  const setup = (): Gpu | null => {
    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(sh) ?? 'shader compile failed');
      return sh;
    };
    try {
      const program = gl.createProgram()!;
      gl.attachShader(program, compile(gl.VERTEX_SHADER, VERT));
      gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAG));
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) ?? 'link failed');

      const upload = (array: Float32Array) => {
        const b = gl.createBuffer()!;
        gl.bindBuffer(gl.ARRAY_BUFFER, b);
        gl.bufferData(gl.ARRAY_BUFFER, array, gl.STATIC_DRAW);
        return b;
      };

      gl.useProgram(program);
      gl.disable(gl.DEPTH_TEST);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
      gl.clearColor(0, 0, 0, 0);

      return {
        program,
        attribs: {
          aPosition: gl.getAttribLocation(program, 'aPosition'),
          aColor: gl.getAttribLocation(program, 'aColor'),
          aSize: gl.getAttribLocation(program, 'aSize'),
          aPhase: gl.getAttribLocation(program, 'aPhase'),
        },
        uniforms: {
          uProjection: gl.getUniformLocation(program, 'uProjection'),
          uView: gl.getUniformLocation(program, 'uView'),
          uModel: gl.getUniformLocation(program, 'uModel'),
          uTime: gl.getUniformLocation(program, 'uTime'),
          uPixelRatio: gl.getUniformLocation(program, 'uPixelRatio'),
        },
        buffers: layers.map(({ data, tilt }) => ({
          position: upload(data.positions),
          color: upload(data.colors),
          size: upload(data.sizes),
          phase: upload(data.phases),
          count: data.count,
          model: model(offset[0], offset[1], tilt),
        })),
      };
    } catch (err) {
      console.warn('Galaxy disabled:', err);
      return null;
    }
  };

  let gpu = setup();
  if (!gpu) return () => {};

  let projection = perspective((42 * Math.PI) / 180, 1, 0.1, 200);
  const resize = () => {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (!w || !h) return;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
    projection = perspective((42 * Math.PI) / 180, w / h, 0.1, 200);
  };
  resize();

  const pointer = { x: 0, y: 0 };
  const target = { x: 0, y: 0 };
  let scroll = Math.min(window.scrollY / window.innerHeight, 1.2);
  let visible = true;
  let lost = false;
  let frame = 0;
  const start = performance.now();

  const bind = (buffer: WebGLBuffer, loc: number, size: number) => {
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
  };

  const render = (time: number) => {
    if (!gpu || lost) return;
    pointer.x += (target.x - pointer.x) * 0.04;
    pointer.y += (target.y - pointer.y) * 0.04;
    const eye: Vec3 = [pointer.x * 1.4, 5.2 - pointer.y * 0.8 + scroll * 3.5, 10.5 + scroll * 7];
    const view = lookAt(eye, [0, -scroll * 1.2, 0]);

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(gpu.program);
    gl.uniformMatrix4fv(gpu.uniforms.uProjection, false, projection);
    gl.uniformMatrix4fv(gpu.uniforms.uView, false, view);
    gl.uniform1f(gpu.uniforms.uTime, time);
    gl.uniform1f(gpu.uniforms.uPixelRatio, dpr);
    for (const b of gpu.buffers) {
      gl.uniformMatrix4fv(gpu.uniforms.uModel, false, b.model);
      bind(b.position, gpu.attribs.aPosition, 3);
      bind(b.color, gpu.attribs.aColor, 3);
      bind(b.size, gpu.attribs.aSize, 1);
      bind(b.phase, gpu.attribs.aPhase, 1);
      gl.drawArrays(gl.POINTS, 0, b.count);
    }
  };

  const loop = () => {
    cancelAnimationFrame(frame);
    if (document.hidden || !visible || lost) return;
    render(reduceMotion ? 0 : (performance.now() - start) / 1000);
    if (!reduceMotion) frame = requestAnimationFrame(loop);
  };

  const onPointer = (e: PointerEvent) => {
    target.x = (e.clientX / window.innerWidth) * 2 - 1;
    target.y = (e.clientY / window.innerHeight) * 2 - 1;
  };
  const onScroll = () => {
    scroll = Math.min(window.scrollY / window.innerHeight, 1.2);
    if (reduceMotion) render(0);
  };
  const onVisibility = () => { if (!document.hidden) loop(); };
  const onLost = (e: Event) => { e.preventDefault(); lost = true; cancelAnimationFrame(frame); };
  const onRestored = () => { lost = false; gpu = setup(); resize(); loop(); };

  // Pause when the hero is off screen; restart when it scrolls back.
  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) loop();
  });
  io.observe(canvas);
  const ro = new ResizeObserver(() => { resize(); if (reduceMotion) render(0); });
  ro.observe(canvas);

  window.addEventListener('scroll', onScroll, { passive: true });
  document.addEventListener('visibilitychange', onVisibility);
  canvas.addEventListener('webglcontextlost', onLost);
  canvas.addEventListener('webglcontextrestored', onRestored);
  if (!reduceMotion) window.addEventListener('pointermove', onPointer, { passive: true });

  canvas.classList.add('is-ready');
  loop();

  return () => {
    cancelAnimationFrame(frame);
    io.disconnect();
    ro.disconnect();
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('pointermove', onPointer);
    document.removeEventListener('visibilitychange', onVisibility);
    canvas.removeEventListener('webglcontextlost', onLost);
    canvas.removeEventListener('webglcontextrestored', onRestored);
    if (gpu && !lost) {
      for (const b of gpu.buffers) [b.position, b.color, b.size, b.phase].forEach((buf) => gl.deleteBuffer(buf));
      gl.deleteProgram(gpu.program);
    }
  };
}

export default function Galaxy({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const small = window.matchMedia('(max-width: 760px)').matches;

    let disposed = false;
    let stop: (() => void) | null = null;
    let worker: Worker | null = null;
    const begin = (clouds: Clouds) => {
      if (!disposed) stop = startRenderer(canvas, clouds, small, reduceMotion);
    };

    try {
      worker = new Worker(new URL('./galaxy.worker.ts', import.meta.url), { type: 'module' });
      worker.onmessage = (e: MessageEvent<Clouds>) => {
        worker?.terminate();
        worker = null;
        begin(e.data);
      };
      worker.onerror = () => {
        worker?.terminate();
        worker = null;
        begin(buildClouds(small));
      };
      worker.postMessage({ small });
    } catch {
      begin(buildClouds(small)); // No module workers: build on the main thread.
    }

    return () => {
      disposed = true;
      worker?.terminate();
      stop?.();
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
