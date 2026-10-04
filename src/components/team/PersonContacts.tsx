import type { Locale } from "@/types/project";
import { siteConfig } from "@/config/site";
import { ArrowUpRight } from "@/components/ui/Icons";
import styles from "./PersonContacts.module.css";

type Person = (typeof siteConfig.team)[number];

/* Contactos de Rafa / Luca. Se usa igual en Inicio y en Estudio.
   El número de WhatsApp no se muestra: sólo el link. */
export function PersonContacts({ person, locale, ...rest }: { person: Person; locale: Locale } & React.HTMLAttributes<HTMLDivElement>) {
  const whatsapp = siteConfig.contact.whatsapp.find((contact) => contact.name === person.name);
  const t = locale === "es"
    ? { message: "Enviar mensaje", profile: "Ver perfil", group: `Contacto de ${person.name}` }
    : { message: "Send a message", profile: "View profile", group: `Contact details for ${person.name}` };

  const contacts = [
    { label: "Email", value: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}`, external: false },
    ...(whatsapp ? [{ label: "WhatsApp", value: t.message, href: whatsapp.href, external: true }] : []),
    ...person.links.map((link) => ({ label: link.label, value: t.profile, href: link.href, external: true })),
  ];

  return (
    <div className={styles.list} aria-label={t.group} {...rest}>
      {contacts.map((contact) => (
        <a
          className={styles.item}
          href={contact.href}
          key={contact.label}
          aria-label={`${contact.label} ${person.name}: ${contact.value}`}
          target={contact.external ? "_blank" : undefined}
          rel={contact.external ? "noopener noreferrer" : undefined}
        >
          <span className={styles.text}><span>{contact.label}</span><small>{contact.value}</small></span>
          <span className={styles.icon} aria-hidden="true"><ArrowUpRight size=".85rem" /></span>
        </a>
      ))}
    </div>
  );
}
