import { motion } from "framer-motion";
import { BrainCircuit, Code2, ShieldCheck, Workflow } from "lucide-react";
import { focusItems } from "../data/profile";
import { fadeUp, staggerContainer, viewportOnce } from "../lib/motion";
import SectionHeading from "./ui/SectionHeading";

const focusIcons = [BrainCircuit, ShieldCheck, Code2, Workflow];

export default function Focus() {
  return (
    <section aria-labelledby="focus-heading" className="section-pad">
      <SectionHeading index="06" eyebrow="Right now" title="What I'm Exploring" headingId="focus-heading" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {focusItems.map((item, i) => {
          const Icon = focusIcons[i % focusIcons.length];
          return (
            <motion.article
              key={item.title}
              variants={fadeUp}
              className="group panel relative overflow-hidden p-6 transition-all duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:border-accent-bright hover:shadow-hard"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-2 right-3 font-display text-5xl font-black text-raised transition-colors duration-200 group-hover:text-line"
              >
                0{i + 1}
              </span>
              <span className="mb-4 flex h-11 w-11 items-center justify-center border-2 border-line bg-raised text-accent-soft transition-colors duration-200 group-hover:border-accent-bright">
                <Icon size={20} aria-hidden="true" />
              </span>
              <h3 className="font-display text-base font-bold uppercase tracking-tight text-paper">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-dim">
                {item.description}
              </p>
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
}
