import { siteConfig } from "@/config/site";

export function getSocialLinks() {
  return [
    { label: "Email", href: `mailto:${siteConfig.contact.email}` },
    { label: "WhatsApp", href: siteConfig.contact.whatsapp },
    { label: "Instagram", href: siteConfig.contact.instagram },
    { label: "GitHub", href: siteConfig.contact.github },
    { label: "LinkedIn", href: siteConfig.contact.linkedin },
  ].filter((link): link is { label: string; href: string } => Boolean(link.href));
}
