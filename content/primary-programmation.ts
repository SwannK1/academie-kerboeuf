export type ProgrammationLevel = "cp" | "ce1" | "ce2";

export type ProgrammationPeriod =
  | "Période 1"
  | "Période 2"
  | "Période 3"
  | "Période 4"
  | "Période 5";

export type ProgrammationSubject = "Français" | "Mathématiques";

export type ProgrammationResource = {
  label: string;
  href?: string;
  /** Statut brut interne — normaliser via getPublicStatus()/getPublicStatusKey() côté UI. */
  status: string;
};

export type ProgrammationEntry = {
  id: string;
  order: number;
  period: ProgrammationPeriod;
  level: ProgrammationLevel;
  subject: ProgrammationSubject;
  domain: string;
  notion: string;
  competence: string;
  resource: ProgrammationResource;
};

export const programmationLevels: readonly ProgrammationLevel[] = [
  "cp",
  "ce1",
  "ce2",
];

export const programmationSubjects: readonly ProgrammationSubject[] = [
  "Français",
  "Mathématiques",
];

export const programmationPeriods: readonly ProgrammationPeriod[] = [
  "Période 1",
  "Période 2",
  "Période 3",
  "Période 4",
  "Période 5",
];

export const primaryProgrammation: readonly ProgrammationEntry[] = [
  {
    id: "cp-fr-lecture-1",
    order: 1,
    period: "Période 1",
    level: "cp",
    subject: "Français",
    domain: "Lecture et compréhension",
    notion: "Découverte du code alphabétique",
    competence: "Identifier les correspondances graphème-phonème simples",
    resource: {
      label: "Lecture et compréhension — ressources",
      href: "/primaire/cp/programmes/francais/lecture-comprehension",
      status: "disponible",
    },
  },
  {
    id: "cp-fr-lecture-2",
    order: 2,
    period: "Période 2",
    level: "cp",
    subject: "Français",
    domain: "Lecture et compréhension",
    notion: "Fluence et compréhension de phrases",
    competence: "Lire à voix haute un texte bref en articulant correctement",
    resource: {
      label: "Lecture et compréhension — ressources",
      href: "/primaire/cp/programmes/francais/lecture-comprehension",
      status: "disponible",
    },
  },
  {
    id: "cp-maths-nombres-1",
    order: 1,
    period: "Période 1",
    level: "cp",
    subject: "Mathématiques",
    domain: "Nombres et calculs",
    notion: "Nombres jusqu'à 10",
    competence: "Dénombrer une quantité et associer le nombre écrit",
    resource: {
      label: "Nombres et calculs — ressources",
      status: "en préparation",
    },
  },
  {
    id: "cp-maths-nombres-2",
    order: 2,
    period: "Période 3",
    level: "cp",
    subject: "Mathématiques",
    domain: "Nombres et calculs",
    notion: "Addition et soustraction posées",
    competence: "Calculer des sommes et différences inférieures à 20",
    resource: {
      label: "Nombres et calculs — ressources",
      status: "à venir",
    },
  },
  {
    id: "ce1-fr-langue-1",
    order: 1,
    period: "Période 1",
    level: "ce1",
    subject: "Français",
    domain: "Étude de la langue",
    notion: "Nature et fonction des mots",
    competence: "Identifier le verbe et son sujet dans une phrase simple",
    resource: {
      label: "Étude de la langue — ressources",
      href: "/primaire/ce1/programmes/francais/etude-de-la-langue",
      status: "disponible",
    },
  },
  {
    id: "ce1-fr-langue-2",
    order: 2,
    period: "Période 2",
    level: "ce1",
    subject: "Français",
    domain: "Étude de la langue",
    notion: "Accords dans le groupe nominal",
    competence: "Accorder le déterminant, le nom et l'adjectif",
    resource: {
      label: "Étude de la langue — ressources",
      href: "/primaire/ce1/programmes/francais/etude-de-la-langue",
      status: "disponible",
    },
  },
  {
    id: "ce1-maths-grandeurs-1",
    order: 1,
    period: "Période 3",
    level: "ce1",
    subject: "Mathématiques",
    domain: "Grandeurs et mesures",
    notion: "Longueurs et unités usuelles",
    competence: "Mesurer et comparer des longueurs avec une unité adaptée",
    resource: {
      label: "Grandeurs et mesures — ressources",
      status: "en construction",
    },
  },
  {
    id: "ce2-maths-nombres-1",
    order: 1,
    period: "Période 1",
    level: "ce2",
    subject: "Mathématiques",
    domain: "Nombres et calculs",
    notion: "Nombres jusqu'à 10 000",
    competence: "Décomposer et comparer des nombres entiers",
    resource: {
      label: "Nombres et calculs — ressources",
      href: "/primaire/ce2/programmes/mathematiques/nombres-calcul",
      status: "disponible",
    },
  },
  {
    id: "ce2-maths-nombres-2",
    order: 2,
    period: "Période 2",
    level: "ce2",
    subject: "Mathématiques",
    domain: "Nombres et calculs",
    notion: "Multiplication posée",
    competence: "Poser et effectuer une multiplication à un chiffre",
    resource: {
      label: "Nombres et calculs — ressources",
      href: "/primaire/ce2/programmes/mathematiques/nombres-calcul",
      status: "disponible",
    },
  },
  {
    id: "ce2-fr-lecture-1",
    order: 1,
    period: "Période 4",
    level: "ce2",
    subject: "Français",
    domain: "Lecture et compréhension",
    notion: "Compréhension de textes narratifs",
    competence: "Répondre à des questions explicites et implicites sur un texte",
    resource: {
      label: "Lecture et compréhension — ressources",
      status: "à venir",
    },
  },
] as const satisfies readonly ProgrammationEntry[];
