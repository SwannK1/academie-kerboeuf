// Carte du programme CE1 — Cycle 2, primaire.
// Structure légère : domaine → sous-domaine → séquence (1 séquence = 1 compétence observable).
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
          subdomainSlug: "numeration",
          label: "Numération",
          entries: [
            {
              id: "ce1-ma-num-valeur-positionnelle",
              levelSlug: "ce1",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "numeration",
              title: "Comprendre la valeur positionnelle des chiffres jusqu'à 1000",
              observableObjective:
                "L'élève décompose un nombre en centaines, dizaines et unités.",
              successCriteria: [
                "Je lis un nombre jusqu'à 1000 en chiffres et en lettres.",
                "Je décompose un nombre en centaines, dizaines et unités.",
                "Je compare deux nombres jusqu'à 1000 et je justifie.",
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
              id: "ce1-ma-cal-addition-soustraction-posees",
              levelSlug: "ce1",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "calcul",
              title: "Poser et calculer des additions et soustractions",
              observableObjective:
                "L'élève pose et calcule une addition ou une soustraction en colonnes avec retenue.",
              successCriteria: [
                "Je pose correctement les chiffres en colonnes.",
                "Je calcule en gérant la retenue.",
                "Je vérifie le résultat.",
              ],
              status: "upcoming",
            },
            {
              id: "ce1-ma-cal-tables-multiplication",
              levelSlug: "ce1",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "calcul",
              title: "Mémoriser et utiliser les tables de multiplication (×2, ×5, ×10)",
              observableObjective:
                "L'élève restitue immédiatement les produits des tables de 2, 5 et 10.",
              successCriteria: [
                "Je récite la table de 2, 5 ou 10 sans erreur.",
                "Je calcule un produit simple sans compter.",
                "J'utilise une table pour résoudre un calcul.",
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
              id: "ce1-ma-geo-reproduire-figures",
              levelSlug: "ce1",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "geometrie",
              title: "Reconnaître et reproduire des figures géométriques",
              observableObjective:
                "L'élève trace et reproduit des figures simples en utilisant les outils adaptés.",
              successCriteria: [
                "J'utilise la règle pour tracer un segment droit.",
                "Je reproduis une figure sur papier quadrillé.",
                "Je nomme les figures courantes (carré, rectangle, triangle).",
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
              id: "ce1-ma-gm-unites-conventionnelles",
              levelSlug: "ce1",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "grandeurs-mesures",
              title: "Mesurer en utilisant des unités conventionnelles",
              observableObjective:
                "L'élève utilise cm, m, kg et euro pour mesurer et comparer des grandeurs.",
              successCriteria: [
                "Je choisis l'unité adaptée à la grandeur mesurée.",
                "Je lis une mesure sur un instrument simple.",
                "Je compare deux mesures de même nature.",
              ],
              status: "upcoming",
            },
          ],
        },
      ],
    },
  ],
};
