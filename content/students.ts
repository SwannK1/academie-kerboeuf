export type StudentAccent = "gold" | "jade" | "sky" | "ember";

export type EmblematicStudent = {
  name: string;
  slug: string;
  level: string;
  levelSlug: string;
  levelHref: string;
  missionsHref?: string;
  cycle: string;
  animal: string;
  dominantColor: StudentAccent;
  universe: string;
  shortDescription: string;
  personality: string;
  personalityProfile: CharacterPersonalityProfile;
  learningStyle: string;
  image?: string;
  progression: string[];
  recommendedMission?: {
    title: string;
    description: string;
    href?: string;
  };
};

export type CharacterPersonalityProfile = {
  dominantTraits: string[];
  strengths: string[];
  energy: string;
  posture: string;
  interaction: string;
  represents: string;
};

export const studentAccents: Record<
  StudentAccent,
  {
    textClass: string;
    borderClass: string;
    borderSoftClass: string;
    bgClass: string;
    badgeClass: string;
    glowRgb: string;
  }
> = {
  gold: {
    textClass: "text-gold",
    borderClass: "border-gold/40",
    borderSoftClass: "border-gold/20",
    bgClass: "bg-gold/10",
    badgeClass: "border-gold/30 bg-gold/10 text-gold",
    glowRgb: "243,196,91",
  },
  jade: {
    textClass: "text-jade",
    borderClass: "border-jade/40",
    borderSoftClass: "border-jade/20",
    bgClass: "bg-jade/10",
    badgeClass: "border-jade/30 bg-jade/10 text-jade",
    glowRgb: "80,200,164",
  },
  sky: {
    textClass: "text-sky",
    borderClass: "border-sky/40",
    borderSoftClass: "border-sky/20",
    bgClass: "bg-sky/10",
    badgeClass: "border-sky/30 bg-sky/10 text-sky",
    glowRgb: "139,200,255",
  },
  ember: {
    textClass: "text-ember",
    borderClass: "border-ember/40",
    borderSoftClass: "border-ember/20",
    bgClass: "bg-ember/10",
    badgeClass: "border-ember/30 bg-ember/10 text-ember",
    glowRgb: "222,104,72",
  },
};

export const maternelleWorld = {
  title: "Jardin des Premières Découvertes",
  image: "/images/academie-kerboeuf/lieux/maternelle/jardin-des-petits-home.PNG",
  description:
    "Un espace d’entrée dans l’Académie Kerboeuf où le langage, le geste, le jeu et l’exploration préparent les premiers apprentissages.",
};

export const maternelleLevels = [
  {
    slug: "ps",
    label: "Petite Section",
    cycle: "Cycle 1",
    universe: "Portail du Jardin",
    description:
      "Entrer dans les rituels, écouter, manipuler, nommer et explorer le monde proche.",
    href: "/maternelle/ps",
  },
  {
    slug: "ms",
    label: "Moyenne Section",
    cycle: "Cycle 1",
    universe: "Clairière des essais",
    description:
      "Oser chercher, comparer, raconter et construire des premiers repères plus stables.",
    href: "/maternelle/ms",
  },
  {
    slug: "gs",
    label: "Grande Section",
    cycle: "Cycle 1",
    universe: "Passerelle des grands",
    description:
      "Préparer le passage vers le CP avec des défis de langage, de logique et d’autonomie.",
    href: "/maternelle/gs",
  },
];

export const emblematicStudents: EmblematicStudent[] = [
  {
    name: "Malo le Koala Rêveur",
    slug: "malo",
    level: "Moyenne Section",
    levelSlug: "ms",
    levelHref: "/maternelle/ms",
    cycle: "Cycle 1",
    animal: "Koala",
    dominantColor: "jade",
    universe: "Clairière des essais",
    shortDescription:
      "Malo observe longtemps avant d’oser, puis transforme chaque découverte en petite histoire.",
    personality:
      "Calme, sensible et imaginatif, Malo a besoin d’un cadre doux pour montrer ce qu’il comprend.",
    personalityProfile: {
      dominantTraits: ["Calme", "Observateur", "Sensible", "Réfléchi", "Curieux", "Imaginatif"],
      strengths: ["Prend le temps de regarder", "Transforme une découverte en image mentale", "Progresse dans un cadre rassurant"],
      energy: "Une énergie douce, intérieure, qui s’active par la manipulation et l’observation.",
      posture: "Il apprend en touchant, en comparant et en racontant ce qu’il vient de comprendre.",
      interaction: "Il interagit avec prudence, puis s’ouvre quand le rituel devient familier.",
      represents: "L’entrée progressive dans les apprentissages par la sécurité, le sensible et la curiosité.",
    },
    learningStyle:
      "Il apprend par l’observation, l’imitation, les images mentales et les rituels rassurants.",
    progression: [
      "Nommer ce qu’il voit avec des mots précis",
      "Oser raconter une action simple",
      "Comparer deux objets, deux sons ou deux images",
      "Entrer dans une consigne courte avec confiance",
    ],
    recommendedMission: {
      title: "Rituel d’observation du Jardin",
      description:
        "Une future mission de langage oral pour nommer, comparer et raconter une découverte.",
      href: "/maternelle",
    },
  },
  {
    name: "Youri l’Ourson Aventurier",
    slug: "youri",
    level: "Grande Section",
    levelSlug: "gs",
    levelHref: "/maternelle/gs",
    cycle: "Cycle 1",
    animal: "Ourson",
    dominantColor: "gold",
    universe: "Passerelle des grands",
    shortDescription:
      "Youri aime essayer, recommencer et franchir les défis qui préparent l’entrée au CP.",
    personality:
      "Curieux, volontaire et très moteur, Youri avance mieux quand il peut manipuler et verbaliser.",
    personalityProfile: {
      dominantTraits: ["Aventurier", "Curieux", "Motivé", "Courageux", "Sociable"],
      strengths: ["Ose essayer", "Accepte les défis progressifs", "Met facilement ses actions en mots"],
      energy: "Une énergie vive et positive, tournée vers l’action et les missions à franchir.",
      posture: "Il apprend par l’essai, le défi et la verbalisation de ce qu’il tente.",
      interaction: "Il entraîne les autres dans l’activité et aime réussir avec le groupe.",
      represents: "Le passage vers les gestes d’élève : essayer, recommencer, expliquer.",
    },
    learningStyle:
      "Il apprend par le défi progressif, les essais, les erreurs guidées et la mise en mots.",
    progression: [
      "Reformuler une consigne avant d’agir",
      "Chercher une stratégie simple",
      "Expliquer ce qu’il a réussi ou changé",
      "Préparer les gestes d’élève du CP",
    ],
    recommendedMission: {
      title: "Défi de passage vers le CP",
      description:
        "Une future mission de préparation au CP autour de la consigne, du geste et de l’autonomie.",
      href: "/maternelle",
    },
  },
  {
    name: "Zoé la Tortue Curieuse",
    slug: "zoe",
    level: "CP",
    levelSlug: "cp",
    levelHref: "/primaire/cp",
    missionsHref: "/primaire/cp/missions",
    cycle: "Cycle 2",
    animal: "Tortue",
    dominantColor: "jade",
    universe: "Salle des lanternes",
    shortDescription:
      "Zoé avance à son rythme, avec une curiosité solide et le goût des premiers codes.",
    personality:
      "Patiente, attentive et persévérante, Zoé préfère comprendre lentement plutôt que répondre vite.",
    personalityProfile: {
      dominantTraits: ["Douce", "Appliquée", "Persévérante", "Patiente", "Curieuse"],
      strengths: ["Construit ses bases pas à pas", "Sécurise ses repères", "Accepte de recommencer"],
      energy: "Une énergie stable et attentive, idéale pour installer les premiers codes.",
      posture: "Elle apprend par répétition courte, repères visuels et réussites sécurisées.",
      interaction: "Elle observe, écoute, puis ose répondre quand le cadre est clair.",
      represents: "La construction patiente des fondations de lecture, de langage et de confiance.",
    },
    learningStyle:
      "Elle apprend par les repères visuels, les répétitions courtes et les réussites sécurisées.",
    progression: [
      "Oser répondre même sans certitude",
      "Reconnaître les premiers codes de lecture",
      "Associer image, son et mot",
      "Entrer dans un rituel de classe",
    ],
    recommendedMission: {
      title: "Atelier Lecture",
      description:
        "Commencer par une mission courte pour comprendre un texte et repérer les informations clés.",
      href: "/primaire/cp/missions",
    },
  },
  {
    name: "Gaston le Hérisson Astucieux",
    slug: "gaston",
    level: "CE1",
    levelSlug: "ce1",
    levelHref: "/primaire/ce1",
    missionsHref: "/primaire/ce1/missions",
    cycle: "Cycle 2",
    animal: "Hérisson",
    dominantColor: "gold",
    universe: "Galerie des indices",
    shortDescription:
      "Gaston cherche les raccourcis efficaces, mais apprend à expliquer chaque stratégie.",
    personality:
      "Vif, malin et joueur, Gaston aime les défis courts et les procédures qu’on peut comparer.",
    personalityProfile: {
      dominantTraits: ["Calme", "Méthodique", "Observateur", "Logique", "Organisé"],
      strengths: ["Aime comprendre avant d’agir", "Compare les stratégies", "Vérifie ses résultats"],
      energy: "Une énergie posée, concentrée, qui cherche la méthode la plus solide.",
      posture: "Il apprend en nommant sa stratégie et en expliquant pourquoi elle fonctionne.",
      interaction: "Il aime confronter calmement les démarches et écouter les preuves.",
      represents: "Le passage de la réponse spontanée à la stratégie consciente.",
    },
    learningStyle:
      "Il apprend en testant plusieurs méthodes, puis en choisissant celle qu’il peut justifier.",
    progression: [
      "Nommer la stratégie utilisée",
      "Comparer deux démarches",
      "Vérifier un résultat",
      "Expliquer à voix haute une procédure",
    ],
    recommendedMission: {
      title: "Défi Calcul Mental",
      description:
        "S’entraîner à choisir une stratégie et à vérifier un résultat.",
      href: "/primaire/ce1/missions",
    },
  },
  {
    name: "Esteban le Manchot Aventurier",
    slug: "esteban",
    level: "CE2",
    levelSlug: "ce2",
    levelHref: "/primaire/ce2",
    missionsHref: "/primaire/ce2/missions",
    cycle: "Cycle 2",
    animal: "Manchot",
    dominantColor: "sky",
    universe: "Observatoire des notions",
    shortDescription:
      "Esteban aime partir explorer, mais il garde toujours une trace claire de ce qu’il découvre.",
    personality:
      "Précis, enthousiaste et organisé, Esteban transforme une idée floue en schéma utilisable.",
    personalityProfile: {
      dominantTraits: ["Passionné", "Curieux", "Émerveillé", "Aventurier"],
      strengths: ["Aime explorer", "Garde une trace claire", "Relie une découverte à un repère"],
      energy: "Une énergie d’expédition, portée par le plaisir de découvrir et de comprendre.",
      posture: "Il apprend par exploration, schéma, trace visuelle et comparaison d’exemples.",
      interaction: "Il partage ses découvertes comme des indices trouvés sur le terrain.",
      represents: "La curiosité organisée : explorer sans perdre la trace de ce qu’on apprend.",
    },
    learningStyle:
      "Il apprend par les tableaux, les codes couleur, les exemples et les traces durables.",
    progression: [
      "Relier une nouvelle notion à un exemple",
      "Lire une consigne comme une carte",
      "Organiser ses idées dans un schéma",
      "Réutiliser une trace de méthode",
    ],
    recommendedMission: {
      title: "Laboratoire des Idées",
      description:
        "Observer, organiser et garder une trace claire de ce qui a été compris.",
      href: "/primaire/ce2/missions",
    },
  },
  {
    name: "Noisette l’Écureuil Ingénieux",
    slug: "noisette",
    level: "CM1",
    levelSlug: "cm1",
    levelHref: "/primaire/cm1",
    missionsHref: "/primaire/cm1/missions",
    cycle: "Cycle 3",
    animal: "Écureuil",
    dominantColor: "ember",
    universe: "Cartothèque secrète",
    shortDescription:
      "Noisette collecte les indices, les classe et construit des réponses de plus en plus précises.",
    personality:
      "Méthodique, curieuse et discrètement inventive, Noisette aime comprendre ce qui relie les informations.",
    personalityProfile: {
      dominantTraits: ["Vive", "Débrouillarde", "Créative", "Énergique", "Ingénieuse"],
      strengths: ["Invente des solutions", "Classe les informations", "Construit des réponses organisées"],
      energy: "Une énergie rapide et constructive, toujours prête à fabriquer une méthode.",
      posture: "Elle apprend en triant, reliant, cartographiant et synthétisant.",
      interaction: "Elle propose des pistes, ajuste, puis aide à structurer l’idée collective.",
      represents: "L’ingéniosité du Cycle 3 : comprendre, construire, organiser.",
    },
    learningStyle:
      "Elle apprend par l’enquête documentaire, le tri, la carte mentale et la synthèse orale.",
    progression: [
      "Observer un document avant la question",
      "Repérer l’information utile",
      "Organiser une réponse en étapes",
      "Garder la curiosité face à l’inconnu",
    ],
    recommendedMission: {
      title: "Carte du Monde",
      description:
        "Lire des repères, organiser une carte et construire une réponse précise.",
      href: "/primaire/cm1/missions",
    },
  },
  {
    name: "Félix",
    slug: "felix",
    level: "CM2",
    levelSlug: "cm2",
    levelHref: "/primaire/cm2",
    missionsHref: "/primaire/cm2/missions",
    cycle: "Cycle 3",
    animal: "Explorateur",
    dominantColor: "gold",
    universe: "Quartier général de Félix",
    shortDescription:
      "Félix relie les indices, justifie ses réponses et prépare le passage vers le collège.",
    personality:
      "Engagé, curieux et direct, Félix entre dans chaque mission comme dans une vraie enquête.",
    personalityProfile: {
      dominantTraits: ["Stratège", "Persévérant", "Courageux", "Leader naturel"],
      strengths: ["Résout des défis complexes", "Relie les indices", "Justifie ses réponses"],
      energy: "Une énergie de mission, volontaire et concentrée sur la résolution.",
      posture: "Il apprend par enquête, justification, correction guidée et transfert de méthode.",
      interaction: "Il entraîne le groupe vers la preuve et accepte les fausses pistes comme étapes.",
      represents: "La fin du primaire : autonomie, rigueur, stratégie et passage vers le collège.",
    },
    learningStyle:
      "Il apprend par dossiers de mission, questions progressives, justification et correction guidée.",
    progression: [
      "Relier plusieurs indices",
      "Justifier une réponse avec précision",
      "Choisir une stratégie selon la matière",
      "Transférer une méthode vers le collège",
    ],
    recommendedMission: {
      title: "Mission Inférence",
      description:
        "Repérer les indices d’un texte pour comprendre ce qui n’est pas écrit directement.",
      href: "/primaire/cm2/missions/mission-inference",
    },
  },
  {
    name: "Oria",
    slug: "oria-eleve",
    level: "6e",
    levelSlug: "6e",
    levelHref: "/college/6e",
    missionsHref: "/college/6e/missions",
    cycle: "Cycle 3",
    animal: "Créatrice",
    dominantColor: "jade",
    universe: "Passerelle du collège",
    shortDescription:
      "Oria transforme les idées en projets et apprend à installer des méthodes nouvelles.",
    personality:
      "Créative, imaginative et intuitive, Oria expérimente pour rendre une idée concrète.",
    personalityProfile: {
      dominantTraits: ["Créative", "Imaginative", "Intuitive", "Expérimentale"],
      strengths: ["Transforme les idées en projets", "Teste plusieurs pistes", "Relie méthode et imagination"],
      energy: "Une énergie souple, inventive, qui rend la transition vers le collège moins abstraite.",
      posture: "Elle apprend en maquettant une idée, puis en la rendant claire et réutilisable.",
      interaction: "Elle propose, ajuste, écoute les retours et construit avec les autres.",
      represents: "La créativité méthodique : imaginer, tester, structurer.",
    },
    learningStyle:
      "Elle apprend par projets, essais contrôlés, carnets d’idées et reformulation.",
    progression: [
      "Reformuler une consigne",
      "Transformer une idée en méthode",
      "Tester une piste avant de la valider",
      "Présenter un projet clairement",
    ],
    recommendedMission: {
      title: "Lecture de Carte",
      description: "Lire un support et organiser une réponse de collégien.",
      href: "/college/6e/missions/lecture-de-carte",
    },
  },
  {
    name: "Enzo",
    slug: "enzo-eleve",
    level: "5e",
    levelSlug: "5e",
    levelHref: "/college/5e",
    missionsHref: "/college/5e/missions",
    cycle: "Cycle 4",
    animal: "Explorateur d’énergie",
    dominantColor: "sky",
    universe: "Salle des mécanismes",
    shortDescription:
      "Enzo avance avec puissance et apprend à canaliser son énergie dans un raisonnement solide.",
    personality:
      "Déterminé, énergique et persévérant, Enzo gagne en précision quand il structure son effort.",
    personalityProfile: {
      dominantTraits: ["Déterminé", "Énergique", "Persévérant", "Puissant"],
      strengths: ["S’accroche aux problèmes", "Accepte l’entraînement", "Canalise son énergie"],
      energy: "Une énergie forte qui devient très efficace lorsqu’elle est cadrée.",
      posture: "Il apprend en testant, en recommençant et en transformant l’effort en méthode.",
      interaction: "Il stimule le groupe, mais apprend à ralentir pour justifier.",
      represents: "La puissance canalisée par la logique et la persévérance.",
    },
    learningStyle:
      "Il apprend par défis, essais successifs, confrontation des stratégies et correction active.",
    progression: [
      "Décomposer un problème",
      "Canaliser son énergie",
      "Argumenter une démarche",
      "Persévérer après une erreur",
    ],
    recommendedMission: {
      title: "Raisonnement Logique",
      description: "Tester des hypothèses et justifier une conclusion.",
      href: "/college/5e/missions/raisonnement-logique",
    },
  },
  {
    name: "Akira",
    slug: "akira-eleve",
    level: "3e",
    levelSlug: "3e",
    levelHref: "/college/3e",
    missionsHref: "/college/3e/missions",
    cycle: "Cycle 4",
    animal: "Stratège",
    dominantColor: "gold",
    universe: "Salle du conseil final",
    shortDescription:
      "Akira maîtrise ses émotions et avance avec une précision stratégique vers les examens.",
    personality:
      "Calme, précise et disciplinée, Akira construit une réponse comme une stratégie.",
    personalityProfile: {
      dominantTraits: ["Calme", "Précise", "Disciplinée", "Stratégique", "Persévérante"],
      strengths: ["Maîtrise ses émotions", "Planifie avant d’agir", "Synthétise avec rigueur"],
      energy: "Une énergie silencieuse, concentrée, très stable sous pression.",
      posture: "Elle apprend en planifiant, reformulant et vérifiant chaque étape.",
      interaction: "Elle apporte de la stabilité au groupe et clarifie les priorités.",
      represents: "La maîtrise de fin de cycle : méthode, calme, synthèse.",
    },
    learningStyle:
      "Elle apprend par plans, synthèses, objectifs courts et entraînement régulier.",
    progression: [
      "Construire un plan",
      "Gérer le stress d’examen",
      "Synthétiser une idée",
      "Réviser avec stratégie",
    ],
    recommendedMission: {
      title: "Mission Brevet",
      description: "Lire un sujet et organiser une réponse attendue.",
      href: "/college/3e/missions/brevet",
    },
  },
  {
    name: "Armand",
    slug: "armand",
    level: "Première",
    levelSlug: "premiere",
    levelHref: "/lycee/premiere",
    missionsHref: "/lycee/premiere/missions",
    cycle: "Lycée",
    animal: "Lecteur contemplatif",
    dominantColor: "ember",
    universe: "Archives des spécialités",
    shortDescription:
      "Armand cherche le sens derrière les œuvres, les idées et les choix d’écriture.",
    personality:
      "Cultivé, réfléchi et sensible, Armand avance avec élégance intellectuelle.",
    personalityProfile: {
      dominantTraits: ["Cultivé", "Réfléchi", "Sensible", "Élégant intellectuellement", "Contemplatif"],
      strengths: ["Cherche le sens", "Relie les œuvres", "Nuance ses interprétations"],
      energy: "Une énergie lente et profonde, tournée vers la compréhension fine.",
      posture: "Il apprend par lecture attentive, mise en relation et formulation nuancée.",
      interaction: "Il écoute longtemps avant de proposer une interprétation précise.",
      represents: "La sensibilité intellectuelle du lycée : lire pour comprendre le monde.",
    },
    learningStyle:
      "Il apprend par lecture analytique, carnet d’idées et débat interprétatif.",
    progression: [
      "Définir une idée",
      "Relier un texte à un contexte",
      "Nuancer une interprétation",
      "Exprimer une lecture personnelle",
    ],
    recommendedMission: {
      title: "Dissertation",
      description: "Comprendre un sujet et construire une réflexion organisée.",
      href: "/lycee/premiere/missions/dissertation",
    },
  },
  {
    name: "Gabriel",
    slug: "gabriel",
    level: "Terminale",
    levelSlug: "terminale",
    levelHref: "/lycee/terminale",
    missionsHref: "/lycee/terminale/missions",
    cycle: "Lycée",
    animal: "Visionnaire",
    dominantColor: "sky",
    universe: "Conseil des synthèses",
    shortDescription:
      "Gabriel organise l’avenir comme un projet clair, ambitieux et maîtrisé.",
    personality:
      "Visionnaire, organisé et calme, Gabriel avance avec charisme vers l’orientation.",
    personalityProfile: {
      dominantTraits: ["Visionnaire", "Organisé", "Ambitieux", "Calme", "Charismatique", "Stratège"],
      strengths: ["Se projette dans l’avenir", "Organise les priorités", "Construit une stratégie réaliste"],
      energy: "Une énergie claire et orientée vers l’avenir, ambitieuse sans agitation.",
      posture: "Il apprend en planifiant, hiérarchisant et reliant le présent au projet futur.",
      interaction: "Il aide le groupe à voir plus loin et à transformer les idées en décisions.",
      represents: "La projection de fin de lycée : stratégie, orientation, lucidité.",
    },
    learningStyle:
      "Il apprend par objectifs, cartes de priorité, entraînement actif et bilans réguliers.",
    progression: [
      "Clarifier un objectif",
      "Hiérarchiser des priorités",
      "Construire une stratégie de révision",
      "Présenter un choix d’orientation",
    ],
    recommendedMission: {
      title: "Orientation",
      description: "Présenter un choix d’orientation avec cohérence et preuves.",
      href: "/lycee/terminale/missions/orientation",
    },
  },
];

export function getStudentBySlug(slug: string) {
  return emblematicStudents.find((student) => student.slug === slug);
}

export function getAllStudentSlugs() {
  return emblematicStudents.map((student) => ({ slug: student.slug }));
}

export function getStudentForLevelSlug(levelSlug: string) {
  return emblematicStudents.find((student) => student.levelSlug === levelSlug);
}
