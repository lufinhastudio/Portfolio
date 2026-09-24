"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import type { Locale, LocalizedProject } from "@/types/project";
import { localePath } from "@/config/site";
import { getStudioContent } from "@/content";
import { LiveBrowserPreview } from "@/components/projects/LiveBrowserPreview";
import styles from "./SelectedWork.module.css";

type PaletteStyle = CSSProperties & Record<`--project-${string}`, string>;

export function SelectedWork({ projects, locale }: { projects: LocalizedProject[]; locale: Locale }) {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const content = getStudioContent(locale);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track || window.matchMedia("(max-width: 899px), (prefers-reduced-motion: reduce)").matches) return;
    let dispose = () => {};
    let cancelled = false;
    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([gsapModule, triggerModule]) => {
      if (cancelled) return;
      const gsap = gsapModule.gsap;
      const ScrollTrigger = triggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.85,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
      dispose = () => tween.scrollTrigger?.kill();
      ScrollTrigger.refresh();
    });
    return () => { cancelled = true; dispose(); };
  }, []);

  return (
    <section className={styles.section} ref={rootRef} aria-labelledby="selected-work-title">
      <div className={styles.track} ref={trackRef}>
        <header className={styles.intro}>
          <p className="mono">{content.work.eyebrow}</p>
          <h2 className={`${styles.introTitle} display`} id="selected-work-title">{content.work.title}</h2>
          <span className={`${styles.direction} mono`} aria-hidden="true">Scroll →</span>
        </header>

        {projects.map((project) => (
          <article
            className={styles.project}
            key={project.slug}
            style={{
              "--project-bg": project.palette.background,
              "--project-fg": project.palette.foreground,
              "--project-accent": project.palette.accent,
              "--project-muted": project.palette.muted,
            } as PaletteStyle}
          >
            <div className={`${styles.meta} mono`}>
              <span>{project.index} / {String(projects.length).padStart(2, "0")}</span>
              <span>{project.category}</span>
              <span>{project.year}</span>
            </div>
            <h3 className={`${styles.name} display`}>{project.name}</h3>
            <div className={styles.preview} data-cursor={locale === "es" ? "VER" : "VIEW"}>
              <Link className={styles.previewLink} href={localePath(locale, `/work/${project.slug}`)} aria-label={`${content.work.open}: ${project.client}`}>
                <LiveBrowserPreview title={project.client} fallback={project.cover} label={content.work.live} />
              </Link>
              {project.gallery[0] ? (
                <div className={styles.detail} aria-hidden="true">
                  <Image src={project.gallery[0].src} alt="" fill sizes="18vw" />
                </div>
              ) : null}
            </div>
            <div className={styles.foot}>
              <p>{project.description}</p>
              <div className={styles.links}>
                <Link href={localePath(locale, `/work/${project.slug}`)}>{content.work.open} ↗</Link>
                <a href={project.url}>{content.work.visit} ↗</a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
