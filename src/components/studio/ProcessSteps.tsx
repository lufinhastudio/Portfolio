import type { Locale } from "@/types/project";
import { getStudioContent } from "@/content";
import { Aura } from "@/components/ui/Aura";
import styles from "./ProcessSteps.module.css";

export function ProcessSteps({ locale, compact = false }: { locale: Locale; compact?: boolean }) {
  const content = getStudioContent(locale).process;
  return (
    <section className={styles.section + (compact ? " " + styles.compact : "")} id="process" aria-labelledby="process-title">
      <Aura variant="accent" intensity="soft" position="top-right" />
      <header className={styles.header} data-reveal-group>
        <p className="mono" data-reveal-item>{content.eyebrow}</p>
        <h2 className={`${styles.title} display`} id="process-title" data-reveal-item>{content.title}</h2>
      </header>
      {/* Los pasos entran escalonados y su línea superior se dibuja en orden */}
      <ol className={styles.steps} data-reveal-group>
        {content.steps.map((step, index) => (
          <li className={styles.step} key={step.title} data-reveal-item style={{ "--i": index } as React.CSSProperties}>
            <span className={styles.number + " mono"}>0{index + 1}</span>
            <div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
