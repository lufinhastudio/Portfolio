import { Hero } from "@/components/home/Hero";
import { Manifesto } from "@/components/home/Manifesto";
import { SelectedWork } from "@/components/home/SelectedWork";
import { InterfaceInterlude } from "@/components/home/InterfaceInterlude";
import { StudioStatement } from "@/components/home/StudioStatement";
import { StudioPreview } from "@/components/home/StudioPreview";
import { getLocalizedProjects } from "@/content";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({ locale: "es" });

export default function HomePage() {
  const projects = getLocalizedProjects("es");
  return <main><Hero locale="es" projects={projects} /><Manifesto locale="es" /><SelectedWork locale="es" projects={projects} /><InterfaceInterlude locale="es" /><StudioStatement locale="es" /><StudioPreview locale="es" /></main>;
}
