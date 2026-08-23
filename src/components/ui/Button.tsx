import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

type Variant = "primary" | "outline";

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
  "inline-flex cursor-pointer items-center justify-center gap-2.5 border-2 px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.18em] transition-all duration-200 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "border-ink bg-paper text-ink shadow-hard hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-lg active:translate-x-0 active:translate-y-0 active:shadow-hard",
  outline:
    "border-line bg-transparent text-paper hover:-translate-x-0.5 hover:-translate-y-0.5 hover:border-accent-bright hover:shadow-hard active:translate-x-0 active:translate-y-0 active:shadow-none",
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
