import styles from "./Aura.module.css";

type AuraVariant = "hero" | "field" | "corner" | "band" | "accent";
type AuraIntensity = "soft" | "medium" | "strong";
type AuraPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";
type AuraTone = "full" | "coral" | "orange" | "yellow";

type AuraProps = {
  variant?: AuraVariant;
  intensity?: AuraIntensity;
  position?: AuraPosition;
  tone?: AuraTone;
  animated?: boolean;
  className?: string;
};

export function Aura({
  variant = "corner",
  intensity = "soft",
  position = "top-right",
  tone = "full",
  animated = false,
  className = "",
}: AuraProps) {
  return (
    <span
      className={`${styles.aura} ${styles[variant]} ${styles[intensity]} ${styles[position]} ${tone === "full" ? "" : styles[tone]} ${animated ? styles.animated : ""} ${className}`}
      data-aura="true"
      aria-hidden="true"
    >
      <span className={`${styles.layer} ${styles.coral}`} />
      <span className={`${styles.layer} ${styles.orange}`} />
      <span className={`${styles.layer} ${styles.yellow}`} />
    </span>
  );
}
