import type { PublicStatusKey } from "@/content/public-status.domain";

/**
 * Programmation et progression — structure de données de base.
 *
 * Programmation = répartition des compétences sur l'année et les périodes.
 * Progression = ordre logique des apprentissages (champ `order`) dans une
 * matière ou un domaine donné.
 */

export type PrimaryLevel = "cp" | "ce1" | "ce2" | "cm1" | "cm2";

export type PrimarySubject =
  | "francais"
  | "mathematiques"
  | "questionner-le-monde"
  | "histoire-geographie"
  | "sciences"
  | "enseignement-moral-et-civique"
  | "arts"
  | "eps"
  | "langue-vivante";

export type SchoolPeriod = "periode-1" | "periode-2" | "periode-3" | "periode-4" | "periode-5";

/**
 * Statut de la ressource associée à l'entrée de programmation/progression.
 * Réutilise les clés de la façade des statuts publics pour rester cohérent
 * avec PublicStatusBadge / getPublicStatusKey.
 */
export type ResourceStatus = PublicStatusKey;

export interface PrimaryProgrammingEntry {
  /** Identifiant unique et stable de l'entrée. */
  id: string;
  level: PrimaryLevel;
  subject: PrimarySubject;
  /** Domaine ou sous-domaine du programme (ex: "conjugaison", "geometrie"). */
  domain: string;
  /** Période de l'année scolaire concernée. */
  period: SchoolPeriod;
  /** Ordre logique de la notion dans la progression du domaine. */
  order: number;
  /** Compétence visée (intitulé court). */
  skill: string;
  /** Titre de la notion travaillée. */
  notionTitle: string;
  status: ResourceStatus;
  /** Lien vers la ressource, uniquement si elle existe réellement. */
  href?: string;
}

export const primaryProgrammingEntries: PrimaryProgrammingEntry[] = [
  // --- CP ---
  {
    id: "cp-francais-lecture-comprehension-1",
    level: "cp",
    subject: "francais",
    domain: "lecture-comprehension",
    period: "periode-1",
    order: 1,
    skill: "Identifier les correspondances graphème-phonème",
    notionTitle: "Les premiers sons et lettres",
    status: "in-progress",
  },
  {
    id: "cp-mathematiques-nombres-1",
    level: "cp",
    subject: "mathematiques",
    domain: "nombres-et-calculs",
    period: "periode-1",
    order: 1,
    skill: "Dénombrer une quantité jusqu'à 10",
    notionTitle: "Les nombres jusqu'à 10",
    status: "upcoming",
  },

  // --- CE1 ---
  {
    id: "ce1-francais-conjugaison-1",
    level: "ce1",
    subject: "francais",
    domain: "conjugaison",
    period: "periode-2",
    order: 1,
    skill: "Conjuguer au présent les verbes du 1er groupe",
    notionTitle: "Le présent des verbes en -er",
    status: "upcoming",
  },
  {
    id: "ce1-mathematiques-numeration-1",
    level: "ce1",
    subject: "mathematiques",
    domain: "numeration",
    period: "periode-1",
    order: 1,
    skill: "Comprendre la numération décimale jusqu'à 100",
    notionTitle: "Les nombres jusqu'à 100",
    status: "in-progress",
  },

  // --- CE2 ---
  {
    id: "ce2-francais-grammaire-1",
    level: "ce2",
    subject: "francais",
    domain: "grammaire",
    period: "periode-1",
    order: 1,
    skill: "Identifier la nature des mots dans une phrase",
    notionTitle: "Nature des mots : nom, verbe, adjectif",
    status: "upcoming",
  },
  {
    id: "ce2-mathematiques-geometrie-1",
    level: "ce2",
    subject: "mathematiques",
    domain: "geometrie",
    period: "periode-3",
    order: 1,
    skill: "Reconnaître et nommer les figures planes usuelles",
    notionTitle: "Les figures planes",
    status: "in-progress",
  },

  // --- CM1 ---
  {
    id: "cm1-francais-conjugaison-1",
    level: "cm1",
    subject: "francais",
    domain: "conjugaison",
    period: "periode-2",
    order: 1,
    skill: "Conjuguer à l'imparfait les verbes des trois groupes",
    notionTitle: "L'imparfait",
    status: "upcoming",
  },
  {
    id: "cm1-mathematiques-nombres-1",
    level: "cm1",
    subject: "mathematiques",
    domain: "nombres-et-calculs",
    period: "periode-1",
    order: 1,
    skill: "Lire, écrire et décomposer les grands nombres",
    notionTitle: "Les nombres jusqu'au million",
    status: "in-progress",
  },

  // --- CM2 ---
  {
    id: "cm2-francais-conjugaison-futur-simple",
    level: "cm2",
    subject: "francais",
    domain: "conjugaison",
    period: "periode-3",
    order: 1,
    skill: "Conjuguer au futur simple les verbes des trois groupes",
    notionTitle: "Le futur simple",
    status: "available",
    href: "/fiches/cm2/francais-pdf/conjugaison/futur-simple-f1.pdf",
  },
  {
    id: "cm2-francais-conjugaison-imparfait",
    level: "cm2",
    subject: "francais",
    domain: "conjugaison",
    period: "periode-2",
    order: 2,
    skill: "Conjuguer à l'imparfait les verbes des trois groupes",
    notionTitle: "L'imparfait",
    status: "available",
    href: "/fiches/cm2/francais-pdf/conjugaison/imparfait-f2.pdf",
  },
  {
    id: "cm2-mathematiques-geometrie-outils",
    level: "cm2",
    subject: "mathematiques",
    domain: "geometrie",
    period: "periode-2",
    order: 1,
    skill: "Choisir l'instrument adapté à une construction géométrique",
    notionTitle: "Choisir le bon outil géométrique",
    status: "available",
    href: "/fiches/cm2/mathematiques-pdf/choisir-le-bon-outil-geometrique/f1.pdf",
  },
  {
    id: "cm2-mathematiques-nombres-decimaux",
    level: "cm2",
    subject: "mathematiques",
    domain: "nombres-et-calculs",
    period: "periode-1",
    order: 1,
    skill: "Comprendre et utiliser les nombres décimaux",
    notionTitle: "Les nombres décimaux",
    status: "upcoming",
  },
];
