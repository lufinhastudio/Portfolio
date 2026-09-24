import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { Locale, LocalizedProject } from "@/types/project";
import { localePath } from "@/config/site";
import { getStudioContent } from "@/content";
import styles from "./SelectedWork.module.css";

type PaletteStyle = CSSProperties & { "--project-bg": string; "--project-accent": string };

export function SelectedWork({ projects, locale }: { projects: LocalizedProject[]; locale: Locale }) {
  const content = getStudioContent(locale);

  return (
    <section className={styles.section} id="selected-work" aria-labelledby="selected-work-title">
      <header className={styles.intro}>
        <p className={`${styles.eyebrow} mono`}>{content.work.eyebrow}</p>
        <div className={styles.heading}>
          <h2 className={`${styles.title} display`} id="selected-work-title">{content.common.selectedWork}</h2>
          <p className={styles.subtitle}>{content.work.title}</p>
        </div>
      </header>

      <div className={styles.grid}>
        {projects.map((project, index) => (
          <article
            className={styles.project}
            key={project.slug}
            style={{ "--project-bg": project.palette.background, "--project-accent": project.palette.accent } as PaletteStyle}
          >
            <Link className={styles.projectLink} href={localePath(locale, `/work/${project.slug}`)} aria-label={`${content.work.open}: ${project.client}`}>
              <span className={styles.visual} aria-hidden="true">
                <Image
                  src={project.cover.src}
                  alt=""
                  fill
                  sizes={index === 0 ? "(max-width: 760px) 100vw, 42vw" : "(max-width: 760px) 50vw, 30vw"}
                  style={{ objectPosition: project.cover.position ?? "center" }}
                />
              </span>
              <span className={styles.index}>{project.index} / {String(projects.length).padStart(2, "0")}</span>
              <span className={styles.cardContent}>
                <span className={styles.category}>{project.category}</span>
                <span className={`${styles.name} display`}>{project.name}</span>
                <span className={styles.caseLabel}>{content.work.open} <span aria-hidden="true">↗</span></span>
              </span>
            </Link>
            <a className={styles.visit} href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`${content.work.visit}: ${project.client}`} title={`${content.work.visit}: ${project.client}`}>↗</a>
          </article>
        ))}
      </div>
    </section>
  );
}
