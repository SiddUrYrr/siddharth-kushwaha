import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "../../lib/motion";

interface SectionHeadingProps {
  index?: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  headingId: string;
}

export default function SectionHeading({
  index,
  eyebrow,
  title,
  subtitle,
  headingId,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer}
      className="mb-12 md:mb-16"
    >
      <motion.p
        variants={fadeUp}
        className="flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.32em] text-accent-soft"
      >
        <span aria-hidden="true" className="inline-block h-2.5 w-2.5 shrink-0 bg-accent-bright" />
        {index && (
          <>
            <span className="text-dim">{index}</span>
            <span aria-hidden="true" className="h-px w-10 bg-line" />
          </>
        )}
        {eyebrow}
      </motion.p>
      <motion.h2
        id={headingId}
        variants={fadeUp}
        className="mt-4 font-display text-3xl font-extrabold uppercase tracking-tight text-paper sm:text-4xl lg:text-[2.75rem] lg:leading-tight"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p variants={fadeUp} className="mt-4 max-w-2xl leading-relaxed text-dim">
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
