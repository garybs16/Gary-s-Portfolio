import type { DiagramSpec } from './Diagram';

/*
 * Architecture diagrams for the case studies. Every box is a real component:
 * First Step from its repository and deployment guide, BridgeWatch from its
 * design document, UnstableML at the level of detail on the resume.
 * Node height = 60 + 16 × (lines − 1).
 */

export const firstStepArchitecture: DiagramSpec = {
  width: 980,
  height: 360,
  summary:
    'Students use a React and Vite single-page app and staff use an MFA-protected admin dashboard. Both reach an nginx reverse proxy on AWS Lightsail, which forwards to an Express API with validation, rate limiting, signed sessions, PBKDF2 hashing and an audit log. The API stores cohorts, seat holds, enrollments, payments and waitlists in SQLite with encrypted, automated backups. It creates Stripe Checkout sessions for full tuition or payment plans, and Stripe confirms payment with a signed webhook. GitHub Actions runs seven release gates, deploys, and runs a production health check.',
  groups: [{ x: 214, y: 18, w: 572, h: 326, label: 'AWS LIGHTSAIL · SYSTEMD SERVICE' }],
  nodes: [
    { x: 16, y: 44, w: 168, h: 76, title: 'Students', lines: ['React + Vite SPA', 'programs · enrollment'] },
    { x: 16, y: 148, w: 168, h: 92, title: 'Staff', lines: ['Admin dashboard', 'TOTP MFA · CSRF', 'audit-logged actions'] },
    { x: 16, y: 268, w: 168, h: 76, title: 'GitHub Actions', lines: ['verify: 7 release gates', 'deploy · health check'], tone: 'quality' },
    { x: 238, y: 132, w: 126, h: 60, title: 'nginx', lines: ['reverse proxy'] },
    { x: 398, y: 86, w: 196, h: 140, title: 'Express API', lines: ['zod-validated routes', 'rate limiting · helmet', 'signed HttpOnly sessions', 'PBKDF2 password hashes', 'audit log'], tone: 'core' },
    { x: 398, y: 262, w: 196, h: 60, title: 'Health checks', lines: ['post-deploy · runbooks'], tone: 'quality' },
    { x: 628, y: 52, w: 150, h: 92, title: 'SQLite', lines: ['cohorts · seat holds', 'enrollments', 'payments · waitlist'] },
    { x: 628, y: 186, w: 150, h: 60, title: 'Backups', lines: ['encrypted · automated'] },
    { x: 816, y: 86, w: 150, h: 140, title: 'Stripe', lines: ['Checkout', 'full tuition, or', 'weekly / biweekly', 'payment plans'], tone: 'external' },
  ],
  edges: [
    { d: 'M184 82 C211 82 211 150 238 150', flow: true, speed: 1.6 },
    { d: 'M184 194 C211 194 211 176 238 176', flow: true, speed: 1.6 },
    { d: 'M364 162 H398', flow: true, speed: 0.9 },
    { d: 'M594 120 C611 120 611 98 628 98', flow: true, speed: 1.1 },
    { d: 'M703 144 V186', flow: true, speed: 1.2 },
    { d: 'M530 86 V40 H891 V86', label: 'checkout session', at: [703, 33], flow: true, speed: 3 },
    { d: 'M891 226 V300 H611 V206 H594', label: 'signed webhook', at: [760, 293], flow: true, speed: 3 },
    { d: 'M184 306 C291 306 291 292 398 292', label: 'deploy', at: [291, 286], flow: true, speed: 2 },
  ],
};

export const unstableMlArchitecture: DiagramSpec = {
  width: 980,
  height: 330,
  summary:
    'A creative prompt such as "orbit the car, then dolly in" goes to a LangGraph agent built in Python with LangChain and the Claude and OpenAI APIs. The agent turns intent into deterministic function calls such as orbit, follow, dolly, pan and tracking, plus object motion and scene setup, which drive real-time 3D scene and AI video generation. An evaluation harness replays a fixed set of test prompts through the agent and scores the calls, reaching 95%+ task success.',
  nodes: [
    { x: 16, y: 98, w: 180, h: 76, title: 'Creative prompt', lines: ['“orbit the car,', 'then dolly in”'] },
    { x: 246, y: 70, w: 214, h: 124, title: 'LangGraph agent', lines: ['Python · LangChain', 'Claude + OpenAI APIs', 'intent → structured', 'tool calls'], tone: 'core' },
    { x: 510, y: 70, w: 214, h: 124, title: 'Deterministic calls', lines: ['orbit() · follow()', 'dolly() · pan()', 'tracking()', 'object motion · scenes'] },
    { x: 774, y: 70, w: 190, h: 124, title: '3D scene + AI video', lines: ['camera paths', 'object motion', 'scene setup', 'real-time generation'], tone: 'external' },
    { x: 510, y: 238, w: 214, h: 76, title: 'Eval harness', lines: ['repeatable prompts + tests', '95%+ task success'], tone: 'quality' },
  ],
  edges: [
    { d: 'M196 136 H246', flow: true, speed: 1.1 },
    { d: 'M460 132 H510', flow: true, speed: 1.1 },
    { d: 'M724 132 H774', flow: true, speed: 1.1 },
    { d: 'M617 194 V238', label: 'scored', at: [626, 220], anchor: 'start', flow: true, speed: 1 },
    { d: 'M510 276 H353 V194', label: 'replays test prompts', at: [432, 268], flow: true, speed: 1.8 },
  ],
};

export const bridgeWatchArchitecture: DiagramSpec = {
  width: 980,
  height: 350,
  summary:
    'Confirmed vault transfers from Ethereum JSON-RPC nodes, priced in US dollars at ingest, flow into a pure-Python detector; a SonarX stream is planned as a drop-in source. The detector keeps an hour-of-day baseline, the median and MAD of 10-minute outflow over 7 days, and checks five rules with cooldowns and incident grouping. Checked transfers and alerts are committed to SQLite. A notifier thread delivers one message per incident to Slack or a webhook, at least once with exponential backoff. A FastAPI service feeds the operator dashboard. Replay and evaluation tools run their own detector over real past exploits and normal traffic.',
  nodes: [
    { x: 16, y: 48, w: 184, h: 92, title: 'Ethereum nodes', lines: ['JSON-RPC · confirmed', 'vault transfers', 'USD-priced at ingest'], tone: 'external' },
    { x: 16, y: 170, w: 184, h: 60, title: 'SonarX stream', lines: ['planned · same records'], tone: 'planned' },
    { x: 250, y: 48, w: 214, h: 156, title: 'Detector', lines: ['hour-of-day baseline', 'median + MAD · 7 days', '10-minute windows', '5 rules · cooldowns', 'incident grouping', 'pure Python, no I/O'], tone: 'core' },
    { x: 514, y: 48, w: 166, h: 76, title: 'SQLite store', lines: ['transfers · alerts', 'cursor · migrations'] },
    { x: 514, y: 168, w: 166, h: 92, title: 'Notifier', lines: ['own thread', 'at-least-once delivery', 'exponential backoff'] },
    { x: 730, y: 48, w: 112, h: 76, title: 'FastAPI', lines: ['state · alerts', 'replay results'] },
    { x: 862, y: 48, w: 104, h: 76, title: 'Dashboard', lines: ['operators', 'ack alerts'] },
    { x: 730, y: 168, w: 180, h: 60, title: 'Slack / webhook', lines: ['one message per incident'], tone: 'external' },
    { x: 250, y: 256, w: 214, h: 76, title: 'Replay + evaluation', lines: ['real past exploits', 'false-alarm rate'], tone: 'quality' },
  ],
  edges: [
    { d: 'M200 94 H250', flow: true, speed: 1.1 },
    { d: 'M200 200 C225 200 225 180 250 180', planned: true },
    { d: 'M464 86 H514', flow: true, speed: 1.1 },
    { d: 'M597 124 V168', label: 'queue', at: [606, 150], anchor: 'start', flow: true, speed: 1 },
    { d: 'M680 198 H730', flow: true, speed: 1.1 },
    { d: 'M680 86 H730', flow: true, speed: 1.1 },
    { d: 'M842 86 H862', flow: true, speed: 0.7 },
    { d: 'M357 256 V204', label: 'runs its own detector', at: [366, 236], anchor: 'start' },
  ],
};
