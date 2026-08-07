"use client";

import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { getSocialLinks, getStudioContent } from "@/content";
import { localeFromPathname } from "@/lib/locale";
import styles from "./Footer.module.css";

export function Footer() {
  const locale = localeFromPathname(usePathname());
  const content = getStudioContent(locale).contact;
  const links = getSocialLinks();
  return (
    <footer className={styles.footer} id="contact">
      <div className={styles.contact}>
        <div className={`${styles.eyebrow} mono`}><span>{content.eyebrow}</span><span>{siteConfig.contact.location}</span></div>
        <h2 className={`${styles.title} display`} data-reveal>{content.title}</h2>
        <a className={styles.mail} href={`mailto:${siteConfig.contact.email}`} data-cursor={locale === "es" ? "ESCRIBIR" : "WRITE"}>
          <span>{content.cta}</span><span className={styles.address}>{siteConfig.contact.email}</span><span className={styles.arrow} aria-hidden="true">↗</span>
        </a>
      </div>
      <div className={`${styles.bottom} mono`}>
        <span>© {new Date().getFullYear()} Lufinha Studio</span>
        <div className={styles.socials}>{links.map((link) => <a key={link.label} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noreferrer" : undefined}>{link.label}</a>)}</div>
        <span>Argentina — Digital studio</span>
      </div>
    </footer>
  );
}
