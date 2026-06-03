// Arbre pedagogique CE1 - Cycle 2, primaire.
// Structure : niveau -> domaines -> sous-domaines -> sequences-competences.
// Une sequence = une competence. Feuilles 1/3, 2/3, 3/3 prevues en PDF (planned).

import type {
  AcademyLevelProgram,
  Exercise,
  ExerciseActivityType,
  ExerciseDifficulty,
  Lesson,
  LearningCompetency,
  LessonSession,
  ParentGuidance,
  PedagogicalResourceRef,
  ProgramDomain,
  ProgramStatus,
  ProgramSubdomain,
} from "@/content/program-types";

// ── Ressources standard par sequence ─────────────────────────────────────────

function createStandardResources(): PedagogicalResourceRef[] {
  return [
    {
      kind: "lesson-pdf",
      label: "Feuille 1/3 — Situation et leçon",
      status: "planned",
      audience: "student",
    },
    {
      kind: "exercises-pdf",
      label: "Feuille 2/3 — Application et consolidation",
      status: "planned",
      audience: "student",
    },
    {
      kind: "assessment-pdf",
      label: "Feuille 3/3 — Évaluation",
      status: "planned",
      audience: "student",
    },
  ];
}

// ── Seances standard par sequence ─────────────────────────────────────────────

function createStandardSessions(id: string, title: string): LessonSession[] {
  return [
    {
      id: `${id}-s1`,
      title: `Découvrir — ${title}`,
      phase: "découvrir",
      objective: "Observer la situation de départ, formuler des hypothèses et construire la règle ou la notion.",
      status: "upcoming",
    },
    {
      id: `${id}-s2`,
      title: "S'entraîner — automatismes",
      phase: "s'entraîner",
      objective: "Appliquer la notion par des exercices courts et répétés pour la fixer en mémoire.",
      status: "upcoming",
    },
    {
      id: `${id}-s3`,
      title: "Réinvestir — application",
      phase: "réinvestir",
      objective: "Utiliser la compétence dans une situation légèrement différente.",
      status: "upcoming",
    },
    {
      id: `${id}-s4`,
      title: "Consolider — raisonnement guidé",
      phase: "consolider",
      objective: "Approfondir par un exercice de raisonnement ou un mini-problème guidé.",
      status: "upcoming",
    },
    {
      id: `${id}-s5`,
      title: "Évaluer",
      phase: "évaluer",
      objective: "Vérifier l'acquisition de la compétence par une courte évaluation individuelle.",
      status: "upcoming",
    },
  ];
}

// ── Types de definition enrichie ──────────────────────────────────────────────

type ExerciseDef = {
  instruction: string;
  difficulty: ExerciseDifficulty;
  activityType: ExerciseActivityType;
  validation: string;
};

type CompetencyDefinition = {
  slug: string;
  title: string;
  objective: string;
  status: ProgramStatus;
  successCriteria?: string[];
  parentGuidanceSummary?: string;
  parentQuickTips?: string[];
  parentSuccessSigns?: string[];
  exercises?: ExerciseDef[];
};

// ── Fabrique de sequence ──────────────────────────────────────────────────────

function createCompetencySequence(
  domainSlug: string,
  subdomainSlug: string,
  def: CompetencyDefinition,
): { lesson: Lesson; competency: LearningCompetency } {
  const id = `ce1-${domainSlug}-${subdomainSlug}-${def.slug}`;

  const parentGuidance: ParentGuidance = {
    summary: def.parentGuidanceSummary ?? "",
    quickTips: def.parentQuickTips ?? [],
    successSigns: def.parentSuccessSigns ?? [],
  };

  const exercises: Exercise[] = (def.exercises ?? []).map((ex, i) => ({
    id: `${id}-ex${i + 1}`,
    slug: `${def.slug}-ex${i + 1}`,
    lessonId: id,
    instruction: ex.instruction,
    difficulty: ex.difficulty,
    activityType: ex.activityType,
    validation: ex.validation,
    status: def.status,
  }));

  return {
    lesson: {
      id,
      slug: def.slug,
      title: def.title,
      objective: def.objective,
      skill: def.title,
      parentGuidance,
      successCriteria: def.successCriteria ?? [],
      exercises,
      resources: createStandardResources(),
      sessions: createStandardSessions(id, def.title),
      competencyIds: [id],
      status: def.status,
    },
    competency: {
      id,
      slug: def.slug,
      title: def.title,
      levelSlug: "ce1",
      cycle: "cycle-2",
      stage: "primaire",
      domainSlug,
      subdomainSlug,
      objective: def.objective,
      status: def.status,
      lessonIds: [id],
      successCriteria: def.successCriteria ?? [],
    },
  };
}

function createSubdomain(
  domainSlug: string,
  slug: string,
  title: string,
  description: string,
  definitions: CompetencyDefinition[],
): ProgramSubdomain {
  const sequences = definitions.map((definition) =>
    createCompetencySequence(domainSlug, slug, definition),
  );
  const hasInProgress = definitions.some((d) => d.status === "in-progress");

  return {
    id: `ce1-${domainSlug}-${slug}`,
    slug,
    title,
    description,
    lessons: sequences.map((s) => s.lesson),
    competencies: sequences.map((s) => s.competency),
    status: hasInProgress ? "in-progress" : "upcoming",
  };
}

// ══════════════════════════════════════════════════════════════════════════════
// FRANÇAIS
// ══════════════════════════════════════════════════════════════════════════════

const domainFrancais: ProgramDomain = {
  id: "ce1-francais",
  slug: "francais",
  title: "Francais",
  officialLabel: "Francais - Cycle 2",
  description:
    "Lecture fluide, comprehension, productions ecrites, grammaire et orthographe frequente.",
  subdomains: [
    createSubdomain(
      "francais",
      "lecture-fluide",
      "Lecture fluide",
      "Consolider le decodage et automatiser la lecture.",
      [
        {
          slug: "lire-des-mots-frequents-rapidement",
          title: "Lire des mots fréquents rapidement",
          objective:
            "Reconnaître et lire sans hésitation les mots fréquents rencontrés en classe.",
          status: "in-progress",
          successCriteria: [
            "Lit 20 mots fréquents courants sans hésiter",
            "Reconnaît instantanément des mots comme 'maison', 'enfant', 'école', 'souvent'",
            "Corrige spontanément une erreur de lecture sur un mot connu",
          ],
          parentGuidanceSummary:
            "Votre enfant apprend à reconnaître les mots du quotidien d'un seul coup d'œil, sans déchiffrer lettre par lettre.",
          parentQuickTips: [
            "Montrez 5 mots écrits sur des petites cartes chaque soir, puis mélangez-les.",
            "Pendant la lecture d'un livre, signalez les mots qu'il connaît déjà.",
          ],
          parentSuccessSigns: [
            "Il lit 'maison', 'souvent', 'toujours' sans s'arrêter.",
            "Il ne syllabe plus les mots qu'il a déjà rencontrés plusieurs fois.",
          ],
          exercises: [
            {
              instruction:
                "Entoure le mot qui correspond à l'image parmi les trois propositions.",
              difficulty: "decouverte",
              activityType: "qcm",
              validation: "Le bon mot est entouré.",
            },
            {
              instruction:
                "Relie chaque mot à son image. Mots : maison, chien, école, soleil.",
              difficulty: "entrainement",
              activityType: "matching",
              validation: "Toutes les liaisons sont correctes.",
            },
            {
              instruction:
                "Lis la liste de mots aussi vite que possible et barre ceux qui ne sont pas des mots vrais.",
              difficulty: "approfondissement",
              activityType: "reading-comprehension",
              validation: "Les non-mots sont barrés, les mots vrais restent.",
            },
          ],
        },
        {
          slug: "lire-un-texte-court-avec-fluidite",
          title: "Lire un texte court avec fluidité",
          objective:
            "Lire un texte court en respectant les groupes de sens et la ponctuation.",
          status: "upcoming",
          successCriteria: [
            "Regroupe les mots par groupes de sens sans hacher la lecture",
            "Marque une pause au point et une légère pause à la virgule",
            "Adapte sa voix à un point d'exclamation ou d'interrogation",
          ],
          parentGuidanceSummary:
            "Votre enfant apprend à lire en respectant le rythme des phrases, comme on parle.",
          parentQuickTips: [
            "Lisez d'abord le texte à voix haute, puis laissez-le répéter après vous.",
            "Montrez les virgules et les points avant de lire : 'Là, on s'arrête un peu.'",
          ],
          parentSuccessSigns: [
            "Il s'arrête au point et reprend sans relire tout le début.",
            "Sa lecture ressemble à une conversation, pas à un épelage.",
          ],
          exercises: [
            {
              instruction:
                "Lis ce texte à voix haute une première fois. Combien de phrases y a-t-il ?",
              difficulty: "decouverte",
              activityType: "reading-comprehension",
              validation: "L'élève compte correctement les phrases.",
            },
            {
              instruction:
                "Relis le texte. Cette fois, marque bien les pauses aux virgules et aux points.",
              difficulty: "entrainement",
              activityType: "oral",
              validation: "Les pauses sont respectées lors de l'écoute.",
            },
            {
              instruction:
                "Lis le texte à ton camarade. Il doit te dire si ta lecture est fluide ou hachée.",
              difficulty: "approfondissement",
              activityType: "oral",
              validation: "Le camarade confirme une lecture fluide.",
            },
          ],
        },
        {
          slug: "relire-pour-gagner-en-aisance",
          title: "Relire pour gagner en aisance",
          objective:
            "Améliorer la précision et la fluidité par des relectures courtes.",
          status: "upcoming",
          successCriteria: [
            "Lit le même texte plus vite et avec moins d'erreurs à la troisième lecture",
            "Remarque lui-même ses améliorations entre deux lectures",
            "Choisit le bon débit pour que l'auditeur comprenne",
          ],
          parentGuidanceSummary:
            "La relecture est l'un des meilleurs outils pour progresser en lecture. Répéter un texte court améliore la vitesse et la confiance.",
          parentQuickTips: [
            "Relisez le même petit texte trois soirs de suite, puis comparez.",
            "Enregistrez-le sur un téléphone : il entendra sa progression.",
          ],
          parentSuccessSigns: [
            "Il lit le même texte plus vite après deux relectures.",
            "Il ne se trompe plus sur les mots qu'il avait mal lus la première fois.",
          ],
          exercises: [
            {
              instruction: "Lis ce texte une première fois. Colorie une étoile.",
              difficulty: "decouverte",
              activityType: "oral",
              validation: "L'élève lit le texte une fois.",
            },
            {
              instruction: "Relis le texte une deuxième fois. As-tu fait moins d'erreurs ? Colorie une étoile.",
              difficulty: "entrainement",
              activityType: "oral",
              validation: "L'élève note ses progrès.",
            },
            {
              instruction: "Troisième lecture. Mesure avec l'enseignant le nombre de mots lus en une minute.",
              difficulty: "approfondissement",
              activityType: "oral",
              validation: "Performance notée et comparée aux lectures précédentes.",
            },
          ],
        },
      ],
    ),
    createSubdomain(
      "francais",
      "comprehension",
      "Comprehension",
      "Comprendre des textes courts lus seul ou entendus.",
      [
        {
          slug: "identifier-les-personnages-et-les-lieux",
          title: "Identifier les personnages et les lieux",
          objective:
            "Repérer les personnages, les lieux et les informations explicites d'un texte court.",
          status: "upcoming",
          successCriteria: [
            "Nomme les personnages principaux d'un texte court",
            "Indique le lieu où se déroule l'histoire",
            "S'appuie sur une phrase du texte pour justifier sa réponse",
          ],
          parentGuidanceSummary:
            "Votre enfant apprend à chercher les informations directement écrites dans le texte, sans inventer.",
          parentQuickTips: [
            "Après la lecture, demandez : 'Qui est dans l'histoire ? Où ça se passe ?'",
            "Montrez-lui où la réponse est écrite dans le texte.",
          ],
          parentSuccessSigns: [
            "Il cite le nom d'un personnage sans hésiter.",
            "Il pointe la phrase du texte qui donne la réponse.",
          ],
          exercises: [
            {
              instruction: "Lis le texte. Entoure le nom de chaque personnage.",
              difficulty: "decouverte",
              activityType: "reading-comprehension",
              validation: "Tous les personnages sont entourés.",
            },
            {
              instruction:
                "Réponds aux questions : Qui ? Où ? en écrivant une phrase complète.",
              difficulty: "entrainement",
              activityType: "free-text",
              validation: "Réponse en phrase, information exacte.",
            },
            {
              instruction:
                "Recopie la phrase du texte qui te dit où se passe l'histoire.",
              difficulty: "approfondissement",
              activityType: "free-text",
              validation: "La phrase recopiée contient le lieu.",
            },
          ],
        },
        {
          slug: "repondre-a-une-question-par-une-information-du-texte",
          title: "Répondre à une question par une information du texte",
          objective:
            "Appuyer sa réponse sur une information lue ou entendue dans le texte.",
          status: "upcoming",
          successCriteria: [
            "Retrouve la réponse dans le texte sans inventer",
            "Cite la phrase ou le groupe de mots qui répond à la question",
            "Écrit une réponse courte mais complète",
          ],
          parentGuidanceSummary:
            "Votre enfant apprend à trouver les réponses dans le texte, pas dans sa tête.",
          parentQuickTips: [
            "Quand il répond, demandez : 'Où est-ce écrit dans le texte ?'",
            "S'il ne trouve pas, relisez ensemble les phrases une à une.",
          ],
          parentSuccessSigns: [
            "Il pointe ou souligne la réponse dans le texte.",
            "Il ne confond plus ce qui est écrit et ce qu'il imagine.",
          ],
          exercises: [
            {
              instruction:
                "Lis le texte. Souligne la phrase qui répond à la question posée.",
              difficulty: "decouverte",
              activityType: "reading-comprehension",
              validation: "La bonne phrase est soulignée.",
            },
            {
              instruction:
                "Écris la réponse à la question en utilisant un mot du texte.",
              difficulty: "entrainement",
              activityType: "fill-blank",
              validation: "Le mot vient bien du texte.",
            },
            {
              instruction:
                "Réponds à deux questions sur le texte. Pour chaque réponse, écris le numéro de la ligne où tu as trouvé l'information.",
              difficulty: "approfondissement",
              activityType: "free-text",
              validation: "Réponses exactes avec référence de ligne correcte.",
            },
          ],
        },
        {
          slug: "remettre-les-evenements-dans-lordre",
          title: "Remettre les événements dans l'ordre",
          objective: "Ordonner les principales étapes d'un récit court.",
          status: "upcoming",
          successCriteria: [
            "Numérote correctement trois images ou phrases dans l'ordre du récit",
            "Utilise des mots comme 'd'abord', 'ensuite', 'enfin' pour raconter",
            "Justifie l'ordre choisi en s'appuyant sur le texte",
          ],
          parentGuidanceSummary:
            "Votre enfant apprend à suivre le déroulement d'une histoire, étape par étape.",
          parentQuickTips: [
            "Après une histoire, demandez : 'Qu'est-ce qui s'est passé en premier ? Et après ?'",
            "Dessinez ensemble trois cases : début, milieu, fin.",
          ],
          parentSuccessSigns: [
            "Il raconte l'histoire dans le bon ordre.",
            "Il utilise 'd'abord', 'ensuite', 'enfin' spontanément.",
          ],
          exercises: [
            {
              instruction:
                "Découpe les trois images et colle-les dans l'ordre de l'histoire.",
              difficulty: "decouverte",
              activityType: "matching",
              validation: "Les images sont dans l'ordre correct.",
            },
            {
              instruction:
                "Numérote les phrases de 1 à 3 pour raconter l'histoire dans l'ordre.",
              difficulty: "entrainement",
              activityType: "matching",
              validation: "La numérotation correspond à l'ordre du récit.",
            },
            {
              instruction:
                "Raconte l'histoire en trois phrases en utilisant d'abord, ensuite, enfin.",
              difficulty: "approfondissement",
              activityType: "free-text",
              validation: "Trois phrases, ordre correct, connecteurs utilisés.",
            },
          ],
        },
      ],
    ),
    createSubdomain(
      "francais",
      "production-ecrite",
      "Premieres productions ecrites",
      "Ecrire des phrases puis de courts textes avec guidage.",
      [
        {
          slug: "ecrire-une-phrase-complete",
          title: "Écrire une phrase complète",
          objective:
            "Produire une phrase qui a du sens avec une majuscule et une ponctuation finale.",
          status: "upcoming",
          successCriteria: [
            "Commence sa phrase par une majuscule",
            "Termine sa phrase par un point, un point d'exclamation ou d'interrogation",
            "La phrase a un sens complet (sujet + verbe)",
          ],
          parentGuidanceSummary:
            "Votre enfant apprend à écrire des phrases correctes : majuscule au début, point à la fin, et une idée complète.",
          parentQuickTips: [
            "Lisez sa phrase à voix haute : est-ce que ça veut dire quelque chose ?",
            "Vérifiez ensemble la majuscule et le point avant de rendre.",
          ],
          parentSuccessSigns: [
            "Toutes ses phrases commencent par une majuscule.",
            "Il relit systématiquement pour vérifier le point final.",
          ],
          exercises: [
            {
              instruction:
                "Recopie cette phrase en ajoutant la majuscule et le point manquants.",
              difficulty: "decouverte",
              activityType: "fill-blank",
              validation: "Majuscule et point correctement placés.",
            },
            {
              instruction:
                "Écris une phrase sur cette image. N'oublie pas la majuscule et le point.",
              difficulty: "entrainement",
              activityType: "free-text",
              validation: "Phrase complète avec majuscule et ponctuation.",
            },
            {
              instruction:
                "Parmi ces quatre suites de mots, entoure celles qui forment une vraie phrase.",
              difficulty: "approfondissement",
              activityType: "qcm",
              validation: "Les vraies phrases sont entourées.",
            },
          ],
        },
        {
          slug: "enchainer-deux-phrases-sur-un-meme-sujet",
          title: "Enchaîner deux phrases sur un même sujet",
          objective:
            "Écrire deux phrases cohérentes autour d'une idée ou d'une image.",
          status: "upcoming",
          successCriteria: [
            "Les deux phrases parlent du même sujet",
            "La deuxième phrase ajoute une information nouvelle",
            "Les deux phrases sont correctement ponctuées",
          ],
          parentGuidanceSummary:
            "Votre enfant apprend à écrire plusieurs phrases liées entre elles, premier pas vers un petit texte.",
          parentQuickTips: [
            "Proposez une image et demandez : 'Dis-moi deux choses sur ce dessin.'",
            "S'il dit deux phrases à l'oral, aidez-le à les écrire.",
          ],
          parentSuccessSigns: [
            "Ses deux phrases parlent du même sujet sans se contredire.",
            "La deuxième phrase apporte une nouvelle information.",
          ],
          exercises: [
            {
              instruction:
                "Lis les deux phrases. Sont-elles sur le même sujet ? Réponds par oui ou non.",
              difficulty: "decouverte",
              activityType: "qcm",
              validation: "Réponse correcte avec explication.",
            },
            {
              instruction:
                "Complète la deuxième phrase pour qu'elle parle du même sujet que la première.",
              difficulty: "entrainement",
              activityType: "fill-blank",
              validation: "Cohérence thématique respectée.",
            },
            {
              instruction:
                "Écris deux phrases sur le chien de l'image. La deuxième phrase doit dire quelque chose de différent.",
              difficulty: "approfondissement",
              activityType: "free-text",
              validation: "Deux phrases cohérentes, correctement ponctuées.",
            },
          ],
        },
        {
          slug: "ameliorer-une-phrase-par-un-detail",
          title: "Améliorer une phrase par un détail",
          objective:
            "Ajouter une précision simple pour rendre une phrase plus informative.",
          status: "upcoming",
          successCriteria: [
            "Ajoute un mot de couleur, de taille ou de lieu à une phrase simple",
            "La phrase enrichie donne une image plus précise",
            "Le mot ajouté est correctement placé dans la phrase",
          ],
          parentGuidanceSummary:
            "Votre enfant apprend à enrichir ses phrases en ajoutant des détails utiles.",
          parentQuickTips: [
            "Demandez : 'Comment il est ce chien ? De quelle couleur ?'",
            "Lisez la phrase avec et sans le détail : 'Laquelle est plus précise ?'",
          ],
          parentSuccessSigns: [
            "Il ajoute spontanément des précisions dans ses phrases.",
            "Les mots ajoutés sont à la bonne place dans la phrase.",
          ],
          exercises: [
            {
              instruction:
                "Lis la phrase simple. Choisis un mot de la liste pour l'améliorer.",
              difficulty: "decouverte",
              activityType: "fill-blank",
              validation: "Le mot est correctement inséré.",
            },
            {
              instruction:
                "Ajoute un mot qui dit la couleur, la taille ou le lieu pour améliorer chaque phrase.",
              difficulty: "entrainement",
              activityType: "free-text",
              validation: "Mot pertinent, phrase plus précise.",
            },
            {
              instruction:
                "Améliore cette phrase de deux façons différentes. Compare les résultats.",
              difficulty: "approfondissement",
              activityType: "free-text",
              validation: "Deux versions enrichies et différentes.",
            },
          ],
        },
      ],
    ),
    createSubdomain(
      "francais",
      "etude-de-la-langue",
      "Grammaire simple",
      "Observer la phrase et ses principaux constituants.",
      [
        {
          slug: "reconnaitre-une-phrase-correcte",
          title: "Reconnaître une phrase correcte",
          objective:
            "Identifier une phrase qui a du sens, commence par une majuscule et se termine par un point.",
          status: "in-progress",
          successCriteria: [
            "Identifie la majuscule au début et le point à la fin",
            "Vérifie que la suite de mots a un sens complet",
            "Distingue une phrase correcte d'une suite de mots désordonnés",
          ],
          parentGuidanceSummary:
            "Votre enfant apprend ce qu'est une vraie phrase : une idée complète, bien délimitée.",
          parentQuickTips: [
            "Montrez-lui deux suites de mots : une phrase et un non-sens. Demandez laquelle est une vraie phrase.",
            "Relisez ensemble ses écrits pour vérifier chaque phrase.",
          ],
          parentSuccessSigns: [
            "Il repère la majuscule et le point sans qu'on le lui rappelle.",
            "Il sait expliquer pourquoi une suite de mots n'est pas une phrase.",
          ],
          exercises: [
            {
              instruction:
                "Entoure les phrases correctes parmi ces suites de mots.",
              difficulty: "decouverte",
              activityType: "qcm",
              validation: "Seules les vraies phrases sont entourées.",
            },
            {
              instruction:
                "Recopie chaque phrase correcte en ajoutant la majuscule et le point.",
              difficulty: "entrainement",
              activityType: "fill-blank",
              validation: "Majuscule et point correctement placés.",
            },
            {
              instruction:
                "Remets ces mots dans l'ordre pour former une phrase correcte.",
              difficulty: "approfondissement",
              activityType: "free-text",
              validation: "Phrase ordonnée, majuscule et point présents.",
            },
          ],
        },
        {
          slug: "identifier-le-verbe-dans-une-phrase-simple",
          title: "Identifier le verbe dans une phrase simple",
          objective:
            "Repérer le mot qui indique l'action dans une phrase courte.",
          status: "upcoming",
          successCriteria: [
            "Trouve le mot d'action (verbe) dans une phrase courte",
            "Utilise le test 'hier, aujourd'hui, demain' pour vérifier",
            "Souligne le verbe d'une seule ligne",
          ],
          parentGuidanceSummary:
            "Votre enfant apprend à trouver le verbe, le mot qui dit ce qu'on fait ou ce qui se passe.",
          parentQuickTips: [
            "Demandez : 'Qu'est-ce qui se passe dans cette phrase ?' Le verbe exprime souvent l'action.",
            "Testez : 'Hier, il … / Demain, il …' Si ça marche, c'est un verbe.",
          ],
          parentSuccessSigns: [
            "Il trouve le verbe seul dans une phrase simple.",
            "Il peut expliquer que le verbe change selon le temps.",
          ],
          exercises: [
            {
              instruction:
                "Lis la phrase. Quel mot dit ce que fait le personnage ? Entoure-le.",
              difficulty: "decouverte",
              activityType: "reading-comprehension",
              validation: "Le verbe est entouré.",
            },
            {
              instruction:
                "Souligne le verbe dans chacune de ces cinq phrases.",
              difficulty: "entrainement",
              activityType: "reading-comprehension",
              validation: "Cinq verbes correctement soulignés.",
            },
            {
              instruction:
                "Remplace le verbe souligné par un autre verbe qui a du sens.",
              difficulty: "approfondissement",
              activityType: "fill-blank",
              validation: "Verbe de remplacement syntaxiquement correct.",
            },
          ],
        },
        {
          slug: "identifier-le-sujet-dun-verbe-simple",
          title: "Identifier le sujet d'un verbe simple",
          objective: "Trouver qui fait l'action dans une phrase courte.",
          status: "upcoming",
          successCriteria: [
            "Pose la question 'Qui ?' devant le verbe pour trouver le sujet",
            "Encadre le sujet dans une phrase simple",
            "Distingue le sujet du reste du groupe nominal",
          ],
          parentGuidanceSummary:
            "Votre enfant apprend à trouver 'qui fait l'action' dans une phrase, c'est le sujet.",
          parentQuickTips: [
            "Demandez : 'Qui mange ? Qui court ?' La réponse est le sujet.",
            "Aidez-le à encadrer le sujet avec un crayon de couleur.",
          ],
          parentSuccessSigns: [
            "Il pose spontanément la question 'Qui ?' pour trouver le sujet.",
            "Il encadre le bon groupe de mots.",
          ],
          exercises: [
            {
              instruction:
                "Pose la question 'Qui ?' avant le verbe souligné. Écris le sujet.",
              difficulty: "decouverte",
              activityType: "fill-blank",
              validation: "Sujet correctement identifié.",
            },
            {
              instruction: "Encadre le sujet dans chacune de ces phrases.",
              difficulty: "entrainement",
              activityType: "reading-comprehension",
              validation: "Sujets correctement encadrés.",
            },
            {
              instruction:
                "Écris une phrase avec chaque sujet donné : 'Le chat — Les enfants — Elle'.",
              difficulty: "approfondissement",
              activityType: "free-text",
              validation: "Trois phrases correctes avec les sujets imposés.",
            },
          ],
        },
      ],
    ),
    createSubdomain(
      "francais",
      "orthographe",
      "Orthographe frequente",
      "Stabiliser les mots frequents et les accords simples.",
      [
        {
          slug: "orthographier-des-mots-outils-frequents",
          title: "Orthographier des mots outils fréquents",
          objective:
            "Écrire correctement des mots outils fréquents travaillés en classe.",
          status: "upcoming",
          successCriteria: [
            "Écrit sans erreur au moins 15 mots outils courants",
            "Réutilise ces mots correctement en production écrite",
            "Signale lui-même une erreur sur un mot outil connu",
          ],
          parentGuidanceSummary:
            "Votre enfant mémorise des mots très courants qui apparaissent dans toutes les phrases.",
          parentQuickTips: [
            "Dictée flash : dictez 5 mots outils chaque soir sur une ardoise.",
            "Affichez la liste des mots à apprendre dans sa chambre.",
          ],
          parentSuccessSigns: [
            "Il écrit 'parce que', 'toujours', 'souvent' sans hésiter.",
            "Il relit ses écrits en cherchant les mots outils.",
          ],
          exercises: [
            {
              instruction:
                "Complète les phrases avec le bon mot outil parmi : alors, mais, avec, pour, sans.",
              difficulty: "decouverte",
              activityType: "fill-blank",
              validation: "Chaque trou est comblé par le mot outil approprié.",
            },
            {
              instruction:
                "Recopie correctement ces mots outils : toujours, souvent, parce que, lorsque.",
              difficulty: "entrainement",
              activityType: "free-text",
              validation: "Mots recopiés sans faute.",
            },
            {
              instruction:
                "La maîtresse a fait des erreurs dans ces mots outils. Corrige-les.",
              difficulty: "approfondissement",
              activityType: "free-text",
              validation: "Toutes les erreurs sont corrigées.",
            },
          ],
        },
        {
          slug: "marquer-le-pluriel-regulier-du-nom",
          title: "Marquer le pluriel régulier du nom",
          objective:
            "Ajouter la marque du pluriel sur des noms réguliers dans des groupes nominaux simples.",
          status: "upcoming",
          successCriteria: [
            "Ajoute un -s au nom au pluriel dans un groupe nominal simple",
            "Accorde le déterminant avec le nom (un → des, le → les)",
            "Identifie si un nom est singulier ou pluriel dans une phrase",
          ],
          parentGuidanceSummary:
            "Votre enfant apprend à mettre le -s du pluriel et à changer 'le/la' en 'les'.",
          parentQuickTips: [
            "Montrez des objets : 'un stylo → des stylos'. Demandez d'écrire les deux.",
            "Relisez ensemble ses phrases : 'Est-ce qu'il y en a plusieurs ?'",
          ],
          parentSuccessSigns: [
            "Il ajoute le -s sans qu'on le lui rappelle pour les noms réguliers.",
            "Il dit 'des chats' et non 'des chat'.",
          ],
          exercises: [
            {
              instruction:
                "Transforme ces groupes nominaux du singulier au pluriel : le chat → … / une fleur → …",
              difficulty: "decouverte",
              activityType: "fill-blank",
              validation: "Déterminant et nom correctement accordés.",
            },
            {
              instruction:
                "Souligne les noms au pluriel dans ces phrases.",
              difficulty: "entrainement",
              activityType: "reading-comprehension",
              validation: "Tous les noms au pluriel sont soulignés.",
            },
            {
              instruction:
                "Réécris ces phrases en mettant tous les noms au pluriel.",
              difficulty: "approfondissement",
              activityType: "free-text",
              validation: "Accords nom + déterminant corrects dans la phrase.",
            },
          ],
        },
        {
          slug: "accorder-le-verbe-avec-il-ou-ils",
          title: "Accorder le verbe avec il ou ils",
          objective:
            "Choisir une forme verbale simple selon un sujet singulier ou pluriel.",
          status: "upcoming",
          successCriteria: [
            "Choisit la bonne terminaison verbale avec 'il' ou 'ils' pour un verbe du 1er groupe",
            "Repère si le sujet est singulier ou pluriel avant d'écrire le verbe",
            "Écrit correctement 'il joue / ils jouent' sur des verbes courants",
          ],
          parentGuidanceSummary:
            "Votre enfant apprend à changer la terminaison du verbe selon que le sujet est un ou plusieurs.",
          parentQuickTips: [
            "Dictée de phrases simples : 'Il mange. / Ils mangent.'",
            "Demandez : 'Il y en a combien dans cette phrase ?' avant d'écrire le verbe.",
          ],
          parentSuccessSigns: [
            "Il ne confond plus 'il joue' et 'ils jouent' à l'écrit.",
            "Il vérifie le sujet avant de copier le verbe.",
          ],
          exercises: [
            {
              instruction:
                "Complète avec 'il chante' ou 'ils chantent' selon le sujet.",
              difficulty: "decouverte",
              activityType: "fill-blank",
              validation: "Forme verbale correcte selon le sujet.",
            },
            {
              instruction:
                "Conjugue le verbe entre parenthèses avec il ou ils.",
              difficulty: "entrainement",
              activityType: "fill-blank",
              validation: "Terminaison correcte pour chaque sujet.",
            },
            {
              instruction:
                "Transforme chaque phrase en changeant 'il' par 'ils' et adapte le verbe.",
              difficulty: "approfondissement",
              activityType: "free-text",
              validation: "Verbe correctement adapté au nouveau sujet.",
            },
          ],
        },
      ],
    ),
  ],
  status: "in-progress",
};

// ══════════════════════════════════════════════════════════════════════════════
// MATHÉMATIQUES
// ══════════════════════════════════════════════════════════════════════════════

const domainMathematiques: ProgramDomain = {
  id: "ce1-mathematiques",
  slug: "mathematiques",
  title: "Mathematiques",
  officialLabel: "Mathematiques - Cycle 2",
  description: "Nombres, calculs, problemes, grandeurs, espace et geometrie.",
  subdomains: [
    createSubdomain(
      "mathematiques",
      "nombres-et-calculs",
      "Nombres et calculs",
      "Consolider la numeration et les calculs simples.",
      [
        {
          slug: "lire-et-ecrire-les-nombres-jusqua-1000",
          title: "Lire et écrire les nombres jusqu'à 1000",
          objective:
            "Associer écriture chiffrée, nom oral et décomposition des nombres jusqu'à 1000.",
          status: "upcoming",
          successCriteria: [
            "Écrit en chiffres un nombre dicté jusqu'à 1000",
            "Lit à voix haute un nombre écrit jusqu'à 1000",
            "Décompose un nombre en centaines, dizaines et unités",
          ],
          parentGuidanceSummary:
            "Votre enfant apprend à lire, écrire et décomposer les nombres jusqu'à mille.",
          parentQuickTips: [
            "Dictez des nombres à écrire sur une ardoise : 247, 503, 891.",
            "Avec des objets, montrez : '3 centaines = 300'.",
          ],
          parentSuccessSigns: [
            "Il écrit 'cinq cent douze' → 512 sans hésiter.",
            "Il décompose 348 = 300 + 40 + 8.",
          ],
          exercises: [
            {
              instruction:
                "Écris en chiffres les nombres suivants : deux cents quarante-trois / sept cent cinq.",
              difficulty: "decouverte",
              activityType: "fill-blank",
              validation: "243 et 705 écrits correctement.",
            },
            {
              instruction:
                "Complète : 456 = ___ centaines + ___ dizaines + ___ unités.",
              difficulty: "entrainement",
              activityType: "fill-blank",
              validation: "4 centaines, 5 dizaines, 6 unités.",
            },
            {
              instruction:
                "Range ces nombres du plus petit au plus grand : 309 / 390 / 93 / 930.",
              difficulty: "approfondissement",
              activityType: "free-text",
              validation: "93 < 309 < 390 < 930.",
            },
          ],
        },
        {
          slug: "comparer-et-ranger-des-nombres",
          title: "Comparer et ranger des nombres",
          objective:
            "Comparer et ordonner des nombres entiers en utilisant la valeur des chiffres.",
          status: "upcoming",
          successCriteria: [
            "Utilise les signes < et > pour comparer deux nombres",
            "Range une liste de nombres dans l'ordre croissant ou décroissant",
            "Explique sa démarche de comparaison (valeur des chiffres)",
          ],
          parentGuidanceSummary:
            "Votre enfant apprend à comparer des nombres en regardant d'abord les centaines, puis les dizaines, puis les unités.",
          parentQuickTips: [
            "Jeu de cartes : tirez deux cartes, celui qui dit le plus grand en premier gagne.",
            "Demandez : 'Comment tu sais que 342 est plus grand que 324 ?'",
          ],
          parentSuccessSigns: [
            "Il place correctement < ou > entre deux nombres.",
            "Il explique : 'Je regarde d'abord les centaines.'",
          ],
          exercises: [
            {
              instruction: "Place le bon signe < ou > entre chaque paire : 234 ☐ 243 / 508 ☐ 580 / 99 ☐ 100.",
              difficulty: "decouverte",
              activityType: "fill-blank",
              validation: "<, <, < sont les bonnes réponses.",
            },
            {
              instruction:
                "Range ces nombres dans l'ordre croissant : 415, 154, 541, 145.",
              difficulty: "entrainement",
              activityType: "free-text",
              validation: "145 < 154 < 415 < 541.",
            },
            {
              instruction:
                "Trouve un nombre compris entre 450 et 460 et justifie ton choix.",
              difficulty: "approfondissement",
              activityType: "free-text",
              validation: "Nombre entre 451 et 459, justification correcte.",
            },
          ],
        },
        {
          slug: "calculer-mentalement-avec-des-petits-nombres",
          title: "Calculer mentalement avec des petits nombres",
          objective:
            "Mobiliser des doubles, compléments et décompositions pour calculer rapidement.",
          status: "upcoming",
          successCriteria: [
            "Calcule les doubles de 1 à 10 sans hésiter",
            "Trouve le complément à 10 d'un nombre de 0 à 10",
            "Utilise une décomposition pour calculer une addition ou une soustraction simple",
          ],
          parentGuidanceSummary:
            "Votre enfant apprend à calculer de tête en s'appuyant sur des stratégies (doubles, compléments à 10).",
          parentQuickTips: [
            "Jeu des doubles : 'Double de 7 ?' à la voiture, pendant un trajet.",
            "Jeu du complément : 'Combien il manque pour faire 10 ?'",
          ],
          parentSuccessSigns: [
            "Il connaît les doubles jusqu'à 10 de mémoire.",
            "Il utilise le complément à 10 pour calculer 8 + 6 = (8+2) + 4.",
          ],
          exercises: [
            {
              instruction:
                "Calcule les doubles : double de 4 = __ / double de 7 = __ / double de 9 = __.",
              difficulty: "decouverte",
              activityType: "fill-blank",
              validation: "8, 14, 18.",
            },
            {
              instruction:
                "Complète : 3 + __ = 10 / 7 + __ = 10 / __ + 4 = 10.",
              difficulty: "entrainement",
              activityType: "fill-blank",
              validation: "7, 3, 6.",
            },
            {
              instruction:
                "Calcule 8 + 7 en utilisant le passage par 10. Montre ta décomposition.",
              difficulty: "approfondissement",
              activityType: "free-text",
              validation: "8 + 2 + 5 = 15. Décomposition visible.",
            },
          ],
        },
        {
          slug: "poser-une-addition-sans-retenue",
          title: "Poser une addition sans retenue",
          objective:
            "Aligner les chiffres par rang et calculer une addition posée simple.",
          status: "upcoming",
          successCriteria: [
            "Aligne correctement unités sous unités et dizaines sous dizaines",
            "Additionne chaque colonne de droite à gauche",
            "Vérifie son résultat par une estimation mentale",
          ],
          parentGuidanceSummary:
            "Votre enfant apprend à poser une addition en colonnes : chaque chiffre à sa place.",
          parentQuickTips: [
            "Montrez sur papier quadrillé : une case = un chiffre.",
            "Vérifiez ensemble : 'Est-ce que le résultat est à peu près raisonnable ?'",
          ],
          parentSuccessSigns: [
            "Il aligne les chiffres sans dépasser.",
            "Il calcule colonne par colonne de la droite vers la gauche.",
          ],
          exercises: [
            {
              instruction:
                "Pose et calcule : 143 + 25 = __.",
              difficulty: "decouverte",
              activityType: "free-text",
              validation: "168, colonnes bien alignées.",
            },
            {
              instruction:
                "Pose et calcule ces additions : 312 + 46 / 250 + 134.",
              difficulty: "entrainement",
              activityType: "free-text",
              validation: "358 et 384, alignements corrects.",
            },
            {
              instruction:
                "Trouve deux nombres dont la somme est 547. Pose l'addition pour vérifier.",
              difficulty: "approfondissement",
              activityType: "free-text",
              validation: "Paire valide, addition posée et résultat 547.",
            },
          ],
        },
      ],
    ),
    createSubdomain(
      "mathematiques",
      "problemes",
      "Problemes",
      "Resoudre des problemes additifs, soustractifs et multiplicatifs tres simples.",
      [
        {
          slug: "choisir-loperation-dun-probleme-additif-ou-soustractif",
          title: "Choisir l'opération d'un problème additif ou soustractif",
          objective:
            "Identifier si une situation demande d'ajouter ou de retirer.",
          status: "upcoming",
          successCriteria: [
            "Lit la question du problème et identifie l'opération à effectuer",
            "Justifie son choix : 'J'additionne parce que…' ou 'Je soustrais parce que…'",
            "Écrit l'opération correspondant à la situation",
          ],
          parentGuidanceSummary:
            "Votre enfant apprend à choisir + ou - en comprenant la situation du problème.",
          parentQuickTips: [
            "Lisez le problème ensemble. Demandez : 'Est-ce qu'on ajoute ou on enlève ?'",
            "Inventez de petits problèmes avec des objets réels.",
          ],
          parentSuccessSigns: [
            "Il explique pourquoi il choisit l'addition ou la soustraction.",
            "Il ne devine plus au hasard.",
          ],
          exercises: [
            {
              instruction:
                "Lis le problème. Entoure le signe + ou - qui correspond à la situation.",
              difficulty: "decouverte",
              activityType: "qcm",
              validation: "Signe correct entouré.",
            },
            {
              instruction:
                "Écris l'opération du problème sans la calculer, puis calcule-la.",
              difficulty: "entrainement",
              activityType: "free-text",
              validation: "Opération correcte et résultat juste.",
            },
            {
              instruction:
                "Invente un petit problème qui utilise la soustraction.",
              difficulty: "approfondissement",
              activityType: "free-text",
              validation: "Situation cohérente avec une soustraction.",
            },
          ],
        },
        {
          slug: "resoudre-un-probleme-a-etapes-guidees",
          title: "Résoudre un problème à étapes guidées",
          objective:
            "Suivre deux étapes explicites pour résoudre un problème court.",
          status: "upcoming",
          successCriteria: [
            "Effectue les deux étapes dans le bon ordre",
            "Écrit les deux calculs intermédiaires",
            "Répond à la question posée avec la bonne unité",
          ],
          parentGuidanceSummary:
            "Votre enfant apprend à résoudre un problème en deux étapes, sans sauter les calculs.",
          parentQuickTips: [
            "Lisez ensemble les deux questions guidées avant de commencer.",
            "Demandez : 'Quelle est la question ? Qu'est-ce qu'on cherche d'abord ?'",
          ],
          parentSuccessSigns: [
            "Il écrit les deux calculs séparément.",
            "Il répond avec la bonne unité (€, cm, kg…).",
          ],
          exercises: [
            {
              instruction:
                "Étape 1 : combien d'élèves en tout ? Étape 2 : combien restent si 5 partent ?",
              difficulty: "decouverte",
              activityType: "free-text",
              validation: "Deux calculs écrits, réponse correcte.",
            },
            {
              instruction:
                "Résous ce problème en deux étapes. Écris un calcul par étape.",
              difficulty: "entrainement",
              activityType: "free-text",
              validation: "Deux calculs visibles, réponse finale correcte.",
            },
            {
              instruction:
                "Résous ce problème en deux étapes. Explique pourquoi tu as fait chaque calcul.",
              difficulty: "approfondissement",
              activityType: "free-text",
              validation: "Justification de chaque étape + réponse correcte.",
            },
          ],
        },
        {
          slug: "expliquer-sa-demarche-de-resolution",
          title: "Expliquer sa démarche de résolution",
          objective:
            "Dire ou écrire comment le calcul choisi répond à la question.",
          status: "upcoming",
          successCriteria: [
            "Explique à voix haute ou par écrit pourquoi il a fait ce calcul",
            "Relie le calcul à la situation du problème",
            "Formule une phrase réponse complète avec l'unité",
          ],
          parentGuidanceSummary:
            "Votre enfant apprend à justifier sa méthode de calcul, pas seulement à donner le résultat.",
          parentQuickTips: [
            "Demandez : 'Pourquoi tu as additionné ?' L'explication vaut autant que le résultat.",
            "Encouragez une phrase réponse : 'Il y a … pommes.'",
          ],
          parentSuccessSigns: [
            "Il explique sa démarche avec ses mots.",
            "Il écrit une phrase réponse avec l'unité.",
          ],
          exercises: [
            {
              instruction:
                "Calcule le résultat du problème. Puis entoure la phrase réponse correcte.",
              difficulty: "decouverte",
              activityType: "qcm",
              validation: "Bonne phrase réponse sélectionnée.",
            },
            {
              instruction:
                "Résous le problème et écris la phrase réponse complète.",
              difficulty: "entrainement",
              activityType: "free-text",
              validation: "Phrase réponse complète avec l'unité.",
            },
            {
              instruction:
                "Résous le problème, écris le calcul et explique en une phrase pourquoi tu as fait cette opération.",
              difficulty: "approfondissement",
              activityType: "free-text",
              validation: "Calcul + explication + phrase réponse.",
            },
          ],
        },
      ],
    ),
    createSubdomain(
      "mathematiques",
      "grandeurs-et-mesures",
      "Grandeurs et mesures",
      "Comparer, estimer et mesurer des grandeurs usuelles.",
      [
        {
          slug: "comparer-des-longueurs",
          title: "Comparer des longueurs",
          objective:
            "Comparer deux longueurs directement ou avec un instrument adapté.",
          status: "upcoming",
          successCriteria: [
            "Compare deux objets en les plaçant côte à côte",
            "Mesure une longueur avec une règle graduée en cm",
            "Utilise les mots plus long, plus court, aussi long",
          ],
          parentGuidanceSummary:
            "Votre enfant apprend à mesurer et comparer des longueurs avec une règle.",
          parentQuickTips: [
            "Mesurez des objets à la maison : un crayon, une cuillère, un livre.",
            "Demandez : 'Lequel est le plus long ? Comment tu le sais ?'",
          ],
          parentSuccessSigns: [
            "Il place correctement la règle pour mesurer.",
            "Il exprime une mesure en cm.",
          ],
          exercises: [
            {
              instruction:
                "Sans mesurer, entoure l'objet le plus long sur chaque ligne.",
              difficulty: "decouverte",
              activityType: "qcm",
              validation: "Bon objet entouré sur chaque ligne.",
            },
            {
              instruction:
                "Mesure ces segments avec ta règle et écris leur longueur en cm.",
              difficulty: "entrainement",
              activityType: "free-text",
              validation: "Mesures correctes en cm.",
            },
            {
              instruction:
                "Dessine un segment de 7 cm. Puis dessine-en un de 3 cm de moins.",
              difficulty: "approfondissement",
              activityType: "drawing",
              validation: "Segments de 7 cm et 4 cm correctement tracés.",
            },
          ],
        },
        {
          slug: "lire-une-heure-simple",
          title: "Lire une heure simple",
          objective:
            "Lire l'heure pleine et la demi-heure sur une horloge à aiguilles.",
          status: "upcoming",
          successCriteria: [
            "Lit correctement une heure pleine sur une horloge analogique",
            "Lit correctement une demi-heure sur une horloge analogique",
            "Associe l'horloge analogique à l'écriture numérique correspondante",
          ],
          parentGuidanceSummary:
            "Votre enfant apprend à lire l'heure sur une vraie horloge à aiguilles.",
          parentQuickTips: [
            "Interrogez-le sur la pendule : 'Quelle heure il est ?'",
            "Faites-lui pointer la grande et la petite aiguille.",
          ],
          parentSuccessSigns: [
            "Il dit 'trois heures et demie' en regardant l'horloge.",
            "Il distingue la grande aiguille (minutes) de la petite (heures).",
          ],
          exercises: [
            {
              instruction:
                "Regarde chaque horloge et écris l'heure en chiffres (ex : 3h00).",
              difficulty: "decouverte",
              activityType: "fill-blank",
              validation: "Heures pleines lues correctement.",
            },
            {
              instruction:
                "Dessine les aiguilles sur l'horloge pour montrer 4h30.",
              difficulty: "entrainement",
              activityType: "drawing",
              validation: "Petite aiguille entre 4 et 5, grande sur 6.",
            },
            {
              instruction:
                "Relie chaque horloge à l'activité correspondante (réveil, déjeuner, goûter, dîner).",
              difficulty: "approfondissement",
              activityType: "matching",
              validation: "Liaisons toutes correctes.",
            },
          ],
        },
      ],
    ),
    createSubdomain(
      "mathematiques",
      "espace-et-geometrie",
      "Espace et geometrie",
      "Se reperer, reconnaitre des figures et utiliser les premiers instruments.",
      [
        {
          slug: "se-reperer-sur-un-quadrillage",
          title: "Se repérer sur un quadrillage",
          objective:
            "Localiser une case ou un déplacement simple sur un quadrillage.",
          status: "upcoming",
          successCriteria: [
            "Nomme la case à partir d'une colonne et d'une ligne",
            "Déplace un personnage d'une case à une autre selon une instruction",
            "Donne les coordonnées d'une case demandée",
          ],
          parentGuidanceSummary:
            "Votre enfant apprend à se repérer sur un quadrillage comme sur un plan simplifié.",
          parentQuickTips: [
            "Jeu de bataille navale simplifié sur papier quadrillé.",
            "Demandez : 'Sur quelle case est le chat ?'",
          ],
          parentSuccessSigns: [
            "Il nomme une case en combinant colonne et ligne.",
            "Il suit un itinéraire sur le quadrillage.",
          ],
          exercises: [
            {
              instruction:
                "Colorie la case (C, 2) en bleu et la case (A, 4) en rouge.",
              difficulty: "decouverte",
              activityType: "drawing",
              validation: "Cases correctement coloriées.",
            },
            {
              instruction:
                "Le personnage est en (B, 1). Il avance de 2 cases vers le haut. Où est-il ?",
              difficulty: "entrainement",
              activityType: "fill-blank",
              validation: "Réponse : (B, 3).",
            },
            {
              instruction:
                "Trace un chemin de (A,1) à (D,3) sur le quadrillage en passant par (B,2).",
              difficulty: "approfondissement",
              activityType: "drawing",
              validation: "Chemin tracé passant par les trois cases.",
            },
          ],
        },
        {
          slug: "reconnaitre-les-figures-usuelles",
          title: "Reconnaître les figures usuelles",
          objective:
            "Identifier carré, rectangle, triangle et cercle à partir de leurs propriétés visibles.",
          status: "upcoming",
          successCriteria: [
            "Nomme les quatre figures géométriques usuelles",
            "Décrit une propriété visible de chaque figure (côtés, angles)",
            "Trie des figures selon leur nom",
          ],
          parentGuidanceSummary:
            "Votre enfant apprend à reconnaître les formes géométriques de base et à les distinguer.",
          parentQuickTips: [
            "Cherchez des formes autour de vous : fenêtre carrée, assiette ronde, toile triangulaire.",
            "Demandez : 'Combien de côtés ce rectangle a-t-il ?'",
          ],
          parentSuccessSigns: [
            "Il nomme correctement carré, rectangle, triangle, cercle.",
            "Il dit qu'un carré a 4 côtés égaux.",
          ],
          exercises: [
            {
              instruction:
                "Entoure tous les triangles de la figure en rouge, tous les carrés en bleu.",
              difficulty: "decouverte",
              activityType: "drawing",
              validation: "Formes correctement entourées.",
            },
            {
              instruction:
                "Relie chaque figure à sa description : 4 côtés égaux / 3 côtés / pas de côté / 4 côtés dont 2 égaux 2 à 2.",
              difficulty: "entrainement",
              activityType: "matching",
              validation: "Liaisons toutes correctes.",
            },
            {
              instruction:
                "Dessine une maison en utilisant au moins un carré, un triangle et un rectangle.",
              difficulty: "approfondissement",
              activityType: "drawing",
              validation: "Trois figures présentes et nommées.",
            },
          ],
        },
        {
          slug: "tracer-un-segment-a-la-regle",
          title: "Tracer un segment à la règle",
          objective:
            "Utiliser la règle pour tracer un segment propre entre deux points.",
          status: "upcoming",
          successCriteria: [
            "Place correctement la règle entre deux points",
            "Trace un trait propre sans tremblement",
            "Mesure et note la longueur du segment tracé",
          ],
          parentGuidanceSummary:
            "Votre enfant apprend à se servir d'une règle pour tracer des segments précis.",
          parentQuickTips: [
            "Pratiquez le tracé sur papier quadrillé : 'Relie ce point à ce point.'",
            "Vérifiez que la règle ne bouge pas pendant le tracé.",
          ],
          parentSuccessSigns: [
            "Son segment passe bien par les deux points.",
            "Il annonce la longueur du segment après l'avoir tracé.",
          ],
          exercises: [
            {
              instruction:
                "Relie les deux points A et B avec ta règle. Mesure le segment obtenu.",
              difficulty: "decouverte",
              activityType: "drawing",
              validation: "Segment droit reliant A et B, longueur notée.",
            },
            {
              instruction:
                "Trace trois segments de 4 cm, 6 cm et 9 cm.",
              difficulty: "entrainement",
              activityType: "drawing",
              validation: "Trois segments aux bonnes longueurs.",
            },
            {
              instruction:
                "Trace un rectangle de 5 cm × 3 cm en utilisant ta règle.",
              difficulty: "approfondissement",
              activityType: "drawing",
              validation: "Rectangle tracé avec les bonnes dimensions.",
            },
          ],
        },
      ],
    ),
  ],
  status: "upcoming",
};

// ══════════════════════════════════════════════════════════════════════════════
// QUESTIONNER LE MONDE
// ══════════════════════════════════════════════════════════════════════════════

const domainQuestionnerLeMonde: ProgramDomain = {
  id: "ce1-questionner-le-monde",
  slug: "questionner-le-monde",
  title: "Questionner le monde",
  officialLabel: "Questionner le monde - Cycle 2",
  description: "Observer le vivant, explorer la matiere, se reperer dans le temps et l'espace.",
  subdomains: [
    createSubdomain(
      "questionner-le-monde",
      "monde-vivant",
      "Le monde vivant",
      "Decrire les cycles de vie et les relations entre etres vivants.",
      [
        {
          slug: "decrire-le-cycle-dun-etre-vivant",
          title: "Décrire le cycle d'un être vivant",
          objective:
            "Ordonner les étapes du développement d'un être vivant et les justifier.",
          status: "upcoming",
          successCriteria: [
            "Ordonne les étapes du cycle de vie d'un animal (naissance, croissance, reproduction, mort)",
            "Nomme les étapes avec le vocabulaire approprié",
            "Compare deux cycles de vie simples",
          ],
          parentGuidanceSummary:
            "Votre enfant apprend que tous les êtres vivants naissent, grandissent, se reproduisent et meurent.",
          parentQuickTips: [
            "Observez ensemble des photos d'un animal de bébé à adulte.",
            "Demandez : 'Comment tu étais quand tu étais bébé ? Et maintenant ?'",
          ],
          parentSuccessSigns: [
            "Il ordonne les images du cycle d'un papillon sans aide.",
            "Il utilise les mots 'larve', 'chrysalide', 'papillon'.",
          ],
          exercises: [
            {
              instruction:
                "Numérote les images du cycle de vie de la grenouille de 1 à 4.",
              difficulty: "decouverte",
              activityType: "matching",
              validation: "Ordre : œuf → têtard → grenouillon → grenouille.",
            },
            {
              instruction:
                "Complète le cycle de vie du papillon avec les mots : œuf, chenille, chrysalide, papillon.",
              difficulty: "entrainement",
              activityType: "fill-blank",
              validation: "Les quatre mots sont placés correctement.",
            },
            {
              instruction:
                "Compare le cycle du papillon et celui de la grenouille. Note une ressemblance et une différence.",
              difficulty: "approfondissement",
              activityType: "free-text",
              validation: "Une ressemblance et une différence valides.",
            },
          ],
        },
        {
          slug: "observer-une-chaine-alimentaire-simple",
          title: "Observer une chaîne alimentaire simple",
          objective:
            "Identifier producteurs et consommateurs dans une chaîne alimentaire courte.",
          status: "upcoming",
          successCriteria: [
            "Reconnaît qu'une chaîne commence toujours par une plante",
            "Ordonne qui mange qui dans une chaîne simple",
            "Utilise les flèches dans le bon sens (→ = est mangé par)",
          ],
          parentGuidanceSummary:
            "Votre enfant apprend que dans la nature, les animaux mangent d'autres êtres vivants et forment des chaînes.",
          parentQuickTips: [
            "Exemple simple : herbe → lapin → renard. Demandez qui mange qui.",
            "Demandez : 'Que se passerait-il si les lapins disparaissaient ?'",
          ],
          parentSuccessSigns: [
            "Il construit une chaîne alimentaire simple avec des images.",
            "Il dit 'la plante nourrit le lapin, qui nourrit le renard'.",
          ],
          exercises: [
            {
              instruction:
                "Relie les images pour former une chaîne alimentaire : herbe, criquet, grenouille.",
              difficulty: "decouverte",
              activityType: "matching",
              validation: "herbe → criquet → grenouille.",
            },
            {
              instruction:
                "Complète la chaîne alimentaire avec les animaux proposés.",
              difficulty: "entrainement",
              activityType: "fill-blank",
              validation: "Chaîne complète et ordonnée.",
            },
            {
              instruction:
                "Si le renard disparaissait, que se passerait-il pour les lapins ? Explique.",
              difficulty: "approfondissement",
              activityType: "free-text",
              validation: "Raisonnement cohérent sur l'équilibre naturel.",
            },
          ],
        },
      ],
    ),
    createSubdomain(
      "questionner-le-monde",
      "espace-et-temps",
      "Espace et temps",
      "Lire une frise, situer des evenements et se reperer sur une carte simple.",
      [
        {
          slug: "lire-une-frise-chronologique",
          title: "Lire une frise chronologique",
          objective:
            "Placer des événements sur une frise et utiliser un vocabulaire temporel adapté.",
          status: "upcoming",
          successCriteria: [
            "Situe 'avant', 'après' et 'en même temps' sur une frise",
            "Place un événement sur la frise à la bonne position",
            "Utilise des mots comme 'siècle', 'époque', 'il y a longtemps'",
          ],
          parentGuidanceSummary:
            "Votre enfant apprend à s'orienter dans le temps grâce à une frise chronologique.",
          parentQuickTips: [
            "Fabriquez une frise de vie familiale : naissance, rentrée, événements marquants.",
            "Demandez : 'C'était avant ou après ta naissance ?'",
          ],
          parentSuccessSigns: [
            "Il place correctement 'la préhistoire' avant 'l'Antiquité' sur une frise.",
            "Il utilise 'avant', 'après', 'il y a longtemps' avec à-propos.",
          ],
          exercises: [
            {
              instruction:
                "Place ces événements sur la frise dans l'ordre : naissance, première rentrée, CE1.",
              difficulty: "decouverte",
              activityType: "matching",
              validation: "Ordre chronologique correct.",
            },
            {
              instruction:
                "Entoure l'événement qui s'est passé avant les autres sur la frise.",
              difficulty: "entrainement",
              activityType: "qcm",
              validation: "L'événement le plus ancien est entouré.",
            },
            {
              instruction:
                "Ajoute deux événements de ta vie sur la frise et explique leur position.",
              difficulty: "approfondissement",
              activityType: "free-text",
              validation: "Deux événements placés avec justification.",
            },
          ],
        },
        {
          slug: "se-reperer-sur-une-carte-simple",
          title: "Se repérer sur une carte simple",
          objective:
            "Localiser un lieu en utilisant la légende et les repères d'une carte.",
          status: "upcoming",
          successCriteria: [
            "Utilise la légende pour comprendre les symboles d'une carte",
            "Localise un pays, une ville ou un fleuve sur une carte de France",
            "Oriente la carte grâce à la rose des vents (nord, sud)",
          ],
          parentGuidanceSummary:
            "Votre enfant apprend à lire une carte simple, à utiliser la légende et à s'orienter.",
          parentQuickTips: [
            "Montrez la France sur une carte et demandez où vous habitez.",
            "Demandez : 'C'est au nord ou au sud de Paris ?'",
          ],
          parentSuccessSigns: [
            "Il pointe la ville demandée sur la carte.",
            "Il utilise 'nord', 'sud', 'est', 'ouest' correctement.",
          ],
          exercises: [
            {
              instruction:
                "Regarde la légende. Entoure en bleu tous les fleuves sur la carte.",
              difficulty: "decouverte",
              activityType: "drawing",
              validation: "Les fleuves sont correctement identifiés.",
            },
            {
              instruction:
                "Trouve la ville indiquée par l'étoile et écris son nom.",
              difficulty: "entrainement",
              activityType: "fill-blank",
              validation: "Ville correctement nommée.",
            },
            {
              instruction:
                "Cette ville est-elle au nord ou au sud de Paris ? Explique comment tu le sais.",
              difficulty: "approfondissement",
              activityType: "free-text",
              validation: "Direction correcte + explication avec la rose des vents.",
            },
          ],
        },
      ],
    ),
    createSubdomain(
      "questionner-le-monde",
      "matiere-et-energie",
      "Matiere et energie",
      "Classer des matieres et explorer des circuits simples.",
      [
        {
          slug: "classer-des-matieres-selon-leurs-proprietes",
          title: "Classer des matières selon leurs propriétés",
          objective:
            "Observer et classer des matières en s'appuyant sur des propriétés testées.",
          status: "upcoming",
          successCriteria: [
            "Teste si une matière est rigide ou souple, transparente ou opaque",
            "Classe des objets selon une propriété donnée",
            "Justifie son classement avec une observation",
          ],
          parentGuidanceSummary:
            "Votre enfant apprend à observer et classer les matières du quotidien selon leurs propriétés.",
          parentQuickTips: [
            "Classez des objets ménagers : plastique, bois, métal, tissu.",
            "Demandez : 'Est-ce que ça plie ? Est-ce qu'on voit à travers ?'",
          ],
          parentSuccessSigns: [
            "Il cite une propriété pour justifier son classement.",
            "Il distingue rigide/souple et transparent/opaque.",
          ],
          exercises: [
            {
              instruction:
                "Entoure les objets transparents parmi : verre, bois, plastique transparent, carton.",
              difficulty: "decouverte",
              activityType: "qcm",
              validation: "Verre et plastique transparent entourés.",
            },
            {
              instruction:
                "Classe ces objets en deux colonnes : rigide / souple.",
              difficulty: "entrainement",
              activityType: "matching",
              validation: "Classement correct selon la rigidité.",
            },
            {
              instruction:
                "Propose un critère de classement différent et regroupe les objets selon ce critère.",
              difficulty: "approfondissement",
              activityType: "free-text",
              validation: "Critère cohérent et classement valide.",
            },
          ],
        },
        {
          slug: "observer-un-circuit-electrique-simple",
          title: "Observer un circuit électrique simple",
          objective:
            "Identifier les éléments d'un circuit simple et comprendre pourquoi une lampe s'allume.",
          status: "upcoming",
          successCriteria: [
            "Nomme les éléments d'un circuit : pile, fils, ampoule, interrupteur",
            "Explique que le circuit doit être fermé pour que la lampe s'allume",
            "Prédit si une lampe s'allumera selon le schéma du circuit",
          ],
          parentGuidanceSummary:
            "Votre enfant apprend que l'électricité circule dans un circuit fermé pour allumer une lampe.",
          parentQuickTips: [
            "Montrez une lampe de poche et expliquez que la pile envoie l'électricité.",
            "Demandez : 'Que se passe-t-il si on retire une pile ?'",
          ],
          parentSuccessSigns: [
            "Il dit que le circuit doit être fermé.",
            "Il nomme pile, fil et ampoule correctement.",
          ],
          exercises: [
            {
              instruction:
                "Relie les mots aux bons éléments du schéma de circuit : pile, ampoule, fil.",
              difficulty: "decouverte",
              activityType: "matching",
              validation: "Trois liaisons correctes.",
            },
            {
              instruction:
                "Ce circuit est-il fermé ou ouvert ? La lampe s'allume-t-elle ? Entoure.",
              difficulty: "entrainement",
              activityType: "qcm",
              validation: "Réponse correcte selon le schéma.",
            },
            {
              instruction:
                "Dessine un circuit fermé simple avec une pile, deux fils et une ampoule.",
              difficulty: "approfondissement",
              activityType: "drawing",
              validation: "Circuit fermé et cohérent avec les trois éléments.",
            },
          ],
        },
      ],
    ),
  ],
  status: "upcoming",
};

// ══════════════════════════════════════════════════════════════════════════════
// ENSEIGNEMENTS ARTISTIQUES
// ══════════════════════════════════════════════════════════════════════════════

const domainEnseignementsArtistiques: ProgramDomain = {
  id: "ce1-enseignements-artistiques",
  slug: "enseignements-artistiques",
  title: "Enseignements artistiques",
  officialLabel: "Enseignements artistiques - Cycle 2",
  description: "Composer avec des formes et des couleurs, chanter et ecouter de la musique.",
  subdomains: [
    createSubdomain(
      "enseignements-artistiques",
      "arts-plastiques",
      "Arts plastiques",
      "Composer avec des formes et des couleurs, decrire une oeuvre.",
      [
        {
          slug: "composer-avec-formes-et-couleurs",
          title: "Composer avec des formes et des couleurs",
          objective:
            "Organiser des formes et des couleurs pour donner une intention à sa production.",
          status: "upcoming",
          successCriteria: [
            "Choisit des couleurs et des formes en lien avec une intention",
            "Explique ses choix : 'J'ai choisi le rouge parce que…'",
            "Produit une composition organisée et non aléatoire",
          ],
          parentGuidanceSummary:
            "Votre enfant apprend à faire des choix artistiques conscients : pourquoi cette couleur, pourquoi cette forme.",
          parentQuickTips: [
            "Demandez : 'Pourquoi tu as mis du bleu ici ? Qu'est-ce que ça donne comme impression ?'",
            "Regardez ensemble des tableaux célèbres et commentez les couleurs.",
          ],
          parentSuccessSigns: [
            "Il explique ses choix de couleurs avec une raison.",
            "Sa production a une intention visible.",
          ],
          exercises: [
            {
              instruction:
                "Observe ces deux compositions. Laquelle donne une impression de calme ? Pourquoi ?",
              difficulty: "decouverte",
              activityType: "qcm",
              validation: "Réponse justifiée par les couleurs ou les formes.",
            },
            {
              instruction:
                "Crée une composition avec 3 formes et 2 couleurs. Explique ton intention.",
              difficulty: "entrainement",
              activityType: "free-text",
              validation: "Composition réalisée, intention expliquée.",
            },
            {
              instruction:
                "Modifie la composition en changeant une couleur. Qu'est-ce que ça change ?",
              difficulty: "approfondissement",
              activityType: "free-text",
              validation: "Changement effectué, impact observé et expliqué.",
            },
          ],
        },
        {
          slug: "decrire-une-oeuvre-plastique",
          title: "Décrire une œuvre plastique",
          objective:
            "Décrire ce qu'on voit dans une œuvre en distinguant observation et ressenti.",
          status: "upcoming",
          successCriteria: [
            "Décrit objectivement ce qu'il voit (formes, couleurs, personnages)",
            "Exprime un ressenti personnel : 'Cette œuvre me fait penser à…'",
            "Distingue ce qui est vu de ce qui est ressenti ou imaginé",
          ],
          parentGuidanceSummary:
            "Votre enfant apprend à regarder une œuvre d'art avec attention et à en parler.",
          parentQuickTips: [
            "Devant une affiche ou un tableau, demandez : 'Qu'est-ce que tu vois ? Qu'est-ce que tu ressens ?'",
            "Valorisez les mots qu'il trouve, même simples.",
          ],
          parentSuccessSigns: [
            "Il décrit les couleurs et les formes avant de donner son avis.",
            "Il distingue 'je vois' et 'je pense que'.",
          ],
          exercises: [
            {
              instruction:
                "Regarde l'œuvre. Cite trois choses que tu vois (couleurs, formes, personnages).",
              difficulty: "decouverte",
              activityType: "free-text",
              validation: "Trois observations factuelles correctes.",
            },
            {
              instruction:
                "Écris une phrase sur ce que tu ressens devant cette œuvre.",
              difficulty: "entrainement",
              activityType: "free-text",
              validation: "Phrase de ressenti personnel exprimée.",
            },
            {
              instruction:
                "Compare deux œuvres. Note une ressemblance et une différence.",
              difficulty: "approfondissement",
              activityType: "free-text",
              validation: "Ressemblance et différence valides et justifiées.",
            },
          ],
        },
      ],
    ),
    createSubdomain(
      "enseignements-artistiques",
      "education-musicale",
      "Education musicale",
      "Chanter avec precision et ecouter des extraits musicaux.",
      [
        {
          slug: "chanter-en-groupe-avec-precision",
          title: "Chanter en groupe avec précision",
          objective:
            "Chanter en respectant le tempo, les paroles et l'intensité collective.",
          status: "upcoming",
          successCriteria: [
            "Chante en respectant le tempo commun",
            "Articule clairement les paroles",
            "Adapte son volume pour s'intégrer dans le groupe",
          ],
          parentGuidanceSummary:
            "Votre enfant apprend à chanter avec les autres en écoutant et en s'ajustant au groupe.",
          parentQuickTips: [
            "Chantez ensemble une comptine ou une chanson connue.",
            "Encouragez-le à écouter les autres autant qu'à chanter.",
          ],
          parentSuccessSigns: [
            "Il attend le bon moment pour commencer.",
            "Il chante sans couvrir les autres.",
          ],
          exercises: [
            {
              instruction:
                "Écoute le tempo (battements). Frappe dans tes mains en même temps.",
              difficulty: "decouverte",
              activityType: "oral",
              validation: "Frappes en synchronie avec le tempo.",
            },
            {
              instruction:
                "Chante la chanson en chuchotant puis à voix normale. Quelle différence ?",
              difficulty: "entrainement",
              activityType: "oral",
              validation: "Observation de la différence d'intensité.",
            },
            {
              instruction:
                "Chante en duo avec un camarade. Essayez de finir ensemble.",
              difficulty: "approfondissement",
              activityType: "oral",
              validation: "Fin synchronisée avec le camarade.",
            },
          ],
        },
        {
          slug: "ecouter-et-decrire-un-extrait-musical",
          title: "Écouter et décrire un extrait musical",
          objective:
            "Identifier des éléments sonores dans un extrait et les décrire avec des mots simples.",
          status: "upcoming",
          successCriteria: [
            "Identifie si la musique est rapide ou lente, forte ou douce",
            "Reconnaît au moins un instrument dans l'extrait",
            "Exprime un ressenti en lien avec la musique entendue",
          ],
          parentGuidanceSummary:
            "Votre enfant apprend à écouter la musique attentivement et à mettre des mots sur ce qu'il entend.",
          parentQuickTips: [
            "Écoutez de la musique ensemble et demandez : 'C'est fort ou doux ? Rapide ou lent ?'",
            "Nommez les instruments si vous les reconnaissez.",
          ],
          parentSuccessSigns: [
            "Il décrit la musique avec des mots (joyeux, triste, rapide, calme).",
            "Il reconnaît piano, violon ou tambour.",
          ],
          exercises: [
            {
              instruction:
                "Écoute l'extrait. Coche : rapide ou lent / fort ou doux.",
              difficulty: "decouverte",
              activityType: "qcm",
              validation: "Cases correctement cochées selon l'extrait.",
            },
            {
              instruction:
                "Quel instrument tu reconnais ? Comment il sonne ? Décris en une phrase.",
              difficulty: "entrainement",
              activityType: "free-text",
              validation: "Instrument identifié, description cohérente.",
            },
            {
              instruction:
                "Cette musique t'évoque quelle image ou quelle émotion ? Explique.",
              difficulty: "approfondissement",
              activityType: "free-text",
              validation: "Ressenti exprimé et lié à un élément de la musique.",
            },
          ],
        },
      ],
    ),
  ],
  status: "upcoming",
};

// ══════════════════════════════════════════════════════════════════════════════
// EPS
// ══════════════════════════════════════════════════════════════════════════════

const domainEPS: ProgramDomain = {
  id: "ce1-eps",
  slug: "eps",
  title: "EPS",
  officialLabel: "Education physique et sportive - Cycle 2",
  description: "Activites physiques, jeux collectifs et premiere expression corporelle.",
  subdomains: [
    createSubdomain(
      "eps",
      "activites-physiques",
      "Activites physiques",
      "Ameliorer une performance et adapter son effort.",
      [
        {
          slug: "ameliorer-une-performance-mesuree",
          title: "Améliorer une performance mesurée",
          objective:
            "Réaliser une performance simple et chercher à progresser d'une séance à l'autre.",
          status: "upcoming",
          successCriteria: [
            "Réalise une performance mesurable (saut, course, lancé)",
            "Compare ses résultats d'une séance à l'autre",
            "Identifie ce qui l'a aidé à progresser",
          ],
          parentGuidanceSummary:
            "Votre enfant apprend à mesurer ses progrès sportifs et à chercher à s'améliorer.",
          parentQuickTips: [
            "Notez les performances sur un carnet (longueur d'un saut, temps d'une course).",
            "Valorisez le progrès, pas seulement la performance finale.",
          ],
          parentSuccessSigns: [
            "Il se souvient de sa performance de la séance précédente.",
            "Il explique pourquoi il a mieux réussi.",
          ],
          exercises: [
            {
              instruction:
                "Réalise le saut en longueur. Note ta distance. C'est ta performance de départ.",
              difficulty: "decouverte",
              activityType: "oral",
              validation: "Performance notée correctement.",
            },
            {
              instruction:
                "Après entraînement, refais le saut. As-tu progressé ? De combien ?",
              difficulty: "entrainement",
              activityType: "free-text",
              validation: "Comparaison effectuée avec les deux mesures.",
            },
            {
              instruction:
                "Qu'est-ce qui t'a aidé à progresser ? Explique en une phrase.",
              difficulty: "approfondissement",
              activityType: "free-text",
              validation: "Explication cohérente du facteur de progrès.",
            },
          ],
        },
        {
          slug: "adapter-son-effort-a-la-duree",
          title: "Adapter son effort à la durée",
          objective:
            "Maintenir un effort régulier sur une durée adaptée sans s'épuiser.",
          status: "upcoming",
          successCriteria: [
            "Court à allure régulière sur une durée donnée",
            "Ne part pas trop vite et ne s'arrête pas avant la fin",
            "Explique comment il a géré son effort",
          ],
          parentGuidanceSummary:
            "Votre enfant apprend à doser son énergie pour tenir jusqu'au bout sans s'épuiser.",
          parentQuickTips: [
            "En promenade, proposez de marcher vite 5 minutes sans s'arrêter.",
            "Demandez : 'Est-ce que tu peux encore parler ? C'est le bon rythme.'",
          ],
          parentSuccessSigns: [
            "Il court 5 minutes sans s'arrêter à allure modérée.",
            "Il ajuste spontanément son allure quand il fatigue.",
          ],
          exercises: [
            {
              instruction:
                "Cours pendant 3 minutes sans t'arrêter. Garde un rythme où tu peux encore parler.",
              difficulty: "decouverte",
              activityType: "oral",
              validation: "Course continue de 3 minutes.",
            },
            {
              instruction:
                "Augmente à 5 minutes. Note ton ressenti : facile / moyen / difficile.",
              difficulty: "entrainement",
              activityType: "free-text",
              validation: "Course réalisée, ressenti noté.",
            },
            {
              instruction:
                "Comment adaptes-tu ton allure quand tu commences à te fatiguer ?",
              difficulty: "approfondissement",
              activityType: "oral",
              validation: "Stratégie d'adaptation de l'effort expliquée.",
            },
          ],
        },
      ],
    ),
    createSubdomain(
      "eps",
      "jeux-collectifs",
      "Jeux collectifs",
      "Cooperer et assumer des roles varies dans un jeu collectif.",
      [
        {
          slug: "cooperer-dans-un-jeu-collectif",
          title: "Coopérer dans un jeu collectif",
          objective:
            "Agir avec ses partenaires et tenir compte des adversaires.",
          status: "upcoming",
          successCriteria: [
            "Passe le ballon à un partenaire libre",
            "Tient compte de la position des adversaires",
            "Encourage ses coéquipiers",
          ],
          parentGuidanceSummary:
            "Votre enfant apprend à jouer collectivement : regarder ses partenaires, ne pas jouer seul.",
          parentQuickTips: [
            "Lors de jeux en famille, encouragez les passes plutôt que le jeu individuel.",
            "Demandez : 'Tu aurais pu passer à qui ?'",
          ],
          parentSuccessSigns: [
            "Il fait des passes plutôt que de garder le ballon seul.",
            "Il regarde ses partenaires avant d'agir.",
          ],
          exercises: [
            {
              instruction:
                "Jeu des passes : faites 5 passes sans que l'adversaire intercepte.",
              difficulty: "decouverte",
              activityType: "oral",
              validation: "5 passes réussies en coopération.",
            },
            {
              instruction:
                "Jeu de balle brûlée : repère qui est libre avant de passer.",
              difficulty: "entrainement",
              activityType: "oral",
              validation: "Passe faite vers un partenaire libre.",
            },
            {
              instruction:
                "Après le jeu : qui t'a aidé ? Comment avez-vous organisé votre équipe ?",
              difficulty: "approfondissement",
              activityType: "free-text",
              validation: "Analyse de la coopération d'équipe.",
            },
          ],
        },
        {
          slug: "respecter-des-roles-varies",
          title: "Respecter des rôles variés",
          objective:
            "Assumer les rôles de joueur, d'arbitre ou d'observateur selon la situation.",
          status: "upcoming",
          successCriteria: [
            "Joue son rôle sans empiéter sur celui des autres",
            "Arbitre avec impartialité un moment de jeu",
            "Observe et donne un retour constructif",
          ],
          parentGuidanceSummary:
            "Votre enfant apprend que chaque rôle dans un jeu est important : jouer, arbitrer, observer.",
          parentQuickTips: [
            "Dans un jeu de société, laissez-le arbitrer un tour.",
            "Demandez : 'Qu'as-tu remarqué quand tu regardais jouer les autres ?'",
          ],
          parentSuccessSigns: [
            "Il accepte le rôle d'arbitre et le tient jusqu'au bout.",
            "Il fait un retour sur ce qu'il a observé.",
          ],
          exercises: [
            {
              instruction:
                "Joue le rôle de l'arbitre pendant 5 minutes. Note deux règles que tu as fait respecter.",
              difficulty: "decouverte",
              activityType: "free-text",
              validation: "Deux règles citées correctement.",
            },
            {
              instruction:
                "Observe l'équipe adverse. Que font-ils bien ? Que pourraient-ils améliorer ?",
              difficulty: "entrainement",
              activityType: "free-text",
              validation: "Un point positif et un point à améliorer.",
            },
            {
              instruction:
                "Lequel des trois rôles préfères-tu ? Pourquoi ? Lequel est le plus difficile ?",
              difficulty: "approfondissement",
              activityType: "free-text",
              validation: "Réflexion personnelle argumentée.",
            },
          ],
        },
      ],
    ),
    createSubdomain(
      "eps",
      "expression-corporelle",
      "Expression corporelle",
      "Enchainer des actions pour communiquer et presenter une production.",
      [
        {
          slug: "enchainer-des-actions-pour-communiquer",
          title: "Enchaîner des actions pour communiquer",
          objective:
            "Composer une courte phrase corporelle avec un début, un milieu et une fin.",
          status: "upcoming",
          successCriteria: [
            "Enchaîne trois actions sans s'arrêter",
            "Sa séquence a un début clairement identifiable et une fin",
            "L'intention de communication est lisible pour les observateurs",
          ],
          parentGuidanceSummary:
            "Votre enfant apprend à construire une mini-chorégraphie avec un début, un milieu et une fin.",
          parentQuickTips: [
            "Demandez-lui de vous montrer une phrase de danse ou de mime.",
            "Commentez : 'J'ai bien vu le début et la fin.'",
          ],
          parentSuccessSigns: [
            "Il enchaîne ses actions sans hésitation.",
            "On voit clairement quand il commence et quand il finit.",
          ],
          exercises: [
            {
              instruction:
                "Invente une phrase de 3 mouvements : entrée / action / sortie.",
              difficulty: "decouverte",
              activityType: "oral",
              validation: "Trois mouvements identifiables et enchaînés.",
            },
            {
              instruction:
                "Répète ta phrase 3 fois de suite pour la mémoriser.",
              difficulty: "entrainement",
              activityType: "oral",
              validation: "Phrase identique à chaque répétition.",
            },
            {
              instruction:
                "Montre ta phrase à un camarade. Il doit pouvoir te dire ce que tu voulais exprimer.",
              difficulty: "approfondissement",
              activityType: "oral",
              validation: "Le camarade identifie l'intention.",
            },
          ],
        },
        {
          slug: "presenter-une-production-corporelle",
          title: "Présenter une production corporelle",
          objective:
            "Présenter sa production devant un groupe et accepter le regard des autres.",
          status: "upcoming",
          successCriteria: [
            "Présente sa production sans s'interrompre",
            "Regarde le public pendant la présentation",
            "Accepte un retour positif du groupe",
          ],
          parentGuidanceSummary:
            "Votre enfant apprend à se produire devant les autres avec confiance et à accepter les retours.",
          parentQuickTips: [
            "Encouragez-le à vous montrer sa production à la maison.",
            "Donnez toujours un retour positif avant un conseil d'amélioration.",
          ],
          parentSuccessSigns: [
            "Il va au bout de sa présentation sans s'arrêter.",
            "Il sourit ou reste calme face au regard des autres.",
          ],
          exercises: [
            {
              instruction:
                "Présente ta phrase corporelle à deux camarades. Regarde-les pendant que tu joues.",
              difficulty: "decouverte",
              activityType: "oral",
              validation: "Présentation complète, contact visuel.",
            },
            {
              instruction:
                "Après ta présentation, écoute deux retours. Note ce qui a été bien compris.",
              difficulty: "entrainement",
              activityType: "free-text",
              validation: "Deux retours notés et compris.",
            },
            {
              instruction:
                "Modifie un élément de ta présentation grâce aux retours. Représente.",
              difficulty: "approfondissement",
              activityType: "oral",
              validation: "Modification visible dans la nouvelle présentation.",
            },
          ],
        },
      ],
    ),
  ],
  status: "upcoming",
};

// ══════════════════════════════════════════════════════════════════════════════
// EMC
// ══════════════════════════════════════════════════════════════════════════════

const domainEMC: ProgramDomain = {
  id: "ce1-emc",
  slug: "emc",
  title: "EMC",
  officialLabel: "Enseignement moral et civique - Cycle 2",
  description: "Comprendre les regles, les droits, les devoirs et participer a la vie collective.",
  subdomains: [
    createSubdomain(
      "emc",
      "vie-collective",
      "Vie collective",
      "Comprendre l'utilite des regles et participer aux decisions collectives.",
      [
        {
          slug: "comprendre-l-utilite-d-une-regle",
          title: "Comprendre l'utilité d'une règle",
          objective:
            "Expliquer pourquoi une règle existe et ce qui se passerait sans elle.",
          status: "upcoming",
          successCriteria: [
            "Explique l'utilité d'une règle de classe avec ses mots",
            "Imagine ce qui se passerait sans cette règle",
            "Propose une règle utile au groupe",
          ],
          parentGuidanceSummary:
            "Votre enfant apprend que les règles protègent et organisent la vie ensemble, elles ne sont pas arbitraires.",
          parentQuickTips: [
            "Demandez : 'Pourquoi on ne court pas dans le couloir à l'école ?'",
            "Discutez des règles à la maison : pourquoi elles existent.",
          ],
          parentSuccessSigns: [
            "Il explique une règle sans se limiter à 'parce que c'est la règle'.",
            "Il comprend qu'une règle protège tout le monde.",
          ],
          exercises: [
            {
              instruction:
                "Lis cette règle : 'On lève la main avant de parler.' Pourquoi existe-t-elle ?",
              difficulty: "decouverte",
              activityType: "free-text",
              validation: "Justification valide (tout le monde peut parler, pas de désordre).",
            },
            {
              instruction:
                "Que se passerait-il si personne ne respectait la règle du silence à la bibliothèque ?",
              difficulty: "entrainement",
              activityType: "free-text",
              validation: "Conséquences décrites de façon cohérente.",
            },
            {
              instruction:
                "Invente une nouvelle règle pour ta classe. Explique à quoi elle sert.",
              difficulty: "approfondissement",
              activityType: "free-text",
              validation: "Règle sensée avec justification.",
            },
          ],
        },
        {
          slug: "participer-a-une-decision-collective",
          title: "Participer à une décision collective",
          objective:
            "Exprimer son avis et prendre part à un vote ou un choix de groupe.",
          status: "upcoming",
          successCriteria: [
            "Exprime son avis de façon respectueuse",
            "Écoute l'avis des autres sans les interrompre",
            "Accepte le résultat d'un vote, même s'il est différent de son choix",
          ],
          parentGuidanceSummary:
            "Votre enfant apprend à participer à des décisions collectives et à accepter la démocratie du groupe.",
          parentQuickTips: [
            "Lors de choix familiaux, laissez-le voter et expliquer son choix.",
            "Si son choix ne passe pas : 'C'est le choix du groupe, et c'est important de le respecter.'",
          ],
          parentSuccessSigns: [
            "Il attend son tour pour parler en réunion de classe.",
            "Il accepte une décision collective sans protestations excessives.",
          ],
          exercises: [
            {
              instruction:
                "Le groupe doit choisir une activité. Donne ton avis en une phrase et explique pourquoi.",
              difficulty: "decouverte",
              activityType: "oral",
              validation: "Avis exprimé avec une justification.",
            },
            {
              instruction:
                "Vote avec ta classe. Entoure l'option choisie par la majorité.",
              difficulty: "entrainement",
              activityType: "qcm",
              validation: "Option majoritaire correctement identifiée.",
            },
            {
              instruction:
                "La décision n'est pas celle que tu voulais. Comment tu te sens ? Comment tu vas agir ?",
              difficulty: "approfondissement",
              activityType: "free-text",
              validation: "Expression des émotions + comportement respectueux.",
            },
          ],
        },
      ],
    ),
    createSubdomain(
      "emc",
      "droits-et-devoirs",
      "Droits et devoirs",
      "Distinguer droits et devoirs et identifier des actions responsables.",
      [
        {
          slug: "distinguer-droit-et-devoir",
          title: "Distinguer un droit d'un devoir",
          objective:
            "Donner des exemples de droits et de devoirs dans la vie de la classe.",
          status: "upcoming",
          successCriteria: [
            "Donne un exemple de droit (ce qu'on peut faire)",
            "Donne un exemple de devoir (ce qu'on doit faire)",
            "Explique la différence entre les deux avec ses mots",
          ],
          parentGuidanceSummary:
            "Votre enfant apprend la différence entre ce à quoi il a droit et ce qu'il doit faire.",
          parentQuickTips: [
            "Exemples simples : 'Tu as le droit de jouer. Tu as le devoir de ranger.'",
            "Demandez : 'C'est un droit ou un devoir de manger à l'heure ?'",
          ],
          parentSuccessSigns: [
            "Il distingue 'j'ai le droit de' et 'je dois'.",
            "Il donne des exemples pertinents de sa vie scolaire.",
          ],
          exercises: [
            {
              instruction:
                "Classe ces exemples dans le bon tableau : droit / devoir.",
              difficulty: "decouverte",
              activityType: "matching",
              validation: "Tous les exemples correctement classés.",
            },
            {
              instruction:
                "Écris un droit et un devoir que tu as à l'école.",
              difficulty: "entrainement",
              activityType: "free-text",
              validation: "Un droit et un devoir valides.",
            },
            {
              instruction:
                "Peut-on avoir des droits sans avoir de devoirs ? Explique ta réponse.",
              difficulty: "approfondissement",
              activityType: "free-text",
              validation: "Réflexion argumentée sur le lien droits-devoirs.",
            },
          ],
        },
        {
          slug: "identifier-des-actions-responsables",
          title: "Identifier des actions responsables",
          objective:
            "Proposer une action concrète utile au groupe ou à l'environnement proche.",
          status: "upcoming",
          successCriteria: [
            "Identifie une action utile au groupe (ramasser un papier, aider un camarade)",
            "Explique en quoi cette action est responsable",
            "Met en œuvre une action responsable dans la classe",
          ],
          parentGuidanceSummary:
            "Votre enfant apprend qu'être responsable, c'est agir pour le bien commun, pas seulement pour soi.",
          parentQuickTips: [
            "Confiez-lui une petite responsabilité à la maison (arroser une plante, trier les déchets).",
            "Valorisez les gestes responsables qu'il fait spontanément.",
          ],
          parentSuccessSigns: [
            "Il propose spontanément d'aider sans qu'on le lui demande.",
            "Il explique pourquoi son action aide le groupe.",
          ],
          exercises: [
            {
              instruction:
                "Entoure les actions responsables parmi les images proposées.",
              difficulty: "decouverte",
              activityType: "qcm",
              validation: "Actions responsables correctement identifiées.",
            },
            {
              instruction:
                "Propose une action responsable que tu pourrais faire cette semaine à l'école.",
              difficulty: "entrainement",
              activityType: "free-text",
              validation: "Action concrète et réalisable proposée.",
            },
            {
              instruction:
                "Après avoir réalisé ton action, explique ce qu'elle a changé pour le groupe.",
              difficulty: "approfondissement",
              activityType: "free-text",
              validation: "Impact de l'action décrit de façon cohérente.",
            },
          ],
        },
      ],
    ),
  ],
  status: "upcoming",
};

// ══════════════════════════════════════════════════════════════════════════════
// ARBRE PRINCIPAL + EXPORTS
// ══════════════════════════════════════════════════════════════════════════════

export const ce1LearningTree: AcademyLevelProgram = {
  levelSlug: "ce1",
  label: "CE1",
  cycle: "cycle-2",
  stage: "primaire",
  characterLink: {
    characterSlug: "gaston",
    name: "Gaston",
    roleHint:
      "Gaston accompagne la consolidation de la lecture, de l'ecriture et du raisonnement.",
  },
  domains: [
    domainFrancais,
    domainMathematiques,
    domainQuestionnerLeMonde,
    domainEnseignementsArtistiques,
    domainEPS,
    domainEMC,
  ],
};

export function getCe1Domain(domainSlug: string) {
  return ce1LearningTree.domains.find((d) => d.slug === domainSlug);
}

export function getCe1Subdomain(domainSlug: string, subdomainSlug: string) {
  return getCe1Domain(domainSlug)?.subdomains.find(
    (s) => s.slug === subdomainSlug,
  );
}

export function getCe1Lesson(
  domainSlug: string,
  subdomainSlug: string,
  lessonSlug: string,
) {
  return getCe1Subdomain(domainSlug, subdomainSlug)?.lessons.find(
    (l) => l.slug === lessonSlug,
  );
}

export function getCe1LessonById(lessonId: string) {
  for (const domain of ce1LearningTree.domains) {
    for (const subdomain of domain.subdomains) {
      const found = subdomain.lessons.find((l) => l.id === lessonId);
      if (found) return found;
    }
  }
  return undefined;
}

export type Ce1SubjectTree = {
  place: { label: string };
  guides: { id: string; name: string }[];
  domains: {
    id: string;
    title: string;
    subdomains: {
      id: string;
      title: string;
      items: {
        id: string;
        title: string;
        description?: string;
        status: ProgramStatus;
        href?: string;
      }[];
    }[];
  }[];
};

export type Ce1SequenceEntry = {
  id: string;
  title: string;
  domain: string;
  subdomain: string;
  skill: string;
  status: ProgramStatus;
};

export function getCe1SubjectTree(subjectSlug: string): Ce1SubjectTree | undefined {
  const domain = ce1LearningTree.domains.find((d) => d.slug === subjectSlug);
  if (!domain) return undefined;

  return {
    place: { label: "Cycle 2 · Primaire" },
    guides: [],
    domains: [
      {
        id: domain.id,
        title: domain.title,
        subdomains: domain.subdomains.map((subdomain) => ({
          id: subdomain.id,
          title: subdomain.title,
          items: subdomain.lessons.map((lesson) => ({
            id: lesson.id,
            title: lesson.title,
            description: lesson.objective,
            status: lesson.status,
          })),
        })),
      },
    ],
  };
}

export function getCe1Sequences(subjectSlug: string): Ce1SequenceEntry[] {
  const domain = ce1LearningTree.domains.find((d) => d.slug === subjectSlug);
  if (!domain) return [];

  return domain.subdomains.flatMap((subdomain) =>
    subdomain.lessons.map((lesson) => ({
      id: lesson.id,
      title: lesson.title,
      domain: domain.title,
      subdomain: subdomain.title,
      skill: lesson.objective,
      status: lesson.status,
    })),
  );
}
