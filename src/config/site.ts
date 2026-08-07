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
    es: "Estudio digital independiente de diseño, ecommerce y creative development. Creamos experiencias web con identidad, interacción y resultados.",
    en: "Independent digital studio for design, ecommerce and creative development. We build web experiences with identity, interaction and purpose.",
  },
  contact: {
    email: "lufinhastudio@gmail.com",
    whatsapp: [
      {
        name: "Luca",
        phone: "+54 9 3447 497062",
        href: "https://wa.me/5493447497062",
      },
      {
        name: "Rafa",
        phone: "+54 9 3446 608118",
        href: "https://wa.me/5493446608118",
      },
    ],
    instagram: null as string | null,
    github: null as string | null,
    location: "Entre Ríos, Argentina",
    availability: {
      es: "Disponible para proyectos seleccionados",
      en: "Available for selected projects",
    },
  },
  team: [
    {
      name: "Luca",
      role: null as string | null,
      bio: null as string | null,
      photo: null as string | null,
      links: [
        {
          label: "LinkedIn",
          href: "https://www.linkedin.com/in/luca-saboredo-066b242a8/",
        },
      ],
    },
    {
      name: "Rafa",
      role: null as string | null,
      bio: null as string | null,
      photo: null as string | null,
      links: [
        {
          label: "LinkedIn",
          href: "https://www.linkedin.com/in/rafaela-sanna-23a329371/",
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
      es: "Lufinha Studio — Diseño & Creative Development",
      en: "Lufinha Studio — Design & Creative Development",
    },
    twitterCard: "summary_large_image" as const,
  },
} as const;

export function localePath(locale: Locale, path = "/") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return locale === siteConfig.defaultLocale ? normalized : `/en${normalized === "/" ? "" : normalized}`;
}
