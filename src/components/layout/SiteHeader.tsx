"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getNavigation, getStudioContent } from "@/content";
import type { Locale } from "@/types/project";
import { localeFromPathname, switchLocalePath } from "@/lib/locale";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const content = getStudioContent(locale);
  const navigation = getNavigation(locale);
  const [open, setOpen] = useState(false);
  const [selectedLocale, setSelectedLocale] = useState<Locale>(locale);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => setSelectedLocale(locale), [locale]);

  useEffect(() => {
    if (!open) return;
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, [open]);

  return (
    <header className={`${styles.header} ${open ? styles.mobileOpen : ""}`}>
      <Link className={styles.brand} href={locale === "es" ? "/" : "/en"} onClick={() => setOpen(false)} aria-label={locale === "es" ? "Lufinha Studio — inicio" : "Lufinha Studio — home"}>
        <span className={styles.brandLine}><strong>LUFINHA</strong><span>STUDIO</span></span>
        <span className={styles.brandDescriptor}>{locale === "es" ? "Software y sistemas a medida" : "Custom software and systems"}</span>
      </Link>
      <nav className={styles.nav} id="site-navigation" aria-label={locale === "es" ? "Navegación principal" : "Main navigation"}>
        {navigation.map((item) => {
          const active = !item.href.includes("#") && (item.href === (locale === "es" ? "/" : "/en") ? pathname === item.href : pathname.startsWith(item.href));
          return <Link className={`${styles.navLink} ${active ? styles.active : ""}`} href={item.href} key={item.href} aria-current={active ? "page" : undefined} onClick={() => setOpen(false)}>{item.label}</Link>;
        })}
      </nav>
      <div className={styles.tools}>
        <div className={`${styles.language} ${selectedLocale === "en" ? styles.languageEn : ""}`} role="group" aria-label={locale === "es" ? "Idioma" : "Language"}>
          {(["es", "en"] as const).map((option) => (
            <Link
              className={`${styles.languageOption} ${selectedLocale === option ? styles.languageActive : ""}`}
              href={switchLocalePath(pathname, option)}
              hrefLang={option}
              lang={option}
              aria-label={option === "es" ? "Español" : "English"}
              aria-current={locale === option ? "page" : undefined}
              key={option}
              onClick={() => { setSelectedLocale(option); setOpen(false); }}
            >
              {option.toUpperCase()}
            </Link>
          ))}
        </div>
      </div>
      <button className={styles.menuButton} type="button" aria-expanded={open} aria-controls="site-navigation" aria-label={open ? content.navigation.close : content.navigation.menu} onClick={() => setOpen((current) => !current)}>
        <span>{open ? content.navigation.close : content.navigation.menu}</span>
        <span className={`${styles.menuGlyph} ${open ? styles.menuGlyphOpen : ""}`} aria-hidden="true"><i /><i /></span>
      </button>
    </header>
  );
}
