import { Hero } from "@/components/home/Hero";
import { SelectedWork } from "@/components/home/SelectedWork";
import { StudioPreview } from "@/components/home/StudioPreview";
import { Services } from "@/components/home/Services";
import { ProcessSteps } from "@/components/studio/ProcessSteps";
import { getLocalizedProjects } from "@/content";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({ locale: "en", path: "/en" });

export default function EnglishHomePage() {
  const projects = getLocalizedProjects("en");
  return (
    <main lang="en">
      <Hero locale="en" />
      <SelectedWork locale="en" projects={projects} />
      <Services locale="en" />
      <StudioPreview locale="en" />
      {/* Último paso antes del footer: cómo sería trabajar juntos */}
      <ProcessSteps locale="en" compact />
    </main>
  );
}
