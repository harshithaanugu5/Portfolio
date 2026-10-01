"use client";

import { useRef, useState } from "react";
import { motion, useInView, useScroll, useSpring } from "framer-motion";
import { Building2, ChevronDown, TrendingUp } from "lucide-react";
import { experience } from "../lib/data";
import { ease } from "./motion";

const VISIBLE_POINTS = 4;

export default function ExperienceTimeline() {
  const spineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: spineRef,
    offset: ["start 75%", "end 55%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 });

  return (
    <div ref={spineRef} className="relative mt-14 pl-9 sm:pl-14">
      {/* dotted spine (static) */}
      <div
        className="absolute bottom-6 left-[11px] top-2 w-px sm:left-[23px]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, rgba(148,163,184,0.35) 0 3px, transparent 3px 9px)",
        }}
        aria-hidden="true"
      />
      {/* spine progress (draws as you scroll) */}
      <motion.div
        className="absolute left-[11px] top-2 w-px origin-top rounded-full bg-gradient-to-b from-accent-cyan via-brand-400 to-accent-violet sm:left-[23px]"
        style={{ scaleY: progress, bottom: "1.5rem", boxShadow: "0 0 12px rgba(34,211,238,0.6)" }}
        aria-hidden="true"
      />

      <div className="space-y-12 sm:space-y-16">
        {experience.map((job, i) => (
          <JobEntry key={job.company} job={job} index={i} />
        ))}
      </div>
    </div>
  );
}

function JobEntry({ job, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const [expanded, setExpanded] = useState(false);

  const points = expanded ? job.points : job.points.slice(0, VISIBLE_POINTS);
  const hidden = job.points.length - VISIBLE_POINTS;

  return (
    <motion.article
      ref={ref}
      className="relative"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease }}
    >
      {/* node on the spine */}
      <span
        className="absolute -left-9 top-1.5 flex h-[23px] w-[23px] items-center justify-center sm:-left-14"
        aria-hidden="true"
      >
        <span
          className={`relative h-[11px] w-[11px] rounded-full border-2 ${
            job.current
              ? "border-accent-cyan bg-accent-cyan shadow-glow"
              : "border-accent-violet/70 bg-ink-950"
          }`}
        >
          {job.current && (
            <span className="absolute -inset-1.5 animate-pulse-ring rounded-full border border-accent-cyan/50" />
          )}
        </span>
      </span>

      {/* dotted branch from spine into the card */}
      <span
        className="absolute -left-[26px] top-[12px] hidden h-px w-[26px] sm:block"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to right, rgba(34,211,238,0.5) 0 3px, transparent 3px 8px)",
        }}
        aria-hidden="true"
      />

      <div className="card card-hover edge-top relative overflow-hidden p-5 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.15em] text-slate-600">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <span className="h-px w-5 bg-white/15" />
              <span className="uppercase">{job.domain}</span>
            </div>
            <h3 className="mt-2.5 text-lg font-bold tracking-tight text-white sm:text-xl">
              {job.role}
            </h3>
            <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-accent-cyan">
              <Building2 size={14} className="shrink-0" />
              {job.company}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {job.current && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-emerald/25 bg-accent-emerald/[0.08] px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-accent-emerald">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-emerald" />
                Current
              </span>
            )}
            <span className="font-mono text-xs text-slate-500">{job.period}</span>
          </div>
        </div>

        {/* impact strip — the headline numbers, connected by dots */}
        <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-xl border border-white/[0.07] bg-gradient-to-r from-accent-cyan/[0.06] to-transparent px-3.5 py-2.5">
          <TrendingUp size={14} className="shrink-0 text-accent-cyan" />
          {job.impact.map((im, k) => (
            <span key={im} className="flex items-center gap-3">
              {k > 0 && <span className="h-1 w-1 rounded-full bg-accent-cyan/50" aria-hidden="true" />}
              <span className="font-mono text-[11px] text-slate-300">{im}</span>
            </span>
          ))}
        </div>

        <ul className="mt-5 space-y-3">
          {points.map((pt, k) => (
            <motion.li
              key={pt}
              className="flex gap-3 text-sm leading-relaxed text-slate-400"
              initial={{ opacity: 0, x: -8 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.15 + k * 0.05, ease }}
            >
              <span
                className="mt-[7px] h-1.5 w-1.5 shrink-0 rotate-45 bg-accent-cyan/60"
                aria-hidden="true"
              />
              <span>{pt}</span>
            </motion.li>
          ))}
        </ul>

        {hidden > 0 && (
          <button
            onClick={() => setExpanded((v) => !v)}
            className="mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-accent-cyan transition hover:text-accent-cyan/70"
            aria-expanded={expanded}
          >
            {expanded ? "Show less" : `${hidden} more achievements`}
            <ChevronDown
              size={13}
              className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
            />
          </button>
        )}

        <div className="mt-6 flex flex-wrap gap-1.5 border-t border-white/[0.06] pt-5">
          {job.tech.map((t, k) => (
            <motion.span
              key={t}
              className="chip"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.3 + k * 0.018 }}
            >
              {t}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
