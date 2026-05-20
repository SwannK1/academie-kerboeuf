# Déploiement Vercel — Académie Kerboeuf

**Dernière mise à jour** : mai 2026 (Codex Vercel)
**Objectif** : accéder au site via une vraie URL, sans terminal ni localhost.

---

## 1. Principes

| Mode | Accès | Commande | Usage |
|---|---|---|---|
| **Développement local** | `http://localhost:3000` | `npm run dev` | Modifier le code en temps réel |
| **Production locale** | `http://localhost:3000` | `npm run build` + `npm run start` | Tester le build final avant déploiement |
| **Site déployé** | `https://…vercel.app` (ou domaine custom) | Aucune — Vercel gère tout | Accès public, zéro terminal |

---

## 2. Prérequis avant le premier déploiement

### 2.1 Le projet doit être sur GitHub

Vercel se connecte à un dépôt GitHub. Si le projet n'est pas encore sur GitHub :

```bash
# Créer le repo sur github.com, puis depuis le dossier du projet :
git remote add origin https://github.com/TON_COMPTE/academie-kerboeuf.git
git branch -M main
git push -u origin main
```

### 2.2 Tous les fichiers doivent être committés et poussés

> **C'est le point critique.** Vercel tire les fichiers depuis Git, pas depuis le disque local.
> Un fichier non commité est invisible pour Vercel.

Vérifier l'état :

```bash
git status
```

Ajouter et commiter tout ce qui est nécessaire au build :

```bash
git add .
git commit -m "chore: prépare le projet pour Vercel"
git push origin main
```

**Fichiers critiques non encore committés (identifiés en mai 2026) :**

| Répertoire / fichier | Utilité | Risque si absent |
|---|---|---|
| `public/` | Favicon + images du site | Images manquantes, erreurs 404 |
| `content/levels/maternelle/` | Données maternelle | Build cassé |
| `content/levels/cp-*.ts` | Données CP | Build cassé |
| `content/levels/ce2*.ts` | Données CE2 | Build cassé |
| `content/levels/cm1*.ts` | Données CM1 | Build cassé |
| `content/levels/lycee-statuses.ts` | Statuts lycée | Build cassé |
| `content/levels/published-subdomain-pages.ts` | Pages catalogue | Build cassé |
| `content/programs/` | Données programmes | Build cassé |
| `lib/activity-registry/` | Registre activités | Build cassé |
| `lib/mission-engine/` | Moteur missions | Build cassé |

> Note : ces fichiers existent sur le disque local et permettent au build local de fonctionner.
> Ils doivent être committés avant de pousser vers Vercel.

### 2.3 Vérifier le build avant de pousser

Toujours valider dans cet ordre avant tout push :

```bash
rm -rf .next
npm run lint          # vérification du style de code
npx tsc --noEmit      # vérification TypeScript (pas besoin de .next)
npx next build --webpack   # build de production complet
```

Le build doit terminer sans erreur (`EXIT:0`) et afficher un nombre de pages cohérent (240 pages en mai 2026).

---

## 3. Connecter le repo à Vercel

1. Aller sur [vercel.com](https://vercel.com) et se connecter (compte GitHub recommandé).
2. Cliquer sur **Add New → Project**.
3. Choisir le repo `academie-kerboeuf` dans la liste GitHub.
4. Vercel détecte automatiquement Next.js. **Ne pas modifier les paramètres par défaut.**
5. Cliquer sur **Deploy**.

Vercel affichera une URL du type `https://academie-kerboeuf-xxx.vercel.app`.

---

## 4. Paramètres de build Vercel (valeurs par défaut)

| Paramètre | Valeur | Note |
|---|---|---|
| **Framework** | Next.js (auto-détecté) | Ne pas changer |
| **Build command** | `npm run build` → `next build` | Correct, ne pas modifier |
| **Output directory** | `.next` | Géré automatiquement par Vercel |
| **Install command** | `npm install` | Correct |
| **Node.js version** | 22.x (Vercel default) | Compatible avec Next.js 16 |

> **Ne pas ajouter `--webpack`** dans la commande de build Vercel.  
> Ce flag est utilisé localement pour contourner un problème de cache Turbopack.  
> Vercel n'est pas affecté par ce problème.

---

## 5. Variables d'environnement

**Ce projet n'a pas de variables d'environnement requises pour le build.**

Aucun fichier `.env` n'est nécessaire. Le build fonctionnera directement.

> Note : `app/layout.tsx` contient `BASE_URL = "https://academie-kerboeuf.fr"` codé en dur.
> Si le domaine change, cette valeur devra être mise à jour dans le fichier source.
> À terme, cette valeur pourrait être externalisée dans une variable d'environnement Vercel (`NEXT_PUBLIC_BASE_URL`).

---

## 6. Domaine personnalisé (optionnel)

Après le premier déploiement :

1. Dans le dashboard Vercel, aller dans **Settings → Domains**.
2. Ajouter le domaine `academie-kerboeuf.fr`.
3. Configurer les DNS chez le registrar (Vercel fournit les valeurs à copier).
4. Mettre à jour `BASE_URL` dans `app/layout.tsx` si ce n'est pas déjà fait.

---

## 7. Vérifier que le site est en ligne

Après le déploiement :

1. Ouvrir l'URL fournie par Vercel (ex. `https://academie-kerboeuf.vercel.app`).
2. Vérifier les pages principales :
   - `/` — page d'accueil
   - `/college` — portail collège
   - `/college/6e/francais/lecture` — page domaine dynamique
   - `/maternelle/gs` — page Grande Section
   - `/primaire/cm2` — page CM2

3. Pour vérifier rapidement depuis le terminal (optionnel) :

```bash
curl -I https://VOTRE-URL.vercel.app/
curl -I https://VOTRE-URL.vercel.app/college
```

Un statut `200 OK` confirme que la route répond.

---

## 8. Que faire si le build Vercel échoue

### Diagnostic rapide

1. Dans le dashboard Vercel → projet → onglet **Deployments**.
2. Cliquer sur le déploiement en erreur → **View Build Logs**.
3. Chercher la ligne `Error:` ou `Cannot find module`.

### Causes fréquentes et solutions

| Erreur | Cause probable | Solution |
|---|---|---|
| `Cannot find module '...'` | Fichier source non commité | `git add` + `git commit` + `git push` du fichier manquant |
| `Type error: ...` | Erreur TypeScript ignorée en local | Lancer `npx tsc --noEmit` et corriger |
| `Build failed` générique | Voir les logs détaillés | Reproduire avec `npx next build --webpack` en local |
| Images manquantes (404) | `public/` non commité | Commiter le dossier `public/` |

### Reproduire le build Vercel en local

```bash
rm -rf .next
npx next build
```

> Sans `--webpack` — exactement comme Vercel.

---

## 9. Avant chaque déploiement — checklist

- [ ] `rm -rf .next && npm run lint` — zéro erreur
- [ ] `npx tsc --noEmit` — zéro erreur TypeScript
- [ ] `npx next build --webpack` — build réussi, nombre de pages stable
- [ ] `git status` — aucun fichier utile oublié
- [ ] `git push origin main` — synchronisé avec GitHub

Vercel redéploie automatiquement à chaque push sur `main`.

---

## 10. Ce qu'il ne faut PAS inclure dans Git

Ces fichiers sont déjà ignorés par `.gitignore` — **ne jamais les forcer** :

| Fichier / dossier | Raison |
|---|---|
| `.next/` | Généré au build, propre à chaque machine |
| `node_modules/` | Regénéré par `npm install` |
| `.vercel/` | Configuration locale Vercel |
| `.env*` | Secrets et variables locales |
| `*.tsbuildinfo` | Cache TypeScript local |
| `.DS_Store` | Métadonnées macOS |

---

## 11. Résumé — obtenir une vraie URL en 5 étapes

1. Commiter tous les fichiers nécessaires : `git add . && git commit -m "..." && git push`
2. Aller sur [vercel.com](https://vercel.com) → **Add New Project**
3. Importer le repo GitHub `academie-kerboeuf`
4. Laisser les paramètres par défaut → **Deploy**
5. Ouvrir l'URL fournie par Vercel

**Aucune installation locale requise. Aucun terminal. Accessible depuis n'importe quel navigateur.**
