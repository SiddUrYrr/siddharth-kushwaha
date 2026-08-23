import { ArrowUp } from "lucide-react";
import { socials } from "../data/profile";
import { SocialIcon } from "./ui/icons";

export default function Footer() {
  const backToTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <footer className="border-t border-white/10 bg-surface/60">
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
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-zinc-400 transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-400/50 hover:text-white"
            >
              <SocialIcon icon={social.icon} className="h-4 w-4" />
            </a>
          ))}
        </div>

        <p className="text-center text-sm text-zinc-500">
          © 2026 Siddharth Kushwaha. Built with curiosity &amp; code.
        </p>

        <button
          type="button"
          onClick={backToTop}
          aria-label="Back to top"
          title="Back to top"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-400 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/50 hover:text-white hover:shadow-glow"
        >
          <ArrowUp size={17} aria-hidden="true" />
        </button>
      </div>
    </footer>
  );
}
