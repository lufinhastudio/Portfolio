import { ContactPage } from "@/components/contact/ContactPage";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({ title: "Contacto", description: "Contanos tu proyecto de software, sistema o solución digital a medida. Hablemos de cómo hacerlo realidad.", path: "/contacto", locale: "es" });

export default function ContactRoute() { return <ContactPage locale="es" />; }
