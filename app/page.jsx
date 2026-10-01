import {
  Mail,
  Phone,
  Linkedin,
  Github,
  FileText,
  ArrowUpRight,
  Award,
  GraduationCap,
  BookOpen,
  MapPin,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import PipelineFlow from "../components/PipelineFlow";
import ExperienceTimeline from "../components/ExperienceTimeline";
import SkillsGraph from "../components/SkillsGraph";
import { Reveal, Stagger, StaggerItem } from "../components/motion";

import {
  profile,
  summary,
  education,
  certifications,
  publication,
} from "../lib/data";

/* Small section label + heading block */
function SectionHead({ label, title, blurb, align = "left" }) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-3xl"}>
      <Reveal from="up">
        <p className="eyebrow">
          <span className="h-px w-6 bg-accent-cyan/60" />
          {label}
        </p>
      </Reveal>
      <Reveal from="up" delay={0.08}>
        <h2 className="heading">{title}</h2>
      </Reveal>
      {blurb && (
        <Reveal from="up" delay={0.16}>
          <p className={`subheading ${align === "center" ? "mx-auto" : ""}`}>{blurb}</p>
        </Reveal>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <main id="top">
      <Navbar />
      <Hero />

      {/* ── About ───────────────────────────────────────────────── */}
      <section id="about" className="section relative">
        <div className="absolute inset-0 -z-10 dot-bg opacity-40" />
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[1fr_minmax(0,1.25fr)] lg:gap-16">
            <div>
              <SectionHead
                label="About"
                title="I ship reliable AI, not demos"
              />
              <Reveal from="up" delay={0.2}>
                <div className="mt-8 space-y-4">
                  {[
                    { k: "Focus", v: "GenAI · Agentic systems · Applied DS" },
                    { k: "Domains", v: "Banking · Healthcare · Retail" },
                    { k: "Clouds", v: "AWS · Azure · GCP" },
                    { k: "Now", v: "Wells Fargo — Generative AI Engineer" },
                  ].map((row) => (
                    <div
                      key={row.k}
                      className="flex items-baseline gap-4 border-b border-white/[0.06] pb-3"
                    >
                      <span className="w-20 shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-600">
                        {row.k}
                      </span>
                      <span className="text-sm text-slate-300">{row.v}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <Stagger className="space-y-6 lg:pt-20" gap={0.12}>
              {summary.map((p, i) => (
                <StaggerItem key={i}>
                  <p className="text-[1.0625rem] leading-relaxed text-slate-400 md:text-lg">
                    {i === 0 ? (
                      <>
                        <span className="float-left mr-3 mt-1 font-mono text-4xl font-bold leading-none gradient-text">
                          {p.charAt(0)}
                        </span>
                        {p.slice(1)}
                      </>
                    ) : (
                      p
                    )}
                  </p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* ── How I build (the animated diagram) ──────────────────── */}
      <section id="system" className="section relative overflow-hidden border-y border-white/[0.06] bg-white/[0.012]">
        <div className="absolute left-1/2 top-0 -z-10 h-72 w-[46rem] -translate-x-1/2 rounded-full bg-brand-500/10 blur-[120px]" />
        <div className="container-page">
          <SectionHead
            label="How I Build"
            title="One system, end to end"
            blurb="Every project I own runs this loop — raw data in, evaluated and monitored AI out, with production signals feeding the next retrain. Hover any stage to trace it."
            align="center"
          />
          <PipelineFlow />
        </div>
      </section>

      {/* ── Experience ──────────────────────────────────────────── */}
      <section id="experience" className="section relative">
        <div className="container-page">
          <SectionHead
            label="Experience"
            title="Four years, three industries, measurable outcomes"
            blurb="Each role below moved a number that the business already tracked."
          />
          <ExperienceTimeline />
        </div>
      </section>

      {/* ── Skills ──────────────────────────────────────────────── */}
      <section
        id="skills"
        className="section relative overflow-hidden border-y border-white/[0.06] bg-white/[0.012]"
      >
        <div className="container-page">
          <SectionHead
            label="Skills"
            title="A connected technical stack"
            blurb="Eight clusters wired into one practice — statistics through to production serving."
            align="center"
          />
          <SkillsGraph />
        </div>
      </section>

      {/* ── Credentials ─────────────────────────────────────────── */}
      <section id="credentials" className="section relative">
        <div className="container-page">
          <SectionHead
            label="Credentials"
            title="Education, certifications & research"
          />

          <div className="mt-14 grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Education + publication */}
            <div className="space-y-10">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-600">
                  Education
                </p>
                <div className="relative mt-6 space-y-5 pl-7">
                  <div
                    className="absolute bottom-4 left-[5px] top-3 w-px"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(to bottom, rgba(167,139,250,0.45) 0 3px, transparent 3px 9px)",
                    }}
                    aria-hidden="true"
                  />
                  {education.map((e, i) => (
                    <Reveal key={e.school} from="left" delay={i * 0.1}>
                      <div className="card card-hover relative p-5">
                        <span
                          className="absolute -left-7 top-6 h-2 w-2 rounded-full border border-accent-violet bg-ink-950"
                          aria-hidden="true"
                        />
                        <div className="flex items-start gap-3.5">
                          <GraduationCap className="mt-0.5 shrink-0 text-accent-violet" size={19} />
                          <div>
                            <h3 className="font-semibold tracking-tight text-white">{e.school}</h3>
                            <p className="mt-1 text-sm text-slate-400">{e.degree}</p>
                            <p className="mt-2 flex items-center gap-3 font-mono text-[11px] text-slate-600">
                              <span>{e.period}</span>
                              <span className="flex items-center gap-1">
                                <MapPin size={11} /> {e.location}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-600">
                  Publication
                </p>
                <Reveal from="up" delay={0.1}>
                  <div className="card card-hover edge-top relative mt-6 overflow-hidden p-5 sm:p-6">
                    <div className="flex items-start gap-3.5">
                      <BookOpen className="mt-0.5 shrink-0 text-accent-cyan" size={19} />
                      <div>
                        <h3 className="font-semibold leading-snug tracking-tight text-white">
                          {publication.title}
                        </h3>
                        <p className="mt-2.5 text-sm leading-relaxed text-slate-400">
                          {publication.description}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {publication.tags.map((t) => (
                            <span key={t} className="chip">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>

            {/* Certifications */}
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-600">
                Certifications
              </p>
              <Stagger className="mt-6 space-y-3" gap={0.07}>
                {certifications.map((c) => (
                  <StaggerItem key={c.name} from="right">
                    <div className="card card-hover group flex items-center gap-4 p-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-accent-amber/20 bg-accent-amber/[0.08] text-accent-amber transition group-hover:scale-110">
                        <Award size={17} />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-slate-200">{c.name}</p>
                        <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-slate-600">
                          {c.issuer}
                        </p>
                      </div>
                      <ArrowUpRight
                        size={15}
                        className="ml-auto shrink-0 text-slate-700 transition group-hover:text-accent-cyan"
                      />
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact ─────────────────────────────────────────────── */}
      <section id="contact" className="section relative">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-ink-900/60 px-6 py-16 text-center md:px-16 md:py-20">
            <div className="absolute inset-0 -z-10 grid-bg grid-mask opacity-70" />
            <div className="absolute -top-24 left-1/2 -z-10 h-64 w-[32rem] -translate-x-1/2 rounded-full bg-accent-cyan/15 blur-[100px]" />
            <div className="absolute -bottom-24 right-0 -z-10 h-56 w-72 rounded-full bg-accent-violet/15 blur-[90px]" />

            <div className="mx-auto max-w-2xl">
              <Reveal from="up">
                <p className="eyebrow justify-center">
                  <span className="h-px w-6 bg-accent-cyan/60" />
                  Contact
                </p>
              </Reveal>
              <Reveal from="up" delay={0.08}>
                <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-[2.6rem]">
                  Let&apos;s build something <span className="gradient-text">intelligent</span>
                </h2>
              </Reveal>
              <Reveal from="up" delay={0.16}>
                <p className="mt-4 text-slate-400">{profile.availability}</p>
              </Reveal>

              <Stagger className="mt-11 grid gap-3 sm:grid-cols-2" gap={0.08}>
                {[
                  { href: `mailto:${profile.email}`, Icon: Mail, label: profile.email, sub: "Email" },
                  {
                    href: `tel:${profile.phone.replace(/[^+\d]/g, "")}`,
                    Icon: Phone,
                    label: profile.phone,
                    sub: "Phone",
                  },
                  { href: profile.linkedin, Icon: Linkedin, label: "sri-harshitha-anugu", sub: "LinkedIn" },
                  { href: profile.github, Icon: Github, label: "harshithaanugu5", sub: "GitHub" },
                ].map(({ href, Icon, label, sub }) => (
                  <StaggerItem key={sub}>
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="card card-hover group flex items-center gap-3.5 p-4 text-left"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-accent-cyan/20 bg-accent-cyan/[0.08] text-accent-cyan">
                        <Icon size={17} />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-mono text-[10px] uppercase tracking-wider text-slate-600">
                          {sub}
                        </span>
                        <span className="block truncate text-sm text-slate-200">{label}</span>
                      </span>
                      <ArrowUpRight
                        size={15}
                        className="ml-auto shrink-0 text-slate-700 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-cyan"
                      />
                    </a>
                  </StaggerItem>
                ))}
              </Stagger>

              <Reveal from="up" delay={0.3}>
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative mt-10 inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-accent-cyan to-brand-500 px-7 py-3.5 text-sm font-semibold text-ink-950 shadow-glow transition hover:shadow-[0_0_50px_-8px_rgba(34,211,238,0.7)]"
                >
                  <FileText size={17} /> View Full Resume
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                </a>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/[0.07] py-9">
        <div className="container-page flex flex-col items-center justify-between gap-3 font-mono text-[11px] text-slate-600 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <p className="flex items-center gap-2">
            <span className="h-1 w-1 animate-pulse rounded-full bg-accent-emerald" />
            Built with Next.js, Tailwind &amp; Framer Motion
          </p>
        </div>
      </footer>
    </main>
  );
}
