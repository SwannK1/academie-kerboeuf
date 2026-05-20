import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import {
  isPedagogicalResourceLinkable,
} from "@/content/pedagogical-resources";
import type { CurriculumEntry } from "@/content/curriculum-map-types";
import type { ResourceSlot } from "@/content/learning-architecture-types";

type CurriculumEntryRowProps = {
  entry: CurriculumEntry;
};

export function CurriculumEntryRow({ entry }: CurriculumEntryRowProps) {
  return (
    <article className="flex h-full flex-col gap-3 rounded border border-white/[0.08] bg-white/[0.03] p-3">
      <div className="flex-1">
        <div className="flex items-start justify-between gap-3">
          <p className="text-sm font-bold leading-5 text-foreground">
            {entry.title}
          </p>
          <PublicStatusBadge status={entry.status} className="shrink-0" />
        </div>
        <p className="mt-1.5 text-xs leading-5 text-muted">
          {entry.observableObjective}
        </p>
        {entry.successCriteria.length > 0 && (
          <ul className="mt-2 grid gap-1" aria-label="Critères de réussite">
            {entry.successCriteria.slice(0, 1).map((criterion) => (
              <li key={criterion} className="flex gap-2 text-xs leading-5 text-muted">
                <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-sky/40" />
                <span>{criterion}</span>
              </li>
            ))}
            {entry.successCriteria.length > 1 && (
              <li className="pl-3 text-xs leading-5 text-muted/70">
                +{entry.successCriteria.length - 1} critères
              </li>
            )}
          </ul>
        )}
        {entry.resourceSlots && entry.resourceSlots.length > 0 && (
          <ResourceSlotList slots={entry.resourceSlots} />
        )}
        {entry.teacherHint && (
          <p className="mt-2 text-xs italic leading-5 text-muted/70">
            {entry.teacherHint}
          </p>
        )}
      </div>
    </article>
  );
}

type ResourceSlotListProps = {
  slots: ResourceSlot[];
};

function ResourceSlotList({ slots }: ResourceSlotListProps) {
  const linkableSlots = slots.filter((slot) =>
    isPedagogicalResourceLinkable(slot.resource),
  );
  const plannedCount = slots.filter(
    (slot) =>
      slot.resource?.status !== "missing" &&
      !isPedagogicalResourceLinkable(slot.resource),
  ).length;

  return (
    <div className="mt-3 flex flex-wrap items-center gap-1.5" aria-label="Ressources prévues">
      {linkableSlots.map((slot) => (
        <a
          key={slot.kind}
          href={slot.resource?.href}
          className="inline-flex items-center rounded border border-jade/35 bg-jade/10 px-2 py-0.5 text-xs font-bold text-jade transition hover:bg-jade/20"
        >
          {slot.label}
        </a>
      ))}

      {plannedCount > 0 && (
        <>
          <span
            className="inline-flex items-center rounded border border-white/[0.08] bg-ink/40 px-2 py-0.5 text-xs text-muted"
          >
            {plannedCount} ressource{plannedCount > 1 ? "s" : ""} PDF
          </span>
          <PublicStatusBadge status="planned" />
        </>
      )}
    </div>
  );
}
