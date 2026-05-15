export type ElementaryLevelSlug = "cp" | "ce1" | "ce2" | "cm1" | "cm2";

export type ElementaryStudentId =
  | "kiwi"
  | "gaston"
  | "esteban"
  | "noisette"
  | "felix";

export type ElementaryProfessorId =
  | "chouette"
  | "hector"
  | "melina"
  | "max"
  | "naia"
  | "pablo"
  | "rosa";

export type ElementaryDiscipline =
  | "Français"
  | "Lecture"
  | "Production d’écrit"
  | "Mathématiques"
  | "Technologie"
  | "Sciences"
  | "Géographie"
  | "Questionner le vivant"
  | "EPS"
  | "Musique"
  | "Expression orale"
  | "Arts"
  | "Anglais"
  | "Cultures";

export type ElementaryPlaceKey =
  | "salle-des-lanternes"
  | "galerie-des-indices"
  | "observatoire-des-notions"
  | "cartotheque-secrete"
  | "quartier-general-felix"
  | "bibliotheque-des-recits"
  | "salle-des-preuves"
  | "atelier-des-prototypes"
  | "ruche-des-observations"
  | "terrain-des-defis"
  | "galerie-des-songes"
  | "atelier-des-formes"
  | "agora-lumineuse"
  | "jardin-des-premieres-decouvertes"
  | "passerelle-du-college";

type ElementaryPlace = {
  key: ElementaryPlaceKey;
  label: string;
  role: "niveau" | "discipline" | "transition";
};

export type CharacterMorphology = {
  silhouette: string;
  scale: string;
  visualMarkers: readonly string[];
};

export type ElementaryStudentAssociation = {
  id: ElementaryStudentId;
  name: string;
  animal: string;
  level: ElementaryLevelSlug;
  narrativeRole: string;
  preferredDisciplinesOrPlaces: readonly (ElementaryDiscipline | ElementaryPlaceKey)[];
  allowedPlaceKeys: readonly ElementaryPlaceKey[];
  forbiddenMainPlaceKeys: readonly ElementaryPlaceKey[];
  morphology: CharacterMorphology;
  existingStudentSlug?: string;
};

export type ElementaryProfessorAssociation = {
  id: ElementaryProfessorId;
  name: string;
  animal: string;
  discipline: readonly ElementaryDiscipline[];
  associatedPlaceKeys: readonly ElementaryPlaceKey[];
  pedagogicalPosture: string;
  universeRole: string;
  forbiddenPlaceKeys: readonly ElementaryPlaceKey[];
  existingProfessorSlug?: string;
};

export const elementaryPlaces = {
  "salle-des-lanternes": {
    key: "salle-des-lanternes",
    label: "Salle des lanternes",
    role: "niveau",
  },
  "galerie-des-indices": {
    key: "galerie-des-indices",
    label: "Galerie des indices",
    role: "niveau",
  },
  "observatoire-des-notions": {
    key: "observatoire-des-notions",
    label: "Observatoire des notions",
    role: "niveau",
  },
  "cartotheque-secrete": {
    key: "cartotheque-secrete",
    label: "Cartothèque secrète",
    role: "niveau",
  },
  "quartier-general-felix": {
    key: "quartier-general-felix",
    label: "Quartier général de Félix",
    role: "niveau",
  },
  "bibliotheque-des-recits": {
    key: "bibliotheque-des-recits",
    label: "Bibliothèque des récits",
    role: "discipline",
  },
  "salle-des-preuves": {
    key: "salle-des-preuves",
    label: "Salle des preuves",
    role: "discipline",
  },
  "atelier-des-prototypes": {
    key: "atelier-des-prototypes",
    label: "Atelier des prototypes",
    role: "discipline",
  },
  "ruche-des-observations": {
    key: "ruche-des-observations",
    label: "Ruche des observations",
    role: "discipline",
  },
  "terrain-des-defis": {
    key: "terrain-des-defis",
    label: "Terrain des défis",
    role: "discipline",
  },
  "galerie-des-songes": {
    key: "galerie-des-songes",
    label: "Galerie des songes",
    role: "discipline",
  },
  "atelier-des-formes": {
    key: "atelier-des-formes",
    label: "Atelier des formes",
    role: "discipline",
  },
  "agora-lumineuse": {
    key: "agora-lumineuse",
    label: "Agora lumineuse",
    role: "discipline",
  },
  "jardin-des-premieres-decouvertes": {
    key: "jardin-des-premieres-decouvertes",
    label: "Jardin des Premières Découvertes",
    role: "transition",
  },
  "passerelle-du-college": {
    key: "passerelle-du-college",
    label: "Passerelle du collège",
    role: "transition",
  },
} as const satisfies Record<ElementaryPlaceKey, ElementaryPlace>;

const levelPlaceKeys = [
  "salle-des-lanternes",
  "galerie-des-indices",
  "observatoire-des-notions",
  "cartotheque-secrete",
  "quartier-general-felix",
] as const satisfies readonly ElementaryPlaceKey[];

const elementaryDisciplinePlaceKeys = [
  "bibliotheque-des-recits",
  "salle-des-preuves",
  "atelier-des-prototypes",
  "ruche-des-observations",
  "terrain-des-defis",
  "galerie-des-songes",
  "atelier-des-formes",
  "agora-lumineuse",
] as const satisfies readonly ElementaryPlaceKey[];

const transitionPlaceKeys = [
  "jardin-des-premieres-decouvertes",
  "passerelle-du-college",
] as const satisfies readonly ElementaryPlaceKey[];

const allElementaryPlaceKeys = [
  ...levelPlaceKeys,
  ...elementaryDisciplinePlaceKeys,
  ...transitionPlaceKeys,
] as const satisfies readonly ElementaryPlaceKey[];

export const elementaryStudentAssociationsById = {
  kiwi: {
    id: "kiwi",
    name: "Kiwi la Grenouille",
    animal: "Grenouille",
    level: "cp",
    narrativeRole:
      "Élève d’entrée dans les codes scolaires : elle saute d’un repère à l’autre pour apprendre à lire, compter et oser répondre.",
    preferredDisciplinesOrPlaces: [
      "Lecture",
      "Expression orale",
      "salle-des-lanternes",
      "jardin-des-premieres-decouvertes",
    ],
    allowedPlaceKeys: [
      "salle-des-lanternes",
      "bibliotheque-des-recits",
      "agora-lumineuse",
      "jardin-des-premieres-decouvertes",
    ],
    forbiddenMainPlaceKeys: [
      "cartotheque-secrete",
      "quartier-general-felix",
      "passerelle-du-college",
    ],
    morphology: {
      silhouette:
        "Petite silhouette souple, basse et bondissante, avec une posture curieuse plutôt que héroïque.",
      scale: "Plus petite que les autres élèves élémentaires.",
      visualMarkers: [
        "grands yeux expressifs",
        "mains arrondies adaptées aux gestes de manipulation",
        "sac ou carnet de premiers repères",
      ],
    },
  },
  gaston: {
    id: "gaston",
    name: "Gaston le Hérisson",
    animal: "Hérisson",
    level: "ce1",
    narrativeRole:
      "Élève stratège des premiers automatismes : il apprend à expliquer la méthode derrière la bonne réponse.",
    preferredDisciplinesOrPlaces: [
      "Mathématiques",
      "galerie-des-indices",
      "salle-des-preuves",
    ],
    allowedPlaceKeys: [
      "galerie-des-indices",
      "salle-des-preuves",
      "salle-des-lanternes",
      "atelier-des-prototypes",
    ],
    forbiddenMainPlaceKeys: [
      "cartotheque-secrete",
      "quartier-general-felix",
      "passerelle-du-college",
    ],
    morphology: {
      silhouette:
        "Corps compact, rond et stable, piquants doux visibles sans agressivité.",
      scale: "Petit gabarit de CE1, légèrement plus robuste que Kiwi.",
      visualMarkers: [
        "piquants courts et réguliers",
        "petites lunettes ou boussole de méthode possibles",
        "pattes proches du corps pour une posture concentrée",
      ],
    },
    existingStudentSlug: "gaston",
  },
  esteban: {
    id: "esteban",
    name: "Esteban le Manchot",
    animal: "Manchot",
    level: "ce2",
    narrativeRole:
      "Explorateur des notions : il transforme les découvertes en traces claires, schémas et repères mémorisables.",
    preferredDisciplinesOrPlaces: [
      "Sciences",
      "Français",
      "observatoire-des-notions",
      "ruche-des-observations",
    ],
    allowedPlaceKeys: [
      "observatoire-des-notions",
      "ruche-des-observations",
      "bibliotheque-des-recits",
      "salle-des-preuves",
    ],
    forbiddenMainPlaceKeys: [
      "jardin-des-premieres-decouvertes",
      "cartotheque-secrete",
      "passerelle-du-college",
    ],
    morphology: {
      silhouette:
        "Silhouette verticale, nette et légèrement arrondie, adaptée aux scènes d’observation.",
      scale: "Taille moyenne de CE2, plus élancée que Gaston.",
      visualMarkers: [
        "ventre clair très lisible",
        "petites ailes utilisées pour pointer ou schématiser",
        "carnet de traces ou codes couleur",
      ],
    },
    existingStudentSlug: "esteban",
  },
  noisette: {
    id: "noisette",
    name: "Noisette l’Écureuille",
    animal: "Écureuille",
    level: "cm1",
    narrativeRole:
      "Collectrice d’indices documentaires : elle classe, relie et construit des réponses organisées.",
    preferredDisciplinesOrPlaces: [
      "Géographie",
      "Français",
      "cartotheque-secrete",
      "bibliotheque-des-recits",
    ],
    allowedPlaceKeys: [
      "cartotheque-secrete",
      "bibliotheque-des-recits",
      "agora-lumineuse",
      "ruche-des-observations",
      "quartier-general-felix",
    ],
    forbiddenMainPlaceKeys: [
      "salle-des-lanternes",
      "jardin-des-premieres-decouvertes",
      "terrain-des-defis",
    ],
    morphology: {
      silhouette:
        "Silhouette vive et agile, queue ample servant de repère graphique sans prendre toute l’image.",
      scale: "Gabarit CM1, fin et mobile.",
      visualMarkers: [
        "grande queue équilibrée",
        "petit sac de cartes ou documents",
        "posture penchée vers l’observation et le classement",
      ],
    },
    existingStudentSlug: "noisette",
  },
  felix: {
    id: "felix",
    name: "Félix le Lynx",
    animal: "Lynx",
    level: "cm2",
    narrativeRole:
      "Chef d’enquête de fin de primaire : il relie les indices, justifie les réponses et prépare le passage vers le collège.",
    preferredDisciplinesOrPlaces: [
      "Lecture",
      "Production d’écrit",
      "Mathématiques",
      "Sciences",
      "quartier-general-felix",
    ],
    allowedPlaceKeys: [
      "quartier-general-felix",
      "cartotheque-secrete",
      "salle-des-preuves",
      "atelier-des-prototypes",
      "passerelle-du-college",
    ],
    forbiddenMainPlaceKeys: [
      "salle-des-lanternes",
      "jardin-des-premieres-decouvertes",
      "galerie-des-songes",
    ],
    morphology: {
      silhouette:
        "Silhouette féline, droite et attentive, avec une présence de meneur sans posture adulte.",
      scale: "Le plus grand des élèves élémentaires, mais encore clairement enfant.",
      visualMarkers: [
        "oreilles pointues avec touffes discrètes",
        "regard concentré",
        "carnet d’exploration ou dossier d’enquête",
      ],
    },
    existingStudentSlug: "felix",
  },
} as const satisfies Record<ElementaryStudentId, ElementaryStudentAssociation>;

export const elementaryProfessorAssociationsById = {
  chouette: {
    id: "chouette",
    name: "Chouette",
    animal: "Chouette",
    discipline: ["Français", "Lecture", "Production d’écrit"],
    associatedPlaceKeys: ["bibliotheque-des-recits", "salle-des-lanternes"],
    pedagogicalPosture:
      "Guide par questionnement calme, lecture fine et reformulation progressive.",
    universeRole:
      "Référente du langage écrit et oral : elle garantit la cohérence des récits, des textes et des consignes.",
    forbiddenPlaceKeys: ["terrain-des-defis", "atelier-des-prototypes"],
    existingProfessorSlug: "agathe",
  },
  hector: {
    id: "hector",
    name: "Hector le Castor",
    animal: "Castor",
    discipline: ["Mathématiques", "Technologie"],
    associatedPlaceKeys: ["salle-des-preuves", "atelier-des-prototypes"],
    pedagogicalPosture:
      "Fait construire, tester, corriger et verbaliser chaque étape de méthode.",
    universeRole:
      "Constructeur des démarches concrètes : il transforme problèmes, mesures et prototypes en méthodes visibles.",
    forbiddenPlaceKeys: ["galerie-des-songes", "jardin-des-premieres-decouvertes"],
    existingProfessorSlug: "hector",
  },
  melina: {
    id: "melina",
    name: "Mélina l’Abeille",
    animal: "Abeille",
    discipline: ["Sciences", "Questionner le vivant"],
    associatedPlaceKeys: ["ruche-des-observations", "observatoire-des-notions"],
    pedagogicalPosture:
      "Organise l’observation collective, distribue les rôles et fait classer avant de conclure.",
    universeRole:
      "Coordinatrice du vivant : elle relie observation, coopération et précision scientifique.",
    forbiddenPlaceKeys: ["terrain-des-defis", "salle-des-lanternes"],
    existingProfessorSlug: "melina",
  },
  max: {
    id: "max",
    name: "Max le Kangourou",
    animal: "Kangourou",
    discipline: ["EPS"],
    associatedPlaceKeys: ["terrain-des-defis"],
    pedagogicalPosture:
      "Encourage l’effort court, le geste repris et le progrès visible sans mise en échec.",
    universeRole:
      "Coach du mouvement et de la confiance corporelle : il rend l’effort joyeux, lisible et sécurisé.",
    forbiddenPlaceKeys: [
      "bibliotheque-des-recits",
      "cartotheque-secrete",
      "salle-des-lanternes",
    ],
    existingProfessorSlug: "max",
  },
  naia: {
    id: "naia",
    name: "Naïa l’Hippocampe",
    animal: "Hippocampe",
    discipline: ["Musique", "Expression orale"],
    associatedPlaceKeys: ["galerie-des-songes", "agora-lumineuse"],
    pedagogicalPosture:
      "Fait écouter, ressentir, nommer puis transformer l’émotion en expression maîtrisée.",
    universeRole:
      "Gardienne des harmonies : elle relie voix, rythme, nuance et présence expressive.",
    forbiddenPlaceKeys: ["salle-des-preuves", "terrain-des-defis"],
    existingProfessorSlug: "naia",
  },
  pablo: {
    id: "pablo",
    name: "Pablo l’Orang-outan",
    animal: "Orang-outan",
    discipline: ["Arts"],
    associatedPlaceKeys: ["atelier-des-formes", "galerie-des-songes"],
    pedagogicalPosture:
      "Accueille le brouillon, cadre la liberté créative et aide à reprendre sans décourager.",
    universeRole:
      "Maître des formes : il donne une place officielle aux essais visuels, aux compositions et aux émotions plastiques.",
    forbiddenPlaceKeys: ["salle-des-preuves", "quartier-general-felix"],
    existingProfessorSlug: "pablo",
  },
  rosa: {
    id: "rosa",
    name: "Rosa le Flamant rose",
    animal: "Flamant rose",
    discipline: ["Anglais", "Cultures", "Expression orale"],
    associatedPlaceKeys: ["agora-lumineuse", "bibliotheque-des-recits"],
    pedagogicalPosture:
      "Installe une parole claire, encourage l’imitation, la répétition vivante et l’ouverture culturelle.",
    universeRole:
      "Ambassadrice des langues et cultures : elle fait passer de l’oral rassuré à la curiosité du monde.",
    forbiddenPlaceKeys: ["atelier-des-prototypes", "cartotheque-secrete"],
    existingProfessorSlug: "rosa",
  },
} as const satisfies Record<ElementaryProfessorId, ElementaryProfessorAssociation>;

export const elementaryStudentAssociations = Object.values(
  elementaryStudentAssociationsById,
);

export const elementaryProfessorAssociations = Object.values(
  elementaryProfessorAssociationsById,
);

export function getElementaryStudentAssociation(id: ElementaryStudentId) {
  return elementaryStudentAssociationsById[id];
}

export function getElementaryProfessorAssociation(id: ElementaryProfessorId) {
  return elementaryProfessorAssociationsById[id];
}

export function getElementaryPlaceLabel(placeKey: ElementaryPlaceKey) {
  return elementaryPlaces[placeKey].label;
}

export function getElementaryStudentPlaces(id: ElementaryStudentId) {
  return elementaryStudentAssociationsById[id].allowedPlaceKeys.map(
    getElementaryPlaceLabel,
  );
}

export function getElementaryProfessorPlaces(id: ElementaryProfessorId) {
  return elementaryProfessorAssociationsById[id].associatedPlaceKeys.map(
    getElementaryPlaceLabel,
  );
}

export function isElementaryPlaceKey(value: string): value is ElementaryPlaceKey {
  return allElementaryPlaceKeys.includes(value as ElementaryPlaceKey);
}
