// Arbre pédagogique CM1 — Cycle 3, primaire.
// Structure séquences-compétences : niveau → matières → domaines → sous-domaines → séquences.
// Une séquence correspond à une seule compétence.
// Statuts "upcoming" : aucun PDF créé, aucun lien cliquable.

import { cm1CurriculumLevelMap } from "@/content/levels/cm1-curriculum";
import type { CurriculumEntry } from "@/content/curriculum-map-types";
import type {
  AcademyLevelProgram,
  Lesson,
  LearningCompetency,
  LessonSession,
  ParentGuidance,
  PedagogicalResourceRef,
  ProgramDomain,
  ProgramStatus,
  ProgramSubdomain,
} from "@/content/program-types";

const emptyParentGuidance: ParentGuidance = {
  summary: "",
  quickTips: [],
  successSigns: [],
};

const PLANNED_PDF_RESOURCES: PedagogicalResourceRef[] = [
  { kind: "lesson-pdf", label: "PDF de leçon", status: "planned" },
  { kind: "exercises-pdf", label: "PDF d'exercices", status: "planned" },
  { kind: "correction-pdf", label: "PDF de correction", status: "planned" },
  { kind: "projectable-pdf", label: "PDF projetable", status: "planned" },
  { kind: "parent-sheet-pdf", label: "Fiche parent", status: "planned" },
];

function clonePlannedPdfResources(): PedagogicalResourceRef[] {
  return PLANNED_PDF_RESOURCES.map((resource) => ({ ...resource }));
}

// Normalise un id d'entrée curriculum (peut finir en -entry) vers un id propre.
function normalizeId(entry: CurriculumEntry): string {
  return entry.competencyId ?? entry.id.replace(/-entry$/, "");
}

// ── Séances prioritaires — 8 séquences (4 Français + 4 Mathématiques) ─────────
// Statut "upcoming" : aucun PDF, aucun lien cliquable.

const CM1_SESSIONS: Record<string, LessonSession[]> = {
  "cm1-fr-lc-intentions-personnage": [
    {
      id: "cm1-fr-lc-intentions-personnage-s1",
      title: "Observer les paroles et les actions d'un personnage",
      phase: "découvrir",
      objective: "L'élève relève dans un texte ce qu'un personnage dit et ce qu'il fait.",
      status: "upcoming",
    },
    {
      id: "cm1-fr-lc-intentions-personnage-s2",
      title: "Formuler l'intention d'un personnage",
      phase: "s'entraîner",
      objective: "L'élève formule une intention en s'appuyant sur les indices relevés.",
      status: "upcoming",
    },
    {
      id: "cm1-fr-lc-intentions-personnage-s3",
      title: "Justifier une interprétation par un indice précis",
      phase: "réinvestir",
      objective: "L'élève appuie son interprétation en citant un passage du texte.",
      status: "upcoming",
    },
    {
      id: "cm1-fr-lc-intentions-personnage-s4",
      title: "Évaluer la compréhension des intentions sur un texte nouveau",
      phase: "évaluer",
      objective: "L'élève lit un texte inédit et formule seul l'intention du personnage.",
      status: "upcoming",
    },
  ],

  "cm1-fr-lc-inference-simple": [
    {
      id: "cm1-fr-lc-inference-simple-s1",
      title: "Repérer ce que le texte ne dit pas directement",
      phase: "découvrir",
      objective: "L'élève identifie une information implicite et les indices qui permettent de la déduire.",
      status: "upcoming",
    },
    {
      id: "cm1-fr-lc-inference-simple-s2",
      title: "Formuler une inférence avec justification",
      phase: "s'entraîner",
      objective: "L'élève formule une inférence en citant l'indice qui la fonde.",
      status: "upcoming",
    },
    {
      id: "cm1-fr-lc-inference-simple-s3",
      title: "Distinguer ce qui est écrit de ce qui est déduit",
      phase: "réinvestir",
      objective: "L'élève classe des informations en explicites ou implicites dans un texte.",
      status: "upcoming",
    },
    {
      id: "cm1-fr-lc-inference-simple-s4",
      title: "Formuler et justifier une inférence seul",
      phase: "évaluer",
      objective: "L'élève produit seul une inférence complète avec son justificatif.",
      status: "upcoming",
    },
  ],

  "cm1-fr-conj-imparfait": [
    {
      id: "cm1-fr-conj-imparfait-s1",
      title: "Reconnaître l'imparfait dans un texte",
      phase: "découvrir",
      objective: "L'élève repère les terminaisons de l'imparfait et les distingue d'autres temps.",
      status: "upcoming",
    },
    {
      id: "cm1-fr-conj-imparfait-s2",
      title: "Conjuguer des verbes en -er à l'imparfait",
      phase: "s'entraîner",
      objective: "L'élève conjugue correctement des verbes du 1er groupe à toutes les personnes.",
      status: "upcoming",
    },
    {
      id: "cm1-fr-conj-imparfait-s3",
      title: "Conjuguer être, avoir, aller à l'imparfait",
      phase: "s'entraîner",
      objective: "L'élève mémorise les formes irrégulières des verbes fréquents.",
      status: "upcoming",
    },
    {
      id: "cm1-fr-conj-imparfait-s4",
      title: "Choisir entre imparfait et passé composé",
      phase: "réinvestir",
      objective: "L'élève sélectionne le temps adapté dans un texte à compléter.",
      status: "upcoming",
    },
  ],

  "cm1-fr-conj-futur-simple": [
    {
      id: "cm1-fr-conj-futur-simple-s1",
      title: "Reconnaître le futur simple",
      phase: "découvrir",
      objective: "L'élève repère les terminaisons du futur (-rai, -ras, -ra…) dans des phrases.",
      status: "upcoming",
    },
    {
      id: "cm1-fr-conj-futur-simple-s2",
      title: "Conjuguer des verbes réguliers au futur simple",
      phase: "s'entraîner",
      objective: "L'élève conjugue des verbes du 1er et 2e groupes au futur.",
      status: "upcoming",
    },
    {
      id: "cm1-fr-conj-futur-simple-s3",
      title: "Conjuguer être, avoir, aller, faire au futur",
      phase: "s'entraîner",
      objective: "L'élève mémorise les formes irrégulières au futur des verbes courants.",
      status: "upcoming",
    },
    {
      id: "cm1-fr-conj-futur-simple-s4",
      title: "Utiliser le futur dans une production d'écrit",
      phase: "réinvestir",
      objective: "L'élève rédige quelques phrases au futur en situation d'écriture.",
      status: "upcoming",
    },
  ],

  "cm1-ma-num-grands-nombres": [
    {
      id: "cm1-ma-num-grands-nombres-s1",
      title: "Lire et nommer des grands nombres",
      phase: "découvrir",
      objective: "L'élève lit des nombres jusqu'au million en identifiant les classes.",
      status: "upcoming",
    },
    {
      id: "cm1-ma-num-grands-nombres-s2",
      title: "Écrire des grands nombres en chiffres et en lettres",
      phase: "s'entraîner",
      objective: "L'élève transcrit un nombre dicté et le traduit en lettres.",
      status: "upcoming",
    },
    {
      id: "cm1-ma-num-grands-nombres-s3",
      title: "Comparer et ranger des grands nombres",
      phase: "réinvestir",
      objective: "L'élève utilise les symboles < et > et range une série de nombres.",
      status: "upcoming",
    },
    {
      id: "cm1-ma-num-grands-nombres-s4",
      title: "Encadrer et intercaler des nombres",
      phase: "consolider",
      objective: "L'élève encadre un nombre à la dizaine, centaine ou millier près.",
      status: "upcoming",
    },
  ],

  "cm1-ma-num-fractions": [
    {
      id: "cm1-ma-num-fractions-s1",
      title: "Partager en parties égales et nommer une fraction",
      phase: "découvrir",
      objective: "L'élève partage une figure en parties égales et lit la fraction correspondante.",
      status: "upcoming",
    },
    {
      id: "cm1-ma-num-fractions-s2",
      title: "Représenter une fraction sur une droite graduée",
      phase: "s'entraîner",
      objective: "L'élève place des fractions simples sur une droite graduée.",
      status: "upcoming",
    },
    {
      id: "cm1-ma-num-fractions-s3",
      title: "Comparer des fractions de même dénominateur",
      phase: "réinvestir",
      objective: "L'élève compare et ordonne des fractions ayant le même dénominateur.",
      status: "upcoming",
    },
    {
      id: "cm1-ma-num-fractions-s4",
      title: "Identifier fractions supérieures et inférieures à l'unité",
      phase: "consolider",
      objective: "L'élève repère si une fraction est plus grande ou plus petite que 1.",
      status: "upcoming",
    },
  ],

  "cm1-ma-cal-multiplication": [
    {
      id: "cm1-ma-cal-multiplication-s1",
      title: "Revoir l'algorithme de la multiplication",
      phase: "découvrir",
      objective: "L'élève identifie les étapes de la multiplication posée sur un exemple simple.",
      status: "upcoming",
    },
    {
      id: "cm1-ma-cal-multiplication-s2",
      title: "Calculer un produit à un chiffre avec retenues",
      phase: "s'entraîner",
      objective: "L'élève pose et calcule une multiplication par un chiffre en gérant les retenues.",
      status: "upcoming",
    },
    {
      id: "cm1-ma-cal-multiplication-s3",
      title: "Calculer un produit à deux chiffres",
      phase: "s'entraîner",
      objective: "L'élève pose et calcule une multiplication par un nombre à deux chiffres.",
      status: "upcoming",
    },
    {
      id: "cm1-ma-cal-multiplication-s4",
      title: "Vérifier un résultat par estimation",
      phase: "consolider",
      objective: "L'élève arrondit les facteurs pour évaluer la vraisemblance du résultat.",
      status: "upcoming",
    },
  ],

  "cm1-ma-cal-division": [
    {
      id: "cm1-ma-cal-division-s1",
      title: "Comprendre le sens de la division",
      phase: "découvrir",
      objective: "L'élève relie la division à une situation de partage ou de groupement.",
      status: "upcoming",
    },
    {
      id: "cm1-ma-cal-division-s2",
      title: "Poser et calculer une division euclidienne",
      phase: "s'entraîner",
      objective: "L'élève calcule quotient et reste par l'algorithme de la division posée.",
      status: "upcoming",
    },
    {
      id: "cm1-ma-cal-division-s3",
      title: "Vérifier la division par multiplication",
      phase: "réinvestir",
      objective: "L'élève vérifie son résultat en recalculant : diviseur × quotient + reste = dividende.",
      status: "upcoming",
    },
    {
      id: "cm1-ma-cal-division-s4",
      title: "Résoudre un problème impliquant une division",
      phase: "évaluer",
      objective: "L'élève choisit de poser une division pour répondre à une question de partage.",
      status: "upcoming",
    },
  ],
};

function getAggregateStatus(statuses: ProgramStatus[]): ProgramStatus {
  if (statuses.some((status) => status === "available")) {
    return "available";
  }

  if (statuses.some((status) => status === "in-progress")) {
    return "in-progress";
  }

  return "upcoming";
}

function createCompetencySequence(
  entry: CurriculumEntry,
): { lesson: Lesson; competency: LearningCompetency } {
  const id = normalizeId(entry);
  const resources = clonePlannedPdfResources();
  const sessions = CM1_SESSIONS[id];

  return {
    lesson: {
      id,
      slug: id,
      title: entry.title,
      objective: entry.observableObjective,
      skill: entry.title,
      parentGuidance: emptyParentGuidance,
      successCriteria: entry.successCriteria,
      exercises: [],
      resources,
      ...(sessions ? { sessions } : {}),
      competencyIds: [id],
      status: entry.status,
    },
    competency: {
      id,
      slug: id,
      title: entry.title,
      levelSlug: "cm1",
      cycle: "cycle-3",
      stage: "primaire",
      domainSlug: entry.domainSlug,
      subdomainSlug: entry.subdomainSlug,
      objective: entry.observableObjective,
      status: entry.status,
      lessonIds: [id],
      successCriteria: entry.successCriteria,
      resourceRefs: clonePlannedPdfResources(),
    },
  };
}

function createSubdomain(
  domainSlug: string,
  subdomainSlug: string,
  title: string,
  entries: CurriculumEntry[],
): ProgramSubdomain {
  const sequences = entries.map(createCompetencySequence);

  return {
    id: `cm1-${domainSlug}-${subdomainSlug}`,
    slug: subdomainSlug,
    title,
    description: `Catalogue de séquences-compétences CM1 pour ${title}.`,
    lessons: sequences.map((sequence) => sequence.lesson),
    competencies: sequences.map((sequence) => sequence.competency),
    status: getAggregateStatus(entries.map((entry) => entry.status)),
  };
}

function createDomain(
  domain: (typeof cm1CurriculumLevelMap.domains)[number],
): ProgramDomain {
  const subdomains = domain.subdomains.map((subdomain) =>
    createSubdomain(
      domain.domainSlug,
      subdomain.subdomainSlug,
      subdomain.label,
      subdomain.entries,
    ),
  );

  return {
    id: `cm1-${domain.domainSlug}`,
    slug: domain.domainSlug,
    title: domain.label,
    officialLabel: `${domain.subject} - Cycle 3`,
    description: `Progression CM1 par compétences pour ${domain.label}.`,
    subdomains,
    status: getAggregateStatus(
      subdomains.flatMap((subdomain) =>
        subdomain.lessons.map((lesson) => lesson.status),
      ),
    ),
  };
}

export const cm1LearningTree: AcademyLevelProgram = {
  levelSlug: "cm1",
  label: "CM1",
  cycle: "cycle-3",
  stage: "primaire",
  characterLink: {
    characterSlug: "noisette",
    name: "Noisette",
    roleHint:
      "Noisette l'écureuil guide les élèves de CM1 avec méthode et curiosité — elle aide à observer, raisonner et justifier.",
  },
  domains: cm1CurriculumLevelMap.domains.map(createDomain),
};

export function getCm1TreeDomain(domainSlug: string): ProgramDomain | undefined {
  return cm1LearningTree.domains.find((domain) => domain.slug === domainSlug);
}

export function getCm1TreeSubdomain(
  domainSlug: string,
  subdomainSlug: string,
): ProgramSubdomain | undefined {
  return getCm1TreeDomain(domainSlug)?.subdomains.find(
    (subdomain) => subdomain.slug === subdomainSlug,
  );
}

export function getCm1TreeLesson(
  domainSlug: string,
  subdomainSlug: string,
  lessonSlug: string,
): Lesson | undefined {
  return getCm1TreeSubdomain(domainSlug, subdomainSlug)?.lessons.find(
    (lesson) => lesson.slug === lessonSlug,
  );
}

export function getCm1TreeLessonById(lessonId: string): Lesson | undefined {
  for (const domain of cm1LearningTree.domains) {
    for (const subdomain of domain.subdomains) {
      const found = subdomain.lessons.find((lesson) => lesson.id === lessonId);
      if (found) return found;
    }
  }
  return undefined;
}

export type Cm1TreeSubjectTree = {
  place: { label: string };
  guides: { id: string; name: string }[];
  domains: {
    id: string;
    title: string;
    subdomains: {
      id: string;
      title: string;
      items: {
        id: string;
        title: string;
        description?: string;
        status: ProgramStatus;
        href?: string;
      }[];
    }[];
  }[];
};

export type Cm1SequenceEntry = {
  id: string;
  title: string;
  domain: string;
  subdomain: string;
  skill: string;
  status: ProgramStatus;
};

export function getCm1TreeSubjectTree(subjectSlug: string): Cm1TreeSubjectTree | undefined {
  const domain = cm1LearningTree.domains.find((d) => d.slug === subjectSlug);
  if (!domain) return undefined;

  return {
    place: { label: "Cycle 3 · Primaire" },
    guides: [],
    domains: [
      {
        id: domain.id,
        title: domain.title,
        subdomains: domain.subdomains.map((subdomain) => ({
          id: subdomain.id,
          title: subdomain.title,
          items: subdomain.lessons.map((lesson) => ({
            id: lesson.id,
            title: lesson.title,
            description: lesson.objective,
            status: lesson.status,
          })),
        })),
      },
    ],
  };
}

export function getCm1Sequences(subjectSlug: string): Cm1SequenceEntry[] {
  const domain = cm1LearningTree.domains.find((d) => d.slug === subjectSlug);
  if (!domain) return [];

  return domain.subdomains.flatMap((subdomain) =>
    subdomain.lessons.map((lesson) => ({
      id: lesson.id,
      title: lesson.title,
      domain: domain.title,
      subdomain: subdomain.title,
      skill: lesson.objective,
      status: lesson.status,
    })),
  );
}
