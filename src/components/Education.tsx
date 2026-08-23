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
      className="section-pad border-y-2 border-line bg-raised/30"
    >
      <SectionHeading index="05" eyebrow="My journey" title="Education" headingId="education-heading" />

      <div className="relative mx-auto max-w-2xl">
        {/* Timeline spine */}
        <motion.span
          aria-hidden="true"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute bottom-2 left-[11px] top-2 w-0.5 origin-top bg-line"
        />

        <ol className="space-y-8">
          {education.map((entry) => (
            <motion.li
              key={entry.institution}
              initial={{ opacity: 0, x: -22 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="relative pl-11"
            >
              {/* Timeline marker */}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute left-0 top-1 flex h-6 w-6 items-center justify-center border-2 bg-ink",
                  entry.current
                    ? "border-accent-bright text-accent-soft"
                    : "border-line text-dim"
                )}
              >
                {entry.current ? <GraduationCap size={12} /> : <School size={12} />}
                {entry.current && (
                  <span className="animate-pulse-dot absolute inset-0 bg-accent-soft/30" />
                )}
              </span>

              <article className="panel p-6 transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:border-accent-bright hover:shadow-hard">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <h3 className="font-display text-lg font-bold uppercase tracking-tight text-paper">
                    {entry.institution}
                  </h3>
                  <span
                    className={cn(
                      "border-2 px-2.5 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider",
                      entry.current
                        ? "border-emerald-400/40 text-emerald-300"
                        : "border-line text-dim"
                    )}
                  >
                    {entry.period}
                  </span>
                </div>
                <p className="mt-1.5 text-sm font-semibold text-accent-soft">
                  {entry.degree}
                </p>
                <p className="mt-2.5 text-sm leading-relaxed text-dim">
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
