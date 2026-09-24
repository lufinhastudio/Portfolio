import Link from "next/link";
import type { CSSProperties } from "react";
import type { Locale } from "@/types/project";
import { getLocalizedProjects, getStudioContent } from "@/content";
import { localePath, siteConfig } from "@/config/site";
import { ArrowUpRight } from "@/components/ui/Icons";
import styles from "./WorkIndex.module.css";

type RowStyle = CSSProperties & { "--row-bg": string; "--row-fg": string };

export function WorkIndex({ locale }: { locale: Locale }) {
  const projects = getLocalizedProjects(locale);
  const content = getStudioContent(locale);
  const itemListJsonLd = {
    "@context": "https://schema.org", "@type": "ItemList",
    itemListElement: projects.map((project, index) => ({ "@type": "ListItem", position: index + 1, name: project.client, url: new URL(localePath(locale, `/work/${project.slug}`), siteConfig.url).toString() })),
  };
  return (
    <main className={styles.page} lang={locale}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <section className={styles.hero}><p className="mono" data-reveal>{content.work.eyebrow}</p><h1 className={`${styles.title} display`} data-reveal>{content.common.selectedWork}</h1></section>
      <section className={styles.list} aria-label={content.common.selectedWork}>
        {projects.map((project) => (
          <Link className={styles.item} href={localePath(locale, `/work/${project.slug}`)} key={project.slug} data-cursor={locale === "es" ? "VER" : "VIEW"} style={{ "--row-bg": project.palette.background, "--row-fg": project.palette.foreground } as RowStyle}>
            <span className="mono">{project.index}</span><span className={styles.name}>{project.name}</span><span className={`${styles.category} mono`}>{project.category}<br />{project.year}</span><span className={styles.arrow} aria-hidden="true"><ArrowUpRight size="1.2em" /></span>
          </Link>
        ))}
      </section>
    </main>
  );
}
