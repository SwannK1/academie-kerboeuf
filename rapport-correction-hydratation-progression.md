# Rapport de correction — erreur d'hydratation `/enseignants/progression`

## Résumé

- **Route concernée** : `/enseignants/progression` (outil enseignant « Progression de période »).
- **Erreur observée** : erreur d'hydratation React (minified error #418 — le HTML rendu par le serveur ne correspond pas au premier rendu client) au chargement de la page, avant toute interaction.
- **Cause exacte** : `TeacherPeriodProgressionClient.tsx` lisait `localStorage` **pendant le rendu** (via `useMemo(() => readStoredCardsChecked(), [])`) pour initialiser l'état `cards` et le message `storageNotice`. `localStorage` n'existe pas côté serveur ; le HTML serveur affichait donc systématiquement la bannière « stockage local non disponible », alors que le premier rendu client (où le stockage est réellement disponible) ne l'affichait pas.
- **Correction appliquée** : état initial déterministe (`cards = []`, `storageNotice = null`, identique serveur/client) puis lecture réelle de `localStorage` dans un `useEffect` exécuté après le montage. Un garde-fou (`useRef`) empêche que l'écriture automatique existante (qui persiste `cards` à chaque changement) n'efface des cartes déjà enregistrées avant la fin de ce chargement.
- **Résultat final** : 0 erreur d'hydratation, 0 erreur console, restauration correcte du stockage local dans les trois situations testées (vide / valide / corrompu), aucune régression détectée sur les autres outils enseignants ni sur le responsive. Build de production : 420 routes générées, inchangé. Suite Playwright : 13/13 tests passés (dont 3 nouveaux tests de non-régression ciblant explicitement cette erreur).

## Reproduction initiale

- **Build testé** : build de production (`rm -rf .next && npm run build`, puis `npm run start -- -p 3100`) — jamais le serveur de développement.
- **Navigateur utilisé** : Chromium (pré-installé, piloté via Playwright), en mode headless.
- **Message exact de l'erreur** (capturé via l'événement `pageerror`) :
  ```
  Minified React error #418; visit https://react.dev/errors/418?args[]=HTML&args[]=
  for the full message or use the non-minified dev environment for full errors and
  additional helpful warnings.
  ```
  React error #418 correspond à : *« Hydration failed because the initial UI does not match what was rendered on the server. »*
- **Conditions de reproduction** : navigation directe vers `/enseignants/progression` avec un contexte navigateur neuf (stockage local vide, navigation non privée — donc `localStorage` réellement disponible côté client). Comparaison directe :
  - HTML brut renvoyé par le serveur : contient toujours `Le stockage local n'est pas disponible (navigation privée ou bloqué)…`
  - DOM après hydratation : ne contient **pas** cette bannière (le stockage est en réalité disponible).
  - → Divergence serveur/client confirmée à chaque exécution.
- **Fréquence de reproduction** : reproduite **2 fois de suite** sur le build de production, dans deux contextes navigateur neufs indépendants (résultat identique à chaque fois : 1 `pageerror`, 0 erreur console, divergence bannière confirmée).
- **Effet secondaire constaté** : la suite Playwright déjà existante (`e2e/teacher-progression-panel.spec.ts`, 5 tests, non modifiée) échouait également sur le code non corrigé — non pas sur une assertion d'erreurs console, mais par **timeout** en attendant le formulaire « Carte libre », signe que le crash d'hydratation cassait la réactivité du bouton dans ce contexte de test. Elle passe intégralement après correction.

## Cause racine

- **Fichier responsable** : `components/academy/TeacherPeriodProgressionClient.tsx`, utilisé par `components/academy/TeacherPeriodProgression.tsx`, lui-même rendu par `app/enseignants/progression/page.tsx`.
- **Valeur qui différait** : l'état initial `storageNotice` (et, si des cartes étaient déjà enregistrées, l'état `cards`). Le calcul `readStoredCardsChecked()` dépend de `isLocalStorageAvailable()` qui renvoie `false` de façon inconditionnelle dès que `typeof window === "undefined"` — donc toujours `false` côté serveur, et généralement `true` côté client (hors navigation privée/stockage bloqué).
- **Pourquoi serveur et client ne rendaient pas la même chose** : ce calcul était fait dans un `useMemo(() => …, [])`, exécuté **pendant le rendu** — donc une fois côté serveur (SSR) avec `storageAvailable = false` forcé, puis une seconde fois côté client lors du premier rendu (avant que `useEffect` n'ait pu s'exécuter), où `storageAvailable` reflète la réalité du navigateur. React compare le HTML serveur au DOM produit par ce premier rendu client et détecte la divergence.
- **Pourquoi cette page spécifiquement** : parmi les ~28 outils de `/enseignants`, 11 (cahier journal, emploi du temps, programmation annuelle, matériel de classe, préparation de séance, formations, projets/sorties, rituels, calendrier, conseil d'école, affichages) sont chargés via `next/dynamic(..., { ssr: false })` — ils ne sont donc **jamais rendus côté serveur**, ce qui élimine structurellement ce type de divergence. `/enseignants/progression` fait partie des outils rendus normalement (SSR + hydratation), ce qui l'exposait directement à ce problème dès qu'un accès à `localStorage` avait lieu pendant le rendu plutôt que dans un effet.

## Correction

- **Fichiers modifiés** :
  - `components/academy/TeacherPeriodProgressionClient.tsx` — logique corrigée (détail ci-dessous).
  - `e2e/teacher-progression-hydration.spec.ts` — nouveau test de non-régression (voir section Tests).
- **Logique modifiée** :
  1. `cards` et `storageNotice` sont désormais initialisés à des valeurs déterministes et identiques serveur/client (`[]` et `null`), au lieu d'être calculés via `readStoredCardsChecked()` pendant le rendu.
  2. Un nouveau `useEffect(() => { … }, [])` lit `localStorage` **après le montage** (donc uniquement côté client, jamais pendant le SSR) et met à jour `cards`/`storageNotice` avec le contenu réel.
  3. L'effet d'écriture existant (`useEffect(() => { writeStoredCards(cards); }, [cards])`, qui persiste automatiquement toute modification) est protégé par un `useRef` (`isInitialWriteRef`) qui ignore sa toute première exécution — celle qui correspondrait au rendu initial à vide (`cards = []`), avant que l'effet de chargement n'ait eu le temps de restaurer les cartes déjà enregistrées. Sans cette garde, ce mécanisme d'écriture automatique préexistant risquait d'écraser les données de l'enseignant par un tableau vide dans la fenêtre entre le montage et la fin du chargement.
- **Raison du choix** : cette approche (« valeur initiale déterministe, chargement du stockage local après le montage ») correspond exactement à l'option recommandée par les instructions et à un motif déjà utilisé ailleurs dans ce dépôt (`components/teacher-local-backup/TeacherLocalBackupClient.tsx`, commentaire *« Hydration-safe mount read: localStorage must not be read during SSR/first paint »*), garantissant la cohérence avec les conventions existantes du projet. Le commentaire ESLint `react-hooks/set-state-in-effect` déjà présent dans ce fichier voisin a été repris à l'identique pour le même motif justifié.
- **Solutions écartées** :
  - `dynamic(..., { ssr: false })` : aurait aligné cet outil sur les 11 autres, mais change le comportement observable (plus aucun rendu serveur, page vide jusqu'à l'hydratation) pour un outil qui n'en avait pas besoin jusqu'ici — écarté par prudence, non justifié par la cause réelle (le problème est l'accès à `localStorage` pendant le rendu, pas le SSR en lui-même).
  - `suppressHydrationWarning` : masquerait l'avertissement sans corriger la divergence réelle de contenu (le tableau Kanban et la bannière resteraient temporairement incohérents) — explicitement proscrit par la consigne.
  - Passage des données initiales depuis le Server Component : non applicable, les données proviennent de `localStorage` (propre à l'appareil de l'enseignant), qui n'existe pas côté serveur.
- **Garanties de rétrocompatibilité** : aucune clé de stockage modifiée (`progression-periode-kanban-v3` inchangée), aucun format de donnée modifié, migration depuis `progression-periode-v2` toujours fonctionnelle (code non touché), aucune fonctionnalité retirée. Le seul changement de comportement observable est l'ordre d'apparition : la bannière de notice et les cartes déjà enregistrées apparaissent désormais juste après le montage plutôt que d'être présentes dans le tout premier HTML — ce montage se produit en pratique en quelques centaines de millisecondes, sans écran blanc (l'état « Aucune carte » affiché entre-temps est un état déjà existant et légitime de cet outil, pas un état dégradé ajouté pour l'occasion).

## Tests réalisés

- **Stockage vide** : chargement initial sans erreur console/hydratation, état « Aucune carte pour cette période » affiché correctement.
- **Stockage valide** : carte pré-enregistrée (via `context.addInitScript`, simulant un utilisateur qui revient sur l'outil) visible dès le premier chargement, puis toujours visible après un second rechargement — confirme l'absence de perte de données par écriture prématurée.
- **Stockage invalide/incomplet** : tableau contenant une entrée corrompue (chaîne au lieu d'objet) → page fonctionnelle, carte valide conservée, message « Certaines cartes enregistrées étaient illisibles et ont été ignorées » affiché, aucun crash.
- **Rechargement** : testé à plusieurs reprises pour chacun des 3 scénarios ci-dessus ; données toujours restaurées correctement.
- **Interactions** : ajout d'une carte libre via le formulaire, persistance après rechargement, ouverture/fermeture du panneau latéral de détail (couvert par la suite Playwright existante, non modifiée), navigation vers `/enseignants` puis retour en arrière (page toujours fonctionnelle).
- **Responsive** : testé à 320 px, 768 px et 1440 px — aucun débordement horizontal, aucune erreur.
- **Clavier** : navigation au tabulateur fonctionnelle, focus visible sur les éléments interactifs.
- **Console** : 0 erreur console sur l'ensemble des scénarios testés après correction.
- **Hydratation** : 0 occurrence de l'erreur React #418 après correction, sur 2 exécutions directes de reproduction + 22 exécutions de tests Playwright (13 + 9 en répétition ×3 du fichier de non-régression) + les scénarios manuels ci-dessus.
- **Impression** : émulation du média `print` vérifiée — les sections marquées `print:hidden` restent masquées comme avant, aucune erreur.
- **Autre outil enseignant** : `/enseignants/cahier-journal` re-testé après correction — 0 erreur, comportement inchangé (fichier non modifié).

## Résultats avant/après

| Vérification               | Avant                                              | Après |
| --------------------------- | --------------------------------------------------- | ----- |
| Erreurs d'hydratation        | 1 par chargement (React #418), reproduit 2/2 fois    | 0 |
| Erreurs console              | 0 (l'erreur remonte comme `pageerror`, pas `console.error`) | 0 |
| Requêtes échouées            | 0                                                     | 0 |
| Restauration localStorage    | Cassée en pratique : la divergence d'hydratation faisait planter l'interaction avec le formulaire « Carte libre » dans la suite Playwright existante (timeout) | Vide / valide / invalide : restaurée correctement dans les 3 cas |
| Interaction principale       | Suite Playwright existante (5 tests) : 5 échecs (timeout sur le formulaire) | 5/5 passés |
| Build                        | ✓ (420 routes générées)                              | ✓ (420 routes générées, inchangé) |

## Fichiers modifiés

| Fichier | Justification |
| --- | --- |
| `components/academy/TeacherPeriodProgressionClient.tsx` | Correction de la cause racine : état initial déterministe + chargement de `localStorage` après montage + garde contre une écriture prématurée. |
| `e2e/teacher-progression-hydration.spec.ts` | Nouveau test de non-régression ciblant explicitement cette erreur (3 scénarios : stockage vide, valide, corrompu), en réutilisant l'utilitaire `trackConsoleErrors` déjà présent dans le dépôt. |

Aucun autre fichier n'a été modifié : ni les 11 autres outils enseignants (qui utilisent `dynamic(ssr:false)` et ne sont donc pas exposés à cette classe de bug), ni `content/teacher-progression.ts` (la logique de lecture/écriture/validation du stockage n'a pas changé, seul le **moment** où elle est appelée a changé), ni la navigation, ni le design, ni la gouvernance des statuts publics.

## Validation

- `npm run lint` : ✓ (0 erreur, y compris la règle `react-hooks/set-state-in-effect` sur le nouvel effet).
- `npx tsc --noEmit` : ✓ (0 erreur).
- `npm run build` (après `rm -rf .next`) : ✓ — **420 routes générées**, identique à avant correction.
- Test Playwright de non-régression (`e2e/teacher-progression-hydration.spec.ts`) : ✓ 3/3, répété ×3 sans échec (9/9).
- Suite Playwright complète (`e2e/`) : ✓ 13/13, incluant les 5 tests existants de `teacher-progression-panel.spec.ts` (qui échouaient avant correction) et les 4 tests existants de `teacher-programmation-annuelle-panel.spec.ts` (autre outil, non modifié — vérifie l'absence de régression).
- Test de production manuel (build + serveur unique + navigation directe) : ✓, serveur arrêté proprement après chaque vérification (aucun ancien processus laissé actif, port libéré).

## Limites

- Les tests ont été exécutés sur Chromium uniquement (via Playwright, projet `desktop-chromium`) ; le comportement sur Firefox/Safari n'a pas été vérifié spécifiquement pour cette correction, bien que rien dans le correctif ne soit spécifique à un moteur de rendu.
- Aucune donnée `localStorage` réelle d'un utilisateur existant n'était disponible pour ce test (environnement de développement isolé) : la validation « stockage valide » repose sur des données de test injectées, pas sur un historique réel d'enseignant. Le format de donnée n'ayant pas changé, la rétrocompatibilité avec des données réellement existantes est attendue mais non observée directement.
- Le correctif élimine la divergence d'hydratation dans tous les scénarios testés, mais un scénario extrêmement improbable (écriture concurrente dans `localStorage` par un autre onglet exactement pendant la fenêtre de chargement initial) n'a pas été testé — risque jugé négligeable en usage réel (un seul onglet, un seul utilisateur par appareil).
- Le même schéma de code (lecture de `localStorage` dans un `useState`/`useMemo` exécuté pendant le rendu plutôt que dans un `useEffect`) a été repéré par lecture de code dans au moins un autre outil enseignant non couvert par `ssr:false` (`components/teacher-apc-planner/TeacherApcPlanner.tsx`, route `/enseignants/apc`). Conformément au périmètre demandé, il n'a **pas** été corrigé dans le cadre de cette intervention — signalé ici pour information, à traiter séparément si confirmé.

---

**Branche** : `fix/hydration-progression-v1`
**Commit** : voir message de commit associé à ce rapport
