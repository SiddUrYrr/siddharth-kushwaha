import { BellRing, ChefHat, Sparkles } from "lucide-react";
import type { ProjectVisual } from "../data/projects";

function MapVisual() {
  return (
    <div aria-hidden="true" className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#0b1223]">
      <svg className="absolute inset-0 h-full w-full opacity-40" preserveAspectRatio="none">
        <defs>
          <pattern id="mapgrid" width="36" height="36" patternUnits="userSpaceOnUse">
            <path d="M 36 0 L 0 0 0 36" fill="none" stroke="rgba(96,165,250,0.25)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mapgrid)" />
        <path
          d="M -10 130 C 80 90, 140 160, 230 110 S 380 60, 460 120"
          fill="none"
          stroke="rgba(96,165,250,0.6)"
          strokeWidth="2.5"
          strokeDasharray="7 7"
        />
      </svg>
      <div className="relative">
        <span className="animate-pulse-dot absolute inset-0 rounded-full bg-accent-soft/50" />
        <span className="absolute -inset-3 animate-ping rounded-full border border-accent-soft/40" />
        <span className="relative block h-4 w-4 bg-accent-bright ring-4 ring-accent-soft/20" />
      </div>
      <span className="absolute bottom-3 left-3 border border-line bg-ink px-2.5 py-1 font-mono text-[11px] text-accent-soft">
        26.8467° N, 80.9462° E
      </span>
      <span className="absolute right-3 top-3 border border-emerald-400/30 bg-emerald-400/15 px-2.5 py-1 font-mono text-[11px] font-bold text-emerald-300">
        LIVE
      </span>
    </div>
  );
}

function AiDocVisual() {
  return (
    <div aria-hidden="true" className="relative flex h-full w-full items-center justify-center gap-6 bg-gradient-to-br from-[#101a2e] to-[#0c1220] px-6">
      <div className="w-32 space-y-2 border-2 border-line bg-raised/70 p-3 sm:w-40">
        {[100, 85, 95, 70, 90, 60, 80].map((w, i) => (
          <div key={i} className="h-1.5 bg-slate-500/50" style={{ width: `${w}%` }} />
        ))}
      </div>
      <Sparkles size={22} className="shrink-0 text-accent-soft drop-shadow-[0_0_10px_rgba(96,165,250,0.7)]" />
      <div className="w-28 space-y-2 border-2 border-accent-bright bg-accent/15 p-3 shadow-hard-sm sm:w-32">
        {[90, 65, 75].map((w, i) => (
          <div key={i} className="h-1.5 bg-blue-300/70" style={{ width: `${w}%` }} />
        ))}
      </div>
    </div>
  );
}

function RecipeVisual() {
  const ideas = ["Pasta", "Salad", "Soup"];
  return (
    <div aria-hidden="true" className="relative flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#131c2e] to-[#0d1424] px-6 py-6">
      <ChefHat size={34} className="text-accent-soft drop-shadow-[0_0_14px_rgba(96,165,250,0.45)]" />
      <div className="flex flex-wrap justify-center gap-2">
        {ideas.map((idea) => (
          <span
            key={idea}
            className="border-2 border-line bg-raised/70 px-3 py-1 text-xs font-medium text-dim"
          >
            {idea}
          </span>
        ))}
      </div>
      <p className="font-mono text-[11px] text-slate-500">matching recipes found…</p>
    </div>
  );
}

function CalculatorVisual() {
  const keys = ["7", "8", "9", "sin", "det", "A⁻¹"];
  return (
    <div aria-hidden="true" className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#101a2e] to-[#0c1220] px-6 py-6">
      <div className="w-44 border-2 border-line bg-raised/80 p-3">
        <div className="mb-2.5 truncate border-2 border-line bg-ink px-3 py-2 text-right font-mono text-xs text-emerald-300">
          det(A) = −42.0
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {keys.map((key) => (
            <span
              key={key}
              className="border border-line bg-surface py-1.5 text-center font-mono text-[11px] text-dim"
            >
              {key}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function EditorVisual() {
  const lines = [
    { w: "55%", c: "bg-accent-soft/70" },
    { w: "75%", c: "bg-slate-500/60" },
    { w: "40%", c: "bg-emerald-300/60" },
    { w: "65%", c: "bg-slate-500/60" },
    { w: "50%", c: "bg-blue-300/70" },
    { w: "70%", c: "bg-slate-500/60" },
    { w: "35%", c: "bg-emerald-300/60" },
  ];
  return (
    <div aria-hidden="true" className="flex h-full w-full flex-col bg-[#0b1223] px-6 py-5">
      <div className="mb-3 flex items-center gap-2">
        <span className="border border-line bg-raised px-2.5 py-1 font-mono text-[10px] text-dim">
          index.html
        </span>
        <span className="px-2.5 py-1 font-mono text-[10px] text-slate-500">style.css</span>
      </div>
      <div className="flex flex-1 gap-3">
        <div className="hidden w-16 shrink-0 space-y-2.5 border-r border-line pr-3 sm:block">
          {[85, 60, 75, 50, 70].map((w, i) => (
            <div key={i} className="h-1.5 bg-slate-600/50" style={{ width: `${w}%` }} />
          ))}
        </div>
        <div className="flex-1 space-y-2 pt-1">
          {lines.map((line, i) => (
            <div key={i} className={`h-1.5 ${line.c}`} style={{ width: line.w }} />
          ))}
          <span className="ml-0.5 inline-block h-3 w-1.5 animate-pulse bg-accent-bright align-middle" />
        </div>
      </div>
      <p className="mt-3 font-mono text-[11px] text-slate-500">pixel-accurate UI recreation</p>
    </div>
  );
}

function PnrVisual() {
  return (
    <div aria-hidden="true" className="flex h-full w-full items-center justify-center bg-[#101a2e] px-6">
      <div className="w-full max-w-xs border-2 border-line bg-raised/80 p-4">
        <div className="flex items-center justify-between border-b-2 border-line pb-2.5">
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-accent-soft">
            PNR
          </span>
          <span className="font-mono text-sm font-bold text-paper">4253XXXXXX</span>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2.5">
          <div>
            <p className="font-mono text-[10px] uppercase text-slate-500">Train</p>
            <p className="mt-0.5 font-mono text-xs text-dim">12951 MMCT Tejas</p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase text-slate-500">Date</p>
            <p className="mt-0.5 font-mono text-xs text-dim">23 - 08 - 2026</p>
          </div>
        </div>
        <div className="mt-3.5 flex items-center gap-1.5">
          <span className="h-2 w-2 bg-accent-bright" />
          <span className="h-0.5 flex-1 bg-line" />
          <span className="h-2 w-2 bg-line" />
          <span className="h-0.5 flex-1 bg-line" />
          <span className="h-2 w-2 bg-emerald-400" />
        </div>
        <p className="mt-3 inline-block border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 font-mono text-[10px] font-bold uppercase text-emerald-300">
          Confirmed
        </p>
      </div>
    </div>
  );
}

function ReminderVisual() {
  const tasks = [
    { label: "Team standup", done: true },
    { label: "Submit assignment", done: true },
    { label: "LeetCode daily", done: false },
  ];
  return (
    <div aria-hidden="true" className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#131c2e] to-[#0d1424] px-6">
      <div className="w-full max-w-xs border-2 border-line bg-raised/80 p-4">
        <div className="mb-3 flex items-center gap-2">
          <BellRing size={15} className="text-accent-soft" />
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-paper">
            Reminders
          </span>
        </div>
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task.label}
              className="flex items-center gap-2.5 border border-line bg-ink px-3 py-2"
            >
              <span
                className={`h-2.5 w-2.5 shrink-0 border-2 ${
                  task.done ? "border-accent-bright bg-accent" : "border-line"
                }`}
              />
              <span
                className={`font-mono text-[11px] ${
                  task.done ? "text-slate-500 line-through" : "text-dim"
                }`}
              >
                {task.label}
              </span>
            </li>
          ))}
        </ul>
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
    case "editor":
      return <EditorVisual />;
    case "pnr":
      return <PnrVisual />;
    case "reminder":
      return <ReminderVisual />;
  }
}
