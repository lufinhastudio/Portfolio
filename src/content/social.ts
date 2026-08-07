import { siteConfig } from "@/config/site";

export function getSocialLinks() {
  return [
    { label: "Email", href: `mailto:${siteConfig.contact.email}` },
    ...siteConfig.contact.whatsapp.map((contact) => ({
      label: `WhatsApp ${contact.name}`,
      href: contact.href,
    })),
    { label: "Instagram", href: siteConfig.contact.instagram },
    { label: "GitHub", href: siteConfig.contact.github },
    ...siteConfig.team.flatMap((person) => person.links.map((link) => ({
      label: `${link.label} ${person.name}`,
      href: link.href,
    }))),
  ].filter((link): link is { label: string; href: string } => Boolean(link.href));
}
