"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { localePath, siteConfig } from "@/config/site";
import { getSocialLinks, getStudioContent } from "@/content";
import { localeFromPathname } from "@/lib/locale";
import { ArrowUpRight, ArgentinaFlag } from "@/components/ui/Icons";
import { Aura } from "@/components/ui/Aura";
import styles from "./Footer.module.css";

export function Footer() {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const content = getStudioContent(locale).contact;
  const links = getSocialLinks();
  const isContactPage = pathname === "/contacto" || pathname === "/en/contact";
  return (
    <footer className={styles.footer} id="contact">
      <Aura variant="band" intensity="soft" position="bottom-left" />
      {!isContactPage ? <section className={styles.contact} aria-labelledby="footer-contact-title">
        <div className={`${styles.eyebrow} mono`}>
          <span>{content.eyebrow}</span>
          <span>{siteConfig.contact.location}</span>
        </div>
        <div className={styles.callout}>
          <h2 className={`${styles.title} display`} id="footer-contact-title" data-reveal>{content.title}</h2>
          <p>{content.body}</p>
        </div>
        <Link className={styles.mail} href={localePath(locale, locale === "es" ? "/contacto" : "/contact")}>
          <span>{content.cta}</span>
          <span className={styles.address}>{siteConfig.contact.email}</span>
          <span className={styles.arrow} aria-hidden="true"><ArrowUpRight size="1.1em" /></span>
        </Link>
      </section> : null}
      <div className={`${styles.bottom} mono`}>
        <span>© {new Date().getFullYear()} Lufinha Studio</span>
        <nav className={styles.socials} aria-label={locale === "es" ? "Canales de contacto" : "Contact channels"}>
          {links.map((link) => (
            <a
              className={styles.socialLink}
              key={link.label}
              href={link.href}
              aria-label={link.label}
              target={link.kind === "email" ? undefined : "_blank"}
              rel={link.kind === "email" ? undefined : "noopener noreferrer"}
            >
              <span>{link.label}</span>
              <ArrowUpRight size="0.85em" aria-hidden="true" />
            </a>
          ))}
        </nav>
        <span className={styles.countryTag}>
          <ArgentinaFlag size={18} />
          <span>{locale === "es" ? "Argentina — Estudio digital" : "Argentina — Digital studio"}</span>
        </span>
      </div>
    </footer>
  );
}

