"use client";

import { useEffect, useState } from "react";
import { Menu, X, FileText } from "lucide-react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { profile } from "../lib/data";
import { ease } from "./motion";

const links = [
  { href: "#about", label: "About", id: "about" },
  { href: "#system", label: "How I Build", id: "system" },
  { href: "#experience", label: "Experience", id: "experience" },
  { href: "#skills", label: "Skills", id: "skills" },
  { href: "#credentials", label: "Credentials", id: "credentials" },
  { href: "#contact", label: "Contact", id: "contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 28, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently in the upper half of the viewport
  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-white/[0.07] bg-ink-950/80 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      {/* reading progress */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-gradient-to-r from-accent-cyan via-brand-400 to-accent-violet"
        style={{ scaleX: progress }}
        aria-hidden="true"
      />

      <nav className="container-page flex h-16 items-center justify-between">
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-accent-cyan/30 bg-accent-cyan/10 font-mono text-xs font-bold text-accent-cyan">
            SA
            <span className="absolute inset-0 animate-pulse-ring rounded-lg border border-accent-cyan/40" />
          </span>
          <span className="text-sm font-semibold tracking-tight text-white">
            {profile.shortName}
            <span className="text-accent-cyan">.</span>
          </span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`relative rounded-md px-3 py-2 text-[13px] font-medium transition ${
                active === l.id ? "text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              {l.label}
              {active === l.id && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 -z-10 rounded-md border border-accent-cyan/25 bg-accent-cyan/[0.08]"
                  transition={{ duration: 0.35, ease }}
                />
              )}
            </a>
          ))}
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 inline-flex items-center gap-2 rounded-full border border-accent-cyan/40 bg-accent-cyan/10 px-4 py-2 text-[13px] font-semibold text-accent-cyan transition hover:bg-accent-cyan hover:text-ink-950"
          >
            <FileText size={14} /> Resume
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-md p-2 text-slate-300 transition hover:bg-white/5 lg:hidden"
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="overflow-hidden border-t border-white/[0.07] bg-ink-950/95 backdrop-blur-xl lg:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease }}
          >
            <div className="container-page flex flex-col gap-1 py-5">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                    active === l.id
                      ? "bg-accent-cyan/[0.08] text-white"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <span className="mr-2.5 font-mono text-[10px] text-slate-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {l.label}
                </motion.a>
              ))}
              <a
                href={profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent-cyan to-brand-500 px-4 py-3 text-sm font-semibold text-ink-950"
              >
                <FileText size={15} /> View Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
