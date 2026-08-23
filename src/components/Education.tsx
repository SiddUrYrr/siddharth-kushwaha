import { motion } from "framer-motion";
import { GraduationCap, School } from "lucide-react";
import { education } from "../data/profile";
import { cn } from "../lib/utils";
import SectionHeading from "./ui/SectionHeading";

export default function Education() {
  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="section-pad bg-surface/40"
    >
      <SectionHeading
        eyebrow="My journey"
        title="Education"
        headingId="education-heading"
      />

      <div className="relative mx-auto max-w-2xl">
        {/* Animated timeline line */}
        <motion.span
          aria-hidden="true"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute left-[13px] top-2 h-[calc(100%-16px)] w-px origin-top bg-gradient-to-b from-indigo-400 via-violet-500/50 to-transparent"
        />

        <ol className="space-y-10">
          {education.map((entry) => (
            <motion.li
              key={entry.institution}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="relative pl-12"
            >
              {/* Timeline dot */}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute left-0 top-1 flex h-7 w-7 items-center justify-center rounded-full ring-1",
                  entry.current
                    ? "bg-indigo-500/20 text-indigo-300 ring-indigo-400/40 shadow-glow"
                    : "bg-white/5 text-zinc-400 ring-white/15"
                )}
              >
                {entry.current ? (
                  <GraduationCap size={14} />
                ) : (
                  <School size={14} />
                )}
                {entry.current && (
                  <span className="animate-pulse-dot absolute inset-0 rounded-full bg-indigo-400/30" />
                )}
              </span>

              <article className="glass rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/40 hover:shadow-glow">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <h3 className="font-display text-lg font-semibold text-white">
                    {entry.institution}
                  </h3>
                  <span
                    className={cn(
                      "rounded-full px-3 py-1 font-mono text-[11px] font-medium",
                      entry.current
                        ? "bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-400/30"
                        : "bg-white/5 text-zinc-400 ring-1 ring-white/10"
                    )}
                  >
                    {entry.period}
                  </span>
                </div>
                <p className="mt-1.5 text-sm font-medium text-indigo-200/90">
                  {entry.degree}
                </p>
                <p className="mt-2.5 text-sm leading-relaxed text-zinc-400">
                  {entry.detail}
                </p>
              </article>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
