import type { MaternelleSubdomain } from "@/content/levels/maternelle/types";

export const psExplorerLeMondeSubdomains: MaternelleSubdomain[] = [
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
        observableSkills: ["Associe une activité connue à un moment de la journée."],
        status: "in-progress",
        workshops: [
          {
            id: "ps-monde-temps-atelier1",
            title: "Images de la journée",
            type: "collectif",
            objective:
              "Montrer l'image correspondant au moment vécu en classe.",
            status: "in-progress",
          },
        ],
      },
    ],
  },
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
        objective: "Regarder un animal ou une plante et signaler un changement.",
        observableSkills: ["Signale un élément observé chez un animal ou une plante."],
        status: "in-progress",
        workshops: [
          {
            id: "ps-monde-vivant-atelier1",
            title: "La plante de la classe",
            type: "collectif",
            objective:
              "Observer une plante et montrer un élément visible qui change.",
            status: "in-progress",
          },
        ],
      },
    ],
  },
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
        status: "in-progress",
        workshops: [
          {
            id: "ps-monde-objets-matieres-atelier1",
            title: "Toucher doux, dur, mou",
            type: "manipulation",
            objective:
              "Explorer une matière avec les mains et exprimer une réaction.",
            status: "in-progress",
          },
        ],
      },
    ],
  },
];
