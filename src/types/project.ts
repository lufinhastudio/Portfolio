export type Locale = "es" | "en";

export type ProjectPalette = {
  background: string;
  foreground: string;
  accent: string;
  muted: string;
};

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  position?: string;
};

export type ProjectBrandLogo = ProjectImage & {
  contrast: "light" | "dark";
};

export type ResponsiveProjectImage = {
  desktop: ProjectImage;
  mobile: ProjectImage;
  caption?: string;
  treatment?: "primary" | "supporting";
};

export type ProjectHighlight = {
  title: string;
  text: string;
};

export type ProductCaseStudySection = {
  eyebrow: string;
  title: string;
  text: string;
  image?: ProjectImage;
  images?: ProjectImage[];
  responsiveImages?: ResponsiveProjectImage[];
  caption?: string;
  points?: string[];
  layout?: "split" | "wide";
};

export type ProductCaseStudyLink = {
  label: string;
  href: string;
};

export type ProductCaseStudy = {
  heroImage?: ProjectImage;
  heroMedia?: ResponsiveProjectImage;
  presentation?: "default" | "product-led";
  /** Frase corta y grande del hero (la idea en una línea). */
  headline?: string;
  lead: string;
  role: string;
  challengeTitle: string;
  challenge: string;
  sections: ProductCaseStudySection[];
  modulesLabel: string;
  modules: string[];
  technologyLabel: string;
  technologies: string[];
  closing: string;
  links?: ProductCaseStudyLink[];
  cta?: ProductCaseStudyLink;
};

export type ProjectCopy = {
  category: string;
  description: string;
  services: string[];
  productCaseStudy?: ProductCaseStudy;
  caseStudy?: {
    statement: string;
    challenge: string;
    approach: string;
    highlights: ProjectHighlight[];
    outcome: string;
  };
};

export type Project = {
  slug: string;
  index: string;
  name: string;
  client: string;
  year: string;
  url?: string;
  previewOnly?: boolean;
  palette: ProjectPalette;
  brandLogo?: ProjectBrandLogo;
  cover: ProjectImage;
  gallery: ProjectImage[];
  featured: boolean;
  copy: Record<Locale, ProjectCopy>;
};

export type LocalizedProject = Omit<Project, "copy"> & ProjectCopy;
