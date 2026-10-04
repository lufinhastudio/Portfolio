"use client";

import { useEffect, useRef } from "react";
import styles from "./ProcessSteps.module.css";

type Step = { title: string; text: string };

/* Línea de tiempo atada al scroll: cada paso tiene su propio progreso (--p, 0→1).
   Los pasos que comparten fila (desktop) se completan en orden, de izquierda a
   derecha; en mobile cada paso avanza cuando llega a su altura.
   Sin JS o con reduced-motion los pasos se muestran completos. */
export function ProcessTrack({ steps }: { steps: readonly Step[] }) {
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const items = Array.from(list.querySelectorAll<HTMLElement>("[data-step]"));
    list.setAttribute("data-scrub", "");
    let frame = 0;

    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      // Agrupa los pasos por fila según su posición vertical
      const rows = new Map<number, HTMLElement[]>();
      items.forEach((item) => {
        const key = Math.round(item.offsetTop / 8);
        rows.set(key, [...(rows.get(key) ?? []), item]);
      });
      rows.forEach((row) => {
        const top = row[0].getBoundingClientRect().top;
        const span = vh * (row.length > 1 ? 0.42 : 0.28);
        const rowProgress = Math.min(1, Math.max(0, (vh * 0.86 - top) / span));
        row.forEach((item, index) => {
          const p = Math.min(1, Math.max(0, rowProgress * row.length - index));
          item.style.setProperty("--p", p.toFixed(3));
          item.toggleAttribute("data-reached", p >= 0.55);
        });
      });
    };

    const request = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    return () => {
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      if (frame) window.cancelAnimationFrame(frame);
      list.removeAttribute("data-scrub");
    };
  }, []);

  return (
    <ol className={styles.steps} ref={listRef} data-reveal-group>
      {steps.map((step, index) => (
        <li className={styles.step} key={step.title} data-step data-reveal-item style={{ "--i": index } as React.CSSProperties}>
          <span className={styles.node} aria-hidden="true" />
          <span className={`${styles.number} mono`}><span>0{index + 1}</span></span>
          <div className={styles.body}>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
