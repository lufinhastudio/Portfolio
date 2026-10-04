"use client";

import { useEffect, useRef } from "react";
import type { Locale } from "@/types/project";
import styles from "@/app/studio/studio.module.css";

const capabilities = {
  es: ["Diseño UX/UI", "Desarrollo web", "Tiendas online", "Sistemas a medida", "Producto digital", "Criterio"],
  en: ["UX/UI design", "Web development", "Online stores", "Custom systems", "Digital products", "Judgement"],
} as const;

/* ==========================================================================
   Ticker de capacidades
   --------------------------------------------------------------------------
   La cinta corre con una animación CSS (transform). Al scrollear, la velocidad
   se acelera según la velocidad del scroll y vuelve suave a su ritmo base:
   se ajusta playbackRate de la animación, sin recalcular layout.
   ========================================================================== */
export function CapabilitiesTicker({ locale }: { locale: Locale }) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const animation = track.getAnimations()[0];
    if (!animation) return;

    let lastY = window.scrollY;
    let lastTime = performance.now();
    let rate = 1;
    let target = 1;
    let frame = 0;

    const onScroll = () => {
      const now = performance.now();
      const velocity = Math.abs(window.scrollY - lastY) / Math.max(now - lastTime, 1); // px/ms
      lastY = window.scrollY;
      lastTime = now;
      target = Math.min(1 + velocity * 6, 6);
    };

    let running = false;
    const tick = () => {
      if (!running) return;
      rate += (target - rate) * 0.08;
      target += (1 - target) * 0.05; // vuelve sola al ritmo base
      animation.playbackRate = rate;
      frame = requestAnimationFrame(tick);
    };

    // El loop sólo corre mientras la cinta está en pantalla
    const observer = new IntersectionObserver(([entry]) => {
      running = entry.isIntersecting;
      cancelAnimationFrame(frame);
      if (running) frame = requestAnimationFrame(tick);
    });
    observer.observe(track);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      running = false;
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className={styles.ticker} data-studio-ticker role="group" aria-label={locale === "es" ? "Capacidades de Lufinha Studio" : "Lufinha Studio capabilities"}>
      <div className={styles.tickerTrack} ref={trackRef}>
        {[0, 1].map((copy) => (
          <div className={styles.tickerGroup} key={copy} aria-hidden={copy === 1 ? "true" : undefined}>
            {capabilities[locale].map((capability) => <span className={styles.tickerItem} key={capability}>{capability}</span>)}
          </div>
        ))}
      </div>
    </div>
  );
}
