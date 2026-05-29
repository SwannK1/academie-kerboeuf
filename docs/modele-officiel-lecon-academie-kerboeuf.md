# Modèle officiel de leçon — Académie Kerboeuf

Ce document est la référence obligatoire pour toute nouvelle leçon créée dans
`content/levels/`. Il s'applique à tous les niveaux : CP, CE1, CE2, CM1, CM2.

---

## Structure type complète

```
────────────────────────────────────────────────
EN-TÊTE
  Niveau · Matière · Domaine · Sous-domaine
  Titre de la leçon
  Professeur référent (nom + discipline)
────────────────────────────────────────────────
SITUATION DE DÉPART
  Le professeur référent pose une question ou présente
  une situation concrète courte (2-3 lignes maximum).
  Pas de récit long. Pas de contexte fictif forcé.
────────────────────────────────────────────────
OBJECTIF
  "À la fin de cette leçon, je sais…"
  Une phrase. Active. Précise. Vérifiable.
────────────────────────────────────────────────
LEÇON
  Définition ou règle centrale.
  2 à 4 points clés maximum.
  Phrases courtes. Vocabulaire du niveau.
  Aucun sous-titre superflu.
────────────────────────────────────────────────
EXEMPLE GUIDÉ
  Un seul exemple traité pas à pas.
  Chaque étape numérotée.
  Le raisonnement est visible, pas seulement le résultat.
────────────────────────────────────────────────
CONSEIL DE FÉLIX
  Une seule phrase. Encadré discret.
  Conseil de méthode uniquement.
  Félix n'intervient qu'une seule fois dans la leçon.
────────────────────────────────────────────────
EXERCICES (4 niveaux obligatoires)
  ① Automatismes        court, répétitif, sans piège
  ② Application         reproduire le modèle sur un cas nouveau
  ③ Raisonnement        problème ouvert ou cas limite
  ④ Expression/Justification  réponse rédigée ou argument écrit
────────────────────────────────────────────────
MINI-ÉVALUATION
  3 questions maximum. Niveaux ① à ③.
  Barème indicatif visible.
  Séparation visuelle claire avec les exercices.
────────────────────────────────────────────────
CORRIGÉ ENSEIGNANT
  Réponses complètes aux exercices ET à l'évaluation.
  Erreurs classiques anticipées (1 à 2 par exercice).
  Clairement séparé du contenu élève.
  Marqué "Usage enseignant" — ne pas exposer côté élève.
────────────────────────────────────────────────
CRITÈRES DE RÉUSSITE
  3 à 5 critères. Formulation "Je…" à la première personne.
  Couvrent objectif, méthode et production écrite.
────────────────────────────────────────────────
```

---

## Gabarit de rédaction

```
LEÇON — [Titre]
Niveau : [CP / CE1 / CE2 / CM1 / CM2]
Matière : [Français / Mathématiques / …]
Professeur référent : [Prénom NOM]

SITUATION DE DÉPART
→ [1 à 3 lignes — question concrète posée par le professeur référent]

OBJECTIF
→ À la fin de cette leçon, je sais [verbe + objet précis].

LEÇON
→ [Règle ou définition centrale]
→ Point clé 1
→ Point clé 2
→ (Point clé 3 si nécessaire)

EXEMPLE GUIDÉ
Étape 1 — [action]
Étape 2 — [action]
Résultat — [réponse + explication du raisonnement]

FÉLIX (1 phrase)
→ « [Conseil de méthode court et actionnable.] »

EXERCICES
① [Automatisme — consigne courte]
② [Application — consigne]
③ [Raisonnement — consigne]
④ [Expression — consigne]

MINI-ÉVALUATION (3 questions)
Q1 —
Q2 —
Q3 —

CORRIGÉ (enseignant uniquement)
① … ② … ③ … ④ …
Éval : Q1 … Q2 … Q3 …
Erreurs courantes : …

CRITÈRES DE RÉUSSITE
□ Je …
□ Je …
□ Je …
```

---

## Règles obligatoires pour les futures leçons

### Contenu

- L'objectif est **une seule phrase**, formulée à la première personne, active et
  vérifiable (pas *"comprendre"*, mais *"calculer"*, *"identifier"*, *"rédiger"*).
- La leçon tient en **4 points clés maximum**. Au-delà, créer deux leçons distinctes.
- L'exemple guidé **montre le raisonnement étape par étape**, pas uniquement le résultat.
- Les **4 niveaux d'exercices sont tous obligatoires** et réellement distincts.
- La mini-évaluation ne dépasse pas **3 questions**.
- Les critères de réussite sont formulés **"Je…"** (perspective élève, pas enseignant).

### Félix

- Félix **n'intervient qu'une seule fois** par leçon, dans l'encadré dédié.
- Son rôle est strictement **méthodologique** : il donne une règle de méthode
  actionnable, pas un résumé du cours.
- Il ne formule pas d'encouragement générique (*"Tu peux y arriver !"*).
- Il ne parle pas à la place du professeur sur le fond disciplinaire.

### Professeur référent

- Le professeur référent **pose uniquement la situation de départ** (2-3 lignes).
- Il n'intervient pas dans le corps de la leçon.
- Son nom et sa discipline sont indiqués en en-tête.

### Corrigé enseignant

- Le corrigé est **clairement séparé** du contenu destiné à l'élève.
- Il couvre **tous les exercices et toutes les questions** de l'évaluation.
- Il anticipe 1 à 2 erreurs classiques par exercice.
- Il ne doit **jamais être exposé dans l'interface élève**.

### Statuts et liens

- Le statut `"available"` ne peut être posé que si le **contenu est entièrement
  rédigé et validé**.
- **Aucun `href` vers un PDF ne doit être créé** si le fichier n'existe pas.
- Un contenu en cours de rédaction utilise `"in-progress"` ; un contenu prévu
  mais non commencé utilise `"upcoming"`.

### Mise en page imprimable

- Aucune couleur ne doit être **indispensable à la compréhension** (le document
  doit rester lisible en noir et blanc).
- La leçon tient sur **2 pages recto maximum** en corps 11.
- Des espaces respirants séparent chaque section.

---

## Ce qu'il ne faut pas faire

### Sur le contenu

| Erreur | Conséquence |
|---|---|
| Objectif vague (*"comprendre les fractions"*) | Impossible à évaluer |
| Leçon en 6 points | Surcharge cognitive, perte d'attention |
| Exemple sans étapes intermédiaires | L'élève voit la réponse mais pas le chemin |
| 4 exercices de niveau automatisme déguisés | Pas de progression réelle |
| Critères formulés *"L'élève sait…"* | Perspective enseignant — pas utilisable par l'élève |

### Sur Félix

| Erreur | Conséquence |
|---|---|
| Félix résume la leçon | Doublon inutile, le message principal est dilué |
| Félix encourage sans apport méthode | Sans valeur pédagogique |
| Félix apparaît 3 fois dans la leçon | Il perd son signal distinctif |
| Félix explique le fond disciplinaire | Confusion de rôle avec le professeur |

### Sur la gouvernance

| Erreur | Conséquence |
|---|---|
| `status: "available"` posé avant fin de rédaction | Route active, contenu inexistant |
| `href` vers un PDF *"à venir"* | Lien mort au premier clic |
| Corrigé mélangé aux exercices | Risque d'affichage involontaire côté élève |
| Statut brut comparé en dur (`=== "available"`) | Interdit — utiliser `getPublicStatusKey()` |

---

## Checklist qualité avant publication

**Contenu**
- [ ] Objectif = une phrase, active, vérifiable
- [ ] Leçon ≤ 4 points clés
- [ ] Exemple guidé avec raisonnement visible étape par étape
- [ ] Les 4 niveaux d'exercices sont présents et réellement distincts
- [ ] Mini-évaluation ≤ 3 questions
- [ ] Corrigé complet (exercices + évaluation + erreurs classiques)
- [ ] Critères de réussite formulés "Je…"

**Personnages**
- [ ] Félix apparaît exactement une fois
- [ ] Son conseil est une règle de méthode actionnable en une ligne
- [ ] Le professeur référent est nommé en en-tête
- [ ] La situation de départ du professeur tient en ≤ 3 lignes

**Format imprimable**
- [ ] Lisible en noir et blanc
- [ ] ≤ 2 pages recto en corps 11
- [ ] Sections séparées par des espaces respirants
- [ ] Corrigé clairement séparé et marqué "enseignant"

**Gouvernance**
- [ ] Aucun `href` vers un PDF inexistant
- [ ] Statut `"available"` posé uniquement si le contenu est complet et réel
- [ ] Comparaisons de statut via `getPublicStatusKey()` uniquement
- [ ] Corrigé non exposé dans l'interface élève
