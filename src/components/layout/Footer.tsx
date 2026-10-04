"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getNavigation, getSocialLinks } from "@/content";
import { localePath, siteConfig } from "@/config/site";
import { localeFromPathname } from "@/lib/locale";
import { ArrowUpRight } from "@/components/ui/Icons";
import { BrandMark } from "@/components/ui/BrandMark";
import { Aura } from "@/components/ui/Aura";
import styles from "./Footer.module.css";

/* ==========================================================================
   Footer
   1. Cierre: marca + invitación a escribir
   2. Columnas: navegación / contacto / perfiles
   3. Base: © y volver arriba
   ========================================================================== */

export function Footer() {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const navigation = getNavigation(locale);
  const links = getSocialLinks();
  const whatsapp = links.filter((link) => link.kind === "whatsapp");
  const profiles = links.filter((link) => link.kind !== "whatsapp" && link.kind !== "email");
  const t = locale === "es"
    ? { tagline: "Diseño + desarrollo", invite: "¿Tenés un proyecto en mente?", cta: "Contanos", nav: "Navegación", contact: "Contacto", profiles: "Perfiles", top: "Volver arriba" }
    : { tagline: "Design + development", invite: "Have a project in mind?", cta: "Tell us", nav: "Navigation", contact: "Contact", profiles: "Profiles", top: "Back to top" };

  const scrollTop = () => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });

  return (
    <footer className={styles.footer} id="contact">
      <Aura variant="band" intensity="soft" position="bottom-left" />

      {/* ── 1. Cierre ── */}
      <div className={styles.lead}>
        <Link className={styles.brand} href={localePath(locale, "/")} aria-label="Lufinha Studio">
          <span className={styles.brandBadge}><BrandMark className={styles.brandMark} /></span>
          <span>
            <strong>Lufinha Studio</strong>
            <small className="mono">{t.tagline}</small>
          </span>
        </Link>

        <Link className={styles.invite} href={localePath(locale, locale === "es" ? "/contacto" : "/contact")}>
          <span className={`${styles.inviteText} display`}>{t.invite}</span>
          <span className={styles.inviteCta}>{t.cta}<ArrowUpRight size="1em" aria-hidden="true" /></span>
        </Link>
      </div>

      {/* ── 2. Columnas ── */}
      <div className={styles.columns}>
        <nav aria-label={t.nav}>
          <p className={`${styles.columnTitle} mono`}>{t.nav}</p>
          <ul>
            {navigation.map((item) => (
              <li key={item.href}><Link className={styles.link} href={item.href}>{item.label}</Link></li>
            ))}
          </ul>
        </nav>

        <div>
          <p className={`${styles.columnTitle} mono`}>{t.contact}</p>
          <ul>
            <li><a className={styles.link} href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a></li>
            {whatsapp.map((link) => (
              <li key={link.href}>
                <a className={styles.link} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}<ArrowUpRight size="0.8em" aria-hidden="true" /></a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className={`${styles.columnTitle} mono`}>{t.profiles}</p>
          <ul>
            {profiles.map((link) => (
              <li key={link.href}>
                <a className={styles.link} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}<ArrowUpRight size="0.8em" aria-hidden="true" /></a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── 3. Base ── */}
      <div className={`${styles.bottom} mono`}>
        <span>© {new Date().getFullYear()} Lufinha Studio</span>
        <button className={styles.top} type="button" onClick={scrollTop}>
          {t.top}<span aria-hidden="true">↑</span>
        </button>
      </div>
    </footer>
  );
}
