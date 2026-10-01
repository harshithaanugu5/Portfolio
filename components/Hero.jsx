"use client";

import Image from "next/image";
import {
  Mail,
  Linkedin,
  Github,
  FileText,
  Download,
  ArrowDown,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import NeuralField from "./NeuralField";
import { Counter, Reveal, Stagger, StaggerItem, Typewriter, ease } from "./motion";
import { profile, metrics, stackMarquee } from "../lib/data";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-28 md:pt-32">
      {/* Backdrop layers */}
      <div className="absolute inset-0 -z-10 grid-bg grid-mask" />
      <NeuralField className="absolute inset-0 -z-10 h-full w-full opacity-70" />
      <div className="absolute -top-40 left-1/2 -z-10 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-brand-500/15 blur-[120px]" />
      <div className="absolute -right-24 top-40 -z-10 h-80 w-80 animate-glow-breathe rounded-full bg-accent-violet/15 blur-[110px]" />
      <div className="absolute bottom-0 left-0 right-0 -z-10 h-40 bg-gradient-to-t from-ink-950 to-transparent" />

      <div className="container-page">
        <div className="grid items-center gap-14 pb-16 lg:grid-cols-[1.35fr_1fr] lg:gap-10 lg:pb-20">
          {/* ── Copy ─────────────────────────────────────────────── */}
          <div>
            <Reveal from="up" duration={0.6}>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-accent-emerald/25 bg-accent-emerald/[0.07] px-3.5 py-1.5 font-mono text-[11px] tracking-wide text-accent-emerald">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-emerald opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-emerald" />
                </span>
                {profile.availability}
              </span>
            </Reveal>

            <Reveal from="up" delay={0.08}>
              <h1 className="mt-6 text-[2.6rem] font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-[4.1rem]">
                {profile.name.split(" ").slice(0, 2).join(" ")}
                <br />
                <span className="gradient-text">{profile.name.split(" ").slice(2).join(" ")}</span>
              </h1>
            </Reveal>

            <Reveal from="up" delay={0.16}>
              <p className="mt-5 flex min-h-[2rem] flex-wrap items-baseline gap-x-2 font-mono text-base text-slate-300 sm:text-lg">
                <span className="text-slate-600">&gt;</span>
                <Typewriter words={profile.titles} className="text-accent-cyan" />
              </p>
            </Reveal>

            <Reveal from="up" delay={0.24}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-400 md:text-[1.0625rem]">
                {profile.tagline}
              </p>
            </Reveal>

            <Reveal from="up" delay={0.32}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-accent-cyan to-brand-500 px-6 py-3 text-sm font-semibold text-ink-950 shadow-glow transition hover:shadow-[0_0_50px_-8px_rgba(34,211,238,0.7)]"
                >
                  <FileText size={17} />
                  View Resume
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                </a>
                <a
                  href={profile.resume}
                  download
                  className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-200 backdrop-blur transition hover:border-accent-cyan/40 hover:bg-white/[0.08] hover:text-white"
                >
                  <Download size={16} />
                  Download PDF
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-2 py-3 text-sm font-semibold text-slate-400 transition hover:text-accent-cyan"
                >
                  <Sparkles size={16} />
                  Get in touch
                </a>
              </div>
            </Reveal>

            <Reveal from="up" delay={0.4}>
              <div className="mt-9 flex items-center gap-1">
                {[
                  { href: profile.linkedin, Icon: Linkedin, label: "LinkedIn" },
                  { href: profile.github, Icon: Github, label: "GitHub" },
                  { href: `mailto:${profile.email}`, Icon: Mail, label: "Email" },
                ].map(({ href, Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="rounded-lg p-2.5 text-slate-500 transition hover:-translate-y-0.5 hover:bg-white/5 hover:text-accent-cyan"
                  >
                    <Icon size={19} />
                  </a>
                ))}
                <span className="ml-3 h-px w-12 bg-white/10" />
                <span className="font-mono text-[11px] tracking-wider text-slate-600">
                  {profile.location}
                </span>
              </div>
            </Reveal>
          </div>

          {/* ── Portrait with orbits ─────────────────────────────── */}
          <motion.div
            className="justify-self-center lg:justify-self-end"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease }}
          >
            <div className="relative h-[19rem] w-[19rem] sm:h-[22rem] sm:w-[22rem]">
              {/* orbit rings */}
              <div className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-white/12" />
              <div
                className="absolute inset-6 animate-spin-slow rounded-full border border-dashed border-accent-cyan/20"
                style={{ animationDirection: "reverse", animationDuration: "34s" }}
              />
              {/* orbiting nodes */}
              <div className="absolute inset-0 animate-spin-slow" style={{ animationDuration: "18s" }}>
                <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-accent-cyan shadow-glow" />
                <span className="absolute bottom-3 right-6 h-1.5 w-1.5 rounded-full bg-accent-violet" />
              </div>
              <div
                className="absolute inset-6 animate-spin-slow"
                style={{ animationDuration: "26s", animationDirection: "reverse" }}
              >
                <span className="absolute left-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-accent-violet shadow-glow-violet" />
              </div>

              {/* glow + photo */}
              <div className="absolute inset-[13%] rounded-full bg-gradient-to-tr from-accent-cyan/25 via-brand-500/15 to-accent-violet/25 blur-2xl" />
              <div className="absolute inset-[11%] animate-float overflow-hidden rounded-full border border-white/12 shadow-2xl">
                <Image
                  src={profile.photo}
                  alt={profile.name}
                  fill
                  priority
                  sizes="(max-width: 640px) 240px, 280px"
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/50 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Metrics band ───────────────────────────────────────── */}
      <div className="relative border-y border-white/[0.07] bg-white/[0.015] backdrop-blur-sm">
        <Stagger className="container-page grid grid-cols-2 gap-x-6 gap-y-8 py-10 md:grid-cols-5" gap={0.1}>
          {metrics.map((m) => (
            <StaggerItem key={m.label} className="group relative">
              <div className="font-mono text-3xl font-bold text-white md:text-[2.1rem]">
                <Counter value={m.value} suffix={m.suffix} className="gradient-text" />
              </div>
              <div className="mt-2 text-xs font-medium leading-snug text-slate-300">{m.label}</div>
              <div className="mt-1 font-mono text-[10px] tracking-wide text-slate-600">
                {m.detail}
              </div>
              <span className="absolute -bottom-2 left-0 h-px w-0 bg-accent-cyan/60 transition-all duration-500 group-hover:w-10" />
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      {/* ── Stack marquee ──────────────────────────────────────── */}
      <div className="marquee-mask relative overflow-hidden border-b border-white/[0.07] py-4">
        <div className="flex w-max animate-marquee gap-8 whitespace-nowrap">
          {[...stackMarquee, ...stackMarquee].map((t, i) => (
            <span
              key={`${t}-${i}`}
              className="flex items-center gap-8 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-600"
            >
              {t}
              <span className="h-1 w-1 rounded-full bg-accent-cyan/40" />
            </span>
          ))}
        </div>
      </div>

      {/* scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to about"
        className="mx-auto mt-10 flex w-fit flex-col items-center gap-2 text-slate-600 transition hover:text-accent-cyan"
        animate={{ y: [0, 7, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.25em]">Scroll</span>
        <ArrowDown size={15} />
      </motion.a>
    </section>
  );
}
