"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skills } from "../lib/data";
import { ease } from "./motion";

const SIZE = 520;
const C = SIZE / 2;
const RING = 188;
const HUB_R = 56;
const NODE_R = 37;

const geometry = skills.map((s, i) => {
  const angle = (-90 + i * (360 / skills.length)) * (Math.PI / 180);
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const x = C + RING * cos;
  const y = C + RING * sin;
  const sx = C + (HUB_R + 8) * cos;
  const sy = C + (HUB_R + 8) * sin;
  const ex = x - (NODE_R + 8) * cos;
  const ey = y - (NODE_R + 8) * sin;
  return {
    ...s,
    x,
    y,
    spoke: `M ${sx} ${sy} L ${ex} ${ey}`,
    spokeLen: Math.hypot(ex - sx, ey - sy),
  };
});

export default function SkillsGraph() {
  const [selected, setSelected] = useState(0);
  const active = skills[selected];

  return (
    <div className="mt-14 grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
      {/* ── Radial graph (desktop) ─────────────────────────────── */}
      <motion.div
        className="relative hidden lg:block"
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease }}
      >
        <div className="absolute inset-[18%] rounded-full bg-brand-500/10 blur-[80px]" />
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="relative w-full overflow-visible">
          <defs>
            <radialGradient id="hubFill">
              <stop offset="0%" stopColor="#0e7490" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#04060d" stopOpacity="0.9" />
            </radialGradient>
          </defs>

          {/* orbit ring */}
          <circle
            cx={C}
            cy={C}
            r={RING}
            fill="none"
            stroke="rgba(148,163,184,0.16)"
            strokeWidth="1"
            strokeDasharray="2 9"
            className="flow-dots-slow"
          />

          {/* spokes */}
          {geometry.map((g, i) => {
            const on = i === selected;
            return (
              <g key={`spoke-${g.group}`}>
                <motion.path
                  d={g.spoke}
                  fill="none"
                  stroke={on ? "#22d3ee" : "rgba(148,163,184,0.45)"}
                  strokeWidth={on ? 1.8 : 1.2}
                  strokeDasharray="3 7"
                  strokeLinecap="round"
                  className="flow-dots"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: 0.2 + i * 0.07, ease }}
                />
                <path
                  d={g.spoke}
                  fill="none"
                  stroke={on ? "#a5f3fc" : "#67e8f9"}
                  strokeWidth={on ? 2.6 : 1.8}
                  strokeLinecap="round"
                  className="comet"
                  style={{
                    "--len": `${g.spokeLen}px`,
                    "--dur": `${2.4 + i * 0.22}s`,
                    strokeDasharray: `${g.spokeLen * 0.16} ${g.spokeLen}`,
                    opacity: on ? 0.95 : 0.5,
                  }}
                />
              </g>
            );
          })}

          {/* hub */}
          <g>
            <circle cx={C} cy={C} r={HUB_R + 14} fill="none" stroke="rgba(34,211,238,0.2)" strokeWidth="1" />
            <circle cx={C} cy={C} r={HUB_R} fill="url(#hubFill)" stroke="rgba(34,211,238,0.5)" strokeWidth="1.4" />
            <text
              x={C}
              y={C - 6}
              textAnchor="middle"
              className="fill-white font-mono font-semibold"
              style={{ fontSize: 14, letterSpacing: "0.14em" }}
            >
              AI / ML
            </text>
            <text
              x={C}
              y={C + 12}
              textAnchor="middle"
              className="fill-accent-cyan font-mono"
              style={{ fontSize: 10.5, letterSpacing: "0.2em" }}
            >
              SYSTEMS
            </text>
          </g>

          {/* cluster nodes */}
          {geometry.map((g, i) => {
            const on = i === selected;
            return (
              <motion.g
                key={g.group}
                onClick={() => setSelected(i)}
                onMouseEnter={() => setSelected(i)}
                className="cursor-pointer"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.45 + i * 0.07, ease }}
                whileHover={{ scale: 1.08 }}
                role="button"
                aria-label={g.group}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setSelected(i);
                }}
              >
                {on && (
                  <circle
                    cx={g.x}
                    cy={g.y}
                    r={NODE_R + 9}
                    fill="none"
                    stroke="rgba(34,211,238,0.35)"
                    strokeWidth="1"
                    className="animate-pulse"
                  />
                )}
                <circle
                  cx={g.x}
                  cy={g.y}
                  r={NODE_R}
                  fill={on ? "rgba(34,211,238,0.14)" : "rgba(255,255,255,0.035)"}
                  stroke={on ? "#22d3ee" : "rgba(255,255,255,0.14)"}
                  strokeWidth={on ? 1.6 : 1}
                  style={on ? { filter: "drop-shadow(0 0 14px rgba(34,211,238,0.45))" } : undefined}
                />
                <text
                  x={g.x}
                  y={g.y - 2}
                  textAnchor="middle"
                  className={`font-mono ${on ? "fill-white" : "fill-slate-400"}`}
                  style={{ fontSize: 10.5, letterSpacing: "0.06em" }}
                >
                  {g.short}
                </text>
                <text
                  x={g.x}
                  y={g.y + 12}
                  textAnchor="middle"
                  className={on ? "fill-accent-cyan" : "fill-slate-600"}
                  style={{ fontSize: 9.5 }}
                >
                  {g.items.length}
                </text>
              </motion.g>
            );
          })}
        </svg>
      </motion.div>

      {/* ── Mobile tabs ────────────────────────────────────────── */}
      <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 lg:hidden">
        {skills.map((s, i) => (
          <button
            key={s.group}
            onClick={() => setSelected(i)}
            className={`shrink-0 rounded-full border px-3.5 py-2 font-mono text-[11px] transition ${
              i === selected
                ? "border-accent-cyan/50 bg-accent-cyan/10 text-white"
                : "border-white/10 bg-white/[0.03] text-slate-400"
            }`}
          >
            {s.short}
            <span className="ml-1.5 text-slate-600">{s.items.length}</span>
          </button>
        ))}
      </div>

      {/* ── Detail panel ───────────────────────────────────────── */}
      <div className="card edge-top relative min-h-[19rem] overflow-hidden p-6 sm:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.group}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease }}
          >
            <div className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-600">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan" />
              cluster {String(selected + 1).padStart(2, "0")} / {String(skills.length).padStart(2, "0")}
            </div>

            <h3 className="mt-3 text-xl font-bold tracking-tight text-white sm:text-2xl">
              {active.group}
            </h3>
            <p className="mt-2 font-mono text-xs text-slate-500">
              {active.items.length} technologies &amp; methods
            </p>

            <div className="mt-6 flex flex-wrap gap-1.5">
              {active.items.map((item, k) => (
                <motion.span
                  key={item}
                  className="chip"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: k * 0.022, ease }}
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <p className="mt-7 hidden border-t border-white/[0.06] pt-4 font-mono text-[10px] tracking-wide text-slate-600 lg:block">
          Hover a node on the graph to explore each cluster
        </p>
      </div>
    </div>
  );
}
