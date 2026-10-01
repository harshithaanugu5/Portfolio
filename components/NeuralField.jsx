"use client";

import { useEffect, useRef } from "react";

/**
 * Canvas particle field: drifting nodes that draw links to nearby neighbours
 * and brighten around the cursor. Reads as a live neural graph behind the hero.
 */
export default function NeuralField({ className = "", density = 0.00009, linkDist = 140 }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = canvas.getContext("2d");
    let w = 0;
    let h = 0;
    let dpr = 1;
    let nodes = [];
    const pointer = { x: -9999, y: -9999 };

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round(Math.min(Math.max(w * h * density, 34), 96));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.5 + 1,
        hue: Math.random() > 0.72 ? 258 : 190, // mostly cyan, some violet
      }));
    };

    const step = () => {
      ctx.clearRect(0, 0, w, h);

      for (const n of nodes) {
        if (!reduce) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > w) n.vx *= -1;
          if (n.y < 0 || n.y > h) n.vy *= -1;
        }
      }

      // links
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d > linkDist) continue;

          const mx = (a.x + b.x) / 2;
          const my = (a.y + b.y) / 2;
          const near = Math.hypot(mx - pointer.x, my - pointer.y) < 170;
          const base = (1 - d / linkDist) * 0.22;
          const alpha = near ? Math.min(base * 3.4, 0.55) : base;

          ctx.strokeStyle = `hsla(${near ? 190 : 205}, 90%, 68%, ${alpha})`;
          ctx.lineWidth = near ? 0.9 : 0.55;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // nodes
      for (const n of nodes) {
        const near = Math.hypot(n.x - pointer.x, n.y - pointer.y) < 150;
        ctx.beginPath();
        ctx.arc(n.x, n.y, near ? n.r * 1.9 : n.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${n.hue}, 92%, ${near ? 78 : 66}%, ${near ? 0.95 : 0.6})`;
        ctx.fill();

        if (near) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * 6, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${n.hue}, 92%, 70%, 0.07)`;
          ctx.fill();
        }
      }

      rafRef.current = requestAnimationFrame(step);
    };

    const onPointer = (e) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    build();
    step();

    const ro = new ResizeObserver(build);
    ro.observe(canvas);
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [density, linkDist]);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
