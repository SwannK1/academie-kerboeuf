# Ressources pédagogiques — Convention de nommage

## Arborescence

```
ressources/
  primaire/
    cp/ ce1/ ce2/ cm1/ cm2/
      mathematiques/
        nombres/        calcul/      geometrie/
        grandeurs-mesures/           donnees/
      francais/
        grammaire/      conjugaison/ orthographe/
        lexique/        lecture-ecriture/
  college/
    6e/ 5e/ 4e/ 3e/
      mathematiques/
        nombres-calculs/             geometrie/
        statistiques-probabilites/   fonctions/
      francais/
        grammaire-orthographe/       lecture-comprehension/
        ecriture/                    oral/
  lycee/
    seconde/ premiere/ terminale/
      mathematiques/
        algebre/   geometrie/   analyse/   probabilites/
      francais/
        litterature-hda/   expression-ecrite/   expression-orale/
```

## Convention de nommage des fichiers

```
{niveau}-{matiere}-{titre-de-la-leçon}-{fiche}.pdf
```

**Exemples :**

```
cp-francais-reconnaître-les-lettres-f1.pdf
ce1-maths-compter-jusqu-a-100-f2.pdf
cm2-maths-lire-un-graphique-simple-f1.pdf
cm2-francais-conjuguer-imparfait-f2.pdf
6e-maths-fractions-introduction-f1.pdf
3e-francais-rediger-une-introduction-f3.pdf
```

## Signification des fiches (F1 / F2 / F3)

| Fiche | Contenu | Usage |
|-------|---------|-------|
| **F1** | Situation déclenchante + mini-leçon + automatismes | Découverte / séance 1 |
| **F2** | Application + exercices de consolidation | Entraînement / séances 2-3 |
| **F3** | Évaluation courte (bilan de compétences) | Évaluation / fin de séquence |

## Règles de nommage

- Tout en **minuscules**.
- Séparateur : **tiret** (`-`), pas d'espace ni d'underscore.
- Caractères accentués autorisés dans le titre (pas dans le niveau ni la matière).
- Le titre doit être **court** (3 à 6 mots maximum), lisible sans contexte.
- Ne jamais créer un fichier PDF fictif — seuls les PDF réellement produits sont référencés dans le site.

## Règle d'exposition sur le site

Un PDF n'est affiché comme lien cliquable dans le site **que si** :

1. `getPublicStatusKey(resource.status) === "available"` ;
2. `resource.href` pointe vers un fichier **réellement présent** dans ce dossier.

Tant que ces deux conditions ne sont pas réunies, la ressource est listée avec
son statut (`PublicStatusBadge`) mais sans lien téléchargeable.

## Ajouter un nouveau niveau

1. Créer le dossier sous `ressources/primaire/`, `ressources/college/` ou `ressources/lycee/`.
2. Ajouter une entrée dans `content/levels/published-subdomain-pages.ts`.
3. Créer le learning tree correspondant.
4. Déposer les PDF dans les sous-dossiers concernés en respectant la convention de nommage.
