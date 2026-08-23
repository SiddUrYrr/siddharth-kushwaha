import { motion } from "framer-motion";
import {
  BrainCircuit,
  Code2,
  FlaskConical,
  Lightbulb,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { skillCategories } from "../data/skills";
import { fadeUp, staggerContainer, viewportOnce } from "../lib/motion";
import SectionHeading from "./ui/SectionHeading";

const categoryIcons: Record<string, typeof Code2> = {
  programming: Code2,
  "automation-testing": FlaskConical,
  cybersecurity: ShieldCheck,
  tools: Wrench,
  concepts: BrainCircuit,
};

export default function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="section-pad bg-surface/40"
    >
      <SectionHeading
        eyebrow="My toolbox"
        title="Skills & Technologies"
        subtitle="Technologies and concepts I work with while building projects and learning every day."
        headingId="skills-heading"
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {skillCategories.map((category) => {
          const Icon = categoryIcons[category.id] ?? Lightbulb;
          return (
            <motion.article
              key={category.id}
              variants={fadeUp}
              className="group glass relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-400/40 hover:shadow-glow"
            >
              <div
                aria-hidden="true"
                className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${category.accent} blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-60`}
              />
              <div className="mb-5 flex items-center gap-3">
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${category.accent} ring-1 ring-inset ring-white/10`}
                >
                  <Icon size={18} aria-hidden="true" />
                </span>
                <h3 className="font-display text-lg font-semibold text-white">
                  {category.title}
                </h3>
              </div>
              <ul className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <li
                    key={skill}
                    className="cursor-default rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[13px] font-medium text-zinc-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-400/50 hover:bg-white/[0.08] hover:text-white"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.article>
          );
        })}

        {/* Filler card to balance the grid */}
        <motion.div
          variants={fadeUp}
          className="relative flex flex-col justify-center overflow-hidden rounded-2xl border border-dashed border-white/15 bg-transparent p-6"
        >
          <p className="font-mono text-sm leading-relaxed text-zinc-500">
            <span className="text-indigo-300">&gt;</span> always learning
            <span className="text-emerald-300">_</span>
          </p>
          <p className="mt-2 text-sm text-zinc-500">
            New tools and concepts added as I grow.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
