import type { Metadata } from "next";
import "@fontsource-variable/anybody";
import "@fontsource-variable/manrope";
import "@fontsource/ibm-plex-mono/400.css";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { studioJsonLd } from "@/lib/jsonLd";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/layout/Footer";
import { MotionProvider } from "@/components/motion/MotionProvider";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.seo.defaultTitle.es,
    template: siteConfig.seo.titleTemplate,
  },
  description: siteConfig.description.es,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: { email: false, address: false, telephone: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const themeVariables = {
    "--site-bg": siteConfig.theme.background,
    "--site-fg": siteConfig.theme.foreground,
    "--site-paper": siteConfig.theme.paper,
    "--site-ink": siteConfig.theme.ink,
    "--site-signal": siteConfig.theme.signal,
    "--site-line": siteConfig.theme.line,
  } as React.CSSProperties;

  return (
    <html lang={siteConfig.defaultLocale} style={themeVariables} suppressHydrationWarning>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(studioJsonLd()) }}
        />
        <MotionProvider>
          <a className="skip-link mono" href="#main-content">Saltar al contenido</a>
          <SiteHeader />
          <div id="main-content">{children}</div>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
