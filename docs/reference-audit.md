# Auditoría de referencia: Magic Portfolio

Referencia evaluada: `once-ui-system/magic-portfolio` (rama `main`, agosto de 2026).

## Qué está bien resuelto

- El árbol de rutas de Next separa páginas, APIs, contenido MDX y componentes por dominio.
- `src/resources/content.tsx` concentra identidad personal, navegación implícita y copy de páginas.
- `src/resources/once-ui.config.ts` concentra rutas activas, theme, fuentes, efectos, schema y URL base.
- Los proyectos viven como archivos MDX independientes con frontmatter; el slug sale del nombre de archivo.
- Un único lector de MDX alimenta home, listado de work, rutas estáticas, proyectos relacionados y sitemap.
- `generateStaticParams` y `generateMetadata` derivan rutas y SEO del contenido, evitando duplicación.
- La capa MDX mapea elementos semánticos a componentes reutilizables del sistema visual.
- Los assets siguen una jerarquía predecible bajo `public/images/projects`.
- La configuración de Once UI aporta tokens y responsive consistente sin repartir decisiones globales.

## Límites detectados

- El esquema de metadata de los proyectos es flexible pero no tiene validación runtime.
- Contenido global y fragmentos React conviven en un archivo grande, lo que escala peor para un estudio con varios clientes.
- Los case studies comparten una presentación deliberadamente homogénea; Lufinha necesita que cada identidad tome el control de color, ritmo e imagen.
- La UI y los patrones visuales dependen del paquete Once UI. No corresponde trasladarlos a una dirección artística propia.
- La licencia del repositorio es CC BY-NC 4.0: requiere atribución y no permite uso comercial. Por eso no se reutilizó código ni componentes.

## Decisiones trasladadas a Lufinha

- Una sola fuente de verdad para cada proyecto.
- Configuración global separada de contenido editorial.
- Rutas dinámicas, metadata, structured data, sitemap y relación “siguiente proyecto” derivados automáticamente.
- Assets organizados por slug.
- Componentes reutilizables que reciben contenido tipado.
- El alta de un proyecto se limita a assets más un objeto en `projects.ts`.

## Decisiones propias

- Se eligió TypeScript data en lugar de MDX. Los cinco case studies comparten tipos de contenido, pero requieren composiciones visuales más controladas que un documento de prosa.
- La identidad de proyecto se modela como paleta y media propias, aplicadas por CSS custom properties.
- La animación está aislada en un provider y respeta `prefers-reduced-motion`.
- La home usa escenas a pantalla completa, no una grilla de cards.
- El sistema visual de Lufinha se basa en tipografía variable, una base neutral y “project takeovers” cromáticos.

## Mapa de mantenimiento

| Necesidad | Archivo |
| --- | --- |
| Nombre, contacto, equipo, idiomas, theme, motion, SEO | `src/config/site.ts` |
| Proyectos, URLs, años, servicios, paletas, case studies | `src/content/projects.ts` |
| Copy del estudio y servicios | `src/content/studio.ts` |
| Navegación | `src/content/navigation.ts` |
| Links sociales | `src/content/social.ts` |
| Assets | `public/work/<slug>/` |
