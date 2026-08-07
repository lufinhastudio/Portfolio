"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getNavigation, getStudioContent } from "@/content";
import { siteConfig } from "@/config/site";
import { localeFromPathname, switchLocalePath } from "@/lib/locale";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const content = getStudioContent(locale);
  const navigation = getNavigation(locale);
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className={`${styles.header} ${open ? styles.mobileOpen : ""}`}>
      <Link className={styles.brand} href={locale === "es" ? "/" : "/en"} onClick={() => setOpen(false)}>LUFINHA STUDIO</Link>
      <nav className={styles.nav} aria-label={locale === "es" ? "Navegación principal" : "Main navigation"}>
        {navigation.map((item) => {
          const active = !item.href.includes("#") && (item.href === (locale === "es" ? "/" : "/en") ? pathname === item.href : pathname.startsWith(item.href));
          return <Link className={`${styles.navLink} ${active ? styles.active : ""}`} href={item.href} key={item.href} aria-current={active ? "page" : undefined}>{item.label}</Link>;
        })}
      </nav>
      <div className={styles.tools}>
        <span className={styles.status}><i aria-hidden="true" />{siteConfig.contact.availability[locale]}</span>
        <Link className={styles.language} href={switchLocalePath(pathname, locale === "es" ? "en" : "es")} hrefLang={locale === "es" ? "en" : "es"}>
          {locale === "es" ? "EN" : "ES"}
        </Link>
      </div>
      <button className={styles.menuButton} type="button" aria-expanded={open} aria-label={open ? content.navigation.close : content.navigation.menu} onClick={() => setOpen((current) => !current)}>
        {open ? content.navigation.close : content.navigation.menu}
      </button>
    </header>
  );
}
