# Audit programmes et ressources PDF

Dernière mise à jour : 9 septembre 2026.

Ce document est le journal de reprise du chantier. Une ressource n'est comptée comme auditée que si son contenu et son rendu complet ont été contrôlés. Les statuts de couverture restent provisoires jusqu'à transcription complète du texte officiel applicable.

## Note de continuité (9 septembre 2026, reprise de session)

Ce fichier a été recréé à l'identique depuis la version lue en tête de branche `chantier/v1-polish` (HEAD `da9dea5a`) sur le checkout original synchronisé iCloud, car l'accès Git à ce checkout (log, branch -vv, fetch) est devenu bloquant (attente I/O de plusieurs minutes, cause probable : synchronisation iCloud Drive de `~/Desktop`). Le travail se poursuit depuis un clone local hors iCloud (`~/dev/academie-kerboeuf`, branche `chantier/v1-polish-local`, basée sur `origin/main`).

Deux commits du checkout original (`b7ef056e refactor(product): clarify teacher-first positioning`, `a340d16d fix(availability): derive collège/lycée status from the real PDF catalog`) n'ont pas encore pu être rapatriés dans ce clone (le `git fetch` déclenche le même blocage). Ils restent intacts sur le checkout original — rien n'a été perdu — mais ne sont pas encore reflétés ici. À rapatrier dès que l'accès Git au volume iCloud redevient réactif (`git fetch <chemin-icloud> chantier/v1-polish`), ou en poussant `chantier/v1-polish` vers `origin` pour fiabiliser l'accès.

## Périmètre et protections

- Branche de départ : `chantier/v1-polish` (checkout original) / `chantier/v1-polish-local` (clone de travail).
- HEAD de départ : `a340d16de282e6d2ddba90f62a063e658b5b429c`.
- PDF recensés sous `public/` : 971.
- PDF suivis par Git : 866.
- PDF suffixés ` 2.pdf` protégés : 105 ; suppression interdite.
- PDF `dataless` au démarrage : 272. Ils ne sont pas comptés comme audités tant qu'ils ne sont pas matérialisés.

## Sources officielles applicables en 2026-2027

| Discipline | Texte | Organisme | Date/version | Application utile au primaire | Nature | URL |
| --- | --- | --- | --- | --- | --- | --- |
| Français et mathématiques, cycle 2 | Programmes de français et de mathématiques du cycle 2, BO n° 41 | Ministère de l'Éducation nationale | 31 octobre 2024 | CP, CE1, CE2 depuis la rentrée 2025 | Programme obligatoire avec objectifs annuels | https://www.education.gouv.fr/sites/default/files/Bulletin_officiel_MENJS_2024_10_31_BO41-1734366107.pdf |
| Français et mathématiques, cycle 3 | Programmes de français et de mathématiques du cycle 3, BO n° 16 | Ministère de l'Éducation nationale | 17 avril 2025 | CM1 depuis 2025 ; CM2 à partir de 2026 | Programme obligatoire avec progress annuels | https://www.education.gouv.fr/sites/default/files/Bulletin_officiel_MENJS_2025_04_17_BO16-1744875208.pdf |
| EMC | Programme d'enseignement moral et civique du CP à la terminale, BO n° 24 | Ministère de l'Éducation nationale | 13 juin 2024 | Tous les niveaux du primaire en 2026-2027 | Programme obligatoire, progressif par classe | https://www.education.gouv.fr/media/195556/download |
| Histoire-géographie / espace et temps | Programmes des cycles 2 et 3, BO n° 22 | Ministère de l'Éducation nationale | 28 mai 2026 | Nouveau texte en CP et CM1 en 2026 ; anciens textes encore applicables en CE1, CE2 et CM2 jusqu'en 2027 | Programme obligatoire à déploiement progressif | https://www.education.gouv.fr/bo/2026/Hebdo22/MENE2608631A |
| Sciences et technologie, cycle 3 | Nouveau programme et calendrier d'application | Ministère / Éduscol | juin-juillet 2026 | Nouveau texte en CM1 en 2026 ; programme 2023 maintenu en CM2 jusqu'en 2027 | Programme obligatoire à déploiement progressif | https://eduscol.education.fr/6878/ressources-d-accompagnement-du-programme-de-sciences-et-technologie-au-cycle-3 |
| Repères et attendus | Repères annuels de progression et attendus de fin d'année | Éduscol / DGESCO | septembre 2026 | À utiliser seulement pour les niveaux/textes encore concernés ; ne pas confondre avec le programme obligatoire | Repères annuels et attendus | https://eduscol.education.fr/6910/reperes-annuels-de-progression-et-attendus-de-fin-d-annee-du-cp-la-troisieme |

Date de consultation : 9 septembre 2026.

### Vérification externe (9 septembre 2026)

Deux des dates les plus sensibles de ce tableau — parce qu'elles déterminent le programme applicable au niveau pilote CM2 — ont été recontrôlées par recherche web ce jour :

- **Cycle 3 français/mathématiques (BO n° 16, 17 avril 2025)** : confirmé applicable au CM1 et à la 6e dès la rentrée 2025, et au **CM2 dès la rentrée 2026-2027** (donc dès maintenant). Toute ressource CM2 français/mathématiques doit être mesurée contre ce texte, pas contre l'ancien programme 2018/2020.
- **Histoire-géographie (BO n° 22, 28 mai 2026)** : confirmé applicable au CP et au CM1 dès la rentrée 2026-2027 ; le **CM2 reste sur l'ancien programme jusqu'à la rentrée 2027-2028**. Ne pas auditer les ressources CM2 histoire-géo contre le nouveau texte 2026 par erreur.

Ces deux vérifications confirment que le tableau ci-dessus était déjà exact. Les autres lignes (EMC, sciences, repères) n'ont pas été revérifiées aujourd'hui faute de temps ; elles restent à confirmer avant toute décision de correction de contenu qui s'appuierait dessus.

## Inventaire global initial

| Niveau | PDF | PDF dataless | PDF matériellement accessibles au départ |
| --- | ---: | ---: | ---: |
| Maternelle MS | 9 | 3 | 6 |
| CP | 33 | 13 | 20 |
| CE1 | 28 | 8 | 20 |
| CE2 | 24 | 6 | 18 |
| CM1 | 126 | 32 | 94 |
| CM2 | 259 | 75 | 184 |
| 6e | 186 | 57 | 129 |
| 5e | 66 | 16 | 50 |
| 4e | 57 | 12 | 45 |
| 3e | 75 | 23 | 52 |
| Seconde | 108 | 27 | 81 |
| **Total** | **971** | **272** | **699** |

## Tableau de pilotage

| Indicateur | Valeur actuelle |
| --- | ---: |
| PDF audités visuellement et pédagogiquement | 25 |
| PDF restant à auditer | 946 |
| PDF modifiés | 0 |
| PDF reconstruits | 0 |
| PDF créés | 0 |
| PDF optimisés | 0 |
| Erreurs corrigées | 0 |

## Lot CP - audit initial

### Matrice de couverture CP - premier niveau de lecture

Cette table rapproche les grandes rubriques annuelles obligatoires du BO des ressources PDF effectivement présentes. Elle ne constitue pas encore le décompte final des sous-objectifs.

| Matière | Domaine officiel 2026-2027 | Ressources PDF CP constatées | Couverture provisoire | Action |
| --- | --- | --- | --- | --- |
| Français | Lecture : identifier les mots, lire à voix haute, comprendre un texte, devenir lecteur | 7 triplets centrés sur lettres, sons, syllabes et mots | **Partiel** | Matérialiser tous les triplets ; mesurer séparément décodage, fluence, compréhension et culture de lecteur. |
| Français | Écriture : cursive, encodage/dictée, copie, production d'écrits | Aucun PDF publié dans ce corpus ; plusieurs entrées existent seulement dans l'arbre pédagogique | **Absent dans le corpus PDF CP** | Vérifier les autres emplacements et ne créer qu'après inventaire transversal. |
| Français | Oral : écouter, dire, participer aux échanges | Entrées dans l'arbre, aucun PDF CP constaté | **Absent dans le corpus PDF CP** | Évaluer si un PDF est pertinent ou si la compétence relève surtout de séquences orales. |
| Français | Vocabulaire : enrichir, relier, réemployer, mémoriser l'orthographe lexicale | Entrées dans l'arbre, aucun PDF CP constaté | **Absent dans le corpus PDF CP** | Rechercher d'éventuels supports hors `public/fiches/cp`. |
| Français | Grammaire et orthographe : phrase simple et premiers accords | Aucun PDF CP constaté | **Absent dans le corpus PDF CP** | Cartographier les objectifs annuels précis avant création. |
| Mathématiques | Nombres entiers, quatre opérations, calcul mental, résolution de problèmes | 4 triplets sur dénombrement, lecture-écriture, comparaison et rangement | **Partiel** | Détailler les objectifs de numération et confirmer l'absence visible d'opérations, calcul mental et problèmes. |
| Mathématiques | Grandeurs et mesures : longueurs, masses, monnaie, repérage dans le temps | Entrées dans l'arbre, aucun PDF CP constaté | **Absent dans le corpus PDF CP** | Inventaire transversal puis priorisation. |
| Mathématiques | Espace et géométrie : solides, géométrie plane, repérage | Entrées dans l'arbre, aucun PDF CP constaté | **Absent dans le corpus PDF CP** | Inventaire transversal puis priorisation. |
| Mathématiques | Organisation et gestion de données | Aucun PDF CP constaté | **Absent dans le corpus PDF CP** | Transcrire les objectifs annuels avant décision de ressource. |
| EMC | Programme annuel CP | Entrées de curriculum dans l'arbre, aucun PDF CP constaté | **À vérifier** | Relier chaque entrée au programme EMC et déterminer les supports réellement utiles. |
| Temps/espace/sciences | Nouveau programme cycle 2 appliqué au CP en 2026-2027 | Entrées « Questionner le monde » dans l'arbre, aucun PDF CP constaté | **À vérifier** | Transcrire le nouveau texte 2026 ; ne pas utiliser automatiquement l'ancien découpage. |

Le constat « absent dans le corpus PDF CP » signifie uniquement qu'aucun fichier correspondant n'a été trouvé sous les chemins CP. Il ne prouve ni l'absence de séquence dans le site, ni la nécessité pédagogique d'un PDF autonome.

### Recherche transversale CP — Questionner le monde / EMC (9 septembre 2026)

Suite « prochaine étape sûre » n°4 du lot précédent : recherche de ressources CP QLM/sciences/EMC en dehors de `public/fiches/cp`, sur l'ensemble du dépôt (`content/`, `app/`, `public/`).

Constats :

- `content/cp-subjects.ts` déclare bien 5 matières CP : `francais`, `mathematiques`, `questionner-le-monde`, `enseignements-artistiques`, `eps`, `emc` — la matière QLM et la matière EMC existent donc comme entrées de navigation.
- `content/levels/cp-competencies.ts` (89 compétences CP au total) ne contient qu'**une seule** compétence rattachée à `domainSlug: "questionner-le-monde"`, et **aucune** rattachée à EMC.
- Aucun fichier PDF CP dont le chemin contient `emc`, `qlm` ou `sciences` n'a été trouvé nulle part dans `public/` (recherche par nom de fichier).
- Conclusion : l'absence de ressources CP QLM/EMC n'est pas un artefact de recherche localisée à `public/fiches/cp` — elle est réelle et se double d'un sous-investissement du curriculum map lui-même (89 compétences CP recensées, 1 seule en QLM, 0 en EMC). Avant de créer des PDF, il faut d'abord étoffer `cp-competencies.ts` sur ces deux domaines à partir des textes officiels (BO n° 24 pour l'EMC, nouveau programme cycle 2 pour QLM), sans quoi toute ressource créée n'aurait pas de compétence officielle à laquelle se rattacher proprement.

### Inventaire

- Français : 21 PDF, dont 13 accessibles et 8 `dataless`.
- Mathématiques : 12 PDF, dont 7 accessibles et 5 `dataless`.
- Ressources publiées dans l'arbre du site : 11 compétences (7 en français, 4 en mathématiques), chacune prévue en triplet leçon / exercices / évaluation.
- Aucune ressource PDF QLM, sciences ou EMC n'est présente dans `public/fiches/cp` au moment de l'inventaire. Ce constat ne vaut pas encore preuve définitive d'absence dans tout le dépôt.

### Audit des 20 PDF accessibles

Tous les documents accessibles sont des PDF d'une page au format A4 (595 x 842 points), correctement rendus, sans débordement ni élément manquant visible. Les 20 pages ont été rendues et inspectées le 9 septembre 2026.

Forces communes :

- titre, niveau, matière et compétence explicites ;
- identité Académie Kerboeuf discrète ;
- structure stable entre leçon, exercices et évaluation ;
- contraste sobre compatible avec le noir et blanc ;
- marges sûres et faible consommation d'encre ;
- absence de surcharge décorative.

Faiblesses communes :

- corps typographique trop petit pour une utilisation autonome confortable en CP ;
- très grande quantité d'espace blanc inutilisé sur plusieurs fiches ;
- consignes parfois longues ou supposant une lecture autonome supérieure à la compétence évaluée ;
- évaluations très textuelles, avec peu d'appui visuel ou de manipulation ;
- format A4 peu exploité : la composition ressemble davantage à un contenu A5 placé sur une page A4 qu'à une fiche pensée pour son format final.

Classification provisoire du sous-lot accessible :

| Classe | Nombre | Justification |
| --- | ---: | --- |
| A | 0 | Aucun document ne satisfait encore toutes les exigences CP de lisibilité et d'adaptation au format. |
| B | 5 | Contenu clair et visuel suffisamment structuré ; amélioration non urgente. |
| C | 15 | Document exploitable mais lisibilité, densité ou autonomie CP à améliorer. |
| D | 0 | Aucun défaut significatif rendant une refonte indispensable n'a été démontré. |
| E | 0 | Aucun contenu inutilisable ou erreur critique démontrée. |

La ventilation fichier par fichier sera complétée après matérialisation des 13 PDF restants et confrontation détaillée au programme officiel. Aucune correction n'est engagée avant cette étape afin de préserver la cohérence des triplets.

### Points pédagogiques à vérifier avant modification

- La fiche sur les différentes écritures doit être testée avec la police réellement incorporée : les formes cursives extraites en texte ne suffisent pas à prouver la qualité du tracé.
- Les activités de décodage doivent distinguer clairement lecture par l'élève et consigne lue par l'adulte.
- Le choix des graphèmes et mots exemples doit être replacé dans une progression graphophonologique explicite.
- Les exercices de numération ne couvrent actuellement qu'une petite partie visible du programme CP ; aucun taux n'est publié avant construction de la matrice officielle complète.

### QA du lot

- 20/20 PDF accessibles ouverts avec PyMuPDF.
- 20/20 pages rendues et inspectées.
- 13 PDF `dataless` conservés et non audités.
- PDF modifié : 0.
- PDF supprimé : 0.
- URL modifiée : 0.

## Lot CE1 français - triage et premier audit détaillé

### Inventaire matériel

- 28 PDF recensés : 3 évaluations d'étude de la langue et 25 tapuscrits de lecture-compréhension.
- 20 PDF accessibles localement ; 8 fichiers `dataless` sont conservés et non audités.
- Les 20 fichiers accessibles représentent 342 pages : 2 évaluations d'une page et 18 albums illustrés de 11 à 32 pages.
- Toutes les pages accessibles ont été rendues pour un triage visuel. Ce contact général en miniature ne vaut pas audit page par page et les 20 fichiers ne sont donc pas comptés comme intégralement audités.

### Premier document contrôlé intégralement

`public/fiches/ce1/francais/lecture-comprehension/tapuscrits/01_FRANCAIS_Litterature_Conte_Pranav-Detective.pdf` :

- 15/15 pages rendues et inspectées à une taille lisible ;
- document illustré attribué à Pratham Books / StoryWeaver, avec mentions de licence dans le PDF ;
- bonne lisibilité générale et illustrations engageantes ;
- plusieurs erreurs françaises visibles rendent toutefois le texte impropre à une publication scolaire sans révision : `Peut-tu` au lieu de `Peux-tu`, `Ne t'inquiètes pas` au lieu de `Ne t'inquiète pas`, accords ou formulations fautives (`créés` avec un antécédent féminin), ainsi que plusieurs incohérences de ponctuation et de narration ;
- classe provisoire : **D** (problème éditorial significatif, ressource néanmoins récupérable).

Décision : ne pas modifier le binaire avant d'avoir identifié la source éditable, vérifié précisément la licence d'adaptation et établi une liste exhaustive des corrections. Une réexportation directe du PDF tiers sans traçabilité serait contraire au principe de conservation.

Autres documents contrôlés intégralement :

- `ce1-francais-pluriel-regulier-evaluation.pdf` : une page, consignes claires, items cohérents avec la compétence, place de réponse suffisante, fort contraste et impression noir et blanc satisfaisante ; classe **B**.
- `ce1-francais-reconnaitre-nom-evaluation.pdf` : une page, trois tâches progressives et lisibles, aucune réponse ambiguë détectée ; l'expression générique « nom de chose » pourra être précisée dans une future révision mais ne rend pas l'évaluation incorrecte ; classe **B**.
- `01_FRANCAIS_Litterature_Conte_Jouet-Casse.pdf` : 11/11 pages rendues et contrôlées ; récit cohérent et correctement attribué sous Licence Art Libre, illustrations lisibles, contenu favorable au réemploi ; corps de texte petit pour une lecture autonome CE1, page juridique très dense et quelques conventions typographiques perfectibles ; classe **C**, conservation sans modification.
- `01_FRANCAIS_Litterature_Conte_Petite-Plante.pdf` : 12/12 pages rendues et contrôlées ; imagier documentaire de niveau 2, visuellement clair et correctement attribué sous CC BY 4.0 ; les schémas des parties de la plante sont compréhensibles, mais la formulation « toutes les plantes abritent de nombreuses formes de vie » est trop générale pour constituer seule une référence scientifique ; classe **B** avec réserve factuelle mineure, conservation sans modification.

### Points transversaux issus du triage

- Les tapuscrits sont des albums illustrés tiers, pas des fiches Académie homogènes : ils doivent être évalués comme corpus de littérature et non remaquettés aveuglément.
- Les anomalies d'extraction de texte (ligatures ou glyphes) ne sont pas classées comme fautes tant que le rendu visuel ne les confirme pas.
- Les deux évaluations accessibles sont des pages image et nécessitent un contrôle haute résolution séparé.
- Aucun PDF CE1 n'a été modifié, renommé ou supprimé.

## Constat produit transversal — niveau pilote CM2 sans page compétence (9 septembre 2026)

En reconstruisant l'état réel du produit (voir `docs/parcours-signature-audit.md`), un constat dépasse le seul périmètre PDF et concerne directement la stratégie V1 (`docs/strategie-v1-academie-kerboeuf.md`, qui fait du CM2 le niveau pilote) :

- La page `/primaire/[level]/competences` ne couvre que `cp`, `ce1`, `ce2`, `cm1` (`primaryCompetencyLevels` dans `app/primaire/[level]/competences/page.tsx`). **CM2 n'a pas de page compétence dans ce système**, alors que c'est le niveau mis en avant dans la navigation principale depuis mai 2026.
- Ce constat ne bloque pas l'audit PDF en cours mais doit être traité avant de considérer la fonction signature « Préparer cette compétence » comme fonctionnelle sur le niveau pilote. Détails et priorisation dans `docs/parcours-signature-audit.md`.

## Prochaines étapes sûres

1. Matérialiser ou récupérer sans altération les 13 PDF CP encore `dataless`.
2. Transcrire les objectifs annuels CP des textes officiels français et mathématiques.
3. Relier chaque ressource CP à un objectif officiel précis.
4. ~~Rechercher transversalement les ressources CP QLM/sciences/EMC avant de conclure à une absence.~~ Fait le 9 septembre 2026 (voir section dédiée ci-dessus) : absence confirmée, cause identifiée (curriculum map CP sous-développé sur QLM/EMC, pas seulement absence de PDF).
5. Étoffer `content/levels/cp-competencies.ts` sur QLM et EMC à partir des textes officiels avant toute création de PDF sur ces domaines.
6. Corriger uniquement après compréhension complète des triplets concernés.
7. Rapatrier les 2 commits non poussés de `chantier/v1-polish` (`b7ef056e`, `a340d16d`) dans le clone de travail dès que l'accès Git au volume iCloud redevient fiable.
8. Ajouter CM2 à `primaryCompetencyLevels` (ou au système équivalent) pour que le niveau pilote dispose d'une page compétence — voir `docs/parcours-signature-audit.md`.
