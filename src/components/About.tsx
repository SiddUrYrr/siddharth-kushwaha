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
import SectionHeading from "./ui/SectionHeading";

const infoCards = [
  { icon: GraduationCap, label: "Education", value: "BCA — Quantum University, Roorkee" },
  { icon: Code2, label: "Focus", value: "Software Development" },
  { icon: Bot, label: "Interests", value: "AI, Open Source & Web" },
  { icon: ShieldCheck, label: "Exploration", value: "Cybersecurity" },
  { icon: MapPin, label: "Based In", value: "Uttar Pradesh, India" },
  { icon: Rocket, label: "Approach", value: "Learn • Build • Improve" },
];

function CodeEditorVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <div aria-hidden="true" className="panel relative p-1 shadow-hard-lg">
        <div className="bg-ink">
          <div className="flex items-center gap-2 border-b-2 border-line px-4 py-3">
            <span className="h-2.5 w-2.5 bg-red-400/80" />
            <span className="h-2.5 w-2.5 bg-yellow-400/80" />
            <span className="h-2.5 w-2.5 bg-green-400/80" />
            <span className="ml-3 font-mono text-xs text-slate-500">about_me.py</span>
          </div>
          <pre className="overflow-x-auto px-5 py-5 font-mono text-[13px] leading-7 sm:text-sm">
            <code>
              <span className="text-accent-bright">class</span>{" "}
              <span className="text-emerald-300">Developer</span>
              <span className="text-slate-500">:</span>
              {"\n"}
              {"    "}
              <span className="text-accent-bright">def</span>{" "}
              <span className="text-emerald-300">__init__</span>
              <span className="text-slate-400">(</span>
              <span className="text-orange-300">self</span>
              <span className="text-slate-400">):</span>
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
              <span className="text-accent-bright">def</span>{" "}
              <span className="text-emerald-300">daily_goal</span>
              <span className="text-slate-400">(</span>
              <span className="text-orange-300">self</span>
              <span className="text-slate-400">):</span>
              {"\n"}
              {"        "}<span className="text-accent-bright">return</span>{" "}
              <span className="text-amber-200">&quot;Learn, build, improve.&quot;</span>
              <span className="ml-1 inline-block h-4 w-2 animate-pulse bg-accent-soft align-middle" />
            </code>
          </pre>
        </div>
      </div>

      {/* Floating tags */}
      <span
        aria-hidden="true"
        className="animate-float absolute -right-3 -top-3 hidden border-2 border-line bg-ink px-3 py-1.5 font-mono text-xs text-accent-soft shadow-hard-sm sm:block"
      >
        Python
      </span>
      <span
        aria-hidden="true"
        className="animate-float absolute -bottom-3 -left-3 hidden border-2 border-line bg-ink px-3 py-1.5 font-mono text-xs text-accent-soft shadow-hard-sm sm:block"
        style={{ animationDelay: "1.4s" }}
      >
        AI + Security
      </span>
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="section-pad">
      <SectionHeading index="01" eyebrow="Get to know me" title="About Me" headingId="about-heading" />

      <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <CodeEditorVisual />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          <motion.p variants={fadeUp} className="leading-relaxed text-dim sm:text-lg">
            {profile.aboutText}
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="mt-5 border-l-4 border-accent pl-4 font-medium italic text-paper"
          >
            &ldquo;{profile.tagline}&rdquo;
          </motion.p>

          <motion.ul
            variants={staggerContainer}
            className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {infoCards.map((card) => (
              <motion.li
                key={card.label}
                variants={fadeUp}
                className="group panel flex items-start gap-3.5 p-4 transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-line bg-raised text-accent-soft transition-colors group-hover:border-accent-bright">
                  <card.icon size={17} aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-mono text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    {card.label}
                  </span>
                  <span className="mt-0.5 block text-sm font-medium text-dim">
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
