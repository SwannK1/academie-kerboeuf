# Workflow Git — Académie Kerboeuf

## Principe central

Une branche = un sujet.
Une PR = un sujet.
main est la source de vérité.

## Avant toute modification

Toujours lancer :

```
pwd
git status -sb
git branch --show-current
git log --oneline -5
```

## Créer une branche propre

Toujours partir de main :

```
git checkout main
git pull origin main
git checkout -b type/sujet-court
```

Exemples :
- fix/build-college-lecture
- chore/github-ci
- chore/pr-template
- docs/git-workflow
- security/audit-secrets
- cleanup/remove-hors-projet

## Interdictions

Ne jamais :
- travailler directement sur main ;
- merger une branche brouillon ;
- mélanger Académie Kerboeuf avec KerWeb Studio, Semence, Graines de Foi ou Chez Juju & Fifi ;
- ajouter .env, .vercel, .next, node_modules ou fichiers temporaires ;
- créer de faux liens, faux PDF ou fausses ressources ;
- modifier des contenus pédagogiques hors périmètre.

## Avant commit

Toujours lancer :

```
git diff --stat
git diff --name-only
npm run lint
npm run build
git status -sb
```

## Avant merge

Vérifier :
- CI GitHub verte ;
- lint OK ;
- build OK ;
- PR limitée à un sujet ;
- fichiers modifiés cohérents ;
- aucun secret ;
- aucun fichier parasite ;
- aucun faux lien.

## En cas d'erreur

Ne pas multiplier les branches.
Ne pas forcer.
Faire :

```
git status -sb
```

Puis revenir à main et repartir d'une branche propre.
