import { siteConfig } from "@/config/site";
import { ArrowUpRight } from "@/components/ui/Icons";
import type { Locale } from "@/types/project";
import styles from "./HomeContact.module.css";

const copy = {
  es: { question: "¿Tenés una idea?" },
  en: { question: "Got an idea?" },
} as const;

export function HomeContact({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const { email, whatsapp } = siteConfig.contact;

  return (
    <section className={styles.section} id="contacto-final" aria-labelledby="home-contact-title">
      <div className={styles.inner}>
        <p className={`${styles.question} mono`} id="home-contact-title">{t.question}</p>
        <a
          className={styles.email}
          href={`mailto:${email}`}
          aria-label={`Enviar email a ${email}`}
        >
          {email}
        </a>
        <div className={styles.links}>
          {whatsapp.map((contact) => (
            <a
              key={contact.name}
              className={styles.waLink}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`WhatsApp ${contact.name}`}
            >
              <span>WhatsApp {contact.name}</span>
              <ArrowUpRight size="0.85rem" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
