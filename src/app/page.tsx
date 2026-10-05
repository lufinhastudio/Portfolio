import { Hero } from "@/components/home/Hero";
import { SelectedWork } from "@/components/home/SelectedWork";
import { StudioPreview } from "@/components/home/StudioPreview";
import { Services } from "@/components/home/Services";
import { ProcessSteps } from "@/components/studio/ProcessSteps";
import { getLocalizedProjects } from "@/content";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({ locale: "es" });

export default function HomePage() {
  const projects = getLocalizedProjects("es");
  return (
    <main>
      <Hero locale="es" />
      <SelectedWork locale="es" projects={projects} />
      <Services locale="es" />
      <StudioPreview locale="es" />
      {/* Último paso antes del footer: cómo sería trabajar juntos */}
      <ProcessSteps locale="es" compact />
    </main>
  );
}
