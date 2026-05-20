# Architecture des routes domaines college

**Derniere mise a jour** : mai 2026, apres migration des domaines Histoire-Geographie-EMC 6e  
**Perimetre** : routes `/college/[level]/[subject]/[domain]`  
**Etat reflete** : etat reel du code apres migration, verifie dans les sources et dans `.next/server/app`  
**Regle centrale** : Le site organise. Les PDF enseignent.

---

## 1. Principe general

Les pages de domaine college 6e publiees sont servies par la route dynamique
canonique. Les anciennes pages statiques dediees `histoire` et `geographie`
ont ete migrees.

### Route dynamique canonique

```
app/college/[level]/[subject]/[domain]/page.tsx
```

Ce fichier unique sert les pages domaines autorisees via une allowlist explicite :
`dynamicCollegeDomainPilotParams`, dans `content/college-curriculum.ts`.

La route exporte :

- `generateStaticParams()`, qui appelle `getCollegeDomainStaticParams()`;
- `dynamicParams = false`, qui interdit les chemins non declares;
- `generateMetadata()`, qui s'appuie sur `getCollegeDomainMeta()`;
- le rendu commun `CollegeDomainPage`.

### Routes statiques dediees

```
app/college/6e/[subject]/[domain]/page.tsx
```

Aucune page statique dediee de domaine 6e ne reste pour les domaines migres.
Ce modele ne doit pas etre recree pour `histoire` ou `geographie`.

**Un domaine ne doit pas etre servi par les deux routes simultanement.** Si un
triplet est ajoute a `dynamicCollegeDomainPilotParams`, le fichier statique
dedie correspondant doit etre supprime dans la meme migration.

---

## 2. Routes dynamiques actuellement autorisees

La constante `dynamicCollegeDomainPilotParams` liste actuellement 11 triplets
6e. Les 11 routes sont generables par la route dynamique, car chaque triplet
dispose :

- d'une matiere existante dans `collegeSubjectsMeta`;
- d'un sous-domaine avec `href`;
- d'entrees non vides dans `sixiemeCurriculumLevelMap`.

| Route | Matiere | Domaine | Source |
|---|---|---|---|
| `/college/6e/francais/lecture` | Francais 6e | Lecture | dynamique |
| `/college/6e/francais/ecriture` | Francais 6e | Ecriture | dynamique |
| `/college/6e/francais/oral` | Francais 6e | Oral | dynamique |
| `/college/6e/francais/etude-de-la-langue` | Francais 6e | Etude de la langue | dynamique |
| `/college/6e/mathematiques/nombres-calcul` | Mathematiques 6e | Nombres et calcul | dynamique |
| `/college/6e/mathematiques/geometrie` | Mathematiques 6e | Geometrie | dynamique |
| `/college/6e/mathematiques/grandeurs-mesures` | Mathematiques 6e | Grandeurs et mesures | dynamique |
| `/college/6e/mathematiques/organisation-donnees` | Mathematiques 6e | Organisation et gestion de donnees | dynamique |
| `/college/6e/mathematiques/resolution-problemes` | Mathematiques 6e | Resolution de problemes | dynamique |
| `/college/6e/histoire-geographie-emc/histoire` | Histoire-Geographie-EMC 6e | Histoire | dynamique |
| `/college/6e/histoire-geographie-emc/geographie` | Histoire-Geographie-EMC 6e | Geographie | dynamique |

Ces **11 routes domaines 6e** sont pre-rendues a la compilation par
`app/college/[level]/[subject]/[domain]/page.tsx`.

Aucun fichier `page.tsx` dedie n'existe dans `app/college/6e/mathematiques/`.
Aucun fichier `page.tsx` dedie n'existe dans `app/college/6e/francais/`.
Aucun fichier `page.tsx` dedie n'existe dans
`app/college/6e/histoire-geographie-emc/histoire/` ni dans
`app/college/6e/histoire-geographie-emc/geographie/`.

---

## 3. Pages statiques domaine restantes

Il ne reste plus de page statique dediee pour les domaines 6e suivants :

| Route | Ancien fichier statique | Statut migration |
|---|---|---|
| `/college/6e/histoire-geographie-emc/histoire` | `app/college/6e/histoire-geographie-emc/histoire/page.tsx` | supprime, route dynamique |
| `/college/6e/histoire-geographie-emc/geographie` | `app/college/6e/histoire-geographie-emc/geographie/page.tsx` | supprime, route dynamique |

Les routes existent toujours, mais elles sont maintenant generees par
`app/college/[level]/[subject]/[domain]/page.tsx`.

---

## 4. Role de `dynamicCollegeDomainPilotParams`

### Localisation

```ts
// content/college-curriculum.ts
const dynamicCollegeDomainPilotParams = [
  { level: "6e", subject: "francais", domain: "lecture" },
  { level: "6e", subject: "francais", domain: "ecriture" },
  { level: "6e", subject: "francais", domain: "oral" },
  { level: "6e", subject: "francais", domain: "etude-de-la-langue" },
  { level: "6e", subject: "mathematiques", domain: "nombres-calcul" },
  { level: "6e", subject: "mathematiques", domain: "geometrie" },
  { level: "6e", subject: "mathematiques", domain: "grandeurs-mesures" },
  { level: "6e", subject: "mathematiques", domain: "organisation-donnees" },
  { level: "6e", subject: "mathematiques", domain: "resolution-problemes" },
  { level: "6e", subject: "histoire-geographie-emc", domain: "histoire" },
  { level: "6e", subject: "histoire-geographie-emc", domain: "geographie" },
] as const;
```

### Fonctionnement

`getCollegeDomainStaticParams()` parcourt cette liste et appelle
`getCollegeDomainMeta()` pour chaque triplet. Un triplet est retenu seulement
si `getCollegeDomainMeta()` retourne une valeur definie.

`getCollegeDomainMeta()` verifie successivement :

1. le niveau : `isCollegeLevelSlug(levelSlug)`;
2. la matiere : `getCollegeSubjectMeta(levelSlug, subjectSlug)`;
3. le sous-domaine : `subjectMeta.subdomains.find(...)` avec `href` defini;
4. les donnees : `getCollegeDomainEntries(...).length > 0`.

`dynamicCollegeDomainPilotParams` est donc une allowlist pilote : elle ne
genere pas automatiquement tous les domaines college. Elle autorise uniquement
les triplets explicitement listes et valides selon ces controles.

### Garde-fou pour les domaines "a venir"

Un sous-domaine sans `href` ne passe pas la verification 3. Un sous-domaine
sans entree ne passe pas la verification 4. Dans les deux cas, le triplet est
ignore par `getCollegeDomainStaticParams()`, meme s'il est present par erreur
dans l'allowlist.

---

## 5. Attention au resume du build Next.js

Le resume affiche par `npx next build --webpack` peut tronquer la liste des
chemins generes par `generateStaticParams()` pour une route dynamique.

Exemple possible :

```
├ ● /college/[level]/[subject]/[domain]
│ ├ /college/6e/francais/lecture
│ ├ /college/6e/francais/ecriture
│ ├ /college/6e/francais/oral
│ └ [+8 more paths]
```

Cette sortie ne signifie pas que seules les routes visibles sont generees. Elle
signifie que Next.js affiche un echantillon et masque le reste derriere
`[+N more paths]`.

**Ne pas utiliser uniquement le resume console pour compter les routes
dynamiques.**

---

## 6. Verification fiable dans `.next/server/app`

La source de verite apres build est l'arborescence generee dans
`.next/server/app`.

### Lister les HTML college generes

```bash
find .next/server/app/college -name "*.html" | sort
```

### Verifier les 11 routes dynamiques domaines 6e

```bash
find .next/server/app/college/6e -path "*mathematiques*" -name "*.html" | sort
find .next/server/app/college/6e -path "*francais*" -name "*.html" | sort
find .next/server/app/college/6e -path "*histoire-geographie-emc*" -name "*.html" | sort
```

Les fichiers attendus pour les domaines dynamiques sont :

```
.next/server/app/college/6e/francais/lecture.html
.next/server/app/college/6e/francais/ecriture.html
.next/server/app/college/6e/francais/oral.html
.next/server/app/college/6e/francais/etude-de-la-langue.html
.next/server/app/college/6e/mathematiques/nombres-calcul.html
.next/server/app/college/6e/mathematiques/geometrie.html
.next/server/app/college/6e/mathematiques/grandeurs-mesures.html
.next/server/app/college/6e/mathematiques/organisation-donnees.html
.next/server/app/college/6e/mathematiques/resolution-problemes.html
.next/server/app/college/6e/histoire-geographie-emc/histoire.html
.next/server/app/college/6e/histoire-geographie-emc/geographie.html
```

---

## 7. Migration checklist

Avant d'ajouter un nouveau domaine a `dynamicCollegeDomainPilotParams` et de
supprimer son fichier statique dedie :

- [ ] Verifier que le sous-domaine a un `href` dans ses metadonnees.
- [ ] Verifier que le domaine existe dans le `CurriculumLevelMap` du niveau.
- [ ] Verifier que `getCollegeDomainEntries()` retourne au moins une entree.
- [ ] Ajouter un seul triplet a la fois a `dynamicCollegeDomainPilotParams`.
- [ ] Supprimer le fichier statique dedie correspondant.
- [ ] Verifier que la route apparait toujours dans `.next/server/app` apres la
  suppression du fichier statique.
- [ ] Ne pas creer de contenu pedagogique pendant la migration.
- [ ] Ne pas creer de PDF.
- [ ] Ne pas ajouter de `href` vers un fichier inexistant.
- [ ] Verifier qu'aucun domaine n'est servi a la fois par une route statique et
  par la route dynamique.
- [ ] Executer l'ordre de validation standard :
  `rm -rf .next`, `npm run lint`, `npx tsc --noEmit`,
  `npx next build --webpack`.
- [ ] Confirmer les routes generees dans `.next/server/app`, sans se limiter au
  resume console du build.

---

## 8. Risques / regles a respecter

- Ne pas migrer un domaine sans `href`.
- Ne pas migrer un domaine sans entree dans le curriculum.
- Ne pas creer de route pour les niveaux primaire, maternelle ou lycee depuis
  ce registre college.
- Ne pas toucher au CM2 : son contenu reste isole dans `content/cm2.ts`.
- Ne pas creer de contenu pedagogique pour faire passer une migration.
- Ne pas creer de PDF fictif.
- Ne pas ajouter de lien vers un PDF absent.
- Ne pas recreer les anciennes pages statiques
  `app/college/6e/histoire-geographie-emc/histoire/page.tsx` ou
  `app/college/6e/histoire-geographie-emc/geographie/page.tsx`.
- Ne pas comparer des statuts bruts dans l'UI : utiliser
  `getPublicStatusKey()` et `PublicStatusBadge` selon les regles de gouvernance
  des statuts publics.
- Ne pas importer directement `public-status.domain` ou `public-status.ui`
  depuis `app/` ou `components/`.
- Ne pas considerer le resume Next.js comme une preuve exhaustive des chemins
  generes.

---

## 9. Architecture des fichiers, etat actuel

```
app/college/
  [level]/
    [subject]/
      [domain]/
        page.tsx          <- route dynamique, sert les 11 domaines 6e allowlistes

content/
  college-curriculum.ts
    dynamicCollegeDomainPilotParams   <- allowlist de 11 triplets 6e
    getCollegeDomainStaticParams()    <- filtre l'allowlist via getCollegeDomainMeta()
    getCollegeDomainMeta()            <- controles niveau, matiere, href, entries
    getCollegeDomainEntries()         <- lookup dans CurriculumLevelMap

  levels/college/
    6e-curriculum.ts
      sixiemeCurriculumLevelMap       <- source des entries 6e
      sixiemeFrancaisSubdomains       <- metadonnees + hrefs Francais 6e
      sixiemeMathematiquesSubdomains  <- metadonnees + hrefs Mathematiques 6e
      sixiemeHistoireGeographieEmcSubdomains <- metadonnees + hrefs Histoire-Geographie-EMC 6e
      getSixiemeDomainEntries()       <- helper legacy encore disponible
```

---

## 10. Domaines candidats a une migration future

Aucun domaine 6e avec ancienne page statique dediee ne reste a migrer.

`histoire`, `geographie` et `resolution-problemes` font maintenant partie des
11 routes dynamiques domaines 6e documentees ci-dessus.
