import Image from "next/image";
import type { Locale } from "@/types/project";
import { getStudioContent } from "@/content";
import styles from "./InterfaceInterlude.module.css";

const fragments = [
  { src: "/work/mayma/product-04.jpg", alt: "Producto Mayma", className: "mayma" },
  { src: "/work/xeneize/logo-black.png", alt: "Identidad Xeneize", className: "xeneize" },
  { src: "/work/santa-dominga/product.webp", alt: "Producto Santa Dominga", className: "santa" },
  { src: "/work/uruguai/variety.webp", alt: "Producto Uruguaí", className: "uruguai" },
] as const;

export function InterfaceInterlude({ locale }: { locale: Locale }) {
  const content = getStudioContent(locale).interlude;
  return (
    <section className={styles.section} aria-labelledby="interlude-title">
      <p className={`${styles.eyebrow} mono`} data-reveal>{content.eyebrow}</p>
      <h2 className={`${styles.title} display`} id="interlude-title" data-reveal>{content.title}</h2>
      <p className={styles.body} data-reveal>{content.body}</p>
      <div className={styles.fragments} aria-hidden="true">
        {fragments.map((fragment) => (
          <div className={`${styles.fragment} ${styles[fragment.className]}`} key={fragment.src}>
            <Image src={fragment.src} alt="" fill sizes="25vw" data-parallax />
          </div>
        ))}
      </div>
    </section>
  );
}
