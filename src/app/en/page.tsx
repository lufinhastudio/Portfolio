import { Hero } from "@/components/home/Hero";
import { Manifesto } from "@/components/home/Manifesto";
import { SelectedWork } from "@/components/home/SelectedWork";
import { InterfaceInterlude } from "@/components/home/InterfaceInterlude";
import { StudioStatement } from "@/components/home/StudioStatement";
import { StudioPreview } from "@/components/home/StudioPreview";
import { getLocalizedProjects } from "@/content";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({ locale: "en", path: "/en" });

export default function EnglishHomePage() {
  const projects = getLocalizedProjects("en");
  return <main lang="en"><Hero locale="en" projects={projects} /><Manifesto locale="en" /><SelectedWork locale="en" projects={projects} /><InterfaceInterlude locale="en" /><StudioStatement locale="en" /><StudioPreview locale="en" /></main>;
}
