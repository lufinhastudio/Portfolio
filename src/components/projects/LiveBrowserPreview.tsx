"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ProjectImage } from "@/types/project";
import styles from "./LiveBrowserPreview.module.css";

type LiveBrowserPreviewProps = {
  url: string;
  title: string;
  fallback: ProjectImage;
  label: string;
  priority?: boolean;
};

export function LiveBrowserPreview({ url, title, fallback, label, priority = false }: LiveBrowserPreviewProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [mountLive, setMountLive] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 900px) and (hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!desktop.matches || reduced.matches || !rootRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setMountLive(true),
      { rootMargin: "30%" },
    );
    observer.observe(rootRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.browser} ref={rootRef}>
      <div className={styles.chrome} aria-hidden="true">
        <span className={styles.dot} /><span className={styles.dot} /><span className={styles.dot} />
        <span className={styles.address}>{label}</span>
        <span className={styles.live}><i /> LIVE</span>
      </div>
      <div className={styles.viewport}>
        <Image
          className={`${styles.fallback} ${loaded ? styles.hidden : ""}`}
          src={fallback.src}
          alt={fallback.alt}
          fill
          priority={priority}
          sizes="(max-width: 899px) 92vw, 68vw"
          style={{ objectPosition: fallback.position ?? "center" }}
        />
        {mountLive ? (
          <iframe
            className={`${styles.frame} ${loaded ? styles.ready : ""}`}
            src={url}
            title={`${title} — live website preview`}
            loading="lazy"
            tabIndex={-1}
            aria-hidden="true"
            onLoad={() => setLoaded(true)}
            sandbox="allow-forms allow-popups allow-same-origin allow-scripts"
          />
        ) : null}
      </div>
    </div>
  );
}
