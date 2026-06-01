// Registre des sequences CM2 — couche de planification pedagogique.
// Regle absolue : 1 sequence = 1 competence principale.
// Ce fichier ne contient aucun contenu de seance, lecon, exercice ou corrige.

export type Cm2SequenceStatus = "available" | "in-progress" | "upcoming";

export type Cm2PdfSlotType =
  | "lesson"
  | "exercises"
  | "correction"
  | "projection"
  | "parent-sheet";

export type Cm2PdfSlot = {
  type: Cm2PdfSlotType;
  label: string;
  status: "planned";
};

export type Cm2Session = {
  order: 1 | 2 | 3 | 4;
  title: string;
  purpose: string;
  status: "planned";
};

export type Cm2Sequence = {
  slug: string;
  title: string;
  subjectSlug: string;
  domain: string;
  subdomain: string;
  priorityNotion: string;
  skill: string;
  status: Cm2SequenceStatus;
  level: "CM2";
  shortDescription: string;
  felixRole: string;
  sessions: Cm2Session[];
  pdfSlots: Cm2PdfSlot[];
};

const plannedPdfSlots: Cm2PdfSlot[] = [
  { type: "lesson", label: "Lecon PDF", status: "planned" },
  { type: "exercises", label: "Exercices PDF", status: "planned" },
  { type: "correction", label: "Correction PDF", status: "planned" },
  { type: "projection", label: "Projection PDF", status: "planned" },
  { type: "parent-sheet", label: "Fiche parent", status: "planned" },
];

function buildSessions(
  sequenceSlug: string,
  titles: [string, string, string, string],
): Cm2Session[] {
  return titles.map((title, index) => ({
    order: (index + 1) as 1 | 2 | 3 | 4,
    title,
    purpose: `Jalon de planification ${index + 1} pour ${sequenceSlug}.`,
    status: "planned",
  }));
}

export const cm2Sequences: Cm2Sequence[] = [
  {
    slug: "fr-lc-reperer-indices",
    title: "Reperer les indices dans un texte",
    subjectSlug: "francais",
    domain: "Lecture et comprehension",
    subdomain: "Inferer avec le texte",
    priorityNotion: "Indices textuels",
    skill: "Prelever des indices explicites et implicites dans un texte court.",
    status: "upcoming",
    level: "CM2",
    shortDescription: "Installer une methode de reperage avant toute interpretation.",
    felixRole: "Guide methodologique discret qui aide a chercher les preuves.",
    sessions: buildSessions("fr-lc-reperer-indices", [
      "Observer le texte et la question",
      "Surligner les indices utiles",
      "Classer les indices trouves",
      "Formuler une reponse appuyee",
    ]),
    pdfSlots: plannedPdfSlots,
  },
  {
    slug: "fr-lc-explicite-implicite",
    title: "Distinguer explicite et implicite",
    subjectSlug: "francais",
    domain: "Lecture et comprehension",
    subdomain: "Inferer avec le texte",
    priorityNotion: "Explicite / implicite",
    skill: "Differencier ce qui est dit directement de ce qui doit etre deduit.",
    status: "upcoming",
    level: "CM2",
    shortDescription: "Stabiliser la difference entre information visible et information deduite.",
    felixRole: "Guide discret qui invite a verifier ce qui est vraiment ecrit.",
    sessions: buildSessions("fr-lc-explicite-implicite", [
      "Identifier les informations ecrites",
      "Distinguer ce qui se deduit",
      "Comparer plusieurs reponses",
      "Justifier la categorie choisie",
    ]),
    pdfSlots: plannedPdfSlots,
  },
  {
    slug: "fr-edl-accords-gn",
    title: "Accorder dans le groupe nominal",
    subjectSlug: "francais",
    domain: "Etude de la langue",
    subdomain: "Accords",
    priorityNotion: "Chaine d'accord du groupe nominal",
    skill: "Accorder determinant, nom et adjectif dans un groupe nominal.",
    status: "upcoming",
    level: "CM2",
    shortDescription: "Suivre la chaine d'accord sans entrer dans une lecon detaillee.",
    felixRole: "Guide discret qui pointe le noyau du groupe nominal.",
    sessions: buildSessions("fr-edl-accords-gn", [
      "Reperer le nom noyau",
      "Identifier genre et nombre",
      "Propager les accords",
      "Relire avec une grille courte",
    ]),
    pdfSlots: plannedPdfSlots,
  },
  {
    slug: "ma-nc-calcul-mental-strategies",
    title: "Choisir une strategie de calcul mental",
    subjectSlug: "mathematiques",
    domain: "Nombres et calculs",
    subdomain: "Calcul mental raisonne",
    priorityNotion: "Strategies de calcul",
    skill: "Selectionner la strategie la plus efficace selon les nombres en jeu.",
    status: "upcoming",
    level: "CM2",
    shortDescription: "Comparer plusieurs procedures avant de valider un calcul.",
    felixRole: "Guide discret qui demande pourquoi une strategie est choisie.",
    sessions: buildSessions("ma-nc-calcul-mental-strategies", [
      "Comparer des procedures",
      "Choisir une strategie",
      "Expliquer les etapes",
      "Verifier par estimation",
    ]),
    pdfSlots: plannedPdfSlots,
  },
  {
    slug: "ma-pb-donnees-utiles",
    title: "Identifier les donnees utiles dans un probleme",
    subjectSlug: "mathematiques",
    domain: "Resolution de problemes",
    subdomain: "Lecture de l'enonce",
    priorityNotion: "Donnees utiles",
    skill: "Separer les informations necessaires des informations inutiles ou pieges.",
    status: "upcoming",
    level: "CM2",
    shortDescription: "Lire un enonce en ciblant la question et les informations utiles.",
    felixRole: "Guide discret qui aide a trier les donnees avant de calculer.",
    sessions: buildSessions("ma-pb-donnees-utiles", [
      "Lire la question",
      "Relever toutes les donnees",
      "Trier utile et inutile",
      "Construire la demarche",
    ]),
    pdfSlots: plannedPdfSlots,
  },
  {
    slug: "ma-gm-perimetre-aire",
    title: "Distinguer perimetre et aire",
    subjectSlug: "mathematiques",
    domain: "Grandeurs et mesures",
    subdomain: "Surfaces",
    priorityNotion: "Perimetre / aire",
    skill: "Differencier le contour d'une figure de la surface qu'elle occupe.",
    status: "upcoming",
    level: "CM2",
    shortDescription: "Eviter la confusion entre mesurer autour et mesurer dedans.",
    felixRole: "Guide discret qui fait verbaliser ce qui est mesure.",
    sessions: buildSessions("ma-gm-perimetre-aire", [
      "Observer contour et interieur",
      "Associer les bonnes unites",
      "Comparer deux figures",
      "Choisir la mesure attendue",
    ]),
    pdfSlots: plannedPdfSlots,
  },
  {
    slug: "hg-hi-identifier-document",
    title: "Identifier un document historique",
    subjectSlug: "histoire-geographie",
    domain: "Histoire",
    subdomain: "Lecture de sources",
    priorityNotion: "Nature d'un document",
    skill: "Determiner si un document est une archive, un temoignage, une image ou une carte.",
    status: "upcoming",
    level: "CM2",
    shortDescription: "Presenter un document avant de l'interpreter.",
    felixRole: "Guide discret qui fait nommer la source avant l'analyse.",
    sessions: buildSessions("hg-hi-identifier-document", [
      "Observer le document",
      "Nommer sa nature",
      "Relever date et auteur",
      "Formuler ce qu'il permet d'etudier",
    ]),
    pdfSlots: plannedPdfSlots,
  },
  {
    slug: "hg-ge-lire-carte",
    title: "Lire une carte avec sa legende",
    subjectSlug: "histoire-geographie",
    domain: "Geographie",
    subdomain: "Lecture de cartes",
    priorityNotion: "Legende cartographique",
    skill: "Utiliser le titre, l'orientation et la legende pour comprendre une carte.",
    status: "upcoming",
    level: "CM2",
    shortDescription: "Installer les reflexes de lecture d'une carte scolaire.",
    felixRole: "Guide discret qui verifie titre, orientation et legende.",
    sessions: buildSessions("hg-ge-lire-carte", [
      "Identifier les elements de la carte",
      "Lire la legende",
      "Localiser des informations",
      "Rediger une observation geographique",
    ]),
    pdfSlots: plannedPdfSlots,
  },
  {
    slug: "sc-di-formuler-hypothese",
    title: "Formuler une hypothese scientifique",
    subjectSlug: "sciences",
    domain: "Sciences et technologie",
    subdomain: "Demarche d'investigation",
    priorityNotion: "Hypothese verifiable",
    skill: "Proposer une explication provisoire verifiable a partir d'une observation.",
    status: "upcoming",
    level: "CM2",
    shortDescription: "Distinguer observation, hypothese et conclusion.",
    felixRole: "Guide discret qui rappelle de tester avant de conclure.",
    sessions: buildSessions("sc-di-formuler-hypothese", [
      "Decrire l'observation",
      "Proposer une hypothese",
      "Imaginer un test simple",
      "Preparer la trace de conclusion",
    ]),
    pdfSlots: plannedPdfSlots,
  },
  {
    slug: "emc-argumenter-point-de-vue",
    title: "Exprimer et defendre un point de vue",
    subjectSlug: "emc",
    domain: "EMC",
    subdomain: "Expression et argumentation",
    priorityNotion: "Argument",
    skill: "Formuler un point de vue personnel en l'appuyant sur des arguments.",
    status: "upcoming",
    level: "CM2",
    shortDescription: "Entrainer une parole claire, respectueuse et justifiee.",
    felixRole: "Guide discret qui rappelle ecoute, exemple et justification.",
    sessions: buildSessions("emc-argumenter-point-de-vue", [
      "Formuler son avis",
      "Chercher un argument",
      "Ecouter une objection",
      "Reformuler une position justifiee",
    ]),
    pdfSlots: plannedPdfSlots,
  },
];

export function getCm2SequencesByDomain(domain: string): Cm2Sequence[] {
  return cm2Sequences.filter((sequence) => sequence.domain === domain);
}

export function getCm2SequencesBySubjectAndStatus(
  subjectSlug: string,
  status: Cm2SequenceStatus,
): Cm2Sequence[] {
  return cm2Sequences.filter(
    (sequence) => sequence.subjectSlug === subjectSlug && sequence.status === status,
  );
}

export function getCm2SequencesBySubjectSlug(subjectSlug: string): Cm2Sequence[] {
  return cm2Sequences.filter((sequence) => sequence.subjectSlug === subjectSlug);
}

export function getCm2SequenceBySlug(slug: string): Cm2Sequence | undefined {
  return cm2Sequences.find((sequence) => sequence.slug === slug);
}

export function getCm2SequencesStats() {
  const total = cm2Sequences.length;
  const available = cm2Sequences.filter((sequence) => sequence.status === "available").length;
  const inProgress = cm2Sequences.filter((sequence) => sequence.status === "in-progress").length;
  const upcoming = cm2Sequences.filter((sequence) => sequence.status === "upcoming").length;
  return { total, available, inProgress, upcoming };
}
