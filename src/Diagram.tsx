import { useId } from 'react';

/*
 * Architecture diagrams as data: boxes, connectors and groups with explicit
 * coordinates in a fixed viewBox. Connectors marked `flow` carry small
 * packets animated along the path (SMIL animateMotion), so the diagram shows
 * the direction data actually moves. Packets are hidden under reduced motion.
 */

export type DiagramNode = {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  lines?: string[];
  tone?: 'core' | 'external' | 'planned' | 'quality';
};

export type DiagramEdge = {
  d: string;
  label?: string;
  at?: [number, number];
  anchor?: 'start' | 'middle' | 'end';
  planned?: boolean;
  flow?: boolean;
  /** Seconds for one packet to travel the path. */
  speed?: number;
};

export type DiagramGroup = { x: number; y: number; w: number; h: number; label: string };

export type DiagramSpec = {
  width: number;
  height: number;
  summary: string;
  groups?: DiagramGroup[];
  nodes: DiagramNode[];
  edges: DiagramEdge[];
};

export default function Diagram({ spec, caption, note }: { spec: DiagramSpec; caption: string; note?: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const arrow = `dg-arrow-${uid}`;
  const arrowPlanned = `dg-arrow-p-${uid}`;

  return (
    <figure className="diagram">
      <figcaption className="diagram-head">
        <span className="diagram-caption">{caption}</span>
        {note && <span className="diagram-note">{note}</span>}
        <span className="diagram-hint" aria-hidden="true">Swipe to explore →</span>
      </figcaption>
      <div className="diagram-scroll" tabIndex={0} role="region" aria-label={`${caption} (scrolls sideways on small screens)`}>
        <svg viewBox={`0 0 ${spec.width} ${spec.height}`} className="diagram-svg" role="img" aria-label={spec.summary}>
          <defs>
            <marker id={arrow} viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 1 L9 5 L0 9 z" className="dg-arrowhead" />
            </marker>
            <marker id={arrowPlanned} viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 1 L9 5 L0 9 z" className="dg-arrowhead dg-arrowhead-planned" />
            </marker>
          </defs>

          {spec.groups?.map((g) => (
            <g key={g.label} className="dg-group">
              <rect x={g.x} y={g.y} width={g.w} height={g.h} rx="16" />
              <text x={g.x + 16} y={g.y + 22}>{g.label}</text>
            </g>
          ))}

          {spec.edges.map((e, i) => (
            <path key={i} d={e.d} className={e.planned ? 'dg-edge dg-edge-planned' : 'dg-edge'} markerEnd={`url(#${e.planned ? arrowPlanned : arrow})`} />
          ))}

          {spec.edges.map((e, i) =>
            e.flow
              ? [0, 0.5].map((phase) => {
                  const dur = e.speed ?? 2.4;
                  return (
                    <circle key={`${i}-${phase}`} r="3" className="dg-packet" visibility="hidden">
                      <set attributeName="visibility" to="visible" begin={`${(phase * dur + i * 0.17).toFixed(2)}s`} fill="freeze" />
                      <animateMotion dur={`${dur}s`} repeatCount="indefinite" path={e.d} begin={`${(phase * dur + i * 0.17).toFixed(2)}s`} />
                    </circle>
                  );
                })
              : null,
          )}

          {spec.nodes.map((n) => (
            <g key={n.title} className={`dg-node dg-${n.tone ?? 'default'}`}>
              <rect x={n.x} y={n.y} width={n.w} height={n.h} rx="12" />
              <text x={n.x + 14} y={n.y + 25} className="dg-title">{n.title}</text>
              {n.lines?.map((line, k) => (
                <text key={k} x={n.x + 14} y={n.y + 46 + k * 16} className="dg-line">{line}</text>
              ))}
            </g>
          ))}

          {spec.edges.map((e, i) =>
            e.label && e.at ? (
              <text key={`l${i}`} x={e.at[0]} y={e.at[1]} textAnchor={e.anchor ?? 'middle'} className="dg-label">{e.label}</text>
            ) : null,
          )}
        </svg>
      </div>
    </figure>
  );
}
