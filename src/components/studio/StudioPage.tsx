import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/types/project";
import { getStudioContent } from "@/content";
import { localePath, siteConfig } from "@/config/site";
import { ArrowUpRight } from "@/components/ui/Icons";
import { Aura } from "@/components/ui/Aura";
import { ProcessSteps } from "@/components/studio/ProcessSteps";
import styles from "@/app/studio/studio.module.css";

const principles = {
  es: [
    { title: "La identidad manda.", text: "El sistema visual nace de cada marca. Aportamos criterio y ejecución, no una plantilla reconocible." },
    { title: "Diseño y código juntos.", text: "Probamos las decisiones en el medio final. Interacción, contenido y rendimiento también son parte del diseño." },
    { title: "Crecer sin rehacer.", text: "Pensamos cada proyecto para que pueda sumar páginas, productos y nuevas necesidades con orden." },
  ],
  en: [
    { title: "Identity leads.", text: "The visual system starts with each brand. We bring judgement and execution, not a recognisable template." },
    { title: "Design and code together.", text: "We test decisions in their final medium. Interaction, content and performance are part of design." },
    { title: "Grow without rebuilding.", text: "We shape each project to make room for new pages, products and needs." },
  ],
};

const spanishBios = {
  Rafa: [
    "Soy analista de sistemas, curiosa, creativa y bastante obsesiva con los detalles. Me gusta entender cómo funcionan las cosas, buscar ideas nuevas y encontrar maneras simples de resolver problemas.",
    "Lo que más disfruto de Lufinha es todo el proceso: pensar una idea con Luca, darle forma, probar, cambiar cosas y terminar viendo un proyecto real que antes solo existía en nuestra cabeza.",
    "Mi fuerte está en bajar ideas a tierra, entender lo que necesita cada cliente y encontrar ese equilibrio entre que algo se vea lindo y que también funcione de verdad.",
  ],
  Luca: [
    "Estudio Sistemas, me gusta crear cosas desde cero y siempre estoy metido en algún proyecto nuevo.",
    "Me interesa mucho el desarrollo, la tecnología y especialmente la ciberseguridad. Soy bastante curioso e inquieto, de esos que empiezan investigando una cosa y terminan aprendiendo cinco más en el camino.",
    "Disfruto mucho aprender haciendo, probar ideas nuevas y ver hasta dónde puede llegar algo que al principio era solamente una ocurrencia.",
  ],
} as const;

const englishBios = {
  Rafa: [
    "I'm a systems analyst: curious, creative and a little obsessive about details. I like understanding how things work, looking for new ideas and finding simple ways to solve problems.",
    "What I enjoy most about Lufinha is the whole process: thinking up an idea with Luca, shaping it, testing it, changing things and seeing a real project that used to exist only in our heads.",
    "My strength is turning ideas into something tangible, understanding what each client needs and finding the balance between a good look and something that truly works.",
  ],
  Luca: [
    "I study Systems, enjoy creating things from scratch and am always working on a new project.",
    "I'm especially interested in development, technology and cybersecurity. I'm curious and restless: I can start researching one thing and end up learning five more along the way.",
    "I enjoy learning by doing, trying new ideas and seeing how far something can go when it started as just a passing thought.",
  ],
} as const;

type StudioPersonData = (typeof siteConfig.team)[number];

const capabilities = {
  es: ["Diseño UX/UI", "Desarrollo web", "Tiendas online", "Sistemas a medida", "Producto digital", "Criterio"],
  en: ["UX/UI design", "Web development", "Online stores", "Custom systems", "Digital products", "Judgement"],
} as const;

function CapabilitiesTicker({ locale }: { locale: Locale }) {
  return (
    <div className={styles.ticker} data-studio-ticker role="group" aria-label={locale === "es" ? "Capacidades de Lufinha Studio" : "Lufinha Studio capabilities"}>
      <div className={styles.tickerTrack}>
        {[0, 1].map((copy) => (
          <div className={styles.tickerGroup} key={copy} aria-hidden={copy === 1 ? "true" : undefined}>
            {capabilities[locale].map((capability) => <span className={styles.tickerItem} key={capability}>{capability}</span>)}
          </div>
        ))}
      </div>
    </div>
  );
}

function StudioPerson({ person, number, locale }: { person: StudioPersonData; number: number; locale: Locale }) {
  const whatsapp = siteConfig.contact.whatsapp.find((contact) => contact.name === person.name);
  const biography = locale === "es" ? spanishBios[person.name] : englishBios[person.name];
  const contacts = [
    { label: "Email", value: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}` },
    ...(whatsapp ? [{ label: "WhatsApp", value: whatsapp.phone, href: whatsapp.href }] : []),
    ...person.links.map((link) => ({ label: link.label, value: locale === "es" ? "Ver perfil" : "View profile", href: link.href })),
  ];
  return (
    <article className={styles.person} data-studio-sequence>
      <Aura className={styles.personSectionAura} variant="corner" intensity="soft" position={person.name === "Rafa" ? "top-right" : "bottom-left"} tone={person.name === "Rafa" ? "coral" : "orange"} />
      <span className={`mono ${styles.personNumber}`} data-studio-step>{String(number).padStart(2, "0")}</span>
      {person.photo ? <div className={styles.portraitStage} data-studio-step>
        <div className={styles.personPortrait} data-studio-portrait><Image src={person.photo} alt={`${person.name} — Lufinha Studio`} fill loading={person.name === "Rafa" ? "eager" : "lazy"} sizes="(max-width: 760px) 72vw, (max-width: 1050px) 280px, 320px" style={{ objectPosition: person.name === "Luca" ? "center 40%" : "center" }} /></div>
      </div> : null}
      <div className={styles.personDetails}>
        <h3 className={`${styles.personName} display`} data-studio-step>{person.name}</h3>
        <div className={styles.personNote} data-studio-step>
          {biography.map((paragraph, index) => <p key={`${person.name}-${index}`}>{index === 0 ? <><strong>{locale === "es" ? `Soy ${person.name}.` : `I'm ${person.name}.`}</strong> {paragraph}</> : paragraph}</p>)}
        </div>
        <div className={styles.personContacts} data-studio-step aria-label={`${locale === "es" ? "Contacto de" : "Contact details for"} ${person.name}`}>
          {contacts.map((contact) => <a className={styles.personContact} href={contact.href} key={`${person.name}-${contact.label}`} target={contact.label === "WhatsApp" || contact.label === "LinkedIn" ? "_blank" : undefined} rel={contact.label === "WhatsApp" || contact.label === "LinkedIn" ? "noopener noreferrer" : undefined}><span>{contact.label}</span><span>{contact.value}</span><ArrowUpRight size=".85rem" aria-hidden="true" /></a>)}
        </div>
      </div>
    </article>
  );
}

export function StudioPage({ locale }: { locale: Locale }) {
  const content = getStudioContent(locale).studio;
  return (
    <main className={styles.page} lang={locale}>
      <section className={styles.hero} data-studio-intro>
        <Aura variant="corner" intensity="medium" position="top-right" />
        <div className={styles.eyebrow} data-studio-step><span className="mono">{locale === "es" ? "El estudio / Entre Ríos, Argentina" : "The studio / Entre Ríos, Argentina"}</span><span className="mono">Lufinha Studio</span></div>
        <div className={styles.heroCopy}><h1 className={`${styles.title} display`} data-studio-step>{content.title}</h1><p data-studio-step>{locale === "es" ? "Somos un estudio de diseño y desarrollo. Vas a hablar directamente con quienes piensan, diseñan y construyen tu proyecto." : "We are a design and development studio. You'll speak directly with the people who think through, design and build your project."}</p></div>
        <div className={styles.heroFoot}><span className="mono">{locale === "es" ? "Dos personas, un mismo estudio." : "Two people, one studio."}</span><span className="mono">{locale === "es" ? "Diseño · desarrollo · proyectos reales" : "Design · development · real projects"}</span></div>
      </section>
      <CapabilitiesTicker locale={locale} />
      <section className={styles.team} aria-label={content.people}>
        <div className={styles.people}>{siteConfig.team.map((person, index) => <StudioPerson key={person.name} person={person} number={index + 1} locale={locale} />)}</div>
      </section>
      <ProcessSteps locale={locale} compact />
      <section className={styles.principles} aria-label={locale === "es" ? "Principios del estudio" : "Studio principles"}>
        <header className={styles.principlesHeader}><p className="mono">{locale === "es" ? "Cómo pensamos" : "How we think"}</p><h2 className="display">{locale === "es" ? "Lo que guía cada proyecto." : "What guides every project."}</h2></header>
        <div className={styles.principlesGrid}>{principles[locale].map((principle, index) => <article className={styles.principle} key={principle.title}><Aura className={styles.principleAura} variant="accent" intensity="soft" position="bottom-right" /><span className="mono">{locale === "es" ? "Principio" : "Principle"} 0{index + 1}</span><div><h3 className="display">{principle.title}</h3><p>{principle.text}</p></div></article>)}</div>
        <Link className={styles.contactLink} href={localePath(locale, locale === "es" ? "/contacto" : "/contact")}>{locale === "es" ? "Empezar un proyecto" : "Start a project"}<ArrowUpRight size="1em" aria-hidden="true" /></Link>
      </section>
    </main>
  );
}
