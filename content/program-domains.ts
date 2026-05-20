// Référentiel des domaines officiels EN par cycle.
// Ce fichier pose la structure commune — il ne contient pas encore les leçons.
// Les leçons sont définies dans content/levels/[niveau].ts.
// Ne pas connecter aux pages tant que les leçons ne sont pas créées.

import type { ProgramDomain, ProgramSubdomain } from "@/content/program-types";

// ── Helpers de construction ───────────────────────────────────────────────────

function sd(id: string, slug: string, title: string, description?: string): ProgramSubdomain {
  return { id, slug, title, description, lessons: [], status: "upcoming" };
}

function dom(
  id: string,
  slug: string,
  title: string,
  subdomains: ProgramSubdomain[],
  officialLabel?: string,
): ProgramDomain {
  return { id, slug, title, officialLabel, subdomains, status: "upcoming" };
}

// ── Type de carte de cycle (interne à ce fichier) ────────────────────────────

export type CycleDomainMap = {
  cycle: string;
  label: string;
  levels: string[];
  domains: ProgramDomain[];
};

// ── Cycle 1 — Maternelle ─────────────────────────────────────────────────────

export const cycle1Domains: ProgramDomain[] = [
  dom("c1-langage", "mobiliser-le-langage", "Mobiliser le langage dans toutes ses dimensions", [
    sd("c1-lang-oral",   "loral",   "L'oral",   "S'exprimer, écouter, comprendre et interagir."),
    sd("c1-lang-ecrit",  "lecrit",  "L'écrit",  "Découvrir la fonction de l'écrit et les bases du décodage."),
  ], "Mobiliser le langage dans toutes ses dimensions"),

  dom("c1-ap", "agir-activite-physique", "Agir, s'exprimer, comprendre à travers l'activité physique", [
    sd("c1-ap-motricite", "motricite-globale", "Motricité globale", "Courir, sauter, lancer, s'équilibrer."),
    sd("c1-ap-collectif", "jeux-collectifs",   "Jeux collectifs",   "Jouer avec les autres, respecter des règles simples."),
  ], "Agir, s'exprimer, comprendre à travers l'activité physique"),

  dom("c1-arts", "agir-activites-artistiques", "Agir, s'exprimer, comprendre à travers les activités artistiques", [
    sd("c1-arts-visuels",  "arts-visuels",   "Arts visuels",    "Observer, produire, s'exprimer plastiquement."),
    sd("c1-arts-sonores",  "univers-sonores", "Univers sonores", "Écouter, chanter, explorer les sons."),
    sd("c1-arts-spectacle","spectacle-vivant","Spectacle vivant","Jouer un rôle, inventer des histoires avec son corps."),
  ], "Agir, s'exprimer, comprendre à travers les activités artistiques"),

  dom("c1-maths", "premiers-outils-mathematiques", "Acquérir les premiers outils mathématiques", [
    sd("c1-ma-nombres",  "nombres-et-quantites", "Nombres et quantités",       "Dénombrer, comparer, ordonner des collections."),
    sd("c1-ma-formes",   "formes-et-grandeurs",  "Formes et grandeurs",        "Reconnaître et nommer des formes, comparer des grandeurs."),
    sd("c1-ma-suites",   "suites-et-ordre",      "Suites, ordre et dénombrement","Ordonner, trier, ranger."),
  ], "Construire les premiers outils pour structurer la pensée"),

  dom("c1-monde", "explorer-le-monde", "Explorer le monde", [
    sd("c1-monde-temps",  "temps-et-espace",       "Se repérer dans le temps et l'espace", "Avant/après, hier/aujourd'hui, se situer."),
    sd("c1-monde-vivant", "vivant-matiere-objets", "Le vivant, la matière et les objets",  "Observer, manipuler, nommer."),
  ], "Explorer le monde"),
];

// ── Cycle 2 — CP, CE1, CE2 ───────────────────────────────────────────────────

export const cycle2Domains: ProgramDomain[] = [
  dom("c2-fr", "francais", "Français", [
    sd("c2-fr-lec",  "lecture-comprehension", "Lecture et compréhension", "Comprendre un texte lu seul ou entendu, repérer les informations."),
    sd("c2-fr-ecr",  "ecriture",              "Écriture",                 "Écrire des phrases simples, organiser un court texte."),
    sd("c2-fr-lang", "etude-de-la-langue",    "Étude de la langue",       "Orthographe, grammaire, conjugaison — observer et comprendre."),
    sd("c2-fr-oral", "langage-oral",          "Langage oral",             "S'exprimer, raconter, décrire, argumenter simplement."),
  ], "Français"),

  dom("c2-ma", "mathematiques", "Mathématiques", [
    sd("c2-ma-nb",  "nombres-calcul",        "Nombres et calculs",  "Comprendre les nombres, poser et résoudre des calculs."),
    sd("c2-ma-gm",  "grandeurs-mesures",     "Grandeurs et mesures","Mesurer, comparer, utiliser des unités courantes."),
    sd("c2-ma-geo", "espace-geometrie",      "Espace et géométrie", "Se repérer, reconnaître et tracer des figures."),
  ], "Mathématiques"),

  dom("c2-qm", "questionner-le-monde", "Questionner le monde", [
    sd("c2-qm-viv",   "vivant",        "Le vivant, sa diversité et les fonctions vitales",              "Observer les animaux, les plantes, les cycles de vie."),
    sd("c2-qm-mat",   "matiere-objets","Matière, mouvement, énergie, information",                     "Caractériser des matériaux et des objets techniques."),
    sd("c2-qm-esp",   "espace-temps",  "La planète Terre, les êtres vivants dans leur environnement",  "Se repérer, observer son environnement proche."),
    sd("c2-qm-hum",   "monde-humain",  "Le monde construit par les Hommes",                            "Les activités humaines, les paysages, le temps."),
  ], "Questionner le monde"),

  dom("c2-emc", "emc", "Enseignement moral et civique", [
    sd("c2-emc-sens", "sensibilite",   "La sensibilité : soi et les autres",             "Comprendre et exprimer ses émotions, respecter les autres."),
    sd("c2-emc-droit","regle-et-droit","Le droit et la règle",                           "Comprendre les règles, les droits et les devoirs."),
    sd("c2-emc-jug",  "jugement",      "Le jugement : penser par soi-même et avec les autres","Distinguer le vrai du faux, débattre simplement."),
    sd("c2-emc-eng",  "engagement",    "L'engagement",                                   "Participer à la vie de la classe et de l'école."),
  ], "Enseignement moral et civique (EMC)"),

  dom("c2-arts", "arts", "Arts", [
    sd("c2-arts-pl", "arts-plastiques",  "Arts plastiques",    "Observer et créer : couleurs, formes, matières."),
    sd("c2-arts-mu", "education-musicale","Éducation musicale", "Écouter, chanter, distinguer les sons."),
  ], "Arts plastiques et Éducation musicale"),

  dom("c2-eps", "eps", "Éducation physique et sportive", [
    sd("c2-eps-ath", "activites-physiques","Activités physiques variées","Courir, sauter, lancer, nager."),
    sd("c2-eps-sante","sante-bien-etre",   "Santé et bien-être",         "Hygiène, alimentation, sécurité."),
  ], "Éducation physique et sportive (EPS)"),

  dom("c2-lv", "langues-vivantes", "Langues vivantes étrangères ou régionales", [
    sd("c2-lv-ecouter","ecouter-comprendre","Écouter et comprendre","Comprendre des mots, des consignes simples."),
    sd("c2-lv-lire",   "lire-comprendre",   "Lire et comprendre",   "Lire des mots et phrases simples."),
    sd("c2-lv-parler", "parler",            "Parler en continu et réagir","Nommer, se présenter, répondre."),
  ], "Langues vivantes étrangères ou régionales"),
];

// ── Cycle 3 — CM1, CM2, 6e ───────────────────────────────────────────────────

export const cycle3Domains: ProgramDomain[] = [
  dom("c3-fr", "francais", "Français", [
    sd("c3-fr-lec",  "lecture-comprehension","Lecture et compréhension","Lire et comprendre des textes variés, repérer l'implicite."),
    sd("c3-fr-ecr",  "ecriture",             "Écriture",                "Planifier, rédiger et réviser un texte organisé."),
    sd("c3-fr-lang", "etude-de-la-langue",   "Étude de la langue",      "Grammaire, conjugaison, orthographe — analyser et justifier."),
    sd("c3-fr-oral", "langage-oral",         "Langage oral",            "Exposer, argumenter, prendre la parole en public."),
  ], "Français"),

  dom("c3-ma", "mathematiques", "Mathématiques", [
    sd("c3-ma-nb",   "nombres-calcul",       "Nombres et calculs",       "Entiers, décimaux, fractions — opérations et propriétés."),
    sd("c3-ma-gm",   "grandeurs-mesures",    "Grandeurs et mesures",     "Longueurs, masses, durées, aires."),
    sd("c3-ma-geo",  "espace-geometrie",     "Espace et géométrie",      "Figures planes, solides, symétrie."),
    sd("c3-ma-pb",   "resolution-problemes", "Résolution de problèmes",  "Modéliser, chercher, tester, conclure."),
  ], "Mathématiques"),

  dom("c3-hg", "histoire-geographie", "Histoire-Géographie", [
    sd("c3-hg-hist", "histoire",    "Histoire",     "Situer des événements, lire une frise, identifier des sources."),
    sd("c3-hg-geo",  "geographie",  "Géographie",   "Lire des cartes, comprendre les espaces habités."),
  ], "Histoire-Géographie"),

  dom("c3-sci", "sciences-technologie", "Sciences et technologie", [
    sd("c3-sci-viv",  "vivant",         "Le vivant et la santé",      "Observer les êtres vivants, les cycles, l'environnement."),
    sd("c3-sci-mat",  "matiere-energie","Matière, mouvement, énergie","États de la matière, énergie."),
    sd("c3-sci-tech", "technologie",    "Technologie",                "Objets techniques, matériaux, fonctions."),
  ], "Sciences et technologie"),

  dom("c3-emc", "emc", "Enseignement moral et civique", [
    sd("c3-emc-sens", "sensibilite",   "La sensibilité",                              "Comprendre et exprimer ses émotions, respecter les différences."),
    sd("c3-emc-droit","regle-et-droit","Le droit et la règle",                        "Les règles à l'école, les lois en société."),
    sd("c3-emc-jug",  "jugement",      "Le jugement",                                 "Argumenter, distinguer faits et opinions."),
    sd("c3-emc-eng",  "engagement",    "L'engagement",                                "Participer, voter, s'engager dans la vie collective."),
  ], "Enseignement moral et civique (EMC)"),

  dom("c3-arts", "arts", "Arts", [
    sd("c3-arts-pl", "arts-plastiques",  "Arts plastiques",    "Créer, observer, analyser des œuvres."),
    sd("c3-arts-mu", "education-musicale","Éducation musicale", "Chanter, écouter, identifier des styles musicaux."),
  ], "Arts plastiques et Éducation musicale"),

  dom("c3-eps", "eps", "Éducation physique et sportive", [
    sd("c3-eps-ath",  "activites-physiques","Activités physiques variées","Courir, nager, sauter, lancer."),
    sd("c3-eps-sante","sante-bien-etre",    "Santé et bien-être",         "Alimentation, hygiène, effort."),
  ], "Éducation physique et sportive (EPS)"),

  dom("c3-lv", "langues-vivantes", "Langues vivantes étrangères ou régionales", [
    sd("c3-lv-ecouter","ecouter-comprendre","Écouter et comprendre","Comprendre des énoncés oraux simples."),
    sd("c3-lv-lire",   "lire-comprendre",   "Lire et comprendre",   "Lire des textes courts et simples."),
    sd("c3-lv-parler", "parler",            "Parler en continu et réagir","S'exprimer dans des situations simples."),
    sd("c3-lv-ecrire", "ecrire",            "Écrire",               "Produire des écrits courts."),
  ], "Langues vivantes étrangères ou régionales"),
];

// ── Collège (cycle 4 : 5e, 4e, 3e) ──────────────────────────────────────────
// Structure allégée — les sous-domaines seront détaillés par niveau.

export const cycle4Domains: ProgramDomain[] = [
  dom("col-fr",   "francais",          "Français",                        [], "Français"),
  dom("col-ma",   "mathematiques",     "Mathématiques",                   [], "Mathématiques"),
  dom("col-hg",   "histoire-geographie","Histoire-Géographie",            [], "Histoire-Géographie"),
  dom("col-svt",  "sciences-vie-terre","Sciences de la vie et de la Terre",[], "SVT"),
  dom("col-pc",   "physique-chimie",   "Physique-Chimie",                 [], "Physique-Chimie"),
  dom("col-tech", "technologie",       "Technologie",                     [], "Technologie"),
  dom("col-emc",  "emc",               "Enseignement moral et civique",   [], "EMC"),
  dom("col-arts", "arts",              "Arts",                            [], "Arts"),
  dom("col-eps",  "eps",               "Éducation physique et sportive",  [], "EPS"),
  dom("col-lv",   "langues-vivantes",  "Langues vivantes",                [], "Langues vivantes"),
];

// ── Lycée ────────────────────────────────────────────────────────────────────
// Structure allégée — à détailler par niveau (seconde, première, terminale).

export const lyceeDomains: ProgramDomain[] = [
  dom("lyc-fr",    "francais",          "Français",                        [], "Français"),
  dom("lyc-phi",   "philosophie",       "Philosophie",                     [], "Philosophie"),
  dom("lyc-ma",    "mathematiques",     "Mathématiques",                   [], "Mathématiques"),
  dom("lyc-hg",    "histoire-geographie","Histoire-Géographie-Géopolitique-Sciences politiques",[], "Histoire-Géographie"),
  dom("lyc-sci",   "sciences",          "Sciences",                        [], "Sciences"),
  dom("lyc-lv",    "langues-vivantes",  "Langues vivantes",                [], "Langues vivantes"),
  dom("lyc-spe",   "specialites",       "Enseignements de spécialité",     [], "Enseignements de spécialité"),
  dom("lyc-or",    "orientation",       "Orientation",                     [], "Orientation"),
  dom("lyc-me",    "methodologie",      "Méthodologie",                    [], "Méthodologie"),
];

// ── Index global par cycle ────────────────────────────────────────────────────

export const programCycleMaps: CycleDomainMap[] = [
  { cycle: "cycle-1", label: "Cycle 1 — Maternelle",             levels: ["maternelle"],                   domains: cycle1Domains },
  { cycle: "cycle-2", label: "Cycle 2 — CP, CE1, CE2",           levels: ["cp", "ce1", "ce2"],             domains: cycle2Domains },
  { cycle: "cycle-3", label: "Cycle 3 — CM1, CM2, 6e",           levels: ["cm1", "cm2", "6e"],             domains: cycle3Domains },
  { cycle: "cycle-4", label: "Cycle 4 — Collège (5e, 4e, 3e)",   levels: ["5e", "4e", "3e"],               domains: cycle4Domains },
  { cycle: "lycee",   label: "Lycée — Seconde, Première, Terminale", levels: ["seconde", "premiere", "terminale"], domains: lyceeDomains },
];

export function getDomainsByCycle(cycle: string): ProgramDomain[] {
  return programCycleMaps.find((m) => m.cycle === cycle)?.domains ?? [];
}

export function getDomainBySlug(cycle: string, domainSlug: string): ProgramDomain | undefined {
  return getDomainsByCycle(cycle).find((d) => d.slug === domainSlug);
}
