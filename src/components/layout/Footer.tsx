"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { localePath, siteConfig } from "@/config/site";
import { getSocialLinks, getStudioContent } from "@/content";
import { localeFromPathname } from "@/lib/locale";
import styles from "./Footer.module.css";

function ContactIcon({ kind }: { kind: "email" | "whatsapp" | "linkedin" | "instagram" | "github" }) {
  if (kind === "whatsapp") return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20.3 11.6a8.3 8.3 0 0 1-12.2 7.3L3.5 20l1.2-4.4a8.3 8.3 0 1 1 15.6-4Z"/><path d="M8.5 8.4c-.3.4-.6 1-.4 1.6.5 2 3 4.5 5 5.1.7.2 1.2-.1 1.7-.5l.5-.8-2.1-1-.7.8a7.1 7.1 0 0 1-2.7-2.7l.8-.7-1-2.1Z"/></svg>;
  if (kind === "linkedin") return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 10v7M8 7.2v.1M12 17v-7M12 13.2c0-1.8 1-3.2 2.6-3.2 1.7 0 2.4 1.1 2.4 2.8V17"/></svg>;
  if (kind === "email") return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="1"/><path d="m4 6 8 7 8-7"/></svg>;
  if (kind === "instagram") return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.6 6.6h.01"/></svg>;
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 19c-4.3 1.2-4.3-2-6-2.4M15 21v-3.1a3.2 3.2 0 0 0-.9-2.5c3-.3 6.2-1.4 6.2-6.8a5.3 5.3 0 0 0-1.4-3.7 4.8 4.8 0 0 0-.1-3.5s-1.1-.3-3.6 1.4a12.1 12.1 0 0 0-6.4 0C6.3 1.1 5.2 1.4 5.2 1.4a4.8 4.8 0 0 0-.1 3.5 5.3 5.3 0 0 0-1.4 3.7c0 5.4 3.2 6.5 6.2 6.8a3.2 3.2 0 0 0-.9 2.5V21"/></svg>;
}

export function Footer() {
  const locale = localeFromPathname(usePathname());
  const content = getStudioContent(locale).contact;
  const links = getSocialLinks();
  return (
    <footer className={styles.footer} id="contact">
      <div className={styles.contact}>
        <div className={`${styles.eyebrow} mono`}><span>{content.eyebrow}</span><span>{siteConfig.contact.location}</span></div>
        <h2 className={`${styles.title} display`} data-reveal>{content.title}</h2>
        <Link className={styles.mail} href={localePath(locale, locale === "es" ? "/contacto" : "/contact")} data-cursor={locale === "es" ? "ESCRIBIR" : "WRITE"}>
          <span>{content.cta}</span><span className={styles.address}>{siteConfig.contact.email}</span><span className={styles.arrow} aria-hidden="true">↗</span>
        </Link>
      </div>
      <div className={`${styles.bottom} mono`}>
        <span>© {new Date().getFullYear()} Lufinha Studio</span>
        <div className={styles.socials} aria-label={locale === "es" ? "Canales de contacto" : "Contact channels"}>
          {links.map((link) => (
            <a className={styles.socialLink} key={link.label} href={link.href} aria-label={link.label}>
              <span className={styles.socialIcon}><ContactIcon kind={link.kind} /></span>
              <span className={styles.socialText}><strong>{link.label}</strong><small>{link.kind === "whatsapp" ? (locale === "es" ? "Escribir mensaje" : "Send a message") : link.kind === "linkedin" ? (locale === "es" ? "Ver perfil" : "View profile") : link.kind === "email" ? (locale === "es" ? "Enviar correo" : "Send email") : (locale === "es" ? "Abrir perfil" : "Open profile")}</small></span>
              <span className={styles.socialArrow} aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
        <span>Argentina — Digital studio</span>
      </div>
    </footer>
  );
}
