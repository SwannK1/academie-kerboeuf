import type { PublicStatusKey } from "@/content/public-status";

/**
 * Données de base de l'outil de programmation annuelle enseignant.
 *
 * Règle : 1 séquence = 1 compétence. Ces données décrivent uniquement
 * l'organisation de l'année (matière, domaine, compétence, période, durée),
 * jamais le contenu pédagogique détaillé (consignes, exercices, corrections).
 */

export type TeacherLevel = "cp" | "ce1" | "ce2" | "cm1" | "cm2";

export type TeacherSubject =
  | "francais"
  | "mathematiques"
  | "sciences"
  | "histoire-geographie"
  | "emc"
  | "arts"
  | "musique"
  | "eps";

export type TeacherPeriod =
  | "periode-1"
  | "periode-2"
  | "periode-3"
  | "periode-4"
  | "periode-5";

export const teacherLevels: { id: TeacherLevel; label: string }[] = [
  { id: "cp", label: "CP" },
  { id: "ce1", label: "CE1" },
  { id: "ce2", label: "CE2" },
  { id: "cm1", label: "CM1" },
  { id: "cm2", label: "CM2" },
];

export const teacherSubjects: { id: TeacherSubject; label: string }[] = [
  { id: "francais", label: "Français" },
  { id: "mathematiques", label: "Mathématiques" },
  { id: "sciences", label: "Sciences / Questionner le monde" },
  { id: "histoire-geographie", label: "Histoire-Géographie" },
  { id: "emc", label: "EMC" },
  { id: "arts", label: "Arts" },
  { id: "musique", label: "Musique" },
  { id: "eps", label: "EPS" },
];

export const teacherPeriods: { id: TeacherPeriod; label: string }[] = [
  { id: "periode-1", label: "Période 1" },
  { id: "periode-2", label: "Période 2" },
  { id: "periode-3", label: "Période 3" },
  { id: "periode-4", label: "Période 4" },
  { id: "periode-5", label: "Période 5" },
];

/** Statut pédagogique de la séquence (pas l'existence d'un PDF). */
export type TeacherItemStatus = PublicStatusKey;

export interface TeacherProgrammationItem {
  id: string;
  level: TeacherLevel;
  subject: TeacherSubject;
  domain: string;
  title: string;
  skill: string;
  period: TeacherPeriod;
  durationLabel: string;
  status: TeacherItemStatus;
}

export const teacherProgrammationItems: TeacherProgrammationItem[] = [
  // --- CM2 — Français ---
  {
    id: "cm2-francais-lecture-1",
    level: "cm2",
    subject: "francais",
    domain: "Lecture et compréhension",
    title: "Comprendre un texte narratif long",
    skill: "Repérer les informations explicites et implicites d'un récit",
    period: "periode-1",
    durationLabel: "3 semaines",
    status: "available",
  },
  {
    id: "cm2-francais-grammaire-1",
    level: "cm2",
    subject: "francais",
    domain: "Grammaire",
    title: "Identifier les classes de mots",
    skill: "Distinguer nom, verbe, adjectif et déterminant dans une phrase",
    period: "periode-1",
    durationLabel: "2 semaines",
    status: "in-progress",
  },
  {
    id: "cm2-francais-conjugaison-imparfait",
    level: "cm2",
    subject: "francais",
    domain: "Conjugaison",
    title: "L'imparfait",
    skill: "Conjuguer à l'imparfait les verbes des trois groupes",
    period: "periode-2",
    durationLabel: "2 semaines",
    status: "available",
  },
  {
    id: "cm2-francais-conjugaison-futur-simple",
    level: "cm2",
    subject: "francais",
    domain: "Conjugaison",
    title: "Le futur simple",
    skill: "Conjuguer au futur simple les verbes des trois groupes",
    period: "periode-3",
    durationLabel: "2 semaines",
    status: "available",
  },
  {
    id: "cm2-francais-orthographe-accords",
    level: "cm2",
    subject: "francais",
    domain: "Orthographe",
    title: "Les accords dans le groupe nominal",
    skill: "Accorder en genre et en nombre dans un groupe nominal",
    period: "periode-4",
    durationLabel: "2 semaines",
    status: "in-progress",
  },
  {
    id: "cm2-francais-redaction-recit",
    level: "cm2",
    subject: "francais",
    domain: "Rédaction",
    title: "Écrire un récit structuré",
    skill: "Produire un récit cohérent avec une situation initiale, des péripéties et une fin",
    period: "periode-5",
    durationLabel: "3 semaines",
    status: "upcoming",
  },

  // --- CM2 — Mathématiques ---
  {
    id: "cm2-mathematiques-nombres-decimaux",
    level: "cm2",
    subject: "mathematiques",
    domain: "Nombres et calculs",
    title: "Les nombres décimaux",
    skill: "Comprendre et utiliser les nombres décimaux",
    period: "periode-1",
    durationLabel: "3 semaines",
    status: "upcoming",
  },
  {
    id: "cm2-mathematiques-geometrie-outils",
    level: "cm2",
    subject: "mathematiques",
    domain: "Géométrie",
    title: "Choisir le bon outil géométrique",
    skill: "Choisir l'instrument adapté à une construction géométrique",
    period: "periode-2",
    durationLabel: "2 semaines",
    status: "available",
  },
  {
    id: "cm2-mathematiques-operations-decimaux",
    level: "cm2",
    subject: "mathematiques",
    domain: "Nombres et calculs",
    title: "Additionner et soustraire des nombres décimaux",
    skill: "Poser et effectuer une addition ou une soustraction de nombres décimaux",
    period: "periode-3",
    durationLabel: "2 semaines",
    status: "in-progress",
  },
  {
    id: "cm2-mathematiques-mesures-aires",
    level: "cm2",
    subject: "mathematiques",
    domain: "Grandeurs et mesures",
    title: "Calculer l'aire d'une figure",
    skill: "Calculer l'aire d'un rectangle et d'un carré",
    period: "periode-4",
    durationLabel: "2 semaines",
    status: "upcoming",
  },
  {
    id: "cm2-mathematiques-proportionnalite",
    level: "cm2",
    subject: "mathematiques",
    domain: "Problèmes",
    title: "Résoudre des problèmes de proportionnalité",
    skill: "Identifier et résoudre une situation de proportionnalité",
    period: "periode-5",
    durationLabel: "2 semaines",
    status: "upcoming",
  },

  // --- CM2 — Sciences ---
  {
    id: "cm2-sciences-vivant",
    level: "cm2",
    subject: "sciences",
    domain: "Le vivant",
    title: "Les besoins des êtres vivants",
    skill: "Identifier les besoins nutritifs des êtres vivants",
    period: "periode-1",
    durationLabel: "2 semaines",
    status: "in-progress",
  },
  {
    id: "cm2-sciences-matiere",
    level: "cm2",
    subject: "sciences",
    domain: "La matière",
    title: "Les états de la matière",
    skill: "Distinguer les états solide, liquide et gazeux de la matière",
    period: "periode-2",
    durationLabel: "2 semaines",
    status: "upcoming",
  },
  {
    id: "cm2-sciences-energie",
    level: "cm2",
    subject: "sciences",
    domain: "L'énergie",
    title: "Identifier des sources d'énergie",
    skill: "Reconnaître quelques sources d'énergie et leurs usages",
    period: "periode-3",
    durationLabel: "2 semaines",
    status: "upcoming",
  },
  {
    id: "cm2-sciences-objets-techniques",
    level: "cm2",
    subject: "sciences",
    domain: "Les objets techniques",
    title: "Décrire le fonctionnement d'un objet technique",
    skill: "Identifier les principales fonctions d'un objet technique simple",
    period: "periode-4",
    durationLabel: "2 semaines",
    status: "upcoming",
  },

  // --- CE1 — structure de base en préparation ---
  {
    id: "ce1-francais-lecture-1",
    level: "ce1",
    subject: "francais",
    domain: "Lecture et compréhension",
    title: "Comprendre un texte court",
    skill: "Répondre à des questions explicites sur un texte court",
    period: "periode-1",
    durationLabel: "2 semaines",
    status: "upcoming",
  },
  {
    id: "ce1-francais-conjugaison-1",
    level: "ce1",
    subject: "francais",
    domain: "Conjugaison",
    title: "Le présent des verbes en -er",
    skill: "Conjuguer au présent les verbes du 1er groupe",
    period: "periode-2",
    durationLabel: "2 semaines",
    status: "upcoming",
  },
  {
    id: "ce1-mathematiques-numeration-1",
    level: "ce1",
    subject: "mathematiques",
    domain: "Numération",
    title: "Les nombres jusqu'à 100",
    skill: "Comprendre la numération décimale jusqu'à 100",
    period: "periode-1",
    durationLabel: "2 semaines",
    status: "upcoming",
  },
  {
    id: "ce1-mathematiques-calcul-1",
    level: "ce1",
    subject: "mathematiques",
    domain: "Calcul",
    title: "Addition posée sans retenue",
    skill: "Poser et effectuer une addition sans retenue",
    period: "periode-2",
    durationLabel: "2 semaines",
    status: "upcoming",
  },
  {
    id: "ce1-sciences-vivant-1",
    level: "ce1",
    subject: "sciences",
    domain: "Le vivant",
    title: "Reconnaître les caractéristiques du vivant",
    skill: "Distinguer le vivant du non-vivant",
    period: "periode-1",
    durationLabel: "1 semaine",
    status: "upcoming",
  },
];

export function getTeacherProgrammationItemsByLevel(
  level: TeacherLevel,
): TeacherProgrammationItem[] {
  return teacherProgrammationItems.filter((item) => item.level === level);
}
