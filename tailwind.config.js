/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#04060d",
          900: "#080c18",
          850: "#0c1222",
          800: "#121a2e",
          700: "#1b2540",
        },
        brand: {
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
        },
        accent: {
          cyan: "#22d3ee",
          violet: "#a78bfa",
          indigo: "#818cf8",
          emerald: "#34d399",
          amber: "#fbbf24",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(34, 211, 238, 0.45)",
        "glow-violet": "0 0 40px -10px rgba(167, 139, 250, 0.45)",
        card: "0 1px 0 0 rgba(255,255,255,0.05) inset, 0 20px 40px -20px rgba(0,0,0,0.8)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "dash-flow": {
          to: { strokeDashoffset: "-1000" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.85)", opacity: "0.6" },
          "70%": { transform: "scale(1.5)", opacity: "0" },
          "100%": { transform: "scale(1.5)", opacity: "0" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        blink: {
          "0%,49%": { opacity: "1" },
          "50%,100%": { opacity: "0" },
        },
        "glow-breathe": {
          "0%,100%": { opacity: "0.35" },
          "50%": { opacity: "0.75" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
        "dash-flow": "dash-flow 18s linear infinite",
        "dash-flow-fast": "dash-flow 8s linear infinite",
        "pulse-ring": "pulse-ring 3s cubic-bezier(0.24,0,0.38,1) infinite",
        float: "float 6s ease-in-out infinite",
        marquee: "marquee 40s linear infinite",
        shimmer: "shimmer 3s linear infinite",
        "spin-slow": "spin-slow 26s linear infinite",
        blink: "blink 1.1s step-end infinite",
        "glow-breathe": "glow-breathe 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
