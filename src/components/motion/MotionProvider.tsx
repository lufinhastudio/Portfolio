"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { localeFromPathname } from "@/lib/locale";
import { CustomCursor } from "./CustomCursor";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

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
        const Lenis = lenisModule.default;
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
        const lenis = smooth ? new Lenis({ duration: 1.05, smoothWheel: true, wheelMultiplier: 0.9 }) : null;
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
