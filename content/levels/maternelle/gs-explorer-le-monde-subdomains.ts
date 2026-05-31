import type { MaternelleSubdomain } from "@/content/levels/maternelle/types";

export const gsExplorerLeMondeSubdomains: MaternelleSubdomain[] = [
  {
    id: "gs-monde-temps",
    slug: "temps",
    label: "Se repérer dans le temps",
    description:
      "Chronologie d'événements vécus et repères progressifs dans la semaine.",
    status: "upcoming",
    sequences: [
      {
        id: "gs-monde-temps-seq1",
        title: "Ordonner trois moments vécus",
        objective: "Remettre trois moments vécus dans l'ordre chronologique.",
        observableSkills: ["Remet trois moments vécus dans l'ordre chronologique."],
        status: "upcoming",
        workshops: [
          {
            id: "gs-monde-temps-atelier1",
            title: "D'abord, ensuite, enfin",
            type: "collectif",
            objective:
              "Ordonner trois images d'une activité réellement vécue.",
            status: "upcoming",
          },
        ],
      },
    ],
  },
  {
    id: "gs-monde-vivant",
    slug: "vivant",
    label: "Découvrir le vivant",
    description:
      "Observation, comparaison et description de caractéristiques du vivant.",
    status: "upcoming",
    sequences: [
      {
        id: "gs-monde-vivant-seq1",
        title: "Décrire un être vivant observé",
        objective: "Décrire une caractéristique visible d'un être vivant.",
        observableSkills: ["Décrit une caractéristique visible d'un être vivant."],
        status: "upcoming",
        workshops: [
          {
            id: "gs-monde-vivant-atelier1",
            title: "Carnet oral d'observation",
            type: "collectif",
            objective:
              "Observer un être vivant puis verbaliser une caractéristique visible.",
            status: "upcoming",
          },
        ],
      },
    ],
  },
  {
    id: "gs-monde-objets-matieres",
    slug: "objets-matieres",
    label: "Objets et matières",
    description:
      "Manipulation raisonnée d'objets et description de propriétés perceptibles.",
    status: "upcoming",
    sequences: [
      {
        id: "gs-monde-objets-matieres-seq1",
        title: "Décrire une matière",
        objective: "Décrire une matière à partir d'une manipulation.",
        observableSkills: ["Décrit une matière à partir d'une manipulation."],
        status: "upcoming",
        workshops: [
          {
            id: "gs-monde-objets-matieres-atelier1",
            title: "Matières à comparer",
            type: "manipulation",
            objective:
              "Comparer deux matières et dire une propriété observée.",
            status: "upcoming",
          },
        ],
      },
    ],
  },
];
