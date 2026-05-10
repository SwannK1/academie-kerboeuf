export type AccentKey = "gold" | "jade" | "sky" | "ember";

export type HistoryChapter = {
  title: string;
  text: string;
  accentColor: AccentKey;
};

export type EducationalValue = {
  name: string;
  description: string;
  accentColor: AccentKey;
  source: string; // Qui incarne cette valeur
};

export type MissionTheme = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  examples: string[];
  accentColor: AccentKey;
};

export type AcademyPlace = {
  name: string;
  category: "maternelle" | "primaire" | "college" | "lycee" | "transversal";
  inhabitant: string;
  description: string;
  accentColor: AccentKey;
};

export type CycleEntry = {
  id: string;
  name: string;
  fullName: string;
  levelLabels: string[];
  description: string;
  theme: string;
  accentColor: AccentKey;
};

export type UniversePathway = {
  step: string;
  title: string;
  description: string;
  accentColor: AccentKey;
};

// ─── Histoire de l'Académie ──────────────────────────────────────────────────
// Composée à partir des descriptions des niveaux, des biographies de professeurs
// et des narratives d'univers présents dans le code.

export const historyChapters: HistoryChapter[] = [
  {
    title: "Une école secrète, une conviction simple",
    text: "L'Académie Kerboeuf est née d'une conviction : apprendre peut être immersif sans être moins sérieux. Chaque matière peut devenir une porte, chaque exercice peut devenir une mission — sans jamais sacrifier l'exigence scolaire. Ici, les élèves n'entrent pas dans une salle de classe. Ils entrent dans un monde.",
    accentColor: "jade",
  },
  {
    title: "Un monde à la carte",
    text: "Du Jardin des Premières Découvertes à la Salle du Conseil Final, l'Académie est organisée en territoires distincts. Chaque niveau possède ses propres repères, son guide référent et son atmosphère particulière. La Salle des lanternes (CP), la Cartothèque secrète (CM1), le Bureau des enquêtes (4e) — chaque lieu est conçu pour ancrer les apprentissages dans une mémoire durable.",
    accentColor: "gold",
  },
  {
    title: "Des guides, pas des maîtres",
    text: "Les professeurs de l'Académie ne sont pas des figures d'autorité abstraites. Ce sont des personnages avec une méthode signature, un espace reconnaissable et une façon unique d'accompagner leurs élèves. Zoé installe la confiance. Gaston exige qu'on nomme sa stratégie. Félix fait entrer dans l'enquête. Akira prépare le sceau final.",
    accentColor: "ember",
  },
  {
    title: "L'exigence au cœur de l'immersion",
    text: "L'univers narratif de Kerboeuf sert la pédagogie — jamais l'inverse. Les missions restent rigoureusement ancrées dans les programmes : les compétences sont identifiées, les questions progressent de l'indice vers la synthèse, et la correction est toujours guidée, précise, transférable. L'imaginaire donne envie d'entrer dans la tâche ; la méthode garde l'activité scolaire solide.",
    accentColor: "sky",
  },
];

// ─── Valeurs pédagogiques ─────────────────────────────────────────────────────
// Synthétisées à partir des coreValues et pédagogies des professeurs référents.

export const educationalValues: EducationalValue[] = [
  {
    name: "Comprendre avant de réussir",
    description:
      "Aucune réponse n'est validée sans qu'une stratégie ne l'accompagne. L'Académie valorise le chemin autant que la destination.",
    accentColor: "jade",
    source: "Zoé · Gaston · Félix",
  },
  {
    name: "L'erreur comme étape",
    description:
      "Les fausses pistes font partie du dossier. Chaque erreur est un indice que les professeurs savent transformer en leçon mémorable.",
    accentColor: "gold",
    source: "Félix · Enzo",
  },
  {
    name: "La méthode avant tout",
    description:
      "La bonne réponse ne suffit pas. Ce qui compte, c'est de pouvoir l'expliquer, la défendre et la transférer dans un autre contexte.",
    accentColor: "ember",
    source: "Gaston · Akira · Maïa",
  },
  {
    name: "Progressif et exigeant",
    description:
      "Chaque mission avance par paliers : indice, raisonnement, synthèse. L'exigence monte progressivement, sans jamais décourager.",
    accentColor: "sky",
    source: "Noisette · Oria · Enzo",
  },
  {
    name: "L'imaginaire au service du réel",
    description:
      "Le cadre narratif est un vecteur de motivation — il donne envie d'entrer dans la tâche et laisse ensuite toute la place à la compétence.",
    accentColor: "jade",
    source: "Félix · Zoé · Esteban",
  },
  {
    name: "Autonomie construite",
    description:
      "De CP en Terminale, les élèves gagnent progressivement en indépendance. L'objectif final : une méthode qu'on peut utiliser seul.",
    accentColor: "gold",
    source: "Oria · Akira · Maïa",
  },
];

// ─── Types de missions ────────────────────────────────────────────────────────
// Basés sur academyThemes dans content/academy.ts

export const missionThemes: MissionTheme[] = [
  {
    id: "jade",
    name: "Exploration verte",
    tagline: "Observer, découvrir, comprendre",
    description:
      "Missions d'exploration et d'observation. L'élève part en territoire inconnu et revient avec une compréhension nouvelle, une trace lisible et une méthode réutilisable.",
    examples: ["Atelier Lecture", "Observation scientifique", "Découverte documentaire"],
    accentColor: "jade",
  },
  {
    id: "gold",
    name: "Expédition dorée",
    tagline: "Choisir, appliquer, justifier",
    description:
      "Missions de calcul, de stratégie et de résolution de problèmes. L'élève choisit une méthode, l'applique face au défi, puis la justifie pour que la classe puisse la comparer.",
    examples: ["Calcul mental", "Résolution de problème", "Stratégie de révision"],
    accentColor: "gold",
  },
  {
    id: "sky",
    name: "Carte azur",
    tagline: "Lire, repérer, organiser",
    description:
      "Missions géographiques, spatiales et organisationnelles. L'élève lit les repères, organise l'information dans l'espace et trace des itinéraires de savoir clairs.",
    examples: ["Lecture de carte", "Raisonnement scientifique", "Organisation de réponse"],
    accentColor: "sky",
  },
  {
    id: "ember",
    name: "Archives braise",
    tagline: "Chercher, croiser, argumenter",
    description:
      "Missions historiques, documentaires et d'analyse. L'élève plonge dans les archives, croise les sources, identifie ce qui est preuve et construit une réponse argumentée.",
    examples: ["Analyse de document", "Enquête documentaire", "Rédaction historique"],
    accentColor: "ember",
  },
];

export const universePathways: UniversePathway[] = [
  {
    step: "01",
    title: "Découverte",
    description:
      "L’élève entre dans un lieu, un document ou une situation. Le but est de comprendre le contexte avant de produire une réponse.",
    accentColor: "jade",
  },
  {
    step: "02",
    title: "Entraînement",
    description:
      "La compétence est travaillée par gestes courts : repérer, calculer, reformuler, comparer, expliquer.",
    accentColor: "gold",
  },
  {
    step: "03",
    title: "Mission",
    description:
      "L’élève mobilise une méthode dans un défi plus complet, souvent narratif, mais toujours relié à une compétence scolaire.",
    accentColor: "sky",
  },
  {
    step: "04",
    title: "Correction",
    description:
      "La correction sert à comprendre le raisonnement attendu, pas seulement à vérifier une réponse.",
    accentColor: "ember",
  },
  {
    step: "05",
    title: "Validation",
    description:
      "La trace finale stabilise ce qui peut être réutilisé dans une autre séance, un autre niveau ou un parcours plus long.",
    accentColor: "gold",
  },
];

// ─── Lieux principaux ─────────────────────────────────────────────────────────
// Issus des champs mood.name, headquarters et universeNarrative des niveaux/professeurs.

export const mainPlaces: AcademyPlace[] = [
  {
    name: "Jardin des Premières Découvertes",
    category: "maternelle",
    inhabitant: "Les maîtresses de maternelle",
    description:
      "L'entrée dans l'Académie. Un espace de langage, de geste, de jeu et d'exploration qui prépare les tout premiers apprentissages avant le grand saut vers le CP.",
    accentColor: "jade",
  },
  {
    name: "Salle des lanternes",
    category: "primaire",
    inhabitant: "Zoé — CP",
    description:
      "Lumière chaude, carnets ouverts et premières cartes de mission. Les repères visuels installent les premiers codes de lecture. Ici, on apprend à oser avant d'apprendre à maîtriser.",
    accentColor: "jade",
  },
  {
    name: "Galerie des indices",
    category: "primaire",
    inhabitant: "Gaston — CE1",
    description:
      "Tableaux effaçables couverts de colonnes de méthodes, chronomètre affiché et tournois de stratégies. La question signature : « Quelle stratégie tu as choisie ? »",
    accentColor: "gold",
  },
  {
    name: "Observatoire des notions",
    category: "primaire",
    inhabitant: "Esteban — CE2",
    description:
      "Silence actif, codes couleur constants et schémas tracés en temps réel. Rouge pour les exceptions, bleu pour les règles, vert pour les exemples. Chaque notion a sa place et sa trace.",
    accentColor: "sky",
  },
  {
    name: "Cartothèque secrète",
    category: "primaire",
    inhabitant: "Noisette — CM1",
    description:
      "Un labyrinthe de documents superposés, annotés et reliés par des fils de couleur. Le document arrive toujours avant la question. La curiosité précède la tâche.",
    accentColor: "ember",
  },
  {
    name: "Quartier général de Félix",
    category: "primaire",
    inhabitant: "Félix — CM2",
    description:
      "Salle d'enquête active avec dossiers codés et indices reliés sur le tableau. Chaque mission est une vraie enquête. Chaque réponse doit être justifiée comme une preuve.",
    accentColor: "gold",
  },
  {
    name: "Passerelle du collège",
    category: "college",
    inhabitant: "Oria — 6e",
    description:
      "Espace lumineux et rassurant, entre méthodes affichées et fiches de transition. Oria s'assure que les méthodes du primaire deviennent des routines solides dès l'entrée au collège.",
    accentColor: "jade",
  },
  {
    name: "Salle des mécanismes",
    category: "college",
    inhabitant: "Enzo — 5e",
    description:
      "Zones dédiées à chaque étape du raisonnement. Le tableau d'Enzo est toujours divisé en trois colonnes : hypothèse, test, conclusion. Les bonnes réponses sans justification ne comptent pas.",
    accentColor: "sky",
  },
  {
    name: "Bureau des enquêtes",
    category: "college",
    inhabitant: "Maïa — 4e",
    description:
      "Bibliothèque documentaire impeccablement rangée. Chaque dossier porte un code, chaque archive est datée et annotée. L'ordre est une méthode, pas une contrainte.",
    accentColor: "ember",
  },
  {
    name: "Salle du conseil final",
    category: "college",
    inhabitant: "Akira — 3e",
    description:
      "Sobre, sombre, d'une précision absolue. Pas de décorations — seulement les plans de synthèse d'Akira. Entrer ici, c'est entrer dans la dernière étape. Chaque mot compte.",
    accentColor: "gold",
  },
  {
    name: "Archives des spécialités",
    category: "lycee",
    inhabitant: "Maïa — Première",
    description:
      "Dossiers approfondis pour apprendre à choisir, argumenter et hiérarchiser. Les élèves apprennent que travailler vite n'est pas la même chose que travailler bien.",
    accentColor: "ember",
  },
  {
    name: "Conseil des synthèses",
    category: "lycee",
    inhabitant: "Akira — Terminale",
    description:
      "L'ultime espace de l'Académie. On y prépare les synthèses finales, les choix d'orientation et les prises de parole décisives. Le sceau d'Akira est la dernière validation.",
    accentColor: "gold",
  },
];

// ─── Cycles de l'Académie ─────────────────────────────────────────────────────

export const academyCycles: CycleEntry[] = [
  {
    id: "cycle1",
    name: "Cycle 1",
    fullName: "Cycle des apprentissages premiers",
    levelLabels: ["PS", "MS", "GS"],
    description:
      "Le langage, le geste, le jeu et l'exploration fondent les premiers apprentissages. Les élèves entrent dans les rituels, osent nommer, manipuler et raconter.",
    theme: "Jardin des Premières Découvertes",
    accentColor: "jade",
  },
  {
    id: "cycle2",
    name: "Cycle 2",
    fullName: "Cycle des apprentissages fondamentaux",
    levelLabels: ["CP", "CE1", "CE2"],
    description:
      "Lire, compter, oser répondre. Les premiers codes s'installent progressivement, les stratégies deviennent conscientes, les notions commencent à se structurer.",
    theme: "Salle des lanternes · Galerie des indices · Observatoire",
    accentColor: "gold",
  },
  {
    id: "cycle3",
    name: "Cycle 3",
    fullName: "Cycle de consolidation",
    levelLabels: ["CM1", "CM2", "6e"],
    description:
      "Lecture documentaire, enquête, transition. Les élèves apprennent à relier les informations, à justifier une réponse et à transférer une méthode vers le collège.",
    theme: "Cartothèque · Quartier général · Passerelle",
    accentColor: "ember",
  },
  {
    id: "cycle4",
    name: "Cycle 4",
    fullName: "Cycle des approfondissements",
    levelLabels: ["5e", "4e", "3e"],
    description:
      "Raisonnement, argumentation, synthèse. Les élèves apprennent à décomposer, croiser les sources et préparer les grandes étapes du collège : brevet, orientation.",
    theme: "Salle des mécanismes · Bureau · Conseil final",
    accentColor: "sky",
  },
  {
    id: "lycee",
    name: "Lycée",
    fullName: "Cycle lycéen",
    levelLabels: ["Seconde", "Première", "Terminale"],
    description:
      "Spécialités, autonomie, examen. Les élèves construisent des dossiers approfondis, choisissent leurs orientations et préparent des synthèses décisives.",
    theme: "Grande passerelle · Archives · Conseil des synthèses",
    accentColor: "gold",
  },
];
