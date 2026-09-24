import Image from "next/image";
import type { ProjectImage } from "@/types/project";
import styles from "./LiveBrowserPreview.module.css";

type LiveBrowserPreviewProps = {
  title: string;
  fallback: ProjectImage;
  label: string;
};

export function LiveBrowserPreview({ title, fallback, label }: LiveBrowserPreviewProps) {
  return (
    <div className={styles.browser}>
      <div className={styles.chrome} aria-hidden="true">
        <span className={styles.dot} /><span className={styles.dot} /><span className={styles.dot} />
        <span className={styles.address}>{label}</span>
        <span className={styles.brand}>{title}</span>
      </div>
      <div className={styles.viewport}>
        <Image
          className={styles.fallback}
          src={fallback.src}
          alt={fallback.alt}
          fill
          sizes="(max-width: 899px) 92vw, 68vw"
          style={{ objectPosition: fallback.position ?? "center" }}
        />
      </div>
    </div>
  );
}
