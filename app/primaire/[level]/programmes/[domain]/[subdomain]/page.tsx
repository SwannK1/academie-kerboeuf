import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SubdomainResourcePage } from "@/components/academy/subdomain-resource-page";
import { getCe1Domain, getCe1Subdomain } from "@/content/levels/ce1-learning-tree";
import { getCe2Domain, getCe2Subdomain } from "@/content/levels/ce2-learning-tree";
import { getCpDomain, getCpSubdomain } from "@/content/levels/cp-learning-tree";
import {
  getPublishedSubdomainPage,
  publishedSubdomainPages,
  type PublishedPrimaryLevelSlug,
} from "@/content/levels/published-subdomain-pages";
import type { ProgramDomain, ProgramSubdomain } from "@/content/program-types";

type PageProps = {
  params: Promise<{
    level: string;
    domain: string;
    subdomain: string;
  }>;
};

type ResolvedSubdomainPage = {
  levelLabel: string;
  levelHref: string;
  cycleLabel: string;
  domain: ProgramDomain;
  subdomain: ProgramSubdomain;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedSubdomainPages.map((page) => ({
    level: page.level,
    domain: page.domain,
    subdomain: page.subdomain,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { level, domain, subdomain } = await params;
  const resolved = resolvePrimarySubdomainPage(level, domain, subdomain);

  if (!resolved) {
    return {
      title: "Programme introuvable | Académie Kerboeuf",
    };
  }

  return {
    title: `${resolved.subdomain.title} ${resolved.levelLabel} | Académie Kerboeuf`,
    description: resolved.subdomain.description,
  };
}

export default async function PrimaryProgramSubdomainPage({ params }: PageProps) {
  const { level, domain, subdomain } = await params;
  const resolved = resolvePrimarySubdomainPage(level, domain, subdomain);

  if (!resolved) {
    notFound();
  }

  return (
    <SubdomainResourcePage
      breadcrumbItems={[
        { label: "Accueil", href: "/" },
        { label: "Primaire", href: "/primaire" },
        { label: resolved.levelLabel, href: resolved.levelHref },
        { label: resolved.domain.title },
        { label: resolved.subdomain.title },
      ]}
      levelLabel={resolved.levelLabel}
      cycleLabel={resolved.cycleLabel}
      domain={resolved.domain}
      subdomain={resolved.subdomain}
      backHref={resolved.levelHref}
      backLabel={`Retour au ${resolved.levelLabel}`}
    />
  );
}

function resolvePrimarySubdomainPage(
  level: string,
  domainSlug: string,
  subdomainSlug: string,
): ResolvedSubdomainPage | null {
  const publishedPage = getPublishedSubdomainPage(level, domainSlug, subdomainSlug);

  if (!publishedPage) {
    return null;
  }

  switch (publishedPage.level) {
    case "cp":
      return resolveLevelSubdomainPage({
        level: publishedPage.level,
        levelLabel: "CP",
        domainSlug,
        subdomainSlug,
        getDomain: getCpDomain,
        getSubdomain: getCpSubdomain,
      });
    case "ce1":
      return resolveLevelSubdomainPage({
        level: publishedPage.level,
        levelLabel: "CE1",
        domainSlug,
        subdomainSlug,
        getDomain: getCe1Domain,
        getSubdomain: getCe1Subdomain,
      });
    case "ce2":
      return resolveLevelSubdomainPage({
        level: publishedPage.level,
        levelLabel: "CE2",
        domainSlug,
        subdomainSlug,
        getDomain: getCe2Domain,
        getSubdomain: getCe2Subdomain,
      });
  }
}

function getCycleLabelForLevel(level: PublishedPrimaryLevelSlug): string {
  switch (level) {
    case "cp":
    case "ce1":
    case "ce2":
      return "Cycle 2";
  }
}

function resolveLevelSubdomainPage({
  level,
  levelLabel,
  domainSlug,
  subdomainSlug,
  getDomain,
  getSubdomain,
}: {
  level: PublishedPrimaryLevelSlug;
  levelLabel: string;
  domainSlug: string;
  subdomainSlug: string;
  getDomain: (domainSlug: string) => ProgramDomain | undefined;
  getSubdomain: (
    domainSlug: string,
    subdomainSlug: string,
  ) => ProgramSubdomain | undefined;
}): ResolvedSubdomainPage | null {
  const domain = getDomain(domainSlug);
  const subdomain = getSubdomain(domainSlug, subdomainSlug);

  if (!domain || !subdomain) {
    return null;
  }

  return {
    levelLabel,
    levelHref: `/primaire/${level}`,
    cycleLabel: getCycleLabelForLevel(level),
    domain,
    subdomain,
  };
}
