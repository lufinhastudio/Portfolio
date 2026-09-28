import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/types/project";
import { getLocalizedProjects, getStudioContent } from "@/content";
import { localePath, siteConfig } from "@/config/site";
import { ArrowUpRight } from "@/components/ui/Icons";
import { ProjectBrand } from "@/components/projects/ProjectBrand";
import { Aura } from "@/components/ui/Aura";
import styles from "./WorkIndex.module.css";

export function WorkIndex({ locale }: { locale: Locale }) {
  const projects = getLocalizedProjects(locale);
  const content = getStudioContent(locale);
  const itemListJsonLd = {
    "@context": "https://schema.org", "@type": "ItemList",
    itemListElement: projects.map((project, index) => ({ "@type": "ListItem", position: index + 1, name: project.client, ...(!project.previewOnly ? { url: new URL(localePath(locale, `/work/${project.slug}`), siteConfig.url).toString() } : {}) })),
  };
  return (
    <main className={styles.page} lang={locale}>
      <Aura variant="corner" intensity="soft" position="top-right" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <header className={styles.hero}>
        <p className="mono">{content.work.eyebrow}</p>
        <h1 className={`${styles.title} display`}>{locale === "es" ? "Trabajo." : "Work."}</h1>
        <div className={styles.heroFoot}><p>{locale === "es" ? "Una selección de páginas, tiendas y sistemas que diseñamos y desarrollamos." : "A selection of websites, stores and systems we designed and built."}</p><span className="mono">{String(projects.length).padStart(2, "0")} {content.work.count}</span></div>
      </header>
      <section className={styles.list} aria-label={content.common.selectedWork}>
        {projects.map((project, index) => {
          const cover = <>
              <Image src={project.cover.src} alt={project.cover.alt} fill sizes="(max-width: 760px) 100vw, 56vw" priority={index < 2} style={{ objectPosition: project.cover.position ?? "center" }} />
              <span className={`${styles.imageIndex} mono`}>{project.index} / {String(projects.length).padStart(2, "0")}</span>
              <ProjectBrand logo={project.brandLogo} placement="cover" />
            </>;
          return <article className={`${styles.item} ${project.previewOnly ? styles.previewItem : ""}`} key={project.slug}>
            {project.previewOnly
              ? <div className={`${styles.visual} ${styles.visualPreview}`}>{cover}</div>
              : <Link className={styles.visual} href={localePath(locale, `/work/${project.slug}`)} aria-label={`${content.work.open}: ${project.client}`}>{cover}<span className={styles.viewProject}>{content.work.open}<ArrowUpRight size=".9em" aria-hidden="true" /></span></Link>}
            <div className={styles.info}>
              <p className="mono">{project.category} · {project.year}</p>
              {project.previewOnly
                ? <div className={`${styles.projectName} ${styles.projectNamePreview}`}><h2 className="display">{project.name}</h2></div>
                : <Link className={styles.projectName} href={localePath(locale, `/work/${project.slug}`)}><h2 className="display">{project.name}</h2><ArrowUpRight size="1.05rem" aria-hidden="true" /></Link>}
              <p className={styles.description}>{project.description}</p>
            </div>
          </article>;
        })}
      </section>
    </main>
  );
}
