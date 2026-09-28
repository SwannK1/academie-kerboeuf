# Passe UX « productivité » — parcours mesurés

Date : 28 septembre 2026 · Branche : `refonte/espace-de-travail`

Principe : **clic → manipulation → résultat**. Chaque parcours est joué par
`e2e/espace-de-travail.spec.ts` sur ordinateur, tablette et mobile ; les
compteurs ci-dessous sont ceux relevés par le test (annotations Playwright).
Un « clic » est une décision de l'utilisateur ; les réglages préalables
(profil, emploi du temps) sont faits avant la mesure.

| Parcours | Clics | Champs texte | Écrans | Détail |
|---|---|---|---|---|
| A · séance de maths dans un créneau | 3 (+1 « OK ») | 0 | 1 | créneau → notion (« Fiche prête ») → fiche. Jour, heure, durée, matière, niveau déduits. |
| B · reprendre une journée | 1 | 0 | 1 | « Comme lundi dernier ». |
| C · fiche de soustraction imprimée | 4 | 0 | 2 | Trouver un PDF → Maths → Imprimer → Exercices. Joué en CE2 : aucune fiche de maths CE1 n'est publiée. |
| D · fiche ajoutée à une séance | 3 | 0 | 1 | fiche → Ajouter à… → la séance. Ou glisser la fiche du bac vers un créneau (ordinateur). |
| E · déplacer lundi → mardi | 1 (glisser) / 2 (menu) | 0 | 1 | Le menu `…` remplace le glisser au doigt et au clavier. |
| F · cahier journal | 1 | 0 | 2 | Construit depuis la semaine, prêt à imprimer. |
| G · créer un conseil d'école | 1 | 0 | 2 | Depuis le tableau de bord Direction. |
| H · choisir et réordonner l'ordre du jour | 4 | 0 | 1 | 2 décochés, 1 remonté, 1 durée changée (10 → 15 min). |
| I · générer et imprimer | 2 | 0 | 1 | Générer → Imprimer (la boîte d'impression du navigateur n'est pas pilotée par le test). |
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
