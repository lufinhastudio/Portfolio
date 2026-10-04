import type { Locale } from "@/types/project";
import { getStudioContent } from "@/content";
import { Aura } from "@/components/ui/Aura";
import { ProcessTrack } from "./ProcessTrack";
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
      {/* Línea de tiempo que avanza con el scroll */}
      <ProcessTrack steps={content.steps} />
    </section>
  );
}
