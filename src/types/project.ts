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

export type ProjectHighlight = {
  title: string;
  text: string;
};

export type ProjectCopy = {
  category: string;
  description: string;
  services: string[];
  caseStudy: {
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
  url: string;
  palette: ProjectPalette;
  cover: ProjectImage;
  gallery: ProjectImage[];
  featured: boolean;
  copy: Record<Locale, ProjectCopy>;
};

export type LocalizedProject = Omit<Project, "copy"> & ProjectCopy;
