import Image from "next/image";
import type { Locale } from "@/types/project";
import { getStudioContent } from "@/content";
import { siteConfig } from "@/config/site";
import { PersonContacts } from "@/components/team/PersonContacts";
import { Aura } from "@/components/ui/Aura";
import styles from "./StudioPreview.module.css";

export function StudioPreview({ locale }: { locale: Locale }) {
  const content = getStudioContent(locale).studio;
  return (
    <section className={styles.section} aria-labelledby="studio-preview-title">
      <Aura variant="accent" intensity="soft" position="top-left" />
      <header className={styles.intro} data-studio-intro>
        <div>
          <h2 className={`${styles.title} display`} id="studio-preview-title" data-studio-step>{locale === "es" ? "Rafa y Luca, de principio a fin." : "Rafa and Luca, from start to finish."}</h2>
          <p className={styles.body} data-studio-step>{content.body}</p>
        </div>
      </header>
      <div className={styles.people} aria-label={content.people}>
        {siteConfig.team.map((person, index) => {
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
                <PersonContacts person={person} locale={locale} data-studio-step />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
