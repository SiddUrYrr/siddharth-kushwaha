import { ArrowUp } from "lucide-react";
import { socials } from "../data/profile";
import { SocialIcon } from "./ui/icons";

export default function Footer() {
  const backToTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <footer className="border-t-2 border-line bg-raised/30">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-6 px-5 py-10 sm:flex-row sm:px-8">
        <div className="flex items-center gap-3">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${social.label} profile`}
              title={social.label}
              className="flex h-9 w-9 items-center justify-center border-2 border-line text-dim transition-all duration-150 hover:-translate-y-0.5 hover:border-accent-bright hover:text-paper"
            >
              <SocialIcon icon={social.icon} className="h-4 w-4" />
            </a>
          ))}
        </div>

        <p className="text-center font-mono text-xs uppercase tracking-[0.18em] text-slate-500">
          © 2026 Siddharth Kushwaha. Built with curiosity &amp; code.
        </p>

        <button
          type="button"
          onClick={backToTop}
          aria-label="Back to top"
          title="Back to top"
          className="flex h-10 w-10 cursor-pointer items-center justify-center border-2 border-line text-dim transition-all duration-150 hover:-translate-y-0.5 hover:border-accent-bright hover:text-paper hover:shadow-hard-sm"
        >
          <ArrowUp size={17} aria-hidden="true" />
        </button>
      </div>
    </footer>
  );
}
