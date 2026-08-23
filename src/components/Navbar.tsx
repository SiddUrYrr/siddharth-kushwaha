import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navItems, profile } from "../data/profile";
import { cn } from "../lib/utils";
import Button from "./ui/Button";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <motion.header
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "border-b-2 border-line bg-ink/90 backdrop-blur-md"
          : "border-b-2 border-transparent bg-transparent"
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8 md:h-[4.5rem]"
      >
        <a
          href="#home"
          onClick={closeMenu}
          className="font-display text-lg font-bold uppercase tracking-tight text-paper"
        >
          {profile.name.split(" ")[0]}
          <span className="text-accent-soft">.</span>
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="group relative py-2 font-mono text-xs font-medium uppercase tracking-[0.18em] text-dim transition-colors hover:text-paper"
              >
                {item.label}
                <span className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-left scale-x-0 bg-accent-bright transition-transform duration-200 group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Button href="#contact" variant="primary" className="px-5 py-2.5">
            Let&apos;s Connect
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          className="flex h-10 w-10 items-center justify-center border-2 border-line text-dim transition-colors hover:border-accent-bright hover:text-paper lg:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t-2 border-line bg-ink lg:hidden"
          >
            <ul className="space-y-1 px-5 pb-6 pt-3 sm:px-8">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.22 }}
                >
                  <a
                    href={item.href}
                    onClick={closeMenu}
                    className="flex items-center gap-3 px-3 py-2.5 font-mono text-xs font-medium uppercase tracking-[0.18em] text-dim transition-colors hover:bg-raised hover:text-paper"
                  >
                    <span className="text-accent-soft">0{i + 1}</span>
                    {item.label}
                  </a>
                </motion.li>
              ))}
              <li className="pt-3" onClick={closeMenu}>
                <Button href="#contact" variant="primary" className="w-full">
                  Let&apos;s Connect
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
