import { redirect } from "next/navigation";
import { getAllProfessorSlugs } from "@/content/professors";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllProfessorSlugs();
}

export default async function ProfesseurRedirectPage({ params }: PageProps) {
  const { slug } = await params;
  redirect(`/personnages/${slug}`);
}
