/**
 * Outil de programmation annuelle — espace enseignant.
 *
 * Le site organise, les PDF enseignent : chaque item ci-dessous décrit une
 * séquence (1 séquence = 1 compétence) que l'enseignant peut répartir sur
 * les périodes de l'année. Aucun contenu pédagogique détaillé n'est stocké
 * ici — uniquement les métadonnées nécessaires à l'organisation.
 */

export type TeacherProgrammationLevel = "cp" | "ce1" | "ce2" | "cm1" | "cm2";

export type TeacherProgrammationSubject =
  | "francais"
  | "mathematiques"
  | "sciences";

export type TeacherProgrammationPeriod =
  | "periode-1"
  | "periode-2"
  | "periode-3"
  | "periode-4"
  | "periode-5";

/**
 * Statut tel que défini par le cahier des charges (disponible / en
 * préparation / à venir). Mappé vers les clés publiques via
 * getPublicStatusKey côté UI — ne pas comparer ces chaînes directement
 * dans les composants.
 */
export type TeacherProgrammationStatus =
  | "disponible"
  | "en-preparation"
  | "a-venir";

export interface TeacherProgrammationItem {
  id: string;
  level: TeacherProgrammationLevel;
  subject: TeacherProgrammationSubject;
  domain: string;
  title: string;
  skill: string;
  period: TeacherProgrammationPeriod;
  durationLabel: string;
  status: TeacherProgrammationStatus;
}

export const teacherProgrammationLevels: {
  id: TeacherProgrammationLevel;
  label: string;
}[] = [
  { id: "cp", label: "CP" },
  { id: "ce1", label: "CE1" },
  { id: "ce2", label: "CE2" },
  { id: "cm1", label: "CM1" },
  { id: "cm2", label: "CM2" },
];

export const teacherProgrammationSubjects: {
  id: TeacherProgrammationSubject;
  label: string;
}[] = [
  { id: "francais", label: "Français" },
  { id: "mathematiques", label: "Mathématiques" },
  { id: "sciences", label: "Sciences" },
];

export const teacherProgrammationPeriods: {
  id: TeacherProgrammationPeriod;
  label: string;
}[] = [
  { id: "periode-1", label: "Période 1" },
  { id: "periode-2", label: "Période 2" },
  { id: "periode-3", label: "Période 3" },
  { id: "periode-4", label: "Période 4" },
  { id: "periode-5", label: "Période 5" },
];

export const teacherProgrammationItems: TeacherProgrammationItem[] = [
  // --- CM2 — Français ---
  {
    id: "cm2-francais-conjugaison-imparfait",
    level: "cm2",
    subject: "francais",
    domain: "conjugaison",
    title: "L'imparfait",
    skill: "Conjuguer à l'imparfait les verbes des trois groupes",
    period: "periode-2",
    durationLabel: "3 séances",
    status: "disponible",
  },
  {
    id: "cm2-francais-conjugaison-futur-simple",
    level: "cm2",
    subject: "francais",
    domain: "conjugaison",
    title: "Le futur simple",
    skill: "Conjuguer au futur simple les verbes des trois groupes",
    period: "periode-3",
    durationLabel: "3 séances",
    status: "disponible",
  },
  {
    id: "cm2-francais-grammaire-nature-fonction",
    level: "cm2",
    subject: "francais",
    domain: "grammaire",
    title: "Nature et fonction des mots",
    skill: "Distinguer la nature et la fonction d'un mot dans une phrase",
    period: "periode-1",
    durationLabel: "4 séances",
    status: "en-preparation",
  },
  {
    id: "cm2-francais-lecture-comprehension-recit",
    level: "cm2",
    subject: "francais",
    domain: "lecture-comprehension",
    title: "Comprendre un récit long",
    skill: "Dégager les informations implicites d'un récit",
    period: "periode-1",
    durationLabel: "5 séances",
    status: "en-preparation",
  },
  {
    id: "cm2-francais-orthographe-accords",
    level: "cm2",
    subject: "francais",
    domain: "orthographe",
    title: "Les accords dans le groupe nominal",
    skill: "Accorder en genre et en nombre les mots du groupe nominal",
    period: "periode-4",
    durationLabel: "3 séances",
    status: "a-venir",
  },
  {
    id: "cm2-francais-vocabulaire-formation-mots",
    level: "cm2",
    subject: "francais",
    domain: "vocabulaire",
    title: "La formation des mots",
    skill: "Identifier préfixes, suffixes et radicaux pour comprendre un mot",
    period: "periode-5",
    durationLabel: "2 séances",
    status: "a-venir",
  },

  // --- CM2 — Mathématiques ---
  {
    id: "cm2-mathematiques-nombres-decimaux",
    level: "cm2",
    subject: "mathematiques",
    domain: "nombres-et-calculs",
    title: "Les nombres décimaux",
    skill: "Comprendre et utiliser les nombres décimaux",
    period: "periode-1",
    durationLabel: "4 séances",
    status: "en-preparation",
  },
  {
    id: "cm2-mathematiques-geometrie-outils",
    level: "cm2",
    subject: "mathematiques",
    domain: "geometrie",
    title: "Choisir le bon outil géométrique",
    skill: "Choisir l'instrument adapté à une construction géométrique",
    period: "periode-2",
    durationLabel: "3 séances",
    status: "disponible",
  },
  {
    id: "cm2-mathematiques-calcul-operations-decimaux",
    level: "cm2",
    subject: "mathematiques",
    domain: "nombres-et-calculs",
    title: "Opérer sur les nombres décimaux",
    skill: "Additionner et soustraire des nombres décimaux",
    period: "periode-3",
    durationLabel: "4 séances",
    status: "en-preparation",
  },
  {
    id: "cm2-mathematiques-grandeurs-mesures-volumes",
    level: "cm2",
    subject: "mathematiques",
    domain: "grandeurs-et-mesures",
    title: "Le volume du pavé droit",
    skill: "Calculer le volume d'un pavé droit",
    period: "periode-4",
    durationLabel: "3 séances",
    status: "a-venir",
  },
  {
    id: "cm2-mathematiques-organisation-donnees-proportionnalite",
    level: "cm2",
    subject: "mathematiques",
    domain: "organisation-et-gestion-de-donnees",
    title: "Situations de proportionnalité",
    skill: "Résoudre un problème relevant de la proportionnalité",
    period: "periode-5",
    durationLabel: "3 séances",
    status: "a-venir",
  },

  // --- CM2 — Sciences ---
  {
    id: "cm2-sciences-vivant-respiration",
    level: "cm2",
    subject: "sciences",
    domain: "le-vivant",
    title: "La respiration",
    skill: "Décrire le trajet de l'air dans l'organisme",
    period: "periode-1",
    durationLabel: "2 séances",
    status: "en-preparation",
  },
  {
    id: "cm2-sciences-matiere-etats",
    level: "cm2",
    subject: "sciences",
    domain: "matiere",
    title: "Les changements d'état de l'eau",
    skill: "Identifier les changements d'état de la matière",
    period: "periode-2",
    durationLabel: "2 séances",
    status: "disponible",
  },
  {
    id: "cm2-sciences-energie-sources",
    level: "cm2",
    subject: "sciences",
    domain: "energie",
    title: "Les sources d'énergie",
    skill: "Distinguer les sources d'énergie renouvelables et non renouvelables",
    period: "periode-3",
    durationLabel: "2 séances",
    status: "a-venir",
  },
  {
    id: "cm2-sciences-univers-systeme-solaire",
    level: "cm2",
    subject: "sciences",
    domain: "univers-et-technologie",
    title: "Le système solaire",
    skill: "Situer la Terre dans le système solaire",
    period: "periode-4",
    durationLabel: "2 séances",
    status: "a-venir",
  },

  // --- CE1 — structure de base en préparation ---
  {
    id: "ce1-francais-lecture-comprehension-1",
    level: "ce1",
    subject: "francais",
    domain: "lecture-comprehension",
    title: "Lire un texte court",
    skill: "Comprendre les informations explicites d'un texte court",
    period: "periode-1",
    durationLabel: "3 séances",
    status: "en-preparation",
  },
  {
    id: "ce1-mathematiques-nombres-1",
    level: "ce1",
    subject: "mathematiques",
    domain: "nombres-et-calculs",
    title: "Les nombres jusqu'à 100",
    skill: "Lire, écrire et décomposer les nombres jusqu'à 100",
    period: "periode-1",
    durationLabel: "4 séances",
    status: "en-preparation",
  },
  {
    id: "ce1-sciences-vivant-1",
    level: "ce1",
    subject: "sciences",
    domain: "le-vivant",
    title: "Les besoins des êtres vivants",
    skill: "Identifier les besoins des êtres vivants",
    period: "periode-2",
    durationLabel: "2 séances",
    status: "a-venir",
  },
];
