// Adaptateur "bibliothèque de fiches PDF CM2" pour /primaire/cm2.
// Regroupe les données déjà existantes (cm2-subjects, cm2-fiches-maths,
// cm2-francais-fiches) par matière > sous-domaine, sans dupliquer ni
// réinventer de ressource : les comptes sont calculés depuis les données
// sources réelles (fiches avec href existant = disponible).

import { cm2Subjects, type Cm2Subject } from "@/content/cm2-subjects";
import { cm2FichesMaths } from "@/content/cm2-fiches-maths";
import { cm2FrancaisFiches, type FicheDomain } from "@/content/cm2-francais-fiches";

export type Cm2FicheSubdomain = {
  label: string;
  availableCount: number;
  totalCount: number;
};

export type Cm2FicheSubjectLibrary = {
  subject: Cm2Subject;
  subdomains: Cm2FicheSubdomain[];
  hasCatalogue: boolean;
};

function countFrancaisDomain(domain: FicheDomain): Pick<Cm2FicheSubdomain, "availableCount" | "totalCount"> {
  const notions = cm2FrancaisFiches.filter((notion) => notion.domain === domain);
  const total = notions.reduce(
    (sum, notion) => sum + (["f1", "f2", "f3"] as const).filter((key) => notion.sheets[key]).length,
    0,
  );
  // Une fiche français n'est enregistrée que lorsqu'elle existe réellement (href présent).
  return { totalCount: total, availableCount: total };
}

function countMathDomain(domain: string): Pick<Cm2FicheSubdomain, "availableCount" | "totalCount"> {
  const notions = cm2FichesMaths.filter((notion) => notion.domain === domain);
  let total = 0;
  let available = 0;
  for (const notion of notions) {
    for (const sheet of notion.sheets) {
      total += 1;
      if (sheet.status === "available") available += 1;
    }
  }
  return { totalCount: total, availableCount: available };
}

const NO_FICHE = { availableCount: 0, totalCount: 0 };

const FRANCAIS_SUBDOMAINS: Cm2FicheSubdomain[] = [
  { label: "Lecture / Compréhension", ...countFrancaisDomain("lecture-comprehension") },
  { label: "Grammaire", ...countFrancaisDomain("grammaire") },
  { label: "Conjugaison", ...countFrancaisDomain("conjugaison") },
  { label: "Orthographe", ...countFrancaisDomain("orthographe") },
  { label: "Vocabulaire", ...countFrancaisDomain("vocabulaire") },
  { label: "Production d'écrit", ...NO_FICHE },
];

const MATHEMATIQUES_SUBDOMAINS: Cm2FicheSubdomain[] = [
  { label: "Nombres et calculs", ...NO_FICHE },
  { label: "Grandeurs et mesures", ...NO_FICHE },
  { label: "Espace et géométrie", ...countMathDomain("Géométrie") },
  { label: "Résolution de problèmes", ...NO_FICHE },
];

const HISTOIRE_GEOGRAPHIE_SUBDOMAINS: Cm2FicheSubdomain[] = [
  { label: "Histoire", ...NO_FICHE },
  { label: "Géographie", ...NO_FICHE },
];

const SCIENCES_SUBDOMAINS: Cm2FicheSubdomain[] = [
  { label: "Le vivant", ...NO_FICHE },
  { label: "La matière", ...NO_FICHE },
  { label: "L'énergie", ...NO_FICHE },
  { label: "La Terre et l'environnement", ...NO_FICHE },
  { label: "Technologie", ...NO_FICHE },
];

const ARTS_SUBDOMAINS: Cm2FicheSubdomain[] = [
  { label: "Arts plastiques", ...NO_FICHE },
  { label: "Éducation musicale", ...NO_FICHE },
];

const EPS_SUBDOMAINS: Cm2FicheSubdomain[] = [
  { label: "Coopérer et s'opposer", ...NO_FICHE },
  { label: "Réaliser une performance", ...NO_FICHE },
  { label: "Adapter ses déplacements", ...NO_FICHE },
  { label: "S'exprimer par une activité artistique ou corporelle", ...NO_FICHE },
];

const EMC_SUBDOMAINS: Cm2FicheSubdomain[] = [
  { label: "Respecter autrui", ...NO_FICHE },
  { label: "Valeurs de la République", ...NO_FICHE },
  { label: "Culture civique", ...NO_FICHE },
  { label: "Débattre, coopérer, s'engager", ...NO_FICHE },
];

const SUBDOMAINS_BY_SLUG: Record<string, Cm2FicheSubdomain[]> = {
  francais: FRANCAIS_SUBDOMAINS,
  mathematiques: MATHEMATIQUES_SUBDOMAINS,
  "histoire-geographie": HISTOIRE_GEOGRAPHIE_SUBDOMAINS,
  sciences: SCIENCES_SUBDOMAINS,
  arts: ARTS_SUBDOMAINS,
  eps: EPS_SUBDOMAINS,
  emc: EMC_SUBDOMAINS,
};

// Matières affichées dans la bibliothèque de fiches PDF CM2. "anglais" reste
// consultable via /primaire/cm2/matieres/anglais mais n'apparaît pas ici :
// hors de la liste des matières demandée pour cette bibliothèque.
const VISIBLE_SUBJECT_SLUGS = [
  "francais",
  "mathematiques",
  "histoire-geographie",
  "sciences",
  "arts",
  "eps",
  "emc",
] as const;

export function getCm2FicheLibrary(): Cm2FicheSubjectLibrary[] {
  return cm2Subjects
    .filter((subject) => (VISIBLE_SUBJECT_SLUGS as readonly string[]).includes(subject.slug))
    .sort(
      (a, b) =>
        VISIBLE_SUBJECT_SLUGS.indexOf(a.slug as (typeof VISIBLE_SUBJECT_SLUGS)[number]) -
        VISIBLE_SUBJECT_SLUGS.indexOf(b.slug as (typeof VISIBLE_SUBJECT_SLUGS)[number]),
    )
    .map((subject) => ({
      subject,
      subdomains: SUBDOMAINS_BY_SLUG[subject.slug] ?? [],
      hasCatalogue: subject.slug === "francais" || subject.slug === "mathematiques",
    }));
}
