import { academyLevels, getLevelPath, getLevelMissionsPath } from "@/content/academy";
import type { AcademyMission } from "@/content/academy";

export type AccentColor = "gold" | "jade" | "sky" | "ember";

export type PedagogyStep = {
  label: string;
  description: string;
};

export type ProfessorMethod = {
  label: string;
  text: string;
};

export type ProfessorProfile = {
  slug: string;
  profileHref: string;
  name: string;
  characterType?: "professeur référent" | "personnalité officielle";
  role: string;
  initial: string;
  mainSubject: string;
  symbol: string;
  description: string;
  specialty: string;
  visualMood: string;
  levelLabel: string;
  cycle: string;
  stage: string;
  moodName: string;
  moodDescription: string;
  levelDescription: string;
  levelPath: string;
  missionsPath: string;
  missionsLinkBasePath: string | null;
  bio: string;
  quote?: string;
  headquarters?: string;
  method: ProfessorMethod[];
  subjects: string[];
  missions: AcademyMission[];
  // Identité narrative
  personality?: string;
  personalityProfile?: CharacterPersonalityProfile;
  visualIdentity?: string;
  pedagogicalRole?: string;
  academyFunction?: string;
  // Relations
  relatedSlugs?: string[];
  // Palette & univers
  accentColor?: AccentColor;
  universeNarrative?: string;
  // Pédagogie immersive
  studentTransformation?: string[];
  studentExperience?: string;
  missionPhilosophy?: string;
  pedagogySteps?: PedagogyStep[];
  // Signature
  teachesThrough?: string[];
  famousFor?: string[];
  favoriteTools?: string[];
  coreValues?: string[];
  // Assets futurs
  avatarImage?: string;
  bannerImage?: string;
  symbolImage?: string;
};

export type CharacterPersonalityProfile = {
  dominantTraits: string[];
  strengths: string[];
  energy: string;
  posture: string;
  interaction: string;
  represents: string;
};

type ProfessorExtended = {
  bio: string;
  quote?: string;
  headquarters?: string;
  method: ProfessorMethod[];
  personality?: string;
  visualIdentity?: string;
  pedagogicalRole?: string;
  academyFunction?: string;
  relatedSlugs?: string[];
  accentColor?: AccentColor;
  universeNarrative?: string;
  studentTransformation?: string[];
  studentExperience?: string;
  missionPhilosophy?: string;
  pedagogySteps?: PedagogyStep[];
  teachesThrough?: string[];
  famousFor?: string[];
  favoriteTools?: string[];
  coreValues?: string[];
  avatarImage?: string;
  bannerImage?: string;
  symbolImage?: string;
};

const professorPersonalityProfiles: Record<string, CharacterPersonalityProfile> = {
  zoe: {
    dominantTraits: ["Douce", "Appliquée", "Persévérante", "Patiente", "Curieuse"],
    strengths: ["Sécurise les premiers essais", "Répète sans lasser", "Construit les bases pas à pas"],
    energy: "Une présence calme et lumineuse, qui donne aux élèves le droit d’oser.",
    posture: "Elle enseigne par rituel, image, geste et répétition courte.",
    interaction: "Elle rassure avant d’exiger, puis accompagne chaque réponse jusqu’à ce qu’elle devienne stable.",
    represents: "Le seuil de l’Académie : confiance, premiers codes et patience pédagogique.",
  },
  gaston: {
    dominantTraits: ["Calme", "Méthodique", "Observateur", "Logique", "Organisé"],
    strengths: ["Fait nommer les stratégies", "Compare les démarches", "Installe la vérification"],
    energy: "Une énergie posée, rigoureuse, qui transforme le calcul en méthode consciente.",
    posture: "Il enseigne en faisant expliquer la procédure avant de valider la réponse.",
    interaction: "Il questionne calmement et pousse l’élève à prouver ce qu’il avance.",
    represents: "Le raisonnement explicite : comprendre avant d’agir.",
  },
  esteban: {
    dominantTraits: ["Passionné", "Curieux", "Émerveillé", "Aventurier"],
    strengths: ["Organise les notions", "Trace des schémas mémorables", "Relie découverte et méthode"],
    energy: "Une énergie d’exploration structurée, curieuse mais toujours lisible.",
    posture: "Il enseigne par cartes mentales, traces durables et observation guidée.",
    interaction: "Il invite les élèves à formuler ce qu’ils voient avant de stabiliser la notion.",
    represents: "La curiosité organisée et la trace claire.",
  },
  noisette: {
    dominantTraits: ["Vive", "Débrouillarde", "Créative", "Énergique", "Ingénieuse"],
    strengths: ["Classe les indices", "Construit des réponses", "Relie plusieurs documents"],
    energy: "Une énergie inventive, rapide, mais toujours tournée vers la construction.",
    posture: "Elle enseigne en donnant d’abord le document, puis la question.",
    interaction: "Elle laisse chercher, relance par indices et valorise les hypothèses.",
    represents: "L’ingéniosité documentaire et la pensée organisée.",
  },
  felix: {
    dominantTraits: ["Stratège", "Persévérant", "Courageux", "Leader naturel"],
    strengths: ["Relie les indices", "Justifie les réponses", "Transforme les défis en méthodes"],
    energy: "Une énergie de mission, engagée, qui rend l’exigence stimulante.",
    posture: "Il enseigne par dossier d’enquête, progression d’indices et correction guidée.",
    interaction: "Il entraîne la classe vers la preuve, sans effacer les fausses pistes.",
    represents: "La fin du primaire : autonomie, courage intellectuel et stratégie.",
  },
  oria: {
    dominantTraits: ["Créative", "Imaginative", "Intuitive", "Expérimentale"],
    strengths: ["Transforme les idées en projets", "Sécurise les transitions", "Crée des routines souples"],
    energy: "Une énergie claire et inventive, faite pour traverser les changements.",
    posture: "Elle enseigne par projet, reformulation et méthode transférable.",
    interaction: "Elle écoute, ajuste et fait construire une méthode que l’élève peut réutiliser seul.",
    represents: "La passerelle : créativité, méthode et autonomie.",
  },
  enzo: {
    dominantTraits: ["Déterminé", "Énergique", "Persévérant", "Puissant"],
    strengths: ["Canalise l’effort", "Décompose les problèmes", "Défend les raisonnements"],
    energy: "Une énergie forte, exigeante, qui devient précise quand elle est structurée.",
    posture: "Il enseigne par hypothèse, test, contre-exemple et débat de démarches.",
    interaction: "Il stimule, provoque un peu, puis demande une justification solide.",
    represents: "La puissance intellectuelle canalisée par le raisonnement.",
  },
  maia: {
    dominantTraits: ["Rigoureuse", "Calme", "Stratège", "Organisée", "Nuancée"],
    strengths: ["Trie les sources", "Croise les documents", "Fait planifier avant d’écrire"],
    energy: "Une énergie contenue, lucide, qui installe l’ordre avant l’action.",
    posture: "Elle enseigne par dossier, tri documentaire, plan et argumentation.",
    interaction: "Elle attend que les preuves soient classées avant d’autoriser la conclusion.",
    represents: "L’esprit critique : distinguer information, preuve et interprétation.",
  },
  akira: {
    dominantTraits: ["Calme", "Précise", "Disciplinée", "Stratégique", "Persévérante"],
    strengths: ["Structure les synthèses", "Prépare les examens", "Maîtrise la pression"],
    energy: "Une énergie sobre et concentrée, très stable dans les moments décisifs.",
    posture: "Il enseigne par plan, reformulation personnelle et validation finale.",
    interaction: "Il parle peu, mais chaque consigne oriente l’élève vers l’essentiel.",
    represents: "La maîtrise de fin de cycle : précision, synthèse et stratégie.",
  },
};

const extendedByLevelSlug: Record<string, ProfessorExtended> = {
  cp: {
    accentColor: "jade",
    avatarImage: "/images/academie-kerboeuf/personnages/professeurs/primaire/zoe.png",
    bio: "Zoé ouvre la porte de l'Académie Kerboeuf. En CP, elle installe les repères fondamentaux avec une patience infinie et une pédagogie douce : lire, compter, oser répondre. Elle sait que les premiers mois de l'année définissent la posture d'un élève pour longtemps.",
    quote: "Un élève qui ose répondre faux est déjà en train d'apprendre.",
    headquarters: "Salle des lanternes",
    universeNarrative:
      "La Salle des lanternes est illuminée par une lumière chaude et filtrée — ni trop vive, ni trop sombre. Les murs sont couverts d'affichages dessinés à la main : lettres illustrées, chiffres reliés à des objets familiers, premières cartes de mission colorées. Ici, on apprend à oser avant d'apprendre à maîtriser.",
    personality:
      "Zoé est patiente, réconfortante et régulière. Elle reformule toujours la même consigne avec des mots différents, jamais en haussant la voix. Elle rit souvent et rassure d'un regard. Ses élèves ne savent pas encore lire, mais ils savent déjà qu'ils sont capables.",
    visualIdentity:
      "Lumière chaude, carnets ouverts et premières cartes de mission. Zoé travaille dans des tons ocre et vert pâle. Ses affichages sont clairs, aérés et illustrés à la main — chaque repère est un dessin que les élèves reconnaissent avant de savoir le lire.",
    pedagogicalRole:
      "Installer les premiers automatismes sans précipitation. Zoé ne commence jamais par la règle — elle commence par le geste, la reconnaissance, le plaisir de trouver. La consigne vient toujours en dernier.",
    academyFunction:
      "Gardienne du seuil. Zoé est le premier contact des élèves avec les codes de l'Académie Kerboeuf. Elle s'assure que chaque enfant ose répondre avant d'apprendre à raisonner, et que personne n'entre dans les apprentissages avec la peur d'échouer.",
    studentExperience:
      "Les élèves de Zoé ne savent pas encore si leur réponse est juste — mais ils savent qu'ils peuvent la donner. Ils entrent dans chaque mission avec l'impression que le droit à l'erreur est garanti, que la question ne met pas en danger. Ils apprennent à oser avant d'apprendre à maîtriser.",
    missionPhilosophy:
      "Zoé conçoit ses missions comme des rituels d'entrée dans l'apprentissage. Chaque activité commence par un repère visuel connu — une image, une couleur, un geste — pour que les élèves entrent sans anxiété. La compétence arrive toujours après le confort, jamais avant.",
    pedagogySteps: [
      {
        label: "Rituel d'entrée",
        description: "Repère visuel connu : une image, une couleur, un geste pour entrer sans anxiété.",
      },
      {
        label: "Oralité d'abord",
        description: "Ce qu'on peut dire, on peut l'écrire. La réponse orale précède toujours l'écrit.",
      },
      {
        label: "Geste guidé",
        description: "Le tracé, le découpage, le dessin — le corps apprend avant la tête.",
      },
      {
        label: "Validation collective",
        description: "La classe confirme ensemble avant que chaque élève n'ancre la réponse.",
      },
    ],
    relatedSlugs: ["gaston", "esteban", "noisette"],
    studentTransformation: [
      "Oser répondre même sans être certain",
      "Reconnaître les lettres et les sons avant de les assembler",
      "Compter en s'appuyant sur une image mentale",
      "Entrer dans un rituel de classe avec confiance",
      "Dire ce qu'on pense avant de l'écrire",
    ],
    teachesThrough: [
      "Rituels répétés chaque semaine",
      "Supports visuels illustrés à la main",
      "Questions ouvertes sans pression de temps",
      "Gestes et mimiques de classe",
    ],
    famousFor: [
      "Sa patience infinie face à l'hésitation",
      "Ses affichages dessinés à la main",
      "Le rituel des « 5 minutes pour oser »",
    ],
    favoriteTools: [
      "Carnets de mission illustrés",
      "Cartes phoniques colorées",
      "Tableaux de repères visuels",
    ],
    coreValues: ["Bienveillance", "Répétition", "Confiance", "Rituel"],
    method: [
      {
        label: "Rituel d'entrée",
        text: "Chaque mission commence par un repère visuel connu : une image, une couleur, un geste. Zoé installe des rituels répétés chaque semaine pour que les élèves entrent dans l'activité sans anxiété.",
      },
      {
        label: "Oralité d'abord",
        text: "La réponse orale précède toujours l'écriture. Zoé fait verbaliser avant de faire écrire — ce que l'élève peut dire, il peut ensuite le tracer. Jamais l'inverse.",
      },
      {
        label: "Durée courte, impact fort",
        text: "Toutes les missions durent 15 minutes maximum. Elles sont conçues pour fonctionner aussi bien en collectif qu'en atelier différencié, avec des élèves en avance ou en difficulté.",
      },
    ],
  },

  ce1: {
    accentColor: "gold",
    avatarImage: "/images/academie-kerboeuf/personnages/professeurs/primaire/gaston.png",
    bio: "Gaston est le professeur qui ne laisse jamais un élève calculer en silence. En CE1, il entraîne les élèves à nommer leur stratégie, à la comparer avec celle des autres, à comprendre pourquoi elle fonctionne — ou pourquoi elle échoue. Son objectif : transformer chaque automatisme en réflexe conscient.",
    quote: "La bonne réponse ne suffit pas. Ce qui compte, c'est de savoir pourquoi elle est bonne.",
    headquarters: "Galerie des indices",
    universeNarrative:
      "La Galerie des indices ressemble à un atelier d'entraînement en constante activité — tableaux effaçables couverts de colonnes de méthodes, chronomètre affiché en permanence, défis affichés sur les murs comme des records à battre. Gaston circule entre les postes, boussole en main, posant la même question à chaque élève : « Quelle stratégie tu as choisie ? »",
    personality:
      "Gaston est enthousiaste, curieux et légèrement compétitif. Il adore les défis chronométrés et les clashs de stratégies entre élèves. Il se souvient toujours de la procédure utilisée par chaque élève et la cite lors des bilans collectifs.",
    visualIdentity:
      "Table d'indices, repères dorés et petits défis chronométrés. Gaston porte toujours une boussole. Son espace de travail est dynamique : tableaux effaçables, chronomètre visible, colonnes de méthodes comparées côte à côte.",
    pedagogicalRole:
      "Transformer les automatismes en stratégies conscientes. Gaston aide les élèves à passer du bon réflexe à la bonne méthode — nommer ce qu'on fait est aussi important que de le faire correctement.",
    academyFunction:
      "Entraîneur de méthodes. Gaston organise les tournois de stratégies et maintient les rituels d'automatismes de la Galerie des indices. Il développe les outils de calcul mental et de vérification utilisés dans les niveaux suivants.",
    studentExperience:
      "Les élèves de Gaston adorent gagner — mais ils apprennent vite que gagner seul ne compte pas autant que gagner en sachant pourquoi. Ils ressentent l'excitation d'un défi chronométré, puis la satisfaction plus profonde d'avoir pu expliquer leur stratégie devant la classe.",
    missionPhilosophy:
      "Gaston construit ses missions autour d'un défi central chronométré, suivi d'une phase de comparaison de procédures. L'objectif n'est jamais seulement la bonne réponse — c'est d'être capable d'expliquer en trente secondes pourquoi c'est la bonne réponse.",
    pedagogySteps: [
      {
        label: "Défi lancé",
        description: "Un problème chronométré pour activer la concentration et l'envie de gagner.",
      },
      {
        label: "Stratégie nommée",
        description: "Quelle méthode tu as choisie ? Chaque élève nomme sa démarche avant de valider.",
      },
      {
        label: "Comparaison de procédures",
        description: "Deux méthodes côte à côte au tableau — laquelle est la plus solide ?",
      },
      {
        label: "Vérification systématique",
        description: "Aucune réponse n'est définitive sans vérification. Le réflexe s'installe dès le CE1.",
      },
    ],
    relatedSlugs: ["zoe", "esteban", "noisette"],
    studentTransformation: [
      "Nommer sa stratégie avant de valider sa réponse",
      "Comparer deux procédures de calcul différentes",
      "Vérifier systématiquement ses résultats",
      "Expliquer sa démarche à voix haute devant la classe",
      "Passer du bon réflexe à la bonne méthode",
    ],
    teachesThrough: [
      "Défis chronométrés",
      "Comparaisons de procédures en binôme",
      "Tournois de stratégies",
      "Bilans collectifs après chaque mission",
    ],
    famousFor: [
      "Sa question signature : « Quelle stratégie tu as choisie ? »",
      "Le chronomètre toujours visible en classe",
      "Ses colonnes de méthodes comparées au tableau",
    ],
    favoriteTools: [
      "Tableau effaçable à colonnes",
      "Chronomètre de classe",
      "Boussole de méthodes",
    ],
    coreValues: ["Stratégie", "Rigueur", "Curiosité", "Vérification"],
    method: [
      {
        label: "La question centrale",
        text: "Gaston pose toujours la même question avant de valider : « Quelle stratégie tu as choisie ? » Les élèves apprennent à nommer leur démarche avant de passer à la suite.",
      },
      {
        label: "Comparaison de procédures",
        text: "Du calcul spontané à la stratégie expliquée. Gaston confronte deux procédures différentes devant la classe et laisse les élèves choisir la plus efficace — avec justification.",
      },
      {
        label: "Vérification systématique",
        text: "Chaque réponse est vérifiée avant d'être validée. Gaston installe le réflexe de revérification dès le CE1 : « Est-ce que tu as vérifié ? Avec quelle méthode ? »",
      },
    ],
  },

  ce2: {
    accentColor: "sky",
    avatarImage: "/images/academie-kerboeuf/personnages/professeurs/primaire/esteban.png",
    bio: "Esteban est l'architecte du savoir de l'Académie. En CE2, elle aide les élèves à construire des représentations mentales organisées — schémas, tableaux, codes couleur — pour que chaque notion trouve sa place dans un ensemble cohérent. Elle ne supporte pas le flou, mais sait s'en servir comme point de départ d'une enquête.",
    quote: "Une leçon sans schéma est une leçon à moitié retenue.",
    headquarters: "Observatoire des notions",
    universeNarrative:
      "L'Observatoire des notions est un espace de silence actif. Chaque tableau est structuré selon le même code couleur — rouge pour les exceptions, bleu pour les règles, vert pour les exemples — et les schémas de Esteban sont tracés avec la précision d'une architecte. Rien n'est flou ici : chaque notion a sa place, chaque règle a sa trace.",
    personality:
      "Esteban est précise, structurée et discrètement créative. Elle schématise tout et offre ses dessins de notions aux élèves. Ses codes couleur sont toujours les mêmes — rouge pour les exceptions, bleu pour les règles, vert pour les exemples.",
    visualIdentity:
      "Observatoire calme, tableaux de notions et tracés précis. Esteban utilise toujours les mêmes couleurs pour les mêmes fonctions. Ses schémas sont nets, reproductibles, affichables. Son espace ressemble à un laboratoire de représentation.",
    pedagogicalRole:
      "Organiser le savoir pour le rendre mémorable et transférable. Esteban transforme chaque leçon en architecture visuelle que les élèves peuvent retrouver, reproduire et utiliser comme référence personnelle.",
    academyFunction:
      "Architecte des traces. Esteban construit les référentiels de classe que tous les autres professeurs de l'Académie peuvent réutiliser. Elle développe les outils de structuration visuelle du savoir — tableaux, schémas, codes — qui forment le langage commun de Kerboeuf.",
    studentExperience:
      "Les élèves de Esteban ont la sensation de voir pour la première fois — comme si une notion qu'ils connaissaient vaguement devenait soudainement claire, tracée, reproductible. Ils repartent avec des schémas dans la tête et un code couleur qu'ils utilisent dans toutes les matières.",
    missionPhilosophy:
      "Esteban structure ses missions comme des architectures visuelles. Chaque activité produit une trace de référence — un schéma, un tableau, un code — que les élèves conservent et réutilisent. La mission ne sert pas uniquement à évaluer ; elle sert à laisser une empreinte dans le cahier de méthodes.",
    pedagogySteps: [
      {
        label: "Activation des acquis",
        description: "Vous avez déjà vu quelque chose comme ça ? La nouvelle notion s'accroche à l'ancienne.",
      },
      {
        label: "Lecture de la consigne",
        description: "La consigne se lit comme une carte : elle indique une direction, pas un itinéraire.",
      },
      {
        label: "Schéma de notion",
        description: "Esteban trace en temps réel le schéma de la notion avec ses codes couleur constants.",
      },
      {
        label: "Trace durable",
        description: "La fiche rejoint le cahier de méthodes et devient un référentiel permanent.",
      },
    ],
    relatedSlugs: ["zoe", "gaston", "noisette"],
    studentTransformation: [
      "Relier une nouvelle règle à ce qu'on sait déjà",
      "Lire une consigne comme une carte à suivre",
      "Construire un schéma mental d'une notion",
      "Utiliser un référentiel personnel en autonomie",
      "Organiser ses connaissances de façon visuelle",
    ],
    teachesThrough: [
      "Schémas de notions dessinés en temps réel",
      "Codes couleur constants et réutilisables",
      "Référentiels affichés et consultables",
      "Liens explicites entre concepts anciens et nouveaux",
    ],
    famousFor: [
      "Ses schémas tracés à la main pendant la leçon",
      "Son système de codes couleur mémorisé par les élèves",
      "Les « traces durables » conservées dans le cahier",
    ],
    favoriteTools: [
      "Tableau de notions codé couleur",
      "Cahier de méthodes personnel",
      "Compas de structuration",
    ],
    coreValues: ["Clarté", "Organisation", "Mémorisation", "Cohérence"],
    method: [
      {
        label: "Relier le nouveau à l'ancien",
        text: "Chaque nouvelle notion est reliée à quelque chose que les élèves connaissent déjà. Esteban commence toujours par : « Vous avez déjà vu quelque chose comme ça ? » avant d'introduire la règle.",
      },
      {
        label: "Consigne comme carte",
        text: "La consigne se lit d'abord seul, puis on repère ensemble les mots qui indiquent ce qu'il faut faire. Esteban traite les consignes comme des cartes : elles indiquent une direction, pas un itinéraire complet.",
      },
      {
        label: "Traces durables",
        text: "Les missions de Esteban servent de traces de référence après la leçon. Elles sont conservées dans le cahier de méthodes, réutilisées lors des révisions et affichées dans la classe.",
      },
    ],
  },

  cm1: {
    accentColor: "ember",
    avatarImage: "/images/academie-kerboeuf/personnages/professeurs/primaire/noisette.png",
    bio: "Noisette guide les élèves dans l'art de lire un document comme un outil. En CM1, il apprend aux élèves à extraire l'information utile d'une carte, d'un texte ou d'un schéma — puis à construire une réponse organisée à partir de ce qu'ils ont trouvé. Il est calme, méthodique, et légèrement mystérieux.",
    quote: "Un document ne dit jamais tout. C'est ce qu'il tait qui est souvent le plus instructif.",
    headquarters: "Cartothèque secrète",
    universeNarrative:
      "La Cartothèque secrète est un labyrinthe de documents superposés, annotés et reliés par des fils de couleur. Noisette travaille sur plusieurs couches simultanément — une carte topographique sous un texte source sous un schéma de synthèse. L'ambiance est celle d'un poste de commandement silencieux où chaque document cache quelque chose.",
    personality:
      "Noisette est calme, méthodique et légèrement énigmatique. Il pose des questions sans donner les réponses trop vite. Il aime que les élèves ne comprennent pas tout de suite — et qu'ils restent curieux. Sa patience est une stratégie pédagogique.",
    visualIdentity:
      "Cartothèque secrète, plans annotés et itinéraires de savoir. Noisette travaille avec plusieurs couches de documents visibles simultanément. Sa table ressemble à un plan de mission en cours — annotée, surlignée, reliée par des fils.",
    pedagogicalRole:
      "Faire passer d'une information repérée à une réponse construite. Noisette apprend aux élèves à ne pas se contenter de trouver — il faut organiser, hiérarchiser, et formuler avec précision.",
    academyFunction:
      "Maître des territoires. Noisette gère la transition entre le Cycle 2 et les exigences du Cycle 3. Il aide les élèves à naviguer dans des documents complexes et prépare le terrain pour les enquêtes de CM2.",
    studentExperience:
      "Les élèves de Noisette ont l'impression d'être des explorateurs face à un terrain inconnu. Ils ne savent jamais tout de suite ce qu'on va leur demander — et cette incertitude est excitante, pas angoissante. Ils apprennent à rester curieux face à ce qu'ils ne comprennent pas encore.",
    missionPhilosophy:
      "Noisette présente toujours le document avant la question. Les élèves observent, formulent des hypothèses, identifient ce qu'ils cherchent — et ce n'est qu'ensuite que la consigne arrive. La curiosité précède toujours la tâche.",
    pedagogySteps: [
      {
        label: "Document avant tout",
        description: "Le document arrive avant la question. Les élèves observent librement.",
      },
      {
        label: "Hypothèse formulée",
        description: "Qu'est-ce que ce document pourrait nous apprendre ? Chaque élève propose.",
      },
      {
        label: "Recherche en binôme",
        description: "Deux élèves, un document, une stratégie de lecture partagée.",
      },
      {
        label: "Synthèse orale",
        description: "La classe met en commun : qu'avons-nous trouvé ? Que reste-t-il à chercher ?",
      },
    ],
    relatedSlugs: ["esteban", "felix", "oria"],
    studentTransformation: [
      "Lire un document comme un outil, pas comme un texte",
      "Extraire l'information utile sans tout relire",
      "Construire une réponse organisée en trois étapes",
      "Formuler une hypothèse avant d'avoir la réponse",
      "Garder la curiosité face à l'incertitude",
    ],
    teachesThrough: [
      "Documents sources présentés avant la consigne",
      "Hypothèses formulées avant toute lecture détaillée",
      "Travail en binôme sur la recherche",
      "Synthèse orale collective après chaque mission",
    ],
    famousFor: [
      "Sa table couverte de documents annotés superposés",
      "Le silence productif de ses classes",
      "Ses questions posées sans réponse immédiate",
    ],
    favoriteTools: [
      "Cartes annotées en couches",
      "Textes multi-documents",
      "Plans de mission progressifs",
    ],
    coreValues: ["Patience", "Précision", "Curiosité", "Structure"],
    method: [
      {
        label: "Le document comme point de départ",
        text: "Noisette ne commence jamais par la consigne — il commence par le document. Les élèves regardent, observent, formulent des hypothèses avant même de savoir ce qu'on va leur demander.",
      },
      {
        label: "Repérer, organiser, expliquer",
        text: "En trois étapes : repérer l'information utile, l'organiser dans une structure logique, puis l'expliquer à l'oral ou à l'écrit. Chaque étape est explicitée avant d'être automatisée.",
      },
      {
        label: "Trois temps en classe",
        text: "Lecture du document en silence — recherche guidée en binôme — synthèse orale collective. Ce cadre est identique pour toutes les missions de CM1 pour créer un rituel efficace.",
      },
    ],
  },

  cm2: {
    accentColor: "gold",
    avatarImage: "/images/academie-kerboeuf/personnages/professeurs/primaire/felix.png",
    bio: "Félix est le référent du CM2 à l'Académie Kerboeuf. Il accompagne les élèves dans les missions les plus complètes du cycle primaire : lecture par inférence, calcul stratégique, production d'écrit, enquête documentaire, investigation scientifique. Chaque activité place les élèves dans un rôle narratif pour rendre les compétences mémorables et transférables au collège.",
    quote: "Les réponses se trouvent dans les indices. Il faut apprendre à les voir.",
    headquarters: "Quartier général CM2",
    universeNarrative:
      "Le Quartier général de Félix ressemble à une salle d'enquête active. Des dossiers codés empilés sur la table, un tableau couvert de fils et d'indices reliés, un carnet d'exploration toujours ouvert sur une page en cours. L'ambiance est intense et concentrée — chaque mission est une enquête réelle, chaque réponse doit être justifiée comme une preuve.",
    personality:
      "Félix est curieux, direct et profondément engagé. Il entre dans chaque mission comme dans une aventure réelle. Il n'hésite pas à se tromper devant les élèves pour montrer que l'erreur fait partie du processus. Il note tout dans son carnet d'exploration — y compris les mauvaises pistes.",
    visualIdentity:
      "Quartier général, dossiers codés et cartes de progression. Félix porte toujours un carnet d'exploration et une série de dossiers couleur. Son tableau est partiellement couvert de fils et d'indices reliés. L'ambiance est celle d'une salle d'enquête active.",
    pedagogicalRole:
      "Relier les indices, justifier les réponses et préparer l'entrée au collège. Félix accompagne chaque élève dans la construction d'une posture de chercheur autonome capable de mobiliser plusieurs compétences dans une même situation.",
    academyFunction:
      "Référent de fin de cycle primaire. Félix coordonne les missions CM2 et assure la continuité pédagogique entre les apprentissages fondamentaux du primaire et les exigences méthodologiques du collège. Il est le garant de la cohérence des compétences acquises en Cycle 3.",
    studentExperience:
      "Les élèves de Félix ont l'impression de participer à une véritable mission. Ils endossent un rôle — enquêteur, cartographe, scientifique — et la compétence à acquérir devient une nécessité narrative. Ils ne se souviennent pas d'avoir fait des exercices ; ils se souviennent d'avoir résolu des enquêtes.",
    missionPhilosophy:
      "Félix construit chaque mission comme un dossier d'enquête : un contexte narratif qui place l'élève dans un rôle, des questions progressives de l'indice vers la synthèse, et une correction guidée qui valide chaque étape. Le contenu pédagogique est mémorable parce qu'il est vécu, pas seulement lu.",
    pedagogySteps: [
      {
        label: "Contexte narratif",
        description: "L'élève entre dans un rôle : enquêteur, cartographe, scientifique.",
      },
      {
        label: "Questions progressives",
        description: "Indice → raisonnement → synthèse : chaque question s'appuie sur la précédente.",
      },
      {
        label: "Correction guidée",
        description: "Chaque étape est validée avant de passer à la suivante.",
      },
      {
        label: "Réinvestissement",
        description: "La méthode utilisée est nommée et transférable à d'autres disciplines.",
      },
    ],
    relatedSlugs: ["noisette", "oria", "akira"],
    studentTransformation: [
      "Relier les indices pour construire une réponse justifiée",
      "Utiliser le contexte narratif comme aide à la compréhension",
      "Choisir une stratégie de calcul adaptée à la situation",
      "Planifier, rédiger et réviser un texte court",
      "Appliquer une démarche d'investigation scientifique",
      "Analyser un document historique ou géographique",
    ],
    teachesThrough: [
      "Missions narratives immersives avec rôle assigné",
      "Questions progressives : indice → raisonnement → synthèse",
      "Correction guidée étape par étape",
      "Support double format : projection collective et impression individuelle",
    ],
    famousFor: [
      "Son carnet d'exploration toujours ouvert sur la table",
      "Les fils et indices reliés sur son tableau",
      "La formule : « Lis comme un détective »",
    ],
    favoriteTools: [
      "Carnet d'exploration codé",
      "Dossiers de missions par couleur",
      "Cartes de progression CM2",
    ],
    coreValues: ["Curiosité", "Rigueur", "Justification", "Engagement"],
    method: [
      {
        label: "Rôle narratif",
        text: "Chaque mission place Félix dans un rôle — enquêteur, cartographe, scientifique ou auteur. Le contexte narratif ancre la compétence dans une situation concrète et mémorable.",
      },
      {
        label: "Questions progressives",
        text: "Les questions progressent de l'indice vers la synthèse : repérer, raisonner, formuler. La correction guidée valide chaque étape sans remplacer la réflexion de l'élève.",
      },
      {
        label: "Double usage",
        text: "Toutes les missions sont prêtes pour la projection collective ou l'impression individuelle. La méthode est toujours explicitée pour que les élèves puissent la réinvestir dans d'autres disciplines.",
      },
    ],
  },

  "6e": {
    accentColor: "jade",
    avatarImage: "/images/academie-kerboeuf/personnages/professeurs/college/oria.png",
    bio: "Oria reçoit les élèves de CM2 et les accompagne dans leur première année de collège. Son objectif : que les méthodes acquises au primaire deviennent des routines solides, transférables dans toutes les matières. Elle sécurise la transition sans jamais simplifier les exigences.",
    quote: "Une méthode qu'on ne peut pas utiliser seul n'est pas encore vraiment apprise.",
    headquarters: "Passerelle du collège",
    universeNarrative:
      "La Passerelle du collège est lumineuse, organisée et rassurante. Chaque méthode a sa fiche, chaque fiche a son affichage, chaque affichage a sa couleur. Oria a pensé cet espace pour que les élèves qui arrivent du primaire ne se sentent jamais perdus — ils reconnaissent les gestes, les étapes, les repères.",
    personality:
      "Oria est bienveillante, ferme et ultra-organisée. Elle répète sans se lasser et adapte toujours son ton à l'élève devant elle. Elle a une mémoire précise des difficultés de chaque élève et adapte ses missions en conséquence.",
    visualIdentity:
      "Passerelle lumineuse, casiers de missions et fiches de méthode. Oria code tout par couleur et par niveau de difficulté. Son espace est fonctionnel et rassurant — chaque chose a une place, chaque méthode a un affichage.",
    pedagogicalRole:
      "Installer des routines transférables dans toutes les matières. Oria sécurise le passage au collège en construisant des automatismes méthodologiques stables : annoter un texte, organiser ses idées, formuler une réponse complète.",
    academyFunction:
      "Passeuse de relais. Oria assure la continuité pédagogique entre le primaire et le collège. Elle développe les fiches de méthode partagées avec les professeurs de discipline et coordonne les missions d'accueil des élèves entrant en 6e.",
    studentExperience:
      "Les élèves d'Oria ressentent rapidement une chose inattendue : la sécurité de la méthode. Ils savent que si ils appliquent la bonne démarche, ils trouveront. Cette confiance dans le processus — pas dans leur talent — est ce qu'Oria installe patiemment et durablement.",
    missionPhilosophy:
      "Oria conçoit ses missions pour qu'elles soient immédiatement réutilisables dans n'importe quelle matière. Chaque activité produit une fiche de méthode que l'élève garde et consulte en autonomie. L'objectif est que la mission survive à la classe — qu'elle devienne un réflexe.",
    pedagogySteps: [
      {
        label: "Reformulation obligatoire",
        description: "Aucun élève ne commence sans avoir reformulé la consigne dans ses propres mots.",
      },
      {
        label: "Routines transférables",
        description: "Les mêmes gestes dans toutes les matières : annoter, organiser, formuler.",
      },
      {
        label: "Fiche de méthode",
        description: "La mission produit une fiche que l'élève garde et consulte en autonomie.",
      },
      {
        label: "Évaluation de l'autonomie",
        description: "La réussite se mesure sans aide — la méthode doit fonctionner seule.",
      },
    ],
    relatedSlugs: ["felix", "enzo", "maia"],
    studentTransformation: [
      "Reformuler une consigne avant d'agir",
      "Transférer une méthode d'une matière à une autre",
      "Annoter un texte de façon efficace et lisible",
      "Formuler une réponse complète et structurée",
      "Travailler en autonomie avec un référentiel de classe",
    ],
    teachesThrough: [
      "Routines identiques dans toutes les matières",
      "Vérification obligatoire de la consigne avant toute action",
      "Fiches de méthode partagées avec toute la classe",
      "Adaptation constante au niveau de chaque élève",
    ],
    famousFor: [
      "Ses casiers de méthodes codés par niveau de difficulté",
      "Sa mémoire précise des difficultés de chaque élève",
      "La règle absolue : « Reformule avant d'agir »",
    ],
    favoriteTools: [
      "Fiches de méthode plastifiées",
      "Casiers de missions codés couleur",
      "Référentiel de transition CM2/6e",
    ],
    coreValues: ["Continuité", "Méthode", "Bienveillance", "Autonomie"],
    method: [
      {
        label: "Routines transférables",
        text: "Oria installe des gestes méthodologiques identiques dans toutes les matières : annoter un texte, organiser ses idées, formuler une réponse complète. Ces gestes deviennent des automatismes.",
      },
      {
        label: "Comprendre avant d'agir",
        text: "Les missions commencent toujours par une vérification de la compréhension de la consigne. Oria n'autorise aucun élève à commencer une activité s'il ne peut pas reformuler ce qu'on lui demande.",
      },
      {
        label: "Référentiels collectifs",
        text: "Les fiches de méthode d'Oria servent de référentiels partagés. Elles sont affichées en classe, distribuées en aide-mémoire et réutilisées lors des contrôles pour évaluer l'autonomie.",
      },
    ],
  },

  "5e": {
    accentColor: "sky",
    avatarImage: "/images/academie-kerboeuf/personnages/professeurs/college/enzo.png",
    bio: "Enzo transforme les problèmes complexes en enquêtes. En 5e, il entraîne les élèves à décortiquer une situation, à choisir une démarche et à argumenter leur réponse avec précision. Il est allergique aux réponses sans justification — et il le dit clairement.",
    quote: "Un bon raisonnement n'est pas celui qui trouve — c'est celui qui explique comment il a trouvé.",
    headquarters: "Salle des mécanismes",
    universeNarrative:
      "La Salle des mécanismes est divisée en zones de travail distinctes, chacune dédiée à une étape du raisonnement. Les prismes de couleurs sur les tables désignent les étapes — hypothèse, test, conclusion. Le tableau d'Enzo est toujours divisé en trois colonnes. Ici, on ne donne pas de réponse sans l'avoir décomposée.",
    personality:
      "Enzo est vif, légèrement provocateur et allergique aux réponses toutes faites. Il pousse les élèves dans leurs retranchements pour faire émerger un raisonnement personnel. Il adore les contre-exemples et les situations où l'intuition est fausse.",
    visualIdentity:
      "Salle des mécanismes, leviers logiques et tableaux d'analyse. Enzo travaille avec des prismes de couleurs — chaque couleur représente une étape du raisonnement. Son tableau est toujours divisé en colonnes : hypothèse, test, conclusion.",
    pedagogicalRole:
      "Faire émerger un raisonnement clair à partir d'une situation complexe. Enzo entraîne les élèves à décortiquer, comparer et défendre une position argumentée — sans jamais se contenter de la première réponse.",
    academyFunction:
      "Analyste en résidence. Enzo développe les outils d'argumentation et de raisonnement utilisés dans les niveaux supérieurs du collège Kerboeuf. Il conçoit les missions de résolution de problèmes complexes et les protocoles de débat structuré.",
    studentExperience:
      "Les élèves d'Enzo vivent une forme de frustration productive. Leur première réponse est souvent fausse, ou trop rapide, ou insuffisamment justifiée — et ils doivent revenir en arrière, reformuler, recommencer. Mais quand la réponse est enfin construite et défendue, elle est indiscutable.",
    missionPhilosophy:
      "Enzo part toujours d'une situation où l'intuition est potentiellement fausse. La mission commence par une hypothèse que les élèves formulent sans aide, puis par une démarche de test et de validation. La conclusion n'est pas une réponse — c'est un raisonnement.",
    pedagogySteps: [
      {
        label: "Énigme posée",
        description: "Une situation où l'intuition risque d'être fausse. L'élève formule une première hypothèse.",
      },
      {
        label: "Décomposition",
        description: "Quelles sont les données utiles ? Lesquelles sont parasites ?",
      },
      {
        label: "Test de la démarche",
        description: "L'élève choisit une méthode et l'applique. Il peut se tromper — c'est prévu.",
      },
      {
        label: "Débat de procédures",
        description: "La classe compare les démarches et choisit la plus solide avec justification.",
      },
    ],
    relatedSlugs: ["oria", "maia", "akira"],
    studentTransformation: [
      "Identifier les données utiles dans une situation complexe",
      "Choisir une démarche et l'argumenter face à la classe",
      "Défendre un raisonnement avec des preuves explicites",
      "Utiliser un contre-exemple pour tester une hypothèse",
      "Distinguer intuition et raisonnement construit",
    ],
    teachesThrough: [
      "Énigmes à décomposer avant toute tentative",
      "Confrontation organisée de démarches différentes",
      "Débats de procédures chronométrés",
      "Contre-exemples intentionnels pour briser les intuitions erronées",
    ],
    famousFor: [
      "Son tableau divisé en trois colonnes : hypothèse / test / conclusion",
      "Les débats de stratégies après chaque mission",
      "Son allergie déclarée aux réponses sans justification",
    ],
    favoriteTools: [
      "Prisme de raisonnement",
      "Tableau d'analyse à trois colonnes",
      "Dossiers d'énigmes progressives",
    ],
    coreValues: ["Précision", "Argumentation", "Curiosité critique", "Honnêteté intellectuelle"],
    method: [
      {
        label: "L'énigme comme point d'entrée",
        text: "Enzo présente chaque problème comme une énigme à décomposer. Les élèves apprennent à identifier ce qu'ils cherchent avant de chercher — et à distinguer les données utiles des données parasites.",
      },
      {
        label: "Analyser, comparer, défendre",
        text: "Analyser la situation, comparer plusieurs pistes, défendre la plus solide. Enzo guide les élèves pour qu'ils justifient leurs choix de démarche, pas seulement leurs réponses finales.",
      },
      {
        label: "Débat de procédures",
        text: "Les missions se prêtent au débat court : plusieurs élèves présentent leur démarche, la classe choisit la plus solide et explique pourquoi. L'erreur argumentée vaut plus que la bonne réponse silencieuse.",
      },
    ],
  },

  "4e": {
    accentColor: "ember",
    bio: "Maïa accompagne les dossiers documentaires les plus denses du collège. En 4e, elle apprend aux élèves à trier, croiser et hiérarchiser des informations issues de sources multiples pour construire des réponses solides et nuancées. Elle pense toujours à deux ou trois étapes d'avance.",
    quote: "Une information n'est pas une preuve. Sauf si vous pouvez montrer d'où elle vient.",
    headquarters: "Bureau des enquêtes",
    universeNarrative:
      "Le Bureau des enquêtes est impeccablement rangé — chaque dossier porte un code, chaque archive est datée et annotée. Maïa a constitué une bibliothèque documentaire que les élèves apprennent à consulter comme des chercheurs professionnels. L'ordre est une méthode, pas une contrainte.",
    personality:
      "Maïa est rigoureuse, calme sous pression et stratège dans l'âme. Elle pense toujours à deux ou trois étapes d'avance. Elle aime que les élèves s'organisent avant d'agir — et elle attend que le plan soit fait avant d'autoriser l'écriture.",
    visualIdentity:
      "Bureau d'enquête, dossiers scellés et frises discrètes. Maïa classe tout : ses dossiers sont codés, datés et annotés. Son bureau est un modèle d'organisation. Les élèves savent qu'ils ne trouveront jamais un document mal rangé chez elle.",
    pedagogicalRole:
      "Apprendre à différencier une information d'une interprétation, et à croiser les sources pour construire une réponse nuancée. Maïa forme des élèves capables de travailler avec des documents contradictoires.",
    academyFunction:
      "Archiviste stratégique. Maïa gère la bibliothèque documentaire de l'Académie et développe les dossiers d'enquête utilisés dans les missions de 4e. Elle forme les élèves à la lecture critique de documents historiques, journalistiques et scientifiques.",
    studentExperience:
      "Les élèves de Maïa apprennent que travailler vite n'est pas la même chose que travailler bien. Ils ressentent d'abord l'inconfort de devoir planifier avant d'agir — puis la satisfaction d'une réponse qui tient face à toutes les objections.",
    missionPhilosophy:
      "Maïa remet toujours plusieurs documents avant de poser la question. Les élèves doivent d'abord trier — lequel est pertinent ? lequel est hors-sujet ? — avant de commencer à lire. La réponse ne peut pas être trouvée dans un seul document : elle se construit par croisement.",
    pedagogySteps: [
      {
        label: "Tri documentaire",
        description: "Plusieurs documents remis avant la question. Lequel répond ? Lequel est hors-sujet ?",
      },
      {
        label: "Lecture croisée",
        description: "Identifier la thèse de chaque document et les points de convergence ou de contradiction.",
      },
      {
        label: "Plan avant tout",
        description: "Aucune rédaction sans plan préalable. Le plan est approuvé avant l'écriture.",
      },
      {
        label: "Mise en commun argumentée",
        description: "Les interprétations divergentes sont confrontées : qui peut défendre la sienne ?",
      },
    ],
    relatedSlugs: ["enzo", "akira", "oria"],
    studentTransformation: [
      "Distinguer une information d'une interprétation",
      "Croiser plusieurs sources avant de conclure",
      "Construire une réponse par étapes documentées",
      "Travailler avec des documents contradictoires",
      "Planifier son écrit avant toute rédaction",
    ],
    teachesThrough: [
      "Dossiers documentaires multi-sources remis avant la question",
      "Tri préalable des documents par pertinence",
      "Travail individuel suivi d'une mise en commun argumentée",
      "Argumentation par références explicites aux documents",
    ],
    famousFor: [
      "Ses dossiers scellés numérotés et codés",
      "La règle inviolable : « Plan d'abord, écriture ensuite »",
      "Sa patience face aux désaccords argumentés entre élèves",
    ],
    favoriteTools: [
      "Dossiers d'archives codés",
      "Grilles de tri documentaire",
      "Frises chronologiques annotées",
    ],
    coreValues: ["Rigueur", "Nuance", "Organisation", "Esprit critique"],
    method: [
      {
        label: "Trier avant de lire",
        text: "Maïa donne toujours plusieurs documents avant de poser la question. Les élèves doivent d'abord les trier — lequel répond à la question ? Lequel est hors-sujet ? — avant de commencer à lire en détail.",
      },
      {
        label: "Croiser les sources",
        text: "Identifier la thèse ou l'argument principal, puis chercher les preuves qui le soutiennent ou le nuancent. La réponse se construit par étapes, avec des références explicites aux documents.",
      },
      {
        label: "Deux temps de travail",
        text: "Les missions sont conçues pour un travail en deux temps : préparation individuelle — puis mise en commun argumentée pour confronter les interprétations et identifier les points de désaccord.",
      },
    ],
  },

  "3e": {
    accentColor: "gold",
    avatarImage: "/images/academie-kerboeuf/personnages/professeurs/college/akira.png",
    bio: "Akira prépare les élèves de 3e aux grandes étapes du collège : bilan de cycle, orientation, examens. Avec lui, les élèves apprennent à structurer leur pensée, à synthétiser leurs connaissances et à présenter leur travail avec l'assurance de quelqu'un qui sait ce qu'il dit — et pourquoi il le dit.",
    quote: "On ne maîtrise vraiment une idée que le jour où on peut l'expliquer à quelqu'un d'autre.",
    headquarters: "Salle du conseil final",
    universeNarrative:
      "La Salle du conseil final est sobre, sombre et d'une précision absolue. Pas de couleurs inutiles, pas de décorations — seulement les plans de synthèse d'Akira, tracés avec une économie de moyens qui rend chaque mot essentiel. Entrer ici, c'est entrer dans la dernière étape — et comprendre que chaque mot compte.",
    personality:
      "Akira est grave, charismatique et d'une précision absolue. Il parle peu mais chaque mot compte. Les élèves l'écoutent différemment — comme si chaque phrase était importante à retenir. Il ne répète jamais deux fois la même consigne.",
    visualIdentity:
      "Salle du conseil final, plans de synthèse et repères sobres. Akira utilise très peu de couleurs — les informations essentielles s'imposent par leur disposition, pas par leur décoration. Ses plans de synthèse sont gravés dans la mémoire de ses élèves.",
    pedagogicalRole:
      "Transformer des connaissances dispersées en réponses organisées et présentées avec assurance. Akira prépare les élèves aux exercices de bilan, aux oraux et aux choix d'orientation de fin de collège.",
    academyFunction:
      "Gardien du sceau. Akira valide les parcours accomplis au collège Kerboeuf et prépare chaque élève à présenter son bilan de Cycle 4 avec assurance. Il marque la dernière étape du collège avant l'entrée dans les exigences du lycée.",
    studentExperience:
      "Les élèves d'Akira ont conscience d'être dans la dernière étape. Cette conscience leur donne une gravité particulière — ils travaillent comme s'ils savaient que leurs réponses seront lues longtemps après. Ils apprennent à parler et à écrire comme quelqu'un qui a quelque chose à prouver.",
    missionPhilosophy:
      "Akira exige un plan avant toute rédaction ou exposé. La mission commence par une phase de structuration obligatoire — des idées organisées, hiérarchisées, reliées — et l'écriture ne commence qu'une fois que le plan est approuvé. Ce qu'on n'a pas planifié, on ne peut pas défendre.",
    pedagogySteps: [
      {
        label: "Plan obligatoire",
        description: "Rien ne s'écrit sans être d'abord structuré. Le plan est la première livraison.",
      },
      {
        label: "Reformulation personnelle",
        description: "L'élève dit la même idée avec ses propres mots — sans consulter le document.",
      },
      {
        label: "Présentation structurée",
        description: "L'élève présente son travail comme s'il devait convaincre quelqu'un qui ne sait rien.",
      },
      {
        label: "Validation finale",
        description: "Le sceau d'Akira n'est accordé qu'aux réponses qui tiendraient face à n'importe quelle question.",
      },
    ],
    relatedSlugs: ["maia", "enzo", "felix"],
    studentTransformation: [
      "Reformuler une idée complexe avec ses propres mots",
      "Structurer un plan avant tout écrit ou exposé",
      "Présenter son travail avec assurance à l'oral",
      "Relier les savoirs de plusieurs disciplines",
      "Anticiper les questions lors d'un oral",
    ],
    teachesThrough: [
      "Plans obligatoires avant toute rédaction",
      "Exercices de reformulation personnelle",
      "Préparation d'oraux en classe avec feedback immédiat",
      "Synthèses inter-disciplinaires reliant plusieurs matières",
    ],
    famousFor: [
      "Ses plans de synthèse minimalistes sans fioriture",
      "Le silence qui précède toujours ses corrections",
      "La règle fondamentale : « Ce qu'on ne peut pas redire, on ne l'a pas compris »",
    ],
    favoriteTools: [
      "Plans de synthèse sobres",
      "Sceau de validation de cycle",
      "Grilles d'auto-évaluation d'oral",
    ],
    coreValues: ["Précision", "Synthèse", "Assurance", "Intégrité"],
    method: [
      {
        label: "Connexions entre les matières",
        text: "Akira aide les élèves à voir les connexions entre les disciplines et à structurer un plan clair avant de rédiger ou d'exposer. Il n'y a pas de réponse écrite sans plan préalable — jamais.",
      },
      {
        label: "Reformuler pour maîtriser",
        text: "Synthétiser, formuler, réviser. Akira insiste sur la capacité à reformuler une idée avec ses propres mots, sans rester dépendant du document source. Ce qu'on ne peut pas redire, on ne l'a pas compris.",
      },
      {
        label: "Présentation professionnelle",
        text: "Les missions d'Akira préparent aux exercices de bilan et aux oraux : l'élève apprend à présenter son travail de manière structurée, à anticiper les questions et à défendre ses choix.",
      },
    ],
  },
};

const rawProfessorProfiles: ProfessorProfile[] = academyLevels.map((level) => {
  const extended = extendedByLevelSlug[level.slug] ?? {
    bio: level.professor.description,
    method: [
      { label: "Approche", text: level.professor.specialty },
      { label: "Ambiance", text: level.professor.visualMood },
      { label: "Niveau", text: `${level.label} — ${level.cycle}` },
    ],
  };

  const subjects = [...new Set(level.missions.map((m) => m.subject))];
  const missionsLinkBasePath = level.slug === "cm2" ? "/primaire/cm2/missions" : null;

  return {
    slug: level.professor.slug,
    profileHref: `/professeurs/${level.professor.slug}`,
    name: level.professor.name,
    characterType: "professeur référent",
    role: level.professor.role,
    initial: level.professor.initial,
    mainSubject: level.professor.mainSubject,
    symbol: level.professor.symbol,
    description: level.professor.description,
    specialty: level.professor.specialty,
    visualMood: level.professor.visualMood,
    levelLabel: level.label,
    cycle: level.cycle,
    stage: level.stage,
    moodName: level.mood.name,
    moodDescription: level.mood.description,
    levelDescription: level.description,
    levelPath: getLevelPath(level),
    missionsPath: getLevelMissionsPath(level),
    missionsLinkBasePath,
    bio: extended.bio,
    quote: extended.quote,
    headquarters: extended.headquarters,
    method: extended.method,
    subjects,
    missions: level.missions,
    personality: extended.personality,
    personalityProfile: professorPersonalityProfiles[level.professor.slug],
    visualIdentity: extended.visualIdentity,
    pedagogicalRole: extended.pedagogicalRole,
    academyFunction: extended.academyFunction,
    relatedSlugs: extended.relatedSlugs,
    accentColor: extended.accentColor,
    universeNarrative: extended.universeNarrative,
    studentTransformation: extended.studentTransformation,
    studentExperience: extended.studentExperience,
    missionPhilosophy: extended.missionPhilosophy,
    pedagogySteps: extended.pedagogySteps,
    teachesThrough: extended.teachesThrough,
    famousFor: extended.famousFor,
    favoriteTools: extended.favoriteTools,
    coreValues: extended.coreValues,
    avatarImage: extended.avatarImage,
    bannerImage: extended.bannerImage,
    symbolImage: extended.symbolImage,
  };
});

const officialPersonalities: {
  slug: string;
  name: string;
  role: string;
  mainSubject: string;
  symbol: string;
  levelLabel: string;
  cycle: string;
  accentColor: AccentColor;
  universe: string;
  personalityProfile: CharacterPersonalityProfile;
}[] = [
  {
    slug: "agathe",
    name: "Agathe la Chouette",
    role: "Gardienne des récits",
    mainSubject: "Lecture",
    symbol: "Plume nocturne",
    levelLabel: "Académie",
    cycle: "Personnalité officielle",
    accentColor: "gold",
    universe: "Bibliothèque des récits",
    personalityProfile: {
      dominantTraits: ["Sage", "Patiente", "Mystérieusement rassurante", "Fine observatrice", "Intelligente"],
      strengths: ["Lit les détails invisibles", "Installe une exigence douce", "Fait aimer les récits"],
      energy: "Une énergie calme, enveloppante, mais très exigeante intellectuellement.",
      posture: "Elle guide par questions lentes, silences utiles et observation précise.",
      interaction: "Elle rassure sans simplifier et pousse l’élève à lire plus finement.",
      represents: "La lecture profonde : comprendre ce que le texte dit et ce qu’il suggère.",
    },
  },
  {
    slug: "leo",
    name: "Léo le Zébu",
    role: "Maître des raisonnements stables",
    mainSubject: "Mathématiques",
    symbol: "Règle de pierre",
    levelLabel: "Académie",
    cycle: "Personnalité officielle",
    accentColor: "jade",
    universe: "Salle des preuves",
    personalityProfile: {
      dominantTraits: ["Stable", "Logique", "Calme", "Méthodique", "Rassurant", "Persévérant"],
      strengths: ["Pose des méthodes solides", "Rend les problèmes moins menaçants", "Tient l’effort"],
      energy: "Une énergie lente et puissante, qui sécurise les raisonnements difficiles.",
      posture: "Il avance étape par étape, sans jamais sauter la preuve.",
      interaction: "Il stabilise le groupe et encourage la discipline mentale.",
      represents: "La force tranquille de la logique.",
    },
  },
  {
    slug: "soa",
    name: "Soa le Caméléon",
    role: "Exploratrice du vivant",
    mainSubject: "Sciences",
    symbol: "Loupe verte",
    levelLabel: "Académie",
    cycle: "Personnalité officielle",
    accentColor: "jade",
    universe: "Serre des observations",
    personalityProfile: {
      dominantTraits: ["Curieuse", "Vive", "Adaptable", "Observatrice", "Dynamique"],
      strengths: ["Observe le vivant", "S’adapte aux indices", "Éveille l’émerveillement scientifique"],
      energy: "Une énergie changeante et vive, toujours attentive à la nature.",
      posture: "Elle enseigne par observation, comparaison et hypothèse.",
      interaction: "Elle invite les élèves à regarder avant de conclure.",
      represents: "La curiosité scientifique en mouvement.",
    },
  },
  {
    slug: "rosa",
    name: "Rosa le Flamant Rose",
    role: "Guide de la parole claire",
    mainSubject: "Oral",
    symbol: "Micro doré",
    levelLabel: "Académie",
    cycle: "Personnalité officielle",
    accentColor: "gold",
    universe: "Agora lumineuse",
    personalityProfile: {
      dominantTraits: ["Charismatique", "Lumineuse", "Sociable", "Positive", "Élégante", "Dynamique"],
      strengths: ["Encourage la prise de parole", "Valorise l’expression", "Installe la confiance orale"],
      energy: "Une énergie solaire et sociale, tournée vers l’expression.",
      posture: "Elle enseigne par prise de parole graduée et écoute active.",
      interaction: "Elle fait circuler la parole et rend chaque intervention plus claire.",
      represents: "L’oral assumé, élégant et encourageant.",
    },
  },
  {
    slug: "elias",
    name: "Élias le Dromadaire",
    role: "Conteur des civilisations",
    mainSubject: "Histoire",
    symbol: "Carte ancienne",
    levelLabel: "Académie",
    cycle: "Personnalité officielle",
    accentColor: "ember",
    universe: "Archives des civilisations",
    personalityProfile: {
      dominantTraits: ["Sage", "Patient", "Cultivé", "Érudit", "Calme", "Conteur"],
      strengths: ["Relie les époques", "Raconte les civilisations", "Donne de la profondeur aux faits"],
      energy: "Une énergie lente, érudite, presque méditative.",
      posture: "Il enseigne par récit, contexte et mémoire longue.",
      interaction: "Il écoute les questions et répond comme on ouvre une archive.",
      represents: "La culture historique patiente et incarnée.",
    },
  },
  {
    slug: "pablo",
    name: "Pablo l’Orang-outan",
    role: "Atelier de création expressive",
    mainSubject: "Arts",
    symbol: "Carnet libre",
    levelLabel: "Académie",
    cycle: "Personnalité officielle",
    accentColor: "ember",
    universe: "Atelier des formes",
    personalityProfile: {
      dominantTraits: ["Créatif", "Expressif", "Chaleureux", "Imaginatif", "Libre", "Sensible"],
      strengths: ["Libère les idées", "Accepte les essais", "Donne forme aux émotions"],
      energy: "Une énergie chaude, libre et expressive.",
      posture: "Il enseigne par création, brouillon, reprise et liberté cadrée.",
      interaction: "Il accueille les propositions et aide à les transformer en production.",
      represents: "L’imagination sensible et créatrice.",
    },
  },
  {
    slug: "naia",
    name: "Naïa l’Hippocampe",
    role: "Gardienne des harmonies",
    mainSubject: "Arts",
    symbol: "Onde claire",
    levelLabel: "Académie",
    cycle: "Personnalité officielle",
    accentColor: "sky",
    universe: "Galerie des songes",
    personalityProfile: {
      dominantTraits: ["Poétique", "Apaisante", "Sensible", "Élégante", "Rêveuse", "Artistique"],
      strengths: ["Apaise l’entrée dans l’art", "Fait sentir les nuances", "Relie émotion et forme"],
      energy: "Une énergie douce, fluide et harmonieuse.",
      posture: "Elle enseigne par écoute, contemplation et composition progressive.",
      interaction: "Elle invite à ressentir avant d’expliquer.",
      represents: "La sensibilité artistique et l’harmonie intérieure.",
    },
  },
  {
    slug: "max",
    name: "Max le Kangourou",
    role: "Coach des défis positifs",
    mainSubject: "Méthodologie",
    symbol: "Élan",
    levelLabel: "Académie",
    cycle: "Personnalité officielle",
    accentColor: "gold",
    universe: "Terrain des défis",
    personalityProfile: {
      dominantTraits: ["Énergique", "Bienveillant", "Motivant", "Protecteur", "Enthousiaste", "Courageux"],
      strengths: ["Remobilise les élèves", "Transforme l’effort en défi", "Protège la confiance"],
      energy: "Une énergie bondissante, positive et très encourageante.",
      posture: "Il enseigne par défi court, encouragement et reprise immédiate.",
      interaction: "Il motive sans brusquer et célèbre les progrès visibles.",
      represents: "Le courage joyeux d’essayer encore.",
    },
  },
  {
    slug: "hector",
    name: "Hector le Castor",
    role: "Constructeur de méthodes",
    mainSubject: "Technologie",
    symbol: "Plan de construction",
    levelLabel: "Académie",
    cycle: "Personnalité officielle",
    accentColor: "jade",
    universe: "Atelier des prototypes",
    personalityProfile: {
      dominantTraits: ["Ingénieux", "Méthodique", "Constructeur", "Créatif", "Pratique", "Patient", "Organisé"],
      strengths: ["Fabrique des méthodes concrètes", "Planifie les étapes", "Répare les erreurs"],
      energy: "Une énergie patiente et constructive, orientée vers le faire.",
      posture: "Il enseigne par prototype, plan, test et amélioration.",
      interaction: "Il montre, laisse essayer, puis aide à consolider.",
      represents: "L’intelligence pratique et organisée.",
    },
  },
  {
    slug: "melina",
    name: "Mélina l’Abeille",
    role: "Coordinatrice du vivant",
    mainSubject: "Sciences",
    symbol: "Alvéole",
    levelLabel: "Académie",
    cycle: "Personnalité officielle",
    accentColor: "gold",
    universe: "Ruche des observations",
    personalityProfile: {
      dominantTraits: ["Organisée", "Vive", "Coopérative", "Précise", "Énergique", "Attentive aux détails"],
      strengths: ["Fait coopérer", "Repère les détails", "Organise les observations du vivant"],
      energy: "Une énergie collective, précise et active.",
      posture: "Elle enseigne par coopération, observation et classement.",
      interaction: "Elle distribue les rôles et valorise la précision de chacun.",
      represents: "La science coopérative et attentive.",
    },
  },
  {
    slug: "selena",
    name: "Selena la Tigresse",
    role: "Analyste des récits intenses",
    mainSubject: "Français",
    symbol: "Griffe d’encre",
    levelLabel: "Académie",
    cycle: "Personnalité officielle",
    accentColor: "ember",
    universe: "Salon des intrigues",
    personalityProfile: {
      dominantTraits: ["Charismatique", "Intense", "Intelligente", "Élégante", "Exigeante", "Fine analyste"],
      strengths: ["Analyse les récits", "Élève le niveau d’exigence", "Détecte les tensions d’un texte"],
      energy: "Une énergie intense, élégante, très concentrée sur le sens.",
      posture: "Elle enseigne par lecture précise, interprétation et exigence littéraire.",
      interaction: "Elle stimule sans écraser et demande toujours une preuve textuelle.",
      represents: "La puissance de l’analyse littéraire.",
    },
  },
  {
    slug: "bakari",
    name: "Bakari le Gorille",
    role: "Gardien de la rigueur",
    mainSubject: "Mathématiques",
    symbol: "Bloc de preuve",
    levelLabel: "Académie",
    cycle: "Personnalité officielle",
    accentColor: "jade",
    universe: "Salle de concentration",
    personalityProfile: {
      dominantTraits: ["Impressionnant mais calme", "Réfléchi", "Stable", "Concentré", "Rigoureux"],
      strengths: ["Protège l’attention", "Soutient l’effort long", "Renforce la précision"],
      energy: "Une énergie massive mais apaisée, entièrement tournée vers la concentration.",
      posture: "Il enseigne par silence actif, rigueur et preuves successives.",
      interaction: "Il protège intellectuellement les élèves et les aide à tenir l’effort.",
      represents: "La force mentale calme et rigoureuse.",
    },
  },
  {
    slug: "nadia",
    name: "Nadia la Belette",
    role: "Stratège des cartes",
    mainSubject: "Géographie",
    symbol: "Boussole fine",
    levelLabel: "Académie",
    cycle: "Personnalité officielle",
    accentColor: "sky",
    universe: "Cartothèque mobile",
    personalityProfile: {
      dominantTraits: ["Vive d’esprit", "Curieuse", "Rapide", "Observatrice", "Stratège"],
      strengths: ["Lit vite les cartes", "Repère les civilisations", "Relie espace et stratégie"],
      energy: "Une énergie rapide, nerveuse et très lucide.",
      posture: "Elle enseigne par repérage, itinéraire et comparaison de territoires.",
      interaction: "Elle lance des pistes, puis demande de choisir la plus stratégique.",
      represents: "La géographie vive et stratégique.",
    },
  },
  {
    slug: "milo",
    name: "Milo le Raton Laveur",
    role: "Inventeur scientifique",
    mainSubject: "Sciences",
    symbol: "Éprouvette astucieuse",
    levelLabel: "Académie",
    cycle: "Personnalité officielle",
    accentColor: "sky",
    universe: "Laboratoire des idées",
    personalityProfile: {
      dominantTraits: ["Ingénieux", "Espiègle", "Curieux", "Créatif scientifiquement", "Enthousiaste", "Dynamique"],
      strengths: ["Imagine des expériences", "Teste avec entrain", "Transforme l’erreur en hypothèse"],
      energy: "Une énergie pétillante et expérimentale.",
      posture: "Il enseigne par manipulation, essai, surprise et conclusion prudente.",
      interaction: "Il rend l’expérience joyeuse tout en gardant la preuve au centre.",
      represents: "La science curieuse, inventive et enthousiaste.",
    },
  },
  {
    slug: "edgar",
    name: "Edgar le Corbeau",
    role: "Maître des émotions sonores",
    mainSubject: "Musique",
    symbol: "Note noire",
    levelLabel: "Académie",
    cycle: "Personnalité officielle",
    accentColor: "ember",
    universe: "Auditorium des ombres",
    personalityProfile: {
      dominantTraits: ["Artistique", "Mystérieux", "Sensible", "Profond", "Élégant", "Théâtral"],
      strengths: ["Fait entendre les émotions", "Relie son et récit", "Donne de la profondeur aux œuvres"],
      energy: "Une énergie sombre, sensible et théâtrale.",
      posture: "Il enseigne par écoute active, interprétation et mise en scène sonore.",
      interaction: "Il invite les élèves à nommer ce qu’ils ressentent avant d’analyser.",
      represents: "La profondeur émotionnelle des sons.",
    },
  },
  {
    slug: "alix",
    name: "Alix l’Antilope",
    role: "Guide du mouvement maîtrisé",
    mainSubject: "EPS",
    symbol: "Trace de course",
    levelLabel: "Académie",
    cycle: "Personnalité officielle",
    accentColor: "gold",
    universe: "Piste des équilibres",
    personalityProfile: {
      dominantTraits: ["Rapide", "Élégante", "Motivante", "Athlétique", "Positive", "Disciplinée"],
      strengths: ["Canalise le mouvement", "Encourage l’effort", "Installe la maîtrise corporelle"],
      energy: "Une énergie vive, précise et disciplinée.",
      posture: "Elle enseigne par geste, répétition maîtrisée et objectif clair.",
      interaction: "Elle encourage avec élégance et corrige sans décourager.",
      represents: "Le corps comme intelligence en mouvement.",
    },
  },
  {
    slug: "keita",
    name: "Kéïta le Lion",
    role: "Stratège des grands problèmes",
    mainSubject: "Mathématiques",
    symbol: "Couronne logique",
    levelLabel: "Académie",
    cycle: "Personnalité officielle",
    accentColor: "gold",
    universe: "Salle des stratégies",
    personalityProfile: {
      dominantTraits: ["Majestueux", "Charismatique", "Stratège", "Logique", "Noble", "Maîtrisé"],
      strengths: ["Clarifie les problèmes complexes", "Impose la méthode", "Rend la logique ambitieuse"],
      energy: "Une énergie noble et maîtrisée, très puissante intellectuellement.",
      posture: "Il enseigne par stratégie, plan d’attaque et démonstration.",
      interaction: "Il exige de la hauteur de vue et valorise les démarches maîtrisées.",
      represents: "La stratégie logique et l’ambition intellectuelle.",
    },
  },
  {
    slug: "victor",
    name: "Victor l’Éléphant",
    role: "Gardien de la mémoire",
    mainSubject: "Histoire",
    symbol: "Mémoire monumentale",
    levelLabel: "Académie",
    cycle: "Personnalité officielle",
    accentColor: "jade",
    universe: "Grande mémoire",
    personalityProfile: {
      dominantTraits: ["Sage", "Érudit", "Stable", "Cultivé", "Réfléchi"],
      strengths: ["Conserve les repères", "Relie les savoirs", "Donne du recul historique"],
      energy: "Une énergie monumentale, stable et mémorielle.",
      posture: "Il enseigne par repères, rappels et mise en perspective.",
      interaction: "Il aide les élèves à replacer chaque idée dans une mémoire plus vaste.",
      represents: "La mémoire cultivée et réfléchie.",
    },
  },
  {
    slug: "soren",
    name: "Soren le Caméléon",
    role: "Analyste scientifique",
    mainSubject: "Sciences",
    symbol: "Prisme d’observation",
    levelLabel: "Académie",
    cycle: "Personnalité officielle",
    accentColor: "sky",
    universe: "Laboratoire discret",
    personalityProfile: {
      dominantTraits: ["Analytique", "Sophistiqué", "Observateur", "Adaptable", "Curieux", "Calme"],
      strengths: ["Analyse finement", "S’adapte aux données", "Observe avant d’interpréter"],
      energy: "Une énergie calme, élégante et scientifique.",
      posture: "Il enseigne par observation lente, modèle et adaptation.",
      interaction: "Il pousse les élèves à ajuster leur hypothèse quand les données changent.",
      represents: "La science analytique et adaptable.",
    },
  },
  {
    slug: "leonard",
    name: "Léonard le Homard",
    role: "Ingénieur des innovations",
    mainSubject: "Technologie",
    symbol: "Mécanisme rouge",
    levelLabel: "Académie",
    cycle: "Personnalité officielle",
    accentColor: "ember",
    universe: "Forge des prototypes",
    personalityProfile: {
      dominantTraits: ["Brillant", "Maîtrisé", "Sophistiqué", "Ingénieux", "Innovant", "Méthodique"],
      strengths: ["Invente des solutions", "Structure les prototypes", "Allie méthode et innovation"],
      energy: "Une énergie brillante et contrôlée, orientée vers l’invention.",
      posture: "Il enseigne par prototype, innovation et amélioration méthodique.",
      interaction: "Il demande des idées ambitieuses, mais toujours testables.",
      represents: "L’ingénierie créative et maîtrisée.",
    },
  },
  {
    slug: "octave",
    name: "Octave le Hibou Grand-Duc",
    role: "Maître du langage",
    mainSubject: "Français",
    symbol: "Livre haut",
    levelLabel: "Académie",
    cycle: "Personnalité officielle",
    accentColor: "gold",
    universe: "Salon des œuvres",
    personalityProfile: {
      dominantTraits: ["Cultivé", "Charismatique", "Sage", "Passionné par les œuvres", "Élégant", "Profond"],
      strengths: ["Éclaire les textes", "Donne de la hauteur au langage", "Relie œuvres et pensée"],
      energy: "Une énergie savante, profonde et magistrale.",
      posture: "Il enseigne par lecture d’œuvre, précision du mot et interprétation construite.",
      interaction: "Il élève la discussion et invite chacun à mieux formuler.",
      represents: "Le langage comme instrument de pensée.",
    },
  },
  {
    slug: "astrid",
    name: "Astrid la Chatte Noire",
    role: "Exploratrice des intuitions",
    mainSubject: "Philosophie",
    symbol: "Clé noire",
    levelLabel: "Académie",
    cycle: "Personnalité officielle",
    accentColor: "ember",
    universe: "Cabinet des questions",
    personalityProfile: {
      dominantTraits: ["Mystérieuse", "Intelligente", "Élégante", "Profonde", "Intuitive", "Calme"],
      strengths: ["Repère les tensions cachées", "Fait naître les questions", "Accompagne les idées complexes"],
      energy: "Une énergie silencieuse, fascinante et intellectuellement profonde.",
      posture: "Elle enseigne par intuition, questionnement et clarification progressive.",
      interaction: "Elle laisse une question résonner avant de demander une réponse.",
      represents: "L’intuition philosophique et l’élégance de la pensée.",
    },
  },
  {
    slug: "viktor",
    name: "Viktor le Glouton",
    role: "Stimulateur des stratégies",
    mainSubject: "Méthodologie",
    symbol: "Défi scellé",
    levelLabel: "Académie",
    cycle: "Personnalité officielle",
    accentColor: "ember",
    universe: "Salle des défis instables",
    personalityProfile: {
      dominantTraits: ["Charismatique", "Imprévisible", "Intelligent", "Stratège", "Exigeant", "Mystérieux"],
      strengths: ["Déjoue les automatismes", "Stimule la vigilance", "Exige une stratégie claire"],
      energy: "Une énergie imprévisible mais jamais malveillante, faite pour réveiller l’attention.",
      posture: "Il enseigne par défi, surprise contrôlée et stratégie de réponse.",
      interaction: "Il stimule les élèves en changeant légèrement les règles pour tester leur méthode.",
      represents: "L’exigence stimulante et la stratégie sous contrainte.",
    },
  },
  {
    slug: "boris",
    name: "Boris le Bison",
    role: "Protecteur des collectifs",
    mainSubject: "Vie de classe",
    symbol: "Bouclier commun",
    levelLabel: "Académie",
    cycle: "Personnalité officielle",
    accentColor: "jade",
    universe: "Hall des alliances",
    personalityProfile: {
      dominantTraits: ["Protecteur", "Loyal", "Stable", "Courageux", "Puissant mais calme", "Bienveillant", "Solidaire"],
      strengths: ["Renforce le collectif", "Protège l’effort", "Rend les groupes plus solidaires"],
      energy: "Une énergie stable, courageuse et profondément bienveillante.",
      posture: "Il enseigne par coopération, engagement et responsabilité partagée.",
      interaction: "Il veille à ce que personne ne reste isolé dans l’apprentissage.",
      represents: "La solidarité exigeante et protectrice.",
    },
  },
];

function toOfficialProfile(profile: (typeof officialPersonalities)[number]): ProfessorProfile {
  return {
    slug: profile.slug,
    profileHref: `/professeurs/${profile.slug}`,
    name: profile.name,
    characterType: "personnalité officielle",
    role: profile.role,
    initial: profile.name.charAt(0),
    mainSubject: profile.mainSubject,
    symbol: profile.symbol,
    description: `${profile.name} incarne ${profile.personalityProfile.represents.toLowerCase()}`,
    specialty: profile.personalityProfile.posture,
    visualMood: profile.universe,
    levelLabel: profile.levelLabel,
    cycle: profile.cycle,
    stage: "officiel",
    moodName: profile.universe,
    moodDescription: profile.personalityProfile.energy,
    levelDescription: profile.personalityProfile.represents,
    levelPath: "/univers",
    missionsPath: "/ressources",
    missionsLinkBasePath: null,
    bio: `${profile.name} est une personnalité officielle de l’Académie Kerboeuf. ${profile.personalityProfile.energy} ${profile.personalityProfile.represents}`,
    headquarters: profile.universe,
    method: [
      { label: "Posture", text: profile.personalityProfile.posture },
      { label: "Interaction", text: profile.personalityProfile.interaction },
      { label: "Représente", text: profile.personalityProfile.represents },
    ],
    subjects: [profile.mainSubject],
    missions: [],
    personality: profile.personalityProfile.dominantTraits.join(", "),
    personalityProfile: profile.personalityProfile,
    accentColor: profile.accentColor,
    universeNarrative: `${profile.universe} est associé à ${profile.name} : ${profile.personalityProfile.represents}`,
    pedagogicalRole: profile.personalityProfile.posture,
    academyFunction: profile.personalityProfile.represents,
    studentExperience: profile.personalityProfile.interaction,
    missionPhilosophy: profile.personalityProfile.posture,
    teachesThrough: profile.personalityProfile.strengths,
    famousFor: profile.personalityProfile.dominantTraits,
    coreValues: profile.personalityProfile.dominantTraits.slice(0, 4),
  };
}

export const professorProfiles: ProfessorProfile[] = [
  ...rawProfessorProfiles,
  ...officialPersonalities.map(toOfficialProfile),
].filter(
  (profile, index, profiles) =>
    profiles.findIndex((candidate) => candidate.slug === profile.slug) === index,
);

export function getProfessorBySlug(slug: string): ProfessorProfile | undefined {
  return professorProfiles.find((p) => p.slug === slug);
}

export function getAllProfessorSlugs(): { slug: string }[] {
  return professorProfiles.map((p) => ({ slug: p.slug }));
}

export function getRelatedProfessors(
  currentSlug: string,
  relatedSlugs?: string[],
  limit = 3,
): ProfessorProfile[] {
  if (relatedSlugs && relatedSlugs.length > 0) {
    return relatedSlugs.slice(0, limit).flatMap((s) => {
      const p = professorProfiles.find((x) => x.slug === s);
      return p ? [p] : [];
    });
  }

  const current = professorProfiles.find((p) => p.slug === currentSlug);
  if (!current) return [];

  const sameCycle = professorProfiles.filter(
    (p) => p.slug !== currentSlug && p.cycle === current.cycle,
  );
  if (sameCycle.length > 0) return sameCycle.slice(0, limit);

  const sameStage = professorProfiles.filter(
    (p) => p.slug !== currentSlug && p.stage === current.stage,
  );
  if (sameStage.length > 0) return sameStage.slice(0, limit);

  return professorProfiles.filter((p) => p.slug !== currentSlug).slice(0, limit);
}
