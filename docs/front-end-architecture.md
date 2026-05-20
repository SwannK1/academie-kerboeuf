# Architecture front-end proposée

## Objectif immédiat

Construire une base Next.js propre pour l’univers public de l’Académie Kerboeuf :

- homepage immersive ;
- navigation responsive ;
- sections éditoriales réutilisables ;
- contenu isolé du rendu ;
- préparation à l’ajout futur de ressources, missions, personnages et niveaux.

## Structure recommandée

```txt
app/
  layout.tsx
  page.tsx
  globals.css
components/
  layout/
    navbar.tsx
  sections/
    educational-levels.tsx
    hero-section.tsx
    mission-preview.tsx
    platform-vision.tsx
content/
  home.ts
docs/
  front-end-architecture.md
public/
  images/
    characters/
    missions/
    ui/
```

## Organisation à surveiller

Des dossiers avec un `:` final existent à la racine, par exemple `personnages:`. Ils ressemblent à une création accidentelle depuis une commande ou un copier-coller. Ils ne doivent pas être supprimés sans vérification, car `personnages:` contient déjà une arborescence de personnages et rôles.

La prochaine étape propre serait de migrer prudemment ces dossiers vers des chemins standards, par exemple `public/images/characters/felix/explorateur/`, quand les fichiers visuels définitifs seront prêts.

## Principes

- `app/` reste réservé aux routes Next.js et aux styles globaux.
- `components/` regroupe les briques UI réutilisables.
- `content/` porte les données éditoriales statiques.
- `public/` accueillera les visuels servis directement par le site.
- Aucun backend, compte utilisateur, paiement ou abonnement n’est introduit à ce stade.
