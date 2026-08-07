import type { Locale } from "@/types/project";
import { getStudioContent } from "@/content";
import { siteConfig } from "@/config/site";
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
  const projectEmailHref = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(locale === "es" ? "Nuevo proyecto para Lufinha Studio" : "New project for Lufinha Studio")}`;

  return (
    <main className={styles.page} lang={locale}>
      <section className={styles.hero}>
        <div className={`${styles.eyebrow} mono`}><span>{content.eyebrow}</span><span>{siteConfig.contact.location}</span></div>
        <h1 className={`${styles.title} display`}>{content.title}</h1>
        <div className={styles.foot}><span className="mono">Luca + Rafa</span><p>{content.body}</p></div>
      </section>
      <section className={styles.team} aria-labelledby="team-title">
        <div className={styles.teamHeader}><p className="mono" data-reveal>{content.people}</p><h2 className={`${styles.teamTitle} display`} id="team-title" data-reveal>{locale === "es" ? "Pequeño a propósito. Cercano por diseño." : "Small on purpose. Close by design."}</h2></div>
        <div className={styles.people}>
          {siteConfig.team.map((person, index) => {
            const whatsapp = siteConfig.contact.whatsapp.find((contact) => contact.name === person.name);
            const contacts = [
              { label: "Email", value: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}`, external: false },
              ...(whatsapp ? [{ label: "WhatsApp", value: whatsapp.phone, href: whatsapp.href, external: true }] : []),
              ...person.links.map((link) => ({
                label: link.label,
                value: locale === "es" ? "Ver perfil" : "View profile",
                href: link.href,
                external: true,
              })),
            ];

            return (
              <article className={styles.person} key={person.name} data-reveal>
                <span className="mono">0{index + 1}</span>
                <h3 className={`${styles.personName} display`}>{person.name}</h3>
                <div className={styles.personDetails}>
                  <p className="mono">{person.role ?? "Lufinha Studio"}</p>
                  {person.bio ? <p className={styles.personNote}>{person.bio}</p> : null}
                  <div className={styles.personContacts} aria-label={`${locale === "es" ? "Contacto de" : "Contact details for"} ${person.name}`}>
                    {contacts.map((contact) => (
                      <a className={styles.personContact} href={contact.href} key={`${person.name}-${contact.label}`} target={contact.external ? "_blank" : undefined} rel={contact.external ? "noreferrer" : undefined}>
                        <span className={styles.contactLabel}>{contact.label}</span>
                        <span className={styles.contactValue}>{contact.value}</span>
                        <span className={styles.contactArrow} aria-hidden="true">↗</span>
                      </a>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
      <section className={styles.principles} aria-label={locale === "es" ? "Principios del estudio" : "Studio principles"}>
        <div className={styles.principlesGrid}>{principles[locale].map((principle, index) => <article className={styles.principle} key={principle.title} data-reveal><span className="mono">{locale === "es" ? "Principio" : "Principle"} 0{index + 1}</span><div><h2>{principle.title}</h2><p>{principle.text}</p></div></article>)}</div>
        <a className={styles.contactLink} href={projectEmailHref}>{locale === "es" ? "Empezar un proyecto" : "Start a project"}<span>↗</span></a>
      </section>
    </main>
  );
}
