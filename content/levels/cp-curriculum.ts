// Carte du programme CP — Cycle 2, primaire.
// Structure légère : domaine → sous-domaine → séquence (1 séquence = 1 compétence observable).
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
          subdomainSlug: "numeration",
          label: "Numération",
          entries: [
            {
              id: "cp-ma-num-denombrer-jusqu-100",
              levelSlug: "cp",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "numeration",
              title: "Dénombrer, lire et écrire les nombres jusqu'à 100",
              observableObjective:
                "L'élève dénombre une collection, lit et écrit les nombres jusqu'à 100 en chiffres et en lettres.",
              successCriteria: [
                "Je compte une collection en formant des groupes de dix.",
                "Je lis un nombre écrit en chiffres jusqu'à 100.",
                "J'écris un nombre dicté en chiffres.",
              ],
              status: "upcoming",
            },
            {
              id: "cp-ma-num-comparer-ordonner",
              levelSlug: "cp",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "numeration",
              title: "Comparer et ordonner des nombres jusqu'à 100",
              observableObjective:
                "L'élève compare deux nombres et les place dans l'ordre croissant ou décroissant.",
              successCriteria: [
                "J'utilise les symboles < et > pour comparer deux nombres.",
                "Je range une suite de nombres dans l'ordre croissant.",
                "Je repère la position d'un nombre sur une droite graduée.",
              ],
              status: "upcoming",
            },
          ],
        },
        {
          subdomainSlug: "calcul",
          label: "Calcul",
          entries: [
            {
              id: "cp-ma-cal-addition-soustraction",
              levelSlug: "cp",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "calcul",
              title: "Calculer des additions et des soustractions simples",
              observableObjective:
                "L'élève calcule mentalement ou par écrit des sommes et des différences inférieures à 20.",
              successCriteria: [
                "Je calcule une addition en ligne.",
                "Je calcule une soustraction en ligne.",
                "Je vérifie mon résultat par un autre moyen.",
              ],
              status: "upcoming",
            },
            {
              id: "cp-ma-cal-faits-numeriques",
              levelSlug: "cp",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "calcul",
              title: "Mémoriser les faits numériques de base",
              observableObjective:
                "L'élève mobilise immédiatement les compléments à 10 et les doubles.",
              successCriteria: [
                "Je connais les paires de nombres dont la somme est 10.",
                "Je connais les doubles des nombres jusqu'à 10.",
              ],
              status: "upcoming",
            },
          ],
        },
        {
          subdomainSlug: "geometrie",
          label: "Géométrie",
          entries: [
            {
              id: "cp-ma-geo-reconnaitre-figures",
              levelSlug: "cp",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "geometrie",
              title: "Reconnaître et nommer des figures géométriques simples",
              observableObjective:
                "L'élève identifie et nomme un carré, un rectangle, un triangle et un cercle.",
              successCriteria: [
                "Je nomme la figure quand on me la montre.",
                "Je distingue une figure fermée d'une figure ouverte.",
                "Je justifie mon choix par une propriété simple.",
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
              id: "cp-ma-gm-mesurer-longueurs",
              levelSlug: "cp",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "grandeurs-mesures",
              title: "Mesurer et comparer des longueurs",
              observableObjective:
                "L'élève mesure une longueur avec une règle et compare deux longueurs.",
              successCriteria: [
                "Je place correctement la règle pour mesurer.",
                "J'exprime la mesure en centimètres.",
                "Je dis lequel est le plus long en justifiant.",
              ],
              status: "upcoming",
            },
          ],
        },
      ],
    },
  ],
};
