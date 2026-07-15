// Bibliothèque de fiches PDF CE1 — vue de synthèse pour /primaire/ce1.
// Les statuts et liens reflètent l'état réel du contenu :
// - un href n'est fourni que vers une page déjà publiée (voir published-subdomain-pages.ts) ;
// - un item sans href n'a pas encore de page ou de PDF associé.
// Le statut d'ensemble d'une matière vient de ce1-subjects.ts pour rester cohérent
// avec les pages /primaire/ce1/matieres.

import { getCe1SubjectBySlug } from "@/content/ce1-subjects";
import type { ProgramStatus } from "@/content/program-types";

export type Ce1LibraryItem = {
  label: string;
  status: ProgramStatus;
  href?: string;
  note?: string;
};

export type Ce1LibrarySubject = {
  slug: string;
  title: string;
  status: ProgramStatus;
  href: string;
  items: Ce1LibraryItem[];
};

function subjectStatus(slug: string): ProgramStatus {
  return (getCe1SubjectBySlug(slug)?.status as ProgramStatus) ?? "upcoming";
}

export const ce1PdfLibrary: Ce1LibrarySubject[] = [
  {
    slug: "francais",
    title: "Français",
    status: subjectStatus("francais"),
    href: "/primaire/ce1/matieres/francais",
    items: [
      { label: "Lecture / compréhension", status: "in-progress" },
      {
        label: "Étude de la langue",
        status: "in-progress",
        href: "/primaire/ce1/programmes/francais/etude-de-la-langue",
        note: "Regroupe grammaire, conjugaison et orthographe pour le CE1.",
      },
      { label: "Vocabulaire", status: "upcoming" },
      { label: "Production d'écrit", status: "upcoming" },
    ],
  },
  {
    slug: "mathematiques",
    title: "Mathématiques",
    status: subjectStatus("mathematiques"),
    href: "/primaire/ce1/matieres/mathematiques",
    items: [
      { label: "Nombres et calcul", status: "upcoming" },
      { label: "Problèmes", status: "upcoming" },
      { label: "Grandeurs et mesures", status: "upcoming" },
      { label: "Espace et géométrie", status: "upcoming" },
    ],
  },
  {
    slug: "questionner-le-monde",
    title: "Questionner le monde",
    status: subjectStatus("questionner-le-monde"),
    href: "/primaire/ce1/matieres/questionner-le-monde",
    items: [
      { label: "Le monde vivant", status: "upcoming" },
      { label: "Espace et temps", status: "upcoming" },
      { label: "Matière et énergie", status: "upcoming" },
    ],
  },
  {
    slug: "emc",
    title: "EMC",
    status: subjectStatus("emc"),
    href: "/primaire/ce1/matieres/emc",
    items: [
      { label: "Vie collective", status: "upcoming" },
      { label: "Vie intérieure et altérité", status: "upcoming" },
      { label: "Droits et devoirs", status: "upcoming" },
    ],
  },
  {
    slug: "enseignements-artistiques",
    title: "Arts",
    status: subjectStatus("enseignements-artistiques"),
    href: "/primaire/ce1/matieres/enseignements-artistiques",
    items: [
      { label: "Arts plastiques", status: "upcoming" },
      { label: "Éducation musicale", status: "upcoming" },
    ],
  },
  {
    slug: "eps",
    title: "EPS",
    status: subjectStatus("eps"),
    href: "/primaire/ce1/matieres/eps",
    items: [
      { label: "Activités physiques", status: "upcoming" },
      { label: "Jeux collectifs", status: "upcoming" },
      { label: "Expression corporelle", status: "upcoming" },
    ],
  },
];
