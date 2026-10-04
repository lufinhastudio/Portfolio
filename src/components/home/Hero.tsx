"use client";

import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import type { Locale } from "@/types/project";
import { getStudioContent } from "@/content";
import { Aura } from "@/components/ui/Aura";
import { ReactiveAura } from "@/components/ui/ReactiveAura";
import { ArrowUpRight, ArrowDown } from "@/components/ui/Icons";
import { IdeaBar } from "./IdeaBar";
import styles from "./Hero.module.css";

/* Duración total de la intro (letras + cortina). Debe coincidir con
   la animación .introOverlay en Hero.module.css. */
const INTRO_MS = 2100;
const INTRO_KEY = "lufinha:intro";
/* Momento en que terminó toda la entrada del hero (intro + cascada). */
const ENTRANCE_MS = 3300;
/* Marca diferida al desmontar. Se cancela si el componente se vuelve a montar
   enseguida (StrictMode en desarrollo monta → desmonta → monta). */
let pendingSeen: number | undefined;
const BRAND = "LUFINHA".split("");

export function Hero({ locale }: { locale: Locale }) {
  const content = getStudioContent(locale).hero;
  const [isIntroMounted, setIsIntroMounted] = useState(true);

  /* ── Intro: una sola vez por sesión ──────────────────────────────────
     El script inline de layout.tsx marca <html data-intro="seen"> antes de
     pintar; el CSS oculta el overlay y acorta los delays. Acá sólo
     desmontamos el overlay y registramos que ya se vio. */
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // El atributo se aplica recién cuando terminó la entrada: cambiarlo antes
    // modificaría los delays de animaciones en curso y el texto "saltaría".
    const markSeen = () => { root.dataset.intro = "seen"; };
    window.clearTimeout(pendingSeen);

    if (root.dataset.intro === "seen" || reduced) {
      setIsIntroMounted(false);
      markSeen();
      return;
    }

    try { sessionStorage.setItem(INTRO_KEY, "1"); } catch { /* modo privado */ }
    const hideOverlay = window.setTimeout(() => setIsIntroMounted(false), INTRO_MS);
    const settle = window.setTimeout(markSeen, ENTRANCE_MS);
    return () => {
      window.clearTimeout(hideOverlay);
      window.clearTimeout(settle);
      // Si se navega antes de terminar, no repetir la intro al volver
      pendingSeen = window.setTimeout(markSeen, 0);
    };
  }, []);

  // El título se parte en palabras para revelarlas en cascada (con máscara).
  const words = content.title.split(" ");

  return (
    <section className={styles.hero} aria-labelledby="home-title">
      {/* ── Fondo vivo: reacciona al mouse, al click y al scroll ── */}
      <ReactiveAura className={styles.background} />

      {/* ── Línea superior ── */}
      <div className={styles.topline}>
        <span className="mono">{locale === "es" ? "Diseño + desarrollo" : "Design + development"}</span>
      </div>

      {/* ── Contenido principal ── */}
      <div className={styles.main}>
        <h1 className={`${styles.title} display`} id="home-title">
          {/* Texto completo para lectores de pantalla; la versión partida es visual */}
          <span className="sr-only">{content.title}</span>
          <span aria-hidden="true">
            {words.map((word, index) => (
              <Fragment key={`${word}-${index}`}>
                <span className={styles.word}>
                  <span className={styles.wordInner} style={{ "--i": index } as React.CSSProperties}>{word}</span>
                </span>
                {index < words.length - 1 ? " " : null}
              </Fragment>
            ))}
          </span>
        </h1>

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
          <Link className={styles.workLink} href="#selected-work">
            <span>{locale === "es" ? "Ver nuestro trabajo" : "See our work"}</span>
            <span className={styles.desktopArrow}><ArrowUpRight size="0.85rem" aria-hidden="true" /></span>
            <span className={styles.mobileArrow}><ArrowDown size="0.8rem" aria-hidden="true" /></span>
          </Link>
        </div>
      </div>

      {/* ── Intro: las letras suben, el color aparece detrás y la pantalla
             se levanta como una cortina revelando el hero ── */}
      {isIntroMounted && (
        <div className={styles.introOverlay} aria-hidden="true">
          <div className={styles.introAuraWrap}>
            <Aura variant="hero" intensity="strong" position="top-left" animated />
          </div>
          <div className={styles.introBrand}>
            <span className={styles.introWord}>
              {BRAND.map((letter, index) => (
                <span className={styles.introMask} key={index}>
                  <span className={styles.introLetter} style={{ "--i": index } as React.CSSProperties}>{letter}</span>
                </span>
              ))}
            </span>
            <span className={`${styles.introTag} mono`}>{locale === "es" ? "Diseño + desarrollo" : "Design + development"}</span>
          </div>
          <span className={styles.introProgress} />
        </div>
      )}
    </section>
  );
}
