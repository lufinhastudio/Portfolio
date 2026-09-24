"use client";

import { useState, type FormEvent } from "react";
import type { Locale } from "@/types/project";
import { siteConfig } from "@/config/site";
import styles from "@/app/contacto/contact.module.css";

const copy = {
  es: {
    label: "Contacto / 01",
    title: "Contanos qué querés construir.",
    intro: "Software, sistemas o una solución digital que todavía no existe. Compartinos tu idea y la conversamos en persona.",
    name: "Nombre", email: "Email", company: "Empresa / proyecto", message: "Mensaje",
    companyHint: "Opcional", namePlaceholder: "Tu nombre", emailPlaceholder: "tu@email.com",
    companyPlaceholder: "Nombre de tu empresa o proyecto", messagePlaceholder: "¿Qué necesitás resolver? Contanos el contexto, la idea o el desafío.",
    send: "Enviar consulta", sending: "Enviando…", success: "Mensaje enviado. Te responderemos pronto.",
    error: "No pudimos enviar el mensaje. Intentá de nuevo o escribinos por email.",
    invalid: "Revisá los campos. El mensaje debe tener al menos 10 caracteres.",
    direct: "¿Preferís escribirnos directamente?", response: "Leemos cada consulta personalmente.",
  },
  en: {
    label: "Contact / 01",
    title: "Tell us what you want to build.",
    intro: "Software, systems or a digital solution that does not exist yet. Share your idea and let's talk about it personally.",
    name: "Name", email: "Email", company: "Company / project", message: "Message",
    companyHint: "Optional", namePlaceholder: "Your name", emailPlaceholder: "you@email.com",
    companyPlaceholder: "Company or project name", messagePlaceholder: "What do you need to solve? Tell us about the context, idea or challenge.",
    send: "Send enquiry", sending: "Sending…", success: "Message sent. We'll get back to you soon.",
    error: "We couldn't send your message. Please try again or email us directly.",
    invalid: "Please check the fields. Your message needs at least 10 characters.",
    direct: "Prefer to email us directly?", response: "We read every enquiry ourselves.",
  },
} as const;

type Status = "idle" | "sending" | "success" | "error";

export function ContactPage({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const values = new FormData(form);
    const payload = {
      name: String(values.get("name") ?? "").trim(),
      email: String(values.get("email") ?? "").trim(),
      company: String(values.get("company") ?? "").trim(),
      message: String(values.get("message") ?? "").trim(),
      website: String(values.get("website") ?? "").trim(),
    };
    if (payload.name.length < 2 || payload.message.length < 10) {
      setStatus("error");
      setFeedback(t.invalid);
      return;
    }

    setStatus("sending");
    setFeedback("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Send failed");
      form.reset();
      setStatus("success");
      setFeedback(t.success);
    } catch {
      setStatus("error");
      setFeedback(t.error);
    }
  }

  return (
    <main className={styles.page} lang={locale}>
      <div className={styles.kicker}><span>{t.label}</span><span>{siteConfig.contact.location}</span></div>
      <div className={styles.grid}>
        <div className={styles.intro}>
          <h1 className={`${styles.title} display`}>{t.title}</h1>
          <p className={styles.description}>{t.intro}</p>
          <div className={styles.direct}><span className="mono">{t.direct}</span><a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email} <span aria-hidden="true">↗</span></a><small>{t.response}</small></div>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <label className={styles.field}><span>{t.name} <b>*</b></span><input name="name" type="text" autoComplete="name" placeholder={t.namePlaceholder} minLength={2} maxLength={100} required /></label>
            <label className={styles.field}><span>{t.email} <b>*</b></span><input name="email" type="email" autoComplete="email" placeholder={t.emailPlaceholder} maxLength={254} required /></label>
          </div>
          <label className={styles.field}><span>{t.company} <em>{t.companyHint}</em></span><input name="company" type="text" autoComplete="organization" placeholder={t.companyPlaceholder} maxLength={120} /></label>
          <label className={styles.field}><span>{t.message} <b>*</b></span><textarea name="message" placeholder={t.messagePlaceholder} minLength={10} maxLength={5000} rows={6} required /></label>
          <label className={styles.trap} aria-hidden="true">Website<input name="website" type="text" tabIndex={-1} autoComplete="off" /></label>
          <div className={styles.submitRow}><button className={styles.submit} type="submit" disabled={status === "sending"}><span>{status === "sending" ? t.sending : t.send}</span><span aria-hidden="true">↗</span></button><p className={`${styles.feedback} ${status === "error" ? styles.error : ""}`} role="status" aria-live="polite">{feedback}</p></div>
        </form>
      </div>
    </main>
  );
}
