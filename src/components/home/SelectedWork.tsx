"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, MouseEvent, PointerEvent, KeyboardEvent } from "react";
import type { Locale, LocalizedProject } from "@/types/project";
import { localePath } from "@/config/site";
import { getStudioContent } from "@/content";
import styles from "./SelectedWork.module.css";

type PaletteStyle = CSSProperties & {
  "--project-bg": string;
  "--project-accent": string;
};

export function SelectedWork({ projects, locale }: { projects: LocalizedProject[]; locale: Locale }) {
  const content = getStudioContent(locale);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(projects.length > 1);

  const isPointerDown = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);
  const hasMoved = useRef(false);

  // Update active slide and boundary states
  const updateScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const scrollLeft = track.scrollLeft;
    const maxScroll = track.scrollWidth - track.clientWidth;
    setCanScrollPrev(scrollLeft > 15);
    setCanScrollNext(scrollLeft < maxScroll - 15);

    const children = Array.from(track.children) as HTMLElement[];
    let closestIndex = 0;
    let minDiff = Infinity;
    const trackLeft = track.getBoundingClientRect().left;

    children.forEach((child, index) => {
      const childLeft = child.getBoundingClientRect().left;
      const diff = Math.abs(childLeft - trackLeft);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    updateScrollState();
    const onScroll = () => {
      requestAnimationFrame(updateScrollState);
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [updateScrollState]);

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const target = track.children[index] as HTMLElement | undefined;
    if (!target) return;

    const trackLeft = track.getBoundingClientRect().left;
    const targetLeft = target.getBoundingClientRect().left;
    const offset = targetLeft - trackLeft;

    track.scrollBy({ left: offset, behavior: "smooth" });
  }, []);

  const handlePrev = () => {
    if (activeIndex > 0) {
      scrollToIndex(activeIndex - 1);
    }
  };

  const handleNext = () => {
    if (activeIndex < projects.length - 1) {
      scrollToIndex(activeIndex + 1);
    }
  };

  // Drag to scroll
  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    const track = trackRef.current;
    if (!track) return;

    isPointerDown.current = true;
    startX.current = e.clientX;
    scrollStart.current = track.scrollLeft;
    hasMoved.current = false;
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!isPointerDown.current) return;
    const track = trackRef.current;
    if (!track) return;

    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > 6) {
      hasMoved.current = true;
      track.classList.add(styles.isDragging);
    }
    track.scrollLeft = scrollStart.current - dx;
  };

  const handlePointerUp = () => {
    isPointerDown.current = false;
    trackRef.current?.classList.remove(styles.isDragging);
  };

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (hasMoved.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNext();
    }
  };

  return (
    <section className={styles.section} id="selected-work" aria-labelledby="selected-work-title">
      <header className={styles.intro}>
        <div className={styles.introMeta}>
          <p className={`${styles.eyebrow} mono`}>{content.work.eyebrow}</p>
          <div className={styles.heading}>
            <h2 className={`${styles.title} display`} id="selected-work-title">{content.common.selectedWork}</h2>
            <p className={styles.subtitle}>{content.work.title}</p>
          </div>
        </div>

        <div className={styles.controls} aria-label={locale === "es" ? "Navegación del carrusel" : "Carousel navigation"}>
          <span className={`${styles.counter} mono`} aria-live="polite">
            <strong>{String(activeIndex + 1).padStart(2, "0")}</strong> / {String(projects.length).padStart(2, "0")}
          </span>
          <div className={styles.navButtons}>
            <button
              type="button"
              className={styles.navButton}
              onClick={handlePrev}
              disabled={!canScrollPrev}
              aria-label={locale === "es" ? "Proyecto anterior" : "Previous project"}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              className={styles.navButton}
              onClick={handleNext}
              disabled={!canScrollNext}
              aria-label={locale === "es" ? "Proyecto siguiente" : "Next project"}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div
        className={styles.carouselContainer}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label={content.common.selectedWork}
      >
        <div
          className={styles.track}
          ref={trackRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {projects.map((project, index) => {
            const isActive = index === activeIndex;
            return (
              <article
                className={`${styles.project} ${isActive ? styles.projectActive : ""}`}
                key={project.slug}
                role="group"
                aria-roledescription="slide"
                aria-label={`${project.name} (${project.index} / ${String(projects.length).padStart(2, "0")})`}
                style={{
                  "--project-bg": project.palette.background,
                  "--project-accent": project.palette.accent,
                } as PaletteStyle}
              >
                <Link
                  className={styles.projectLink}
                  href={localePath(locale, `/work/${project.slug}`)}
                  onClick={handleLinkClick}
                  aria-label={`${content.work.open}: ${project.client}`}
                  data-cursor={locale === "es" ? "VER" : "VIEW"}
                >
                  <span className={styles.visual} aria-hidden="true">
                    <Image
                      src={project.cover.src}
                      alt=""
                      fill
                      sizes="(max-width: 760px) 90vw, (max-width: 1200px) 60vw, 760px"
                      style={{ objectPosition: project.cover.position ?? "center" }}
                      priority={index === 0}
                    />
                  </span>
                  <div className={styles.topBar}>
                    <span className={`${styles.badge} mono`}>
                      {project.index} / {String(projects.length).padStart(2, "0")}
                    </span>
                    <span className={`${styles.year} mono`}>{project.year}</span>
                  </div>
                  <div className={styles.cardContent}>
                    <span className={`${styles.category} mono`}>{project.category}</span>
                    <h3 className={`${styles.name} display`}>{project.name}</h3>
                    <p className={styles.description}>{project.description}</p>
                    <span className={`${styles.caseLabel} mono`}>
                      {content.work.open} <span aria-hidden="true">↗</span>
                    </span>
                  </div>
                </Link>
                <a
                  className={styles.visit}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${content.work.visit}: ${project.client}`}
                  title={`${content.work.visit}: ${project.client}`}
                >
                  ↗
                </a>
              </article>
            );
          })}
        </div>
      </div>

      <footer className={styles.footer}>
        <div className={styles.pagination} role="tablist" aria-label={locale === "es" ? "Proyectos" : "Projects"}>
          {projects.map((project, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                type="button"
                key={project.slug}
                role="tab"
                aria-selected={isActive}
                className={`${styles.tab} ${isActive ? styles.tabActive : ""}`}
                onClick={() => scrollToIndex(index)}
                aria-label={`${project.index}: ${project.name}`}
              >
                <span className={`${styles.tabIndex} mono`}>{project.index}</span>
                <span className={styles.tabName}>{project.name}</span>
                <span className={styles.tabProgress} aria-hidden="true" />
              </button>
            );
          })}
        </div>

        <Link className={`${styles.allProjectsLink} mono`} href={localePath(locale, "/work")}>
          {content.common.allProjects} <span aria-hidden="true">↗</span>
        </Link>
      </footer>
    </section>
  );
}
