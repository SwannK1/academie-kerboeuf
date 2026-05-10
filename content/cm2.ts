import type { MissionTeacherUse } from "@/content/missions";
import type { MissionPedagogy } from "@/content/mission-types";

export type MissionStatus = "disponible" | "bientôt" | "en préparation";

export type MissionTheme = {
  name: string;
  accentClass: string;
  surfaceClass: string;
  textClass: string;
  ringClass: string;
};

export type Cm2Mission = {
  slug: string;
  title: string;
  description: string;
  subject: string;
  status: MissionStatus;
  theme: MissionTheme;
  objective: string;
  competencies: string[];
  upcomingActivities: string[];
  pedagogy: MissionPedagogy;
  curriculumDomain?: string;
  curriculumCompetency?: string;
  curriculumObjective?: string;
  officialLevel?: string;
  cycle?: string;
  skillTags?: string[];
  teacherUse?: MissionTeacherUse[];
  studentUse?: string;
};

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

export const cm2Level = {
  name: "CM2",
  cycle: "Primaire",
  character: "Félix",
  eyebrow: "Niveau primaire",
  title: "CM2 avec Félix",
  description:
    "Un parcours d’aventure pour consolider les fondamentaux, relier les matières et préparer l’entrée au collège avec des missions lisibles et motivantes.",
  href: "/primaire/cm2/missions",
};

// Legacy source — migration vers mission-registry en cours.
export const cm2Missions: Cm2Mission[] = [
  {
    slug: "mission-inference",
    title: "Mission Inférence",
    description:
      "Repérer les indices d’un texte pour comprendre ce qui n’est pas écrit directement.",
    subject: "Lecture",
    status: "disponible",
    theme: themes.jade,
    objective:
      "Aider Félix à décoder les indices cachés dans un récit pour construire une réponse justifiée.",
    competencies: [
      "Prélever des indices explicites dans un texte",
      "Formuler une hypothèse de lecture",
      "Justifier une réponse par des éléments du texte",
    ],
    upcomingActivities: [
      "Lecture d’un court récit à indices",
      "Carnet d’enquête avec preuves à relever",
      "Mini défi de justification orale",
    ],
    pedagogy: {
      immersiveIntroduction:
        "Félix entre dans la bibliothèque silencieuse de l’Académie. Rien n’est écrit noir sur blanc, mais chaque objet semble vouloir raconter ce qui vient de se passer.",
      narrativeContext:
        "La mission se déroule au retour d’une récréation pluvieuse. Pour aider Madame Lenoir, Félix doit relier les indices du texte, formuler des hypothèses et justifier chacune de ses réponses.",
      studentObjective:
        "Comprendre une information implicite en relevant des indices précis dans un texte court.",
      schoolSkill:
        "Faire une inférence en reliant plusieurs indices du texte à ses connaissances, puis justifier sa réponse par une phrase complète.",
      successCriteria: [
        "Je relève au moins deux indices précis dans le texte.",
        "Je formule une hypothèse qui reste possible avec ces indices.",
        "Je justifie ma réponse avec une phrase complète : je pense que... parce que...",
      ],
      duration: "20 à 30 minutes",
      level: "CM2 · Cycle 3",
      materials: [
        "Texte support projeté ou imprimé",
        "Crayon de couleur pour souligner les indices",
        "Cahier ou fiche réponse",
        "Tableau pour la mise en commun",
      ],
      usefulVocabulary: [
        "indice",
        "inférence",
        "hypothèse",
        "justifier",
        "implicite",
        "preuve",
      ],
      mainChallenge: {
        label: "Lis le texte support",
        content:
          "Lorsque Félix poussa la porte de la bibliothèque, la cloche venait à peine de sonner. Dans le couloir, plusieurs élèves secouaient leurs manteaux mouillés. La salle, d’habitude parfaitement rangée, semblait avoir été quittée trop vite. Sur la table du fond, un carnet était resté ouvert à la page des exposés. Une tache sombre s’étalait près de la marge, comme si une goutte était tombée dessus. Devant l’étagère des dictionnaires, Félix remarqua une trace de boue encore brillante. Madame Lenoir ramassa une écharpe rouge oubliée sur une chaise et murmura : « Quelqu’un est venu ici pendant la récréation. Il cherchait sûrement quelque chose, mais il n’avait pas beaucoup de temps. » Félix observa la fenêtre entrouverte, puis le dictionnaire posé de travers. L’enquête pouvait commencer.",
      },
      progressiveQuestions: [
        {
          level: "indice",
          prompt:
            "Quels indices montrent que la scène se passe juste après la récréation ?",
        },
        {
          level: "raisonnement",
          prompt:
            "Quel temps fait-il dehors ? Relève au moins deux éléments du texte pour justifier ta réponse.",
        },
        {
          level: "justification",
          prompt:
            "Pourquoi peut-on penser que la personne entrée dans la bibliothèque était pressée ? Appuie ta réponse sur des indices précis.",
        },
        {
          level: "interprétation",
          prompt:
            "D’après toi, que cherchait cette personne ? Propose une hypothèse raisonnable et explique ce qui t’a aidé à la formuler.",
        },
      ],
      methodTip:
        "Lis comme un détective : souligne les indices visibles, relie-les entre eux, puis écris une réponse avec « Je pense que... parce que dans le texte... ». Une inférence doit toujours pouvoir être expliquée.",
      correction: [
        {
          prompt: "Indices sur le moment de la scène",
          answer:
            "La scène se passe juste après la récréation : la cloche vient à peine de sonner, les élèves sont encore dans le couloir et secouent leurs manteaux. Ces indices indiquent que les élèves reviennent de l’extérieur.",
        },
        {
          prompt: "Inférence sur la météo",
          answer:
            "Il pleut ou il vient de pleuvoir. On le comprend grâce aux manteaux mouillés, à la tache sombre sur le carnet, à la trace de boue encore brillante et à la fenêtre entrouverte. Le texte ne dit pas directement « il pleut », mais plusieurs indices vont dans ce sens.",
        },
        {
          prompt: "Justification sur la personne pressée",
          answer:
            "La personne était probablement pressée parce que la salle paraît quittée trop vite : le carnet est resté ouvert, le dictionnaire est posé de travers, l’écharpe a été oubliée et des traces ont été laissées. Quelqu’un qui agit calmement aurait sans doute rangé ou repris ses affaires.",
        },
        {
          prompt: "Hypothèse sur ce que cherchait la personne",
          answer:
            "On peut penser que la personne cherchait une information pour un exposé ou un mot dans le dictionnaire. Le carnet est ouvert à la page des exposés et le dictionnaire est posé de travers : ces deux indices orientent vers une recherche rapide. D’autres hypothèses sont possibles si elles s’appuient sur les indices du texte.",
        },
      ],
      reinvestmentActivity:
        "Écris quatre lignes pour raconter la suite : Félix interroge un élève. Glisse deux indices implicites qui permettront au lecteur de comprendre quelque chose sans l’écrire directement.",
      shortWrittenTrace:
        "Faire une inférence, c’est comprendre une information qui n’est pas écrite directement. Pour répondre, je relève des indices, je les relie à ce que je sais, puis je justifie ma réponse avec le texte.",
      projectionVersion: {
        title: "Version à projeter",
        content: [
          "Afficher d’abord le texte seul pendant une lecture silencieuse.",
          "Faire souligner collectivement les indices de lieu, de temps et d’action.",
          "Afficher les questions une par une pour éviter de révéler trop vite le raisonnement attendu.",
          "Garder la correction masquée jusqu’à la mise en commun.",
        ],
      },
      printableVersion: {
        title: "Version à imprimer",
        content: [
          "Une fiche recto avec le texte support en haut.",
          "Quatre questions avec une ligne « indices du texte » sous chaque réponse.",
          "Encadré méthode noir et blanc : indice + hypothèse + justification.",
          "Trace écrite courte à compléter en bas de page.",
        ],
      },
      progressStatus: {
        state: "prête à lancer",
        detail:
          "Mission modèle : fiche séance complète, texte support, questions progressives, méthode, correction détaillée, projection et impression.",
      },
      usage: {
        projection:
          "Projeter le texte en grand, faire verbaliser les indices, puis afficher les questions progressivement avant la réponse écrite.",
        printing:
          "Distribuer une fiche avec le texte, les questions, une zone d’indices et la trace écrite courte. Garder la correction pour la mise en commun.",
      },
    },
    curriculumDomain: "Français · Lecture et compréhension",
    curriculumCompetency: "Comprendre l’implicite d’un texte et justifier une réponse avec des indices.",
    curriculumObjective:
      "Construire une inférence simple en reliant les indices du texte à ses connaissances.",
    officialLevel: "CM2",
    cycle: "Cycle 3",
    skillTags: ["inférence", "lecture", "justification"],
    teacherUse: ["projection", "impression"],
    studentUse:
      "Lire le texte, relever les indices, formuler une hypothèse, puis justifier la réponse avec une phrase complète.",
  },
  {
    slug: "mission-calcul",
    title: "Mission Calcul",
    description:
      "Résoudre des calculs stratégiques en choisissant la méthode la plus efficace.",
    subject: "Mathématiques",
    status: "disponible",
    theme: themes.gold,
    objective:
      "Choisir des stratégies rapides et fiables pour résoudre des calculs de niveau CM2.",
    competencies: [
      "Mobiliser les tables et propriétés des opérations",
      "Comparer plusieurs procédures de calcul",
      "Vérifier la cohérence d’un résultat",
    ],
    upcomingActivities: [
      "Défi de calcul mental chronométré",
      "Atelier de stratégies expliquées",
      "Carte de progression des méthodes",
    ],
    pedagogy: {
      immersiveIntroduction:
        "Dans la salle des cadrans, Félix doit remettre en marche une porte ancienne. Chaque calcul réussi alimente un mécanisme.",
      narrativeContext:
        "La mission commence devant trois leviers numérotés. Félix peut choisir la stratégie la plus rapide, mais le mécanisme ne s’active que si la méthode est expliquée clairement.",
      studentObjective:
        "Calculer mentalement en choisissant une stratégie adaptée, puis expliquer pourquoi elle fonctionne.",
      schoolSkill:
        "Utiliser les décompositions, les regroupements et les propriétés des opérations pour mener un calcul mental raisonné.",
      successCriteria: [
        "Je choisis une stratégie adaptée aux nombres du calcul.",
        "J’écris ou j’explique les étapes de ma méthode.",
        "Je vérifie que mon résultat est cohérent.",
      ],
      duration: "20 à 30 minutes",
      level: "CM2 · Cycle 3",
      materials: [
        "Calculs projetés ou imprimés",
        "Ardoise ou cahier d’essai",
        "Tableau pour comparer les stratégies",
        "Fiche réponse avec colonne méthode",
      ],
      usefulVocabulary: [
        "décomposer",
        "regrouper",
        "complément",
        "stratégie",
        "vérifier",
        "ordre de grandeur",
      ],
      mainChallenge: {
        label: "Support de départ",
        content:
          "Le mécanisme affiche trois calculs : 48 × 25, 125 + 376 + 75, et 600 - 198. Félix doit trouver chaque résultat sans poser l’opération, puis noter la stratégie utilisée.",
      },
      progressiveQuestions: [
        {
          level: "indice",
          prompt:
            "Quel calcul semble pouvoir être simplifié par un regroupement ou une décomposition ?",
        },
        {
          level: "raisonnement",
          prompt:
            "Explique une stratégie efficace pour calculer 48 × 25 mentalement.",
        },
        {
          level: "justification",
          prompt:
            "Pourquoi le regroupement 125 + 75 est-il utile dans le deuxième calcul ?",
        },
        {
          level: "synthèse",
          prompt:
            "Quelle méthode de vérification recommanderais-tu à Félix pour contrôler ses résultats ?",
        },
      ],
      methodTip:
        "Avant de calculer, observe les nombres. Cherche les compléments, les décompositions simples ou une opération équivalente. Un bon calcul mental est un calcul rapide, mais surtout explicable.",
      correction: [
        {
          prompt: "48 × 25",
          answer:
            "48 × 25 = 48 × 100 ÷ 4 = 4800 ÷ 4 = 1200. On peut aussi faire 50 × 25 - 2 × 25.",
        },
        {
          prompt: "125 + 376 + 75",
          answer:
            "On regroupe 125 et 75 parce qu’ils forment 200. Le calcul devient alors 200 + 376 = 576. La stratégie réduit le nombre d’étapes difficiles.",
        },
        {
          prompt: "600 - 198",
          answer:
            "On peut retirer 200 puis corriger, car 198 est proche de 200 : 600 - 200 = 400, puis on ajoute 2. Le résultat est 402.",
        },
        {
          prompt: "Vérification",
          answer:
            "On vérifie avec un ordre de grandeur ou l’opération inverse : 402 + 198 = 600, donc 600 - 198 = 402. Pour 48 × 25, le résultat doit être proche de 50 × 25 = 1250, donc 1200 est cohérent.",
        },
      ],
      reinvestmentActivity:
        "Invente deux calculs qui peuvent se simplifier par regroupement ou décomposition. Échange-les avec un camarade, puis comparez vos stratégies.",
      shortWrittenTrace:
        "En calcul mental raisonné, je regarde les nombres avant d’agir : je peux décomposer, regrouper, utiliser un complément ou vérifier avec une opération inverse.",
      projectionVersion: {
        title: "Version à projeter",
        content: [
          "Afficher un calcul à la fois pour laisser chercher mentalement.",
          "Demander plusieurs stratégies avant de valider le résultat.",
          "Noter au tableau les étapes de chaque méthode.",
          "Faire verbaliser la vérification en fin de séance.",
        ],
      },
      printableVersion: {
        title: "Version à imprimer",
        content: [
          "Une fiche recto avec les trois calculs.",
          "Deux colonnes sobres : résultat et stratégie.",
          "Une ligne de vérification par ordre de grandeur ou opération inverse.",
          "Trace écrite courte à compléter en bas de page.",
        ],
      },
      progressStatus: {
        state: "prête à lancer",
        detail:
          "Mission complète : calcul mental raisonné, comparaison de stratégies, correction expliquée, projection et impression.",
      },
      usage: {
        projection:
          "Projeter les calculs un par un, faire comparer les procédures au tableau, puis afficher la correction après justification.",
        printing:
          "Imprimer le défi avec colonnes résultat, stratégie et vérification pour garder une trace de méthode.",
      },
    },
    curriculumDomain: "Mathématiques · Calcul mental et stratégies",
    curriculumCompetency:
      "Calculer mentalement en utilisant des décompositions, regroupements et propriétés des opérations.",
    curriculumObjective:
      "Choisir une stratégie de calcul efficace, l’expliquer et vérifier la cohérence du résultat.",
    officialLevel: "CM2",
    cycle: "Cycle 3",
    skillTags: ["calcul mental", "stratégie", "vérification"],
    teacherUse: ["projection", "impression", "entraînement"],
    studentUse:
      "Résoudre les calculs, noter la stratégie utilisée, puis vérifier un résultat avec une méthode simple.",
  },
  {
    slug: "laboratoire-scientifique",
    title: "Laboratoire Scientifique",
    description:
      "Observer, formuler des hypothèses et organiser les traces d’une investigation.",
    subject: "Sciences",
    status: "bientôt",
    theme: themes.sky,
    objective:
      "Faire entrer Félix dans une démarche d’investigation claire : observer, supposer, tester, conclure.",
    competencies: [
      "Décrire une observation avec précision",
      "Formuler une hypothèse simple",
      "Organiser les résultats dans une trace écrite",
    ],
    upcomingActivities: [
      "Fiche laboratoire à compléter",
      "Classement d’observations",
      "Conclusion scientifique guidée",
    ],
    pedagogy: {
      immersiveIntroduction:
        "Félix pousse la porte du laboratoire et découvre trois coupelles mystérieuses posées sous une lampe d’observation.",
      narrativeContext:
        "Le professeur a laissé une note : « Observe avant de conclure. Une bonne hypothèse commence toujours par un indice précis. » Félix doit distinguer ce qu’il voit, ce qu’il suppose et ce qu’il peut expliquer.",
      studentObjective:
        "Observer un phénomène, formuler une hypothèse et organiser une démarche scientifique simple.",
      schoolSkill:
        "Pratiquer une démarche d’investigation : distinguer observation et explication, formuler une hypothèse, interpréter un résultat.",
      successCriteria: [
        "Je décris ce que j’observe sans expliquer trop vite.",
        "Je justifie mon hypothèse avec une comparaison précise.",
        "J’écris une conclusion courte appuyée sur les résultats.",
      ],
      duration: "20 à 30 minutes",
      level: "CM2 · Cycle 3",
      materials: [
        "Support d’observation projeté ou imprimé",
        "Tableau observation / hypothèse / conclusion",
        "Crayon de couleur pour souligner les conditions",
        "Cahier de sciences ou fiche laboratoire",
      ],
      usefulVocabulary: [
        "observation",
        "hypothèse",
        "explication",
        "condition",
        "résultat",
        "conclusion",
      ],
      mainChallenge: {
        label: "Support d’observation",
        content:
          "Trois graines de haricot ont été placées pendant une semaine dans des conditions différentes. Graine A : eau et lumière, pousse verte de 6 cm. Graine B : eau mais sans lumière, pousse pâle de 3 cm. Graine C : lumière mais sans eau, aucune pousse visible. Félix doit observer les résultats, proposer une hypothèse et écrire une conclusion prudente.",
      },
      progressiveQuestions: [
        {
          level: "indice",
          prompt:
            "Qu’observes-tu pour chaque graine ? Réponds sans expliquer encore.",
        },
        {
          level: "raisonnement",
          prompt:
            "Que montre la comparaison entre la graine A et la graine C sur le rôle de l’eau ?",
        },
        {
          level: "justification",
          prompt:
            "Pourquoi faut-il distinguer observation et explication dans cette mission ?",
        },
        {
          level: "interprétation",
          prompt:
            "Formule une hypothèse sur le rôle de la lumière dans le développement de la pousse.",
        },
        {
          level: "synthèse",
          prompt:
            "Écris une conclusion scientifique simple sur les besoins d’une graine.",
        },
      ],
      methodTip:
        "En sciences, commence par décrire ce que tu observes. Ensuite seulement, propose une hypothèse. Compare deux situations à la fois : cherche ce qui change, ce qui reste identique, puis explique l’effet observé.",
      correction: [
        {
          prompt: "Observations",
          answer:
            "La graine A a produit une pousse verte de 6 cm. La graine B a produit une pousse pâle de 3 cm. La graine C n’a pas produit de pousse visible. Ce sont des observations : on décrit ce que l’on voit.",
        },
        {
          prompt: "Rôle de l’eau",
          answer:
            "La graine C avait de la lumière mais pas d’eau et elle n’a pas germé. La graine A avait de l’eau et elle a germé. On peut donc penser que l’eau est nécessaire au démarrage de la germination.",
        },
        {
          prompt: "Observation ou explication",
          answer:
            "Dire « la pousse est pâle » est une observation. Dire « elle manque peut-être de lumière » est une explication ou une hypothèse. Les distinguer évite de conclure trop vite.",
        },
        {
          prompt: "Rôle de la lumière",
          answer:
            "La graine B a reçu de l’eau mais pas de lumière : elle commence à pousser, mais elle reste pâle et plus courte. On peut formuler l’hypothèse que la lumière aide la jeune plante à bien se développer.",
        },
        {
          prompt: "Conclusion",
          answer:
            "Une graine a besoin d’eau pour germer. La lumière n’est pas le seul facteur de germination, mais elle semble aider la jeune plante à se développer correctement après le début de la pousse.",
        },
      ],
      reinvestmentActivity:
        "Choisis un autre phénomène simple de classe, par exemple de la glace qui fond. Écris une observation, une hypothèse et une conclusion prudente.",
      shortWrittenTrace:
        "Dans une démarche scientifique, j’observe d’abord les faits, je formule ensuite une hypothèse, puis je conclus en m’appuyant sur les résultats.",
      projectionVersion: {
        title: "Version à projeter",
        content: [
          "Projeter le tableau des trois graines sans la correction.",
          "Faire classer oralement observation, hypothèse et conclusion.",
          "Comparer deux graines à la fois pour isoler le rôle d’une condition.",
          "Afficher la conclusion seulement après discussion.",
        ],
      },
      printableVersion: {
        title: "Version à imprimer",
        content: [
          "Une fiche recto avec le support des trois graines.",
          "Un tableau observation / hypothèse / conclusion.",
          "Questions progressives avec une ligne de justification.",
          "Trace écrite courte à compléter en bas de page.",
        ],
      },
      progressStatus: {
        state: "prête à lancer",
        detail:
          "Mission complète : observation, hypothèse, distinction observation/explication, correction détaillée, projection et impression.",
      },
      usage: {
        projection:
          "Projeter le support comme tableau d’observation, faire formuler les hypothèses à l’oral, puis structurer la conclusion.",
        printing:
          "Imprimer le support avec un tableau observation, hypothèse, conclusion et une trace écrite courte.",
      },
    },
    curriculumDomain: "Sciences · Démarche d’investigation",
    curriculumCompetency:
      "Observer un phénomène, formuler une hypothèse et conclure à partir de résultats comparés.",
    curriculumObjective:
      "Distinguer observation, hypothèse et conclusion dans une situation scientifique simple.",
    officialLevel: "CM2",
    cycle: "Cycle 3",
    skillTags: ["démarche scientifique", "hypothèse", "observation"],
    teacherUse: ["projection", "impression"],
    studentUse:
      "Observer le support, comparer les situations, formuler une hypothèse, puis écrire une conclusion prudente.",
  },
  {
    slug: "archives-historiques",
    title: "Archives Historiques",
    description:
      "Explorer des documents pour situer les événements et comprendre les périodes.",
    subject: "Histoire",
    status: "en préparation",
    theme: themes.ember,
    objective:
      "Utiliser des sources pour aider Félix à replacer un événement dans son contexte historique.",
    competencies: [
      "Lire un document historique simple",
      "Situer un fait sur une frise",
      "Distinguer source, date et événement",
    ],
    upcomingActivities: [
      "Analyse d’archive illustrée",
      "Frise à reconstituer",
      "Mission de classement chronologique",
    ],
    pedagogy: {
      immersiveIntroduction:
        "Félix descend dans les archives de l’Académie, où une enveloppe porte la mention : « À replacer dans le temps ».",
      narrativeContext:
        "Dans l’enveloppe, il trouve un court témoignage, une date et une image décrite. Pour ouvrir le classeur suivant, il doit identifier la nature du document, relever les indices et comprendre ce qu’il apprend sur une époque.",
      studentObjective:
        "Lire un document historique court pour identifier sa nature, sa date, son contexte et ce qu’il apprend sur une époque.",
      schoolSkill:
        "Analyser un document historique simple en relevant sa nature, sa date, son auteur ou son contexte, puis en interprétant les indices.",
      duration: "20 à 30 minutes",
      level: "CM2 · Cycle 3",
      materials: [
        "Document d’archive projeté ou imprimé",
        "Fiche d’analyse : nature, date, auteur ou témoin, indices",
        "Crayon pour souligner les mots importants",
        "Frise ou repères chronologiques de classe",
      ],
      usefulVocabulary: [
        "archive",
        "document",
        "témoignage",
        "date",
        "contexte",
        "indice",
      ],
      mainChallenge: {
        label: "Document d’archive",
        content:
          "Document : extrait d’un carnet d’élève, village de Saint-Martin, octobre 1882. « Dans notre village, on parle beaucoup de la nouvelle école. Le maître dit que tous les enfants doivent apprendre à lire, écrire et compter. Mon petit frère ira aussi, même si mes parents pensaient le garder aux champs. À la maison, on dit que les habitudes changent. »",
      },
      progressiveQuestions: [
        {
          level: "indice",
          prompt:
            "Quelle est la nature du document ? Quelle date et quel lieu sont indiqués ?",
        },
        {
          level: "raisonnement",
          prompt:
            "Quels mots ou expressions montrent que le document parle de l’école ?",
        },
        {
          level: "justification",
          prompt:
            "Que peut-on comprendre sur la vie des enfants à cette époque ? Justifie avec deux indices du texte.",
        },
        {
          level: "interprétation",
          prompt:
            "Pourquoi la date 1882 aide-t-elle à comprendre le contexte historique du document ?",
        },
        {
          level: "synthèse",
          prompt:
            "Explique en deux phrases ce que ce document apprend sur l’école et les changements de l’époque.",
        },
      ],
      methodTip:
        "Pour lire une archive, commence par identifier la nature du document, la date, le lieu et la personne qui parle. Relève ensuite les mots importants avant d’expliquer ce que le document apprend.",
      correction: [
        {
          prompt: "Nature, date et lieu",
          answer:
            "Le document est un extrait de carnet d’élève. Il est daté d’octobre 1882 et situé dans le village de Saint-Martin. Ces informations aident à replacer le témoignage dans son contexte.",
        },
        {
          prompt: "Indices sur l’école",
          answer:
            "Les indices sont « nouvelle école », « le maître », « apprendre à lire, écrire et compter » et « tous les enfants ». Ils montrent que le thème principal est la scolarisation.",
        },
        {
          prompt: "Vie des enfants",
          answer:
            "Le texte laisse comprendre que certains enfants aidaient leur famille aux champs, puisque les parents pensaient garder le petit frère. L’école modifie donc l’organisation familiale et les habitudes du village.",
        },
        {
          prompt: "Contexte de 1882",
          answer:
            "La date 1882 est importante car elle renvoie aux lois scolaires de Jules Ferry, qui rendent l’école primaire obligatoire. Le document permet donc de voir comment une décision nationale transforme la vie quotidienne.",
        },
        {
          prompt: "Ce que montre le document",
          answer:
            "Le document montre que l’école devient une obligation pour les enfants et qu’elle change les habitudes. Il apprend aussi que l’histoire se comprend à partir d’indices concrets : mots, date, lieu et point de vue du témoin.",
        },
      ],
      reinvestmentActivity:
        "Lis un autre court document historique de la classe. Complète quatre cases : nature, date, indice important, ce que le document apprend.",
      shortWrittenTrace:
        "Pour analyser un document historique, j’identifie sa nature, sa date, son auteur ou témoin, puis je relève des indices pour comprendre ce qu’il apprend sur une époque.",
      projectionVersion: {
        title: "Version à projeter",
        content: [
          "Projeter le document seul et faire repérer nature, date et lieu.",
          "Surligner collectivement les mots qui indiquent le thème.",
          "Relier les indices au contexte historique sans donner la correction trop tôt.",
          "Construire la conclusion avec les élèves.",
        ],
      },
      printableVersion: {
        title: "Version à imprimer",
        content: [
          "Document d’archive avec marge pour souligner les indices.",
          "Tableau nature / date / lieu / contexte.",
          "Questions progressives avec espace de justification.",
          "Trace écrite courte à compléter.",
        ],
      },
      progressStatus: {
        state: "prête à lancer",
        detail:
          "Mission complète : lecture d’archive, contexte historique, indices, correction détaillée, projection et impression.",
      },
      usage: {
        projection:
          "Projeter le document et annoter collectivement la nature, la date, le contexte et les indices historiques.",
        printing:
          "Imprimer le document avec une fiche d’analyse et une trace écrite courte.",
      },
    },
    teacherUse: ["projection", "impression"],
  },
  {
    slug: "cartographe-du-monde",
    title: "Cartographe du Monde",
    description:
      "Lire des cartes, localiser des repères et comprendre les grands espaces.",
    subject: "Géographie",
    status: "bientôt",
    theme: themes.sky,
    objective:
      "Guider Félix dans la lecture de cartes pour localiser, comparer et décrire des espaces.",
    competencies: [
      "Identifier les éléments d’une carte",
      "Utiliser une légende et des repères",
      "Décrire une localisation avec précision",
    ],
    upcomingActivities: [
      "Carte mystère à décrypter",
      "Repérage de lieux et d’itinéraires",
      "Création d’une légende simple",
    ],
    pedagogy: {
      immersiveIntroduction:
        "Dans la salle des cartes, Félix reçoit une boussole et une carte simplifiée d’un archipel inconnu.",
      narrativeContext:
        "Pour rejoindre la tour du phare, il doit comprendre la légende, repérer les points cardinaux et expliquer l’organisation de l’espace représenté.",
      studentObjective:
        "Lire une carte simple en utilisant son orientation, sa légende et ses repères pour localiser des lieux.",
      schoolSkill:
        "Utiliser les éléments d’une carte pour localiser, décrire un itinéraire et comprendre l’organisation d’un espace.",
      successCriteria: [
        "J’utilise la légende pour identifier les lieux.",
        "Je localise les éléments avec le vocabulaire géographique.",
        "Je justifie mon itinéraire avec des repères de la carte.",
      ],
      duration: "20 à 30 minutes",
      level: "CM2 · Cycle 3",
      materials: [
        "Carte textuelle projetée ou imprimée",
        "Crayons de couleur pour construire la légende",
        "Fiche croquis avec rose des vents",
        "Tableau des repères : nord, sud, est, ouest",
      ],
      usefulVocabulary: [
        "carte",
        "légende",
        "orientation",
        "repère",
        "itinéraire",
        "espace",
      ],
      mainChallenge: {
        label: "Support de départ",
        content:
          "Carte textuelle de l’île des Balises : au nord se trouve une forêt, au sud un port, à l’est un phare et à l’ouest une montagne. Une rivière traverse l’île du nord vers le sud. Un village est placé au centre, près du pont. La légende indique : triangle = montagne, vague = rivière, étoile = phare, carré = village, ancre = port.",
      },
      progressiveQuestions: [
        {
          level: "indice",
          prompt:
            "Quels éléments de la légende permettent d’identifier les lieux importants ?",
        },
        {
          level: "raisonnement",
          prompt:
            "Où se trouvent le phare, le port et la montagne par rapport au village central ?",
        },
        {
          level: "justification",
          prompt:
            "Pourquoi la rivière aide-t-elle à comprendre l’organisation de l’île ?",
        },
        {
          level: "interprétation",
          prompt:
            "Quel itinéraire conseillerais-tu pour aller du port au phare ? Utilise les points cardinaux et au moins un repère.",
        },
        {
          level: "synthèse",
          prompt:
            "Explique en une phrase comment la carte organise les espaces naturels et les espaces habités.",
        },
      ],
      methodTip:
        "Pour lire une carte, commence par le titre, l’orientation et la légende. Localise ensuite un point central, puis décris les lieux avec les points cardinaux et les repères.",
      correction: [
        {
          prompt: "Légende",
          answer:
            "La légende permet d’identifier les lieux : triangle pour la montagne, vague pour la rivière, étoile pour le phare, carré pour le village et ancre pour le port. Sans légende, les symboles ne peuvent pas être interprétés correctement.",
        },
        {
          prompt: "Localisations",
          answer:
            "Le phare est à l’est du village, le port au sud, la montagne à l’ouest et la forêt au nord. Le village central sert de repère pour organiser la lecture.",
        },
        {
          prompt: "Rôle de la rivière",
          answer:
            "La rivière traverse l’île du nord vers le sud. Elle relie plusieurs espaces et permet de mieux comprendre l’organisation générale : forêt au nord, port au sud, village près du pont.",
        },
        {
          prompt: "Itinéraire possible",
          answer:
            "Depuis le port au sud, on peut remonter vers le nord jusqu’au village central, traverser près du pont, puis aller vers l’est jusqu’au phare. L’itinéraire utilise les points cardinaux et des repères de la carte.",
        },
        {
          prompt: "Organisation de l’espace",
          answer:
            "La carte montre un espace organisé autour du village central et de la rivière, avec des espaces naturels au nord et à l’ouest, et des repères d’activité comme le port au sud et le phare à l’est.",
        },
      ],
      reinvestmentActivity:
        "Dessine un croquis simple de l’île à partir du texte. Ajoute une légende propre avec les cinq symboles et indique le nord.",
      shortWrittenTrace:
        "Pour lire une carte, je regarde le titre, l’orientation et la légende. J’utilise ensuite les points cardinaux et les repères pour localiser les lieux et décrire l’espace.",
      projectionVersion: {
        title: "Version à projeter",
        content: [
          "Projeter la carte textuelle et faire repérer la légende.",
          "Construire collectivement un croquis au tableau.",
          "Faire verbaliser les localisations avec les points cardinaux.",
          "Comparer plusieurs itinéraires possibles.",
        ],
      },
      printableVersion: {
        title: "Version à imprimer",
        content: [
          "Une fiche recto avec la carte textuelle.",
          "Une légende simple à compléter en noir et blanc.",
          "Un espace de croquis avec rose des vents.",
          "Trace écrite courte à compléter en bas de page.",
        ],
      },
      progressStatus: {
        state: "prête à lancer",
        detail:
          "Mission complète : lecture de carte, légende, repères, itinéraire, correction détaillée, projection et impression.",
      },
      usage: {
        projection:
          "Projeter le texte de carte et construire une carte collective au tableau à partir des indices et de la légende.",
        printing:
          "Imprimer la carte textuelle avec un espace de croquis, une légende et une rose des vents.",
      },
    },
    curriculumDomain: "Géographie · Lire et comprendre une carte",
    curriculumCompetency:
      "Utiliser une légende, une orientation et des repères spatiaux pour localiser et décrire un espace.",
    curriculumObjective:
      "Lire une carte simple, décrire des localisations et justifier un itinéraire avec des indices spatiaux.",
    officialLevel: "CM2",
    cycle: "Cycle 3",
    skillTags: ["carte", "légende", "localisation"],
    teacherUse: ["projection", "impression"],
    studentUse:
      "Lire la carte textuelle, compléter la légende, localiser les lieux, puis justifier un itinéraire.",
  },
  {
    slug: "production-ecrit",
    title: "Production d’Écrit",
    description:
      "Planifier, rédiger et améliorer un texte avec des objectifs précis.",
    subject: "Écriture",
    status: "disponible",
    theme: themes.ember,
    objective:
      "Accompagner Félix dans la construction d’un texte organisé, lisible et révisé.",
    competencies: [
      "Planifier les idées avant la rédaction",
      "Organiser un texte en paragraphes",
      "Réviser son écrit avec une grille simple",
    ],
    upcomingActivities: [
      "Brief de mission d’écriture",
      "Plan en trois étapes",
      "Atelier de réécriture ciblée",
    ],
    pedagogy: {
      immersiveIntroduction:
        "Félix trouve une plume dans l’atelier d’écriture. Elle ne révèle le passage secret que si le texte est organisé, précis et relu avec méthode.",
      narrativeContext:
        "L’Académie demande à Félix de rédiger un court message d’explorateur pour raconter une découverte. Le texte doit respecter la consigne, suivre un ordre clair et être amélioré avant d’être transmis.",
      studentObjective:
        "Écrire un court texte organisé en respectant une consigne, puis améliorer son brouillon avec une grille simple.",
      schoolSkill:
        "Planifier, rédiger et réviser un court texte en utilisant des connecteurs et des critères de réussite explicites.",
      successCriteria: [
        "Je respecte les étapes demandées par la consigne.",
        "J’organise mon texte avec un début, un développement et une fin.",
        "Je relis mon brouillon avec la grille avant de le finaliser.",
      ],
      duration: "20 à 30 minutes",
      level: "CM2 · Cycle 3",
      materials: [
        "Consigne projetée ou imprimée",
        "Cahier d’essai ou fiche brouillon",
        "Crayon de couleur pour repérer les connecteurs",
        "Grille de relecture simple",
      ],
      usefulVocabulary: [
        "consigne",
        "brouillon",
        "connecteur",
        "paragraphe",
        "réviser",
        "critère",
      ],
      mainChallenge: {
        label: "Support de départ",
        content:
          "Consigne : écris un texte de 8 à 10 lignes. Félix entre dans une salle inconnue de l’Académie. Il découvre un objet étrange, comprend à quoi il sert, puis explique comment cet objet peut aider les élèves. Ton texte doit avoir un début, un développement et une fin. Utilise au moins trois connecteurs parmi : d’abord, ensuite, soudain, alors, enfin, car.",
      },
      progressiveQuestions: [
        {
          level: "indice",
          prompt:
            "Quels éléments de la consigne dois-tu absolument respecter avant de commencer à écrire ?",
        },
        {
          level: "raisonnement",
          prompt:
            "Prépare ton plan en trois étapes : que découvre Félix, que comprend-il, que transmet-il aux autres élèves ?",
        },
        {
          level: "justification",
          prompt:
            "Choisis trois connecteurs et explique où tu vas les placer pour rendre ton texte plus clair.",
        },
        {
          level: "synthèse",
          prompt:
            "Relis ton brouillon avec la grille : consigne respectée, phrases ponctuées, connecteurs présents, texte compréhensible.",
        },
      ],
      methodTip:
        "Écris en trois temps : je prépare, je rédige, je relis. Pour améliorer un brouillon, ne corrige pas tout en même temps : vérifie d’abord la consigne, puis l’ordre des idées, puis les phrases.",
      correction: [
        {
          prompt: "Critère 1 · Respect de la consigne",
          answer:
            "Le texte doit raconter l’entrée de Félix dans une salle inconnue, la découverte d’un objet étrange, son utilité et l’aide apportée aux élèves. Si une de ces étapes manque, la consigne n’est pas complètement respectée.",
        },
        {
          prompt: "Critère 2 · Organisation",
          answer:
            "Le lecteur doit suivre un ordre clair : début de la scène, découverte, explication, conclusion. Les connecteurs comme « d’abord », « ensuite », « alors » ou « enfin » aident à comprendre cette progression.",
        },
        {
          prompt: "Critère 3 · Amélioration du brouillon",
          answer:
            "La relecture doit permettre de corriger la ponctuation, d’éviter les répétitions, d’ajouter un connecteur si l’enchaînement n’est pas clair et de vérifier que chaque phrase apporte une information utile.",
        },
        {
          prompt: "Exemple possible",
          answer:
            "D’abord, Félix entra dans une salle ronde où brillait une petite boussole dorée. Ensuite, il comprit qu’elle indiquait non pas le nord, mais la bonne méthode à utiliser. Alors, il la posa sur la table des élèves pour les aider à organiser leurs idées. Enfin, chacun put retrouver l’ordre de son texte car la boussole s’illuminait à chaque étape réussie.",
        },
      ],
      reinvestmentActivity:
        "Échange ton texte avec un camarade. Il vérifie seulement deux points : la consigne est-elle respectée ? Les connecteurs aident-ils à suivre les idées ? Puis améliore une phrase de ton brouillon.",
      shortWrittenTrace:
        "Pour réussir une production d’écrit, je lis la consigne, je prépare mes idées, j’écris un texte organisé, puis je relis avec des critères précis.",
      projectionVersion: {
        title: "Version à projeter",
        content: [
          "Afficher la consigne et faire repérer collectivement les contraintes.",
          "Construire au tableau un plan en trois étapes avant l’écriture.",
          "Projeter la grille de relecture après le brouillon, sans donner l’exemple trop tôt.",
          "Lire un exemple seulement pendant la mise en commun.",
        ],
      },
      printableVersion: {
        title: "Version à imprimer",
        content: [
          "Une fiche recto avec la consigne en haut.",
          "Un espace de plan en trois étapes.",
          "Une zone de brouillon de 8 à 10 lignes.",
          "Une grille de relecture courte : consigne, ordre, ponctuation.",
        ],
      },
      progressStatus: {
        state: "prête à lancer",
        detail:
          "Mission complète : consigne d’écriture, plan, critères de réussite, exemple possible, réinvestissement et versions classe.",
      },
      usage: {
        projection:
          "Projeter la consigne, construire le plan collectivement, puis afficher la grille de relecture au moment de l’amélioration.",
        printing:
          "Imprimer la mission comme fiche d’écriture avec trois zones : plan, brouillon, grille de relecture.",
      },
    },
    curriculumDomain: "Français · Production d’écrit",
    curriculumCompetency:
      "Rédiger un texte court organisé en respectant une consigne et en révisant son brouillon.",
    curriculumObjective:
      "Planifier, écrire puis améliorer un court récit à l’aide de connecteurs et de critères simples.",
    officialLevel: "CM2",
    cycle: "Cycle 3",
    skillTags: ["écriture", "planification", "révision"],
    teacherUse: ["projection", "impression"],
    studentUse:
      "Préparer le plan, rédiger un texte court, puis relire avec la grille avant la mise au propre.",
  },
  {
    slug: "lecture-strategique",
    title: "Lecture Stratégique",
    description:
      "Choisir une stratégie de lecteur selon le document, la consigne et le but.",
    subject: "Lecture",
    status: "disponible",
    theme: themes.jade,
    objective:
      "Développer des réflexes de lecteur autonome face à des textes et consignes variés.",
    competencies: [
      "Adapter sa lecture au type de document",
      "Repérer l’information utile",
      "Résumer une idée essentielle",
    ],
    upcomingActivities: [
      "Choix de stratégie avant lecture",
      "Mission de repérage rapide",
      "Synthèse en une phrase",
    ],
    pedagogy: {
      immersiveIntroduction:
        "Dans le couloir des consignes, Félix découvre trois portes. Pour choisir la bonne, il doit comprendre l’idée principale d’un texte et distinguer ce qui est écrit de ce qu’il faut déduire.",
      narrativeContext:
        "La mission propose un court texte documentaire. Félix doit repérer les informations importantes, formuler l’idée principale et justifier ses réponses avec des indices précis.",
      studentObjective:
        "Comprendre l’idée principale d’un texte court et justifier ses réponses avec des indices explicites ou implicites.",
      schoolSkill:
        "Adapter sa stratégie de lecture pour repérer les informations essentielles, distinguer explicite et implicite, puis justifier une réponse.",
      successCriteria: [
        "Je relève les informations importantes sans tout recopier.",
        "Je formule l’idée principale en une phrase claire.",
        "Je distingue ce qui est écrit de ce que je peux déduire.",
      ],
      duration: "20 à 30 minutes",
      level: "CM2 · Cycle 3",
      materials: [
        "Texte support projeté ou imprimé",
        "Surligneur ou crayon de couleur",
        "Fiche réponse avec colonne indices",
        "Tableau pour classer explicite et implicite",
      ],
      usefulVocabulary: [
        "idée principale",
        "information importante",
        "explicite",
        "implicite",
        "indice",
        "résumer",
      ],
      mainChallenge: {
        label: "Lis le texte support",
        content:
          "Dans la cour de l’Académie, un petit groupe d’élèves s’est arrêté devant la serre. Depuis plusieurs jours, les plantes placées près de la grande vitre sont plus hautes que les autres. Madame Soa n’a pourtant pas changé la quantité d’eau. Elle sourit en voyant Félix comparer les pots : « Tu vois, lire une situation, c’est comme lire un texte. Certaines réponses sont visibles, d’autres se déduisent. » Félix note alors trois informations dans son carnet : les plantes près de la vitre reçoivent plus de lumière ; toutes les plantes sont arrosées pareil ; celles du fond restent plus pâles.",
      },
      progressiveQuestions: [
        {
          level: "indice",
          prompt:
            "Quelles informations importantes peux-tu relever directement dans le texte ?",
        },
        {
          level: "raisonnement",
          prompt:
            "Quelle est l’idée principale du texte ? Formule-la en une phrase.",
        },
        {
          level: "justification",
          prompt:
            "Qu’est-ce qui est explicite dans le texte ? Qu’est-ce que l’on peut déduire ? Donne un exemple de chaque.",
        },
        {
          level: "interprétation",
          prompt:
            "Pourquoi Madame Soa compare-t-elle la lecture d’une situation à la lecture d’un texte ? Justifie avec les indices.",
        },
      ],
      methodTip:
        "Commence par lire la consigne. Relis ensuite le texte en soulignant seulement les informations utiles. Pour justifier, écris : « Je le sais parce que le texte dit... » ou « Je peux le déduire car... ».",
      correction: [
        {
          prompt: "Informations importantes",
          answer:
            "Les informations importantes sont : les plantes près de la vitre sont plus hautes, toutes les plantes reçoivent la même quantité d’eau, les plantes du fond restent plus pâles et les plantes près de la vitre reçoivent plus de lumière.",
        },
        {
          prompt: "Idée principale",
          answer:
            "L’idée principale est que la lumière semble influencer la croissance des plantes. Le texte insiste sur la différence entre les plantes proches de la vitre et celles placées au fond.",
        },
        {
          prompt: "Explicite et implicite",
          answer:
            "Une information explicite : les plantes près de la vitre reçoivent plus de lumière. Une information implicite : la lumière aide probablement les plantes à mieux grandir, car l’eau est identique pour toutes et la différence visible concerne la lumière.",
        },
        {
          prompt: "Justification de l’image de Madame Soa",
          answer:
            "Madame Soa compare la lecture d’une situation à la lecture d’un texte car il faut observer les indices, distinguer ce qui est écrit clairement et déduire ce qui n’est pas dit directement. Félix utilise les informations du texte pour construire une explication.",
        },
      ],
      reinvestmentActivity:
        "Choisis un court paragraphe dans ton manuel ou dans une autre mission. Souligne deux informations explicites, puis écris une phrase qui explique ce que tu peux déduire.",
      shortWrittenTrace:
        "Lire stratégiquement, c’est chercher l’idée principale, repérer les informations importantes et justifier ses réponses avec des indices du texte.",
      projectionVersion: {
        title: "Version à projeter",
        content: [
          "Afficher le texte sans les questions pour une première lecture silencieuse.",
          "Faire surligner oralement les informations importantes.",
          "Construire deux colonnes au tableau : explicite / implicite.",
          "Afficher la correction seulement après la justification des élèves.",
        ],
      },
      printableVersion: {
        title: "Version à imprimer",
        content: [
          "Une fiche recto avec le texte support et une marge d’indices.",
          "Quatre questions avec une colonne « indices du texte ».",
          "Un mini tableau explicite / implicite à compléter.",
          "Trace écrite courte à compléter en bas de page.",
        ],
      },
      progressStatus: {
        state: "prête à lancer",
        detail:
          "Mission complète : texte support, lecture stratégique, explicite/implicite, correction argumentée et versions classe.",
      },
      usage: {
        projection:
          "Projeter le texte, faire distinguer informations importantes, explicite et implicite, puis garder la correction pour la mise en commun.",
        printing:
          "Imprimer le texte avec une marge d’indices, un tableau explicite/implicite et une zone de justification.",
      },
    },
    curriculumDomain: "Français · Lecture et compréhension",
    curriculumCompetency:
      "Identifier les informations essentielles d’un texte et distinguer explicite et implicite.",
    curriculumObjective:
      "Adapter sa lecture à la consigne, résumer l’idée principale et justifier avec des indices.",
    officialLevel: "CM2",
    cycle: "Cycle 3",
    skillTags: ["lecture stratégique", "explicite", "implicite"],
    teacherUse: ["projection", "impression"],
    studentUse:
      "Lire le texte, relever les informations importantes, formuler l’idée principale, puis justifier avec des indices.",
  },
  {
    slug: "defis-mathematiques",
    title: "Défis Mathématiques",
    description:
      "Affronter des problèmes courts pour entraîner logique, calcul et justification.",
    subject: "Mathématiques",
    status: "bientôt",
    theme: themes.gold,
    objective:
      "Entraîner Félix à résoudre des problèmes courts en explicitant son raisonnement.",
    competencies: [
      "Comprendre une situation problème",
      "Choisir les données utiles",
      "Expliquer une démarche mathématique",
    ],
    upcomingActivities: [
      "Série de problèmes flash",
      "Tri des informations utiles",
      "Justification guidée de la réponse",
    ],
    pedagogy: {
      immersiveIntroduction:
        "Félix arrive dans l’arène des problèmes : ici, la bonne réponse ne suffit pas, il faut prouver son raisonnement.",
      narrativeContext:
        "Le défi présente une situation courte. Félix doit lire attentivement l’énoncé, choisir l’opération utile, calculer, puis vérifier si la réponse a du sens.",
      studentObjective:
        "Résoudre un problème court en repérant les données utiles, en choisissant l’opération et en vérifiant la réponse.",
      schoolSkill:
        "Comprendre un énoncé de problème, modéliser la situation par une opération et rédiger une réponse justifiée.",
      successCriteria: [
        "Je repère la question et les données utiles.",
        "Je choisis une stratégie de calcul et je l’explique.",
        "J’écris une phrase-réponse et je vérifie le résultat.",
      ],
      duration: "20 à 30 minutes",
      level: "CM2 · Cycle 3",
      materials: [
        "Énoncé projeté ou imprimé",
        "Crayon pour souligner les données utiles",
        "Cahier d’essai pour les calculs",
        "Fiche méthode : données, opération, réponse, vérification",
      ],
      usefulVocabulary: [
        "énoncé",
        "donnée utile",
        "opération",
        "démarche",
        "vérification",
        "phrase-réponse",
      ],
      mainChallenge: {
        label: "Support de départ",
        content:
          "Pour préparer une exposition, une classe installe 6 rangées de 8 chaises dans la salle. 9 chaises restent dans la réserve, et 4 chaises abîmées ne peuvent pas être utilisées. Combien de chaises utilisables l’école possède-t-elle en tout pour cette exposition ?",
      },
      progressiveQuestions: [
        {
          level: "indice",
          prompt:
            "Quelle est la question finale ? Quelles données sont utiles pour y répondre ?",
        },
        {
          level: "raisonnement",
          prompt:
            "Quelle première opération permet de trouver le nombre de chaises installées ?",
        },
        {
          level: "justification",
          prompt:
            "Faut-il utiliser les 4 chaises abîmées dans le calcul final ? Justifie ta réponse.",
        },
        {
          level: "synthèse",
          prompt:
            "Écris le calcul complet, puis une phrase-réponse et une vérification rapide.",
        },
      ],
      methodTip:
        "Dans un problème, commence par la question finale. Souligne ensuite les données utiles, choisis l’opération, écris une phrase-réponse et vérifie si le résultat est cohérent.",
      correction: [
        {
          prompt: "Lecture de l’énoncé",
          answer:
            "La question demande le nombre de chaises utilisables. Les données utiles sont 6 rangées, 8 chaises par rangée et 9 chaises en réserve. Les 4 chaises abîmées sont mentionnées pour vérifier qu’elles ne doivent pas être ajoutées.",
        },
        {
          prompt: "Choix des opérations",
          answer:
            "On calcule d’abord les chaises installées : 6 × 8 = 48. Puis on ajoute les 9 chaises utilisables de la réserve : 48 + 9 = 57.",
        },
        {
          prompt: "Réponse et vérification",
          answer:
            "L’école possède 57 chaises utilisables pour cette exposition. La réponse est cohérente : il y a un peu plus que les 48 chaises installées, car 9 chaises utilisables restent en réserve.",
        },
        {
          prompt: "Rôle des chaises abîmées",
          answer:
            "Les 4 chaises abîmées ne sont pas ajoutées, car la question demande les chaises utilisables. Elles servent à vérifier que l’on lit précisément l’énoncé.",
        },
      ],
      reinvestmentActivity:
        "Transforme le problème en changeant le nombre de rangées ou de chaises en réserve. Résous ton nouveau problème et explique quelle donnée est inutile ou piégeuse.",
      shortWrittenTrace:
        "Pour résoudre un problème, je lis la question, je repère les données utiles, je choisis l’opération, j’écris une phrase-réponse et je vérifie si mon résultat a du sens.",
      projectionVersion: {
        title: "Version à projeter",
        content: [
          "Afficher l’énoncé seul et faire reformuler la question finale.",
          "Faire entourer les données utiles et barrer les données inutiles.",
          "Afficher progressivement les étapes : opération, phrase-réponse, vérification.",
          "Comparer les démarches avant de montrer la correction.",
        ],
      },
      printableVersion: {
        title: "Version à imprimer",
        content: [
          "Une fiche recto avec l’énoncé en haut.",
          "Un tableau sobre : question, données utiles, opération, réponse.",
          "Une ligne de vérification du résultat.",
          "Petit défi de réinvestissement en bas de page.",
        ],
      },
      progressStatus: {
        state: "prête à lancer",
        detail:
          "Mission complète : lecture d’énoncé, choix d’opération, justification, vérification, projection et impression.",
      },
      usage: {
        projection:
          "Projeter le problème, isoler la question finale, trier les données utiles, puis construire la démarche au tableau.",
        printing:
          "Imprimer le problème avec zones données, calcul, phrase-réponse et vérification.",
      },
    },
    curriculumDomain: "Mathématiques · Résolution de problèmes",
    curriculumCompetency:
      "Résoudre un problème en identifiant les données utiles, en choisissant une opération et en vérifiant la réponse.",
    curriculumObjective:
      "Comprendre un énoncé court, expliciter une stratégie et rédiger une réponse justifiée.",
    officialLevel: "CM2",
    cycle: "Cycle 3",
    skillTags: ["problème", "données utiles", "vérification"],
    teacherUse: ["projection", "impression"],
    studentUse:
      "Lire l’énoncé, repérer les données utiles, calculer, écrire une phrase-réponse et vérifier le résultat.",
  },
  {
    slug: "enquete-grammaticale",
    title: "Enquête Grammaticale",
    description:
      "Identifier les indices de la phrase pour analyser les fonctions et les accords.",
    subject: "Français",
    status: "en préparation",
    theme: themes.jade,
    objective:
      "Transformer l’analyse grammaticale en enquête pour repérer les relations dans la phrase.",
    competencies: [
      "Identifier les groupes dans une phrase",
      "Repérer sujet, verbe et compléments",
      "Utiliser les accords comme indices",
    ],
    upcomingActivities: [
      "Phrase à indices colorés",
      "Enquête sur les accords",
      "Défi de transformation grammaticale",
    ],
    pedagogy: {
      immersiveIntroduction:
        "Félix reçoit une phrase scellée. Pour l’ouvrir, il doit retrouver les groupes qui travaillent ensemble.",
      narrativeContext:
        "Dans l’Académie, la grammaire est une enquête : le verbe donne l’action, le sujet la commande, et les compléments ajoutent des indices. Félix doit prouver son analyse avant de réécrire la phrase.",
      studentObjective:
        "Identifier les groupes essentiels d’une phrase, justifier son analyse et réécrire la phrase en gardant une structure correcte.",
      schoolSkill:
        "Repérer le verbe conjugué, le groupe sujet et des compléments, puis utiliser ces repères pour analyser et transformer une phrase.",
      duration: "20 à 30 minutes",
      level: "CM2 · Cycle 3",
      materials: [
        "Phrase projetée ou imprimée",
        "Crayons de couleur pour coder les groupes",
        "Fiche réponse avec tableau sujet / verbe / compléments",
        "Ardoise ou cahier pour la réécriture",
      ],
      usefulVocabulary: [
        "groupe sujet",
        "verbe conjugué",
        "complément",
        "groupe de mots",
        "fonction",
        "réécriture",
      ],
      mainChallenge: {
        label: "Support de départ",
        content:
          "Phrase : « Chaque matin, les jeunes explorateurs de l’Académie ouvrent silencieusement la grande porte dorée. » Félix doit retrouver le verbe conjugué, le sujet et deux compléments.",
      },
      progressiveQuestions: [
        {
          level: "indice",
          prompt:
            "Quel mot indique l’action principale de la phrase ?",
        },
        {
          level: "raisonnement",
          prompt:
            "Qui fait cette action ? Réponds avec le groupe sujet complet.",
        },
        {
          level: "justification",
          prompt:
            "Repère deux compléments et explique ce qu’ils précisent dans la phrase.",
        },
        {
          level: "synthèse",
          prompt:
            "Réécris la phrase en remplaçant « les jeunes explorateurs » par « la jeune exploratrice ». Quels mots dois-tu modifier ?",
        },
      ],
      methodTip:
        "Commence par trouver le verbe conjugué. Pose ensuite la question « qui est-ce qui ? » pour trouver le sujet. Cherche enfin les groupes qui précisent quand, comment ou quoi. Pour réécrire, vérifie les accords.",
      correction: [
        {
          prompt: "Verbe conjugué",
          answer:
            "Le verbe conjugué est « ouvrent ». Il indique l’action principale de la phrase : ouvrir.",
        },
        {
          prompt: "Groupe sujet",
          answer:
            "Le groupe sujet complet est « les jeunes explorateurs de l’Académie ». On le trouve en posant la question : qui est-ce qui ouvrent ?",
        },
        {
          prompt: "Compléments",
          answer:
            "« Chaque matin » précise le moment de l’action. « silencieusement » précise la manière. « la grande porte dorée » précise ce qui est ouvert.",
        },
        {
          prompt: "Réécriture",
          answer:
            "Avec « la jeune exploratrice », la phrase devient : « Chaque matin, la jeune exploratrice de l’Académie ouvre silencieusement la grande porte dorée. » On modifie le sujet et le verbe : « les jeunes explorateurs ouvrent » devient « la jeune exploratrice ouvre ».",
        },
      ],
      reinvestmentActivity:
        "Écris une nouvelle phrase sur l’Académie avec un complément de temps, un groupe sujet, un verbe et un complément. Échange-la avec un camarade pour qu’il code les groupes.",
      shortWrittenTrace:
        "Pour analyser une phrase, je cherche le verbe conjugué, puis le groupe sujet, puis les compléments. Pour réécrire, je garde le sens et je vérifie les accords.",
      projectionVersion: {
        title: "Version à projeter",
        content: [
          "Afficher la phrase sans couleur pour une première lecture.",
          "Coder collectivement le verbe, le sujet et les compléments.",
          "Faire justifier chaque choix avec une question grammaticale.",
          "Afficher la réécriture seulement après les propositions des élèves.",
        ],
      },
      printableVersion: {
        title: "Version à imprimer",
        content: [
          "Phrase support avec espace de codage couleur.",
          "Tableau sujet / verbe / compléments à compléter.",
          "Question de justification pour chaque groupe.",
          "Zone de réécriture avec vérification des accords.",
        ],
      },
      progressStatus: {
        state: "prête à lancer",
        detail:
          "Mission complète : analyse grammaticale, justification, réécriture, correction détaillée, projection et impression.",
      },
      usage: {
        projection:
          "Projeter la phrase et utiliser un code couleur collectif pour le verbe, le sujet, les compléments et la réécriture.",
        printing:
          "Imprimer la phrase avec une légende couleur, un tableau d’analyse et une zone de réécriture.",
      },
    },
    teacherUse: ["projection", "impression"],
  },
];

export function getCm2MissionBySlug(slug: string) {
  return cm2Missions.find((mission) => mission.slug === slug);
}

export const cm2Highlights = [
  "Félix change de rôle selon la matière : enquêteur, cartographe, scientifique ou écrivain.",
  "Les missions restent fictives pour l’instant, sans progression réelle ni compte utilisateur.",
  "La structure prépare les futures fiches, quiz et ressources imprimables du niveau CM2.",
];
