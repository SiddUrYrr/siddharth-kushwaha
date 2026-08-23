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
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group panel relative flex flex-col overflow-hidden transition-all duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:border-accent-bright hover:shadow-hard-lg"
    >
      {/* Visual */}
      <div className="relative h-48 overflow-hidden border-b-2 border-line">
        <div className="h-full w-full transition-transform duration-500 group-hover:scale-[1.03]">
          <ProjectVisual visual={project.visual} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-extrabold uppercase tracking-tight text-paper">
          {project.title}
        </h3>
        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-dim">
          {project.description}
        </p>

        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies used">
          {project.technologies.map((tech) => (
            <li
              key={tech}
              className="border border-line bg-raised/60 px-2.5 py-1 font-mono text-[11px] font-medium text-accent-soft"
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
            className="inline-flex cursor-pointer items-center gap-2 border-2 border-line px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-wider text-dim transition-colors duration-150 hover:border-accent-bright hover:text-paper"
          >
            <FolderGit2 size={14} aria-hidden="true" />
            GitHub
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex cursor-pointer items-center gap-2 border-2 border-ink bg-accent px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-wider text-paper shadow-hard-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-hard active:translate-y-0 active:shadow-hard-sm"
            >
              <ExternalLink size={14} aria-hidden="true" />
              Live Demo
            </a>
          )}
        </div>
      </div>
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
        index="03"
        eyebrow="My work"
        title="Featured Projects"
        subtitle="A selection of projects I've built while exploring software development, AI, and modern technology."
        headingId="projects-heading"
      />

      <div
        role="group"
        aria-label="Filter projects by category"
        className="mb-10 flex flex-wrap gap-2.5"
      >
        {projectFilters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={cn(
              "cursor-pointer border-2 px-5 py-2 font-mono text-xs font-semibold uppercase tracking-wider transition-all duration-150",
              filter === f
                ? "border-accent-bright bg-accent text-paper shadow-hard-sm"
                : "border-line text-dim hover:border-accent-bright hover:text-paper"
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

      <p className="mt-10 font-mono text-sm text-slate-500">
        More experiments live on my{" "}
        <a
          href="https://github.com/SiddUrYrr"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent-soft underline underline-offset-4 hover:text-paper"
        >
          GitHub
        </a>
        .
      </p>
    </section>
  );
}
