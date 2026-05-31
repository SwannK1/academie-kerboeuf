import type { MaternelleSubdomain } from "@/content/levels/maternelle/types";

export const msExplorerLeMondeSubdomains: MaternelleSubdomain[] = [
  {
    id: "ms-monde-temps",
    slug: "temps",
    label: "Se repérer dans le temps",
    description:
      "Avant, après et repères proches dans les activités de la classe.",
    status: "upcoming",
    sequences: [
      {
        id: "ms-monde-temps-seq1",
        title: "Ordonner deux moments vécus",
        objective: "Dire ce qui s'est passé avant ou après une activité.",
        observableSkills: ["Ordonne deux moments vécus de la journée."],
        status: "upcoming",
        workshops: [
          {
            id: "ms-monde-temps-atelier1",
            title: "Avant ou après",
            type: "collectif",
            objective:
              "Choisir l'image qui vient avant ou après une activité connue.",
            status: "upcoming",
          },
        ],
      },
    ],
  },
  {
    id: "ms-monde-vivant",
    slug: "vivant",
    label: "Découvrir le vivant",
    description:
      "Observation régulière des besoins, transformations et comportements du vivant.",
    status: "upcoming",
    sequences: [
      {
        id: "ms-monde-vivant-seq1",
        title: "Observer un changement du vivant",
        objective: "Repérer un changement visible chez une plante ou un animal.",
        observableSkills: ["Repère un changement visible chez une plante ou un animal."],
        status: "upcoming",
        workshops: [
          {
            id: "ms-monde-vivant-atelier1",
            title: "Ça pousse",
            type: "collectif",
            objective:
              "Comparer deux observations successives d'une plante de la classe.",
            status: "upcoming",
          },
        ],
      },
    ],
  },
  {
    id: "ms-monde-objets-matieres",
    slug: "objets-matieres",
    label: "Objets et matières",
    description:
      "Comparaison d'objets, de matières et de propriétés perceptibles.",
    status: "upcoming",
    sequences: [
      {
        id: "ms-monde-objets-matieres-seq1",
        title: "Comparer deux objets",
        objective: "Comparer deux objets selon une propriété observable.",
        observableSkills: ["Compare deux objets selon une propriété observable."],
        status: "upcoming",
        workshops: [
          {
            id: "ms-monde-objets-matieres-atelier1",
            title: "Pareil ou différent",
            type: "manipulation",
            objective:
              "Manipuler deux objets et dire s'ils sont pareils ou différents.",
            status: "upcoming",
          },
        ],
      },
    ],
  },
];
