/**
 * Référentiel unique « niveau → matière → domaine → notion » utilisé par
 * toutes les vues de travail (création de séance, emploi du temps,
 * programmation, ressources).
 *
 * Il ne crée aucun contenu : il réassemble
 * - les compétences CP → CM2 de `content/teacher-programming-curriculum.ts` ;
 * - les sous-domaines et séquences PS → GS de `content/levels/maternelle/*`.
 */

import {
  curriculumSubjects,
  type SchoolLevel,
} from "@/content/teacher-programming-curriculum";
import type { MaternelleSubdomain } from "@/content/levels/maternelle/types";
import { psLangageSubdomains } from "@/content/levels/maternelle/ps-langage-subdomains";
import { psActivitePhysiqueSubdomains } from "@/content/levels/maternelle/ps-activite-physique-subdomains";
import { psActivitesArtistiquesSubdomains } from "@/content/levels/maternelle/ps-activites-artistiques-subdomains";
import { psPremiersOutilsMathematiquesSubdomains } from "@/content/levels/maternelle/ps-premiers-outils-mathematiques-subdomains";
import { psExplorerLeMondeSubdomains } from "@/content/levels/maternelle/ps-explorer-le-monde-subdomains";
import { msLangageSubdomains } from "@/content/levels/maternelle/ms-langage-subdomains";
import { msActivitePhysiqueSubdomains } from "@/content/levels/maternelle/ms-activite-physique-subdomains";
import { msActivitesArtistiquesSubdomains } from "@/content/levels/maternelle/ms-activites-artistiques-subdomains";
import { msPremiersOutilsMathematiquesSubdomains } from "@/content/levels/maternelle/ms-premiers-outils-mathematiques-subdomains";
import { msExplorerLeMondeSubdomains } from "@/content/levels/maternelle/ms-explorer-le-monde-subdomains";
import { gsLangageSubdomains } from "@/content/levels/maternelle/gs-langage-subdomains";
import { gsActivitePhysiqueSubdomains } from "@/content/levels/maternelle/gs-activite-physique-subdomains";
import { gsActivitesArtistiquesSubdomains } from "@/content/levels/maternelle/gs-activites-artistiques-subdomains";
import { gsPremiersOutilsMathematiquesSubdomains } from "@/content/levels/maternelle/gs-premiers-outils-mathematiques-subdomains";
import { gsExplorerLeMondeSubdomains } from "@/content/levels/maternelle/gs-explorer-le-monde-subdomains";

export type TeachLevel = "ps" | "ms" | "gs" | SchoolLevel;
export type ResourceLevel = TeachLevel | "6e" | "5e" | "4e" | "3e";

export const TEACH_LEVELS: { id: TeachLevel; label: string }[] = [
  { id: "ps", label: "PS" },
  { id: "ms", label: "MS" },
  { id: "gs", label: "GS" },
  { id: "cp", label: "CP" },
  { id: "ce1", label: "CE1" },
  { id: "ce2", label: "CE2" },
  { id: "cm1", label: "CM1" },
  { id: "cm2", label: "CM2" },
];

export const RESOURCE_LEVELS: { id: ResourceLevel; label: string }[] = [
  ...TEACH_LEVELS,
  { id: "6e", label: "6e" },
  { id: "5e", label: "5e" },
  { id: "4e", label: "4e" },
  { id: "3e", label: "3e" },
];

export function levelLabel(level: string): string {
  return RESOURCE_LEVELS.find((l) => l.id === level)?.label ?? level.toUpperCase();
}

export function isTeachLevel(value: unknown): value is TeachLevel {
  return typeof value === "string" && TEACH_LEVELS.some((l) => l.id === value);
}

export function isMaternelle(level: TeachLevel): boolean {
  return level === "ps" || level === "ms" || level === "gs";
}

export type Accent = "jade" | "gold" | "sky" | "ember" | "plum" | "slate";

export type Subject = {
  id: string;
  label: string;
  /** libellé court, affiché dans les créneaux */
  short: string;
  accent: Accent;
  /** matière correspondante dans l'index de ressources */
  resourceSubject?: string;
};

const SUBJECTS: Subject[] = [
  { id: "francais", label: "Français", short: "Français", accent: "jade", resourceSubject: "francais" },
  { id: "mathematiques", label: "Mathématiques", short: "Maths", accent: "sky", resourceSubject: "maths" },
  { id: "questionner-le-monde", label: "Questionner le monde", short: "QLM", accent: "gold" },
  { id: "sciences-technologie", label: "Sciences et technologie", short: "Sciences", accent: "gold", resourceSubject: "sciences" },
  { id: "histoire", label: "Histoire", short: "Histoire", accent: "ember", resourceSubject: "hg-emc" },
  { id: "geographie", label: "Géographie", short: "Géographie", accent: "ember", resourceSubject: "hg-emc" },
  { id: "emc", label: "Enseignement moral et civique", short: "EMC", accent: "plum", resourceSubject: "hg-emc" },
  { id: "eps", label: "Éducation physique et sportive", short: "EPS", accent: "ember", resourceSubject: "eps" },
  { id: "arts-plastiques", label: "Arts plastiques", short: "Arts", accent: "plum", resourceSubject: "arts" },
  { id: "education-musicale", label: "Éducation musicale", short: "Musique", accent: "plum", resourceSubject: "arts" },
  { id: "langue-vivante", label: "Langue vivante", short: "Anglais", accent: "slate", resourceSubject: "langues" },
  // Maternelle : les cinq domaines d'apprentissage.
  { id: "langage", label: "Mobiliser le langage", short: "Langage", accent: "jade", resourceSubject: "langage" },
  { id: "premiers-outils-mathematiques", label: "Premiers outils mathématiques", short: "Maths", accent: "sky" },
  { id: "explorer-le-monde", label: "Explorer le monde", short: "Explorer", accent: "gold" },
  { id: "activite-physique", label: "Activité physique", short: "Motricité", accent: "ember" },
  { id: "activites-artistiques", label: "Activités artistiques", short: "Arts", accent: "plum" },
  // Temps sans contenu disciplinaire, utiles dans un emploi du temps.
  { id: "rituels", label: "Rituels", short: "Rituels", accent: "slate" },
  { id: "recreation", label: "Récréation", short: "Récréation", accent: "slate" },
  { id: "apc", label: "APC", short: "APC", accent: "slate" },
];

export function getSubject(id: string): Subject {
  return (
    SUBJECTS.find((s) => s.id === id) ?? {
      id,
      label: id,
      short: id,
      accent: "slate",
    }
  );
}

export type Notion = { id: string; label: string; domainId: string; subjectId: string; level: TeachLevel };
export type Domain = { id: string; label: string; notions: Notion[] };
export type SubjectTree = Subject & { domains: Domain[] };

const MATERNELLE: Record<"ps" | "ms" | "gs", Record<string, MaternelleSubdomain[]>> = {
  ps: {
    langage: psLangageSubdomains,
    "premiers-outils-mathematiques": psPremiersOutilsMathematiquesSubdomains,
    "explorer-le-monde": psExplorerLeMondeSubdomains,
    "activite-physique": psActivitePhysiqueSubdomains,
    "activites-artistiques": psActivitesArtistiquesSubdomains,
  },
  ms: {
    langage: msLangageSubdomains,
    "premiers-outils-mathematiques": msPremiersOutilsMathematiquesSubdomains,
    "explorer-le-monde": msExplorerLeMondeSubdomains,
    "activite-physique": msActivitePhysiqueSubdomains,
    "activites-artistiques": msActivitesArtistiquesSubdomains,
  },
  gs: {
    langage: gsLangageSubdomains,
    "premiers-outils-mathematiques": gsPremiersOutilsMathematiquesSubdomains,
    "explorer-le-monde": gsExplorerLeMondeSubdomains,
    "activite-physique": gsActivitePhysiqueSubdomains,
    "activites-artistiques": gsActivitesArtistiquesSubdomains,
  },
};

const treeCache = new Map<TeachLevel, SubjectTree[]>();

/** Matières → domaines → notions disponibles pour un niveau, dans l'ordre d'usage. */
export function getCurriculum(level: TeachLevel): SubjectTree[] {
  const cached = treeCache.get(level);
  if (cached) return cached;

  let tree: SubjectTree[];
  if (level === "ps" || level === "ms" || level === "gs") {
    tree = Object.entries(MATERNELLE[level]).map(([subjectId, subdomains]) => ({
      ...getSubject(subjectId),
      domains: subdomains.map((sub) => ({
        id: `${level}-${subjectId}-${sub.slug}`,
        label: sub.label,
        notions: (sub.sequences.length ? sub.sequences : [{ id: sub.id, title: sub.label }]).map((seq) => ({
          id: seq.id,
          label: seq.title,
          domainId: `${level}-${subjectId}-${sub.slug}`,
          subjectId,
          level,
        })),
      })),
    }));
  } else {
    tree = curriculumSubjects
      .map((subject) => ({
        ...getSubject(subject.id),
        domains: subject.domains
          .map((domain) => ({
            id: domain.id,
            label: domain.label,
            notions: domain.competencies
              .filter((c) => c.level === level)
              .map((c) => ({ id: c.id, label: c.label, domainId: domain.id, subjectId: subject.id, level })),
          }))
          .filter((domain) => domain.notions.length > 0),
      }))
      .filter((subject) => subject.domains.length > 0);
  }
  treeCache.set(level, tree);
  return tree;
}

/** Matières proposées dans la palette d'emploi du temps pour un niveau. */
export function getTimetableSubjects(level: TeachLevel): Subject[] {
  return [...getCurriculum(level).map((tree) => getSubject(tree.id)), getSubject("rituels"), getSubject("apc")];
}

export function findNotion(level: TeachLevel, notionId: string): (Notion & { domainLabel: string }) | null {
  for (const subject of getCurriculum(level)) {
    for (const domain of subject.domains) {
      const notion = domain.notions.find((n) => n.id === notionId);
      if (notion) return { ...notion, domainLabel: domain.label };
    }
  }
  return null;
}

export function findDomain(level: TeachLevel, subjectId: string, domainId: string): Domain | null {
  return (
    getCurriculum(level)
      .find((s) => s.id === subjectId)
      ?.domains.find((d) => d.id === domainId) ?? null
  );
}
