# Gary Samuel — Portfolio

**Live:** https://garybs16.github.io/Gary-s-Portfolio/

Personal portfolio for Gary Samuel, a software engineer and CS + Data Science student at Cal State Fullerton.

## What's in it

- **Engineering case studies.** First Step Healthcare Academy, UnstableML and BridgeWatch, each covering the problem, an architecture diagram, the decisions and trade-offs, and measured results. Diagrams are data-driven SVG (`src/architecture.ts`) with packets animated along each connection.
- **A 60,000-star WebGL galaxy, no 3D library.** One shader program and three point clouds, with differential rotation computed on the GPU. Star data is generated in a Web Worker and transferred without copying, so the main thread only uploads buffers. It falls back to the main thread if module workers are unavailable, and to a CSS gradient without WebGL.
- **Generative project visuals.** Each card draws what the project does: an anomaly spike for BridgeWatch, PCA clusters for the gene-expression pipeline, floating spatial panels for the Vision Pro assistant, and a Barnes-Hut quadtree for CosmoSim.
- **Motion with restraint.** Scroll reveals, count-up numbers, pointer-tracking tilt cards and an active-section nav. All of it is switched off under `prefers-reduced-motion`.

## Performance

Measured in headless Chrome on the production build (mobile: 390 × 844, 4× CPU throttling, ~1.6 Mbps):

| | Mobile | Desktop |
|---|---|---|
| First Contentful Paint | ~1.7 s | ~0.6 s |
| Largest Contentful Paint | ~2.0 s | ~0.7 s |
| Cumulative Layout Shift | 0 | < 0.001 |
| Total page weight | 238 KB | 238 KB |

Runtime dependencies: React and lucide-react. JavaScript is 66 KB gzipped.

## Stack

React 18 · TypeScript · Vite · raw WebGL · hand-written CSS

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # type-check + production build to dist/
npm run preview  # serve the production build
```

Content (case studies, projects, experience, skills) lives in [`src/data.ts`](src/data.ts) and mirrors [`public/resume_gary.pdf`](public/resume_gary.pdf). When the resume changes, replace the PDF and update `data.ts` to match.

## Deploy

Pushing to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds the site and publishes `dist/` to GitHub Pages.
