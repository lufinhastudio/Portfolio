/* Eventos de conversión → Vercel Web Analytics.
   Sin dependencias: usa la cola global `va` que define el script de Vercel.
   En local (o si Analytics no está activado en Vercel) no hace nada. */

type EventData = Record<string, string | number | boolean | null>;

declare global {
  interface Window {
    va?: (event: "event" | "beforeSend" | "pageview", properties?: unknown) => void;
    vaq?: unknown[][];
  }
}

export function trackEvent(name: string, data?: EventData) {
  if (typeof window === "undefined" || !window.va) return;
  try {
    window.va("event", { name, data });
  } catch {
    /* la analítica nunca debe romper la página */
  }
}
