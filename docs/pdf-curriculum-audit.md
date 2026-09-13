# Audit programmes et ressources PDF

Dernière mise à jour : 9 septembre 2026.

Ce document est le journal de reprise du chantier. Une ressource n'est comptée comme auditée que si son contenu et son rendu complet ont été contrôlés. Les statuts de couverture restent provisoires jusqu'à transcription complète du texte officiel applicable.

## Note de continuité (9 septembre 2026, reprise de session)

Ce fichier a été recréé à l'identique depuis la version lue en tête de branche `chantier/v1-polish` (HEAD `da9dea5a`) sur le checkout original synchronisé iCloud, car l'accès Git à ce checkout (log, branch -vv, fetch) est devenu bloquant (attente I/O de plusieurs minutes, cause probable : synchronisation iCloud Drive de `~/Desktop`). Le travail se poursuit depuis un clone local hors iCloud (`~/dev/academie-kerboeuf`, branche `chantier/v1-polish-local`, basée sur `origin/main`).

**Mise à jour** : le checkout iCloud est redevenu réactif environ 20 minutes plus tard. Les deux commits de code non poussés ont pu être inspectés directement (`git show`, en ciblant les fichiers précis pour éviter un sous-arbre `public/` resté partiellement illisible) :

- `b7ef056e refactor(product): clarify teacher-first positioning` (metadata SEO de la home + `DEFAULT_SITE_DESCRIPTION`) — **déjà présent à l'identique sur `origin/main`**, vraisemblablement fusionné via une autre branche entre-temps.
- `a340d16d fix(availability): derive collège/lycée status from the real PDF catalog` (`hasRealSecondaryCatalogContent` dans `content/site-availability.ts`) — **également déjà présent à l'identique sur `origin/main`**, même constat.

Conclusion : aucun contenu de code n'est réellement perdu ni à rapatrier. Le dépôt a une telle activité parallèle (150+ branches distantes recensées) que ces deux correctifs ont visiblement déjà été réintégrés par un autre chemin. Seuls les 3 commits de documentation (`docs(curriculum): ...`) étaient uniques à `chantier/v1-polish` et sont maintenant repris dans ce fichier et les deux nouveaux documents associés.

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
| PDF audités intégralement (toutes pages, contenu contrôlé) | 291 (33 CP + **28 CE1 — niveau clos** + 24 CE2 + **126 CM1 — niveau clos** + 78 CM2 : mathématiques 59/59 closes + français conjugaison 19/19 closes) |
| PDF restant à auditer | 680 (dont 76 CM2 français restants) |
| PDF modifiés | 17 (5 corrections d'erreurs + 12 différenciation pédagogique CM1) |
| PDF reconstruits | 0 |
| PDF créés | 0 |
| PDF optimisés | 0 |
| Erreurs corrigées | 4 |
| Erreurs confirmées, non corrigées (limite technique) | 2 lots, 4 PDF (voir CM2 `reconnaitre-le-patron-dun-solide` et `passe-compose-avoir`) |

Note de méthode : le total de référence reste 971 (base historique du checkout iCloud, 105 doublons ` 2.pdf` protégés inclus). Le clone de travail (`~/dev/academie-kerboeuf`) ne contient que les 866 PDF suivis par Git — les 105 doublons non suivis sont des copies de conflit iCloud du même contenu, jamais destinées à être commitées ; auditer la version suivie couvre donc le même contenu que son doublon non suivi. **Découverte importante du 9 septembre 2026 (après-midi) : le clone de travail n'a aucun PDF `dataless` — les 272 PDF bloqués sur le checkout iCloud sont tous matérialisés ici.** L'obstacle qui limitait l'audit à 20/33 PDF CP est donc levé.

## Lot CP - audit initial

### Matrice de couverture CP - premier niveau de lecture

Cette table rapproche les grandes rubriques annuelles obligatoires du BO des ressources PDF effectivement présentes. Elle ne constitue pas encore le décompte final des sous-objectifs.

| Matière | Domaine officiel 2026-2027 | Ressources PDF CP constatées | Couverture provisoire | Action |
| --- | --- | --- | --- | --- |
| Français | Lecture : identifier les mots, lire à voix haute, comprendre un texte, devenir lecteur | 7 triplets centrés sur lettres, sons, syllabes et mots — **tous audités intégralement, contenu vérifié exact** | **Partiel** (décodage seul couvert ; fluence et compréhension de texte absentes du corpus PDF CP) | Le décodage est solide et correct. Prioriser la compréhension de texte et la fluence pour la suite, pas de nouvelle correction nécessaire sur le décodage. |
| Français | Écriture : cursive, encodage/dictée, copie, production d'écrits | Aucun PDF publié dans ce corpus ; plusieurs entrées existent seulement dans l'arbre pédagogique | **Absent dans le corpus PDF CP** | Vérifier les autres emplacements et ne créer qu'après inventaire transversal. |
| Français | Oral : écouter, dire, participer aux échanges | Entrées dans l'arbre, aucun PDF CP constaté | **Absent dans le corpus PDF CP** | Évaluer si un PDF est pertinent ou si la compétence relève surtout de séquences orales. |
| Français | Vocabulaire : enrichir, relier, réemployer, mémoriser l'orthographe lexicale | Entrées dans l'arbre, aucun PDF CP constaté | **Absent dans le corpus PDF CP** | Rechercher d'éventuels supports hors `public/fiches/cp`. |
| Français | Grammaire et orthographe : phrase simple et premiers accords | Aucun PDF CP constaté | **Absent dans le corpus PDF CP** | Cartographier les objectifs annuels précis avant création. |
| Mathématiques | Nombres entiers, quatre opérations, calcul mental, résolution de problèmes | 4 triplets sur dénombrement, lecture-écriture, comparaison et rangement — **tous audités intégralement, calculs et dénombrements recomptés exacts** | **Partiel** (numération seule couverte ; opérations, calcul mental et problèmes absents du corpus PDF CP) | La numération est solide et correcte. Aucun PDF d'opérations/calcul mental/problèmes trouvé sous `public/fiches/cp/mathematiques` — absence confirmée, pas seulement provisoire. |
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

### Audit final des 33 PDF CP (9 septembre 2026, lot complet)

Les 13 PDF encore `dataless` lors du premier passage sont maintenant matérialisés (voir note de méthode ci-dessus). Les 33 PDF CP (7 compétences français, 4 compétences mathématiques, triplet leçon/exercices/évaluation) ont été relus intégralement un par un — texte contrôlé, rendu visuel inspecté, contenu vérifié contre les connaissances graphophonologiques (français) et arithmétiques (mathématiques) attendues en CP.

**Résultat contenu** : 32/33 PDF corrects sans réserve. Aucune erreur mathématique (tous les dénombrements de points, comparaisons et rangements de nombres recomptés et vérifiés exacts par script), aucune erreur de correspondance graphème-phonème, aucun barème d'évaluation incohérent (chaque total `/10` recalculé et vérifié).

**Une erreur trouvée et corrigée** : `cp-francais-reconnaitre-les-lettres-en-differentes-ecritures-exercices.pdf` et `...-evaluation.pdf` utilisaient le caractère Unicode « ɑ » (LATIN SMALL LETTER ALPHA, U+0251) à la place de la lettre « a » dans un exercice de reconnaissance des écritures (« Entoure les trois écritures de la lettre a : A m a e ɑ »). Ce glyphe n'existe dans aucune police pédagogique française et ne correspond à aucune écriture enseignée (capitale/script/cursive) — probable bug de génération. **Corrigé** par édition ciblée du PDF (redaction + réinsertion du glyphe « a » à la position, taille et couleur exactes, polices ArialMT/Arial-BoldMT déjà utilisées sur la page) ; les deux fichiers ont été rendus à nouveau et vérifiés visuellement après correction — aucun décalage, aucun artefact visible à l'impression. Seul un artefact mineur et sans conséquence subsiste dans l'ordre de lecture du calque texte (accessibilité lecteur d'écran/copier-coller), le rendu visuel et imprimé est correct.

Forces communes (33/33) :

- titre, niveau, matière et compétence explicites ;
- contenu français et mathématique exact, vérifié ligne par ligne ;
- structure stable et progressive entre leçon (JE RETIENS/JE COMPRENDS), exercices (4 paliers de difficulté croissante) et évaluation (barème cohérent) ;
- exemples et mots choisis réels, adaptés au niveau, sans mot inventé ;
- contraste sobre compatible avec le noir et blanc, marges sûres.

Faiblesse commune la plus visible : **sous-exploitation du format A4**, en particulier sur les pages leçon (table d'exemples en haut de page, bas de page presque entièrement vide). Cette faiblesse est cosmétique — aucun impact sur l'exactitude ou l'utilisabilité du contenu — donc classée comme amélioration à faible priorité (mission section 12 : prioriser E/D/C à fort impact, pas la simple uniformisation).

Classification finale (33/33, remplace la classification provisoire) :

| Classe | Nombre | Détail |
| --- | ---: | --- |
| A | 0 | — |
| B | 22 | Les 11 pages « exercices » et les 11 pages « évaluation » : contenu exact, espace de réponse déjà prévu (lignes pointillées, cases à points), pas d'amélioration urgente. |
| C | 11 | Les 11 pages « leçon » : contenu exact mais mise en page sous-exploitée (grand espace blanc en bas de page) ; amélioration possible mais à faible impact pédagogique, différée. |
| D | 0 | — |
| E | 0 | — |

### Points pédagogiques vérifiés

- Progression graphophonologique cohérente à l'intérieur de chaque triplet (m, l, s, f, r puis digraphes ch/ou/on/an) — aucune lettre ou son non enseigné n'est utilisé sans introduction préalable dans les mots/phrases d'exercice.
- Les activités de décodage distinguent explicitement dans les consignes ce qui est lu par l'élève et ce qui est montré/dit par l'adulte (ex. « Nomme les lettres montrées par l'adulte »).
- Numération CP (dénombrement, comparaison, rangement, lecture/écriture jusqu'à 100) : tous les exemples recalculés exacts, y compris les cas irréguliers du français (soixante-dix, quatre-vingts, quatre-vingt-douze) correctement traités.
- La police cursive de `reconnaitre-les-lettres-en-differentes-ecritures-lecon.pdf` (colonne « Cursive » de la leçon, non affectée par la correction ci-dessus) reste à valider face à la police d'écriture cursive réellement enseignée en classe (ex. méthode Dumont) — observation reportée, non bloquante, car il s'agit d'un choix de police et non d'une erreur de contenu.

### QA du lot

- 33/33 PDF CP ouverts et lus intégralement (texte + rendu visuel) avec l'outil de lecture PDF et PyMuPDF pour les vérifications ciblées (comptage de points, positions de glyphes).
- 33/33 pages rendues et inspectées visuellement, avant et après correction pour les 2 fichiers modifiés.
- Dénombrements et barèmes recalculés par script pour élimination du risque d'erreur de comptage manuel.
- PDF modifiés : 2 (`reconnaitre-les-lettres-en-differentes-ecritures-exercices.pdf`, `...-evaluation.pdf`).
- PDF supprimé : 0. PDF renommé : 0. URL modifiée : 0.
- Aucun des 105 PDF protégés ` 2.pdf` n'existe dans ce lot (niveau CP, hors zone des doublons).

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

### Continuation du lot CE1 (9 septembre 2026, après-midi) — 5 PDF supplémentaires audités intégralement

Sans reprendre les 5 PDF déjà validés ci-dessus. Tous les PDF CE1 sont désormais matérialisés (plus de blocage `dataless`), 33 PDF sur 28 restent donc à traiter au-delà de ce sous-lot (18 tapuscrits non encore audités individuellement).

- `ce1-francais-nom-commun-propre-evaluation.pdf` : page unique, gabarit illustré différent des évaluations précédentes (mascotte, cases « Je sais faire seul »), contenu exact (classement nom commun/propre, majuscules) sans ambiguïté ; classe **B**.
- `01_FRANCAIS_Litterature_Conte_Nouveau-Camarade.pdf` (11 pages) : récit inclusif (personnage en fauteuil roulant), contexte himalayen/bouddhiste traité avec respect, page finale « Nos sens » scientifiquement correcte (cinq sens), aucune erreur de français relevée, licence CC BY 4.0 complète et correcte ; classe **B**.
- `01_FRANCAIS_Litterature_Conte_Mystere-Chaussettes.pdf` (12 pages) : conte fantaisiste sans prétention factuelle, aucune erreur de français, licence correcte ; classe **B**.
- `01_FRANCAIS_Litterature_Conte_Feuille-Voyage.pdf` (13 pages) : Level 1 (démarrage lecture autonome), phrases courtes et correctes, licence correcte. **Vérification méthodologique notable** : la couche texte de la page 4 extrait « a ëotté » au lieu de « a flotté » (mapping ToUnicode défaillant sur la ligature « fl ») ; un zoom du rendu réel à x3 confirme que **le rendu visuel affiche bien « a flotté »**, sans coupure ni artefact — conformément à la règle du lot, ceci n'est pas compté comme une faute de contenu, seulement noté comme une limite d'accessibilité (copier-coller, lecteur d'écran) qui n'affecte pas l'impression ; classe **B**.
- `01_FRANCAIS_Litterature_Conte_Maisons-Animaux.pdf` (12 pages) : documentaire animalier Level 1, toutes les affirmations factuelles vérifiées exactes (nids d'oiseaux et abeilles en hauteur, toiles d'araignées, termitières, croissance de la coquille d'escargot/carapace de tortue avec l'animal, terriers de lapins/rats, vie arboricole des singes, tanières d'ours/loups, marais des crocodiles, forêts des cerfs/tigres), conclusion pédagogique simple et correcte (« la planète Terre ») ; classe **B**, aucune réserve factuelle contrairement à `Petite-Plante.pdf`.

Aucune erreur trouvée dans ce sous-lot. Aucun PDF modifié dans ce sous-lot (à la différence du lot CP).

### Mathématiques CE1 — absence confirmée

`public/fiches/ce1/mathematiques` **n'existe pas**. Les 28 PDF CE1 sont à 100 % du domaine français (étude de la langue + lecture-compréhension). Conforme au constat déjà fait dans la matrice de couverture initiale, désormais vérifié directement sur le système de fichiers plutôt que déduit. Aucune ressource PDF de mathématiques n'existe pour ce niveau — absence totale, pas seulement partielle.

## CE1 — niveau clos (9 septembre 2026, fin de journée) : 28/28 PDF audités intégralement

**Le CE1 est maintenant entièrement audité.** Les 18 tapuscrits restants (listés au point 9 de « Prochaines étapes sûres » de la section précédente) ont été ouverts, lus intégralement et contrôlés page par page dans ce lot, sans reprendre les 10 PDF déjà validés lors des lots précédents.

### Résultat du sous-lot (18 tapuscrits)

| Fichier | Pages | Classe | Constat |
| --- | ---: | --- | --- |
| Aventure-Estivale | 15 | B | Album sans texte (0 mot sur les pages de récit, vérifié par script) — genre légitime pour un travail de narration à partir des images, mais à étiqueter clairement « sans texte » côté catalogue si ce n'est pas déjà le cas. |
| Becs | 16 | B | **1 erreur factuelle trouvée et corrigée** : la fiche affirmait que le bec coloré du toucan lui permet de « se camoufler parmi les fleurs » — c'est scientifiquement erroné (un bec aussi voyant n'est pas un camouflage ; la fonction reste débattue mais penche vers la thermorégulation et la séduction). Remplacé par « un bec léger et coloré qui leur sert à attraper des fruits et à attirer un partenaire ». Le reste du documentaire (pics, martins-pêcheurs, moineaux, spatules, flamants, perroquets, calaos, souïmangas, colibris, pélicans, macareux) vérifié exact. |
| Belle-Disparu | 28 | A | Excellente enquête policière, logique de l'indice rigoureuse, aucune erreur de français. |
| Chasse-Tresor | 22 | B | Filtre à eau en sable/gravier scientifiquement correct (ordre des couches, rappel de faire bouillir l'eau) ; incohérence mineure de prénom (« Babu » puis « Badu » page 16), non corrigée (impact quasi nul). |
| Eric-Porc-Epic | 18 | B | Histoire d'inclusion, aucune erreur de français ; morale légèrement ambiguë (le personnage change son apparence pour être accepté) mais reste une histoire d'amitié positive et cohérente. |
| Experiences-Meteo-Anna | 22 | A | Biographie d'Anna Mani (vraie scientifique indienne, météorologue) vérifiée exacte (C.V. Raman, Imperial College, India Meteorological Department) ; explication de la couche d'ozone correcte. |
| Griffes | 19 | A | Documentaire zoologique, 12 exemples d'usage des griffes/serres tous vérifiés exacts. |
| Ikru-Premier-Jour | 14 | B | Album sans texte, **correctement étiqueté comme tel** dans sa notice (« ce livre sans paroles... »). |
| Jouet-Perdu | 15 | B | Album sans texte ; notice indique par erreur « moins de 50 mots » alors que 0 mot sur les pages de récit (incohérence de métadonnée héritée du gabarit anglophone, non corrigée — impact faible, jaquette uniquement). |
| Mangouste-Grenouille | 17 | B | Conte à devinettes zoologiques, six animaux correctement décrits. |
| Nettoyage-Plage | 25 | A | **Toutes les fractions vérifiées exactes à la main** (1/4, 3/4, 1/2 recalculés sur les données de l'histoire) ; contenu civique/environnemental de qualité. |
| Plantes-Partout | 18 | B | Documentaire botanique, toutes les affirmations vérifiées exactes. |
| Plastique-Chic | 29 | A | Statistiques environnementales vérifiées (450 ans de dégradation, incident réel de la baleine échouée en Indonésie en 2018). |
| Poisson-Nager | 18 | B | Conte fantaisiste, aucune erreur. |
| Poochi-Amis | 29 | B | Conte fantaisiste positif sur l'acceptation de soi ; le raccourci « les chenilles fabriquent du compost » est scientifiquement approximatif mais reste dans un cadre assumé de fiction (créature à 100 pattes, six yeux), non corrigé. |
| Rentree-Reve | 15 | B | **1 erreur de grammaire trouvée et corrigée** : « nous somme retournés » → « nous sommes retournés » (accord du verbe être, 1re personne du pluriel). Calculs du tableau (13+13=26, 30-4=26) vérifiés exacts. |
| Tresors-Sam | 17 | B | Conte sur l'honnêteté, aucune erreur. |
| Trier-Recycler | 22 | A | Documentaire sur le tri/recyclage, les 5 R corrects, message de sécurité sur les médicaments pertinent. |

**Bilan du sous-lot** : 18/18 audités, 5 classe A, 13 classe B, 0 C/D/E, 2 PDF modifiés (`Becs.pdf`, `Rentree-Reve.pdf`), 2 erreurs corrigées, 2 imperfections mineures identifiées et documentées sans correction (impact jugé trop faible pour justifier une édition binaire : un prénom, une jaquette de métadonnée tierce).

### Bilan complet CE1 (28/28)

| Indicateur | Valeur |
| --- | ---: |
| PDF CE1 audités | 28 / 28 (100 %) |
| PDF CE1 modifiés | 2 |
| PDF CE1 inchangés (déjà conformes) | 26 |
| PDF CE1 créés | 0 |
| PDF CE1 restants | 0 |
| Classe A | 5 |
| Classe B | 20 |
| Classe C | 1 (`01_FRANCAIS_Litterature_Conte_Jouet-Casse.pdf`, lot précédent — corps de texte petit, conservé sans modification) |
| Classe D | 1 (`01_FRANCAIS_Litterature_Conte_Pranav-Detective.pdf`, lot précédent — erreurs éditoriales dans le texte tiers, non corrigées faute de source éditable identifiée) |
| Classe E | 0 |

### Couverture réelle du programme CE1 par matière

| Matière | Couverture | Détail |
| --- | --- | --- |
| Français — lecture-compréhension | **Couverte et auditée à 100 %**, qualité majoritairement A/B | 25 tapuscrits (albums de littérature jeunesse CC BY, majoritairement StoryWeaver/Book Dash) + 3 évaluations d'étude de la langue. 2 erreurs de contenu trouvées et corrigées sur l'ensemble du corpus. |
| Français — écriture, oral, vocabulaire, grammaire (hors étude de la langue évaluée) | **Non couverte par des PDF** | Aucun PDF trouvé sous `public/fiches/ce1` pour ces domaines ; à confirmer transversalement (même méthode que pour CP) avant de conclure définitivement. |
| Mathématiques (tous domaines) | **Absente à 100 %** | `public/fiches/ce1/mathematiques` n'existe pas. Aucune ressource. |
| Questionner le monde | **Quasi absente** | 4 compétences dans le curriculum map (`questionner-le-monde` + `matiere-objets`), 0 PDF. |
| EMC | **Absente à 100 %, y compris dans le curriculum map** | 0 compétence, 0 PDF (constat systémique CP/CE1/CE2, voir section dédiée plus haut). |

**Conclusion honnête** : le CE1 est un niveau très solide en lecture-compréhension (qualité vérifiée, peu d'erreurs, corrigées) mais **structurellement déséquilibré** — aucune ressource en mathématiques, très peu en questionner-le-monde, rien en EMC. « CE1 audité à 100 % » signifie que tout ce qui existe a été contrôlé, pas que le programme CE1 est couvert à 100 %.

### QA de clôture CE1

- 18/18 PDF de ce sous-lot ouverts et lus intégralement (texte + rendu visuel), soit 28/28 pour l'ensemble du niveau.
- 2 corrections appliquées, chacune rendue et vérifiée visuellement avant/après (voir détail par fichier ci-dessus).
- Aucune suppression, aucun renommage, aucune modification hors périmètre.
- Aucun des 105 PDF protégés ` 2.pdf` dans ce niveau.
- `git diff --check` exécuté avant commit (voir ci-dessous).

## Lot CE2 — audit intégral complet (9 septembre 2026, français ET mathématiques)

Contrairement à CP et CE1, CE2 a une structure de triplets homogène (comme CP) et couvre déjà les deux matières prioritaires. **Les 24 PDF CE2 (4 compétences français, 4 compétences mathématiques, triplet leçon/exercices/évaluation) ont été audités intégralement dans ce lot — 24/24, aucun report.**

### Français CE2 — lecture-compréhension (4 compétences, 12 PDF)

Compétences : comprendre un texte plus long lu seul, prélever une information précise, repérer une information implicite, résumer un court paragraphe. Toutes construites sur le même gabarit rigoureux : texte support inédit à chaque palier/évaluation, 4 paliers de difficulté croissante, barème `/10` toujours cohérent avec le détail des points.

**1 défaut trouvé et corrigé** : `ce2-francais-ce2-fr-lc-comprendre-texte-long-lecon.pdf` affichait le titre de section « JE COMPRENDS » en double (le titre de la section et celui de l'encadré interne, qui aurait dû porter un intitulé propre comme dans les 3 autres leçons de ce lot — ex. « JE CHERCHE », « JE CHERCHE LES INDICES », « JE CHERCHE L'ESSENTIEL »). Corrigé en supprimant le doublon (redaction + recoloriage exact du fond de l'encadré, `#f6f9f7`) ; rendu vérifié visuellement avant/après, aucun artefact.

Aucune erreur de français, aucune incohérence de barème, aucun texte support incompatible avec sa question. Classification : **B** pour les 12 PDF (contenu et pédagogie solides ; même réserve mineure d'espace que d'autres niveaux, non bloquante).

### Mathématiques CE2 — nombres et calculs (4 compétences, 12 PDF)

Compétences : lire/écrire/ordonner les nombres entiers, multiplier par 2/5/10, poser et calculer une addition ou une soustraction, utiliser des stratégies de calcul mental. **Tous les calculs des 12 PDF ont été refaits à la main** (dénombrements, comparaisons, tables de multiplication, additions/soustractions posées avec et sans retenue, décompositions de calcul mental par passage à la dizaine) : **zéro erreur trouvée**. Points forts pédagogiques notables :
- progressivité délibérée retenue/sans-retenue dans le lot « poser une addition/soustraction » (paliers 1-3 sans retenue pour l'automatisation du geste, palier 4 avec retenue pour le transfert) ;
- stratégies de calcul mental correctement justifiées et vérifiées (`38 + 7 = 45`, `52 − 9 = 43`, etc.) ;
- barèmes `/10` systématiquement exacts.

Aucun PDF modifié dans ce sous-lot (aucun défaut trouvé). Classification : **B** pour les 12 PDF.

### Couverture programme CE2 (mise à jour honnête)

| Matière | Domaine couvert par les PDF existants | Couverture | Domaines encore absents |
| --- | --- | --- | --- |
| Français | Lecture-compréhension (4 sous-compétences) | **Partiel**, mais qualité vérifiée excellente | Écriture, oral, vocabulaire, grammaire/orthographe — non vérifiés dans ce lot, absence à confirmer transversalement (même méthode qu'au CP) |
| Mathématiques | Nombres et calculs (4 sous-compétences) | **Partiel**, mais qualité vérifiée excellente | Grandeurs et mesures, espace et géométrie, organisation de données, résolution de problèmes autonome — non trouvés sous `public/fiches/ce2`, absence à confirmer |

### QA du lot CE2

- 24/24 PDF ouverts et lus intégralement (texte + rendu visuel).
- Tous les calculs recomptés à la main (aucun script nécessaire, opérations simples à vérifier directement).
- 1 PDF modifié et revérifié visuellement avant/après.
- PDF supprimé : 0. PDF renommé : 0. URL modifiée : 0. Aucun des 105 PDF protégés ` 2.pdf` dans ce lot.

## Recherche transversale QLM/EMC — CE1 et CE2 (9 septembre 2026)

Même méthode que pour CP (voir plus haut), appliquée à CE1 et CE2 :

| Niveau | Compétences « questionner-le-monde »/QLM dans le curriculum map | Compétences EMC dans le curriculum map | PDF QLM/sciences/EMC trouvés |
| --- | ---: | ---: | ---: |
| CP | 1 sur 89 | 0 sur 89 | 0 |
| CE1 | 4 sur 36 (2 `questionner-le-monde` + 2 `matiere-objets`) | 0 sur 36 | 0 |
| CE2 | 4 (2 `questionner-le-monde` + 2 `espace-temps`) | 0 | 0 |

**Constat systémique, pas isolé à un niveau** : l'EMC est totalement absent du curriculum map à CP, CE1 et CE2 (0 compétence sur les trois niveaux), alors que la matière `emc` est bien déclarée dans la navigation (`cp-subjects.ts`, `ce1-subjects.ts`, `ce2-subjects.ts`). QLM est présent mais très minoritaire partout. Aucun PDF QLM/sciences/EMC n'existe pour aucun de ces trois niveaux. Cette absence répétée aux trois premiers niveaux primaires suggère une décision ou un oubli au niveau de la conception du curriculum map lui-même, pas un simple retard de production de PDF niveau par niveau — à signaler explicitement comme point nécessitant une décision produit (créer les compétences EMC dans les curriculum maps avant tout PDF, cf. mission section EMC : rester conforme aux textes officiels, éviter les formulations militantes).

## Constat produit transversal — niveau pilote CM2 sans page compétence (9 septembre 2026)

En reconstruisant l'état réel du produit (voir `docs/parcours-signature-audit.md`), un constat dépasse le seul périmètre PDF et concerne directement la stratégie V1 (`docs/strategie-v1-academie-kerboeuf.md`, qui fait du CM2 le niveau pilote) :

- La page `/primaire/[level]/competences` ne couvre que `cp`, `ce1`, `ce2`, `cm1` (`primaryCompetencyLevels` dans `app/primaire/[level]/competences/page.tsx`). **CM2 n'a pas de page compétence dans ce système**, alors que c'est le niveau mis en avant dans la navigation principale depuis mai 2026.
- Ce constat ne bloque pas l'audit PDF en cours mais doit être traité avant de considérer la fonction signature « Préparer cette compétence » comme fonctionnelle sur le niveau pilote. Détails et priorisation dans `docs/parcours-signature-audit.md`.

## Lot CM1 — inventaire, cartographie et premier sous-lot français (9 septembre 2026)

### Inventaire complet

- 126 PDF CM1 : 75 français (25 compétences × 3) + 51 mathématiques (17 compétences × 3).
- Domaines français : écriture (7 compétences, `francais-ecriture-*`), étude de la langue/grammaire (4), lecture-récits (3), lecture-documentaire (4), lecture-croiser-sources (3), oral (2), orthographe (2).
- Domaines mathématiques : nombres-calculs (7 compétences dont numération et calcul posé), grandeurs-mesures (3), géométrie (3), problèmes (4).
- **Aucun PDF** histoire-géographie, sciences ou EMC (0 sur 126 — les 9 résultats initiaux d'une recherche par mot-clé « geo » étaient tous de la géométrie mathématique, faux positifs corrigés après vérification).

### Cartographie programme — différence notable avec CP/CE1/CE2

Contrairement aux trois niveaux précédents, `content/levels/cm1-competencies.ts` **contient déjà** des compétences dans les domaines `histoire-geographie`, `geographie`, `antiquite`, `sciences` et `vivant` (au moins 8 compétences à cheval sur ces domaines). Le sous-investissement du curriculum map n'est donc **pas** un problème à CM1 pour histoire-géo/sciences — c'est bien la production de PDF qui manque, pas la cartographie du programme. **EMC reste à 0 compétence** dans `cm1-competencies.ts` malgré la matière déclarée dans `cm1-subjects.ts` — le constat systémique CP/CE1/CE2/CM1 se confirme donc sur ce seul point.

### Sous-lot français — domaine écriture (4/7 compétences auditées intégralement, 12 PDF)

Compétences auditées : adapter son écrit au destinataire, planifier son écrit avant de rédiger, écrire un paragraphe argumenté court (« idée-raison-exemple »), écrire un paragraphe argumenté court (« rédiger »). Toutes contrôlées page par page (texte + rendu visuel), contenu exact, barèmes `/10` recalculés et corrects, aucune faute de français.

**Constat important — pas une simple faute, une question de structure du catalogue** : les compétences `francais-ecriture-rediger-idee-raison-exemple` et `francais-ecriture-rediger-paragraphe-argumente` sont **quasiment identiques** :

- même titre affiché sur les trois fiches : « Écrire un paragraphe argumenté court » ;
- même domaine (« ÉCRITURE - RÉDIGER ») ;
- objectifs formulés différemment mais fonctionnellement identiques (« donner une idée, une raison et un exemple » vs « rédiger un paragraphe court qui énonce une idée et l'appuie par un exemple ou une raison ») ;
- exercices structurellement identiques (mêmes 4 paliers : formuler un avis → choisir une raison → ajouter un exemple → rédiger un paragraphe complet), seul le sujet contextuel change (l'ombre dans la cour / un coin lecture dans la cour).

Cela représentait 6 PDF (2 compétences × 3) qui enseignaient et évaluaient la même compétence sous deux étiquettes différentes du catalogue.

### Doublon résolu par différenciation pédagogique (9 septembre 2026, décision explicite)

**Décision reçue : ne pas fusionner ni supprimer. Différencier nettement les deux compétences.** Les 6 PDF ont été modifiés en conséquence, sans toucher au curriculum map, aux routes ni aux slugs (uniquement le contenu visible des fiches) :

| | `rediger-idee-raison-exemple` (avant) | `rediger-idee-raison-exemple` (après) |
| --- | --- | --- |
| Titre | « Écrire un paragraphe argumenté court » | **« Structurer une idée, une raison, un exemple »** |
| En-tête de domaine | ÉCRITURE - RÉDIGER | **ÉCRITURE - STRUCTURER SON ARGUMENT** |
| Objectif | Donner une idée, une raison et un exemple | Reconnaître et **compléter** la structure idée → raison → exemple (guidé) |
| Nature des exercices | Production libre à 4 paliers | **Reconnaissance, remise en ordre, texte à trous, puis courte production guidée** |

| | `rediger-paragraphe-argumente` (avant) | `rediger-paragraphe-argumente` (après) |
| --- | --- | --- |
| Titre | « Écrire un paragraphe argumenté court » | **« Rédiger un paragraphe argumenté avec des connecteurs »** |
| En-tête de domaine | ÉCRITURE - RÉDIGER (inchangé, volontairement — signale le niveau « production ») | ÉCRITURE - RÉDIGER |
| Objectif | Rédiger un paragraphe court avec idée + exemple ou raison | Rédiger un **paragraphe cohérent de plusieurs phrases**, avec **connecteurs**, en réinvestissant la structure de la fiche précédente |
| Nature des exercices | Production libre à 4 paliers, structure identique à l'autre fiche | **Repérer des connecteurs dans un modèle, produire des phrases reliées, rédiger un paragraphe complet avec objection (palier défi)** |

La fiche « Prérequis » de `rediger-paragraphe-argumente` renvoie désormais explicitement à `rediger-idee-raison-exemple` (« Connaître la structure idée → raison → exemple »), rendant la progression entre les deux compétences explicite pour l'enseignant.

Méthode technique : édition ciblée de chaque PDF (redaction + réinsertion du texte à la position, taille, police et couleur d'origine — même technique que les corrections précédentes), sans toucher aux cadres, couleurs de fond ni éléments graphiques. Chaque fichier rendu et inspecté visuellement après modification ; deux incidents mineurs détectés et corrigés en cours de travail avant validation finale :
- un fragment de texte résiduel (« o » isolé) laissé par une redaction trop étroite sur une case à cocher — corrigé par une redaction élargie et réinsertion propre ;
- un barème d'évaluation temporairement décalé (11/10 au lieu de 10/10) après qu'une redaction a recouvert par erreur une étiquette de points existante — détecté par recalcul systématique du barème, corrigé avant validation.

### QA du sous-lot

- 12/12 PDF ouverts et lus intégralement (texte + rendu visuel) lors de l'audit initial.
- 6/6 PDF différenciés relus et inspectés visuellement après modification (page complète + zooms ciblés sur chaque zone éditée).
- Barèmes recalculés sur les 2 évaluations modifiées : 2+2+3+3=10 (`rediger-idee-raison-exemple`) et 2+3+3+2=10 (`rediger-paragraphe-argumente`), tous deux corrects après correction de l'incident décrit ci-dessus.
- Recherche de texte résiduel de l'ancien titre commun (« Écrire un paragraphe argumenté court ») sur les 6 fichiers : aucune occurrence restante.
- Aucune suppression, aucun renommage de fichier, aucun changement de route ou de slug.

### Domaine écriture CM1 — clos (9 septembre 2026) : 7/7 compétences, 21 PDF

Les 3 compétences restantes du domaine écriture ont été auditées intégralement : `rediger-reviser` (« Relire pour améliorer la clarté » — repérer une maladresse ponctuelle et la corriger), `rediger-reviser-grille` (« Réviser un texte avec une grille » — application méthodique de 5 critères), `rediger-texte-structure` (« Produire un texte structuré » — début/développement/fin). Vérification spécifique que `rediger-reviser` et `rediger-reviser-grille` ne forment pas un nouveau doublon malgré leur proximité de nom : **confirmé distinctes** (l'une cible un défaut précis à corriger, l'autre applique une grille de critères multiples ; textes supports, méthodes et exercices différents). Aucune erreur trouvée dans ces 9 PDF ; les trois évaluations recalculées sont exactes (2+2+4+2=10 chacune). Aucun PDF modifié dans ce sous-lot.

**Domaine écriture CM1 entièrement audité : 7/7 compétences, 21/21 PDF**, dont 6 différenciés sur décision explicite (voir ci-dessus). Aucune compétence du domaine écriture manquante par rapport au catalogue (`content/levels/cm1-competencies.ts`, domaine `ecriture` : 7 entrées, toutes couvertes par un triplet PDF).

### Domaine étude de la langue CM1 — clos (9 septembre 2026) : 6/6 compétences, 18 PDF

Grammaire (4) : `grammaire-sujet-verbe` (identifier sujet/verbe, y compris sujet inversé), `grammaire-accord-sujet-verbe` (accord à distance avec noyau du sujet, groupes nominaux enrichis), `grammaire-complements` (compléments essentiels vs facultatifs), `grammaire-fonctions-phrase` (synthèse sujet/verbe/complément du verbe/complément de phrase). Orthographe (2) : `orthographe-groupe-nominal` (accord déterminant-nom-adjectif), `orthographe-homophones` (a/à, et/est, son/sont par manipulation).

**Vérification spécifique de doublon** : `grammaire-sujet-verbe` et `grammaire-accord-sujet-verbe` ont des noms très proches. Après lecture intégrale des deux : **confirmées distinctes**, sans ambiguïté cette fois (contrairement au cas écriture précédent) — la première enseigne l'identification de base (y compris sujet inversé), la seconde l'accord à distance avec un groupe nominal enrichi entre le sujet et le verbe (piège du nom le plus proche) ; supports, méthodes et exercices entièrement différents dans les deux cas. `grammaire-fonctions-phrase` chevauche partiellement `grammaire-sujet-verbe` et `grammaire-complements` mais de façon légitime : c'est une compétence de synthèse qui réinvestit les deux précédentes plutôt qu'un doublon (progression partie → tout normale dans une programmation).

Tous les exemples grammaticaux vérifiés exacts (accords sujet-verbe, accords dans le groupe nominal y compris cas irréguliers comme « renard/renarde », tests de substitution des homophones a/à, et/est, son/sont — les 3 tests correspondent à l'enseignement standard du français). Les phrases supports contenant des erreurs volontaires (ex. « Mes deux amis arrive enfin » à corriger par l'élève) sont bien intentionnelles et cohérentes avec la consigne, pas des erreurs de fiche. Les 6 barèmes `/10` recalculés sont tous exacts. **Aucune erreur trouvée, aucun PDF modifié dans ce sous-lot.**

### Domaine lecture-récits CM1 — clos (9 septembre 2026) : 3/3 compétences, 9 PDF

`lecture-recits-chronologie` (reconstituer l'ordre des événements), `lecture-recits-inference-simple` (inférer une information implicite à partir d'indices), `lecture-recits-intentions-personnage` (déduire l'intention d'un personnage). Trois compétences bien différenciées (ordre des faits / inférence factuelle générale / psychologie du personnage), aucun chevauchement. Tous les textes supports et corrigés vérifiés cohérents (ex. le « moins probable » de l'évaluation inférence teste explicitement le raisonnement par élimination, pas une simple restitution). Les 3 barèmes `/10` recalculés exacts. Aucune erreur, aucun PDF modifié.

### Domaine lecture-documentaire CM1 — clos (9 septembre 2026) : 4/4 compétences, 12 PDF

`lecture-documentaire-informations` (repérer l'essentiel), `-organisation` (utiliser titres/intertitres/mots-clés pour naviguer), `-deux-documents` (croiser deux sources courtes), `-justifier-preuve` (citer une preuve précise). Quatre compétences bien différenciées par la nature de la tâche (identifier l'essentiel / naviguer dans la structure / croiser deux sources / citer une preuve). **Faits documentaires vérifiés exacts sur des sujets exigeants** : dénombrement volcanique, manchot empereur (plumage + graisse + regroupement contre le froid), castor (hutte, écorces, pattes palmées), hérisson (vie nocturne, défense en boule), martinet (vol prolongé, pattes inadaptées au sol), lynx/renard (masses et longueurs plausibles), loutre (pattes palmées, narines fermables, queue-gouvernail), et surtout le **gypaète barbu** (technique réelle et peu connue consistant à casser les os en les laissant tomber sur des rochers pour en manger la moelle) — fait exact et bien choisi. Les 4 barèmes `/10` recalculés exacts. Aucune erreur, aucun PDF modifié.

### Domaine lecture-croiser-sources CM1 — doublon résolu, domaine clos (9 septembre 2026)

En commençant l'audit des 3 compétences de ce domaine, un **nouveau doublon apparent** a été détecté, du même type que celui déjà traité en écriture — mais cette fois à l'échelle de 2 compétences sur 3 d'un domaine entier, avec un domaine homonyme existant :

| Compétence `lecture-croiser-sources-*` | Titre affiché | Compétence `lecture-documentaire-*` équivalente | Même titre ? |
| --- | --- | --- | --- |
| `deux-documents` | « Lire deux documents pour répondre à une question » | `deux-documents` | **Oui, identique** |
| `justifier-preuve` | « Justifier une réponse par une preuve » | `justifier-preuve` | **Oui, identique** |
| `comparer-textes` | « Comparer deux textes » | *(aucune équivalente)* | Non — compétence unique, pas de doublon |

**Audit complet effectué avant décision** (les 9/9 PDF ont été lus, comme demandé, avant toute modification) :

- `comparer-textes` : compétence unique confirmée, aucune faute, classe B. Faits vérifiés (photosynthèse des arbres, vie en meute des loups) exacts.
- `deux-documents` : **quasi-doublon confirmé après lecture complète**. L'exercice utilisait déjà « source A/B, nature carte/article », proche mais pas identique à lecture-documentaire (documents A/B simples) ; l'évaluation, elle, était structurellement identique (2 faits courts à combiner + attribution de source), sans réelle mise en avant de la « nature » des sources.
- `justifier-preuve` : **titre identique mais contenu déjà substantiellement distinct** — cet exercice oppose une donnée mesurée (tableau de nitrates) à un témoignage/opinion (« à mon avis, l'eau paraît plus sombre ») et demande de choisir la preuve la plus solide, alors que la version lecture-documentaire porte sur la simple citation d'un passage. Confirmé : compétence de niveau supérieur (évaluer la fiabilité d'une preuve), pas un doublon de fond.

**Décision reçue et appliquée** : différencier les deux, sans toucher au curriculum map ni aux routes (uniquement le contenu visible des 6 PDF) :

- `deux-documents` → renommé **« Distinguer et croiser deux types de sources »**, objectif recentré sur l'identification du type de chaque source (carte, tableau, article, témoignage) avant de les croiser. Leçon, exercices et évaluation alignés sur cette nouvelle emphase (l'évaluation cite désormais explicitement « Source 1 - Affiche », « Source 2 - Programme »).
- `justifier-preuve` → renommé **« Choisir la preuve la plus solide »**, objectif recentré sur la comparaison donnée mesurée / opinion (contenu des exercices inchangé, il correspondait déjà à ce recentrage).

Deux incidents mineurs détectés et corrigés en cours d'édition (même vigilance que pour le cas écriture) : une redaction trop large sur l'évaluation `deux-documents` a une nouvelle fois recouvert une étiquette de points existante (barème passé de 8/10 réel à 10/10 après correction) et laissé un fragment de texte résiduel (« 45 » isolé) — les deux corrigés et revérifiés visuellement. Recherche de texte résiduel des deux anciens titres sur les 6 fichiers : aucune occurrence restante. Barèmes recalculés : `deux-documents` 2+4+2+2=10, `justifier-preuve` 2+3+3+2=10.

**Domaine lecture-croiser-sources CM1 clos : 3/3 compétences, 9/9 PDF audités, 6 modifiés (différenciation), 3 inchangés (`comparer-textes`).**

### Domaine oral CM1 — clos (9 septembre 2026) : 2/2 compétences, 6 PDF — **FRANÇAIS CM1 INTÉGRALEMENT CLOS**

`oral-participer-avis` (présenter un avis argumenté à l'oral, structure avis-raison-exemple) et `oral-participer-ecoute` (répondre à une intervention : reformuler puis ajouter une idée liée, sans répéter ni changer de sujet). Deux compétences bien différenciées (produire un avis vs. réagir à celui d'autrui dans un échange), aucun chevauchement. Bonne adaptation du format évaluation à l'oral (grille d'observation plutôt que réponses écrites). Les 2 barèmes `/10` recalculés exacts. Aucune erreur, aucun PDF modifié.

**FRANÇAIS CM1 est maintenant intégralement audité : 25/25 compétences, 75/75 PDF.** Bilan : 12 PDF modifiés, tous pour différenciation pédagogique sur les 2 doublons résolus (`rediger-idee-raison-exemple`/`rediger-paragraphe-argumente` en écriture, `deux-documents`/`justifier-preuve` en lecture-croiser-sources) — **aucune erreur de contenu (facts, grammaire, calcul) trouvée dans l'ensemble du français CM1** ; 63 PDF inchangés. Aucune compétence du catalogue (`content/levels/cm1-competencies.ts`, domaine français) laissée sans triplet PDF.

## Mathématiques CM1 — domaine nombres-calculs clos (9 septembre 2026) : 7/7 compétences, 21/21 PDF

Premier sous-lot du lot mathématiques CM1 (17 compétences, 51 PDF au total) : `numeration-grands-nombres` (lire/écrire/décomposer/comparer jusqu'au million), `numeration-decimaux` (nombres décimaux simples, dixièmes/centièmes, lien fractions décimales), `numeration-fractions` (représenter une fraction comme partage équitable ou position sur une droite graduée), `numeration-comparer-fractions` (comparer des fractions à dénominateur égal), `calcul-pose-multiplication` (algorithme posé, produits partiels), `calcul-pose-division` (division euclidienne, quotient/reste), `calcul-mental-strategies` (décomposition, compensation, regroupement).

**Vérification arithmétique intégrale, calcul par calcul, sur les 21 PDF** (leçons, exercices et évaluations) : tous les exemples résolus dans le corps des fiches ont été recalculés à la main et sont exacts — notamment 407 052 = 400 000+7 000+50+2 et 407 052 < 470 025 (numération) ; 604 017 en chiffres, décomposition de 708 090, rangement croissant de 87 900/708 090/708 900/780 009 (grands nombres, point classiquement sensible signalé par la mission) ; 2,35 = 2+3/10+5/100 = 235/100 (décimaux) ; 5/12 et 7/12 pour la tablette de 12 carrés dont 5 colorés (fractions) ; 6×26+1=157 (division euclidienne, exemple vérifié de la leçon) ; 156÷4=39 exact, 173÷5=34 reste 3, 294÷7=42 exact (évaluation division) ; 407×6, 235×14, 609×23 posés correctement, barème 2+3+3+2=10 (multiplication) ; 198+47=245 et 4×25×7=700 (calcul mental). **Aucune erreur de calcul trouvée.** Tous les barèmes `/10` recalculés et exacts (2+2+3+3, 2+3+2+3, 2+2+4+2, 2+2+3+3, 2+3+3+2 selon les fiches). Aucun doublon de compétence détecté dans ce sous-domaine (titres et objectifs des 7 compétences bien distincts). **Aucun PDF modifié : les 21 PDF de nombres-calculs étaient déjà corrects.**

## Mathématiques CM1 — domaine grandeurs-mesures clos (9 septembre 2026) : 3/3 compétences, 9/9 PDF

`durees-calculer` (calculer une durée à partir d'horaires de début et de fin, méthode des bonds jusqu'à l'heure ronde), `longueurs-aires-distinguer` (choisir entre aire et périmètre selon la grandeur recherchée — situations concrètes : clôture/bordure vs gazon/revêtement), `longueurs-aires-perimetre` (calculer le périmètre d'un polygone à partir de longueurs données). **Vérification spécifique de doublon** entre `longueurs-aires-distinguer` et `longueurs-aires-perimetre` (noms proches, même domaine) : confirmées distinctes — la première travaille le choix conceptuel aire/périmètre selon la situation (sans toujours calculer), la seconde le calcul du périmètre lui-même sur des figures variées (carré, rectangle, triangle, polygone irrégulier) ; progression légitime, pas un doublon.

Calculs recalculés à la main, tous exacts : 14 h 35 à 16 h 10 = 1 h 35 min (25 min + 1 h + 10 min) ; cour 20 m × 12 m → périmètre 64 m / aire 240 m² ; rectangle 8 cm × 3 cm → périmètre 22 cm ; rectangle 12 cm × 5 cm → 34 cm, carré 7 cm → 28 cm, polygone 3+4+6+5 → 18 cm. Point classiquement sensible (conversions d'unités) surveillé spécifiquement : aucune conversion erronée trouvée, unités toujours cohérentes (m/m², cm, h/min). Les 3 barèmes `/10` recalculés exacts (3+3+2+2, 2+3+2+3, 3+2+3+2). **Aucune erreur trouvée, aucun PDF modifié.**

## Mathématiques CM1 — domaine géométrie clos (9 septembre 2026) : 3/3 compétences, 9/9 PDF

`espace-programme` (coder/décrire un déplacement sur quadrillage avec vocabulaire de repérage), `figures-decrire` (utiliser les propriétés des figures planes — côtés, angles droits, parallélisme — pour les décrire ou les construire), `figures-symetrie` (construire le symétrique d'une figure sur quadrillage par rapport à un axe). Trois compétences bien différenciées (repérage/déplacement, propriétés/construction, symétrie), aucun chevauchement.

Toutes les coordonnées de quadrillage et distances aux axes vérifiées cohérentes avec les rendus visuels (ex. leçon symétrie : point à 3 carreaux d'un axe se replace à 3 carreaux de l'autre côté ; exercices : sommets A(3;2)/B(5;2)/C(5;5)/D(4;4) avec axe en colonne 6, distances 3/1/1/2 conformes au rendu ; évaluation : triangle P(2;2)/Q(4;2)/R(3;5) avec axe en colonne 5, distances 3/1/2 conformes). Trajets de repérage vérifiés faisables malgré les obstacles (ex. évaluation : C(1;6) à D(6;2) avec obstacles en (4;6) et (4;3), chemin via la ligne 4 possible). Propriétés géométriques citées exactes (rectangle = quadrilatère à 4 angles droits et côtés opposés égaux ; carré reconnu comme « quadrilatère à 4 côtés égaux et 4 angles droits » dans l'évaluation figures-decrire). Les 3 barèmes `/10` recalculés exacts (3+3+2+2, 2+4+2+2, 2+4+2+2). **Aucune erreur trouvée, aucun PDF modifié.**

## Mathématiques CM1 — domaine problèmes clos (9 septembre 2026) : 4/4 compétences, 12/12 PDF — **MATHÉMATIQUES CM1 INTÉGRALEMENT CLOSES, CM1 INTÉGRALEMENT CLOS**

`demarche-donnees-utiles` (identifier les informations nécessaires, écarter les données inutiles d'un énoncé), `demarche-etapes` (organiser deux calculs successifs, le premier résultat devenant donnée du second), `demarche-multiplicatif` (choisir et organiser une multiplication dans une situation-problème), `donnees-graphique` (prélever et interpréter une donnée dans un graphique en barres). Quatre compétences bien différenciées, aucun chevauchement.

**Tous les calculs et énoncés recalculés à la main, tous exacts** : 55-38=17 places libres, 8×24=192 crayons, 4×26=104 élèves (évaluation données utiles) ; 3×24-18=54, 5×36-128=52, 6×25-87=63 livres/balles restants (problèmes à étapes, résultats intermédiaires toujours positifs et cohérents) ; 7×24=168 sièges, 18×9=162 bulbes, 14×28=392 sièges (problèmes multiplicatifs) ; graphiques en barres vérifiés fidèles aux données annoncées dans les deux fiches (exercices : lundi 20/mardi 35/mercredi 15/jeudi 40 sur une échelle de 5 en 5 — barres cohérentes visuellement ; évaluation : équipes A 30/B 45/C 25/D 40, même vérification). Les 3 barèmes `/10` recalculés exacts (2+2+3+3, 2+2+3+3, 2+2+4+2, 2+2+3+3). **Aucune erreur trouvée, aucun PDF modifié.**

**MATHÉMATIQUES CM1 intégralement auditées : 17/17 compétences, 51/51 PDF, zéro erreur de calcul trouvée, aucun PDF modifié** (nombres-calculs 7/7, grandeurs-mesures 3/3, géométrie 3/3, problèmes 4/4). Combiné au français CM1 clos précédemment (25/25 compétences, 75/75 PDF, 12 PDF modifiés pour différenciation pédagogique), **CM1 est maintenant intégralement audité et clos : 42/42 compétences, 126/126 PDF**, sans aucune compétence du catalogue (`content/levels/cm1-competencies.ts`) restée sans triplet PDF vérifié. Aucune création de PDF EMC (aucune compétence EMC n'existe dans le catalogue CM1, conformément à la consigne de ne rien créer avant décision produit).

## CM2 — démarrage (9 septembre 2026)

### Inventaire et cartographie — architecture très différente de CP/CE1/CE2/CM1

154 PDF CM2 au total : 95 `francais-pdf` (37 compétences réparties en conjugaison/grammaire/orthographe/vocabulaire/lecture-compréhension, `content/cm2-francais-fiches.ts`) + 59 `mathematiques-pdf` (20 compétences, **toutes en géométrie**, `content/cm2-fiches-maths.ts` — aucune compétence nombres-calculs/mesures/problèmes n'a de PDF à ce niveau). Chaque dossier `mathematiques/<slug>/` et `francais/<slug>/` en `.webp` est un doublon d'affichage (rendu image des mêmes pages, utilisé par le site pour la prévisualisation) du PDF source correspondant dans `mathematiques-pdf/`/`francais-pdf/` — **pas un doublon de contenu réel**, aucune action nécessaire dessus.

Différence structurelle majeure avec CM1 : au lieu d'un triplet leçon/exercices/évaluation par compétence, CM2 utilise des « feuilles » `f1`/`f2`/`f3` (leçon/consolidation/évaluation) et **le code documente lui-même l'incomplétude** : `isNotionComplete()` dans `cm2-francais-fiches.ts` vérifie que les 3 feuilles existent. Sur les 37 compétences français, **12 n'ont pas leur triplet complet** (ex. `imparfait` n'a pas de f1, `nom-groupe-nominal` n'a que f1, `accorder-verbe-sujet` n'a que f3) — c'est un état déjà connu et reflété dans le code, pas une découverte de ce lot ; conformément à la consigne de ne jamais créer de PDF fictif, ces trous ne sont pas comblés, seulement documentés ici. `cm2-subjects.ts` confirme le statut `"in-progress"` pour mathématiques, histoire-géographie et sciences (`"upcoming"` pour EMC/anglais/arts/EPS), cohérent avec ce constat de contenu partiel — ce n'est pas un problème caché, c'est déjà su au niveau produit.

Le parcours signature (`docs/parcours-signature-audit.md`) a déjà documenté que CM2 n'a pas de page compétence dédiée et un système de ressources fragmenté (`Cm2FrancaisFichesEmbed.tsx`, `Cm2MathFichesEmbed.tsx`) — non retouché dans ce lot, qui porte uniquement sur l'exactitude du contenu des PDF existants.

### Mathématiques CM2 — sous-lot géométrie, 12/20 compétences auditées, 1 défaut confirmé et documenté

Compétences auditées sans erreur (contenu, définitions, calculs et raisonnements tous exacts) : `identifier-et-comparer-des-angles`, `choisir-la-bonne-methode-en-geometrie`, `choisir-le-bon-outil-geometrique`, `completer-une-figure-par-symetrie-axiale`, `construire-un-carre-et-un-rectangle`, `construire-un-cercle-avec-un-compas`, `construire-un-triangle-a-partir-de-mesures` (inégalité triangulaire vérifiée sur chaque triplet de longueurs proposé), `lire-un-programme-de-construction`, `lire-une-maquette-ou-un-plan-simplifie`, `mesurer-un-angle-avec-un-rapporteur`, `reconnaitre-et-decrire-des-polygones`, `reconnaitre-et-decrire-des-triangles` (f3/évaluation absente du triplet — trou de contenu déjà connu du code, pas une erreur de contenu).

**Défaut confirmé — `reconnaitre-le-patron-dun-solide` (patron de cube/pavé droit)** : ces fiches sont des images raster (une page = une seule image JPEG intégrée, pas de texte/formes vectoriels — vérifié via `page.get_drawings()` qui retourne une liste vide sur les 3 feuilles). L'exercice demande de reconnaître, parmi plusieurs figures en croix/quadrillage, celle(s) qui comportent exactement 6 carrés et peuvent se replier en cube. **Comptage pixel par pixel effectué** (détection des lignes de grille par analyse de densité de pixels sombres, sur l'image raster native) sur les figures présentées :

- `f1.pdf`, Partie 3 : figure A (la croix « classique », présentée juste avant dans la mini-leçon comme LE modèle de patron valide) dessinée avec **7 carrés** au lieu de 6 (colonne de 5 + 2 bras au lieu d'une colonne de 4 + 2 bras) ; figure C (forme en E) également **7 carrés** au lieu de 6. Seule la figure D (6 carrés, ligne de 4 + 1 rabat en haut-gauche + 1 rabat en bas-droite) est un patron de cube valide à la fois par le compte et par la topologie.
- `f2.pdf`, Exercice 1 : même défaut sur la figure C (forme en T/E, **7 carrés** au lieu de 6, ligne de 3 + colonne de 4 partageant une case).
- `f3.pdf`, Exercice 2 (patron de pavé droit) : figure E semble compter **5 carrés** (croix « plus » à 5, comme l'icône de la mini-méthode d'Hector en Partie 2 de `f1.pdf`, elle aussi vérifiée à 5 carrés plutôt que 6).

Ce n'est pas une erreur ponctuelle isolable par une correction de texte : ces pages sont des illustrations générées (probablement par un outil d'IA image-à-image) sans contrôle géométrique précis du nombre de cases, contrairement aux gabarits vectoriels texte+formes utilisés pour CP/CE1/CE2/CM1 et pour le reste des fiches CM2 audité ci-dessus (angles, outils, symétrie, triangles, etc., qui n'ont pas ce problème car ils ne dépendent pas d'un comptage exact de cases). **Correction non tentée dans ce lot** : contrairement aux corrections PDF précédentes (redaction de texte + réinsertion), il ne s'agit pas ici de texte mais d'une illustration raster intégrée en une seule image par page — une correction fiable demanderait de régénérer ou redessiner précisément la grille concernée, ce qui dépasse la méthode d'édition sûre utilisée jusqu'ici (risque de dégrader visuellement la page sans outil de dessin vectoriel adapté). **Limite technique documentée, conformément au critère d'arrêt de la mission** — recommandation : régénérer ces 3 illustrations (une nouvelle demande à l'outil de génération d'images, ou un redessin manuel) avant publication si ce niveau de précision géométrique est jugé important pédagogiquement pour cette compétence spécifique.

### Mathématiques CM2 — géométrie clos (9 septembre 2026) : 20/20 compétences, 59/59 PDF — **MATHÉMATIQUES CM2 INTÉGRALEMENT AUDITÉES (100 % du contenu PDF existant)**

Les 8 compétences restantes ont été auditées sans erreur : `rediger-un-programme-de-construction`, `reproduire-une-figure-geometrique`, `resoudre-une-mission-geometrique-complete`, `se-reperer-sur-un-plan`, `tracer-des-droites-perpendiculaires` (l'évaluation couvre aussi les droites parallèles, synthèse cohérente), `utiliser-plusieurs-outils-geometriques`. Missions de construction toutes vérifiées faisables (mesures cohérentes : cercles de rayon toujours inférieur aux segments porteurs, angles et perpendiculaires non contradictoires) ; figures « erreur à corriger » (Félix/Hector) toutes cohérentes avec leur situation textuelle (ex. diagonale n'atteignant pas le bon sommet, angle non droit visiblement penché, lieu D4 vs E4 sur un plan quadrillé) ; grilles de repérage sur plan toutes exactes.

**CM2 mathématiques est maintenant intégralement audité pour tout le contenu PDF existant : 20/20 compétences de géométrie, 59/59 PDF** (aucune compétence nombres-calculs/mesures/problèmes n'a de PDF à ce niveau — gap déjà documenté ci-dessus, pas un oubli d'audit). Bilan : 0 PDF modifié, 1 défaut confirmé mais non corrigé pour limite technique (`reconnaitre-le-patron-dun-solide`, 3 PDF, illustrations raster), 1 triplet nativement incomplet déjà connu du code (`reconnaitre-et-decrire-des-triangles`, pas de f3).

### Français CM2 — domaine conjugaison clos (9 septembre 2026) : 7/7 compétences, 19/19 PDF

**Confirmation architecture** : comme pour les mathématiques CM2, chaque page `francais-pdf/*.pdf` est une image raster unique (`page.get_drawings()` vide, aucune couche de texte) — vérifié sur plusieurs fichiers de ce domaine. **Toute correction de contenu CM2 nécessiterait donc de régénérer l'illustration**, pas une simple redaction de texte comme pour CP/CE1/CE2/CM1. Ce constat s'applique à l'ensemble du corpus CM2 (français ET mathématiques), pas seulement à `reconnaitre-le-patron-dun-solide`.

Compétences auditées : `futur-simple`, `imparfait`, `passe-compose-avoir`, `passe-compose-etre`, `distinguer-imparfait-passe-compose`, `imperatif`, `infinitif`. Conjugaisons, terminaisons et accords du participe passé (auxiliaire être) tous vérifiés exacts sur l'ensemble des exemples et corrigés implicites.

**Défaut confirmé — `passe-compose-avoir`, feuille 3 (évaluation), exercice 2, item 4** : la phrase à compléter est *« L'année prochaine, j'___ en CM2. (être) »*. Or CM2 est la **dernière année de l'école primaire française** (CP-CE1-CE2-CM1-CM2, puis 6ème au collège) — un élève de CM2 sera en 6ème l'année suivante, pas en CM2 une seconde fois. La phrase est donc incohérente pour son public cible (elle induit une fausse continuité de niveau). **Non corrigé dans ce lot** : même limite technique que pour les mathématiques CM2 (page raster, pas de texte éditable par redaction) — documenté ici, correction à faire lors d'une régénération future de cette illustration (remplacer par exemple par « L'année prochaine, je ___ en 6ème » ou une phrase neutre sans référence de niveau).

Aucune autre erreur trouvée sur les 19 PDF de conjugaison. Aucun PDF modifié (limite technique).

## Prochaines étapes sûres

1. ~~Matérialiser ou récupérer sans altération les 13 PDF CP encore `dataless`.~~ Résolu le 9 septembre 2026 : le clone de travail n'a aucun PDF `dataless`, tous les 866 PDF suivis par Git sont accessibles.
2. Transcrire les objectifs annuels CP des textes officiels français et mathématiques (toujours ouvert — les audits de contenu ci-dessus s'appuient sur des connaissances graphophonologiques/arithmétiques générales, pas encore sur une transcription ligne à ligne du BO n° 41).
3. Relier chaque ressource CP à un objectif officiel précis (toujours ouvert, dépend du point 2).
4. ~~Rechercher transversalement les ressources CP QLM/sciences/EMC avant de conclure à une absence.~~ Fait le 9 septembre 2026 : absence confirmée, cause identifiée (curriculum map CP sous-développé sur QLM/EMC, pas seulement absence de PDF).
5. Étoffer `content/levels/cp-competencies.ts` sur QLM et EMC à partir des textes officiels avant toute création de PDF sur ces domaines (toujours ouvert — décision pédagogique, pas engagée dans ce lot).
6. ~~Corriger uniquement après compréhension complète des triplets concernés.~~ Fait le 9 septembre 2026 : les 33 PDF CP audités intégralement, 1 erreur trouvée et corrigée (glyphe Unicode incorrect), aucune autre correction jugée nécessaire (faiblesses restantes = cosmétiques, faible impact).
7. ~~Rapatrier les 2 commits non poussés de `chantier/v1-polish`...~~ Fait le 9 septembre 2026 : rien à rapatrier (déjà présent sur `origin/main`).
8. Ajouter CM2 à `primaryCompetencyLevels`... — **non repris dans ce lot sur consigne explicite** (diagnostic « adaptation non sûre » conservé tel quel, voir `docs/parcours-signature-audit.md`).
9. ~~Lot CE1 français : auditer intégralement les 3 évaluations et un échantillon de tapuscrits.~~ Fait le 9 septembre 2026 : 3/3 évaluations et 7/25 tapuscrits audités intégralement (10/28 PDF CE1 au total). Aucune erreur trouvée dans ce sous-lot. **Reste ouvert** : 18 tapuscrits CE1 non encore audités individuellement (liste : Aventure-Estivale, Becs, Belle-Disparu, Chasse-Tresor, Eric-Porc-Epic, Experiences-Meteo-Anna, Griffes, Ikru-Premier-Jour, Jouet-Perdu, Mangouste-Grenouille, Nettoyage-Plage, Plantes-Partout, Plastique-Chic, Poisson-Nager, Poochi-Amis, Rentree-Reve, Tresors-Sam, Trier-Recycler) — à reprendre en priorité au prochain lot CE1, sans refaire les 10 déjà validés.
10. ~~Constater l'absence de PDF mathématiques CE1.~~ Fait le 9 septembre 2026 : confirmé, `public/fiches/ce1/mathematiques` n'existe pas. Décision de création à prendre séparément (pas engagée dans ce lot, cf. mission : ne créer qu'après vérification qu'une compétence officielle existe et n'est pas déjà couverte).
11. ~~Avancer sur CE2 (français ET mathématiques).~~ Fait le 9 septembre 2026 : 24/24 PDF CE2 audités intégralement (4 compétences français + 4 compétences mathématiques). 1 défaut cosmétique trouvé et corrigé (titre dupliqué). Zéro erreur de calcul sur l'ensemble des exercices de mathématiques recomptés à la main. CE2 est maintenant le niveau le plus complètement audité après CP.
12. ~~Finir les 18 tapuscrits CE1 restants.~~ Fait le 9 septembre 2026 : **CE1 clos, 28/28 PDF audités intégralement** (voir section dédiée « CE1 — niveau clos » ci-dessus). 2 erreurs trouvées et corrigées (fait scientifique sur le toucan, accord grammatical). Couverture réelle par matière documentée : français lecture-compréhension solide, mathématiques absentes à 100 %, QLM quasi absente, EMC absente.
13. **CM1 démarré** le 9 septembre 2026 : inventaire complet fait (126 PDF, 75 français + 51 mathématiques, 0 HG/sciences/EMC), cartographie programme faite (curriculum map CM1 déjà correctement structuré sur HG/sciences, contrairement à CP/CE1/CE2 ; EMC reste à 0). 4/7 compétences du domaine écriture auditées intégralement (12 PDF) — voir section dédiée ci-dessus. **Trouvaille à traiter avant de continuer** : deux compétences écriture quasi identiques (`rediger-idee-raison-exemple` et `rediger-paragraphe-argumente`), décision de fusion/différenciation nécessaire.
14. ~~Différencier `rediger-idee-raison-exemple`/`rediger-paragraphe-argumente`, finir écriture, étude de la langue, lecture-récits, lecture-documentaire.~~ Fait le 9 septembre 2026. Domaines clos, voir sections dédiées.
15. ~~Auditer et trancher le doublon `lecture-croiser-sources` (deux-documents, justifier-preuve).~~ Fait le 9 septembre 2026 : 9/9 PDF audités, les deux compétences différenciées (voir section dédiée). Domaine clos.
16. ~~Domaine oral CM1.~~ Fait le 9 septembre 2026 : 2/2 compétences, 6 PDF, aucun chevauchement, aucune erreur. **Français CM1 clos à 100 % (25/25 compétences, 75/75 PDF).**
17. ~~Prochain lot : mathématiques CM1 — domaine nombres-calculs (7 compétences, 21 PDF).~~ Fait le 9 septembre 2026 : 7/7 compétences auditées intégralement (numération grands nombres, décimaux, fractions, comparer fractions ; calcul posé multiplication, division ; calcul mental), toutes les opérations et exemples recalculés à la main, aucune erreur, aucun PDF modifié.
18. ~~Domaine grandeurs-mesures CM1 (3 compétences, 9 PDF), conversions d'unités à surveiller.~~ Fait le 9 septembre 2026 : 3/3 compétences auditées (durées, distinguer aire/périmètre, calculer un périmètre), doublon apparent `longueurs-aires-distinguer`/`longueurs-aires-perimetre` vérifié et confirmé non-doublon (progression légitime concept → calcul), toutes les conversions et calculs recalculés exacts, aucune erreur, aucun PDF modifié.
19. ~~Domaine géométrie CM1 (3 compétences, 9 PDF).~~ Fait le 9 septembre 2026 : 3/3 compétences auditées (coder un déplacement, décrire/construire des figures, symétrie), toutes les coordonnées de quadrillage et distances aux axes vérifiées cohérentes avec les rendus, aucune erreur, aucun PDF modifié.
20. ~~Domaine problèmes CM1 (4 compétences, 12 PDF), dernier sous-domaine mathématiques.~~ Fait le 9 septembre 2026 : 4/4 compétences auditées (données utiles, problème à étapes, problème multiplicatif, lecture de graphique), tous les calculs et graphiques recalculés/vérifiés exacts, aucune erreur, aucun PDF modifié. **MATHÉMATIQUES CM1 closes (17/17), CM1 intégralement clos (126/126 PDF, 42/42 compétences).**
21. Recherche transversale QLM/sciences/EMC pour CE1/CE2 (même modèle que pour CP) — reste ouvert, non prioritaire.
22. **Prochain niveau : CM2.** À démarrer selon la même méthode que CM1 (inventaire complet, cartographie programme, audit par matière en priorité français puis mathématiques). Rappel : ne pas toucher à l'adaptation CM2 du parcours signature (`docs/parcours-signature-audit.md`, diagnostic « adaptation non sûre » conservé) — ce chantier concerne uniquement l'audit et la correction du contenu pédagogique des PDF CM2, pas le câblage produit.
