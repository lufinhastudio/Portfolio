import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductCaseStudy } from "@/components/work/ProductCaseStudy";
import { getLocalizedProject, getProject, projects } from "@/content";
import { createMetadata } from "@/lib/metadata";
type ProjectPageProps = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return projects.filter((project) => !project.previewOnly).map((project) => ({ slug: project.slug })); }
export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> { const project = getProject((await params).slug); if (!project || project.previewOnly) return {}; const local = getLocalizedProject(project, "es"); return createMetadata({ title: local.client, description: local.description, path: `/work/${local.slug}`, image: local.cover.src, locale: "es" }); }
export default async function ProjectPage({ params }: ProjectPageProps) { const project = getProject((await params).slug); if (!project || project.previewOnly) notFound(); const local = getLocalizedProject(project, "es"); if (!local.productCaseStudy) notFound(); return <ProductCaseStudy project={local} locale="es" />; }
