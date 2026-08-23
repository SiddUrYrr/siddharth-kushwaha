/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#05050a",
        surface: "#0a0a12",
        card: "#10101c",
        line: "rgba(255,255,255,0.08)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Sora", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "accent-gradient": "linear-gradient(135deg, #60a5fa 0%, #818cf8 45%, #a78bfa 100%)",
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(129,140,248,0.35)",
        "glow-lg": "0 0 80px -20px rgba(129,140,248,0.45)",
        card: "0 8px 32px rgba(0,0,0,0.35)",
      },
      animation: {
        "float-slow": "float 7s ease-in-out infinite",
        "pulse-dot": "pulseDot 2.2s cubic-bezier(0.4,0,0.6,1) infinite",
        marquee: "marquee 30s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        pulseDot: {
          "0%": { transform: "scale(1)", opacity: "0.9" },
          "70%": { transform: "scale(2.6)", opacity: "0" },
          "100%": { transform: "scale(2.6)", opacity: "0" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
