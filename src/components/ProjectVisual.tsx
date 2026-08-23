import { Bot, ChefHat, Sparkles } from "lucide-react";
import type { ProjectVisual } from "../data/projects";

function MapVisual() {
  return (
    <div aria-hidden="true" className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#0b1020]">
      <svg className="absolute inset-0 h-full w-full opacity-40" preserveAspectRatio="none">
        <defs>
          <pattern id="mapgrid" width="36" height="36" patternUnits="userSpaceOnUse">
            <path d="M 36 0 L 0 0 0 36" fill="none" stroke="rgba(99,102,241,0.25)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mapgrid)" />
        <path
          d="M -10 130 C 80 90, 140 160, 230 110 S 380 60, 460 120"
          fill="none"
          stroke="rgba(129,140,248,0.55)"
          strokeWidth="2.5"
          strokeDasharray="7 7"
        />
      </svg>
      <div className="relative">
        <span className="animate-pulse-dot absolute inset-0 rounded-full bg-sky-400/50" />
        <span className="absolute -inset-3 animate-ping rounded-full border border-sky-400/40" />
        <span className="relative block h-4 w-4 rounded-full bg-sky-400 shadow-glow ring-4 ring-sky-400/20" />
      </div>
      <span className="glass absolute bottom-3 left-3 rounded-md px-2.5 py-1 font-mono text-[11px] text-sky-300">
        26.8467° N, 80.9462° E
      </span>
      <span className="absolute right-3 top-3 rounded-full bg-emerald-400/15 px-2.5 py-1 font-mono text-[11px] text-emerald-300 ring-1 ring-emerald-400/30">
    LIVE
      </span>
    </div>
  );
}

function AiDocVisual() {
  return (
    <div aria-hidden="true" className="relative flex h-full w-full items-center justify-center gap-6 bg-gradient-to-br from-[#14102a] to-[#0d0d1c] px-6">
      <div className="w-32 space-y-2 rounded-xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur sm:w-40">
        {[100, 85, 95, 70, 90, 60, 80].map((w, i) => (
          <div key={i} className="h-1.5 rounded-full bg-zinc-500/50" style={{ width: `${w}%` }} />
        ))}
      </div>
      <Sparkles size={22} className="shrink-0 text-violet-300 drop-shadow-[0_0_10px_rgba(167,139,250,0.8)]" />
      <div className="w-28 space-y-2 rounded-xl border border-violet-400/30 bg-violet-500/10 p-3 shadow-glow backdrop-blur sm:w-32">
        {[90, 65, 75].map((w, i) => (
          <div key={i} className="h-1.5 rounded-full bg-violet-300/70" style={{ width: `${w}%` }} />
        ))}
      </div>
    </div>
  );
}

function RecipeVisual() {
  const ideas = ["Pasta", "Salad", "Soup"];
  return (
    <div aria-hidden="true" className="relative flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#231527] to-[#12101f] px-6 py-6">
      <ChefHat size={34} className="text-amber-200 drop-shadow-[0_0_14px_rgba(253,230,138,0.45)]" />
      <div className="flex flex-wrap justify-center gap-2">
        {ideas.map((idea) => (
          <span
            key={idea}
            className="rounded-full border border-amber-300/25 bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-100"
          >
            {idea}
          </span>
        ))}
      </div>
      <p className="font-mono text-[11px] text-zinc-500">matching recipes found…</p>
    </div>
  );
}

function CalculatorVisual() {
  const keys = ["7", "8", "9", "sin", "det", "A⁻¹"];
  return (
    <div aria-hidden="true" className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#101a2e] to-[#0d1220] px-6 py-6">
      <div className="w-44 rounded-2xl border border-white/10 bg-white/[0.05] p-3 shadow-card backdrop-blur">
        <div className="mb-2.5 truncate rounded-lg bg-ink/80 px-3 py-2 text-right font-mono text-xs text-emerald-300">
          det(A) = −42.0
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {keys.map((key) => (
            <span
              key={key}
              className="rounded-md bg-white/[0.06] py-1.5 text-center font-mono text-[11px] text-zinc-300 ring-1 ring-inset ring-white/10"
            >
              {key}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProjectVisual({ visual }: { visual: ProjectVisual }) {
  switch (visual) {
    case "map":
      return <MapVisual />;
    case "ai-doc":
      return <AiDocVisual />;
    case "recipe":
      return <RecipeVisual />;
    case "calculator":
      return <CalculatorVisual />;
  }
}

export function VisualBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="absolute left-3 top-3 z-10 flex items-center gap-1.5 rounded-full bg-ink/70 px-2.5 py-1 font-mono text-[11px] text-indigo-200 ring-1 ring-white/15 backdrop-blur">
      <Bot size={12} aria-hidden="true" />
      {children}
    </span>
  );
}
