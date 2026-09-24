import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { Locale, LocalizedProject } from "@/types/project";
import { getLocalizedProjects, getStudioContent } from "@/content";
import { localePath } from "@/config/site";
import { projectJsonLd } from "@/lib/jsonLd";
import { LiveBrowserPreview } from "@/components/projects/LiveBrowserPreview";
import styles from "./CaseStudy.module.css";

type CaseStyle = CSSProperties & Record<`--${string}`, string>;

export function CaseStudy({ project, locale }: { project: LocalizedProject; locale: Locale }) {
  const projects = getLocalizedProjects(locale);
  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const content = getStudioContent(locale).common;
  const labels = locale === "es"
    ? { challenge: "El desafío", approach: "El enfoque", decisions: "Decisiones clave", system: "Un sistema hecho para esta marca.", result: "El resultado" }
    : { challenge: "The challenge", approach: "The approach", decisions: "Key decisions", system: "A system made for this brand.", result: "The outcome" };

  return (
    <main className={styles.caseStudy} lang={locale} style={{ "--case-bg": project.palette.background, "--case-fg": project.palette.foreground, "--case-accent": project.palette.accent } as CaseStyle}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd(project, locale)) }} />
      <section className={styles.hero}>
        <div className={`${styles.top} mono`}><Link href={localePath(locale, "/work")}>← {content.allProjects}</Link><span>{project.category}</span><span className={styles.services}>{project.services.join(" · ")}</span></div>
        <div className={styles.titleWrap}><h1 className={`${styles.title} display`}>{project.name}</h1></div>
        <div className={styles.bottom}><span className="mono">{project.index} / {project.year}</span><p className={styles.statement}>{project.description}</p><a className={`${styles.siteLink} mono`} href={project.url}>{content.visitSite} ↗</a></div>
      </section>
      <div className={styles.cover}><Image data-parallax src={project.cover.src} alt={project.cover.alt} fill priority sizes="100vw" style={{ objectPosition: project.cover.position ?? "center" }} /></div>
      <section className={styles.liveSection} aria-label={`${project.client} ${locale === "es" ? "sitio web" : "website"}`}>
        <div className={styles.liveHeader}><p className="mono">{locale === "es" ? "SITIO" : "SITE"} / {project.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}</p><p>{project.description}</p></div>
        <div className={styles.liveBrowser} data-cursor={locale === "es" ? "VISITAR" : "VISIT"}><a href={project.url} aria-label={`${content.visitSite}: ${project.client}`}><LiveBrowserPreview title={project.client} fallback={project.cover} label={locale === "es" ? "Vista del proyecto" : "Project preview"} /></a></div>
      </section>
      <section className={styles.story}>
        <h2 className={`${styles.statementLarge} display`} data-reveal>{project.caseStudy.statement}</h2>
        <div className={styles.narrative}>
          <div className={styles.narrativeBlock} data-reveal><span className="mono">01</span><div><p className="mono">{labels.challenge}</p><p>{project.caseStudy.challenge}</p></div></div>
          <div className={styles.narrativeBlock} data-reveal><span className="mono">02</span><div><p className="mono">{labels.approach}</p><p>{project.caseStudy.approach}</p></div></div>
        </div>
      </section>
      <section className={styles.gallery} aria-label={`${locale === "es" ? "Imágenes de" : "Images from"} ${project.client}`}>
        <div className={styles.galleryMain}><Image src={project.gallery[0]?.src ?? project.cover.src} alt={project.gallery[0]?.alt ?? project.cover.alt} fill sizes="(max-width: 760px) 100vw, 60vw" /></div>
        <div className={styles.galleryDetail}><Image src={project.gallery[1]?.src ?? project.cover.src} alt={project.gallery[1]?.alt ?? project.cover.alt} fill sizes="(max-width: 760px) 100vw, 40vw" /></div>
      </section>
      {project.gallery[2] ? <div className={styles.fullImage}><Image src={project.gallery[2].src} alt={project.gallery[2].alt} fill sizes="100vw" /></div> : null}
      <section className={styles.highlights}>
        <div className={styles.highlightsHeader}><p className="mono" data-reveal>{labels.decisions}</p><h2 className={`${styles.highlightsTitle} display`} data-reveal>{labels.system}</h2></div>
        <div className={styles.highlightGrid}>{project.caseStudy.highlights.map((highlight, index) => <article className={styles.highlight} key={highlight.title} data-reveal><span className="mono">{labels.decisions} 0{index + 1}</span><h3>{highlight.title}</h3><p>{highlight.text}</p></article>)}</div>
        <div className={styles.outcome}><p className="mono" data-reveal>{labels.result}</p><p className="display" data-reveal>{project.caseStudy.outcome}</p></div>
      </section>
      <Link className={styles.next} href={localePath(locale, `/work/${nextProject.slug}`)} data-cursor={locale === "es" ? "SIGUIENTE" : "NEXT"} style={{ "--next-bg": nextProject.palette.background, "--next-fg": nextProject.palette.foreground } as CaseStyle}><span className="mono">{content.next} ↗</span><span className={`${styles.nextName} display`}>{nextProject.name}</span></Link>
    </main>
  );
}
