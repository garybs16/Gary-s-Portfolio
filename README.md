# Gary Samuel — Portfolio

**Live:** https://garybs16.github.io/Gary-s-Portfolio/

Personal portfolio for Gary Samuel, a software engineer and CS + Data Science student at Cal State Fullerton.

## Highlights

- **Live WebGL galaxy hero.** A 60,000-particle spiral galaxy with differential rotation and nebula dust, written as custom Three.js shaders. It nods to my [N-body simulator](https://github.com/garybs16/cosmosim-lambdaCDM) and is lazy-loaded so text paints first.
- **Generative project visuals.** Each project card draws an SVG of what the project does: an anomaly spike for BridgeWatch, PCA clusters for the gene-expression pipeline, floating spatial panels for the Vision Pro reading assistant, and a Barnes-Hut quadtree for CosmoSim. The UnstableML role shows a prompt resolving into agent function calls.
- **Motion with restraint.** Scroll reveals, count-up impact numbers, pointer-tracking 3D tilt cards, and an active-section nav. All of it is disabled under `prefers-reduced-motion`.
- **Responsive and accessible.** Mobile menu, skip link, keyboard focus styles, and labelled visuals.

## Stack

React 18 · TypeScript · Vite · Three.js · hand-written CSS · lucide-react icons

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # type-check + production build to dist/
npm run preview  # serve the production build
```

Content (projects, experience, skills) lives in [`src/data.ts`](src/data.ts) and mirrors [`public/resume_gary.pdf`](public/resume_gary.pdf). When the resume changes, replace the PDF and update `data.ts` to match.

## Deploy

Pushing to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds the site and publishes `dist/` to GitHub Pages.
