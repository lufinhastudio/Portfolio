import { siteConfig } from "@/config/site";

export function getSocialLinks() {
  return [
    { label: "Email", href: `mailto:${siteConfig.contact.email}`, kind: "email" as const },
    ...siteConfig.contact.whatsapp.map((contact) => ({
      label: `WhatsApp ${contact.name}`,
      href: contact.href,
      kind: "whatsapp" as const,
      person: contact.name,
    })),
    { label: "Instagram", href: siteConfig.contact.instagram, kind: "instagram" as const },
    { label: "GitHub", href: siteConfig.contact.github, kind: "github" as const },
    ...siteConfig.team.flatMap((person) => person.links.map((link) => ({
      label: `${link.label} ${person.name}`,
      href: link.href,
      kind: "linkedin" as const,
      person: person.name,
    }))),
  ].filter((link): link is typeof link & { href: string } => Boolean(link.href));
}
