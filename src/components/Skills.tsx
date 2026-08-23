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
    <section id="skills" aria-labelledby="skills-heading" className="section-pad border-y-2 border-line bg-raised/30">
      <SectionHeading
        index="02"
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
              className="group panel relative p-6 transition-all duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:border-accent-bright hover:shadow-hard"
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center border-2 border-line bg-raised text-accent-soft transition-colors group-hover:border-accent-bright">
                  <Icon size={18} aria-hidden="true" />
                </span>
                <h3 className="font-display text-lg font-bold uppercase tracking-tight text-paper">
                  {category.title}
                </h3>
              </div>
              <ul className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <li
                    key={skill}
                    className="cursor-default border border-line bg-ink px-3 py-1.5 font-mono text-xs text-dim transition-colors duration-150 hover:border-accent-bright hover:text-paper"
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
          className="relative flex flex-col justify-center border-2 border-dashed border-line p-6"
        >
          <p className="font-mono text-sm leading-relaxed text-dim">
            <span className="text-accent-soft">&gt;</span> always learning
            <span className="text-emerald-300">_</span>
          </p>
          <p className="mt-2 text-sm text-slate-500">
            New tools and concepts added as I grow.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
