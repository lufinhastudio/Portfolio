"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CustomCursor.module.css";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    let frame = 0;
    let x = -100;
    let y = -100;
    let targetX = x;
    let targetY = y;

    const render = () => {
      x += (targetX - x) * 0.22;
      y += (targetY - y) * 0.22;
      cursorRef.current?.style.setProperty("transform", `translate3d(${x}px, ${y}px, 0)`);
      frame = requestAnimationFrame(render);
    };
    const move = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      const target = (event.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
      setLabel(target?.dataset.cursor ?? "");
    };
    const leave = () => setLabel("");

    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    frame = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <div ref={cursorRef} className={`${styles.cursor} ${label ? styles.active : ""}`} aria-hidden="true">
      <span>{label}</span>
    </div>
  );
}
