# Audit des accès courts CM2

## 1. Résumé général

Le niveau CM2 dispose déjà d'un socle d'accès humain et lisible : `/primaire/cm2`, `/primaire/cm2/matieres`, `/primaire/cm2/missions` et `/primaire/cm2/parcours`. Ces pages permettent de comprendre rapidement l'offre CM2 et de revenir aux zones principales sans passer par des chemins techniques.

Le point de vigilance principal concerne les routes profondes de leçon et les cartes de missions/projets dont le statut n'est pas toujours cohérent avec le comportement cliquable. Plusieurs entrées "bientôt", "en préparation" ou "upcoming" possèdent une route réelle et sont cliquables. Ce n'est pas une erreur technique, mais cela peut nuire à la fluidité si l'utilisateur interprète le clic comme une ressource prête.

Aucun PDF réel CM2 n'a été trouvé dans `public/`. Aucun `pdfHref` CM2 n'est actuellement renseigné dans les données repérées. Les boutons PDF des pages de leçon restent donc désactivés tant que les séances sont `upcoming`, ce qui est sain.

## 2. Routes CM2 existantes repérées

Routes de page repérées sous `app/primaire/cm2` :

- `/primaire/cm2`
- `/primaire/cm2/matieres`
- `/primaire/cm2/matieres/[slug]`
- `/primaire/cm2/matieres/[slug]/[domainId]/[subdomainId]/[lessonId]`
- `/primaire/cm2/missions`
- `/primaire/cm2/missions/[slug]`
- `/primaire/cm2/parcours`

Routes concrètes générables d'après les données :

- 1 route niveau : `/primaire/cm2`
- 1 route matières : `/primaire/cm2/matieres`
- 8 routes matière : `francais`, `mathematiques`, `histoire-geographie`, `sciences`, `emc`, `anglais`, `arts`, `eps`
- 1 route missions : `/primaire/cm2/missions`
- 18 routes mission/projet : 9 missions CM2 courtes + 9 projets Félix enrichis
- 1 route parcours : `/primaire/cm2/parcours`
- 3 routes longues de leçon :
  - `/primaire/cm2/matieres/francais/francais-lecture/francais-lecture-inferences/comprendre-l-implicite`
  - `/primaire/cm2/matieres/francais/francais-lecture/francais-lecture-inferences/identifier-les-inferences`
  - `/primaire/cm2/matieres/francais/francais-lecture/francais-lecture-inferences/justifier-avec-indices`

Total analysé : 33 URLs CM2 générables.

## 3. Routes fluides déjà correctes

- `/primaire/cm2` : bon hub de niveau, avec accès directs vers missions, parcours et matières.
- `/primaire/cm2/matieres` : bon index de matières, avec séparation claire entre matières structurées et matières à venir.
- `/primaire/cm2/missions` : route courte utile pour le catalogue complet CM2.
- `/primaire/cm2/parcours` : route courte claire pour le parcours enseignant.
- `/primaire/cm2/matieres/francais` et `/primaire/cm2/matieres/mathematiques` : routes plus lisibles que les routes de leçon profondes, utiles comme paliers.

## 4. Routes trop longues ou trop techniques

Les trois routes de leçon françaises sont fonctionnelles mais très techniques :

- `/primaire/cm2/matieres/francais/francais-lecture/francais-lecture-inferences/comprendre-l-implicite`
- `/primaire/cm2/matieres/francais/francais-lecture/francais-lecture-inferences/identifier-les-inferences`
- `/primaire/cm2/matieres/francais/francais-lecture/francais-lecture-inferences/justifier-avec-indices`

Elles exposent les identifiants internes `domainId` et `subdomainId`. Elles restent acceptables comme routes canoniques techniques, mais elles ne sont pas idéales pour un accès humain direct.

## 5. Routes candidates à une façade courte future

Sans les créer maintenant, les façades courtes utiles seraient :

- `/primaire/cm2/francais/implicite`
- `/primaire/cm2/francais/inferences`
- `/primaire/cm2/francais/justifier`
- `/primaire/cm2/maths/calcul`
- `/primaire/cm2/maths/problemes`
- `/primaire/cm2/sciences/demarche-scientifique`
- `/primaire/cm2/histoire-geographie/cartes`

Priorité future : commencer par les trois leçons françaises déjà routées, car elles sont les seules pages de leçon profondes actuellement générées.

## 6. Liens sûrs

Liens internes CM2 stables et fluides :

- `/primaire/cm2`
- `/primaire/cm2/matieres`
- `/primaire/cm2/missions`
- `/primaire/cm2/parcours`
- `/primaire/cm2/matieres/francais`
- `/primaire/cm2/matieres/mathematiques`
- `/primaire/cm2/missions/mission-inference`
- `/primaire/cm2/missions/mission-calcul`
- `/primaire/cm2/missions/production-ecrit`
- `/primaire/cm2/missions/lecture-strategique`
- `/primaire/cm2/missions/journal-des-traces-de-felix`
- `/primaire/cm2/missions/ecoquartier-des-felinois`
- `/primaire/cm2/missions/republique-des-eleves`
- `/primaire/cm2/missions/station-meteo-de-felix`

Les liens de retour via breadcrumbs et pieds de page CM2 sont globalement cohérents.

## 7. Liens à risque

Liens existants vers des routes réelles mais dont le statut indique que la ressource n'est pas prête :

- `/primaire/cm2/missions/laboratoire-scientifique` : mission `bientôt`
- `/primaire/cm2/missions/archives-historiques` : mission `en préparation`
- `/primaire/cm2/missions/cartographe-du-monde` : mission `bientôt`
- `/primaire/cm2/missions/defis-mathematiques` : mission `bientôt`
- `/primaire/cm2/missions/enquete-grammaticale` : mission `en préparation`
- `/primaire/cm2/missions/grand-atlas-des-mobilites` : projet `bientôt`
- `/primaire/cm2/missions/musee-des-imaginaires-de-felix` : projet `bientôt`
- `/primaire/cm2/missions/atelier-des-objets-utiles` : projet `en préparation`
- `/primaire/cm2/missions/defi-sante-et-cooperation` : projet `en préparation`
- `/primaire/cm2/missions/corps-relations-consentement-internet` : projet `en préparation`

Autres points à surveiller :

- `/primaire/cm2/matieres/emc`, `/anglais`, `/arts`, `/eps` existent via `generateStaticParams` et sitemap, mais les cartes ne sont pas cliquables dans l'UI principale car les statuts sont `upcoming`.
- Des liens externes au hub CM2 existent depuis `content/pedagogical-places.ts`, `content/felix-character.ts`, `app/univers/page.tsx`, `app/carte/page.tsx`, `app/missions-recentes/page.tsx` et `app/professeurs/page.tsx`.

## 8. PDF réels trouvés

Aucun fichier PDF n'a été trouvé dans `public/`.

## 9. PDF absents ou à venir

- Aucun `pdfHref` CM2 renseigné n'a été trouvé dans `content/`.
- Les pages de leçon CM2 prévoient un bouton "Ouvrir le PDF" uniquement si `getPublicStatusKey(session.status) === "available"` et si `session.pdfHref` existe.
- Les séances des trois leçons routées sont toutes `upcoming`, donc le bouton PDF reste remplacé par un libellé d'attente.
- Les missions CM2 mentionnent des versions "à projeter" et "à imprimer", mais ce sont des indications de contenu intégrées, pas des PDF réels.

## 10. Cartes cliquables problématiques

Cartes cliquables malgré un statut non disponible :

- Dans `/primaire/cm2/missions`, les cartes de projets Félix sont toutes cliquables, y compris les projets `bientôt` et `en préparation`.
- Dans `/primaire/cm2/missions`, le catalogue par domaine utilise `MissionGrid` avec `linkBasePath="/primaire/cm2/missions"` pour toutes les missions listées, y compris `bientôt` et `en préparation`.
- Dans `/primaire/cm2/parcours`, les cartes de progression renvoient vers toutes les missions du parcours, y compris celles non disponibles.
- Dans `components/cm2/teacher-dashboard.tsx`, les entrées enseignant ouvrent toutes les missions/projets, y compris les statuts non disponibles.
- Dans `/primaire/cm2/matieres/[slug]`, les missions liées à une matière disponible sont cliquables sans filtrage par statut.

Cartes correctement non cliquables :

- Les matières `emc`, `anglais`, `arts` et `eps` sont visibles mais non cliquables dans les cartes de `/primaire/cm2` et `/primaire/cm2/matieres`.
- Les leçons sans `routeSlug` sont affichées comme `à venir` sans lien depuis la page matière.

## 11. Statuts incohérents éventuels

Incohérences ou ambiguïtés relevées :

- Les trois leçons françaises ont une route de page et du contenu affichable, mais leur statut reste `upcoming`. Cela peut être intentionnel, mais l'utilisateur voit une page longue avec contenu tout en ayant un badge "À venir".
- Les domaines/sous-domaines peuvent être `available` parce qu'ils sont reliés à des missions, alors que leurs leçons restent `upcoming`. Le commentaire du modèle l'explique, mais côté parcours utilisateur cela peut rester ambigu.
- Certaines missions/projets `bientôt` ou `en préparation` sont cliquables et affichent une page détaillée riche. Le statut dit "non prêt", mais le comportement dit "ouvrable".
- Dans `content/felix-character.ts`, certaines zones de la cour déclarent `getPublicStatus("disponible")` pour des liens vers `defis-mathematiques` ou `station-meteo-de-felix`. `defis-mathematiques` est `bientôt` dans `content/cm2.ts`, alors que `station-meteo-de-felix` est disponible dans `content/felix-missions.ts`.

## 12. Recommandations prioritaires

1. Garder les routes longues existantes comme routes techniques, mais prévoir plus tard des façades courtes pour les trois leçons françaises déjà routées.
2. Clarifier la règle de clic des cartes mission : soit rendre les entrées non disponibles non cliquables, soit afficher explicitement que la page ouverte est une fiche d'annonce.
3. Harmoniser les statuts entre les lieux/personnages et les missions réellement référencées.
4. Distinguer visuellement "support projetable/imprimable décrit dans la page" et "PDF réel téléchargeable".
5. Conserver `/primaire/cm2/parcours` comme accès enseignant principal, mais éviter que ce parcours donne l'impression que toutes les missions liées sont prêtes.

## 13. Liste des corrections à faire plus tard, sans les faire maintenant

- Créer des redirects ou façades courtes pour les trois leçons françaises déjà routées.
- Ajouter une règle commune pour rendre non cliquables les cartes `upcoming` ou `in-progress` quand elles représentent une ressource non prête.
- Auditer `content/pedagogical-places.ts` et `content/felix-character.ts` pour aligner les statuts affichés avec les statuts des missions ciblées.
- Ajouter un test ou une vérification scriptée : lien disponible = route existante ou PDF réel.
- Ajouter un test ou une vérification scriptée : lien PDF disponible = fichier présent dans `public/`.
- Décider si les pages de mission `bientôt` / `en préparation` doivent rester accessibles en lecture directe ou devenir des fiches d'attente non navigables depuis les catalogues.
- Documenter la différence entre statut de domaine, statut de leçon, statut de mission et existence réelle d'un PDF.
