import type { Locale } from "@/types/project";

const defaultSiteUrl = "https://lufinha.studio";

export const siteConfig = {
  name: "Lufinha Studio",
  shortName: "Lufinha",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? defaultSiteUrl,
  defaultLocale: "es" as Locale,
  locales: ["es", "en"] as Locale[],
  localeMap: { es: "es_AR", en: "en_US" },
  description: {
    es: "Diseñamos y desarrollamos páginas web, tiendas online y sistemas digitales a medida.",
    en: "We design and build websites, online stores and custom digital systems.",
  },
  contact: {
    email: "lufinhastudio@gmail.com",
    whatsapp: [
      {
        name: "Rafa",
        phone: "+54 9 3446 608118",
        href: "https://wa.me/5493446608118",
      },
      {
        name: "Luca",
        phone: "+54 9 3447 497062",
        href: "https://wa.me/5493447497062",
      },
    ],
    instagram: null as string | null,
    github: null as string | null,
    location: "Entre Ríos, Argentina",
  },
  team: [
    {
      name: "Rafa",
      role: null as string | null,
      bio: null as string | null,
      photo: "/rafa-fotorafa.jpg",
      links: [
        {
          label: "LinkedIn",
          href: "https://www.linkedin.com/in/rafaela-sanna-23a329371/",
        },
      ],
    },
    {
      name: "Luca",
      role: null as string | null,
      bio: null as string | null,
      photo: "/luca.jpeg",
      links: [
        {
          label: "LinkedIn",
          href: "https://www.linkedin.com/in/luca-saboredo-066b242a8/",
        },
      ],
    },
  ],
  stack: [
    "React", "React Native", "TypeScript", "JavaScript", "Next.js",
    "Node.js", "PostgreSQL", "Neon", "APIs / REST", "Vercel",
    "Docker", "Cloudinary", "Git", "GitHub",
  ],
  theme: {
    background: "#FFFFFF",
    foreground: "#171916",
    paper: "#FAFAFA",
    ink: "#171916",
    signal: "#5E6C43",
    accent: "#A84F30",
    line: "rgba(23, 25, 22, 0.18)",
  },
  motion: {
    enabled: true,
    respectReducedMotion: true,
    pointerWordmark: false,
    smoothScroll: false,
  },
  seo: {
    titleTemplate: "%s — Lufinha Studio",
    defaultTitle: {
      es: "Lufinha Studio — Software y sistemas a medida",
      en: "Lufinha Studio — Custom software and systems",
    },
    twitterCard: "summary_large_image" as const,
  },
} as const;

export function localePath(locale: Locale, path = "/") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return locale === siteConfig.defaultLocale ? normalized : `/en${normalized === "/" ? "" : normalized}`;
}
