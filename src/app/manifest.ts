import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description.es,
    start_url: "/",
    display: "standalone",
    background_color: siteConfig.theme.background,
    theme_color: siteConfig.theme.background,
    lang: siteConfig.defaultLocale,
  };
}
