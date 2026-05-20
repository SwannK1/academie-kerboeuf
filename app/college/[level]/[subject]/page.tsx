import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CollegeSubjectPortal } from "@/components/academy/CollegeSubjectPortal";
import {
  getCollegeSubjectMeta,
  getCollegeSubjectStaticParams,
} from "@/content/college-curriculum";

type PageProps = {
  params: Promise<{ level: string; subject: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getCollegeSubjectStaticParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { level, subject } = await params;
  const meta = getCollegeSubjectMeta(level, subject);
  if (!meta) return { title: "Matière introuvable | Académie Kerboeuf" };
  return {
    title: `${meta.label} — ${level} | Académie Kerboeuf`,
    description: meta.description,
  };
}

export default async function CollegeSubjectPage({ params }: PageProps) {
  const { level, subject } = await params;
  const meta = getCollegeSubjectMeta(level, subject);
  if (!meta) notFound();

  const levelHref = `/college/${level}`;

  return (
    <CollegeSubjectPortal
      breadcrumbItems={[
        { label: "Accueil", href: "/" },
        { label: "Collège", href: "/college" },
        { label: level, href: levelHref },
        { label: meta.label },
      ]}
      cycleLabel={meta.cycleLabel}
      subjectLabel={meta.label}
      subtitle={meta.subtitle}
      description={meta.description}
      domainsHeading={meta.domainsHeading}
      subdomains={meta.subdomains}
      levelHref={levelHref}
      levelLabel={`Explorer le niveau ${level}`}
    />
  );
}
