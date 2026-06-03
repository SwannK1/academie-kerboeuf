// Carte du programme CM2 — Cycle 3, primaire.
// Structure : matière → domaine → sous-domaine → séquence-compétence.
// Le site organise ; les PDF enseignent.
// Aucun contenu pédagogique complet : uniquement objectifs observables,
// critères courts et ressources PDF prévues sans href.

import type { CurriculumLevelMap } from "@/content/curriculum-map-types";
import type { ResourceSlot } from "@/content/learning-architecture-types";

const PLANNED_PDF_RESOURCES: ResourceSlot[] = [
  {
    kind: "lesson-pdf",
    label: "Leçon PDF",
    resource: { kind: "lesson-pdf", label: "Leçon PDF", status: "planned" },
  },
  {
    kind: "exercises-pdf",
    label: "Exercices PDF",
    resource: {
      kind: "exercises-pdf",
      label: "Exercices PDF",
      status: "planned",
    },
  },
  {
    kind: "correction-pdf",
    label: "Correction PDF",
    resource: {
      kind: "correction-pdf",
      label: "Correction PDF",
      status: "planned",
    },
  },
  {
    kind: "assessment-pdf",
    label: "Évaluation PDF",
    resource: {
      kind: "assessment-pdf",
      label: "Évaluation PDF",
      status: "planned",
    },
  },
  {
    kind: "projectable-pdf",
    label: "Support projetable",
    resource: {
      kind: "projectable-pdf",
      label: "Support projetable",
      status: "planned",
    },
  },
];

export const cm2CurriculumLevelMap: CurriculumLevelMap = {
  levelSlug: "cm2",
  domains: [
    {
      domainSlug: "francais",
      subject: "Français",
      label: "Français",
      subdomains: [
        {
          subdomainSlug: "etude-de-la-langue",
          label: "Étude de la langue",
          entries: [
            {
              id: "cm2-fr-edl-passe-simple-entry",
              levelSlug: "cm2",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "etude-de-la-langue",
              title: "Passé simple — formes et emploi",
              officialReference: "Cycle 3 — Étude de la langue",
              observableObjective:
                "L'élève reconnaît et conjugue les verbes du 1er, 2e et 3e groupe au passé simple.",
              successCriteria: [
                "Je reconnais le passé simple dans un texte narratif.",
                "Je conjugue un verbe du 1er groupe au passé simple.",
                "Je conjugue un verbe du 3e groupe courant (être, avoir, venir) au passé simple.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm2-fr-edl-passe-simple",
            },
            {
              id: "cm2-fr-edl-accord-participe-entry",
              levelSlug: "cm2",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "etude-de-la-langue",
              title: "Accord du participe passé avec être et avoir",
              officialReference: "Cycle 3 — Étude de la langue",
              observableObjective:
                "L'élève accorde le participe passé avec l'auxiliaire être ou n'accorde pas avec avoir selon la règle de base.",
              successCriteria: [
                "Je distingue les auxiliaires être et avoir.",
                "J'accorde le participe passé avec le sujet quand l'auxiliaire est être.",
                "Je n'accorde pas le participe passé avec avoir (cas de base, sans COD antéposé).",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm2-fr-edl-accord-participe",
            },
            {
              id: "cm2-fr-edl-nature-fonction-entry",
              levelSlug: "cm2",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "etude-de-la-langue",
              title: "Nature et fonction : GN, COD, COI",
              officialReference: "Cycle 3 — Étude de la langue",
              observableObjective:
                "L'élève identifie la nature (GN) et la fonction (COD, COI) d'un groupe nominal dans la phrase.",
              successCriteria: [
                "Je repère un groupe nominal dans une phrase.",
                "Je distingue le COD du COI à l'aide des questions (quoi ? / à qui ?).",
                "Je justifie la fonction en posant la question appropriée.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm2-fr-edl-nature-fonction",
            },
          ],
        },
        {
          subdomainSlug: "lecture-comprehension",
          label: "Lecture et compréhension",
          entries: [
            {
              id: "cm2-fr-lc-implicite-entry",
              levelSlug: "cm2",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "lecture-comprehension",
              title: "Comprendre l'implicite et les sous-entendus",
              officialReference: "Cycle 3 — Lecture et compréhension de l'écrit",
              observableObjective:
                "L'élève interprète ce qu'un texte laisse entendre sans le dire et justifie avec des indices précis.",
              successCriteria: [
                "Je repère une information non dite dans le texte.",
                "Je cite les indices qui me permettent de l'inférer.",
                "Je formule le sous-entendu en une phrase justifiée.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm2-fr-lc-implicite",
            },
          ],
        },
        {
          subdomainSlug: "ecriture",
          label: "Écriture",
          entries: [
            {
              id: "cm2-fr-ec-texte-argumentatif-entry",
              levelSlug: "cm2",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "ecriture",
              title: "Rédiger un texte argumentatif court",
              officialReference: "Cycle 3 — Écriture",
              observableObjective:
                "L'élève rédige un texte court qui défend un point de vue avec au moins deux arguments illustrés d'exemples.",
              successCriteria: [
                "J'annonce clairement mon point de vue.",
                "Je donne au moins deux arguments distincts.",
                "J'illustre chaque argument par un exemple.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm2-fr-ec-texte-argumentatif",
            },
          ],
        },
      ],
    },
    {
      domainSlug: "mathematiques",
      subject: "Mathématiques",
      label: "Mathématiques",
      subdomains: [
        {
          subdomainSlug: "numeration",
          label: "Numération",
          entries: [
            {
              id: "cm2-ma-num-decimaux-entry",
              levelSlug: "cm2",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "numeration",
              title: "Nombres décimaux — lire, écrire, comparer",
              officialReference: "Cycle 3 — Nombres et calculs",
              observableObjective:
                "L'élève lit, écrit et compare des nombres décimaux en s'appuyant sur la valeur positionnelle des chiffres.",
              successCriteria: [
                "Je lis un nombre décimal et je nomme chaque chiffre par sa position.",
                "J'écris en chiffres un nombre décimal dicté à l'oral.",
                "Je compare deux nombres décimaux et je justifie.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm2-ma-num-decimaux",
            },
            {
              id: "cm2-ma-num-fractions-decimaux-entry",
              levelSlug: "cm2",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "numeration",
              title: "Fractions et décimaux — équivalences",
              officialReference: "Cycle 3 — Nombres et calculs",
              observableObjective:
                "L'élève passe d'une fraction simple à l'écriture décimale et inversement.",
              successCriteria: [
                "Je convertis une fraction à dénominateur 10 ou 100 en décimal.",
                "J'écris un décimal simple sous forme de fraction.",
                "Je place une fraction ou un décimal sur une droite graduée.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm2-ma-num-fractions-decimaux",
            },
          ],
        },
        {
          subdomainSlug: "calcul-pose",
          label: "Calcul posé",
          entries: [
            {
              id: "cm2-ma-cal-operations-decimaux-entry",
              levelSlug: "cm2",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "calcul-pose",
              title: "Opérations sur les décimaux",
              officialReference: "Cycle 3 — Nombres et calculs",
              observableObjective:
                "L'élève pose et calcule des additions, soustractions et multiplications impliquant des nombres décimaux.",
              successCriteria: [
                "J'aligne les virgules lors de la pose de l'opération.",
                "Je calcule une addition ou soustraction de décimaux posée.",
                "Je pose et calcule une multiplication par un entier avec un résultat décimal.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm2-ma-cal-operations-decimaux",
            },
          ],
        },
        {
          subdomainSlug: "grandeurs-mesures",
          label: "Grandeurs et mesures",
          entries: [
            {
              id: "cm2-ma-gm-aires-entry",
              levelSlug: "cm2",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "grandeurs-mesures",
              title: "Aire du rectangle et du triangle",
              officialReference: "Cycle 3 — Grandeurs et mesures",
              observableObjective:
                "L'élève calcule l'aire d'un rectangle et d'un triangle en appliquant les formules.",
              successCriteria: [
                "J'identifie la base et la hauteur d'un rectangle ou d'un triangle.",
                "J'applique la formule de l'aire du rectangle (L × l).",
                "J'applique la formule de l'aire du triangle (base × hauteur ÷ 2).",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm2-ma-gm-aires",
            },
          ],
        },
        {
          subdomainSlug: "geometrie",
          label: "Géométrie",
          entries: [
            {
              id: "cm2-ma-geo-symetrie-axiale-entry",
              levelSlug: "cm2",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "geometrie",
              title: "Symétrie axiale",
              officialReference: "Cycle 3 — Espace et géométrie",
              observableObjective:
                "L'élève reconnaît et construit le symétrique d'une figure par rapport à un axe.",
              successCriteria: [
                "Je reconnais si une figure est symétrique par rapport à un axe donné.",
                "Je construis le symétrique d'un point par rapport à un axe.",
                "Je trace le symétrique d'une figure simple à l'aide de la règle et de l'équerre.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm2-ma-geo-symetrie-axiale",
            },
            {
              id: "cm2-ma-geo-agrandissement-reduction-entry",
              levelSlug: "cm2",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "geometrie",
              title: "Reproduire une figure à une échelle donnée",
              officialReference: "Cycle 3 — Espace et géométrie",
              observableObjective:
                "L'élève agrandit ou réduit une figure en appliquant un coefficient.",
              successCriteria: [
                "Je comprends ce que signifie doubler ou réduire de moitié.",
                "Je reproduis la figure en respectant les proportions.",
                "Je vérifie la cohérence du résultat.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm2-ma-geo-agrandissement-reduction",
            },
          ],
        },
        {
          subdomainSlug: "problemes",
          label: "Résolution de problèmes",
          entries: [
            {
              id: "cm2-ma-prob-proportionnalite-entry",
              levelSlug: "cm2",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "problemes",
              title: "Résoudre un problème de proportionnalité simple",
              officialReference: "Cycle 3 — Nombres et calculs",
              observableObjective:
                "L'élève identifie une situation de proportionnalité et calcule la valeur manquante.",
              successCriteria: [
                "Je repère les grandeurs proportionnelles.",
                "J'utilise le coefficient ou la règle de trois.",
                "Je vérifie la cohérence du résultat.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm2-ma-prob-proportionnalite",
            },
          ],
        },
      ],
    },
    {
      domainSlug: "histoire-geographie",
      subject: "Histoire-Géographie",
      label: "Histoire-Géographie",
      subdomains: [
        {
          subdomainSlug: "histoire-moderne",
          label: "Histoire moderne",
          entries: [
            {
              id: "cm2-hi-mod-revolution-republique-entry",
              levelSlug: "cm2",
              subject: "Histoire-Géographie",
              domainSlug: "histoire-geographie",
              subdomainSlug: "histoire-moderne",
              title: "Comprendre la Révolution française et la naissance de la République",
              officialReference: "Cycle 3 — Histoire",
              observableObjective:
                "L'élève explique les causes de la Révolution française et ses conséquences sur l'organisation politique.",
              successCriteria: [
                "Je cite une cause de la Révolution.",
                "Je décris un événement clé.",
                "J'explique ce qu'est une République.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm2-hi-mod-revolution-republique",
            },
            {
              id: "cm2-hi-mod-xixe-xxe-siecle-entry",
              levelSlug: "cm2",
              subject: "Histoire-Géographie",
              domainSlug: "histoire-geographie",
              subdomainSlug: "histoire-moderne",
              title: "Situer les grandes transformations du XIXe et XXe siècle",
              officialReference: "Cycle 3 — Histoire",
              observableObjective:
                "L'élève place sur une frise les grandes ruptures historiques des XIXe et XXe siècles.",
              successCriteria: [
                "Je repère une révolution industrielle, une guerre mondiale.",
                "Je place ces événements sur une frise.",
                "Je décris une transformation sociale ou technique.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm2-hi-mod-xixe-xxe-siecle",
            },
          ],
        },
        {
          subdomainSlug: "geographie-france-europe",
          label: "Géographie — France et Europe",
          entries: [
            {
              id: "cm2-geo-france-territoires-entry",
              levelSlug: "cm2",
              subject: "Histoire-Géographie",
              domainSlug: "histoire-geographie",
              subdomainSlug: "geographie-france-europe",
              title: "Décrire les grands ensembles territoriaux de la France",
              officialReference: "Cycle 3 — Géographie",
              observableObjective:
                "L'élève localise et décrit les reliefs, bassins fluviaux et régions de France.",
              successCriteria: [
                "Je localise les massifs montagneux principaux.",
                "Je nomme les grands fleuves.",
                "Je situe une région sur la carte.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm2-geo-france-territoires",
            },
            {
              id: "cm2-geo-union-europeenne-entry",
              levelSlug: "cm2",
              subject: "Histoire-Géographie",
              domainSlug: "histoire-geographie",
              subdomainSlug: "geographie-france-europe",
              title: "Identifier l'Union européenne et ses caractéristiques",
              officialReference: "Cycle 3 — Géographie",
              observableObjective:
                "L'élève localise des pays de l'UE et décrit les principes de fonctionnement.",
              successCriteria: [
                "Je localise au moins cinq pays de l'UE.",
                "Je cite un exemple de coopération européenne.",
                "Je comprends que l'UE est une union d'États.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm2-geo-union-europeenne",
            },
          ],
        },
        {
          subdomainSlug: "lecture-documents-historiques",
          label: "Lecture de documents historiques",
          entries: [
            {
              id: "cm2-hi-doc-analyser-source-entry",
              levelSlug: "cm2",
              subject: "Histoire-Géographie",
              domainSlug: "histoire-geographie",
              subdomainSlug: "lecture-documents-historiques",
              title: "Analyser une source historique simple",
              officialReference: "Cycle 3 — Histoire",
              observableObjective:
                "L'élève identifie la nature, l'auteur et le contexte d'un document historique.",
              successCriteria: [
                "Je repère la nature du document (texte, image, carte).",
                "Je donne sa date et son auteur si disponible.",
                "Je prélève une information pertinente.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm2-hi-doc-analyser-source",
            },
          ],
        },
      ],
    },
    {
      domainSlug: "sciences",
      subject: "Sciences et technologie",
      label: "Sciences et technologie",
      subdomains: [
        {
          subdomainSlug: "vivant",
          label: "Le vivant",
          entries: [
            {
              id: "cm2-sc-vivant-reproduction-entry",
              levelSlug: "cm2",
              subject: "Sciences et technologie",
              domainSlug: "sciences",
              subdomainSlug: "vivant",
              title: "Décrire la reproduction des êtres vivants",
              officialReference: "Cycle 3 — Sciences et technologie",
              observableObjective:
                "L'élève distingue la reproduction sexuée et asexuée et en décrit les étapes principales.",
              successCriteria: [
                "Je distingue reproduction sexuée et asexuée.",
                "Je cite un exemple de chaque.",
                "Je décris une étape de la reproduction sexuée.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm2-sc-vivant-reproduction",
            },
            {
              id: "cm2-sc-vivant-chaines-alimentaires-entry",
              levelSlug: "cm2",
              subject: "Sciences et technologie",
              domainSlug: "sciences",
              subdomainSlug: "vivant",
              title: "Construire et lire une chaîne alimentaire",
              officialReference: "Cycle 3 — Sciences et technologie",
              observableObjective:
                "L'élève représente les relations proie-prédateur dans un écosystème.",
              successCriteria: [
                "Je repère producteur, consommateur et décomposeur.",
                "Je construis une chaîne alimentaire simple.",
                "J'explique l'impact de la disparition d'un maillon.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm2-sc-vivant-chaines-alimentaires",
            },
          ],
        },
        {
          subdomainSlug: "matiere-energie",
          label: "Matière et énergie",
          entries: [
            {
              id: "cm2-sc-me-etats-matiere-entry",
              levelSlug: "cm2",
              subject: "Sciences et technologie",
              domainSlug: "sciences",
              subdomainSlug: "matiere-energie",
              title: "Décrire les changements d'état de la matière",
              officialReference: "Cycle 3 — Sciences et technologie",
              observableObjective:
                "L'élève nomme les changements d'état et les conditions qui les provoquent.",
              successCriteria: [
                "Je nomme les trois états de la matière.",
                "Je cite les six changements d'état.",
                "Je relie chaque changement à une variation de température.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm2-sc-me-etats-matiere",
            },
          ],
        },
        {
          subdomainSlug: "technologie",
          label: "Technologie",
          entries: [
            {
              id: "cm2-sc-tech-concevoir-objet-entry",
              levelSlug: "cm2",
              subject: "Sciences et technologie",
              domainSlug: "sciences",
              subdomainSlug: "technologie",
              title: "Concevoir et réaliser un objet technique simple",
              officialReference: "Cycle 3 — Sciences et technologie",
              observableObjective:
                "L'élève conçoit un objet répondant à un besoin précis et le réalise.",
              successCriteria: [
                "Je formule le besoin et les contraintes.",
                "Je réalise l'objet en suivant un plan.",
                "Je teste et améliore si nécessaire.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm2-sc-tech-concevoir-objet",
            },
          ],
        },
      ],
    },
    {
      domainSlug: "enseignements-artistiques",
      subject: "Enseignements artistiques",
      label: "Enseignements artistiques",
      subdomains: [
        {
          subdomainSlug: "arts-plastiques",
          label: "Arts plastiques",
          entries: [
            {
              id: "cm2-art-ap-projet-artistique-entry",
              levelSlug: "cm2",
              subject: "Enseignements artistiques",
              domainSlug: "enseignements-artistiques",
              subdomainSlug: "arts-plastiques",
              title: "Conduire un projet artistique de la conception à la présentation",
              officialReference: "Cycle 3 — Arts plastiques",
              observableObjective:
                "L'élève planifie, réalise et présente une production en justifiant ses choix.",
              successCriteria: [
                "Je définis une intention avant de produire.",
                "Je réalise la production en faisant des choix réfléchis.",
                "Je présente mon travail en expliquant ma démarche.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm2-art-ap-projet-artistique",
            },
            {
              id: "cm2-art-ap-situer-oeuvre-contexte-entry",
              levelSlug: "cm2",
              subject: "Enseignements artistiques",
              domainSlug: "enseignements-artistiques",
              subdomainSlug: "arts-plastiques",
              title: "Situer une œuvre dans son contexte culturel",
              officialReference: "Cycle 3 — Arts plastiques",
              observableObjective:
                "L'élève relie une œuvre à une époque, un courant ou un artiste.",
              successCriteria: [
                "Je nomme l'auteur et la période.",
                "Je repère les caractéristiques du courant.",
                "Je compare deux œuvres de périodes différentes.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm2-art-ap-situer-oeuvre-contexte",
            },
          ],
        },
        {
          subdomainSlug: "education-musicale",
          label: "Éducation musicale",
          entries: [
            {
              id: "cm2-art-mus-interpreter-oeuvre-entry",
              levelSlug: "cm2",
              subject: "Enseignements artistiques",
              domainSlug: "enseignements-artistiques",
              subdomainSlug: "education-musicale",
              title: "Interpréter une œuvre vocale avec expression",
              officialReference: "Cycle 3 — Éducation musicale",
              observableObjective:
                "L'élève chante une mélodie avec intention musicale et gestion de la voix.",
              successCriteria: [
                "Je respecte justesse et rythme.",
                "J'adapte l'intensité à l'expression voulue.",
                "Je contribue à la cohérence de l'ensemble.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm2-art-mus-interpreter-oeuvre",
            },
            {
              id: "cm2-art-mus-situer-oeuvre-musicale-entry",
              levelSlug: "cm2",
              subject: "Enseignements artistiques",
              domainSlug: "enseignements-artistiques",
              subdomainSlug: "education-musicale",
              title: "Situer une œuvre musicale dans son contexte",
              officialReference: "Cycle 3 — Éducation musicale",
              observableObjective:
                "L'élève relie une œuvre musicale à un genre, une époque ou une culture.",
              successCriteria: [
                "Je nomme le genre et l'époque.",
                "Je repère des caractéristiques stylistiques.",
                "Je compare avec une autre œuvre.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm2-art-mus-situer-oeuvre-musicale",
            },
          ],
        },
      ],
    },
    {
      domainSlug: "eps",
      subject: "EPS",
      label: "EPS",
      subdomains: [
        {
          subdomainSlug: "performance",
          label: "Produire une performance",
          entries: [
            {
              id: "cm2-eps-perf-planifier-entrainement-entry",
              levelSlug: "cm2",
              subject: "EPS",
              domainSlug: "eps",
              subdomainSlug: "performance",
              title: "Planifier et évaluer un entraînement physique",
              officialReference: "Cycle 3 — EPS",
              observableObjective:
                "L'élève se fixe un objectif, planifie des séances et mesure ses progrès.",
              successCriteria: [
                "Je fixe un objectif réaliste.",
                "Je planifie des exercices adaptés.",
                "Je compare mes performances initiale et finale.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm2-eps-perf-planifier-entrainement",
            },
          ],
        },
        {
          subdomainSlug: "jeux-collectifs",
          label: "Jeux collectifs et sports",
          entries: [
            {
              id: "cm2-eps-jeux-concevoir-tactique-entry",
              levelSlug: "cm2",
              subject: "EPS",
              domainSlug: "eps",
              subdomainSlug: "jeux-collectifs",
              title: "Concevoir et mettre en œuvre une tactique collective",
              officialReference: "Cycle 3 — EPS",
              observableObjective:
                "L'élève propose et applique une tactique simple avec son équipe.",
              successCriteria: [
                "Je propose un plan d'action collectif.",
                "Je l'explique à mon équipe.",
                "Je l'applique et l'ajuste en cours de jeu.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm2-eps-jeux-concevoir-tactique",
            },
          ],
        },
        {
          subdomainSlug: "expression-corporelle",
          label: "Expression corporelle",
          entries: [
            {
              id: "cm2-eps-exp-composer-sequence-entry",
              levelSlug: "cm2",
              subject: "EPS",
              domainSlug: "eps",
              subdomainSlug: "expression-corporelle",
              title: "Composer et interpréter une séquence chorégraphique",
              officialReference: "Cycle 3 — EPS",
              observableObjective:
                "L'élève crée une courte séquence dansée avec une intention expressivite et la présente.",
              successCriteria: [
                "Je construis une phrase corporelle avec début et fin.",
                "J'exprime une intention visible.",
                "Je la présente devant le groupe.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm2-eps-exp-composer-sequence",
            },
          ],
        },
      ],
    },
    {
      domainSlug: "emc",
      subject: "EMC",
      label: "EMC",
      subdomains: [
        {
          subdomainSlug: "regles-droit-justice",
          label: "Règles, droit et justice",
          entries: [
            {
              id: "cm2-emc-rdj-valeurs-republique-entry",
              levelSlug: "cm2",
              subject: "EMC",
              domainSlug: "emc",
              subdomainSlug: "regles-droit-justice",
              title: "Expliquer les valeurs de la République française",
              officialReference: "Cycle 3 — EMC",
              observableObjective:
                "L'élève explique ce que signifient Liberté, Égalité et Fraternité dans la vie quotidienne.",
              successCriteria: [
                "Je donne le sens de chaque valeur.",
                "Je cite un exemple concret pour chacune.",
                "Je comprends que ces valeurs s'appliquent à tous.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm2-emc-rdj-valeurs-republique",
            },
            {
              id: "cm2-emc-rdj-droits-enfant-entry",
              levelSlug: "cm2",
              subject: "EMC",
              domainSlug: "emc",
              subdomainSlug: "regles-droit-justice",
              title: "Connaître et défendre les droits de l'enfant",
              officialReference: "Cycle 3 — EMC",
              observableObjective:
                "L'élève cite des droits fondamentaux de l'enfant et explique leur importance.",
              successCriteria: [
                "Je cite trois droits de l'enfant.",
                "J'explique pourquoi ils sont essentiels.",
                "Je comprends que certains enfants ne les ont pas.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm2-emc-rdj-droits-enfant",
            },
          ],
        },
        {
          subdomainSlug: "jugement-engagement",
          label: "Jugement et engagement",
          entries: [
            {
              id: "cm2-emc-je-debat-citoyen-entry",
              levelSlug: "cm2",
              subject: "EMC",
              domainSlug: "emc",
              subdomainSlug: "jugement-engagement",
              title: "Participer à un débat citoyen de façon construite",
              officialReference: "Cycle 3 — EMC",
              observableObjective:
                "L'élève argumente une position citoyenne en tenant compte des points de vue opposés.",
              successCriteria: [
                "Je formule clairement ma position.",
                "Je prends en compte un argument adverse.",
                "Je respecte les règles du débat.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm2-emc-je-debat-citoyen",
            },
          ],
        },
        {
          subdomainSlug: "identite-alterite",
          label: "Identité et altérité",
          entries: [
            {
              id: "cm2-emc-ia-vivre-ensemble-laicite-entry",
              levelSlug: "cm2",
              subject: "EMC",
              domainSlug: "emc",
              subdomainSlug: "identite-alterite",
              title: "Comprendre le principe de laïcité",
              officialReference: "Cycle 3 — EMC",
              observableObjective:
                "L'élève explique ce qu'est la laïcité et son rôle dans le vivre-ensemble.",
              successCriteria: [
                "Je définis la laïcité simplement.",
                "Je cite un exemple de son application à l'école.",
                "Je comprends pourquoi elle protège toutes les croyances.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm2-emc-ia-vivre-ensemble-laicite",
            },
          ],
        },
      ],
    },
  ],
};
