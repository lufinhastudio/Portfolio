import Link from "next/link";
import type { Locale } from "@/types/project";
import { getStudioContent } from "@/content";
import { localePath } from "@/config/site";
import { ArrowUpRight } from "@/components/ui/Icons";
import { Aura } from "@/components/ui/Aura";
import styles from "./Hero.module.css";

export function Hero({ locale }: { locale: Locale }) {
  const content = getStudioContent(locale).hero;
  const contactHref = localePath(locale, locale === "es" ? "/contacto" : "/contact");
  return (
    <section className={styles.hero} aria-labelledby="home-title">
      <Aura variant="hero" intensity="strong" position="top-left" animated />
      <div className={styles.topline}>
        <p className="mono">{content.eyebrow}</p>
        <span className="mono">{locale === "es" ? "Diseño + desarrollo" : "Design + development"}</span>
      </div>
      <div className={styles.main}>
        <h1 className={`${styles.title} display`} id="home-title" data-reveal>{content.title}</h1>
        <div className={styles.aside} data-reveal>
          <p>{content.description}</p>
          <div className={styles.actions}>
            <Link className={styles.primary} href="#selected-work">{content.primaryCta}<ArrowUpRight size="1rem" aria-hidden="true" /></Link>
            <Link className={styles.secondary} href={contactHref}>{content.secondaryCta}<ArrowUpRight size="1rem" aria-hidden="true" /></Link>
          </div>
        </div>
      </div>
      <div className={styles.bottomline}><span className="mono">01 — 05 / {locale === "es" ? "Trabajo seleccionado" : "Selected work"}</span><span className="mono">{locale === "es" ? "Concepción del Uruguay · Argentina" : "Concepción del Uruguay · Argentina"}</span></div>
    </section>
  );
}
