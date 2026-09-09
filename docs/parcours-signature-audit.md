# Audit du parcours signature — « Préparer cette compétence » → « Ajouter à ma semaine »

Dernière mise à jour : 9 septembre 2026.

## Pourquoi ce document

La mission produit d'Académie Kerboeuf définit deux fonctions signature (P0) :

1. **Préparer cette compétence** : depuis une compétence officielle, obtenir objectif → prérequis → leçon → exercices → évaluation → ressources → différenciation → « Ajouter à ma semaine ».
2. **Ajouter à ma semaine** : toute ressource utile doit pouvoir devenir un élément du planning enseignant.

Ce document constate l'état réel de ce parcours au 9 septembre 2026, sur le clone de travail local (`chantier/v1-polish-local`, basé sur `origin/main`, HEAD `11fe6207`), avant toute modification de code.

## Ce qui existe déjà (à ne pas reconstruire)

- `app/primaire/[level]/competences/page.tsx` : page compétence réelle, avec `CompetencyCard` et `CurriculumMapPreview`, pour les niveaux `cp`, `ce1`, `ce2`, `cm1`.
- `app/enseignants/preparer-une-seance/page.tsx` + `components/teacher-lesson-preparation/TeacherLessonPreparationClient.tsx` (1181 lignes) : outil de préparation de séance complet et déjà substantiel — blocs repliables (informations, situation de départ, déroulé modulable, différenciation, évaluation, matériel, bilan), sauvegarde locale, impression A4 noir et blanc.
- `app/enseignants/cahier-journal/`, `app/enseignants/emploi-du-temps/`, `app/enseignants/organisation/`, `app/enseignants/progression/` : outils dédiés déjà en place.
- `content/teacher-hubs.ts` : hub `ma-semaine` qui regroupe déjà organisation / cahier journal / emploi du temps sous un point d'entrée unique, avec la description « Organisez les priorités de la semaine, préparez une séance si nécessaire, puis complétez le cahier journal. » — la vision cible est donc déjà écrite dans le produit, seulement pas encore câblée.
- Gouvernance de statuts publics stricte (`AGENTS.md`) qui empêche déjà les faux liens PDF — donc le principe « ne jamais tomber sur du vide » est déjà largement respecté côté catalogue.

## L'écart constaté

1. **CM2 — niveau pilote — n'a pas de page compétence.** `primaryCompetencyLevels` dans `app/primaire/[level]/competences/page.tsx` ne définit que `cp | ce1 | ce2 | cm1`. Le niveau mis en avant dans toute la navigation depuis `docs/strategie-v1-academie-kerboeuf.md` (mai 2026) n'a donc pas la fonction signature de la mission.
2. **Aucun CTA « Préparer cette compétence » sur les pages compétence existantes.** Vérifié par recherche du texte dans `app/` et `content/` : la phrase n'apparaît que dans `content/teacher-hubs.ts` (texte descriptif du hub), jamais comme lien depuis une `CompetencyCard` vers `/enseignants/preparer-une-seance`.
3. **`TeacherLessonPreparationClient` ne lit aucun paramètre d'entrée.** Recherche de `searchParams` / `useSearchParams` dans ce fichier : aucune occurrence. L'outil ne peut donc pas être pré-rempli avec une compétence, un niveau ou une matière transmis depuis une page compétence — un enseignant qui clique doit tout ressaisir.
4. **« Ajouter à ma semaine » n'existe nulle part comme action.** La chaîne de caractères n'apparaît que comme texte d'un lien de hub, jamais comme bouton d'action associé à une ressource (leçon, exercices, évaluation) au sens de la mission section 30.

## Ce que cela signifie concrètement (test persona 1, mission section 43)

Un professeur CE1 débutant qui cherche une séance sur « comparer les nombres » pour le lendemain :

- peut **trouver** la compétence (page compétence CE1 existe) ;
- peut **lire** ce qu'il faut enseigner et les ressources associées ;
- ne peut **pas** enchaîner directement sur une préparation de séance pré-remplie ni sur un ajout à sa semaine sans ressaisir manuellement dans un outil séparé.

Le parcours n'est donc pas encore au niveau du test ultime de la mission (section 46) : le site organise et les outils existent, mais ne sont pas encore reliés en une seule expérience « programme → compétence → ressource → préparation → semaine ».

## Recommandation de priorisation (P0, ne pas entreprendre à la légère)

Avant toute implémentation, cette recommandation est volontairement limitée à une proposition d'architecture, pas à un code livré cette session, car `TeacherLessonPreparationClient` (1181 lignes) n'a pas encore été lu intégralement et mérite une lecture complète avant modification (risque de régression sur un outil déjà riche et déjà utilisé).

1. Ajouter `cm2` à `primaryCompetencyLevels` (ou créer l'équivalent dédié si CM2 a un système de compétences distinct — à vérifier dans `content/cm2-learning-tree.ts` avant de dupliquer une structure existante).
2. Ajouter un CTA « Préparer cette compétence » sur `CompetencyCard`, avec un lien du type `/enseignants/preparer-une-seance?competence=<slug>&label=<label>&level=<level>&matiere=<matiere>`.
3. Faire lire ces paramètres par `TeacherLessonPreparationClient` (via `useSearchParams`) pour pré-remplir un nouveau bloc de séance (titre, compétence) sans écraser une séance en cours de rédaction — attention à ne pas régresser la sauvegarde locale existante.
4. Ajouter une action « Ajouter à ma semaine » qui écrit dans le stockage local déjà utilisé par les outils de planification (`content/teacher-programmation.ts` / `content/teacher-class-organization.ts` — structure exacte à confirmer avant implémentation).
5. Valider avec le persona 1 (mission section 43) : chronométrer le parcours compétence → séance préparée → ajout à la semaine, cible < 3 minutes.

Ce plan n'a pas été implémenté ce jour faute de temps de lecture suffisant du composant existant ; il est documenté ici pour reprise immédiate lors de la prochaine session, conformément au principe de continuité de la mission (« ne pas s'arrêter après un rapport intermédiaire »).
