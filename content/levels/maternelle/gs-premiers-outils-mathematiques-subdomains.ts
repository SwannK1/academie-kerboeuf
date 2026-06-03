/**
 * GS · Domaine Premiers outils mathématiques · Sous-domaines structurés
 *
 * Trois sous-domaines alignés sur le programme cycle 1 :
 *   1. Nombres et quantités — dénombrement, composition, comparaison
 *   2. Formes et grandeurs — reconnaissance, description, comparaison
 *   3. Organisation de l'espace — repérage, reproduction, algorithmes
 *
 * Niveau GS : nombres jusqu'à 10 puis au-delà selon progression ;
 * résolution de petits problèmes ; autonomie dans la manipulation.
 *
 * Le site organise — les PDF enseignent.
 */
import type { MaternelleSubdomain } from "@/content/levels/maternelle/types";

export const gsPremiersOutilsMathematiquesSubdomains: MaternelleSubdomain[] = [
  // ── 1. Nombres et quantités ───────────────────────────────────────────────
  {
    id: "gs-maths-nombres-quantites",
    slug: "nombres-quantites",
    label: "Nombres et quantités",
    description:
      "Dénombrement jusqu'à 10 et au-delà, composition de petites quantités et comparaison raisonnée de collections.",
    status: "in-progress",
    sequences: [
      {
        id: "gs-maths-nombres-quantites-seq1",
        slug: "composer-une-petite-quantite",
        title: "Composer une petite quantité",
        levelSlug: "gs",
        domainSlug: "premiers-outils-mathematiques",
        subdomainSlug: "nombres-quantites",
        description:
          "Séquence centrée sur la décomposition additionnelle de petites quantités (jusqu'à 10) par manipulation.",
        objective:
          "Composer une quantité demandée en réunissant deux collections.",
        objectives: [
          "Dénombrer chaque collection et vérifier la quantité totale",
          "Trouver plusieurs façons de décomposer un nombre",
        ],
        periodLabel: "Période 2",
        estimatedDuration: "5 séances × 20 min",
        sessionCount: 5,
        observableSkills: [
          "Compose une quantité demandée en réunissant deux collections.",
        ],
        observationFocus:
          "Observer si l'élève recompte tout ou utilise la conservation. Repérer ceux qui trouvent spontanément plusieurs décompositions.",
        status: "in-progress",
        resources: [],
        workshops: [
          {
            id: "gs-maths-nombres-quantites-seq1-atelier1",
            slug: "deux-paniers-pour-faire-cinq",
            title: "Deux paniers pour faire cinq",
            type: "manipulation",
            objective:
              "Réunir deux collections pour atteindre une quantité demandée (5 puis 7 puis 10).",
            duration: "20 min",
            groupSize: "4 élèves",
            materials: [
              "Deux petits paniers ou boîtes par élève",
              "Jetons de deux couleurs (20 par élève)",
              "Cartes-nombres de 1 à 10",
              "Feuille de jeu : « J'ai … et … = … »",
            ],
            instruction:
              "Tu dois mettre des jetons dans tes deux paniers pour avoir exactement 5 jetons en tout. Compte bien.",
            expectedAction:
              "L'élève distribue les jetons dans les deux paniers, vérifie le total et peut le reformuler oralement.",
            differentiation:
              "Allègement : quantité cible fixée à 5 avec jetons de la même couleur. Renforcement : trouver toutes les façons de faire 7 et les noter par dessin.",
            status: "in-progress",
            observationGrid: {
              id: "gs-maths-nombres-quantites-seq1-atelier1-grille",
              title: "Grille — Composer une quantité (GS)",
              teacherUse:
                "Observer la stratégie : l'élève pose-t-il d'abord tout dans un panier puis enlève, ou distribue-t-il directement ? Note les procédures de vérification.",
              status: "upcoming",
              criteria: [
                {
                  id: "crit-gs-maths-quantite-1",
                  label: "Obtient la quantité cible dans les deux paniers réunis",
                  levelDescriptor: "Attendu GS",
                },
                {
                  id: "crit-gs-maths-quantite-2",
                  label: "Vérifie le total en recomptant ou en conservant",
                  levelDescriptor: "Attendu GS",
                },
                {
                  id: "crit-gs-maths-quantite-3",
                  label: "Propose une deuxième décomposition différente sans aide",
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

  // ── 2. Formes et grandeurs ────────────────────────────────────────────────
  {
    id: "gs-maths-formes-grandeurs",
    slug: "formes-grandeurs",
    label: "Formes et grandeurs",
    description:
      "Reconnaissance, description avec vocabulaire spatial et comparaison de formes planes ou de grandeurs.",
    status: "in-progress",
    sequences: [
      {
        id: "gs-maths-formes-grandeurs-seq1",
        slug: "decrire-une-forme",
        title: "Décrire une forme",
        levelSlug: "gs",
        domainSlug: "premiers-outils-mathematiques",
        subdomainSlug: "formes-grandeurs",
        description:
          "Séquence centrée sur la description précise de formes planes à partir de critères observables (côtés, angles, taille).",
        objective:
          "Décrire une forme simple à l'aide d'un vocabulaire spatial minimal.",
        objectives: [
          "Nommer ou décrire les côtés d'une forme",
          "Faire retrouver une forme par indice oral",
        ],
        periodLabel: "Période 2-3",
        estimatedDuration: "4 séances × 20 min",
        sessionCount: 4,
        observableSkills: [
          "Décrit une forme simple avec un vocabulaire spatial.",
        ],
        observationFocus:
          "Observer si l'élève utilise des termes précis (côté droit, angle) ou des analogies (« comme une porte »). Repérer la généralisation.",
        status: "in-progress",
        resources: [],
        workshops: [
          {
            id: "gs-maths-formes-grandeurs-seq1-atelier1",
            slug: "portrait-de-forme",
            title: "Portrait de forme",
            type: "jeu",
            objective:
              "Faire retrouver une forme cachée en donnant un indice observable à ses camarades.",
            duration: "20 min",
            groupSize: "4-5 élèves",
            materials: [
              "Formes planes découpées : carré, rectangle, triangle, cercle, losange",
              "Écran ou pochette opaque",
              "Fiches de référence illustrées des formes",
            ],
            instruction:
              "Tu vois ta forme mais les autres non. Dis quelque chose que tu vois : les côtés, les angles, si c'est rond… Les autres doivent deviner.",
            expectedAction:
              "L'élève énonce un indice observable (« elle a quatre côtés pareils ») qui permet à au moins un camarade de trouver.",
            differentiation:
              "Allègement : fiches de référence disponibles pour guider le vocabulaire. Renforcement : l'élève donne deux indices différents, le deuxième si le premier ne suffit pas.",
            status: "in-progress",
            observationGrid: {
              id: "gs-maths-formes-grandeurs-seq1-atelier1-grille",
              title: "Grille — Décrire une forme (GS)",
              teacherUse:
                "Observer la précision des indices donnés et la compréhension des indices reçus.",
              status: "upcoming",
              criteria: [
                {
                  id: "crit-gs-maths-forme-1",
                  label: "Donne un indice observable permettant d'éliminer au moins une forme",
                  levelDescriptor: "Attendu GS",
                },
                {
                  id: "crit-gs-maths-forme-2",
                  label: "Utilise un terme spatial précis (côté, angle, rond)",
                  levelDescriptor: "Attendu GS",
                },
                {
                  id: "crit-gs-maths-forme-3",
                  label: "Donne deux indices distincts qui désignent la forme sans ambiguïté",
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

  // ── 3. Organisation de l'espace ───────────────────────────────────────────
  {
    id: "gs-maths-organisation-espace",
    slug: "organisation-espace",
    label: "Organisation de l'espace",
    description:
      "Repérage, reproduction et production de suites organisées ou d'arrangements spatiaux simples.",
    status: "in-progress",
    sequences: [
      {
        id: "gs-maths-organisation-espace-seq1",
        slug: "reproduire-une-organisation",
        title: "Reproduire une organisation",
        levelSlug: "gs",
        domainSlug: "premiers-outils-mathematiques",
        subdomainSlug: "organisation-espace",
        description:
          "Séquence centrée sur la copie d'un arrangement spatial et la formulation des positions relatives.",
        objective:
          "Reproduire une organisation simple d'objets à partir d'un modèle.",
        objectives: [
          "Identifier et respecter la position relative des objets",
          "Vérifier sa reproduction en comparant avec le modèle",
        ],
        periodLabel: "Période 3",
        estimatedDuration: "4 séances × 20 min",
        sessionCount: 4,
        observableSkills: [
          "Reproduit une organisation simple d'objets à partir d'un modèle.",
        ],
        observationFocus:
          "Observer si l'élève traite les positions relatives ou seulement les objets isolément. Repérer l'utilisation spontanée de vocabulaire positionnel.",
        status: "in-progress",
        resources: [],
        workshops: [
          {
            id: "gs-maths-organisation-espace-seq1-atelier1",
            slug: "comme-le-modele",
            title: "Comme le modèle",
            type: "manipulation",
            objective:
              "Replacer 4 à 6 objets dans la même organisation qu'un modèle observé puis masqué.",
            duration: "20 min",
            groupSize: "4 élèves",
            materials: [
              "Modèle photographié (4 à 6 objets courants posés sur un plateau)",
              "Objets identiques pour chaque élève",
              "Plateau de travail",
              "Photo du modèle retournée après observation",
            ],
            instruction:
              "Regarde bien le modèle. Maintenant je retourne la photo. Essaie de remettre tes objets exactement pareil.",
            expectedAction:
              "L'élève reproduit l'organisation avec au moins 4 objets correctement positionnés.",
            differentiation:
              "Allègement : modèle visible pendant toute la manipulation. Renforcement : l'élève décrit oralement l'organisation avant de reproduire.",
            status: "in-progress",
            observationGrid: {
              id: "gs-maths-organisation-espace-seq1-atelier1-grille",
              title: "Grille — Reproduire une organisation (GS)",
              teacherUse:
                "Observer la stratégie de mémorisation : l'élève mémorise-t-il objet par objet ou la configuration globale ?",
              status: "upcoming",
              criteria: [
                {
                  id: "crit-gs-maths-espace-1",
                  label: "Reproduit la position de 3 objets sur 5 correctement",
                  levelDescriptor: "Attendu GS début",
                },
                {
                  id: "crit-gs-maths-espace-2",
                  label: "Reproduit la position de tous les objets correctement",
                  levelDescriptor: "Attendu GS",
                },
                {
                  id: "crit-gs-maths-espace-3",
                  label: "Peut décrire oralement la position d'un objet avec un terme relationnel",
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
