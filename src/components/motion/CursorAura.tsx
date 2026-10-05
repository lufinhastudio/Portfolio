"use client";

import { useEffect, useRef } from "react";
import styles from "./CursorAura.module.css";

/* ==========================================================================
   CursorAura — el aura del hero, en todo el sitio
   - Mouse: dos luces suaves siguen al cursor con distinta inercia.
     Sobre los heros que ya tienen su propio fondo vivo (ReactiveAura)
     se apaga para no duplicar el efecto.
   - Touch: cada toque deja un destello de aura que se expande y desaparece.
   - Sólo transform/opacity, un único requestAnimationFrame que se detiene
     cuando el aura llega al cursor. Con reduced-motion no se monta.
   ========================================================================== */
export function CursorAura() {
  const rootRef = useRef<HTMLDivElement>(null);
  const spotARef = useRef<HTMLSpanElement>(null);
  const spotBRef = useRef<HTMLSpanElement>(null);
  const tapRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const spotA = spotARef.current;
    const spotB = spotBRef.current;
    const tap = tapRef.current;
    if (!root || !spotA || !spotB || !tap) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    let tx = -9999, ty = -9999;
    let ax = tx, ay = ty, bx = tx, by = ty;
    let started = false;
    let frame = 0;

    const tick = () => {
      ax = lerp(ax, tx, 0.14); ay = lerp(ay, ty, 0.14);
      bx = lerp(bx, tx, 0.06); by = lerp(by, ty, 0.06);
      spotA.style.transform = `translate3d(${ax.toFixed(1)}px, ${ay.toFixed(1)}px, 0) translate(-50%, -50%)`;
      spotB.style.transform = `translate3d(${bx.toFixed(1)}px, ${by.toFixed(1)}px, 0) translate(-50%, -50%)`;
      // Se detiene cuando ya alcanzó al cursor (no gasta batería quieto)
      frame = Math.abs(bx - tx) + Math.abs(by - ty) > 0.5 ? requestAnimationFrame(tick) : 0;
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      tx = event.clientX; ty = event.clientY;
      if (!started) { ax = bx = tx; ay = by = ty; started = true; }
      const target = event.target instanceof Element ? event.target : null;
      root.dataset.state = target?.closest("[data-aura-host]") ? "off" : "on";
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onLeave = () => { root.dataset.state = "off"; };

    const onTap = (event: PointerEvent) => {
      if (event.pointerType === "mouse") return;
      tap.style.left = `${event.clientX}px`;
      tap.style.top = `${event.clientY}px`;
      // Reinicia la animación aunque el toque anterior no haya terminado
      tap.classList.remove(styles.tapActive);
      void tap.offsetWidth;
      tap.classList.add(styles.tapActive);
    };

    if (finePointer) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("mouseleave", onLeave);
    }
    window.addEventListener("pointerdown", onTap, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("pointerdown", onTap);
    };
  }, []);

  return (
    <div className={styles.root} ref={rootRef} data-state="off" aria-hidden="true">
      <span className={`${styles.spot} ${styles.spotB}`} ref={spotBRef} />
      <span className={`${styles.spot} ${styles.spotA}`} ref={spotARef} />
      <span className={styles.tap} ref={tapRef} />
    </div>
  );
}
