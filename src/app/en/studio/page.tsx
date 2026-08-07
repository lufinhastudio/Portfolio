import { StudioPage } from "@/components/studio/StudioPage";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/metadata";
export const metadata = createMetadata({ title: "Studio", description: `Lufinha is an independent digital studio by ${siteConfig.team.map((person) => person.name).join(" and ")}.`, path: "/en/studio", locale: "en" });
export default function EnglishStudioRoute() { return <StudioPage locale="en" />; }
