# Classification forensic des PNG CE1

## Résultat exécutif

Les **657 PNG uniques valides** de l'audit SHA-256 antérieur ont été réexaminés visuellement, sans relancer aveuglément l'analyse des 3 729 occurrences. Deux passes complètes sur 42 planches ont été recoupées avec les rapports historiques, `ressources.json`, les scripts et les arbres CE1 disponibles.

| Classe | Nombre | Décision |
|---|---:|---|
| A — certitude forte | 3 | importées |
| B — forte probabilité | 540 | refusées : rôle hybride ou probable |
| C — ambigu | 31 | refusées : version ou attribution non prouvée |
| D — inutilisable | 83 | refusées : support, gabarit, administratif ou artefact |
| **Total** | **657** | **3 importées, 654 refusées** |

L'inventaire exhaustif est conservé dans `docs/ce1-png-forensic-inventory.json`. Chaque ligne contient l'empreinte, tous les chemins connus, le nom, le dossier, les dimensions, les numéros de séquence détectables, la matière présumée, la compétence et le type lorsqu'ils sont prouvés, la classe, la décision et les preuves de revue.

## Imports retenus

| Titre visible | Compétence CE1 existante | Rôle | SHA-256 source |
|---|---|---|---|
| Évaluation : singulier et pluriel | Marquer le pluriel régulier du nom | évaluation | `322c68ca2a81a6ebe357286a5328f1056bbfc4060a74215ff2930daae648266c` |
| Évaluation : reconnaître un nom | Identifier le nom dans une phrase | évaluation | `415180c1c9e255c1abee230d77fef582aad2b5d7a5d48b496871397ac2738774` |
| Évaluation : nom commun et nom propre | Identifier le nom dans une phrase | évaluation | `dec401a7c28894b870abf30c134dd405eefb24314aaa8f8065158eab435fce41` |

Les trois titres et le rôle « évaluation » sont visibles dans les images. Leur contenu est mono-compétence et correspond sans création artificielle à deux des 86 compétences CE1. Le troisième fichier se trouvait dans un dossier historiquement étiqueté Mathématiques ; la preuve visuelle française a primé sur ce chemin erroné. **Aucune nouvelle compétence** n'a été créée.

Les PNG originaux locaux n'ont été ni modifiés ni supprimés. Les copies publiées sont des PDF mono-page fidèles, sous `public/fiches/ce1/francais/etude-de-la-langue/evaluations/`, et leurs ressources ont le statut partiel/ disponible uniquement parce que les fichiers existent réellement.

## Refus, déduplication et variantes

- 540 fiches B montrent souvent une matière et une notion exploitables, mais combinent leçon, exercices, consignes ou corrigé implicite. Les conventions du dépôt ne permettent pas de choisir honnêtement un rôle public.
- 31 fiches C appartiennent à des noms dont plusieurs contenus distincts existent ou gardent une attribution pédagogique incertaine. Aucune version canonique n'a été élue sans preuve.
- 83 fiches D sont des pages de garde, affichages, gabarits, calendriers, documents administratifs, supports non autonomes ou artefacts sans valeur catalogable.
- L'audit global conserve 652 groupes de doublons SHA-256 et 3 015 occurrences au-delà du premier exemplaire. Les PNG étudiés représentent exactement 657 contenus valides uniques.
- 29 variantes de nom existent dans l'audit global ; 28 concernent des PNG pédagogiques, la vingt-neuvième étant `.DS_Store`. Même nom et même contenu n'ont jamais été confondus.
- Le PNG corrompu déjà isolé dans l'audit antérieur (sept occurrences, une empreinte) reste hors du lot des 657 PNG valides et hors import.

## Archéologie et second audit

Les inventaires de séquences, rapports de renommage/classement, sauvegardes, ancien arbre CE1, `ressources.json`, scripts, Git et worktrees historiques ont été consultés. Ils confirment qu'un renommage numérique destructif et des classements par dossier parfois faux ont perdu des intitulés. Ils ne fournissent pas de table fiable rétablissant le rôle et la version de chaque fiche.

La seconde passe a repris toutes les classes B et C après identification des trois correspondances A. Elle n'a apporté aucune preuve supplémentaire permettant de promouvoir une autre fiche sans attribution arbitraire.

## Routes et validation

Les ressources sont rattachées aux compétences existantes sur la route canonique :

- `/primaire/ce1/programmes/francais/etude-de-la-langue`
- `/primaire/ce1/programmes/francais/orthographe`

Les redirections historiques CE1 ne sont pas modifiées. La validation couvre l'existence des trois `href`, l'unicité des 657 empreintes, les statuts, le rendu de la route et sa largeur mobile, puis la chaîne imposée : lint, TypeScript après nettoyage de `.next`, build de production et `git diff --check`.

## Incidents sans incidence

La reconnaissance de texte native Swift était indisponible à cause d'une incompatibilité locale SDK/compilateur ; la classification repose donc sur l'inspection visuelle réelle des 42 planches. `reportlab` et Poppler n'étaient pas installés : Pillow a produit les PDF et Quick Look a rendu les trois sorties, vérifiées visuellement. Aucune erreur de ressource ou de route ne subsiste.
