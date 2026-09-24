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

## Formulario de contacto

El formulario en `/contacto` y `/en/contact` envía consultas desde `POST /api/contact` mediante Resend. Configurá estas variables en el entorno de despliegue (ver `.env.example`):

- `RESEND_API_KEY`: clave privada de Resend.
- `RESEND_FROM_EMAIL`: remitente de un dominio verificado en Resend, por ejemplo `Lufinha Studio <hola@tu-dominio.com>`.
- `CONTACT_TO_EMAIL`: destinatario opcional; por defecto, `lufinhastudio@gmail.com`.

La clave se usa únicamente en el servidor. Si falta la configuración, el formulario muestra un error y ofrece el enlace de email directo.
