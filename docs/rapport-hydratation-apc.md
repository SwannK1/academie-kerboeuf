# Rapport — Risque d'hydratation sur `/enseignants/apc`

## Résumé

- **Anomalie reproduite** : oui, mais **conditionnelle** — contrairement au bug de
  `/enseignants/progression` (qui se déclenchait à chaque chargement), celui-ci ne se
  manifeste que lorsqu'au moins une séance APC est déjà enregistrée dans
  `localStorage`. Sur stockage vide ou corrompu, aucune divergence n'apparaît.
- **Cause** : `TeacherApcPlanner.tsx` initialisait `sessions` via
  `useState<ApcSession[]>(() => readStoredSessions())` — un initialiseur paresseux
  exécuté **pendant le rendu**. `readStoredSessions()` renvoie toujours `[]` côté
  serveur (`typeof window === "undefined"`), mais lit le contenu réel de
  `localStorage` dès le tout premier rendu client.
- **Correction appliquée** : état initial déterministe (`[]`, identique
  serveur/client), chargement réel du stockage dans un `useEffect` après le montage,
  et garde contre l'écriture prématurée dans `localStorage` pendant la fenêtre entre
  le montage et la fin du chargement.
- **Résultat** : 0 erreur d'hydratation, 0 erreur console sur les 4 scénarios testés
  (stockage vide, valide, corrompu, création), sur 2 exécutions consécutives de
  chaque scénario. Aucune régression sur `/enseignants/progression` ni sur les autres
  tests enseignants existants (17/17 tests passent).

## Reproduction

- **Environnement** : build de production (`next start`), un seul serveur actif sur
  le port 3100, aucun ancien processus résiduel.
- **Build testé** : `rm -rf .next && npm run build` — 420/420 routes générées.
- **Navigateur** : Chromium (Playwright), contextes isolés et propres à chaque essai.
- **Message exact** (avec une séance déjà en stockage) :
  ```
  Minified React error #418; visit https://react.dev/errors/418?args[]=HTML&args[]=
  for the full message or use the non-minified dev environment for full errors and
  additional helpful warnings.
  ```
  (React error #418 = « Hydration failed because the initial UI does not match what
  was rendered on the server ».)
- **Conditions de reproduction** :
  1. Stockage vide (contexte navigateur neuf) → **aucune erreur**, reproduit 2 fois.
  2. Stockage contenant une séance APC valide, pré-injectée via
     `context.addInitScript` → **erreur reproduite à l'identique 2 fois sur 2**
     (`pageerror` React #418).
  3. Stockage contenant une valeur JSON invalide (`"not-valid-json{{{"`)
     → **aucune erreur** (le composant retombe silencieusement sur `[]` des deux
     côtés, via le `try/catch` existant dans `readStoredSessions`).
- **Fréquence** : 100 % de reproduction pour le scénario 2 (2/2), 0 % pour les
  scénarios 1 et 3 (0/2 chacun) — cohérent avec la cause identifiée (voir plus bas).

## Cause racine

- **Valeur divergente** : le tableau `sessions` (et par répercussion la liste
  affichée, `visibleSessions`).
- **Fichier / composant** : `components/teacher-apc-planner/TeacherApcPlanner.tsx`,
  ligne d'origine :
  ```ts
  const [sessions, setSessions] = useState<ApcSession[]>(() =>
    readStoredSessions(),
  );
  ```
- **Pourquoi serveur et client ne rendaient pas la même chose** : l'initialiseur
  paresseux de `useState` s'exécute pendant le rendu, aussi bien côté serveur que
  lors du tout premier rendu client (avant que React ne réconcilie l'arbre avec le
  HTML reçu du serveur). `readStoredSessions()` contient une garde
  `if (typeof window === "undefined") return [];` : côté serveur, `window` n'existe
  jamais, donc le résultat est systématiquement `[]` → le HTML envoyé au navigateur
  affiche toujours le message « Aucune séance ou cycle d'APC pour ces filtres ».
  Côté client, dès le premier rendu (avant hydratation complète), `window` existe
  déjà : si une séance est enregistrée, `readStoredSessions()` la retourne
  immédiatement, et React tente de réconcilier un DOM contenant une carte de séance
  avec un HTML serveur qui ne contient que le message vide — d'où l'échec
  d'hydratation.
- **Différence avec `/enseignants/progression`** : la cause racine (lecture de
  `localStorage` pendant le rendu) est la même *catégorie* de bug, mais le
  **déclencheur diffère**. Sur `progression`, une bannière d'état
  (`storageNotice`) était calculée à partir de `isLocalStorageAvailable()`, qui
  vaut *toujours* `false` côté serveur et *presque toujours* `true` côté client
  (hors navigation privée bloquée) — la divergence apparaissait donc à **chaque**
  chargement, stockage vide ou non. `TeacherApcPlanner.tsx` ne comporte aucune
  bannière équivalente : la seule donnée sensible au rendu est le contenu réel des
  séances. Résultat : la divergence n'existe que si une séance a déjà été
  enregistrée par l'enseignant sur cet appareil — ce qui explique pourquoi elle
  n'apparaissait pas nécessairement lors des vérifications précédentes sur stockage
  vide, et pourquoi elle est restée hors périmètre lors du chantier `progression`
  (accord explicite de ne pas la corriger par anticipation sans preuve).

## Correction

### Fichiers modifiés

- `components/teacher-apc-planner/TeacherApcPlanner.tsx`

### Logique modifiée

1. `sessions` démarre désormais à `[]` (valeur déterministe, identique côté serveur
   et lors du premier rendu client) au lieu d'appeler `readStoredSessions()` pendant
   le rendu.
2. Un nouveau `useEffect(() => { setSessions(readStoredSessions()); }, [])` charge le
   contenu réel du stockage **après le montage**, une fois l'hydratation terminée.
3. Le `useEffect` d'écriture existant (`writeStoredSessions(sessions)`) est désormais
   protégé par un `useRef` (`isInitialWriteRef`) qui ignore sa toute première
   exécution — celle qui suivrait immédiatement le montage, à un moment où `sessions`
   vaudrait encore `[]` avant que le chargement ci-dessus n'ait eu lieu. Sans cette
   garde, le passage à un état initial déterministe aurait introduit un **nouveau**
   risque qui n'existait pas dans le code d'origine : écraser une séance déjà
   enregistrée par un tableau vide avant la fin du chargement.

Aucune clé de stockage, aucun format de données, aucun libellé, aucune route et
aucune fonctionnalité n'ont été modifiés.

### Raison du choix

Le chargement post-montage est la solution explicitement recommandée pour ce type de
divergence (donnée uniquement disponible côté client) : elle ne masque pas l'erreur,
elle élimine la cause en ne lisant jamais `localStorage` pendant un rendu qui doit
être identique des deux côtés.

### Solutions écartées

- **Copier telle quelle la correction de `progression`** : écartée après vérification
  — `progression` avait une bannière d'état et un flux de lecture/écriture différent
  (deux états séparés `cards` + `storageNotice`, tous deux dérivés de la lecture).
  `TeacherApcPlanner` n'a qu'un seul état concerné (`sessions`) et aucune bannière ;
  copier la structure aurait ajouté du code et des concepts (`storageNotice`
  équivalent) qui n'existent pas dans ce composant et que la consigne interdit
  d'ajouter (« ne modifie pas... les fonctionnalités »).
- **`ssr: false`** : écartée. Aurait supprimé tout rendu serveur de l'outil (perte de
  contenu dans le HTML initial, changement de comportement au chargement), pour un
  bug qui se résout entièrement par un chargement post-montage classique.
- **`suppressHydrationWarning`** : écartée. Aurait masqué le symptôme sans corriger la
  divergence réelle de contenu (React error #418 aurait continué à se produire sous
  une forme silencieuse ou dégradée).
- **Ne rien faire, au motif que le bug ne se produit pas systématiquement** :
  écartée. Le bug est réel et se reproduit à 100 % dès qu'un enseignant a déjà
  enregistré une séance — ce qui est le cas d'usage normal et attendu de l'outil
  après une première utilisation.

### Garanties de rétrocompatibilité

- Clé de stockage inchangée : `academie-kerboeuf-apc-v1`.
- Format des données inchangé (`ApcSession[]` sérialisé tel quel).
- Aucune session existante n'est perdue, filtrée ou transformée par la correction
  (vérifié explicitement, voir Tests).

## Tests réalisés

- **Stockage vide** : chargement initial sans erreur, message « Aucune séance ou
  cycle d'APC... » affiché correctement (2 exécutions).
- **Stockage valide** : une séance pré-enregistrée reste visible après hydratation,
  aucune erreur, et **reste présente après deux rechargements successifs** (aucune
  perte, aucune écriture prématurée) — 2 exécutions.
- **Stockage corrompu** : JSON invalide → repli silencieux sur l'état vide, page
  fonctionnelle, aucune erreur.
- **Rechargement** : testé pour les 3 états de stockage ci-dessus, plus un test de
  persistance dédié (session créée manuellement, visible après 2 rechargements
  consécutifs).
- **Interactions** : création d'une séance, bascule d'un élément de checklist,
  fermeture du formulaire d'édition, recherche (filtre positif et filtre sans
  résultat), duplication d'une séance, suppression d'une séance, navigation vers une
  autre page puis retour — toutes fonctionnelles, 0 erreur console/pageerror sur
  l'ensemble du scénario.
- **Responsive** : 320 px, 768 px et 1440 px — aucun débordement horizontal
  (`scrollWidth === clientWidth` dans les 3 cas), aucune erreur console.
- **Clavier** : focus vérifié après ouverture du formulaire de création (le focus
  atterrit sur un élément interactif, pas perdu dans le vide). Ce composant n'a pas
  de dialogue modal (contrairement au panneau latéral de `progression`) : pas de
  comportement Échap à vérifier ici, ce n'est pas une régression, l'outil n'en a
  jamais eu.
- **Console / hydratation** : 0 erreur console et 0 `pageerror` sur l'ensemble des
  scénarios ci-dessus, après correction.

## Avant/après

| Vérification              | Avant                                   | Après |
| -------------------------- | ---------------------------------------- | ----- |
| Erreurs d'hydratation      | 1 (React #418, reproduite 2/2 avec stockage valide) | 0 (0/2 sur les 4 scénarios) |
| Erreurs console            | 0 (l'erreur remonte en `pageerror`, pas en `console.error`) | 0 |
| Requêtes échouées          | 0                                        | 0 |
| Restauration localStorage  | Correcte une fois hydraté, mais hydratation en échec avant | Correcte, hydratation propre |
| Interaction principale     | Fonctionnelle malgré l'erreur d'hydratation | Fonctionnelle, sans erreur |
| Build                      | 420/420 routes                           | 420/420 routes |

Tests Playwright : 4/4 nouveaux tests APC passés (répétés 3× sans échec, soit 12/12
exécutions), 17/17 tests enseignants existants passés (APC + programmation annuelle
+ progression, hydratation et panneaux latéraux confondus). Durée du fichier de test
ciblé (`teacher-apc-hydration.spec.ts`) : environ 3 secondes pour les 4 tests sur un
run isolé, ~1.5 minute pour la suite complète de 17 tests enseignants (incluant le
temps de build/démarrage du serveur par le `webServer` de Playwright).

## Fichiers modifiés

| Fichier | Justification |
| --- | --- |
| `components/teacher-apc-planner/TeacherApcPlanner.tsx` | Corrige la lecture de `localStorage` pendant le rendu (cause de la divergence serveur/client) et ajoute la garde anti-écriture-prématurée rendue nécessaire par ce changement. |
| `e2e/teacher-apc-hydration.spec.ts` (nouveau) | Test de non-régression ciblé : verrouille les 3 états de stockage, l'absence d'erreur d'hydratation, et la persistance après rechargement. |
| `docs/rapport-hydratation-apc.md` (nouveau) | Ce rapport. |

## Validation

- `npm run lint` : 0 erreur, 0 avertissement.
- `npx tsc --noEmit` (après `rm -rf .next`) : 0 erreur.
- `npm run build` : succès, **420/420 routes générées** (inchangé).
- Test Playwright ciblé (`teacher-apc-hydration.spec.ts`) : 4/4 passés, répété 3× sans
  échec.
- Test de production complet (serveur unique, port 3100, aucun processus résiduel
  avant/après) : validé.
- Suite enseignants complète exécutée ensemble : **17/17 tests passés**
  (`teacher-apc-hydration.spec.ts`, `teacher-programmation-annuelle-panel.spec.ts`,
  `teacher-progression-hydration.spec.ts`, `teacher-progression-panel.spec.ts`).
- Nombre de routes générées : 420 (identique avant/après, aucune route ajoutée,
  modifiée ou supprimée).

## Limites

- **Un seul jeu de données de reproduction a été testé** pour le scénario « stockage
  valide » (une séance unique). Le comportement avec un grand nombre de séances
  (dizaines/centaines) n'a pas été testé séparément, mais la cause (lecture pendant
  le rendu) et la correction (chargement post-montage) sont indépendantes du volume
  de données : aucun risque supplémentaire identifié, mais non mesuré.
- **Un seul navigateur testé** : Chromium via Playwright. Le comportement sur
  Firefox/Safari n'a pas été vérifié ; React #418 est un comportement du moteur
  d'hydratation React, pas spécifique au moteur de rendu du navigateur, donc le
  risque de divergence de comportement entre navigateurs est faible mais non
  démontré ici.
- **Données locales historiques non disponibles** : cet audit s'appuie sur des
  données de test injectées via `localStorage.setItem`, pas sur un vrai profil
  enseignant existant. Le format `ApcSession` utilisé dans le test correspond au
  format actuel du code ; d'éventuelles données plus anciennes dans un format
  antérieur (s'il en existe, hors du format actuel) n'ont pas été testées — le
  composant ne comporte aujourd'hui aucune logique de migration de format (à la
  différence de `content/teacher-progression.ts` qui gère une migration `v2 → v3`),
  donc ce risque préexistant à cette correction n'est ni introduit ni résolu ici.
- **Le même anti-pattern (lecture de stockage dans un initialiseur `useState`
  paresseux ou un `useMemo` de rendu) n'a pas été audité sur les autres outils
  enseignants** au-delà de `progression` et `apc`, conformément au périmètre
  strictement limité de ce chantier. Si un audit futur devait être mené sur d'autres
  outils, il faudrait vérifier au cas par cas — comme ici — si une bannière ou un
  contenu dérivé de la disponibilité du stockage crée une divergence systématique, ou
  si (comme pour `apc`) la divergence ne dépend que de la présence de données déjà
  enregistrées.
