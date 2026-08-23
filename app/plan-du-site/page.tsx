import { buildPageMetadata } from "@/content/seo";
import Link from "next/link";

import { LegalPageLayout, LegalSection } from "@/components/academy/LegalPageLayout";
import sitemap from "@/app/sitemap";
import { legalNavigationItems, mainNavigationItems } from "@/content/navigation";

export const metadata = buildPageMetadata({
  title: "Plan du site",
  description:
    "Plan du site généré depuis les routes publiques déclarées dans le sitemap de l’Académie Kerboeuf.",
  path: "/plan-du-site",
});

const knownLabels = new Map<string, string>();

for (const item of [...mainNavigationItems, ...legalNavigationItems]) {
  knownLabels.set(item.href, item.label);
}

const sectionLabels = new Map([
  ["pages-principales", "Pages principales"],
  ["maternelle", "Maternelle"],
  ["primaire", "Primaire"],
  ["college", "Collège"],
  ["lycee", "Lycée"],
  ["enseignants", "Enseignants"],
  ["ressources", "Ressources prêtes"],
  ["univers", "Univers"],
  ["personnages", "Personnages"],
  ["parcours", "Parcours"],
  ["legal", "Informations légales"],
]);

function pathFromUrl(url: string | URL) {
  return new URL(url).pathname;
}

function formatSegment(segment: string) {
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function labelForPath(pathname: string) {
  const knownLabel = knownLabels.get(pathname);
  if (knownLabel) return knownLabel;
  if (pathname === "/") return "Accueil";

  const segments = pathname.split("/").filter(Boolean);
  return segments.map(formatSegment).join(" / ");
}

function sectionForPath(pathname: string) {
  if (
    legalNavigationItems.some((item) => item.href === pathname)
  ) {
    return "legal";
  }

  const firstSegment = pathname.split("/").filter(Boolean)[0];
  return firstSegment ?? "pages-principales";
}

export default function SiteMapPage() {
  const sitemapEntries = sitemap();
  const groupedRoutes = sitemapEntries.reduce<Record<string, string[]>>(
    (groups, entry) => {
      const pathname = pathFromUrl(entry.url);
      const section = sectionForPath(pathname);

      return {
        ...groups,
        [section]: [...(groups[section] ?? []), pathname],
      };
    },
    {},
  );

  const sections = Array.from(sectionLabels.entries())
    .map(([key, label]) => ({
      key,
      label,
      routes: [...(groupedRoutes[key] ?? [])].sort((a, b) => a.localeCompare(b)),
    }))
    .filter((section) => section.routes.length > 0);

  return (
    <LegalPageLayout
      eyebrow="Navigation"
      title="Plan du site"
      description="Cette page reprend les routes publiques déclarées dans le sitemap technique du site."
    >
      {sections.map((section) => (
        <LegalSection key={section.key} title={section.label}>
          <div className="grid gap-2 sm:grid-cols-2">
            {section.routes.map((pathname) => (
              <Link
                key={pathname}
                href={pathname}
                className="rounded-md border border-white/10 bg-white/[0.035] px-4 py-3 font-semibold text-muted transition hover:border-gold/40 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                {labelForPath(pathname)}
              </Link>
            ))}
          </div>
        </LegalSection>
      ))}
    </LegalPageLayout>
  );
}
