import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

type Variant = "primary" | "outline" | "ghost";

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  href?: string;
  external?: boolean;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent-gradient text-white shadow-glow hover:-translate-y-0.5 hover:shadow-glow-lg active:translate-y-0",
  outline:
    "border border-white/15 bg-white/[0.04] text-zinc-200 backdrop-blur hover:-translate-y-0.5 hover:border-indigo-400/50 hover:bg-white/[0.08] active:translate-y-0",
  ghost:
    "px-3 py-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-full",
};

export default function Button({
  children,
  variant = "primary",
  href,
  external,
  className,
  type = "button",
  onClick,
  disabled,
  ariaLabel,
}: ButtonProps) {
  const classes = cn(base, variants[variant], className);
  if (href) {
    const externalProps = external
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};
    return (
      <a href={href} className={classes} aria-label={ariaLabel} {...externalProps}>
        {children}
      </a>
    );
  }
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
