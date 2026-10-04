import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/types/project";
import { getLocalizedProjects, getStudioContent } from "@/content";
import { localePath, siteConfig } from "@/config/site";
import { ArrowUpRight } from "@/components/ui/Icons";
import { ProjectBrand } from "@/components/projects/ProjectBrand";
import { ReactiveAura } from "@/components/ui/ReactiveAura";
import styles from "./WorkIndex.module.css";

/* ==========================================================================
   Trabajo — índice de proyectos
   1. Hero con fondo vivo (mismo lenguaje que Home y Estudio)
   2. Lista editorial: cada proyecto en su propia fila, imagen grande +
      ficha legible (qué es, qué hicimos, año) y acceso al caso.
   ========================================================================== */

export function WorkIndex({ locale }: { locale: Locale }) {
  const projects = getLocalizedProjects(locale);
  const content = getStudioContent(locale);
  const total = String(projects.length).padStart(2, "0");
  const titleWords = (locale === "es" ? "Trabajo." : "Work.").split(" ");
  const labels = locale === "es"
    ? { type: "Qué es", did: "Qué hicimos", year: "Año", open: "Ver el caso", soon: "Próximamente" }
    : { type: "What it is", did: "What we did", year: "Year", open: "View case study", soon: "Coming soon" };

  const itemListJsonLd = {
    "@context": "https://schema.org", "@type": "ItemList",
    itemListElement: projects.map((project, index) => ({ "@type": "ListItem", position: index + 1, name: project.client, ...(!project.previewOnly ? { url: new URL(localePath(locale, `/work/${project.slug}`), siteConfig.url).toString() } : {}) })),
  };

  return (
    <main className={styles.page} lang={locale}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />

      {/* ── 1. Hero ── */}
      <header className={styles.hero}>
        <ReactiveAura className={styles.heroAura} intensity="medium" />
        <div className={styles.heroTop}>
          <span className="mono">Lufinha Studio</span>
        </div>
        <div className={styles.heroCopy}>
          <h1 className={`${styles.title} display`}>
            <span className="sr-only">{titleWords.join(" ")}</span>
            <span aria-hidden="true">
              {titleWords.map((word, index) => (
                <Fragment key={`${word}-${index}`}>
                  <span className={styles.word}><span className={styles.wordInner} style={{ "--i": index } as React.CSSProperties}>{word}</span></span>
                  {index < titleWords.length - 1 ? " " : null}
                </Fragment>
              ))}
            </span>
          </h1>
          <p className={styles.heroLead}>
            {locale === "es"
              ? "Una selección de páginas, tiendas y sistemas que diseñamos y desarrollamos."
              : "A selection of websites, stores and systems we designed and built."}
          </p>
        </div>
      </header>

      {/* ── 2. Lista de proyectos ── */}
      <section className={styles.list} aria-label={content.common.selectedWork}>
        {projects.map((project, index) => {
          const href = localePath(locale, `/work/${project.slug}`);
          const cover = (
            <>
              <Image src={project.cover.src} alt={project.cover.alt} fill sizes="(max-width: 860px) 100vw, 58vw" priority={index < 1} style={{ objectPosition: project.cover.position ?? "center" }} />
              <ProjectBrand logo={project.brandLogo} placement="cover" />
              {!project.previewOnly ? <span className={styles.viewProject}>{labels.open}<ArrowUpRight size=".9em" aria-hidden="true" /></span> : null}
            </>
          );

          return (
            <article
              className={`${styles.item} ${index % 2 ? styles.itemReverse : ""} ${project.previewOnly ? styles.previewItem : ""}`}
              key={project.slug}
              style={{ "--project-accent": project.palette.accent, "--project-bg": project.palette.background } as React.CSSProperties}
              data-reveal-group
            >
              {/* Imagen */}
              {project.previewOnly
                ? <div className={`${styles.visual} ${styles.visualPreview}`} data-reveal-item>{cover}</div>
                : <Link className={styles.visual} href={href} aria-label={`${labels.open}: ${project.client}`} tabIndex={-1} data-reveal-item>{cover}</Link>}

              {/* Ficha */}
              <div className={styles.info}>
                <span className={`${styles.index} mono`} data-reveal-item>{project.index} / {total}</span>

                <h2 className={`${styles.projectName} display`} data-reveal-item>
                  {project.previewOnly ? project.name : <Link href={href}>{project.name}</Link>}
                </h2>

                <p className={styles.description} data-reveal-item>{project.description}</p>

                <dl className={styles.facts} data-reveal-item>
                  <div><dt className="mono">{labels.type}</dt><dd>{project.category.split(" / ").join(" · ")}</dd></div>
                  <div><dt className="mono">{labels.did}</dt><dd>{project.services.join(" · ")}</dd></div>
                  <div><dt className="mono">{labels.year}</dt><dd>{project.year}</dd></div>
                </dl>

                {project.previewOnly
                  ? <span className={`${styles.cta} ${styles.ctaDisabled}`} data-reveal-item>{labels.soon}</span>
                  : <Link className={styles.cta} href={href} data-reveal-item><span>{labels.open}</span><ArrowUpRight size="1em" aria-hidden="true" /></Link>}
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}
