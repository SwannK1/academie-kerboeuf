import type { LearningMission } from "@/content/felix-types";

const themes = {
  jade: {
    name: "Exploration verte",
    accentClass: "bg-jade",
    surfaceClass: "bg-jade/10",
    textClass: "text-jade",
    ringClass: "border-jade/35",
  },
  gold: {
    name: "Expédition dorée",
    accentClass: "bg-gold",
    surfaceClass: "bg-gold/10",
    textClass: "text-gold",
    ringClass: "border-gold/35",
  },
  sky: {
    name: "Carte azur",
    accentClass: "bg-sky",
    surfaceClass: "bg-sky/10",
    textClass: "text-sky",
    ringClass: "border-sky/35",
  },
  ember: {
    name: "Archives braise",
    accentClass: "bg-ember",
    surfaceClass: "bg-ember/10",
    textClass: "text-ember",
    ringClass: "border-ember/35",
  },
};

export const felixProjects: LearningMission[] = [
  {
    slug: "journal-des-traces-de-felix",
    title: "Le journal des traces de Félix",
    subtitle: "Observer, noter, transmettre",
    mainSubject: "Écriture / Sciences",
    associatedSubjects: ["Français", "Sciences et technologie", "Arts"],
    duration: "3 semaines",
    status: "disponible",
    theme: themes.jade,
    synopsis:
      "Félix tient un journal de terrain. Chaque semaine, il y consigne ses observations du vivant, ses questions et ses hypothèses. Les élèves créent leur propre journal de traces, apprenant à décrire avec précision, à schématiser ce qu'ils observent et à distinguer ce qui est vu de ce qui est interprété.",
    felixRole:
      "Félix guide les élèves dans la tenue d'un carnet de terrain rigoureux. Il leur montre comment un scientifique distingue observation et interprétation, et comment une trace bien construite devient un outil de pensée.",
    skills: [
      {
        id: "observer",
        label: "Observer",
        gesture: "observer",
        observable:
          "L'élève décrit un phénomène avec précision sans l'interpréter immédiatement.",
      },
      {
        id: "noter",
        label: "Produire une trace",
        gesture: "produire une trace",
        observable:
          "L'élève produit un écrit structuré avec date, lieu, dessin légendé et remarques.",
      },
      {
        id: "verifier",
        label: "Vérifier",
        gesture: "vérifier",
        observable:
          "L'élève confronte ses observations à celles d'autres élèves pour corriger ou confirmer.",
      },
    ],
    objectives: [
      "Tenir un journal de terrain sur une période continue",
      "Distinguer observation directe et interprétation",
      "Produire des écrits scientifiques courts et structurés",
      "Légender un schéma ou un dessin d'observation",
    ],
    successCriteria: [
      "Le journal contient au moins 5 entrées datées et localisées",
      "Chaque entrée distingue clairement ce qui est observé de ce qui est supposé",
      "Les schémas sont légendés avec un vocabulaire précis",
      "L'élève peut présenter une observation à l'oral en justifiant ses choix",
    ],
    evidence: [
      {
        type: "production",
        description: "Journal de terrain illustré avec au moins 5 entrées",
      },
      {
        type: "oral",
        description:
          "Présentation d'une observation à la classe avec justification",
      },
      {
        type: "écrit",
        description: "Texte court distinguant observation et hypothèse",
      },
    ],
    printableSupports: [
      "Gabarit de page de journal de terrain (cadre observation / dessin / hypothèse)",
      "Lexique des verbes d'observation scientifique",
      "Fiche méthode : observer vs interpréter",
      "Grille d'auto-évaluation du journal",
    ],
    projectableSupports: [
      "Exemples de journaux de terrain célèbres (naturalistes, explorateurs)",
      "Vidéo courte : comment légender un schéma scientifique",
      "Diaporama des observations de la semaine pour comparaison collective",
    ],
    differentiation: {
      guidance: {
        label: "Guidage fort",
        description: "Avec aide structurée à chaque étape",
        supports: [
          "Page de journal pré-structurée avec cases à compléter",
          "Banque de mots d'observation à utiliser",
          "Binôme avec un pair plus avancé pour les légendages",
        ],
      },
      medium: {
        label: "Guidage intermédiaire",
        description: "Avec gabarit et points de vérification",
        supports: [
          "Gabarit semi-ouvert avec rappels de structure",
          "Checklist des éléments attendus dans une entrée",
          "Retour de l'enseignant après la 2e entrée",
        ],
      },
      autonomy: {
        label: "Autonomie",
        description: "Travail libre avec contraintes pédagogiques",
        supports: [
          "Journal entièrement libre dans le format",
          "Défi : trouver un fait contre-intuitif à observer",
          "Prolongement possible vers un exposé thématique",
        ],
      },
    },
    assessment: {
      type: "formative",
      criteria: [
        "Régularité des entrées",
        "Précision du vocabulaire d'observation",
        "Qualité de la distinction observation/interprétation",
        "Clarté des légendes",
      ],
      selfEvaluation: [
        "J'ai noté au moins une observation par semaine",
        "Je distingue ce que j'ai vu de ce que je suppose",
        "Mes dessins sont légendés",
        "Je peux expliquer une observation à voix haute",
      ],
    },
    restitution: {
      family:
        "Le journal de terrain est montré aux familles lors d'une exposition de classe. Un texte court accompagne chaque journal pour expliquer la démarche.",
      teacher:
        "L'enseignant évalue le journal sur 4 critères : régularité, précision, distinction observation/interprétation, qualité des légendes.",
    },
    associatedPlace: "observatoire",
    associatedBadges: ["lecteur-des-indices", "gardien-du-vivant"],
    officialReference: {
      cycle: "Cycle 3",
      level: "CM2",
      domain: "Écriture / Sciences et technologie",
      competencyItems: [
        "Écrire — rédiger des écrits variés adaptés à la situation",
        "Pratiquer des démarches scientifiques — observer avec méthode",
        "S'exprimer à l'oral pour rendre compte d'une observation",
      ],
      programReference:
        "B.O. spécial n°11 du 26 novembre 2015 — Programmes du cycle 3",
    },
    lsuLinks: [
      {
        domain: "Français",
        items: [
          "Écriture — produire des écrits variés (journaux, comptes rendus)",
          "Langage oral — présenter et partager une production",
        ],
      },
      {
        domain: "Sciences et technologie",
        items: [
          "Pratiquer des démarches scientifiques — distinguer observation et interprétation",
          "Utiliser des outils et mobiliser des méthodes pour apprendre",
        ],
      },
    ],
    crossCurricular: [
      {
        framework: "EDD",
        description:
          "Développer une sensibilité au vivant par l'observation de terrain et la tenue d'un journal naturaliste.",
      },
    ],
    accessibility: {
      dyslexia:
        "Police adaptée, retrait optionnel de la contrainte de cursive, dictée vocale acceptée pour les entrées de journal.",
      ulis:
        "Gabarit simplifié avec pictogrammes, travail en dictée à l'adulte, réduction du nombre d'entrées attendues.",
      eip:
        "Défi de comparaison avec des journaux de naturalistes célèbres (Darwin, Fabre) et production d'une entrée bilingue.",
      general: [
        "Lecture à voix haute des consignes en début de séance",
        "Possibilité de schéma légendé en remplacement du texte d'observation",
      ],
    },
    qualityStatus: {
      state: "validée",
      note:
        "Mission complète avec toutes les modalités : différenciation, accessibilité, LSU et programme.",
      updatedAt: "2026-05",
    },
    sequence: [
      {
        order: 1,
        title: "Qu'est-ce qu'un journal de terrain ?",
        duration: "45 min",
        type: "découverte",
        description:
          "Découverte de journaux de naturalistes et de leurs caractéristiques. Identification des éléments d'une entrée de journal : date, lieu, observation brute, dessin légendé, hypothèse.",
      },
      {
        order: 2,
        title: "Première observation guidée",
        duration: "45 min",
        type: "entraînement",
        description:
          "Observation collective d'un phénomène vivant simple (plante, insecte, météo). Rédaction de la première entrée sur gabarit avec aide de l'enseignant.",
      },
      {
        order: 3,
        title: "Observations autonomes",
        duration: "2 × 30 min sur 2 semaines",
        type: "entraînement",
        description:
          "Chaque élève rédige ses propres entrées à partir d'observations choisies. L'enseignant effectue un retour intermédiaire après la 2e entrée.",
      },
      {
        order: 4,
        title: "Confrontation et vérification",
        duration: "45 min",
        type: "évaluation",
        description:
          "Les élèves comparent leurs observations sur un même phénomène. Débat sur les divergences : qu'est-ce que cela révèle sur la distinction observation / interprétation ?",
      },
      {
        order: 5,
        title: "Présentation et exposition",
        duration: "45 min",
        type: "restitution",
        description:
          "Chaque élève présente une entrée de son journal à la classe. Les journaux sont exposés pour les familles avec un texte court d'accompagnement.",
      },
    ],
  },

  {
    slug: "ecoquartier-des-felinois",
    title: "L'écoquartier des Félinois",
    subtitle: "Concevoir un espace de vie durable",
    mainSubject: "Géographie / Sciences et technologie",
    associatedSubjects: [
      "Mathématiques",
      "Arts plastiques",
      "Français",
      "EMC",
    ],
    duration: "4 semaines",
    status: "disponible",
    theme: themes.jade,
    synopsis:
      "Les élèves conçoivent en équipe un écoquartier imaginaire pour les habitants de la forêt de Félix. Ils doivent intégrer des contraintes réelles : accès aux services, mobilité douce, espaces verts, gestion de l'eau. Le projet articule lecture de cartes, calculs de surfaces, argumentation et production plastique.",
    felixRole:
      "Félix joue le rôle de maire de la forêt qui commande un projet d'aménagement responsable. Il soumet des contraintes réelles à chaque équipe et valide les plans en posant des questions de justification.",
    skills: [
      {
        id: "cartographier",
        label: "Cartographier",
        gesture: "expliquer",
        observable:
          "L'élève produit un plan légendé avec une échelle et une orientation.",
      },
      {
        id: "argumenter",
        label: "Justifier",
        gesture: "justifier",
        observable:
          "L'élève défend ses choix d'aménagement avec des arguments liés aux contraintes.",
      },
      {
        id: "cooperer",
        label: "Coopérer",
        gesture: "coopérer",
        observable:
          "L'élève joue un rôle défini dans le groupe et contribue à la production collective.",
      },
    ],
    objectives: [
      "Comprendre les notions d'aménagement durable et de territoire",
      "Produire un plan légendé avec orientation et légende complète",
      "Défendre oralement un projet face à un jury",
      "Relier géographie, sciences et mathématiques dans une production concrète",
    ],
    successCriteria: [
      "Le plan est lisible, orienté, légendé et à l'échelle approximative",
      "Le projet répond à au moins 3 des 5 contraintes imposées",
      "Chaque élève peut expliquer au moins un choix d'aménagement",
      "La présentation orale dure entre 3 et 5 minutes",
    ],
    evidence: [
      {
        type: "production",
        description: "Plan de l'écoquartier dessiné et légendé",
      },
      {
        type: "oral",
        description: "Présentation du projet devant un jury (classe + enseignant)",
      },
      {
        type: "écrit",
        description: "Notice de présentation du quartier (1 page par groupe)",
      },
    ],
    printableSupports: [
      "Fiche des contraintes d'aménagement à respecter",
      "Gabarit de plan quadrillé avec rose des vents",
      "Lexique du géographe et de l'urbaniste",
      "Grille de présentation orale",
    ],
    projectableSupports: [
      "Exemples de plans de quartiers durables réels",
      "Vidéo : qu'est-ce qu'un écoquartier ?",
      "Carte interactive pour comparer des mobilités",
    ],
    differentiation: {
      guidance: {
        label: "Guidage fort",
        description: "Avec rôles attribués et étapes balisées",
        supports: [
          "Fiche de rôle dans le groupe (architecte, écologiste, urbaniste)",
          "Plan pré-quadrillé avec zones déjà placées",
          "Questions guidantes pour chaque étape de la conception",
        ],
      },
      medium: {
        label: "Guidage intermédiaire",
        description: "Avec contraintes et points de contrôle",
        supports: [
          "Liste des 5 contraintes à cocher au fur et à mesure",
          "Exemple annoté d'un plan de quartier",
          "Retour enseignant en mi-projet",
        ],
      },
      autonomy: {
        label: "Autonomie",
        description: "Conception libre dans le cadre",
        supports: [
          "Liberté de choix des contraintes supplémentaires",
          "Recherche documentaire autonome sur les écoquartiers réels",
          "Défi : proposer un indicateur de durabilité inventé par le groupe",
        ],
      },
    },
    assessment: {
      type: "sommative",
      criteria: [
        "Qualité et lisibilité du plan",
        "Respect des contraintes imposées",
        "Qualité de l'argumentation orale",
        "Contribution individuelle au travail collectif",
      ],
      selfEvaluation: [
        "Mon rôle dans le groupe était clair et j'ai joué ce rôle",
        "Notre plan répond aux contraintes imposées par Félix",
        "Je peux expliquer au moins deux choix d'aménagement",
        "Notre présentation a été organisée et claire",
      ],
    },
    restitution: {
      family:
        "Les plans sont exposés dans la classe lors d'une inauguration fictive. Les familles peuvent poser des questions comme des habitants du quartier.",
      teacher:
        "L'enseignant évalue le plan, la notice écrite et la présentation orale selon la grille fournie. Une note de contribution individuelle est ajoutée.",
    },
    associatedPlace: "cartotheque-des-lisieres",
    associatedBadges: ["cartographe", "batisseur", "allie-du-collectif"],
    officialReference: {
      cycle: "Cycle 3",
      level: "CM2",
      domain: "Géographie / Sciences et technologie / EMC",
      competencyItems: [
        "Se repérer dans l'espace — produire des plans et des cartes légendés",
        "Pratiquer différents langages en géographie — schémas, plans",
        "Coopérer et mutualiser — participer à un projet collectif",
        "Concevoir, créer, fabriquer — résoudre des problèmes techniques",
      ],
      programReference:
        "B.O. spécial n°11 du 26 novembre 2015 — Programmes du cycle 3",
    },
    lsuLinks: [
      {
        domain: "Géographie",
        items: [
          "Se repérer dans l'espace — produire des représentations de l'espace",
          "Raisonner — justifier des choix d'aménagement avec des arguments",
        ],
      },
      {
        domain: "Mathématiques",
        items: [
          "Grandeurs et mesures — estimer et calculer des surfaces",
          "Géométrie — utiliser une échelle approximative sur un plan",
        ],
      },
      {
        domain: "EMC",
        items: [
          "La sensibilité — identifier et exprimer ses émotions et ses opinions en respectant celles d'autrui",
          "Le jugement — participer à une discussion, un débat, un vote",
        ],
      },
    ],
    crossCurricular: [
      {
        framework: "EDD",
        description:
          "Concevoir un espace de vie durable en intégrant des contraintes environnementales réelles : mobilité douce, gestion de l'eau, espaces verts.",
      },
      {
        framework: "EMC",
        description:
          "Pratiquer la coopération et la délibération collective dans un projet de décision partagée.",
      },
    ],
    accessibility: {
      dyslexia:
        "Consignes oralisées et disponibles en version simplifiée, fiche des contraintes disponible en pictogrammes.",
      ulis:
        "Plan pré-quadrillé avec zones déjà indiquées, rôle simplifié dans le groupe (traceur ou rapporteur), accompagnement en binôme.",
      eip:
        "Défi supplémentaire : intégrer une contrainte de densité de population et proposer un indicateur de durabilité inventé par le groupe.",
      general: [
        "Temps supplémentaire pour la production du plan",
        "Grille de présentation orale fournie à l'avance",
      ],
    },
    qualityStatus: {
      state: "validée",
      note:
        "Mission complète avec différenciation trois niveaux, accessibilité, LSU, programme, CRCN/EDD/EMC et séquence.",
      updatedAt: "2026-05",
    },
    sequence: [
      {
        order: 1,
        title: "Qu'est-ce qu'un écoquartier ?",
        duration: "45 min",
        type: "découverte",
        description:
          "Présentation de plans de quartiers réels et durables. Identification des critères d'un écoquartier : mobilité douce, espaces verts, services accessibles, gestion de l'eau. Félix présente les cinq contraintes du projet.",
      },
      {
        order: 2,
        title: "Répartition des rôles et premières esquisses",
        duration: "45 min",
        type: "entraînement",
        description:
          "Chaque groupe définit ses rôles (architecte, écologiste, urbaniste, rapporteur). Premières esquisses à main levée sur gabarit. Validation des contraintes prises en compte.",
      },
      {
        order: 3,
        title: "Construction du plan légendé",
        duration: "60 min",
        type: "entraînement",
        description:
          "Réalisation du plan quadrillé avec rose des vents, légende complète et approximation d'échelle. Retour enseignant en mi-séance sur la lisibilité et les contraintes.",
      },
      {
        order: 4,
        title: "Rédaction de la notice",
        duration: "45 min",
        type: "entraînement",
        description:
          "Chaque groupe rédige une notice de présentation d'une page : justification de trois choix d'aménagement, lien avec les contraintes imposées par Félix.",
      },
      {
        order: 5,
        title: "Présentation devant jury",
        duration: "60 min",
        type: "restitution",
        description:
          "Présentation de 3 à 5 minutes par groupe devant un jury (classe + enseignant). Chaque élève explique au moins un choix d'aménagement. Les plans sont exposés pour une inauguration fictive ouverte aux familles.",
      },
    ],
  },

  {
    slug: "republique-des-eleves",
    title: "La République des élèves",
    subtitle: "Comprendre et pratiquer la démocratie",
    mainSubject: "EMC / Histoire",
    associatedSubjects: ["Français", "Éducation civique et morale"],
    duration: "3 semaines",
    status: "disponible",
    theme: themes.gold,
    synopsis:
      "En s'appuyant sur l'histoire de la République française et ses symboles, les élèves créent leur propre conseil de classe démocratique. Ils rédigent une charte, organisent des élections, débattent de règles de vie et produisent un texte collectif sur les droits et devoirs.",
    felixRole:
      "Félix est citoyen de la forêt, ni chef ni suiveur. Il anime les débats en posant des questions sur la légitimité, la représentation et la justice. Il rappelle que la démocratie se pratique, elle ne se décrète pas.",
    skills: [
      {
        id: "argumenter",
        label: "Argumenter",
        gesture: "justifier",
        observable:
          "L'élève défend une position avec des arguments distincts et respectueux.",
      },
      {
        id: "ecrire-regles",
        label: "Rédiger des règles",
        gesture: "produire une trace",
        observable:
          "L'élève formule une règle de vie compréhensible, juste et applicable.",
      },
      {
        id: "participer",
        label: "Participer",
        gesture: "coopérer",
        observable:
          "L'élève prend la parole, écoute les autres et adapte sa position.",
      },
    ],
    objectives: [
      "Connaître les institutions de la République française et leurs rôles",
      "Comprendre les principes de liberté, égalité, fraternité dans la vie quotidienne",
      "Rédiger une charte de classe en appliquant des principes démocratiques",
      "Participer à un débat réglé avec des arguments structurés",
    ],
    successCriteria: [
      "L'élève cite au moins 3 institutions républicaines et leur rôle",
      "La charte de classe est rédigée avec des droits ET des devoirs",
      "L'élève a pris la parole au moins 2 fois pendant les débats",
      "Le texte collectif utilise le vocabulaire civique étudié",
    ],
    evidence: [
      {
        type: "écrit",
        description: "Charte de classe rédigée collectivement",
      },
      {
        type: "oral",
        description: "Participation à un débat avec arguments notés",
      },
      {
        type: "trace",
        description: "Carnet individuel avec le vocabulaire civique et un schéma des institutions",
      },
    ],
    printableSupports: [
      "Fiche chronologique de la République française",
      "Tableau des institutions : nom, rôle, élus ou nommés",
      "Modèle de charte avec structure droits / devoirs",
      "Fiche de préparation au débat (position + 2 arguments)",
    ],
    projectableSupports: [
      "Carte mentale des symboles de la République",
      "Vidéo courte : comment fonctionne une élection ?",
      "Exemples de chartes de classe d'autres écoles",
    ],
    differentiation: {
      guidance: {
        label: "Guidage fort",
        description: "Avec modèles et vocabulaire fournis",
        supports: [
          "Banque de phrases civiques à reformuler",
          "Tableau des institutions à compléter (non à produire)",
          "Aide à la prise de parole : script de débat simplifié",
        ],
      },
      medium: {
        label: "Guidage intermédiaire",
        description: "Avec structure et exemples",
        supports: [
          "Modèle de charte à compléter",
          "Liste du vocabulaire civique à utiliser dans le débat",
          "Retour enseignant après le premier argumentaire écrit",
        ],
      },
      autonomy: {
        label: "Autonomie",
        description: "Conception libre des productions",
        supports: [
          "Rédaction d'une charte originale sans modèle",
          "Recherche documentaire autonome sur un pays avec un autre système politique",
          "Défi : inventer une 4e valeur républicaine et la défendre",
        ],
      },
    },
    assessment: {
      type: "co-évaluation",
      criteria: [
        "Qualité du vocabulaire civique utilisé",
        "Structure et équilibre droits/devoirs dans la charte",
        "Qualité de la participation aux débats",
        "Compréhension des institutions républicaines",
      ],
      selfEvaluation: [
        "Je connais le rôle d'au moins 3 institutions républicaines",
        "J'ai contribué à rédiger la charte de classe",
        "J'ai participé au débat avec au moins un argument",
        "Je comprends la différence entre un droit et un devoir",
      ],
    },
    restitution: {
      family:
        "La charte de classe est affichée dans la salle et présentée aux familles lors d'une réunion. Chaque élève explique sa contribution.",
      teacher:
        "L'enseignant évalue la participation aux débats (grille d'observation), le carnet de vocabulaire et la contribution à la charte.",
    },
    associatedPlace: "agora",
    associatedBadges: ["porte-parole", "allie-du-collectif"],
  },

  {
    slug: "station-meteo-de-felix",
    title: "La station météo de Félix",
    subtitle: "Mesurer, analyser, prévoir",
    mainSubject: "Sciences et technologie / Mathématiques",
    associatedSubjects: ["Géographie", "Français"],
    duration: "4 semaines",
    status: "disponible",
    theme: themes.sky,
    synopsis:
      "Les élèves construisent une station météorologique simple et réalisent des relevés quotidiens pendant un mois. Ils apprennent à mesurer température, précipitations et vent, à représenter des données sur des graphiques et à formuler des prévisions à partir de tendances observées.",
    felixRole:
      "Félix est l'ancien météorologue de la forêt. Il a perdu ses instruments et demande aux élèves de reconstituer ses relevés. Il enseigne la différence entre données brutes, représentation graphique et prévision.",
    skills: [
      {
        id: "mesurer",
        label: "Mesurer",
        gesture: "vérifier",
        observable:
          "L'élève effectue un relevé précis avec l'unité correcte et le note immédiatement.",
      },
      {
        id: "representer",
        label: "Représenter des données",
        gesture: "expliquer",
        observable:
          "L'élève choisit et produit un graphique adapté à la série de données.",
      },
      {
        id: "formuler",
        label: "Formuler une hypothèse",
        gesture: "chercher",
        observable:
          "L'élève propose une prévision basée sur les tendances des données recueillies.",
      },
    ],
    objectives: [
      "Construire et utiliser des instruments de mesure simples",
      "Réaliser des relevés quotidiens et les enregistrer avec méthode",
      "Représenter une série de données sous forme de graphique",
      "Formuler une prévision météo argumentée à partir des tendances",
    ],
    successCriteria: [
      "L'élève effectue des relevés cohérents pendant au moins 10 jours consécutifs",
      "Le graphique est titré, daté, avec axes légendés et unités correctes",
      "La prévision formulée s'appuie explicitement sur les tendances observées",
      "L'élève peut expliquer une anomalie dans ses relevés",
    ],
    evidence: [
      {
        type: "trace",
        description: "Tableau de relevés météo sur 4 semaines",
      },
      {
        type: "production",
        description: "Graphique annoté avec titre et commentaire",
      },
      {
        type: "oral",
        description: "Bulletin météo présenté à la classe",
      },
    ],
    printableSupports: [
      "Tableau de relevés météo (température, précipitations, vent)",
      "Gabarit de graphique pour courbes de température",
      "Fiche de construction d'un pluviomètre et d'une girouette",
      "Grille de présentation du bulletin météo",
    ],
    projectableSupports: [
      "Modèle de graphique climatique annoté",
      "Vidéo : comment les météorologues font leurs prévisions",
      "Comparaison de climatogrammes de différentes régions françaises",
    ],
    differentiation: {
      guidance: {
        label: "Guidage fort",
        description: "Avec tableaux pré-remplis et graphique guidé",
        supports: [
          "Tableau de relevés avec colonnes et exemples déjà remplis",
          "Graphique pré-tracé à compléter",
          "Aide pour formuler la prévision avec un modèle de phrase",
        ],
      },
      medium: {
        label: "Guidage intermédiaire",
        description: "Avec exemples et points de vérification",
        supports: [
          "Tableau vierge avec rappels des unités",
          "Exemple de graphique à analyser avant de produire le sien",
          "Retour enseignant après le premier graphique",
        ],
      },
      autonomy: {
        label: "Autonomie",
        description: "Recherche et représentation libres",
        supports: [
          "Choix du type de graphique (courbe, histogramme, camembert)",
          "Comparaison avec les données d'une ville différente",
          "Défi : calculer la température moyenne mensuelle et comparer avec la normale",
        ],
      },
    },
    assessment: {
      type: "formative",
      criteria: [
        "Régularité et précision des relevés",
        "Qualité de la représentation graphique",
        "Cohérence de la prévision avec les données",
        "Clarté de la présentation orale",
      ],
      selfEvaluation: [
        "J'ai effectué mes relevés régulièrement sans oublier",
        "Mon graphique a un titre, des axes légendés et des unités",
        "Ma prévision s'appuie sur les tendances que j'ai observées",
        "Je peux présenter mes données à la classe",
      ],
    },
    restitution: {
      family:
        "Un bulletin météo final est envoyé aux familles avec les graphiques produits et la prévision formulée par l'élève.",
      teacher:
        "L'enseignant évalue les relevés (régularité, précision), le graphique (structure, lisibilité) et la prévision (cohérence avec les données).",
    },
    associatedPlace: "observatoire",
    associatedBadges: ["maitre-des-mesures", "lecteur-des-indices"],
  },

  {
    slug: "grand-atlas-des-mobilites",
    title: "Le grand atlas des mobilités",
    subtitle: "Cartographier les façons de se déplacer",
    mainSubject: "Géographie",
    associatedSubjects: ["Mathématiques", "Français", "EMC"],
    duration: "3 semaines",
    status: "bientôt",
    theme: themes.sky,
    synopsis:
      "Les élèves enquêtent sur les modes de déplacement dans leur commune et en France. Ils produisent un atlas collectif : cartes thématiques, données statistiques, comparaisons régionales et propositions d'amélioration. Le projet articule lecture de cartes, traitement de données et prise de position citoyenne.",
    felixRole:
      "Félix est cartographe de la forêt. Il sait que chaque déplacement laisse une trace et que comprendre comment les êtres bougent, c'est comprendre comment ils vivent.",
    skills: [
      {
        id: "lire-carte",
        label: "Lire une carte",
        gesture: "observer",
        observable:
          "L'élève extrait des informations d'une carte thématique en utilisant la légende.",
      },
      {
        id: "produire-carte",
        label: "Produire une carte",
        gesture: "créer",
        observable:
          "L'élève réalise une carte thématique avec titre, légende, orientation et source.",
      },
      {
        id: "traiter-donnees",
        label: "Traiter des données",
        gesture: "vérifier",
        observable:
          "L'élève classe et représente des données chiffrées sur les modes de transport.",
      },
    ],
    objectives: [
      "Connaître et comparer les principaux modes de déplacement en France",
      "Produire une carte thématique sur les mobilités avec légende complète",
      "Analyser des données statistiques sur les transports",
      "Formuler une position citoyenne sur la mobilité durable",
    ],
    successCriteria: [
      "La carte produite comporte titre, légende, orientation et source",
      "L'analyse statistique identifie au moins 2 tendances",
      "L'élève peut comparer deux modes de transport avec des critères précis",
      "Le texte de position s'appuie sur des données chiffrées",
    ],
    evidence: [
      {
        type: "production",
        description: "Page d'atlas avec carte et commentaire",
      },
      {
        type: "écrit",
        description: "Texte de position sur la mobilité durable",
      },
      {
        type: "oral",
        description: "Présentation de la page d'atlas au reste de la classe",
      },
    ],
    printableSupports: [
      "Carte de France vierge avec régions pour cartographie",
      "Tableau de données sur les modes de transport",
      "Fiche méthode : construire une légende cartographique",
      "Grille d'analyse comparative des modes de transport",
    ],
    projectableSupports: [
      "Exemples de cartes des mobilités en France",
      "Infographies sur l'empreinte carbone des transports",
      "Vidéo : comment les géographes lisent une carte de flux",
    ],
    differentiation: {
      guidance: {
        label: "Guidage fort",
        description: "Avec données pré-traitées et carte simplifiée",
        supports: [
          "Tableau de données déjà calculées à représenter",
          "Carte pré-dessinée avec zones à colorier",
          "Modèle de légende à compléter",
        ],
      },
      medium: {
        label: "Guidage intermédiaire",
        description: "Avec données brutes et modèles",
        supports: [
          "Données brutes avec rappel de la méthode de calcul",
          "Exemple annoté d'une page d'atlas",
          "Retour enseignant après le premier jet de carte",
        ],
      },
      autonomy: {
        label: "Autonomie",
        description: "Recherche et production entièrement autonomes",
        supports: [
          "Recherche documentaire libre sur les mobilités mondiales",
          "Défi : comparer les mobilités de deux pays",
          "Production d'une page d'atlas bonus sur un territoire choisi",
        ],
      },
    },
    assessment: {
      type: "sommative",
      criteria: [
        "Qualité et lisibilité de la carte produite",
        "Pertinence de l'analyse des données",
        "Qualité de la position citoyenne",
        "Clarté de la présentation orale",
      ],
      selfEvaluation: [
        "Ma carte a une légende, un titre et une orientation",
        "J'ai utilisé des données chiffrées dans mon analyse",
        "Ma position sur la mobilité durable est argumentée",
        "J'ai pu présenter ma page d'atlas clairement",
      ],
    },
    restitution: {
      family:
        "L'atlas collectif est présenté lors d'une exposition. Chaque élève présente sa page et répond aux questions des visiteurs.",
      teacher:
        "L'enseignant évalue la page d'atlas (carte, légende, commentaire) et le texte de position (arguments, données citées).",
    },
    associatedPlace: "cartotheque-des-lisieres",
    associatedBadges: ["cartographe", "pisteur-des-sources"],
  },

  {
    slug: "musee-des-imaginaires-de-felix",
    title: "Le musée des imaginaires de Félix",
    subtitle: "Lire, interpréter, exposer",
    mainSubject: "Littérature / Arts",
    associatedSubjects: ["Français", "Histoire des arts", "EMC"],
    duration: "3 semaines",
    status: "bientôt",
    theme: themes.gold,
    synopsis:
      "Les élèves lisent des extraits de littérature de jeunesse qui mettent en scène des personnages animaux. Ils analysent les procédés littéraires, comparent des univers narratifs et créent leur propre page de musée : un texte critique accompagné d'une œuvre plastique.",
    felixRole:
      "Félix est conservateur du musée. Il guide les élèves dans l'interprétation des œuvres, leur apprend à distinguer ce qui est montré de ce qui est suggéré, et insiste sur la trace écrite comme outil de partage.",
    skills: [
      {
        id: "interpreter",
        label: "Interpréter",
        gesture: "expliquer",
        observable:
          "L'élève distingue ce qui est explicite dans le texte de ce qui est implicite.",
      },
      {
        id: "argumenter",
        label: "Argumenter",
        gesture: "justifier",
        observable:
          "L'élève défend une lecture d'une œuvre avec des preuves tirées du texte.",
      },
      {
        id: "creer",
        label: "Créer",
        gesture: "créer",
        observable:
          "L'élève produit une œuvre plastique cohérente avec son interprétation textuelle.",
      },
    ],
    objectives: [
      "Lire et comprendre des extraits littéraires avec des personnages animaux",
      "Identifier les procédés littéraires qui humanisent un personnage animal",
      "Écrire un texte critique court qui argumente une interprétation",
      "Produire une œuvre plastique en lien avec la lecture",
    ],
    successCriteria: [
      "Le texte critique cite au moins 2 passages du livre avec justification",
      "L'élève identifie au moins 1 procédé littéraire et l'explique",
      "L'œuvre plastique est accompagnée d'un texte d'intention",
      "L'élève peut défendre son interprétation face à une question",
    ],
    evidence: [
      {
        type: "écrit",
        description: "Texte critique de 10 à 15 lignes avec citations",
      },
      {
        type: "production",
        description: "Œuvre plastique accompagnée d'un texte d'intention",
      },
      {
        type: "oral",
        description: "Présentation de la page de musée devant la classe",
      },
    ],
    printableSupports: [
      "Extraits des œuvres étudiées avec questions de lecture",
      "Fiche méthode : écrire un texte critique",
      "Gabarit de page de musée (espace texte + espace image)",
      "Lexique des procédés littéraires",
    ],
    projectableSupports: [
      "Exemples de pages de catalogues de musées",
      "Œuvres plastiques en lien avec la littérature animalière",
      "Vidéo : comment écrire un texte de critique d'art",
    ],
    differentiation: {
      guidance: {
        label: "Guidage fort",
        description: "Avec extraits pré-annotés et modèle de texte",
        supports: [
          "Extraits avec procédés déjà surlignés et nommés",
          "Modèle de texte critique avec blancs à compléter",
          "Aide à la production plastique par des esquisses guidées",
        ],
      },
      medium: {
        label: "Guidage intermédiaire",
        description: "Avec fiche méthode et exemples",
        supports: [
          "Fiche méthode du texte critique sans modèle",
          "Exemple de texte critique annoté d'une œuvre différente",
          "Retour enseignant après le premier jet écrit",
        ],
      },
      autonomy: {
        label: "Autonomie",
        description: "Choix libre et production originale",
        supports: [
          "Choix libre de l'œuvre dans une liste élargie",
          "Production plastique entièrement libre",
          "Défi : comparer deux personnages animaux de deux livres différents",
        ],
      },
    },
    assessment: {
      type: "formative",
      criteria: [
        "Pertinence des citations choisies",
        "Qualité de l'argumentation du texte critique",
        "Cohérence entre l'œuvre plastique et le texte",
        "Clarté de la présentation orale",
      ],
      selfEvaluation: [
        "Mon texte critique cite des passages précis du livre",
        "J'ai nommé et expliqué au moins un procédé littéraire",
        "Mon œuvre plastique est cohérente avec mon interprétation",
        "Je peux expliquer mes choix artistiques",
      ],
    },
    restitution: {
      family:
        "Le musée est ouvert aux familles pendant une soirée. Chaque élève joue le rôle de guide pour sa page d'exposition.",
      teacher:
        "L'enseignant évalue le texte critique (citations, argumentation) et la cohérence entre l'œuvre et le texte d'intention.",
    },
    associatedPlace: "galerie-des-empreintes",
    associatedBadges: ["lecteur-des-indices", "porte-parole"],
  },

  {
    slug: "atelier-des-objets-utiles",
    title: "L'atelier des objets utiles",
    subtitle: "Concevoir, fabriquer, tester",
    mainSubject: "Sciences et technologie",
    associatedSubjects: ["Mathématiques", "Français", "Arts plastiques"],
    duration: "4 semaines",
    status: "en préparation",
    theme: themes.ember,
    synopsis:
      "Les élèves reçoivent un cahier des charges pour fabriquer un objet utile à l'école. Ils passent par toutes les étapes du processus de conception : identification du besoin, esquisse, choix des matériaux, fabrication, test et amélioration. Le projet développe la pensée design et la résolution de problèmes techniques.",
    felixRole:
      "Félix est inventeur de la forêt. Il a fabriqué des centaines d'objets inutiles avant de comprendre qu'un bon objet répond à un vrai besoin. Il accompagne les élèves à chaque étape et pose toujours la question : « À quoi ça sert vraiment ? »",
    skills: [
      {
        id: "concevoir",
        label: "Concevoir",
        gesture: "créer",
        observable:
          "L'élève produit une esquisse annotée qui répond aux contraintes du cahier des charges.",
      },
      {
        id: "tester",
        label: "Tester",
        gesture: "vérifier",
        observable:
          "L'élève teste son objet, identifie ses limites et propose des améliorations.",
      },
      {
        id: "documenter",
        label: "Documenter",
        gesture: "produire une trace",
        observable:
          "L'élève rédige une fiche technique qui décrit l'objet, ses matériaux et son usage.",
      },
    ],
    objectives: [
      "Comprendre le processus de conception d'un objet technique",
      "Produire des esquisses fonctionnelles annotées",
      "Fabriquer un objet qui répond à un cahier des charges précis",
      "Tester, évaluer et améliorer sa production",
    ],
    successCriteria: [
      "L'esquisse est annotée avec les matériaux, les dimensions et la fonction",
      "L'objet fabriqué répond à au moins 2 des 3 critères du cahier des charges",
      "La fiche technique est compréhensible par quelqu'un qui n'a pas participé",
      "L'élève peut expliquer une décision technique qu'il a prise",
    ],
    evidence: [
      {
        type: "production",
        description: "Objet fabriqué et testé",
      },
      {
        type: "trace",
        description: "Carnet de conception avec esquisses annotées",
      },
      {
        type: "écrit",
        description: "Fiche technique décrivant l'objet et son usage",
      },
    ],
    printableSupports: [
      "Cahier des charges avec critères à cocher",
      "Gabarit de carnet de conception",
      "Fiche technique vierge",
      "Grille d'évaluation des objets",
    ],
    projectableSupports: [
      "Vidéo : du besoin à l'objet, le processus de design",
      "Exemples d'objets techniques conçus par des enfants",
      "Présentation des étapes du projet avec jalons",
    ],
    differentiation: {
      guidance: {
        label: "Guidage fort",
        description: "Avec matériaux pré-sélectionnés et esquisse guidée",
        supports: [
          "Cahier des charges simplifié avec 2 critères au lieu de 3",
          "Kit de matériaux pré-sélectionnés",
          "Esquisse guidée avec zones à compléter",
        ],
      },
      medium: {
        label: "Guidage intermédiaire",
        description: "Avec jalons et retours structurés",
        supports: [
          "Jalons de projet balisés avec dates",
          "Retour enseignant après l'esquisse",
          "Liste de matériaux disponibles à trier",
        ],
      },
      autonomy: {
        label: "Autonomie",
        description: "Conception entièrement libre",
        supports: [
          "Liberté de choisir son propre besoin et son cahier des charges",
          "Recherche autonome de matériaux",
          "Défi : fabriquer un objet avec des contraintes écologiques",
        ],
      },
    },
    assessment: {
      type: "sommative",
      criteria: [
        "Qualité du carnet de conception",
        "Respect du cahier des charges",
        "Qualité de la fiche technique",
        "Capacité à expliquer ses choix techniques",
      ],
      selfEvaluation: [
        "Mon carnet de conception montre toutes les étapes de ma réflexion",
        "Mon objet répond à au moins 2 critères du cahier des charges",
        "Ma fiche technique est compréhensible sans explication orale",
        "Je peux expliquer pourquoi j'ai fait tel ou tel choix",
      ],
    },
    restitution: {
      family:
        "Les objets sont présentés lors d'une foire aux inventions. Les familles peuvent voter pour l'objet le plus utile.",
      teacher:
        "L'enseignant évalue le carnet de conception, la qualité de l'objet par rapport au cahier des charges et la fiche technique.",
    },
    associatedPlace: "atelier-des-objets",
    associatedBadges: ["batisseur", "maitre-des-mesures"],
  },

  {
    slug: "defi-sante-et-cooperation",
    title: "Le défi santé et coopération du lynx",
    subtitle: "Comprendre le corps, prendre soin des autres",
    mainSubject: "EPS / Sciences",
    associatedSubjects: ["EMC", "Français", "Sciences et technologie"],
    duration: "3 semaines",
    status: "en préparation",
    theme: themes.jade,
    synopsis:
      "Les élèves explorent les liens entre activité physique, alimentation et bien-être. Ils créent un programme de classe pour améliorer leur hygiène de vie collective et le présentent à leurs camarades de CE1. Le projet développe la connaissance du corps, la coopération et la capacité à transmettre des connaissances.",
    felixRole:
      "Félix a longtemps vécu dans la forêt seul. En rejoignant l'Académie, il a compris que prendre soin de soi et prendre soin des autres sont liés. Il accompagne les élèves dans cette double exploration.",
    skills: [
      {
        id: "expliquer",
        label: "Expliquer",
        gesture: "expliquer",
        observable:
          "L'élève explique le lien entre alimentation, activité physique et santé.",
      },
      {
        id: "cooperer",
        label: "Coopérer",
        gesture: "coopérer",
        observable:
          "L'élève contribue à un programme collectif en adaptant son rôle aux besoins du groupe.",
      },
      {
        id: "transmettre",
        label: "Transmettre",
        gesture: "expliquer",
        observable:
          "L'élève présente des connaissances à un public plus jeune avec un langage adapté.",
      },
    ],
    objectives: [
      "Comprendre les besoins nutritionnels et physiques du corps humain",
      "Identifier des habitudes saines et expliquer leurs effets",
      "Concevoir un programme de santé collectif adapté à la classe",
      "Transmettre des connaissances à un public plus jeune",
    ],
    successCriteria: [
      "L'élève cite 3 aliments par groupe nutritionnel et leur rôle",
      "Le programme collectif contient au moins 5 activités concrètes",
      "L'élève peut expliquer un élément du programme à un CE1",
      "La présentation utilise des supports visuels clairs",
    ],
    evidence: [
      {
        type: "production",
        description: "Programme de santé collectif affiché dans la classe",
      },
      {
        type: "oral",
        description: "Présentation du programme aux élèves de CE1",
      },
      {
        type: "écrit",
        description: "Carnet de bord individuel de la semaine santé",
      },
    ],
    printableSupports: [
      "Tableau des groupes alimentaires",
      "Carnet de bord de la semaine santé",
      "Modèle de programme de classe",
      "Fiche de préparation de la présentation CE1",
    ],
    projectableSupports: [
      "Infographie : la pyramide alimentaire",
      "Vidéo : comment l'activité physique agit sur le cerveau",
      "Exemples de programmes de santé à l'école",
    ],
    differentiation: {
      guidance: {
        label: "Guidage fort",
        description: "Avec informations pré-organisées",
        supports: [
          "Tableau des groupes alimentaires déjà rempli à commenter",
          "Programme modèle à adapter plutôt qu'à créer",
          "Aide à la préparation de la présentation CE1",
        ],
      },
      medium: {
        label: "Guidage intermédiaire",
        description: "Avec ressources et jalons",
        supports: [
          "Liste de ressources documentaires sur la nutrition",
          "Modèle de programme avec sections vides",
          "Retour enseignant avant la présentation CE1",
        ],
      },
      autonomy: {
        label: "Autonomie",
        description: "Recherche et production libres",
        supports: [
          "Recherche documentaire autonome sur un thème santé choisi",
          "Création d'un support visuel original",
          "Défi : évaluer le programme de la classe après 2 semaines",
        ],
      },
    },
    assessment: {
      type: "co-évaluation",
      criteria: [
        "Exactitude des informations sur la nutrition",
        "Qualité du programme collectif",
        "Adaptation du langage pour la présentation CE1",
        "Contribution individuelle au travail collectif",
      ],
      selfEvaluation: [
        "Je connais les groupes alimentaires et leur rôle",
        "J'ai contribué au programme de classe",
        "J'ai adapté mon vocabulaire pour les CE1",
        "Je suis capable d'expliquer pourquoi une habitude est saine",
      ],
    },
    restitution: {
      family:
        "Le programme de santé est envoyé aux familles avec une invitation à participer à une activité physique de classe.",
      teacher:
        "L'enseignant évalue le carnet de bord, la contribution au programme collectif et la qualité de la présentation CE1.",
    },
    associatedPlace: "jardin-des-lisieres",
    associatedBadges: ["gardien-du-vivant", "porte-parole", "allie-du-collectif"],
  },

  {
    slug: "corps-relations-consentement-internet",
    title: "Corps, relations, consentement et Internet",
    subtitle: "Comprendre, se protéger, exprimer",
    mainSubject: "EMC / Prévention",
    associatedSubjects: ["Français", "Numérique", "Sciences"],
    duration: "3 semaines",
    status: "en préparation",
    theme: themes.gold,
    synopsis:
      "À travers des situations fictives liées à l'univers de Félix, les élèves explorent les notions de consentement, de respect du corps, de relations saines et de protection sur Internet. Le projet combine discussions guidées, production de ressources et mise en situation.",
    felixRole:
      "Félix est un guide discret et bienveillant. Il ne juge jamais, mais il pose des questions qui font réfléchir. Il aide les élèves à nommer ce qu'ils ressentent et à identifier les comportements qui posent problème.",
    skills: [
      {
        id: "nommer",
        label: "Nommer",
        gesture: "expliquer",
        observable:
          "L'élève utilise le vocabulaire adapté pour décrire le corps, les émotions et les relations.",
      },
      {
        id: "identifier",
        label: "Identifier",
        gesture: "observer",
        observable:
          "L'élève reconnaît des situations problématiques dans des vignettes ou des mises en situation.",
      },
      {
        id: "agir",
        label: "Agir",
        gesture: "chercher",
        observable:
          "L'élève identifie des ressources et des personnes de confiance à qui parler.",
      },
    ],
    objectives: [
      "Connaître le vocabulaire du corps humain et des émotions",
      "Comprendre les notions de consentement et de respect du corps",
      "Identifier des comportements acceptables et inacceptables dans les relations",
      "Comprendre les risques liés à Internet et savoir où chercher de l'aide",
    ],
    successCriteria: [
      "L'élève utilise un vocabulaire anatomique et émotionnel précis",
      "L'élève peut expliquer le consentement avec ses propres mots",
      "L'élève identifie au moins 2 personnes de confiance à qui parler",
      "L'élève connaît au moins 1 ressource d'aide en ligne sécurisée",
    ],
    evidence: [
      {
        type: "écrit",
        description: "Fiche personnelle « mes personnes de confiance »",
      },
      {
        type: "production",
        description: "Affiche collective sur les droits et le consentement",
      },
      {
        type: "oral",
        description: "Participation aux discussions guidées",
      },
    ],
    printableSupports: [
      "Vignettes de situations à analyser",
      "Fiche « mes personnes de confiance »",
      "Lexique du corps et des émotions",
      "Liste de ressources : numéros et sites d'aide",
    ],
    projectableSupports: [
      "Vidéo d'animation sur le consentement (adaptée CM2)",
      "Schéma du corps humain légendé",
      "Fiches situations pour discussion collective",
    ],
    differentiation: {
      guidance: {
        label: "Guidage fort",
        description: "Avec situations très concrètes et vocabulaire fourni",
        supports: [
          "Vignettes avec vocabulaire annoté",
          "Fiche de réponse guidée pour les discussions",
          "Soutien individuel de l'enseignant lors des activités sensibles",
        ],
      },
      medium: {
        label: "Guidage intermédiaire",
        description: "Avec situations et lexique disponibles",
        supports: [
          "Lexique disponible mais non imposé",
          "Retour enseignant sur les productions écrites",
          "Espace d'expression individuelle pour les questions sensibles",
        ],
      },
      autonomy: {
        label: "Autonomie",
        description: "Expression et recherche libres dans le cadre",
        supports: [
          "Espace de questions anonymes",
          "Recherche documentaire sur les ressources d'aide",
          "Rédaction libre sur un aspect choisi par l'élève",
        ],
      },
    },
    assessment: {
      type: "auto-évaluation",
      criteria: [
        "Maîtrise du vocabulaire du corps et des émotions",
        "Compréhension du consentement",
        "Connaissance des ressources d'aide",
        "Participation respectueuse aux discussions",
      ],
      selfEvaluation: [
        "Je sais nommer les parties du corps avec les mots exacts",
        "Je peux expliquer ce que veut dire le consentement",
        "Je sais à qui parler si quelque chose me pose problème",
        "Je connais un numéro ou un site pour demander de l'aide",
      ],
    },
    restitution: {
      family:
        "Un courrier informatif est envoyé aux familles avant le projet pour les associer à la démarche. L'affiche collective est présentée lors d'une réunion.",
      teacher:
        "L'enseignant évalue la participation aux discussions (observation), la fiche personnelle et la contribution à l'affiche collective.",
    },
    associatedPlace: "classe-atelier",
    associatedBadges: ["allie-du-collectif", "porte-parole"],
  },
];

export function getFelixProjectBySlug(
  slug: string,
): LearningMission | undefined {
  return felixProjects.find((project) => project.slug === slug);
}
