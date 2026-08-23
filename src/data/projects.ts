export type ProjectFilter =
  | "All"
  | "Python"
  | "AI"
  | "Web"
  | "JavaScript"
  | "Android";
export type ProjectVisual =
  | "map"
  | "ai-doc"
  | "recipe"
  | "calculator"
  | "editor"
  | "pnr"
  | "reminder";

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

export const projectFilters: ProjectFilter[] = [
  "All",
  "Python",
  "AI",
  "Web",
  "JavaScript",
  "Android",
];

export const projects: Project[] = [
  {
    id: "live-location-tracker",
    title: "Live Location Tracker",
    description:
      "A real-time GPS location-sharing web application supporting continuous location updates for connected users, displayed on an interactive map with a low-latency tracking experience.",
    technologies: ["JavaScript", "Node.js", "Express", "Geolocation API", "Interactive Maps"],
    categories: ["JavaScript", "Web"],
    github: "https://github.com/SiddUrYrr/live-location-tracker",
    demo: "https://live-location-tracker-kappa.vercel.app/",
    visual: "map",
  },
  {
    id: "vs-code-web-clone",
    title: "VS Code Web Clone",
    description:
      "A responsive clone of the Visual Studio Code editor interface built entirely for the web, strengthening frontend and UI/UX skills through pixel-accurate component design.",
    technologies: ["HTML", "CSS", "JavaScript", "UI/UX Design"],
    categories: ["JavaScript", "Web"],
    github: "https://github.com/SiddUrYrr/VS-Code-Web-Clone",
    visual: "editor",
  },
  {
    id: "railway-pnr-status-checker",
    title: "Railway PNR Status Checker",
    description:
      "A Python application that retrieves real-time Indian Railways PNR status via REST API integration, with robust error handling for reliable performance across varied inputs.",
    technologies: ["Python", "REST API", "RapidAPI", "Error Handling"],
    categories: ["Python"],
    github: "https://github.com/SiddUrYrr/Railway-PNR-Status-Checker",
    visual: "pnr",
  },
  {
    id: "ai-text-summarizer",
    title: "AI Text Summarizer",
    description:
      "An offline, AI-powered application that transforms lengthy text into concise, readable summaries using Hugging Face Transformers.",
    technologies: ["Python", "AI", "Hugging Face", "NLP", "Streamlit"],
    categories: ["Python", "AI"],
    github: "https://github.com/SiddUrYrr/Ai-Text-Summarizer",
    visual: "ai-doc",
  },
  {
    id: "recipe-suggestion-bot",
    title: "Recipe Suggestion Bot",
    description:
      "A smart recipe recommendation app that suggests dishes based on the ingredients you already have at home.",
    technologies: ["Python", "AI", "Recommendation Logic"],
    categories: ["Python", "AI"],
    github: "https://github.com/SiddUrYrr/recipe-suggestion-bot",
    visual: "recipe",
  },
  {
    id: "pocketcalc",
    title: "PocketCalc",
    description:
      "A sleek, phone-style calculator web app featuring matrix calculations, determinants & inverse, and trigonometric computations.",
    technologies: ["Python", "Streamlit", "Mathematics", "Matrix Operations"],
    categories: ["Python"],
    github: "https://github.com/SiddUrYrr/PocketCalc",
    visual: "calculator",
  },
  {
    id: "remindly",
    title: "Remindly",
    description:
      "A native Android reminder app built with Kotlin for creating and managing day-to-day reminders on the go.",
    technologies: ["Kotlin", "Android", "Mobile Development"],
    categories: ["Android"],
    github: "https://github.com/SiddUrYrr/Remindly",
    visual: "reminder",
  },
];
