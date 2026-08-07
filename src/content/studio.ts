import type { Locale } from "@/types/project";

export const studioContent = {
  es: {
    navigation: { home: "Inicio", work: "Trabajo", studio: "Estudio", contact: "Contacto", menu: "Menú", close: "Cerrar" },
    hero: {
      eyebrow: "Creative development · Ecommerce · Digital experiences",
      description: "Diseñamos y desarrollamos productos digitales donde la identidad no es una capa: es el sistema.",
      scroll: "Ver el trabajo",
    },
    manifesto: {
      eyebrow: "Nuestra práctica",
      before: "No hacemos sitios para mirar.",
      after: "Construimos sitios para recorrer, elegir y recordar.",
    },
    work: {
      eyebrow: "Trabajo seleccionado / 05",
      title: "Cinco marcas. Cinco formas de moverse.",
      live: "Sitio real",
      open: "Abrir caso",
      visit: "Visitar web",
    },
    interlude: {
      eyebrow: "Más que páginas",
      title: "Catálogos, producto, checkout, contenido y gesto.",
      body: "Diseñamos el sistema completo para que cada interacción siga hablando el idioma de la marca.",
    },
    capabilities: {
      eyebrow: "Lo que hacemos",
      title: "Del primer mapa al último pixel en producción.",
      items: ["Dirección digital", "UX / UI", "Creative development", "Ecommerce", "Motion & interaction", "Sistemas de contenido"],
      stack: "Tecnología que queda detrás de la experiencia",
    },
    studio: {
      eyebrow: "El estudio",
      title: "Dos personas. Una práctica digital cercana.",
      body: "Luca y Rafa forman Lufinha. Trabajamos junto a cada marca desde la estructura y el contenido hasta el desarrollo, la interacción y la salida a producción.",
      people: "Las personas detrás del trabajo",
      profilePending: "Perfil y enlaces editables desde la configuración del estudio.",
    },
    contact: {
      eyebrow: "¿Tenés una idea?",
      title: "Hagamos que exista en la web.",
      cta: "Empezar un proyecto",
      direct: "Contacto directo",
    },
    common: { selectedWork: "Trabajo seleccionado", viewProject: "Ver proyecto", visitSite: "Visitar sitio", next: "Siguiente proyecto", allProjects: "Todos los proyectos" },
  },
  en: {
    navigation: { home: "Home", work: "Work", studio: "Studio", contact: "Contact", menu: "Menu", close: "Close" },
    hero: {
      eyebrow: "Creative development · Ecommerce · Digital experiences",
      description: "We design and build digital products where identity is not a layer: it is the system.",
      scroll: "See the work",
    },
    manifesto: {
      eyebrow: "Our practice",
      before: "We do not make sites to look at.",
      after: "We build sites to explore, choose and remember.",
    },
    work: {
      eyebrow: "Selected work / 05",
      title: "Five brands. Five ways to move.",
      live: "Live website",
      open: "Open case",
      visit: "Visit website",
    },
    interlude: {
      eyebrow: "Beyond pages",
      title: "Catalogues, product, checkout, content and gesture.",
      body: "We design the complete system so every interaction keeps speaking the brand's language.",
    },
    capabilities: {
      eyebrow: "What we do",
      title: "From the first map to the last pixel in production.",
      items: ["Digital direction", "UX / UI", "Creative development", "Ecommerce", "Motion & interaction", "Content systems"],
      stack: "Technology that stays behind the experience",
    },
    studio: {
      eyebrow: "The studio",
      title: "Two people. One close digital practice.",
      body: "Luca and Rafa are Lufinha. We work alongside each brand from structure and content to development, interaction and launch.",
      people: "The people behind the work",
      profilePending: "Profile and links are editable from the central studio configuration.",
    },
    contact: {
      eyebrow: "Have an idea?",
      title: "Let's make it real on the web.",
      cta: "Start a project",
      direct: "Direct contact",
    },
    common: { selectedWork: "Selected work", viewProject: "View project", visitSite: "Visit website", next: "Next project", allProjects: "All projects" },
  },
} satisfies Record<Locale, object>;

export function getStudioContent(locale: Locale) {
  return studioContent[locale];
}
