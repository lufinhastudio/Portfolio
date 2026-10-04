"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/types/project";
import { getStudioContent } from "@/content";
import { Aura } from "@/components/ui/Aura";
import styles from "./TechStack.module.css";

type NodeId =
  | "react"
  | "react-native"
  | "typescript"
  | "javascript"
  | "next"
  | "node"
  | "postgresql"
  | "neon"
  | "api"
  | "vercel"
  | "docker"
  | "cloudinary"
  | "git"
  | "github";

type Target = { x: number; y: number; s: number; a: number; h: number };
type RuntimeNode = Target & { id: NodeId; label: string; icon?: string };
type Scene = {
  hold: number;
  lines: Array<[NodeId, NodeId]>;
  layout: (id: NodeId, time: number) => Target;
};

const NODE_DEFINITIONS: Array<Pick<RuntimeNode, "id" | "label" | "icon">> = [
  { id: "react", label: "React", icon: "/tech/react.svg" },
  { id: "react-native", label: "React Native", icon: "/tech/react.svg" },
  { id: "typescript", label: "TypeScript", icon: "/tech/typescript.svg" },
  { id: "javascript", label: "JavaScript", icon: "/tech/javascript.svg" },
  { id: "next", label: "Next.js", icon: "/tech/nextdotjs.svg" },
  { id: "node", label: "Node.js", icon: "/tech/nodedotjs.svg" },
  { id: "postgresql", label: "PostgreSQL", icon: "/tech/postgresql.svg" },
  { id: "neon", label: "Neon", icon: "/tech/neon.svg" },
  { id: "api", label: "APIs / REST" },
  { id: "vercel", label: "Vercel", icon: "/tech/vercel.svg" },
  { id: "docker", label: "Docker", icon: "/tech/docker.svg" },
  { id: "cloudinary", label: "Cloudinary", icon: "/tech/cloudinary.svg" },
  { id: "git", label: "Git", icon: "/tech/git.svg" },
  { id: "github", label: "GitHub", icon: "/tech/github.svg" },
];

const HIDDEN: Target = { x: 0.5, y: 0.5, s: 0.35, a: 0, h: 0 };
const fixed = (x: number, y: number, s = 1, a = 1, h = 0): Target => ({ x, y, s, a, h });
const drift = (x: number, y: number, phase: number, time: number, s = 1, a = 1, h = 0): Target => ({
  x: x + Math.sin(time * 0.00018 + phase) * 0.012,
  y: y + Math.cos(time * 0.00016 + phase) * 0.009,
  s,
  a,
  h,
});

const SCENES: Scene[] = [
  {
    hold: 5200,
    lines: [
      ["react", "typescript"], ["next", "typescript"], ["node", "typescript"],
      ["node", "postgresql"], ["postgresql", "neon"], ["next", "vercel"],
      ["github", "vercel"], ["cloudinary", "react"],
    ],
    layout(id, time) {
      if (id === "react") return drift(0.16, 0.23, 0, time);
      if (id === "typescript") return drift(0.42, 0.18, 1, time, 1.16, 1, 1);
      if (id === "next") return drift(0.72, 0.24, 2, time, 0.95);
      if (id === "node") return drift(0.25, 0.53, 3, time);
      if (id === "postgresql") return drift(0.52, 0.55, 4, time);
      if (id === "neon") return drift(0.8, 0.56, 5, time, 0.92);
      if (id === "github") return drift(0.2, 0.82, 6, time, 0.88);
      if (id === "vercel") return drift(0.5, 0.83, 7, time, 0.9);
      if (id === "cloudinary") return drift(0.79, 0.82, 8, time, 0.86);
      return HIDDEN;
    },
  },
  {
    hold: 5400,
    lines: [
      ["react", "typescript"], ["react-native", "typescript"],
      ["next", "typescript"], ["javascript", "typescript"], ["next", "vercel"],
    ],
    layout(id, time) {
      if (id === "react") return fixed(0.5, 0.46, 1.35, 1, 1);
      if (id === "react-native") return drift(0.17, 0.28, 1, time, 0.9);
      if (id === "typescript") return drift(0.82, 0.27, 2, time);
      if (id === "next") return drift(0.2, 0.76, 3, time, 0.9);
      if (id === "javascript") return drift(0.8, 0.75, 4, time, 0.82);
      if (id === "vercel") return fixed(0.5, 0.87, 0.72, 0.55);
      return HIDDEN;
    },
  },
  {
    hold: 5400,
    lines: [["node", "api"], ["node", "postgresql"], ["postgresql", "neon"], ["node", "docker"]],
    layout(id, time) {
      if (id === "node") return fixed(0.5, 0.42, 1.38, 1, 1);
      if (id === "api") return drift(0.16, 0.28, 0, time, 0.92);
      if (id === "docker") return drift(0.84, 0.28, 1, time, 0.9);
      if (id === "postgresql") return drift(0.27, 0.76, 2, time, 1.02);
      if (id === "neon") return drift(0.73, 0.76, 3, time, 0.98);
      return HIDDEN;
    },
  },
  {
    hold: 5600,
    lines: [
      ["git", "github"], ["github", "vercel"], ["github", "docker"],
      ["next", "vercel"], ["cloudinary", "vercel"],
    ],
    layout(id, time) {
      if (id === "github") return fixed(0.5, 0.38, 1.36, 1, 1);
      if (id === "git") return drift(0.17, 0.2, 0, time, 0.83);
      if (id === "vercel") return drift(0.82, 0.2, 1, time);
      if (id === "docker") return drift(0.19, 0.75, 2, time, 0.92);
      if (id === "cloudinary") return drift(0.81, 0.75, 3, time, 0.92);
      if (id === "next") return fixed(0.5, 0.82, 0.76, 0.55);
      return HIDDEN;
    },
  },
  {
    hold: 5200,
    lines: [
      ["react", "typescript"], ["react-native", "typescript"], ["next", "vercel"],
      ["node", "api"], ["node", "postgresql"], ["postgresql", "neon"],
      ["git", "github"], ["github", "vercel"], ["cloudinary", "react"],
    ],
    layout(id, time) {
      if (id === "react") return drift(0.13, 0.23, 0, time, 0.86);
      if (id === "react-native") return drift(0.36, 0.17, 1, time, 0.72);
      if (id === "typescript") return drift(0.62, 0.17, 2, time, 0.9);
      if (id === "next") return drift(0.86, 0.24, 3, time, 0.82);
      if (id === "node") return drift(0.18, 0.53, 4, time, 0.9);
      if (id === "api") return drift(0.42, 0.48, 5, time, 0.72);
      if (id === "postgresql") return drift(0.66, 0.5, 6, time, 0.86);
      if (id === "neon") return drift(0.87, 0.53, 7, time, 0.78);
      if (id === "git") return drift(0.13, 0.82, 8, time, 0.7);
      if (id === "github") return drift(0.37, 0.8, 9, time, 0.84);
      if (id === "vercel") return drift(0.61, 0.81, 10, time, 0.82);
      if (id === "cloudinary") return drift(0.86, 0.8, 11, time, 0.74);
      return HIDDEN;
    },
  },
];

const COPY = {
  es: [
    { title: "Todo se conecta.", body: "Diseño, código, datos e infraestructura forman parte del mismo producto." },
    { title: "Lo que la persona usa.", body: "Construimos interfaces web y mobile rápidas, claras y pensadas para el uso real." },
    { title: "Lo que hace que todo funcione.", body: "Datos, lógica y APIs trabajando detrás de la experiencia." },
    { title: "Del código a producción.", body: "Desarrollamos, versionamos y publicamos cada proyecto con orden." },
    { title: "Elegimos el stack según el proyecto.", body: "Usamos la herramienta que mejor resuelve el problema, no la que está de moda." },
  ],
  en: [
    { title: "Everything connects.", body: "Design, code, data and infrastructure are parts of the same product." },
    { title: "What people use.", body: "We build fast, clear web and mobile interfaces designed for real use." },
    { title: "What makes everything work.", body: "Data, logic and APIs working behind the experience." },
    { title: "From code to production.", body: "We develop, version and publish every project with an orderly process." },
    { title: "We choose the stack for the project.", body: "We use the tool that best solves the problem, rather than the fashionable one." },
  ],
} as const;

const SCENE_TONES = ["full", "coral", "orange", "yellow", "full"] as const;

export function TechStack({ locale }: { locale: Locale }) {
  const content = getStudioContent(locale).stack;
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeScene, setActiveScene] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!section || !canvas || !context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const images = new Map<NodeId, HTMLImageElement>();
    const nodes: RuntimeNode[] = NODE_DEFINITIONS.map((node) => ({ ...node, ...HIDDEN }));
    let sceneIndex = 0;
    let sceneStart = performance.now();
    let pausedAt = 0;
    let running = false;
    let frame = 0;
    let width = 0;
    let height = 0;
    let sizeFactor = 1;

    for (const definition of NODE_DEFINITIONS) {
      if (!definition.icon) continue;
      const image = new Image();
      image.src = definition.icon;
      images.set(definition.id, image);
    }

    const resize = () => {
      const nextWidth = canvas.clientWidth;
      const nextHeight = canvas.clientHeight;
      if (nextWidth === width && nextHeight === height) return;
      width = nextWidth;
      height = nextHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      sizeFactor = Math.max(0.68, Math.min(1, Math.min(width, height) / 520));
    };

    const toPixels = (node: RuntimeNode) => {
      const base = Math.min(width, height, 560);
      return [width / 2 + (node.x - 0.5) * base, height / 2 + (node.y - 0.5) * base] as const;
    };

    const drawNode = (node: RuntimeNode) => {
      if (node.a < 0.025) return;
      const [x, y] = toPixels(node);
      const radius = 27 * sizeFactor * node.s;
      context.save();
      context.globalAlpha = node.a;
      context.translate(x, y);
      context.fillStyle = "#faf9f6";
      context.strokeStyle = node.h > 0.35 ? "#d66b43" : "rgba(23,25,22,.34)";
      context.lineWidth = 1 + node.h * 1.25;
      context.beginPath();
      context.arc(0, 0, radius + 9 * sizeFactor, 0, Math.PI * 2);
      context.fill();
      context.stroke();

      const image = images.get(node.id);
      const iconSize = radius * (node.id === "github" || node.id === "neon" ? 1.08 : 1.18);
      if (image?.complete && image.naturalWidth) {
        context.drawImage(image, -iconSize / 2, -iconSize / 2, iconSize, iconSize);
      } else if (node.id === "api") {
        context.fillStyle = "#171916";
        context.font = `700 ${13 * sizeFactor * node.s}px "IBM Plex Mono", monospace`;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText("API", 0, 1);
      }

      context.globalAlpha = node.a * (0.66 + node.h * 0.28);
      context.fillStyle = "#171916";
      context.font = `600 ${Math.max(8, 10 * sizeFactor)}px "IBM Plex Mono", monospace`;
      context.textAlign = "center";
      context.textBaseline = "alphabetic";
      context.fillText(node.label.toUpperCase(), 0, radius + 26 * sizeFactor);
      context.restore();
    };

    const draw = (time: number, immediate = false) => {
      resize();
      context.clearRect(0, 0, width, height);
      const scene = SCENES[sceneIndex];
      for (const node of nodes) {
        const target = scene.layout(node.id, time) ?? HIDDEN;
        const ease = immediate ? 1 : 0.075;
        node.x += (target.x - node.x) * ease;
        node.y += (target.y - node.y) * ease;
        node.s += (target.s - node.s) * ease;
        node.a += (target.a - node.a) * ease;
        node.h += (target.h - node.h) * ease;
      }

      const lineProgress = immediate ? 1 : Math.max(0, Math.min(1, (time - sceneStart - 650) / 650));
      context.save();
      context.lineWidth = 1;
      context.strokeStyle = `rgba(94,108,67,${0.34 * lineProgress})`;
      for (const [fromId, toId] of scene.lines) {
        const from = nodes.find((node) => node.id === fromId);
        const to = nodes.find((node) => node.id === toId);
        if (!from || !to || from.a < 0.08 || to.a < 0.08) continue;
        const [fromX, fromY] = toPixels(from);
        const [toX, toY] = toPixels(to);
        const dx = toX - fromX;
        const dy = toY - fromY;
        const distance = Math.hypot(dx, dy) || 1;
        const fromRadius = (36 * from.s + 8) * sizeFactor;
        const toRadius = (36 * to.s + 8) * sizeFactor;
        context.globalAlpha = Math.min(from.a, to.a);
        context.beginPath();
        context.moveTo(fromX + (dx / distance) * fromRadius, fromY + (dy / distance) * fromRadius);
        context.lineTo(toX - (dx / distance) * toRadius, toY - (dy / distance) * toRadius);
        context.stroke();
      }
      context.restore();
      for (const node of nodes) drawNode(node);
    };

    const selectScene = (index: number) => {
      sceneIndex = index;
      sceneStart = performance.now();
      setActiveScene(index);
      if (reducedMotion) draw(sceneStart, true);
    };
    const tick = (time: number) => {
      if (!running) return;
      if (time - sceneStart >= SCENES[sceneIndex].hold) selectScene((sceneIndex + 1) % SCENES.length);
      draw(time);
      frame = window.requestAnimationFrame(tick);
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reducedMotion) draw(performance.now(), true);
    });
    resizeObserver.observe(canvas);

    if (reducedMotion) {
      selectScene(0);
      for (const image of images.values()) image.addEventListener("load", () => draw(performance.now(), true), { once: true });
      return () => {
        resizeObserver.disconnect();
      };
    }

    const observer = new IntersectionObserver(([entry]) => {
      const visible = entry.isIntersecting;
      if (visible && !running) {
        const now = performance.now();
        if (pausedAt) sceneStart += now - pausedAt;
        running = true;
        frame = window.requestAnimationFrame(tick);
      } else if (!visible && running) {
        running = false;
        pausedAt = performance.now();
        window.cancelAnimationFrame(frame);
      }
    }, { threshold: 0.16 });
    observer.observe(section);

    return () => {
      running = false;
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <section className={styles.section} id="stack" aria-labelledby="stack-title" ref={sectionRef}>
      <p className={`${styles.eyebrow} mono`} data-reveal>{content.eyebrow}</p>
      <div className={styles.layout}>
        {/* ── Texto + escena activa ── */}
        <div className={styles.copy} data-reveal-group>
          <h2 className={`${styles.title} display`} id="stack-title" data-reveal-item>{content.title}</h2>
          <p className={styles.description} data-reveal-item>{content.description}</p>
          <div className={styles.sceneStage} data-reveal-item>
            {COPY[locale].map((scene, index) => (
              <div className={`${styles.scene} ${activeScene === index ? styles.sceneActive : ""}`} aria-hidden={activeScene !== index} key={scene.title}>
                <h3 className="display">{scene.title}</h3>
                <p>{scene.body}</p>
              </div>
            ))}
          </div>
        </div>
        {/* ── Diagrama animado (canvas) ── */}
        <div className={styles.visual} data-scene={activeScene} data-reveal>
          <Aura className={styles.techAura} variant="field" intensity="strong" position="center" tone={SCENE_TONES[activeScene]} />
          <canvas className={styles.canvas} ref={canvasRef} aria-hidden="true" />
          <span className={`${styles.visualLabel} mono`}>{locale === "es" ? "De la interfaz a producción" : "From interface to production"}</span>
        </div>
      </div>
      <ul className={styles.srOnly}>
        {NODE_DEFINITIONS.map((node) => <li key={node.id}>{node.label}</li>)}
      </ul>
    </section>
  );
}
