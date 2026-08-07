import { localePath } from "@/config/site";
import { getStudioContent } from "./studio";
import type { Locale } from "@/types/project";

export function getNavigation(locale: Locale) {
  const labels = getStudioContent(locale).navigation;
  return [
    { label: labels.home, href: localePath(locale, "/") },
    { label: labels.work, href: localePath(locale, "/work") },
    { label: labels.studio, href: localePath(locale, "/studio") },
    { label: labels.contact, href: `${localePath(locale, "/")}#contact` },
  ];
}
