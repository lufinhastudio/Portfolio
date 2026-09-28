import Image from "next/image";
import Link from "next/link";
import type { Locale, LocalizedProject } from "@/types/project";
import { localePath } from "@/config/site";
import { getStudioContent } from "@/content";
import { ArrowUpRight } from "@/components/ui/Icons";
import { ProjectBrand } from "@/components/projects/ProjectBrand";
import { Aura } from "@/components/ui/Aura";
import styles from "./SelectedWork.module.css";

const maymaHomeImage = {
  src: "/work/mayma/home-banner-2.jpg",
  alt: "Bikini rayado de Mayma Bikinis sobre el agua",
  width: 1916,
  height: 821,
  position: "center",
};

export function SelectedWork({ projects, locale }: { projects: LocalizedProject[]; locale: Locale }) {
  const content = getStudioContent(locale);
  const featured = projects.filter((project) => project.featured).slice(0, 4);
  return (
    <section className={styles.section} id="selected-work" aria-labelledby="selected-work-title">
      <Aura variant="corner" intensity="soft" position="top-right" />
      <header className={styles.header}>
        <div>
          <p className="mono">{content.work.eyebrow}</p>
          <h2 className={`${styles.title} display`} id="selected-work-title">{content.work.title}</h2>
          <p className={styles.supportingCopy}>{locale === "es" ? "Diseñamos cada proyecto según la marca, el negocio y lo que realmente necesita resolver." : "We shape every project around the brand, the business and what it really needs to solve."}</p>
        </div>
      </header>
      <div className={styles.grid}>
        {featured.map((project, index) => {
          const homeImage = project.slug === "mayma-bikinis" ? maymaHomeImage : project.cover;
          const card = <>
            <span className={styles.image}>
              <Image src={homeImage.src} alt={homeImage.alt || `${project.name} — ${project.category}`} fill sizes="(max-width: 760px) 100vw, 46vw" style={{ objectPosition: homeImage.position ?? "center" }} priority={index < 2} />
              <ProjectBrand logo={project.brandLogo} placement="cover" />
              {!project.previewOnly ? <span className={styles.viewProject}>{content.work.open}<ArrowUpRight size=".9em" aria-hidden="true" /></span> : null}
            </span>
            <span className={styles.meta}>
              <span className="mono">{project.category} · {project.year}</span>
              <span className={styles.nameLine}><span className={`${styles.name} display`}>{project.name}</span>{!project.previewOnly ? <ArrowUpRight className={styles.arrow} size="1.1rem" aria-hidden="true" /> : null}</span>
            </span>
          </>;
          return (
            <article className={styles.project} key={project.slug}>
              {project.previewOnly
                ? <div className={`${styles.projectLink} ${styles.previewOnly}`}>{card}</div>
                : <Link className={styles.projectLink} href={localePath(locale, `/work/${project.slug}`)} aria-label={`${content.work.open}: ${project.client}`}>{card}</Link>}
            </article>
          );
        })}
      </div>
      <Link className={styles.moreLink} href={localePath(locale, "/work")}>{locale === "es" ? "Ver más" : "View more"}<ArrowUpRight size="1em" aria-hidden="true" /></Link>
    </section>
  );
}
