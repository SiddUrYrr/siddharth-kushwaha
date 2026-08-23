export type ProjectFilter = "All" | "Python" | "AI" | "Web" | "JavaScript";
export type ProjectVisual = "map" | "ai-doc" | "recipe" | "calculator";

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  categories: Exclude<ProjectFilter, "All">[];
  github: string;
  demo?: string;
  visual: ProjectVisual;
}

export const projectFilters: ProjectFilter[] = ["All", "Python", "AI", "Web", "JavaScript"];

export const projects: Project[] = [
  {
    id: "live-location-tracker",
    title: "Live Location Tracker",
    description:
      "A real-time GPS location tracking web application that captures and displays live coordinates on an interactive map.",
    technologies: ["JavaScript", "Node.js", "Express", "Geolocation API", "Interactive Maps"],
    categories: ["JavaScript", "Web"],
    github: "https://github.com/SiddUrYrr/live-location-tracker",
    demo: "https://live-location-tracker-kappa.vercel.app/",
    visual: "map",
  },
  {
    id: "ai-text-summarizer",
    title: "AI Text Summarizer",
    description:
      "An AI-powered application designed to transform lengthy text into concise, readable summaries.",
    technologies: ["Python", "AI", "Natural Language Processing"],
    categories: ["Python", "AI"],
    github: "https://github.com/SiddUrYrr/Ai-Text-Summarizer",
    visual: "ai-doc",
  },
  {
    id: "recipe-suggestion-bot",
    title: "Recipe Suggestion Bot",
    description:
      "A smart recipe recommendation project designed to help users discover recipe ideas based on their requirements.",
    technologies: ["Python", "AI", "Recommendation Logic"],
    categories: ["Python", "AI"],
    github: "https://github.com/SiddUrYrr/recipe-suggestion-bot",
    visual: "recipe",
  },
  {
    id: "pocketcalc",
    title: "PocketCalc",
    description:
      "A modern calculator application featuring mathematical operations including matrix calculations, determinants, and trigonometric functions.",
    technologies: ["Python", "Streamlit", "Mathematics", "Matrix Operations"],
    categories: ["Python"],
    github: "https://github.com/SiddUrYrr/PocketCalc",
    visual: "calculator",
  },
];
