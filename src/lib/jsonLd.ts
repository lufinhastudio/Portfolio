import { siteConfig, localePath } from "@/config/site";
import type { Locale, LocalizedProject } from "@/types/project";

export function studioJsonLd() {
  return {
    "@context": "https://schema.org", "@type": "ProfessionalService", name: siteConfig.name,
    url: siteConfig.url, email: siteConfig.contact.email, description: siteConfig.description.es,
    address: { "@type": "PostalAddress", addressRegion: "Entre Ríos", addressCountry: "AR" },
  };
}

export function projectJsonLd(project: LocalizedProject, locale: Locale) {
  return {
    "@context": "https://schema.org", "@type": "CreativeWork", name: project.client,
    headline: project.caseStudy.statement, description: project.description,
    url: new URL(localePath(locale, `/work/${project.slug}`), siteConfig.url).toString(),
    image: new URL(project.cover.src, siteConfig.url).toString(), dateCreated: project.year,
    creator: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  };
}
