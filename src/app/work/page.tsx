import { WorkIndex } from "@/components/work/WorkIndex";
import { createMetadata } from "@/lib/metadata";
export const metadata = createMetadata({ title: "Trabajo seleccionado", description: "Tiendas online, páginas web y sistemas que diseñamos y desarrollamos en Lufinha Studio.", path: "/work", locale: "es" });
export default function WorkPage() { return <WorkIndex locale="es" />; }
