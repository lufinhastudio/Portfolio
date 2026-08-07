import { StudioPage } from "@/components/studio/StudioPage";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/metadata";
export const metadata = createMetadata({ title: "Estudio", description: `Lufinha es un estudio digital independiente de ${siteConfig.team.map((person) => person.name).join(" y ")}.`, path: "/studio", locale: "es" });
export default function StudioRoute() { return <StudioPage locale="es" />; }
