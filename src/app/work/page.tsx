import { WorkIndex } from "@/components/work/WorkIndex";
import { createMetadata } from "@/lib/metadata";
export const metadata = createMetadata({ title: "Trabajo seleccionado", description: "Ecommerce, sitios de marca y experiencias digitales diseñadas y desarrolladas por Lufinha Studio.", path: "/work", locale: "es" });
export default function WorkPage() { return <WorkIndex locale="es" />; }
