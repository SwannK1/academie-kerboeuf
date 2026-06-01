import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import type {
  MaternelleSubdomain,
  MaternelleWorkshop,
  MaternelleObservationGrid,
  MaternelleSequence,
} from "@/content/levels/maternelle/types";

type MaternelleSubdomainListProps = {
  subdomains?: MaternelleSubdomain[];
  title?: string;
  description?: string;
};

export function MaternelleSubdomainList({
  subdomains,
  title = "Séquences structurées",
  description,
}: MaternelleSubdomainListProps) {
  if (!subdomains || subdomains.length === 0) return null;

  return (
    <section className="px-4 pb-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-5">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-jade">
            Séquences structurées
          </p>
          <h2 className="mt-1 text-xl font-black text-foreground">{title}</h2>
          {description && (
            <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
          )}
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {subdomains.map((subdomain) => (
            <SubdomainCard key={subdomain.id} subdomain={subdomain} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Carte sous-domaine ────────────────────────────────────────────────────────

function SubdomainCard({ subdomain }: { subdomain: MaternelleSubdomain }) {
  return (
    <article className="flex flex-col rounded-md border border-white/10 bg-white/[0.035] p-5">
      {/* En-tête */}
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-jade">
          Sous-domaine
        </p>
        <PublicStatusBadge status={subdomain.status} className="shrink-0" />
      </div>
      <h3 className="mt-2 text-base font-black leading-snug text-foreground">
        {subdomain.label}
      </h3>
      <p className="mt-2 text-xs leading-5 text-muted">{subdomain.description}</p>

      {/* Séquences */}
      {subdomain.sequences.length > 0 && (
        <div className="mt-4 border-t border-white/10 pt-4">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted">
            {subdomain.sequences.length === 1
              ? "Séquence prévue"
              : `${subdomain.sequences.length} séquences prévues`}
          </p>
          <div className="mt-2 grid gap-3">
            {subdomain.sequences.map((sequence) => (
              <SequenceRow key={sequence.id} sequence={sequence} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

function SequenceRow({ sequence }: { sequence: MaternelleSequence }) {
  const workshop: MaternelleWorkshop | undefined = sequence.workshops[0];
  const grid: MaternelleObservationGrid | undefined =
    workshop?.observationGrid;

  return (
    <div className="rounded border border-white/10 bg-ink/20 p-3">
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-bold leading-snug text-foreground">
          {sequence.title}
        </p>
        <PublicStatusBadge status={sequence.status} className="mt-0.5 shrink-0" />
      </div>
      <SequenceMeta
        periodLabel={sequence.periodLabel}
        sessionCount={sequence.sessionCount}
        estimatedDuration={sequence.estimatedDuration}
      />
      {sequence.observableSkills && sequence.observableSkills.length > 0 && (
        <p className="mt-1.5 text-xs leading-5 text-muted">
          {sequence.observableSkills[0]}
        </p>
      )}

      {/* Atelier principal */}
      {workshop && (
        <div className="mt-2 border-t border-white/10 pt-2">
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-muted">
            Atelier
          </p>
          <p className="mt-1 text-xs font-bold text-foreground">
            {workshop.title}
          </p>
          <WorkshopMeta
            duration={workshop.duration}
            groupSize={workshop.groupSize}
          />
          {sequence.workshops.length > 1 && (
            <p className="mt-1 text-xs text-muted">
              +{sequence.workshops.length - 1} autre
              {sequence.workshops.length > 2 ? "s" : ""} atelier
              {sequence.workshops.length > 2 ? "s" : ""}
            </p>
          )}
        </div>
      )}

      {/* Grille d'observation */}
      {grid && (
        <div className="mt-2 border-t border-white/10 pt-2">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs text-muted">{grid.title}</p>
            <PublicStatusBadge status={grid.status} />
          </div>
          {grid.criteria.length > 0 && (
            <p className="mt-0.5 text-xs text-muted">
              {grid.criteria.length} critère
              {grid.criteria.length > 1 ? "s" : ""}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// ── Helpers d'affichage des métadonnées ───────────────────────────────────────

function SequenceMeta({
  periodLabel,
  sessionCount,
  estimatedDuration,
}: {
  periodLabel?: string;
  sessionCount?: number;
  estimatedDuration?: string;
}) {
  const parts = [
    periodLabel,
    sessionCount != null ? `${sessionCount} séance${sessionCount > 1 ? "s" : ""}` : undefined,
    estimatedDuration,
  ].filter(Boolean);
  if (parts.length === 0) return null;
  return (
    <p className="mt-0.5 text-xs text-muted">{parts.join(" · ")}</p>
  );
}

function WorkshopMeta({
  duration,
  groupSize,
}: {
  duration?: string;
  groupSize?: string;
}) {
  if (!duration && !groupSize) return null;
  return (
    <p className="mt-0.5 text-xs text-muted">
      {[duration, groupSize].filter(Boolean).join(" · ")}
    </p>
  );
}
