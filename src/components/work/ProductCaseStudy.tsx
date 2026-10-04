import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { Locale, LocalizedProject, ResponsiveProjectImage } from "@/types/project";
import { getLocalizedProjects } from "@/content";
import { localePath } from "@/config/site";
import { projectJsonLd } from "@/lib/jsonLd";
import { ProjectBrand } from "@/components/projects/ProjectBrand";
import { ArrowLeft, ArrowUpRight } from "@/components/ui/Icons";
import { ReadingProgress } from "./ReadingProgress";
import styles from "./ProductCaseStudy.module.css";

type ProductCaseStudyProps = {
  project: LocalizedProject;
  locale: Locale;
};

type ResponsiveFigureProps = {
  media: ResponsiveProjectImage;
  caption: string;
  index?: string;
  priority?: boolean;
  sizes: string;
};

function ResponsiveFigure({ media, caption, index, priority = false, sizes }: ResponsiveFigureProps) {
  const frameStyle = {
    "--desktop-ratio": `${media.desktop.width} / ${media.desktop.height}`,
    "--mobile-ratio": `${media.mobile.width} / ${media.mobile.height}`,
  } as CSSProperties;

  return (
    <figure className={`${styles.responsiveFigure} ${styles.figure} ${media.treatment === "supporting" ? styles.supportingFigure : ""}`} data-reveal-item>
      <div className={styles.responsiveFrame} style={frameStyle}>
        <picture>
          <source media="(max-width: 760px)" srcSet={media.mobile.src} />
          <Image
            src={media.desktop.src}
            alt={media.caption ?? media.desktop.alt}
            fill
            loading={priority ? "eager" : "lazy"}
            sizes={sizes}
          />
        </picture>
      </div>
      <figcaption>
        {index ? <span className="mono">{index}</span> : null}
        <span>{caption}</span>
      </figcaption>
    </figure>
  );
}

export function ProductCaseStudy({ project, locale }: ProductCaseStudyProps) {
  const story = project.productCaseStudy;
  if (!story) return null;

  const projects = getLocalizedProjects(locale).filter((item) => !item.previewOnly);
  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const labels = locale === "es"
    ? {
        back: "Volver a proyectos",
        challenge: "El desafío",
        index: "En este proyecto",
        role: "Nuestro rol",
        year: "Año",
        details: "Detalles del proyecto",
        close: "Qué construimos",
        visit: "Ver sitio",
        next: "Siguiente proyecto",
        enlarge: "Abrir captura en tamaño completo",
        imageLabel: "Captura real del producto",
        services: "Qué hicimos",
        type: "Qué es",
        summary: "El proyecto en breve",
      }
    : {
        back: "Back to projects",
        challenge: "The challenge",
        index: "In this project",
        role: "Our role",
        year: "Year",
        details: "Project details",
        close: "What we built",
        visit: "Visit website",
        next: "Next project",
        enlarge: "Open full-size capture",
        imageLabel: "Real product capture",
        services: "What we did",
        type: "What it is",
        summary: "The project at a glance",
      };
  const style = {
    "--product-accent": project.palette.accent,
    "--product-paper": project.palette.background,
  } as CSSProperties;
  const projectLinks = story.links ?? (project.url ? [{ label: labels.visit, href: project.url }] : []);
  const hasBrandLogo = Boolean(project.brandLogo);
  const projectMetadata = (
    <dl className={styles.metadata}>
      <div><dt className="mono">{labels.type}</dt><dd>{project.category.split(" / ").join(" · ")}</dd></div>
      <div><dt className="mono">{labels.services}</dt><dd>{project.services.join(" · ")}</dd></div>
      <div><dt className="mono">{labels.role}</dt><dd>{story.role}</dd></div>
      <div><dt className="mono">{labels.year}</dt><dd>{project.year}</dd></div>
      <div><dt className="mono">{story.technologyLabel}</dt><dd>{story.technologies.slice(0, 4).join(" · ")}</dd></div>
    </dl>
  );

  return (
    <main className={`${styles.page} ${story.presentation === "product-led" ? styles.productLed : ""}`} lang={locale} style={style}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd(project, locale)) }} />
      <ReadingProgress />

      {/* ── Hero: marca, título, resumen y datos clave ── */}
      <section className={styles.hero}>
        <span className={styles.heroWash} aria-hidden="true" />
        <nav className={styles.top} aria-label={locale === "es" ? "Navegación del proyecto" : "Project navigation"}>
          <Link href={localePath(locale, "/work")}><ArrowLeft size="0.9em" aria-hidden="true" /> {labels.back}</Link>
          <span className="mono">{project.category}</span>
        </nav>
        <div className={styles.heading}>
          <div className={styles.headingMain}>
            <div className={styles.rise} style={{ "--d": "0.05s" } as CSSProperties}><ProjectBrand logo={project.brandLogo} placement="intro" /></div>
            <p className={`${styles.eyebrow} ${styles.rise} mono`} style={{ "--d": "0.1s" } as CSSProperties}>{project.index} / {project.year} <span aria-hidden="true">·</span> {project.category}</p>
            <h1 className={hasBrandLogo ? "sr-only" : `${styles.title} ${styles.rise} display`} style={{ "--d": "0.15s" } as CSSProperties}>{project.name}</h1>
            <p className={`${styles.lead} ${styles.rise}`} style={{ "--d": "0.25s" } as CSSProperties}>{story.lead}</p>
          </div>
          <div className={`${styles.desktopMetadata} ${styles.rise}`} style={{ "--d": "0.4s" } as CSSProperties}>
            <p className={`${styles.summaryLabel} mono`}>{labels.summary}</p>
            {projectMetadata}
          </div>
          {projectLinks.length ? (
            <div className={`${styles.visitLinks} ${styles.rise}`} style={{ "--d": "0.5s" } as CSSProperties}>
              {projectLinks.map((link) => <a className={styles.visit} href={link.href} target="_blank" rel="noreferrer" key={link.href}>{link.label}<ArrowUpRight size=".9em" aria-hidden="true" /></a>)}
            </div>
          ) : null}
        </div>
        {story.heroMedia ? (
          <div className={`${styles.heroImage} ${styles.riseMedia}`}>
            <ResponsiveFigure media={story.heroMedia} caption={story.heroMedia.caption ?? story.heroMedia.desktop.alt} priority sizes="(max-width: 760px) calc(100vw - 2 * var(--page-gutter)), 92vw" />
          </div>
        ) : story.heroImage ? (
          <figure className={`${styles.heroImage} ${styles.figure} ${styles.riseMedia}`}>
            <a href={story.heroImage.src} target="_blank" rel="noreferrer" aria-label={`${labels.enlarge}: ${story.heroImage.alt}`}>
              <Image src={story.heroImage.src} alt={story.heroImage.alt} fill priority sizes="(max-width: 760px) 100vw, 92vw" />
            </a>
            <figcaption><span className="mono">{labels.imageLabel}</span><span>{story.heroImage.alt}</span></figcaption>
          </figure>
        ) : null}
        <details className={styles.mobileDetails}>
          <summary>{labels.details}<span aria-hidden="true">+</span></summary>
          {projectMetadata}
        </details>
      </section>

      {/* ── Índice: de un vistazo, qué partes tiene el proyecto ── */}
      <nav className={styles.toc} aria-label={labels.index} data-reveal-group>
        <p className={`${styles.tocLabel} mono`} data-reveal-item>{labels.index}</p>
        <ol>
          {story.sections.map((section, index) => (
            <li key={`toc-${section.title}`} data-reveal-item>
              <a href={`#seccion-${index + 1}`}>
                <span className="mono">{String(index + 1).padStart(2, "0")}</span>
                <span>{section.eyebrow.includes("/") ? section.eyebrow.split("/").pop()?.trim() : section.eyebrow}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* ── El desafío ── */}
      <section className={styles.challenge} aria-labelledby="product-challenge-title" data-reveal-group>
        <p className={`${styles.sectionLabel} mono`} data-reveal-item>{labels.challenge}</p>
        <div>
          <h2 className="display" id="product-challenge-title" data-reveal-item>{story.challengeTitle}</h2>
          <p data-reveal-item>{story.challenge}</p>
        </div>
      </section>

      <div className={styles.sections} aria-label={labels.index}>
        {story.sections.map((section, index) => {
          const media = section.images ?? (section.image ? [section.image] : []);
          const responsiveMedia = section.responsiveImages ?? [];
          const hasMedia = media.length > 0 || responsiveMedia.length > 0;
          const hasSupportingMedia = responsiveMedia.some((item) => item.treatment === "supporting");
          return (
          <section id={`seccion-${index + 1}`} className={`${styles.module} ${section.layout === "wide" ? styles.wide : ""} ${!story.heroImage && !story.heroMedia && !hasMedia ? styles.textOnly : ""}`} key={`${section.eyebrow}-${section.title}`}>
            <div className={styles.moduleCopy} data-reveal-group>
              <p className={`${styles.sectionLabel} mono`} data-reveal-item>{section.eyebrow}</p>
              <h2 className="display" data-reveal-item>{section.title}</h2>
              <p className={styles.moduleText} data-reveal-item>{section.text}</p>
              {section.points?.length ? <ul className={styles.points} data-reveal-item>{section.points.map((point) => <li key={point}>{point}</li>)}</ul> : null}
            </div>
            {responsiveMedia.length ? (
              <div className={`${styles.moduleMedia} ${responsiveMedia.length > 1 ? styles.moduleMediaGrid : ""} ${hasSupportingMedia ? styles.editorialGrid : ""}`} data-reveal-group>
                {responsiveMedia.map((responsiveImage, mediaIndex) => (
                  <ResponsiveFigure
                    media={responsiveImage}
                    caption={responsiveMedia.length === 1 && section.caption ? section.caption : responsiveImage.caption ?? responsiveImage.desktop.alt}
                    index={`${String(index + 1).padStart(2, "0")}.${mediaIndex + 1}`}
                    sizes={responsiveMedia.length > 1 ? "(max-width: 760px) calc(100vw - 2 * var(--page-gutter)), 44vw" : "(max-width: 760px) calc(100vw - 2 * var(--page-gutter)), 60vw"}
                    key={`${responsiveImage.desktop.src}-${responsiveImage.mobile.src}`}
                  />
                ))}
              </div>
            ) : media.length ? (
              <div className={`${styles.moduleMedia} ${media.length > 1 ? styles.moduleMediaGrid : ""}`} data-reveal-group>
                {media.map((image, mediaIndex) => (
                  <figure className={`${styles.moduleImage} ${styles.figure}`} key={image.src} data-reveal-item>
                    <a href={image.src} target="_blank" rel="noreferrer" aria-label={`${labels.enlarge}: ${image.alt}`}>
                      <Image src={image.src} alt={image.alt} fill sizes={media.length > 1 ? "(max-width: 760px) 100vw, 45vw" : "(max-width: 760px) 100vw, 60vw"} />
                    </a>
                    <figcaption><span className="mono">{String(index + 1).padStart(2, "0")}.{mediaIndex + 1}</span><span>{media.length === 1 && section.caption ? section.caption : image.alt}</span></figcaption>
                  </figure>
                ))}
              </div>
            ) : story.heroImage || story.heroMedia ? (
              <div className={styles.moduleIndex} aria-hidden="true"><span className="mono">{String(index + 1).padStart(2, "0")}</span><span>{project.name}</span></div>
            ) : null}
          </section>
        )})}
      </div>

      {/* ── Cierre: qué construimos + tecnologías ── */}
      <section className={styles.scope} aria-labelledby="product-scope-title">
        <div className={styles.scopeHeader} data-reveal-group>
          <p className={`${styles.sectionLabel} mono`} data-reveal-item>{labels.close}</p>
          <h2 className="display" id="product-scope-title" data-reveal-item>{story.closing}</h2>
        </div>
        <div className={styles.scopeLists} data-reveal>
          <div>
            <h3 className="mono">{story.modulesLabel}</h3>
            <ul className={styles.moduleList}>{story.modules.map((module, moduleIndex) => <li key={module}><span className="mono">{String(moduleIndex + 1).padStart(2, "0")}</span>{module}</li>)}</ul>
          </div>
          <div>
            <h3 className="mono">{story.technologyLabel}</h3>
            <ul className={styles.techList}>{story.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>
          </div>
        </div>
        <div className={styles.scopeFoot}>
          {projectLinks.length || story.cta ? (
            <div className={styles.visitLinks}>
              {projectLinks.map((link) => <a className={styles.visit} href={link.href} target="_blank" rel="noreferrer" key={link.href}>{link.label}<ArrowUpRight size=".9em" aria-hidden="true" /></a>)}
              {story.cta ? <Link className={styles.visit} href={localePath(locale, story.cta.href)}>{story.cta.label}<ArrowUpRight size=".9em" aria-hidden="true" /></Link> : null}
            </div>
          ) : <span className={styles.privateProject}>{locale === "es" ? "Proyecto privado · sin enlace público" : "Private project · no public link"}</span>}
          <Link href={localePath(locale, `/work/${nextProject.slug}`)} className={styles.next} style={{ "--next-accent": nextProject.palette.accent } as CSSProperties}><span className="mono">{labels.next}</span><span className="display">{nextProject.name}<ArrowUpRight size=".7em" aria-hidden="true" /></span></Link>
        </div>
      </section>
    </main>
  );
}
