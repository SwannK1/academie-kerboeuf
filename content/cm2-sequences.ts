// Cartographie pédagogique CM2 — séquences structurelles uniquement.
// Chaque séquence = 1 compétence principale. Pas de contenu détaillé.

export type Cm2SequenceStatus =
  | "en préparation"
  | "bientôt";

export type Cm2Sequence = {
  slug: string;
  title: string;
  domain: string;
  subdomain: string;
  skill: string;
  status: Cm2SequenceStatus;
  // Champs optionnels
  visualStatus?: string;
  teacherReference?: string;
  felixMethodTag?: string;
};

export const cm2Sequences: Cm2Sequence[] = [
  // ── Français · Lecture et compréhension ──────────────────────────────────
  {
    slug: "cm2-lecture-idee-principale",
    title: "Identifier l'idée principale d'un texte",
    domain: "Français",
    subdomain: "Lecture et compréhension",
    skill: "Repérer l'idée principale d'un texte documentaire ou narratif et la formuler en une phrase.",
    status: "en préparation",
    felixMethodTag: "lecture-stratégique",
  },
  {
    slug: "cm2-lecture-inference",
    title: "Comprendre l'implicite d'un texte",
    domain: "Français",
    subdomain: "Lecture et compréhension",
    skill: "Construire une inférence en reliant les indices du texte à ses connaissances et justifier sa réponse.",
    status: "en préparation",
    felixMethodTag: "lecture-stratégique",
  },
  {
    slug: "cm2-lecture-point-vue",
    title: "Identifier le point de vue d'un narrateur",
    domain: "Français",
    subdomain: "Lecture et compréhension",
    skill: "Distinguer le point de vue interne, externe ou omniscient dans un texte narratif.",
    status: "bientôt",
    felixMethodTag: "lecture-stratégique",
  },
  {
    slug: "cm2-lecture-document-informatif",
    title: "Lire et comprendre un document informatif",
    domain: "Français",
    subdomain: "Lecture et compréhension",
    skill: "Prélever des informations dans un document non-continu (tableau, infographie, schéma).",
    status: "bientôt",
  },

  // ── Français · Production d'écrit ────────────────────────────────────────
  {
    slug: "cm2-ecrit-planification",
    title: "Planifier un texte narratif",
    domain: "Français",
    subdomain: "Production d'écrit",
    skill: "Élaborer un plan en trois parties (situation initiale, péripétie, dénouement) avant la rédaction.",
    status: "en préparation",
    felixMethodTag: "écriture",
  },
  {
    slug: "cm2-ecrit-connecteurs",
    title: "Utiliser les connecteurs logiques et temporels",
    domain: "Français",
    subdomain: "Production d'écrit",
    skill: "Employer des connecteurs variés pour organiser la progression d'un texte et relier les idées.",
    status: "en préparation",
    felixMethodTag: "écriture",
  },
  {
    slug: "cm2-ecrit-revision",
    title: "Réviser son écrit avec des critères",
    domain: "Français",
    subdomain: "Production d'écrit",
    skill: "Améliorer un brouillon en vérifiant la cohérence, la ponctuation et les accords à l'aide d'une grille.",
    status: "bientôt",
  },

  // ── Français · Étude de la langue ────────────────────────────────────────
  {
    slug: "cm2-grammaire-constituants-phrase",
    title: "Identifier les constituants de la phrase",
    domain: "Français",
    subdomain: "Grammaire",
    skill: "Repérer le verbe conjugué, le groupe sujet et les compléments dans des phrases complexes.",
    status: "en préparation",
    teacherReference: "Programme Cycle 3 · Étude de la langue",
  },
  {
    slug: "cm2-grammaire-propositions",
    title: "Distinguer proposition principale et subordonnée",
    domain: "Français",
    subdomain: "Grammaire",
    skill: "Identifier une proposition subordonnée relative ou conjonctive dans une phrase complexe.",
    status: "bientôt",
    teacherReference: "Programme Cycle 3 · Étude de la langue",
  },
  {
    slug: "cm2-conjugaison-modes-temps",
    title: "Conjuguer aux principaux temps du récit",
    domain: "Français",
    subdomain: "Conjugaison",
    skill: "Distinguer et employer correctement imparfait, passé simple et plus-que-parfait dans un récit.",
    status: "en préparation",
  },
  {
    slug: "cm2-orthographe-accords-groupe-nominal",
    title: "Accorder dans le groupe nominal",
    domain: "Français",
    subdomain: "Orthographe",
    skill: "Appliquer les règles d'accord en genre et en nombre au sein du groupe nominal (déterminant, nom, adjectif).",
    status: "en préparation",
  },
  {
    slug: "cm2-orthographe-homophones",
    title: "Distinguer les homophones grammaticaux",
    domain: "Français",
    subdomain: "Orthographe",
    skill: "Choisir correctement parmi les homophones grammaticaux courants (a/à, on/ont, ces/ses, leur/leurs…).",
    status: "bientôt",
  },
  {
    slug: "cm2-vocabulaire-famille-derivation",
    title: "Comprendre la formation des mots par dérivation",
    domain: "Français",
    subdomain: "Vocabulaire",
    skill: "Identifier préfixes et suffixes pour comprendre le sens d'un mot inconnu et enrichir son vocabulaire.",
    status: "bientôt",
  },

  // ── Mathématiques · Nombres et calculs ───────────────────────────────────
  {
    slug: "cm2-nombres-grands-nombres",
    title: "Lire, écrire et comparer de grands nombres",
    domain: "Mathématiques",
    subdomain: "Nombres et calculs",
    skill: "Lire, écrire, comparer et ranger des entiers jusqu'au milliard.",
    status: "en préparation",
    teacherReference: "Programme Cycle 3 · Mathématiques",
  },
  {
    slug: "cm2-calcul-mental-strategies",
    title: "Calculer mentalement avec des stratégies raisonnées",
    domain: "Mathématiques",
    subdomain: "Nombres et calculs",
    skill: "Choisir une stratégie de calcul mental adaptée (décomposition, regroupement, complément) et l'expliquer.",
    status: "en préparation",
    felixMethodTag: "calcul-stratégique",
  },
  {
    slug: "cm2-fractions-decimaux",
    title: "Comprendre les fractions et les nombres décimaux",
    domain: "Mathématiques",
    subdomain: "Nombres et calculs",
    skill: "Passer d'une écriture fractionnaire à une écriture décimale et comparer des nombres décimaux.",
    status: "en préparation",
  },
  {
    slug: "cm2-operations-posees",
    title: "Poser et effectuer les quatre opérations",
    domain: "Mathématiques",
    subdomain: "Nombres et calculs",
    skill: "Effectuer une multiplication de deux nombres à plusieurs chiffres et une division euclidienne posée.",
    status: "bientôt",
  },

  // ── Mathématiques · Résolution de problèmes ──────────────────────────────
  {
    slug: "cm2-problemes-etapes",
    title: "Résoudre un problème en plusieurs étapes",
    domain: "Mathématiques",
    subdomain: "Résolution de problèmes",
    skill: "Identifier les données utiles, choisir les opérations et rédiger une réponse justifiée en plusieurs étapes.",
    status: "en préparation",
    felixMethodTag: "résolution-problèmes",
  },
  {
    slug: "cm2-grandeurs-mesures",
    title: "Utiliser et convertir les unités de mesure",
    domain: "Mathématiques",
    subdomain: "Grandeurs et mesures",
    skill: "Convertir des longueurs, des masses et des contenances dans des situations de résolution de problèmes.",
    status: "bientôt",
  },

  // ── Mathématiques · Géométrie ─────────────────────────────────────────────
  {
    slug: "cm2-geometrie-figures-planes",
    title: "Reconnaître et construire des figures planes",
    domain: "Mathématiques",
    subdomain: "Géométrie",
    skill: "Identifier les propriétés des quadrilatères et des triangles, et les construire avec les instruments.",
    status: "bientôt",
  },

  // ── Sciences ──────────────────────────────────────────────────────────────
  {
    slug: "cm2-sciences-demarche-investigation",
    title: "Pratiquer une démarche d'investigation",
    domain: "Sciences",
    subdomain: "Démarche scientifique",
    skill: "Observer un phénomène, formuler une hypothèse, la confronter aux résultats et rédiger une conclusion.",
    status: "en préparation",
    felixMethodTag: "investigation",
  },
  {
    slug: "cm2-sciences-vivant",
    title: "Comprendre les fonctions du vivant",
    domain: "Sciences",
    subdomain: "Le vivant",
    skill: "Décrire les grandes fonctions des êtres vivants (nutrition, reproduction) et établir des liens de causalité.",
    status: "bientôt",
  },

  // ── Histoire ──────────────────────────────────────────────────────────────
  {
    slug: "cm2-histoire-document-historique",
    title: "Analyser un document historique",
    domain: "Histoire",
    subdomain: "Méthodes historiques",
    skill: "Identifier la nature, la date et le contexte d'un document, puis relever des indices pour comprendre une époque.",
    status: "en préparation",
    felixMethodTag: "archives",
    teacherReference: "Programme Cycle 3 · Histoire",
  },
  {
    slug: "cm2-histoire-republique",
    title: "Comprendre la naissance de la République",
    domain: "Histoire",
    subdomain: "La France au XIXe siècle",
    skill: "Situer les grandes étapes de l'établissement de la République française et ses valeurs fondatrices.",
    status: "bientôt",
    teacherReference: "Programme Cycle 3 · Histoire",
  },
  {
    slug: "cm2-histoire-xxe-siecle",
    title: "Repérer les grands événements du XXe siècle",
    domain: "Histoire",
    subdomain: "Le XXe siècle",
    skill: "Situer sur une frise les guerres mondiales, la décolonisation et la construction européenne.",
    status: "bientôt",
  },

  // ── Géographie ───────────────────────────────────────────────────────────
  {
    slug: "cm2-geo-lecture-carte",
    title: "Lire et interpréter une carte",
    domain: "Géographie",
    subdomain: "Lire l'espace",
    skill: "Utiliser l'orientation, la légende et les repères spatiaux pour localiser et décrire un espace.",
    status: "en préparation",
    felixMethodTag: "cartographie",
  },
  {
    slug: "cm2-geo-territoires",
    title: "Comprendre l'organisation d'un territoire",
    domain: "Géographie",
    subdomain: "Espaces et territoires",
    skill: "Décrire les caractéristiques d'un territoire français (relief, population, activités) à partir de documents.",
    status: "bientôt",
  },
];

// Domaines uniques pour regroupement UI
export function getCm2SequenceDomains(): string[] {
  return [...new Set(cm2Sequences.map((s) => s.domain))];
}

// Séquences filtrées par domaine
export function getCm2SequencesByDomain(domain: string): Cm2Sequence[] {
  return cm2Sequences.filter((s) => s.domain === domain);
}
