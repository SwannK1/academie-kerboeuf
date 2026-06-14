/**
 * PS · Domaine Explorer le monde · Sous-domaines structurés
 *
 * Trois sous-domaines légers alignés sur le programme cycle 1 :
 *   1. Se repérer dans le temps
 *   2. Découvrir le vivant
 *   3. Objets et matières
 *
 * Chaque sous-domaine contient une séquence et un atelier pilote.
 * Le site organise — les PDF enseignent.
 */
import type { MaternelleSubdomain } from "@/content/levels/maternelle/types";

export const psExplorerLeMondeSubdomains: MaternelleSubdomain[] = [
  // ── 1. Se repérer dans le temps ───────────────────────────────────────────
  {
    id: "ps-monde-temps",
    slug: "temps",
    label: "Se repérer dans le temps",
    description:
      "Premiers repères dans les moments vécus de la journée de classe.",
    status: "in-progress",
    sequences: [
      {
        id: "ps-monde-temps-seq1",
        title: "Repérer un moment de la journée",
        objective: "Associer une activité connue à un moment de la journée.",
        observableSkills: [
          "Associe une activité connue à un moment de la journée.",
        ],
        periodLabel: "Période 1",
        sessionCount: 4,
        status: "in-progress",
        workshops: [
          {
            id: "ps-monde-temps-seq1-atelier1",
            title: "Images de la journée",
            type: "collectif",
            objective:
              "Montrer l'image correspondant au moment vécu en classe.",
            duration: "15 min",
            groupSize: "Classe entière",
            materials: [
              "4 images illustrant les moments de la journée (arrivée, collation, repas, départ)",
              "Tableau de la journée",
            ],
            status: "in-progress",
            observationGrid: {
              id: "ps-monde-temps-seq1-atelier1-grille",
              title: "Grille — Repérer un moment de la journée (PS)",
              status: "upcoming",
              criteria: [
                {
                  id: "crit-ps-monde-temps-1",
                  label: "Pointe l'image correspondant au moment vécu",
                  levelDescriptor: "Attendu PS",
                },
                {
                  id: "crit-ps-monde-temps-2",
                  label: "Nomme un moment de la journée avec un mot",
                  levelDescriptor: "Attendu PS",
                },
                {
                  id: "crit-ps-monde-temps-3",
                  label:
                    "Place spontanément une image dans l'ordre de la journée",
                  levelDescriptor: "Dépassement PS",
                },
              ],
            },
            resources: [],
          },
        ],
      },
    ],
  },

  // ── 2. Découvrir le vivant ────────────────────────────────────────────────
  {
    id: "ps-monde-vivant",
    slug: "vivant",
    label: "Découvrir le vivant",
    description:
      "Observation d'animaux, de plantes et de manifestations simples du vivant.",
    status: "in-progress",
    sequences: [
      {
        id: "ps-monde-vivant-seq1",
        title: "Observer un être vivant",
        objective:
          "Regarder un animal ou une plante et signaler un changement.",
        observableSkills: [
          "Signale un élément observé chez un animal ou une plante.",
        ],
        periodLabel: "Période 2",
        sessionCount: 3,
        status: "in-progress",
        workshops: [
          {
            id: "ps-monde-vivant-seq1-atelier1",
            title: "La plante de la classe",
            type: "collectif",
            objective:
              "Observer une plante et montrer un élément visible qui change.",
            duration: "15 min",
            groupSize: "Classe entière",
            materials: [
              "Plante d'intérieur facile à observer",
              "Loupe de classe",
              "Photos de référence (feuilles, fleurs)",
            ],
            status: "in-progress",
            observationGrid: {
              id: "ps-monde-vivant-seq1-atelier1-grille",
              title: "Grille — Observer un être vivant (PS)",
              status: "upcoming",
              criteria: [
                {
                  id: "crit-ps-monde-vivant-1",
                  label: "Regarde la plante quand on le lui demande",
                  levelDescriptor: "Attendu PS",
                },
                {
                  id: "crit-ps-monde-vivant-2",
                  label:
                    "Montre un élément visible qui change (feuille, fleur)",
                  levelDescriptor: "Attendu PS",
                },
                {
                  id: "crit-ps-monde-vivant-3",
                  label: "Dit quelque chose de précis sur ce qu'il observe",
                  levelDescriptor: "Dépassement PS",
                },
              ],
            },
            resources: [],
          },
        ],
      },
    ],
  },

  // ── 3. Objets et matières ─────────────────────────────────────────────────
  {
    id: "ps-monde-objets-matieres",
    slug: "objets-matieres",
    label: "Objets et matières",
    description:
      "Exploration sensorielle d'objets simples et de matières proches.",
    status: "in-progress",
    sequences: [
      {
        id: "ps-monde-objets-matieres-seq1",
        title: "Manipuler une matière",
        objective: "Manipuler une matière et réagir à une sensation.",
        observableSkills: ["Réagit à une sensation lors d'une manipulation."],
        periodLabel: "Période 3",
        sessionCount: 3,
        status: "in-progress",
        workshops: [
          {
            id: "ps-monde-objets-matieres-seq1-atelier1",
            title: "Toucher doux, dur, mou",
            type: "manipulation",
            objective:
              "Explorer une matière avec les mains et exprimer une réaction.",
            duration: "15 min",
            groupSize: "4-6 élèves",
            materials: [
              "Sac sensoriel (coton, papier de verre, éponge, bois, mousse)",
              "Plateau de tri avec étiquettes",
            ],
            status: "in-progress",
            observationGrid: {
              id: "ps-monde-objets-matieres-seq1-atelier1-grille",
              title: "Grille — Manipuler une matière (PS)",
              status: "upcoming",
              criteria: [
                {
                  id: "crit-ps-monde-matieres-1",
                  label: "Manipule la matière sans hésitation",
                  levelDescriptor: "Attendu PS",
                },
                {
                  id: "crit-ps-monde-matieres-2",
                  label: "Réagit à une sensation avec un mot ou un geste",
                  levelDescriptor: "Attendu PS",
                },
                {
                  id: "crit-ps-monde-matieres-3",
                  label: "Nomme la matière ou la compare à une autre",
                  levelDescriptor: "Dépassement PS",
                },
              ],
            },
            resources: [],
          },
        ],
      },
    ],
  },
];
