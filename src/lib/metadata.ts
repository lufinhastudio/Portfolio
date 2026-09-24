import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/types/project";
import { switchLocalePath } from "@/lib/locale";

type MetadataInput = { title?: string; description?: string; path?: string; image?: string; locale?: Locale };

export function createMetadata({ title, description, path = "/", image = "/work/mayma/cover.png", locale = "es" }: MetadataInput = {}): Metadata {
  const resolvedDescription = description ?? siteConfig.description[locale];
  const resolvedTitle = title ?? siteConfig.seo.defaultTitle[locale];
  const canonical = new URL(path, siteConfig.url).toString();
  const imageUrl = new URL(image, siteConfig.url).toString();
  const esPath = switchLocalePath(path, "es");
  const enPath = switchLocalePath(path, "en");
  return {
    title: title ? resolvedTitle : { absolute: resolvedTitle },
    description: resolvedDescription,
    alternates: {
      canonical,
      languages: {
        "es-AR": new URL(esPath, siteConfig.url).toString(),
        "en-US": new URL(enPath, siteConfig.url).toString(),
        "x-default": new URL(esPath, siteConfig.url).toString(),
      },
    },
    openGraph: {
      type: "website", locale: siteConfig.localeMap[locale], url: canonical, siteName: siteConfig.name,
      title: resolvedTitle, description: resolvedDescription, images: [{ url: imageUrl }],
    },
    twitter: { card: siteConfig.seo.twitterCard, title: resolvedTitle, description: resolvedDescription, images: [imageUrl] },
  };
}
