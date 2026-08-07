import type { Locale } from "@/types/project";
import { getStudioContent } from "@/content";
import { siteConfig } from "@/config/site";
import styles from "./StudioStatement.module.css";

export function StudioStatement({ locale }: { locale: Locale }) {
  const content = getStudioContent(locale).capabilities;
  return (
    <section className={styles.statement} aria-labelledby="capabilities-title">
      <div className={styles.grid}>
        <p className="mono" data-reveal>{content.eyebrow}</p>
        <h2 className={`${styles.copy} display`} id="capabilities-title" data-reveal>{content.title}</h2>
      </div>
      <div className={styles.capabilities} aria-label={content.eyebrow}>
        {content.items.map((capability, index) => (
          <div className={styles.capability} key={capability} data-reveal>
            <span className="mono">0{index + 1}</span>
            <span className={styles.capabilityName}>{capability}</span>
            <span aria-hidden="true">↗</span>
          </div>
        ))}
      </div>
      <div className={styles.stack}>
        <p className="mono">{content.stack}</p>
        <div className={styles.marquee} aria-label={siteConfig.stack.join(", ")}>
          <div className={styles.marqueeTrack} aria-hidden="true">
            {[...siteConfig.stack, ...siteConfig.stack].map((item, index) => <span key={`${item}-${index}`}>{item}<i>×</i></span>)}
          </div>
        </div>
      </div>
    </section>
  );
}
