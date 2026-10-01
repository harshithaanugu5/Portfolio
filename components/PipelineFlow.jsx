"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Database, Workflow, Layers, Brain, ShieldCheck, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { pipelineStages, pipelineLoops } from "../lib/data";
import { ease } from "./motion";

const icons = {
  database: Database,
  workflow: Workflow,
  layers: Layers,
  brain: Brain,
  shield: ShieldCheck,
  rocket: Rocket,
};

/* Explicit grid placement keeps DOM order logical while the visual flow
   serpentines: row 1 left→right, row 2 right→left. */
const placement = [
  "lg:col-start-1 lg:row-start-1",
  "lg:col-start-2 lg:row-start-1",
  "lg:col-start-3 lg:row-start-1",
  "lg:col-start-3 lg:row-start-2",
  "lg:col-start-2 lg:row-start-2",
  "lg:col-start-1 lg:row-start-2",
];

const GAP = 7; // stop the line short of the card edge
const CORNER = 14;
const BUS_DEPTH = 44;

export default function PipelineFlow() {
  const wrapRef = useRef(null);
  const nodeRefs = useRef({});
  const pathRefs = useRef({});
  const [edges, setEdges] = useState([]);
  const [lengths, setLengths] = useState({});
  const [active, setActive] = useState(null);

  const measure = useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const base = wrap.getBoundingClientRect();

    const box = (id) => {
      const el = nodeRefs.current[id];
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return {
        left: r.left - base.left,
        right: r.right - base.left,
        top: r.top - base.top,
        bottom: r.bottom - base.top,
        cx: r.left - base.left + r.width / 2,
        cy: r.top - base.top + r.height / 2,
      };
    };

    const next = [];

    // Forward edges between consecutive stages
    for (let i = 0; i < pipelineStages.length - 1; i++) {
      const a = box(pipelineStages[i].id);
      const b = box(pipelineStages[i + 1].id);
      if (!a || !b) continue;

      const dx = b.cx - a.cx;
      const dy = b.cy - a.cy;
      let d;

      if (Math.abs(dy) < 30) {
        // same row — straight horizontal
        const [sx, ex] = dx > 0 ? [a.right + GAP, b.left - GAP] : [a.left - GAP, b.right + GAP];
        d = `M ${sx} ${a.cy} L ${ex} ${b.cy}`;
      } else if (Math.abs(dx) < 30) {
        // same column — straight vertical
        d = `M ${a.cx} ${a.bottom + GAP} L ${b.cx} ${b.top - GAP}`;
      } else {
        // diagonal — S curve down between rows
        const sy = a.bottom + GAP;
        const eyy = b.top - GAP;
        const my = (sy + eyy) / 2;
        d = `M ${a.cx} ${sy} C ${a.cx} ${my} ${b.cx} ${my} ${b.cx} ${eyy}`;
      }

      next.push({ key: `e${i}`, d, kind: "forward", delay: i * 0.12 });
    }

    // Feedback loop routed on a bus under the lowest card
    const lowest = pipelineStages.reduce((acc, s) => {
      const bb = box(s.id);
      return bb && bb.bottom > acc ? bb.bottom : acc;
    }, 0);

    for (const loop of pipelineLoops) {
      const a = box(loop.from);
      const b = box(loop.to);
      if (!a || !b) continue;
      // Only meaningful once the cards sit on a shared row (lg layout)
      if (Math.abs(a.cy - b.cy) > 30) continue;

      const busY = lowest + BUS_DEPTH;
      const sx = a.cx;
      const ex = b.cx;
      const dir = ex > sx ? 1 : -1;
      const d = [
        `M ${sx} ${a.bottom + GAP}`,
        `L ${sx} ${busY - CORNER}`,
        `Q ${sx} ${busY} ${sx + CORNER * dir} ${busY}`,
        `L ${ex - CORNER * dir} ${busY}`,
        `Q ${ex} ${busY} ${ex} ${busY - CORNER}`,
        `L ${ex} ${b.bottom + GAP}`,
      ].join(" ");

      next.push({
        key: `loop-${loop.from}-${loop.to}`,
        d,
        kind: "loop",
        delay: 0.7,
        label: loop.label,
        labelAt: { x: (sx + ex) / 2, y: busY },
      });
    }

    setEdges(next);
    setSize({ w: base.width, h: base.height });
  }, []);

  const [size, setSize] = useState({ w: 0, h: 0 });

  useLayoutEffect(() => {
    measure();
    const wrap = wrapRef.current;
    if (!wrap) return;
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);
    Object.values(nodeRefs.current).forEach((el) => el && ro.observe(el));
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  // Measure path lengths so each comet completes exactly one lap
  useEffect(() => {
    if (!edges.length) return;
    const next = {};
    for (const e of edges) {
      const el = pathRefs.current[e.key];
      if (el) {
        try {
          next[e.key] = el.getTotalLength();
        } catch {
          /* jsdom / unsupported — comet simply stays hidden */
        }
      }
    }
    setLengths(next);
  }, [edges]);

  return (
    <div ref={wrapRef} className="relative pb-24 lg:pb-28">
      {/* Connection layer */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        width={size.w || undefined}
        height={size.h || undefined}
        aria-hidden="true"
      >
        <defs>
          <marker id="arrow-cyan" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#22d3ee" />
          </marker>
          <marker id="arrow-violet" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#a78bfa" />
          </marker>
        </defs>

        {edges.map((e) => {
          const isLoop = e.kind === "loop";
          const stroke = isLoop ? "#a78bfa" : "#22d3ee";
          const len = lengths[e.key];

          return (
            <g key={e.key}>
              {/* dotted connector, marching */}
              <motion.path
                ref={(el) => {
                  pathRefs.current[e.key] = el;
                }}
                d={e.d}
                fill="none"
                stroke={stroke}
                strokeWidth={isLoop ? 1.3 : 1.6}
                strokeDasharray={isLoop ? "3 8" : "4 7"}
                strokeLinecap="round"
                markerEnd={`url(#${isLoop ? "arrow-violet" : "arrow-cyan"})`}
                className={isLoop ? "flow-dots-slow" : "flow-dots"}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: isLoop ? 0.55 : 0.8 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.7, delay: e.delay, ease }}
              />

              {/* travelling data pulse — one lap per cycle */}
              {len ? (
                <motion.path
                  d={e.d}
                  fill="none"
                  stroke={isLoop ? "#c4b5fd" : "#67e8f9"}
                  strokeWidth={isLoop ? 2.4 : 3}
                  strokeLinecap="round"
                  className="comet"
                  style={{
                    "--len": `${len}px`,
                    "--dur": `${Math.max(len / 90, 2.2)}s`,
                    "--delay": `${e.delay}s`,
                    strokeDasharray: `${Math.min(22, len * 0.16)} ${len}`,
                    filter: "drop-shadow(0 0 5px currentColor)",
                  }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.95 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.8, delay: e.delay + 0.3 }}
                />
              ) : null}

              {/* feedback loop label sitting on the bus */}
              {isLoop && e.labelAt ? (
                <motion.g
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.6, delay: e.delay + 0.25 }}
                >
                  <rect
                    x={e.labelAt.x - 118}
                    y={e.labelAt.y - 12}
                    width={236}
                    height={24}
                    rx={12}
                    fill="#04060d"
                    stroke="rgba(167,139,250,0.35)"
                  />
                  <text
                    x={e.labelAt.x}
                    y={e.labelAt.y + 4}
                    textAnchor="middle"
                    className="fill-accent-violet font-mono"
                    style={{ fontSize: 10.5, letterSpacing: "0.08em" }}
                  >
                    {e.label}
                  </text>
                </motion.g>
              ) : null}
            </g>
          );
        })}
      </svg>

      {/* Stage cards */}
      {/* gap doubles as the room the dotted connectors are drawn in */}
      <div className="relative grid gap-11 sm:grid-cols-2 sm:gap-x-12 lg:grid-cols-3 lg:gap-x-14 lg:gap-y-16">
        {pipelineStages.map((stage, i) => {
          const Icon = icons[stage.icon] ?? Database;
          const isActive = active === stage.id;

          return (
            <motion.div
              key={stage.id}
              ref={(el) => {
                nodeRefs.current[stage.id] = el;
              }}
              className={`group relative z-10 ${placement[i]}`}
              initial={{ opacity: 0, y: 22, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease }}
              onMouseEnter={() => setActive(stage.id)}
              onMouseLeave={() => setActive(null)}
            >
              <div
                className={`card edge-top relative overflow-hidden p-5 transition duration-300 ${
                  isActive
                    ? "border-accent-cyan/45 bg-white/[0.06] shadow-glow"
                    : "hover:border-accent-cyan/30"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-accent-cyan/25 bg-accent-cyan/10 text-accent-cyan">
                    <Icon size={18} />
                    <span className="absolute inset-0 animate-pulse-ring rounded-xl border border-accent-cyan/40" />
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-slate-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-4 text-sm font-semibold tracking-tight text-white">
                  {stage.label}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{stage.blurb}</p>

                <ul className="mt-3 space-y-1.5">
                  {stage.items.map((it) => (
                    <li key={it} className="flex items-center gap-2 font-mono text-[11px] text-slate-400">
                      <span className="h-1 w-1 shrink-0 rounded-full bg-accent-cyan/70" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
