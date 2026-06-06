import { getPublicStatus } from "@/content/public-status";
import type { PublicStatus } from "@/content/public-status";

// ── Types ────────────────────────────────────────────────────────────────────

export type CharacterRole = "guide" | "professeur";

export type LevelGroup =
  | "maternelle"
  | "primaire"
  | "collège"
  | "lycée"
  | "transversal"
  | "guide";

export type AcademyProfessorCharacter = {
  /** Identifiant interne, correspond à ElementaryProfessorId ou "felix" */
  slug: string;
  /** Prénom + espèce */
  name: string;
  species: string;
  role: CharacterRole;
  /** Groupe de niveau scolaire pour le classement sur /personnages */
  levelGroup: LevelGroup;
  /** Matière principale enseignée */
  mainSubject: string;
  /** Courte description pédagogique (1-2 phrases) */
  shortDescription: string;
  /** Ce que le personnage fait concrètement dans les apprentissages */
  learningFunction: string[];
  /** Ton employé avec les élèves */
  tone: string;
  /** Traits de caractère utiles pédagogiquement */
  pedagogicalTraits: string[];
  /** Niveaux scolaires concernés */
  levels: string[];
  /** Clés de lieux associés dans l'Académie */
  associatedPlaceKeys: string[];
  /** Statut public du personnage sur le site */
  publicStatus: PublicStatus;
  /** Utilisation prévue dans le site */
  siteUsage: string;
};

// ── Données ──────────────────────────────────────────────────────────────────

export const academyCharacters: AcademyProfessorCharacter[] = [
  {
    slug: "felix",
    name: "Félix le lynx",
    species: "Lynx boréal",
    role: "guide",
    levelGroup: "guide",
    mainSubject: "Méthode et gestes intellectuels",
    shortDescription:
      "Félix guide les élèves de CM2 dans leurs missions. Il structure la démarche : observer, chercher, vérifier, justifier, produire une trace.",
    learningFunction: [
      "Structurer une démarche d'investigation",
      "Aider à justifier et argumenter",
      "Relier les matières entre elles",
      "Préparer les élèves à l'entrée au collège",
    ],
    tone: "Direct, encourageant, légèrement mystérieux. Parle avec précision, pose des questions plutôt que de donner les réponses.",
    pedagogicalTraits: [
      "Méthodique",
      "Patient",
      "Curieux",
      "Exigeant sur la justification",
      "Valorise l'effort autant que le résultat",
    ],
    levels: ["CM2"],
    associatedPlaceKeys: [
      "quartier-general-felix",
      "cartotheque-secrete",
      "salle-des-preuves",
    ],
    publicStatus: getPublicStatus("disponible"),
    siteUsage:
      "Présent sur les pages CM2, missions Félix, et comme fil conducteur pédagogique de la fin du primaire.",
  },
  {
    slug: "hector",
    name: "Hector le castor",
    species: "Castor d'Europe",
    role: "professeur",
    levelGroup: "primaire",
    mainSubject: "Mathématiques",
    shortDescription:
      "Hector enseigne les mathématiques avec rigueur et méthode. Il aime construire, mesurer et vérifier.",
    learningFunction: [
      "Calculer et poser des opérations",
      "Mesurer et utiliser des unités",
      "Raisonner par étapes",
      "Construire des figures géométriques",
      "Vérifier un résultat",
    ],
    tone: "Posé, précis, encourageant. Insiste sur la vérification et le raisonnement explicite.",
    pedagogicalTraits: [
      "Rigoureux",
      "Persévérant",
      "Constructif",
      "Valorise le travail bien fait",
      "Attentif aux erreurs comme source d'apprentissage",
    ],
    levels: ["CP", "CE1", "CE2", "CM1", "CM2"],
    associatedPlaceKeys: ["atelier-des-prototypes", "salle-des-preuves"],
    publicStatus: getPublicStatus("disponible"),
    siteUsage:
      "Référent mathématiques sur toutes les pages et missions du primaire.",
  },
  {
    slug: "rosa",
    name: "Rosa la chouette",
    species: "Chouette effraie",
    role: "professeur",
    levelGroup: "primaire",
    mainSubject: "Français",
    shortDescription:
      "Rosa enseigne la langue française : lecture, compréhension, écriture et structuration.",
    learningFunction: [
      "Lire et comprendre des textes variés",
      "Écrire avec clarté et structure",
      "Travailler la grammaire et l'orthographe",
      "Développer le vocabulaire",
    ],
    tone: "Calme, précise, bienveillante. Valorise la nuance et l'expression juste.",
    pedagogicalTraits: [
      "Attentive à chaque mot",
      "Patiente",
      "Exigeante sur la clarté",
      "Valorise la lecture comme plaisir",
      "Encourage la prise de risque à l'écrit",
    ],
    levels: ["CP", "CE1", "CE2", "CM1", "CM2"],
    associatedPlaceKeys: ["bibliotheque-des-recits", "salle-des-lanternes"],
    publicStatus: getPublicStatus("disponible"),
    siteUsage: "Référente français sur toutes les pages et missions du primaire.",
  },
  {
    slug: "melina",
    name: "Mélina l'abeille",
    species: "Abeille domestique",
    role: "professeur",
    levelGroup: "primaire",
    mainSubject: "Sciences",
    shortDescription:
      "Mélina enseigne les sciences en partant du réel : observer, expérimenter, comprendre le vivant et la matière.",
    learningFunction: [
      "Observer avec méthode",
      "Formuler une hypothèse",
      "Conduire une expérience simple",
      "Comprendre le vivant et les écosystèmes",
      "Relier un phénomène à une explication scientifique",
    ],
    tone: "Enthousiaste, curieuse, précise. Transmet la fascination pour le monde naturel.",
    pedagogicalTraits: [
      "Curieuse du monde vivant",
      "Rigoureuse dans l'observation",
      "Enthousiaste",
      "Valorise le questionnement",
      "Lie savoirs et réalité concrète",
    ],
    levels: ["CP", "CE1", "CE2", "CM1", "CM2"],
    associatedPlaceKeys: ["ruche-des-observations", "atelier-des-prototypes"],
    publicStatus: getPublicStatus("disponible"),
    siteUsage:
      "Référente sciences sur toutes les pages et missions du primaire.",
  },
  {
    slug: "elian",
    name: "Elian le dromadaire",
    species: "Dromadaire",
    role: "professeur",
    levelGroup: "primaire",
    mainSubject: "Histoire-Géographie",
    shortDescription:
      "Elian enseigne l'histoire et la géographie : lire des cartes, comprendre les traces du passé, se repérer dans le temps et l'espace.",
    learningFunction: [
      "Lire et interpréter des cartes",
      "Situer des événements dans le temps",
      "Comprendre des documents historiques",
      "Se repérer dans l'espace géographique",
      "Relier passé et présent",
    ],
    tone: "Posé, narratif, évocateur. Aime raconter pour donner du sens aux périodes et aux lieux.",
    pedagogicalTraits: [
      "Grand voyageur intérieur",
      "Narrateur",
      "Patient avec les repères chronologiques",
      "Valorise le contexte",
      "Attentif à la diversité des cultures",
    ],
    levels: ["CE2", "CM1", "CM2"],
    associatedPlaceKeys: ["cartotheque-secrete", "observatoire-des-notions"],
    publicStatus: getPublicStatus("bientôt"),
    siteUsage:
      "Référent histoire-géographie sur les pages CE2, CM1, CM2 et missions correspondantes.",
  },
  {
    slug: "pablo",
    name: "Pablo le singe",
    species: "Capucin brun",
    role: "professeur",
    levelGroup: "primaire",
    mainSubject: "Arts plastiques",
    shortDescription:
      "Pablo enseigne les arts plastiques : créer, observer, composer, expérimenter des techniques artistiques.",
    learningFunction: [
      "Explorer des techniques plastiques variées",
      "Composer une image ou un objet",
      "Observer et analyser des œuvres",
      "Exprimer une intention artistique",
      "Expérimenter sans crainte de l'erreur",
    ],
    tone: "Inventif, joueur, attentif. Encourage l'expérimentation et la singularité.",
    pedagogicalTraits: [
      "Créatif",
      "Ouvert à toutes les formes d'expression",
      "Bienveillant face aux tentatives",
      "Valorise le processus autant que le résultat",
      "Curieux des œuvres du monde entier",
    ],
    levels: ["CP", "CE1", "CE2", "CM1", "CM2"],
    associatedPlaceKeys: ["atelier-des-formes", "galerie-des-songes"],
    publicStatus: getPublicStatus("bientôt"),
    siteUsage:
      "Référent arts plastiques sur les pages et missions du primaire.",
  },
  {
    slug: "naia",
    name: "Naïa l'hippocampe",
    species: "Hippocampe moucheté",
    role: "professeur",
    levelGroup: "primaire",
    mainSubject: "Musique",
    shortDescription:
      "Naïa enseigne la musique : écouter, chanter, créer, reconnaître sons et rythmes.",
    learningFunction: [
      "Écouter et reconnaître des sons",
      "Distinguer hauteur, durée et timbre",
      "Chanter en groupe",
      "Créer des séquences rythmiques simples",
      "Découvrir des œuvres musicales variées",
    ],
    tone: "Douce, précise, rythmée. Fait de chaque élève un interprète actif.",
    pedagogicalTraits: [
      "Très à l'écoute",
      "Rythmée et structurée",
      "Patiente sur la mémorisation",
      "Valorise l'écoute active",
      "Attentive à la confiance vocale de chacun",
    ],
    levels: ["CP", "CE1", "CE2", "CM1", "CM2"],
    associatedPlaceKeys: ["agora-lumineuse", "galerie-des-songes"],
    publicStatus: getPublicStatus("bientôt"),
    siteUsage: "Référente musique sur les pages et missions du primaire.",
  },
  {
    slug: "max",
    name: "Max le kangourou",
    species: "Kangourou roux",
    role: "professeur",
    levelGroup: "primaire",
    mainSubject: "Éducation physique et sportive",
    shortDescription:
      "Max enseigne l'EPS : bouger, coopérer, progresser et respecter les règles.",
    learningFunction: [
      "Développer des habiletés motrices",
      "Coopérer en équipe",
      "Respecter des règles de jeu",
      "Se fixer des objectifs de progression",
      "Gérer l'effort et la récupération",
    ],
    tone: "Dynamique, direct, bienveillant. Valorise l'effort collectif et le dépassement de soi.",
    pedagogicalTraits: [
      "Énergique",
      "Équitable",
      "Valorise le collectif",
      "Attentif au bien-être physique",
      "Encourage la persévérance",
    ],
    levels: ["CP", "CE1", "CE2", "CM1", "CM2"],
    associatedPlaceKeys: ["terrain-des-defis"],
    publicStatus: getPublicStatus("bientôt"),
    siteUsage: "Référent EPS sur les pages et missions du primaire.",
  },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

export function getAcademyCharacter(
  slug: string,
): AcademyProfessorCharacter | undefined {
  return academyCharacters.find((c) => c.slug === slug);
}

export function getProfessorCharacters(): AcademyProfessorCharacter[] {
  return academyCharacters.filter((c) => c.role === "professeur");
}
