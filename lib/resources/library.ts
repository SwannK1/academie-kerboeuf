/**
 * Bibliothèque publique : lecture et recherche dans l'index généré depuis
 * les PDF réellement présents (`scripts/build-resource-index.py`).
 *
 * Seules les unités au statut `publiee` sont exposées. Les autres statuts
 * (brouillon, a-verifier, validee, archivee) peuvent exister dans l'index
 * pour le travail éditorial mais ne sortent jamais d'ici.
 */

import rawIndex from "@/content/resource-index.generated.json";
import { RESOURCE_LEVELS, type ResourceLevel } from "@/lib/workspace/curriculum";

export type ResourceFileType =
  | "lecon"
  | "exercices"
  | "evaluation"
  | "atelier"
  | "grille"
  | "parent"
  | "texte"
  | "fiche";

export type ResourceStatus = "brouillon" | "a-verifier" | "validee" | "publiee" | "archivee";

export type ResourceFile = { type: ResourceFileType; href: string; pages: number };

export type ResourceUnit = {
  id: string;
  level: ResourceLevel;
  cycle: string;
  subject: string;
  domain: string;
  title: string;
  objective: string;
  files: ResourceFile[];
  preview: string | null;
  collections: string[];
  status: ResourceStatus;
  validatedAt: string;
};

const ALL = rawIndex as ResourceUnit[];

export const publishedResources: ResourceUnit[] = ALL.filter(
  (unit) => unit.status === "publiee" && unit.files.length > 0,
);

const byId = new Map(publishedResources.map((unit) => [unit.id, unit]));

export function getResource(id: string): ResourceUnit | undefined {
  return byId.get(id);
}

export const RESOURCE_SUBJECTS: { id: string; label: string }[] = [
  { id: "francais", label: "Français" },
  { id: "maths", label: "Maths" },
  { id: "langage", label: "Langage" },
  { id: "sciences", label: "Sciences" },
  { id: "hg-emc", label: "Histoire-géo · EMC" },
  { id: "langues", label: "Anglais" },
  { id: "arts", label: "Arts" },
  { id: "eps", label: "EPS" },
];

export function subjectLabel(id: string): string {
  return RESOURCE_SUBJECTS.find((s) => s.id === id)?.label ?? id;
}

export const FILE_TYPE_LABELS: Record<ResourceFileType, string> = {
  lecon: "Leçon",
  exercices: "Exercices",
  evaluation: "Évaluation",
  atelier: "Fiche atelier",
  grille: "Grille d'observation",
  parent: "Fiche parent",
  texte: "Texte à lire",
  fiche: "Fiche",
};

/** Filtres de type proposés en chips, dans l'ordre d'usage. */
export const TYPE_FILTERS: { id: ResourceFileType; label: string }[] = [
  { id: "lecon", label: "Leçon" },
  { id: "exercices", label: "Exercices" },
  { id: "evaluation", label: "Évaluation" },
  { id: "texte", label: "Texte à lire" },
  { id: "atelier", label: "Atelier" },
];

export type Collection = {
  id: string;
  title: string;
  description: string;
  /** Unités de la collection. Vide = la collection n'est pas affichée. */
  match: (unit: ResourceUnit) => boolean;
};

/**
 * Collections éditoriales. Une collection sans ressource publiée n'est
 * jamais affichée publiquement : les cahiers de vacances sont déclarés ici
 * pour que leur intégration se limite à déposer les PDF et relancer l'index.
 */
export const COLLECTIONS: Collection[] = [
  {
    id: "liaison-cm2-6e",
    title: "Liaison CM2 → 6e",
    description: "Les notions qui font le pont entre la fin de l'école et l'entrée au collège.",
    match: (unit) => unit.collections.includes("liaison-cm2-6e"),
  },
  ...(
    [
      ["gs-cp", "GS → CP"],
      ["cp-ce1", "CP → CE1"],
      ["ce1-ce2", "CE1 → CE2"],
      ["ce2-cm1", "CE2 → CM1"],
      ["cm1-cm2", "CM1 → CM2"],
      ["cm2-6e", "CM2 → 6e"],
    ] as const
  ).map(([id, label]) => ({
    id: `cahier-vacances-${id}`,
    title: `Cahier de vacances ${label}`,
    description: "Révisions d'été pour préparer l'année suivante.",
    match: (unit: ResourceUnit) => unit.collections.includes(`cahier-vacances-${id}`),
  })),
];

export function getVisibleCollections(): (Collection & { count: number })[] {
  return COLLECTIONS.map((collection) => ({
    ...collection,
    count: publishedResources.filter(collection.match).length,
  })).filter((collection) => collection.count > 0);
}

export function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

const LEVEL_ALIASES: Record<string, ResourceLevel> = Object.fromEntries(
  RESOURCE_LEVELS.flatMap((level) => [
    [normalize(level.label), level.id],
    [level.id, level.id],
  ]),
) as Record<string, ResourceLevel>;
LEVEL_ALIASES["sixieme"] = "6e";

const SUBJECT_ALIASES: Record<string, string> = {
  maths: "maths",
  math: "maths",
  mathematiques: "maths",
  francais: "francais",
  anglais: "langues",
  sciences: "sciences",
  histoire: "hg-emc",
  geographie: "hg-emc",
  emc: "hg-emc",
  arts: "arts",
  eps: "eps",
  langage: "langage",
};

const TYPE_ALIASES: Record<string, ResourceFileType> = {
  lecon: "lecon",
  lecons: "lecon",
  exercice: "exercices",
  exercices: "exercices",
  evaluation: "evaluation",
  evaluations: "evaluation",
  eval: "evaluation",
  texte: "texte",
  tapuscrit: "texte",
  atelier: "atelier",
};

export type ResourceQuery = {
  q?: string;
  level?: ResourceLevel | null;
  subject?: string | null;
  type?: ResourceFileType | null;
  collection?: string | null;
};

type Indexed = { unit: ResourceUnit; haystack: string; title: string };

const INDEXED: Indexed[] = publishedResources.map((unit) => ({
  unit,
  title: normalize(unit.title),
  haystack: normalize(
    [unit.title, unit.domain, unit.objective, subjectLabel(unit.subject), unit.level].join(" "),
  ),
}));

/**
 * Recherche plein texte tolérante (accents, casse). Les mots qui désignent un
 * niveau, une matière ou un type (« soustraction ce1 », « exercices
 * conjugaison ») deviennent des filtres implicites.
 */
export function searchResources(query: ResourceQuery): {
  results: ResourceUnit[];
  inferred: { level?: ResourceLevel; subject?: string; type?: ResourceFileType };
} {
  const inferred: { level?: ResourceLevel; subject?: string; type?: ResourceFileType } = {};
  const words: string[] = [];
  for (const word of normalize(query.q ?? "").split(" ").filter(Boolean)) {
    if (!query.level && !inferred.level && LEVEL_ALIASES[word]) inferred.level = LEVEL_ALIASES[word];
    else if (!query.subject && !inferred.subject && SUBJECT_ALIASES[word]) inferred.subject = SUBJECT_ALIASES[word];
    else if (!query.type && !inferred.type && TYPE_ALIASES[word]) inferred.type = TYPE_ALIASES[word];
    else if (word.length > 1 && !["le", "la", "les", "de", "des", "du", "un", "une", "en", "et"].includes(word)) words.push(word);
  }
  const level = query.level ?? inferred.level;
  const subject = query.subject ?? inferred.subject;
  const type = query.type ?? inferred.type;
  const collection = query.collection ? COLLECTIONS.find((c) => c.id === query.collection) : undefined;

  const scored: { unit: ResourceUnit; score: number }[] = [];
  for (const item of INDEXED) {
    const { unit } = item;
    if (level && unit.level !== level) continue;
    if (subject && unit.subject !== subject) continue;
    if (type && !unit.files.some((f) => f.type === type)) continue;
    if (collection && !collection.match(unit)) continue;
    let score = 0;
    let matchedAll = true;
    for (const word of words) {
      const stem = word.length > 4 ? word.slice(0, -1) : word; // pluriels simples
      if (item.title.includes(stem)) score += 3;
      else if (item.haystack.includes(stem)) score += 1;
      else {
        matchedAll = false;
        break;
      }
    }
    if (!matchedAll) continue;
    scored.push({ unit, score });
  }
  scored.sort((a, b) => b.score - a.score);
  return { results: scored.map((s) => s.unit), inferred };
}

/** Mots trop génériques pour rapprocher une notion d'une fiche (verbes de consigne, mots outils). */
const GENERIC_WORDS = new Set([
  "les", "des", "une", "dans", "pour", "avec", "son", "ses", "leur", "leurs", "par", "sur", "aux", "entre", "partir", "simple", "simples", "court", "courte", "courts",
  "identifier", "reconnaitre", "distinguer", "comparer", "ranger", "lire", "ecrire", "utiliser", "resoudre", "poser", "effectuer", "calculer",
  "construire", "comprendre", "mobiliser", "reperer", "repondre", "produire", "decrire", "situer", "memoriser", "connaitre", "savoir",
  "nombre", "nombres", "phrase", "phrases", "texte", "textes", "mots", "probleme", "problemes", "question", "questions",
]);

const LANGUAGE_DOMAINS = ["grammaire", "conjugaison", "orthographe", "vocabulaire", "lexique", "etude de la langue"];

function domainAffinity(unitDomain: string, domain: string): number {
  const a = normalize(unitDomain);
  const b = normalize(domain);
  if (!a || !b) return 0;
  if (a === b || a.includes(b) || b.includes(a)) return 3;
  const isLang = (x: string) => LANGUAGE_DOMAINS.some((d) => x.includes(d));
  if (isLang(a) && isLang(b)) return 2;
  if (a.split(" ")[0] === b.split(" ")[0]) return 2;
  return 0;
}

/** Ressources suggérées pour une séance (niveau + matière + domaine + mots de la notion). */
export function suggestResources(options: {
  level: string;
  resourceSubject?: string;
  domain?: string;
  text?: string;
  limit?: number;
  /** ne garder que les ressources qui partagent un mot avec la notion */
  strict?: boolean;
}): ResourceUnit[] {
  const { level, resourceSubject, domain = "", text = "", limit = 4, strict = false } = options;
  const pool = publishedResources.filter(
    (unit) => unit.level === level && (!resourceSubject || unit.subject === resourceSubject),
  );
  const words = normalize(text)
    .split(" ")
    .filter((w) => w.length >= 3 && !GENERIC_WORDS.has(w));
  return pool
    .map((unit) => {
      // Correspondance en début de mot : « aire » ne doit pas trouver « perpendiculaires ».
      const hayWords = normalize(`${unit.title} ${unit.objective}`).split(" ");
      const wordScore = words.reduce((sum, w) => {
        const stem = w.length > 5 ? w.slice(0, 5) : w;
        return sum + (hayWords.some((h) => h.startsWith(stem)) ? 2 : 0);
      }, 0);
      return { unit, score: wordScore + domainAffinity(unit.domain, domain), wordScore };
    })
    .filter((s) => (strict ? s.wordScore > 0 : s.score > 0 || !domain))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.unit);
}
