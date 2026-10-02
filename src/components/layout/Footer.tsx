"use client";

import { usePathname } from "next/navigation";
import { getSocialLinks } from "@/content";
import { localeFromPathname } from "@/lib/locale";
import { ArrowUpRight, ArgentinaFlag } from "@/components/ui/Icons";
import { Aura } from "@/components/ui/Aura";
import styles from "./Footer.module.css";

export function Footer() {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const links = getSocialLinks();
  const footerLinks = links.filter((link) => link.kind !== "whatsapp");

  return (
    <footer className={styles.footer} id="contact">
      <Aura variant="band" intensity="soft" position="bottom-left" />
      <div className={`${styles.bottom} mono`}>
        <div className={styles.credits}>
          <ArgentinaFlag size={16} />
          <span>© {new Date().getFullYear()} Lufinha Studio</span>
        </div>
        <nav className={styles.socials} aria-label={locale === "es" ? "Canales de contacto" : "Contact channels"}>
          {footerLinks.map((link) => (
            <a
              className={styles.socialLink}
              key={link.label}
              href={link.href}
              aria-label={link.label}
              target={link.kind === "email" ? undefined : "_blank"}
              rel={link.kind === "email" ? undefined : "noopener noreferrer"}
            >
              <span>{link.label}</span>
              <ArrowUpRight size="0.85em" aria-hidden="true" />
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
