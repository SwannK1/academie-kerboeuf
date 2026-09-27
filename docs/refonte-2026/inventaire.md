# Refonte « espace de travail » — inventaire de l'ancien produit

Date : 27 septembre 2026 · Branche : `refonte/espace-de-travail`

Document interne de travail. Il fixe, route par route, ce que devient chaque
élément de l'ancien site quand Académie Kerboeuf devient la plateforme de
travail et de ressources de l'école (PS → CM2 pour les outils, PS → 3e pour
la bibliothèque, lycée retiré).

Légende : `GARDER` · `FUSIONNER` · `DÉPLACER` · `ARCHIVER` · `SUPPRIMER` · `REDIRIGER`.

« Archiver » signifie : le code et les contenus restent dans le dépôt, la route
n'est plus exposée (redirection permanente ou lien retiré + `noindex`), rien
n'est détruit. Les données locales (localStorage) des anciens outils ne sont
jamais effacées.

## 1. Constat de départ

- Next.js 16 (App Router), 100 % statique, aucun backend, aucun compte.
- 126 pages, dont une grande partie héritée de l'ancienne « Académie CP →
  Terminale » narrative : univers, carte, lieux, personnages, professeurs et
  élèves fictifs, missions, parcours.
- 31 outils enseignants indépendants sous `/enseignants/*`, chacun avec sa
  propre clé localStorage, son propre modèle de données et souvent un
  formulaire à nombreux champs. Aucun ne réutilise l'information d'un autre
  (l'emploi du temps ne nourrit pas le cahier journal, la séance ne nourrit
  pas la progression, etc.).
- 866 PDF réels dans `public/fiches` : maternelle 9, CP 33, CE1 28, CE2 24,
  CM1 126, CM2 154, 6e 186, 5e 66, 4e 57, 3e 75, Seconde 108. Les PDF
  Kerboeuf portent un en-tête texte structuré
  (`NIVEAU · MATIÈRE · DOMAINE · TYPE | Titre | Objectif`), ce qui permet un
  index fiable généré depuis les fichiers eux-mêmes. Les ressources ne sont
  aujourd'hui trouvables qu'en naviguant niveau → matière → domaine, via
  plusieurs catalogues distincts.

## 2. Matrice des routes

### Accueil, navigation, pages transverses

| Route | Décision | Devenir |
|---|---|---|
| `/` | GARDER (refait) | Accueil 3 entrées : Enseigner, Direction, Ressources + « Continuer ». |
| Header (Accueil, Ressources, Préparer ma classe, À propos) | FUSIONNER | Enseigner · Direction · Ressources · Recherche · Mon espace. |
| `/methode` | GARDER | Page « À propos », lien de pied de page. |
| `/etat-du-site` | ARCHIVER | Retiré du pied de page, `noindex`. |
| `/plan-du-site`, mentions, confidentialité, cookies, contact | GARDER | Pied de page. |
| `/missions-recentes` | REDIRIGER | → `/ressources`. |

### Ancien univers narratif

| Route | Décision | Devenir |
|---|---|---|
| `/univers`, `/univers/lieux`, `/univers/cartotheque` | ARCHIVER + REDIRIGER | → `/` |
| `/carte` | ARCHIVER + REDIRIGER | → `/` |
| `/personnages`, `/personnages/*` | ARCHIVER + REDIRIGER | → `/` |
| `/professeurs`, `/professeurs/[slug]` | ARCHIVER + REDIRIGER | → `/` |
| `/eleves`, `/eleves/[slug]` | ARCHIVER + REDIRIGER | → `/` |
| `/primaire/professeurs`, `/primaire/lieux`, `/primaire/lieux/[slug]` | ARCHIVER + REDIRIGER | → `/ressources` |
| `/primaire/[level]/missions`, `/primaire/cm2/missions/*`, `/primaire/cm2/parcours` | ARCHIVER + REDIRIGER | → page du niveau dans Ressources |
| `/parcours`, `/parcours/[slug]`, `/parcours/methodes-pour-apprendre` | ARCHIVER + REDIRIGER | → `/ressources` |
| `/parcours/reussir-entree-sixieme` | DÉPLACER | → collection « Liaison CM2 → 6e ». |

Les données (`content/academy-characters.ts`, `professors.ts`, `students.ts`,
`lieux-*.ts`, `felix-*`) restent dans le dépôt : elles sont encore importées
par des pages de niveau et ne coûtent rien tant qu'elles ne structurent plus
la navigation.

### Lycée (retiré du périmètre)

| Route | Décision | Devenir |
|---|---|---|
| `/lycee`, `/lycee/*` | ARCHIVER + REDIRIGER | → `/ressources` (308). |
| `public/fiches/seconde/*` (108 PDF) | ARCHIVER | Fichiers conservés, exclus de l'index de ressources. |

### Niveaux (portails de ressources)

| Route | Décision | Devenir |
|---|---|---|
| `/maternelle`, `/maternelle/{ps,ms,gs}/*`, `/maternelle/ressources` | GARDER (secondaire) | Pages d'atterrissage SEO ; l'entrée principale devient `/ressources?niveau=…`. |
| `/primaire`, `/primaire/[level]/*`, `/primaire/*/matieres/*`, `/primaire/[level]/programmes/*` | GARDER (secondaire) | Idem. Les catalogues de sous-domaine restent la référence éditoriale. |
| `/primaire/*/lecons/*` | GARDER | Redirections déjà en place (AGENTS.md). |
| `/primaire/cm2/fiches/*` | GARDER | Fiches CM2 indexées dans la bibliothèque. |
| `/primaire/ressources`, `/primaire/programmation` | REDIRIGER | → `/ressources?cycle=…` / `/enseigner/annee`. |
| `/college`, `/college/[level]/*`, `/college/6e/*` | GARDER (secondaire) | Espace pédagogique et ressources ; pas d'outils de gestion collège. |
| `/programmes`, `/programmes/progression-primaire`, `/programmation` | REDIRIGER | → `/enseigner/annee`. |
| `/ressources/imprimables`, `/ressources/methodologie`, `/ressources/suivi-sequences` | REDIRIGER | → `/ressources`. |

### Outils enseignants (`/enseignants/*`)

| Outil | Décision | Devenir |
|---|---|---|
| `/enseignants` (portail « tous les outils ») | REDIRIGER | → `/enseigner`. |
| `/enseignants/[hub]` | REDIRIGER | → `/enseigner`. |
| Emploi du temps | GARDER (brique) + DÉPLACER | `/enseigner/classe` : palette de matières, créneaux, modèle recommandé. Import non destructif de l'emploi du temps v3 existant. |
| Organisation de la semaine | FUSIONNER | → `/enseigner/semaine`. |
| Préparer une séance | FUSIONNER | → création de séance par choix progressifs dans la semaine. |
| Cahier journal | FUSIONNER | → `/enseigner/cahier-journal`, construit automatiquement depuis la semaine. |
| Programmation + programmation annuelle | FUSIONNER | → `/enseigner/annee` (tableau Non planifié · P1…P5). |
| Progression | FUSIONNER | → `/enseigner/periode` (états Prévue → Travaillée, mis à jour par les séances). |
| Calendrier | GARDER (contextuel) | Lien depuis Mon année. |
| Fin de période | GARDER (contextuel) | Lien depuis Ma période. |
| Évaluations (planification) | GARDER (contextuel) | Type de séance « Évaluation » + lien. |
| Ateliers | GARDER (contextuel) | Organisation « Atelier » + lien. |
| APC, Photocopies, Affichages, Rituels | GARDER (secondaire) | « Autres outils » dans Enseigner. Aucune évolution prévue. |
| Liaison CM2-6e | GARDER + DÉPLACER | Mis en avant avec la collection Liaison CM2 → 6e. |
| Modèles, Communications, Dossier remplaçant | GARDER (secondaire) | « Autres outils ». |
| Sauvegardes locales | DÉPLACER | → `Mon espace`. |
| Conseil d'école | FUSIONNER + DÉPLACER | → `/direction/reunions` (réunion itemisée). L'ancien outil reste lisible, non lié. |
| Conseils de cycle | FUSIONNER + DÉPLACER | → `/direction/reunions` (type « conseil de cycle »). |
| Projets et sorties | FUSIONNER + DÉPLACER | → démarche « Organiser une sortie » dans Direction. |
| Réunion parents, Rendez-vous professionnels | GARDER (secondaire) | « Autres outils ». |
| Plan de classe / groupes / repères élèves | ARCHIVER | Associe prénoms et repères (« PAP-PPRE », « AESH ») : contraire à la règle « pas de données nominatives sensibles ». Non lié, `noindex`, données locales intactes, accessible depuis Mon espace › Anciens outils le temps d'exporter. |
| Bibliothèque de classe | ARCHIVER | Hors promesse. Accessible depuis Mon espace › Anciens outils. |
| Formations | ARCHIVER | Hors promesse. Idem. |
| Matériel de classe | ARCHIVER | Hors promesse. Idem. |

## 3. Suppressions

Aucune suppression de fichier dans cette refonte. Tout ce qui sort du
parcours public est archivé (redirigé ou non lié) : cela garde l'historique
Git lisible, les URL indexées continuent de répondre, et une réintégration
reste possible.

## 4. Dettes relevées

- 31 modèles de données localStorage incompatibles entre eux ; plusieurs bugs
  d'hydratation déjà corrigés au cas par cas (APC, dossier remplaçant).
  → Le nouveau cœur utilise un seul magasin local par espace, lu via
  `useSyncExternalStore` (pas de décalage serveur/client).
- Statuts « bientôt / à venir » affichés publiquement sur de nombreux
  catalogues. → La bibliothèque n'affiche que l'index des fichiers réellement
  présents.
- Titres de ressources dispersés dans des dizaines de fichiers TS.
  → Index unique généré depuis les PDF (`scripts/build-resource-index.py`).
