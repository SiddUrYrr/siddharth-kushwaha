import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Mail, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { profile, socials } from "../data/profile";
import { emailConfigured, sendContactEmail } from "../lib/email";
import { fadeUp, staggerContainer, viewportOnce } from "../lib/motion";
import { cn } from "../lib/utils";
import Button from "./ui/Button";
import { SocialIcon } from "./ui/icons";

interface FormState {
  name: string;
  email: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormState, string>>;

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {};
  if (values.name.trim().length < 2) {
    errors.name = "Please enter your name (at least 2 characters).";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (values.message.trim().length < 10) {
    errors.message = "Message should be at least 10 characters.";
  }
  return errors;
}

const inputClasses = (hasError: boolean) =>
  cn(
    "w-full rounded-xl border bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none backdrop-blur transition-colors duration-300 focus:border-indigo-400/60 focus:bg-white/[0.05]",
    hasError ? "border-red-400/60" : "border-white/10 hover:border-white/20"
  );

export default function Contact() {
  const [values, setValues] = useState<FormState>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [failed, setFailed] = useState(false);

  const handleChange = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSending(true);
    setFailed(false);
    try {
      if (emailConfigured) {
        await sendContactEmail({
          name: values.name.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
        });
      } else {
        await new Promise((resolve) => window.setTimeout(resolve, 900));
      }
      setSent(true);
      setValues({ name: "", email: "", message: "" });
      window.setTimeout(() => setSent(false), 6000);
    } catch {
      setFailed(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-heading" className="section-pad">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
        className="mx-auto mb-14 max-w-2xl text-center md:mb-20"
      >
        <motion.p
          variants={fadeUp}
          className="mb-3 font-mono text-xs uppercase tracking-[0.32em] text-indigo-300"
        >
          Get in touch
        </motion.p>
        <motion.h2
          id="contact-heading"
          variants={fadeUp}
          className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          Let&apos;s Build Something Together
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-4 leading-relaxed text-zinc-400">
          Have an idea, project, collaboration, or simply want to connect? Feel free
          to reach out.
        </motion.p>
      </motion.div>

      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-12">
        {/* Social / info column */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          className="flex flex-col gap-4"
        >
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group glass flex items-center gap-4 rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/40 hover:shadow-glow"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/25 to-violet-500/15 text-indigo-200 ring-1 ring-inset ring-white/10 transition-transform duration-300 group-hover:scale-110">
                <SocialIcon icon={social.icon} className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-display text-sm font-semibold text-white">
                  {social.label}
                </span>
                <span className="block break-all text-xs text-zinc-500">
                  {social.href.replace("https://", "")}
                </span>
              </span>
            </a>
          ))}

          <a
            href={`mailto:${profile.email}`}
            className="group glass flex items-center gap-4 rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/40 hover:shadow-glow"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/25 to-violet-500/15 text-indigo-200 ring-1 ring-inset ring-white/10 transition-transform duration-300 group-hover:scale-110">
              <Mail size={20} aria-hidden="true" />
            </span>
            <span>
              <span className="block font-display text-sm font-semibold text-white">
                Email
              </span>
              <span className="block break-all text-xs text-zinc-500">
                {profile.email}
              </span>
            </span>
          </a>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          onSubmit={handleSubmit}
          noValidate
          className="glass flex flex-col gap-5 rounded-2xl p-6 sm:p-8"
        >
          <div>
            <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-zinc-200">
              Name
            </label>
            <input
              id="contact-name"
              type="text"
              autoComplete="name"
              placeholder="Your name"
              value={values.name}
              onChange={handleChange("name")}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "contact-name-error" : undefined}
              className={inputClasses(Boolean(errors.name))}
            />
            {errors.name && (
              <p id="contact-name-error" role="alert" className="mt-1.5 text-xs text-red-400">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-zinc-200">
              Email
            </label>
            <input
              id="contact-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={values.email}
              onChange={handleChange("email")}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "contact-email-error" : undefined}
              className={inputClasses(Boolean(errors.email))}
            />
            {errors.email && (
              <p id="contact-email-error" role="alert" className="mt-1.5 text-xs text-red-400">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-zinc-200">
              Message
            </label>
            <textarea
              id="contact-message"
              rows={5}
              placeholder="Tell me about your idea or project…"
              value={values.message}
              onChange={handleChange("message")}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "contact-message-error" : undefined}
              className={cn(inputClasses(Boolean(errors.message)), "resize-none")}
            />
            {errors.message && (
              <p id="contact-message-error" role="alert" className="mt-1.5 text-xs text-red-400">
                {errors.message}
              </p>
            )}
          </div>

          <Button type="submit" variant="primary" disabled={sending} className="w-full sm:w-auto">
            {sending ? "Sending…" : "Send Message"}
            <Send size={15} aria-hidden="true" />
          </Button>

          {sent && (
            <p role="status" className="flex items-center gap-2 text-sm text-emerald-300">
              <CheckCircle2 size={16} aria-hidden="true" />
              Thanks for reaching out! I&apos;ll get back to you soon.
            </p>
          )}
          {failed && (
            <p role="alert" className="flex items-center gap-2 text-sm text-red-400">
              <AlertCircle size={16} aria-hidden="true" />
              Something went wrong sending your message. Please try again, or reach
              out on LinkedIn or GitHub.
            </p>
          )}
          {!emailConfigured && (
            <p className="text-[11px] leading-relaxed text-zinc-600">
              Note: EmailJS isn&apos;t configured yet — fill in{" "}
              <span className="font-mono">VITE_EMAILJS_TEMPLATE_ID</span> and{" "}
              <span className="font-mono">VITE_EMAILJS_PUBLIC_KEY</span> in{" "}
              <span className="font-mono">.env.local</span>, then restart the dev
              server.
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
