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
    es: "Estudio de desarrollo de software, sistemas y soluciones digitales a medida.",
    en: "Studio for custom software, systems and digital solutions.",
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
      photo: "/rafa.jpg",
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
    "Next.js", "React", "TypeScript", "Node.js", "PostgreSQL",
    "Neon", "Vercel", "Cloudinary", "Mercado Pago", "Resend",
  ],
  theme: {
    background: "#111410",
    foreground: "#f6f7f2",
    paper: "#dde1da",
    ink: "#171a16",
    signal: "#b9d635",
    line: "rgba(246, 247, 242, 0.2)",
  },
  motion: {
    enabled: true,
    respectReducedMotion: true,
    pointerWordmark: true,
    smoothScroll: true,
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
