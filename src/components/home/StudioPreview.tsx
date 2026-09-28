import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/types/project";
import { getStudioContent } from "@/content";
import { localePath, siteConfig } from "@/config/site";
import { ArrowUpRight } from "@/components/ui/Icons";
import { Aura } from "@/components/ui/Aura";
import styles from "./StudioPreview.module.css";

export function StudioPreview({ locale }: { locale: Locale }) {
  const content = getStudioContent(locale).studio;
  return (
    <section className={styles.section} aria-labelledby="studio-preview-title">
      <Aura variant="accent" intensity="soft" position="top-left" />
      <header className={styles.intro} data-studio-intro>
        <p className="mono" data-studio-step>{content.eyebrow} / {locale === "es" ? siteConfig.contact.location : "Argentina"}</p>
        <div>
          <h2 className={`${styles.title} display`} id="studio-preview-title" data-studio-step>{locale === "es" ? "Rafa y Luca, de principio a fin." : "Rafa and Luca, from start to finish."}</h2>
          <p className={styles.body} data-studio-step>{content.body}</p>
        </div>
      </header>
      <div className={styles.people} aria-label={content.people}>
        {siteConfig.team.map((person, index) => {
          const whatsapp = siteConfig.contact.whatsapp.find((contact) => contact.name === person.name);
          const contacts = [
            { label: "Email", value: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}` },
            ...(whatsapp ? [{ label: "WhatsApp", value: whatsapp.phone, href: whatsapp.href }] : []),
            ...person.links.map((link) => ({ label: link.label, value: locale === "es" ? "Ver perfil" : "View profile", href: link.href })),
          ];

          return (
            <article className={styles.person} key={person.name} data-studio-sequence>
              <span className={`mono ${styles.personNumber}`} data-studio-step>0{index + 1}</span>
              {person.photo ? <div className={styles.portraitStage} data-studio-step>
                <Aura className={styles.personAura} variant="accent" intensity="soft" position="bottom-left" tone={person.name === "Rafa" ? "coral" : "orange"} />
                <div className={styles.portrait} data-studio-portrait><Image src={person.photo} alt={`${person.name} — Lufinha Studio`} fill sizes="(max-width: 760px) 72vw, (max-width: 1100px) 34vw, 24rem" /></div>
              </div> : null}
              <div className={styles.personInfo}>
                <h3 className="display" data-studio-step>{person.name}</h3>
                <p className={styles.bio} data-studio-step>{content.shortBios[person.name]}</p>
                <div className={styles.contacts} data-studio-step aria-label={`${locale === "es" ? "Contacto de" : "Contact details for"} ${person.name}`}>
                  {contacts.map((contact) => <a href={contact.href} key={`${person.name}-${contact.label}`} target={contact.label === "WhatsApp" || contact.label === "LinkedIn" ? "_blank" : undefined} rel={contact.label === "WhatsApp" || contact.label === "LinkedIn" ? "noopener noreferrer" : undefined}><span>{contact.label}</span><span>{contact.value}</span><ArrowUpRight size=".85rem" aria-hidden="true" /></a>)}
                </div>
              </div>
            </article>
          );
        })}
      </div>
      <Link className={styles.link} href={localePath(locale, "/studio")}>{content.people}<ArrowUpRight size="1em" aria-hidden="true" /></Link>
    </section>
  );
}
