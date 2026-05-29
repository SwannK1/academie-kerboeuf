// Niveau pilote CM1 — Cycle 3.
// Personnage Noisette (écureuil humanisé) en accompagnement uniquement.

import type {
  AcademyLevelProgram,
  Exercise,
  Lesson,
  ProgramDomain,
  ProgramSubdomain,
} from "@/content/program-types";

// ════════════════════════════════════════════════════════════════════════════
// FRANÇAIS — LECTURE ET COMPRÉHENSION
// ════════════════════════════════════════════════════════════════════════════

// ── Leçon 1 : Comprendre les intentions d'un personnage ──────────────────────

const lc01Ex01: Exercise = {
  id: "cm1-fr-lc-intentions-ex-01",
  slug: "paroles-et-actions-decouverte",
  lessonId: "cm1-fr-lc-intentions",
  instruction:
    "Lis ce passage : « — Je peux t'aider à porter tes bagages, proposa Marcus avec un grand sourire. — Oh, avec plaisir ! dit la vieille dame. Marcus saisit la valise et marcha vers la sortie, mais il s'arrêta devant la boutique de bonbons et attendit. »\nRelève dans le texte : une chose que Marcus dit, une chose que Marcus fait.",
  difficulty: "decouverte",
  activityType: "free-text",
  validation:
    "Ce que Marcus dit : « Je peux t'aider à porter tes bagages. » Ce que Marcus fait : il s'arrête devant la boutique de bonbons et attend. Ces deux éléments sont des indices sur ce qu'il veut obtenir.",
  status: "available",
};

const lc01Ex02: Exercise = {
  id: "cm1-fr-lc-intentions-ex-02",
  slug: "choisir-lintention-entrainement",
  lessonId: "cm1-fr-lc-intentions",
  instruction:
    "Lis ce passage : « Léonie range soigneusement sa chambre, plie son linge et pose même ses chaussures en ligne droite. Puis elle s'installe au salon en regardant souvent vers la porte d'entrée. »\nQuelle est l'intention la plus probable de Léonie ?\nA. Elle prépare un déménagement.\nB. Elle attend quelqu'un d'important et veut que tout soit parfait.\nC. Elle s'entraîne à être plus ordonnée.\nChoisis la bonne réponse et explique quel indice t'a guidé.",
  difficulty: "entrainement",
  activityType: "qcm",
  validation:
    "Bonne réponse : B. Léonie attend quelqu'un d'important. Indices : elle range avec soin ET regarde souvent vers la porte — ce comportement montre qu'elle attend une visite et veut faire bonne impression.",
  status: "available",
};

const lc01Ex03: Exercise = {
  id: "cm1-fr-lc-intentions-ex-03",
  slug: "expliquer-lintention-approfondissement",
  lessonId: "cm1-fr-lc-intentions",
  instruction:
    "Lis ce passage : « Pendant la récréation, Théa s'approche discrètement du bureau de la maîtresse, jette un coup d'œil vers la cour, puis efface rapidement quelque chose sur le tableau. Elle repart en sifflotant comme si de rien n'était. »\nRéponds à cette question : Que veut faire Théa ? Cite au moins un indice précis du texte pour justifier ta réponse.",
  difficulty: "approfondissement",
  activityType: "free-text",
  validation:
    "Théa veut modifier quelque chose sur le tableau sans se faire remarquer — probablement effacer une note ou une information qui la dérange. Indices attendus : « discrètement », « jette un coup d'œil vers la cour » (elle surveille), « comme si de rien n'était » (elle veut cacher son geste). L'élève doit citer au moins un de ces indices.",
  status: "available",
};

const leconIntentions: Lesson = {
  id: "cm1-fr-lc-intentions",
  slug: "comprendre-les-intentions-dun-personnage",
  title: "Comprendre les intentions d'un personnage",
  objective:
    "Je lis un texte narratif et je comprends ce qu'un personnage veut faire, même quand ce n'est pas écrit directement.",
  skill:
    "Interpréter les intentions d'un personnage à partir de ses paroles, de ses actions et des indices du texte.",
  parentGuidance: {
    summary:
      "Votre enfant apprend à lire entre les lignes d'un récit : comprendre ce qu'un personnage cherche à obtenir ou à éviter, en observant ce qu'il dit et ce qu'il fait.",
    quickTips: [
      "Lors d'une lecture commune, posez la question : « Pourquoi le personnage fait-il ça ? » avant de donner la réponse.",
      "Rapprochez l'exercice du quotidien : « D'après toi, pourquoi est-ce que untel a dit ça ? »",
      "Encouragez votre enfant à toujours citer un mot ou une phrase du texte : c'est la preuve de sa déduction.",
    ],
    successSigns: [
      "Votre enfant distingue ce que le personnage fait de ce qu'il veut obtenir.",
      "Il justifie sa réponse en citant un passage précis du texte.",
      "Il formule une intention avec « il veut… » ou « il cherche à… » sans paraphraser le texte mot pour mot.",
    ],
    recommendedExerciseIds: ["cm1-fr-lc-intentions-ex-01", "cm1-fr-lc-intentions-ex-02"],
  },
  successCriteria: [
    "Je repère ce que fait le personnage.",
    "Je repère ce que dit le personnage.",
    "Je comprends ce qu'il veut obtenir ou éviter.",
    "Je justifie mon interprétation avec au moins un indice du texte.",
  ],
  exercises: [lc01Ex01, lc01Ex02, lc01Ex03],
  characterLink: {
    characterSlug: "noisette",
    name: "Noisette",
    roleHint:
      "Noisette l'écureuil observe toujours avec méthode avant de conclure. Elle aide l'élève à relever les paroles, les gestes et les petits détails du texte pour comprendre ce que les personnages ont vraiment en tête.",
  },
  status: "available",
};

// ── Leçon 2 : Inférer un sens implicite ──────────────────────────────────────

const lc02Ex01: Exercise = {
  id: "cm1-fr-lc-inference-ex-01",
  slug: "reperer-le-non-dit-decouverte",
  lessonId: "cm1-fr-lc-inference",
  instruction:
    "Lis cette phrase : « En arrivant dans la salle, Jules vit les guirlandes, les ballons et le grand gâteau posé sur la table. Il sourit. »\nQu'a compris Jules en entrant dans la salle ? Le texte le dit-il directement ?",
  difficulty: "decouverte",
  activityType: "free-text",
  validation:
    "Jules a compris qu'une fête lui était organisée. Le texte ne l'écrit pas directement : c'est le lecteur qui le déduit en reliant les indices (guirlandes, ballons, gâteau). C'est une inférence.",
  status: "available",
};

const lc02Ex02: Exercise = {
  id: "cm1-fr-lc-inference-ex-02",
  slug: "choisir-linference-correcte-entrainement",
  lessonId: "cm1-fr-lc-inference",
  instruction:
    "Lis ce passage : « Lola ferme son livre, pose sa lampe de chevet et tire ses couvertures jusqu'au menton. Dehors, la pluie tambourine sur les vitres. »\nQuelle inférence est la plus juste ?\nA. Lola a froid et elle va chercher un pull.\nB. Lola se prépare à dormir.\nC. Lola n'aime pas lire quand il pleut.\nChoisis et justifie avec un indice du texte.",
  difficulty: "entrainement",
  activityType: "qcm",
  validation:
    "Bonne réponse : B. Les indices sont clairs : elle ferme son livre (elle arrête de lire), éteint sa lampe (elle n'a plus besoin de lumière) et tire ses couvertures (elle se couvre pour la nuit). Ces trois gestes ensemble permettent de déduire qu'elle va dormir.",
  status: "available",
};

const lc02Ex03: Exercise = {
  id: "cm1-fr-lc-inference-ex-03",
  slug: "formuler-et-justifier-une-inference-approfondissement",
  lessonId: "cm1-fr-lc-inference",
  instruction:
    "Lis ce passage : « M. Renard entra dans la salle des maîtres en posant deux grandes boîtes de chocolats sur la table. Ses collègues le regardèrent avec un sourire. — Alors, dit Mme Alves, c'est vraiment vrai ? »\nFormule une inférence : que vient-il d'annoncer, d'après toi ? Cite deux indices du texte pour justifier ta réponse.",
  difficulty: "approfondissement",
  activityType: "free-text",
  validation:
    "M. Renard vient probablement d'annoncer une bonne nouvelle personnelle : une naissance, un mariage, sa retraite prochaine ou une promotion. Les indices : il apporte des chocolats (geste de célébration), ses collègues sourient (réaction positive) et la question de Mme Alves (« c'est vraiment vrai ? ») confirme qu'une annonce a déjà été faite. L'inférence doit s'appuyer sur au moins deux de ces indices.",
  status: "available",
};

const leconInference: Lesson = {
  id: "cm1-fr-lc-inference",
  slug: "inferer-un-sens-implicite",
  title: "Inférer un sens implicite",
  objective:
    "Je comprends une information que le texte ne dit pas directement, en reliant les indices entre eux.",
  skill:
    "Formuler et justifier une inférence à partir d'indices repérés dans un texte narratif.",
  parentGuidance: {
    summary:
      "Votre enfant apprend à lire « entre les lignes » : comprendre ce qu'un texte sous-entend sans le dire, en s'appuyant sur plusieurs indices combinés.",
    quickTips: [
      "À l'oral, demandez : « Comment tu sais ça ? Le texte le dit vraiment ? » pour encourager la justification.",
      "En lisant ensemble, pointez les indices visuels ou contextuels avant de donner la réponse.",
      "Encouragez votre enfant à formuler ses déductions avec « je pense que… parce que… ».",
    ],
    successSigns: [
      "Votre enfant distingue ce qui est écrit de ce qui est déduit.",
      "Il cite un ou plusieurs mots du texte pour appuyer son interprétation.",
      "Il reformule l'information implicite avec ses propres mots.",
    ],
    recommendedExerciseIds: ["cm1-fr-lc-inference-ex-01", "cm1-fr-lc-inference-ex-02"],
  },
  successCriteria: [
    "Je repère ce que le texte ne dit pas directement.",
    "Je trouve au moins un indice dans le texte qui m'aide à comprendre.",
    "Je formule ce que j'ai compris en une phrase.",
    "Je justifie mon inférence en citant un indice précis.",
  ],
  exercises: [lc02Ex01, lc02Ex02, lc02Ex03],
  characterLink: {
    characterSlug: "noisette",
    name: "Noisette",
    roleHint:
      "Noisette ne se précipite jamais : elle rassemble les indices un à un avant de tirer une conclusion. Elle rappelle à l'élève de distinguer ce qui est écrit de ce qu'on déduit.",
  },
  status: "available",
};

// ── Leçon 3 : Lire et comprendre un texte documentaire ───────────────────────

const lc03Ex01: Exercise = {
  id: "cm1-fr-lc-texte-doc-ex-01",
  slug: "identifier-le-theme-decouverte",
  lessonId: "cm1-fr-lc-texte-documentaire",
  instruction:
    "Lis ce court texte documentaire :\n« Les dauphins sont des mammifères marins. Ils vivent en groupes appelés pods et communiquent par sifflements et cliquetis. Ils respirent à la surface grâce à un évent situé sur le dessus de leur tête. »\nRéponds : Quel est le sujet de ce texte ? Comment le sais-tu ?",
  difficulty: "decouverte",
  activityType: "free-text",
  validation:
    "Le sujet est les dauphins. Indices : le mot « dauphins » est le premier mot, et toutes les phrases qui suivent donnent des informations sur eux. Dans un texte documentaire, le sujet est souvent annoncé dès la première phrase.",
  status: "available",
};

const lc03Ex02: Exercise = {
  id: "cm1-fr-lc-texte-doc-ex-02",
  slug: "retrouver-les-informations-principales-entrainement",
  lessonId: "cm1-fr-lc-texte-documentaire",
  instruction:
    "Lis ce texte :\n« L'abeille ouvrière récolte le nectar des fleurs. Elle le transporte dans son jabot jusqu'à la ruche. Là, d'autres abeilles le transforment en miel en l'éventant pour faire évaporer l'eau. Le miel est ensuite stocké dans les alvéoles et operculé avec de la cire. »\nComplète ces deux phrases sans recopier le texte :\n1. L'abeille ouvrière commence par…\n2. Dans la ruche, le nectar devient du miel grâce à…",
  difficulty: "entrainement",
  activityType: "fill-blank",
  validation:
    "1. L'abeille ouvrière commence par récolter le nectar des fleurs (et le transporter jusqu'à la ruche). 2. Dans la ruche, le nectar devient du miel grâce à l'action d'autres abeilles qui l'éventent pour faire évaporer l'eau. L'élève doit reformuler, pas recopier mot pour mot.",
  status: "available",
};

const lc03Ex03: Exercise = {
  id: "cm1-fr-lc-texte-doc-ex-03",
  slug: "organiser-linformation-approfondissement",
  lessonId: "cm1-fr-lc-texte-documentaire",
  instruction:
    "Lis ce texte :\n« La migration des oiseaux est un voyage saisonnier. En automne, des milliers d'oiseaux quittent l'Europe pour rejoindre l'Afrique, où la nourriture est plus abondante. Ils s'orientent grâce au soleil, aux étoiles et au champ magnétique terrestre. Au printemps, ils reviennent pour se reproduire. »\nRéalise un résumé en 2 à 3 phrases qui répond à : Qu'est-ce que la migration ? Pourquoi les oiseaux migrent-ils ? Comment s'orientent-ils ?",
  difficulty: "approfondissement",
  activityType: "free-text",
  validation:
    "Résumé attendu (exemple) : La migration est un voyage que font les oiseaux deux fois par an. Ils quittent l'Europe en automne pour trouver de la nourriture en Afrique, puis reviennent au printemps pour se reproduire. Pour s'orienter, ils utilisent le soleil, les étoiles et le champ magnétique. L'élève doit répondre aux trois questions sans recopier et sans détail superflu.",
  status: "available",
};

const leconTexteDocumentaire: Lesson = {
  id: "cm1-fr-lc-texte-documentaire",
  slug: "lire-et-comprendre-un-texte-documentaire",
  title: "Lire et comprendre un texte documentaire",
  objective:
    "Je lis un texte documentaire, j'en identifie le sujet et je retrouve les informations principales sans recopier.",
  skill:
    "Repérer la structure d'un texte informatif et en extraire les informations essentielles.",
  parentGuidance: {
    summary:
      "Votre enfant apprend à lire des textes qui informent (encyclopédies, fiches documentaires, articles). Il s'entraîne à trouver l'essentiel sans tout retenir mot pour mot.",
    quickTips: [
      "En lisant un texte documentaire ensemble, demandez : « Quel est le sujet ? » puis « Quelle est l'information la plus importante ? »",
      "Encouragez votre enfant à reformuler avec ses propres mots plutôt que recopier.",
      "Montrez-lui comment les titres et les débuts de paragraphe annoncent souvent l'idée principale.",
    ],
    successSigns: [
      "Votre enfant repère rapidement le sujet d'un texte documentaire.",
      "Il peut dire en une phrase ce qu'il a appris, sans relire le texte.",
      "Il distingue l'information importante du détail anecdotique.",
    ],
    recommendedExerciseIds: ["cm1-fr-lc-texte-doc-ex-01", "cm1-fr-lc-texte-doc-ex-02"],
  },
  successCriteria: [
    "Je repère le sujet du texte dès la première lecture.",
    "J'identifie les informations principales (pas les détails).",
    "Je reformule ce que j'ai compris sans recopier le texte.",
    "J'utilise l'organisation du texte (titres, paragraphes) pour m'aider.",
  ],
  exercises: [lc03Ex01, lc03Ex02, lc03Ex03],
  characterLink: {
    characterSlug: "noisette",
    name: "Noisette",
    roleHint:
      "Noisette adore les cartes et les documents. Elle rappelle à l'élève de lire les titres en premier, de repérer le sujet avant de plonger dans les détails, et de reformuler avec ses propres mots.",
  },
  status: "available",
};

// ════════════════════════════════════════════════════════════════════════════
// MATHÉMATIQUES — CALCUL POSÉ
// ════════════════════════════════════════════════════════════════════════════

// ── Leçon 4 : Poser et calculer une multiplication ───────────────────────────

const ma01Ex01: Exercise = {
  id: "cm1-ma-cal-multiplication-ex-01",
  slug: "multiplication-simple-decouverte",
  lessonId: "cm1-ma-cal-multiplication",
  instruction:
    "Pose et calcule cette multiplication en colonnes :\n47 × 6\nÉcris chaque étape : d'abord 6 × 7, puis 6 × 4 en ajoutant la retenue.",
  difficulty: "decouverte",
  activityType: "free-text",
  validation:
    "6 × 7 = 42 → on écrit 2 et on retient 4.\n6 × 4 = 24 + 4 (retenue) = 28.\nRésultat : 282.\nVérification rapide : 47 × 6 ≈ 50 × 6 = 300 → 282 est vraisemblable.",
  status: "available",
};

const ma01Ex02: Exercise = {
  id: "cm1-ma-cal-multiplication-ex-02",
  slug: "multiplication-deux-chiffres-entrainement",
  lessonId: "cm1-ma-cal-multiplication",
  instruction:
    "Pose et calcule :\n136 × 4\nPuis vérifie ton résultat avec une estimation (arrondi à la dizaine).",
  difficulty: "entrainement",
  activityType: "free-text",
  validation:
    "4 × 6 = 24 → écrit 4, retenue 2.\n4 × 3 = 12 + 2 = 14 → écrit 4, retenue 1.\n4 × 1 = 4 + 1 = 5.\nRésultat : 544.\nEstimation : 140 × 4 = 560. L'écart est faible → résultat vraisemblable.",
  status: "available",
};

const ma01Ex03: Exercise = {
  id: "cm1-ma-cal-multiplication-ex-03",
  slug: "probleme-multiplication-approfondissement",
  lessonId: "cm1-ma-cal-multiplication",
  instruction:
    "Un libraire commande 8 caisses de livres. Chaque caisse contient 124 livres.\nCombien de livres reçoit-il au total ? Pose la multiplication, montre chaque étape et vérifie avec une estimation.",
  difficulty: "approfondissement",
  activityType: "free-text",
  validation:
    "Calcul : 124 × 8.\n8 × 4 = 32 → écrit 2, retenue 3.\n8 × 2 = 16 + 3 = 19 → écrit 9, retenue 1.\n8 × 1 = 8 + 1 = 9.\nRésultat : 992 livres.\nEstimation : 120 × 8 = 960 ou 130 × 8 = 1040 → 992 est entre les deux, vraisemblable.",
  status: "available",
};

const leconMultiplication: Lesson = {
  id: "cm1-ma-cal-multiplication",
  slug: "poser-et-calculer-une-multiplication",
  title: "Poser et calculer une multiplication",
  objective:
    "Je calcule le produit de deux entiers en posant la multiplication en colonnes, étape par étape.",
  skill:
    "Appliquer l'algorithme de la multiplication posée en gérant les retenues et vérifier par estimation.",
  parentGuidance: {
    summary:
      "Votre enfant apprend à poser une multiplication en colonnes : multiplier chiffre par chiffre en partant des unités, gérer les retenues et vérifier que le résultat est raisonnable.",
    quickTips: [
      "Faites réciter les tables (surtout ×6, ×7, ×8, ×9) : elles sont la base de tout calcul posé.",
      "Insistez sur la vérification par estimation : « Est-ce que ce résultat est à peu près raisonnable ? »",
      "En cas d'erreur, demandez de refaire étape par étape plutôt que de corriger directement.",
    ],
    successSigns: [
      "Votre enfant pose les chiffres en colonnes sans erreur d'alignement.",
      "Il gère les retenues de façon visible (les écrits au-dessus).",
      "Il vérifie son résultat avec un arrondi avant de conclure.",
    ],
    recommendedExerciseIds: ["cm1-ma-cal-multiplication-ex-01", "cm1-ma-cal-multiplication-ex-02"],
  },
  successCriteria: [
    "Je pose les chiffres en colonnes (unités sous unités, dizaines sous dizaines).",
    "Je multiplie chiffre par chiffre en commençant par les unités.",
    "Je note et j'utilise correctement les retenues.",
    "Je vérifie mon résultat avec une estimation arrondie.",
  ],
  exercises: [ma01Ex01, ma01Ex02, ma01Ex03],
  characterLink: {
    characterSlug: "noisette",
    name: "Noisette",
    roleHint:
      "Noisette procède par ordre, sans sauter d'étape. Elle conseille à l'élève d'écrire chaque retenue au-dessus du chiffre concerné et de toujours terminer par une vérification rapide.",
  },
  status: "available",
};

// ════════════════════════════════════════════════════════════════════════════
// STRUCTURE DU NIVEAU
// ════════════════════════════════════════════════════════════════════════════

const subdomaineLectureComprehension: ProgramSubdomain = {
  id: "cm1-fr-lecture-comprehension",
  slug: "lecture-comprehension",
  title: "Lecture et compréhension",
  description:
    "Lire des textes narratifs et documentaires pour en comprendre les informations explicites, les sous-entendus et les intentions des personnages.",
  lessons: [leconIntentions, leconInference, leconTexteDocumentaire],
  status: "available",
};

const domaineFrancais: ProgramDomain = {
  id: "cm1-francais",
  slug: "francais",
  title: "Français",
  officialLabel: "Français",
  subdomains: [subdomaineLectureComprehension],
  status: "available",
};

const subdomaineCalculPose: ProgramSubdomain = {
  id: "cm1-ma-calcul-pose",
  slug: "calcul-pose",
  title: "Calcul posé",
  description:
    "Poser et calculer des opérations (multiplication, division) avec l'algorithme en colonnes.",
  lessons: [leconMultiplication],
  status: "in-progress",
};

const domaineMathematiques: ProgramDomain = {
  id: "cm1-mathematiques",
  slug: "mathematiques",
  title: "Mathématiques",
  officialLabel: "Mathématiques",
  subdomains: [subdomaineCalculPose],
  status: "in-progress",
};

// ── Niveau CM1 ───────────────────────────────────────────────────────────────

export const cm1Level: AcademyLevelProgram = {
  levelSlug: "cm1",
  label: "CM1",
  cycle: "cycle-3",
  stage: "primaire",
  characterLink: {
    characterSlug: "noisette",
    name: "Noisette",
    roleHint:
      "Noisette l'écureuil guide les élèves de CM1 avec curiosité et méthode pour comprendre les textes en profondeur.",
  },
  domains: [domaineFrancais, domaineMathematiques],
};

// ── Accesseurs utilitaires ───────────────────────────────────────────────────

export function getCm1Lesson(lessonSlug: string): Lesson | undefined {
  for (const domain of cm1Level.domains) {
    for (const subdomain of domain.subdomains) {
      const found = subdomain.lessons.find((l) => l.slug === lessonSlug);
      if (found) return found;
    }
  }
  return undefined;
}

export function getCm1Exercises(lessonSlug: string): Exercise[] {
  return getCm1Lesson(lessonSlug)?.exercises ?? [];
}
