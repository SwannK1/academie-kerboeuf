# Gabarit éditorial officiel des PDF — Académie Kerboeuf (CP–CM2)

> Document de référence interne. Ne pas publier tel quel.  
> Niveaux couverts : CP, CE1, CE2, CM1, CM2 (cycles 2 et 3).

---

## 1. Gabarit « Leçon simple »

**Kind dans le code :** `"lesson-pdf"`  
**Audience :** `"student"` (ou `"classroom"` si projetable également)

### Structure de la page (1 à 2 pages A4 max)

```
┌─────────────────────────────────────────────────────────┐
│  EN-TÊTE                                                │
│  Logo AK (petit, coin gauche) · Niveau · Matière        │
│  Titre de la notion (grand, centré)                     │
│  Objectif de la leçon (1 phrase, italique)              │
│  Personnage référent discret (coin droit, 1,5 cm max)   │
├─────────────────────────────────────────────────────────┤
│  JE RETIENS                                             │
│  Encadré sobre : règle ou définition en gras            │
│  Exemple(s) : 1 ou 2 lignes illustratives               │
├─────────────────────────────────────────────────────────┤
│  JE COMPRENDS  (facultatif selon complexité)            │
│  Schéma simple ou tableau minimal (tracé au trait)      │
├─────────────────────────────────────────────────────────┤
│  COMPÉTENCES VISÉES  (max 4 puces)                      │
│  • ...                                                  │
├─────────────────────────────────────────────────────────┤
│  CRITÈRES DE RÉUSSITE  (max 3 puces)                    │
│  □ Je sais...                                           │
│  □ Je suis capable de...                                │
├─────────────────────────────────────────────────────────┤
│  PIED DE PAGE                                           │
│  Académie Kerboeuf · academie-kerboeuf.fr               │
│  Professeur référent (prénom + animal) si pertinent     │
└─────────────────────────────────────────────────────────┘
```

### Règles

- Police : sans-serif (ex. Inter, Nunito) corps 11–12 pt pour le texte courant.
- Titre de notion : 18–20 pt, semi-gras.
- Interligne : 1,4 minimum.
- Encadrés : bordure fine (0,5 pt), fond gris très clair (5 %) ou blanc — imprimable N&B.
- Espace blanc préservé : au moins 2 cm de marge en bas pour annotations élève.
- Félix : absent en CP–CE2. En CM1–CM2 : silhouette discrète, 1,5 cm, coin bas droit uniquement.
- Professeur référent : mentionné dans le pied de page si la matière lui correspond (ex. « Avec Agathe la Chouette — Lecture »). Pas de portrait pleine page.

---

## 2. Gabarit « Exercices progressifs »

**Kind dans le code :** `"exercises-pdf"`  
**Audience :** `"student"`

### Progression obligatoire (4 paliers)

| Palier | Nom | Description |
|--------|-----|-------------|
| 1 | Automatismes | Application directe, guidée, répétitive (sans ambiguïté) |
| 2 | Application | Exercice autonome proche du cours |
| 3 | Raisonnement | Problème ouvert ou transfert de compétence |
| 4 | Expression | Création, production personnelle ou défi facultatif |

### Structure de la page (2 à 4 pages A4)

```
┌─────────────────────────────────────────────────────────┐
│  EN-TÊTE (identique à la leçon)                         │
│  Titre : « Exercices — [Notion] »                       │
│  Consigne générale courte (1 ligne max)                 │
├─────────────────────────────────────────────────────────┤
│  ★ PALIER 1 — AUTOMATISMES                              │
│  Ex. 1 · Ex. 2 · Ex. 3  (courts, lignes de réponse)    │
├─────────────────────────────────────────────────────────┤
│  ★★ PALIER 2 — APPLICATION                             │
│  Ex. 4 · Ex. 5  (légèrement plus complexes)             │
├─────────────────────────────────────────────────────────┤
│  ★★★ PALIER 3 — RAISONNEMENT                           │
│  Ex. 6  (problème ou transfert)                         │
├─────────────────────────────────────────────────────────┤
│  ★★★★ PALIER 4 — EXPRESSION  (facultatif, encadré)     │
│  Défi ou production libre                               │
├─────────────────────────────────────────────────────────┤
│  PIED DE PAGE                                           │
└─────────────────────────────────────────────────────────┘
```

### Règles

- Chaque exercice : numéroté, consigne en gras, lignes pointillées ou espace blanc pour la réponse.
- Pictogramme étoile pour indiquer le palier (tracé simple, pas de couleur nécessaire).
- Ne jamais omettre le palier 1 : il est la base d'accessibilité pour tous les élèves.
- Palier 4 clairement facultatif (mention « Défi » ou encadré tireté).
- Pas d'image décorative inutile. Schémas seulement si fonctionnels.
- Espace de réponse : minimum 1,5 cm par ligne de réponse attendue.

---

## 3. Gabarit « Évaluation courte »

**Kind dans le code :** `"assessment-pdf"`  
**Audience :** `"student"`

### Structure (1 page A4, 2 pages max)

```
┌─────────────────────────────────────────────────────────┐
│  EN-TÊTE                                                │
│  Logo AK · Niveau · Matière                             │
│  « Évaluation — [Notion] »                              │
│  Nom : _____________ · Date : _______  · /  _____ pts   │
├─────────────────────────────────────────────────────────┤
│  COMPÉTENCES ÉVALUÉES  (max 3 puces)                    │
│  • Je sais...                                           │
├─────────────────────────────────────────────────────────┤
│  PARTIE 1 — Questions rapides  (automatismes)           │
│  [3 à 5 questions courtes]                              │
├─────────────────────────────────────────────────────────┤
│  PARTIE 2 — Application                                 │
│  [1 à 2 exercices de niveau intermédiaire]              │
├─────────────────────────────────────────────────────────┤
│  PARTIE 3 — Raisonnement  (facultatif selon niveau)     │
│  [1 problème ouvert ou situation complexe]              │
├─────────────────────────────────────────────────────────┤
│  PIED DE PAGE                                           │
└─────────────────────────────────────────────────────────┘
```

### Règles

- Barème visible et simple (ex. « /5 », « /10 »). Points par question affichés.
- Maximum 3 compétences évaluées affichées (les autres restent dans le code TypeScript).
- Critères de réussite simples repris depuis `lesson.successCriteria`.
- Pas de corrigé sur ce document.
- Espace nom/date toujours présent en haut.
- Félix absent sur ce document (ne pas l'associer à la pression évaluative).

---

## 4. Gabarit « Corrigé enseignant »

**Kind dans le code :** `"correction-pdf"`  
**Audience :** `"teacher"`

### Structure (identique au document élève + annotations)

```
┌─────────────────────────────────────────────────────────┐
│  EN-TÊTE                                                │
│  Logo AK · Niveau · Matière                             │
│  « Corrigé — [Notion] »  · USAGE ENSEIGNANT UNIQUEMENT  │
├─────────────────────────────────────────────────────────┤
│  [Reproduction fidèle du document élève]                │
│  Réponses attendues en rouge / gras                     │
│  Réponses acceptables alternatives en italique          │
├─────────────────────────────────────────────────────────┤
│  NOTES PÉDAGOGIQUES  (encadré gris en bas de page)      │
│  · Erreurs fréquentes à anticiper                       │
│  · Différenciation proposée (si pertinent)              │
│  · Renvoi à la leçon correspondante                     │
├─────────────────────────────────────────────────────────┤
│  PIED DE PAGE                                           │
│  Professeur référent · Académie Kerboeuf                │
└─────────────────────────────────────────────────────────┘
```

### Règles

- Mention « USAGE ENSEIGNANT UNIQUEMENT » visible en en-tête.
- Réponses attendues clairement différenciées (gras ou rouge — rouge toléré car usage interne).
- Les notes pédagogiques sont courtes : 3 à 5 points max.
- Ce fichier ne doit jamais être lié dans un `href` public côté site (audience `"teacher"` uniquement).
- Jamais affiché dans les pages catalogue publiques.

---

## 5. Gabarit « Version projetable »

**Kind dans le code :** `"projectable-pdf"`  
**Audience :** `"classroom"`

### Format

- **Orientation : paysage** (297 × 210 mm, A4 retourné).
- **Corps de texte : 20–24 pt minimum** (lisible à 5 m).
- **1 idée par diapositive** — jamais plus de 5 lignes de texte visible.
- **Fond blanc ou très clair** — imprimable N&B sans dégradé.

### Structure (slides)

```
Slide 1 — Titre de la leçon + objectif
Slide 2 — Je retiens (règle ou définition)
Slide 3 — Exemple(s) commenté(s)
Slide 4 — Schéma ou tableau si pertinent
Slide 5 — Compétences visées (max 4 puces)
Slide 6 — Critères de réussite (cases à cocher vides)
[Slides supplémentaires : exemples, contre-exemples, exercices flash]
```

### Règles

- Personnage référent : 1 seule apparition discrète (slide de titre), taille max 3 cm.
- Félix en CM1–CM2 : slide de titre uniquement, jamais sur les slides de contenu.
- Pas d'animations, pas de transitions complexes — export PDF statique.
- Numéro de slide en bas à droite.
- Logo AK sur toutes les slides, coin bas gauche, hauteur 1 cm.

---

## 6. Règles de mise en page communes

### Marges et espace

| Zone | Valeur |
|------|--------|
| Marge haute | 1,5 cm |
| Marge basse | 2 cm (espace annotations) |
| Marge gauche | 2 cm |
| Marge droite | 1,5 cm |
| Gouttière interne (2 colonnes) | 0,8 cm |

### Typographie

- **Famille** : sans-serif neutre — Inter, Nunito, ou équivalent libre.
- **Corps** : 11–12 pt pour texte courant. 10 pt pour notes de pied de page.
- **Titres de section** : 14–16 pt, semi-gras.
- **Titre principal** : 18–20 pt, gras.
- **Interligne** : 1,4 minimum.
- **Grasse réservée** à : consignes, mots-clés, réponses (corrigé), titres.

### Couleur et impression

- Palette principale : noir sur blanc.
- Gris clair (5–10 %) autorisé pour fonds d'encadrés.
- Aucune couleur nécessaire à la compréhension — tout doit fonctionner en N&B.
- Aucun dégradé, aucune image décorative pleine page.
- Pictogrammes et icônes : tracé simple, 1 couleur.

### Personnages

| Niveau | Félix | Professeur référent |
|--------|-------|---------------------|
| CP–CE2 | Absent | Mention pied de page si matière correspond |
| CM1–CM2 | Silhouette discrète, max 1,5 cm, bas droit | Mention pied de page |

Les personnages référents (Agathe la Chouette, Léo le Zébu, Soa le Caméléon, etc.) sont mentionnés en pied de page ou slide de titre — jamais en illustration principale sur un document de contenu.

---

## 7. Règles de nommage des fichiers PDF

### Format canonique

```
{level}-{domain-slug}-{subdomain-slug}-{lesson-slug}-{kind}.pdf
```

### Exemples

```
cp-francais-lecture-comprehension-sons-simples-lesson.pdf
cp-francais-lecture-comprehension-sons-simples-exercises.pdf
cp-francais-lecture-comprehension-sons-simples-correction.pdf
cp-francais-lecture-comprehension-sons-simples-assessment.pdf
cp-francais-lecture-comprehension-sons-simples-projectable.pdf

ce1-francais-etude-de-la-langue-accord-sujet-verbe-lesson.pdf
cm2-mathematiques-nombres-calcul-fractions-exercises.pdf
```

### Codes de type (`kind`)

| `PedagogicalResourceKind` | Suffixe fichier |
|--------------------------|-----------------|
| `"lesson-pdf"` | `-lesson` |
| `"exercises-pdf"` | `-exercises` |
| `"correction-pdf"` | `-correction` |
| `"assessment-pdf"` | `-assessment` |
| `"projectable-pdf"` | `-projectable` |
| `"parent-sheet-pdf"` | `-parent` |

### Slugs de référence

- **Niveaux** : `cp` · `ce1` · `ce2` · `cm1` · `cm2`
- **Domaines** : identiques aux `domainSlug` du learning tree (ex. `francais`, `mathematiques`, `sciences`, `histoire-geographie`)
- **Sous-domaines** : identiques aux `subdomainSlug` du learning tree
- **Leçons** : identiques au `slug` de l'objet `Lesson`

Les slugs de fichier doivent correspondre **exactement** aux identifiants TypeScript — ne pas inventer de nouveau slug côté PDF.

---

## 8. Règles avant ajout du `href` dans le site

Un `href` ne peut être ajouté dans le learning tree que si **toutes** les conditions suivantes sont vraies :

### Checklist obligatoire

- [ ] **Le fichier PDF existe physiquement** dans le dossier public servi (ex. `/public/pdf/...` ou CDN).
- [ ] **Le fichier a été relu** et correspond au gabarit éditorial de ce document.
- [ ] **Le statut de la ressource est `"available"`** dans le code TypeScript.
- [ ] **Le nommage du fichier** suit exactement la convention `{level}-{domain}-{subdomain}-{lesson}-{kind}.pdf`.
- [ ] **L'audience** est correctement renseignée (`"student"`, `"teacher"`, `"classroom"`, ou `"parent"`).
- [ ] **Le label** est renseigné en français clair (ex. `"Leçon — Sons simples"`).

### Ce qui est interdit

- Ajouter un `href` vers un fichier fictif ou inexistant.
- Ajouter un `href` sur une ressource dont le `status` n'est pas `"available"`.
- Mettre le `href` d'un corrigé enseignant (`"correction-pdf"`) dans une ressource `audience: "student"`.
- Créer une ressource `"available"` sans `href` (le type TypeScript `AvailablePedagogicalResourceRef` l'interdit de toute façon — le build échouera).

### Procédure d'ajout

1. Déposer le fichier PDF dans le dossier approprié.
2. Vérifier le nommage selon la convention ci-dessus.
3. Dans le learning tree concerné, trouver la leçon (`Lesson`) et son tableau `resources`.
4. Passer la ressource de `status: "planned"` (ou `"in-preparation"`) à `status: "available"`.
5. Ajouter le champ `href: "/pdf/..."` correspondant.
6. Lancer `rm -rf .next && npm run lint && npx tsc --noEmit` — le build doit passer sans erreur.
7. Vérifier visuellement sur la page catalogue que le lien s'affiche correctement via `PublicStatusBadge`.

---

*Dernière mise à jour : 2026-06-01*
