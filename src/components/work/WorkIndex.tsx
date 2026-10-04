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
   2. Galería: el primero destacado a todo el ancho, el resto en dos
      columnas. Cada tarjeta muestra sólo imagen, nombre, rubro y año.
   ========================================================================== */

export function WorkIndex({ locale }: { locale: Locale }) {
  const projects = getLocalizedProjects(locale);
  const content = getStudioContent(locale);
  const titleWords = (locale === "es" ? "Trabajo." : "Work.").split(" ");
  const labels = locale === "es"
    ? { open: "Ver el caso", soon: "Próximamente" }
    : { open: "View case study", soon: "Coming soon" };

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

      {/* ── 2. Proyectos: galería. Desde afuera sólo imagen, nombre y rubro;
             el detalle (qué hicimos, stack, etc.) vive dentro de cada caso. ── */}
      <section className={styles.list} aria-label={content.common.selectedWork}>
        {projects.map((project, index) => {
          const href = localePath(locale, `/work/${project.slug}`);
          // Destacados a todo el ancho: el primero y, si queda uno suelto al final, el último
          const isFeatured = index === 0 || (index === projects.length - 1 && (projects.length - 1) % 2 === 1);
          const kind = project.category.split(" / ").slice(0, 2).join(" · ");
          const inner = (
            <>
              <span className={styles.visual}>
                <Image src={project.cover.src} alt={project.cover.alt} fill sizes={isFeatured ? "(max-width: 760px) 100vw, 90vw" : "(max-width: 760px) 100vw, 45vw"} priority={index < 1} style={{ objectPosition: project.cover.position ?? "center" }} />
                <ProjectBrand logo={project.brandLogo} placement="cover" />
                <span className={styles.badge}>
                  {project.previewOnly
                    ? labels.soon
                    : <>{labels.open}<span className={styles.badgeIcon} aria-hidden="true"><ArrowUpRight size=".8rem" /></span></>}
                </span>
              </span>
              <span className={styles.meta}>
                <span className={`${styles.projectName} display`}>{project.name}</span>
                <span className={`${styles.year} mono`}>{project.year}</span>
                <span className={styles.kind}>{kind}</span>
              </span>
            </>
          );

          return (
            <article
              className={`${styles.item} ${isFeatured ? styles.featured : ""} ${project.previewOnly ? styles.previewItem : ""}`}
              key={project.slug}
              style={{ "--project-bg": project.palette.background } as React.CSSProperties}
              data-reveal
            >
              <h2 className="sr-only">{project.name}</h2>
              {project.previewOnly
                ? <div className={styles.card}>{inner}</div>
                : <Link className={styles.card} href={href} aria-label={`${labels.open}: ${project.client}`}>{inner}</Link>}
            </article>
          );
        })}
      </section>
    </main>
  );
}
