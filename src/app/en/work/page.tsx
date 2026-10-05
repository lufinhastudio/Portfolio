import { WorkIndex } from "@/components/work/WorkIndex";
import { createMetadata } from "@/lib/metadata";
export const metadata = createMetadata({ title: "Selected work", description: "Online stores, websites and systems designed and built by Lufinha Studio.", path: "/en/work", locale: "en" });
export default function EnglishWorkPage() { return <WorkIndex locale="en" />; }
