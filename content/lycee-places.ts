import type {
  PedagogicalPlace,
  PedagogicalPlaceUniverseRef,
} from "@/content/pedagogical-places";

// ─── Types lycée ────────────────────────────────────────────────────────────

export type LyceeAutonomyLevel =
  | "guidé"
  | "semi-autonome"
  | "autonome"
  | "expert";

export type LyceePedagogicalPlace = PedagogicalPlace & {
  autonomyLevel: LyceeAutonomyLevel;
  ambiance: string;
};

// ─── Univers ─────────────────────────────────────────────────────────────────

export const lyceeHorizonsUniverse = {
  id: "institut-des-horizons",
  name: "L'Institut des Horizons",
  stage: "lycee",
} satisfies PedagogicalPlaceUniverseRef;

// ─── Defaults ────────────────────────────────────────────────────────────────

const lyceeDefaults = {
  parentUniverse: lyceeHorizonsUniverse,
  cycle: "Lycée",
  uses: ["hub", "interactive-map"],
  qualityStatus: "draft",
  accessibility: {
    readableContrast: true,
    keyboardNavigation: true,
    reducedMotionFriendly: true,
    altTextRequired: true,
  },
  autonomyLevel: "autonome",
} satisfies Partial<LyceePedagogicalPlace>;

// ─── Données ─────────────────────────────────────────────────────────────────

const places: LyceePedagogicalPlace[] = [
  {
    ...lyceeDefaults,
    id: "place-lycee-bibliotheque",
    slug: "bibliotheque",
    name: "La Bibliothèque",
    shortDescription:
      "Espace de recherche documentaire, de lecture analytique et de préparation au Grand Oral.",
    longDescription:
      "La Bibliothèque de l'Institut des Horizons est un lieu de travail autonome. Elle accueille aussi bien les préparations individuelles de dissertation que les recherches collectives pour les TPE. Les lycéens y apprennent à hiérarchiser des sources, à construire une bibliographie et à formuler une problématique.",
    pedagogicalFunction:
      "Développer la lecture analytique, la recherche documentaire rigoureuse et la préparation à l'oral.",
    disciplines: [
      "Français",
      "Histoire",
      "Géographie",
      "Documentation",
      "EMI",
      "Philosophie",
    ],
    competencies: [
      "Identifier et évaluer une source documentaire",
      "Construire une problématique à partir de documents",
      "Préparer un exposé ou un Grand Oral",
      "Lire en autonomie un texte long ou complexe",
    ],
    interactiveZones: [
      {
        id: "rayonnage-thematique",
        name: "Rayonnage thématique",
        description: "Fonds classé par disciplines et enjeux contemporains.",
        linkedDisciplines: ["Histoire", "Géographie", "SES", "Philosophie"],
      },
      {
        id: "postes-recherche",
        name: "Postes de recherche documentaire",
        description: "Accès aux bases de ressources validées, prise de notes guidée.",
        linkedDisciplines: ["Documentation", "EMI", "Français"],
      },
      {
        id: "espace-grand-oral",
        name: "Espace Grand Oral",
        description: "Zone de préparation à la prise de parole, fiches méthode disponibles.",
        linkedDisciplines: ["Français", "Philosophie"],
      },
    ],
    ambiance: "Calme studieux, lumière naturelle, rangements visibles et accessibles.",
    autonomyLevel: "autonome",
    uses: ["hub", "interactive-map"],
    qualityStatus: "draft",
    tags: ["recherche", "Grand Oral", "documentation", "lecture analytique", "autonomie"],
    displayOrder: 10,
  },
  {
    ...lyceeDefaults,
    id: "place-lycee-laboratoires-scientifiques",
    slug: "laboratoires-scientifiques",
    name: "Les Laboratoires Scientifiques",
    shortDescription:
      "Salles d'expérimentation pour la démarche scientifique, les protocoles et l'analyse de données.",
    longDescription:
      "Les Laboratoires Scientifiques regroupent les espaces de travail pratique en Physique-Chimie, SVT et NSI. Les élèves y conduisent des expériences, formulent des hypothèses et rédigent des comptes rendus. L'accent est mis sur la rigueur du protocole et la communication écrite des résultats.",
    pedagogicalFunction:
      "Structurer la démarche expérimentale : problématique, protocole, résultats, analyse et communication.",
    disciplines: ["Physique-Chimie", "SVT", "NSI", "Mathématiques"],
    competencies: [
      "Concevoir et exécuter un protocole expérimental",
      "Analyser et interpréter des données quantitatives",
      "Rédiger un compte rendu scientifique rigoureux",
      "Modéliser un phénomène à l'aide d'outils numériques",
    ],
    interactiveZones: [
      {
        id: "paillasses-experimentation",
        name: "Paillasses d'expérimentation",
        description: "Postes équipés pour les manipulations guidées ou autonomes.",
        linkedDisciplines: ["Physique-Chimie", "SVT"],
      },
      {
        id: "zone-restitution-scientifique",
        name: "Zone de restitution",
        description: "Espace de présentation des résultats et de mise en commun.",
        linkedDisciplines: ["Physique-Chimie", "SVT", "Mathématiques"],
      },
      {
        id: "postes-numeriques-nsi",
        name: "Postes numériques NSI",
        description: "Environnements de programmation et de simulation de modèles.",
        linkedDisciplines: ["NSI", "Mathématiques"],
      },
    ],
    ambiance: "Précis, concentré, épuré — matériel visible et rangé, protocoles affichés.",
    autonomyLevel: "semi-autonome",
    uses: ["hub", "interactive-map"],
    qualityStatus: "draft",
    tags: ["sciences", "expérimentation", "protocole", "NSI", "données", "compte rendu"],
    displayOrder: 20,
  },
  {
    ...lyceeDefaults,
    id: "place-lycee-salle-ses-geopolitique",
    slug: "salle-ses-geopolitique",
    name: "La Salle SES & Géopolitique",
    shortDescription:
      "Salle d'analyse économique, sociale et géopolitique pour la dissertation et la synthèse de documents.",
    longDescription:
      "La Salle SES & Géopolitique est dédiée aux disciplines qui demandent de croiser données chiffrées, cartes et textes pour construire un argumentaire structuré. Les élèves y travaillent la maîtrise des indicateurs économiques et sociaux, l'analyse des conflits et des équilibres géopolitiques.",
    pedagogicalFunction:
      "Entraîner à la dissertation, à la synthèse de documents et à l'analyse de données économiques et géopolitiques.",
    disciplines: ["SES", "Géopolitique", "Histoire", "Géographie"],
    competencies: [
      "Analyser un document statistique ou cartographique",
      "Construire un plan de dissertation argumenté",
      "Confronter plusieurs approches d'un même phénomène social ou géopolitique",
      "Rédiger une introduction avec problématique et annonce de plan",
    ],
    interactiveZones: [
      {
        id: "mur-indicateurs",
        name: "Mur des indicateurs",
        description: "Données économiques, IDH, cartes de flux — actualisées chaque trimestre.",
        linkedDisciplines: ["SES", "Géographie"],
      },
      {
        id: "table-debat",
        name: "Table de débat",
        description: "Disposition en U pour les échanges argumentés et les simulations de commission.",
        linkedDisciplines: ["SES", "Géopolitique", "EMC"],
      },
      {
        id: "coin-cartographie",
        name: "Coin cartographie",
        description: "Atlas, frises géopolitiques et outils de lecture spatiale.",
        linkedDisciplines: ["Géopolitique", "Géographie", "Histoire"],
      },
    ],
    ambiance:
      "Sobre et dense — cartes murales, données actuelles, mobilier modulable pour les échanges.",
    autonomyLevel: "autonome",
    uses: ["hub", "interactive-map"],
    qualityStatus: "draft",
    tags: ["SES", "géopolitique", "dissertation", "données", "argumentation", "débat"],
    displayOrder: 30,
  },
  {
    ...lyceeDefaults,
    id: "place-lycee-studio-audiovisuel",
    slug: "studio-audiovisuel",
    name: "Le Studio Audiovisuel",
    shortDescription:
      "Espace de production multimédia pour le journalisme lycéen, la communication orale et l'EMI.",
    longDescription:
      "Le Studio Audiovisuel permet aux élèves de produire des contenus audio, vidéo et numériques dans un cadre professionnel simplifié. Il sert aussi bien les projets EMI (podcast d'actualité, web-documentaire) que la préparation d'oraux enregistrés. La réflexion sur la communication et l'éthique des médias y est centrale.",
    pedagogicalFunction:
      "Produire des contenus médiatiques en appliquant les règles journalistiques, la narration visuelle et l'éthique de l'information.",
    disciplines: ["Français", "EMI", "Arts Plastiques", "Langues vivantes"],
    competencies: [
      "Concevoir et réaliser un contenu audiovisuel structuré",
      "Analyser la construction d'un message médiatique",
      "Maîtriser les droits liés à la diffusion de contenus",
      "Préparer et enregistrer une prise de parole orale",
    ],
    interactiveZones: [
      {
        id: "fond-tournage",
        name: "Fond de tournage",
        description: "Zone neutre éclairée pour enregistrements vidéo et exposés filmés.",
        linkedDisciplines: ["Français", "Langues vivantes", "EMI"],
      },
      {
        id: "cabine-audio",
        name: "Cabine audio",
        description: "Enregistrement de podcasts, interviews et mémos vocaux.",
        linkedDisciplines: ["EMI", "Français", "Langues vivantes"],
      },
      {
        id: "table-montage",
        name: "Table de montage",
        description: "Poste de montage basique, accessible aux élèves en autonomie supervisée.",
        linkedDisciplines: ["EMI", "Arts Plastiques", "NSI"],
      },
    ],
    ambiance:
      "Créatif et professionnel — espaces délimités, matériel accessible, charte d'utilisation visible.",
    autonomyLevel: "semi-autonome",
    uses: ["hub", "interactive-map"],
    qualityStatus: "draft",
    tags: ["audiovisuel", "EMI", "oral", "podcast", "médias", "production"],
    displayOrder: 40,
  },
  {
    ...lyceeDefaults,
    id: "place-lycee-salle-de-philosophie",
    slug: "salle-de-philosophie",
    name: "La Salle de Philosophie",
    shortDescription:
      "Espace épuré pour l'argumentation, la dissertation et le dialogue philosophique.",
    longDescription:
      "La Salle de Philosophie est pensée pour la pensée lente. Disposition circulaire, murs sobres, textes courts affichés. Les élèves y apprennent à formuler une thèse, à l'étayer avec des exemples et à répondre aux objections. Le dialogue socratique y est pratiqué régulièrement.",
    pedagogicalFunction:
      "Former à la dissertation philosophique, à la pensée critique, à l'argumentation rigoureuse et au dialogue.",
    disciplines: ["Philosophie", "Français", "EMC"],
    competencies: [
      "Formuler et défendre une thèse philosophique",
      "Identifier les présupposés d'une question",
      "Utiliser un concept philosophique avec précision",
      "Répondre à une objection sans esquiver",
    ],
    interactiveZones: [
      {
        id: "cercle-debat-philo",
        name: "Cercle de débat",
        description: "Disposition circulaire favorisant l'échange direct et l'écoute active.",
        linkedDisciplines: ["Philosophie", "EMC"],
      },
      {
        id: "tableau-theses",
        name: "Tableau des thèses",
        description: "Espace d'affichage collectif pour suivre l'avancée d'une argumentation.",
        linkedDisciplines: ["Philosophie", "Français"],
      },
      {
        id: "bibliotheque-textes-courts",
        name: "Bibliothèque de textes courts",
        description: "Extraits classiques et contemporains disponibles en consultation rapide.",
        linkedDisciplines: ["Philosophie", "Français"],
      },
    ],
    ambiance:
      "Épuré, sobre, circulaire — aucune décoration superflue, clarté de l'espace au service de la clarté des idées.",
    autonomyLevel: "autonome",
    uses: ["hub", "interactive-map"],
    qualityStatus: "draft",
    tags: ["philosophie", "dissertation", "argumentation", "dialogue", "pensée critique"],
    displayOrder: 50,
  },
  {
    ...lyceeDefaults,
    id: "place-lycee-salles-de-langues",
    slug: "salles-de-langues",
    name: "Les Salles de Langues",
    shortDescription:
      "Espaces d'immersion linguistique pour l'expression orale, la compréhension et la production écrite.",
    longDescription:
      "Les Salles de Langues de l'Institut des Horizons privilégient l'usage actif de la langue cible. Les élèves y préparent leur oral du bac, travaillent des documents authentiques et s'exercent à des simulations de situations réelles. La dimension culturelle est toujours présente.",
    pedagogicalFunction:
      "Développer les cinq compétences langagières dans un cadre immersif, avec une attention particulière à l'oral et à la compréhension de documents authentiques.",
    disciplines: ["Langues vivantes", "Français", "EMI"],
    competencies: [
      "S'exprimer oralement en continu et en interaction",
      "Comprendre des documents audio et vidéo authentiques",
      "Rédiger en respectant les codes du genre (lettre, article, commentaire)",
      "Analyser la dimension culturelle d'un document",
    ],
    interactiveZones: [
      {
        id: "coin-expression-orale",
        name: "Coin expression orale",
        description: "Zone d'entraînement à l'oral continu et à l'interaction.",
        linkedDisciplines: ["Langues vivantes"],
      },
      {
        id: "mur-culturel",
        name: "Mur culturel",
        description: "Affiches, cartes, une de journaux étrangers, références culturelles renouvelées.",
        linkedDisciplines: ["Langues vivantes", "Géographie"],
      },
      {
        id: "espace-ecoute",
        name: "Espace écoute",
        description: "Postes audio pour la compréhension et la prise de notes.",
        linkedDisciplines: ["Langues vivantes", "EMI"],
      },
    ],
    ambiance:
      "Dynamique et immersif — documents authentiques visibles, langue cible affichée, espaces différenciés.",
    autonomyLevel: "semi-autonome",
    uses: ["hub", "interactive-map"],
    qualityStatus: "draft",
    tags: ["langues", "oral", "immersion", "culture", "compétences langagières"],
    displayOrder: 60,
  },
  {
    ...lyceeDefaults,
    id: "place-lycee-gymnase",
    slug: "gymnase",
    name: "Le Gymnase",
    shortDescription:
      "Espace d'EPS pour le travail collectif, la gestion de l'effort et le fair-play lycéen.",
    longDescription:
      "Le Gymnase lycéen prolonge les apprentissages moteurs du collège avec une dimension plus réflexive. Les élèves y apprennent à observer une performance, à analyser leur progrès et à coopérer dans des projets sportifs plus complexes. L'accent est mis sur la responsabilité dans le groupe.",
    pedagogicalFunction:
      "Développer les compétences motrices, la coopération, l'auto-évaluation de la performance et la gestion de l'effort physique.",
    disciplines: ["EPS", "Sciences", "EMC"],
    competencies: [
      "Analyser une performance et identifier des axes de progrès",
      "Coopérer et arbitrer dans un contexte sportif",
      "Relier activité physique, santé et bien-être",
      "Adapter son effort à un contexte de compétition ou de coopération",
    ],
    interactiveZones: [
      {
        id: "espace-modulable",
        name: "Espace modulable",
        description: "Configuration adaptable selon les activités — sports collectifs, arts du mouvement, athlétisme.",
        linkedDisciplines: ["EPS"],
      },
      {
        id: "tableau-tactique",
        name: "Tableau tactique",
        description: "Zone d'analyse collective des stratégies et des performances.",
        linkedDisciplines: ["EPS", "Mathématiques"],
      },
      {
        id: "zone-observation-eps",
        name: "Zone d'observation",
        description: "Espace pour les observateurs lors d'évaluations en binôme ou en groupe.",
        linkedDisciplines: ["EPS", "Sciences"],
      },
    ],
    ambiance: "Actif, sobre, collectif — matériel rangé, règles affichées, espace clair.",
    autonomyLevel: "semi-autonome",
    uses: ["hub", "interactive-map"],
    qualityStatus: "draft",
    tags: ["EPS", "coopération", "performance", "santé", "fair-play"],
    displayOrder: 70,
  },
  {
    ...lyceeDefaults,
    id: "place-lycee-foyer-lyceen",
    slug: "foyer-lyceen",
    name: "Le Foyer Lycéen",
    shortDescription:
      "Espace de vie démocratique, de projets lycéens, d'engagement et de médiation.",
    longDescription:
      "Le Foyer Lycéen est géré par le Conseil de Vie Lycéenne. C'est un lieu d'initiative où les élèves apprennent à porter des projets, à organiser des débats, à gérer un budget et à représenter leurs camarades. Il constitue un terrain d'apprentissage de la citoyenneté active.",
    pedagogicalFunction:
      "Exercer la démocratie lycéenne, porter des projets collectifs, développer l'engagement et la prise de responsabilité.",
    disciplines: ["EMC", "Orientation"],
    competencies: [
      "Organiser et animer un projet collectif",
      "Prendre la parole en représentation d'un groupe",
      "Gérer un budget et des délais",
      "Exercer un mandat électif ou une responsabilité associative",
    ],
    interactiveZones: [
      {
        id: "tableau-projets-lyceen",
        name: "Tableau des projets",
        description: "Vue d'ensemble des initiatives en cours, responsables et échéances.",
        linkedDisciplines: ["EMC", "Orientation"],
      },
      {
        id: "espace-debat-informel",
        name: "Espace débat informel",
        description: "Zone de discussion libre, moins structurée que la salle de philosophie.",
        linkedDisciplines: ["EMC", "Français"],
      },
      {
        id: "coin-ressources-orientation",
        name: "Coin ressources orientation",
        description: "Fiches Parcoursup, témoignages d'anciens, calendrier des salons.",
        linkedDisciplines: ["Orientation"],
      },
    ],
    ambiance:
      "Chaleureux, responsabilisant, ouvert — affiches des projets en cours, espace géré par les élèves.",
    autonomyLevel: "expert",
    uses: ["hub", "interactive-map"],
    qualityStatus: "draft",
    tags: ["vie lycéenne", "citoyenneté", "engagement", "CVL", "projets", "responsabilité"],
    displayOrder: 80,
  },
  {
    ...lyceeDefaults,
    id: "place-lycee-cafeteria",
    slug: "cafeteria",
    name: "La Cafétéria",
    shortDescription:
      "Lieu de vie et d'échange informel, propice aux discussions, à la lecture rapide et aux débats spontanés.",
    longDescription:
      "La Cafétéria de l'Institut des Horizons n'est pas un simple lieu de restauration. Les lycéens y discutent de l'actualité, partagent des lectures, croisent des points de vue et préparent des projets. Elle incarne la sociabilité intellectuelle que l'école cherche à cultiver.",
    pedagogicalFunction:
      "Favoriser la sociabilité, les échanges informels et le prolongement des apprentissages hors de la salle de classe.",
    disciplines: ["EMC", "Français"],
    competencies: [
      "Prendre part à une conversation argumentée",
      "Respecter un espace commun et ses règles",
      "Faire preuve d'ouverture dans un échange informel",
    ],
    interactiveZones: [
      {
        id: "table-lecture-rapide",
        name: "Table de lecture rapide",
        description: "Revues, journaux, livres courts — rotation régulière.",
        linkedDisciplines: ["Français", "EMI"],
      },
      {
        id: "mur-affichages-lyceens",
        name: "Mur des affichages lycéens",
        description: "Productions des élèves, annonces, actualités de l'Institut.",
        linkedDisciplines: ["EMC", "Français"],
      },
    ],
    ambiance:
      "Social, détendu, ouvert — lumière naturelle, mobilier souple, ambiance non scolaire assumée.",
    autonomyLevel: "autonome",
    uses: ["hub", "interactive-map"],
    qualityStatus: "draft",
    tags: ["vie sociale", "informalité", "lecture", "débat", "sociabilité"],
    displayOrder: 90,
  },
  {
    ...lyceeDefaults,
    id: "place-lycee-amphitheatre",
    slug: "amphitheatre",
    name: "L'Amphithéâtre",
    shortDescription:
      "Grand espace de prise de parole publique pour le Grand Oral, les débats et les restitutions collectives.",
    longDescription:
      "L'Amphithéâtre de l'Institut des Horizons est le lieu des grandes prises de parole. Les lycéens y préparent et passent leur Grand Oral, organisent des débats ouverts à l'école, accueillent des intervenants extérieurs et restituent leurs projets de spécialité. L'exigence y est maximale.",
    pedagogicalFunction:
      "Préparer et exercer la prise de parole publique dans des conditions proches de l'épreuve : argumentation, posture, gestion du temps et du regard.",
    disciplines: ["Français", "Philosophie", "SES", "Langues vivantes", "EMI"],
    competencies: [
      "Construire et délivrer un exposé de vingt minutes",
      "Adapter son propos à un public non spécialiste",
      "Répondre à des questions en improvisant un complément argumenté",
      "Gérer le stress et la posture en situation d'évaluation publique",
    ],
    interactiveZones: [
      {
        id: "scene-prise-de-parole",
        name: "Scène de prise de parole",
        description: "Podium avec micro et écran de présentation — conditions Grand Oral.",
        linkedDisciplines: ["Français", "Philosophie", "Langues vivantes"],
      },
      {
        id: "espace-public-amphi",
        name: "Espace public",
        description: "Gradins pour le jury, les pairs et les invités extérieurs.",
        linkedDisciplines: ["EMC", "SES"],
      },
      {
        id: "regie-technique",
        name: "Régie technique",
        description: "Gestion son et lumière confiée à des élèves formés.",
        linkedDisciplines: ["NSI", "EMI"],
      },
    ],
    ambiance:
      "Solennel et structurant — exigence maximale, espace signifiant, conditions proches du réel.",
    autonomyLevel: "expert",
    uses: ["hub", "interactive-map"],
    qualityStatus: "draft",
    tags: ["Grand Oral", "prise de parole", "débat", "restitution", "exigence", "épreuve"],
    displayOrder: 100,
  },
  {
    ...lyceeDefaults,
    id: "place-lycee-bureau-des-horizons",
    slug: "bureau-des-horizons",
    name: "Le Bureau des Horizons",
    shortDescription:
      "Espace d'orientation, d'accompagnement et de construction du projet personnel après le bac.",
    longDescription:
      "Le Bureau des Horizons est le lieu de l'orientation active. Les élèves y travaillent leur projet post-bac : entretiens individuels avec le professeur principal, exploration des filières, simulation Parcoursup, bilan de compétences et rencontre avec des anciens élèves. L'accent est mis sur la connaissance de soi autant que sur la connaissance des parcours.",
    pedagogicalFunction:
      "Accompagner la construction du projet d'orientation : connaissance de soi, exploration des filières, maîtrise des outils (Parcoursup) et formulation d'un projet cohérent.",
    disciplines: ["Orientation", "EMC", "Documentation"],
    competencies: [
      "Identifier ses compétences, ses goûts et ses contraintes",
      "Explorer et comparer des filières post-bac",
      "Rédiger une lettre de motivation et un CV lycéen",
      "Formuler un projet d'orientation argumenté",
    ],
    interactiveZones: [
      {
        id: "entretien-individuel",
        name: "Espace entretien individuel",
        description: "Coin confidentiel pour les échanges avec le professeur principal ou le psychologue scolaire.",
        linkedDisciplines: ["Orientation", "EMC"],
      },
      {
        id: "mur-parcours",
        name: "Mur des parcours",
        description: "Témoignages d'anciens élèves, filières représentées, cartes mentales d'orientation.",
        linkedDisciplines: ["Orientation", "Documentation"],
      },
      {
        id: "ressources-parcoursup",
        name: "Ressources Parcoursup",
        description: "Guides, calendriers, fiches filières — mis à jour chaque année.",
        linkedDisciplines: ["Orientation", "Documentation"],
      },
    ],
    ambiance:
      "Confidentiel, bienveillant, projectif — espace rassurant, mobilier confortable, ouverture sur l'avenir.",
    autonomyLevel: "expert",
    uses: ["hub", "interactive-map"],
    qualityStatus: "draft",
    tags: ["orientation", "Parcoursup", "projet", "avenir", "bilan de compétences", "accompagnement"],
    displayOrder: 110,
  },
];

// ─── Exports ─────────────────────────────────────────────────────────────────

export const lyceePedagogicalPlaces: LyceePedagogicalPlace[] = places;

export const lyceePlaceSlugs = lyceePedagogicalPlaces.map((place) => ({
  slug: place.slug,
}));

export function getLyceePedagogicalPlaces(): LyceePedagogicalPlace[] {
  return [...lyceePedagogicalPlaces].sort(
    (a, b) => a.displayOrder - b.displayOrder,
  );
}

export function getLyceePedagogicalPlaceBySlug(
  slug: string,
): LyceePedagogicalPlace | undefined {
  return lyceePedagogicalPlaces.find((place) => place.slug === slug);
}
