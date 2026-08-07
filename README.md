# Lufinha Studio

Portfolio content-driven para Lufinha Studio, construido con Next.js, TypeScript y GSAP.

## Contenido editable

- `src/config/site.ts`: identidad global, contacto, idiomas, equipo, theme y motion.
- `src/content/projects.ts`: proyectos, paletas, assets y case studies.
- `src/content/navigation.ts`: navegación.
- `src/content/social.ts`: enlaces sociales.
- `src/content/studio.ts`: copy institucional.

Agregar un proyecto requiere sumar sus assets en `public/work/<slug>`, agregar un objeto tipado a `projects.ts` y volver a construir. La ruta, metadata, sitemap, listado, home y navegación entre case studies se generan automáticamente.

## Desarrollo

```bash
npm install
npm run dev
```

La URL canónica se configura con `NEXT_PUBLIC_SITE_URL`; el fallback es `https://lufinha.studio`.
