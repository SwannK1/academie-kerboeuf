// Registre central du programme collège — 6e, 5e, 4e, 3e.
// Primaire (CP/CE1/CE2/CM1) → content/curriculum-map.ts
// CM2/Félix                 → content/cm2.ts (isolé, ne pas toucher)
// Maternelle                → content/levels/maternelle/
// Collège                   → ce fichier
//
// 6e : curriculum détaillé + portails matière avec domaines cliquables.
// 5e, 4e, 3e : matières et sous-domaines visibles, sans contenu ni pages domaines.
// Le site organise ; les PDF enseignent.

import type {
  CurriculumEntry,
  CurriculumLevelMap,
} from "@/content/curriculum-map-types";
import type { AcademyLevelSlug } from "@/content/program-types";
import {
  sixiemeCurriculumLevelMap,
  sixiemeMatieres,
  sixiemeFrancaisSubdomains,
  sixiemeMathematiquesSubdomains,
  sixiemeHistoireGeographieEmcSubdomains,
  type CollegeMatiereCard,
  type CollegeSubdomainCard,
} from "@/content/levels/college/6e-curriculum";
import {
  cinqiemeMatieres,
  cinqiemeFrancaisSubdomains,
  cinqiemeMathematiquesSubdomains,
  cinqiemeHistoireGeographieEmcSubdomains,
  cinqiemeSciencesTechnoSubdomains,
  cinqiemeAnglaisSubdomains,
} from "@/content/levels/college/5e-curriculum";
import {
  quatriemeMatieres,
  quatriemeFrancaisSubdomains,
  quatriemeMathematiquesSubdomains,
  quatriemeHistoireGeographieEmcSubdomains,
  quatriemeSciencesTechnoSubdomains,
  quatriemeAnglaisSubdomains,
} from "@/content/levels/college/4e-curriculum";
import {
  troisiemeMatieres,
  troisiemeFrancaisSubdomains,
  troisiemeMathematiquesSubdomains,
  troisiemeHistoireGeographieEmcSubdomains,
  troisiemeSciencesTechnoSubdomains,
  troisiemeAnglaisSubdomains,
} from "@/content/levels/college/3e-curriculum";

export type { CollegeSubdomainCard };

// ── Métadonnées des portails matière ─────────────────────────────────────────
// Données d'affichage des portails /college/[level]/[subject].
// Ne contient pas de contenu pédagogique — uniquement libellés et sous-domaines.

export type CollegeSubjectMeta = {
  slug: string;
  label: string;
  cycleLabel: string;
  subtitle?: string;
  description: string;
  domainsHeading: string;
  subdomains: CollegeSubdomainCard[];
};

export type CollegeDomainMeta = {
  level: CollegeLevelSlug;
  subject: string;
  domain: string;
  subjectLabel: string;
  domainLabel: string;
  cycleLabel: string;
  officialRef: string;
  description: string;
  status: CollegeSubdomainCard["status"];
  entries: CurriculumEntry[];
  backHref: string;
  backLabel: string;
  levelHref: string;
  levelLabel: string;
};

// ── Constante de garde — niveaux collège ─────────────────────────────────────
// Ne jamais ajouter de niveaux primaire ou lycée ici.
// Ajouter un niveau ici NE crée PAS les pages correspondantes.

export const COLLEGE_LEVEL_SLUGS = ["6e", "5e", "4e", "3e"] as const;
export type CollegeLevelSlug = (typeof COLLEGE_LEVEL_SLUGS)[number];

// ── Garde de type ─────────────────────────────────────────────────────────────

function isCollegeLevelSlug(slug: string): slug is CollegeLevelSlug {
  return (COLLEGE_LEVEL_SLUGS as readonly string[]).includes(slug);
}

// ── Registre partiel — seule la 6e a une cartographie détaillée ─────────────
// Les autres niveaux peuvent avoir des portails matière sans CurriculumLevelMap.

export const collegeCurriculumMaps: Partial<
  Record<CollegeLevelSlug, CurriculumLevelMap>
> = {
  "6e": sixiemeCurriculumLevelMap,
};

const collegeMatiereCards: Partial<
  Record<CollegeLevelSlug, CollegeMatiereCard[]>
> = {
  "6e": sixiemeMatieres,
  "5e": cinqiemeMatieres,
  "4e": quatriemeMatieres,
  "3e": troisiemeMatieres,
};

// ── Fonctions de lecture ──────────────────────────────────────────────────────

export function getCollegeCurriculumMap(
  levelSlug: string,
): CurriculumLevelMap | undefined {
  if (!isCollegeLevelSlug(levelSlug)) return undefined;
  return collegeCurriculumMaps[levelSlug];
}

export function hasCollegeCurriculumMap(levelSlug: string): boolean {
  return getCollegeCurriculumMap(levelSlug) !== undefined;
}

export function getCollegeAvailableLevels(): CollegeLevelSlug[] {
  return COLLEGE_LEVEL_SLUGS.filter(
    (slug) => collegeCurriculumMaps[slug] !== undefined,
  );
}

export function getCollegeMatiereCards(levelSlug: string): CollegeMatiereCard[] {
  if (!isCollegeLevelSlug(levelSlug)) return [];
  return collegeMatiereCards[levelSlug] ?? [];
}

export function getSixiemeCurriculumMap(): CurriculumLevelMap {
  return sixiemeCurriculumLevelMap;
}

// ── Registre des portails matière par niveau ─────────────────────────────────
// Données d'affichage par matière. Ajouter un niveau = ajouter un bloc ici.

const sixiemeSubjectsMeta: Record<string, CollegeSubjectMeta> = {
  francais: {
    slug: "francais",
    label: "Français",
    cycleLabel: "Cycle 3 · 6e · Français",
    subtitle: "6e — Passerelle du collège",
    description:
      "Quatre domaines pour installer les méthodes de lecture, d'écriture et de langue au collège.",
    domainsHeading: "Quatre domaines du programme",
    subdomains: sixiemeFrancaisSubdomains,
  },
  mathematiques: {
    slug: "mathematiques",
    label: "Mathématiques",
    cycleLabel: "Cycle 3 · 6e · Mathématiques",
    subtitle: "6e — Cycle 3",
    description:
      "Cinq domaines pour installer le raisonnement mathématique au collège.",
    domainsHeading: "Cinq domaines du programme",
    subdomains: sixiemeMathematiquesSubdomains,
  },
  "histoire-geographie-emc": {
    slug: "histoire-geographie-emc",
    label: "Histoire-Géographie-EMC",
    cycleLabel: "Cycle 3 · 6e · Histoire-Géographie-EMC",
    subtitle: "6e — Repères et méthodes",
    description:
      "Accéder aux premiers repères de travail : comprendre le temps long, lire des documents et installer les méthodes utiles au collège.",
    domainsHeading: "Quatre domaines du programme",
    subdomains: sixiemeHistoireGeographieEmcSubdomains,
  },
};

// ── Registre des portails matière 5e ─────────────────────────────────────────
// Tous les sous-domaines 5e sont sans href : aucune page domaine n'existe.

const cinqiemeSubjectsMeta: Record<string, CollegeSubjectMeta> = {
  francais: {
    slug: "francais",
    label: "Français",
    cycleLabel: "Cycle 4 · 5e · Français",
    subtitle: "5e — Approfondissement",
    description:
      "Approfondir la lecture, l'écriture, l'étude de la langue et l'oral au cycle 4.",
    domainsHeading: "Quatre domaines du programme",
    subdomains: cinqiemeFrancaisSubdomains,
  },
  mathematiques: {
    slug: "mathematiques",
    label: "Mathématiques",
    cycleLabel: "Cycle 4 · 5e · Mathématiques",
    subtitle: "5e — Cycle 4",
    description:
      "Consolider les nombres, la géométrie et la résolution de problèmes en cycle 4.",
    domainsHeading: "Cinq domaines du programme",
    subdomains: cinqiemeMathematiquesSubdomains,
  },
  "histoire-geographie-emc": {
    slug: "histoire-geographie-emc",
    label: "Histoire-Géographie-EMC",
    cycleLabel: "Cycle 4 · 5e · Histoire-Géographie-EMC",
    subtitle: "5e — Le Moyen Âge et le monde",
    description:
      "Comprendre les sociétés, les espaces et les règles de vie commune au Moyen Âge et dans le monde.",
    domainsHeading: "Quatre domaines du programme",
    subdomains: cinqiemeHistoireGeographieEmcSubdomains,
  },
  "sciences-technologie": {
    slug: "sciences-technologie",
    label: "Sciences et technologie",
    cycleLabel: "Cycle 4 · 5e · Sciences et technologie",
    subtitle: "5e — Observer et expérimenter",
    description:
      "Observer, expérimenter et construire : SVT, physique-chimie et technologie réunis.",
    domainsHeading: "Quatre domaines du programme",
    subdomains: cinqiemeSciencesTechnoSubdomains,
  },
  anglais: {
    slug: "anglais",
    label: "Anglais",
    cycleLabel: "Cycle 4 · 5e · Anglais",
    subtitle: "5e — A2 vers B1",
    description:
      "Comprendre et s'exprimer en anglais à l'écrit et à l'oral — niveau A2 vers B1.",
    domainsHeading: "Cinq activités langagières",
    subdomains: cinqiemeAnglaisSubdomains,
  },
};

// ── Registre des portails matière 4e ─────────────────────────────────────────
// Tous les sous-domaines 4e sont sans href : aucune page domaine n'existe.

const quatriemeSubjectsMeta: Record<string, CollegeSubjectMeta> = {
  francais: {
    slug: "francais",
    label: "Français",
    cycleLabel: "Cycle 4 · 4e · Français",
    subtitle: "4e — Analyse et argumentation",
    description:
      "Approfondir la lecture littéraire, l'écriture et l'étude de la langue en cycle 4.",
    domainsHeading: "Quatre domaines du programme",
    subdomains: quatriemeFrancaisSubdomains,
  },
  mathematiques: {
    slug: "mathematiques",
    label: "Mathématiques",
    cycleLabel: "Cycle 4 · 4e · Mathématiques",
    subtitle: "4e — Cycle 4",
    description:
      "Nombres relatifs, proportionnalité, géométrie dans l'espace et premières fonctions.",
    domainsHeading: "Cinq domaines du programme",
    subdomains: quatriemeMathematiquesSubdomains,
  },
  "histoire-geographie-emc": {
    slug: "histoire-geographie-emc",
    label: "Histoire-Géographie-EMC",
    cycleLabel: "Cycle 4 · 4e · Histoire-Géographie-EMC",
    subtitle: "4e — Révolutions et mondialisation",
    description:
      "Du XVIIIe siècle aux débuts de la mondialisation — repères et méthodes.",
    domainsHeading: "Quatre domaines du programme",
    subdomains: quatriemeHistoireGeographieEmcSubdomains,
  },
  "sciences-technologie": {
    slug: "sciences-technologie",
    label: "Sciences et technologie",
    cycleLabel: "Cycle 4 · 4e · Sciences et technologie",
    subtitle: "4e — Observer et modéliser",
    description:
      "SVT, physique-chimie et technologie — observer, mesurer, modéliser.",
    domainsHeading: "Quatre domaines du programme",
    subdomains: quatriemeSciencesTechnoSubdomains,
  },
  anglais: {
    slug: "anglais",
    label: "Anglais",
    cycleLabel: "Cycle 4 · 4e · Anglais",
    subtitle: "4e — Niveau B1",
    description:
      "Comprendre et s'exprimer en anglais à l'écrit et à l'oral — niveau B1.",
    domainsHeading: "Cinq activités langagières",
    subdomains: quatriemeAnglaisSubdomains,
  },
};

// ── Registre des portails matière 3e ─────────────────────────────────────────
// Tous les sous-domaines 3e sont sans href : aucune page domaine n'existe.

const troisiemeSubjectsMeta: Record<string, CollegeSubjectMeta> = {
  francais: {
    slug: "francais",
    label: "Français",
    cycleLabel: "Cycle 4 · 3e · Français",
    subtitle: "3e — Préparation au brevet",
    description:
      "Lecture, écriture, oral et étude de la langue — préparer l'épreuve de brevet.",
    domainsHeading: "Cinq domaines du programme",
    subdomains: troisiemeFrancaisSubdomains,
  },
  mathematiques: {
    slug: "mathematiques",
    label: "Mathématiques",
    cycleLabel: "Cycle 4 · 3e · Mathématiques",
    subtitle: "3e — Brevet et lycée",
    description:
      "Fonctions, probabilités, géométrie et calcul — préparer le brevet.",
    domainsHeading: "Six domaines du programme",
    subdomains: troisiemeMathematiquesSubdomains,
  },
  "histoire-geographie-emc": {
    slug: "histoire-geographie-emc",
    label: "Histoire-Géographie-EMC",
    cycleLabel: "Cycle 4 · 3e · Histoire-Géographie-EMC",
    subtitle: "3e — Monde contemporain",
    description:
      "Le monde depuis 1914 — repères chronologiques, géopolitiques et citoyens.",
    domainsHeading: "Quatre domaines du programme",
    subdomains: troisiemeHistoireGeographieEmcSubdomains,
  },
  "sciences-technologie": {
    slug: "sciences-technologie",
    label: "Sciences et technologie",
    cycleLabel: "Cycle 4 · 3e · Sciences et technologie",
    subtitle: "3e — Consolider et préparer le lycée",
    description:
      "SVT, physique-chimie et technologie — consolider et préparer le lycée.",
    domainsHeading: "Cinq domaines du programme",
    subdomains: troisiemeSciencesTechnoSubdomains,
  },
  anglais: {
    slug: "anglais",
    label: "Anglais",
    cycleLabel: "Cycle 4 · 3e · Anglais",
    subtitle: "3e — Niveau B1",
    description:
      "Comprendre et s'exprimer en anglais à l'écrit et à l'oral — niveau B1.",
    domainsHeading: "Cinq activités langagières",
    subdomains: troisiemeAnglaisSubdomains,
  },
};

const collegeSubjectsMeta: Partial<
  Record<CollegeLevelSlug, Record<string, CollegeSubjectMeta>>
> = {
  "6e": sixiemeSubjectsMeta,
  "5e": cinqiemeSubjectsMeta,
  "4e": quatriemeSubjectsMeta,
  "3e": troisiemeSubjectsMeta,
};

const dynamicCollegeDomainPilotParams = [
  { level: "6e", subject: "francais", domain: "lecture" },
  { level: "6e", subject: "francais", domain: "ecriture" },
  { level: "6e", subject: "francais", domain: "oral" },
  { level: "6e", subject: "francais", domain: "etude-de-la-langue" },
  { level: "6e", subject: "mathematiques", domain: "nombres-calcul" },
  { level: "6e", subject: "mathematiques", domain: "geometrie" },
  { level: "6e", subject: "mathematiques", domain: "grandeurs-mesures" },
  { level: "6e", subject: "mathematiques", domain: "organisation-donnees" },
  { level: "6e", subject: "mathematiques", domain: "resolution-problemes" },
  { level: "6e", subject: "histoire-geographie-emc", domain: "histoire" },
  { level: "6e", subject: "histoire-geographie-emc", domain: "geographie" },
] as const;

export function getCollegeSubjectMeta(
  levelSlug: string,
  subjectSlug: string,
): CollegeSubjectMeta | undefined {
  if (!isCollegeLevelSlug(levelSlug)) return undefined;
  return collegeSubjectsMeta[levelSlug]?.[subjectSlug];
}

export function getCollegeSubjectStaticParams(): {
  level: string;
  subject: string;
}[] {
  const result: { level: string; subject: string }[] = [];
  for (const [level, subjects] of Object.entries(collegeSubjectsMeta)) {
    for (const subject of Object.keys(subjects ?? {})) {
      result.push({ level, subject });
    }
  }
  return result;
}

export function getCollegeDomainEntries(
  levelSlug: string,
  subjectSlug: string,
  domainSlug: string,
): CurriculumEntry[] {
  const curriculumMap = getCollegeCurriculumMap(levelSlug);
  const subjectMap = curriculumMap?.domains.find(
    (domain) => domain.domainSlug === subjectSlug,
  );
  const domainMap = subjectMap?.subdomains.find(
    (subdomain) => subdomain.subdomainSlug === domainSlug,
  );

  return domainMap?.entries ?? [];
}

export function getCollegeDomainMeta(
  levelSlug: string,
  subjectSlug: string,
  domainSlug: string,
): CollegeDomainMeta | undefined {
  if (!isCollegeLevelSlug(levelSlug)) return undefined;

  const subjectMeta = getCollegeSubjectMeta(levelSlug, subjectSlug);
  const subdomain = subjectMeta?.subdomains.find(
    (candidate) => candidate.subdomainSlug === domainSlug,
  );

  if (!subjectMeta || !subdomain?.href) return undefined;

  const entries = getCollegeDomainEntries(levelSlug, subjectSlug, domainSlug);
  if (entries.length === 0) return undefined;

  return {
    level: levelSlug,
    subject: subjectSlug,
    domain: domainSlug,
    subjectLabel: subjectMeta.label,
    domainLabel: subdomain.label,
    cycleLabel: subjectMeta.cycleLabel,
    officialRef: entries[0]?.officialReference ?? subjectMeta.cycleLabel,
    description: subdomain.description,
    status: subdomain.status,
    entries,
    backHref: `/college/${levelSlug}/${subjectSlug}`,
    backLabel: `Retour ${subjectMeta.label} ${levelSlug}`,
    levelHref: `/college/${levelSlug}`,
    levelLabel: `Tableau de bord ${levelSlug}`,
  };
}

export function getCollegeDomainStaticParams(): {
  level: string;
  subject: string;
  domain: string;
}[] {
  const result: { level: string; subject: string; domain: string }[] = [];

  for (const { level, subject, domain } of dynamicCollegeDomainPilotParams) {
    if (!getCollegeDomainMeta(level, subject, domain)) continue;
    result.push({ level, subject, domain });
  }

  return result;
}

// ── Garde de compatibilité de type ───────────────────────────────────────────
// Vérifie qu'aucun slug collège ne glisse dans AcademyLevelSlug de façon inattendue.
// Si ce type check compile, la cohérence est garantie.

type _AssertCollegeSlugIsAcademySlug = CollegeLevelSlug extends AcademyLevelSlug
  ? true
  : never;
const _typeCheck: _AssertCollegeSlugIsAcademySlug = true;
void _typeCheck;
