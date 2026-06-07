import { permanentRedirect } from "next/navigation";
import { getAllProfessorSlugs } from "@/content/professors";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProfessorSlugs();
}

export default async function ProfesseurRedirectPage({ params }: PageProps) {
  const { slug } = await params;
  permanentRedirect(`/univers/personnages/${slug}`);
}
