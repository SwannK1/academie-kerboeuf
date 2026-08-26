import catalogData from "@/content/secondary-resource-catalog.generated.json";

export const SECONDARY_LEVEL_SLUGS = ["6e", "5e", "4e", "3e", "seconde"] as const;
export type SecondaryLevelSlug = (typeof SECONDARY_LEVEL_SLUGS)[number];
export type SecondaryResourceType = "lecon" | "exercices" | "evaluation";

export type SecondaryResource = {
  type: SecondaryResourceType;
  href: string;
};

export type SecondaryCompetency = {
  level: SecondaryLevelSlug;
  subject: string;
  competency: string;
  resources: SecondaryResource[];
};

const subjectLabels: Record<string, string> = {
  anglais: "Anglais",
  arts: "Arts",
  "arts-plastiques": "Arts plastiques",
  emc: "EMC",
  "education-musicale": "Éducation musicale",
  eps: "EPS",
  francais: "Français",
  "histoire-geographie": "Histoire-Géographie",
  "histoire-geographie-emc": "Histoire-Géographie-EMC",
  "langues-vivantes": "Langues vivantes",
  mathematiques: "Mathématiques",
  sciences: "Sciences",
  "sciences-technologie": "Sciences et technologie",
};

const resourceLabels: Record<SecondaryResourceType, string> = {
  lecon: "Leçon",
  exercices: "Exercices",
  evaluation: "Évaluation",
};

const catalog = catalogData as unknown as SecondaryCompetency[];

export function isSecondaryLevelSlug(value: string): value is SecondaryLevelSlug {
  return (SECONDARY_LEVEL_SLUGS as readonly string[]).includes(value);
}

export function getSecondaryLevelBase(level: SecondaryLevelSlug): string {
  return level === "seconde" ? "/lycee/seconde" : `/college/${level}`;
}

export function getSecondarySubjectLabel(subject: string): string {
  return subjectLabels[subject] ?? humanizeSlug(subject);
}

export function getSecondaryResourceLabel(type: SecondaryResourceType): string {
  return resourceLabels[type];
}

export function humanizeSlug(slug: string): string {
  const value = slug
    .replace(/^(6e|5e|4e|3e)-(fr|ma|hg|hge|hgemc|sc|sci|ang|arts|mus|eps)-/, "")
    .replace(/^seconde-(histoire-geographie|langues-vivantes|mathematiques|francais|sciences|arts|emc|eps)-/, "")
    .replace(/-entry$/, "")
    .replaceAll("-", " ");
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function getSecondaryLevelCatalog(level: string): SecondaryCompetency[] {
  if (!isSecondaryLevelSlug(level)) return [];
  return catalog.filter((item) => item.level === level);
}

export function getSecondarySubjects(level: string) {
  const competencies = getSecondaryLevelCatalog(level);
  return [...new Set(competencies.map((item) => item.subject))].map((slug) => ({
    slug,
    label: getSecondarySubjectLabel(slug),
    competencies: competencies.filter((item) => item.subject === slug),
  }));
}

export function getSecondarySubject(level: string, subject: string) {
  return getSecondarySubjects(level).find((item) => item.slug === subject);
}

export function getSecondaryCompetency(level: string, subject: string, competency: string) {
  return catalog.find(
    (item) => item.level === level && item.subject === subject && item.competency === competency,
  );
}

export function getSecondaryCatalogStats() {
  return SECONDARY_LEVEL_SLUGS.map((level) => {
    const competencies = getSecondaryLevelCatalog(level);
    return {
      level,
      subjects: new Set(competencies.map((item) => item.subject)).size,
      competencies: competencies.length,
      pdfs: competencies.reduce((total, item) => total + item.resources.length, 0),
    };
  });
}
