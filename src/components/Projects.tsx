import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, FolderGit2 } from "lucide-react";
import { useState } from "react";
import {
  projectFilters,
  projects,
  type Project,
  type ProjectFilter,
} from "../data/projects";
import { cn } from "../lib/utils";
import ProjectVisual from "./ProjectVisual";
import SectionHeading from "./ui/SectionHeading";

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="group glass relative flex flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-400/40 hover:shadow-glow-lg"
    >
      {/* Visual */}
      <div className="relative h-48 overflow-hidden border-b border-white/10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-transparent via-transparent to-white/[0.04] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
        <div className="h-full w-full transition-transform duration-500 group-hover:scale-[1.04]">
          <ProjectVisual visual={project.visual} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-semibold text-white transition-colors group-hover:text-indigo-200">
          {project.title}
        </h3>
        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-zinc-400">
          {project.description}
        </p>

        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies used">
          {project.technologies.map((tech) => (
            <li
              key={tech}
              className="rounded-md border border-white/10 bg-indigo-500/10 px-2.5 py-1 font-mono text-[11px] font-medium text-indigo-200"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-zinc-200 transition-all duration-300 hover:border-indigo-400/50 hover:bg-white/[0.09] hover:text-white"
          >
            <FolderGit2 size={14} aria-hidden="true" />
            GitHub
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-accent-gradient px-4 py-2 text-xs font-semibold text-white shadow-glow transition-all duration-300 hover:shadow-glow-lg hover:brightness-110"
            >
              <ExternalLink size={14} aria-hidden="true" />
              Live Demo
            </a>
          )}
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-accent-gradient opacity-0 transition-opacity duration-500 group-hover:opacity-80"
      />
    </motion.article>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState<ProjectFilter>("All");
  const visible =
    filter === "All" ? projects : projects.filter((p) => p.categories.includes(filter));

  return (
    <section id="projects" aria-labelledby="projects-heading" className="section-pad">
      <SectionHeading
        eyebrow="My work"
        title="Featured Projects"
        subtitle="A selection of projects I've built while exploring software development, AI, and modern technology."
        headingId="projects-heading"
      />

      <div
        role="group"
        aria-label="Filter projects by category"
        className="mb-10 flex flex-wrap justify-center gap-2.5"
      >
        {projectFilters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={cn(
              "rounded-full px-5 py-2 text-sm font-medium transition-all duration-300",
              filter === f
                ? "bg-accent-gradient text-white shadow-glow"
                : "border border-white/10 bg-white/[0.03] text-zinc-400 hover:border-indigo-400/40 hover:text-white"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-6 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {visible.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </AnimatePresence>
      </motion.div>

      <p className="mt-10 text-center font-mono text-sm text-zinc-500">
        More experiments live on my{" "}
        <a
          href="https://github.com/SiddUrYrr"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-300 underline-offset-4 hover:underline"
        >
          GitHub
        </a>
        .
      </p>
    </section>
  );
}
