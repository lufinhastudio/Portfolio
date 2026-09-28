import Link from "next/link";
import type { Locale } from "@/types/project";
import { getStudioContent } from "@/content";
import { localePath } from "@/config/site";
import { ArrowUpRight } from "@/components/ui/Icons";
import { Aura } from "@/components/ui/Aura";
import styles from "./Services.module.css";

export function Services({ locale }: { locale: Locale }) {
  const content = getStudioContent(locale).services;
  const contactHref = localePath(locale, locale === "es" ? "/contacto" : "/contact");
  return (
    <section className={styles.section} id="services" aria-labelledby="services-title">
      <div className={styles.layout}>
        <div className={styles.intro} data-services-intro>
          <header>
            <p className={`${styles.brandLine} mono`} data-services-step>{content.eyebrow}</p>
            <h2 className={`${styles.title} display`} id="services-title" data-services-step>{content.title}</h2>
            <p className={styles.statement} data-services-step>{content.statement}</p>
            <p className={styles.introCopy} data-services-step>{content.intro}</p>
          </header>
          <p className={styles.signature} data-services-step>{content.signature}</p>
        </div>
        <div className={styles.list}>
          {content.items.map((service, index) => (
            <article className={styles.item} key={service.title} data-services-item>
              <Aura className={styles.rowAura} variant="field" intensity="medium" position="top-left" tone={index === 0 ? "coral" : index === 1 ? "orange" : "yellow"} />
              <div className={styles.itemTop}>
                <span className={`${styles.number} mono`}>0{index + 1} / 03</span>
                <span className={`${styles.focus} mono`}>{service.focus}</span>
              </div>
              <div className={styles.itemMain}>
                <h3 className={`${styles.name} display`}>{service.title}</h3>
                <div className={styles.details}>
                  <p className={styles.description}>{service.text}</p>
                  <p className={styles.fit}>{service.fit}</p>
                  <Link className={styles.link} href={contactHref} aria-label={(locale === "es" ? "Consultar por " : "Ask us about ") + service.title}>
                    <span>{service.cta}</span>
                    <ArrowUpRight size="1rem" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
