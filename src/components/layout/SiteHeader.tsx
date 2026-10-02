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
  const [scrolled, setScrolled] = useState(false);
  const [selectedLocale, setSelectedLocale] = useState<Locale>(locale);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => setSelectedLocale(locale), [locale]);

  useEffect(() => {
    const updateScrollState = () => setScrolled(window.scrollY > 20);
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, [open]);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${open ? styles.mobileOpen : ""}`}>
      {/* Brand pill with circular logo badge */}
      <Link
        className={styles.brand}
        href={locale === "es" ? "/" : "/en"}
        scroll={false}
        onClick={() => setOpen(false)}
        aria-label={locale === "es" ? "Lufinha Studio — inicio" : "Lufinha Studio — home"}
      >
        <span className={styles.brandBadge} aria-hidden="true">L</span>
        <span className={styles.brandName}>LUFINHA</span>
      </Link>

      {/* Center navigation pill */}
      <nav
        className={styles.nav}
        id="site-navigation"
        aria-label={locale === "es" ? "Navegación principal" : "Main navigation"}
      >
        {navigation.map((item) => {
          const active =
            !item.href.includes("#") &&
            (item.href === (locale === "es" ? "/" : "/en")
              ? pathname === item.href
              : pathname.startsWith(item.href));
          return (
            <Link
              className={`${styles.navLink} ${active ? styles.active : ""}`}
              href={item.href}
              scroll={false}
              key={item.href}
              aria-current={active ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Right tools (Language switcher pill + Mobile menu button) */}
      <div className={styles.tools}>
        <div
          className={styles.language}
          role="group"
          aria-label={locale === "es" ? "Idioma" : "Language"}
        >
          {(["es", "en"] as const).map((option) => (
            <Link
              className={`${styles.languageOption} ${selectedLocale === option ? styles.languageActive : ""}`}
              href={switchLocalePath(pathname, option)}
              scroll={false}
              hrefLang={option}
              lang={option}
              aria-label={option === "es" ? "Español" : "English"}
              aria-current={locale === option ? "page" : undefined}
              key={option}
              onClick={() => {
                setSelectedLocale(option);
                setOpen(false);
              }}
            >
              {option.toUpperCase()}
            </Link>
          ))}
        </div>

        <button
          className={styles.menuButton}
          type="button"
          aria-expanded={open}
          aria-controls="site-navigation"
          aria-label={open ? content.navigation.close : content.navigation.menu}
          onClick={() => setOpen((current) => !current)}
        >
          <span className={`${styles.menuGlyph} ${open ? styles.menuGlyphOpen : ""}`} aria-hidden="true">
            <i /><i />
          </span>
        </button>
      </div>

      {/* Mobile drawer when open */}
      {open && (
        <div
          className={styles.mobileDrawer}
          role="dialog"
          aria-modal="true"
          aria-label={locale === "es" ? "Menú" : "Menu"}
        >
          <div className={styles.mobileNav}>
            {navigation.map((item) => {
              const active =
                !item.href.includes("#") &&
                (item.href === (locale === "es" ? "/" : "/en")
                  ? pathname === item.href
                  : pathname.startsWith(item.href));
              return (
                <Link
                  className={`${styles.mobileNavLink} ${active ? styles.mobileActive : ""}`}
                  href={item.href}
                  scroll={false}
                  key={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
