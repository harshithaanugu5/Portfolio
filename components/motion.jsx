"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  animate,
} from "framer-motion";

/* Shared easing — same curve everywhere so the page feels like one system */
export const ease = [0.22, 1, 0.36, 1];

const offsets = {
  up: { y: 26, x: 0 },
  down: { y: -26, x: 0 },
  left: { y: 0, x: 34 },
  right: { y: 0, x: -34 },
  none: { y: 0, x: 0 },
};

/**
 * Scroll-triggered reveal. Fires once, respects prefers-reduced-motion.
 */
export function Reveal({
  children,
  from = "up",
  delay = 0,
  duration = 0.7,
  className = "",
  as = "div",
  amount = 0.25,
  ...rest
}) {
  const reduce = useReducedMotion();
  const { x, y } = offsets[from] ?? offsets.up;
  const MotionTag = motion[as] ?? motion.div;

  if (reduce) {
    const Tag = as;
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Staggers direct children. Pair with <Stagger.Item>.
 */
export function Stagger({ children, className = "", gap = 0.08, delay = 0, amount = 0.2 }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: gap, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * A single staggered child. Must be a standalone named export — the RSC
 * bundler can't resolve compound exports like `Stagger.Item` from a
 * server component.
 */
export function StaggerItem({ children, className = "", from = "up", ...rest }) {
  const { x, y } = offsets[from] ?? offsets.up;
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, x, y },
        show: { opacity: 1, x: 0, y: 0, transition: { duration: 0.6, ease } },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/**
 * Counts up to `value` when scrolled into view.
 */
export function Counter({ value, suffix = "", prefix = "", duration = 1.8, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, duration, reduce]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

/**
 * Subtle 3D tilt toward the cursor. Desktop pointer only.
 */
export function Tilt({ children, className = "", strength = 7 }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const rx = useSpring(useMotionValue(0), { stiffness: 220, damping: 22 });
  const ry = useSpring(useMotionValue(0), { stiffness: 220, damping: 22 });

  if (reduce) return <div className={className}>{children}</div>;

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * strength * 2);
    rx.set(-py * strength * 2);
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Types through a list of strings, forever.
 */
export function Typewriter({ words, className = "", typeMs = 65, holdMs = 1700 }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [text, setText] = useState(reduce ? words[0] : "");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const word = words[i % words.length];

    if (!deleting && text === word) {
      const t = setTimeout(() => setDeleting(true), holdMs);
      return () => clearTimeout(t);
    }
    if (deleting && text === "") {
      setDeleting(false);
      setI((v) => v + 1);
      return;
    }
    const t = setTimeout(
      () =>
        setText((prev) =>
          deleting ? word.slice(0, prev.length - 1) : word.slice(0, prev.length + 1)
        ),
      deleting ? typeMs / 2 : typeMs
    );
    return () => clearTimeout(t);
  }, [text, deleting, i, words, typeMs, holdMs, reduce]);

  return (
    <span className={className}>
      {text}
      {!reduce && (
        <span className="ml-0.5 inline-block w-[3px] animate-blink bg-accent-cyan align-middle" style={{ height: "1em" }} />
      )}
    </span>
  );
}

export { motion, useInView, useReducedMotion };
