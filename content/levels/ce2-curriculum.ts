// Carte du programme CE2.
// Structure legere : matiere -> domaine/sous-domaine -> competence attendue.
// Aucun contenu pedagogique complet. Le site organise ; les PDF enseigneront.
// Tous les statuts restent "upcoming" : aucun href, aucun lien PDF mort.

import type { CurriculumLevelMap } from "@/content/curriculum-map-types";

export const ce2CurriculumLevelMap: CurriculumLevelMap = {
  levelSlug: "ce2",
  domains: [
    {
      domainSlug: "francais",
      subject: "Français",
      label: "Français",
      subdomains: [
        {
          subdomainSlug: "langage-oral",
          label: "Langage oral",
          entries: [
            {
              id: "ce2-fr-or-presenter-sujet-organise",
              levelSlug: "ce2",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "langage-oral",
              title: "Présenter un sujet connu de façon organisée",
              observableObjective:
                "L'élève expose un sujet connu en suivant deux ou trois points clairement ordonnés.",
              successCriteria: [
                "Je présente les idées dans un ordre compréhensible.",
                "Je parle en phrases complètes.",
                "Je garde un volume audible.",
              ],
              status: "upcoming",
            },
            {
              id: "ce2-fr-or-ecouter-reformuler",
              levelSlug: "ce2",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "langage-oral",
              title: "Écouter et reformuler le propos d'autrui",
              observableObjective:
                "L'élève reformule fidèlement ce qu'un camarade vient d'expliquer.",
              successCriteria: [
                "Je laisse l'autre terminer son propos.",
                "Je reformule sans ajouter mon avis.",
                "Je vérifie que j'ai bien compris.",
              ],
              status: "upcoming",
            },
            {
              id: "ce2-fr-or-argumenter-avis-simple",
              levelSlug: "ce2",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "langage-oral",
              title: "Exprimer un avis et le justifier simplement",
              observableObjective:
                "L'élève donne un avis et l'appuie par une raison compréhensible.",
              successCriteria: [
                "Je formule clairement mon avis.",
                "Je donne une raison avec parce que ou car.",
                "Je respecte les avis différents.",
              ],
              status: "upcoming",
            },
          ],
        },
        {
          subdomainSlug: "lecture-comprehension",
          label: "Lecture et compréhension",
          entries: [
            {
              id: "ce2-fr-lc-comprendre-texte-long",
              levelSlug: "ce2",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "lecture-comprehension",
              title: "Comprendre un texte plus long lu seul",
              observableObjective:
                "L'élève lit un texte d'une dizaine de lignes et peut en restituer l'essentiel sans aide.",
              successCriteria: [
                "Je lis le texte en entier avant de répondre.",
                "Je peux dire de quoi parle le texte.",
                "Je retrouve une information précise.",
              ],
              status: "upcoming",
            },
            {
              id: "ce2-fr-lc-reperer-implicite",
              levelSlug: "ce2",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "lecture-comprehension",
              title: "Repérer une information implicite",
              observableObjective:
                "L'élève déduit une information qui n'est pas écrite directement dans le texte.",
              successCriteria: [
                "Je repère les indices du texte.",
                "Je formule ce que le texte laisse comprendre.",
                "Je justifie ma déduction.",
              ],
              status: "upcoming",
            },
            {
              id: "ce2-fr-lc-distinguer-types-textes",
              levelSlug: "ce2",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "lecture-comprehension",
              title: "Distinguer différents types de textes",
              observableObjective:
                "L'élève reconnaît si un texte raconte, informe, explique ou joue avec la langue.",
              successCriteria: [
                "Je repère les indices de mise en page.",
                "Je dis à quoi sert le texte.",
                "Je justifie mon choix avec un exemple.",
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
              id: "ce2-fr-ec-rediger-texte-structure",
              levelSlug: "ce2",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "ecriture",
              title: "Rédiger un texte court structuré",
              observableObjective:
                "L'élève produit un texte court dont les phrases suivent un ordre logique.",
              successCriteria: [
                "Mon texte a un début et une fin.",
                "Chaque phrase apporte une idée.",
                "J'utilise quelques connecteurs simples.",
              ],
              status: "upcoming",
            },
            {
              id: "ce2-fr-ec-reviser-texte",
              levelSlug: "ce2",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "ecriture",
              title: "Réviser et améliorer un texte produit",
              observableObjective:
                "L'élève relit son texte et apporte des corrections ou améliorations ciblées.",
              successCriteria: [
                "Je vérifie que mon texte se comprend.",
                "Je corrige au moins une erreur repérée.",
                "J'améliore une phrase si nécessaire.",
              ],
              status: "upcoming",
            },
            {
              id: "ce2-fr-ec-copier-avec-soin",
              levelSlug: "ce2",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "ecriture",
              title: "Copier un texte court avec exactitude",
              observableObjective:
                "L'élève copie un court texte en respectant l'orthographe, la ponctuation et la présentation.",
              successCriteria: [
                "Je copie tous les mots dans l'ordre.",
                "Je respecte la ponctuation.",
                "Je relis pour vérifier les oublis.",
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
              id: "ce2-fr-edl-accord-groupe-nominal",
              levelSlug: "ce2",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "etude-de-la-langue",
              title: "Réaliser l'accord dans le groupe nominal",
              observableObjective:
                "L'élève accorde le déterminant et l'adjectif avec le nom en genre et en nombre.",
              successCriteria: [
                "Je repère le nom donneur d'accord.",
                "J'accorde le déterminant.",
                "J'accorde l'adjectif.",
              ],
              status: "upcoming",
            },
            {
              id: "ce2-fr-edl-conjuguer-present-passe-compose",
              levelSlug: "ce2",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "etude-de-la-langue",
              title: "Conjuguer au présent et au passé composé",
              observableObjective:
                "L'élève conjugue des verbes fréquents au présent et au passé composé.",
              successCriteria: [
                "Je choisis la terminaison selon le sujet.",
                "Je forme le passé composé avec un auxiliaire.",
                "Je distingue présent et passé composé.",
              ],
              status: "upcoming",
            },
            {
              id: "ce2-fr-edl-identifier-nature-fonction",
              levelSlug: "ce2",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "etude-de-la-langue",
              title: "Identifier nature et fonction dans une phrase simple",
              observableObjective:
                "L'élève distingue quelques natures de mots et repère une fonction simple dans la phrase.",
              successCriteria: [
                "Je repère nom, verbe, adjectif et déterminant.",
                "Je retrouve le sujet du verbe.",
                "Je repère un complément simple.",
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
              id: "ce2-ma-nc-lire-ecrire-ordonner-nombres",
              levelSlug: "ce2",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "nombres-calcul",
              title: "Lire, écrire et ordonner les nombres entiers",
              observableObjective:
                "L'élève lit, écrit, compare et range des nombres entiers adaptés au CE2.",
              successCriteria: [
                "Je lis un nombre en respectant les classes connues.",
                "J'écris un nombre en chiffres et en lettres.",
                "Je range plusieurs nombres dans l'ordre demandé.",
              ],
              status: "upcoming",
            },
            {
              id: "ce2-ma-nc-utiliser-strategies-calcul-mental",
              levelSlug: "ce2",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "nombres-calcul",
              title: "Utiliser des stratégies de calcul mental",
              observableObjective:
                "L'élève transforme un calcul pour le rendre plus simple et expliquer sa stratégie.",
              successCriteria: [
                "Je choisis une décomposition utile.",
                "Je calcule mentalement avec contrôle.",
                "J'explique la stratégie utilisée.",
              ],
              status: "upcoming",
            },
            {
              id: "ce2-ma-nc-poser-operations",
              levelSlug: "ce2",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "nombres-calcul",
              title: "Poser et calculer des opérations",
              observableObjective:
                "L'élève pose une addition, une soustraction ou une multiplication simple en respectant les rangs.",
              successCriteria: [
                "J'aligne les chiffres par rang.",
                "Je calcule étape par étape.",
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
              id: "ce2-ma-pr-comprendre-enonce",
              levelSlug: "ce2",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "problemes",
              title: "Comprendre l'énoncé d'un problème",
              observableObjective:
                "L'élève identifie la question, les données utiles et ce qu'il faut chercher.",
              successCriteria: [
                "Je repère la question.",
                "Je sélectionne les données utiles.",
                "Je reformule ce que je cherche.",
              ],
              status: "upcoming",
            },
            {
              id: "ce2-ma-pr-choisir-operation",
              levelSlug: "ce2",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "problemes",
              title: "Choisir l'opération adaptée à une situation",
              observableObjective:
                "L'élève choisit une opération cohérente avec une situation additive, soustractive ou multiplicative.",
              successCriteria: [
                "Je comprends l'action du problème.",
                "Je choisis une opération adaptée.",
                "Je peux expliquer mon choix.",
              ],
              status: "upcoming",
            },
            {
              id: "ce2-ma-pr-resoudre-probleme-etapes",
              levelSlug: "ce2",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "problemes",
              title: "Résoudre un problème à plusieurs étapes",
              observableObjective:
                "L'élève enchaîne deux calculs simples pour répondre à une question finale.",
              successCriteria: [
                "Je note les étapes nécessaires.",
                "Je réalise les calculs dans le bon ordre.",
                "Je rédige une réponse à la question.",
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
              id: "ce2-ma-gm-mesurer-longueurs",
              levelSlug: "ce2",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "grandeurs-mesures",
              title: "Mesurer et comparer des longueurs",
              observableObjective:
                "L'élève mesure des longueurs avec un instrument adapté et compare les résultats.",
              successCriteria: [
                "Je choisis l'unité adaptée.",
                "Je place correctement l'instrument.",
                "Je compare les mesures obtenues.",
              ],
              status: "upcoming",
            },
            {
              id: "ce2-ma-gm-lire-heures-durees",
              levelSlug: "ce2",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "grandeurs-mesures",
              title: "Lire l'heure et calculer des durées simples",
              observableObjective:
                "L'élève lit l'heure sur différents supports et calcule une durée courte.",
              successCriteria: [
                "Je lis l'heure indiquée.",
                "Je repère le début et la fin.",
                "Je calcule une durée simple.",
              ],
              status: "upcoming",
            },
            {
              id: "ce2-ma-gm-utiliser-monnaie",
              levelSlug: "ce2",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "grandeurs-mesures",
              title: "Utiliser la monnaie dans des situations simples",
              observableObjective:
                "L'élève compose une somme, compare des prix et calcule un reste simple.",
              successCriteria: [
                "Je compose une somme avec pièces et billets.",
                "Je compare deux prix.",
                "Je calcule une monnaie simple à rendre.",
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
              id: "ce2-ma-eg-se-reperer-decrire-deplacement",
              levelSlug: "ce2",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "espace-geometrie",
              title: "Se repérer et décrire un déplacement",
              observableObjective:
                "L'élève localise une position et décrit un déplacement sur un quadrillage ou un plan simple.",
              successCriteria: [
                "Je repère une case ou un point.",
                "Je décris un déplacement dans l'ordre.",
                "J'utilise un vocabulaire spatial précis.",
              ],
              status: "upcoming",
            },
            {
              id: "ce2-ma-eg-reconnaitre-figures",
              levelSlug: "ce2",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "espace-geometrie",
              title: "Reconnaître et décrire des figures usuelles",
              observableObjective:
                "L'élève identifie des figures planes à partir de leurs propriétés visibles.",
              successCriteria: [
                "Je nomme la figure.",
                "Je compte les côtés et les sommets.",
                "Je repère les angles droits si nécessaire.",
              ],
              status: "upcoming",
            },
            {
              id: "ce2-ma-eg-tracer-avec-instruments",
              levelSlug: "ce2",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "espace-geometrie",
              title: "Tracer avec règle, équerre et compas",
              observableObjective:
                "L'élève utilise les instruments pour réaliser des tracés géométriques simples.",
              successCriteria: [
                "Je choisis l'instrument demandé.",
                "Je trace proprement.",
                "Je vérifie la propriété attendue.",
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
              id: "ce2-qlm-tp-situer-evenements",
              levelSlug: "ce2",
              subject: "Questionner le monde",
              domainSlug: "questionner-le-monde",
              subdomainSlug: "temps",
              title: "Situer des événements dans le temps",
              observableObjective:
                "L'élève place des événements sur une frise et utilise un vocabulaire temporel adapté.",
              successCriteria: [
                "Je repère avant, après et pendant.",
                "Je place un événement sur une frise.",
                "J'utilise une date ou une période.",
              ],
              status: "upcoming",
            },
            {
              id: "ce2-qlm-tp-comparer-modes-vie",
              levelSlug: "ce2",
              subject: "Questionner le monde",
              domainSlug: "questionner-le-monde",
              subdomainSlug: "temps",
              title: "Comparer des modes de vie à différentes époques",
              observableObjective:
                "L'élève repère des ressemblances et différences entre des modes de vie passés et actuels.",
              successCriteria: [
                "Je décris une trace du passé.",
                "Je compare avec aujourd'hui.",
                "Je distingue ce qui change et ce qui reste.",
              ],
              status: "upcoming",
            },
            {
              id: "ce2-qlm-tp-utiliser-documents",
              levelSlug: "ce2",
              subject: "Questionner le monde",
              domainSlug: "questionner-le-monde",
              subdomainSlug: "temps",
              title: "Utiliser un document pour comprendre le passé",
              observableObjective:
                "L'élève prélève une information simple dans une image, un témoignage ou un court document.",
              successCriteria: [
                "J'observe le document avec attention.",
                "Je prélève une information utile.",
                "Je distingue observation et hypothèse.",
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
              id: "ce2-qlm-es-lire-plan-simple",
              levelSlug: "ce2",
              subject: "Questionner le monde",
              domainSlug: "questionner-le-monde",
              subdomainSlug: "espace",
              title: "Lire un plan ou une carte simple",
              observableObjective:
                "L'élève utilise une légende et des repères pour localiser un lieu sur un plan ou une carte.",
              successCriteria: [
                "Je repère le titre et la légende.",
                "Je localise un lieu demandé.",
                "J'utilise les repères du document.",
              ],
              status: "upcoming",
            },
            {
              id: "ce2-qlm-es-decrire-milieu-proche",
              levelSlug: "ce2",
              subject: "Questionner le monde",
              domainSlug: "questionner-le-monde",
              subdomainSlug: "espace",
              title: "Décrire un espace proche",
              observableObjective:
                "L'élève décrit un espace de vie en identifiant ses usages et ses principaux éléments.",
              successCriteria: [
                "Je nomme les lieux observés.",
                "Je décris leur fonction.",
                "Je repère les déplacements possibles.",
              ],
              status: "upcoming",
            },
            {
              id: "ce2-qlm-es-comparer-paysages",
              levelSlug: "ce2",
              subject: "Questionner le monde",
              domainSlug: "questionner-le-monde",
              subdomainSlug: "espace",
              title: "Comparer différents paysages",
              observableObjective:
                "L'élève observe plusieurs paysages et relève des éléments naturels ou aménagés.",
              successCriteria: [
                "Je distingue naturel et aménagé.",
                "Je relève des ressemblances.",
                "Je relève des différences.",
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
              id: "ce2-qlm-vmo-decrire-cycle-vie",
              levelSlug: "ce2",
              subject: "Questionner le monde",
              domainSlug: "questionner-le-monde",
              subdomainSlug: "vivant-matiere-objets",
              title: "Décrire le cycle de vie d'un être vivant",
              observableObjective:
                "L'élève ordonne les étapes principales du développement d'un être vivant.",
              successCriteria: [
                "Je nomme les étapes principales.",
                "Je les place dans l'ordre.",
                "Je distingue croissance et transformation.",
              ],
              status: "upcoming",
            },
            {
              id: "ce2-qlm-vmo-classer-matiere",
              levelSlug: "ce2",
              subject: "Questionner le monde",
              domainSlug: "questionner-le-monde",
              subdomainSlug: "vivant-matiere-objets",
              title: "Classer des matières selon leurs propriétés",
              observableObjective:
                "L'élève observe des matières et les classe selon une propriété simple.",
              successCriteria: [
                "J'observe une propriété.",
                "Je compare plusieurs objets.",
                "Je justifie mon classement.",
              ],
              status: "upcoming",
            },
            {
              id: "ce2-qlm-vmo-realiser-circuit-simple",
              levelSlug: "ce2",
              subject: "Questionner le monde",
              domainSlug: "questionner-le-monde",
              subdomainSlug: "vivant-matiere-objets",
              title: "Réaliser un montage électrique simple",
              observableObjective:
                "L'élève réalise un circuit simple et identifie les conditions pour allumer une lampe.",
              successCriteria: [
                "Je relie les éléments du circuit.",
                "Je vérifie si la lampe s'allume.",
                "J'explique pourquoi le circuit fonctionne ou non.",
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
              id: "ce2-art-ap-experimenter-outils",
              levelSlug: "ce2",
              subject: "Enseignements artistiques",
              domainSlug: "enseignements-artistiques",
              subdomainSlug: "arts-plastiques",
              title: "Expérimenter des outils et des matières",
              observableObjective:
                "L'élève choisit et combine des outils ou matières pour produire un effet plastique.",
              successCriteria: [
                "J'essaie plusieurs gestes.",
                "Je choisis un outil adapté à l'effet voulu.",
                "Je peux expliquer mon choix.",
              ],
              status: "upcoming",
            },
            {
              id: "ce2-art-ap-composer-image",
              levelSlug: "ce2",
              subject: "Enseignements artistiques",
              domainSlug: "enseignements-artistiques",
              subdomainSlug: "arts-plastiques",
              title: "Composer une image en organisant l'espace",
              observableObjective:
                "L'élève organise formes, couleurs et éléments dans un espace de production.",
              successCriteria: [
                "Je répartis les éléments dans l'espace.",
                "Je fais des choix de couleurs.",
                "Je donne une intention à ma composition.",
              ],
              status: "upcoming",
            },
            {
              id: "ce2-art-ap-decrire-oeuvre",
              levelSlug: "ce2",
              subject: "Enseignements artistiques",
              domainSlug: "enseignements-artistiques",
              subdomainSlug: "arts-plastiques",
              title: "Décrire une œuvre avec un vocabulaire simple",
              observableObjective:
                "L'élève observe une œuvre et décrit ce qu'il voit avec des mots précis.",
              successCriteria: [
                "Je décris les formes et les couleurs.",
                "Je distingue observation et ressenti.",
                "J'écoute les interprétations des autres.",
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
              id: "ce2-art-mus-chanter-ensemble",
              levelSlug: "ce2",
              subject: "Enseignements artistiques",
              domainSlug: "enseignements-artistiques",
              subdomainSlug: "education-musicale",
              title: "Chanter en respectant un cadre collectif",
              observableObjective:
                "L'élève chante avec le groupe en respectant départ, tempo et intensité.",
              successCriteria: [
                "Je démarre au bon moment.",
                "Je garde le tempo collectif.",
                "J'adapte le volume de ma voix.",
              ],
              status: "upcoming",
            },
            {
              id: "ce2-art-mus-ecouter-comparer",
              levelSlug: "ce2",
              subject: "Enseignements artistiques",
              domainSlug: "enseignements-artistiques",
              subdomainSlug: "education-musicale",
              title: "Écouter et comparer des extraits musicaux",
              observableObjective:
                "L'élève repère des ressemblances et différences entre deux extraits musicaux.",
              successCriteria: [
                "J'écoute sans interrompre.",
                "Je repère un élément sonore.",
                "Je compare deux extraits.",
              ],
              status: "upcoming",
            },
            {
              id: "ce2-art-mus-produire-rythme",
              levelSlug: "ce2",
              subject: "Enseignements artistiques",
              domainSlug: "enseignements-artistiques",
              subdomainSlug: "education-musicale",
              title: "Produire et mémoriser un rythme simple",
              observableObjective:
                "L'élève reproduit puis invente une courte cellule rythmique.",
              successCriteria: [
                "Je reproduis un rythme entendu.",
                "Je garde une pulsation régulière.",
                "Je propose un rythme court.",
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
          subdomainSlug: "performance",
          label: "Produire une performance",
          entries: [
            {
              id: "ce2-eps-perf-courir-lancer-sauter",
              levelSlug: "ce2",
              subject: "EPS",
              domainSlug: "eps",
              subdomainSlug: "performance",
              title: "Courir, lancer ou sauter en mesurant sa performance",
              observableObjective:
                "L'élève réalise une performance simple et observe sa progression.",
              successCriteria: [
                "Je respecte la consigne de sécurité.",
                "Je mesure ou compare ma performance.",
                "Je cherche à progresser.",
              ],
              status: "upcoming",
            },
            {
              id: "ce2-eps-perf-regulariser-effort",
              levelSlug: "ce2",
              subject: "EPS",
              domainSlug: "eps",
              subdomainSlug: "performance",
              title: "Adapter son effort dans une activité de durée",
              observableObjective:
                "L'élève maintient un effort régulier sur une durée adaptée.",
              successCriteria: [
                "Je pars à une allure adaptée.",
                "Je garde mon effort jusqu'au bout.",
                "Je récupère calmement.",
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
              id: "ce2-eps-dep-suivre-parcours",
              levelSlug: "ce2",
              subject: "EPS",
              domainSlug: "eps",
              subdomainSlug: "deplacements-adaptes",
              title: "Suivre un parcours en respectant des contraintes",
              observableObjective:
                "L'élève adapte ses déplacements à un parcours balisé et à ses contraintes.",
              successCriteria: [
                "Je repère le trajet.",
                "Je respecte les zones et les règles.",
                "J'adapte ma vitesse.",
              ],
              status: "upcoming",
            },
            {
              id: "ce2-eps-dep-sorienter-espace-connu",
              levelSlug: "ce2",
              subject: "EPS",
              domainSlug: "eps",
              subdomainSlug: "deplacements-adaptes",
              title: "S'orienter dans un espace connu",
              observableObjective:
                "L'élève utilise des repères pour se déplacer vers un point demandé.",
              successCriteria: [
                "Je repère le point de départ.",
                "Je choisis un trajet.",
                "Je retrouve le point demandé.",
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
              id: "ce2-eps-jeux-cooperer-opposer",
              levelSlug: "ce2",
              subject: "EPS",
              domainSlug: "eps",
              subdomainSlug: "jeux-collectifs",
              title: "Coopérer et s'opposer dans un jeu collectif",
              observableObjective:
                "L'élève agit avec ses partenaires tout en tenant compte des adversaires.",
              successCriteria: [
                "Je respecte les règles du jeu.",
                "Je fais une passe ou une aide utile.",
                "Je tiens compte des adversaires.",
              ],
              status: "upcoming",
            },
            {
              id: "ce2-eps-jeux-arbitrer-regle-simple",
              levelSlug: "ce2",
              subject: "EPS",
              domainSlug: "eps",
              subdomainSlug: "jeux-collectifs",
              title: "Assumer un rôle simple d'arbitre ou d'observateur",
              observableObjective:
                "L'élève observe une règle précise et signale une situation simple pendant le jeu.",
              successCriteria: [
                "Je connais la règle observée.",
                "Je signale calmement une situation.",
                "Je reste impartial.",
              ],
              status: "upcoming",
            },
          ],
        },
        {
          subdomainSlug: "expression-corporelle",
          label: "Expression corporelle",
          entries: [
            {
              id: "ce2-eps-exp-enchainer-actions",
              levelSlug: "ce2",
              subject: "EPS",
              domainSlug: "eps",
              subdomainSlug: "expression-corporelle",
              title: "Enchaîner des actions pour exprimer une intention",
              observableObjective:
                "L'élève compose une courte phrase corporelle avec un début et une fin.",
              successCriteria: [
                "Je choisis des actions variées.",
                "J'enchaîne sans m'arrêter.",
                "Je montre clairement le début et la fin.",
              ],
              status: "upcoming",
            },
            {
              id: "ce2-eps-exp-presenter-devant-groupe",
              levelSlug: "ce2",
              subject: "EPS",
              domainSlug: "eps",
              subdomainSlug: "expression-corporelle",
              title: "Présenter une production corporelle devant un groupe",
              observableObjective:
                "L'élève présente une courte production et accepte le regard des autres.",
              successCriteria: [
                "Je respecte l'espace de présentation.",
                "Je vais jusqu'au bout de la production.",
                "J'écoute les retours simples.",
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
              id: "ce2-emc-rvc-respecter-regles",
              levelSlug: "ce2",
              subject: "EMC",
              domainSlug: "emc",
              subdomainSlug: "regles-vie-collective",
              title: "Comprendre et respecter une règle commune",
              observableObjective:
                "L'élève explique l'utilité d'une règle et l'applique dans une situation collective.",
              successCriteria: [
                "Je dis à quoi sert la règle.",
                "Je respecte la règle en situation.",
                "Je comprends la conséquence d'un non-respect.",
              ],
              status: "upcoming",
            },
            {
              id: "ce2-emc-rvc-cooperer-classe",
              levelSlug: "ce2",
              subject: "EMC",
              domainSlug: "emc",
              subdomainSlug: "regles-vie-collective",
              title: "Coopérer dans la vie de la classe",
              observableObjective:
                "L'élève participe à une tâche collective en assumant un rôle simple.",
              successCriteria: [
                "J'écoute la consigne collective.",
                "J'assume mon rôle.",
                "J'aide le groupe à réussir.",
              ],
              status: "upcoming",
            },
            {
              id: "ce2-emc-rvc-resoudre-conflit",
              levelSlug: "ce2",
              subject: "EMC",
              domainSlug: "emc",
              subdomainSlug: "regles-vie-collective",
              title: "Résoudre un désaccord par la parole",
              observableObjective:
                "L'élève décrit un désaccord et recherche une solution respectueuse.",
              successCriteria: [
                "Je décris les faits sans insulter.",
                "J'écoute l'autre point de vue.",
                "Je propose une solution possible.",
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
              id: "ce2-emc-je-distinguer-fait-opinion",
              levelSlug: "ce2",
              subject: "EMC",
              domainSlug: "emc",
              subdomainSlug: "jugement-engagement",
              title: "Distinguer un fait et une opinion",
              observableObjective:
                "L'élève différencie une information vérifiable d'un avis personnel.",
              successCriteria: [
                "Je reconnais ce qui peut être vérifié.",
                "Je reconnais un avis personnel.",
                "Je formule une phrase de chaque type.",
              ],
              status: "upcoming",
            },
            {
              id: "ce2-emc-je-participer-debat-regle",
              levelSlug: "ce2",
              subject: "EMC",
              domainSlug: "emc",
              subdomainSlug: "jugement-engagement",
              title: "Participer à un débat réglé",
              observableObjective:
                "L'élève prend la parole dans un échange en respectant les règles de discussion.",
              successCriteria: [
                "Je demande la parole.",
                "Je parle du sujet discuté.",
                "Je respecte les tours de parole.",
              ],
              status: "upcoming",
            },
            {
              id: "ce2-emc-je-agir-responsable",
              levelSlug: "ce2",
              subject: "EMC",
              domainSlug: "emc",
              subdomainSlug: "jugement-engagement",
              title: "Identifier une action responsable",
              observableObjective:
                "L'élève propose une action simple utile au groupe ou à l'environnement proche.",
              successCriteria: [
                "Je repère un besoin concret.",
                "Je propose une action réaliste.",
                "J'explique son utilité.",
              ],
              status: "upcoming",
            },
          ],
        },
      ],
    },
  ],
};
