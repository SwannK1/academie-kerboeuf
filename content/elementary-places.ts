import { felixProjects } from "@/content/felix-missions";
import type { MissionAccessibility, QualityStatus } from "@/content/felix-types";
import type { MissionStatus } from "@/content/types";

export type PlaceAccentColor = "gold" | "jade" | "sky" | "ember";

export type PlacePersonRef = {
  name: string;
  href: string;
  role?: string;
};

export type ElementaryPlace = {
  slug: string;
  title: string;
  universe: "Les Lisières des Explorateurs";
  shortDescription: string;
  pedagogicalFunction: string;
  disciplines: string[];
  professors: PlacePersonRef[];
  students: PlacePersonRef[];
  interactiveZones: string[];
  pedagogicalUses: string[];
  visibleSupports: string[];
  relatedMissionSlugs: string[];
  accessibility: MissionAccessibility;
  qualityStatus: QualityStatus;
  status: MissionStatus;
  mainImage?: string;
  accentColor: PlaceAccentColor;
};

type ElementaryPlaceInput = Omit<
  ElementaryPlace,
  "slug" | "universe" | "status" | "qualityStatus"
> & {
  status?: MissionStatus;
  qualityStatus?: QualityStatus;
};

const defaultAccessibility: MissionAccessibility = {
  dyslexia:
    "Consignes affichées en phrases courtes, supports lisibles et repères visuels stables.",
  ulis:
    "Entrée possible par manipulation, binôme guidé et réduction du nombre de tâches simultanées.",
  eip:
    "Défis d'approfondissement, rôle d'expert ponctuel et production de synthèse enrichie.",
  general: [
    "Circulation lisible et espaces de repli identifiés",
    "Supports oraux et écrits disponibles selon les besoins",
  ],
};

const professorRefs = {
  felix: {
    name: "Félix",
    href: "/personnages/felix",
    role: "Explorateur référent du CM2",
  },
  noisette: {
    name: "Noisette",
    href: "/professeurs/noisette",
    role: "Maître des cartes",
  },
  esteban: {
    name: "Esteban",
    href: "/professeurs/esteban",
    role: "Architecte des savoirs",
  },
  agathe: {
    name: "Agathe la Chouette",
    href: "/professeurs/agathe",
    role: "Gardienne des récits",
  },
  leo: {
    name: "Léo le Zébu",
    href: "/professeurs/leo",
    role: "Maître des raisonnements stables",
  },
  soa: {
    name: "Soa le Caméléon",
    href: "/professeurs/soa",
    role: "Exploratrice du vivant",
  },
  pablo: {
    name: "Pablo l'Orang-outan",
    href: "/professeurs/pablo",
    role: "Atelier de création expressive",
  },
  naia: {
    name: "Naïa l'Hippocampe",
    href: "/professeurs/naia",
    role: "Gardienne des harmonies",
  },
  max: {
    name: "Max le Kangourou",
    href: "/professeurs/max",
    role: "Coach des défis positifs",
  },
  rosa: {
    name: "Rosa le Flamant Rose",
    href: "/professeurs/rosa",
    role: "Guide de la parole claire",
  },
  hector: {
    name: "Hector le Castor",
    href: "/professeurs/hector",
    role: "Constructeur de méthodes",
  },
  melina: {
    name: "Mélina l'Abeille",
    href: "/professeurs/melina",
    role: "Coordinatrice du vivant",
  },
} satisfies Record<string, PlacePersonRef>;

const studentRefs = {
  felix: {
    name: "Félix",
    href: "/eleves/felix",
    role: "Élève emblématique CM2",
  },
  noisette: {
    name: "Noisette l'Écureuil Ingénieux",
    href: "/eleves/noisette",
    role: "Élève emblématique CM1",
  },
  esteban: {
    name: "Esteban le Manchot Aventurier",
    href: "/eleves/esteban",
    role: "Élève emblématique CE2",
  },
  gaston: {
    name: "Gaston le Hérisson Astucieux",
    href: "/eleves/gaston",
    role: "Élève emblématique CE1",
  },
  zoe: {
    name: "Zoé la Tortue Curieuse",
    href: "/eleves/zoe",
    role: "Élève emblématique CP",
  },
} satisfies Record<string, PlacePersonRef>;

export function createElementaryPlaceSlug(title: string) {
  return title
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/['']/g, "-")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function place(input: ElementaryPlaceInput): ElementaryPlace {
  return {
    ...input,
    slug: createElementaryPlaceSlug(input.title),
    universe: "Les Lisières des Explorateurs",
    status: input.status ?? "en préparation",
    qualityStatus: input.qualityStatus ?? {
      state: "prototype",
      note: "Fiche lieu structurée, à enrichir avec les visuels définitifs.",
    },
  };
}

const places = [
  place({
    title: "La Cour des Explorateurs",
    shortDescription:
      "Grand espace commun où les élèves entrent en mission, coopèrent et déposent les premières traces collectives.",
    pedagogicalFunction:
      "Installer les rituels d'entrée, les défis courts et les temps de coopération avant ou après la classe.",
    disciplines: ["EMC", "EPS", "Langage oral", "Méthodologie"],
    professors: [professorRefs.max, professorRefs.rosa, professorRefs.felix],
    students: [studentRefs.zoe, studentRefs.gaston, studentRefs.felix],
    interactiveZones: [
      "Tableau des défis du jour",
      "Banc des porte-parole",
      "Marquages au sol pour jeux de coopération",
    ],
    pedagogicalUses: [
      "Rituel de lancement d'une mission",
      "Débat flash ou conseil de coopération",
      "Jeux moteurs avec verbalisation des stratégies",
    ],
    visibleSupports: [
      "Cartes rôles",
      "Affichage des règles communes",
      "Badges d'entraide",
    ],
    relatedMissionSlugs: ["republique-des-eleves", "defi-sante-et-cooperation"],
    accessibility: defaultAccessibility,
    accentColor: "gold",
  }),
  place({
    title: "La Cartothèque des Lisières",
    shortDescription:
      "Salle des cartes, plans et itinéraires où les élèves apprennent à représenter l'espace et à justifier leurs repères.",
    pedagogicalFunction:
      "Faire lire, comparer et produire des représentations spatiales utiles à la géographie et aux projets transversaux.",
    disciplines: ["Géographie", "Mathématiques", "EMC", "Français"],
    professors: [professorRefs.noisette, professorRefs.felix],
    students: [studentRefs.noisette, studentRefs.felix],
    interactiveZones: [
      "Mur des cartes annotées",
      "Table lumineuse des itinéraires",
      "Bacs de légendes et pictogrammes",
    ],
    pedagogicalUses: [
      "Construire un plan légendé",
      "Comparer plusieurs échelles",
      "Préparer un exposé à partir d'une carte",
    ],
    visibleSupports: [
      "Atlas de classe",
      "Calques transparents",
      "Fiches légende",
    ],
    relatedMissionSlugs: [
      "ecoquartier-des-felinois",
      "grand-atlas-des-mobilites",
    ],
    accessibility: defaultAccessibility,
    qualityStatus: { state: "validée", note: "Lieu central des projets de cartographie Félix." },
    accentColor: "sky",
  }),
  place({
    title: "La Bibliothèque des Explorateurs",
    shortDescription:
      "Lieu calme consacré aux récits, aux indices textuels et aux lectures qui ouvrent les missions.",
    pedagogicalFunction:
      "Développer la compréhension fine, l'inférence et la culture littéraire dans un cadre apaisé.",
    disciplines: ["Français", "Lecture", "Histoire des arts", "EMI"],
    professors: [professorRefs.agathe, professorRefs.felix],
    students: [studentRefs.zoe, studentRefs.felix],
    interactiveZones: [
      "Rayonnage des indices",
      "Fauteuil de lecture orale",
      "Table des carnets de citations",
    ],
    pedagogicalUses: [
      "Lire un extrait et relever les preuves",
      "Préparer un cercle de lecture",
      "Créer une exposition de personnages ou de thèmes",
    ],
    visibleSupports: [
      "Carnets de lecteur",
      "Marque-pages méthode",
      "Boîtes à vocabulaire",
    ],
    relatedMissionSlugs: ["musee-des-imaginaires-de-felix"],
    accessibility: defaultAccessibility,
    accentColor: "gold",
  }),
  place({
    title: "L'Atelier des Mathématiques",
    shortDescription:
      "Atelier de manipulation et de preuve où les élèves testent, comparent et expliquent leurs stratégies.",
    pedagogicalFunction:
      "Transformer les problèmes en démarches visibles, manipulables et discutables par la classe.",
    disciplines: ["Mathématiques", "Technologie", "Français"],
    professors: [professorRefs.leo, professorRefs.hector, professorRefs.felix],
    students: [studentRefs.gaston, studentRefs.felix],
    interactiveZones: [
      "Table des mesures",
      "Mur des procédures",
      "Coin des erreurs utiles",
    ],
    pedagogicalUses: [
      "Résoudre un problème en équipe",
      "Comparer deux méthodes",
      "Formaliser une trace de raisonnement",
    ],
    visibleSupports: [
      "Matériel de mesure",
      "Cartes-problèmes",
      "Ardoises de justification",
    ],
    relatedMissionSlugs: ["atelier-des-objets-utiles"],
    accessibility: defaultAccessibility,
    accentColor: "jade",
  }),
  place({
    title: "L'Observatoire",
    shortDescription:
      "Espace d'observation du ciel, du vivant et des phénomènes mesurables, pensé pour apprendre à distinguer fait et hypothèse.",
    pedagogicalFunction:
      "Former les élèves à observer avec précision, relever des données et produire un carnet scientifique.",
    disciplines: ["Sciences", "Géographie", "Écriture"],
    professors: [professorRefs.soa, professorRefs.melina, professorRefs.felix],
    students: [studentRefs.esteban, studentRefs.felix],
    interactiveZones: [
      "Station de relevés",
      "Fenêtre des phénomènes",
      "Table des carnets de terrain",
    ],
    pedagogicalUses: [
      "Tenir un journal d'observation",
      "Mesurer la météo",
      "Comparer observation et interprétation",
    ],
    visibleSupports: [
      "Thermomètre",
      "Carnets de terrain",
      "Grilles de relevés",
    ],
    relatedMissionSlugs: [
      "journal-des-traces-de-felix",
      "station-meteo-de-felix",
    ],
    accessibility: defaultAccessibility,
    qualityStatus: { state: "validée", note: "Lieu déjà ancré dans les projets CM2." },
    accentColor: "jade",
  }),
  place({
    title: "Le Laboratoire",
    shortDescription:
      "Salle d'expérimentation où les élèves formulent une question, testent une hypothèse et documentent leurs résultats.",
    pedagogicalFunction:
      "Structurer la démarche scientifique : questionner, expérimenter, observer, conclure et communiquer.",
    disciplines: ["Sciences", "Mathématiques", "EMI"],
    professors: [professorRefs.soa, professorRefs.melina, professorRefs.esteban],
    students: [studentRefs.esteban, studentRefs.felix],
    interactiveZones: [
      "Paillasses d'essai",
      "Mur des hypothèses",
      "Zone de restitution",
    ],
    pedagogicalUses: [
      "Mener une expérience courte",
      "Comparer des résultats",
      "Construire un schéma légendé",
    ],
    visibleSupports: [
      "Plateaux d'expérience",
      "Fiches protocole",
      "Affichage sécurité",
    ],
    relatedMissionSlugs: [
      "journal-des-traces-de-felix",
      "station-meteo-de-felix",
    ],
    accessibility: defaultAccessibility,
    accentColor: "jade",
  }),
  place({
    title: "La Salle Informatique",
    shortDescription:
      "Espace numérique sobre pour chercher, produire, vérifier et apprendre à se protéger en ligne.",
    pedagogicalFunction:
      "Développer les usages responsables du numérique, la recherche documentaire et la production multimédia.",
    disciplines: ["Numérique", "EMI", "Français", "Sciences"],
    professors: [professorRefs.hector, professorRefs.rosa, professorRefs.felix],
    students: [studentRefs.felix, studentRefs.noisette],
    interactiveZones: [
      "Postes de recherche guidée",
      "Mur des sources fiables",
      "Espace de projection",
    ],
    pedagogicalUses: [
      "Chercher et citer une source",
      "Produire une affiche numérique",
      "Travailler l'identité et la sécurité en ligne",
    ],
    visibleSupports: [
      "Checklists de recherche",
      "Guides CRCN",
      "Modèles de diaporama",
    ],
    relatedMissionSlugs: ["corps-relations-consentement-internet"],
    accessibility: defaultAccessibility,
    accentColor: "sky",
  }),
  place({
    title: "La Salle d'Arts",
    shortDescription:
      "Atelier visuel où les essais, brouillons et productions donnent forme aux idées des élèves.",
    pedagogicalFunction:
      "Relier création, observation et langage pour produire, expliquer et exposer une démarche artistique.",
    disciplines: ["Arts plastiques", "Français", "Histoire des arts"],
    professors: [professorRefs.pablo, professorRefs.agathe],
    students: [studentRefs.noisette, studentRefs.felix],
    interactiveZones: [
      "Mur d'exposition",
      "Table des matériaux",
      "Coin croquis",
    ],
    pedagogicalUses: [
      "Créer une production personnelle",
      "Décrire une intention",
      "Préparer une exposition de classe",
    ],
    visibleSupports: [
      "Carnets de croquis",
      "Nuanciers",
      "Cartels d'exposition",
    ],
    relatedMissionSlugs: ["musee-des-imaginaires-de-felix"],
    accessibility: defaultAccessibility,
    accentColor: "ember",
  }),
  place({
    title: "Le Gymnase",
    shortDescription:
      "Lieu des défis physiques, de la coopération et de la verbalisation des stratégies d'action.",
    pedagogicalFunction:
      "Faire vivre l'effort, la règle et l'entraide comme des apprentissages explicites.",
    disciplines: ["EPS", "EMC", "Sciences"],
    professors: [professorRefs.max, professorRefs.soa],
    students: [studentRefs.gaston, studentRefs.felix],
    interactiveZones: [
      "Parcours modulable",
      "Zone d'observation",
      "Tableau des rôles",
    ],
    pedagogicalUses: [
      "Organiser un défi coopératif",
      "Observer une stratégie motrice",
      "Relier santé, corps et sécurité",
    ],
    visibleSupports: [
      "Plots",
      "Chronomètres",
      "Fiches d'observation",
    ],
    relatedMissionSlugs: ["defi-sante-et-cooperation"],
    accessibility: defaultAccessibility,
    qualityStatus: { state: "validée", note: "Lieu opérationnel — programme EPS intégré." },
    accentColor: "gold",
  }),
  place({
    title: "La Salle de Danse et Expression",
    shortDescription:
      "Salle dégagée où le corps, la voix et l'espace deviennent des supports de compréhension et de restitution.",
    pedagogicalFunction:
      "Travailler l'expression, l'écoute, la confiance et la mise en scène d'une idée ou d'un récit.",
    disciplines: ["EPS", "Arts", "Langage oral", "EMC"],
    professors: [professorRefs.rosa, professorRefs.max, professorRefs.naia],
    students: [studentRefs.zoe, studentRefs.felix],
    interactiveZones: [
      "Espace miroir",
      "Cercle d'expression",
      "Zone de restitution",
    ],
    pedagogicalUses: [
      "Mettre en voix un texte",
      "Composer une courte chorégraphie",
      "Préparer une présentation collective",
    ],
    visibleSupports: [
      "Cartes émotions",
      "Repères au sol",
      "Fiches de rôle",
    ],
    relatedMissionSlugs: ["republique-des-eleves", "defi-sante-et-cooperation"],
    accessibility: defaultAccessibility,
    accentColor: "sky",
  }),
  place({
    title: "La Salle de Musique",
    shortDescription:
      "Espace d'écoute, de rythme et de mémoire orale où les élèves apprennent à nommer ce qu'ils entendent.",
    pedagogicalFunction:
      "Développer l'écoute active, la mémoire auditive, la coopération et la restitution sensible.",
    disciplines: ["Musique", "Français", "EMC"],
    professors: [professorRefs.naia, professorRefs.rosa],
    students: [studentRefs.zoe, studentRefs.felix],
    interactiveZones: [
      "Cercle d'écoute",
      "Table des instruments",
      "Mur des rythmes",
    ],
    pedagogicalUses: [
      "Écouter et décrire une œuvre",
      "Créer une ambiance sonore",
      "Accompagner une restitution orale",
    ],
    visibleSupports: [
      "Instruments simples",
      "Cartes d'écoute",
      "Trames de composition",
    ],
    relatedMissionSlugs: ["musee-des-imaginaires-de-felix"],
    accessibility: defaultAccessibility,
    accentColor: "sky",
  }),
  place({
    title: "Le Voyage Découverte",
    shortDescription:
      "Dispositif de sortie et d'exploration hors les murs pour relier les apprentissages à un territoire réel.",
    pedagogicalFunction:
      "Préparer, vivre et exploiter une sortie comme une enquête documentée plutôt qu'un simple déplacement.",
    disciplines: ["Géographie", "Sciences", "Histoire", "Français"],
    professors: [professorRefs.noisette, professorRefs.soa, professorRefs.felix],
    students: [
      studentRefs.noisette,
      studentRefs.esteban,
      studentRefs.felix,
    ],
    interactiveZones: [
      "Carnet de route",
      "Carte d'itinéraire",
      "Point de collecte des traces",
    ],
    pedagogicalUses: [
      "Préparer un itinéraire",
      "Récolter des observations sur le terrain",
      "Restituer une enquête de sortie",
    ],
    visibleSupports: [
      "Carnets de voyage",
      "Plans imprimés",
      "Grilles d'observation",
    ],
    relatedMissionSlugs: [
      "grand-atlas-des-mobilites",
      "journal-des-traces-de-felix",
    ],
    accessibility: defaultAccessibility,
    accentColor: "gold",
  }),
  place({
    title: "Le Jardin des Lisières",
    shortDescription:
      "Jardin pédagogique entre bâtiments et nature, consacré au vivant, à l'alimentation et aux observations régulières.",
    pedagogicalFunction:
      "Ancrer les sciences et l'éducation au développement durable dans des gestes concrets et répétés.",
    disciplines: ["Sciences", "EDD", "Français", "EMC"],
    professors: [professorRefs.melina, professorRefs.soa, professorRefs.felix],
    students: [studentRefs.esteban, studentRefs.felix],
    interactiveZones: [
      "Carrés de culture",
      "Compost pédagogique",
      "Station d'observation",
    ],
    pedagogicalUses: [
      "Observer le vivant sur la durée",
      "Comprendre un écosystème proche",
      "Relier alimentation, santé et environnement",
    ],
    visibleSupports: [
      "Étiquettes botaniques",
      "Calendrier des semis",
      "Carnets naturalistes",
    ],
    relatedMissionSlugs: [
      "journal-des-traces-de-felix",
      "defi-sante-et-cooperation",
    ],
    accessibility: defaultAccessibility,
    qualityStatus: { state: "validée", note: "Lieu déjà présent dans l'univers de Félix." },
    accentColor: "jade",
  }),
  place({
    title: "Le Réfectoire des Explorateurs",
    shortDescription:
      "Lieu de vie quotidienne utilisé pour parler santé, coopération, règles communes et culture alimentaire.",
    pedagogicalFunction:
      "Transformer les temps collectifs en apprentissages d'autonomie, d'attention aux autres et de santé.",
    disciplines: ["EMC", "Sciences", "Français"],
    professors: [professorRefs.max, professorRefs.melina, professorRefs.rosa],
    students: [studentRefs.gaston, studentRefs.felix],
    interactiveZones: [
      "Table des menus",
      "Mur des gestes responsables",
      "Coin débat santé",
    ],
    pedagogicalUses: [
      "Lire et comparer des menus",
      "Débattre des choix collectifs",
      "Comprendre les besoins du corps",
    ],
    visibleSupports: [
      "Affichage nutrition",
      "Cartes responsabilités",
      "Menus commentés",
    ],
    relatedMissionSlugs: ["defi-sante-et-cooperation"],
    accessibility: defaultAccessibility,
    accentColor: "ember",
  }),
  place({
    title: "Les Couloirs des Traces",
    shortDescription:
      "Galerie de circulation où les productions, cartes, journaux et affiches gardent mémoire des apprentissages.",
    pedagogicalFunction:
      "Rendre visibles les progrès, relier les missions entre elles et installer une mémoire collective du primaire.",
    disciplines: ["Français", "Arts", "EMI", "Méthodologie"],
    professors: [professorRefs.agathe, professorRefs.pablo, professorRefs.felix],
    students: [studentRefs.zoe, studentRefs.noisette, studentRefs.felix],
    interactiveZones: [
      "Frise des missions",
      "Vitrine des productions",
      "Mur des méthodes transférables",
    ],
    pedagogicalUses: [
      "Exposer une production finalisée",
      "Relire les méthodes apprises",
      "Préparer une visite guidée par les élèves",
    ],
    visibleSupports: [
      "Cartels",
      "Frises",
      "QR codes internes de ressources",
    ],
    relatedMissionSlugs: [
      "journal-des-traces-de-felix",
      "musee-des-imaginaires-de-felix",
      "republique-des-eleves",
    ],
    accessibility: defaultAccessibility,
    accentColor: "ember",
  }),
] satisfies ElementaryPlace[];

export const elementaryPlaces = places;

export const elementaryPlaceSlugs = elementaryPlaces.map((placeItem) => ({
  slug: placeItem.slug,
}));

export function getElementaryPlaceBySlug(slug: string) {
  return elementaryPlaces.find((placeItem) => placeItem.slug === slug);
}

export function getRelatedPlaceMissions(
  place: Pick<ElementaryPlace, "relatedMissionSlugs">,
) {
  return place.relatedMissionSlugs
    .map((slug) => felixProjects.find((mission) => mission.slug === slug))
    .filter(
      (mission): mission is (typeof felixProjects)[number] => Boolean(mission),
    );
}
