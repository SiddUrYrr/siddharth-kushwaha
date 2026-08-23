export const profile = {
  name: "Siddharth Kushwaha",
  roles: "BCA Student • Python Developer • AI & Cybersecurity Enthusiast",
  tagline:
    "Building practical solutions with code, AI, automation, and modern technology.",
  heroDescription:
    "I'm a BCA student passionate about building practical software projects and exploring Python, AI, automation, cybersecurity, and modern web technologies.",
  aboutText:
    "I'm Siddharth Kushwaha, a BCA student at Quantum University of Technology with a strong interest in software development, artificial intelligence, cybersecurity, automation, and problem solving. I enjoy turning ideas into functional projects and continuously experimenting with new technologies.",
  location: "Uttar Pradesh, India",
  university: "Quantum University of Technology",
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
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
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
    institution: "Quantum University of Technology",
    degree: "Bachelor of Computer Applications (BCA)",
    period: "2nd Year",
    detail: "Currently pursuing — focused on software development, AI, and cybersecurity fundamentals.",
    current: true,
  },
  {
    institution: "Aryan Public School",
    degree: "School Education",
    period: "Completed",
    detail: "Completed school education, building the foundation for problem solving and technology.",
  },
];
