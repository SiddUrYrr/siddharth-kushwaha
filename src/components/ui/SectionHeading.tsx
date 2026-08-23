import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "../../lib/motion";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  headingId: string;
}

export default function SectionHeading({
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
      className="mx-auto mb-14 max-w-2xl text-center md:mb-20"
    >
      <motion.p
        variants={fadeUp}
        className="mb-3 font-mono text-xs uppercase tracking-[0.32em] text-indigo-300"
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        id={headingId}
        variants={fadeUp}
        className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p variants={fadeUp} className="mt-4 leading-relaxed text-zinc-400">
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
