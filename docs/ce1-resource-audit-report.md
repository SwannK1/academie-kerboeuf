# Audit final des ressources CE1

Date : 26 août 2026  
Source principale : `/Users/swann/Desktop/CE1 - QUATREMAIRE`  
Périmètre : CE1 uniquement

## Résumé vérifié

| Mesure | Résultat |
| --- | ---: |
| Fichiers examinés récursivement | 3 729 |
| Contenus uniques par SHA-256 | 714 |
| Occurrences PDF | 175 |
| PDF uniques | 25 |
| Groupes de doublons exacts | 652 |
| Occurrences dupliquées au-delà du premier exemplaire | 3 015 |
| Noms présentant plusieurs contenus (variantes) | 29 |
| Contenus corrompus | 1 |
| Occurrences corrompues | 7 |
| PNG uniques valides | 657 |

Le détail reproductible (chemins, tailles, couches du corpus, hashes SHA-256,
groupes de doublons, variantes et intégrité par signature) est conservé dans
`docs/ce1-resource-audit.json`. Il est régénérable avec :

```bash
node scripts/audit-ce1-resources.mjs "/Users/swann/Desktop/CE1 - QUATREMAIRE"
```

## Reconstruction de l'ancien audit

L'ancien dry-run ne décrivait pas le corpus actuel. Il analysait 325 fichiers
après exclusions, classait 300 images numérotées « à vérifier » et comptait 41
groupes de doublons parmi les erreurs. Les nombres annoncés antérieurement ne
correspondaient donc ni aux occurrences actuelles, ni aux contenus uniques.

Les causes retrouvées sont :

- sauvegardes complètes imbriquées dans le corpus ;
- archives de doublons conservées volontairement ;
- copies historiques dans `CE1-Academie-Kerboeuf` ;
- renommage destructif des intitulés pédagogiques des PNG en numéros de séquence ;
- classification par chemin, parfois contredite par des hashes identiques entre matières ;
- confusion entre avertissement de doublon et erreur de lecture ;
- un PNG réellement invalide, `01_FRANCAIS_Sequence_058_Sequence.png`, répété sept fois.

## Classification et décision d'import

Les 25 PDF uniques sont des tapuscrits complets et lisibles. Chaque contenu est
présent sept fois et toutes les copies d'un même titre ont un SHA-256 identique.
Ils ont été ouverts avec `pypdf`, leurs pages et textes ont été extraits, puis
leurs 25 couvertures ont été rendues et contrôlées visuellement.

Ils sont importés comme `lesson-pdf` dans le catalogue CE1 de compréhension.
Ils soutiennent la compétence « Identifier les personnages et les lieux » mais
ne contiennent ni exercices, ni corrections, ni évaluations. La compétence, les
leçons et le sous-domaine restent donc `partial` ; aucun contenu n'est déclaré
complet artificiellement.

Lors de ce premier audit, les 657 PNG uniques valides n'étaient pas importés. Le
second chantier forensic est documenté dans `docs/ce1-png-forensic-report.md` et
a résolu trois évaluations avec certitude forte. Les rapports historiques et
`ressources.json` permettent souvent de retrouver une matière large, mais pas
une compétence, une leçon, un rôle documentaire ou une version fiable. Les 29
variantes de même nom renforcent ce risque. Une association plus précise serait
arbitraire. Le PNG corrompu est refusé. Les 31 autres contenus uniques sont des
rapports, métadonnées, scripts, fichiers système ou images orphelines et ne sont
pas des ressources PDF publiables.

## Mapping curriculum

```text
Français
└── Compréhension
    └── Identifier les personnages, les lieux et les informations explicites
        ├── 25 lectures/tapuscrits disponibles
        ├── exercices : absents
        ├── corrections : absentes
        └── évaluations : absentes
```

Bilan des 86 compétences du learning tree CE1 :

- complètes avec toutes les ressources attendues : 0 ;
- partielles avec ressources réelles : 1 ;
- sans ressource PDF réelle : 85.

## Archéologie Git et autres worktrees

Les branches et références CE1 accessibles ont été comparées (`feat/ce1-priority-sequences`,
`content/cp-ce1-learning-tree-structure`, `feat/ce1-gaston-learning-map-v1`,
`feature/structure-ce1-competences`). Elles contiennent des structures de contenu
CE1, mais aucun ancien `public/fiches/ce1` permettant de résoudre les PNG
numérotés. Le worktree d'audit répertorié par Git n'existe plus sur disque.
Aucun autre worktree n'a été modifié.

## Routes et liens

- nouvelle route publiée : `/primaire/ce1/programmes/francais/comprehension` ;
- route CE1 : HTTP 200 ;
- route matière français CE1 : HTTP 200 ;
- catalogue compréhension : HTTP 200 ;
- 25 PDF référencés : présents sur disque, hashes identiques aux sources et HTTP 200 ;
- 25 boutons PDF rendus (50 occurrences dans le HTML React, contenu serveur et payload) ;
- aucun `href` fictif ou fichier CE1 référencé absent.

## Validations finales

- `npm run lint` : 0 erreur, 13 avertissements préexistants hors modifications ;
- `npx tsc --noEmit` après suppression de `.next` : succès ;
- `npm run build` : succès, 429 pages statiques, route CE1 générée ;
- revue visuelle des 25 couvertures PDF : succès ;
- second audit SHA-256 source/destination : 25 sur 25 identiques ;
- recherche finale des PDF CE1 : aucune ressource unique oubliée ;
- recherche de liens morts et ressources CE1 orphelines importées : aucun écart.

## Restes réellement ambigus ou refusés

- 654 PNG uniques valides restent refusés après la classification forensic : ambiguïté de rôle, d'attribution ou de version ;
- 1 PNG unique corrompu : refusé ;
- 31 contenus techniques ou orphelins : refusés comme ressources pédagogiques publiables.

Ces éléments ont tous été inventoriés et hashés. Aucun cas fiable supplémentaire
n'a émergé lors de la seconde passe.
