# Stratégie V1 — Académie Kerboeuf

Document de gouvernance produit — mai 2026

---

## 1. Décision principale

**La V1 publique de l'Académie Kerboeuf est centrée sur le CM2 comme niveau pilote.**

Les autres niveaux (Maternelle, CP, CE1, CE2, CM1, Collège, Lycée) peuvent exister dans le code et continuer à être développés, mais ils ne doivent pas être mis en avant dans la navigation principale tant qu'ils ne proposent pas de contenu réel et cohérent.

Cette décision est irrévocable pour la V1. Elle ne sera réévaluée que lorsqu'un second niveau sera jugé prêt selon les mêmes critères que CM2.

---

## 2. Principe directeur

> **Un visiteur qui clique ne doit jamais tomber sur du vide.**

Ce principe s'applique à toutes les décisions de mise en ligne :

- Si une page n'a pas de contenu réel, elle ne doit pas être accessible depuis la navigation principale.
- Si une leçon n'a pas de PDF réel, aucun lien cliquable ne doit pointer vers elle.
- Si un niveau n'est pas prêt, il ne doit pas figurer dans le menu comme s'il l'était.

Toute dérogation à ce principe dégrade la crédibilité du site de façon durable.

---

## 3. V1 minimale

Ce qui doit absolument être en place le jour de la mise en ligne.

### Pages indispensables

| Route | Rôle |
|---|---|
| `/` | Accueil — présente les 4 mondes, CM2 mis en avant |
| `/primaire` | Portail primaire avec carte interactive |
| `/primaire/cm2` | Hub CM2 — point d'entrée niveau pilote |
| `/primaire/cm2/matieres/francais` | Navigation Français CM2 |
| `/primaire/cm2/matieres/mathematiques` | Navigation Mathématiques CM2 |
| `/primaire/cm2/matieres/[slug]/[...]` | Leçons avec contenu réel |

### Exigences de contenu

- Chaque leçon affichée avec `status: "available"` dispose d'un contenu réel ou d'un PDF existant.
- Les leçons sans contenu portent un `PublicStatusBadge` visible ("À venir" ou "En préparation").
- Aucune route vide n'est mise en avant dans le menu ou dans un parcours visible.
- Aucun lien vers un PDF fictif ou inexistant.
- Aucune promesse visuelle non tenue (bouton "Télécharger" sans fichier, lien "Voir la leçon" sans contenu).

### Exigences de navigation

- Le menu principal ne contient que les sections réellement praticables.
- Les niveaux non prêts sont soit absents du menu, soit affichés avec un état "Bientôt" explicite.
- La navigation mobile est fonctionnelle et sans lien mort.

---

## 4. V1 idéale

Ce qui est souhaitable si le temps le permet, sans bloquer la mise en ligne minimale.

- **Page Félix complète** : profil, rôle pédagogique, voix, lieux associés, badges.
- **Lieux pédagogiques CM2** : les 7 lieux de Félix décrits avec titre et description courte.
- **Badges CM2** : les 8 badges listés avec leur critère d'obtention.
- **5 missions CM2 lisibles** : titre, objectif, compétences travaillées, statut.
- **Programmes CM2 structurés** : page `/programmes` avec l'arbre Français + Maths à minima.
- **Quelques fiches imprimables réelles** : 2 à 3 PDF réellement accessibles en Français ou Maths.
- **Navigation mobile vérifiée** : testée sur iPhone et Android, aucun accroc.
- **Meta / Open Graph** : titre et description sur les pages principales.

---

## 5. Ce qui doit être masqué ou repoussé

Ces contenus peuvent rester dans le code. Les routes peuvent exister pour préparer l'avenir et éviter de casser des liens futurs. **Mais elles ne doivent pas être mises en avant dans le menu, dans la navigation principale, ni dans les parcours visibles.**

### Niveaux non prêts

| Section | Raison |
|---|---|
| Maternelle (PS / MS / GS) | Routes présentes, contenu vide |
| Collège (6e → 3e) | Architecture présente, pas de contenu exploitable |
| Lycée (Seconde → Terminale) | Même situation que Collège |
| CP | Learning tree incomplet, redirect uniquement |
| CE1 / CE2 | Pas de learning tree complet |
| CM1 | Pas de learning tree complet |

### Fonctionnalités non prêtes

| Fonctionnalité | Raison |
|---|---|
| Activités interactives | Moteur présent, aucune donnée réelle |
| Exercices interactifs (QCM, fill-blank) | Idem |
| Pages élèves (`/eleves/*`) | Contenu inexistant |
| Parcours (`/parcours/*`) | Non alimenté |
| Missions récentes (`/missions-recentes`) | Dépend de données réelles |
| Carte (`/carte`) | Non fonctionnelle si vide |

---

## 6. Risques si on ouvre trop vite

| Risque | Conséquence concrète |
|---|---|
| Routes actives vers du contenu vide | Un visiteur explore, trouve du vide, ne revient pas |
| Liens vers des PDF inexistants | Erreur 404, image professionnelle dégradée immédiatement |
| Statuts incohérents | Leçon marquée "Disponible" sans contenu → confusion, méfiance |
| Niveaux affichés sans matière | Le site promet 4 mondes, en livre 1 → désillusion |
| Menu trop large | Dilution de l'identité CM2 / Félix, qui est la vraie force du site |
| Félix présenté sans ses lieux ni missions | Le personnage guide vers du vide, perd sa valeur pédagogique |
| Absence de PDF réels | La promesse "fiches imprimables" sonne creux |

---

## 7. Checklist avant mise en ligne

### Navigation

- [ ] Aucun lien dans le menu principal ne pointe vers une page vide
- [ ] Les niveaux non prêts sont absents du menu ou portent un état "Bientôt" explicite
- [ ] Navigation mobile testée sur au moins un iPhone et un Android
- [ ] Fil d'Ariane cohérent sur toutes les pages accessibles

### Contenu CM2

- [ ] Chaque leçon avec `status: "available"` a du contenu réel ou un PDF existant
- [ ] Chaque leçon sans contenu porte un `PublicStatusBadge` visible
- [ ] Aucun `href` vers un PDF fictif ou inexistant
- [ ] Les 8 matières CM2 sont listées avec leur statut honnête
- [ ] Français et Mathématiques sont navigables jusqu'aux leçons

### Félix

- [ ] Page profil Félix accessible depuis le hub CM2
- [ ] Les 7 lieux sont décrits (même brièvement)
- [ ] Les missions liées à Félix ont une fiche lisible avec titre et objectif
- [ ] Les badges sont listés (même sans critère détaillé)

### Technique

- [ ] `rm -rf .next && npm run lint` sans erreur bloquante
- [ ] `npx tsc --noEmit` propre
- [ ] `npx next build --webpack` sans erreur
- [ ] Aucun `console.error` visible en production
- [ ] Open Graph / meta title définis sur les pages principales
- [ ] Toutes les images référencées existent dans `/public`

### Expérience utilisateur

- [ ] Un enseignant peut trouver une leçon CM2 en moins de 3 clics depuis l'accueil
- [ ] Un parent peut comprendre la promesse du site en moins de 30 secondes sur la home
- [ ] Aucun état de chargement infini ou erreur visible en navigation normale
- [ ] Le site est lisible sur mobile (pas de débordement horizontal)

---

## 8. Recommandation finale

**Mieux vaut ouvrir une V1 CM2 courte, stable et honnête qu'un grand site avec plusieurs niveaux vides.**

La force de l'Académie Kerboeuf n'est pas la largeur — elle est la cohérence pédagogique : un niveau, un personnage (Félix), des lieux identifiés, des missions structurées, un arbre de compétences clair. C'est ce qui différencie ce projet d'un simple catalogue de fiches.

Un visiteur qui découvre une expérience incomplète à la première visite ne revient pas. Un visiteur qui découvre une expérience courte mais solide revient et recommande.

La stratégie est donc : **ouvrir CM2 en profondeur plutôt qu'ouvrir tout le site en surface.**

Les autres niveaux attendront d'être prêts. Cette attente est une marque de sérieux, pas une faiblesse.

---

*Document établi en mai 2026 — à réviser lors du passage en V2 ou de l'ouverture d'un second niveau.*
