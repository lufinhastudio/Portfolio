"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Locale } from "@/types/project";
import { getStudioContent } from "@/content";
import { Aura } from "@/components/ui/Aura";
import { ArrowUpRight, ArrowDown } from "@/components/ui/Icons";
import { IdeaBar } from "./IdeaBar";
import styles from "./Hero.module.css";

export function Hero({ locale }: { locale: Locale }) {
  const content = getStudioContent(locale).hero;
  const [isIntroMounted, setIsIntroMounted] = useState(true);
  const [introActive, setIntroActive] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsIntroMounted(false);
      setIntroActive(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsIntroMounted(false);
      setIntroActive(false);
    }, 1850);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={`${styles.hero} ${introActive ? styles.introPlaying : ""}`} aria-labelledby="home-title">
      <Aura variant="hero" intensity="strong" position="top-left" animated />
      <div className={styles.topline}>
        <span className="mono">{locale === "es" ? "Diseño + desarrollo" : "Design + development"}</span>
      </div>
      <div className={styles.main}>
        <h1 className={`${styles.title} display`} id="home-title">{content.title}</h1>
        <div className={styles.aside}>
          <p>
            <span className={styles.desktopDesc}>{content.description}</span>
            <span className={styles.mobileDesc}>
              {locale === "es"
                ? "Somos Rafa y Luca. Creamos páginas web, tiendas online y sistemas a medida."
                : "We're Rafa and Luca. We create websites, online stores and custom digital systems."}
            </span>
          </p>
        </div>
        <div className={styles.barArea}>
          <div className={styles.barWrap}>
            <IdeaBar locale={locale} />
          </div>
          <Link className={styles.workLink} href="#selected-work" aria-label={locale === "es" ? "Ver nuestro trabajo" : "See our work"}>
            <span>{locale === "es" ? "Ver nuestro trabajo" : "See our work"}</span>
            <span className={styles.desktopArrow}><ArrowUpRight size="0.85rem" aria-hidden="true" /></span>
            <span className={styles.mobileArrow}><ArrowDown size="0.8rem" aria-hidden="true" /></span>
          </Link>
        </div>
      </div>

      {isIntroMounted && (
        <div className={styles.introOverlay} aria-hidden="true">
          <div className={styles.introAuraWrap}>
            <Aura variant="hero" intensity="strong" position="top-left" animated />
          </div>
          <div className={styles.introBrand}>
            <span className={styles.introWord}>LUFINHA</span>
          </div>
        </div>
      )}
    </section>
  );
}
