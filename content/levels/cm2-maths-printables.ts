// Registre des supports imprimables CM2 — Mathématiques.
// Périmètre test : 3 séquences, fichiers réels copiés dans
// public/ressources/cm2/mathematiques/. Aucun href fictif.

import type { PedagogicalResourceRef } from "@/content/program-types";

export type Cm2MathsPrintableSequence = {
  slug: string;
  title: string;
  subdomainSlug: string;
  competencyId: string;
  resources: PedagogicalResourceRef[];
};

export const cm2MathsPrintableSequences: Cm2MathsPrintableSequence[] = [
  {
    slug: "encadrer-nombres-decimaux",
    title: "Encadrer les nombres décimaux",
    subdomainSlug: "numeration",
    competencyId: "cm2-ma-num-decimaux",
    resources: [
      {
        kind: "lesson-pdf",
        label: "Leçon — Encadrer les nombres décimaux",
        status: "available",
        href: "/ressources/cm2/mathematiques/01-nombres/encadrer-nombres-decimaux-lecon.png",
      },
      {
        kind: "exercises-pdf",
        label: "Exercices — Encadrer les nombres décimaux",
        status: "available",
        href: "/ressources/cm2/mathematiques/01-nombres/encadrer-nombres-decimaux-consolidation.png",
      },
      {
        kind: "assessment-pdf",
        label: "Évaluation — Encadrer les nombres décimaux",
        status: "available",
        href: "/ressources/cm2/mathematiques/01-nombres/Encadrer-nombres-decimaux-evaluation.png",
      },
    ],
  },
  {
    slug: "multiplier-decimal-par-entier",
    title: "Multiplier un nombre décimal par un entier",
    subdomainSlug: "calcul-pose",
    competencyId: "cm2-ma-cal-operations-decimaux",
    resources: [
      {
        kind: "lesson-pdf",
        label: "Leçon — Multiplier un nombre décimal par un entier",
        status: "available",
        href: "/ressources/cm2/mathematiques/02-calcul/Multiplier un nombre décimal par un entier.png",
      },
      {
        kind: "exercises-pdf",
        label: "Exercices — Multiplier un nombre décimal par un entier",
        status: "available",
        href: "/ressources/cm2/mathematiques/02-calcul/Multiplier un nombre décimal par un entier - Feuille 2.png",
      },
      {
        kind: "assessment-pdf",
        label: "Évaluation — Multiplier un nombre décimal par un entier",
        status: "available",
        href: "/ressources/cm2/mathematiques/02-calcul/Évaluation — Multiplier un nombre décimal par un entier.png",
      },
    ],
  },
  {
    slug: "decomposer-une-fraction",
    title: "Décomposer une fraction",
    subdomainSlug: "numeration",
    competencyId: "cm2-ma-num-fractions-decimaux",
    resources: [
      {
        kind: "lesson-pdf",
        label: "Leçon — Décomposer une fraction",
        status: "available",
        href: "/ressources/cm2/mathematiques/03-fractions-decimaux/Décomposer une fraction - leçon.png",
      },
      {
        kind: "exercises-pdf",
        label: "Exercices — Décomposer une fraction",
        status: "available",
        href: "/ressources/cm2/mathematiques/03-fractions-decimaux/Décomposer une fraction - consolidation.png",
      },
      {
        kind: "assessment-pdf",
        label: "Évaluation — Décomposer une fraction",
        status: "available",
        href: "/ressources/cm2/mathematiques/03-fractions-decimaux/Décomposer une fraction - évaluation.png",
      },
    ],
  },
];
