import type { AcademyStage, AcademySubject } from "@/content/academy";
import type { CurriculumLevelSlug } from "@/content/curriculum";

export type PedagogicalPlaceCycle =
  | "Cycle 1"
  | "Cycle 2"
  | "Cycle 3"
  | "Cycle 4"
  | "Lycée"
  | "Transversal";

export type PedagogicalPlaceQualityStatus =
  | "draft"
  | "review"
  | "ready"
  | "archived";

export type PedagogicalPlaceUse =
  | "homepage"
  | "hub"
  | "subject-page"
  | "interactive-map";

export type PedagogicalPlaceAccessibility = {
  readableContrast?: boolean;
  keyboardNavigation?: boolean;
  reducedMotionFriendly?: boolean;
  altTextRequired?: boolean;
  notes?: string[];
};

export type PedagogicalPlacePrintability = {
  printable: boolean;
  format?: "A4" | "A5" | "card" | "poster";
  notes?: string;
};

export type PedagogicalPlacePersonRef = {
  slug: string;
  name: string;
  role?: string;
};

export type PedagogicalPlaceInteractiveZone = {
  id: string;
  name: string;
  description?: string;
  linkedDisciplines?: AcademySubject[];
};

export type PedagogicalPlaceSupport = {
  id: string;
  label: string;
  type:
    | "affichage"
    | "carte"
    | "fiche"
    | "manipulable"
    | "projection"
    | "ressource numérique"
    | "trace écrite";
  description?: string;
};

export type PedagogicalPlaceActivityLink = {
  slug: string;
  title: string;
  href?: string;
  type: "mission" | "activité" | "parcours";
};

export type PedagogicalPlaceUniverseRef = {
  id: string;
  name: string;
  stage: AcademyStage;
};

export type PedagogicalPlace = {
  id: string;
  slug: string;
  name: string;
  cycle: PedagogicalPlaceCycle;
  levelSlug?: CurriculumLevelSlug;
  levelLabel?: string;
  section?: string;
  parentUniverse: PedagogicalPlaceUniverseRef;
  shortDescription: string;
  longDescription?: string;
  pedagogicalFunction: string;
  disciplines: AcademySubject[];
  competencies: string[];
  professors?: PedagogicalPlacePersonRef[];
  students?: PedagogicalPlacePersonRef[];
  interactiveZones?: PedagogicalPlaceInteractiveZone[];
  visibleSupports?: PedagogicalPlaceSupport[];
  uses: PedagogicalPlaceUse[];
  image?: string;
  altText?: string;
  qualityStatus: PedagogicalPlaceQualityStatus;
  accessibility?: PedagogicalPlaceAccessibility;
  printability?: PedagogicalPlacePrintability;
  links?: PedagogicalPlaceActivityLink[];
  tags: string[];
  displayOrder: number;
};

export const elementaryExplorersUniverse = {
  id: "les-lisieres-des-explorateurs",
  name: "Les Lisières des Explorateurs",
  stage: "primaire",
} satisfies PedagogicalPlaceUniverseRef;

const elementaryDefaults = {
  parentUniverse: elementaryExplorersUniverse,
  uses: ["hub", "interactive-map"],
  qualityStatus: "draft",
  accessibility: {
    readableContrast: true,
    keyboardNavigation: true,
    reducedMotionFriendly: true,
    altTextRequired: true,
  },
} satisfies Partial<PedagogicalPlace>;

export const elementaryPedagogicalPlaces: PedagogicalPlace[] = [
  {
    ...elementaryDefaults,
    id: "place-primaire-cour-des-explorateurs",
    slug: "cour-des-explorateurs",
    name: "La Cour des Explorateurs",
    cycle: "Transversal",
    section: "Primaire",
    shortDescription:
      "Le seuil vivant des Lisières, pensé pour lancer les rituels, les défis courts et les coopérations.",
    longDescription:
      "La Cour des Explorateurs sert de point de départ aux parcours du primaire. On y rassemble les consignes, les premières hypothèses et les traces collectives avant de rejoindre les salles spécialisées.",
    pedagogicalFunction:
      "Installer l'entrée en activité, ritualiser les départs de mission et rendre visibles les apprentissages coopératifs.",
    disciplines: ["Français", "Mathématiques", "Sciences", "Géographie"],
    competencies: [
      "Comprendre une consigne orale ou écrite",
      "Coopérer dans un défi court",
      "Formuler une hypothèse avant d'agir",
    ],
    professors: [
      { slug: "zoe", name: "Zoé", role: "Premiers rituels" },
      { slug: "gaston", name: "Gaston", role: "Défis de stratégie" },
      { slug: "felix", name: "Félix", role: "Lancement d'enquête" },
    ],
    students: [
      { slug: "zoe", name: "Zoé la Tortue Curieuse" },
      { slug: "gaston", name: "Gaston le Hérisson Astucieux" },
      { slug: "felix", name: "Félix le Lynx Stratège" },
    ],
    interactiveZones: [
      {
        id: "tableau-des-departs",
        name: "Tableau des départs",
        description: "Zone de lancement des objectifs, consignes et rôles.",
        linkedDisciplines: ["Français", "Mathématiques"],
      },
      {
        id: "banc-des-hypotheses",
        name: "Banc des hypothèses",
        description: "Espace pour verbaliser ce que l'on pense chercher.",
        linkedDisciplines: ["Sciences", "Géographie"],
      },
    ],
    visibleSupports: [
      {
        id: "carte-des-lisieres",
        label: "Carte des Lisières",
        type: "carte",
        description: "Repère visuel des lieux du primaire.",
      },
      {
        id: "rituels-de-depart",
        label: "Rituels de départ",
        type: "affichage",
        description: "Liste des gestes attendus avant une mission.",
      },
    ],
    uses: ["homepage", "hub", "interactive-map"],
    image: "/images/academie-kerboeuf/lieux/primaire/portail-primaire.png",
    altText:
      "Cour d'école immersive avec une carte des Lisières et des zones de départ de mission.",
    qualityStatus: "review",
    printability: {
      printable: true,
      format: "poster",
      notes: "Peut devenir une affiche de repérage pour la classe.",
    },
    links: [
      {
        slug: "mission-inference",
        title: "Mission Inférence",
        href: "/primaire/cm2/missions/mission-inference",
        type: "mission",
      },
    ],
    tags: ["entrée", "rituel", "coopération", "orientation"],
    displayOrder: 10,
  },
  {
    ...elementaryDefaults,
    id: "place-primaire-cartotheque-des-lisieres",
    slug: "cartotheque-des-lisieres",
    name: "La Cartothèque des Lisières",
    cycle: "Cycle 3",
    levelSlug: "cm1",
    levelLabel: "CM1-CM2",
    shortDescription:
      "Une salle de cartes, de plans et de documents pour apprendre à se repérer et organiser l'information.",
    pedagogicalFunction:
      "Faire lire, produire et comparer des représentations spatiales.",
    disciplines: ["Géographie", "Sciences", "Français"],
    competencies: [
      "Lire une carte ou un plan",
      "Organiser des informations spatiales",
      "Justifier un itinéraire ou un choix de représentation",
    ],
    professors: [{ slug: "noisette", name: "Noisette" }],
    students: [
      { slug: "noisette", name: "Noisette l'Écureuil Ingénieux" },
      { slug: "felix", name: "Félix" },
    ],
    interactiveZones: [
      {
        id: "mur-des-cartes",
        name: "Mur des cartes",
        description: "Plans, cartes et itinéraires annotés par les élèves.",
        linkedDisciplines: ["Géographie", "Sciences"],
      },
      {
        id: "table-des-itineraires",
        name: "Table des itinéraires",
        description: "Espace de comparaison des trajets et des légendes.",
        linkedDisciplines: ["Géographie", "Français"],
      },
    ],
    visibleSupports: [
      { id: "atlas-collectif", label: "Atlas collectif", type: "carte" },
      {
        id: "fiches-legende",
        label: "Fiches de légende",
        type: "fiche",
      },
    ],
    links: [
      {
        slug: "cartographe-du-monde",
        title: "Cartographe du Monde",
        href: "/primaire/cm2/missions/cartographe-du-monde",
        type: "mission",
      },
    ],
    tags: ["cartes", "géographie", "repérage"],
    displayOrder: 20,
  },
  {
    ...elementaryDefaults,
    id: "place-primaire-bibliotheque-des-explorateurs",
    slug: "bibliotheque-des-explorateurs",
    name: "La Bibliothèque des Explorateurs",
    cycle: "Cycle 2",
    levelLabel: "CP-CM2",
    shortDescription:
      "Le lieu des textes, des indices et des lectures guidées.",
    pedagogicalFunction:
      "Soutenir la compréhension, l'inférence, la fluence et la culture littéraire.",
    disciplines: ["Français", "Lecture", "Production d’écrit"],
    competencies: [
      "Prélever des indices dans un texte",
      "Reformuler une information",
      "Justifier une interprétation",
    ],
    professors: [
      { slug: "zoe", name: "Zoé" },
      { slug: "felix", name: "Félix" },
    ],
    students: [
      { slug: "zoe", name: "Zoé la Tortue Curieuse" },
      { slug: "felix", name: "Félix" },
    ],
    interactiveZones: [
      {
        id: "rayonnage-des-indices",
        name: "Rayonnage des indices",
        description: "Sélection de textes et documents classés par stratégies de lecture.",
        linkedDisciplines: ["Français", "Lecture"],
      },
      {
        id: "table-des-carnets",
        name: "Table des carnets",
        description: "Carnets de lecteur et traces de compréhension.",
        linkedDisciplines: ["Français", "Production d’écrit"],
      },
    ],
    visibleSupports: [
      {
        id: "carnets-lecteur",
        label: "Carnets de lecteur",
        type: "trace écrite",
      },
      {
        id: "marque-pages-methode",
        label: "Marque-pages méthode",
        type: "fiche",
      },
    ],
    links: [
      {
        slug: "mission-inference",
        title: "Mission Inférence",
        href: "/primaire/cm2/missions/mission-inference",
        type: "mission",
      },
      {
        slug: "lecture-strategique",
        title: "Lecture Stratégique",
        href: "/primaire/cm2/missions/lecture-strategique",
        type: "mission",
      },
    ],
    tags: ["lecture", "inférence", "indices"],
    displayOrder: 30,
  },
  {
    ...elementaryDefaults,
    id: "place-primaire-atelier-des-mathematiques",
    slug: "atelier-des-mathematiques",
    name: "L'Atelier des Mathématiques",
    cycle: "Cycle 2",
    levelLabel: "CP-CM2",
    shortDescription:
      "Un atelier de manipulation, de calcul mental et de résolution de problèmes.",
    pedagogicalFunction:
      "Passer de la manipulation à la stratégie explicitée, puis à la vérification.",
    disciplines: ["Mathématiques", "Calcul mental", "Résolution de problèmes"],
    competencies: [
      "Choisir une stratégie de calcul",
      "Représenter une situation problème",
      "Vérifier la cohérence d'un résultat",
    ],
    professors: [{ slug: "gaston", name: "Gaston" }],
    students: [
      { slug: "gaston", name: "Gaston le Hérisson Astucieux" },
      { slug: "felix", name: "Félix" },
    ],
    interactiveZones: [
      {
        id: "table-des-manipulations",
        name: "Table des manipulations",
        description: "Matériel pour représenter, déplacer, mesurer et comparer.",
        linkedDisciplines: ["Mathématiques"],
      },
      {
        id: "mur-des-strategies",
        name: "Mur des stratégies",
        description: "Affichage des procédures utiles et des erreurs fécondes.",
        linkedDisciplines: ["Mathématiques", "Français"],
      },
    ],
    visibleSupports: [
      {
        id: "cartes-problemes",
        label: "Cartes-problèmes",
        type: "fiche",
      },
      {
        id: "materiel-mesure",
        label: "Matériel de mesure",
        type: "manipulable",
      },
    ],
    links: [
      {
        slug: "mission-calcul",
        title: "Mission Calcul",
        href: "/primaire/cm2/missions/mission-calcul",
        type: "mission",
      },
      {
        slug: "defis-mathematiques",
        title: "Défis Mathématiques",
        href: "/primaire/cm2/missions/defis-mathematiques",
        type: "mission",
      },
    ],
    tags: ["calcul", "problèmes", "stratégies"],
    displayOrder: 40,
  },
  {
    ...elementaryDefaults,
    id: "place-primaire-observatoire",
    slug: "observatoire",
    name: "L'Observatoire",
    cycle: "Cycle 2",
    levelLabel: "CE2-CM2",
    shortDescription:
      "Une zone d'observation pour décrire, mesurer, comparer et garder trace.",
    pedagogicalFunction:
      "Installer la démarche d'observation avant la formulation d'une règle ou d'une conclusion.",
    disciplines: ["Sciences", "Géographie", "Mathématiques"],
    competencies: [
      "Observer avec précision",
      "Mesurer et comparer",
      "Formuler une conclusion courte",
    ],
    professors: [{ slug: "esteban", name: "Esteban" }],
    students: [
      { slug: "esteban", name: "Esteban le Manchot Aventurier" },
      { slug: "felix", name: "Félix" },
    ],
    interactiveZones: [
      {
        id: "station-de-releves",
        name: "Station de relevés",
        description: "Point de collecte des mesures et observations régulières.",
        linkedDisciplines: ["Sciences", "Mathématiques"],
      },
      {
        id: "fenetre-des-phenomenes",
        name: "Fenêtre des phénomènes",
        description: "Zone d'observation du ciel, du vivant et des changements.",
        linkedDisciplines: ["Sciences", "Géographie"],
      },
    ],
    visibleSupports: [
      {
        id: "carnets-terrain",
        label: "Carnets de terrain",
        type: "trace écrite",
      },
      {
        id: "grilles-releves",
        label: "Grilles de relevés",
        type: "fiche",
      },
    ],
    links: [
      {
        slug: "journal-des-traces-de-felix",
        title: "Le journal des traces de Félix",
        href: "/primaire/cm2/missions/journal-des-traces-de-felix",
        type: "mission",
      },
    ],
    tags: ["observation", "mesure", "trace"],
    displayOrder: 50,
  },
  {
    ...elementaryDefaults,
    id: "place-primaire-laboratoire",
    slug: "laboratoire",
    name: "Le Laboratoire",
    cycle: "Cycle 3",
    levelLabel: "CM1-CM2",
    shortDescription:
      "Le lieu des hypothèses, des expériences simples et des conclusions argumentées.",
    pedagogicalFunction:
      "Structurer les démarches scientifiques : questionner, tester, conclure.",
    disciplines: ["Sciences", "Français"],
    competencies: [
      "Formuler une hypothèse",
      "Comparer des observations",
      "Rédiger une conclusion scientifique simple",
    ],
    professors: [
      { slug: "esteban", name: "Esteban" },
      { slug: "felix", name: "Félix" },
    ],
    students: [
      { slug: "esteban", name: "Esteban le Manchot Aventurier" },
      { slug: "felix", name: "Félix" },
    ],
    interactiveZones: [
      {
        id: "paillasses-essai",
        name: "Paillasses d'essai",
        description: "Espaces de manipulation pour tester une hypothèse simple.",
        linkedDisciplines: ["Sciences"],
      },
      {
        id: "mur-des-hypotheses",
        name: "Mur des hypothèses",
        description: "Affichage des questions, protocoles et conclusions.",
        linkedDisciplines: ["Sciences", "Français"],
      },
    ],
    visibleSupports: [
      {
        id: "fiches-protocole",
        label: "Fiches protocole",
        type: "fiche",
      },
      {
        id: "plateaux-experience",
        label: "Plateaux d'expérience",
        type: "manipulable",
      },
    ],
    links: [
      {
        slug: "laboratoire-scientifique",
        title: "Laboratoire Scientifique",
        href: "/primaire/cm2/missions/laboratoire-scientifique",
        type: "mission",
      },
    ],
    tags: ["sciences", "hypothèses", "expérience"],
    displayOrder: 60,
  },
  {
    ...elementaryDefaults,
    id: "place-primaire-salle-informatique",
    slug: "salle-informatique",
    name: "La Salle Informatique",
    cycle: "Cycle 3",
    levelLabel: "CM1-CM2",
    shortDescription:
      "Un espace numérique pour rechercher, produire, organiser et publier avec méthode.",
    pedagogicalFunction:
      "Construire des gestes numériques responsables et transférables.",
    disciplines: ["Français", "Géographie", "Sciences"],
    competencies: [
      "Chercher une information avec prudence",
      "Organiser un document numérique",
      "Identifier les traces et règles de publication",
    ],
    professors: [
      { slug: "hector", name: "Hector le Castor" },
      { slug: "felix", name: "Félix" },
    ],
    students: [
      { slug: "noisette", name: "Noisette l'Écureuil Ingénieux" },
      { slug: "felix", name: "Félix" },
    ],
    interactiveZones: [
      {
        id: "postes-recherche-guidee",
        name: "Postes de recherche guidée",
        description: "Postes organisés pour chercher, vérifier et citer une information.",
        linkedDisciplines: ["Français", "Sciences"],
      },
      {
        id: "mur-des-sources",
        name: "Mur des sources fiables",
        description: "Repères pour distinguer source, auteur et preuve.",
        linkedDisciplines: ["Français", "Géographie"],
      },
    ],
    visibleSupports: [
      {
        id: "checklist-recherche",
        label: "Checklist de recherche",
        type: "fiche",
      },
      {
        id: "modele-diaporama",
        label: "Modèle de diaporama",
        type: "projection",
      },
    ],
    links: [
      {
        slug: "corps-relations-consentement-internet",
        title: "Corps, relations, consentement et Internet",
        href: "/primaire/cm2/missions/corps-relations-consentement-internet",
        type: "mission",
      },
    ],
    tags: ["numérique", "recherche", "CRCN"],
    displayOrder: 70,
  },
  {
    ...elementaryDefaults,
    id: "place-primaire-salle-arts",
    slug: "salle-arts",
    name: "La Salle d'Arts",
    cycle: "Transversal",
    section: "Primaire",
    shortDescription:
      "Une salle de création pour observer, composer, illustrer et restituer.",
    pedagogicalFunction:
      "Relier production plastique, vocabulaire précis et restitution d'une démarche.",
    disciplines: ["Français"],
    competencies: [
      "Décrire une production",
      "Choisir une intention",
      "Présenter une démarche de création",
    ],
    professors: [
      { slug: "pablo", name: "Pablo l'Orang-outan" },
      { slug: "felix", name: "Félix" },
    ],
    students: [
      { slug: "noisette", name: "Noisette l'Écureuil Ingénieux" },
      { slug: "felix", name: "Félix" },
    ],
    interactiveZones: [
      {
        id: "mur-exposition",
        name: "Mur d'exposition",
        description: "Espace pour afficher les productions finalisées.",
        linkedDisciplines: ["Français"],
      },
      {
        id: "table-materiaux",
        name: "Table des matériaux",
        description: "Matériaux, essais et brouillons accessibles.",
        linkedDisciplines: ["Français"],
      },
    ],
    visibleSupports: [
      {
        id: "carnets-croquis",
        label: "Carnets de croquis",
        type: "trace écrite",
      },
      {
        id: "cartels-exposition",
        label: "Cartels d'exposition",
        type: "affichage",
      },
    ],
    links: [
      {
        slug: "musee-des-imaginaires-de-felix",
        title: "Le musée des imaginaires de Félix",
        href: "/primaire/cm2/missions/musee-des-imaginaires-de-felix",
        type: "mission",
      },
    ],
    tags: ["arts", "création", "restitution"],
    displayOrder: 80,
  },
  {
    ...elementaryDefaults,
    id: "place-primaire-gymnase",
    slug: "gymnase",
    name: "Le Gymnase",
    cycle: "Transversal",
    section: "Primaire",
    shortDescription:
      "Un espace moteur pour coopérer, mesurer ses progrès et respecter des règles communes.",
    pedagogicalFunction:
      "Transformer les activités physiques en situations de langage, de coopération et de stratégie.",
    disciplines: ["Mathématiques", "Français"],
    competencies: [
      "Respecter une règle collective",
      "Mesurer ou comparer une performance",
      "Verbaliser une stratégie d'équipe",
    ],
    professors: [
      { slug: "max", name: "Max le Kangourou" },
      { slug: "felix", name: "Félix" },
    ],
    students: [
      { slug: "gaston", name: "Gaston le Hérisson Astucieux" },
      { slug: "felix", name: "Félix" },
    ],
    interactiveZones: [
      {
        id: "parcours-modulable",
        name: "Parcours modulable",
        description: "Zone de défis moteurs ajustables selon les besoins.",
        linkedDisciplines: ["Mathématiques", "Français"],
      },
      {
        id: "zone-observation",
        name: "Zone d'observation",
        description: "Espace pour observer, mesurer et verbaliser une stratégie.",
        linkedDisciplines: ["Mathématiques", "Français"],
      },
    ],
    visibleSupports: [
      {
        id: "fiches-observation",
        label: "Fiches d'observation",
        type: "fiche",
      },
      {
        id: "cartes-roles-eps",
        label: "Cartes rôles",
        type: "affichage",
      },
    ],
    links: [
      {
        slug: "defi-sante-et-cooperation",
        title: "Le défi santé et coopération du lynx",
        href: "/primaire/cm2/missions/defi-sante-et-cooperation",
        type: "mission",
      },
    ],
    tags: ["EPS", "coopération", "mesure"],
    displayOrder: 90,
  },
  {
    ...elementaryDefaults,
    id: "place-primaire-salle-danse-expression",
    slug: "salle-danse-expression",
    name: "La Salle de Danse et Expression",
    cycle: "Transversal",
    section: "Primaire",
    shortDescription:
      "Un lieu pour mettre en mouvement les émotions, les récits et les intentions.",
    pedagogicalFunction:
      "Soutenir l'expression orale, corporelle et collective.",
    disciplines: ["Français"],
    competencies: [
      "Exprimer une intention",
      "Écouter et ajuster une production collective",
      "Mettre en voix ou en geste un récit",
    ],
    professors: [
      { slug: "rosa", name: "Rosa la Chouette" },
      { slug: "max", name: "Max le Kangourou" },
    ],
    students: [
      { slug: "zoe", name: "Zoé la Tortue Curieuse" },
      { slug: "felix", name: "Félix" },
    ],
    interactiveZones: [
      {
        id: "cercle-expression",
        name: "Cercle d'expression",
        description: "Espace de mise en voix, écoute et restitution collective.",
        linkedDisciplines: ["Français"],
      },
      {
        id: "reperes-au-sol",
        name: "Repères au sol",
        description: "Tracés simples pour organiser déplacements et placements.",
        linkedDisciplines: ["Mathématiques", "Français"],
      },
    ],
    visibleSupports: [
      {
        id: "cartes-emotions",
        label: "Cartes émotions",
        type: "fiche",
      },
      {
        id: "fiches-role-expression",
        label: "Fiches de rôle",
        type: "affichage",
      },
    ],
    links: [
      {
        slug: "republique-des-eleves",
        title: "La République des élèves",
        href: "/primaire/cm2/missions/republique-des-eleves",
        type: "mission",
      },
    ],
    tags: ["expression", "oral", "corps"],
    displayOrder: 100,
  },
  {
    ...elementaryDefaults,
    id: "place-primaire-salle-musique",
    slug: "salle-musique",
    name: "La Salle de Musique",
    cycle: "Transversal",
    section: "Primaire",
    shortDescription:
      "Un espace d'écoute, de rythme et de mémoire orale.",
    pedagogicalFunction:
      "Développer attention, mémorisation, écoute active et restitution collective.",
    disciplines: ["Français", "Mathématiques"],
    competencies: [
      "Écouter avec précision",
      "Repérer un rythme ou une structure",
      "Mémoriser et restituer collectivement",
    ],
    professors: [
      { slug: "naia", name: "Naïa l'Hippocampe" },
      { slug: "zoe", name: "Zoé" },
    ],
    students: [
      { slug: "zoe", name: "Zoé la Tortue Curieuse" },
      { slug: "felix", name: "Félix" },
    ],
    interactiveZones: [
      {
        id: "cercle-ecoute",
        name: "Cercle d'écoute",
        description: "Disposition calme pour écouter, mémoriser et décrire.",
        linkedDisciplines: ["Français"],
      },
      {
        id: "mur-rythmes",
        name: "Mur des rythmes",
        description: "Affichage des structures sonores et des répétitions.",
        linkedDisciplines: ["Mathématiques", "Français"],
      },
    ],
    visibleSupports: [
      {
        id: "cartes-ecoute",
        label: "Cartes d'écoute",
        type: "fiche",
      },
      {
        id: "trames-composition",
        label: "Trames de composition",
        type: "trace écrite",
      },
    ],
    links: [
      {
        slug: "musee-des-imaginaires-de-felix",
        title: "Le musée des imaginaires de Félix",
        href: "/primaire/cm2/missions/musee-des-imaginaires-de-felix",
        type: "mission",
      },
    ],
    tags: ["musique", "écoute", "rythme"],
    displayOrder: 110,
  },
  {
    ...elementaryDefaults,
    id: "place-primaire-voyage-decouverte",
    slug: "voyage-decouverte",
    name: "Le Voyage Découverte",
    cycle: "Transversal",
    section: "Primaire",
    shortDescription:
      "Un lieu-parcours pour relier sorties, projets et enquêtes documentaires.",
    pedagogicalFunction:
      "Préparer, vivre et exploiter une expérience hors de la classe.",
    disciplines: ["Géographie", "Sciences", "Français"],
    competencies: [
      "Préparer une question d'enquête",
      "Collecter des traces",
      "Restituer une découverte",
    ],
    professors: [
      { slug: "noisette", name: "Noisette" },
      { slug: "esteban", name: "Esteban" },
      { slug: "felix", name: "Félix" },
    ],
    students: [
      { slug: "noisette", name: "Noisette l'Écureuil Ingénieux" },
      { slug: "esteban", name: "Esteban le Manchot Aventurier" },
      { slug: "felix", name: "Félix" },
    ],
    interactiveZones: [
      {
        id: "carnet-route",
        name: "Carnet de route",
        description: "Point de préparation des questions et traces à collecter.",
        linkedDisciplines: ["Géographie", "Français"],
      },
      {
        id: "carte-itineraire",
        name: "Carte d'itinéraire",
        description: "Repérage du trajet, des étapes et des observations attendues.",
        linkedDisciplines: ["Géographie", "Sciences"],
      },
    ],
    visibleSupports: [
      {
        id: "carnets-voyage",
        label: "Carnets de voyage",
        type: "trace écrite",
      },
      {
        id: "plans-imprimes",
        label: "Plans imprimés",
        type: "carte",
      },
    ],
    links: [
      {
        slug: "grand-atlas-des-mobilites",
        title: "Le grand atlas des mobilités",
        href: "/primaire/cm2/missions/grand-atlas-des-mobilites",
        type: "mission",
      },
    ],
    tags: ["sortie", "projet", "enquête"],
    displayOrder: 120,
  },
  {
    ...elementaryDefaults,
    id: "place-primaire-jardin-des-lisieres",
    slug: "jardin-des-lisieres",
    name: "Le Jardin des Lisières",
    cycle: "Transversal",
    section: "Primaire",
    shortDescription:
      "Un jardin pédagogique pour observer le vivant, les saisons et les gestes responsables.",
    pedagogicalFunction:
      "Ancrer les sciences et l'EDD dans des observations régulières.",
    disciplines: ["Sciences", "Géographie", "Mathématiques"],
    competencies: [
      "Observer le vivant dans le temps",
      "Tenir une trace d'observation",
      "Relier gestes quotidiens et environnement",
    ],
    professors: [
      { slug: "melina", name: "Mélina l'Abeille" },
      { slug: "esteban", name: "Esteban" },
      { slug: "felix", name: "Félix" },
    ],
    students: [
      { slug: "esteban", name: "Esteban le Manchot Aventurier" },
      { slug: "felix", name: "Félix" },
    ],
    interactiveZones: [
      {
        id: "carres-culture",
        name: "Carrés de culture",
        description: "Petites zones d'observation du vivant et des saisons.",
        linkedDisciplines: ["Sciences", "Géographie"],
      },
      {
        id: "station-observation-jardin",
        name: "Station d'observation",
        description: "Point de relevé des traces, mesures et changements.",
        linkedDisciplines: ["Sciences", "Mathématiques"],
      },
    ],
    visibleSupports: [
      {
        id: "etiquettes-botaniques",
        label: "Étiquettes botaniques",
        type: "affichage",
      },
      {
        id: "calendrier-semis",
        label: "Calendrier des semis",
        type: "affichage",
      },
    ],
    links: [
      {
        slug: "journal-des-traces-de-felix",
        title: "Le journal des traces de Félix",
        href: "/primaire/cm2/missions/journal-des-traces-de-felix",
        type: "mission",
      },
    ],
    tags: ["jardin", "vivant", "EDD"],
    displayOrder: 130,
  },
  {
    ...elementaryDefaults,
    id: "place-primaire-refectoire-des-explorateurs",
    slug: "refectoire-des-explorateurs",
    name: "Le Réfectoire des Explorateurs",
    cycle: "Transversal",
    section: "Primaire",
    shortDescription:
      "Un lieu de vie pour travailler alimentation, coopération, langage et règles partagées.",
    pedagogicalFunction:
      "Faire des temps collectifs des supports d'observation, de vocabulaire et d'EMC.",
    disciplines: ["Sciences", "Français"],
    competencies: [
      "Nommer des habitudes de vie",
      "Participer à une règle commune",
      "Classer des informations simples",
    ],
    professors: [
      { slug: "max", name: "Max le Kangourou" },
      { slug: "melina", name: "Mélina l'Abeille" },
    ],
    students: [
      { slug: "gaston", name: "Gaston le Hérisson Astucieux" },
      { slug: "felix", name: "Félix" },
    ],
    interactiveZones: [
      {
        id: "table-menus",
        name: "Table des menus",
        description: "Lecture, comparaison et vocabulaire autour des repas.",
        linkedDisciplines: ["Sciences", "Français"],
      },
      {
        id: "mur-gestes-responsables",
        name: "Mur des gestes responsables",
        description: "Affichage des rôles, règles communes et choix collectifs.",
        linkedDisciplines: ["Français"],
      },
    ],
    visibleSupports: [
      {
        id: "affichage-nutrition",
        label: "Affichage nutrition",
        type: "affichage",
      },
      {
        id: "menus-commentes",
        label: "Menus commentés",
        type: "fiche",
      },
    ],
    links: [
      {
        slug: "defi-sante-et-cooperation",
        title: "Le défi santé et coopération du lynx",
        href: "/primaire/cm2/missions/defi-sante-et-cooperation",
        type: "mission",
      },
    ],
    tags: ["vie scolaire", "alimentation", "EMC"],
    displayOrder: 140,
  },
  {
    ...elementaryDefaults,
    id: "place-primaire-couloirs-des-traces",
    slug: "couloirs-des-traces",
    name: "Les Couloirs des Traces",
    cycle: "Transversal",
    section: "Primaire",
    shortDescription:
      "Un espace d'affichage progressif pour garder mémoire des méthodes, productions et réussites.",
    pedagogicalFunction:
      "Rendre visibles les apprentissages et aider les élèves à réutiliser leurs méthodes.",
    disciplines: ["Français", "Mathématiques", "Sciences", "Histoire", "Géographie"],
    competencies: [
      "Identifier une trace utile",
      "Réutiliser une méthode connue",
      "Présenter une production finalisée",
    ],
    professors: [
      { slug: "felix", name: "Félix" },
      { slug: "pablo", name: "Pablo l'Orang-outan" },
    ],
    students: [
      { slug: "zoe", name: "Zoé la Tortue Curieuse" },
      { slug: "noisette", name: "Noisette l'Écureuil Ingénieux" },
      { slug: "felix", name: "Félix" },
    ],
    interactiveZones: [
      {
        id: "frise-missions",
        name: "Frise des missions",
        description: "Repère chronologique des productions et méthodes apprises.",
        linkedDisciplines: ["Français", "Mathématiques", "Sciences"],
      },
      {
        id: "vitrine-productions",
        name: "Vitrine des productions",
        description: "Espace d'exposition des travaux stabilisés.",
        linkedDisciplines: ["Français", "Histoire", "Géographie"],
      },
    ],
    visibleSupports: [
      {
        id: "frise-des-methodes",
        label: "Frise des méthodes",
        type: "affichage",
      },
      {
        id: "galerie-des-productions",
        label: "Galerie des productions",
        type: "trace écrite",
      },
    ],
    links: [
      {
        slug: "journal-des-traces-de-felix",
        title: "Le journal des traces de Félix",
        href: "/primaire/cm2/missions/journal-des-traces-de-felix",
        type: "mission",
      },
      {
        slug: "republique-des-eleves",
        title: "La République des élèves",
        href: "/primaire/cm2/missions/republique-des-eleves",
        type: "mission",
      },
    ],
    tags: ["traces", "méthodes", "affichage"],
    displayOrder: 150,
  },
] satisfies PedagogicalPlace[];

export function getElementaryPedagogicalPlaces(): PedagogicalPlace[] {
  return [...elementaryPedagogicalPlaces].sort(
    (first, second) => first.displayOrder - second.displayOrder,
  );
}

export function getElementaryPedagogicalPlaceBySlug(
  slug: string,
): PedagogicalPlace | undefined {
  return elementaryPedagogicalPlaces.find((place) => place.slug === slug);
}

// ── Collège — La Cité des Passages ─────────────────────────────────────────

export const collegeCiteDesPassagesUniverse = {
  id: "la-cite-des-passages",
  name: "La Cité des Passages",
  stage: "college",
} satisfies PedagogicalPlaceUniverseRef;

const collegeDefaults = {
  parentUniverse: collegeCiteDesPassagesUniverse,
  uses: ["hub", "interactive-map"],
  qualityStatus: "draft",
  accessibility: {
    readableContrast: true,
    keyboardNavigation: true,
    reducedMotionFriendly: true,
    altTextRequired: false,
  },
} satisfies Partial<PedagogicalPlace>;

export const collegePedagogicalPlaces: PedagogicalPlace[] = [
  {
    ...collegeDefaults,
    id: "place-college-cdi",
    slug: "college-cdi",
    name: "Le CDI",
    cycle: "Cycle 4",
    section: "Collège",
    shortDescription:
      "Le centre de ressources de la Cité : recherche documentaire, culture de l'information et travail en autonomie.",
    longDescription:
      "Le CDI structure l'accès aux savoirs au collège. On y apprend à chercher, à trier, à citer et à produire une information fiable. L'espace allie consultation numérique et fonds papier, avec une présence régulière du professeur-documentaliste.",
    pedagogicalFunction:
      "Développer l'autonomie documentaire, la pensée critique face aux sources et les compétences EMI.",
    disciplines: ["Documentation", "Français", "Histoire", "Géographie", "EMC"],
    competencies: [
      "Sélectionner et croiser des sources d'information",
      "Reformuler et citer une source correctement",
      "Organiser une recherche documentaire avec méthode",
    ],
    interactiveZones: [
      {
        id: "espace-lecture",
        name: "Espace lecture",
        description: "Accès au fonds documentaire papier et revues.",
        linkedDisciplines: ["Français", "Documentation"],
      },
      {
        id: "postes-consultation",
        name: "Postes de consultation",
        description: "Recherche guidée sur bases documentaires et catalogues.",
        linkedDisciplines: ["Documentation", "Histoire", "Géographie"],
      },
      {
        id: "espace-travail-groupe",
        name: "Espace travail de groupe",
        description: "Tables pour projets documentaires collaboratifs.",
        linkedDisciplines: ["Français", "EMC"],
      },
    ],
    visibleSupports: [
      {
        id: "grille-evaluation-sources",
        label: "Grille d'évaluation des sources",
        type: "fiche",
        description: "Critères pour juger la fiabilité d'un document.",
      },
      {
        id: "affiche-methode-recherche",
        label: "Méthode de recherche documentaire",
        type: "affichage",
      },
    ],
    qualityStatus: "review",
    tags: ["CDI", "documentation", "EMI", "autonomie", "sources"],
    displayOrder: 10,
  },
  {
    ...collegeDefaults,
    id: "place-college-salle-archives",
    slug: "college-salle-archives",
    name: "La Salle des Archives",
    cycle: "Cycle 4",
    section: "Collège",
    shortDescription:
      "Un espace d'immersion dans les sources historiques pour apprendre à analyser, dater et contextualiser.",
    longDescription:
      "La Salle des Archives plonge les élèves dans des documents authentiques ou reconstitués. Elle développe la démarche de l'historien : questionner un document, l'inscrire dans son contexte et confronter des points de vue.",
    pedagogicalFunction:
      "Initier à la critique des sources, à la contextualisation et à l'argumentation historique.",
    disciplines: ["Histoire", "Géographie", "Français", "EMC"],
    competencies: [
      "Identifier la nature et l'origine d'un document",
      "Contextualiser un fait historique",
      "Construire une argumentation à partir de sources",
    ],
    interactiveZones: [
      {
        id: "fonds-archives",
        name: "Fonds d'archives",
        description: "Documents classés par période et par type.",
        linkedDisciplines: ["Histoire", "Géographie"],
      },
      {
        id: "table-analyse",
        name: "Table d'analyse",
        description: "Espace de travail pour la critique documentaire.",
        linkedDisciplines: ["Français", "Histoire"],
      },
      {
        id: "mur-traces-historiques",
        name: "Mur des traces",
        description: "Frise chronologique collective alimentée par les élèves.",
        linkedDisciplines: ["Histoire", "EMC"],
      },
    ],
    visibleSupports: [
      {
        id: "grille-analyse-document",
        label: "Grille d'analyse de document historique",
        type: "fiche",
      },
    ],
    tags: ["archives", "histoire", "sources", "critique documentaire"],
    displayOrder: 20,
  },
  {
    ...collegeDefaults,
    id: "place-college-laboratoire-sciences",
    slug: "college-laboratoire-sciences",
    name: "Le Laboratoire de Sciences",
    cycle: "Cycle 4",
    section: "Collège",
    shortDescription:
      "Le lieu de la démarche expérimentale : protocoles, manipulations et conclusions argumentées en SVT et Physique-Chimie.",
    longDescription:
      "Le Laboratoire de Sciences structure les apprentissages scientifiques en cycle 4. Les élèves y testent des hypothèses, réalisent des expériences encadrées et rédigent des comptes rendus rigoureux. L'accent est mis sur l'autonomie progressive dans la démarche.",
    pedagogicalFunction:
      "Construire et conduire une démarche scientifique complète : questionner, hypothèse, protocole, expérience, conclusion.",
    disciplines: ["SVT", "Physique-Chimie", "Mathématiques"],
    competencies: [
      "Formuler et tester une hypothèse",
      "Réaliser un protocole expérimental",
      "Rédiger un compte rendu scientifique argumenté",
    ],
    interactiveZones: [
      {
        id: "paillasses-experimentation",
        name: "Paillasses d'expérimentation",
        description: "Postes de travail équipés pour les manipulations.",
        linkedDisciplines: ["SVT", "Physique-Chimie"],
      },
      {
        id: "espace-observation",
        name: "Espace observation",
        description: "Microscopes, loupe binoculaire et matériel de mesure.",
        linkedDisciplines: ["SVT", "Mathématiques"],
      },
      {
        id: "tableau-conclusions",
        name: "Tableau des conclusions",
        description: "Zone de mutualisation des résultats et de synthèse.",
        linkedDisciplines: ["SVT", "Physique-Chimie"],
      },
    ],
    visibleSupports: [
      {
        id: "fiche-protocole",
        label: "Fiche protocole",
        type: "fiche",
        description: "Trame guidée pour rédiger un protocole expérimental.",
      },
      {
        id: "affiche-securite-labo",
        label: "Consignes de sécurité",
        type: "affichage",
      },
    ],
    qualityStatus: "review",
    tags: ["sciences", "SVT", "physique-chimie", "expérience", "protocole"],
    displayOrder: 30,
  },
  {
    ...collegeDefaults,
    id: "place-college-salle-technologie",
    slug: "college-salle-technologie",
    name: "La Salle Technologie & Fabrication",
    cycle: "Cycle 4",
    section: "Collège",
    shortDescription:
      "Un atelier de conception et de fabrication pour passer d'une idée à un objet ou à un système fonctionnel.",
    longDescription:
      "La Salle Technologie & Fabrication développe les compétences de conception, de prototypage et de programmation. Les élèves y travaillent sur des projets techniques concrets, en lien avec les contraintes du monde réel.",
    pedagogicalFunction:
      "Maîtriser les étapes de conception technique : besoin, contraintes, schéma, prototype, test, amélioration.",
    disciplines: ["Technologie", "Mathématiques", "Sciences"],
    competencies: [
      "Analyser un besoin et formuler un cahier des charges simple",
      "Concevoir et réaliser un prototype",
      "Programmer une solution algorithmique élémentaire",
    ],
    interactiveZones: [
      {
        id: "atelier-fabrication",
        name: "Atelier de fabrication",
        description: "Outillage, matériaux et imprimante 3D.",
        linkedDisciplines: ["Technologie"],
      },
      {
        id: "poste-conception",
        name: "Poste de conception numérique",
        description: "Logiciels de CAO, programmation et simulation.",
        linkedDisciplines: ["Technologie", "Mathématiques"],
      },
      {
        id: "espace-test",
        name: "Espace de test",
        description: "Zone d'évaluation des prototypes et de mesure des résultats.",
        linkedDisciplines: ["Technologie", "Sciences"],
      },
    ],
    tags: ["technologie", "fabrication", "prototypage", "programmation"],
    displayOrder: 40,
  },
  {
    ...collegeDefaults,
    id: "place-college-salle-informatique",
    slug: "college-salle-informatique",
    name: "La Salle Informatique",
    cycle: "Cycle 4",
    section: "Collège",
    shortDescription:
      "Un espace numérique pour produire, organiser et publier avec méthode dans toutes les disciplines.",
    longDescription:
      "La Salle Informatique accompagne les usages numériques transversaux du collège. Elle structure la maîtrise des outils de production, la gestion de fichiers, la recherche responsable et la publication maîtrisée, en lien avec le CRCN.",
    pedagogicalFunction:
      "Développer les compétences numériques du CRCN : recherche, traitement, création, communication et environnement numérique sécurisé.",
    disciplines: ["Technologie", "Français", "Mathématiques", "Documentation"],
    competencies: [
      "Rechercher une information numérique avec méthode critique",
      "Produire un document structuré et soigné",
      "Identifier les règles de publication et de propriété numérique",
    ],
    interactiveZones: [
      {
        id: "postes-individuels",
        name: "Postes individuels",
        description: "Travail en autonomie sur des tâches numériques personnelles.",
        linkedDisciplines: ["Technologie", "Français"],
      },
      {
        id: "espace-projection",
        name: "Espace de projection collective",
        description: "Présentation de travaux et correction collective.",
        linkedDisciplines: ["Français", "Mathématiques"],
      },
    ],
    tags: ["numérique", "CRCN", "production", "recherche"],
    displayOrder: 50,
  },
  {
    ...collegeDefaults,
    id: "place-college-salles-langues",
    slug: "college-salles-langues",
    name: "Les Salles de Langues",
    cycle: "Cycle 4",
    section: "Collège",
    shortDescription:
      "Des espaces dédiés à la pratique orale, à l'écoute et à la production en langue étrangère.",
    longDescription:
      "Les Salles de Langues privilégient l'usage actif de la langue : compréhension de l'oral, expression spontanée et guidée, découverte culturelle. L'ambiance y est délibérément différente du reste du collège pour signaler l'entrée dans un espace d'altérité linguistique.",
    pedagogicalFunction:
      "Développer les cinq compétences langagières (CECRL) dans un environnement culturellement ancré.",
    disciplines: ["Langues vivantes"],
    competencies: [
      "Comprendre et restituer un document audio ou vidéo",
      "Prendre la parole en continu et en interaction",
      "Lire et produire un écrit en langue étrangère",
    ],
    interactiveZones: [
      {
        id: "espace-oral",
        name: "Espace oral",
        description: "Zone de jeux de rôle, débats et interactions guidées.",
        linkedDisciplines: ["Langues vivantes"],
      },
      {
        id: "espace-ecoute",
        name: "Espace écoute",
        description: "Postes d'écoute individuelle et collective.",
        linkedDisciplines: ["Langues vivantes"],
      },
      {
        id: "coin-culturel",
        name: "Coin culturel",
        description: "Affiches, objets et documents des pays étudiés.",
        linkedDisciplines: ["Langues vivantes"],
      },
    ],
    visibleSupports: [
      {
        id: "grille-cecrl",
        label: "Référentiel CECRL",
        type: "affichage",
        description: "Niveaux A1-B2 et descripteurs de compétences.",
      },
    ],
    tags: ["langues", "CECRL", "oral", "écoute", "culture"],
    displayOrder: 60,
  },
  {
    ...collegeDefaults,
    id: "place-college-gymnase",
    slug: "college-gymnase",
    name: "Le Gymnase",
    cycle: "Transversal",
    section: "Collège",
    shortDescription:
      "L'espace EPS du collège : activités physiques, coopération, stratégie et respect des règles communes.",
    longDescription:
      "Le Gymnase au collège est un lieu de construction identitaire autant que sportive. L'adolescent y négocie sa place dans le groupe, mesure ses progrès et apprend à verbaliser une stratégie collective. Les APSA sont le vecteur d'apprentissages transversaux.",
    pedagogicalFunction:
      "Développer les compétences motrices, sociales et réflexives à travers les APSA.",
    disciplines: ["EPS", "EMC"],
    competencies: [
      "Choisir et adapter une stratégie collective",
      "Respecter et faire respecter une règle partagée",
      "Analyser sa pratique pour progresser",
    ],
    interactiveZones: [
      {
        id: "terrain-principal",
        name: "Terrain principal",
        description: "Zone de pratique sportive collective.",
        linkedDisciplines: ["EPS"],
      },
      {
        id: "zone-observation-strategie",
        name: "Zone observation & stratégie",
        description: "Moment de verbalisation collective entre les séquences.",
        linkedDisciplines: ["EPS", "EMC"],
      },
    ],
    tags: ["EPS", "APSA", "coopération", "stratégie", "règles"],
    displayOrder: 70,
  },
  {
    ...collegeDefaults,
    id: "place-college-salle-musique",
    slug: "college-salle-musique",
    name: "La Salle de Musique",
    cycle: "Transversal",
    section: "Collège",
    shortDescription:
      "Un espace d'écoute, de pratique instrumentale et de culture musicale pour tous les niveaux du collège.",
    longDescription:
      "La Salle de Musique cultive l'attention, la mémorisation et l'expression collective. L'élève y développe une posture d'écoute active et apprend à situer une œuvre dans son contexte culturel. La production collective y est valorisée.",
    pedagogicalFunction:
      "Développer la culture musicale, l'écoute active et la production vocale ou instrumentale collective.",
    disciplines: ["Éducation Musicale", "Français"],
    competencies: [
      "Décrire et analyser une œuvre musicale",
      "Situer une œuvre dans son contexte historique et culturel",
      "Participer à une production collective maîtrisée",
    ],
    interactiveZones: [
      {
        id: "espace-instrumental",
        name: "Espace instrumental",
        description: "Instruments à disposition et espace de pratique.",
        linkedDisciplines: ["Éducation Musicale"],
      },
      {
        id: "ecoute-active",
        name: "Écoute active",
        description: "Banque de titres et supports d'analyse musicale.",
        linkedDisciplines: ["Éducation Musicale", "Français"],
      },
    ],
    tags: ["musique", "écoute", "culture musicale", "production collective"],
    displayOrder: 80,
  },
  {
    ...collegeDefaults,
    id: "place-college-salle-arts-plastiques",
    slug: "college-salle-arts-plastiques",
    name: "La Salle d'Arts Plastiques",
    cycle: "Transversal",
    section: "Collège",
    shortDescription:
      "Un atelier de création et d'analyse pour développer la sensibilité artistique et le regard critique.",
    longDescription:
      "La Salle d'Arts Plastiques offre un espace de liberté encadrée où l'adolescent expérimente des matières, des techniques et des intentions. Elle développe simultanément la capacité à faire, à décrire et à confronter sa production au regard des autres.",
    pedagogicalFunction:
      "Développer la pratique plastique, la culture artistique et la capacité à analyser et à présenter une démarche créative.",
    disciplines: ["Arts Plastiques", "Français"],
    competencies: [
      "Exprimer une intention artistique et la défendre",
      "Analyser une œuvre selon des critères plastiques",
      "Maîtriser des techniques de création variées",
    ],
    interactiveZones: [
      {
        id: "atelier-creation",
        name: "Atelier de création",
        description: "Plans de travail et matériaux disponibles.",
        linkedDisciplines: ["Arts Plastiques"],
      },
      {
        id: "espace-analyse",
        name: "Espace analyse d'œuvres",
        description: "Reproductions et supports de culture artistique.",
        linkedDisciplines: ["Arts Plastiques", "Français"],
      },
      {
        id: "galerie-ephemere",
        name: "Galerie éphémère",
        description: "Zone d'exposition rotative des productions d'élèves.",
        linkedDisciplines: ["Arts Plastiques"],
      },
    ],
    tags: ["arts plastiques", "création", "analyse", "culture artistique"],
    displayOrder: 90,
  },
  {
    ...collegeDefaults,
    id: "place-college-foyer",
    slug: "college-foyer",
    name: "Le Foyer",
    cycle: "Transversal",
    section: "Collège",
    shortDescription:
      "L'espace de vie collective des élèves : lieu d'autonomie, de projets délégués et d'apprentissage du vivre ensemble.",
    longDescription:
      "Le Foyer est un espace de la vie scolaire à part entière. Il permet aux élèves d'exercer une autonomie réelle : organiser un événement, afficher les comptes rendus du conseil de délégués, gérer un espace commun. Il traduit la dimension EMC dans le quotidien.",
    pedagogicalFunction:
      "Ancrer les compétences civiques dans des situations réelles : délibérer, organiser, respecter et prendre soin d'un espace partagé.",
    disciplines: ["EMC", "Français"],
    competencies: [
      "Exercer des responsabilités dans un espace collectif",
      "Participer à une délibération collective",
      "Respecter et entretenir un bien commun",
    ],
    interactiveZones: [
      {
        id: "zone-detente",
        name: "Zone détente",
        description: "Tables et jeux coopératifs pour les temps libres encadrés.",
        linkedDisciplines: ["EMC"],
      },
      {
        id: "espace-projet-eleves",
        name: "Espace projet élèves",
        description: "Coin réservé aux initiatives portées par les délégués.",
        linkedDisciplines: ["EMC", "Français"],
      },
      {
        id: "affichage-deleguees",
        name: "Affichage délégués",
        description: "Comptes rendus de conseil de classe et propositions.",
        linkedDisciplines: ["EMC"],
      },
    ],
    tags: ["foyer", "vie scolaire", "EMC", "autonomie", "délégués"],
    displayOrder: 100,
  },
  {
    ...collegeDefaults,
    id: "place-college-permanence",
    slug: "college-permanence",
    name: "La Permanence",
    cycle: "Transversal",
    section: "Collège",
    shortDescription:
      "Un espace de travail autonome supervisé, pour apprendre à s'organiser, se concentrer et gérer son temps.",
    longDescription:
      "La Permanence est bien plus qu'un gardiennage. Pensée comme un espace d'apprentissage de l'autonomie, elle offre des outils méthodologiques (agenda, fiches méthodes, gestion du temps) et une supervision bienveillante qui laisse progressivement la place à l'auto-organisation.",
    pedagogicalFunction:
      "Développer les compétences méthodologiques et l'autonomie scolaire : planification, concentration, organisation du travail.",
    disciplines: ["Documentation", "EMC", "Français"],
    competencies: [
      "Planifier et prioriser ses tâches scolaires",
      "Maintenir sa concentration en espace collectif",
      "Utiliser des outils de méthode pour réviser ou préparer",
    ],
    interactiveZones: [
      {
        id: "tables-travail-individuel",
        name: "Tables de travail individuel",
        description: "Postes calmes pour le travail personnel.",
        linkedDisciplines: ["Documentation"],
      },
      {
        id: "coin-methodes",
        name: "Coin méthodes",
        description: "Fiches méthodes disponibles par discipline.",
        linkedDisciplines: ["Français", "Documentation"],
      },
    ],
    visibleSupports: [
      {
        id: "fiches-methodes-par-matiere",
        label: "Fiches méthodes par matière",
        type: "fiche",
        description: "Trames réutilisables pour organiser son travail.",
      },
    ],
    tags: ["permanence", "autonomie", "méthode", "organisation", "concentration"],
    displayOrder: 110,
  },
  {
    ...collegeDefaults,
    id: "place-college-cour-centrale",
    slug: "college-cour-centrale",
    name: "La Cour Centrale",
    cycle: "Transversal",
    section: "Collège",
    shortDescription:
      "Le cœur de la vie sociale du collège : espace de décompression, d'interactions libres et de repères collectifs.",
    longDescription:
      "La Cour Centrale est le lieu de transition entre les temps disciplinaires. Elle est aussi un révélateur des dynamiques sociales de la classe d'âge adolescente : groupes, jeux de pouvoir, solidarités. Certains dispositifs pédagogiques y prennent appui (fresque collective, agenda de la semaine, mur des expressions).",
    pedagogicalFunction:
      "Créer les conditions d'une vie sociale apaisée et d'une citoyenneté vécue dans les transitions entre les cours.",
    disciplines: ["EMC"],
    competencies: [
      "Respecter les règles de vie collective dans un espace ouvert",
      "Réguler ses interactions sociales de façon autonome",
    ],
    interactiveZones: [
      {
        id: "zone-centrale",
        name: "Zone centrale",
        description: "Espace principal de rassemblement et de jeu libre.",
        linkedDisciplines: ["EMC"],
      },
      {
        id: "preaux",
        name: "Préaux",
        description: "Abris pour les temps libres par mauvais temps.",
        linkedDisciplines: ["EMC"],
      },
      {
        id: "mur-expressions",
        name: "Mur d'expressions collectives",
        description: "Surface d'affichage libre gérée par les délégués.",
        linkedDisciplines: ["EMC"],
      },
    ],
    tags: ["cour", "vie scolaire", "EMC", "social", "transition"],
    displayOrder: 120,
  },
  {
    ...collegeDefaults,
    id: "place-college-self",
    slug: "college-self",
    name: "Le Self",
    cycle: "Transversal",
    section: "Collège",
    shortDescription:
      "Le temps de restauration comme espace d'apprentissage : alimentation, gestes responsables et vie collective.",
    longDescription:
      "Le Self n'est pas neutre pédagogiquement. Il offre des situations réelles de choix alimentaires, de gestion des déchets, de respect des règles collectives et d'attention à l'autre. Ces expériences quotidiennes alimentent les apprentissages en SVT, EMC et EDD.",
    pedagogicalFunction:
      "Ancrer les connaissances sur l'alimentation et les comportements éco-responsables dans des situations vécues quotidiennement.",
    disciplines: ["SVT", "EMC"],
    competencies: [
      "Identifier les composantes d'une alimentation équilibrée",
      "Adopter des gestes responsables dans un espace collectif",
      "Respecter les règles de vie commune en situation réelle",
    ],
    interactiveZones: [
      {
        id: "zone-service",
        name: "Zone de service",
        description: "Ligne de self avec affichage nutritionnel.",
        linkedDisciplines: ["SVT"],
      },
      {
        id: "salle-repas",
        name: "Salle de repas",
        description: "Tables mixtes favorisant les échanges entre niveaux.",
        linkedDisciplines: ["EMC"],
      },
      {
        id: "espace-tri-dechets",
        name: "Espace tri des déchets",
        description: "Bacs différenciés avec pictogrammes pédagogiques.",
        linkedDisciplines: ["SVT", "EMC"],
      },
    ],
    visibleSupports: [
      {
        id: "affiche-nutrition",
        label: "Affiche nutrition",
        type: "affichage",
        description: "Repères alimentaires en lien avec le programme SVT.",
      },
    ],
    tags: ["self", "alimentation", "SVT", "EMC", "EDD", "tri"],
    displayOrder: 130,
  },
] satisfies PedagogicalPlace[];

export function getCollegePedagogicalPlaces() {
  return [...collegePedagogicalPlaces].sort(
    (first, second) => first.displayOrder - second.displayOrder,
  );
}

export function getCollegePedagogicalPlaceBySlug(slug: string) {
  return collegePedagogicalPlaces.find((place) => place.slug === slug);
}
