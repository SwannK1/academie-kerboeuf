# Lancer le site en local — Académie Kerboeuf

## La commande du quotidien

```bash
npm run local
```

C'est la commande à utiliser au quotidien. Elle fait trois choses automatiquement :

1. Libère le port 3000 si un ancien processus l'occupe
2. Nettoie le cache Next.js (`.next/`)
3. Lance le serveur de développement

Puis ouvrez votre navigateur sur **http://localhost:3000**.

---

## Encore plus simple : double-clic

Le fichier **`Academie-Kerboeuf.command`** à la racine du projet est un lanceur Mac.  
Double-cliquez dessus depuis le Finder : il libère le port, démarre le serveur, et ouvre le navigateur automatiquement.

> Si macOS affiche "impossible d'ouvrir", faites clic droit → Ouvrir → Ouvrir.  
> Vous n'aurez à confirmer qu'une seule fois.

---

## Depuis le terminal : script shell

Le fichier **`scripts/open-local.sh`** fait la même chose depuis le terminal.

```bash
# Lancement standard (libère le port 3000, ouvre le navigateur)
./scripts/open-local.sh

# Lancement avec nettoyage complet du cache Next.js
./scripts/open-local.sh --clean
```

Option `--clean` recommandée si :
- le site affiche des erreurs étranges ;
- vous venez de modifier `next.config.ts` ;
- le dernier build s'est mal terminé.

---

## Toutes les commandes disponibles

| Commande | Ce qu'elle fait |
|---|---|
| `npm run local` | **Commande quotidienne.** Libère le port 3000, nettoie `.next`, démarre le serveur |
| `npm run dev` | Lance le serveur sans nettoyer ni vérifier le port |
| `npm run dev:clean` | Nettoie `.next` puis lance le serveur (sans toucher au port) |
| `npm run open` | Ouvre `http://localhost:3000` dans le navigateur |
| `npm run build` | Construit le site en mode production |
| `npm run lint` | Vérifie la qualité du code |

---

## Si le site ne s'ouvre pas

### Cas 1 — "Port already in use"

Le port 3000 est occupé par un ancien processus. Exécutez :

```bash
lsof -ti:3000 | xargs kill -9 2>/dev/null; npm run dev
```

Ou plus simplement, utilisez `npm run local` qui s'en charge automatiquement.

### Cas 2 — Localhost ne répond pas / "empty reply"

Le serveur n'a pas encore démarré. Attendez 5 à 10 secondes après avoir vu :

```
✓ Ready in Xs
```

dans le terminal, puis rechargez la page.

### Cas 3 — Erreurs bizarres au démarrage

Le cache est corrompu. Nettoyez-le :

```bash
rm -rf .next node_modules/.cache
npm run dev
```

### Cas 4 — Le build de production crashe

Le build nécessite de la mémoire supplémentaire. Utilisez :

```bash
npm run build
```

(le script inclut déjà `NODE_OPTIONS='--max-old-space-size=4096'`)

Si vous utilisez `npx next build --webpack` directement, préfixez avec :

```bash
NODE_OPTIONS='--max-old-space-size=4096' npx next build --webpack
```

---

## Ordre de validation standard (avant chaque merge)

```bash
rm -rf .next
npm run lint
npx tsc --noEmit
npm run build
```

---

## Quand utiliser `npm run dev` classique ?

`npm run dev` (sans `local`) est utile quand :
- Le serveur tourne déjà et vous voulez juste le relancer rapidement
- Vous ne voulez pas nettoyer le cache (hot reload en cours)
- Vous êtes sûr que le port 3000 est libre

Dans tous les autres cas, préférez `npm run local`.
