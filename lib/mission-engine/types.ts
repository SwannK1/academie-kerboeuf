// ── Surface de rendu ────────────────────────────────────────────────────────
// Décrit le contexte dans lequel une mission est affichée.
// Chaque activité déclare une stratégie de rendu par surface.
//
//   interactive  → écran, interactions complètes (radios, inputs, feedback)
//   reading      → revue/correction, lecture seule avec réponses visibles
//   print        → CSS print media, pas de couleurs vives, zones d'écriture
//   projection   → texte agrandi, contraste renforcé, sans distracteurs
export type RenderSurface = "interactive" | "reading" | "print" | "projection";

// ── Référence à une compétence ──────────────────────────────────────────────
// Nœud léger dans le graphe de compétences. Ne contient pas la définition
// complète — la définition complète vit dans le graphe de compétences séparé.
// Les traces référencent l'id, pas le label (qui peut évoluer).
export type SkillReference = {
  readonly id: string;
  readonly label: string;
  readonly domain: string;
  readonly cycle?: string;
};

// ── Étape de mission ────────────────────────────────────────────────────────
// Unité atomique d'une mission. Chaque étape encapsule une activité typée
// et ses métadonnées pédagogiques. Le champ activityData est unknown ici :
// sa validation est déléguée au registre d'activités à l'ingestion.
export type MissionStep = {
  readonly id: string;
  readonly activityType: string;
  readonly activityData: unknown;
  readonly isRequired: boolean;
  readonly successCriteria?: readonly string[];
  readonly maxAttempts?: number;
  readonly hints?: readonly string[];
};

// ── Définition de mission ───────────────────────────────────────────────────
// Source de vérité déclarative d'une mission. Immuable une fois publiée.
// Les traces d'apprentissage référencent toujours {id + schemaVersion}
// pour rester valides même si le contenu évolue dans une version future.
export type MissionDefinition = {
  readonly id: string;
  readonly schemaVersion: string;
  readonly slug: string;
  readonly title: string;
  readonly subtitle?: string;
  readonly description: string;
  readonly subject: string;
  readonly cycle: string;
  readonly levelLabel: string;
  readonly skills: readonly SkillReference[];
  readonly steps: readonly MissionStep[];
  // Seuil de réussite exprimé en proportion (0–1). Ex : 0.8 = 80 % des étapes.
  readonly successThreshold: number;
  // Surfaces déclarées supportées par la mission. Permet aux UIs de savoir
  // si elles peuvent afficher les boutons "Projeter" / "Imprimer".
  readonly supportedSurfaces: readonly RenderSurface[];
  readonly metadata: {
    readonly author?: string;
    readonly createdAt: string;
    readonly updatedAt: string;
    readonly qualityStatus?: "draft" | "review" | "validated";
  };
};
