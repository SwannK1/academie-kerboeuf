import type {
  MaternelleResourceRef,
  MaternelleSubdomain,
} from "@/content/levels/maternelle/types";

const gsWorldResourceSlots: MaternelleResourceRef[] = [
  {
    kind: "grille-observation",
    label: "Grille d'observation de la compétence",
    status: "upcoming",
  },
  {
    kind: "fiche-atelier",
    label: "Fiche atelier",
    status: "upcoming",
  },
  {
    kind: "support-projetable",
    label: "Support de repérage projetable",
    status: "upcoming",
  },
];

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
        slug: "ordonner-trois-moments-vecus",
        title: "Ordonner trois moments vécus",
        levelSlug: "gs",
        domainSlug: "explorer-le-monde",
        subdomainSlug: "temps",
        description:
          "Séquence-compétence centrée sur le repérage avant, pendant et après.",
        objective: "Remettre trois moments vécus dans l'ordre chronologique.",
        periodLabel: "Période 1",
        estimatedDuration: "3 séances × 20 min",
        sessionCount: 3,
        observableSkills: [
          "Ordonne trois moments vécus",
          "Utilise avant, après ou ensuite",
          "Explique son choix avec un repère de temps",
        ],
        observationFocus:
          "Observer si l'élève s'appuie sur le vécu de classe ou sur un indice visuel isolé.",
        status: "upcoming",
        resources: gsWorldResourceSlots,
        workshops: [
          {
            id: "gs-monde-temps-atelier1",
            title: "D'abord, ensuite, enfin",
            type: "collectif",
            objective:
              "Ordonner trois images d'une activité réellement vécue.",
            duration: "15 min",
            groupSize: "Groupe classe",
            materials: ["Trois photos d'une activité de classe"],
            status: "upcoming",
            resources: gsWorldResourceSlots,
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
        slug: "decrire-un-etre-vivant-observe",
        title: "Décrire un être vivant observé",
        levelSlug: "gs",
        domainSlug: "explorer-le-monde",
        subdomainSlug: "vivant",
        description:
          "Séquence-compétence centrée sur une observation orale courte et précise.",
        objective: "Décrire une caractéristique visible d'un être vivant observé.",
        periodLabel: "Période 3",
        estimatedDuration: "3 séances × 20 min",
        sessionCount: 3,
        observableSkills: [
          "Nomme un être vivant observé",
          "Décrit une caractéristique visible",
          "Compare deux observations simples",
        ],
        observationFocus:
          "Observer la distinction entre ce que l'élève voit et ce qu'il suppose.",
        status: "upcoming",
        resources: gsWorldResourceSlots,
        workshops: [
          {
            id: "gs-monde-vivant-atelier1",
            title: "Carnet oral d'observation",
            type: "collectif",
            objective:
              "Observer un être vivant puis verbaliser une caractéristique visible.",
            duration: "20 min",
            groupSize: "6 élèves",
            materials: ["Photo ou observation directe", "Carnet de classe"],
            status: "upcoming",
            resources: gsWorldResourceSlots,
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
        slug: "decrire-une-matiere-manipulee",
        title: "Décrire une matière manipulée",
        levelSlug: "gs",
        domainSlug: "explorer-le-monde",
        subdomainSlug: "objets-matieres",
        description:
          "Séquence-compétence centrée sur la description de propriétés perceptibles.",
        objective: "Décrire une matière à partir d'une manipulation simple.",
        periodLabel: "Période 4",
        estimatedDuration: "3 séances × 20 min",
        sessionCount: 3,
        observableSkills: [
          "Manipule une matière avec attention",
          "Nomme une propriété perceptible",
          "Compare deux matières selon une propriété",
        ],
        observationFocus:
          "Observer la précision du vocabulaire sensoriel sans déroulé expérimental détaillé.",
        status: "upcoming",
        resources: gsWorldResourceSlots,
        workshops: [
          {
            id: "gs-monde-objets-matieres-atelier1",
            title: "Matières à comparer",
            type: "manipulation",
            objective:
              "Comparer deux matières et dire une propriété observée.",
            duration: "20 min",
            groupSize: "4-6 élèves",
            materials: ["Deux matières contrastées", "Plateau de manipulation"],
            status: "upcoming",
            resources: gsWorldResourceSlots,
          },
        ],
      },
    ],
  },
];
