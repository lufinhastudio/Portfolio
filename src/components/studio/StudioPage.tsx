import { Fragment } from "react";
import Image from "next/image";
import type { Locale } from "@/types/project";
import { getStudioContent } from "@/content";
import { siteConfig } from "@/config/site";
import { PersonContacts } from "@/components/team/PersonContacts";
import { Aura } from "@/components/ui/Aura";
import { TechStack } from "@/components/studio/TechStack";
import { CapabilitiesTicker } from "@/components/studio/CapabilitiesTicker";
import { ReactiveAura } from "@/components/ui/ReactiveAura";
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

function StudioPerson({ person, number, locale }: { person: StudioPersonData; number: number; locale: Locale }) {
  const biography = locale === "es" ? spanishBios[person.name] : englishBios[person.name];
  return (
    <article className={styles.person} data-studio-sequence>
      <Aura className={styles.personSectionAura} variant="corner" intensity="soft" position={person.name === "Rafa" ? "top-right" : "bottom-left"} tone={person.name === "Rafa" ? "coral" : "orange"} />
      <span className={`mono ${styles.personNumber}`} data-studio-step>{String(number).padStart(2, "0")}</span>
      {person.photo ? <div className={styles.portraitStage} data-studio-step>
        <div className={styles.personPortrait} data-studio-portrait data-glow>
          <span className={styles.portraitGlow} aria-hidden="true" /><Image src={person.photo} alt={`${person.name} — Lufinha Studio`} fill loading={person.name === "Rafa" ? "eager" : "lazy"} sizes="(max-width: 760px) 72vw, (max-width: 1050px) 280px, 320px" style={{ objectPosition: person.name === "Luca" ? "center 40%" : "center" }} />
        </div>
      </div> : null}
      <div className={styles.personDetails}>
        <h3 className={`${styles.personName} display`} data-studio-step>{person.name}</h3>
        <div className={styles.personNote} data-studio-step>
          {biography.map((paragraph, index) => <p key={`${person.name}-${index}`}>{index === 0 ? <><strong>{locale === "es" ? `Soy ${person.name}.` : `I'm ${person.name}.`}</strong> {paragraph}</> : paragraph}</p>)}
        </div>
        <PersonContacts person={person} locale={locale} data-studio-step />
      </div>
    </article>
  );
}

export function StudioPage({ locale }: { locale: Locale }) {
  const content = getStudioContent(locale).studio;
  const titleWords = content.title.split(" ");
  return (
    <main className={styles.page} lang={locale}>
      {/* ── Hero: mismo fondo vivo que la Home ── */}
      <section className={styles.hero}>
        <ReactiveAura className={styles.heroAura} intensity="medium" />
        <div className={styles.eyebrow}><span className="mono">Lufinha Studio</span></div>
        <div className={styles.heroCopy}>
          <h1 className={`${styles.title} display`}>
            <span className="sr-only">{content.title}</span>
            <span aria-hidden="true">
              {titleWords.map((word, index) => (
                <Fragment key={`${word}-${index}`}>
                  <span className={styles.word}><span className={styles.wordInner} style={{ "--i": index } as React.CSSProperties}>{word}</span></span>
                  {index < titleWords.length - 1 ? " " : null}
                </Fragment>
              ))}
            </span>
          </h1>
          <p className={styles.heroLead}>{locale === "es" ? "Somos un estudio de diseño y desarrollo. Vas a hablar directamente con quienes piensan, diseñan y construyen tu proyecto." : "We are a design and development studio. You'll speak directly with the people who think through, design and build your project."}</p>
        </div>
        <div className={styles.heroFoot}><span className="mono">{locale === "es" ? "Dos personas, un mismo estudio." : "Two people, one studio."}</span><span className="mono">{locale === "es" ? "Diseño · desarrollo · proyectos reales" : "Design · development · real projects"}</span></div>
      </section>

      {/* ── Cinta de capacidades (acelera con el scroll) ── */}
      <CapabilitiesTicker locale={locale} />

      {/* ── Rafa y Luca ── */}
      <section className={styles.team} aria-label={content.people}>
        <div className={styles.people}>{siteConfig.team.map((person, index) => <StudioPerson key={person.name} person={person} number={index + 1} locale={locale} />)}</div>
      </section>

      {/* ── Principios: tarjetas con brillo que sigue al cursor ── */}
      <section className={styles.principles} aria-label={locale === "es" ? "Principios del estudio" : "Studio principles"}>
        <header className={styles.principlesHeader} data-reveal-group>
          <p className="mono" data-reveal-item>{locale === "es" ? "Cómo pensamos" : "How we think"}</p>
          <h2 className="display" data-reveal-item>{locale === "es" ? "Lo que guía cada proyecto." : "What guides every project."}</h2>
        </header>
        <div className={styles.principlesGrid} data-reveal-group>
          {principles[locale].map((principle, index) => (
            <article className={styles.principle} key={principle.title} data-reveal-item data-glow>
              <span className={styles.principleGlow} aria-hidden="true" />
              <Aura className={styles.principleAura} variant="accent" intensity="soft" position="bottom-right" />
              <span className={`${styles.principleLabel} mono`}>{locale === "es" ? "Principio" : "Principle"} 0{index + 1}</span>
              <div>
                <h3 className="display">{principle.title}</h3>
                <p>{principle.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── Tecnología: para quien quiere conocer cómo lo construimos ── */}
      <TechStack locale={locale} />
    </main>
  );
}
