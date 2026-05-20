// Carte du programme CE2 — Domaine Français uniquement (pilote).
// Structure légère : domaine → sous-domaine → compétence attendue.
// Aucun contenu pédagogique complet. Le site organise ; les PDF enseignent.
// Tous les statuts sont "upcoming" : aucun href, aucun lien PDF mort.

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
                "Je peux dire de quoi parle le texte en une ou deux phrases.",
                "Je retrouve une information précise en me repérant dans le texte.",
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
                "L'élève déduit une information qui n'est pas écrite en clair dans le texte.",
              successCriteria: [
                "Je repère les indices dans le texte.",
                "Je formule ce que le texte laisse entendre sans le dire.",
                "Je justifie ma déduction en citant un passage.",
              ],
              status: "upcoming",
            },
            {
              id: "ce2-fr-lc-distinguer-genres",
              levelSlug: "ce2",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "lecture-comprehension",
              title: "Distinguer différents types de textes",
              observableObjective:
                "L'élève reconnaît si un texte est narratif, informatif ou poétique à partir d'indices de forme et de contenu.",
              successCriteria: [
                "Je repère les indices de mise en forme (titre, paragraphes, vers).",
                "Je dis à quoi sert le texte : raconter, informer ou créer une image.",
                "Je justifie mon choix avec un exemple tiré du texte.",
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
                "L'élève produit un texte de cinq à six phrases avec une idée par phrase, dans un ordre logique.",
              successCriteria: [
                "Mon texte a un début, un développement et une fin.",
                "Chaque phrase apporte une idée nouvelle.",
                "J'utilise des connecteurs logiques (d'abord, ensuite, enfin).",
              ],
              status: "upcoming",
            },
            {
              id: "ce2-fr-ec-orthographe-usage",
              levelSlug: "ce2",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "ecriture",
              title: "Orthographier les mots d'usage courant",
              observableObjective:
                "L'élève écrit sans erreur les mots du répertoire de CE2 et vérifie son texte.",
              successCriteria: [
                "Je mémorise l'orthographe des mots fréquents du niveau.",
                "Je relis mon texte pour détecter les erreurs d'orthographe.",
                "Je corrige les mots dont je n'étais pas sûr.",
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
                "L'élève relit son texte et apporte des modifications pour le rendre plus clair ou plus correct.",
              successCriteria: [
                "Je relis en me demandant si on comprend facilement.",
                "Je modifie au moins un élément pour améliorer le texte.",
                "Je vérifie les accords et la ponctuation après révision.",
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
                "J'accorde le déterminant en genre et en nombre.",
                "J'accorde l'adjectif placé avant ou après le nom.",
              ],
              status: "upcoming",
            },
            {
              id: "ce2-fr-edl-conjugaison-present-passe",
              levelSlug: "ce2",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "etude-de-la-langue",
              title: "Conjuguer au présent et au passé composé",
              observableObjective:
                "L'élève conjugue les verbes du 1er groupe et être/avoir au présent et au passé composé.",
              successCriteria: [
                "Je conjugue le verbe au présent selon le sujet.",
                "Je forme le passé composé avec l'auxiliaire et le participe passé.",
                "Je distingue les formes du présent et du passé composé.",
              ],
              status: "upcoming",
            },
            {
              id: "ce2-fr-edl-nature-fonction-simple",
              levelSlug: "ce2",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "etude-de-la-langue",
              title: "Identifier la nature et la fonction d'un mot simple",
              observableObjective:
                "L'élève nomme la nature (nom, verbe, adjectif, déterminant) et une fonction simple (sujet, COD) d'un mot dans une phrase.",
              successCriteria: [
                "Je repère les noms, verbes, adjectifs et déterminants.",
                "Je retrouve le sujet du verbe en posant la question « qui ? ».",
                "Je repère le COD en posant la question « quoi ? » ou « qui ? » après le verbe.",
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
              id: "ce2-fr-or-presenter-sujet-courts",
              levelSlug: "ce2",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "langage-oral",
              title: "Présenter brièvement un sujet connu",
              observableObjective:
                "L'élève expose à voix haute, de façon organisée, ce qu'il sait sur un sujet en deux ou trois points.",
              successCriteria: [
                "Je présente les points dans un ordre logique.",
                "Je parle en phrases complètes sans lire.",
                "Je maintiens un volume audible pour toute la classe.",
              ],
              status: "upcoming",
            },
            {
              id: "ce2-fr-or-ecouter-reformuler",
              levelSlug: "ce2",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "langage-oral",
              title: "Écouter et reformuler le propos d'un camarade",
              observableObjective:
                "L'élève reformule avec ses propres mots ce qu'un camarade vient de dire.",
              successCriteria: [
                "Je n'interromps pas pendant que l'autre parle.",
                "Je reformule en commençant par « Tu as dit que… » ou « D'après toi… ».",
                "Je n'ajoute pas mes propres idées dans la reformulation.",
              ],
              status: "upcoming",
            },
            {
              id: "ce2-fr-or-debattre-point-vue",
              levelSlug: "ce2",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "langage-oral",
              title: "Exprimer et défendre un point de vue simple",
              observableObjective:
                "L'élève donne son avis et avance un argument pour le soutenir lors d'une discussion.",
              successCriteria: [
                "Je dis clairement mon avis.",
                "Je donne au moins une raison avec « parce que » ou « car ».",
                "Je reste poli si quelqu'un n'est pas d'accord avec moi.",
              ],
              status: "upcoming",
            },
          ],
        },
      ],
    },
  ],
};
