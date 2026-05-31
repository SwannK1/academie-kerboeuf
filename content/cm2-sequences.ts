// Données séquences CM2.
// Premier exemple : Français → Lecture-compréhension → Lire l'implicite.

import { getPublicStatus } from "@/content/public-status";
import type { Cm2Sequence } from "@/content/cm2-sequence.types";

export const cm2Sequences: Cm2Sequence[] = [
  {
    slug: "lire-implicite",
    title: "Lire l'implicite",
    domain: "Français",
    subdomain: "Lecture et compréhension",
    level: "CM2",
    status: getPublicStatus("available"),
    objective:
      "Comprendre une information non écrite en relevant des indices et en les reliant à ses connaissances.",
    skills: [
      "Prélever des indices explicites dans un texte",
      "Formuler une hypothèse de lecture",
      "Justifier une réponse par des éléments du texte",
    ],
    successCriteria: [
      "Je relève au moins deux indices précis dans le texte.",
      "Je formule une hypothèse qui reste possible avec ces indices.",
      "Je justifie ma réponse avec une phrase complète.",
    ],
    evidenceExpected: [
      "Phrases de justification avec connecteur « parce que »",
      "Indices soulignés dans le texte support",
    ],
    estimatedDuration: "3 séances de 30 minutes",
    teacherReference: "Programme Cycle 3 — Comprendre un texte littéraire",
    felixMethodTip:
      "Lis comme un détective : souligne les indices visibles, relie-les entre eux, puis écris une réponse avec « Je pense que... parce que dans le texte... ».",
    printableAvailable: false,
    projectionAvailable: false,
    resources: [
      {
        type: "lesson",
        label: "Leçon : Lire l'implicite",
        status: getPublicStatus("upcoming"),
      },
      {
        type: "exercise",
        label: "Exercices : Indices et inférences",
        status: getPublicStatus("upcoming"),
      },
      {
        type: "correction",
        label: "Correction",
        status: getPublicStatus("upcoming"),
      },
      {
        type: "projection",
        label: "Support de projection",
        status: getPublicStatus("upcoming"),
      },
      {
        type: "parent-guide",
        label: "Fiche parent",
        status: getPublicStatus("upcoming"),
      },
    ],
    sessions: [
      {
        slug: "seance-1-reperer-indices",
        title: "Séance 1 — Repérer les indices explicites",
        objective: "Distinguer information explicite et information implicite.",
        estimatedDuration: "30 min",
        resources: [],
      },
      {
        slug: "seance-2-formuler-hypothese",
        title: "Séance 2 — Formuler une hypothèse",
        objective:
          "Relier les indices relevés pour construire une hypothèse justifiée.",
        estimatedDuration: "30 min",
        resources: [],
      },
      {
        slug: "seance-3-justifier-reponse",
        title: "Séance 3 — Justifier sa réponse",
        objective:
          "Écrire une réponse avec « Je pense que... parce que... » et la valider en groupe.",
        estimatedDuration: "30 min",
        resources: [],
      },
    ],
  },
];

export function getCm2SequenceBySlug(slug: string): Cm2Sequence | undefined {
  return cm2Sequences.find((s) => s.slug === slug);
}

export function getCm2SequencesBySubdomain(
  domain: string,
  subdomain: string,
): Cm2Sequence[] {
  return cm2Sequences.filter(
    (s) => s.domain === domain && s.subdomain === subdomain,
  );
}
