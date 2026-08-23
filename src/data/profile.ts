export const profile = {
  name: "Siddharth Kushwaha",
  roles: "BCA Student • Python Developer • AI & Cybersecurity Enthusiast",
  tagline:
    "Building practical solutions with code, AI, automation, and modern technology.",
  heroDescription:
    "I'm a BCA student passionate about building practical software projects and exploring Python, AI, automation, cybersecurity, and modern web technologies.",
  aboutText:
    "I'm Siddharth Kushwaha, a 2nd-year BCA student at Quantum University, Roorkee (CGPA 7.74/10) with a strong foundation in Python, C++, SQL, and web development. I enjoy translating problem statements into working software — from real-time trackers to AI-powered tools — while sharpening my problem-solving through Data Structures & Algorithms practice on LeetCode. Across 5+ hackathons, I've learned to collaborate quickly, build prototypes under pressure, and ship projects that solve real problems.",
  location: "Uttar Pradesh, India",
  university: "Quantum University, Roorkee",
  course: "Bachelor of Computer Applications (BCA)",
  year: "Currently pursuing — 2nd Year",
  school: "Aryan Public School",
  email: "siddharthe12345@gmail.com",
} as const;

export interface Social {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "leetcode";
}

export const socials: Social[] = [
  { label: "GitHub", href: "https://github.com/SiddUrYrr", icon: "github" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/siddharth-kushwaha-13b07b378/",
    icon: "linkedin",
  },
  { label: "LeetCode", href: "https://leetcode.com/u/YxW3qF3T49/", icon: "leetcode" },
];

export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export interface Achievement {
  title: string;
  detail: string;
}

export const achievements: Achievement[] = [
  {
    title: "CGPA 7.74 / 10",
    detail:
      "Strong academic record maintained throughout the BCA program so far.",
  },
  {
    title: "5+ Hackathons",
    detail:
      "Built functional prototypes under time constraints in collaborative team settings.",
  },
  {
    title: "Shipped Projects",
    detail:
      "Multiple real-world software projects published on an active GitHub profile.",
  },
  {
    title: "DSA on LeetCode",
    detail:
      "Consistently solving Data Structures & Algorithms problems to sharpen problem-solving.",
  },
];

export interface FocusItem {
  title: string;
  description: string;
}

export const focusItems: FocusItem[] = [
  {
    title: "Artificial Intelligence",
    description: "Exploring AI-powered applications and practical automation.",
  },
  {
    title: "Cybersecurity",
    description:
      "Learning application security, APIs, vulnerabilities, and security concepts.",
  },
  {
    title: "Software Development",
    description:
      "Building practical applications and improving programming fundamentals.",
  },
  {
    title: "Automation",
    description: "Exploring automated testing and development workflows.",
  },
  {
    title: "Open Source",
    description:
      "Learning from and contributing to open-source projects and communities.",
  },
  {
    title: "Competitive Programming",
    description:
      "Practicing DSA problems regularly to strengthen core problem-solving skills.",
  },
];

export interface EducationEntry {
  institution: string;
  degree: string;
  period: string;
  detail: string;
  current?: boolean;
}

export const education: EducationEntry[] = [
  {
    institution: "Quantum University, Roorkee",
    degree: "Bachelor of Computer Applications (BCA)",
    period: "2025 – Present",
    detail:
      "Currently in 2nd year with a CGPA of 7.74/10 — focused on software development, data structures, AI, and cybersecurity fundamentals.",
    current: true,
  },
  {
    institution: "Aryan Public School",
    degree: "School Education",
    period: "Completed",
    detail:
      "Completed school education, building the foundation for problem solving and technology.",
  },
];
