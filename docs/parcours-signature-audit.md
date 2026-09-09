# Audit du parcours signature — « Préparer cette compétence » → « Ajouter à ma semaine »

Dernière mise à jour : 9 septembre 2026.

## Statut (mise à jour du 9 septembre 2026, plus tard dans la journée)

**Implémenté pour CP, CE1, CE2, CM1** (commit `fc8d9a6`, branche `chantier/v1-polish-local`) : `CompetencyCard` affiche désormais un CTA « Préparer cette compétence → » (masqué si la compétence est « à venir », conformément au principe « ne jamais tomber sur du vide ») qui ouvre `preparer-une-seance` avec une séance pré-remplie (titre, niveau, matière, domaine, objectif). `TeacherLessonPreparationClient` consomme ces paramètres une seule fois à l'arrivée puis nettoie l'URL pour qu'un rechargement ne duplique pas la séance. Testé bout en bout au navigateur (voir section « Vérification » en fin de document) ; `lint`, `tsc --noEmit` et `build` passent.

**Cahier journal imprimable — implémenté** (commits `4740ef9`, `b6702bd`, `97e9341`) : les ressources PDF réelles (leçon/exercices/évaluation, filtrées par la même règle `isPedagogicalResourceLinkable` que le catalogue public) sont désormais transmises de la compétence vers la séance (`materials`), puis de la séance vers le cahier journal (`session.material` / `session.resourceLink` — un bug pré-existant qui les perdait silencieusement au passage a été corrigé au passage). Le cahier journal propose une seconde vue, « Voir mon cahier journal (imprimable) », qui liste chaque séance de la semaine avec horaire, objectif, déroulement, matériel et ressource — au lieu des seules cartes compactes de la vue grille. Couvert par `e2e/teacher-signature-flow.spec.ts` (9 tests, desktop/tablette/mobile) ; suite complète (377 tests) sans régression.

## CM2 — audit d'adaptation (9 septembre 2026)

Conclusion : **adaptation non sûre pour ce lot, gap documenté plutôt que forcé**, conformément à la consigne « si adaptation sûre : implémenter, sinon documenter — ne pas dupliquer toute l'architecture juste pour CM2 ».

Constats après lecture du code réel (pas de supposition) :

- CM2 n'a pas de page de détail par leçon : `app/primaire/cm2/matieres/[slug]/page.tsx` mappe explicitement chaque `Cm2LessonNode` vers un item sans `href` (« Pas de page de détail leçon CM2 — route [domain]/[subdomain]/[lesson] absente », commentaire déjà présent dans le code). Il n'y a donc pas d'équivalent direct à `/primaire/[level]/competences` sur lequel poser un CTA.
- Le rendu des matières CM2 passe par `components/academy/SubjectMatterCatalog.tsx` (972 lignes), **partagé par les 5 niveaux primaires** (CP, CE1, CE2, CM1, CM2 utilisent tous `SubjectDetailPage`). Y ajouter un CTA « Préparer cette compétence » toucherait aussi CP/CE1/CE2/CM1 — qui ont déjà leur propre CTA fonctionnel et testé sur `/primaire/[level]/competences` — avec un risque réel de doublon d'UI ou de régression sur un composant aussi large et partagé, sans l'avoir lu intégralement.
- Les ressources PDF réelles des leçons CM2 (triplet leçon/exercices/évaluation) ne transitent pas par `Cm2LessonNode.resources` dans ce rendu : elles vivent dans deux composants séparés, `Cm2FrancaisFichesEmbed.tsx` (168 lignes) et `Cm2MathFichesEmbed.tsx` (215 lignes), non encore lus. Le système de ressources CM2 est donc structurellement plus fragmenté que celui de CP/CE1/CE2/CM1 — un branchement propre demanderait de comprendre ces deux fichiers en plus, pas une simple ligne ajoutée.

Piste pour une prochaine session, à valider avant d'implémenter :

1. Lire intégralement `Cm2FrancaisFichesEmbed.tsx` et `Cm2MathFichesEmbed.tsx` pour voir si un point d'accroche naturel existe déjà là où le triplet PDF est affiché par leçon.
2. Si oui, ajouter le CTA **uniquement dans ces deux composants CM2**, en réutilisant tel quel le même paramétrage d'URL (`competence`, `level`, `matiere`, `domaine`, `objectif`, `ressources`) et la même cible `/enseignants/preparer-une-seance` — aucun changement necessaire côté `TeacherLessonPreparationClient`, qui est déjà générique.
3. Ne pas toucher `SubjectMatterCatalog.tsx` pour ce besoin : ce n'est pas le bon point d'intégration et le risque de régression sur les 4 autres niveaux ne se justifie pas.

## Progression — compatibilité (9 septembre 2026)

La mission demande seulement que le câblage reste *compatible* avec un futur statut de progression (À FAIRE / EN COURS / VUE), sans construire ce chantier maintenant. C'est déjà le cas sans modification :

- `LessonStatus` (`content/teacher-lesson-preparation.ts`) : `a-preparer` / `prete` / `a-ajuster` / `faite`.
- `LogbookStatus` (`content/teacher-logbook.ts`) : les quatre mêmes plus `a-reporter`.
- Un outil dédié existe déjà et est testé : `/enseignants/progression` (« Progression de période », voir `e2e/teacher-tools-reliability.spec.ts`), indépendant de ce lot.

Aucune action nécessaire pour ce lot au-delà de cette vérification.

Le reste de ce document est conservé tel qu'écrit avant l'implémentation, pour traçabilité.

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

Ce plan n'a pas été implémenté au moment de sa rédaction faute de temps de lecture suffisant du composant existant ; les points 2 et 3 ont depuis été réalisés (voir statut en tête de document). Le point 1 (CM2) et le point 4 tel que formulé (action « Ajouter à ma semaine » indépendante d'une séance déjà préparée) restent ouverts.

## Vérification (9 septembre 2026)

- `rm -rf .next && npm run lint && npx tsc --noEmit && npm run build` : tous clean.
- Test navigateur (serveur de dev local) : `/primaire/ce1/competences` → clic sur « Préparer cette compétence → » sur « Reconnaître une phrase » → atterrissage direct sur `/enseignants/preparer-une-seance` en vue édition, avec Titre/Niveau/Matière/Domaine/Objectif tous pré-remplis correctement, URL nettoyée des paramètres de requête.
- Test anti-duplication : navigation directe vers l'URL avec paramètres, puis rechargement de l'URL nettoyée obtenue → une seule séance créée, pas de doublon.
- « Ajouter au cahier journal » depuis une séance pré-remplie : modale s'ouvre correctement (semaine/jour/créneau) ; non poussé jusqu'à la confirmation finale pour éviter un `window.confirm` bloquant pendant les tests automatisés, mais le comportement pré-existant n'a pas été modifié par ce changement.
- CTA absent (comme voulu) sur les compétences au statut « À venir » : vérifié visuellement sur la page CE1.
