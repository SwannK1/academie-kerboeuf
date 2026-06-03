import type { MaternelleSubdomain } from "@/content/levels/maternelle/types";

export const msExplorerLeMondeSubdomains: MaternelleSubdomain[] = [
  // ── 1. Se repérer dans le temps ───────────────────────────────────────────
  {
    id: "ms-monde-temps",
    slug: "temps",
    label: "Se repérer dans le temps",
    description:
      "Avant, après et repères proches dans les activités de la classe.",
    status: "in-progress",
    sequences: [
      {
        id: "ms-monde-temps-seq1",
        title: "Ordonner les moments de la journée",
        objective:
          "Placer des images dans l'ordre chronologique des moments clés de la journée.",
        observableSkills: [
          "Place 3 images dans l'ordre correct.",
          "Nomme les moments clés avec matin, après-midi, soir.",
        ],
        periodLabel: "Période 1",
        sessionCount: 4,
        status: "in-progress",
        workshops: [
          {
            id: "ms-monde-temps-atelier1",
            title: "La frise de la journée",
            type: "dirige",
            objective:
              "Placer des images illustrant les moments de la journée dans l'ordre chronologique sur une frise.",
            duration: "20 min",
            groupSize: "6-8 élèves",
            materials: [
              "Frise vierge magnétique",
              "5 images illustrant les moments clés de la journée",
              "Étiquettes-mots (matin, midi, soir)",
            ],
            status: "in-progress",
            observationGrid: {
              id: "ms-monde-temps-atelier1-grille",
              title: "Grille — Ordonner les moments de la journée (MS)",
              status: "upcoming",
              criteria: [
                {
                  id: "crit-ms-monde-temps-1",
                  label: "Place 3 images dans l'ordre correct",
                  levelDescriptor: "Attendu MS",
                },
                {
                  id: "crit-ms-monde-temps-2",
                  label:
                    "Nomme les moments clés avec matin, après-midi, soir",
                  levelDescriptor: "Attendu MS",
                },
                {
                  id: "crit-ms-monde-temps-3",
                  label:
                    "Place toutes les images et justifie l'ordre d'un élément",
                  levelDescriptor: "Dépassement MS",
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
    id: "ms-monde-vivant",
    slug: "vivant",
    label: "Découvrir le vivant",
    description:
      "Observation régulière des besoins, transformations et comportements du vivant.",
    status: "in-progress",
    sequences: [
      {
        id: "ms-monde-vivant-seq1",
        title: "Observer et noter un changement",
        objective:
          "Repérer et noter par le dessin un changement visible chez une plante ou un animal.",
        observableSkills: [
          "Regarde et désigne un changement visible.",
          "Trace un dessin simple pour noter ce qu'il observe.",
        ],
        periodLabel: "Période 2",
        sessionCount: 4,
        status: "in-progress",
        workshops: [
          {
            id: "ms-monde-vivant-atelier1",
            title: "Le carnet du vivant",
            type: "dirige",
            objective:
              "Observer un être vivant de la classe et noter par le dessin un changement depuis la dernière observation.",
            duration: "20 min",
            groupSize: "6-8 élèves",
            materials: [
              "Plantations ou élevage de classe (escargots, bulbes)",
              "Carnet d'observation illustré",
              "Crayon à papier",
            ],
            status: "in-progress",
            observationGrid: {
              id: "ms-monde-vivant-atelier1-grille",
              title: "Grille — Observer et noter un changement (MS)",
              status: "upcoming",
              criteria: [
                {
                  id: "crit-ms-monde-vivant-1",
                  label: "Regarde et désigne un changement visible",
                  levelDescriptor: "Attendu MS",
                },
                {
                  id: "crit-ms-monde-vivant-2",
                  label:
                    "Trace un dessin simple pour noter ce qu'il observe",
                  levelDescriptor: "Attendu MS",
                },
                {
                  id: "crit-ms-monde-vivant-3",
                  label:
                    "Compare deux observations successives et dit ce qui a changé",
                  levelDescriptor: "Dépassement MS",
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
    id: "ms-monde-objets-matieres",
    slug: "objets-matieres",
    label: "Objets et matières",
    description:
      "Comparaison d'objets, de matières et de propriétés perceptibles.",
    status: "in-progress",
    sequences: [
      {
        id: "ms-monde-objets-matieres-seq1",
        title: "Décrire une propriété d'un objet",
        objective:
          "Utiliser deux descripteurs sensoriels pour caractériser un objet.",
        observableSkills: [
          "Nomme une propriété observable d'un objet.",
          "Utilise deux descripteurs sensoriels différents.",
        ],
        periodLabel: "Période 3",
        sessionCount: 4,
        status: "in-progress",
        workshops: [
          {
            id: "ms-monde-objets-matieres-atelier1",
            title: "L'objet mystère décrit",
            type: "jeu",
            objective:
              "Manipuler un objet caché et le faire deviner en donnant deux propriétés sensorielles.",
            duration: "20 min",
            groupSize: "4-6 élèves",
            materials: [
              "Sac opaque",
              "6 objets aux propriétés contrastées (dur/mou, lourd/léger, lisse/rugueux)",
              "Cartes descripteurs",
            ],
            status: "in-progress",
            observationGrid: {
              id: "ms-monde-objets-matieres-atelier1-grille",
              title: "Grille — Décrire une propriété d'un objet (MS)",
              status: "upcoming",
              criteria: [
                {
                  id: "crit-ms-monde-objets-1",
                  label: "Nomme une propriété observable d'un objet",
                  levelDescriptor: "Attendu MS",
                },
                {
                  id: "crit-ms-monde-objets-2",
                  label: "Utilise deux descripteurs sensoriels différents",
                  levelDescriptor: "Attendu MS",
                },
                {
                  id: "crit-ms-monde-objets-3",
                  label: "Fait deviner un objet en donnant deux propriétés",
                  levelDescriptor: "Dépassement MS",
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
