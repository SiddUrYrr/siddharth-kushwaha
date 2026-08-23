import { motion } from "framer-motion";
import { BrainCircuit, Code2, ShieldCheck, Workflow } from "lucide-react";
import { focusItems } from "../data/profile";
import { fadeUp, staggerContainer, viewportOnce } from "../lib/motion";

const focusIcons = [BrainCircuit, ShieldCheck, Code2, Workflow];

export default function Focus() {
  return (
    <section aria-labelledby="focus-heading" className="section-pad">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
        className="mx-auto mb-12 max-w-2xl text-center md:mb-16"
      >
        <motion.p
          variants={fadeUp}
          className="mb-3 font-mono text-xs uppercase tracking-[0.32em] text-indigo-300"
        >
          Right now
        </motion.p>
        <motion.h2
          id="focus-heading"
          variants={fadeUp}
          className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          What I&apos;m Exploring
        </motion.h2>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {focusItems.map((item, i) => {
          const Icon = focusIcons[i % focusIcons.length];
          return (
            <motion.article
              key={item.title}
              variants={fadeUp}
              className="group glass relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-violet-400/40 hover:shadow-glow"
            >
              <div
                aria-hidden="true"
                className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-violet-500/15 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/25 to-violet-500/15 text-indigo-200 ring-1 ring-inset ring-white/10 transition-transform duration-300 group-hover:scale-110">
                <Icon size={20} aria-hidden="true" />
              </span>
              <h3 className="font-display text-base font-semibold text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {item.description}
              </p>
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
}
