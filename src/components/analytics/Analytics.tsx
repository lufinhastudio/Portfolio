"use client";

import Script from "next/script";
import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

/* Vercel Web Analytics + conversiones.
   - Visitas por página: automáticas (plan gratuito).
   - Eventos: clics a WhatsApp y a email en todo el sitio. El envío del
     formulario se registra desde ContactPage. Los eventos personalizados
     requieren el plan Pro de Vercel; en Hobby se ignoran sin errores. */
export function Analytics() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      const from = window.location.pathname;
      if (href.startsWith("https://wa.me/")) trackEvent("whatsapp_click", { from });
      else if (href.startsWith("mailto:")) trackEvent("email_click", { from });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  if (process.env.NODE_ENV !== "production") return null;

  return (
    <>
      <Script id="vercel-analytics-queue" strategy="afterInteractive">
        {`window.va=window.va||function(){(window.vaq=window.vaq||[]).push(arguments)};`}
      </Script>
      <Script src="/_vercel/insights/script.js" strategy="afterInteractive" />
    </>
  );
}
