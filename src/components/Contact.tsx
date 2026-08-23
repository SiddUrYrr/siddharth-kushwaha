import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Mail, Send } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
import { profile, socials } from "../data/profile";
import { emailConfigured, sendContactEmail } from "../lib/email";
import { cn } from "../lib/utils";
import Button from "./ui/Button";
import SectionHeading from "./ui/SectionHeading";
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
    "w-full border-2 bg-ink px-4 py-3 text-sm text-paper placeholder:text-slate-500 outline-none transition-colors duration-150 focus:border-accent-bright",
    hasError ? "border-red-500/70" : "border-line hover:border-slate-400/60"
  );

export default function Contact() {
  const [values, setValues] = useState<FormState>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showSummary, setShowSummary] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [failed, setFailed] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);

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
    if (Object.keys(nextErrors).length > 0) {
      setShowSummary(true);
      window.setTimeout(() => summaryRef.current?.focus(), 0);
      return;
    }
    setShowSummary(false);

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

  const activeErrors = (["name", "email", "message"] as const)
    .map((key) => ({ key, msg: errors[key] }))
    .filter((e): e is { key: keyof FormState; msg: string } => Boolean(e.msg));

  return (
    <section id="contact" aria-labelledby="contact-heading" className="section-pad">
      <SectionHeading
        index="07"
        eyebrow="Get in touch"
        title="Let's Build Something Together"
        subtitle="Have an idea, project, collaboration, or simply want to connect? Feel free to reach out."
        headingId="contact-heading"
      />

      <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-12">
        {/* Social / info column */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45 }}
          className="flex flex-col gap-4"
        >
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group panel flex items-center gap-4 p-4 transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:border-accent-bright hover:shadow-hard"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center border-2 border-line bg-raised text-accent-soft transition-colors duration-150 group-hover:border-accent-bright">
                <SocialIcon icon={social.icon} className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-display text-sm font-bold uppercase tracking-wide text-paper">
                  {social.label}
                </span>
                <span className="block break-all font-mono text-xs text-slate-500">
                  {social.href.replace("https://", "")}
                </span>
              </span>
            </a>
          ))}

          <a
            href={`mailto:${profile.email}`}
            className="group panel flex items-center gap-4 p-4 transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:border-accent-bright hover:shadow-hard"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center border-2 border-line bg-raised text-accent-soft transition-colors duration-150 group-hover:border-accent-bright">
              <Mail size={20} aria-hidden="true" />
            </span>
            <span>
              <span className="block font-display text-sm font-bold uppercase tracking-wide text-paper">
                Email
              </span>
              <span className="block break-all font-mono text-xs text-slate-500">
                {profile.email}
              </span>
            </span>
          </a>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          onSubmit={handleSubmit}
          noValidate
          className="panel flex flex-col gap-5 p-6 sm:p-8"
        >
          {showSummary && activeErrors.length > 0 && (
            <div
              ref={summaryRef}
              role="alert"
              tabIndex={-1}
              aria-labelledby="contact-error-title"
              className="border-2 border-red-500/70 bg-red-500/5 p-4 focus:outline-none"
            >
              <p
                id="contact-error-title"
                className="flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-wider text-red-400"
              >
                <AlertCircle size={15} aria-hidden="true" />
                There is a problem
              </p>
              <ul className="mt-2 space-y-1">
                {activeErrors.map(({ key, msg }) => (
                  <li key={key}>
                    <a
                      href={`#contact-${key}`}
                      className="text-sm text-red-300 underline underline-offset-2 transition-colors hover:text-red-200"
                    >
                      {msg}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <label
              htmlFor="contact-name"
              className="mb-1.5 block font-mono text-xs font-bold uppercase tracking-wider text-dim"
            >
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
              <p id="contact-name-error" className="mt-1.5 text-xs text-red-400">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="contact-email"
              className="mb-1.5 block font-mono text-xs font-bold uppercase tracking-wider text-dim"
            >
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
              <p id="contact-email-error" className="mt-1.5 text-xs text-red-400">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="contact-message"
              className="mb-1.5 block font-mono text-xs font-bold uppercase tracking-wider text-dim"
            >
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
              <p id="contact-message-error" className="mt-1.5 text-xs text-red-400">
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
            <p className="text-[11px] leading-relaxed text-slate-500">
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
