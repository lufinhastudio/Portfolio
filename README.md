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

El formulario solicita nombre, email y teléfono; empresa/proyecto y mensaje son opcionales. El teléfono se incluye en el correo recibido.

- `RESEND_API_KEY`: clave privada de Resend.
- `RESEND_FROM_EMAIL`: remitente de un dominio verificado en Resend, por ejemplo `Lufinha Studio <hola@tu-dominio.com>`.
- `CONTACT_TO_EMAIL`: destinatario opcional; por defecto, `lufinhastudio@gmail.com`.

La clave se usa únicamente en el servidor. Si falta la configuración, el formulario muestra un error y ofrece el enlace de email directo.

### Si el envío falla

- `503` en `/api/contact`: falta `RESEND_API_KEY` o `RESEND_FROM_EMAIL` en el entorno del despliegue.
- `502` en `/api/contact`: Resend rechazó el envío o no se pudo conectar. Revisá los logs de la función `/api/contact` en Vercel. El registro `Contact form: Resend rejected the request` incluye el código y el mensaje de Resend, sin mostrar la clave al visitante.
- Comprobá que `RESEND_FROM_EMAIL` use un dominio con envío verificado en la misma cuenta de Resend que emitió `RESEND_API_KEY`. `CONTACT_TO_EMAIL` puede ser un Gmail: es el destinatario, no el remitente.
- Si modificás variables en Vercel, verificá que estén asignadas a Production y volvé a desplegar para que el cambio llegue al sitio público.
