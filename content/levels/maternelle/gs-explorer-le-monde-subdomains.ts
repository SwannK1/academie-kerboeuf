/**
 * GS · Domaine Explorer le monde · Sous-domaines structurés
 *
 * Trois sous-domaines alignés sur le programme cycle 1 :
 *   1. Se repérer dans le temps — chronologie, vocabulaire temporel
 *   2. Découvrir le vivant — observation, description, besoins
 *   3. Objets et matières — manipulation raisonnée, propriétés sensorielles
 *
 * Le site organise — les PDF enseignent.
 */
import type { MaternelleSubdomain } from "@/content/levels/maternelle/types";

export const gsExplorerLeMondeSubdomains: MaternelleSubdomain[] = [
  // ── 1. Se repérer dans le temps ───────────────────────────────────────────
  {
    id: "gs-monde-temps",
    slug: "temps",
    label: "Se repérer dans le temps",
    description:
      "Chronologie d'événements vécus et repères progressifs dans la journée et la semaine.",
    status: "in-progress",
    sequences: [
      {
        id: "gs-monde-temps-seq1",
        slug: "ordonner-trois-moments-vecus",
        title: "Ordonner trois moments vécus",
        levelSlug: "gs",
        domainSlug: "explorer-le-monde",
        subdomainSlug: "temps",
        description:
          "Séquence centrée sur la construction d'une chronologie orale et iconique à partir d'événements réellement vécus.",
        objective:
          "Remettre trois moments vécus dans l'ordre chronologique et justifier.",
        objectives: [
          "Utiliser les connecteurs temporels (d'abord, ensuite, enfin)",
          "Justifier un ordre en s'appuyant sur un souvenir précis",
        ],
        periodLabel: "Période 1-2",
        estimatedDuration: "4 séances × 20 min",
        sessionCount: 4,
        observableSkills: [
          "Remet trois moments vécus dans l'ordre chronologique.",
        ],
        observationFocus:
          "Observer si l'élève produit une justification temporelle (« parce que le matin on arrive avant la récré ») ou une justification logique non temporelle.",
        status: "in-progress",
        resources: [],
        workshops: [
          {
            id: "gs-monde-temps-seq1-atelier1",
            slug: "dabord-ensuite-enfin",
            title: "D'abord, ensuite, enfin",
            type: "collectif",
            objective:
              "Remettre dans l'ordre trois images illustrant une activité réellement vécue le matin.",
            duration: "20 min",
            groupSize: "6-8 élèves",
            materials: [
              "3 images séquentielles d'une activité vécue en classe (ex : arrivée, activité du matin, récréation)",
              "Bande de positionnement (gauche = d'abord, droite = enfin)",
              "Étiquettes mots : « d'abord », « ensuite », « enfin »",
            ],
            instruction:
              "Voici trois images de ce matin. Remets-les dans l'ordre. Raconte en disant : d'abord…, ensuite…, enfin…",
            expectedAction:
              "L'élève ordonne les trois images correctement et produit une phrase avec au moins un connecteur temporel.",
            differentiation:
              "Allègement : images numérotées au dos pour vérification autonome. Renforcement : l'élève produit une quatrième image dessinée à insérer dans la chronologie.",
            status: "in-progress",
            observationGrid: {
              id: "gs-monde-temps-seq1-atelier1-grille",
              title: "Grille — Ordonner des moments vécus (GS)",
              teacherUse:
                "Observer si l'élève verbalise sa stratégie. Distinguer l'ordination correcte et la capacité à justifier.",
              status: "upcoming",
              criteria: [
                {
                  id: "crit-gs-monde-temps-1",
                  label: "Ordonne les trois images dans le bon ordre",
                  levelDescriptor: "Attendu GS",
                },
                {
                  id: "crit-gs-monde-temps-2",
                  label: "Utilise un connecteur temporel dans sa verbalisation",
                  levelDescriptor: "Attendu GS",
                },
                {
                  id: "crit-gs-monde-temps-3",
                  label: "Justifie oralement l'ordre en s'appuyant sur un souvenir précis",
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
      "Observation, comparaison et description de caractéristiques du vivant ; premiers repères sur les besoins des êtres vivants.",
    status: "in-progress",
    sequences: [
      {
        id: "gs-monde-vivant-seq1",
        slug: "decrire-un-etre-vivant-observe",
        title: "Décrire un être vivant observé",
        levelSlug: "gs",
        domainSlug: "explorer-le-monde",
        subdomainSlug: "vivant",
        description:
          "Séquence centrée sur l'observation directe et la verbalisation précise de caractéristiques d'un être vivant.",
        objective:
          "Décrire une caractéristique visible d'un être vivant après observation.",
        objectives: [
          "Utiliser un vocabulaire descriptif précis",
          "Distinguer ce qu'on observe de ce qu'on suppose",
        ],
        periodLabel: "Période 3",
        estimatedDuration: "4 séances × 25 min",
        sessionCount: 4,
        observableSkills: [
          "Décrit une caractéristique visible d'un être vivant.",
        ],
        observationFocus:
          "Observer si l'élève distingue observation et invention. Repérer les termes descriptifs utilisés spontanément.",
        status: "in-progress",
        resources: [],
        workshops: [
          {
            id: "gs-monde-vivant-seq1-atelier1",
            slug: "carnet-oral-observation",
            title: "Carnet oral d'observation",
            type: "collectif",
            objective:
              "Observer un être vivant (plante, insecte ou animal de classe) puis verbaliser une caractéristique visible.",
            duration: "25 min",
            groupSize: "5-6 élèves",
            materials: [
              "Être vivant à observer (escargot, plante en pot, photo grand format d'animal)",
              "Loupe pour observation fine",
              "Carnet collectif (feuille A3 à afficher)",
              "Stylo enseignant pour noter les observations dictées",
            ],
            instruction:
              "Regarde bien. Qu'est-ce que tu vois vraiment ? Je note ce que vous observez. On ne dit que ce qu'on voit.",
            expectedAction:
              "L'élève produit un énoncé descriptif (« il a quatre pattes », « les feuilles sont lisses »).",
            differentiation:
              "Allègement : loupe proposée pour faciliter l'observation, l'enseignant pointe une zone précise. Renforcement : l'élève compare deux êtres vivants et dit une différence.",
            status: "in-progress",
            observationGrid: {
              id: "gs-monde-vivant-seq1-atelier1-grille",
              title: "Grille — Observer et décrire le vivant (GS)",
              teacherUse:
                "Observer la qualité des énoncés : vague (« c'est petit ») versus précis (« il a des antennes »). Distinguer observation et supposition.",
              status: "upcoming",
              criteria: [
                {
                  id: "crit-gs-monde-vivant-1",
                  label: "Produit un énoncé descriptif (propriété visible)",
                  levelDescriptor: "Attendu GS",
                },
                {
                  id: "crit-gs-monde-vivant-2",
                  label: "Utilise un terme précis (nom d'une partie du corps, couleur, texture)",
                  levelDescriptor: "Attendu GS",
                },
                {
                  id: "crit-gs-monde-vivant-3",
                  label: "Compare deux êtres vivants en nommant une différence observable",
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
      "Manipulation raisonnée d'objets et description de propriétés perceptibles ; premiers usages d'outils simples.",
    status: "in-progress",
    sequences: [
      {
        id: "gs-monde-objets-matieres-seq1",
        slug: "decrire-une-matiere",
        title: "Décrire une matière",
        levelSlug: "gs",
        domainSlug: "explorer-le-monde",
        subdomainSlug: "objets-matieres",
        description:
          "Séquence centrée sur la manipulation et la verbalisation de propriétés sensorielles de matières contrastées.",
        objective:
          "Décrire une matière à partir d'une manipulation en utilisant un vocabulaire sensoriel.",
        objectives: [
          "Nommer une propriété sensorielle (dur/mou, lisse/rugueux, lourd/léger)",
          "Comparer deux matières et dire une différence",
        ],
        periodLabel: "Période 2",
        estimatedDuration: "4 séances × 20 min",
        sessionCount: 4,
        observableSkills: [
          "Décrit une matière à partir d'une manipulation.",
        ],
        observationFocus:
          "Observer si l'élève utilise des termes sensoriels ou reste dans l'appréciation (« c'est bien »). Repérer la généralisation à d'autres objets.",
        status: "in-progress",
        resources: [],
        workshops: [
          {
            id: "gs-monde-objets-matieres-seq1-atelier1",
            slug: "matieres-a-comparer",
            title: "Matières à comparer",
            type: "manipulation",
            objective:
              "Manipuler deux matières contrastées, nommer une propriété pour chacune et les comparer.",
            duration: "20 min",
            groupSize: "4-5 élèves",
            materials: [
              "Paires de matières contrastées : bois/mousse, métal/tissu, sable sec/argile",
              "Boîtes à toucher (sans voir)",
              "Cartes mots : dur, mou, lisse, rugueux, léger, lourd, froid, chaud",
            ],
            instruction:
              "Touche sans regarder. Qu'est-ce que tu sens ? Choisis le bon mot. Compare les deux matières : qu'est-ce qui est différent ?",
            expectedAction:
              "L'élève nomme une propriété pour chaque matière et dit une différence entre les deux.",
            differentiation:
              "Allègement : matières très contrastées (coton vs pierre) avec cartes mots illustrées. Renforcement : l'élève trie d'autres objets selon la propriété identifiée.",
            status: "in-progress",
            observationGrid: {
              id: "gs-monde-objets-matieres-seq1-atelier1-grille",
              title: "Grille — Décrire et comparer des matières (GS)",
              teacherUse:
                "Observer la richesse lexicale et la capacité à généraliser (« tous les objets en métal sont froids »).",
              status: "upcoming",
              criteria: [
                {
                  id: "crit-gs-monde-matiere-1",
                  label: "Nomme une propriété sensorielle perceptible pour chaque matière",
                  levelDescriptor: "Attendu GS",
                },
                {
                  id: "crit-gs-monde-matiere-2",
                  label: "Dit une différence entre les deux matières avec un terme précis",
                  levelDescriptor: "Attendu GS",
                },
                {
                  id: "crit-gs-monde-matiere-3",
                  label: "Généralise à un autre objet connu (« comme… »)",
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
