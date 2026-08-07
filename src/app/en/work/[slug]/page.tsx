import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudy } from "@/components/work/CaseStudy";
import { getLocalizedProject, getProject, projects } from "@/content";
import { createMetadata } from "@/lib/metadata";
type ProjectPageProps = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return projects.map((project) => ({ slug: project.slug })); }
export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> { const project = getProject((await params).slug); if (!project) return {}; const local = getLocalizedProject(project, "en"); return createMetadata({ title: local.client, description: local.description, path: `/en/work/${local.slug}`, image: local.cover.src, locale: "en" }); }
export default async function EnglishProjectPage({ params }: ProjectPageProps) { const project = getProject((await params).slug); if (!project) notFound(); return <CaseStudy project={getLocalizedProject(project, "en")} locale="en" />; }
