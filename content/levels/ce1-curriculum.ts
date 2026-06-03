// Carte du programme CE1 — Cycle 2, primaire.
// Structure légère : matière → domaine → sous-domaine → compétence attendue.
// Aucun contenu pédagogique complet. Le site organise ; les PDF enseignent.
// Tous les statuts sont "upcoming" : aucun href, aucun lien PDF mort.

import type { CurriculumLevelMap } from "@/content/curriculum-map-types";

export const ce1CurriculumLevelMap: CurriculumLevelMap = {
  levelSlug: "ce1",
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
              id: "ce1-fr-lc-comprendre-texte-court",
              levelSlug: "ce1",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "lecture-comprehension",
              title: "Comprendre un texte court lu seul",
              observableObjective:
                "L'élève lit un texte de quelques phrases et peut en dire l'essentiel sans aide.",
              successCriteria: [
                "Je lis le texte une fois entièrement avant de répondre.",
                "Je peux dire de qui ou de quoi parle le texte.",
                "Je retrouve une information précise sans tout relire.",
              ],
              status: "upcoming",
            },
            {
              id: "ce1-fr-lc-identifier-infos-principales",
              levelSlug: "ce1",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "lecture-comprehension",
              title: "Identifier les informations importantes d'un texte",
              observableObjective:
                "L'élève distingue les informations essentielles des détails dans un texte court.",
              successCriteria: [
                "Je repère ce qui concerne le personnage principal ou le sujet.",
                "Je ne confonds pas une information principale et un détail.",
                "Je peux résumer le texte en une phrase.",
              ],
              status: "upcoming",
            },
            {
              id: "ce1-fr-lc-justifier-reponse",
              levelSlug: "ce1",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "lecture-comprehension",
              title: "Justifier une réponse en revenant au texte",
              observableObjective:
                "L'élève appuie sa réponse sur une phrase ou un mot du texte.",
              successCriteria: [
                "Je cite la partie du texte qui justifie ma réponse.",
                "Je ne réponds pas de mémoire sans vérifier.",
                "Je montre où se trouve l'information dans le texte.",
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
              id: "ce1-fr-ec-ecrire-phrase-correcte",
              levelSlug: "ce1",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "ecriture",
              title: "Écrire une phrase syntaxiquement correcte",
              observableObjective:
                "L'élève produit une phrase avec un sujet, un verbe et éventuellement un complément, avec majuscule et ponctuation.",
              successCriteria: [
                "Ma phrase commence par une majuscule.",
                "Ma phrase contient un verbe conjugué.",
                "Ma phrase se termine par un point.",
              ],
              status: "upcoming",
            },
            {
              id: "ce1-fr-ec-encoder-mots-courants",
              levelSlug: "ce1",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "ecriture",
              title: "Encoder des mots courants sans erreur",
              observableObjective:
                "L'élève écrit des mots fréquents en respectant les graphèmes étudiés.",
              successCriteria: [
                "J'utilise les correspondances son-graphème que j'ai apprises.",
                "Je mémorise l'orthographe des mots outils courants.",
              ],
              status: "upcoming",
            },
            {
              id: "ce1-fr-ec-construire-texte-court",
              levelSlug: "ce1",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "ecriture",
              title: "Construire un texte de deux ou trois phrases",
              observableObjective:
                "L'élève enchaîne deux ou trois phrases cohérentes sur un même sujet.",
              successCriteria: [
                "Mes phrases parlent toutes du même sujet.",
                "Les phrases sont dans un ordre logique.",
                "J'utilise des mots de liaison simples (et, puis, alors).",
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
              id: "ce1-fr-edl-reconnaitre-phrase-correcte",
              levelSlug: "ce1",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "etude-de-la-langue",
              title: "Reconnaître une phrase grammaticalement correcte",
              observableObjective:
                "L'élève distingue une phrase correcte d'un groupe de mots incomplet.",
              successCriteria: [
                "Je vérifie que les mots ont du sens ensemble.",
                "Je repère la majuscule au début et le point à la fin.",
                "Je peux dire si quelque chose manque pour que ce soit une phrase.",
              ],
              status: "upcoming",
              competencyId: "ce1-fr-edl-reconnaitre-phrase",
            },
            {
              id: "ce1-fr-edl-identifier-nom-verbe",
              levelSlug: "ce1",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "etude-de-la-langue",
              title: "Identifier un nom et un verbe dans une phrase",
              observableObjective:
                "L'élève repère le verbe conjugué et un ou plusieurs noms dans une phrase simple.",
              successCriteria: [
                "Je souligne le verbe en me demandant ce que fait le sujet.",
                "Je repère les noms en cherchant des personnes, des animaux ou des objets.",
              ],
              status: "upcoming",
            },
            {
              id: "ce1-fr-edl-accord-sujet-verbe-simple",
              levelSlug: "ce1",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "etude-de-la-langue",
              title: "Observer l'accord sujet-verbe au présent",
              observableObjective:
                "L'élève ajuste la terminaison du verbe selon que le sujet est singulier ou pluriel.",
              successCriteria: [
                "Je repère si le sujet est singulier ou pluriel.",
                "Je conjugue le verbe en accord avec le sujet.",
                "Je remarque la différence entre il mange / ils mangent.",
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
              id: "ce1-fr-or-rapporter-lu-entendu",
              levelSlug: "ce1",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "langage-oral",
              title: "Rapporter oralement ce qu'on a lu ou entendu",
              observableObjective:
                "L'élève reformule avec ses mots l'essentiel d'un texte ou d'une histoire.",
              successCriteria: [
                "Je dis de quoi parle le texte en une ou deux phrases.",
                "Je n'utilise pas les mêmes mots que dans le texte.",
                "Je garde le sens sans tout réciter.",
              ],
              status: "upcoming",
            },
            {
              id: "ce1-fr-or-reformuler-consigne",
              levelSlug: "ce1",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "langage-oral",
              title: "Reformuler une consigne avec ses propres mots",
              observableObjective:
                "L'élève explique à voix haute ce qu'il a compris d'une consigne.",
              successCriteria: [
                "Je répète la consigne sans la réciter mot pour mot.",
                "Je dis ce que je dois faire, pas simplement ce qui a été dit.",
                "Je pose une question si je n'ai pas compris.",
              ],
              status: "upcoming",
            },
            {
              id: "ce1-fr-or-expliquer-choix",
              levelSlug: "ce1",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "langage-oral",
              title: "Expliquer et justifier un choix simple",
              observableObjective:
                "L'élève formule oralement pourquoi il a fait un choix en donnant une raison.",
              successCriteria: [
                "Je dis ce que j'ai choisi.",
                "Je donne une raison avec 'parce que' ou 'car'.",
                "Je parle en phrases complètes.",
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
              id: "ce1-ma-nc-lire-ecrire-nombres-100",
              levelSlug: "ce1",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "nombres-calcul",
              title: "Lire, écrire et comparer les nombres jusqu'à 100",
              observableObjective:
                "L'élève lit, écrit, compare et range des nombres entiers jusqu'à 100.",
              successCriteria: [
                "Je lis et écris un nombre jusqu'à 100.",
                "Je repère la valeur des dizaines et des unités.",
                "Je compare deux nombres avec < ou >.",
              ],
              status: "upcoming",
            },
            {
              id: "ce1-ma-nc-calculer-mental-additions",
              levelSlug: "ce1",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "nombres-calcul",
              title: "Calculer mentalement des additions et soustractions simples",
              observableObjective:
                "L'élève calcule de tête des additions et soustractions avec des résultats inférieurs à 30.",
              successCriteria: [
                "Je calcule une addition simple de tête.",
                "Je calcule une soustraction simple de tête.",
                "J'explique la stratégie utilisée.",
              ],
              status: "upcoming",
            },
            {
              id: "ce1-ma-nc-tables-multiplication-2-5",
              levelSlug: "ce1",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "nombres-calcul",
              title: "Mémoriser et utiliser les tables de 2 et 5",
              observableObjective:
                "L'élève restitue les résultats des tables de multiplication par 2 et par 5.",
              successCriteria: [
                "Je récite la table de 2 sans erreur.",
                "Je récite la table de 5 sans erreur.",
                "Je retrouve un produit dans une situation-problème.",
              ],
              status: "upcoming",
            },
            {
              id: "ce1-ma-nc-poser-addition-soustraction",
              levelSlug: "ce1",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "nombres-calcul",
              title: "Poser et calculer une addition ou une soustraction",
              observableObjective:
                "L'élève pose une addition ou une soustraction en colonnes et calcule.",
              successCriteria: [
                "J'aligne les chiffres par rang.",
                "Je calcule les unités puis les dizaines.",
                "Je vérifie la vraisemblance du résultat.",
              ],
              status: "upcoming",
            },
          ],
        },
        {
          subdomainSlug: "problemes",
          label: "Problèmes",
          entries: [
            {
              id: "ce1-ma-pr-comprendre-question",
              levelSlug: "ce1",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "problemes",
              title: "Identifier la question et les données d'un problème",
              observableObjective:
                "L'élève repère ce qu'on lui demande et les informations utiles.",
              successCriteria: [
                "Je lis le problème entièrement avant de calculer.",
                "Je souligne la question.",
                "Je repère les données nécessaires.",
              ],
              status: "upcoming",
            },
            {
              id: "ce1-ma-pr-choisir-operation",
              levelSlug: "ce1",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "problemes",
              title: "Choisir l'opération adaptée à une situation",
              observableObjective:
                "L'élève choisit addition ou soustraction selon la situation décrite.",
              successCriteria: [
                "Je comprends l'action du problème.",
                "Je choisis une opération adaptée.",
                "Je rédige la réponse.",
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
              id: "ce1-ma-gm-mesurer-longueur-regle",
              levelSlug: "ce1",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "grandeurs-mesures",
              title: "Mesurer une longueur avec une règle graduée",
              observableObjective:
                "L'élève mesure et compare des longueurs en centimètres.",
              successCriteria: [
                "Je place correctement la règle.",
                "Je lis la mesure en centimètres.",
                "Je compare deux mesures.",
              ],
              status: "upcoming",
            },
            {
              id: "ce1-ma-gm-lire-heure-demie",
              levelSlug: "ce1",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "grandeurs-mesures",
              title: "Lire l'heure à l'heure et à la demie",
              observableObjective:
                "L'élève lit l'heure juste et la demi-heure sur une horloge analogique.",
              successCriteria: [
                "Je lis une heure juste.",
                "Je lis une heure et demie.",
                "Je relie cette heure à un moment de la journée.",
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
              id: "ce1-ma-eg-decrire-figures-planes",
              levelSlug: "ce1",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "espace-geometrie",
              title: "Décrire des figures planes par leurs propriétés",
              observableObjective:
                "L'élève compte côtés et angles pour décrire une figure.",
              successCriteria: [
                "Je compte le nombre de côtés.",
                "Je repère les angles droits si présents.",
                "Je nomme la figure.",
              ],
              status: "upcoming",
            },
            {
              id: "ce1-ma-eg-se-reperer-quadrillage",
              levelSlug: "ce1",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "espace-geometrie",
              title: "Se repérer sur un quadrillage",
              observableObjective:
                "L'élève localise une case et décrit un déplacement simple sur un quadrillage.",
              successCriteria: [
                "Je repère une case par ses coordonnées.",
                "Je décris un déplacement en cases.",
                "Je retrouve un point de destination.",
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
              id: "ce1-qlm-tp-situer-sur-frise",
              levelSlug: "ce1",
              subject: "Questionner le monde",
              domainSlug: "questionner-le-monde",
              subdomainSlug: "temps",
              title: "Situer des événements sur une frise chronologique simple",
              observableObjective:
                "L'élève place des événements dans l'ordre sur une frise.",
              successCriteria: [
                "Je repère un événement avant ou après un autre.",
                "Je place un événement sur la frise.",
                "J'utilise le vocabulaire avant, après, pendant.",
              ],
              status: "upcoming",
            },
            {
              id: "ce1-qlm-tp-reconnaitre-epoque",
              levelSlug: "ce1",
              subject: "Questionner le monde",
              domainSlug: "questionner-le-monde",
              subdomainSlug: "temps",
              title: "Distinguer une époque ancienne et le présent",
              observableObjective:
                "L'élève compare un document du passé et une réalité actuelle.",
              successCriteria: [
                "Je repère des indices du passé dans un document.",
                "Je compare avec aujourd'hui.",
                "Je dis ce qui a changé.",
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
              id: "ce1-qlm-es-lire-plan-simple",
              levelSlug: "ce1",
              subject: "Questionner le monde",
              domainSlug: "questionner-le-monde",
              subdomainSlug: "espace",
              title: "Lire un plan simple et localiser un lieu",
              observableObjective:
                "L'élève utilise un plan simple pour trouver et situer un lieu.",
              successCriteria: [
                "Je repère le nord ou un repère fixe.",
                "Je localise un lieu à partir du plan.",
                "Je décris un chemin simple.",
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
              id: "ce1-qlm-vmo-cycle-vie-plante",
              levelSlug: "ce1",
              subject: "Questionner le monde",
              domainSlug: "questionner-le-monde",
              subdomainSlug: "vivant-matiere-objets",
              title: "Décrire le cycle de vie d'une plante",
              observableObjective:
                "L'élève ordonne les étapes de la vie d'une plante de la graine au fruit.",
              successCriteria: [
                "Je nomme les étapes : graine, germination, plante, fleur, fruit.",
                "Je les place dans l'ordre.",
                "Je distingue les stades de croissance.",
              ],
              status: "upcoming",
            },
            {
              id: "ce1-qlm-vmo-trier-dechets",
              levelSlug: "ce1",
              subject: "Questionner le monde",
              domainSlug: "questionner-le-monde",
              subdomainSlug: "vivant-matiere-objets",
              title: "Trier des déchets selon leur nature",
              observableObjective:
                "L'élève classe des déchets dans les bonnes catégories de tri.",
              successCriteria: [
                "Je distingue les matières (verre, papier, plastique).",
                "Je place chaque déchet dans la bonne poubelle.",
                "Je justifie mon classement.",
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
              id: "ce1-art-ap-utiliser-couleurs",
              levelSlug: "ce1",
              subject: "Enseignements artistiques",
              domainSlug: "enseignements-artistiques",
              subdomainSlug: "arts-plastiques",
              title: "Utiliser les couleurs pour exprimer une intention",
              observableObjective:
                "L'élève choisit et mélange des couleurs pour produire un effet.",
              successCriteria: [
                "Je choisis mes couleurs avec intention.",
                "Je peux mélanger deux couleurs primaires.",
                "Je dis ce que je voulais exprimer.",
              ],
              status: "upcoming",
            },
            {
              id: "ce1-art-ap-observer-decrire-oeuvre",
              levelSlug: "ce1",
              subject: "Enseignements artistiques",
              domainSlug: "enseignements-artistiques",
              subdomainSlug: "arts-plastiques",
              title: "Observer et décrire une œuvre d'art simple",
              observableObjective:
                "L'élève décrit une image ou un objet artistique avec un vocabulaire adapté.",
              successCriteria: [
                "Je dis ce que je vois.",
                "Je nomme des formes et des couleurs.",
                "Je distingue ce que je vois de ce que je ressens.",
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
              id: "ce1-art-mus-respecter-pulsation",
              levelSlug: "ce1",
              subject: "Enseignements artistiques",
              domainSlug: "enseignements-artistiques",
              subdomainSlug: "education-musicale",
              title: "Respecter la pulsation dans un chant ou une comptine",
              observableObjective:
                "L'élève bat la pulsation régulièrement pendant un chant.",
              successCriteria: [
                "Je bats dans les mains de façon régulière.",
                "Je ne m'emballe pas et ne ralentis pas.",
                "Je reste dans le tempo collectif.",
              ],
              status: "upcoming",
            },
            {
              id: "ce1-art-mus-identifier-ambiance",
              levelSlug: "ce1",
              subject: "Enseignements artistiques",
              domainSlug: "enseignements-artistiques",
              subdomainSlug: "education-musicale",
              title: "Identifier l'ambiance d'un extrait musical",
              observableObjective:
                "L'élève décrit l'atmosphère d'un extrait écouté avec des mots ou un dessin.",
              successCriteria: [
                "J'écoute attentivement.",
                "Je dis ce que la musique me fait ressentir ou imaginer.",
                "Je justifie avec un élément musical entendu.",
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
              id: "ce1-eps-hm-courir-avec-obstacles",
              levelSlug: "ce1",
              subject: "EPS",
              domainSlug: "eps",
              subdomainSlug: "habiletes-motrices",
              title: "Courir en adaptant son pas à des obstacles",
              observableObjective:
                "L'élève adapte sa foulée pour passer un obstacle sans s'arrêter.",
              successCriteria: [
                "Je repère l'obstacle à l'avance.",
                "J'adapte ma trajectoire.",
                "Je repars sans m'arrêter.",
              ],
              status: "upcoming",
            },
            {
              id: "ce1-eps-hm-equilibre-positions",
              levelSlug: "ce1",
              subject: "EPS",
              domainSlug: "eps",
              subdomainSlug: "habiletes-motrices",
              title: "Se maintenir en équilibre dans des positions variées",
              observableObjective:
                "L'élève contrôle son équilibre dans des situations simples.",
              successCriteria: [
                "Je tiens en équilibre sur un appui réduit.",
                "Je me déplace sur un banc ou une poutre basse.",
                "Je retrouve l'équilibre après un déséquilibre.",
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
              id: "ce1-eps-jeux-jouer-role",
              levelSlug: "ce1",
              subject: "EPS",
              domainSlug: "eps",
              subdomainSlug: "jeux-collectifs",
              title: "Jouer un rôle dans un jeu collectif simple",
              observableObjective:
                "L'élève occupe son rôle (attaquant, défenseur, arbitre) pendant tout le jeu.",
              successCriteria: [
                "Je connais le rôle attendu.",
                "Je l'assume pendant le jeu.",
                "Je change de rôle quand on me le demande.",
              ],
              status: "upcoming",
            },
          ],
        },
        {
          subdomainSlug: "deplacements-adaptes",
          label: "Adapter ses déplacements",
          entries: [
            {
              id: "ce1-eps-dep-nager-decouverte",
              levelSlug: "ce1",
              subject: "EPS",
              domainSlug: "eps",
              subdomainSlug: "deplacements-adaptes",
              title: "S'immerger et se déplacer dans l'eau",
              observableObjective:
                "L'élève entre dans l'eau, s'immerge et effectue un court déplacement.",
              successCriteria: [
                "J'entre dans l'eau sans panique.",
                "Je passe la tête sous l'eau.",
                "Je me déplace sur 2 à 3 mètres sans appui.",
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
              id: "ce1-emc-rvc-participer-elaboration-regle",
              levelSlug: "ce1",
              subject: "EMC",
              domainSlug: "emc",
              subdomainSlug: "regles-vie-collective",
              title: "Participer à l'élaboration d'une règle de vie",
              observableObjective:
                "L'élève propose et justifie une règle utile à la classe.",
              successCriteria: [
                "Je propose une règle utile.",
                "Je l'explique avec une raison.",
                "J'accepte les règles décidées par le groupe.",
              ],
              status: "upcoming",
            },
            {
              id: "ce1-emc-rvc-respecter-travail-autrui",
              levelSlug: "ce1",
              subject: "EMC",
              domainSlug: "emc",
              subdomainSlug: "regles-vie-collective",
              title: "Respecter le travail et les affaires des autres",
              observableObjective:
                "L'élève prend soin du matériel commun et respecte les productions des camarades.",
              successCriteria: [
                "Je range le matériel collectif.",
                "Je ne touche pas le travail des autres sans permission.",
                "Je traite le matériel avec soin.",
              ],
              status: "upcoming",
            },
          ],
        },
        {
          subdomainSlug: "jugement-engagement",
          label: "Jugement et engagement",
          entries: [
            {
              id: "ce1-emc-je-exprimer-avis-respectueux",
              levelSlug: "ce1",
              subject: "EMC",
              domainSlug: "emc",
              subdomainSlug: "jugement-engagement",
              title: "Exprimer un avis de façon respectueuse",
              observableObjective:
                "L'élève donne son opinion sans dénigrer celle des autres.",
              successCriteria: [
                "Je dis mon avis avec mes mots.",
                "Je respecte les avis différents.",
                "J'écoute avant de répondre.",
              ],
              status: "upcoming",
            },
          ],
        },
      ],
    },
  ],
};
