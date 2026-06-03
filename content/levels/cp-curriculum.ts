// Carte du programme CP — Cycle 2, primaire.
// Structure légère : matière → domaine → sous-domaine → compétence attendue.
// Aucun contenu pédagogique complet. Le site organise ; les PDF enseignent.
// Tous les statuts sont "upcoming" : aucun href, aucun lien PDF mort.

import type { CurriculumLevelMap } from "@/content/curriculum-map-types";

export const cpCurriculumLevelMap: CurriculumLevelMap = {
  levelSlug: "cp",
  domains: [
    {
      domainSlug: "francais",
      subject: "Français",
      label: "Français",
      subdomains: [
        {
          subdomainSlug: "lecture-comprehension",
          label: "Lecture et compréhension",
          entries: [
            {
              id: "cp-fr-lc-comprendre-phrase",
              levelSlug: "cp",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "lecture-comprehension",
              title: "Comprendre une phrase simple lue ou entendue",
              observableObjective:
                "L'élève identifie de qui ou de quoi parle une phrase simple.",
              successCriteria: [
                "Je repère le personnage ou le sujet de la phrase.",
                "Je retrouve une information écrite clairement.",
                "Je réponds par une phrase courte.",
              ],
              status: "upcoming",
              competencyId: "cp-fr-lc-comprendre-phrase-simple",
            },
            {
              id: "cp-fr-lc-repondre-question",
              levelSlug: "cp",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "lecture-comprehension",
              title: "Répondre à une question sur un texte court",
              observableObjective:
                "L'élève retrouve une information dans un texte de quelques phrases pour répondre à une question simple.",
              successCriteria: [
                "Je lis la question avant de chercher.",
                "Je repère le mot ou la phrase qui contient la réponse.",
                "Je réponds avec une information du texte.",
              ],
              status: "upcoming",
            },
            {
              id: "cp-fr-lc-reperer-personnage",
              levelSlug: "cp",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "lecture-comprehension",
              title: "Identifier les personnages d'un texte court",
              observableObjective:
                "L'élève nomme les personnages présents dans un texte narratif court.",
              successCriteria: [
                "Je distingue les personnages des objets ou des lieux.",
                "Je cite au moins un personnage en le nommant.",
              ],
              status: "upcoming",
            },
            {
              id: "cp-fr-lc-comprendre-texte-ecoute",
              levelSlug: "cp",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "lecture-comprehension",
              title: "Comprendre un texte lu à voix haute",
              observableObjective:
                "L'élève reformule avec ses mots l'essentiel d'un texte écouté.",
              successCriteria: [
                "J'écoute sans interrompre.",
                "Je peux dire ce dont parle le texte.",
                "Je retiens au moins un événement ou une information.",
              ],
              status: "upcoming",
            },
          ],
        },
        {
          subdomainSlug: "ecriture",
          label: "Écriture",
          entries: [
            {
              id: "cp-fr-ec-copier-phrase",
              levelSlug: "cp",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "ecriture",
              title: "Copier une phrase modèle sans erreur",
              observableObjective:
                "L'élève recopie une phrase courte en respectant les majuscules, la ponctuation et les espaces.",
              successCriteria: [
                "Je commence par la majuscule.",
                "Je respecte les espaces entre les mots.",
                "Je termine par le point.",
              ],
              status: "upcoming",
            },
            {
              id: "cp-fr-ec-ecrire-mot-syllabique",
              levelSlug: "cp",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "ecriture",
              title: "Écrire un mot en le segmentant en syllabes",
              observableObjective:
                "L'élève découpe un mot connu en syllabes pour l'écrire lettre par lettre.",
              successCriteria: [
                "Je frappe les syllabes avant d'écrire.",
                "J'écris une lettre pour chaque son repéré.",
              ],
              status: "upcoming",
            },
            {
              id: "cp-fr-ec-produire-phrase-dictee",
              levelSlug: "cp",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "ecriture",
              title: "Écrire une phrase simple sous la dictée",
              observableObjective:
                "L'élève écrit une phrase courte dictée en encodant les sons entendus.",
              successCriteria: [
                "Je note un graphème pour chaque son.",
                "Je laisse un espace entre chaque mot.",
                "Je place la majuscule et le point.",
              ],
              status: "upcoming",
            },
          ],
        },
        {
          subdomainSlug: "etude-de-la-langue",
          label: "Étude de la langue",
          entries: [
            {
              id: "cp-fr-edl-correspondance-son-grapheme",
              levelSlug: "cp",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "etude-de-la-langue",
              title: "Associer un son à un graphème simple",
              observableObjective:
                "L'élève relie un son entendu à la lettre ou au groupe de lettres qui le représente.",
              successCriteria: [
                "Je connais les correspondances des lettres simples étudiées.",
                "Je peux pointer la lettre quand j'entends le son.",
              ],
              status: "upcoming",
            },
            {
              id: "cp-fr-edl-segmenter-syllabes",
              levelSlug: "cp",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "etude-de-la-langue",
              title: "Segmenter un mot en syllabes orales",
              observableObjective:
                "L'élève décompose un mot prononcé en syllabes en frappant dans les mains.",
              successCriteria: [
                "Je frappe autant de fois qu'il y a de syllabes.",
                "Je compte les syllabes d'un mot de 2 à 4 syllabes.",
              ],
              status: "upcoming",
            },
            {
              id: "cp-fr-edl-reconnaitre-mot-phrase",
              levelSlug: "cp",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "etude-de-la-langue",
              title: "Distinguer un mot d'une phrase",
              observableObjective:
                "L'élève différencie un mot isolé d'une phrase complète à l'oral et à l'écrit.",
              successCriteria: [
                "Je sais qu'un mot est une unité et une phrase est une suite de mots.",
                "Je repère la majuscule et le point d'une phrase écrite.",
              ],
              status: "upcoming",
            },
          ],
        },
        {
          subdomainSlug: "langage-oral",
          label: "Langage oral",
          entries: [
            {
              id: "cp-fr-or-ecouter-consigne",
              levelSlug: "cp",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "langage-oral",
              title: "Écouter et mémoriser une consigne simple",
              observableObjective:
                "L'élève retient une consigne orale en deux parties et l'applique sans qu'on la répète.",
              successCriteria: [
                "J'écoute sans interrompre.",
                "Je répète la consigne avec mes mots si on me le demande.",
                "Je réalise les deux étapes dans l'ordre.",
              ],
              status: "upcoming",
            },
            {
              id: "cp-fr-or-decrire-image",
              levelSlug: "cp",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "langage-oral",
              title: "Décrire une image ou une scène",
              observableObjective:
                "L'élève formule deux ou trois phrases pour décrire ce qu'il voit sur une image.",
              successCriteria: [
                "Je dis ce que je vois avec des mots précis.",
                "Je construis une phrase avec un sujet et un verbe.",
                "Je ne me limite pas à 'il y a...'.",
              ],
              status: "upcoming",
            },
            {
              id: "cp-fr-or-raconter-evenement",
              levelSlug: "cp",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "langage-oral",
              title: "Raconter un événement vécu dans l'ordre",
              observableObjective:
                "L'élève raconte un événement en respectant la chronologie (d'abord, ensuite, enfin).",
              successCriteria: [
                "Je commence par le début.",
                "J'utilise un mot de liaison (ensuite, puis, après).",
                "Je raconte en phrases complètes.",
              ],
              status: "upcoming",
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
          subdomainSlug: "nombres-calcul",
          label: "Nombres et calculs",
          entries: [
            {
              id: "cp-ma-nc-denombrer-collection",
              levelSlug: "cp",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "nombres-calcul",
              title: "Dénombrer une collection jusqu'à 20",
              observableObjective:
                "L'élève compte une collection d'objets en utilisant une stratégie de dénombrement.",
              successCriteria: [
                "Je compte chaque objet une seule fois.",
                "Je donne le bon nombre total.",
                "Je peux vérifier en recomptant.",
              ],
              status: "upcoming",
            },
            {
              id: "cp-ma-nc-lire-ecrire-nombres-20",
              levelSlug: "cp",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "nombres-calcul",
              title: "Lire et écrire les nombres jusqu'à 20",
              observableObjective:
                "L'élève lit, écrit et représente les nombres entiers de 0 à 20.",
              successCriteria: [
                "Je lis un nombre écrit en chiffres.",
                "J'écris en chiffres un nombre dit à l'oral.",
                "Je compare deux nombres avec < ou >.",
              ],
              status: "upcoming",
            },
            {
              id: "cp-ma-nc-calculer-addition-soustraction",
              levelSlug: "cp",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "nombres-calcul",
              title: "Calculer une addition ou une soustraction simple",
              observableObjective:
                "L'élève calcule le résultat d'une addition ou d'une soustraction avec des petits nombres.",
              successCriteria: [
                "Je calcule une somme en combinant deux collections.",
                "Je calcule une différence en ôtant une partie.",
                "Je vérifie mon résultat avec les doigts ou le matériel.",
              ],
              status: "upcoming",
            },
            {
              id: "cp-ma-nc-decouvrir-dizaine",
              levelSlug: "cp",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "nombres-calcul",
              title: "Comprendre la dizaine comme groupement de dix",
              observableObjective:
                "L'élève groupe par dix pour compter plus efficacement.",
              successCriteria: [
                "Je regroupe dix objets en un paquet.",
                "Je dis combien de dizaines et d'unités.",
                "Je retrouve le nombre total.",
              ],
              status: "upcoming",
            },
          ],
        },
        {
          subdomainSlug: "grandeurs-mesures",
          label: "Grandeurs et mesures",
          entries: [
            {
              id: "cp-ma-gm-comparer-longueurs",
              levelSlug: "cp",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "grandeurs-mesures",
              title: "Comparer des longueurs directement ou par report",
              observableObjective:
                "L'élève compare deux longueurs en les superposant ou en utilisant un objet intermédiaire.",
              successCriteria: [
                "Je dis lequel est plus long ou plus court.",
                "Je justifie en montrant comment j'ai comparé.",
                "J'utilise un vocabulaire correct (plus long, plus court, pareil).",
              ],
              status: "upcoming",
            },
            {
              id: "cp-ma-gm-reperer-heure-ronde",
              levelSlug: "cp",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "grandeurs-mesures",
              title: "Repérer l'heure juste sur une horloge",
              observableObjective:
                "L'élève lit l'heure pile sur une horloge analogique simple.",
              successCriteria: [
                "Je distingue la petite et la grande aiguille.",
                "Je lis une heure juste (1 heure, 2 heures…).",
                "Je relie une heure à un moment de la journée.",
              ],
              status: "upcoming",
            },
          ],
        },
        {
          subdomainSlug: "espace-geometrie",
          label: "Espace et géométrie",
          entries: [
            {
              id: "cp-ma-eg-se-reperer-espace",
              levelSlug: "cp",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "espace-geometrie",
              title: "Se repérer dans l'espace avec un vocabulaire précis",
              observableObjective:
                "L'élève utilise des mots de position pour décrire ou retrouver un emplacement.",
              successCriteria: [
                "J'utilise devant, derrière, à gauche, à droite, au-dessus, en dessous.",
                "Je décris la position d'un objet par rapport à un autre.",
                "Je retrouve un objet à partir d'une description.",
              ],
              status: "upcoming",
            },
            {
              id: "cp-ma-eg-reconnaitre-formes",
              levelSlug: "cp",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "espace-geometrie",
              title: "Reconnaître et nommer des formes simples",
              observableObjective:
                "L'élève identifie et nomme les formes géométriques usuelles parmi des objets.",
              successCriteria: [
                "Je reconnais un carré, un rectangle, un triangle et un cercle.",
                "Je nomme la forme vue.",
                "Je retrouve cette forme dans l'environnement.",
              ],
              status: "upcoming",
            },
          ],
        },
      ],
    },
    {
      domainSlug: "questionner-le-monde",
      subject: "Questionner le monde",
      label: "Questionner le monde",
      subdomains: [
        {
          subdomainSlug: "temps",
          label: "Le temps",
          entries: [
            {
              id: "cp-qlm-tp-ordonner-moments-journee",
              levelSlug: "cp",
              subject: "Questionner le monde",
              domainSlug: "questionner-le-monde",
              subdomainSlug: "temps",
              title: "Ordonner les moments de la journée et de la semaine",
              observableObjective:
                "L'élève place des moments dans l'ordre chronologique de la journée et de la semaine.",
              successCriteria: [
                "Je nomme les moments de la journée dans l'ordre.",
                "Je cite les jours de la semaine dans l'ordre.",
                "Je repère avant et après dans une suite d'événements.",
              ],
              status: "upcoming",
            },
            {
              id: "cp-qlm-tp-distinguer-passe-present",
              levelSlug: "cp",
              subject: "Questionner le monde",
              domainSlug: "questionner-le-monde",
              subdomainSlug: "temps",
              title: "Distinguer passé et présent dans la vie quotidienne",
              observableObjective:
                "L'élève distingue ce qui appartient au présent et ce qui appartient au passé proche.",
              successCriteria: [
                "Je dis si un événement est passé ou en train de se passer.",
                "Je repère un indice qui indique le passé.",
                "J'utilise hier, aujourd'hui, demain correctement.",
              ],
              status: "upcoming",
            },
          ],
        },
        {
          subdomainSlug: "espace",
          label: "L'espace",
          entries: [
            {
              id: "cp-qlm-es-decrire-son-environnement",
              levelSlug: "cp",
              subject: "Questionner le monde",
              domainSlug: "questionner-le-monde",
              subdomainSlug: "espace",
              title: "Décrire son environnement proche",
              observableObjective:
                "L'élève décrit les principaux lieux de son environnement quotidien.",
              successCriteria: [
                "Je nomme des lieux connus de moi.",
                "Je les situe les uns par rapport aux autres.",
                "Je décris leur utilité.",
              ],
              status: "upcoming",
            },
          ],
        },
        {
          subdomainSlug: "vivant-matiere-objets",
          label: "Vivant, matière et objets",
          entries: [
            {
              id: "cp-qlm-vmo-distinguer-vivant-non-vivant",
              levelSlug: "cp",
              subject: "Questionner le monde",
              domainSlug: "questionner-le-monde",
              subdomainSlug: "vivant-matiere-objets",
              title: "Distinguer vivant et non-vivant",
              observableObjective:
                "L'élève classe des êtres et des objets en vivant ou non-vivant en justifiant.",
              successCriteria: [
                "Je donne un critère du vivant.",
                "Je classe correctement plusieurs exemples.",
                "Je justifie mon classement.",
              ],
              status: "upcoming",
            },
            {
              id: "cp-qlm-vmo-observer-animal-plante",
              levelSlug: "cp",
              subject: "Questionner le monde",
              domainSlug: "questionner-le-monde",
              subdomainSlug: "vivant-matiere-objets",
              title: "Observer et décrire un animal ou une plante",
              observableObjective:
                "L'élève décrit les caractéristiques observables d'un être vivant.",
              successCriteria: [
                "Je note ce que je vois sans inventer.",
                "Je nomme les parties observées.",
                "Je compare deux êtres vivants.",
              ],
              status: "upcoming",
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
              id: "cp-art-ap-explorer-outils",
              levelSlug: "cp",
              subject: "Enseignements artistiques",
              domainSlug: "enseignements-artistiques",
              subdomainSlug: "arts-plastiques",
              title: "Explorer différents outils pour tracer et peindre",
              observableObjective:
                "L'élève essaie plusieurs outils ou matières pour produire des effets variés.",
              successCriteria: [
                "J'utilise au moins deux outils différents.",
                "Je dis ce que j'ai produit avec chaque outil.",
                "Je fais un choix pour créer un effet.",
              ],
              status: "upcoming",
            },
            {
              id: "cp-art-ap-produire-creation-simple",
              levelSlug: "cp",
              subject: "Enseignements artistiques",
              domainSlug: "enseignements-artistiques",
              subdomainSlug: "arts-plastiques",
              title: "Produire une création plastique simple avec intention",
              observableObjective:
                "L'élève réalise une production avec un objectif qu'il peut formuler.",
              successCriteria: [
                "Je sais ce que je veux faire avant de commencer.",
                "Je fais des choix de couleurs ou de formes.",
                "Je peux dire à quoi ressemble ce que j'ai fait.",
              ],
              status: "upcoming",
            },
          ],
        },
        {
          subdomainSlug: "education-musicale",
          label: "Éducation musicale",
          entries: [
            {
              id: "cp-art-mus-chanter-chanson-apprise",
              levelSlug: "cp",
              subject: "Enseignements artistiques",
              domainSlug: "enseignements-artistiques",
              subdomainSlug: "education-musicale",
              title: "Chanter une chanson apprise en mémorisant les paroles",
              observableObjective:
                "L'élève chante une comptine ou chanson apprise en classe en respectant le texte et la mélodie.",
              successCriteria: [
                "Je retiens les paroles.",
                "Je respecte la mélodie.",
                "Je chante avec le groupe.",
              ],
              status: "upcoming",
            },
            {
              id: "cp-art-mus-percevoir-sons",
              levelSlug: "cp",
              subject: "Enseignements artistiques",
              domainSlug: "enseignements-artistiques",
              subdomainSlug: "education-musicale",
              title: "Percevoir et distinguer des sons contrastés",
              observableObjective:
                "L'élève identifie des contrastes sonores (fort/doux, rapide/lent, aigu/grave).",
              successCriteria: [
                "Je reconnais le contraste entendu.",
                "Je l'exprime avec le bon mot.",
                "Je reproduis le contraste avec ma voix ou mon corps.",
              ],
              status: "upcoming",
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
          subdomainSlug: "habiletes-motrices",
          label: "Habiletés motrices",
          entries: [
            {
              id: "cp-eps-hm-courir-sauter-lancer",
              levelSlug: "cp",
              subject: "EPS",
              domainSlug: "eps",
              subdomainSlug: "habiletes-motrices",
              title: "Courir, sauter et lancer en variant les trajectoires",
              observableObjective:
                "L'élève réalise des actions motrices de base en adaptant son geste.",
              successCriteria: [
                "Je cours en adaptant ma vitesse.",
                "Je saute avec ou sans élan.",
                "Je lance vers une cible ou une direction.",
              ],
              status: "upcoming",
            },
            {
              id: "cp-eps-hm-enchainer-actions",
              levelSlug: "cp",
              subject: "EPS",
              domainSlug: "eps",
              subdomainSlug: "habiletes-motrices",
              title: "Enchaîner deux actions motrices sans arrêt",
              observableObjective:
                "L'élève réalise deux gestes à la suite sans s'arrêter entre les deux.",
              successCriteria: [
                "Je prépare le deuxième geste sans m'arrêter.",
                "Je garde l'équilibre entre les deux actions.",
                "Je peux répéter la séquence.",
              ],
              status: "upcoming",
            },
          ],
        },
        {
          subdomainSlug: "jeux-collectifs",
          label: "Jeux collectifs",
          entries: [
            {
              id: "cp-eps-jeux-respecter-regles",
              levelSlug: "cp",
              subject: "EPS",
              domainSlug: "eps",
              subdomainSlug: "jeux-collectifs",
              title: "Respecter les règles d'un jeu collectif simple",
              observableObjective:
                "L'élève participe à un jeu en appliquant les règles expliquées.",
              successCriteria: [
                "Je connais les règles du jeu.",
                "Je respecte la règle en situation.",
                "Je joue avec les autres sans conflits.",
              ],
              status: "upcoming",
            },
          ],
        },
        {
          subdomainSlug: "securite-sante",
          label: "Sécurité et santé",
          entries: [
            {
              id: "cp-eps-ss-respecter-consignes-securite",
              levelSlug: "cp",
              subject: "EPS",
              domainSlug: "eps",
              subdomainSlug: "securite-sante",
              title: "Appliquer les consignes de sécurité en EPS",
              observableObjective:
                "L'élève identifie et respecte une consigne de sécurité donnée avant l'activité.",
              successCriteria: [
                "Je connais la consigne de sécurité.",
                "Je l'applique pendant l'activité.",
                "Je m'arrête si on siffle ou crie stop.",
              ],
              status: "upcoming",
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
          subdomainSlug: "regles-vie-collective",
          label: "Règles et vie collective",
          entries: [
            {
              id: "cp-emc-rvc-comprendre-role-regle",
              levelSlug: "cp",
              subject: "EMC",
              domainSlug: "emc",
              subdomainSlug: "regles-vie-collective",
              title: "Comprendre le rôle d'une règle de vie en classe",
              observableObjective:
                "L'élève explique pourquoi une règle est utile pour vivre ensemble.",
              successCriteria: [
                "Je dis à quoi sert la règle.",
                "Je respecte la règle en classe.",
                "Je comprends la conséquence d'un non-respect.",
              ],
              status: "upcoming",
            },
            {
              id: "cp-emc-rvc-ecouter-autrui",
              levelSlug: "cp",
              subject: "EMC",
              domainSlug: "emc",
              subdomainSlug: "regles-vie-collective",
              title: "Écouter les autres sans les interrompre",
              observableObjective:
                "L'élève laisse un camarade parler jusqu'au bout avant de prendre la parole.",
              successCriteria: [
                "Je n'interromps pas quelqu'un qui parle.",
                "Je lève le doigt pour parler.",
                "Je respecte les tours de parole.",
              ],
              status: "upcoming",
            },
          ],
        },
        {
          subdomainSlug: "sentiment-appartenance",
          label: "Sentiment d'appartenance",
          entries: [
            {
              id: "cp-emc-sa-identifier-droits-devoirs",
              levelSlug: "cp",
              subject: "EMC",
              domainSlug: "emc",
              subdomainSlug: "sentiment-appartenance",
              title: "Identifier ses droits et ses devoirs d'élève",
              observableObjective:
                "L'élève nomme un droit et un devoir lié à sa vie d'élève.",
              successCriteria: [
                "Je cite un droit que j'ai à l'école.",
                "Je cite un devoir que j'ai à l'école.",
                "Je comprends le lien entre droits et devoirs.",
              ],
              status: "upcoming",
            },
          ],
        },
      ],
    },
  ],
};
