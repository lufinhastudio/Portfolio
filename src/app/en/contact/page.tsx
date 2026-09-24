import { ContactPage } from "@/components/contact/ContactPage";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({ title: "Contact", description: "Tell us about your custom software, systems or digital solution project. Let's discuss how to make it real.", path: "/en/contact", locale: "en" });

export default function EnglishContactRoute() { return <ContactPage locale="en" />; }
