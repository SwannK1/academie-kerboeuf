// Catalogue agrégé pour /admin : assemble les arbres pédagogiques statiques
// (CP, CE1, CE2 — niveaux couverts par published-subdomain-pages.ts) avec la
// couche de surcharges admin (statut, lien, libellé) pour donner une vue
// unique des ressources PDF par leçon.

import { getCpSubdomain } from "@/content/levels/cp-learning-tree";
import { getCe1Subdomain } from "@/content/levels/ce1-learning-tree";
import { getCe2Subdomain } from "@/content/levels/ce2-learning-tree";
import {
  publishedSubdomainPages,
  type PublishedPrimaryLevelSlug,
} from "@/content/levels/published-subdomain-pages";
import { getPedagogicalResourceSlots } from "@/content/pedagogical-resources";
import type { Lesson, ProgramSubdomain } from "@/content/program-types";
import {
  buildResourceId,
  readResourceOverrides,
  type ResourceOverride,
} from "@/lib/admin/resource-store";

export type AdminResourceRow = {
  id: string;
  level: PublishedPrimaryLevelSlug;
  levelLabel: string;
  domainSlug: string;
  domainTitle: string;
  subdomainSlug: string;
  subdomainTitle: string;
  subdomainRoute: string;
  lessonId: string;
  lessonTitle: string;
  competency: string;
  kind: string;
  kindLabel: string;
  baseStatus: string;
  hasRealHref: boolean;
  effectiveStatus: "available" | "in-preparation" | "planned";
  href?: string;
  label?: string;
  durationLabel?: string;
  verified: boolean;
  published: boolean;
  isOverridden: boolean;
  updatedAt?: string;
  updatedBy?: string;
};

const levelLabels: Record<PublishedPrimaryLevelSlug, string> = {
  cp: "CP",
  ce1: "CE1",
  ce2: "CE2",
};

const subdomainGetters: Record<
  PublishedPrimaryLevelSlug,
  (domainSlug: string, subdomainSlug: string) => ProgramSubdomain | undefined
> = {
  cp: getCpSubdomain,
  ce1: getCe1Subdomain,
  ce2: getCe2Subdomain,
};

function mapBaseStatus(status: string): "available" | "in-preparation" | "planned" {
  if (status === "available") return "available";
  if (status === "planned" || status === "upcoming" || status === "missing") return "planned";
  return "in-preparation";
}

function buildRowsForLesson(
  page: (typeof publishedSubdomainPages)[number],
  lesson: Lesson,
  overrides: Record<string, ResourceOverride>,
): AdminResourceRow[] {
  const slots = getPedagogicalResourceSlots(lesson.resources);

  return slots.map((slot) => {
    const resourceId = buildResourceId(lesson.id, slot.kind);
    const override = overrides[resourceId];
    const baseStatus = slot.resource?.status ?? "missing";
    const baseHref = slot.resource && "href" in slot.resource ? slot.resource.href : undefined;
    const hasRealHref = Boolean(override?.href ?? baseHref);

    const effectiveStatus = override?.status ?? mapBaseStatus(baseStatus);

    return {
      id: resourceId,
      level: page.level,
      levelLabel: levelLabels[page.level],
      domainSlug: page.domain,
      domainTitle: page.label.split("—")[1]?.trim() ?? page.domain,
      subdomainSlug: page.subdomain,
      subdomainTitle: page.label.split("—")[2]?.trim() ?? page.subdomain,
      subdomainRoute: page.route,
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      competency: lesson.skill,
      kind: slot.kind,
      kindLabel: slot.label,
      baseStatus,
      hasRealHref,
      effectiveStatus: override?.published ? "available" : effectiveStatus,
      href: override?.href ?? baseHref,
      label: override?.label,
      durationLabel: override?.durationLabel,
      verified: override?.verified ?? false,
      published: override?.published ?? false,
      isOverridden: Boolean(override),
      updatedAt: override?.updatedAt,
      updatedBy: override?.updatedBy,
    };
  });
}

export async function getAdminResourceCatalog(): Promise<AdminResourceRow[]> {
  const overrides = await readResourceOverrides();
  const rows: AdminResourceRow[] = [];

  for (const page of publishedSubdomainPages) {
    const subdomain = subdomainGetters[page.level](page.domain, page.subdomain);
    if (!subdomain) continue;

    for (const lesson of subdomain.lessons) {
      rows.push(...buildRowsForLesson(page, lesson, overrides));
    }
  }

  return rows;
}

export async function getAdminResourceById(
  resourceId: string,
): Promise<AdminResourceRow | undefined> {
  const rows = await getAdminResourceCatalog();
  return rows.find((row) => row.id === resourceId);
}
