# Périmètre Version 1 — Académie Kerboeuf

Audit de préparation au lancement — août 2026.
Ce document constate l'état réel du dépôt à date. Il complète (et confirme,
trois mois plus tard) `docs/strategie-v1-academie-kerboeuf.md`, qui avait
déjà fixé le cap : **une V1 centrée sur le CM2**, les autres niveaux restant
en préparation. Rien dans cet audit ne remet en cause cette décision — les
faits ci-dessous la confirment plutôt qu'ils ne l'infirment.

---

## 1. Promesse principale du produit

L'Académie Kerboeuf est un univers pédagogique narratif : chaque niveau
scolaire (de la maternelle à la Terminale) a son professeur référent, son
élève-guide, ses lieux et ses missions. La V1 tient une promesse volontairement
étroite : **un niveau pilote, le CM2, exploré en profondeur avec Félix**, des
fiches PDF réelles en français et (partiellement) en mathématiques, des
missions imprimables, et des outils enseignants locaux (sans compte, sans
cloud) utilisables dès aujourd'hui à tous les niveaux.

Ce n'est pas la promesse d'un programme complet multi-niveaux. C'est la
promesse d'une expérience courte mais honnête, qui ne renvoie jamais un
visiteur vers du vide.

## 2. Public cible

- **Enseignants du premier degré**, en priorité CM2, pour la préparation de
  classe (outils de planification, fiches imprimables) et pour explorer un
  format narratif de mission pédagogique.
- **Parents** curieux de l'univers Kerboeuf et des ressources CM2.
- **Élèves** de CM2, via les fiches imprimables et projetables associées à
  Félix.

Les autres niveaux (maternelle, CP, CE1, CE2, CM1, collège, lycée) ne sont
pas encore un public servi en V1 : le site leur montre honnêtement une
structure « en préparation », pas un service utilisable.

---

## 3. Classification par domaine

| Domaine | Statut | Constat |
|---|---|---|
| **Catalogue de ressources** | Disponible avec limites | 308 fichiers réels (154 PDF + 154 PNG), tous vérifiés présents sur disque, tous en `public/fiches/cm2/`. Aucun PDF n'existe pour un autre niveau. Les 3 pages catalogue publiées pour CP/CE1/CE2 (`content/levels/published-subdomain-pages.ts`) n'ont aucune ressource cliquable — uniquement des séquences « à venir ». |
| **CE1** | À venir | Arbre pédagogique canonique : 86 séquences, 0 `available`. Fichier « pilote » (`content/levels/ce1.ts`) réduit à 1 seule leçon, statut `in-progress`. La page publiée « Étude de la langue » n'affiche aucune ressource cliquable. |
| **CM2** | Disponible avec limites | Niveau pilote. Français solide (37 notions, 5 domaines couverts, ~86 % de couverture leçon/exercices/évaluation). Mathématiques réelles mais concentrées sur un seul domaine (Géométrie, 22 notions) sur les 5-6 attendus au programme. 4 missions sur 9 réellement disponibles. Sciences-technologie et histoire-géographie : structure de menu seulement, 0 leçon disponible. |
| **Français** | Disponible avec limites | Seul le CM2 a du français réellement disponible. CP, CE1, CE2 et CM1 sont à 0 leçon `available` dans leurs arbres canoniques malgré des pages « programmes » publiées pour CP et CE1. |
| **Mathématiques** | Disponible avec limites | Seul le CM2 a des mathématiques réellement disponibles, et uniquement en géométrie. CE2 a une page « programmes » publiée (Nombres et calculs) mais 0 ressource cliquable derrière. |
| **Autres matières** (histoire-géo, sciences, EMC, anglais, arts, EPS) | Non livrable | Aucune leçon `available` n'existe nulle part dans le dépôt pour ces matières, à aucun niveau. Ce sont des entrées de menu déclaratives. |
| **Outils enseignants** | Disponible avec limites | 24 outils fonctionnels (planification, checklists, réunions, impression), tous 100 % client/`localStorage`, honnêtement présentés comme tels dans l'UI. Sauvegarde/export manuel limité à 4 outils sur 24. 3-4 outils fonctionnels ne sont pas listés au tableau de bord (accessibles par URL directe uniquement). |
| **Espace élève** (`/eleves`) | Disponible avec limites | Galerie de 13 personnages-élèves statique, explicitement présentée comme « repères narratifs, sans compte utilisateur ni progression réelle » — le texte est honnête, mais le terme « espace élève » suggère plus d'interactivité que ce qui existe. Pas de guide déclaré pour PS, 4e, Seconde. |
| **Parcours** (`/parcours`) | Disponible avec limites | 5 parcours dans le catalogue officiel, 4 fonctionnels de bout en bout (missions réelles liées), 1 marqué « à venir ». Deux pages orphelines (`methodes-pour-apprendre`, `reussir-entree-sixieme`) existent, 100 % « bientôt », correctement non reliées à la navigation. |
| **Missions** (`/missions-recentes`) | Disponible avec limites | Système simple et statique (`content/mission-registry.ts`), pas de moteur interactif. CM2 : 4/9 disponibles ; Seconde : 3/5 ; collège et lycée : une poignée par niveau. Un second système plus ambitieux (`lib/mission-engine`, `lib/activity-registry`, `components/activities`) existe dans le code mais n'est câblé à aucune page — code mort, sans impact utilisateur. |
| **Professeurs et personnages** | Disponible avec limites | 9 professeurs référents, 13 élèves emblématiques, 24 personnalités secondaires — cohérence vérifiée : chaque `characterLink` des arbres pédagogiques pointe vers un élève-guide actif réel, aucune référence obsolète à un guide rétrogradé. Nuance à trancher en V1.1 : Zoé reste « professeure référente CP » (« Guide des premiers codes ») en parallèle de Kiwi, élève-guide CP officiel — deux rôles légitimes mais qui peuvent prêter à confusion. |

---

## 4. Cohérence du catalogue — corrections apportées

Les points suivants ont été vérifiés et corrigés dans le cadre de cet audit
(aucune nouvelle fonctionnalité, uniquement des corrections de cohérence) :

- **`/carte` affichait Collège et Lycée en statut « Disponible »**, alors que
  l'accueil et les registres de référence (`content/levels/college-statuses.ts`,
  `lycee-statuses.ts`) les marquent honnêtement « à venir ». Corrigé pour
  aligner `/carte` sur la réalité.
- **`/ressources` rendait cliquable n'importe quelle ressource**, y compris
  celles au statut « à venir » ou « en préparation » — la carte pointait vers
  une vraie page de mission (pas de 404), mais présentait comme accessible
  un contenu qui ne l'était pas. Corrigé : seules les ressources au statut
  « disponible » sont désormais cliquables ; les autres affichent
  « Pas encore accessible ».
- **`MaternelleDomainCard` utilisait un test `!== "upcoming"`** au lieu de
  `=== "available"` pour décider si une carte de domaine était cliquable —
  ce qui rendait cliquables 6 cartes (2 domaines × 3 niveaux PS/MS/GS) en
  statut `in-progress`, en violation de la règle du projet (« un lien n'est
  cliquable que si le statut est disponible »). Corrigé. Le même défaut,
  présent dans deux composants non utilisés en production
  (`level-overview.tsx`, `CollegeSubjectPortal.tsx`), a été corrigé par
  cohérence pour ne pas laisser le motif fautif se propager.
- **La route legacy `/primaire/ce1/lecons/[slug]`** lisait un fichier
  « pilote » différent (`content/levels/ce1.ts`) de celui utilisé par la
  page publiée réelle (`content/levels/ce1-learning-tree.ts`). Sans impact
  visible aujourd'hui (aucun des deux fichiers n'a de leçon disponible),
  mais la redirection aurait pu se tromper de cible dès qu'une leçon
  passerait en ligne. Corrigé pour utiliser la source canonique, à
  l'image des routes CP et CE2 équivalentes.

Aucun lien vers un PDF inexistant n'a été trouvé : les 118 hrefs de
`content/cm2-fiches-maths.ts` et les 190 hrefs de
`content/cm2-francais-fiches.ts` correspondent tous, un par un, à un fichier
réellement présent dans `public/fiches/cm2/`. Les compteurs affichés
(nombre de ressources, de séquences) sont tous calculés dynamiquement,
aucun n'est codé en dur.

### Points identifiés mais non corrigés (décisions produit, pas des bugs)

- **4 leçons CM1 rédigées** (`content/levels/cm1.ts`, avec exercices et
  guidance parent) existent mais ne sont jamais publiées : CM1 n'est pas
  dans `PublishedPrimaryLevelSlug`. Contenu prêt mais non branché — à
  arbitrer en V1.1, pas en V1 (CM1 n'est pas dans le périmètre pilote).
- **1 leçon CP rédigée** dans `content/levels/cp.ts` n'est importée nulle
  part — fichier mort.
- **`/programmation` affiche CM2 comme « Disponible »** en tant qu'outil de
  planification (périodes + matières structurées), alors que le contenu
  pédagogique sous-jacent reste partiel (maths = géométrie seule). Le badge
  décrit la disponibilité de l'outil, pas la complétude du programme — une
  ambiguïté à clarifier côté produit plutôt qu'un fait erroné.
- **Incohérence de statut interne** entre `content/cm2-subjects.ts`
  (français = `available`) et le nœud racine français de
  `content/cm2-learning-tree.ts` (`in-progress`) : ce dernier champ n'est
  actuellement affiché nulle part dans l'UI (vérifié), donc sans impact
  utilisateur — à nettoyer en V1.1.

---

## 5. Cohérence pédagogique

- Les titres de leçon correspondent aux compétences déclarées dans les
  arbres pédagogiques ; aucune incohérence titre/compétence détectée sur le
  contenu CM2 réellement publié.
- Les corrigés annoncés sont bien présents pour les fiches CM2 marquées
  disponibles (fichiers `-pdf/` vérifiés existants un par un).
- Les formats PDF annoncés correspondent aux fichiers réels — vérification
  exhaustive faite, aucun mismatch.
- Les personnages liés aux leçons (`characterLink.characterSlug`) sont tous
  cohérents avec les élèves-guides actifs déclarés dans
  `content/students.ts` (CP → Kiwi, CE1 → Gaston, CE2 → Esteban, CM1 →
  Noisette). Le changement récent Kiwi/Zoé (commit `9405465`) est
  correctement propagé partout où il compte : galerie des personnages,
  arbres pédagogiques.
- Les « périodes » affichées (outil `/programmation`, outil enseignant
  Programmation annuelle) sont cohérentes entre elles ; aucune page
  n'affiche de période contradictoire.

---

## 6. Outils enseignants — ce qu'il faut savoir avant de promettre quoi que ce soit

Vrai pour les 24 outils (`components/teacher-*/`) :

- **Ce qui fonctionne** : chaque outil est une application cliente complète
  (formulaires, listes, glisser-déposer pour le plan de classe, génération
  de groupes avec contraintes). Aucune donnée d'exemple factice présentée
  comme réelle.
- **Ce qui est sauvegardé** : uniquement dans le `localStorage` du
  navigateur utilisé. Rien n'est envoyé à un serveur.
- **Ce qui est imprimable** : la majorité des outils ont un bouton
  « Imprimer » (`window.print()`). Exceptions : le Cahier journal et les
  Rituels ont une mise en page imprimable mais pas de bouton dédié (il faut
  utiliser le raccourci navigateur) ; l'outil « Organisation de classe »
  (semaine/priorités) n'a aucun chemin d'impression.
- **Ce qui reste local au navigateur** : tout. Changer d'appareil, vider le
  cache, ou utiliser la navigation privée efface les données sans recours,
  sauf pour les 4 outils couverts par l'export/import manuel (Programmation
  annuelle, Progression de période, Emploi du temps, Cahier journal — voir
  `/enseignants/sauvegardes`).
- **Limites connues** : le Plan de classe est explicitement exclu de
  l'export/sauvegarde tant que l'absence de données nominatives n'est pas
  garantie. 3-4 outils fonctionnels (Conseil d'école, Rendez-vous
  professionnels, Formations) ne sont reliés à aucune navigation — seule
  l'URL directe y mène.
- **Ce qu'il ne faut pas promettre au lancement** : « sauvegarde
  automatique », « cloud », « synchronisation entre appareils », « compte
  enseignant ». Aucun de ces mots n'apparaît dans le code actuel en ce sens
  — à ne jamais introduire dans une communication marketing sans qu'ils
  deviennent vrais.

---

## 7. Pages publiques et messages

Le ton général du site est déjà honnête : de nombreuses pages affichent
explicitement « sans compte ni cloud », « sans synchronisation externe ».
Aucune mention de « intelligence artificielle », « communauté »,
« centaines de ressources », « gratuit », « abonnement » n'a été trouvée —
donc rien à contredire sur ces sujets.

**Un texte factuellement trompeur a été corrigé** : `/carte` marquait
Collège et Lycée « Disponible » (voir section 4). Aucune autre exagération
n'a été trouvée sur les pages vitrines (accueil, univers, méthode, carte).

---

## 8. Pages obligatoires — créées dans le cadre de cet audit

Avant cet audit, **aucune page légale n'existait** : pas de mentions
légales, pas de politique de confidentialité, pas de page contact, pas de
crédits, et aucun lien vers de telles pages dans le header ou le footer.
Ce n'était pas un texte trompeur à corriger, mais une absence bloquante
pour un lancement public (obligation légale française indépendante du
RGPD). Quatre pages ont été créées, reliées depuis le footer :

- **`/mentions-legales`** — éditeur, hébergement, propriété intellectuelle.
  Contient des placeholders clairement marqués « À compléter » pour les
  informations propriétaires manquantes (adresse, SIRET le cas échéant,
  adresse exacte de l'hébergeur).
- **`/confidentialite`** — explique noir sur blanc l'absence de compte,
  l'absence de collecte de données nominatives d'élèves, le fonctionnement
  100 % local des outils enseignants, et l'absence de cookies non
  essentiels (confirmée : aucune dépendance analytics/tracking dans
  `package.json`).
- **`/contact`** — adresse e-mail de contact.
- **`/credits`** — origine de l'univers narratif (création originale),
  avec placeholder pour le détail de sourcing des illustrations.

Aucune bannière cookies n'a été ajoutée : le site ne pose aucun cookie non
essentiel aujourd'hui, elle serait donc trompeuse (fausse impression de
tracking). À réintroduire si un outil d'analytics est ajouté un jour.

**Non corrigé, à trancher avant la mise en ligne réelle** : `app/layout.tsx`
contient un `TODO` non résolu sur le nom de domaine de production
(`https://academie-kerboeuf.fr`, dupliqué dans `app/robots.ts` et
`app/sitemap.ts`), combiné à une indexation déjà activée
(`robots: { index: true }`). Ce n'est pas un texte trompeur au sens du
périmètre de cet audit, mais une décision de configuration à prendre avant
le vrai lancement public.

---

## 9. Limites connues (V1)

- Un seul niveau (CM2) a du contenu pédagogique réellement disponible, et
  seulement dans deux matières, l'une partiellement (maths = géométrie
  seule).
- Aucun compte utilisateur, aucune synchronisation, aucun cloud — assumé et
  documenté, pas une limite cachée.
- Les outils enseignants perdent leurs données si le cache navigateur est
  vidé, sauf export manuel sur 4 outils sur 24.
- Pas de moteur d'activités interactives branché (le code existe mais n'est
  utilisé nulle part) — tout le contenu élève est en PDF imprimable/
  projetable, pas d'exercice auto-corrigé en ligne.
- Les pages légales contiennent des placeholders à compléter avant une
  exploitation commerciale ou une audience élargie.
- Domaine de production non finalisé dans la configuration technique.

## 10. Éléments volontairement exclus de la V1

- Comptes utilisateurs (élèves, enseignants, parents).
- Stockage cloud / synchronisation entre appareils.
- Système de favoris.
- Toute fonctionnalité d'intelligence artificielle.
- Moteur d'activités interactives en ligne (QCM, texte à trous, etc.) —
  le code existe (`lib/activity-registry`) mais reste délibérément non
  exposé tant qu'aucun contenu réel ne l'alimente.
- Ouverture large des niveaux hors CM2 dans la navigation principale
  (décision déjà actée dans `docs/strategie-v1-academie-kerboeuf.md`).

## 11. Éléments à reporter en V1.1

- Brancher les 4 leçons CM1 déjà rédigées (ajouter `cm1` au registre des
  pages publiées).
- Trancher et clarifier le rôle narratif de Zoé (professeure CP) par
  rapport à Kiwi (élève-guide CP officiel).
- Référencer au tableau de bord enseignant les outils actuellement
  accessibles seulement par URL directe (Conseil d'école, Rendez-vous
  professionnels, Formations).
- Nettoyer le code mort identifié (`content/levels/cp.ts`,
  `content/primary-programmation.ts`, `lib/mission-engine` et
  `lib/activity-registry` s'ils restent inutilisés, les deux pages
  orphelines sous `/parcours`).
- Compléter les placeholders des pages légales (adresse, hébergeur, crédit
  détaillé des illustrations) et finaliser le domaine de production.
- Étendre les mathématiques CM2 aux domaines manquants (nombres et calcul,
  proportionnalité, grandeurs et mesures, organisation de données,
  résolution de problèmes) — `content-source/cm2-mathematiques/` contient
  déjà les gabarits vides prêts à être remplis.
- Ajouter un chemin d'impression (bouton dédié) pour le Cahier journal, les
  Rituels et l'outil Organisation de classe.

---

## 12. Checklist de lancement

### Navigation et cohérence

- [x] Aucun lien dans le menu principal ne pointe vers une page vide
- [x] Les niveaux non prêts sont absents du menu ou portent un état
      « Bientôt » explicite (Collège/Lycée corrigés sur `/carte`)
- [x] Aucun bouton « disponible » ne mène à une ressource non disponible
      (`/ressources`, `/maternelle/*` corrigés)
- [x] Aucun `href` ne pointe vers un fichier inexistant (vérifié
      exhaustivement pour CM2, seul catalogue avec PDF réels)
- [ ] Navigation mobile testée sur un appareil réel (non vérifiable dans le
      cadre de cet audit en lecture de code)

### Contenu

- [x] Chaque ressource avec `status: "available"` a un fichier réel
      derrière (vérifié 100 % pour CM2)
- [x] Les statuts passent tous par `getPublicStatusKey()` / façade
      `public-status` — aucun contournement introduit
- [ ] CM1 : décider si les 4 leçons rédigées sont publiées ou repoussées en
      V1.1 (actuellement invisibles, ni promesse ni bug)

### Pages obligatoires

- [x] Mentions légales créées (`/mentions-legales`, placeholders identifiés)
- [x] Politique de confidentialité créée (`/confidentialite`)
- [x] Page contact créée (`/contact`)
- [x] Page crédits créée (`/credits`)
- [x] Liens légaux ajoutés au footer
- [ ] Compléter les placeholders (adresse, hébergeur, SIRET le cas échéant)
      avant l'ouverture publique réelle
- [x] Pas de bandeau cookies nécessaire (aucun cookie non essentiel posé) —
      à réévaluer si un outil d'analytics est ajouté

### Technique

- [ ] `rm -rf .next && npm run lint` sans erreur bloquante
- [ ] `npx tsc --noEmit` propre
- [ ] `npm run build` sans erreur
- [ ] Finaliser le domaine de production (`BASE_URL` dans `app/layout.tsx`,
      `app/robots.ts`, `app/sitemap.ts`) avant d'activer l'indexation
- [ ] Toutes les images référencées existent dans `/public` (vérifié pour
      CM2 ; non vérifié exhaustivement pour les autres niveaux)

### Outils enseignants

- [x] Aucune promesse de cloud/compte/synchronisation dans les textes
      actuels
- [ ] Décider si les outils non reliés au tableau de bord (Conseil
      d'école, Rendez-vous professionnels, Formations) sont promus en V1
      ou repoussés en V1.1

---

*Rapport établi en août 2026, dans la continuité de
`docs/strategie-v1-academie-kerboeuf.md`. À réviser à chaque changement
significatif de périmètre (ouverture d'un second niveau, ajout d'un moteur
interactif, introduction de comptes).*
