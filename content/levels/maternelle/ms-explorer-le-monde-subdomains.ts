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
        slug: "se-reperer-dans-la-journee",
        title: "Se repérer dans la journée",
        objective:
          "Situer quelques moments réguliers de la journée de classe les uns par rapport aux autres.",
        observableSkills: ["Replace deux moments vécus dans l'ordre de la journée."],
        status: "upcoming",
        workshops: [
          {
            id: "ms-monde-temps-atelier1",
            slug: "avant-ou-apres",
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
        slug: "observer-et-decrire-une-transformation",
        title: "Observer et décrire une transformation",
        objective:
          "Observer une transformation visible et la décrire avec des mots simples.",
        observableSkills: ["Décrit un changement visible après deux observations."],
        status: "upcoming",
        workshops: [
          {
            id: "ms-monde-vivant-atelier1",
            slug: "ca-pousse",
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
