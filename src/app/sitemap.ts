import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { projects } from "@/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = ["", "/work", "/studio", "/contacto", "/en", "/en/work", "/en/studio", "/en/contact"].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "monthly" : "yearly",
    priority: path === "" || path === "/en" ? 1 : 0.8,
  }));

  const workPages: MetadataRoute.Sitemap = projects.flatMap((project) => ["", "/en"].map((prefix) => ({
    url: `${siteConfig.url}${prefix}/work/${project.slug}`,
    lastModified: new Date(`${project.year}-01-01`),
    changeFrequency: "yearly" as const,
    priority: 0.75,
    images: [new URL(project.cover.src, siteConfig.url).toString()],
  })));

  return [...pages, ...workPages];
}
