export interface SkillCategory {
  id: string;
  title: string;
  accent: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "programming",
    title: "Programming",
    accent: "from-blue-500/20 to-indigo-500/10 text-blue-300",
    skills: ["Python", "C++", "Java Basics", "SQL", "HTML", "CSS"],
  },
  {
    id: "automation-testing",
    title: "Automation & Testing",
    accent: "from-violet-500/20 to-purple-500/10 text-violet-300",
    skills: [
      "Selenium WebDriver",
      "Pytest",
      "Page Object Model",
      "Manual Testing",
      "API Testing",
      "JMeter",
    ],
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    accent: "from-fuchsia-500/20 to-pink-500/10 text-fuchsia-300",
    skills: [
      "API Security",
      "OAuth 2.0",
      "Vulnerability Scanning",
      "Network Security Basics",
      "OWASP Top 10",
    ],
  },
  {
    id: "tools",
    title: "Tools",
    accent: "from-sky-500/20 to-cyan-500/10 text-sky-300",
    skills: ["Git", "GitHub", "GitHub Actions", "Postman", "Jira"],
  },
  {
    id: "concepts",
    title: "Concepts",
    accent: "from-indigo-500/20 to-blue-500/10 text-indigo-300",
    skills: [
      "Object-Oriented Programming",
      "SDLC",
      "STLC",
      "QA Methodologies",
      "Database Concepts",
    ],
  },
];
