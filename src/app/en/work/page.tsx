import { WorkIndex } from "@/components/work/WorkIndex";
import { createMetadata } from "@/lib/metadata";
export const metadata = createMetadata({ title: "Selected work", description: "Ecommerce, brand websites and digital experiences designed and developed by Lufinha Studio.", path: "/en/work", locale: "en" });
export default function EnglishWorkPage() { return <WorkIndex locale="en" />; }
