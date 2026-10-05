"use client";

import { useRef, useState, type FormEvent } from "react";
import type { Locale } from "@/types/project";
import { siteConfig } from "@/config/site";
import { ArrowUpRight } from "@/components/ui/Icons";
import { Aura } from "@/components/ui/Aura";
import { trackEvent } from "@/lib/analytics";
import styles from "@/app/contacto/contact.module.css";

const copy = {
  es: {
    label: "Contacto",
    title: "Hablemos de tu proyecto.",
    intro: "Dejanos tu consulta o mensaje y te responderemos personalmente.",
    typeLegend: "¿Qué estás buscando?",
    types: ["Página web", "Tienda online", "Sistema a medida", "Todavía no sé"],
    name: "Nombre", email: "Email", phone: "WhatsApp o teléfono", company: "Empresa o proyecto", message: "Contanos un poco más",
    optional: "opcional",
    namePlaceholder: "¿Cómo te llamás?", emailPlaceholder: "tu@email.com", phonePlaceholder: "Ej.: 3446 123456",
    companyPlaceholder: "Nombre de tu marca o negocio", messagePlaceholder: "Qué tenés hoy, qué te gustaría lograr, plazos…",
    send: "Enviar consulta", sending: "Enviando…",
    error: "No pudimos enviar el mensaje. Probá de nuevo o escribinos por mail.",
    errors: { name: "Escribí tu nombre.", email: "Revisá el email.", phone: "Revisá el número." },
    response: "Te respondemos personalmente, normalmente en el día.",
    directTitle: "¿Preferís escribirnos por mail?",
    successTitle: "¡Gracias! Ya nos llegó.", successBody: "Lo leemos nosotros y te respondemos en breve.", again: "Enviar otra consulta",
  },
  en: {
    label: "Contact",
    title: "Let's talk about your project.",
    intro: "Leave us your enquiry or message and we'll reply personally.",
    typeLegend: "What are you looking for?",
    types: ["Website", "Online store", "Custom system", "Not sure yet"],
    name: "Name", email: "Email", phone: "WhatsApp or phone", company: "Company or project", message: "Tell us a bit more",
    optional: "optional",
    namePlaceholder: "What's your name?", emailPlaceholder: "you@email.com", phonePlaceholder: "e.g. +1 555 123 4567",
    companyPlaceholder: "Your brand or business", messagePlaceholder: "What you have today, what you'd like to achieve, timing…",
    send: "Send enquiry", sending: "Sending…",
    error: "We couldn't send your message. Please try again or email us.",
    errors: { name: "Please enter your name.", email: "Please check your email.", phone: "Please check the number." },
    response: "We reply personally, usually the same day.",
    directTitle: "Would you rather email us?",
    successTitle: "Thanks! We got it.", successBody: "We'll read it ourselves and get back to you shortly.", again: "Send another enquiry",
  },
} as const;

type Status = "idle" | "sending" | "success" | "error";
type FieldName = "name" | "email" | "phone";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+()\d .-]+$/;

export function ContactPage({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const successRef = useRef<HTMLDivElement>(null);

  function validate(values: { name: string; email: string; phone: string }) {
    const next: Partial<Record<FieldName, string>> = {};
    const digits = values.phone.replace(/\D/g, "");
    if (values.name.length < 2) next.name = t.errors.name;
    if (!emailPattern.test(values.email)) next.email = t.errors.email;
    if (!phonePattern.test(values.phone) || digits.length < 6 || digits.length > 20) next.phone = t.errors.phone;
    return next;
  }

  function clearError(name: FieldName) {
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const form = event.currentTarget;
    const values = new FormData(form);
    const payload = {
      name: String(values.get("name") ?? "").trim(),
      email: String(values.get("email") ?? "").trim(),
      phone: String(values.get("phone") ?? "").trim(),
      company: String(values.get("company") ?? "").trim(),
      message: String(values.get("message") ?? "").trim(),
      website: String(values.get("website") ?? "").trim(),
    };
    const type = String(values.get("type") ?? "").trim();

    // Validación propia: mensajes debajo de cada campo y foco en el primero con error
    const nextErrors = validate(payload);
    setErrors(nextErrors);
    const firstInvalid = (["name", "email", "phone"] as const).find((key) => nextErrors[key]);
    if (firstInvalid) {
      form.querySelector<HTMLInputElement>(`[name="${firstInvalid}"]`)?.focus();
      setStatus("idle");
      setFeedback("");
      return;
    }

    setStatus("sending");
    setFeedback("");
    // El tipo de proyecto viaja dentro del mensaje: la API no cambia.
    const body = { ...payload, message: [type ? `${t.typeLegend} ${type}` : "", payload.message].filter(Boolean).join("\n\n").slice(0, 5000) };
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!response.ok) throw new Error("Send failed");
      form.reset();
      trackEvent("contact_submit", { type: type || "sin elegir", locale });
      setStatus("success");
      // En mobile el formulario se achica: llevamos la vista al mensaje de éxito
      window.requestAnimationFrame(() => successRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
    } catch {
      setStatus("error");
      setFeedback(t.error);
    }
  }

  const fieldClass = (name: FieldName) => `${styles.field} ${errors[name] ? styles.invalid : ""}`;
  const errorText = (name: FieldName) => errors[name] ? <small className={styles.fieldError} id={`${name}-error`}>{errors[name]}</small> : null;

  return (
    <main className={styles.page} lang={locale}>
      <Aura variant="field" intensity="medium" position="center" />
      <div className={styles.kicker}><span>Lufinha Studio</span><span>{t.label}</span></div>
      <div className={styles.grid}>
        <div className={styles.intro}>
          <h1 className={`${styles.title} display`}>{t.title}</h1>
          <p className={styles.description}>{t.intro}</p>
        </div>

        {status === "success" ? (
          <div className={styles.success} ref={successRef} role="status" aria-live="polite">
            <span className={styles.successMark} aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg></span>
            <h2 className="display">{t.successTitle}</h2>
            <p>{t.successBody}</p>
            <button type="button" className={styles.again} onClick={() => setStatus("idle")}>{t.again}</button>
          </div>
        ) : (
          <form className={styles.form} id="contact-form" onSubmit={handleSubmit} noValidate>
            <fieldset className={styles.types}>
              <legend className={styles.label}>{t.typeLegend}</legend>
              <div className={styles.typeOptions}>
                {t.types.map((option) => (
                  <label className={styles.typeOption} key={option}>
                    <input type="radio" name="type" value={option} />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className={styles.row}>
              <label className={fieldClass("name")}>
                <span className={styles.label}>{t.name}</span>
                <input name="name" type="text" autoComplete="name" autoCapitalize="words" enterKeyHint="next" placeholder={t.namePlaceholder} maxLength={100} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} onInput={() => clearError("name")} />
                {errorText("name")}
              </label>
              <label className={fieldClass("email")}>
                <span className={styles.label}>{t.email}</span>
                <input name="email" type="email" inputMode="email" autoComplete="email" autoCapitalize="none" autoCorrect="off" spellCheck={false} enterKeyHint="next" placeholder={t.emailPlaceholder} maxLength={254} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} onInput={() => clearError("email")} />
                {errorText("email")}
              </label>
            </div>
            <div className={styles.row}>
              <label className={fieldClass("phone")}>
                <span className={styles.label}>{t.phone}</span>
                <input name="phone" type="tel" inputMode="tel" autoComplete="tel" enterKeyHint="next" placeholder={t.phonePlaceholder} maxLength={40} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "phone-error" : undefined} onInput={() => clearError("phone")} />
                {errorText("phone")}
              </label>
              <label className={styles.field}>
                <span className={styles.label}>{t.company} <em>{t.optional}</em></span>
                <input name="company" type="text" autoComplete="organization" enterKeyHint="next" placeholder={t.companyPlaceholder} maxLength={120} />
              </label>
            </div>
            <label className={styles.field}>
              <span className={styles.label}>{t.message} <em>{t.optional}</em></span>
              <textarea name="message" placeholder={t.messagePlaceholder} maxLength={4800} rows={4} />
            </label>
            <label className={styles.trap} aria-hidden="true">Website<input name="website" type="text" tabIndex={-1} autoComplete="off" /></label>

            <div className={styles.submitRow}>
              <button className={styles.submit} type="submit" disabled={status === "sending"} data-sending={status === "sending" || undefined}>
                <span>{status === "sending" ? t.sending : t.send}</span>
                <span className={styles.submitIcon} aria-hidden="true"><ArrowUpRight size="1rem" /></span>
              </button>
              <p className={`${styles.feedback} ${status === "error" ? styles.error : ""}`} role="status" aria-live="polite">{feedback || t.response}</p>
            </div>
          </form>
        )}

        <div className={styles.direct}>
          <span className={styles.directTitle}>{t.directTitle}</span>
          <a href={`mailto:${siteConfig.contact.email}`}><span className={styles.directLabel}>Email</span><span>{siteConfig.contact.email}</span><ArrowUpRight size="0.9em" /></a>
        </div>
      </div>
    </main>
  );
}
