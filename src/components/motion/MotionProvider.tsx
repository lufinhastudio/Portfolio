"use client";

import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import type Lenis from "lenis";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { localeFromPathname } from "@/lib/locale";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const restoreScrollBehaviorFrame = useRef<number | null>(null);

  const scrollToTop = useCallback(() => {
    const root = document.documentElement;
    root.style.scrollBehavior = "auto";
    lenisRef.current?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo({ top: 0, left: 0 });

    if (restoreScrollBehaviorFrame.current !== null) {
      window.cancelAnimationFrame(restoreScrollBehaviorFrame.current);
    }
    restoreScrollBehaviorFrame.current = window.requestAnimationFrame(() => {
      root.style.removeProperty("scroll-behavior");
      restoreScrollBehaviorFrame.current = null;
    });
  }, []);

  useLayoutEffect(() => {
    if (window.location.hash) return;
    scrollToTop();
    const afterNavigation = window.requestAnimationFrame(scrollToTop);
    return () => window.cancelAnimationFrame(afterNavigation);
  }, [pathname, scrollToTop]);

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    const resetInternalNavigation = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) return;

      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor || anchor.hasAttribute("download") || (anchor.target && anchor.target !== "_self")) return;

      const destination = new URL(anchor.href, window.location.href);
      if (destination.origin !== window.location.origin || destination.hash) return;
      scrollToTop();
    };

    document.addEventListener("click", resetInternalNavigation, true);
    return () => {
      document.removeEventListener("click", resetInternalNavigation, true);
      window.history.scrollRestoration = previousScrollRestoration;
      if (restoreScrollBehaviorFrame.current !== null) {
        window.cancelAnimationFrame(restoreScrollBehaviorFrame.current);
      }
    };
  }, [scrollToTop]);

  useEffect(() => {
    document.documentElement.lang = localeFromPathname(pathname);
    if (!siteConfig.motion.enabled) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (siteConfig.motion.respectReducedMotion && reduced) return;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const smooth = siteConfig.motion.smoothScroll && finePointer;

    let cleanup = () => {};
    let cancelled = false;

    void Promise.all([import("gsap"), import("gsap/ScrollTrigger"), smooth ? import("lenis") : Promise.resolve(null)]).then(
      ([gsapModule, triggerModule, lenisModule]) => {
        if (cancelled) return;
        const gsap = gsapModule.gsap;
        const ScrollTrigger = triggerModule.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);

        /* ── Sistema de reveals ─────────────────────────────────────────────
           Sólo transform + opacity (compositor → 60fps). Al terminar se limpian
           los estilos inline para que los hovers CSS vuelvan a funcionar.

           [data-reveal]          → elemento suelto
           [data-reveal-group]    → contenedor; sus [data-reveal-item] entran
                                    escalonados (stagger) cuando el grupo entra
           Los atributos data-services-* / data-studio-* siguen soportados
           porque los usa la página Estudio. */
        const EASE = "expo.out";       // ≈ cubic-bezier(0.16, 1, 0.3, 1)
        const DURATION = 0.7;
        const DISTANCE = 24;           // px — desplazamiento leve
        const STAGGER = 0.08;
        const START = "top 86%";
        const CLEAR = "opacity,visibility,transform";

        const GROUPS = "[data-reveal-group], [data-services-intro], [data-studio-intro], [data-studio-sequence]";
        const ITEMS = "[data-reveal-item], [data-services-step], [data-studio-step]";
        const SINGLES = "[data-reveal], [data-services-item], [data-studio-ticker]";

        const context = gsap.context(() => {
          // 1. Elementos sueltos
          gsap.utils.toArray<HTMLElement>(SINGLES).forEach((element) => {
            gsap.fromTo(element, { y: DISTANCE, autoAlpha: 0 }, {
              y: 0, autoAlpha: 1, duration: DURATION, ease: EASE, clearProps: CLEAR,
              scrollTrigger: { trigger: element, start: START, once: true },
            });
          });

          // 2. Grupos con aparición escalonada
          gsap.utils.toArray<HTMLElement>(GROUPS).forEach((group) => {
            // Sólo los items cuyo grupo más cercano es éste (permite anidar grupos)
            const items = gsap.utils
              .toArray<HTMLElement>(group.querySelectorAll(ITEMS))
              .filter((item) => item.parentElement?.closest(GROUPS) === group);
            if (!items.length) return;

            const timeline = gsap.timeline({
              scrollTrigger: {
                trigger: group, start: START, once: true,
                // Marca el grupo para animaciones CSS (líneas que se dibujan, etc.)
                onEnter: () => group.setAttribute("data-inview", ""),
              },
            });
            timeline.fromTo(items, { y: DISTANCE, autoAlpha: 0 }, {
              y: 0, autoAlpha: 1, duration: DURATION, stagger: STAGGER, ease: EASE, clearProps: CLEAR,
            });

            // Retratos: la foto se asienta con un zoom-out mínimo (sin clip-path)
            if (finePointer) {
              group.querySelectorAll<HTMLElement>("[data-studio-portrait] img").forEach((image) => {
                timeline.fromTo(image, { scale: 1.06 }, {
                  scale: 1, duration: 1.1, ease: EASE, clearProps: "transform",
                }, 0.05);
              });
            }
          });

          // 3. Grupos sin items que igual quieren saber cuándo entran (data-inview)
          gsap.utils.toArray<HTMLElement>("[data-inview-watch]").forEach((element) => {
            ScrollTrigger.create({
              trigger: element, start: START, once: true,
              onEnter: () => element.setAttribute("data-inview", ""),
            });
          });

          // 4. Parallax suave en imágenes (sólo con mouse; nunca en touch)
          if (finePointer) {
            gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((element) => {
              gsap.fromTo(element, { yPercent: -4, scale: 1.05 }, {
                yPercent: 4, scale: 1, ease: "none",
                scrollTrigger: { trigger: element.parentElement, start: "top bottom", end: "bottom top", scrub: 0.8 },
              });
            });
          }
        });

        const lenis = smooth && lenisModule ? new lenisModule.default({ duration: 1.05, smoothWheel: true, wheelMultiplier: 0.9 }) : null;
        lenisRef.current = lenis;
        let animationFrame = 0;
        if (lenis) {
          lenis.on("scroll", ScrollTrigger.update);
          const raf = (time: number) => {
            lenis.raf(time);
            animationFrame = requestAnimationFrame(raf);
          };
          animationFrame = requestAnimationFrame(raf);
        }

        /* ── Brillo que sigue al cursor en tarjetas [data-glow] ──
           Un solo listener delegado: escribe la posición del mouse relativa a
           la tarjeta en --gx / --gy; el CSS la usa dentro de un transform. */
        const onGlowMove = (event: PointerEvent) => {
          const card = (event.target as Element | null)?.closest<HTMLElement>("[data-glow]");
          if (!card) return;
          const rect = card.getBoundingClientRect();
          card.style.setProperty("--gx", `${(event.clientX - rect.left).toFixed(1)}px`);
          card.style.setProperty("--gy", `${(event.clientY - rect.top).toFixed(1)}px`);
        };
        if (finePointer) document.addEventListener("pointermove", onGlowMove, { passive: true });
        document.documentElement.dataset.motion = "on";

        ScrollTrigger.refresh();
        cleanup = () => {
          document.removeEventListener("pointermove", onGlowMove);
          delete document.documentElement.dataset.motion;
          cancelAnimationFrame(animationFrame);
          lenis?.destroy();
          if (lenisRef.current === lenis) lenisRef.current = null;
          context.revert();
        };
      },
    );

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [pathname]);

  return children;
}
