import { ContactPage } from "@/components/contact/ContactPage";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({ title: "Contact", description: "Need a website, an online store or a custom system? Tell us about your project and we'll reply personally.", path: "/en/contact", locale: "en" });

export default function EnglishContactRoute() { return <ContactPage locale="en" />; }
