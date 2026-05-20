import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CollegeDomainPage } from "@/components/academy/CollegeDomainPage";
import {
  getCollegeDomainMeta,
  getCollegeDomainStaticParams,
} from "@/content/college-curriculum";

type PageProps = {
  params: Promise<{ level: string; subject: string; domain: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getCollegeDomainStaticParams();
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { level, subject, domain } = await params;
  const meta = getCollegeDomainMeta(level, subject, domain);

  if (!meta) {
    return { title: "Domaine introuvable | Académie Kerboeuf" };
  }

  return {
    title: `${meta.domainLabel} — ${meta.subjectLabel} ${meta.level} | Académie Kerboeuf`,
    description: meta.description,
  };
}

export default async function CollegeDomainRoutePage({ params }: PageProps) {
  const { level, subject, domain } = await params;
  const meta = getCollegeDomainMeta(level, subject, domain);

  if (!meta) {
    notFound();
  }

  return (
    <CollegeDomainPage
      breadcrumbItems={[
        { label: "Accueil", href: "/" },
        { label: "Collège", href: "/college" },
        { label: meta.level, href: meta.levelHref },
        { label: meta.subjectLabel, href: meta.backHref },
        { label: meta.domainLabel },
      ]}
      cycleLabel={meta.cycleLabel}
      domainLabel={meta.domainLabel}
      officialRef={meta.officialRef}
      description={meta.description}
      status={meta.status}
      entries={meta.entries}
      backHref={meta.backHref}
      backLabel={meta.backLabel}
      levelHref={meta.levelHref}
      levelLabel={meta.levelLabel}
      subjectLabel={`${meta.subjectLabel} ${meta.level}`}
    />
  );
}
