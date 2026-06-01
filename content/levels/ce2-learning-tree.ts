// Arbre pedagogique CE2 - Cycle 2, primaire.
// Structure de catalogue : niveau -> matieres -> domaines -> sequences-competences.
// Une sequence correspond a une seule competence, sans lecon detaillee ni exercice.

import { ce2CurriculumLevelMap } from "@/content/levels/ce2-curriculum";
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

// ── Séances — lot prioritaire 8 séquences (4 Français + 4 Mathématiques) ─────
// Statut "upcoming" : aucun PDF créé, aucun lien cliquable.

const CE2_SESSIONS: Record<string, LessonSession[]> = {
  "ce2-fr-lc-comprendre-texte-long": [
    {
      id: "ce2-fr-lc-comprendre-texte-long-s1",
      title: "Lire un texte et identifier le sujet",
      phase: "découvrir",
      objective: "L'élève lit un texte entier et dit de quoi il parle.",
      status: "upcoming",
    },
    {
      id: "ce2-fr-lc-comprendre-texte-long-s2",
      title: "Répondre à des questions de compréhension",
      phase: "s'entraîner",
      objective: "L'élève retrouve des informations précises dans un texte.",
      status: "upcoming",
    },
    {
      id: "ce2-fr-lc-comprendre-texte-long-s3",
      title: "Lire seul et restituer l'essentiel",
      phase: "réinvestir",
      objective: "L'élève lit un nouveau texte sans aide et en résume l'idée principale.",
      status: "upcoming",
    },
    {
      id: "ce2-fr-lc-comprendre-texte-long-s4",
      title: "Évaluer sa compréhension sur un texte inconnu",
      phase: "évaluer",
      objective: "L'élève répond seul à des questions sur un texte qu'il n'a pas encore lu.",
      status: "upcoming",
    },
  ],

  "ce2-fr-lc-reperer-implicite": [
    {
      id: "ce2-fr-lc-reperer-implicite-s1",
      title: "Observer des indices dans un texte",
      phase: "découvrir",
      objective: "L'élève repère les mots et expressions qui laissent entendre quelque chose.",
      status: "upcoming",
    },
    {
      id: "ce2-fr-lc-reperer-implicite-s2",
      title: "Formuler ce que le texte laisse comprendre",
      phase: "s'entraîner",
      objective: "L'élève formule une information implicite à partir des indices.",
      status: "upcoming",
    },
    {
      id: "ce2-fr-lc-reperer-implicite-s3",
      title: "Justifier une déduction sur un texte court",
      phase: "réinvestir",
      objective: "L'élève justifie sa déduction en citant un indice précis du texte.",
      status: "upcoming",
    },
    {
      id: "ce2-fr-lc-reperer-implicite-s4",
      title: "Retrouver une information implicite seul",
      phase: "évaluer",
      objective: "L'élève identifie et formule seul une information non écrite.",
      status: "upcoming",
    },
  ],

  "ce2-fr-edl-accord-groupe-nominal": [
    {
      id: "ce2-fr-edl-accord-groupe-nominal-s1",
      title: "Identifier le nom donneur d'accord",
      phase: "découvrir",
      objective: "L'élève reconnaît le nom dans un groupe nominal et comprend son rôle.",
      status: "upcoming",
    },
    {
      id: "ce2-fr-edl-accord-groupe-nominal-s2",
      title: "Accorder déterminant et adjectif avec le nom",
      phase: "s'entraîner",
      objective: "L'élève applique les règles d'accord en genre et en nombre.",
      status: "upcoming",
    },
    {
      id: "ce2-fr-edl-accord-groupe-nominal-s3",
      title: "Contrôler les accords dans une phrase",
      phase: "réinvestir",
      objective: "L'élève vérifie et corrige les accords dans une phrase complète.",
      status: "upcoming",
    },
    {
      id: "ce2-fr-edl-accord-groupe-nominal-s4",
      title: "Vérifier les accords en relecture",
      phase: "consolider",
      objective: "L'élève relit un texte et corrige systématiquement les accords nominaux.",
      status: "upcoming",
    },
  ],

  "ce2-fr-edl-conjuguer-present-passe-compose": [
    {
      id: "ce2-fr-edl-conjuguer-present-passe-compose-s1",
      title: "Reconnaître présent et passé composé",
      phase: "découvrir",
      objective: "L'élève distingue des formes verbales au présent et au passé composé.",
      status: "upcoming",
    },
    {
      id: "ce2-fr-edl-conjuguer-present-passe-compose-s2",
      title: "Conjuguer des verbes fréquents au présent",
      phase: "s'entraîner",
      objective: "L'élève choisit les terminaisons correctes au présent selon le sujet.",
      status: "upcoming",
    },
    {
      id: "ce2-fr-edl-conjuguer-present-passe-compose-s3",
      title: "Former le passé composé avec avoir et être",
      phase: "s'entraîner",
      objective: "L'élève construit le passé composé en choisissant le bon auxiliaire.",
      status: "upcoming",
    },
    {
      id: "ce2-fr-edl-conjuguer-present-passe-compose-s4",
      title: "Choisir le temps adapté dans un texte",
      phase: "réinvestir",
      objective: "L'élève complète un texte en utilisant le présent ou le passé composé.",
      status: "upcoming",
    },
  ],

  "ce2-ma-nc-lire-ecrire-ordonner-nombres": [
    {
      id: "ce2-ma-nc-lire-ecrire-ordonner-nombres-s1",
      title: "Lire et nommer des nombres jusqu'à 999",
      phase: "découvrir",
      objective: "L'élève lit des nombres entiers à l'oral et repère la valeur de chaque chiffre.",
      status: "upcoming",
    },
    {
      id: "ce2-ma-nc-lire-ecrire-ordonner-nombres-s2",
      title: "Écrire des nombres en chiffres et en lettres",
      phase: "s'entraîner",
      objective: "L'élève transcrit des nombres entre les deux écritures.",
      status: "upcoming",
    },
    {
      id: "ce2-ma-nc-lire-ecrire-ordonner-nombres-s3",
      title: "Comparer et ranger des nombres",
      phase: "réinvestir",
      objective: "L'élève utilise les symboles < et > et range une série de nombres.",
      status: "upcoming",
    },
    {
      id: "ce2-ma-nc-lire-ecrire-ordonner-nombres-s4",
      title: "Exercices de rangement et de comparaison",
      phase: "consolider",
      objective: "L'élève résout des exercices variés sur la lecture et l'ordre des nombres.",
      status: "upcoming",
    },
  ],

  "ce2-ma-nc-utiliser-strategies-calcul-mental": [
    {
      id: "ce2-ma-nc-utiliser-strategies-calcul-mental-s1",
      title: "Explorer des décompositions de nombres",
      phase: "découvrir",
      objective: "L'élève décompose un nombre de plusieurs façons pour faciliter le calcul.",
      status: "upcoming",
    },
    {
      id: "ce2-ma-nc-utiliser-strategies-calcul-mental-s2",
      title: "Utiliser doubles et compléments",
      phase: "s'entraîner",
      objective: "L'élève s'appuie sur les doubles et les compléments à 10 pour calculer.",
      status: "upcoming",
    },
    {
      id: "ce2-ma-nc-utiliser-strategies-calcul-mental-s3",
      title: "Expliquer sa stratégie à voix haute",
      phase: "réinvestir",
      objective: "L'élève verbalise la décomposition choisie pour justifier son calcul.",
      status: "upcoming",
    },
    {
      id: "ce2-ma-nc-utiliser-strategies-calcul-mental-s4",
      title: "Calcul mental avec justification",
      phase: "évaluer",
      objective: "L'élève calcule rapidement et note la stratégie utilisée.",
      status: "upcoming",
    },
  ],

  "ce2-ma-gm-mesurer-longueurs": [
    {
      id: "ce2-ma-gm-mesurer-longueurs-s1",
      title: "Comparer des longueurs sans instrument",
      phase: "découvrir",
      objective: "L'élève compare des longueurs par superposition ou par report.",
      status: "upcoming",
    },
    {
      id: "ce2-ma-gm-mesurer-longueurs-s2",
      title: "Mesurer avec une règle graduée",
      phase: "s'entraîner",
      objective: "L'élève place correctement la règle et lit la mesure en cm et mm.",
      status: "upcoming",
    },
    {
      id: "ce2-ma-gm-mesurer-longueurs-s3",
      title: "Convertir et comparer des mesures",
      phase: "réinvestir",
      objective: "L'élève convertit entre mm, cm et dm pour comparer des longueurs.",
      status: "upcoming",
    },
    {
      id: "ce2-ma-gm-mesurer-longueurs-s4",
      title: "Mesurer des objets de la classe",
      phase: "consolider",
      objective: "L'élève mesure plusieurs objets et les range par ordre de longueur.",
      status: "upcoming",
    },
  ],

  "ce2-ma-eg-reconnaitre-figures": [
    {
      id: "ce2-ma-eg-reconnaitre-figures-s1",
      title: "Observer et nommer des figures planes",
      phase: "découvrir",
      objective: "L'élève reconnaît et nomme les figures usuelles à partir d'exemples.",
      status: "upcoming",
    },
    {
      id: "ce2-ma-eg-reconnaitre-figures-s2",
      title: "Décrire des figures par leurs propriétés",
      phase: "s'entraîner",
      objective: "L'élève compte côtés et sommets et repère les angles droits.",
      status: "upcoming",
    },
    {
      id: "ce2-ma-eg-reconnaitre-figures-s3",
      title: "Classer des figures selon leurs propriétés",
      phase: "réinvestir",
      objective: "L'élève trie un ensemble de figures en utilisant des critères géométriques.",
      status: "upcoming",
    },
    {
      id: "ce2-ma-eg-reconnaitre-figures-s4",
      title: "Identifier et vérifier des angles droits",
      phase: "consolider",
      objective: "L'élève utilise l'équerre pour contrôler la présence d'angles droits.",
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
  const resources = clonePlannedPdfResources();

  const sessions = CE2_SESSIONS[entry.id];

  return {
    lesson: {
      id: entry.id,
      slug: entry.id,
      title: entry.title,
      objective: entry.observableObjective,
      skill: entry.title,
      parentGuidance: emptyParentGuidance,
      successCriteria: entry.successCriteria,
      exercises: [],
      resources,
      ...(sessions ? { sessions } : {}),
      competencyIds: [entry.id],
      status: entry.status,
    },
    competency: {
      id: entry.id,
      slug: entry.id,
      title: entry.title,
      levelSlug: "ce2",
      cycle: "cycle-2",
      stage: "primaire",
      domainSlug: entry.domainSlug,
      subdomainSlug: entry.subdomainSlug,
      objective: entry.observableObjective,
      status: entry.status,
      lessonIds: [entry.id],
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
    id: `ce2-${domainSlug}-${subdomainSlug}`,
    slug: subdomainSlug,
    title,
    description: `Catalogue de séquences-compétences CE2 pour ${title}.`,
    lessons: sequences.map((sequence) => sequence.lesson),
    competencies: sequences.map((sequence) => sequence.competency),
    status: getAggregateStatus(entries.map((entry) => entry.status)),
  };
}

function createDomain(
  domain: (typeof ce2CurriculumLevelMap.domains)[number],
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
    id: `ce2-${domain.domainSlug}`,
    slug: domain.domainSlug,
    title: domain.label,
    officialLabel: `${domain.subject} - Cycle 2`,
    description: `Progression CE2 par compétences pour ${domain.label}.`,
    subdomains,
    status: getAggregateStatus(
      subdomains.flatMap((subdomain) =>
        subdomain.lessons.map((lesson) => lesson.status),
      ),
    ),
  };
}

export const ce2LearningTree: AcademyLevelProgram = {
  levelSlug: "ce2",
  label: "CE2",
  cycle: "cycle-2",
  stage: "primaire",
  characterLink: {
    characterSlug: "esteban",
    name: "Esteban",
    roleHint:
      "Esteban accompagne les élèves de CE2 dans l'observation, la méthode et la justification.",
  },
  domains: ce2CurriculumLevelMap.domains.map(createDomain),
};

export function getCe2Domain(domainSlug: string): ProgramDomain | undefined {
  return ce2LearningTree.domains.find((domain) => domain.slug === domainSlug);
}

export function getCe2Subdomain(
  domainSlug: string,
  subdomainSlug: string,
): ProgramSubdomain | undefined {
  return getCe2Domain(domainSlug)?.subdomains.find(
    (subdomain) => subdomain.slug === subdomainSlug,
  );
}

export function getCe2Lesson(
  domainSlug: string,
  subdomainSlug: string,
  lessonSlug: string,
): Lesson | undefined {
  return getCe2Subdomain(domainSlug, subdomainSlug)?.lessons.find(
    (lesson) => lesson.slug === lessonSlug,
  );
}

export function getCe2LessonById(lessonId: string): Lesson | undefined {
  for (const domain of ce2LearningTree.domains) {
    for (const subdomain of domain.subdomains) {
      const found = subdomain.lessons.find((lesson) => lesson.id === lessonId);
      if (found) return found;
    }
  }
  return undefined;
}

export type Ce2SubjectTree = {
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

export type Ce2SequenceEntry = {
  id: string;
  title: string;
  domain: string;
  subdomain: string;
  skill: string;
  status: ProgramStatus;
};

export function getCe2SubjectTree(subjectSlug: string): Ce2SubjectTree | undefined {
  const domain = ce2LearningTree.domains.find((d) => d.slug === subjectSlug);
  if (!domain) return undefined;

  return {
    place: { label: "Cycle 2 · Primaire" },
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

export function getCe2Sequences(subjectSlug: string): Ce2SequenceEntry[] {
  const domain = ce2LearningTree.domains.find((d) => d.slug === subjectSlug);
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
