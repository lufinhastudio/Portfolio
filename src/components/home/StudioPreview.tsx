import Link from "next/link";
import type { Locale } from "@/types/project";
import { getStudioContent } from "@/content";
import { localePath, siteConfig } from "@/config/site";
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
        {siteConfig.team.map((person, index) => (
          <article className={styles.person} key={person.name} data-reveal>
            <span className="mono">0{index + 1}</span>
            <h3 className={`${styles.name} display`}>{person.name}</h3>
            <div className={styles.profile}>
              <p className="mono">{person.role ?? "Lufinha Studio"}</p>
              <p>{person.bio ?? content.profilePending}</p>
            </div>
          </article>
        ))}
      </div>
      <Link className={`${styles.link} mono`} href={localePath(locale, "/studio")} data-cursor={locale === "es" ? "ABRIR" : "OPEN"}>
        {content.people} <span aria-hidden="true">↗</span>
      </Link>
    </section>
  );
}
