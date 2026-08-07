"use client";

import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import type Lenis from "lenis";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { localeFromPathname } from "@/lib/locale";
import { CustomCursor } from "./CustomCursor";

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

    let cleanup = () => {};
    let cancelled = false;

    void Promise.all([import("gsap"), import("gsap/ScrollTrigger"), import("lenis")]).then(
      ([gsapModule, triggerModule, lenisModule]) => {
        if (cancelled) return;
        const gsap = gsapModule.gsap;
        const ScrollTrigger = triggerModule.ScrollTrigger;
        const LenisConstructor = lenisModule.default;
        gsap.registerPlugin(ScrollTrigger);

        const context = gsap.context(() => {
          gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
            gsap.fromTo(element, { y: 38, opacity: 0 }, {
              y: 0, opacity: 1, duration: 1, ease: "power3.out",
              scrollTrigger: { trigger: element, start: "top 88%", once: true },
            });
          });
          gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((element) => {
            gsap.fromTo(element, { yPercent: -4, scale: 1.05 }, {
              yPercent: 4, scale: 1, ease: "none",
              scrollTrigger: { trigger: element.parentElement, start: "top bottom", end: "bottom top", scrub: 0.8 },
            });
          });
        });

        const smooth = siteConfig.motion.smoothScroll && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
        const lenis = smooth ? new LenisConstructor({ duration: 1.05, smoothWheel: true, wheelMultiplier: 0.9 }) : null;
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

        ScrollTrigger.refresh();
        cleanup = () => {
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

  return <><CustomCursor />{children}</>;
}
