// Programme CM1 — Cycle 3
// Structure : Domaine → Sous-domaine → Leçon → Exercices
// Noisette l'Écureuille est guide narratif, pas nœud structurant.
// Fichier isolé : aucune route ne l'importe encore.

import type {
  LevelProgram,
  ProgramDomain,
  ProgramSubdomain,
  ProgramLesson,
  ProgramExercise,
} from "@/content/types-program";

// ── Français ──────────────────────────────────────────────────────────────────

const lectureLessons: ProgramLesson[] = [
  {
    slug: "cm1-francais-lecture-reperer-informations",
    title: "Repérer des informations dans un texte",
    objective:
      "Identifier les informations explicites dans un texte documentaire.",
    skill: "Prélever des informations écrites avec précision.",
    successCriteria: [
      "L'élève repère au moins 3 informations sans paraphraser l'intégralité du texte.",
      "L'élève cite la phrase du texte qui justifie chaque réponse.",
    ],
    parentGuidance: {
      summary:
        "Votre enfant apprend à chercher des informations précises dans un texte sans tout relire.",
      howToHelp: [
        "Lui poser des questions simples sur un article court : « Qui ? Quand ? Où ? »",
        "L'encourager à pointer ou surligner la phrase qui contient la réponse.",
      ],
      successSigns: [
        "Il répond à une question en citant une phrase du texte.",
        "Il ne recopie pas tout le paragraphe, juste l'information demandée.",
      ],
      commonDifficulties: [
        "Vouloir tout relire à chaque question — lui rappeler qu'on peut chercher un mot-clé.",
      ],
    },
    teacherGuidance: {
      teachingFocus: "Distinguer repérage et compréhension globale.",
      differentiation: [
        "Guidance : texte court avec questions en QCM.",
        "Autonomie : texte sans aide, reformulation exigée.",
      ],
      assessmentHints: [
        "Observer si l'élève revient au texte ou répond de mémoire.",
      ],
    },
    exercises: [
      {
        slug: "cm1-francais-lecture-reperer-ex1",
        title: "Questions de repérage",
        instruction:
          "Lis le texte. Réponds aux questions en recopiant uniquement la partie du texte qui contient la réponse.",
        type: "automatismes",
        difficulty: "facile",
        successCriterion: "3 réponses correctes avec citation du texte.",
        correctionHint:
          "Cherche d'abord le mot-clé de la question dans le texte.",
      },
      {
        slug: "cm1-francais-lecture-reperer-ex2",
        title: "Vrai ou faux avec justification",
        instruction:
          "Pour chaque affirmation, indique si elle est vraie ou fausse. Justifie en citant une phrase du texte.",
        type: "raisonnement",
        difficulty: "moyen",
        successCriterion: "Justification avec citation exacte pour chaque réponse.",
        correctionHint:
          "Relis chaque affirmation et cherche dans le texte si elle est confirmée ou contredite.",
      },
    ] satisfies ProgramExercise[],
    linkedMissionSlugs: [],
    printableSupport: true,
    projectionSupport: true,
    status: "upcoming",
  },
  {
    slug: "cm1-francais-lecture-reformuler",
    title: "Reformuler ce qu'on a compris",
    objective: "Reformuler une idée lue avec ses propres mots.",
    skill: "Transformer une information lue en réponse personnelle construite.",
    successCriteria: [
      "L'élève reformule sans recopier la phrase du texte.",
      "La reformulation garde le sens de l'original.",
    ],
    parentGuidance: {
      summary:
        "Votre enfant apprend à expliquer ce qu'il a lu avec ses propres mots plutôt que de tout recopier.",
      howToHelp: [
        "Après une lecture, lui demander : « Explique-moi ce que tu as lu comme si je n'avais pas lu le texte. »",
      ],
      successSigns: [
        "Il résume un paragraphe en une ou deux phrases sans regarder le texte.",
      ],
      commonDifficulties: [
        "Recopier au lieu de reformuler — lui rappeler que reformuler, c'est expliquer avec ses mots.",
      ],
    },
    exercises: [
      {
        slug: "cm1-francais-lecture-reformuler-ex1",
        title: "Reformuler un paragraphe",
        instruction:
          "Lis ce paragraphe. Ferme le livre. Écris en deux phrases ce que tu as compris.",
        type: "expression",
        difficulty: "moyen",
        successCriterion:
          "La reformulation est lisible, complète et n'utilise pas les mêmes mots que le texte.",
      },
    ] satisfies ProgramExercise[],
    linkedMissionSlugs: [],
    printableSupport: true,
    status: "upcoming",
  },
];

const langueLessons: ProgramLesson[] = [
  {
    slug: "cm1-francais-langue-classes-mots",
    title: "Les classes de mots",
    objective: "Identifier les classes de mots dans une phrase simple.",
    skill: "Observer la langue pour classer les mots selon leur rôle.",
    successCriteria: [
      "L'élève identifie correctement nom, verbe, adjectif et déterminant.",
      "L'élève justifie son classement par un critère simple.",
    ],
    parentGuidance: {
      summary:
        "Votre enfant apprend à reconnaître les différents types de mots dans une phrase : noms, verbes, adjectifs, déterminants.",
      howToHelp: [
        "Jouer à « c'est quoi comme mot ? » en lisant un titre de livre ensemble.",
        "Lui demander de trouver tous les verbes d'une phrase de BD.",
      ],
      successSigns: [
        "Il reconnaît et nomme le verbe d'une phrase.",
        "Il distingue un nom d'un adjectif.",
      ],
      commonDifficulties: [
        "Confondre nom et adjectif — rappeler : le nom désigne une chose ou une personne, l'adjectif la décrit.",
      ],
    },
    teacherGuidance: {
      teachingFocus:
        "Ancrer le classement sur des critères sémantiques ET morphologiques.",
      differentiation: [
        "Guidance : étiquettes à trier par catégorie sur un support papier.",
        "Autonomie : identifier les classes dans un texte inconnu.",
      ],
      assessmentHints: [
        "Faire justifier à l'oral : « Pourquoi c'est un nom ? »",
      ],
    },
    exercises: [
      {
        slug: "cm1-francais-langue-classes-ex1",
        title: "Trier les mots",
        instruction:
          "Classe les mots suivants dans le tableau : nom / verbe / adjectif / déterminant.",
        type: "automatismes",
        difficulty: "facile",
        successCriterion: "12 mots classés correctement sur 15.",
        correctionHint:
          "Le verbe indique une action ou un état. Le déterminant accompagne toujours un nom.",
      },
      {
        slug: "cm1-francais-langue-classes-ex2",
        title: "Identifier dans une phrase",
        instruction:
          "Souligne les noms en bleu, les verbes en rouge et les adjectifs en vert dans chaque phrase.",
        type: "application",
        difficulty: "moyen",
        successCriterion: "Toutes les occurrences identifiées correctement.",
        correctionHint:
          "Le nom peut être précédé d'un déterminant (le, la, un, une…).",
      },
      {
        slug: "cm1-francais-langue-classes-ex3",
        title: "Inventer une phrase",
        instruction:
          "Invente une phrase qui contient exactement : 1 déterminant, 1 nom, 1 verbe, 1 adjectif.",
        type: "expression",
        difficulty: "moyen",
        successCriterion:
          "La phrase est grammaticalement correcte et contient les 4 classes demandées.",
      },
    ] satisfies ProgramExercise[],
    linkedMissionSlugs: [],
    printableSupport: true,
    projectionSupport: true,
    status: "upcoming",
  },
  {
    slug: "cm1-francais-langue-accord-gn",
    title: "L'accord dans le groupe nominal",
    objective: "Appliquer les règles d'accord en genre et en nombre dans le groupe nominal.",
    skill: "Maîtriser les accords du déterminant et de l'adjectif avec le nom.",
    successCriteria: [
      "L'élève accorde correctement déterminant, nom et adjectif.",
      "L'élève identifie et corrige une erreur d'accord dans une phrase.",
    ],
    exercises: [
      {
        slug: "cm1-francais-langue-accord-ex1",
        title: "Corriger les accords",
        instruction:
          "Lis ces groupes nominaux. Certains contiennent une erreur d'accord. Trouve et corrige les erreurs.",
        type: "application",
        difficulty: "moyen",
        successCriterion: "Toutes les erreurs repérées et corrigées.",
        correctionHint:
          "L'adjectif s'accorde en genre et en nombre avec le nom qu'il accompagne.",
      },
    ] satisfies ProgramExercise[],
    linkedMissionSlugs: [],
    status: "upcoming",
  },
];

const ecritureLessons: ProgramLesson[] = [
  {
    slug: "cm1-francais-ecriture-organiser-texte",
    title: "Organiser un texte en paragraphes",
    objective: "Structurer une production écrite courte en paragraphes distincts.",
    skill: "Planifier et rédiger un texte organisé.",
    successCriteria: [
      "L'élève produit un texte d'au moins 3 paragraphes distincts.",
      "Chaque paragraphe développe une seule idée.",
    ],
    parentGuidance: {
      summary:
        "Votre enfant apprend à organiser ses idées avant d'écrire, en les regroupant par thème dans des paragraphes.",
      howToHelp: [
        "Lui demander de lister 3 idées sur un sujet avant d'écrire quoi que ce soit.",
        "Montrer comment un article de journal est découpé en paragraphes.",
      ],
      successSigns: [
        "Il fait un brouillon avec des idées numérotées avant d'écrire.",
        "Son texte commence par une introduction et se termine par une conclusion.",
      ],
      commonDifficulties: [
        "Écrire d'un seul bloc sans paragraphe — lui rappeler qu'un paragraphe = une idée.",
      ],
    },
    exercises: [
      {
        slug: "cm1-francais-ecriture-organiser-ex1",
        title: "Remettre des paragraphes en ordre",
        instruction:
          "Les paragraphes de ce texte ont été mélangés. Remets-les dans l'ordre logique.",
        type: "raisonnement",
        difficulty: "facile",
        successCriterion: "Ordre correct avec justification orale possible.",
      },
    ] satisfies ProgramExercise[],
    linkedMissionSlugs: [],
    projectionSupport: true,
    status: "upcoming",
  },
];

const francaisSubdomains: ProgramSubdomain[] = [
  {
    slug: "cm1-francais-lecture",
    title: "Lecture et compréhension",
    description:
      "Lire des textes variés avec compréhension, repérer les informations et reformuler.",
    lessons: lectureLessons,
    status: "upcoming",
  },
  {
    slug: "cm1-francais-ecriture",
    title: "Écriture et production",
    description: "Écrire des textes courts organisés, adaptés à la situation.",
    lessons: ecritureLessons,
    status: "upcoming",
  },
  {
    slug: "cm1-francais-langue",
    title: "Étude de la langue",
    description:
      "Grammaire, orthographe, conjugaison et lexique au service de la lecture et de l'écriture.",
    lessons: langueLessons,
    status: "upcoming",
  },
];

const domainFrancais: ProgramDomain = {
  slug: "cm1-francais",
  title: "Français",
  officialLabel: "Français — Cycle 3",
  description: "Lire, comprendre, écrire et observer la langue.",
  subdomains: francaisSubdomains,
  status: "upcoming",
};

// ── Mathématiques ─────────────────────────────────────────────────────────────

const mathsNombresLessons: ProgramLesson[] = [
  {
    slug: "cm1-maths-nombres-grands-nombres",
    title: "Lire et écrire les grands nombres",
    objective: "Lire, écrire et ranger des entiers jusqu'à 1 000 000.",
    skill: "Maîtriser la numération décimale de position.",
    successCriteria: [
      "L'élève lit correctement un nombre à 6 chiffres à voix haute.",
      "L'élève range 5 nombres dans l'ordre croissant.",
      "L'élève identifie le rang de chaque chiffre (unités, dizaines, centaines…).",
    ],
    parentGuidance: {
      summary:
        "Votre enfant s'entraîne à lire et écrire les grands nombres, jusqu'au million.",
      howToHelp: [
        "Lire ensemble des prix, distances ou populations dans un journal ou sur une carte.",
        "Demander : « Ce nombre a combien de chiffres ? Comment on le lit ? »",
      ],
      successSigns: [
        "Il lit à voix haute un nombre à 6 chiffres sans hésiter.",
        "Il sait que 100 000 = cent mille.",
      ],
      commonDifficulties: [
        "Oublier le nom des classes (unités, milliers) — s'aider d'un tableau de numération.",
      ],
    },
    teacherGuidance: {
      teachingFocus:
        "Utiliser le tableau de numération comme outil de référence systématique.",
      differentiation: [
        "Guidance : tableau de numération fourni avec les noms des rangs.",
        "Autonomie : dicter les nombres sans support écrit.",
      ],
      assessmentHints: [
        "Vérifier la lecture orale : le passage des milliers est souvent le point de blocage.",
      ],
    },
    exercises: [
      {
        slug: "cm1-maths-nombres-grands-ex1",
        title: "Lire à voix haute",
        instruction:
          "Lis ces nombres et écris-les en toutes lettres : 250 000 / 1 034 500 / 800 012.",
        type: "automatismes",
        difficulty: "facile",
        successCriterion: "3 nombres écrits sans erreur de classe.",
        correctionHint:
          "Sépare d'abord les chiffres par groupes de 3 en partant de la droite.",
      },
      {
        slug: "cm1-maths-nombres-grands-ex2",
        title: "Ranger dans l'ordre",
        instruction:
          "Range ces nombres du plus petit au plus grand : 45 300 / 450 000 / 4 530 / 453 000.",
        type: "application",
        difficulty: "moyen",
        successCriterion: "Classement correct avec indication du rang de chaque nombre.",
        correctionHint:
          "Compare d'abord le nombre de chiffres de chaque nombre.",
      },
    ] satisfies ProgramExercise[],
    linkedMissionSlugs: [],
    printableSupport: true,
    projectionSupport: true,
    status: "upcoming",
  },
  {
    slug: "cm1-maths-nombres-fractions-simples",
    title: "Découvrir les fractions simples",
    objective: "Comprendre et représenter une fraction simple (½, ¼, ¾).",
    skill: "Lire et représenter une fraction comme partie d'un tout.",
    successCriteria: [
      "L'élève représente ½, ¼ et ¾ sur un schéma.",
      "L'élève place une fraction simple sur une droite numérique.",
    ],
    parentGuidance: {
      summary:
        "Votre enfant découvre les fractions : une moitié, un quart, trois quarts.",
      howToHelp: [
        "Couper une pomme ou une feuille en deux parts égales et demander comment on appelle chaque part.",
        "Regarder des recettes ensemble et repérer les mesures en fractions.",
      ],
      successSigns: [
        "Il reconnaît ½, ¼ et ¾ à l'oral et à l'écrit.",
        "Il peut placer une fraction simple sur une bande numérique.",
      ],
      commonDifficulties: [
        "Penser que ¼ est plus grand que ½ parce que 4 > 2 — rappeler : le bas indique le nombre de parts au total.",
      ],
    },
    exercises: [
      {
        slug: "cm1-maths-fractions-ex1",
        title: "Colorier la bonne part",
        instruction:
          "Colorie la fraction indiquée dans chaque figure : ½ du rectangle / ¼ du carré / ¾ du cercle.",
        type: "application",
        difficulty: "facile",
        successCriterion: "3 figures correctement coloriées.",
        correctionHint:
          "Commence par diviser la figure en parts égales, puis colorie le nombre indiqué en haut de la fraction.",
      },
      {
        slug: "cm1-maths-fractions-ex2",
        title: "Placer sur la droite numérique",
        instruction: "Place ½ et ¼ sur la droite numérique entre 0 et 1.",
        type: "raisonnement",
        difficulty: "moyen",
        successCriterion: "Les deux fractions sont placées correctement et dans le bon ordre.",
      },
    ] satisfies ProgramExercise[],
    linkedMissionSlugs: [],
    printableSupport: true,
    status: "upcoming",
  },
  {
    slug: "cm1-maths-nombres-calcul-mental-strategies",
    title: "Choisir une stratégie de calcul mental",
    objective: "Mobiliser une stratégie adaptée pour calculer mentalement.",
    skill: "Expliciter et justifier une procédure de calcul mental.",
    successCriteria: [
      "L'élève nomme la stratégie utilisée (décomposer, arrondir, doubler…).",
      "L'élève obtient le bon résultat en moins de 30 secondes.",
    ],
    teacherGuidance: {
      teachingFocus:
        "Valoriser l'explicitation de la stratégie autant que le résultat.",
      differentiation: [
        "Guidance : liste des stratégies affichée au tableau.",
        "Défi : proposer plusieurs stratégies pour un même calcul et les comparer.",
      ],
    },
    exercises: [
      {
        slug: "cm1-maths-calcul-mental-ex1",
        title: "Calcul rapide et justification",
        instruction:
          "Calcule mentalement, puis explique ta stratégie : 48 + 37 / 75 − 29 / 6 × 8.",
        type: "automatismes",
        difficulty: "moyen",
        successCriterion:
          "Résultat correct ET stratégie nommée pour chaque calcul.",
        correctionHint:
          "Pour 48 + 37, tu peux arrondir 48 à 50, calculer 50 + 37 = 87, puis retirer 2.",
      },
    ] satisfies ProgramExercise[],
    linkedMissionSlugs: [],
    projectionSupport: true,
    status: "upcoming",
  },
];

const mathsProblLessons: ProgramLesson[] = [
  {
    slug: "cm1-maths-problemes-lire-consigne",
    title: "Lire une consigne de problème",
    objective: "Identifier les données utiles et la question dans un énoncé.",
    skill: "Analyser un problème avant de calculer.",
    successCriteria: [
      "L'élève distingue les données utiles des informations inutiles.",
      "L'élève reformule la question avec ses propres mots avant de calculer.",
    ],
    parentGuidance: {
      summary:
        "Votre enfant apprend à lire un problème de maths deux fois : une pour comprendre, une pour identifier ce qu'on lui demande.",
      howToHelp: [
        "En cas de blocage, demander : « Qu'est-ce qu'on te demande de trouver ? » avant « Qu'est-ce que tu calcules ? »",
      ],
      successSigns: [
        "Il souligne ou entoure la question avant d'écrire quoi que ce soit.",
        "Il peut expliquer le problème avec ses propres mots.",
      ],
      commonDifficulties: [
        "Calculer dès la première lecture — insister sur la lecture active avant tout calcul.",
      ],
    },
    teacherGuidance: {
      teachingFocus:
        "Séparer explicitement la phase de lecture-compréhension de la phase de résolution.",
      assessmentHints: [
        "Faire lire l'énoncé à voix haute avant toute tentative de calcul.",
      ],
    },
    exercises: [
      {
        slug: "cm1-maths-prob-consigne-ex1",
        title: "Trier les informations",
        instruction:
          "Lis ce problème. Souligne la question. Entoure les nombres utiles. Barre les informations inutiles.",
        type: "raisonnement",
        difficulty: "facile",
        successCriterion:
          "Question identifiée, données utiles entourées, informations inutiles barrées.",
        correctionHint:
          "La question est souvent la dernière phrase. Elle commence souvent par « Combien… » ou « Quelle… »",
      },
      {
        slug: "cm1-maths-prob-consigne-ex2",
        title: "Reformuler le problème",
        instruction:
          "Lis ce problème. Sans calculer, explique avec tes propres mots ce qu'on te demande de trouver.",
        type: "expression",
        difficulty: "facile",
        successCriterion: "La reformulation est correcte et ne contient pas encore de calcul.",
      },
    ] satisfies ProgramExercise[],
    linkedMissionSlugs: [],
    printableSupport: true,
    projectionSupport: true,
    status: "upcoming",
  },
  {
    slug: "cm1-maths-problemes-choisir-operation",
    title: "Choisir l'opération",
    objective: "Associer une situation à une opération et justifier le choix.",
    skill: "Modéliser une situation mathématique.",
    successCriteria: [
      "L'élève choisit la bonne opération et justifie son choix.",
      "L'élève pose et calcule l'opération correctement.",
    ],
    exercises: [
      {
        slug: "cm1-maths-operation-ex1",
        title: "Quelle opération ?",
        instruction:
          "Pour chaque situation, écris l'opération à utiliser (+ / − / × / ÷) et explique pourquoi.",
        type: "raisonnement",
        difficulty: "moyen",
        successCriterion:
          "Opération correcte et justification en une phrase pour chaque situation.",
        correctionHint:
          "Demande-toi : est-ce qu'on regroupe, on partage, on compare ou on distribue ?",
      },
    ] satisfies ProgramExercise[],
    linkedMissionSlugs: [],
    status: "upcoming",
  },
];

const mathsGrandeursLessons: ProgramLesson[] = [
  {
    slug: "cm1-maths-grandeurs-durees",
    title: "Calculer des durées",
    objective: "Calculer la durée entre deux instants.",
    skill: "Manipuler les unités de temps et calculer des intervalles.",
    successCriteria: [
      "L'élève convertit minutes et heures correctement.",
      "L'élève calcule une durée entre deux horaires donnés.",
    ],
    exercises: [
      {
        slug: "cm1-maths-grandeurs-durees-ex1",
        title: "Calculer une durée",
        instruction:
          "Un film commence à 14h30 et se termine à 16h15. Quelle est sa durée ?",
        type: "application",
        difficulty: "moyen",
        successCriterion: "Durée correcte exprimée en heures et minutes.",
        correctionHint:
          "Calcule d'abord les minutes jusqu'à l'heure suivante, puis les heures entières.",
      },
    ] satisfies ProgramExercise[],
    linkedMissionSlugs: [],
    status: "upcoming",
  },
];

const mathsGeomLessons: ProgramLesson[] = [
  {
    slug: "cm1-maths-geometrie-symetrie",
    title: "La symétrie axiale",
    objective: "Reconnaître et construire le symétrique d'une figure par rapport à un axe.",
    skill: "Utiliser l'axe de symétrie pour construire ou vérifier une figure.",
    successCriteria: [
      "L'élève identifie si une figure est symétrique.",
      "L'élève construit le symétrique d'un point par rapport à un axe.",
    ],
    exercises: [
      {
        slug: "cm1-maths-geometrie-symetrie-ex1",
        title: "Compléter la figure symétrique",
        instruction:
          "Complète la figure en construisant son symétrique par rapport à l'axe tracé.",
        type: "application",
        difficulty: "moyen",
        successCriterion:
          "La figure complétée est visuellement symétrique et les distances sont respectées.",
        correctionHint:
          "Chaque point du symétrique est à la même distance de l'axe que le point d'origine.",
      },
    ] satisfies ProgramExercise[],
    linkedMissionSlugs: [],
    printableSupport: true,
    status: "upcoming",
  },
];

const mathsSubdomains: ProgramSubdomain[] = [
  {
    slug: "cm1-maths-nombres",
    title: "Nombres et calcul",
    description:
      "Grands nombres jusqu'à 1 000 000, fractions simples, calcul mental et opérations.",
    lessons: mathsNombresLessons,
    status: "upcoming",
  },
  {
    slug: "cm1-maths-problemes",
    title: "Résolution de problèmes",
    description:
      "Modéliser une situation, choisir une opération, vérifier le résultat.",
    lessons: mathsProblLessons,
    status: "upcoming",
  },
  {
    slug: "cm1-maths-grandeurs",
    title: "Grandeurs et mesures",
    description: "Longueurs, masses, durées, périmètres.",
    lessons: mathsGrandeursLessons,
    status: "upcoming",
  },
  {
    slug: "cm1-maths-geometrie",
    title: "Espace et géométrie",
    description: "Constructions, symétrie, repérage dans le plan.",
    lessons: mathsGeomLessons,
    status: "upcoming",
  },
];

const domainMaths: ProgramDomain = {
  slug: "cm1-mathematiques",
  title: "Mathématiques",
  officialLabel: "Mathématiques — Cycle 3",
  description:
    "Calculer, raisonner, mesurer et se repérer dans l'espace.",
  subdomains: mathsSubdomains,
  status: "upcoming",
};

// ── Géographie ────────────────────────────────────────────────────────────────

const geoEspacesLessons: ProgramLesson[] = [
  {
    slug: "cm1-geo-carte-lire-legende",
    title: "Lire une légende de carte",
    objective:
      "Déchiffrer les symboles d'une carte et les relier aux espaces réels.",
    skill: "Lire et utiliser les éléments d'une légende cartographique.",
    successCriteria: [
      "L'élève identifie 5 symboles de la légende sans aide.",
      "L'élève décrit un espace en utilisant uniquement les informations de la carte.",
    ],
    parentGuidance: {
      summary:
        "Votre enfant apprend à lire une carte — pas seulement la regarder, mais comprendre ce que chaque couleur et symbole représente.",
      howToHelp: [
        "Sortir un plan de ville ou une carte routière et lui demander de trouver la légende.",
        "Regarder ensemble Google Maps et lui demander ce que les couleurs et icônes signifient.",
      ],
      successSigns: [
        "Il explique spontanément ce que représente un symbole de carte.",
        "Il utilise les points cardinaux pour situer un endroit.",
      ],
      commonDifficulties: [
        "Ignorer la légende et « deviner » — insister : une carte ne se comprend pas sans lire sa légende.",
      ],
    },
    teacherGuidance: {
      teachingFocus:
        "Partir d'une carte connue (ville de l'élève ou carte de France) avant les cartes inconnues.",
      differentiation: [
        "Guidance : légende simplifiée avec seulement 5 symboles.",
        "Défi : comparer deux cartes d'un même territoire à des dates différentes.",
      ],
    },
    exercises: [
      {
        slug: "cm1-geo-carte-legende-ex1",
        title: "Identifier les symboles",
        instruction:
          "Observe la carte. Trouve le symbole qui représente une forêt, une route nationale et une ville importante. Utilise uniquement la légende.",
        type: "automatismes",
        difficulty: "facile",
        successCriterion:
          "3 symboles identifiés correctement en s'aidant uniquement de la légende.",
        correctionHint:
          "La légende est dans l'encadré. Cherche la correspondance couleur/forme.",
      },
      {
        slug: "cm1-geo-carte-legende-ex2",
        title: "Décrire un trajet",
        instruction:
          "Décris le trajet de la ville A à la ville B en utilisant au moins 3 éléments de la légende.",
        type: "expression",
        difficulty: "moyen",
        successCriterion:
          "Description avec 3 éléments légendés et la direction mentionnée.",
        correctionHint:
          "Commence par repérer les deux villes, puis cherche les routes ou obstacles entre elles.",
      },
    ] satisfies ProgramExercise[],
    linkedMissionSlugs: [],
    printableSupport: true,
    projectionSupport: true,
    status: "upcoming",
  },
  {
    slug: "cm1-geo-carte-localiser-situer",
    title: "Localiser et situer",
    objective:
      "Utiliser les points cardinaux et des repères pour localiser un lieu.",
    skill: "Se repérer dans l'espace à l'aide d'une carte.",
    successCriteria: [
      "L'élève utilise les 4 points cardinaux correctement.",
      "L'élève localise un lieu en combinant direction et distance approximative.",
    ],
    exercises: [
      {
        slug: "cm1-geo-carte-localiser-ex1",
        title: "Points cardinaux",
        instruction:
          "Sur cette carte de France, indique dans quelle direction se trouve chaque ville par rapport à Paris : Lyon / Brest / Lille / Marseille.",
        type: "automatismes",
        difficulty: "facile",
        successCriterion: "4 directions correctes.",
        correctionHint:
          "Nord = vers le haut de la carte, Sud = vers le bas, Est = droite, Ouest = gauche.",
      },
    ] satisfies ProgramExercise[],
    linkedMissionSlugs: [],
    printableSupport: true,
    status: "upcoming",
  },
];

const geoTerritoireLessons: ProgramLesson[] = [
  {
    slug: "cm1-geo-territoire-paysages-france",
    title: "Les grands paysages de France",
    objective: "Identifier et caractériser les principaux types de paysages en France.",
    skill: "Lire et décrire un paysage à partir d'une photographie ou d'une carte.",
    successCriteria: [
      "L'élève cite au moins 3 types de paysages (montagne, littoral, plaine, forêt).",
      "L'élève relie un paysage à une région de France.",
    ],
    parentGuidance: {
      summary:
        "Votre enfant découvre les différents paysages de France : montagnes, côtes, plaines, forêts.",
      howToHelp: [
        "Regarder ensemble des photos de paysages lors de voyages ou sur internet et les nommer.",
        "Chercher sur une carte où se trouvent les Alpes, les Pyrénées ou le littoral atlantique.",
      ],
      successSigns: [
        "Il reconnaît un paysage de montagne, de littoral ou de plaine.",
        "Il peut situer les Alpes et les Pyrénées sur une carte.",
      ],
      commonDifficulties: [
        "Confondre région et paysage — lui rappeler qu'une région peut avoir plusieurs paysages différents.",
      ],
    },
    exercises: [
      {
        slug: "cm1-geo-territoire-paysages-ex1",
        title: "Associer photo et paysage",
        instruction:
          "Associe chaque photographie à son type de paysage : montagne / littoral / plaine / forêt.",
        type: "automatismes",
        difficulty: "facile",
        successCriterion: "4 associations correctes.",
      },
    ] satisfies ProgramExercise[],
    linkedMissionSlugs: [],
    printableSupport: true,
    projectionSupport: true,
    status: "upcoming",
  },
];

const geoMobilitesLessons: ProgramLesson[] = [
  {
    slug: "cm1-geo-mobilites-se-deplacer",
    title: "Se déplacer en France",
    objective: "Identifier les principaux moyens de transport et les réseaux de déplacement.",
    skill: "Lire un réseau de transport sur une carte.",
    successCriteria: [
      "L'élève cite les principaux modes de transport (train, avion, voiture, bateau).",
      "L'élève lit un réseau ferroviaire simple sur une carte.",
    ],
    exercises: [
      {
        slug: "cm1-geo-mobilites-transport-ex1",
        title: "Quel moyen de transport ?",
        instruction:
          "Pour chaque trajet proposé, indique quel moyen de transport te semble le plus adapté et explique pourquoi.",
        type: "raisonnement",
        difficulty: "facile",
        successCriterion:
          "Choix cohérent avec justification (distance, temps, accès).",
      },
    ] satisfies ProgramExercise[],
    linkedMissionSlugs: [],
    status: "upcoming",
  },
];

const geoSubdomains: ProgramSubdomain[] = [
  {
    slug: "cm1-geo-espaces",
    title: "Lire des espaces habités",
    description: "Cartes, plans, légendes — habiter en France.",
    lessons: geoEspacesLessons,
    status: "upcoming",
  },
  {
    slug: "cm1-geo-territoire",
    title: "Comprendre un territoire",
    description: "Paysages, ressources et organisation du territoire français.",
    lessons: geoTerritoireLessons,
    status: "upcoming",
  },
  {
    slug: "cm1-geo-mobilites",
    title: "Se déplacer et se repérer",
    description: "Échelles, itinéraires, réseaux de transport.",
    lessons: geoMobilitesLessons,
    status: "upcoming",
  },
];

const domainGeo: ProgramDomain = {
  slug: "cm1-geographie",
  title: "Géographie",
  officialLabel: "Géographie — Cycle 3",
  description:
    "Lire des cartes, comprendre les espaces habités et les mobilités en France.",
  subdomains: geoSubdomains,
  status: "upcoming",
};

// ── Histoire ──────────────────────────────────────────────────────────────────

const histPrehistoireLessons: ProgramLesson[] = [
  {
    slug: "cm1-histoire-prehistoire-homo-sapiens",
    title: "Les premiers êtres humains",
    objective: "Situer l'apparition d'Homo sapiens sur une frise chronologique.",
    skill: "Lire et utiliser une frise chronologique.",
    successCriteria: [
      "L'élève place Homo sapiens sur la frise avec une marge d'erreur acceptable.",
      "L'élève cite au moins deux caractéristiques des hommes préhistoriques.",
    ],
    parentGuidance: {
      summary:
        "Votre enfant commence l'histoire de l'humanité : les premiers hommes, leurs outils, leurs peintures.",
      howToHelp: [
        "Regarder ensemble des images de la grotte de Lascaux ou d'Altamira.",
        "Lui demander : « Pourquoi tu penses qu'ils ont peint des animaux ? »",
      ],
      successSigns: [
        "Il situe la Préhistoire « avant l'Antiquité » sur la frise.",
        "Il associe taille du silex ou peintures rupestres à la Préhistoire.",
      ],
      commonDifficulties: [
        "Confondre les grandes périodes — afficher une frise visible à son bureau.",
      ],
    },
    teacherGuidance: {
      teachingFocus:
        "Ancrer la chronologie sur des repères concrets avant les dates abstraites.",
      differentiation: [
        "Guidance : frise avec images illustrant chaque période.",
        "Autonomie : construire sa propre frise à partir d'un tableau de dates.",
      ],
    },
    exercises: [
      {
        slug: "cm1-hist-prehistoire-frise-ex1",
        title: "Placer sur la frise",
        instruction:
          "Place ces événements sur la frise dans le bon ordre : apparition d'Homo sapiens / invention de l'écriture / construction des pyramides d'Égypte.",
        type: "automatismes",
        difficulty: "facile",
        successCriterion: "3 événements placés dans le bon ordre chronologique.",
        correctionHint:
          "L'écriture est inventée bien après les premières peintures rupestres.",
      },
      {
        slug: "cm1-hist-prehistoire-frise-ex2",
        title: "Caractériser la Préhistoire",
        instruction:
          "Parmi ces éléments, entoure ceux qui correspondent à la Préhistoire : écriture / silex taillé / ordinateur / feu / château fort / peintures rupestres.",
        type: "application",
        difficulty: "facile",
        successCriterion: "Silex taillé, feu et peintures rupestres identifiés.",
      },
    ] satisfies ProgramExercise[],
    linkedMissionSlugs: [],
    printableSupport: true,
    projectionSupport: true,
    status: "upcoming",
  },
  {
    slug: "cm1-histoire-antiquite-egypte",
    title: "L'Égypte ancienne",
    objective:
      "Identifier les caractéristiques principales de la civilisation égyptienne.",
    skill: "Lire et interpréter un document historique simple.",
    successCriteria: [
      "L'élève cite au moins 3 caractéristiques de l'Égypte ancienne.",
      "L'élève situe l'Égypte dans le temps et dans l'espace.",
    ],
    exercises: [
      {
        slug: "cm1-hist-egypte-ex1",
        title: "Analyser une image historique",
        instruction:
          "Observe cette image d'une pyramide égyptienne. Décris ce que tu vois. Pourquoi a-t-elle été construite ?",
        type: "expression",
        difficulty: "facile",
        successCriterion:
          "Description précise et hypothèse sur la fonction de la pyramide.",
        correctionHint:
          "Regarde la forme, la taille et l'environnement. Pense à ce que tu sais des pharaons.",
      },
    ] satisfies ProgramExercise[],
    linkedMissionSlugs: [],
    projectionSupport: true,
    status: "upcoming",
  },
];

const histMoyenAgeLessons: ProgramLesson[] = [
  {
    slug: "cm1-histoire-moyen-age-charlemagne",
    title: "Charlemagne et l'Empire carolingien",
    objective: "Situer Charlemagne dans le Moyen Âge et comprendre son rôle.",
    skill: "Lire un document historique et identifier les informations clés.",
    successCriteria: [
      "L'élève situe Charlemagne sur la frise chronologique.",
      "L'élève explique ce qu'est un empire en une phrase.",
    ],
    parentGuidance: {
      summary:
        "Votre enfant apprend à connaître Charlemagne, un roi qui est devenu empereur et qui a organisé son empire il y a plus de 1 000 ans.",
      howToHelp: [
        "Lui montrer sur une carte l'étendue de l'Empire carolingien.",
        "Lui demander : « Qu'est-ce qui change quand on passe de roi à empereur ? »",
      ],
      successSigns: [
        "Il sait que Charlemagne est couronné en l'an 800.",
        "Il cite au moins une chose que Charlemagne a organisée (école, monnaie, comtes).",
      ],
      commonDifficulties: [
        "Confondre roi et empereur — rappeler qu'un empire regroupe plusieurs royaumes.",
      ],
    },
    exercises: [
      {
        slug: "cm1-hist-moyen-age-charlemagne-ex1",
        title: "Placer Charlemagne sur la frise",
        instruction:
          "Place la date 800 (couronnement de Charlemagne) sur ta frise du Moyen Âge.",
        type: "automatismes",
        difficulty: "facile",
        successCriterion: "Date placée correctement dans la première moitié du Moyen Âge.",
      },
    ] satisfies ProgramExercise[],
    linkedMissionSlugs: [],
    status: "upcoming",
  },
  {
    slug: "cm1-histoire-moyen-age-cathedrales",
    title: "Les cathédrales au Moyen Âge",
    objective: "Comprendre la place de la religion et de l'art dans la société médiévale.",
    skill: "Lire une image ou un document sur un monument historique.",
    successCriteria: [
      "L'élève décrit une cathédrale et ses principales caractéristiques architecturales.",
      "L'élève explique pourquoi on construisait des cathédrales au Moyen Âge.",
    ],
    exercises: [
      {
        slug: "cm1-hist-cathedrales-ex1",
        title: "Décrire une cathédrale",
        instruction:
          "Observe la photographie de cette cathédrale. Décris au moins 3 de ses caractéristiques.",
        type: "expression",
        difficulty: "facile",
        successCriterion:
          "3 caractéristiques correctes (vitraux, tours, portail, voûtes, etc.).",
      },
    ] satisfies ProgramExercise[],
    linkedMissionSlugs: [],
    projectionSupport: true,
    status: "upcoming",
  },
];

const histTempsModernesLessons: ProgramLesson[] = [
  {
    slug: "cm1-histoire-temps-modernes-grandes-decouvertes",
    title: "Les grandes découvertes",
    objective:
      "Comprendre ce que sont les grandes découvertes et leurs conséquences.",
    skill: "Situer un événement historique et le relier à ses causes.",
    successCriteria: [
      "L'élève cite au moins 2 explorateurs et leurs destinations.",
      "L'élève explique pourquoi l'Europe cherchait de nouvelles routes.",
    ],
    parentGuidance: {
      summary:
        "Votre enfant étudie les explorateurs du XVe–XVIe siècle qui ont « découvert » de nouveaux continents.",
      howToHelp: [
        "Regarder ensemble sur un globe ou une carte les routes empruntées par Colomb ou Vasco de Gama.",
        "Lui demander : « Pourquoi les Européens partaient-ils si loin ? »",
      ],
      successSigns: [
        "Il cite Christophe Colomb, Vasco de Gama ou Magellan.",
        "Il situe les dates des grandes découvertes dans les Temps modernes.",
      ],
      commonDifficulties: [
        "Confondre « découvrir » et « coloniser » — expliquer que ces terres étaient déjà habitées.",
      ],
    },
    exercises: [
      {
        slug: "cm1-hist-decouvertes-ex1",
        title: "Associer explorateur et destination",
        instruction:
          "Relie chaque explorateur à sa destination : Christophe Colomb / Vasco de Gama / Magellan.",
        type: "automatismes",
        difficulty: "facile",
        successCriterion: "3 associations correctes.",
      },
    ] satisfies ProgramExercise[],
    linkedMissionSlugs: [],
    printableSupport: true,
    projectionSupport: true,
    status: "upcoming",
  },
];

const histoireSubdomains: ProgramSubdomain[] = [
  {
    slug: "cm1-histoire-prehistoire-antiquite",
    title: "La Préhistoire et l'Antiquité",
    description:
      "Des premiers hommes aux grandes civilisations méditerranéennes.",
    lessons: histPrehistoireLessons,
    status: "upcoming",
  },
  {
    slug: "cm1-histoire-moyen-age",
    title: "Le Moyen Âge",
    description:
      "De Charlemagne aux cathédrales : organisation, religion et société médiévale.",
    lessons: histMoyenAgeLessons,
    status: "upcoming",
  },
  {
    slug: "cm1-histoire-temps-modernes",
    title: "Les Temps modernes",
    description: "Grandes découvertes, Renaissance, XVIe–XVIIe siècle.",
    lessons: histTempsModernesLessons,
    status: "upcoming",
  },
];

const domainHistoire: ProgramDomain = {
  slug: "cm1-histoire",
  title: "Histoire",
  officialLabel: "Histoire — Cycle 3",
  description:
    "Construire des repères chronologiques de la Préhistoire aux Temps modernes.",
  subdomains: histoireSubdomains,
  status: "upcoming",
};

// ── Export principal ───────────────────────────────────────────────────────────

export const cm1Program: LevelProgram = {
  slug: "cm1",
  label: "CM1",
  cycle: "cycle-3",
  guideCharacter: "noisette",
  guideNarrativeRole:
    "Collectrice d'indices documentaires : elle classe, relie, lit des cartes, organise les indices et construit des réponses.",
  domains: [domainFrancais, domainMaths, domainGeo, domainHistoire],
};
