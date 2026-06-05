export type SharedMissionStatus = "disponible" | "à venir";

export type SharedMissionDifficulty =
  | "guidée"
  | "intermédiaire"
  | "approfondissement"
  | "brevet"
  | "lycée";

export type SharedMissionTheme = "jade" | "gold" | "sky" | "ember";

export type MissionTeacherUse =
  | "projection"
  | "impression"
  | "entraînement"
  | "révision";

export type SharedMission = {
  levelSlug: string;
  slug: string;
  title: string;
  subject: string;
  description: string;
  objective: string;
  skill: string;
  difficulty: SharedMissionDifficulty;
  status: SharedMissionStatus;
  professorSlug: string;
  professorName: string;
  associatedCharacter?: string;
  theme: SharedMissionTheme;
  introduction?: string;
  support?: {
    label: string;
    content: string;
  };
  questions?: string[];
  correction?: string[];
  methodTip?: string;
  projectionHint?: string;
  printHint?: string;
  // Champs pédagogiques liés au curriculum
  curriculumDomain?: string;
  curriculumCompetency?: string;
  curriculumObjective?: string;
  officialLevel?: string;
  cycle?: string;
  skillTags?: string[];
  teacherUse?: MissionTeacherUse[];
  studentUse?: string;
};

// Legacy source — migration vers mission-registry en cours.
export const sharedMissions: SharedMission[] = [
  {
    levelSlug: "6e",
    slug: "lecture-de-carte",
    title: "Lecture de Carte",
    subject: "Géographie",
    description:
      "Lire une carte simple, repérer les éléments utiles et formuler une réponse complète.",
    objective: "Utiliser les repères d’une carte pour comprendre un espace organisé.",
    skill: "Prélever des informations cartographiques et les expliquer avec précision.",
    difficulty: "guidée",
    status: "disponible",
    professorSlug: "oria",
    professorName: "Oria",
    associatedCharacter: "Élève entrant en 6e",
    theme: "sky",
    introduction:
      "Oria déplie une carte ancienne de l’Académie : certains lieux sont nommés, d’autres seulement indiqués par des symboles.",
    support: {
      label: "Carte à observer",
      content:
        "La carte montre une rivière au nord, une forêt à l’est, un village au centre et une route qui relie le pont au moulin. Une légende indique : carré = bâtiment, ligne bleue = cours d’eau, pointillés = chemin.",
    },
    questions: [
      "Quel symbole permet de repérer les bâtiments ?",
      "Quel itinéraire peut-on suivre pour aller du pont au moulin ?",
      "Pourquoi la légende est-elle indispensable pour comprendre la carte ?",
    ],
    correction: [
      "Les bâtiments sont indiqués par des carrés.",
      "On peut suivre la route ou le chemin en pointillés selon le tracé indiqué.",
      "La légende explique le sens des symboles : sans elle, on risque de mal interpréter les informations.",
    ],
    methodTip:
      "Commence toujours par lire le titre et la légende avant de répondre aux questions.",
    projectionHint:
      "Projeter le support et faire verbaliser la légende avant de passer aux questions.",
    printHint:
      "Imprimer la carte avec une zone de réponse sous chaque question.",
    curriculumDomain: "Histoire-Géographie",
    curriculumCompetency: "Lire un document",
    curriculumObjective: "à vérifier",
    officialLevel: "6e",
    cycle: "Cycle 3",
    skillTags: ["carte", "légende", "géographie"],
    teacherUse: ["projection", "impression"],
    studentUse: "Observer la carte, lire la légende, puis répondre aux trois questions.",
  },
  {
    levelSlug: "6e",
    slug: "recit-mythologique",
    title: "Récit Mythologique",
    subject: "Français",
    description:
      "Identifier les étapes d’un récit mythologique et comprendre le rôle du héros.",
    objective: "Entrer dans un récit ancien en repérant personnages, épreuves et morale.",
    skill: "Lire un récit patrimonial et justifier une interprétation simple.",
    difficulty: "guidée",
    status: "à venir",
    professorSlug: "oria",
    professorName: "Oria",
    theme: "jade",
    curriculumDomain: "Français",
    curriculumCompetency: "Lire un document",
    curriculumObjective: "à vérifier",
    officialLevel: "6e",
    cycle: "Cycle 3",
    skillTags: ["récit", "mythologie", "lecture"],
    teacherUse: ["projection"],
    studentUse: "Lire le récit et identifier personnages, épreuves et morale.",
  },
  {
    levelSlug: "6e",
    slug: "proportionnalite-simple",
    title: "Proportionnalité Simple",
    subject: "Mathématiques",
    description:
      "Résoudre une situation de proportionnalité avec un tableau ou un raisonnement direct.",
    objective: "Choisir une méthode claire pour passer d’une grandeur à une autre.",
    skill: "Reconnaître et traiter une situation de proportionnalité simple.",
    difficulty: "intermédiaire",
    status: "à venir",
    professorSlug: "oria",
    professorName: "Oria",
    theme: "gold",
    curriculumDomain: "Mathématiques",
    curriculumCompetency: "à vérifier",
    curriculumObjective: "à vérifier",
    officialLevel: "6e",
    cycle: "Cycle 3",
    skillTags: ["proportionnalité", "tableau", "calcul"],
    teacherUse: ["entraînement"],
    studentUse: "Remplir le tableau de proportionnalité en montrant la stratégie.",
  },
  {
    levelSlug: "5e",
    slug: "raisonnement-logique",
    title: "Raisonnement Logique",
    subject: "Résolution de problèmes",
    description:
      "Décomposer une énigme, tester plusieurs pistes et justifier la conclusion.",
    objective: "Apprendre à ralentir pour construire un raisonnement vérifiable.",
    skill: "Organiser des hypothèses et éliminer les pistes impossibles.",
    difficulty: "intermédiaire",
    status: "disponible",
    professorSlug: "enzo",
    professorName: "Enzo",
    theme: "gold",
    introduction:
      "Enzo place trois indices au tableau. Une seule solution fonctionne, mais elle ne se voit pas au premier regard.",
    support: {
      label: "Énigme logique",
      content:
        "Trois coffres sont posés devant toi. Le coffre A dit : « Le trésor est dans B ». Le coffre B dit : « Le trésor n’est pas dans C ». Le coffre C dit : « Le trésor n’est pas dans A ». Une seule phrase est vraie.",
    },
    questions: [
      "Liste les trois hypothèses possibles : trésor dans A, dans B, dans C.",
      "Teste chaque hypothèse en comptant combien de phrases deviennent vraies.",
      "Quelle hypothèse respecte la règle : une seule phrase vraie ?",
    ],
    correction: [
      "Il faut tester A, B puis C sans décider trop vite.",
      "Si le trésor est dans A, seule la phrase de B est vraie.",
      "La solution est donc : le trésor est dans A.",
    ],
    methodTip:
      "En logique, ne cherche pas la réponse tout de suite : teste chaque possibilité et élimine.",
    projectionHint:
      "Projeter les trois phrases et construire un tableau hypothèse / phrases vraies.",
    printHint:
      "Prévoir un tableau à compléter pour garder la trace du raisonnement.",
    curriculumDomain: "Raisonnement",
    curriculumCompetency: "Construire un raisonnement",
    curriculumObjective: "à vérifier",
    officialLevel: "5e",
    cycle: "Cycle 4",
    skillTags: ["logique", "hypothèse", "déduction"],
    teacherUse: ["projection", "entraînement"],
    studentUse: "Tester chaque hypothèse en tableau avant de conclure.",
  },
  {
    levelSlug: "5e",
    slug: "civilisation-medievale",
    title: "Civilisation Médiévale",
    subject: "Histoire",
    description:
      "Comprendre une société médiévale à partir de documents courts et hiérarchisés.",
    objective: "Relier lieux, acteurs et pouvoirs dans une situation historique.",
    skill: "Lire un document historique et construire une réponse contextualisée.",
    difficulty: "intermédiaire",
    status: "à venir",
    professorSlug: "enzo",
    professorName: "Enzo",
    theme: "ember",
    curriculumDomain: "Histoire-Géographie",
    curriculumCompetency: "Lire un document historique",
    curriculumObjective: "à vérifier",
    officialLevel: "5e",
    cycle: "Cycle 4",
    skillTags: ["histoire", "médiéval", "document"],
    teacherUse: ["impression"],
    studentUse: "Lire les documents et relier les acteurs et lieux.",
  },
  {
    levelSlug: "5e",
    slug: "experience-scientifique",
    title: "Expérience Scientifique",
    subject: "Sciences",
    description:
      "Observer un protocole, identifier les variables et formuler une conclusion prudente.",
    objective: "Faire la différence entre observation, hypothèse et conclusion.",
    skill: "Suivre une démarche scientifique simple et exploiter un résultat.",
    difficulty: "intermédiaire",
    status: "à venir",
    professorSlug: "enzo",
    professorName: "Enzo",
    theme: "sky",
    curriculumDomain: "Sciences",
    curriculumCompetency: "Observer une démarche scientifique",
    curriculumObjective: "à vérifier",
    officialLevel: "5e",
    cycle: "Cycle 4",
    skillTags: ["démarche scientifique", "protocole", "conclusion"],
    teacherUse: ["projection", "impression"],
    studentUse: "Compléter la fiche protocole et formuler la conclusion.",
  },
  {
    levelSlug: "4e",
    slug: "argumentation",
    title: "Argumentation",
    subject: "Français",
    description:
      "Construire un avis organisé avec argument, exemple et phrase de conclusion.",
    objective: "Passer d’une opinion spontanée à une réponse structurée.",
    skill: "Formuler une thèse et l’appuyer sur un exemple pertinent.",
    difficulty: "approfondissement",
    status: "disponible",
    professorSlug: "maia",
    professorName: "Maïa",
    theme: "jade",
    introduction:
      "Maïa ouvre un dossier de débat : l’Académie doit choisir entre deux projets, mais chaque avis doit être défendu.",
    support: {
      label: "Sujet de débat",
      content:
        "Faut-il réserver une heure par semaine à la lecture silencieuse au collège ? Tu dois donner ton avis avec un argument et un exemple.",
    },
    questions: [
      "Quelle est ta position : oui, non ou avis nuancé ?",
      "Quel argument principal peux-tu utiliser ?",
      "Quel exemple concret peut rendre ton argument plus convaincant ?",
    ],
    correction: [
      "Une réponse attendue annonce clairement la position.",
      "L’argument explique pourquoi cette position est défendable.",
      "L’exemple rend l’argument plus précis : roman, calme de classe, amélioration du vocabulaire.",
    ],
    methodTip: "Utilise la formule : Je pense que... car... Par exemple...",
    projectionHint:
      "Projeter trois réponses courtes et demander laquelle argumente vraiment.",
    printHint:
      "Imprimer un cadre thèse / argument / exemple / conclusion.",
    curriculumDomain: "Argumentation",
    curriculumCompetency: "Argumenter",
    curriculumObjective: "à vérifier",
    officialLevel: "4e",
    cycle: "Cycle 4",
    skillTags: ["argumentation", "thèse", "exemple"],
    teacherUse: ["projection", "impression"],
    studentUse: "Rédiger un avis structuré avec thèse, argument et exemple.",
  },
  {
    levelSlug: "4e",
    slug: "fonctions-simples",
    title: "Fonctions Simples",
    subject: "Mathématiques",
    description:
      "Lire une relation simple entre deux grandeurs et exploiter un tableau de valeurs.",
    objective: "Comprendre qu’une grandeur peut dépendre d’une autre.",
    skill: "Lire, compléter et interpréter un tableau de fonction simple.",
    difficulty: "approfondissement",
    status: "à venir",
    professorSlug: "maia",
    professorName: "Maïa",
    theme: "gold",
    curriculumDomain: "Mathématiques",
    curriculumCompetency: "Lire une relation mathématique simple",
    curriculumObjective: "à vérifier",
    officialLevel: "4e",
    cycle: "Cycle 4",
    skillTags: ["fonction", "tableau", "grandeurs"],
    teacherUse: ["entraînement"],
    studentUse: "Compléter le tableau de valeurs et interpréter la relation.",
  },
  {
    levelSlug: "4e",
    slug: "revolution-industrielle",
    title: "Révolution Industrielle",
    subject: "Histoire",
    description:
      "Analyser les transformations économiques et sociales à partir d’indices documentaires.",
    objective: "Comprendre comment une innovation transforme le travail et les territoires.",
    skill: "Croiser plusieurs documents pour expliquer un changement historique.",
    difficulty: "approfondissement",
    status: "à venir",
    professorSlug: "maia",
    professorName: "Maïa",
    theme: "ember",
    curriculumDomain: "Histoire",
    curriculumCompetency: "Exploiter un document",
    curriculumObjective: "à vérifier",
    officialLevel: "4e",
    cycle: "Cycle 4",
    skillTags: ["histoire", "industrie", "document"],
    teacherUse: ["impression", "révision"],
    studentUse: "Croiser les documents et expliquer la transformation historique.",
  },
  {
    levelSlug: "3e",
    slug: "brevet",
    title: "Mission Brevet",
    subject: "Français",
    description:
      "S’entraîner à lire un sujet, gérer le temps et rédiger une réponse attendue.",
    objective: "Préparer les gestes essentiels d’un exercice de brevet.",
    skill: "Identifier les attentes d’un sujet et répondre avec une méthode stable.",
    difficulty: "brevet",
    status: "disponible",
    professorSlug: "akira",
    professorName: "Akira",
    theme: "gold",
    introduction:
      "Akira pose un sujet type brevet sur la table du conseil final : avant de répondre, il faut comprendre ce qui est demandé.",
    support: {
      label: "Sujet court",
      content:
        "À partir d’un extrait narratif, explique comment l’auteur crée une atmosphère inquiétante. Ta réponse devra citer deux indices du texte.",
    },
    questions: [
      "Quel verbe de consigne indique ce qu’il faut faire ?",
      "Combien d’indices du texte faut-il citer ?",
      "Quelle forme doit prendre une réponse complète ?",
    ],
    correction: [
      "Le verbe de consigne est « explique » : il faut justifier, pas seulement relever.",
      "Il faut citer deux indices du texte.",
      "Une réponse complète formule l’idée, cite les indices, puis explique leur effet.",
    ],
    methodTip:
      "Au brevet, encadre le verbe de consigne et souligne le nombre d’éléments attendus.",
    projectionHint:
      "Projeter le sujet et faire annoter la consigne collectivement.",
    printHint:
      "Imprimer le sujet avec une marge pour coder verbe, preuves et réponse.",
    curriculumDomain: "Français",
    curriculumCompetency: "Analyser un sujet",
    curriculumObjective: "à vérifier",
    officialLevel: "3e",
    cycle: "Cycle 4",
    skillTags: ["brevet", "consigne", "méthode"],
    teacherUse: ["projection", "impression"],
    studentUse: "Annoter la consigne, identifier le nombre d'indices attendus, rédiger.",
  },
  {
    levelSlug: "3e",
    slug: "analyse-de-document",
    title: "Analyse de Document",
    subject: "Histoire",
    description:
      "Présenter, contextualiser et interpréter un document sans paraphraser.",
    objective: "Transformer un document en preuve pour répondre à une question.",
    skill: "Analyser un document en distinguant source, contexte et information utile.",
    difficulty: "brevet",
    status: "à venir",
    professorSlug: "akira",
    professorName: "Akira",
    theme: "ember",
    curriculumDomain: "Histoire-Géographie",
    curriculumCompetency: "Présenter un document",
    curriculumObjective: "à vérifier",
    officialLevel: "3e",
    cycle: "Cycle 4",
    skillTags: ["document", "analyse", "contexte"],
    teacherUse: ["impression"],
    studentUse: "Présenter, contextualiser et interpréter le document sans paraphraser.",
  },
  {
    levelSlug: "3e",
    slug: "organisation-des-revisions",
    title: "Organisation des Révisions",
    subject: "Méthodologie",
    description:
      "Construire un plan de révision réaliste avec priorités, temps court et vérification.",
    objective: "Apprendre à réviser sans se disperser avant une échéance.",
    skill: "Planifier un travail de révision et contrôler ses acquis.",
    difficulty: "brevet",
    status: "à venir",
    professorSlug: "akira",
    professorName: "Akira",
    theme: "sky",
    curriculumDomain: "Méthodologie",
    curriculumCompetency: "Organiser ses révisions",
    curriculumObjective: "à vérifier",
    officialLevel: "3e",
    cycle: "Cycle 4",
    skillTags: ["révision", "planning", "méthode"],
    teacherUse: ["entraînement", "révision"],
    studentUse: "Construire un plan de révision avec priorités et vérification.",
  },
  {
    levelSlug: "seconde",
    slug: "gerer-temps-revisions",
    title: "Gérer son temps et ses révisions",
    subject: "Méthodologie",
    description:
      "Apprendre à planifier son temps, hiérarchiser ses priorités et réviser efficacement au lycée.",
    objective:
      "Construire une méthode personnelle de gestion du temps et des révisions pour progresser de façon régulière.",
    skill:
      "Planifier, hiérarchiser et contrôler ses révisions avec des outils simples et vérifiables.",
    difficulty: "lycée",
    status: "disponible",
    professorSlug: "oria",
    professorName: "Oria",
    theme: "sky",
    introduction:
      "Oria déroule un agenda vide sur le bureau : les cases sont là, mais rien ne dit encore ce qu'on doit y mettre — ni dans quel ordre.",
    support: {
      label: "Mini-leçon — Gérer son temps et ses révisions",
      content:
        "Au lycée, le volume de travail augmente et les délais se rapprochent. Deux pièges guettent : tout remettre à plus tard (procrastination) ou tout faire en même temps sans prioriser (dispersion).\n\n" +
        "La méthode en 4 étapes :\n" +
        "1. LISTER — noter toutes les tâches à faire pour la semaine (devoirs, révisions, lectures).\n" +
        "2. PRIORISER — classer par urgence et importance : ce qui est urgent ET important passe en premier.\n" +
        "3. DÉCOUPER — transformer chaque grande tâche en petites actions de 20 à 30 minutes maximum.\n" +
        "4. VÉRIFIER — à la fin de chaque session, cocher ce qui est fait et ajuster le plan du lendemain.\n\n" +
        "Exemple guidé :\n" +
        "Léa a un contrôle de physique dans 5 jours, une rédaction à rendre dans 2 jours et deux chapitres d'histoire à relire.\n" +
        "→ Jour 1 : rédaction (urgent, 2 jours) — 45 min de rédaction, découpée en deux séquences de 20 min.\n" +
        "→ Jour 2 : rédaction + début physique — relire le cours (20 min), faire les exercices du chapitre 1 (25 min).\n" +
        "→ Jours 3 et 4 : physique — chapitre 2 + fiche de révision (2 × 30 min).\n" +
        "→ Jour 5 : relecture histoire + révision éclair physique (20 + 20 min).\n" +
        "Résultat : aucune tâche oubliée, aucune soirée de panique.",
    },
    questions: [
      "Exercice 1 (guidé) — Lis la liste suivante et classe chaque tâche en deux colonnes : Urgent / Pas urgent. Tâches : exposé à rendre demain, chapitre à relire pour la semaine prochaine, fiche de vocabulaire à compléter pour après-demain, mail à envoyer à un camarade.",
      "Exercice 2 (intermédiaire) — Marco a un devoir de maths dans 3 jours et un exposé d'histoire dans 6 jours. Il dispose de 30 minutes par jour. Rédige un plan de travail jour par jour en découpant les tâches en séquences de 15 à 20 minutes.",
      "Exercice 3 (approfondissement) — Décris ta propre semaine à venir : liste 5 tâches réelles, classe-les par priorité, découpe les deux plus importantes en petites actions, et prévois une séquence de vérification en fin de chaque journée.",
    ],
    correction: [
      "Corrigé enseignant — Exercice 1 : Urgent : exposé à rendre demain, fiche de vocabulaire pour après-demain. Pas urgent : chapitre à relire pour la semaine prochaine, mail à envoyer. Valoriser la distinction urgence / importance et accepter les justifications argumentées.",
      "Corrigé enseignant — Exercice 2 : Exemple de plan acceptable — Jour 1 : maths, révision cours (20 min) + exercices type (15 min). Jour 2 : maths, correction d'erreurs + fiche récapitulative (30 min). Jour 3 : relecture maths + début exposé histoire, plan (30 min). Jours 4-5 : exposé, rédaction et mise en forme (2 × 30 min). Jour 6 : relecture exposé + révision éclair maths (15 + 15 min). Valoriser la régularité, le découpage et l'absence de bourrage de crâne la veille.",
      "Corrigé enseignant — Exercice 3 : Production personnelle. Critères d'évaluation : 5 tâches listées, classement justifié, au moins 2 tâches découpées en 2 actions ou plus, vérification prévue chaque soir. Correction en classe : confronter les plans et discuter des choix de priorisation.",
    ],
    methodTip:
      "La règle d'or : une session de révision dure 20 à 30 minutes, pas plus. Faire une pause, puis recommencer est plus efficace que de travailler 2 heures d'affilée sans s'arrêter.",
    projectionHint:
      "Projeter la liste de tâches de l'exemple guidé et construire le planning collectivement avant de révéler la solution proposée.",
    printHint:
      "Imprimer une grille hebdomadaire vierge (colonnes : jour, tâche, durée prévue, fait ?).",
    curriculumDomain: "Méthodologie",
    curriculumCompetency: "Organiser ses révisions",
    curriculumObjective: "à vérifier",
    officialLevel: "Seconde",
    cycle: "Lycée",
    skillTags: ["gestion du temps", "révision", "planning", "priorisation"],
    teacherUse: ["projection", "impression", "entraînement"],
    studentUse:
      "Lire la mini-leçon, réaliser les trois exercices dans l'ordre, puis construire son propre planning de révision.",
  },
  {
    levelSlug: "seconde",
    slug: "methode-lycee",
    title: "Méthode Lycée",
    subject: "Méthodologie",
    description:
      "Installer les premiers réflexes de prise de notes, relecture et travail personnel.",
    objective: "Comprendre ce qui change entre collège et lycée.",
    skill: "Organiser son travail avec des routines simples et régulières.",
    difficulty: "lycée",
    status: "disponible",
    professorSlug: "oria",
    professorName: "Oria",
    theme: "sky",
    introduction:
      "Oria accueille les nouveaux lycéens dans la grande passerelle : le défi n’est plus seulement de faire, mais de s’organiser.",
    support: {
      label: "Situation de rentrée",
      content:
        "Un élève de Seconde reçoit trois devoirs longs, deux leçons à relire et un contrôle annoncé dans huit jours. Il note tout dans son agenda, mais ne sait pas par quoi commencer.",
    },
    questions: [
      "Quels éléments sont urgents ? Lesquels demandent un travail régulier ?",
      "Comment répartir le travail sur trois jours sans tout faire d’un coup ?",
      "Quelle trace peut aider l’élève à vérifier qu’il progresse ?",
    ],
    correction: [
      "Le contrôle dans huit jours demande une révision régulière ; les devoirs longs doivent être découpés.",
      "Une bonne organisation répartit lecture, rédaction et entraînement sur plusieurs moments courts.",
      "Une liste de tâches ou un tableau de suivi permet de vérifier ce qui est fait.",
    ],
    methodTip:
      "Au lycée, transforme une grosse tâche en trois petites actions datées.",
    projectionHint:
      "Projeter la situation et construire un mini planning collectif.",
    printHint:
      "Imprimer une grille jour / tâche / durée / vérification.",
    curriculumDomain: "Méthodologie",
    curriculumCompetency: "Organiser son travail",
    curriculumObjective: "à vérifier",
    officialLevel: "Seconde",
    cycle: "Lycée",
    skillTags: ["organisation", "planning", "lycée"],
    teacherUse: ["projection", "impression"],
    studentUse: "Analyser la situation et construire un mini planning sur trois jours.",
  },
  {
    levelSlug: "seconde",
    slug: "lecture-analytique",
    title: "Lecture Analytique",
    subject: "Français",
    description:
      "Observer un texte littéraire, relever des procédés et formuler une interprétation.",
    objective: "Passer de la compréhension globale à l’analyse construite.",
    skill: "Repérer un procédé d’écriture et expliquer son effet.",
    difficulty: "lycée",
    status: "à venir",
    professorSlug: "oria",
    professorName: "Oria",
    theme: "jade",
    curriculumDomain: "Français",
    curriculumCompetency: "Lire analytiquement",
    curriculumObjective: "à vérifier",
    officialLevel: "Seconde",
    cycle: "Lycée",
    skillTags: ["lecture", "procédé", "interprétation"],
    teacherUse: ["projection"],
    studentUse: "Relever les procédés et formuler une interprétation.",
  },
  {
    levelSlug: "seconde",
    slug: "raisonnement-scientifique",
    title: "Raisonnement Scientifique",
    subject: "Sciences",
    description:
      "Construire une réponse scientifique à partir de données et d’une hypothèse.",
    objective: "Relier données, modèle et conclusion sans aller trop vite.",
    skill: "Utiliser des données pour soutenir une conclusion scientifique.",
    difficulty: "lycée",
    status: "à venir",
    professorSlug: "oria",
    professorName: "Oria",
    theme: "sky",
    curriculumDomain: "Sciences",
    curriculumCompetency: "Raisonner scientifiquement",
    curriculumObjective: "à vérifier",
    officialLevel: "Seconde",
    cycle: "Lycée",
    skillTags: ["hypothèse", "données", "conclusion"],
    teacherUse: ["impression", "entraînement"],
    studentUse: "Relier les données à l'hypothèse et formuler une conclusion.",
  },
  {
    levelSlug: "premiere",
    slug: "dissertation",
    title: "Dissertation",
    subject: "Français",
    description:
      "Comprendre un sujet, dégager une problématique et construire un plan simple.",
    objective: "Entrer dans l’exercice long sans perdre la logique du sujet.",
    skill: "Analyser un sujet et organiser une argumentation en parties.",
    difficulty: "lycée",
    status: "à venir",
    professorSlug: "maia",
    professorName: "Maïa",
    theme: "gold",
    introduction:
      "Maïa remet un sujet de dissertation scellé : l’objectif n’est pas de rédiger vite, mais de comprendre la tension du sujet.",
    support: {
      label: "Sujet",
      content:
        "La littérature doit-elle seulement divertir ? Construis une première réflexion en distinguant les mots importants du sujet.",
    },
    questions: [
      "Quels sont les mots à définir dans le sujet ?",
      "Quelle opposition ou tension le sujet propose-t-il ?",
      "Quelle problématique simple pourrait ouvrir la dissertation ?",
    ],
    correction: [
      "Il faut définir notamment « littérature », « seulement » et « divertir ».",
      "La tension oppose le plaisir de lire à d’autres fonctions possibles : instruire, émouvoir, critiquer.",
      "Problématique possible : la littérature se limite-t-elle au divertissement ou peut-elle aussi faire réfléchir ?",
    ],
    methodTip:
      "Avant de chercher des exemples, définis les mots du sujet et repère le piège du mot « seulement ».",
    projectionHint:
      "Projeter le sujet et coder les mots importants en trois couleurs.",
    printHint:
      "Imprimer une fiche sujet / définitions / tension / problématique.",
    curriculumDomain: "Français",
    curriculumCompetency: "Construire une problématique",
    curriculumObjective: "à vérifier",
    officialLevel: "Première",
    cycle: "Lycée",
    skillTags: ["dissertation", "problématique", "plan"],
    teacherUse: ["projection", "impression"],
    studentUse: "Analyser les mots du sujet, identifier la tension et formuler une problématique.",
  },
  {
    levelSlug: "premiere",
    slug: "commentaire",
    title: "Commentaire",
    subject: "Français",
    description:
      "Construire une lecture organisée d’un texte à partir d’observations précises.",
    objective: "Transformer les remarques de lecture en axes d’analyse.",
    skill: "Associer citation, procédé et interprétation.",
    difficulty: "lycée",
    status: "à venir",
    professorSlug: "maia",
    professorName: "Maïa",
    theme: "jade",
    curriculumDomain: "Français",
    curriculumCompetency: "Organiser une argumentation",
    curriculumObjective: "à vérifier",
    officialLevel: "Première",
    cycle: "Lycée",
    skillTags: ["commentaire", "citation", "procédé"],
    teacherUse: ["impression"],
    studentUse: "Associer citation, procédé et interprétation dans deux axes.",
  },
  {
    levelSlug: "premiere",
    slug: "histoire-des-idees",
    title: "Histoire des Idées",
    subject: "Histoire",
    description:
      "Relier un texte, une époque et un débat intellectuel pour construire du sens.",
    objective: "Comprendre qu’une idée naît dans un contexte et répond à un problème.",
    skill: "Contextualiser une idée et expliquer son évolution.",
    difficulty: "lycée",
    status: "à venir",
    professorSlug: "maia",
    professorName: "Maïa",
    theme: "ember",
    curriculumDomain: "Histoire",
    curriculumCompetency: "à vérifier",
    curriculumObjective: "à vérifier",
    officialLevel: "Première",
    cycle: "Lycée",
    skillTags: ["idées", "contexte", "évolution"],
    teacherUse: ["révision"],
    studentUse: "Contextualiser l'idée et retracer son évolution.",
  },
  {
    levelSlug: "terminale",
    slug: "philosophie",
    title: "Philosophie",
    subject: "Philosophie",
    description:
      "Interroger une notion, distinguer les idées proches et formuler un problème.",
    objective: "Apprendre à poser une question philosophique avant de répondre.",
    skill: "Définir une notion et construire une problématique.",
    difficulty: "lycée",
    status: "à venir",
    professorSlug: "akira",
    professorName: "Akira",
    theme: "gold",
    introduction:
      "Akira inscrit une question au centre de la salle : elle paraît simple, mais aucune réponse immédiate ne suffit.",
    support: {
      label: "Question philosophique",
      content:
        "Peut-on être libre sans règles ? Commence par définir les mots « libre » et « règles », puis cherche pourquoi la question pose problème.",
    },
    questions: [
      "Comment définir simplement le mot « libre » ?",
      "Une règle limite-t-elle toujours la liberté ?",
      "Quelle tension rend la question intéressante ?",
    ],
    correction: [
      "Être libre peut signifier pouvoir choisir ou agir par soi-même.",
      "Une règle peut limiter une action, mais elle peut aussi protéger une liberté commune.",
      "La tension vient du fait que les règles semblent contraindre, tout en rendant parfois la liberté possible.",
    ],
    methodTip:
      "En philosophie, commence par définir les mots puis cherche une tension : pourquoi la réponse n’est-elle pas évidente ?",
    projectionHint:
      "Projeter la question et construire deux colonnes : règles qui limitent / règles qui protègent.",
    printHint:
      "Imprimer une fiche définition / exemples / tension / problématique.",
    curriculumDomain: "Philosophie",
    curriculumCompetency: "Définir une notion",
    curriculumObjective: "à vérifier",
    officialLevel: "Terminale",
    cycle: "Lycée",
    skillTags: ["philosophie", "notion", "problématique"],
    teacherUse: ["projection", "impression"],
    studentUse: "Définir les mots clés et formuler la tension du sujet.",
  },
  {
    levelSlug: "terminale",
    slug: "orientation",
    title: "Orientation",
    subject: "Méthodologie",
    description:
      "Présenter un choix d’orientation avec cohérence, preuves et projection réaliste.",
    objective: "Mettre en mots un parcours et justifier une décision.",
    skill: "Construire un argumentaire personnel clair et crédible.",
    difficulty: "lycée",
    status: "à venir",
    professorSlug: "akira",
    professorName: "Akira",
    theme: "sky",
    curriculumDomain: "Méthodologie",
    curriculumCompetency: "à vérifier",
    curriculumObjective: "à vérifier",
    officialLevel: "Terminale",
    cycle: "Lycée",
    skillTags: ["orientation", "argumentaire", "projet"],
    teacherUse: ["impression"],
    studentUse: "Construire un argumentaire personnel clair sur son parcours.",
  },
  {
    levelSlug: "terminale",
    slug: "strategie-de-revision",
    title: "Stratégie de Révision",
    subject: "Méthodologie",
    description:
      "Planifier les dernières révisions avec priorités, alternance et entraînement actif.",
    objective: "Réviser efficacement en évitant l’accumulation passive.",
    skill: "Organiser une stratégie de révision et mesurer ses progrès.",
    difficulty: "lycée",
    status: "à venir",
    professorSlug: "akira",
    professorName: "Akira",
    theme: "ember",
    curriculumDomain: "Méthodologie",
    curriculumCompetency: "Planifier une révision active",
    curriculumObjective: "à vérifier",
    officialLevel: "Terminale",
    cycle: "Lycée",
    skillTags: ["révision", "stratégie", "planning"],
    teacherUse: ["révision", "entraînement"],
    studentUse: "Organiser les révisions par priorités et vérifier les acquis.",
  },
];

export function getSharedMissionsForLevel(levelSlug: string) {
  return sharedMissions.filter((mission) => mission.levelSlug === levelSlug);
}

export function getSharedMission(levelSlug: string, slug: string) {
  return sharedMissions.find(
    (mission) => mission.levelSlug === levelSlug && mission.slug === slug,
  );
}

export function getAllSharedMissionParams(levelSlugs: string[]) {
  return sharedMissions
    .filter((mission) => levelSlugs.includes(mission.levelSlug))
    .map((mission) => ({
      level: mission.levelSlug,
      slug: mission.slug,
    }));
}
