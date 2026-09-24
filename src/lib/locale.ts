import type { Locale } from "@/types/project";

export function localeFromPathname(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "es";
}

export function switchLocalePath(pathname: string, locale: Locale) {
  const withoutEnglish = pathname.replace(/^\/en(?=\/|$)/, "") || "/";
  if (withoutEnglish === "/contacto" || withoutEnglish === "/contact") {
    return locale === "en" ? "/en/contact" : "/contacto";
  }
  return locale === "en" ? `/en${withoutEnglish === "/" ? "" : withoutEnglish}` : withoutEnglish;
}
