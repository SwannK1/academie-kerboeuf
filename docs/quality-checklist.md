# Checklist qualité — PR Académie Kerboeuf

À parcourir avant tout merge. Cocher chaque point ou justifier l'exception.

---

## Avant de commencer

- [ ] La branche est créée depuis `main` à jour (`git fetch origin main && git rebase origin/main`)
- [ ] Le périmètre de la PR est délimité : une PR = un objectif, pas un fourre-tout
- [ ] Les fichiers hors périmètre ne sont pas touchés (`app/`, `content/`, fichiers pédagogiques si la PR est documentaire, et inversement)
- [ ] Les instructions dans `AGENTS.md` ont été relues si la PR touche `content/` ou `components/`

---

## Règle : 1 séquence = 1 compétence

- [ ] Chaque séquence pédagogique couvre une seule compétence identifiable
- [ ] Le `slug` de la séquence reflète la compétence, pas une organisation interne arbitraire
- [ ] Les leçons d'une séquence progressent vers cette compétence (pas de leçon hors-sujet)
- [ ] Aucun mélange de domaines (ex. lecture + numération dans la même séquence)

---

## Statuts

- [ ] Les statuts utilisés sont normalisés via `getPublicStatus()` — pas de string brute en entrée dans un composant
- [ ] Les comparaisons de statut passent par `getPublicStatusKey(status)` — pas de `status === "disponible"` dans `app/` ou `components/`
- [ ] L'affichage d'un statut passe par `<PublicStatusBadge />` — pas de label hardcodé
- [ ] `getPublicStatusVariant()` n'est pas utilisé (déprécié — remplacer par `getPublicStatusKey()`)
- [ ] Tout nouveau statut est défini dans `internalStatusMap` (domain) **et** dans `publicStatusUi` (ui)
- [ ] `sanitizePublicPedagogicalItems()` est utilisé pour filtrer les items `"à vérifier"` — pas de filtre local re-implémenté

---

## PDF et href

- [ ] Un lien PDF n'est rendu cliquable que si `getPublicStatusKey(resource.status) === "available"` **et** `resource.href` existe
- [ ] Aucun `href` ne pointe vers un fichier inexistant ou fictif
- [ ] Les pages catalogue n'affichent pas les champs réservés aux PDF : `exercises`, `validation`, `parentGuidance`, `printableSupport`, `projectableSupport`, `successCriteria`, `characterLink.roleHint`

---

## Slugs et routes

- [ ] Les nouveaux slugs sont en kebab-case, sans accents, sans majuscules
- [ ] Toute nouvelle route catalogue passe par `content/levels/published-subdomain-pages.ts`
- [ ] La route générique canonique est respectée : `/primaire/[level]/programmes/[domain]/[subdomain]`
- [ ] Les routes legacy CP (`/primaire/cp/lecons`, `/primaire/cp/lecons/[slug]`) ne sont pas converties en pages de rendu — elles restent des redirects statiques
- [ ] Aucune nouvelle route `[lessonSlug]` pour CP n'est créée
- [ ] Les redirects ciblent `published.route` (valeur du registre), pas une URL hardcodée

---

## Lint / TSC / Build

Ordre obligatoire (voir `AGENTS.md`) :

```bash
rm -rf .next
npm run lint
npx tsc --noEmit
npx next build --webpack
```

- [ ] `rm -rf .next` exécuté avant `tsc` pour éviter les erreurs fantômes
- [ ] `npm run lint` passe sans erreur
- [ ] `npx tsc --noEmit` passe sans erreur
- [ ] `npx next build --webpack` passe sans erreur ni warning bloquant
- [ ] Aucun `any` introduit sans commentaire justificatif
- [ ] Aucun import de `public-status.domain` ou `public-status.ui` depuis `app/` ou `components/`

---

## PR propre

- [ ] La PR ne contient pas de fichiers de debug, `console.log`, `TODO` non tracés, ou code commenté sans raison
- [ ] Le titre de la PR décrit l'intention, pas l'implémentation (ex. "Ajouter la page catalogue CE1 mathématiques" et non "Créer fichier route")
- [ ] La description de la PR liste les fichiers créés/modifiés et l'impact attendu
- [ ] Aucun fichier `.env`, credential ou donnée sensible n'est inclus
- [ ] La branche est à jour avec `main` au moment du merge (rebase ou merge récent vérifié)
- [ ] Les commits sont atomiques et leurs messages sont clairs (pas de "fix", "wip", "oops")

---

## Rapport attendu dans la description de PR

Toute PR doit inclure dans sa description :

```
## Fichiers créés ou modifiés
- ...

## Impact
- ...

## Validation
- [ ] lint OK
- [ ] tsc OK
- [ ] build OK
- [ ] Testé sur : [local / preview Vercel / non applicable]
```

---

## Usage recommandé

- **Avant d'ouvrir une PR** : parcourir cette checklist et cocher les points applicables
- **En review** : utiliser les sections comme grille de lecture pour cibler les points à vérifier
- **En cas de doute sur un statut ou une route** : relire `AGENTS.md` — les règles y sont autoritaires
- **CI rouge** : ne pas merger même si "ça semble OK" — investiguer la cause réelle
