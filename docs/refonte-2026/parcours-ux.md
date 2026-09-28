# Passe UX « productivité » — parcours mesurés

Date : 28 septembre 2026 (finition incluse) · Branche : `refonte/espace-de-travail`

Principe : **clic → manipulation → résultat**. Chaque parcours est joué par
`e2e/espace-de-travail.spec.ts` sur ordinateur, tablette et mobile ; les
compteurs ci-dessous sont ceux relevés par le test (annotations Playwright).
Un « clic » est une décision de l'utilisateur ; les réglages préalables
(profil, emploi du temps) sont faits avant la mesure.

| Parcours | Clics | Champs texte | Écrans | Détail |
|---|---|---|---|---|
| A · séance de maths dans un créneau | 3 | 0 | 1 | créneau → notion (« Fiche prête ») → fiche. Enregistré à chaque clic (« ✓ Enregistré »), plus de bouton OK. |
| B · reprendre une journée | 1 | 0 | 1 | « Comme lundi dernier ». |
| C · fiche de soustraction imprimée | 3 | 0 | 2 | Trouver un PDF → Maths → Imprimer (fiche d'exercices, sans ouvrir le panneau). Joué en CE2 : aucune fiche de maths CE1 n'est publiée. |
| D · fiche ajoutée à une séance | 3 | 0 | 1 | fiche → Ajouter à… → la séance. Ou glisser la fiche du bac vers un créneau (ordinateur). |
| E · déplacer lundi → mardi | 1 (glisser) / 2 (menu) | 0 | 1 | Le menu `…` remplace le glisser au doigt et au clavier. |
| F · cahier journal | 2 | 0 | 2 | Cahier journal → Imprimer (déclenchement vérifié). |
| G · créer un conseil d'école | 1 | 0 | 2 | Depuis le tableau de bord Direction. |
| H · choisir et réordonner l'ordre du jour | 4 | 0 | 1 | 2 décochés, 1 remonté, 1 durée changée (10 → 15 min). |
| I · générer et imprimer | 2 | 0 | 1 | Générer → Imprimer (déclenchement vérifié). |
| J · sortie scolaire | 2 (+1 coche) | 0 | 1 | Nuitée : Non · Transport : Car → checklist. Sources repliées sous « Pourquoi ? ». |
| K · reporter une tâche | 1 (glisser) / 2 (menu) | 0 | 1 | Aujourd'hui → Cette semaine. |

Aucun parcours principal ne demande de texte. Les champs restants sont
facultatifs et cachés : « Plus d'options » (séance), « + Ajouter une
précision » (réunion), « Ajouter un point libre », « Ajouter une tâche ».

## Changements de cette passe

- **Séance en mode rapide** : notions probables en gros items (prévues dans la
  période, dernière séance de la matière, « Fiche prête »), puis fiches en
  vignettes ; domaine, type, organisation, durée, heure, matière et note sous
  « Plus d'options ». « Ajouter » dans une journée ne demande que la matière.
- **Smart defaults** : « Comme lundi dernier », « Reprendre la semaine »,
  habitudes → semaine type, « Répartir l'année » en un clic.
- **Table de travail** : bac de ressources à côté de la semaine ; une fiche
  déposée sur une séance s'y ajoute, sur un créneau libre crée la séance.
- **Bibliothèque** : Récents · Favoris · matières en tête ; niveau en menu
  compact ; types repliés ; Aperçu / Imprimer / Projeter sur chaque carte.
- **Fiche** : le PDF est l'objet principal, Imprimer · Projeter · Ajouter à…
  en gros boutons au-dessus.
- **Accueil cockpit** (profil connu) : salutation, prochaine journée
  (séances prêtes), actions rapides, Direction de la semaine, récents.
- **Progression** : À faire ○ · En cours ◐ · Travaillé ●, état changé d'un
  clic ou par glisser, « Programmer une séance » depuis une notion.
- **Direction** : colonnes Aujourd'hui · Cette semaine · À anticiper, tâches
  déplaçables ; réunion « Information · Décidé · À suivre », action de suivi
  sans texte ; démarches courtes, sources repliées.
- **Rapprochement notion ↔ fiche** fiabilisé (mots de consigne ignorés,
  correspondance en début de mot) ; identifiants de fiches sans préfixe
  redondant.

## Finition avant fusion

- Panneau séance : plus de bouton « OK » ; état « ✓ Enregistré » dès la
  première modification ; fermeture par la croix, Échap ou un clic à côté.
- Cartes de fiche : « Imprimer » imprime directement la fiche élève
  (exercices, sinon le premier document), une flèche donne les autres
  documents ; « Projeter » ouvre la leçon page entière ; « Aperçu » ouvre le
  panneau.
- « Proposer une répartition » (au lieu de « Répartir l'année ») ; retour
  « Première répartition créée · à ajuster ».
- Micro-copy raccourcie (accueil, journée, bibliothèque vide, outils, Mon espace).
- Mobile 390 px : chips, boutons `…`, monter/descendre et durées à 44 px ;
  points de réunion cliquables sur toute la ligne.
- Impression : `window.print()` (cahier journal, ordre du jour) et cadre PDF
  + signal `ak:impression` (fiches) vérifiés par les tests. La boîte de
  dialogue native du navigateur n'est pas automatisable : c'est une limite de
  test, pas une erreur applicative.
