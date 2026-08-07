import type { Locale } from "@/types/project";
import { getStudioContent } from "@/content";
import styles from "./Manifesto.module.css";

export function Manifesto({ locale }: { locale: Locale }) {
  const content = getStudioContent(locale).manifesto;
  return (
    <section className={styles.section} id="manifesto" aria-labelledby="manifesto-title">
      <p className="mono" data-reveal>{content.eyebrow}</p>
      <div className={styles.copy}>
        <p className={`${styles.before} display`} data-reveal>{content.before}</p>
        <h2 className={`${styles.after} display`} id="manifesto-title" data-reveal>{content.after}</h2>
      </div>
      <div className={styles.ruler} aria-hidden="true"><span>01</span><i /><span>05</span></div>
    </section>
  );
}
