const ITEMS = [
  "Python",
  "AI",
  "Cybersecurity",
  "Automation",
  "Selenium",
  "Pytest",
  "API Testing",
  "Git",
  "GitHub Actions",
  "OWASP Top 10",
  "SQL",
  "Streamlit",
  "DSA",
  "Open Source",
];

export default function Marquee() {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <div aria-hidden="true" className="overflow-hidden border-y-2 border-line bg-raised/40 py-3.5">
      <div className="flex w-max animate-marquee items-center gap-8 whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-8 font-mono text-xs font-medium uppercase tracking-[0.3em] text-dim"
          >
            {item}
            <span className="inline-block h-2 w-2 rotate-45 bg-accent-bright" />
          </span>
        ))}
      </div>
    </div>
  );
}
