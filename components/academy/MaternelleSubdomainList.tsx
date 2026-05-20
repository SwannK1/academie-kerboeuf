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
  const sequence: MaternelleSequence | undefined = subdomain.sequences[0];
  const workshop: MaternelleWorkshop | undefined = sequence?.workshops[0];
  const grid: MaternelleObservationGrid | undefined =
    workshop?.observationGrid;

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

      {/* Séquence */}
      {sequence && (
        <div className="mt-4 border-t border-white/10 pt-4">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted">
            Séquence prévue
          </p>
          <p className="mt-1.5 text-sm font-bold text-foreground">
            {sequence.title}
          </p>
          <SequenceMeta
            periodLabel={sequence.periodLabel}
            estimatedDuration={sequence.estimatedDuration}
          />
          <PublicStatusBadge status={sequence.status} className="mt-2" />
        </div>
      )}

      {/* Atelier */}
      {workshop && (
        <div className="mt-4 border-t border-white/10 pt-4">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted">
            Atelier prévu
          </p>
          <p className="mt-1.5 text-sm font-bold text-foreground">
            {workshop.title}
          </p>
          <WorkshopMeta
            duration={workshop.duration}
            groupSize={workshop.groupSize}
          />
          <PublicStatusBadge status={workshop.status} className="mt-2" />
        </div>
      )}

      {/* Grille d'observation */}
      {grid && (
        <div className="mt-4 border-t border-white/10 pt-4">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted">
            Grille d&apos;observation
          </p>
          <p className="mt-1.5 text-xs text-foreground">{grid.title}</p>
          {grid.criteria.length > 0 && (
            <p className="mt-1 text-xs text-muted">
              {grid.criteria.length} critère
              {grid.criteria.length > 1 ? "s" : ""} prévu
              {grid.criteria.length > 1 ? "s" : ""}
            </p>
          )}
          <PublicStatusBadge status={grid.status} className="mt-2" />
        </div>
      )}
    </article>
  );
}

// ── Helpers d'affichage des métadonnées ───────────────────────────────────────

function SequenceMeta({
  periodLabel,
  estimatedDuration,
}: {
  periodLabel?: string;
  estimatedDuration?: string;
}) {
  if (!periodLabel && !estimatedDuration) return null;
  return (
    <p className="mt-0.5 text-xs text-muted">
      {[periodLabel, estimatedDuration].filter(Boolean).join(" · ")}
    </p>
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
