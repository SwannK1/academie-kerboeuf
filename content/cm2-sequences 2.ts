// Registre des séquences CM2 — couche de planification pédagogique.
// Règle absolue : 1 séquence = 1 compétence principale.
// Ce fichier ne contient aucun contenu de séance, leçon, exercice ou corrigé.
// Les champs optionnels (felixRole, visualToCreate) servent uniquement au pilotage.

export type Cm2SequenceStatus = "available" | "in-progress" | "upcoming";

export type Cm2Sequence = {
  slug: string;
  title: string;
  domain: string;
  subdomain: string;
  skill: string;
  status: Cm2SequenceStatus;
  level: "CM2";
  shortDescription?: string;
  teacherReference?: string;
  felixRole?: string;
  visualToCreate?: string;
};

// ── Français ──────────────────────────────────────────────────────────────────

const francaisSequences: Cm2Sequence[] = [
  // Lecture et compréhension — Inférences
  {
    slug: "fr-lc-reperer-indices",
    title: "Repérer les indices dans un texte",
    domain: "Lecture et compréhension",
    subdomain: "Inférences",
    skill: "Prélever des indices explicites et implicites dans un texte court.",
    status: "in-progress",
    level: "CM2",
    shortDescription: "Identifier les mots et groupes qui portent une information utile.",
    felixRole: "Enquêteur qui surligne les indices sur un document.",
    visualToCreate: "Fiche méthode : texte + zone d'indices",
  },
  {
    slug: "fr-lc-explicite-implicite",
    title: "Distinguer information explicite et information implicite",
    domain: "Lecture et compréhension",
    subdomain: "Inférences",
    skill: "Différencier ce qui est dit directement de ce qui est à déduire.",
    status: "in-progress",
    level: "CM2",
    shortDescription: "Classer les informations selon leur nature dans un tableau.",
    felixRole: "Lecteur qui trie les indices avant de conclure.",
    visualToCreate: "Tableau deux colonnes : explicite / implicite",
  },
  {
    slug: "fr-lc-faire-inference",
    title: "Construire une inférence à partir des indices",
    domain: "Lecture et compréhension",
    subdomain: "Inférences",
    skill: "Formuler une conclusion déduite d'indices relevés dans le texte.",
    status: "upcoming",
    level: "CM2",
    felixRole: "Détective qui relie les indices pour formuler une hypothèse.",
    visualToCreate: "Fiche : indices → hypothèse → justification",
  },
  {
    slug: "fr-lc-justifier-reponse",
    title: "Justifier une réponse par un passage du texte",
    domain: "Lecture et compréhension",
    subdomain: "Justification par le texte",
    skill: "Appuyer une réponse sur un extrait précis du texte.",
    status: "upcoming",
    level: "CM2",
    shortDescription: "Rédiger une phrase-réponse avec ancrage textuel.",
    felixRole: "Guide qui vérifie que chaque réponse cite sa source.",
    visualToCreate: "Modèle de phrase : « Je pense que… parce que dans le texte… »",
  },
  {
    slug: "fr-lc-idee-principale",
    title: "Identifier l'idée principale d'un texte",
    domain: "Lecture et compréhension",
    subdomain: "Compréhension globale",
    skill: "Formuler l'idée centrale d'un texte court en une phrase.",
    status: "upcoming",
    level: "CM2",
    teacherReference: "Lecture stratégique · CM2 Cycle 3",
    felixRole: "Lecteur qui résume l'essentiel avant de commenter.",
    visualToCreate: "Fiche : texte → idée principale en une phrase",
  },
  {
    slug: "fr-lc-fait-opinion",
    title: "Distinguer fait, opinion et interprétation",
    domain: "Lecture et compréhension",
    subdomain: "Posture critique",
    skill: "Reconnaître la nature d'une information dans un texte.",
    status: "upcoming",
    level: "CM2",
    felixRole: "Analyste qui étiquette chaque affirmation avant de valider.",
    visualToCreate: "Tableau trois colonnes : fait / opinion / interprétation",
  },

  // Production d'écrit
  {
    slug: "fr-pe-planifier",
    title: "Planifier un texte avant de l'écrire",
    domain: "Production d'écrit",
    subdomain: "Organisation du texte",
    skill: "Construire un plan en trois temps avant la rédaction.",
    status: "upcoming",
    level: "CM2",
    shortDescription: "Organiser les idées en amont pour structurer le brouillon.",
    felixRole: "Explorateur qui trace une carte avant de partir.",
    visualToCreate: "Fiche plan : début / développement / fin",
  },
  {
    slug: "fr-pe-utiliser-connecteurs",
    title: "Utiliser les connecteurs logiques",
    domain: "Production d'écrit",
    subdomain: "Cohérence et enchaînement",
    skill: "Relier des idées avec des connecteurs adaptés à leur relation logique.",
    status: "upcoming",
    level: "CM2",
    teacherReference: "Liste de connecteurs par type : chronologique, causal, oppositif",
    felixRole: "Messager qui relie les parties d'un rapport.",
    visualToCreate: "Tableau des connecteurs par fonction",
  },
  {
    slug: "fr-pe-reviser-brouillon",
    title: "Réviser son brouillon avec des critères",
    domain: "Production d'écrit",
    subdomain: "Révision et amélioration",
    skill: "Améliorer un texte en ciblant un critère à la fois.",
    status: "upcoming",
    level: "CM2",
    felixRole: "Correcteur qui relit avec une grille avant de valider.",
    visualToCreate: "Grille de relecture courte : consigne / ordre / ponctuation",
  },

  // Étude de la langue — Grammaire
  {
    slug: "fr-edl-reperer-verbe",
    title: "Repérer le verbe conjugué dans une phrase",
    domain: "Étude de la langue",
    subdomain: "Grammaire de la phrase",
    skill: "Identifier le verbe conjugué en appliquant le test de conjugaison.",
    status: "upcoming",
    level: "CM2",
    felixRole: "Analyste qui code les groupes dans une phrase.",
    visualToCreate: "Fiche codage : encadrer le verbe, souligner le sujet",
  },
  {
    slug: "fr-edl-identifier-sujet",
    title: "Identifier le groupe sujet",
    domain: "Étude de la langue",
    subdomain: "Grammaire de la phrase",
    skill: "Trouver le groupe sujet en posant la question « Qui est-ce qui ? ».",
    status: "upcoming",
    level: "CM2",
    felixRole: "Enquêteur qui interroge la phrase pour trouver le responsable.",
    visualToCreate: "Phrase annotée avec codage sujet / verbe / compléments",
  },
  {
    slug: "fr-edl-accords-sujet-verbe",
    title: "Appliquer l'accord sujet-verbe",
    domain: "Étude de la langue",
    subdomain: "Accords",
    skill: "Accorder le verbe avec son sujet, même éloigné ou inversé.",
    status: "upcoming",
    level: "CM2",
    teacherReference: "Cas particuliers : sujet inversé, sujet collectif",
    felixRole: "Vérificateur qui contrôle les accords avant de soumettre.",
    visualToCreate: "Fiche : sujet → genre, nombre → accord du verbe",
  },
  {
    slug: "fr-edl-accords-dans-gn",
    title: "Accorder dans le groupe nominal",
    domain: "Étude de la langue",
    subdomain: "Accords",
    skill: "Accorder déterminant, nom et adjectif au sein d'un groupe nominal.",
    status: "upcoming",
    level: "CM2",
    felixRole: "Détective qui vérifie la cohérence de chaque groupe.",
    visualToCreate: "Fiche : GN → chaîne d'accord déterminant / nom / adjectif",
  },

  // Oral
  {
    slug: "fr-oral-reformuler",
    title: "Reformuler une idée avec ses propres mots",
    domain: "Oral",
    subdomain: "Prise de parole",
    skill: "Restituer une information en changeant la formulation sans en changer le sens.",
    status: "upcoming",
    level: "CM2",
    felixRole: "Messager qui retranscrit fidèlement ce qu'il a compris.",
    visualToCreate: "Fiche : message d'origine → reformulation",
  },
];

// ── Mathématiques ─────────────────────────────────────────────────────────────

const mathematiquesSequences: Cm2Sequence[] = [
  // Nombres et calcul
  {
    slug: "ma-nc-calcul-mental-strategies",
    title: "Choisir une stratégie de calcul mental",
    domain: "Nombres et calcul",
    subdomain: "Calcul mental raisonné",
    skill: "Sélectionner la stratégie la plus efficace selon les nombres en jeu.",
    status: "in-progress",
    level: "CM2",
    shortDescription: "Décomposer, regrouper ou utiliser un complément selon la situation.",
    teacherReference: "Comparer plusieurs procédures au tableau avant de valider",
    felixRole: "Stratège qui choisit la méthode avant d'agir.",
    visualToCreate: "Fiche : calcul → stratégie utilisée → vérification",
  },
  {
    slug: "ma-nc-calcul-mental-expliquer",
    title: "Expliquer sa procédure de calcul mental",
    domain: "Nombres et calcul",
    subdomain: "Calcul mental raisonné",
    skill: "Verbaliser les étapes d'un calcul mental pour le rendre communicable.",
    status: "upcoming",
    level: "CM2",
    felixRole: "Expert qui justifie chaque étape de son raisonnement.",
    visualToCreate: "Fiche : calcul → étapes → phrase d'explication",
  },
  {
    slug: "ma-nc-multiplier-grands-nombres",
    title: "Multiplier des nombres entiers",
    domain: "Nombres et calcul",
    subdomain: "Calcul posé",
    skill: "Poser et effectuer une multiplication avec des nombres à plusieurs chiffres.",
    status: "upcoming",
    level: "CM2",
    teacherReference: "Multiplication posée : disposition, retenues, vérification",
    felixRole: "Mécanicien qui monte les étapes une à une.",
    visualToCreate: "Fiche : disposition de la multiplication posée",
  },
  {
    slug: "ma-nc-diviser-entiers",
    title: "Diviser un entier par un entier",
    domain: "Nombres et calcul",
    subdomain: "Calcul posé",
    skill: "Poser une division euclidienne et interpréter quotient et reste.",
    status: "upcoming",
    level: "CM2",
    teacherReference: "Distinguer quotient exact et quotient avec reste",
    felixRole: "Partageur qui distribue équitablement et comptabilise le reste.",
    visualToCreate: "Fiche : division posée + sens du quotient et du reste",
  },
  {
    slug: "ma-nc-comparer-fractions",
    title: "Comparer des fractions simples",
    domain: "Nombres et calcul",
    subdomain: "Fractions",
    skill: "Ordonner des fractions en utilisant le même dénominateur ou la droite graduée.",
    status: "upcoming",
    level: "CM2",
    felixRole: "Cartographe qui place les fractions sur une droite.",
    visualToCreate: "Fiche : droite numérique graduée en fractions",
  },

  // Résolution de problèmes
  {
    slug: "ma-pb-identifier-donnees",
    title: "Identifier les données utiles dans un problème",
    domain: "Résolution de problèmes",
    subdomain: "Lecture de l'énoncé",
    skill: "Séparer les données nécessaires des données inutiles ou pièges.",
    status: "in-progress",
    level: "CM2",
    shortDescription: "Lire un énoncé en ciblant la question et les informations nécessaires.",
    felixRole: "Détective qui trie les indices avant d'enquêter.",
    visualToCreate: "Fiche : données utiles / données inutiles / question",
  },
  {
    slug: "ma-pb-choisir-operation",
    title: "Choisir l'opération adaptée à la situation",
    domain: "Résolution de problèmes",
    subdomain: "Modélisation",
    skill: "Relier la situation mathématique à l'opération qui la modélise.",
    status: "upcoming",
    level: "CM2",
    teacherReference: "Tableau de correspondance : réunion → addition, partage → division…",
    felixRole: "Ingénieur qui modélise la situation avant de calculer.",
    visualToCreate: "Carte des situations → opérations",
  },
  {
    slug: "ma-pb-resoudre-etapes",
    title: "Résoudre un problème à plusieurs étapes",
    domain: "Résolution de problèmes",
    subdomain: "Problèmes complexes",
    skill: "Décomposer un problème en sous-questions pour l'aborder étape par étape.",
    status: "upcoming",
    level: "CM2",
    felixRole: "Explorateur qui avance étape par étape vers la solution.",
    visualToCreate: "Fiche : étape 1 / étape 2 / résultat final",
  },
  {
    slug: "ma-pb-verifier-coherence",
    title: "Vérifier la cohérence d'un résultat",
    domain: "Résolution de problèmes",
    subdomain: "Validation",
    skill: "Estimer si un résultat est plausible et en vérifier la cohérence.",
    status: "upcoming",
    level: "CM2",
    teacherReference: "Ordre de grandeur, opération inverse, unité du résultat",
    felixRole: "Vérificateur qui contrôle le résultat avant de rendre le rapport.",
    visualToCreate: "Fiche : résultat → test de cohérence",
  },

  // Grandeurs et mesures
  {
    slug: "ma-gm-conversions-longueurs",
    title: "Convertir des unités de longueur",
    domain: "Grandeurs et mesures",
    subdomain: "Longueurs",
    skill: "Passer d'une unité à une autre dans le système métrique des longueurs.",
    status: "upcoming",
    level: "CM2",
    felixRole: "Cartographe qui exprime les distances dans l'unité adaptée.",
    visualToCreate: "Tableau de conversions : km / hm / dam / m / dm / cm / mm",
  },
  {
    slug: "ma-gm-perimetre-aire",
    title: "Distinguer périmètre et aire",
    domain: "Grandeurs et mesures",
    subdomain: "Surfaces",
    skill: "Différencier le contour d'une figure de la surface qu'elle occupe.",
    status: "upcoming",
    level: "CM2",
    felixRole: "Architecte qui mesure les murs d'une salle, puis son sol.",
    visualToCreate: "Fiche : figure → périmètre (contour) vs aire (intérieur)",
  },
];

// ── Histoire-Géographie ───────────────────────────────────────────────────────

const histoireGeoSequences: Cm2Sequence[] = [
  // Histoire — Lecture de documents
  {
    slug: "hg-hi-identifier-document",
    title: "Identifier la nature d'un document historique",
    domain: "Histoire",
    subdomain: "Lecture de sources",
    skill: "Déterminer si un document est une archive, un témoignage, une image ou une carte.",
    status: "in-progress",
    level: "CM2",
    shortDescription: "Classer le document selon sa nature avant de l'interpréter.",
    felixRole: "Archiviste qui étiquette les documents avant de les lire.",
    visualToCreate: "Fiche d'identification : nature / date / auteur ou source",
  },
  {
    slug: "hg-hi-contextualiser-document",
    title: "Contextualiser un document dans son époque",
    domain: "Histoire",
    subdomain: "Lecture de sources",
    skill: "Relier la date et le lieu d'un document à une période historique connue.",
    status: "upcoming",
    level: "CM2",
    teacherReference: "Frise chronologique Cycle 3 : Antiquité / Moyen Âge / Époque moderne / Époque contemporaine",
    felixRole: "Historien qui place chaque découverte sur la frise.",
    visualToCreate: "Frise chronologique simplifiée avec repères",
  },
  {
    slug: "hg-hi-relever-indices",
    title: "Relever les indices d'un document historique",
    domain: "Histoire",
    subdomain: "Analyse de sources",
    skill: "Prélever les informations utiles d'un document pour répondre à une question.",
    status: "upcoming",
    level: "CM2",
    felixRole: "Détective qui surligne les preuves dans une archive.",
    visualToCreate: "Fiche : document → indices → ce qu'ils apprennent",
  },
  {
    slug: "hg-hi-situer-chronologie",
    title: "Situer un événement dans la chronologie",
    domain: "Histoire",
    subdomain: "Chronologie",
    skill: "Placer un événement sur une frise en distinguant siècle, période et repère.",
    status: "upcoming",
    level: "CM2",
    felixRole: "Cartographe du temps qui positionne chaque découverte.",
    visualToCreate: "Frise à compléter avec événements CM2",
  },

  // Géographie — Espaces et cartes
  {
    slug: "hg-ge-lire-carte",
    title: "Lire une carte avec sa légende",
    domain: "Géographie",
    subdomain: "Lecture de cartes",
    skill: "Utiliser le titre, l'orientation et la légende pour comprendre une carte.",
    status: "in-progress",
    level: "CM2",
    shortDescription: "Identifier les éléments d'une carte avant de localiser les lieux.",
    felixRole: "Explorateur qui déchiffre une carte avant de tracer son itinéraire.",
    visualToCreate: "Carte annotée : titre / rose des vents / légende / échelle",
  },
  {
    slug: "hg-ge-localiser-points-cardinaux",
    title: "Localiser des lieux avec les points cardinaux",
    domain: "Géographie",
    subdomain: "Repérage spatial",
    skill: "Décrire la position d'un lieu par rapport à un autre avec le vocabulaire géographique.",
    status: "upcoming",
    level: "CM2",
    felixRole: "Navigateur qui guide son équipe avec une boussole.",
    visualToCreate: "Fiche : carte + rose des vents + questions de localisation",
  },
  {
    slug: "hg-ge-decrire-espace",
    title: "Décrire l'organisation d'un espace",
    domain: "Géographie",
    subdomain: "Organisation des espaces",
    skill: "Expliquer comment un espace est structuré en identifiant ses éléments caractéristiques.",
    status: "upcoming",
    level: "CM2",
    felixRole: "Géographe qui présente un territoire à son équipe.",
    visualToCreate: "Fiche descriptive : espace → éléments naturels / humains",
  },
];

// ── Sciences ──────────────────────────────────────────────────────────────────

const sciencesSequences: Cm2Sequence[] = [
  // Démarche d'investigation
  {
    slug: "sc-di-observer-decrire",
    title: "Observer et décrire sans interpréter",
    domain: "Sciences et technologie",
    subdomain: "Démarche d'investigation",
    skill: "Formuler une observation factuelle sans l'expliquer prématurément.",
    status: "in-progress",
    level: "CM2",
    shortDescription: "Distinguer ce qu'on voit de ce qu'on suppose.",
    felixRole: "Scientifique qui consigne ses observations avant de conclure.",
    visualToCreate: "Tableau : observation / hypothèse / conclusion",
  },
  {
    slug: "sc-di-formuler-hypothese",
    title: "Formuler une hypothèse scientifique",
    domain: "Sciences et technologie",
    subdomain: "Démarche d'investigation",
    skill: "Proposer une explication provisoire vérifiable à partir d'une observation.",
    status: "upcoming",
    level: "CM2",
    teacherReference: "Différence entre hypothèse et explication définitive",
    felixRole: "Chercheur qui propose une idée à tester avant de conclure.",
    visualToCreate: "Fiche : « Je suppose que… parce que j'observe… »",
  },
  {
    slug: "sc-di-comparer-resultats",
    title: "Comparer des résultats pour dégager une conclusion",
    domain: "Sciences et technologie",
    subdomain: "Démarche d'investigation",
    skill: "Analyser plusieurs résultats en les comparant pour formuler une conclusion.",
    status: "upcoming",
    level: "CM2",
    felixRole: "Analyste qui compare deux situations pour isoler la variable.",
    visualToCreate: "Tableau comparatif : condition A vs condition B → conclusion",
  },
  {
    slug: "sc-di-rediger-conclusion",
    title: "Rédiger une conclusion scientifique",
    domain: "Sciences et technologie",
    subdomain: "Communication scientifique",
    skill: "Écrire une conclusion courte ancrée dans les résultats observés.",
    status: "upcoming",
    level: "CM2",
    teacherReference: "Structure : observation → résultat → conclusion prudente",
    felixRole: "Rédacteur du rapport final de l'expédition.",
    visualToCreate: "Modèle de phrase : « D'après les résultats… on peut conclure que… »",
  },

  // Le vivant
  {
    slug: "sc-vi-conditions-germination",
    title: "Identifier les conditions nécessaires à la germination",
    domain: "Sciences et technologie",
    subdomain: "Le vivant",
    skill: "Relier les conditions expérimentales à la présence ou l'absence de germination.",
    status: "upcoming",
    level: "CM2",
    felixRole: "Naturaliste qui observe ses graines en laboratoire.",
    visualToCreate: "Tableau : condition → résultat observé",
  },
];

// ── EMC ───────────────────────────────────────────────────────────────────────

const emcSequences: Cm2Sequence[] = [
  {
    slug: "emc-argumenter-point-de-vue",
    title: "Exprimer et défendre un point de vue",
    domain: "EMC",
    subdomain: "Expression et argumentation",
    skill: "Formuler un point de vue personnel en l'appuyant sur des arguments.",
    status: "upcoming",
    level: "CM2",
    felixRole: "Débatteur qui respecte les règles de la discussion.",
    visualToCreate: "Fiche : point de vue + argument + exemple",
  },
  {
    slug: "emc-respecter-regles-vie",
    title: "Comprendre l'utilité des règles de vie collective",
    domain: "EMC",
    subdomain: "Vie collective et règles",
    skill: "Expliquer pourquoi des règles communes sont nécessaires dans un groupe.",
    status: "upcoming",
    level: "CM2",
    felixRole: "Médiateur qui explique les règles de l'Académie.",
    visualToCreate: "Fiche : règle → pourquoi elle existe → ce qu'elle protège",
  },
  {
    slug: "emc-distinguer-droits-devoirs",
    title: "Distinguer droits et devoirs du citoyen",
    domain: "EMC",
    subdomain: "Valeurs de la République",
    skill: "Identifier ce que la République garantit et ce qu'elle demande.",
    status: "upcoming",
    level: "CM2",
    felixRole: "Citoyen de l'Académie qui connaît ses droits et ses responsabilités.",
    visualToCreate: "Tableau : droits / devoirs / valeurs associées",
  },
];

// ── Registre complet ──────────────────────────────────────────────────────────

export const cm2Sequences: Cm2Sequence[] = [
  ...francaisSequences,
  ...mathematiquesSequences,
  ...histoireGeoSequences,
  ...sciencesSequences,
  ...emcSequences,
];

// ── Accesseurs ────────────────────────────────────────────────────────────────

export function getCm2SequencesByDomain(domain: string): Cm2Sequence[] {
  return cm2Sequences.filter((s) => s.domain === domain);
}

export function getCm2SequencesBySubjectAndStatus(
  subjectSlug: string,
  status: Cm2SequenceStatus,
): Cm2Sequence[] {
  return cm2Sequences.filter(
    (s) =>
      slugMatchesSubject(s, subjectSlug) && s.status === status,
  );
}

export function getCm2SequencesBySubjectSlug(subjectSlug: string): Cm2Sequence[] {
  return cm2Sequences.filter((s) => slugMatchesSubject(s, subjectSlug));
}

export function getCm2SequenceBySlug(slug: string): Cm2Sequence | undefined {
  return cm2Sequences.find((s) => s.slug === slug);
}

function slugMatchesSubject(seq: Cm2Sequence, subjectSlug: string): boolean {
  const prefixMap: Record<string, string[]> = {
    francais: ["fr-"],
    mathematiques: ["ma-"],
    "histoire-geographie": ["hg-"],
    sciences: ["sc-"],
    emc: ["emc-"],
  };
  const prefixes = prefixMap[subjectSlug] ?? [];
  return prefixes.some((p) => seq.slug.startsWith(p));
}

// ── Statistiques de pilotage ──────────────────────────────────────────────────

export function getCm2SequencesStats() {
  const total = cm2Sequences.length;
  const available = cm2Sequences.filter((s) => s.status === "available").length;
  const inProgress = cm2Sequences.filter((s) => s.status === "in-progress").length;
  const upcoming = cm2Sequences.filter((s) => s.status === "upcoming").length;
  return { total, available, inProgress, upcoming };
}
