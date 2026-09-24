import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/types/project";
import { getStudioContent } from "@/content";
import { localePath, siteConfig } from "@/config/site";
import { ArrowUpRight } from "@/components/ui/Icons";
import styles from "./StudioPreview.module.css";

export function StudioPreview({ locale }: { locale: Locale }) {
  const content = getStudioContent(locale).studio;
  return (
    <section className={styles.section} aria-labelledby="studio-preview-title">
      <div className={styles.intro}>
        <p className="mono" data-reveal>{content.eyebrow}</p>
        <div>
          <h2 className={`${styles.title} display`} id="studio-preview-title" data-reveal>{content.title}</h2>
          <p className={styles.body} data-reveal>{content.body}</p>
        </div>
      </div>
      <div className={styles.people} aria-label={content.people}>
        {siteConfig.team.map((person, index) => {
          const whatsapp = siteConfig.contact.whatsapp.find((contact) => contact.name === person.name);
          return (
            <article className={styles.person} key={person.name}>
              <span className="mono">0{index + 1}</span>
              {person.photo ? <div className={styles.portrait}><Image src={person.photo} alt={`Retrato de ${person.name}`} fill sizes="(max-width: 760px) 70vw, 22vw" style={{ objectPosition: person.name === "Luca" ? "center 40%" : "center" }} /></div> : null}
              <div className={styles.profile}>
                <h3 className={`${styles.name} display`}>{person.name}</h3>
                <p className="mono">{person.role ?? "Lufinha Studio"}</p>
                <div className={styles.profileContacts}>
                  <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
                  {whatsapp ? <a href={whatsapp.href}>{whatsapp.phone}</a> : null}
                  {person.links.map((link) => (
                    <a href={link.href} key={link.href}>
                      {link.label} <ArrowUpRight size="0.85em" />
                    </a>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>
      <Link className={`${styles.link} mono`} href={localePath(locale, "/studio")} data-cursor={locale === "es" ? "ABRIR" : "OPEN"}>
        {content.people} <ArrowUpRight size="0.9em" />
      </Link>
    </section>
  );
}
