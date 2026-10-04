"use client";

import { useState, type FormEvent } from "react";
import type { Locale } from "@/types/project";
import { siteConfig } from "@/config/site";
import { ArrowUpRight } from "@/components/ui/Icons";
import { Aura } from "@/components/ui/Aura";
import styles from "@/app/contacto/contact.module.css";

const copy = {
  es: {
    label: "Contacto",
    title: "Hablemos de tu proyecto.",
    intro: "Dejanos tu consulta o mensaje y te responderemos personalmente.",
    name: "Nombre", email: "Email", phone: "Teléfono", company: "Empresa / proyecto", message: "Mensaje",
    companyHint: "Opcional", namePlaceholder: "Tu nombre", emailPlaceholder: "tu@email.com",
    phonePlaceholder: "+54 9 11 1234 5678", companyPlaceholder: "Nombre de tu empresa o proyecto", messagePlaceholder: "¿Qué necesitás resolver? Contanos el contexto, la idea o el desafío.",
    send: "Enviar consulta", sending: "Enviando…", success: "Mensaje enviado. Te responderemos pronto.",
    error: "No pudimos enviar el mensaje. Intentá de nuevo o escribinos por email.",
    invalid: "Revisá el teléfono. Ingresá un número válido.",
    direct: "Contacto directo", response: "Leemos cada consulta personalmente.",
  },
  en: {
    label: "Contact",
    title: "Let's talk about your project.",
    intro: "Leave us your enquiry or message and we'll reply personally.",
    name: "Name", email: "Email", phone: "Phone", company: "Company / project", message: "Message",
    companyHint: "Optional", namePlaceholder: "Your name", emailPlaceholder: "you@email.com",
    phonePlaceholder: "+1 555 123 4567", companyPlaceholder: "Company or project name", messagePlaceholder: "What do you need to solve? Tell us about the context, idea or challenge.",
    send: "Send enquiry", sending: "Sending…", success: "Message sent. We'll get back to you soon.",
    error: "We couldn't send your message. Please try again or email us directly.",
    invalid: "Please check the phone number and try again.",
    direct: "Direct contact", response: "We read every enquiry ourselves.",
  },
} as const;

type Status = "idle" | "sending" | "success" | "error";

export function ContactPage({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const whatsappContacts = siteConfig.contact.whatsapp;
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
      phone: String(values.get("phone") ?? "").trim(),
      company: String(values.get("company") ?? "").trim(),
      message: String(values.get("message") ?? "").trim(),
      website: String(values.get("website") ?? "").trim(),
    };
    const phoneDigits = payload.phone.replace(/\D/g, "");
    if (payload.name.length < 2 || !/^[+()\d .-]+$/.test(payload.phone) || phoneDigits.length < 6 || phoneDigits.length > 20) {
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
      <Aura variant="field" intensity="medium" position="center" />
      <div className={styles.kicker}><span>Lufinha Studio</span><span>{t.label}</span></div>
      <div className={styles.grid}>
        <div className={styles.intro}>
          <h1 className={`${styles.title} display`}>{t.title}</h1>
          <p className={styles.description}>{t.intro}</p>
        </div>
        <form className={styles.form} id="contact-form" onSubmit={handleSubmit}>
          <div className={styles.row}>
            <label className={styles.field}><span>{t.name} <b>*</b></span><input name="name" type="text" autoComplete="name" placeholder={t.namePlaceholder} minLength={2} maxLength={100} required /></label>
            <label className={styles.field}><span>{t.email} <b>*</b></span><input name="email" type="email" autoComplete="email" placeholder={t.emailPlaceholder} maxLength={254} required /></label>
          </div>
          <div className={styles.row}>
            <label className={styles.field}><span>{t.phone} <b>*</b></span><input name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder={t.phonePlaceholder} maxLength={40} required /></label>
            <label className={styles.field}><span>{t.company} <em>{t.companyHint}</em></span><input name="company" type="text" autoComplete="organization" placeholder={t.companyPlaceholder} maxLength={120} /></label>
          </div>
          <label className={styles.field}><span>{t.message} <em>{t.companyHint}</em></span><textarea name="message" placeholder={t.messagePlaceholder} maxLength={5000} rows={6} /></label>
          <label className={styles.trap} aria-hidden="true">Website<input name="website" type="text" tabIndex={-1} autoComplete="off" /></label>
          <div className={styles.submitRow}><button className={styles.submit} type="submit" disabled={status === "sending"}><span>{status === "sending" ? t.sending : t.send}</span><span aria-hidden="true"><ArrowUpRight size="1.2em" /></span></button><p className={`${styles.feedback} ${status === "error" ? styles.error : ""}`} role="status" aria-live="polite">{feedback}</p></div>
        </form>
        <div className={styles.direct}>
          <span className={styles.directTitle}>{locale === "es" ? "¿Preferís escribirnos directamente?" : "Would you rather contact us directly?"}</span>
          <a href={`mailto:${siteConfig.contact.email}`}><span className={styles.directLabel}>Email</span><span>{siteConfig.contact.email}</span><ArrowUpRight size="0.9em" /></a>
          {whatsappContacts.map((contact) => <a href={contact.href} key={contact.name} target="_blank" rel="noopener noreferrer"><span className={styles.directLabel}>WhatsApp · {contact.name}</span><span>{contact.phone}</span><ArrowUpRight size="0.9em" /></a>)}
          <small>{t.response}</small>
        </div>
      </div>
    </main>
  );
}
