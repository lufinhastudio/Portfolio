"use client";

import { useEffect, useRef } from "react";
import { Aura } from "@/components/ui/Aura";
import styles from "./ReactiveAura.module.css";

/* ==========================================================================
   ReactiveAura — fondo de color vivo para los heros
   --------------------------------------------------------------------------
   Capas (de atrás hacia adelante):
   1. Aura animada (deriva sola, CSS)
   2. Dos "luces" que siguen al cursor con distinta inercia
   3. Fundido inferior hacia el color de la sección siguiente

   Reacciona a:
   - Mouse: parallax del aura + luces que persiguen el cursor
   - Click: pulso breve de las luces
   - Scroll: el fondo se desplaza más lento que el contenido y se apaga
   - Touch (sin mouse): las luces orbitan solas, suave

   Todo se mueve con transform/opacity dentro de un único requestAnimationFrame,
   que se pausa cuando el hero sale de pantalla. Con prefers-reduced-motion
   queda estático.
   ========================================================================== */

type Props = {
  className?: string;
  /** Intensidad del aura base */
  intensity?: "medium" | "strong";
};

export function ReactiveAura({ className = "", intensity = "strong" }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const driftRef = useRef<HTMLDivElement>(null);
  const spotARef = useRef<HTMLSpanElement>(null);
  const spotBRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const drift = driftRef.current;
    const spotA = spotARef.current;
    const spotB = spotBRef.current;
    if (!root || !drift || !spotA || !spotB) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const lerp = (from: number, to: number, amount: number) => from + (to - from) * amount;

    let width = root.clientWidth;
    let height = root.clientHeight;
    // Posición objetivo (cursor) y posiciones actuales con inercia
    let targetX = width * 0.5;
    let targetY = height * 0.42;
    let ax = targetX, ay = targetY; // luz A: rápida
    let bx = targetX, by = targetY; // luz B: lenta
    let px = 0, py = 0;             // parallax del aura (-0.5 … 0.5)
    let hasPointer = false;
    let pulse = 0;
    let frame = 0;
    let running = false;

    const onResize = () => {
      width = root.clientWidth;
      height = root.clientHeight;
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      targetX = event.clientX - rect.left;
      targetY = event.clientY - rect.top;
      hasPointer = true;
    };

    const onPointerDown = () => { pulse = 1; };
    const onPointerLeave = () => { hasPointer = false; };

    const tick = (time: number) => {
      if (!running) return;

      // Sin mouse (o con el mouse fuera): órbita lenta alrededor del centro
      if (!hasPointer) {
        const t = time * 0.00018;
        targetX = width * (0.5 + Math.cos(t) * 0.22);
        targetY = height * (0.45 + Math.sin(t * 1.3) * 0.16);
      }

      ax = lerp(ax, targetX, 0.085);
      ay = lerp(ay, targetY, 0.085);
      bx = lerp(bx, targetX, 0.035);
      by = lerp(by, targetY, 0.035);
      px = lerp(px, targetX / Math.max(width, 1) - 0.5, 0.05);
      py = lerp(py, targetY / Math.max(height, 1) - 0.5, 0.05);
      pulse = lerp(pulse, 0, 0.06);

      // Scroll: el fondo va a 35% de la velocidad del contenido y se apaga
      const rect = root.getBoundingClientRect();
      const progress = Math.min(Math.max(-rect.top / Math.max(rect.height, 1), 0), 1);

      drift.style.transform =
        `translate3d(${(-px * 48).toFixed(2)}px, ${(-py * 36 + -rect.top * 0.35).toFixed(2)}px, 0)`;
      root.style.opacity = (1 - progress * 0.55).toFixed(3);

      const scaleA = 1 + pulse * 0.22;
      const scaleB = 1 + pulse * 0.12;
      spotA.style.transform = `translate3d(${ax.toFixed(1)}px, ${ay.toFixed(1)}px, 0) translate(-50%, -50%) scale(${scaleA.toFixed(3)})`;
      spotB.style.transform = `translate3d(${bx.toFixed(1)}px, ${by.toFixed(1)}px, 0) translate(-50%, -50%) scale(${scaleB.toFixed(3)})`;

      frame = requestAnimationFrame(tick);
    };

    // Sólo animar mientras el hero está visible
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true;
        frame = requestAnimationFrame(tick);
      } else if (!entry.isIntersecting && running) {
        running = false;
        cancelAnimationFrame(frame);
      }
    });
    observer.observe(root);

    const host = root.parentElement ?? root;
    if (finePointer) {
      host.addEventListener("pointermove", onPointerMove, { passive: true });
      host.addEventListener("pointerleave", onPointerLeave);
    }
    host.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    root.dataset.live = "true";
    // El aura global del cursor se apaga sobre este hero (ya tiene la suya)
    host.setAttribute("data-aura-host", "");

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerleave", onPointerLeave);
      host.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("resize", onResize);
      host.removeAttribute("data-aura-host");
    };
  }, []);

  return (
    <div className={`${styles.root} ${className}`} ref={rootRef} aria-hidden="true">
      <div className={styles.drift} ref={driftRef}>
        <Aura variant="hero" intensity={intensity} position="top-left" animated />
      </div>
      <span className={`${styles.spot} ${styles.spotA}`} ref={spotARef} />
      <span className={`${styles.spot} ${styles.spotB}`} ref={spotBRef} />
      <span className={styles.fade} />
    </div>
  );
}
