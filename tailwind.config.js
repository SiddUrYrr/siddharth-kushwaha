/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0F172A",
        surface: "#111827",
        raised: "#1E293B",
        line: "#334155",
        paper: "#F8FAFC",
        dim: "#CBD5E1",
        accent: {
          DEFAULT: "#2563EB",
          bright: "#3B82F6",
          soft: "#60A5FA",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      boxShadow: {
        hard: "4px 4px 0 0 #2563EB",
        "hard-sm": "2px 2px 0 0 #2563EB",
        "hard-lg": "8px 8px 0 0 #2563EB",
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        "pulse-dot": "pulseDot 2.2s cubic-bezier(0.4,0,0.6,1) infinite",
        float: "float 7s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        pulseDot: {
          "0%": { transform: "scale(1)", opacity: "0.9" },
          "70%": { transform: "scale(2.6)", opacity: "0" },
          "100%": { transform: "scale(2.6)", opacity: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
