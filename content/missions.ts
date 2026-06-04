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
    slug: "methode-lycee",
    title: "Organiser son travail personnel",
    subject: "Méthodologie",
    description:
      "Comprendre ce qui change à l’entrée au lycée et installer trois réflexes durables : planifier, activer, vérifier.",
    objective:
      "Identifier les exigences propres au lycée et construire une méthode personnelle d’organisation du travail.",
    skill:
      "Planifier un travail hebdomadaire en distinguant urgence, régularité et vérification.",
    difficulty: "lycée",
    status: "disponible",
    professorSlug: "oria",
    professorName: "Oria",
    theme: "sky",
    introduction:
      "Oria accueille les nouveaux lycéens dans la grande passerelle. Au lycée, le travail s’allonge, les délais s’espacent et les professeurs annoncent — mais n’accompagnent plus chaque étape. Trois choses changent vraiment : la quantité (plus de matières, plus de contenu par séance), la profondeur (il ne suffit plus de réciter, il faut comprendre et relier) et l’autonomie (c’est à toi de décider quand et comment travailler). La méthode en quatre étapes ci-dessous répond à ces trois défis.",
    support: {
      label: "Exemple guidé — La semaine de Camille",
      content:
        "Camille est en Seconde. Lundi matin, elle note dans son agenda : un devoir de Français à rendre jeudi (rédaction d’un paragraphe d’analyse), un contrôle de Mathématiques annoncé pour vendredi (fonctions affines, chapitre 2), deux leçons d’Histoire-Géographie à relire avant mercredi, et un exposé d’SVT à préparer pour la semaine suivante. Camille ne sait pas par quoi commencer. Elle ouvre son agenda et applique la méthode en quatre étapes. Étape 1 — Recenser : elle liste toutes les tâches sur une seule page. Étape 2 — Évaluer : elle estime le temps de chaque tâche (rédaction : 45 min, contrôle maths : 3 × 20 min de révision répartie, leçons HG : 2 × 15 min, exposé SVT : reporté à la semaine prochaine). Étape 3 — Planifier : lundi soir → leçon HG (15 min) ; mardi soir → révision maths (20 min) + début rédaction (30 min) ; mercredi soir → fin rédaction (15 min) + leçon HG (15 min) + révision maths (20 min) ; jeudi soir → révision maths (20 min) avant contrôle du vendredi. Étape 4 — Vérifier : jeudi soir, Camille coche chaque tâche et note ce qui lui a demandé plus de temps que prévu.",
    },
    questions: [
      "Exercice 1 — Trier les tâches. Dans la situation de Camille, classe chaque tâche dans l’une des deux catégories : « délai fixe » (date précise imposée) ou « travail régulier » (à répartir dans la semaine). Laquelle de ces deux catégories demande d’agir dès aujourd’hui ?",
      "Exercice 2 — Construire un mini planning. Imagine que tu reçois lundi matin : un contrôle de Physique annoncé pour jeudi, une fiche de vocabulaire d’Anglais à apprendre pour mercredi, et un devoir maison de Français à rendre vendredi. Répartis ces trois tâches sur trois soirs (lundi, mardi, mercredi) en justifiant ton choix.",
      "Exercice 3 — Auto-évaluation. À la fin d’une semaine, comment peux-tu vérifier que ta méthode a fonctionné ? Propose deux indicateurs concrets (des traces que tu peux regarder, pas des impressions) et explique pourquoi chacun te renseigne réellement sur ton organisation.",
    ],
    correction: [
      "Exercice 1 — Catégories : rédaction Français (jeudi) = délai fixe ; contrôle Maths (vendredi) = délai fixe ; leçons HG (mercredi) = délai fixe ; exposé SVT (semaine suivante) = travail régulier à anticiper. Les tâches à délai fixe doivent être planifiées immédiatement car une date butoir ne se déplace pas. La règle : ne jamais laisser une date fixe sans action programmée le soir même ou le lendemain.",
      "Exercice 2 — Exemple de planning justifié : lundi soir → fiche vocabulaire Anglais (15 min, premier passage) ; mardi soir → révision Physique (20 min, premier passage) + début devoir Français (30 min) ; mercredi soir → révision Physique (20 min, second passage) + fin devoir Français (20 min). Justification : le contrôle de Physique le jeudi oblige à commencer les révisions mardi au plus tard, avec deux passages courts plutôt qu’un long bloc (espacement = meilleure mémorisation). L’Anglais se mémorise mieux en deux temps courts ; commencer lundi libère mercredi pour la Physique.",
      "Exercice 3 — Deux indicateurs possibles : (1) le nombre de tâches cochées dans l’agenda à la fin de la semaine — si toutes les cases sont cochées à la date prévue, l’organisation a fonctionné ; si plusieurs ont glissé au dernier soir, c’est un signal d’alerte. (2) le temps réel comparé au temps estimé — si chaque tâche a pris à peu près le temps prévu, tes estimations sont fiables ; si tu dépasses systématiquement, tu dois revoir tes prévisions à la hausse. Ces deux indicateurs sont des traces concrètes : une coche ou un chiffre, pas un ressenti.",
    ],
    methodTip:
      "La méthode en 4 étapes : (1) Recenser — note toutes les tâches sur une seule page dès le lundi matin ; (2) Évaluer — estime honnêtement le temps de chaque tâche en minutes ; (3) Planifier — place chaque tâche sur un soir précis de la semaine, les délais fixes en priorité ; (4) Vérifier — coche chaque tâche accomplie et note ce qui a pris plus de temps que prévu. Répété chaque semaine, ce cycle devient automatique en trois semaines.",
    projectionHint:
      "Projeter la situation de Camille et construire le planning collectivement au tableau : une colonne par soir, une ligne par tâche. Demander aux élèves de justifier chaque placement.",
    printHint:
      "Imprimer une grille à quatre colonnes : tâche / délai / temps estimé / soir choisi. Laisser une ligne vide en bas pour la vérification de fin de semaine.",
    curriculumDomain: "Méthodologie",
    curriculumCompetency: "Organiser son travail",
    curriculumObjective: "Planifier, activer et vérifier le travail personnel hebdomadaire",
    officialLevel: "Seconde",
    cycle: "Lycée",
    skillTags: ["organisation", "planning", "lycée", "autonomie", "vérification"],
    teacherUse: ["projection", "impression", "entraînement"],
    studentUse:
      "Lire l’exemple guidé (Camille), répondre aux trois exercices dans l’ordre, puis cocher l’auto-évaluation de l’exercice 3 à la fin de la prochaine semaine réelle.",
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
    status: "disponible",
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
    status: "disponible",
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
