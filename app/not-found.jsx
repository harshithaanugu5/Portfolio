import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { profile } from "../lib/data";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      <div className="absolute inset-0 -z-10 grid-bg grid-mask" />
      <div className="absolute left-1/2 top-1/3 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-brand-500/15 blur-[110px]" />

      <div className="text-center">
        <p className="font-mono text-7xl font-bold gradient-text sm:text-8xl">404</p>
        <h1 className="mt-6 text-2xl font-bold tracking-tight text-white sm:text-3xl">
          That page doesn&apos;t exist
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-400">
          The link may be out of date. Everything lives on the home page — or jump
          straight to the resume.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-cyan to-brand-500 px-5 py-3 text-sm font-semibold text-ink-950 shadow-glow transition hover:shadow-[0_0_50px_-8px_rgba(34,211,238,0.7)]"
          >
            <ArrowLeft size={16} /> Back to portfolio
          </Link>
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-accent-cyan/40 hover:text-white"
          >
            <FileText size={16} /> View Resume
          </a>
        </div>
      </div>
    </main>
  );
}
