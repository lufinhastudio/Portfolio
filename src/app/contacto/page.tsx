import { ContactPage } from "@/components/contact/ContactPage";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({ title: "Contacto", description: "¿Necesitás una página web, una tienda online o un sistema a medida? Contanos tu proyecto y te respondemos personalmente.", path: "/contacto", locale: "es" });

export default function ContactRoute() { return <ContactPage locale="es" />; }
