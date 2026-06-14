import type { MaternelleSubdomain } from "@/content/levels/maternelle/types";

export const gsExplorerLeMondeSubdomains: MaternelleSubdomain[] = [
  // ── 1. Se repérer dans le temps ───────────────────────────────────────────
  {
    id: "gs-monde-temps",
    slug: "temps",
    label: "Se repérer dans le temps",
    description:
      "Chronologie d'événements vécus et repères progressifs dans la semaine.",
    status: "in-progress",
    sequences: [
      {
        id: "gs-monde-temps-seq1",
        title: "Ordonner des événements et utiliser le calendrier",
        objective:
          "Remettre des événements dans l'ordre chronologique en utilisant des connecteurs temporels.",
        observableSkills: [
          "Ordonne une suite de 5 images en utilisant un connecteur temporel.",
          "Situe un événement passé ou futur sur la frise de la semaine.",
        ],
        periodLabel: "Période 1",
        sessionCount: 5,
        status: "in-progress",
        workshops: [
          {
            id: "gs-monde-temps-seq1-atelier1",
            title: "La frise du temps",
            type: "dirige",
            objective:
              "Ordonner des images d'une activité vécue en utilisant des étiquettes de connecteurs.",
            duration: "25 min",
            groupSize: "6-8 élèves",
            materials: [
              "Frise chronologique vierge",
              "Images séquentielles (6 à 8 étapes)",
              "Étiquettes d'articulation (d'abord, ensuite, enfin)",
              "Calendrier de la classe",
            ],
            status: "in-progress",
            observationGrid: {
              id: "gs-monde-temps-seq1-atelier1-grille",
              title:
                "Grille — Ordonner des événements et utiliser le calendrier (GS)",
              status: "upcoming",
              criteria: [
                {
                  id: "crit-gs-monde-temps-1",
                  label:
                    "Ordonne une suite de 5 images en utilisant un connecteur temporel",
                  levelDescriptor: "Attendu GS",
                },
                {
                  id: "crit-gs-monde-temps-2",
                  label:
                    "Situe un événement passé ou futur sur la frise de la semaine",
                  levelDescriptor: "Attendu GS",
                },
                {
                  id: "crit-gs-monde-temps-3",
                  label:
                    "Produit un récit chronologique de 4 étapes sans support image",
                  levelDescriptor: "Dépassement GS",
                },
              ],
            },
            resources: [],
          },
        ],
      },
    ],
  },

  // ── 2. Découvrir le vivant ─────────────────────────────────────────────────
  {
    id: "gs-monde-vivant",
    slug: "vivant",
    label: "Découvrir le vivant",
    description:
      "Observation, comparaison et description de caractéristiques du vivant.",
    status: "in-progress",
    sequences: [
      {
        id: "gs-monde-vivant-seq1",
        title: "Décrire un cycle de vie simple",
        objective:
          "Nommer et ordonner les étapes du cycle de vie d'une plante observée en classe.",
        observableSkills: [
          "Nomme les étapes observées du cycle de vie d'une plante.",
          "Dessine et légende les étapes avec des mots ou des flèches.",
        ],
        periodLabel: "Période 2",
        sessionCount: 5,
        status: "in-progress",
        workshops: [
          {
            id: "gs-monde-vivant-seq1-atelier1",
            title: "Le cycle de la plante",
            type: "dirige",
            objective:
              "Observer une plante en classe et rendre compte des transformations successives.",
            duration: "25 min",
            groupSize: "6-8 élèves",
            materials: [
              "Plantations en classe (haricots, bulbes)",
              "Carnet d'observation personnel",
              "Images du cycle de vie",
              "Règle et crayon",
            ],
            status: "in-progress",
            observationGrid: {
              id: "gs-monde-vivant-seq1-atelier1-grille",
              title: "Grille — Décrire un cycle de vie simple (GS)",
              status: "upcoming",
              criteria: [
                {
                  id: "crit-gs-monde-vivant-1",
                  label:
                    "Nomme les étapes observées du cycle de vie d'une plante",
                  levelDescriptor: "Attendu GS",
                },
                {
                  id: "crit-gs-monde-vivant-2",
                  label:
                    "Dessine et légende les étapes avec des mots ou des flèches",
                  levelDescriptor: "Attendu GS",
                },
                {
                  id: "crit-gs-monde-vivant-3",
                  label:
                    "Explique la transformation observée avec une phrase causale (parce que)",
                  levelDescriptor: "Dépassement GS",
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
    id: "gs-monde-objets-matieres",
    slug: "objets-matieres",
    label: "Objets et matières",
    description:
      "Manipulation raisonnée d'objets et description de propriétés perceptibles.",
    status: "in-progress",
    sequences: [
      {
        id: "gs-monde-objets-matieres-seq1",
        title: "Observer une transformation de la matière",
        objective:
          "Décrire l'état d'une matière avant et après transformation et formuler une hypothèse.",
        observableSkills: [
          "Décrit l'état de la matière avant et après transformation.",
          "Formule une hypothèse sur la cause de la transformation.",
        ],
        periodLabel: "Période 3",
        sessionCount: 5,
        status: "in-progress",
        workshops: [
          {
            id: "gs-monde-objets-matieres-seq1-atelier1",
            title: "La glace fond",
            type: "dirige",
            objective:
              "Observer la fonte d'un glaçon et décrire les changements successifs.",
            duration: "25 min",
            groupSize: "6-8 élèves",
            materials: [
              "Glaçons",
              "Récipients transparents",
              "Feuille d'observation (avant/pendant/après)",
              "Thermomètre de classe",
            ],
            status: "in-progress",
            observationGrid: {
              id: "gs-monde-objets-matieres-seq1-atelier1-grille",
              title:
                "Grille — Observer une transformation de la matière (GS)",
              status: "upcoming",
              criteria: [
                {
                  id: "crit-gs-monde-objets-1",
                  label:
                    "Décrit l'état de la matière avant et après transformation",
                  levelDescriptor: "Attendu GS",
                },
                {
                  id: "crit-gs-monde-objets-2",
                  label:
                    "Formule une hypothèse sur la cause de la transformation",
                  levelDescriptor: "Attendu GS",
                },
                {
                  id: "crit-gs-monde-objets-3",
                  label:
                    "Propose une expérience complémentaire pour vérifier une hypothèse",
                  levelDescriptor: "Dépassement GS",
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
