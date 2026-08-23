export interface SkillCategory {
  id: string;
  title: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "programming",
    title: "Programming",
    skills: ["Python", "C++", "Java (Basics)", "SQL", "HTML", "CSS", "JavaScript (Basics)"],
  },
  {
    id: "automation-testing",
    title: "Automation & Testing",
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
    skills: ["Git", "GitHub", "GitHub Actions", "VS Code", "Streamlit", "REST APIs", "Postman", "Jira"],
  },
  {
    id: "concepts",
    title: "Core Subjects",
    skills: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "DBMS",
      "Operating Systems",
      "Computer Networks",
      "SDLC & STLC",
    ],
  },
];
