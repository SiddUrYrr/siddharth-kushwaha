import { motion } from "framer-motion";
import { Award, Github, GraduationCap, Target } from "lucide-react";
import { achievements } from "../data/profile";
import { fadeUp, staggerContainer, viewportOnce } from "../lib/motion";
import SectionHeading from "./ui/SectionHeading";

const achievementIcons = [GraduationCap, Award, Github, Target];

export default function Achievements() {
  return (
    <section
      id="achievements"
      aria-labelledby="achievements-heading"
      className="section-pad"
    >
      <SectionHeading
        index="04"
        eyebrow="Highlights"
        title="Achievements"
        headingId="achievements-heading"
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {achievements.map((achievement, i) => {
          const Icon = achievementIcons[i % achievementIcons.length];
          return (
            <motion.article
              key={achievement.title}
              variants={fadeUp}
              className="group panel relative p-6 transition-all duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:border-accent-bright hover:shadow-hard"
            >
              <span className="mb-4 flex h-11 w-11 items-center justify-center border-2 border-line bg-raised text-accent-soft transition-colors duration-200 group-hover:border-accent-bright">
                <Icon size={20} aria-hidden="true" />
              </span>
              <h3 className="font-display text-lg font-extrabold uppercase tracking-tight text-paper">
                {achievement.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-dim">
                {achievement.detail}
              </p>
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
}
