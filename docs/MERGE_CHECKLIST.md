# Checklist de merge — Académie Kerboeuf

## Avant de merger

- [ ] La PR traite un seul sujet.
- [ ] La branche part bien de main.
- [ ] Le titre de PR est clair.
- [ ] Le diff a été relu.
- [ ] Les fichiers modifiés correspondent au périmètre.
- [ ] Aucun fichier sensible n'est ajouté.
- [ ] Aucun fichier parasite n'est ajouté.
- [ ] Aucun autre projet n'est mélangé.
- [ ] Aucun faux lien, faux PDF ou fausse ressource.
- [ ] npm run lint passe.
- [ ] npm run build passe.
- [ ] La CI GitHub est verte.
- [ ] Le working tree est propre.

## Interdictions

Ne jamais merger :
- une branche brouillon ;
- une branche qui contient plusieurs sujets ;
- une branche avec build cassé ;
- une branche contenant des restes KerWeb, Semence, Graines de Foi ou restaurant ;
- une branche avec .env, .vercel, .next, node_modules ou tsbuildinfo.

## En cas de doute

Fermer ou archiver la PR.
Recréer une branche propre depuis main.
Reprendre uniquement les changements utiles.
