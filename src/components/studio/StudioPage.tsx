import Link from "next/link";
import type { Locale } from "@/types/project";
import { getStudioContent } from "@/content";
import { localePath, siteConfig } from "@/config/site";
import styles from "@/app/studio/studio.module.css";

const principles = {
  es: [
    { title: "La identidad manda.", text: "El sistema visual nace de cada marca. Lufinha aporta criterio y ejecución, no una plantilla reconocible." },
    { title: "Diseño y código juntos.", text: "Las decisiones se prueban en el medio final. Interacción, contenido y rendimiento forman parte del diseño." },
    { title: "Crecer sin rehacer.", text: "La arquitectura permite sumar campañas, productos y páginas con orden." },
  ],
  en: [
    { title: "Identity leads.", text: "The visual system starts with each brand. Lufinha brings judgement and execution, not a recognisable template." },
    { title: "Design and code together.", text: "Decisions are tested in the final medium. Interaction, content and performance are part of design." },
    { title: "Grow without rebuilding.", text: "The architecture makes room for campaigns, products and pages with order." },
  ],
};

export function StudioPage({ locale }: { locale: Locale }) {
  const content = getStudioContent(locale).studio;
  return (
    <main className={styles.page} lang={locale}>
      <section className={styles.hero}>
        <div className={`${styles.eyebrow} mono`}><span>{content.eyebrow}</span><span>{siteConfig.contact.location}</span></div>
        <h1 className={`${styles.title} display`}>{content.title}</h1>
        <div className={styles.foot}><span className="mono">Luca + Rafa</span><p>{content.body}</p></div>
      </section>
      <section className={styles.team} aria-labelledby="team-title">
        <div className={styles.teamHeader}><p className="mono" data-reveal>{content.people}</p><h2 className={`${styles.teamTitle} display`} id="team-title" data-reveal>{locale === "es" ? "Pequeño a propósito. Cercano por diseño." : "Small on purpose. Close by design."}</h2></div>
        <div className={styles.people}>{siteConfig.team.map((person, index) => <article className={styles.person} key={person.name} data-reveal><span className="mono">0{index + 1}</span><h3 className={`${styles.personName} display`}>{person.name}</h3><div><p className="mono">{person.role ?? "Lufinha Studio"}</p><p className={styles.personNote}>{person.bio ?? content.profilePending}</p></div></article>)}</div>
      </section>
      <section className={styles.principles} aria-label={locale === "es" ? "Principios del estudio" : "Studio principles"}>
        <div className={styles.principlesGrid}>{principles[locale].map((principle, index) => <article className={styles.principle} key={principle.title} data-reveal><span className="mono">{locale === "es" ? "Principio" : "Principle"} 0{index + 1}</span><div><h2>{principle.title}</h2><p>{principle.text}</p></div></article>)}</div>
        <Link className={styles.contactLink} href={`${localePath(locale, "/")}#contact`}>{locale === "es" ? "Empezar un proyecto" : "Start a project"}<span>↗</span></Link>
      </section>
    </main>
  );
}
