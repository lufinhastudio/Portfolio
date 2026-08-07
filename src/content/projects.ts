import type { Locale, LocalizedProject, Project, ProjectCopy } from "@/types/project";

const copy = (es: ProjectCopy, en: ProjectCopy) => ({ es, en });

export const projects: Project[] = [
  {
    slug: "mayma-bikinis", index: "01", name: "Mayma", client: "Mayma Bikinis", year: "2026",
    url: "https://www.maymabikinis.com.ar/", featured: true,
    palette: { background: "#315757", foreground: "#fffdf9", accent: "#f0a298", muted: "#b8d9d5" },
    cover: { src: "/work/mayma/cover.png", alt: "Bikini verde de Mayma flotando sobre el agua", width: 1920, height: 840 },
    gallery: [
      { src: "/work/mayma/customizer.jpg", alt: "Bikini azul presentado en el personalizador Mayma", width: 1080, height: 1350 },
      { src: "/work/mayma/product-04.jpg", alt: "Enteriza Mayma en una escena de verano", width: 1080, height: 1350 },
      { src: "/work/mayma/detail.jpg", alt: "Detalle textil de un bikini Mayma", width: 900, height: 1600 },
    ],
    copy: copy(
      {
        category: "Fashion / Swimwear / Ecommerce",
        description: "Una tienda solar y táctil para elegir, combinar y personalizar bikinis sin perder la calidez de la marca.",
        services: ["Dirección digital", "UX / UI", "Ecommerce", "Personalizador de producto"],
        caseStudy: {
          statement: "El verano como interfaz: liviano, combinable y siempre en movimiento.",
          challenge: "Mayma necesitaba vender productos con múltiples combinaciones de talle, color y modelo sin convertir la compra en un formulario frío.",
          approach: "Construimos una experiencia visual donde catálogo y personalización conviven. La jerarquía editorial mantiene el producto al frente y la interfaz acompaña con decisiones claras.",
          highlights: [
            { title: "Catálogo flexible", text: "Variantes, stock y colecciones se presentan sin perder ritmo visual." },
            { title: "Personalización", text: "Corpiños y bombachas pueden combinarse desde una experiencia guiada." },
            { title: "Identidad en movimiento", text: "Agua, coral y verde profundo traducen la energía de la marca." },
          ],
          outcome: "Una tienda cercana, expresiva y preparada para crecer con nuevas colecciones.",
        },
      },
      {
        category: "Fashion / Swimwear / Ecommerce",
        description: "A bright, tactile store for choosing, matching and customising swimwear without losing the brand's warmth.",
        services: ["Digital direction", "UX / UI", "Ecommerce", "Product customiser"],
        caseStudy: {
          statement: "Summer as an interface: light, flexible and always in motion.",
          challenge: "Mayma needed to sell products with multiple size, colour and model combinations without turning the purchase into a cold form.",
          approach: "We built a visual experience where catalogue and customisation coexist. Editorial hierarchy keeps the product forward while the interface supports clear choices.",
          highlights: [
            { title: "Flexible catalogue", text: "Variants, stock and collections keep their visual rhythm." },
            { title: "Customisation", text: "Tops and bottoms can be matched through a guided experience." },
            { title: "Identity in motion", text: "Water, coral and deep green translate the brand's energy." },
          ],
          outcome: "A warm, expressive store ready to grow with every new collection.",
        },
      },
    ),
  },
  {
    slug: "cosas-de-casa", index: "02", name: "Cosas de Casa", client: "Cosas de Casa Juguetería", year: "2026",
    url: "https://www.cosasdecasajugueteria.com.ar/", featured: true,
    palette: { background: "#f7c9d8", foreground: "#4c4145", accent: "#c6f0de", muted: "#fff9f4" },
    cover: { src: "/work/cosas-de-casa/cover.png", alt: "Casa de muñecas y juguetes de Cosas de Casa", width: 2048, height: 1024 },
    gallery: [
      { src: "/work/cosas-de-casa/category-wood.jpeg", alt: "Casa de muñecas de madera de Cosas de Casa", width: 800, height: 1067 },
      { src: "/work/cosas-de-casa/category-tiny.jpeg", alt: "Pequeños juguetes de colores de Cosas de Casa", width: 1200, height: 800 },
      { src: "/work/cosas-de-casa/detail.jpeg", alt: "El local de Cosas de Casa", width: 1164, height: 2048 },
    ],
    copy: copy(
      {
        category: "Deco / Home / Juguetería / Ecommerce",
        description: "Una juguetería boutique convertida en casa digital: amable, ordenada y llena de pequeños descubrimientos.",
        services: ["Estrategia de contenido", "UX / UI", "Catálogo", "Consulta por WhatsApp"],
        caseStudy: {
          statement: "Una tienda que conserva la sensación de entrar, mirar y encontrar algo especial.",
          challenge: "La variedad era parte del encanto, pero necesitaba una estructura capaz de ordenar categorías y productos sin perder el tono humano del local.",
          approach: "Usamos la idea de casa como sistema de navegación. Los mundos de producto funcionan como habitaciones y el recorrido termina en una consulta simple.",
          highlights: [
            { title: "Mundos, no filtros", text: "Las categorías hablan el lenguaje de la tienda y facilitan explorar." },
            { title: "Consulta cuidada", text: "El carrito organiza productos antes de abrir una conversación real." },
            { title: "Historia visible", text: "La historia de la tienda suma confianza sin volverse corporativa." },
          ],
          outcome: "Una experiencia cálida y navegable que lleva el carácter boutique a cualquier pantalla.",
        },
      },
      {
        category: "Deco / Home / Toys / Ecommerce",
        description: "A boutique toy shop turned into a digital home: warm, organised and full of small discoveries.",
        services: ["Content strategy", "UX / UI", "Catalogue", "WhatsApp enquiry"],
        caseStudy: {
          statement: "A shop that keeps the feeling of stepping in, looking around and finding something special.",
          challenge: "Variety was part of its charm, but it needed a structure that could organise categories and products without losing the shop's human tone.",
          approach: "We used the idea of a home as a navigation system. Product worlds become rooms and the journey ends in a simple conversation.",
          highlights: [
            { title: "Worlds, not filters", text: "Categories speak the shop's language and make exploration easier." },
            { title: "Considered enquiry", text: "The cart organises products before opening a real conversation." },
            { title: "A visible story", text: "The shop's story builds trust without becoming corporate." },
          ],
          outcome: "A warm, navigable experience that carries the boutique character to every screen.",
        },
      },
    ),
  },
  {
    slug: "xeneize-regaleria", index: "03", name: "Xeneize", client: "Xeneize Regalería", year: "2026",
    url: "https://www.xeneizeregaleria.com.ar/", featured: true,
    palette: { background: "#fc2daf", foreground: "#18121d", accent: "#ffd666", muted: "#fff7fb" },
    cover: { src: "/work/xeneize/cover.jpg", alt: "Caja de regalo rosa con cinta dorada", width: 1600, height: 1067 },
    gallery: [
      { src: "/work/xeneize/logo-black.png", alt: "Wordmark de Xeneize Regalería", width: 1000, height: 1000 },
    ],
    copy: copy(
      {
        category: "Ecommerce / Regalería",
        description: "Una experiencia comercial directa y luminosa para encontrar regalos, comprar rápido y gestionar el negocio con autonomía.",
        services: ["UX / UI", "Desarrollo ecommerce", "Pagos", "Operación y catálogo"],
        caseStudy: {
          statement: "Regalar debería sentirse fácil antes, durante y después de elegir.",
          challenge: "El catálogo necesitaba convivir con stock, variantes, pagos y operación diaria sin hacer visible la complejidad detrás de escena.",
          approach: "Diseñamos un recorrido comercial franco: descubrimiento, producto, carrito y pago. El rosa funciona como señal, no como decoración constante.",
          highlights: [
            { title: "Compra directa", text: "Menos fricción entre encontrar un producto y completar el pago." },
            { title: "Catálogo vivo", text: "Stock, variantes y ofertas se administran para el día a día." },
            { title: "Marca reconocible", text: "Tipografía editorial y color intenso convierten cada pantalla en Xeneize." },
          ],
          outcome: "Un ecommerce con personalidad que ordena la operación y mantiene la compra simple.",
        },
      },
      {
        category: "Ecommerce / Gifts",
        description: "A direct, bright commercial experience for finding gifts, buying quickly and running the business independently.",
        services: ["UX / UI", "Ecommerce development", "Payments", "Operations and catalogue"],
        caseStudy: {
          statement: "Giving should feel easy before, during and after choosing.",
          challenge: "The catalogue needed to coexist with stock, variants, payments and daily operations without exposing the complexity behind it.",
          approach: "We designed a direct commercial path: discovery, product, cart and payment. Pink works as a signal rather than constant decoration.",
          highlights: [
            { title: "Direct purchase", text: "Less friction between finding a product and completing payment." },
            { title: "Living catalogue", text: "Stock, variants and offers are ready for daily operations." },
            { title: "Recognisable brand", text: "Editorial type and intense colour make every screen feel like Xeneize." },
          ],
          outcome: "A distinctive ecommerce that organises operations while keeping the purchase simple.",
        },
      },
    ),
  },
  {
    slug: "santa-dominga", index: "04", name: "Santa Dominga", client: "Estancia Santa Dominga", year: "2026",
    url: "https://arroz2.vercel.app/es#home", featured: true,
    palette: { background: "#173b28", foreground: "#f4ead4", accent: "#bfa36a", muted: "#b9c7b0" },
    cover: { src: "/work/santa-dominga/cover.webp", alt: "Cultivo de arroz de Santa Dominga en Entre Ríos", width: 1200, height: 1600, position: "center 58%" },
    gallery: [
      { src: "/work/santa-dominga/origin.webp", alt: "Arroz de Santa Dominga sostenido frente al campo", width: 960, height: 1280 },
      { src: "/work/santa-dominga/product.webp", alt: "Paquete de arroz orgánico Santa Dominga", width: 720, height: 1200 },
      { src: "/work/santa-dominga/landscape.webp", alt: "Paisaje productivo de Santa Dominga", width: 960, height: 1280 },
    ],
    copy: copy(
      {
        category: "Brand website / Producto / Multilingual",
        description: "Origen, trazabilidad y calidad de exportación contados desde el paisaje productivo de Entre Ríos.",
        services: ["Dirección digital", "Storytelling", "Desarrollo Next.js", "Multilenguaje"],
        caseStudy: {
          statement: "Una historia de origen que se lee igual de bien en el campo y en un mercado internacional.",
          challenge: "La propuesta debía presentar producción, certificaciones y oferta comercial a públicos diferentes sin fragmentar la identidad.",
          approach: "El paisaje funciona como hilo narrativo. La información técnica aparece cuando aporta confianza, con una arquitectura multilingüe para compradores internacionales.",
          highlights: [
            { title: "Origen primero", text: "La geografía y el proceso productivo construyen credibilidad desde el inicio." },
            { title: "Información precisa", text: "Productos y certificaciones se explican con jerarquía, sin ruido." },
            { title: "Tres idiomas", text: "Español, inglés y portugués comparten estructura y tono." },
          ],
          outcome: "Una presencia institucional serena capaz de hablar de territorio, producto y exportación en un solo recorrido.",
        },
      },
      {
        category: "Brand website / Product / Multilingual",
        description: "Origin, traceability and export quality told through the productive landscape of Entre Ríos.",
        services: ["Digital direction", "Storytelling", "Next.js development", "Multilingual"],
        caseStudy: {
          statement: "An origin story that reads just as well in the field as in an international market.",
          challenge: "The website had to present production, certifications and commercial offer to different audiences without fragmenting the identity.",
          approach: "The landscape is the narrative thread. Technical information appears where it builds trust, within a multilingual architecture for international buyers.",
          highlights: [
            { title: "Origin first", text: "Geography and production build credibility from the start." },
            { title: "Precise information", text: "Products and certifications are explained with hierarchy and no noise." },
            { title: "Three languages", text: "Spanish, English and Portuguese share structure and tone." },
          ],
          outcome: "A calm institutional presence that connects territory, product and export in one journey.",
        },
      },
    ),
  },
  {
    slug: "uruguai-yerba-mate", index: "05", name: "Uruguaí", client: "Uruguaí Yerba Mate", year: "2026",
    url: "https://yerbamateuruguai.com/", featured: true,
    palette: { background: "#394736", foreground: "#f7f1e2", accent: "#b99655", muted: "#c7c6a6" },
    cover: { src: "/work/uruguai/cover.jpg", alt: "Mate Uruguaí durante el ritual compartido", width: 1067, height: 1600, position: "center 62%" },
    gallery: [
      { src: "/work/uruguai/variety.webp", alt: "Paquete de yerba mate Uruguaí Tradicional", width: 800, height: 1000 },
      { src: "/work/uruguai/product.webp", alt: "Paquete de yerba mate Uruguaí Premium", width: 640, height: 1160 },
      { src: "/work/uruguai/gran-oro.png", alt: "Reconocimiento Gran Oro de Uruguaí", width: 1000, height: 1000 },
    ],
    copy: copy(
      {
        category: "Brand website / Yerba mate",
        description: "Una marca entrerriana de padrón uruguayo presentada desde el ritual, el producto y una calidad reconocida.",
        services: ["UX / UI", "Creative development", "Catálogo", "Contenido editorial"],
        caseStudy: {
          statement: "Del origen al mate: una identidad digital construida alrededor de un ritual compartido.",
          challenge: "Uruguaí tenía producto, historia y reconocimiento; el sitio debía reunirlos y facilitar el descubrimiento de variedades y el contacto comercial.",
          approach: "Llevamos los códigos del paquete —verde, oro y geometría— a una narrativa pausada, con producto protagonista y contenido sobre el padrón uruguayo.",
          highlights: [
            { title: "Familia de producto", text: "Variedades y presentaciones se comparan con claridad visual." },
            { title: "Calidad demostrada", text: "El reconocimiento Gran Oro y el proceso aparecen como evidencia." },
            { title: "Contenido que perdura", text: "Novedades y distribuidores extienden la utilidad del sitio." },
          ],
          outcome: "Un sitio con el peso de la marca y la calidez del ritual, útil para consumidores y distribuidores.",
        },
      },
      {
        category: "Brand website / Yerba mate",
        description: "An Entre Ríos brand with a Uruguayan profile, presented through ritual, product and recognised quality.",
        services: ["UX / UI", "Creative development", "Catalogue", "Editorial content"],
        caseStudy: {
          statement: "From origin to mate: a digital identity built around a shared ritual.",
          challenge: "Uruguaí had product, story and recognition; the site needed to bring them together and make varieties and commercial contact easy to discover.",
          approach: "We translated the package codes —green, gold and geometry— into a calm narrative with the product and Uruguayan profile at its core.",
          highlights: [
            { title: "Product family", text: "Varieties and formats compare with visual clarity." },
            { title: "Proven quality", text: "The Gran Oro award and the process appear as evidence." },
            { title: "Lasting content", text: "News and distributors extend the site's usefulness." },
          ],
          outcome: "A site with the brand's weight and the ritual's warmth, useful to consumers and distributors.",
        },
      },
    ),
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getLocalizedProject(project: Project, locale: Locale): LocalizedProject {
  const { copy: translations, ...base } = project;
  return { ...base, ...translations[locale] };
}

export function getLocalizedProjects(locale: Locale) {
  return projects.map((project) => getLocalizedProject(project, locale));
}
