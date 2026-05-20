// Compétences CP — Cycle 2, primaire.
// Source canonique des compétences observables du niveau CP.
// Règle : le site organise ; les PDF enseigneront les notions en détail.
// Aucune ressource fictive — tous les slots sont "planned" jusqu'à production réelle.

import type {
  LearningCompetency,
  ResourceSlot,
} from "@/content/learning-architecture-types";

// ── Slots de ressources prévus (communs à toutes les compétences) ─────────────

const PLANNED: ResourceSlot[] = [
  { kind: "lesson-pdf",      label: "Leçon PDF" },
  { kind: "exercises-pdf",   label: "Exercices PDF" },
  { kind: "correction-pdf",  label: "Correction PDF" },
  { kind: "assessment-pdf",  label: "Évaluation PDF" },
  { kind: "projectable-pdf", label: "Support projetable" },
  { kind: "parent-sheet-pdf", label: "Fiche parent" },
];

export const cpCompetencies: LearningCompetency[] = [

  // ════════════════════════════════════════════════════════════════════════════
  // FRANÇAIS — Lecture et décodage
  // ════════════════════════════════════════════════════════════════════════════

  {
    id: "cp-fr-dec-graphemes-phonemes",
    slug: "identifier-correspondances-graphemes-phonemes",
    levelSlug: "cp",
    cycle: "cycle-2",
    subject: "Français",
    subjectLabel: "Français",
    domainSlug: "francais",
    subdomainSlug: "decodage",
    title: "Identifier les correspondances graphèmes-phonèmes",
    observableObjective:
      "Associer une lettre ou un groupe de lettres au son correspondant.",
    successCriteria: [
      "Je reconnais le son produit par une lettre seule.",
      "Je reconnais les sons des digrammes fréquents (ou, on, an, in…).",
      "Je peux nommer le graphème quand j'entends le phonème.",
    ],
    officialReference: "Cycle 2 — Lecture et compréhension de l'écrit",
    status: "upcoming",
    lessonIds: [],
    resourceSlots: PLANNED,
    sequence: {
      id: "seq-cp-fr-dec-graphemes-phonemes",
      competencyId: "cp-fr-dec-graphemes-phonemes",
      title: "Du son à la lettre",
      status: "upcoming",
      steps: [],
    },
  },

  {
    id: "cp-fr-dec-fusionner-syllabes",
    slug: "fusionner-des-sons-pour-lire-des-syllabes",
    levelSlug: "cp",
    cycle: "cycle-2",
    subject: "Français",
    subjectLabel: "Français",
    domainSlug: "francais",
    subdomainSlug: "decodage",
    title: "Fusionner des sons pour lire des syllabes",
    observableObjective:
      "Assembler deux phonèmes connus pour produire une syllabe lue à voix haute.",
    successCriteria: [
      "Je fusionne consonne + voyelle pour lire une syllabe.",
      "Je lis la syllabe sans décomposer chaque son séparément.",
      "Je reconnais la syllabe dans un mot simple.",
    ],
    officialReference: "Cycle 2 — Lecture et compréhension de l'écrit",
    status: "upcoming",
    lessonIds: [],
    resourceSlots: PLANNED,
    sequence: {
      id: "seq-cp-fr-dec-fusionner-syllabes",
      competencyId: "cp-fr-dec-fusionner-syllabes",
      title: "Assembler pour lire",
      status: "upcoming",
      steps: [],
    },
  },

  {
    id: "cp-fr-dec-mots-reguliers",
    slug: "lire-des-mots-reguliers",
    levelSlug: "cp",
    cycle: "cycle-2",
    subject: "Français",
    subjectLabel: "Français",
    domainSlug: "francais",
    subdomainSlug: "decodage",
    title: "Lire des mots réguliers",
    observableObjective:
      "Décoder un mot dont toutes les correspondances graphèmes-phonèmes sont connues.",
    successCriteria: [
      "Je segmente le mot en syllabes pour le lire.",
      "Je lis le mot entier sans épeler lettre par lettre.",
      "Je vérifie que le mot lu a du sens dans son contexte.",
    ],
    officialReference: "Cycle 2 — Lecture et compréhension de l'écrit",
    status: "upcoming",
    lessonIds: [],
    resourceSlots: PLANNED,
    sequence: {
      id: "seq-cp-fr-dec-mots-reguliers",
      competencyId: "cp-fr-dec-mots-reguliers",
      title: "Lire syllabe par syllabe",
      status: "upcoming",
      steps: [],
    },
  },

  {
    id: "cp-fr-dec-phrases-fluidite",
    slug: "lire-des-phrases-simples-avec-fluidite-progressive",
    levelSlug: "cp",
    cycle: "cycle-2",
    subject: "Français",
    subjectLabel: "Français",
    domainSlug: "francais",
    subdomainSlug: "decodage",
    title: "Lire des phrases simples avec fluidité progressive",
    observableObjective:
      "Lire une phrase courte à voix haute en respectant la ponctuation simple.",
    successCriteria: [
      "Je lis la phrase sans m'arrêter à chaque mot.",
      "Je respecte le point final en baissant la voix.",
      "Je relis si je ne comprends pas.",
    ],
    officialReference: "Cycle 2 — Lecture et compréhension de l'écrit",
    status: "upcoming",
    lessonIds: [],
    resourceSlots: PLANNED,
    sequence: {
      id: "seq-cp-fr-dec-phrases-fluidite",
      competencyId: "cp-fr-dec-phrases-fluidite",
      title: "Lire avec fluidité",
      status: "upcoming",
      steps: [],
    },
  },

  // ════════════════════════════════════════════════════════════════════════════
  // FRANÇAIS — Lecture et compréhension
  // ════════════════════════════════════════════════════════════════════════════

  {
    id: "cp-fr-lc-comprendre-phrase-simple",
    slug: "comprendre-une-phrase-simple",
    levelSlug: "cp",
    cycle: "cycle-2",
    subject: "Français",
    subjectLabel: "Français",
    domainSlug: "francais",
    subdomainSlug: "lecture-comprehension",
    title: "Comprendre une phrase simple",
    observableObjective:
      "Repérer qui fait quoi dans une phrase courte et répondre avec une information du texte.",
    successCriteria: [
      "Je lis la phrase jusqu'au bout.",
      "Je retrouve le personnage ou l'objet important.",
      "Je réponds avec une information de la phrase.",
    ],
    officialReference: "Cycle 2 — Lecture et compréhension de l'écrit",
    lessonIds: ["cp-fr-lec-phrase-simple"],
    resourceSlots: PLANNED,
    guideCharacter: { characterSlug: "kiwi", name: "Kiwi" },
    status: "in-progress",
    sequence: {
      id: "seq-cp-fr-lc-comprendre-phrase-simple",
      competencyId: "cp-fr-lc-comprendre-phrase-simple",
      title: "Lire, repérer, répondre",
      status: "in-progress",
      steps: [
        {
          id: "seq-cp-fr-lc-comprendre-phrase-simple-1",
          order: 1,
          kind: "discovery",
          title: "Découvrir la phrase",
          objective: "Comprendre qu'une phrase donne une information.",
          status: "in-progress",
        },
        {
          id: "seq-cp-fr-lc-comprendre-phrase-simple-2",
          order: 2,
          kind: "explicit-lesson",
          title: "Nommer qui fait quoi",
          objective: "Identifier le personnage et l'action.",
          status: "upcoming",
        },
        {
          id: "seq-cp-fr-lc-comprendre-phrase-simple-5",
          order: 5,
          kind: "assessment",
          title: "Vérifier la compréhension",
          objective: "Répondre à une question courte en s'appuyant sur la phrase.",
          status: "upcoming",
        },
      ],
    },
  },

  {
    id: "cp-fr-lc-texte-entendu",
    slug: "comprendre-un-court-texte-entendu",
    levelSlug: "cp",
    cycle: "cycle-2",
    subject: "Français",
    subjectLabel: "Français",
    domainSlug: "francais",
    subdomainSlug: "lecture-comprehension",
    title: "Comprendre un court texte entendu",
    observableObjective:
      "Écouter un texte lu à voix haute et restituer les informations essentielles.",
    successCriteria: [
      "J'écoute sans interrompre.",
      "Je retiens le personnage principal et l'événement central.",
      "Je réponds à une question simple sur ce que j'ai entendu.",
    ],
    officialReference: "Cycle 2 — Compréhension de l'oral",
    status: "upcoming",
    lessonIds: [],
    resourceSlots: PLANNED,
    sequence: {
      id: "seq-cp-fr-lc-texte-entendu",
      competencyId: "cp-fr-lc-texte-entendu",
      title: "Écouter et comprendre",
      status: "upcoming",
      steps: [],
    },
  },

  {
    id: "cp-fr-lc-personnages-lieux-actions",
    slug: "identifier-les-personnages-lieux-et-actions",
    levelSlug: "cp",
    cycle: "cycle-2",
    subject: "Français",
    subjectLabel: "Français",
    domainSlug: "francais",
    subdomainSlug: "lecture-comprehension",
    title: "Identifier personnages, lieux et actions",
    observableObjective:
      "Nommer qui est dans le texte, où cela se passe et ce qui se passe.",
    successCriteria: [
      "Je repère le ou les personnages du texte.",
      "Je repère le lieu de l'action.",
      "Je dis ce que fait le personnage principal.",
    ],
    officialReference: "Cycle 2 — Lecture et compréhension de l'écrit",
    status: "upcoming",
    lessonIds: [],
    resourceSlots: PLANNED,
    sequence: {
      id: "seq-cp-fr-lc-personnages-lieux-actions",
      competencyId: "cp-fr-lc-personnages-lieux-actions",
      title: "Qui, où, quoi ?",
      status: "upcoming",
      steps: [],
    },
  },

  {
    id: "cp-fr-lc-question-explicite",
    slug: "repondre-a-une-question-explicite",
    levelSlug: "cp",
    cycle: "cycle-2",
    subject: "Français",
    subjectLabel: "Français",
    domainSlug: "francais",
    subdomainSlug: "lecture-comprehension",
    title: "Répondre à une question explicite",
    observableObjective:
      "Localiser dans le texte la phrase qui contient la réponse à une question.",
    successCriteria: [
      "Je retrouve la réponse dans le texte sans inventer.",
      "Je cite la partie du texte qui répond à la question.",
      "Je formule ma réponse avec mes mots.",
    ],
    officialReference: "Cycle 2 — Lecture et compréhension de l'écrit",
    status: "upcoming",
    lessonIds: [],
    resourceSlots: PLANNED,
    sequence: {
      id: "seq-cp-fr-lc-question-explicite",
      competencyId: "cp-fr-lc-question-explicite",
      title: "Chercher et répondre",
      status: "upcoming",
      steps: [],
    },
  },

  // ════════════════════════════════════════════════════════════════════════════
  // FRANÇAIS — Écriture et encodage
  // ════════════════════════════════════════════════════════════════════════════

  {
    id: "cp-fr-ecr-encoder-syllabes",
    slug: "encoder-des-syllabes-simples",
    levelSlug: "cp",
    cycle: "cycle-2",
    subject: "Français",
    subjectLabel: "Français",
    domainSlug: "francais",
    subdomainSlug: "ecriture",
    title: "Encoder des syllabes simples",
    observableObjective:
      "Transcrire une syllabe entendue en associant les graphèmes correspondants.",
    successCriteria: [
      "J'entends les sons de la syllabe dans l'ordre.",
      "J'écris les lettres correspondant à chaque son.",
      "Je vérifie que ma syllabe ressemble à ce que j'entends.",
    ],
    officialReference: "Cycle 2 — Écriture",
    status: "upcoming",
    lessonIds: [],
    resourceSlots: PLANNED,
    sequence: {
      id: "seq-cp-fr-ecr-encoder-syllabes",
      competencyId: "cp-fr-ecr-encoder-syllabes",
      title: "Écrire ce qu'on entend",
      status: "upcoming",
      steps: [],
    },
  },

  {
    id: "cp-fr-ecr-encoder-mots",
    slug: "encoder-des-mots-reguliers",
    levelSlug: "cp",
    cycle: "cycle-2",
    subject: "Français",
    subjectLabel: "Français",
    domainSlug: "francais",
    subdomainSlug: "ecriture",
    title: "Encoder des mots réguliers",
    observableObjective:
      "Écrire un mot régulier en segmentant ses syllabes et en associant les graphèmes.",
    successCriteria: [
      "Je décompose le mot en syllabes à l'oral.",
      "J'écris chaque syllabe en respectant les sons.",
      "Je relis pour vérifier que j'ai tout écrit.",
    ],
    officialReference: "Cycle 2 — Écriture",
    status: "upcoming",
    lessonIds: [],
    resourceSlots: PLANNED,
    sequence: {
      id: "seq-cp-fr-ecr-encoder-mots",
      competencyId: "cp-fr-ecr-encoder-mots",
      title: "Du mot entendu au mot écrit",
      status: "upcoming",
      steps: [],
    },
  },

  {
    id: "cp-fr-ecr-copier-phrase",
    slug: "copier-une-phrase-courte",
    levelSlug: "cp",
    cycle: "cycle-2",
    subject: "Français",
    subjectLabel: "Français",
    domainSlug: "francais",
    subdomainSlug: "ecriture",
    title: "Copier une phrase courte",
    observableObjective:
      "Recopier une phrase courte en respectant la majuscule, les mots et le point.",
    successCriteria: [
      "Je commence par la majuscule.",
      "Je copie mot par mot sans oublier les espaces.",
      "Je termine par le point.",
    ],
    officialReference: "Cycle 2 — Écriture",
    status: "upcoming",
    lessonIds: [],
    resourceSlots: PLANNED,
    sequence: {
      id: "seq-cp-fr-ecr-copier-phrase",
      competencyId: "cp-fr-ecr-copier-phrase",
      title: "Copier avec attention",
      status: "upcoming",
      steps: [],
    },
  },

  {
    id: "cp-fr-ecr-ecrire-phrase",
    slug: "ecrire-une-phrase-simple-avec-aide",
    levelSlug: "cp",
    cycle: "cycle-2",
    subject: "Français",
    subjectLabel: "Français",
    domainSlug: "francais",
    subdomainSlug: "ecriture",
    title: "Écrire une phrase simple avec aide",
    observableObjective:
      "Produire une phrase courte et lisible en s'appuyant sur un modèle ou une aide.",
    successCriteria: [
      "Ma phrase commence par une majuscule.",
      "Ma phrase se termine par un point.",
      "Ma phrase a un sens complet.",
    ],
    officialReference: "Cycle 2 — Écriture",
    status: "upcoming",
    lessonIds: [],
    resourceSlots: PLANNED,
    sequence: {
      id: "seq-cp-fr-ecr-ecrire-phrase",
      competencyId: "cp-fr-ecr-ecrire-phrase",
      title: "Ma première phrase",
      status: "upcoming",
      steps: [],
    },
  },

  // ════════════════════════════════════════════════════════════════════════════
  // FRANÇAIS — Étude de la langue
  // ════════════════════════════════════════════════════════════════════════════

  {
    id: "cp-fr-edl-reconnaitre-phrase",
    slug: "reconnaitre-une-phrase",
    levelSlug: "cp",
    cycle: "cycle-2",
    subject: "Français",
    subjectLabel: "Français",
    domainSlug: "francais",
    subdomainSlug: "etude-de-la-langue",
    title: "Reconnaître une phrase",
    observableObjective:
      "Distinguer une suite de mots qui forme une phrase correcte d'un groupe de mots incomplet.",
    successCriteria: [
      "Je vérifie que la suite de mots a du sens.",
      "Je repère la majuscule au début.",
      "Je repère la ponctuation finale.",
    ],
    officialReference: "Cycle 2 — Étude de la langue",
    status: "upcoming",
    lessonIds: [],
    resourceSlots: PLANNED,
    sequence: {
      id: "seq-cp-fr-edl-reconnaitre-phrase",
      competencyId: "cp-fr-edl-reconnaitre-phrase",
      title: "Une phrase ou pas ?",
      status: "upcoming",
      steps: [],
    },
  },

  {
    id: "cp-fr-edl-reperer-nom",
    slug: "reperer-le-nom",
    levelSlug: "cp",
    cycle: "cycle-2",
    subject: "Français",
    subjectLabel: "Français",
    domainSlug: "francais",
    subdomainSlug: "etude-de-la-langue",
    title: "Repérer le nom",
    observableObjective:
      "Identifier un nom commun ou propre dans une phrase simple.",
    successCriteria: [
      "Je sais que le nom désigne une personne, un animal ou une chose.",
      "Je repère le nom grâce au déterminant qui l'accompagne.",
      "Je distingue nom commun et nom propre.",
    ],
    officialReference: "Cycle 2 — Étude de la langue",
    status: "upcoming",
    lessonIds: [],
    resourceSlots: PLANNED,
    sequence: {
      id: "seq-cp-fr-edl-reperer-nom",
      competencyId: "cp-fr-edl-reperer-nom",
      title: "Trouver le nom",
      status: "upcoming",
      steps: [],
    },
  },

  {
    id: "cp-fr-edl-reperer-verbe",
    slug: "reperer-le-verbe-dans-une-phrase-simple",
    levelSlug: "cp",
    cycle: "cycle-2",
    subject: "Français",
    subjectLabel: "Français",
    domainSlug: "francais",
    subdomainSlug: "etude-de-la-langue",
    title: "Repérer le verbe dans une phrase simple",
    observableObjective:
      "Identifier le mot qui exprime l'action dans une phrase courte.",
    successCriteria: [
      "Je retrouve le mot qui dit ce que fait le personnage.",
      "Je peux poser la question « Qu'est-ce qu'il fait ? » pour trouver le verbe.",
      "Je sais que le verbe change quand on change la personne qui fait l'action.",
    ],
    officialReference: "Cycle 2 — Étude de la langue",
    status: "upcoming",
    lessonIds: [],
    resourceSlots: PLANNED,
    sequence: {
      id: "seq-cp-fr-edl-reperer-verbe",
      competencyId: "cp-fr-edl-reperer-verbe",
      title: "Le mot de l'action",
      status: "upcoming",
      steps: [],
    },
  },

  {
    id: "cp-fr-edl-accords-simples",
    slug: "respecter-les-accords-simples",
    levelSlug: "cp",
    cycle: "cycle-2",
    subject: "Français",
    subjectLabel: "Français",
    domainSlug: "francais",
    subdomainSlug: "etude-de-la-langue",
    title: "Respecter les accords simples à l'oral et à l'écrit",
    observableObjective:
      "Marquer le pluriel et l'accord du déterminant avec le nom dans des situations guidées.",
    successCriteria: [
      "Je sais qu'on ajoute souvent un -s pour écrire le pluriel.",
      "Je distingue « le » et « les » selon qu'il y a un ou plusieurs.",
      "Je commence à corriger mes accords quand je me relis.",
    ],
    officialReference: "Cycle 2 — Étude de la langue",
    status: "upcoming",
    lessonIds: [],
    resourceSlots: PLANNED,
    sequence: {
      id: "seq-cp-fr-edl-accords-simples",
      competencyId: "cp-fr-edl-accords-simples",
      title: "Un ou plusieurs ?",
      status: "upcoming",
      steps: [],
    },
  },

  // ════════════════════════════════════════════════════════════════════════════
  // FRANÇAIS — Oral
  // ════════════════════════════════════════════════════════════════════════════

  {
    id: "cp-fr-oral-ecouter-consigne",
    slug: "ecouter-une-consigne",
    levelSlug: "cp",
    cycle: "cycle-2",
    subject: "Français",
    subjectLabel: "Français",
    domainSlug: "francais",
    subdomainSlug: "oral",
    title: "Écouter une consigne",
    observableObjective:
      "Recevoir une consigne orale courte et la mettre en œuvre sans la demander à nouveau.",
    successCriteria: [
      "J'écoute sans interrompre jusqu'à la fin de la consigne.",
      "Je peux répéter la consigne avec mes mots.",
      "Je réalise la tâche demandée.",
    ],
    officialReference: "Cycle 2 — Comprendre et s'exprimer à l'oral",
    status: "upcoming",
    lessonIds: [],
    resourceSlots: PLANNED,
    sequence: {
      id: "seq-cp-fr-oral-ecouter-consigne",
      competencyId: "cp-fr-oral-ecouter-consigne",
      title: "Écouter pour agir",
      status: "upcoming",
      steps: [],
    },
  },

  {
    id: "cp-fr-oral-reformuler",
    slug: "reformuler-une-information-simple",
    levelSlug: "cp",
    cycle: "cycle-2",
    subject: "Français",
    subjectLabel: "Français",
    domainSlug: "francais",
    subdomainSlug: "oral",
    title: "Reformuler une information simple",
    observableObjective:
      "Redire avec ses propres mots une information entendue ou lue.",
    successCriteria: [
      "Je n'utilise pas les mêmes mots que la phrase d'origine.",
      "Je conserve le sens de l'information.",
      "Je parle en phrases complètes.",
    ],
    officialReference: "Cycle 2 — Comprendre et s'exprimer à l'oral",
    status: "upcoming",
    lessonIds: [],
    resourceSlots: PLANNED,
    sequence: {
      id: "seq-cp-fr-oral-reformuler",
      competencyId: "cp-fr-oral-reformuler",
      title: "Redire autrement",
      status: "upcoming",
      steps: [],
    },
  },

  {
    id: "cp-fr-oral-raconter",
    slug: "raconter-un-evenement-court",
    levelSlug: "cp",
    cycle: "cycle-2",
    subject: "Français",
    subjectLabel: "Français",
    domainSlug: "francais",
    subdomainSlug: "oral",
    title: "Raconter un événement court",
    observableObjective:
      "Relater un événement vécu ou entendu en respectant un ordre logique.",
    successCriteria: [
      "Je dis ce qui s'est passé d'abord, ensuite, à la fin.",
      "Je nomme les personnes et le lieu.",
      "Je parle assez fort pour être compris.",
    ],
    officialReference: "Cycle 2 — Comprendre et s'exprimer à l'oral",
    status: "upcoming",
    lessonIds: [],
    resourceSlots: PLANNED,
    sequence: {
      id: "seq-cp-fr-oral-raconter",
      competencyId: "cp-fr-oral-raconter",
      title: "Raconter en ordre",
      status: "upcoming",
      steps: [],
    },
  },

  {
    id: "cp-fr-oral-participer-echange",
    slug: "participer-a-un-echange-regle",
    levelSlug: "cp",
    cycle: "cycle-2",
    subject: "Français",
    subjectLabel: "Français",
    domainSlug: "francais",
    subdomainSlug: "oral",
    title: "Participer à un échange réglé",
    observableObjective:
      "Prendre la parole à son tour en s'appuyant sur ce que dit un autre élève.",
    successCriteria: [
      "J'attends mon tour pour parler.",
      "Je réponds à ce qui vient d'être dit.",
      "Je reste sur le sujet de l'échange.",
    ],
    officialReference: "Cycle 2 — Comprendre et s'exprimer à l'oral",
    status: "upcoming",
    lessonIds: [],
    resourceSlots: PLANNED,
    sequence: {
      id: "seq-cp-fr-oral-participer-echange",
      competencyId: "cp-fr-oral-participer-echange",
      title: "Parler ensemble",
      status: "upcoming",
      steps: [],
    },
  },

  // ════════════════════════════════════════════════════════════════════════════
  // MATHÉMATIQUES — Nombres et numération
  // ════════════════════════════════════════════════════════════════════════════

  {
    id: "cp-ma-num-nombres-10",
    slug: "lire-ecrire-representer-nombres-jusqu-a-10",
    levelSlug: "cp",
    cycle: "cycle-2",
    subject: "Mathématiques",
    subjectLabel: "Mathématiques",
    domainSlug: "mathematiques",
    subdomainSlug: "numeration",
    title: "Lire, écrire et représenter les nombres jusqu'à 10",
    observableObjective:
      "Associer un nombre écrit, dit à voix haute et une quantité d'objets jusqu'à 10.",
    successCriteria: [
      "Je lis et écris les chiffres de 0 à 9.",
      "Je compte une collection jusqu'à 10 objets.",
      "Je place les nombres de 1 à 10 dans l'ordre.",
    ],
    officialReference: "Cycle 2 — Nombres et calculs",
    status: "upcoming",
    lessonIds: [],
    resourceSlots: PLANNED,
    sequence: {
      id: "seq-cp-ma-num-nombres-10",
      competencyId: "cp-ma-num-nombres-10",
      title: "Compter jusqu'à 10",
      status: "upcoming",
      steps: [],
    },
  },

  {
    id: "cp-ma-num-nombres-20",
    slug: "lire-ecrire-representer-nombres-jusqu-a-20",
    levelSlug: "cp",
    cycle: "cycle-2",
    subject: "Mathématiques",
    subjectLabel: "Mathématiques",
    domainSlug: "mathematiques",
    subdomainSlug: "numeration",
    title: "Lire, écrire et représenter les nombres jusqu'à 20",
    observableObjective:
      "Nommer, lire, écrire et dénombrer des collections jusqu'à 20.",
    successCriteria: [
      "Je connais les nombres de 10 à 20 dans l'ordre.",
      "Je les écris en chiffres.",
      "Je constitue une collection de 11 à 20 objets sur demande.",
    ],
    officialReference: "Cycle 2 — Nombres et calculs",
    status: "upcoming",
    lessonIds: [],
    resourceSlots: PLANNED,
    sequence: {
      id: "seq-cp-ma-num-nombres-20",
      competencyId: "cp-ma-num-nombres-20",
      title: "Jusqu'à vingt",
      status: "upcoming",
      steps: [],
    },
  },

  {
    id: "cp-ma-num-nombres-100",
    slug: "lire-ecrire-representer-nombres-jusqu-a-100",
    levelSlug: "cp",
    cycle: "cycle-2",
    subject: "Mathématiques",
    subjectLabel: "Mathématiques",
    domainSlug: "mathematiques",
    subdomainSlug: "numeration",
    title: "Lire, écrire et représenter les nombres jusqu'à 100",
    observableObjective:
      "Comprendre le système décimal et manipuler les dizaines et les unités jusqu'à 100.",
    successCriteria: [
      "Je comprends que 10 unités forment une dizaine.",
      "Je dis combien de dizaines et d'unités il y a dans un nombre.",
      "Je lis et écris les nombres jusqu'à 99.",
    ],
    officialReference: "Cycle 2 — Nombres et calculs",
    status: "upcoming",
    lessonIds: [],
    resourceSlots: PLANNED,
    sequence: {
      id: "seq-cp-ma-num-nombres-100",
      competencyId: "cp-ma-num-nombres-100",
      title: "Dizaines et unités",
      status: "upcoming",
      steps: [],
    },
  },

  {
    id: "cp-ma-num-comparer-ranger",
    slug: "comparer-et-ranger-des-nombres",
    levelSlug: "cp",
    cycle: "cycle-2",
    subject: "Mathématiques",
    subjectLabel: "Mathématiques",
    domainSlug: "mathematiques",
    subdomainSlug: "numeration",
    title: "Comparer et ranger des nombres",
    observableObjective:
      "Utiliser les symboles < et > pour comparer deux nombres et ranger une liste.",
    successCriteria: [
      "Je sais quel nombre est le plus grand entre deux nombres.",
      "J'utilise < ou > correctement.",
      "Je range une liste de nombres dans l'ordre croissant ou décroissant.",
    ],
    officialReference: "Cycle 2 — Nombres et calculs",
    status: "upcoming",
    lessonIds: [],
    resourceSlots: PLANNED,
    sequence: {
      id: "seq-cp-ma-num-comparer-ranger",
      competencyId: "cp-ma-num-comparer-ranger",
      title: "Ordonner les nombres",
      status: "upcoming",
      steps: [],
    },
  },

  {
    id: "cp-ma-num-decomposer",
    slug: "decomposer-un-nombre",
    levelSlug: "cp",
    cycle: "cycle-2",
    subject: "Mathématiques",
    subjectLabel: "Mathématiques",
    domainSlug: "mathematiques",
    subdomainSlug: "numeration",
    title: "Décomposer un nombre",
    observableObjective:
      "Exprimer un nombre comme somme ou différence de deux quantités connues.",
    successCriteria: [
      "Je donne plusieurs façons de composer un nombre.",
      "J'utilise des doigts, des objets ou des dessins pour représenter ma décomposition.",
      "Je retrouve les décompositions de référence (ex. 5 = 3 + 2, 8 = 5 + 3).",
    ],
    officialReference: "Cycle 2 — Nombres et calculs",
    status: "upcoming",
    lessonIds: [],
    resourceSlots: PLANNED,
    sequence: {
      id: "seq-cp-ma-num-decomposer",
      competencyId: "cp-ma-num-decomposer",
      title: "Construire un nombre",
      status: "upcoming",
      steps: [],
    },
  },

  // ════════════════════════════════════════════════════════════════════════════
  // MATHÉMATIQUES — Calcul
  // ════════════════════════════════════════════════════════════════════════════

  {
    id: "cp-ma-cal-faits-numeriques",
    slug: "memoriser-de-petits-faits-numeriques",
    levelSlug: "cp",
    cycle: "cycle-2",
    subject: "Mathématiques",
    subjectLabel: "Mathématiques",
    domainSlug: "mathematiques",
    subdomainSlug: "calcul",
    title: "Mémoriser de petits faits numériques",
    observableObjective:
      "Restituer instantanément des résultats d'additions simples inférieures ou égales à 10.",
    successCriteria: [
      "Je connais les doubles jusqu'à 5 + 5.",
      "Je retrouve sans compter les résultats des petites additions.",
      "Je connais les compléments à 10.",
    ],
    officialReference: "Cycle 2 — Nombres et calculs",
    status: "upcoming",
    lessonIds: [],
    resourceSlots: PLANNED,
    sequence: {
      id: "seq-cp-ma-cal-faits-numeriques",
      competencyId: "cp-ma-cal-faits-numeriques",
      title: "Savoir par cœur",
      status: "upcoming",
      steps: [],
    },
  },

  {
    id: "cp-ma-cal-addition",
    slug: "additionner-deux-petits-nombres",
    levelSlug: "cp",
    cycle: "cycle-2",
    subject: "Mathématiques",
    subjectLabel: "Mathématiques",
    domainSlug: "mathematiques",
    subdomainSlug: "calcul",
    title: "Additionner deux petits nombres",
    observableObjective:
      "Calculer la somme de deux nombres en utilisant différentes stratégies.",
    successCriteria: [
      "Je peux additionner en comptant sur mes doigts ou sur une droite numérique.",
      "Je commence à additionner par le plus grand nombre.",
      "Je donne le résultat d'une addition simple sans erreur.",
    ],
    officialReference: "Cycle 2 — Nombres et calculs",
    status: "upcoming",
    lessonIds: [],
    resourceSlots: PLANNED,
    sequence: {
      id: "seq-cp-ma-cal-addition",
      competencyId: "cp-ma-cal-addition",
      title: "Additionner",
      status: "upcoming",
      steps: [],
    },
  },

  {
    id: "cp-ma-cal-soustraction",
    slug: "soustraire-de-petits-nombres",
    levelSlug: "cp",
    cycle: "cycle-2",
    subject: "Mathématiques",
    subjectLabel: "Mathématiques",
    domainSlug: "mathematiques",
    subdomainSlug: "calcul",
    title: "Soustraire de petits nombres",
    observableObjective:
      "Calculer la différence entre deux petits nombres dans une situation concrète.",
    successCriteria: [
      "Je comprends qu'on soustrait quand on enlève ou qu'on compare.",
      "Je calcule une petite soustraction en revenant en arrière sur la droite numérique.",
      "Je donne le résultat d'une soustraction simple sans erreur.",
    ],
    officialReference: "Cycle 2 — Nombres et calculs",
    status: "upcoming",
    lessonIds: [],
    resourceSlots: PLANNED,
    sequence: {
      id: "seq-cp-ma-cal-soustraction",
      competencyId: "cp-ma-cal-soustraction",
      title: "Enlever et comparer",
      status: "upcoming",
      steps: [],
    },
  },

  {
    id: "cp-ma-cal-mental",
    slug: "utiliser-le-calcul-mental-simple",
    levelSlug: "cp",
    cycle: "cycle-2",
    subject: "Mathématiques",
    subjectLabel: "Mathématiques",
    domainSlug: "mathematiques",
    subdomainSlug: "calcul",
    title: "Utiliser le calcul mental simple",
    observableObjective:
      "Effectuer de petits calculs de tête en mobilisant des stratégies adaptées.",
    successCriteria: [
      "Je calcule sans poser l'opération écrite.",
      "Je choisis entre compter, utiliser un double ou un complément.",
      "Je vérifie mon résultat en recomptant.",
    ],
    officialReference: "Cycle 2 — Nombres et calculs",
    status: "upcoming",
    lessonIds: [],
    resourceSlots: PLANNED,
    sequence: {
      id: "seq-cp-ma-cal-mental",
      competencyId: "cp-ma-cal-mental",
      title: "Calculer de tête",
      status: "upcoming",
      steps: [],
    },
  },

  {
    id: "cp-ma-cal-operation-posee",
    slug: "resoudre-une-operation-posee-simple",
    levelSlug: "cp",
    cycle: "cycle-2",
    subject: "Mathématiques",
    subjectLabel: "Mathématiques",
    domainSlug: "mathematiques",
    subdomainSlug: "calcul",
    title: "Résoudre une opération posée très simple",
    observableObjective:
      "Calculer une addition posée en colonnes sur des nombres à un ou deux chiffres.",
    successCriteria: [
      "J'aligne les unités sous les unités.",
      "Je calcule colonne par colonne.",
      "Je vérifie mon résultat.",
    ],
    officialReference: "Cycle 2 — Nombres et calculs",
    status: "upcoming",
    lessonIds: [],
    resourceSlots: PLANNED,
    sequence: {
      id: "seq-cp-ma-cal-operation-posee",
      competencyId: "cp-ma-cal-operation-posee",
      title: "Poser et calculer",
      status: "upcoming",
      steps: [],
    },
  },

  // ════════════════════════════════════════════════════════════════════════════
  // MATHÉMATIQUES — Résolution de problèmes
  // ════════════════════════════════════════════════════════════════════════════

  {
    id: "cp-ma-prob-comprendre-situation",
    slug: "comprendre-une-situation-de-probleme",
    levelSlug: "cp",
    cycle: "cycle-2",
    subject: "Mathématiques",
    subjectLabel: "Mathématiques",
    domainSlug: "mathematiques",
    subdomainSlug: "problemes",
    title: "Comprendre une situation de problème",
    observableObjective:
      "Identifier ce qu'on sait, ce qu'on cherche et reformuler la question d'un problème simple.",
    successCriteria: [
      "Je lis le problème deux fois avant de commencer.",
      "Je repère les nombres donnés.",
      "Je dis avec mes mots ce qu'on me demande de trouver.",
    ],
    officialReference: "Cycle 2 — Résolution de problèmes",
    status: "upcoming",
    lessonIds: [],
    resourceSlots: PLANNED,
    sequence: {
      id: "seq-cp-ma-prob-comprendre-situation",
      competencyId: "cp-ma-prob-comprendre-situation",
      title: "Lire et comprendre",
      status: "upcoming",
      steps: [],
    },
  },

  {
    id: "cp-ma-prob-choisir-operation",
    slug: "choisir-l-operation-adaptee",
    levelSlug: "cp",
    cycle: "cycle-2",
    subject: "Mathématiques",
    subjectLabel: "Mathématiques",
    domainSlug: "mathematiques",
    subdomainSlug: "problemes",
    title: "Choisir l'opération adaptée",
    observableObjective:
      "Décider d'additionner ou de soustraire selon la situation décrite dans le problème.",
    successCriteria: [
      "Je reconnais les mots qui indiquent qu'on ajoute (encore, en tout, de plus…).",
      "Je reconnais les mots qui indiquent qu'on enlève (il reste, moins, part…).",
      "Je justifie mon choix d'opération.",
    ],
    officialReference: "Cycle 2 — Résolution de problèmes",
    status: "upcoming",
    lessonIds: [],
    resourceSlots: PLANNED,
    sequence: {
      id: "seq-cp-ma-prob-choisir-operation",
      competencyId: "cp-ma-prob-choisir-operation",
      title: "Choisir l'opération",
      status: "upcoming",
      steps: [],
    },
  },

  {
    id: "cp-ma-prob-resoudre-additif",
    slug: "resoudre-un-probleme-additif-simple",
    levelSlug: "cp",
    cycle: "cycle-2",
    subject: "Mathématiques",
    subjectLabel: "Mathématiques",
    domainSlug: "mathematiques",
    subdomainSlug: "problemes",
    title: "Résoudre un problème additif simple",
    observableObjective:
      "Trouver le résultat d'un problème d'addition ou de soustraction simple et écrire la réponse.",
    successCriteria: [
      "Je pose l'opération correspondant au problème.",
      "Je calcule et j'écris le résultat.",
      "Je rédige la réponse en phrase complète.",
    ],
    officialReference: "Cycle 2 — Résolution de problèmes",
    status: "upcoming",
    lessonIds: [],
    resourceSlots: PLANNED,
    sequence: {
      id: "seq-cp-ma-prob-resoudre-additif",
      competencyId: "cp-ma-prob-resoudre-additif",
      title: "Résoudre et répondre",
      status: "upcoming",
      steps: [],
    },
  },

  {
    id: "cp-ma-prob-expliquer-demarche",
    slug: "expliquer-sa-demarche",
    levelSlug: "cp",
    cycle: "cycle-2",
    subject: "Mathématiques",
    subjectLabel: "Mathématiques",
    domainSlug: "mathematiques",
    subdomainSlug: "problemes",
    title: "Expliquer sa démarche avec une phrase ou un schéma",
    observableObjective:
      "Montrer comment on a résolu un problème en utilisant des mots, des nombres ou un dessin.",
    successCriteria: [
      "Je peux dire comment j'ai trouvé la réponse.",
      "Je dessine ou écris les étapes si nécessaire.",
      "Ma démarche est compréhensible par quelqu'un d'autre.",
    ],
    officialReference: "Cycle 2 — Résolution de problèmes",
    status: "upcoming",
    lessonIds: [],
    resourceSlots: PLANNED,
    sequence: {
      id: "seq-cp-ma-prob-expliquer-demarche",
      competencyId: "cp-ma-prob-expliquer-demarche",
      title: "Expliquer son raisonnement",
      status: "upcoming",
      steps: [],
    },
  },

  // ════════════════════════════════════════════════════════════════════════════
  // MATHÉMATIQUES — Grandeurs et mesures
  // ════════════════════════════════════════════════════════════════════════════

  {
    id: "cp-ma-gm-longueurs",
    slug: "comparer-des-longueurs",
    levelSlug: "cp",
    cycle: "cycle-2",
    subject: "Mathématiques",
    subjectLabel: "Mathématiques",
    domainSlug: "mathematiques",
    subdomainSlug: "grandeurs-mesures",
    title: "Comparer des longueurs",
    observableObjective:
      "Comparer deux longueurs directement ou avec un instrument de mesure simple.",
    successCriteria: [
      "Je dis lequel de deux objets est le plus long.",
      "J'utilise une bande ou une règle pour comparer.",
      "J'utilise les mots plus long, plus court, pareil.",
    ],
    officialReference: "Cycle 2 — Grandeurs et mesures",
    status: "upcoming",
    lessonIds: [],
    resourceSlots: PLANNED,
    sequence: {
      id: "seq-cp-ma-gm-longueurs",
      competencyId: "cp-ma-gm-longueurs",
      title: "Mesurer et comparer",
      status: "upcoming",
      steps: [],
    },
  },

  {
    id: "cp-ma-gm-monnaie",
    slug: "utiliser-la-monnaie-dans-des-situations-simples",
    levelSlug: "cp",
    cycle: "cycle-2",
    subject: "Mathématiques",
    subjectLabel: "Mathématiques",
    domainSlug: "mathematiques",
    subdomainSlug: "grandeurs-mesures",
    title: "Utiliser la monnaie dans des situations simples",
    observableObjective:
      "Reconnaître les pièces et billets courants et calculer un total ou une monnaie simple.",
    successCriteria: [
      "Je reconnais les pièces de 1, 2, 5, 10, 20 et 50 centimes et de 1 et 2 euros.",
      "Je calcule combien coûtent deux articles ensemble.",
      "Je vérifie si j'ai assez d'argent pour payer.",
    ],
    officialReference: "Cycle 2 — Grandeurs et mesures",
    status: "upcoming",
    lessonIds: [],
    resourceSlots: PLANNED,
    sequence: {
      id: "seq-cp-ma-gm-monnaie",
      competencyId: "cp-ma-gm-monnaie",
      title: "Compter les pièces",
      status: "upcoming",
      steps: [],
    },
  },

  {
    id: "cp-ma-gm-temps",
    slug: "lire-des-informations-simples-liees-au-temps",
    levelSlug: "cp",
    cycle: "cycle-2",
    subject: "Mathématiques",
    subjectLabel: "Mathématiques",
    domainSlug: "mathematiques",
    subdomainSlug: "grandeurs-mesures",
    title: "Lire des informations simples liées au temps",
    observableObjective:
      "Repérer des moments de la journée et des jours de la semaine dans un contexte concret.",
    successCriteria: [
      "Je connais les jours de la semaine dans l'ordre.",
      "Je distingue matin, après-midi et soir.",
      "Je lis l'heure à l'heure juste sur une horloge simple.",
    ],
    officialReference: "Cycle 2 — Grandeurs et mesures",
    status: "upcoming",
    lessonIds: [],
    resourceSlots: PLANNED,
    sequence: {
      id: "seq-cp-ma-gm-temps",
      competencyId: "cp-ma-gm-temps",
      title: "Se repérer dans le temps",
      status: "upcoming",
      steps: [],
    },
  },

  {
    id: "cp-ma-gm-masses-contenances",
    slug: "comparer-des-masses-ou-contenances-intuitivement",
    levelSlug: "cp",
    cycle: "cycle-2",
    subject: "Mathématiques",
    subjectLabel: "Mathématiques",
    domainSlug: "mathematiques",
    subdomainSlug: "grandeurs-mesures",
    title: "Comparer des masses ou contenances de façon intuitive",
    observableObjective:
      "Comparer deux objets selon leur masse ou leur contenance en utilisant ses sens ou une balance simple.",
    successCriteria: [
      "Je dis lequel de deux objets est le plus lourd.",
      "Je compare des contenants en versant ou en regardant.",
      "J'utilise les mots plus lourd, plus léger, contient plus, contient moins.",
    ],
    officialReference: "Cycle 2 — Grandeurs et mesures",
    status: "upcoming",
    lessonIds: [],
    resourceSlots: PLANNED,
    sequence: {
      id: "seq-cp-ma-gm-masses-contenances",
      competencyId: "cp-ma-gm-masses-contenances",
      title: "Peser et comparer",
      status: "upcoming",
      steps: [],
    },
  },

  // ════════════════════════════════════════════════════════════════════════════
  // MATHÉMATIQUES — Géométrie
  // ════════════════════════════════════════════════════════════════════════════

  {
    id: "cp-ma-geo-formes-simples",
    slug: "reconnaitre-des-formes-simples",
    levelSlug: "cp",
    cycle: "cycle-2",
    subject: "Mathématiques",
    subjectLabel: "Mathématiques",
    domainSlug: "mathematiques",
    subdomainSlug: "geometrie",
    title: "Reconnaître des formes simples",
    observableObjective:
      "Identifier des formes géométriques courantes dans son environnement.",
    successCriteria: [
      "Je repère des formes géométriques sur des objets réels.",
      "Je les nomme correctement.",
      "Je classe des figures selon leur forme.",
    ],
    officialReference: "Cycle 2 — Espace et géométrie",
    status: "upcoming",
    lessonIds: [],
    resourceSlots: PLANNED,
    sequence: {
      id: "seq-cp-ma-geo-formes-simples",
      competencyId: "cp-ma-geo-formes-simples",
      title: "Voir les formes autour de soi",
      status: "upcoming",
      steps: [],
    },
  },

  {
    id: "cp-ma-geo-nommer-formes",
    slug: "nommer-carre-rectangle-triangle-cercle",
    levelSlug: "cp",
    cycle: "cycle-2",
    subject: "Mathématiques",
    subjectLabel: "Mathématiques",
    domainSlug: "mathematiques",
    subdomainSlug: "geometrie",
    title: "Nommer carré, rectangle, triangle, cercle",
    observableObjective:
      "Nommer les quatre figures planes principales et décrire une caractéristique de chacune.",
    successCriteria: [
      "Je nomme le carré, le rectangle, le triangle et le cercle.",
      "Je sais que le carré a 4 côtés égaux.",
      "Je sais que le cercle est une courbe fermée sans angle.",
    ],
    officialReference: "Cycle 2 — Espace et géométrie",
    status: "upcoming",
    lessonIds: [],
    resourceSlots: PLANNED,
    sequence: {
      id: "seq-cp-ma-geo-nommer-formes",
      competencyId: "cp-ma-geo-nommer-formes",
      title: "Nommer les figures",
      status: "upcoming",
      steps: [],
    },
  },

  {
    id: "cp-ma-geo-reperage-espace",
    slug: "se-reperer-dans-l-espace",
    levelSlug: "cp",
    cycle: "cycle-2",
    subject: "Mathématiques",
    subjectLabel: "Mathématiques",
    domainSlug: "mathematiques",
    subdomainSlug: "geometrie",
    title: "Se repérer dans l'espace",
    observableObjective:
      "Utiliser le vocabulaire spatial pour décrire la position d'un objet.",
    successCriteria: [
      "J'utilise : devant, derrière, à gauche, à droite, dessus, dessous, entre.",
      "Je décris la position d'un objet par rapport à un autre.",
      "Je suis un chemin sur un plan simple.",
    ],
    officialReference: "Cycle 2 — Espace et géométrie",
    status: "upcoming",
    lessonIds: [],
    resourceSlots: PLANNED,
    sequence: {
      id: "seq-cp-ma-geo-reperage-espace",
      competencyId: "cp-ma-geo-reperage-espace",
      title: "Où est-il ?",
      status: "upcoming",
      steps: [],
    },
  },

  {
    id: "cp-ma-geo-utiliser-regle",
    slug: "utiliser-la-regle-pour-tracer",
    levelSlug: "cp",
    cycle: "cycle-2",
    subject: "Mathématiques",
    subjectLabel: "Mathématiques",
    domainSlug: "mathematiques",
    subdomainSlug: "geometrie",
    title: "Utiliser la règle pour tracer",
    observableObjective:
      "Tracer un segment droit en maintenant la règle et en guidant le crayon.",
    successCriteria: [
      "Je tiens la règle avec le pouce et l'index pour qu'elle ne glisse pas.",
      "Je trace un trait droit d'un point à un autre.",
      "Je trace le contour d'une figure en maintenant la règle à chaque côté.",
    ],
    officialReference: "Cycle 2 — Espace et géométrie",
    status: "upcoming",
    lessonIds: [],
    resourceSlots: PLANNED,
    sequence: {
      id: "seq-cp-ma-geo-utiliser-regle",
      competencyId: "cp-ma-geo-utiliser-regle",
      title: "Tracer avec la règle",
      status: "upcoming",
      steps: [],
    },
  },

  // ════════════════════════════════════════════════════════════════════════════
  // QUESTIONNER LE MONDE — Le vivant
  // ════════════════════════════════════════════════════════════════════════════

  {
    id: "cp-qdm-obs-animal-plante",
    slug: "observer-et-decrire-un-animal-ou-une-plante",
    levelSlug: "cp",
    cycle: "cycle-2",
    subject: "Questionner le monde",
    subjectLabel: "Questionner le monde",
    domainSlug: "questionner-le-monde",
    subdomainSlug: "vivant",
    title: "Observer et décrire un animal ou une plante",
    observableObjective:
      "Nommer et décrire quelques caractéristiques observables d'un être vivant.",
    successCriteria: [
      "Je nomme l'animal ou la plante observé.",
      "Je décris une caractéristique visible (couleur, forme, taille).",
      "Je dis si c'est un animal ou une plante et j'explique pourquoi.",
    ],
    officialReference: "Cycle 2 — Questionner le monde du vivant",
    status: "upcoming",
    lessonIds: [],
    resourceSlots: PLANNED,
    sequence: {
      id: "seq-cp-qdm-obs-animal-plante",
      competencyId: "cp-qdm-obs-animal-plante",
      title: "Observer le vivant",
      status: "upcoming",
      steps: [],
    },
  },
];
