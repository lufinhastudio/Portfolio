import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { Locale, LocalizedProject, ProjectImage, ResponsiveProjectImage } from "@/types/project";
import { getLocalizedProjects } from "@/content";
import { localePath } from "@/config/site";
import { projectJsonLd } from "@/lib/jsonLd";
import { ProjectBrand } from "@/components/projects/ProjectBrand";
import { ArrowLeft, ArrowUpRight } from "@/components/ui/Icons";
import { ReadingProgress } from "./ReadingProgress";
import styles from "./ProductCaseStudy.module.css";

/* ==========================================================================
   Caso de proyecto
   Se lee de arriba hacia abajo como una historia corta:
   1. Hero: marca, una frase de qué es, etiquetas y link al sitio
   2. Lo que hicimos (servicios en pastillas)
   3. El desafío
   4. Capítulos: número grande + título + puntos con check + capturas
      (varias capturas → carrusel deslizable)
   5. Qué construimos + tecnologías
   6. Invitación: "¿Tu negocio necesita algo así?" + siguiente proyecto
   ========================================================================== */

type Props = { project: LocalizedProject; locale: Locale };

function Check() {
  return (
    <svg viewBox="0 0 16 16" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3.5 8.5l3 3 6-7" />
    </svg>
  );
}

function ResponsiveShot({ media, caption, priority = false, sizes }: { media: ResponsiveProjectImage; caption?: string; priority?: boolean; sizes: string }) {
  const frameStyle = {
    "--desktop-ratio": `${media.desktop.width} / ${media.desktop.height}`,
    "--mobile-ratio": `${media.mobile.width} / ${media.mobile.height}`,
  } as CSSProperties;
  return (
    <figure className={styles.shot}>
      <div className={`${styles.frame} ${styles.responsiveFrame}`} style={frameStyle}>
        <picture>
          <source media="(max-width: 760px)" srcSet={media.mobile.src} />
          <Image src={media.desktop.src} alt={media.caption ?? media.desktop.alt} fill loading={priority ? "eager" : "lazy"} sizes={sizes} />
        </picture>
      </div>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}

function Shot({ image, caption, priority = false, sizes, enlarge }: { image: ProjectImage; caption?: string; priority?: boolean; sizes: string; enlarge: string }) {
  return (
    <figure className={styles.shot}>
      <a className={styles.frame} href={image.src} target="_blank" rel="noreferrer" aria-label={`${enlarge}: ${image.alt}`} style={{ "--ratio": `${image.width} / ${image.height}` } as CSSProperties}>
        <Image src={image.src} alt={image.alt} fill priority={priority} sizes={sizes} />
      </a>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}

export function ProductCaseStudy({ project, locale }: Props) {
  const story = project.productCaseStudy;
  if (!story) return null;

  const projects = getLocalizedProjects(locale).filter((item) => !item.previewOnly);
  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const t = locale === "es"
    ? {
        back: "Proyectos", did: "Lo que hicimos", challenge: "El desafío", visit: "Ver el sitio en vivo",
        enlarge: "Abrir captura en tamaño completo", swipe: "Deslizá para ver más", next: "Siguiente proyecto",
        ctaTitle: "¿Tu negocio necesita algo así?", ctaText: "Contanos qué tenés en mente y lo pensamos juntos. Te respondemos nosotros, sin vueltas.",
        ctaButton: "Contanos tu proyecto", contact: "/contacto", privateProject: "Proyecto privado · sin enlace público",
      }
    : {
        back: "Projects", did: "What we did", challenge: "The challenge", visit: "Visit the live site",
        enlarge: "Open full-size capture", swipe: "Swipe to see more", next: "Next project",
        ctaTitle: "Does your business need something like this?", ctaText: "Tell us what you have in mind and we'll think it through together. You'll hear back from us directly.",
        ctaButton: "Tell us about your project", contact: "/contact", privateProject: "Private project · no public link",
      };

  const style = { "--product-accent": project.palette.accent, "--product-paper": project.palette.background } as CSSProperties;
  const projectLinks = story.links ?? (project.url ? [{ label: t.visit, href: project.url }] : []);
  const tags = project.category.split(" / ");
  const chapterName = (eyebrow: string) => eyebrow.includes("/") ? eyebrow.split("/").pop()?.trim() ?? eyebrow : eyebrow;

  return (
    <main className={styles.page} lang={locale} style={style}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd(project, locale)) }} />
      <ReadingProgress />

      {/* ── 1. Hero ── */}
      <section className={styles.hero}>
        <span className={styles.heroWash} aria-hidden="true" />
        <Link className={`${styles.back} ${styles.rise}`} href={localePath(locale, "/work")}>
          <ArrowLeft size="0.9em" aria-hidden="true" /> {t.back}
        </Link>

        <div className={styles.heading}>
          <div className={styles.rise} style={{ "--d": "0.05s" } as CSSProperties}>
            {project.brandLogo
              ? <><ProjectBrand logo={project.brandLogo} placement="intro" /><h1 className="sr-only">{project.name}</h1></>
              : <h1 className={`${styles.name} display`}>{project.name}</h1>}
          </div>
          <div className={styles.rise} style={{ "--d": "0.15s" } as CSSProperties}>
            <p className={`${styles.statement} display`}>{story.headline ?? story.lead}</p>
            {story.headline ? <p className={styles.lead}>{story.lead}</p> : null}
          </div>
          <ul className={`${styles.tags} ${styles.rise}`} style={{ "--d": "0.25s" } as CSSProperties} aria-label={locale === "es" ? "Rubro y año" : "Industry and year"}>
            {tags.map((tag) => <li key={tag}>{tag}</li>)}
            <li className={styles.tagYear}>{project.year}</li>
          </ul>
          {projectLinks.length ? (
            <div className={`${styles.actions} ${styles.rise}`} style={{ "--d": "0.32s" } as CSSProperties}>
              {projectLinks.map((link, index) => (
                <a className={index === 0 ? styles.primary : styles.secondary} href={link.href} target="_blank" rel="noreferrer" key={link.href}>
                  <span>{link.label}</span>
                  <span className={styles.btnIcon} aria-hidden="true"><ArrowUpRight size=".9rem" /></span>
                </a>
              ))}
            </div>
          ) : null}
        </div>

        {story.heroMedia ? (
          <div className={`${styles.heroMedia} ${styles.riseMedia}`}>
            <ResponsiveShot media={story.heroMedia} priority sizes="(max-width: 760px) calc(100vw - 2 * var(--page-gutter)), 92vw" />
          </div>
        ) : story.heroImage ? (
          <div className={`${styles.heroMedia} ${styles.riseMedia}`}>
            <Shot image={story.heroImage} priority sizes="(max-width: 760px) 100vw, 92vw" enlarge={t.enlarge} />
          </div>
        ) : null}
      </section>

      {/* ── 2. Lo que hicimos ── */}
      <section className={styles.did} aria-labelledby="case-did" data-reveal-group>
        <p className={`${styles.label} mono`} id="case-did" data-reveal-item>{t.did}</p>
        <div>
          <ul className={styles.services} data-reveal-item>
            {project.services.map((service) => <li key={service}><span className={styles.check}><Check /></span>{service}</li>)}
          </ul>
          <p className={styles.role} data-reveal-item>{story.role}</p>
        </div>
      </section>

      {/* ── 3. El desafío ── */}
      <section className={styles.challenge} aria-labelledby="case-challenge" data-reveal-group>
        <p className={`${styles.label} mono`} data-reveal-item>{t.challenge}</p>
        <div>
          <h2 className="display" id="case-challenge" data-reveal-item>{story.challengeTitle}</h2>
          <p data-reveal-item>{story.challenge}</p>
        </div>
      </section>

      {/* ── 4. Capítulos ── */}
      <div className={styles.chapters}>
        {story.sections.map((section, index) => {
          const number = String(index + 1).padStart(2, "0");
          const images = section.images ?? (section.image ? [section.image] : []);
          const responsive = section.responsiveImages ?? [];
          const count = responsive.length || images.length;
          const isCarousel = count > 2;
          const mediaClass = `${styles.media} ${count === 2 ? styles.mediaPair : ""} ${isCarousel ? styles.carousel : ""}`;
          const sizes = count > 1 ? "(max-width: 760px) 86vw, 46vw" : "(max-width: 760px) calc(100vw - 2 * var(--page-gutter)), 80vw";
          return (
            <section className={styles.chapter} id={`seccion-${index + 1}`} key={`${section.eyebrow}-${section.title}`} aria-labelledby={`chapter-${index + 1}`}>
              <div className={styles.chapterCopy} data-reveal-group>
                <div className={styles.chapterHead} data-reveal-item>
                  <span className={`${styles.chapterNumber} display`} aria-hidden="true">{number}</span>
                  <span className={styles.chapterName}>{chapterName(section.eyebrow)}</span>
                </div>
                <h2 className="display" id={`chapter-${index + 1}`} data-reveal-item>{section.title}</h2>
                <p className={styles.chapterText} data-reveal-item>{section.text}</p>
                {section.points?.length ? (
                  <ul className={styles.points} data-reveal-item>
                    {section.points.map((point) => <li key={point}><span className={styles.check}><Check /></span>{point}</li>)}
                  </ul>
                ) : null}
              </div>

              {count ? (
                <div className={styles.mediaWrap} data-reveal>
                  <div className={mediaClass} tabIndex={isCarousel ? 0 : undefined} aria-label={isCarousel ? `${section.title} — ${t.swipe}` : undefined}>
                    {responsive.length
                      ? responsive.map((media) => <ResponsiveShot media={media} caption={media.caption} sizes={sizes} key={`${media.desktop.src}-${media.mobile.src}`} />)
                      : images.map((image) => <Shot image={image} caption={count === 1 && section.caption ? section.caption : image.alt} sizes={sizes} enlarge={t.enlarge} key={image.src} />)}
                  </div>
                  {count > 1 ? <p className={`${styles.swipe} ${!isCarousel ? styles.swipeMobile : ""} mono`} aria-hidden="true">{t.swipe} <span>→</span></p> : null}
                </div>
              ) : null}
            </section>
          );
        })}
      </div>

      {/* ── 5. Qué construimos ── */}
      <section className={styles.scope} aria-labelledby="case-scope">
        <div className={styles.scopeHeader} data-reveal-group>
          <p className={`${styles.label} mono`} data-reveal-item>{story.modulesLabel}</p>
          <h2 className="display" id="case-scope" data-reveal-item>{story.closing}</h2>
        </div>
        <ul className={styles.modules} data-reveal-group>
          {story.modules.map((module) => <li key={module} data-reveal-item><span className={styles.check}><Check /></span>{module}</li>)}
        </ul>
        <div className={styles.tech} data-reveal>
          <p className="mono">{story.technologyLabel}</p>
          <ul>{story.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>
        </div>
        {!projectLinks.length ? <p className={styles.private}>{t.privateProject}</p> : null}
      </section>

      {/* ── 6. Invitación + siguiente ── */}
      <section className={styles.invite} aria-labelledby="case-invite">
        <div className={styles.inviteCard} data-reveal>
          <h2 className="display" id="case-invite">{t.ctaTitle}</h2>
          <p>{t.ctaText}</p>
          <div className={styles.actions}>
            <Link className={styles.primary} href={localePath(locale, story.cta?.href ?? t.contact)}>
              <span>{story.cta?.label ?? t.ctaButton}</span>
              <span className={styles.btnIcon} aria-hidden="true"><ArrowUpRight size=".9rem" /></span>
            </Link>
            {projectLinks[0] ? (
              <a className={styles.secondary} href={projectLinks[0].href} target="_blank" rel="noreferrer">
                <span>{projectLinks[0].label}</span>
                <span className={styles.btnIcon} aria-hidden="true"><ArrowUpRight size=".9rem" /></span>
              </a>
            ) : null}
          </div>
        </div>
        <Link className={styles.next} href={localePath(locale, `/work/${nextProject.slug}`)} style={{ "--next-accent": nextProject.palette.accent, "--next-bg": nextProject.palette.background } as CSSProperties}>
          <span className={styles.nextThumb} aria-hidden="true">
            <Image src={nextProject.cover.src} alt="" fill sizes="(max-width: 760px) 30vw, 12rem" style={{ objectPosition: nextProject.cover.position ?? "center" }} />
          </span>
          <span className={styles.nextText}>
            <span className="mono">{t.next}</span>
            <span className="display">{nextProject.name}</span>
          </span>
          <span className={styles.btnIcon} aria-hidden="true"><ArrowUpRight size=".9rem" /></span>
        </Link>
      </section>
    </main>
  );
}
