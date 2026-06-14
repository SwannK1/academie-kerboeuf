import type { AccentKey } from "@/content/universe";
import { getPublicStatus } from "@/content/public-status";
import type { PublicStatus } from "@/content/public-status";

export type LieuAcademie = {
  id: string;
  nom: string;
  descriptionCourte: string;
  fonctionPedagogique: string;
  matieresAssociees: string[];
  competencesPossibles: string[];
  ambianceVisuelle: string[];
  usageDansContenus: string;
  niveaux: string[];
  statut: PublicStatus;
  accentColor: AccentKey;
  route?: string;
};

export const lieuxAcademie: LieuAcademie[] = [
  {
    id: "classe-atelier",
    nom: "Classe-Atelier",
    descriptionCourte:
      "La salle principale d'apprentissage : on y manipule, s'entraîne et résout des problèmes.",
    fonctionPedagogique:
      "Apprendre par la manipulation et la résolution d'exercices — lieu central des entraînements et des productions.",
    matieresAssociees: [
      "Français",
      "Mathématiques",
      "Sciences",
      "Arts plastiques",
      "Toutes matières",
    ],
    competencesPossibles: [
      "Lire et écrire",
      "Résoudre des problèmes",
      "Manipuler des outils",
      "Coopérer",
      "Verbaliser une démarche",
    ],
    ambianceVisuelle: [
      "Tables modulables en îlots",
      "Mur des méthodes",
      "Affichages de référence par matière",
      "Matériel de manipulation accessible",
    ],
    usageDansContenus:
      "Lieu de référence pour les séquences d'entraînement, les exercices et les activités de production.",
    niveaux: ["Cycle 1", "Cycle 2", "Cycle 3", "Cycle 4"],
    statut: getPublicStatus("disponible"),
    accentColor: "gold",
  },
  {
    id: "cartotheque-lisieres",
    nom: "Cartothèque des Lisières",
    descriptionCourte:
      "Salle des cartes, plans et itinéraires — on y apprend à lire l'espace et à justifier ses repères.",
    fonctionPedagogique:
      "Faire lire, comparer et produire des représentations spatiales utiles à la géographie et aux projets transversaux.",
    matieresAssociees: ["Géographie", "Mathématiques", "EMC", "Français"],
    competencesPossibles: [
      "Lire une carte et en extraire des informations",
      "Changer d'échelle",
      "Produire un plan légendé",
      "Se repérer dans l'espace",
      "Justifier un itinéraire",
    ],
    ambianceVisuelle: [
      "Mur des cartes annotées",
      "Table lumineuse des itinéraires",
      "Bacs de légendes et pictogrammes",
      "Atlas de classe",
    ],
    usageDansContenus:
      "Pages de géographie, ressources cartographiques, séquences sur l'espace et les territoires.",
    niveaux: ["Cycle 2", "Cycle 3", "Cycle 4"],
    statut: getPublicStatus("disponible"),
    accentColor: "sky",
  },
  {
    id: "observatoire",
    nom: "Observatoire",
    descriptionCourte:
      "Espace d'observation du ciel, du vivant et des phénomènes mesurables.",
    fonctionPedagogique:
      "Former les élèves à observer avec précision, relever des données et distinguer fait et hypothèse.",
    matieresAssociees: ["Sciences", "Géographie", "Mathématiques"],
    competencesPossibles: [
      "Observer et décrire avec précision",
      "Mesurer et relever des données",
      "Formuler une hypothèse",
      "Tenir un carnet scientifique",
      "Distinguer observation et interprétation",
    ],
    ambianceVisuelle: [
      "Station de relevés météo",
      "Fenêtre des phénomènes",
      "Carnets de terrain",
      "Grilles de relevés affichées",
    ],
    usageDansContenus:
      "Séquences de sciences, activités d'observation, carnets de terrain numériques.",
    niveaux: ["Cycle 2", "Cycle 3", "Cycle 4"],
    statut: getPublicStatus("disponible"),
    accentColor: "jade",
  },
  {
    id: "agora",
    nom: "Agora",
    descriptionCourte:
      "Espace de parole : on y débat, argumente et apprend à s'exprimer devant les autres.",
    fonctionPedagogique:
      "Travailler l'expression orale, l'argumentation, l'écoute et la citoyenneté par le débat et la délibération.",
    matieresAssociees: ["EMC", "Français oral", "Philosophie", "Histoire"],
    competencesPossibles: [
      "S'exprimer clairement à l'oral",
      "Écouter et reformuler",
      "Argumenter avec des exemples",
      "Respecter les règles du débat",
      "Construire un point de vue",
    ],
    ambianceVisuelle: [
      "Disposition en cercle ou en fer à cheval",
      "Pupitre de parole",
      "Affichage des règles de débat",
      "Indicateurs de rôle (animateur, secrétaire, observateur)",
    ],
    usageDansContenus:
      "Séquences d'oral, EMC, débats philo à partir du CE1, discussions à visée délibérative.",
    niveaux: ["Cycle 2", "Cycle 3", "Cycle 4"],
    statut: getPublicStatus("bientôt"),
    accentColor: "ember",
  },
  {
    id: "atelier-objets",
    nom: "Atelier des objets",
    descriptionCourte:
      "Atelier technique où l'on construit, mesure et comprend le fonctionnement des objets.",
    fonctionPedagogique:
      "Comprendre les objets techniques par la manipulation, la construction et l'analyse de leur fonctionnement.",
    matieresAssociees: [
      "Technologie",
      "Mathématiques",
      "Sciences",
      "Arts plastiques",
    ],
    competencesPossibles: [
      "Identifier les fonctions d'un objet technique",
      "Mesurer et vérifier",
      "Construire en respectant un cahier des charges",
      "Utiliser des outils simples en sécurité",
      "Modéliser un mécanisme",
    ],
    ambianceVisuelle: [
      "Paillasses de travail",
      "Outils organisés et affichés",
      "Schémas légendés au mur",
      "Pièces et matériaux de construction",
    ],
    usageDansContenus:
      "Séquences de technologie, projets de construction, activités de modélisation.",
    niveaux: ["Cycle 3", "Cycle 4"],
    statut: getPublicStatus("bientôt"),
    accentColor: "gold",
  },
  {
    id: "galerie-traces",
    nom: "Galerie des traces",
    descriptionCourte:
      "Galerie de l'Académie où les sources, documents et traces du passé sont exposés et étudiés.",
    fonctionPedagogique:
      "Étudier l'histoire à partir de sources réelles — apprendre à lire, questionner et croiser les traces du passé.",
    matieresAssociees: ["Histoire", "Français", "EMI", "Arts"],
    competencesPossibles: [
      "Identifier et dater une source historique",
      "Questionner un document",
      "Croiser plusieurs sources",
      "Distinguer fait et interprétation",
      "Construire une frise chronologique",
    ],
    ambianceVisuelle: [
      "Vitrines de documents sources",
      "Frise chronologique murale",
      "Cartels d'exposition",
      "Reproductions de monuments et d'œuvres",
    ],
    usageDansContenus:
      "Séquences d'histoire, travail sur les sources et les documents historiques.",
    niveaux: ["Cycle 2", "Cycle 3", "Cycle 4"],
    statut: getPublicStatus("bientôt"),
    accentColor: "ember",
  },
  {
    id: "jardin-lisieres",
    nom: "Jardin des lisières",
    descriptionCourte:
      "Jardin pédagogique entre bâtiments et nature, dédié au vivant, à l'environnement et à l'écologie.",
    fonctionPedagogique:
      "Ancrer les sciences du vivant dans des gestes concrets — observer, cultiver, comprendre les écosystèmes.",
    matieresAssociees: ["Sciences", "EDD", "Français", "EMC"],
    competencesPossibles: [
      "Observer le vivant dans la durée",
      "Identifier des êtres vivants et leurs besoins",
      "Comprendre un écosystème proche",
      "Relier alimentation, santé et environnement",
      "Agir de façon responsable",
    ],
    ambianceVisuelle: [
      "Carrés de culture",
      "Compost pédagogique",
      "Station d'observation",
      "Étiquettes botaniques",
      "Calendrier des semis",
    ],
    usageDansContenus:
      "Séquences de sciences du vivant, EDD, projets environnementaux et observations saisonnières.",
    niveaux: ["Cycle 1", "Cycle 2", "Cycle 3"],
    statut: getPublicStatus("disponible"),
    accentColor: "jade",
  },
];

export function getLieuAcademie(id: string): LieuAcademie | undefined {
  return lieuxAcademie.find((lieu) => lieu.id === id);
}

export function getLieuxAcademieByNiveau(niveau: string): LieuAcademie[] {
  return lieuxAcademie.filter((lieu) => lieu.niveaux.includes(niveau));
}
