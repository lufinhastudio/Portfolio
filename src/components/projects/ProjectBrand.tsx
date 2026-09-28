import Image from "next/image";
import type { ProjectBrandLogo } from "@/types/project";
import styles from "./ProjectBrand.module.css";

type ProjectBrandProps = {
  logo?: ProjectBrandLogo;
  placement: "cover" | "intro";
};

export function ProjectBrand({ logo, placement }: ProjectBrandProps) {
  if (!logo) return null;

  return (
    <span
      className={`${styles.brand} ${styles[placement]} ${styles[logo.contrast]}`}
      aria-label={logo.alt}
    >
      <Image
        className={styles.image}
        src={logo.src}
        alt=""
        width={logo.width}
        height={logo.height}
        sizes={placement === "cover" ? "(max-width: 760px) 40vw, 16vw" : "(max-width: 760px) 38vw, 12vw"}
      />
    </span>
  );
}
