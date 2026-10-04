"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getNavigation, getStudioContent } from "@/content";
import type { Locale } from "@/types/project";
import { localeFromPathname, switchLocalePath } from "@/lib/locale";
import { BrandMark } from "@/components/ui/BrandMark";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  const router = useRouter();
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

  // Bloquea el scroll del fondo mientras el menú mobile está abierto
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [open]);

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
      {/* ── Marca: badge circular + nombre ── */}
      <Link
        className={styles.brand}
        href={locale === "es" ? "/" : "/en"}
        scroll={false}
        onClick={() => setOpen(false)}
        aria-label={locale === "es" ? "Lufinha Studio — inicio" : "Lufinha Studio — home"}
      >
        {/* Monograma del favicon sobre un disco de vidrio translúcido */}
        <span className={styles.brandBadge} aria-hidden="true"><BrandMark className={styles.brandMark} /></span>
        <span className={styles.brandName}>LUFINHA</span>
      </Link>

      {/* ── Navegación principal (desktop) ── */}
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

      {/* ── Herramientas: idioma + botón de menú (mobile) ── */}
      <div className={styles.tools}>
        <div
          className={styles.language}
          role="group"
          aria-label={locale === "es" ? "Idioma" : "Language"}
          data-active={selectedLocale}
        >
          <span className={styles.languageIndicator} aria-hidden="true" />
          {(["es", "en"] as const).map((option) => {
            const targetHref = switchLocalePath(pathname, option);
            const isActive = selectedLocale === option;
            return (
              <Link
                className={styles.languageOption}
                data-active={isActive ? "true" : "false"}
                href={targetHref}
                scroll={false}
                hrefLang={option}
                lang={option}
                aria-label={option === "es" ? "Español" : "English"}
                aria-current={locale === option ? "page" : undefined}
                key={option}
                onClick={(e) => {
                  if (selectedLocale === option) {
                    e.preventDefault();
                    return;
                  }
                  setSelectedLocale(option);
                  setOpen(false);

                  if (typeof document !== "undefined" && "startViewTransition" in document) {
                    e.preventDefault();
                    (document as Document & { startViewTransition: (cb: () => void) => void }).startViewTransition(() => {
                      router.push(targetHref, { scroll: false });
                    });
                  }
                }}
              >
                {option.toUpperCase()}
              </Link>
            );
          })}
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

      {/* ── Drawer mobile ── */}
      {open && (
        <div
          className={styles.mobileDrawer}
          role="dialog"
          aria-modal="true"
          aria-label={locale === "es" ? "Menú" : "Menu"}
        >
          <div className={styles.mobileNav}>
            {navigation.map((item, index) => {
              const active =
                !item.href.includes("#") &&
                (item.href === (locale === "es" ? "/" : "/en")
                  ? pathname === item.href
                  : pathname.startsWith(item.href));
              return (
                <Link
                  style={{ "--i": index } as React.CSSProperties}
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
