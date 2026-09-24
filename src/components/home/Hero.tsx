"use client";

import Image from "next/image";
import type { CSSProperties, PointerEvent } from "react";
import type { Locale, LocalizedProject } from "@/types/project";
import { getStudioContent } from "@/content";
import { siteConfig } from "@/config/site";
import styles from "./Hero.module.css";

type HeroStyle = CSSProperties & { "--hero-width"?: number; "--hero-shift"?: string };

export function Hero({ locale, projects }: { locale: Locale; projects: LocalizedProject[] }) {
  const content = getStudioContent(locale);
  const reel = [...projects, ...projects];

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (!siteConfig.motion.pointerWordmark || event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const progress = (event.clientX - bounds.left) / bounds.width;
    event.currentTarget.style.setProperty("--hero-width", (74 + progress * 46).toFixed(1));
    event.currentTarget.style.setProperty("--hero-shift", `${((progress - 0.5) * 24).toFixed(1)}px`);
  }

  return (
    <section
      className={styles.hero}
      style={{ "--hero-width": 94, "--hero-shift": "0px" } as HeroStyle}
      onPointerMove={handlePointerMove}
      onPointerLeave={(event) => {
        event.currentTarget.style.setProperty("--hero-width", "94");
        event.currentTarget.style.setProperty("--hero-shift", "0px");
      }}
      aria-labelledby="hero-title"
    >
      <div className={styles.stage}>
        <div className={styles.reelMask} aria-hidden="true">
          <div className={styles.reel}>
            {reel.map((project, index) => (
              <div className={styles.frame} key={`${project.slug}-${index}`}>
                <Image src={project.cover.src} alt="" fill sizes="(max-width: 720px) 53vw, 24vw" priority={index < 3} style={{ objectPosition: project.cover.position ?? "center" }} />
              </div>
            ))}
          </div>
          <div className={styles.veil} />
        </div>
        <h1 className={styles.wordmark} id="hero-title" aria-label="Lufinha">
          {"LUFINHA".split("").map((letter, index) => <span className={styles.letter} key={`${letter}-${index}`}>{letter}</span>)}
        </h1>
      </div>
      <div className={styles.bottomline}>
        <p className={styles.description}>{content.hero.description}</p>
        <a className={`${styles.scroll} mono`} href="#manifesto">{content.hero.scroll}</a>
      </div>
    </section>
  );
}
