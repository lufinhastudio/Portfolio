"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { localeFromPathname } from "@/lib/locale";
import styles from "./WhatsAppFloat.module.css";

const copy = {
  es: {
    label: "WhatsApp",
    title: "Hablemos de tu proyecto",
    description: "Elegí con quién querés conversar.",
    open: "Abrir opciones de WhatsApp",
    close: "Cerrar opciones de WhatsApp",
    contact: "Escribir a",
  },
  en: {
    label: "WhatsApp",
    title: "Let's talk about your project",
    description: "Choose who you would like to message.",
    open: "Open WhatsApp options",
    close: "Close WhatsApp options",
    contact: "Message",
  },
};

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M27.3 4.6A15.5 15.5 0 0 0 2.9 23.3L.7 31.4l8.3-2.2A15.5 15.5 0 0 0 27.3 4.6Zm-11 24.1a12.8 12.8 0 0 1-6.5-1.8l-.5-.3-4.9 1.3 1.3-4.8-.3-.5a12.8 12.8 0 1 1 10.9 6.1Zm7-9.6c-.4-.2-2.3-1.1-2.6-1.2-.4-.1-.6-.2-.9.2-.3.4-1 1.2-1.2 1.5-.2.3-.5.3-.8.1-2.3-1.1-3.9-2.1-5.4-4.7-.4-.7.4-.7 1.1-2.2.1-.3.1-.6 0-.8l-1.2-2.9c-.3-.8-.7-.7-.9-.7h-.8c-.3 0-.7.1-1.1.5-.4.4-1.5 1.5-1.5 3.6s1.5 4.1 1.7 4.4c.2.3 3 4.6 7.3 6.4 2.7 1.2 3.8 1.3 5.2 1.1 1.7-.3 2.3-1.4 2.6-2.7.3-1.3.3-2.4.2-2.7-.2 0-.5-.1-.9-.3Z" />
    </svg>
  );
}

export function WhatsAppFloat() {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const content = copy[locale];
  const [open, setOpen] = useState(false);
  const widgetRef = useRef<HTMLElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const closeOutside = (event: PointerEvent) => {
      if (!widgetRef.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOutside);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOutside);
    };
  }, [open]);

  return (
    <aside className={styles.widget} ref={widgetRef} aria-label={content.label}>
      <div className={`${styles.panel} ${open ? styles.panelOpen : ""}`} id="whatsapp-contacts" aria-hidden={!open}>
        <div className={styles.panelHeader}>
          <span className="mono">Lufinha / WhatsApp</span>
          <h2>{content.title}</h2>
          <p>{content.description}</p>
        </div>
        <div className={styles.contacts}>
          {siteConfig.contact.whatsapp.map((contact) => (
            <a
              className={styles.contact}
              href={contact.href}
              key={contact.name}
              tabIndex={open ? 0 : -1}
              aria-label={`${content.contact} ${contact.name} ${locale === "es" ? "por" : "via"} WhatsApp`}
            >
              <span><strong>{contact.name}</strong><small>{contact.phone}</small></span>
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </div>
      <button
        className={`${styles.trigger} ${open ? styles.triggerOpen : ""}`}
        type="button"
        aria-expanded={open}
        aria-controls="whatsapp-contacts"
        aria-label={open ? content.close : content.open}
        onClick={() => setOpen((current) => !current)}
      >
        <span className={styles.icon}><WhatsAppIcon /></span>
        <span className={styles.triggerLabel}>{open ? (locale === "es" ? "Cerrar" : "Close") : content.label}</span>
      </button>
    </aside>
  );
}
