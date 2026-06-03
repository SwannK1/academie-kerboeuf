/**
 * MS · Domaine Activités artistiques · Sous-domaines structurés
 *
 * Trois sous-domaines alignés sur le programme cycle 1 :
 *   1. Productions plastiques
 *   2. Voix et écoute
 *   3. Regarder les productions
 *
 * Niveau MS : gestes plus intentionnels, vocabulaire de l'art naissant,
 * premiers jugements esthétiques simples.
 *
 * Le site organise — les PDF enseignent.
 */
import type { MaternelleSubdomain } from "@/content/levels/maternelle/types";

export const msActivitesArtistiquesSubdomains: MaternelleSubdomain[] = [
  // ── 1. Productions plastiques ─────────────────────────────────────────────
  {
    id: "ms-artistiques-productions-plastiques",
    slug: "productions-plastiques",
    label: "Productions plastiques",
    description:
      "Choix d'outils, gestes plus intentionnels et exploration de supports variés. Découper, coller, assembler, modeler.",
    status: "in-progress",
    sequences: [
      {
        id: "ms-artistiques-productions-plastiques-seq1",
        slug: "produire-une-trace-avec-intention",
        title: "Produire une trace avec une intention",
        levelSlug: "ms",
        domainSlug: "activites-artistiques",
        subdomainSlug: "productions-plastiques",
        description:
          "Séquence centrée sur le choix délibéré d'un outil pour produire une trace visible et intentionnelle.",
        objective: "Choisir un outil pour produire une trace attendue sur un support.",
        objectives: [
          "Nommer l'outil choisi et expliquer son choix",
          "Adapter la pression ou le geste à l'outil utilisé",
          "Observer la différence entre deux outils sur un même support",
        ],
        periodLabel: "Période 2",
        estimatedDuration: "3 séances × 20 min",
        sessionCount: 3,
        observableSkills: ["Choisit un outil pour produire une trace attendue et nomme cet outil."],
        observationFocus:
          "Observer si l'élève adapte son geste à l'outil ou reproduit le même geste quel que soit l'outil.",
        status: "in-progress",
        resources: [],
        workshops: [
          {
            id: "ms-artistiques-productions-plastiques-seq1-atelier1",
            slug: "outils-et-chemins",
            title: "Outils et chemins",
            type: "manipulation",
            objective:
              "Utiliser un outil choisi pour tracer un chemin visible et continu sur un support.",
            duration: "20 min",
            groupSize: "4-5 élèves",
            materials: [
              "Pinceaux de tailles variées",
              "Rouleaux",
              "Éponges taillées",
              "Papier grand format",
              "Peinture en pot (3 couleurs)",
            ],
            instruction:
              "Choisis un outil et trace un chemin de la maison jusqu'à l'école sur la feuille.",
            expectedAction:
              "L'élève choisit un outil, produit une trace continue et nomme l'outil utilisé.",
            differentiation:
              "Allègement : deux outils proposés seulement. Renforcement : l'élève compare deux outils sur la même feuille et décrit la différence.",
            status: "in-progress",
            observationGrid: {
              id: "ms-artistiques-productions-plastiques-seq1-atelier1-grille",
              title: "Grille — Produire une trace avec intention",
              teacherUse:
                "Cocher pendant la manipulation. Observer le moment du choix de l'outil et la qualité du geste.",
              status: "upcoming",
              criteria: [
                {
                  id: "crit-ms-art-1",
                  label: "Choisit un outil parmi plusieurs sans hésitation",
                  levelDescriptor: "Attendu MS",
                },
                {
                  id: "crit-ms-art-2",
                  label: "Produit une trace continue visible sur le support",
                  levelDescriptor: "Attendu MS",
                },
                {
                  id: "crit-ms-art-3",
                  label: "Nomme l'outil et décrit la trace produite",
                  levelDescriptor: "Dépassement MS",
                },
              ],
            },
            resources: [],
          },
        ],
      },
      {
        id: "ms-artistiques-productions-plastiques-seq2",
        slug: "decouper-assembler-coller",
        title: "Découper, assembler, coller",
        levelSlug: "ms",
        domainSlug: "activites-artistiques",
        subdomainSlug: "productions-plastiques",
        description:
          "Séquence de travail sur la découpe guidée et l'assemblage de formes pour composer une image.",
        objective:
          "Découper des formes simples et les assembler pour construire une composition.",
        objectives: [
          "Tenir les ciseaux correctement et découper sur un trait",
          "Organiser des formes avant de coller",
          "Verbaliser ses choix de placement",
        ],
        periodLabel: "Période 3",
        estimatedDuration: "3 séances × 25 min",
        sessionCount: 3,
        observableSkills: ["Découpe sur un trait simple et assemble des formes pour composer."],
        observationFocus:
          "Observer la prise des ciseaux et la précision de la découpe. Repérer si l'élève organise avant de coller ou colle au fur et à mesure.",
        status: "upcoming",
        resources: [],
        workshops: [
          {
            id: "ms-artistiques-productions-plastiques-seq2-atelier1",
            slug: "le-monstre-assemble",
            title: "Le monstre assemblé",
            type: "manipulation",
            objective:
              "Découper des parties d'un corps (ovale, rectangle, cercle) et les assembler pour créer un personnage.",
            duration: "25 min",
            groupSize: "4 élèves",
            materials: [
              "Papiers de couleur pré-tracés (formes simples)",
              "Ciseaux adaptés",
              "Colle en bâton",
              "Feuille de fond A3",
            ],
            instruction:
              "Découpe les formes sur les traits et assemble ton monstre sur la grande feuille avant de coller.",
            expectedAction:
              "L'élève découpe au moins trois formes et les dispose avant de les coller.",
            differentiation:
              "Allègement : formes pré-découpées à assembler seulement. Renforcement : l'élève dessine et découpe ses propres formes.",
            status: "upcoming",
            observationGrid: {
              id: "ms-artistiques-productions-plastiques-seq2-atelier1-grille",
              title: "Grille — Découper et assembler",
              teacherUse:
                "Observer la prise des ciseaux, la précision de la découpe et l'organisation avant le collage.",
              status: "upcoming",
              criteria: [
                {
                  id: "crit-ms-art-dec-1",
                  label: "Tient les ciseaux correctement",
                  levelDescriptor: "Attendu MS",
                },
                {
                  id: "crit-ms-art-dec-2",
                  label: "Découpe en suivant le trait approximativement",
                  levelDescriptor: "Attendu MS",
                },
                {
                  id: "crit-ms-art-dec-3",
                  label: "Organise les formes avant de coller et explique son choix",
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

  // ── 2. Voix et écoute ─────────────────────────────────────────────────────
  {
    id: "ms-artistiques-voix-ecoute",
    slug: "voix-ecoute",
    label: "Voix et écoute",
    description:
      "Mémorisation de chants courts, jeux vocaux, écoute attentive d'extraits musicaux et reconnaissance de sons ou instruments simples.",
    status: "in-progress",
    sequences: [
      {
        id: "ms-artistiques-voix-ecoute-seq1",
        slug: "reprendre-un-chant-court",
        title: "Reprendre un chant court",
        levelSlug: "ms",
        domainSlug: "activites-artistiques",
        subdomainSlug: "voix-ecoute",
        description:
          "Séquence d'apprentissage d'une comptine ou d'un chant court par imitation et mémorisation progressive.",
        objective:
          "Mémoriser et restituer un chant court en ajustant sa voix au groupe.",
        objectives: [
          "Reprendre une phrase chantée après le modèle",
          "Synchroniser sa voix avec le groupe",
          "Identifier un moment fort ou une répétition dans le chant",
        ],
        periodLabel: "Période 1",
        estimatedDuration: "4 séances × 15 min",
        sessionCount: 4,
        observableSkills: ["Reprend une phrase chantée avec le groupe en ajustant sa voix."],
        observationFocus:
          "Observer si l'élève chante ou se contente de bouger les lèvres. Repérer la synchronisation avec le groupe.",
        status: "in-progress",
        resources: [],
        workshops: [
          {
            id: "ms-artistiques-voix-ecoute-seq1-atelier1",
            slug: "echo-chante",
            title: "Écho chanté",
            type: "collectif",
            objective:
              "Écouter une phrase courte chantée par l'enseignant puis la reprendre collectivement (jeu d'écho).",
            duration: "15 min",
            groupSize: "Groupe classe",
            materials: [
              "Aucun matériel requis",
              "Option : maracas ou bâtons de pluie pour marquer le rythme",
            ],
            instruction:
              "J'entends la phrase, je l'écoute bien, puis je la chante à mon tour avec vous.",
            expectedAction:
              "L'élève reprend la phrase chantée avec une hauteur de voix ajustée après le modèle.",
            differentiation:
              "Allègement : reprendre uniquement les 2-3 derniers mots. Renforcement : l'élève propose une phrase en solo.",
            status: "in-progress",
            observationGrid: {
              id: "ms-artistiques-voix-ecoute-seq1-atelier1-grille",
              title: "Grille — Écho chanté",
              teacherUse:
                "Observer pendant le collectif. Cocher discrètement les élèves qui chantent réellement.",
              status: "upcoming",
              criteria: [
                {
                  id: "crit-ms-voix-1",
                  label: "Reprend la phrase chantée avec le groupe",
                  levelDescriptor: "Attendu MS",
                },
                {
                  id: "crit-ms-voix-2",
                  label: "Ajuste sa voix (plus fort, plus doux) sur demande",
                  levelDescriptor: "Attendu MS",
                },
                {
                  id: "crit-ms-voix-3",
                  label: "Reprend seul une phrase courte avec une voix juste",
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

  // ── 3. Regarder les productions ───────────────────────────────────────────
  {
    id: "ms-artistiques-regarder-productions",
    slug: "regarder-productions",
    label: "Regarder les productions",
    description:
      "Première description de productions personnelles, collectives ou rencontrées. Vocabulaire de l'art naissant.",
    status: "in-progress",
    sequences: [
      {
        id: "ms-artistiques-regarder-productions-seq1",
        slug: "decrire-une-production",
        title: "Décrire une production",
        levelSlug: "ms",
        domainSlug: "activites-artistiques",
        subdomainSlug: "regarder-productions",
        description:
          "Séquence d'observation et de description orale d'une production plastique — personnelle ou rencontrée.",
        objective:
          "Observer une production et nommer des éléments visibles avec un vocabulaire adapté.",
        objectives: [
          "Nommer une couleur, une forme ou une matière visible",
          "Dire ce que l'on voit avant de dire ce que l'on pense",
          "Écouter la description d'un camarade sans interrompre",
        ],
        periodLabel: "Période 2",
        estimatedDuration: "3 séances × 20 min",
        sessionCount: 3,
        observableSkills: ["Nomme au moins deux éléments visibles dans une production observée."],
        observationFocus:
          "Observer si l'élève décrit (ce qu'il voit) ou interprète (ce qu'il croit). Repérer le vocabulaire plastique réinvesti.",
        status: "in-progress",
        resources: [],
        workshops: [
          {
            id: "ms-artistiques-regarder-productions-seq1-atelier1",
            slug: "je-vois-je-nomme",
            title: "Je vois, je nomme",
            type: "collectif",
            objective:
              "Observer une reproduction d'œuvre ou une production de classe et nommer des éléments visibles.",
            duration: "20 min",
            groupSize: "5-6 élèves",
            materials: [
              "Reproduction d'une œuvre plastique simple (A3)",
              "Jetons de parole",
              "Tableau ou paperboard pour noter les mots cités",
            ],
            instruction:
              "Regarde bien l'image. Dis-moi une couleur que tu vois, une forme que tu vois, ou quelque chose que tu reconnais.",
            expectedAction:
              "L'élève nommer au moins un élément visible (couleur, forme, objet, matière) et écoute les propositions des camarades.",
            differentiation:
              "Allègement : pointer avec le doigt avant de nommer. Renforcement : l'élève formule une phrase complète avec un adjectif (grande, ronde, rouge).",
            status: "in-progress",
            observationGrid: {
              id: "ms-artistiques-regarder-productions-seq1-atelier1-grille",
              title: "Grille — Décrire une production",
              teacherUse:
                "Cocher pendant l'atelier. Noter le vocabulaire utilisé spontanément par chaque élève.",
              status: "upcoming",
              criteria: [
                {
                  id: "crit-ms-regard-1",
                  label: "Nomme une couleur ou une forme visible",
                  levelDescriptor: "Attendu MS",
                },
                {
                  id: "crit-ms-regard-2",
                  label: "Formule une phrase complète pour décrire",
                  levelDescriptor: "Attendu MS",
                },
                {
                  id: "crit-ms-regard-3",
                  label: "Distingue ce qu'il voit de ce qu'il imagine",
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
