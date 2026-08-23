import { motion } from "framer-motion";
import {
  Bot,
  Code2,
  GraduationCap,
  MapPin,
  Rocket,
  ShieldCheck,
} from "lucide-react";
import { profile } from "../data/profile";
import { fadeUp, staggerContainer, viewportOnce } from "../lib/motion";

const infoCards = [
  { icon: GraduationCap, label: "Education", value: "BCA — Quantum University of Technology" },
  { icon: Code2, label: "Focus", value: "Software Development" },
  { icon: Bot, label: "Interests", value: "AI & Automation" },
  { icon: ShieldCheck, label: "Exploration", value: "Cybersecurity" },
  { icon: MapPin, label: "Based In", value: "Uttar Pradesh, India" },
  { icon: Rocket, label: "Approach", value: "Learn • Build • Improve" },
];

function CodeEditorVisual() {
  return (
    <div aria-hidden="true" className="relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.6 }}
        className="glass relative rounded-2xl p-1 shadow-card"
      >
        <div className="absolute -inset-px -z-10 rounded-2xl bg-accent-gradient opacity-20 blur-md" />
        <div className="rounded-xl bg-surface/90">
          <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
            <span className="ml-3 font-mono text-xs text-zinc-500">about_me.py</span>
          </div>
          <pre className="overflow-x-auto px-5 py-5 font-mono text-[13px] leading-7 sm:text-sm">
            <code>
              <span className="text-fuchsia-400">class</span>{" "}
              <span className="text-sky-300">Developer</span>
              <span className="text-zinc-400">:</span>
              {"\n"}
              {"    "}
              <span className="text-fuchsia-400">def</span>{" "}
              <span className="text-emerald-300">__init__</span>
              <span className="text-zinc-400">(</span>
              <span className="text-orange-300">self</span>
              <span className="text-zinc-400">):</span>
              {"\n"}
              {"        "}self.name ={" "}
              <span className="text-amber-200">&quot;Siddharth Kushwaha&quot;</span>
              {"\n"}
              {"        "}self.role ={" "}
              <span className="text-amber-200">&quot;BCA Student &amp; Developer&quot;</span>
              {"\n"}
              {"        "}self.stack = [{" "}
              <span className="text-amber-200">&quot;Python&quot;</span>,{" "}
              <span className="text-amber-200">&quot;AI&quot;</span>,{" "}
              <span className="text-amber-200">&quot;Security&quot;</span> ]
              {"\n\n"}
              {"    "}
              <span className="text-fuchsia-400">def</span>{" "}
              <span className="text-emerald-300">daily_goal</span>
              <span className="text-zinc-400">(</span>
              <span className="text-orange-300">self</span>
              <span className="text-zinc-400">):</span>
              {"\n"}
              {"        "}<span className="text-fuchsia-400">return</span>{" "}
              <span className="text-amber-200">&quot;Learn, build, improve.&quot;</span>
              <span className="ml-1 inline-block h-4 w-2 animate-pulse bg-indigo-300 align-middle" />
            </code>
          </pre>
        </div>

        {/* Floating chips */}
        <span className="animate-float-slow absolute -right-4 -top-4 hidden rounded-lg border border-indigo-400/30 bg-ink px-3 py-1.5 font-mono text-xs text-indigo-300 shadow-glow sm:block">
          Python
        </span>
        <span
          className="animate-float-slow absolute -bottom-4 -left-4 hidden rounded-lg border border-violet-400/30 bg-ink px-3 py-1.5 font-mono text-xs text-violet-300 shadow-glow sm:block"
          style={{ animationDelay: "1.4s" }}
        >
          AI + Security
        </span>
      </motion.div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="section-pad">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
        className="mx-auto mb-14 max-w-2xl text-center md:mb-20"
      >
        <motion.p
          variants={fadeUp}
          className="mb-3 font-mono text-xs uppercase tracking-[0.32em] text-indigo-300"
        >
          Get to know me
        </motion.p>
        <motion.h2
          id="about-heading"
          variants={fadeUp}
          className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          About Me
        </motion.h2>
      </motion.div>

      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <CodeEditorVisual />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          <motion.p
            variants={fadeUp}
            className="leading-relaxed text-zinc-400 sm:text-lg"
          >
            {profile.aboutText}
          </motion.p>
          <motion.p variants={fadeUp} className="mt-4 font-medium italic text-indigo-200/80">
            &ldquo;{profile.tagline}&rdquo;
          </motion.p>

          <motion.ul
            variants={staggerContainer}
            className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {infoCards.map((card) => (
              <motion.li
                key={card.label}
                variants={fadeUp}
                className="group glass flex items-start gap-3.5 rounded-xl p-4 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/40 hover:bg-white/[0.07]"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-500/15 text-indigo-300 ring-1 ring-inset ring-white/10 transition-colors group-hover:text-white">
                  <card.icon size={17} aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    {card.label}
                  </span>
                  <span className="mt-0.5 block text-sm font-medium text-zinc-200">
                    {card.value}
                  </span>
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}
