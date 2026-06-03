/**
 * MS · Domaine Explorer le monde · Sous-domaines structurés
 *
 * Trois sous-domaines alignés sur le programme cycle 1 :
 *   1. Se repérer dans le temps
 *   2. Découvrir le vivant
 *   3. Objets et matières
 *
 * Niveau MS : premières observations structurées, repères temporels proches,
 * curiosité orientée vers le vivant et les propriétés des matières.
 *
 * Priorité à l'observation directe et à la manipulation.
 * Le site organise — les PDF enseignent.
 */
import type { MaternelleSubdomain } from "@/content/levels/maternelle/types";

export const msExplorerLeMondeSubdomains: MaternelleSubdomain[] = [
  // ── 1. Se repérer dans le temps ───────────────────────────────────────────
  {
    id: "ms-monde-temps",
    slug: "temps",
    label: "Se repérer dans le temps",
    description:
      "Avant, après et repères proches dans les activités de la journée de classe. Premiers échanges sur hier et demain.",
    status: "in-progress",
    sequences: [
      {
        id: "ms-monde-temps-seq1",
        slug: "ordonner-deux-moments-vecus",
        title: "Ordonner deux moments vécus",
        levelSlug: "ms",
        domainSlug: "explorer-le-monde",
        subdomainSlug: "temps",
        description:
          "Séquence centrée sur la structuration de la chronologie proche en utilisant des images de la journée scolaire.",
        objective:
          "Ordonner deux puis trois images de la journée et justifier l'ordre avec les mots avant et après.",
        objectives: [
          "Utiliser avant et après à bon escient",
          "Placer deux images dans l'ordre chronologique",
          "Expliquer l'ordre choisi avec une phrase courte",
        ],
        periodLabel: "Période 1",
        estimatedDuration: "4 séances × 20 min",
        sessionCount: 4,
        observableSkills: ["Ordonne deux moments vécus de la journée et utilise avant ou après."],
        observationFocus:
          "Observer si l'élève utilise avant/après à bon escient ou de façon aléatoire. Repérer les confusions matin/après-midi.",
        status: "in-progress",
        resources: [],
        workshops: [
          {
            id: "ms-monde-temps-seq1-atelier1",
            slug: "avant-ou-apres",
            title: "Avant ou après",
            type: "collectif",
            objective:
              "Choisir l'image qui vient avant ou après une activité connue de la journée de classe.",
            duration: "20 min",
            groupSize: "5-6 élèves",
            materials: [
              "Photos de moments de la journée (accueil, goûter, récréation, sieste, départ)",
              "Frise chronologique vierge (3 cases)",
              "Flèches de direction imprimées",
            ],
            instruction:
              "Regarde ces deux photos. Laquelle vient en premier dans notre journée ? Pose-la à gauche.",
            expectedAction:
              "L'élève place les deux images dans l'ordre et justifie avec avant ou après.",
            differentiation:
              "Allègement : deux images seulement, deux moments très contrastés (arrivée / départ). Renforcement : trois images à ordonner en justifiant chaque position.",
            status: "in-progress",
            observationGrid: {
              id: "ms-monde-temps-seq1-atelier1-grille",
              title: "Grille — Ordonner des moments vécus",
              teacherUse:
                "Observer la justification orale. Le placement correct sans justification est insuffisant.",
              status: "upcoming",
              criteria: [
                {
                  id: "crit-ms-temps-1",
                  label: "Place correctement deux images dans l'ordre",
                  levelDescriptor: "Attendu MS",
                },
                {
                  id: "crit-ms-temps-2",
                  label: "Utilise avant ou après pour justifier",
                  levelDescriptor: "Attendu MS",
                },
                {
                  id: "crit-ms-temps-3",
                  label: "Ordonne trois moments et argumente chaque position",
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

  // ── 2. Découvrir le vivant ─────────────────────────────────────────────────
  {
    id: "ms-monde-vivant",
    slug: "vivant",
    label: "Découvrir le vivant",
    description:
      "Observation régulière des besoins, transformations et comportements du vivant. Premiers échanges sur les animaux et les plantes de classe.",
    status: "in-progress",
    sequences: [
      {
        id: "ms-monde-vivant-seq1",
        slug: "observer-un-changement-du-vivant",
        title: "Observer un changement du vivant",
        levelSlug: "ms",
        domainSlug: "explorer-le-monde",
        subdomainSlug: "vivant",
        description:
          "Séquence d'observation hebdomadaire d'une plante en croissance pour identifier et verbaliser un changement visible.",
        objective:
          "Repérer et décrire un changement observable chez une plante cultivée en classe.",
        objectives: [
          "Comparer deux états d'une plante à des moments différents",
          "Nommer le changement observé (plus grand, nouvelle feuille, couleur différente)",
          "Relier le changement à un besoin (eau, lumière)",
        ],
        periodLabel: "Période 2",
        estimatedDuration: "4 séances × 20 min (observations hebdomadaires)",
        sessionCount: 4,
        observableSkills: ["Repère et nomme un changement visible sur une plante observée à deux moments différents."],
        observationFocus:
          "Observer si l'élève compare les deux états ou décrit seulement l'état actuel. Repérer le vocabulaire de la croissance réinvesti.",
        status: "in-progress",
        resources: [],
        workshops: [
          {
            id: "ms-monde-vivant-seq1-atelier1",
            slug: "ca-pousse",
            title: "Ça pousse",
            type: "collectif",
            objective:
              "Comparer deux photos successives d'une plante de classe pour identifier et nommer ce qui a changé.",
            duration: "20 min",
            groupSize: "5-6 élèves",
            materials: [
              "Deux photos de la même plante à deux semaines d'intervalle",
              "Plante réelle en classe",
              "Loupe (option)",
              "Papier à dessin pour trace élève (croquis libre)",
            ],
            instruction:
              "Regarde les deux photos de notre plante. Qu'est-ce qui a changé ? Montre-moi avec ton doigt.",
            expectedAction:
              "L'élève pointe ou nomme un changement observable (nouvelle feuille, tige plus haute, couleur).",
            differentiation:
              "Allègement : un seul élément de comparaison guidé (la hauteur avec une règle). Renforcement : l'élève formule une hypothèse sur la cause du changement.",
            status: "in-progress",
            observationGrid: {
              id: "ms-monde-vivant-seq1-atelier1-grille",
              title: "Grille — Observer un changement du vivant",
              teacherUse:
                "Cocher pendant la discussion. Ne pas valider sans que l'élève ait montré ou nommé le changement.",
              status: "upcoming",
              criteria: [
                {
                  id: "crit-ms-vivant-1",
                  label: "Identifie un changement visible entre les deux photos",
                  levelDescriptor: "Attendu MS",
                },
                {
                  id: "crit-ms-vivant-2",
                  label: "Nomme le changement avec un mot précis",
                  levelDescriptor: "Attendu MS",
                },
                {
                  id: "crit-ms-vivant-3",
                  label: "Relie le changement à un besoin du vivant (eau, soleil)",
                  levelDescriptor: "Dépassement MS",
                },
              ],
            },
            resources: [],
          },
        ],
      },
      {
        id: "ms-monde-vivant-seq2",
        slug: "comprendre-les-besoins-du-vivant",
        title: "Comprendre les besoins du vivant",
        levelSlug: "ms",
        domainSlug: "explorer-le-monde",
        subdomainSlug: "vivant",
        description:
          "Séquence de manipulation et d'échanges pour identifier les besoins essentiels d'une plante ou d'un animal familier.",
        objective:
          "Nommer deux besoins d'un être vivant étudié en classe et les relier à des actions concrètes.",
        objectives: [
          "Identifier l'eau et la lumière comme besoins d'une plante",
          "Relier un besoin à une action (arroser, placer près de la fenêtre)",
          "Comprendre que négliger un besoin entraîne un changement visible",
        ],
        periodLabel: "Période 3",
        estimatedDuration: "3 séances × 20 min",
        sessionCount: 3,
        observableSkills: ["Nomme deux besoins d'un être vivant observé et explique comment les satisfaire."],
        observationFocus:
          "Observer si l'élève fait le lien entre le besoin et l'action ou se contente de citer le besoin sans lien.",
        status: "upcoming",
        resources: [],
        workshops: [
          {
            id: "ms-monde-vivant-seq2-atelier1",
            slug: "de-quoi-a-t-il-besoin",
            title: "De quoi a-t-il besoin ?",
            type: "manipulation",
            objective:
              "Trier des images d'actions (arroser, donner à manger, mettre à la lumière, donner de l'espace) et associer chacune à un être vivant.",
            duration: "20 min",
            groupSize: "4 élèves",
            materials: [
              "Images d'actions de soin (arroser, nourrir, exposer à la lumière, promener)",
              "Images d'êtres vivants (plante, chien, poisson, lapin)",
              "Plateau de tri",
            ],
            instruction:
              "Pour chaque être vivant, choisis l'action qui lui est utile et explique pourquoi.",
            expectedAction:
              "L'élève associe correctement au moins deux actions à deux êtres vivants différents et justifie.",
            differentiation:
              "Allègement : une seule image d'être vivant et deux actions au choix. Renforcement : l'élève invente une action supplémentaire non représentée.",
            status: "upcoming",
            observationGrid: {
              id: "ms-monde-vivant-seq2-atelier1-grille",
              title: "Grille — Besoins du vivant",
              teacherUse:
                "Observer la justification orale plutôt que le simple tri. Le raisonnement compte plus que le placement.",
              status: "upcoming",
              criteria: [
                {
                  id: "crit-ms-vivant2-1",
                  label: "Associe correctement une action à un être vivant",
                  levelDescriptor: "Attendu MS",
                },
                {
                  id: "crit-ms-vivant2-2",
                  label: "Nomme deux besoins différents d'un même être vivant",
                  levelDescriptor: "Attendu MS",
                },
                {
                  id: "crit-ms-vivant2-3",
                  label: "Explique la conséquence d'un besoin non satisfait",
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
      "Comparaison d'objets et de matières selon des propriétés perceptibles (rigide/souple, lourd/léger, lisse/rugueux).",
    status: "in-progress",
    sequences: [
      {
        id: "ms-monde-objets-matieres-seq1",
        slug: "comparer-deux-objets",
        title: "Comparer deux objets selon une propriété",
        levelSlug: "ms",
        domainSlug: "explorer-le-monde",
        subdomainSlug: "objets-matieres",
        description:
          "Séquence de manipulation sensorielle pour comparer des objets et nommer leurs propriétés observables.",
        objective:
          "Comparer deux objets selon une propriété observable et nommer cette propriété.",
        objectives: [
          "Utiliser des termes de comparaison (plus lourd, plus lisse, plus mou)",
          "Trier des objets selon une propriété tactile ou visuelle",
          "Justifier un classement en nommant la propriété utilisée",
        ],
        periodLabel: "Période 2",
        estimatedDuration: "3 séances × 20 min",
        sessionCount: 3,
        observableSkills: ["Compare deux objets selon une propriété observable et nomme cette propriété."],
        observationFocus:
          "Observer si l'élève utilise une propriété stable ou change de critère. Repérer le vocabulaire des propriétés réinvesti.",
        status: "in-progress",
        resources: [],
        workshops: [
          {
            id: "ms-monde-objets-matieres-seq1-atelier1",
            slug: "pareil-ou-different",
            title: "Pareil ou différent",
            type: "manipulation",
            objective:
              "Manipuler deux objets et comparer une propriété (rigidité, texture ou masse) en utilisant les mots adaptés.",
            duration: "20 min",
            groupSize: "4-5 élèves",
            materials: [
              "Paires d'objets contrastés (balle mousse / balle de tennis, tissu velours / papier de verre, plume / pierre)",
              "Plateau de tri à 2 cases (pareil / différent ou mou / dur)",
              "Bandeau pour les yeux (option : exploration tactile seule)",
            ],
            instruction:
              "Prends les deux objets, touche-les, soupèse-les. Dis-moi en quoi ils sont pareils ou différents.",
            expectedAction:
              "L'élève nomme une propriété (texture, masse, rigidité) et l'applique à la comparaison des deux objets.",
            differentiation:
              "Allègement : une seule propriété guidée par l'enseignant (toucher seulement). Renforcement : l'élève choisit la propriété à comparer et l'explique avant de manipuler.",
            status: "in-progress",
            observationGrid: {
              id: "ms-monde-objets-matieres-seq1-atelier1-grille",
              title: "Grille — Comparer deux objets",
              teacherUse:
                "Cocher pendant la manipulation. Observer la stabilité du critère utilisé sur plusieurs comparaisons.",
              status: "upcoming",
              criteria: [
                {
                  id: "crit-ms-objets-1",
                  label: "Nomme une propriété observable (dur, mou, lisse, rugueux…)",
                  levelDescriptor: "Attendu MS",
                },
                {
                  id: "crit-ms-objets-2",
                  label: "Applique le même critère sur deux comparaisons successives",
                  levelDescriptor: "Attendu MS",
                },
                {
                  id: "crit-ms-objets-3",
                  label: "Justifie un classement avec deux propriétés différentes",
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
