"use client";

// ── ActivityRenderer — point central de dispatch ──────────────────────────────
//
// Ce composant est le seul endroit qui connaît la liste des activités enregistrées.
// Il importe chaque renderer pour déclencher l'enregistrement dans le registre,
// puis dispatch vers le bon renderer selon activity.type.
//
// Pour ajouter un nouveau type d'activité :
//   1. Définir son type dans lib/activity-registry/types.ts (discriminated union)
//   2. Créer son renderer dans components/activities/<type>/<Type>Activity.tsx
//   3. Importer et enregistrer ici avec registerActivity(...)
//   4. C'est tout — le moteur de mission n'a pas besoin d'être modifié.
// ─────────────────────────────────────────────────────────────────────────────

import { createElement } from "react";
import { registerActivity } from "@/lib/activity-registry/registry";
import type {
  ActivityData,
  ActivityRendererProps,
} from "@/lib/activity-registry/types";
import type { RenderSurface } from "@/lib/mission-engine/types";

import { QcmActivity } from "@/components/activities/qcm/QcmActivity";
import { FreeTextActivity } from "@/components/activities/free-text/FreeTextActivity";
import { FillBlankActivity } from "@/components/activities/fill-blank/FillBlankActivity";
import { ReadingComprehensionActivity } from "@/components/activities/reading-comprehension/ReadingComprehensionActivity";

// ── Enregistrement ──────────────────────────────────────────────────────────
// Ces appels s'exécutent une seule fois à l'initialisation du module.
// Le cast `as` est intentionnel : le registre stocke sous le type de base
// commun ; la clé `type` garantit la cohérence à l'usage.

registerActivity(
  "QCM",
  QcmActivity as React.ComponentType<ActivityRendererProps<ActivityData>>,
);
registerActivity(
  "FREE_TEXT",
  FreeTextActivity as React.ComponentType<ActivityRendererProps<ActivityData>>,
);
registerActivity(
  "FILL_BLANK",
  FillBlankActivity as React.ComponentType<ActivityRendererProps<ActivityData>>,
);
registerActivity(
  "READING_COMPREHENSION",
  ReadingComprehensionActivity as React.ComponentType<
    ActivityRendererProps<ActivityData>
  >,
);

// ── Import du registre après enregistrement ──────────────────────────────────
import { getActivityRenderer } from "@/lib/activity-registry/registry";

// ── Props publiques ──────────────────────────────────────────────────────────
type ActivityRendererPublicProps = {
  activity: ActivityData;
  surface: RenderSurface;
  showCorrection?: boolean;
  onAnswer?: (answer: string) => void;
};

// ── Composant principal ──────────────────────────────────────────────────────
export function ActivityRenderer({
  activity,
  surface,
  showCorrection = false,
  onAnswer,
}: ActivityRendererPublicProps) {
  const Renderer = getActivityRenderer(activity.type);

  if (!Renderer) {
    return (
      <ActivityNotRegistered
        type={activity.type}
        surface={surface}
      />
    );
  }

  return createElement(Renderer, { activity, surface, showCorrection, onAnswer });
}

// ── Fallback type non enregistré ─────────────────────────────────────────────
function ActivityNotRegistered({
  type,
  surface,
}: {
  type: string;
  surface: RenderSurface;
}) {
  if (surface === "print" || surface === "projection") {
    return (
      <p className="text-sm text-muted italic">
        [Activité de type «{type}» — rendu non disponible]
      </p>
    );
  }

  return (
    <div
      role="alert"
      className="rounded border border-ember/25 bg-ember/10 p-4 text-sm"
    >
      <span className="font-bold text-ember">
        Type d&apos;activité non enregistré :
      </span>
      <code className="ml-2 rounded bg-white/10 px-1 py-0.5 text-xs text-foreground">
        {type}
      </code>
      {process.env.NODE_ENV === "development" && (
        <p className="mt-2 text-xs text-muted">
          Enregistrez ce type dans{" "}
          <code className="rounded bg-white/10 px-1">
            components/activities/ActivityRenderer.tsx
          </code>
        </p>
      )}
    </div>
  );
}
