import Link from "next/link";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import {
  isPedagogicalResourceAbsent,
  isPedagogicalResourceLinkable,
} from "@/content/pedagogical-resources";
import type {
  AnnualLearningPath,
  LearningCompetency,
  ResourceSlot,
  TeachingSequence,
} from "@/content/learning-architecture-types";
import { getPublicStatusKey } from "@/content/public-status";

type CompetencyCardProps = {
  competency: LearningCompetency;
};

type AnnualPathCardProps = {
  path: AnnualLearningPath;
};

export function CompetencyCard({ competency }: CompetencyCardProps) {
  const statusKey = getPublicStatusKey(competency.status);
  const isUpcoming = statusKey === "upcoming";

  return (
    <article
      className={[
        "flex min-h-full flex-col rounded-md border border-white/10 bg-white/[0.04] p-4",
        isUpcoming ? "opacity-65" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-sky">
            {competency.levelSlug.toUpperCase()} · {competency.subject}
          </p>
          <h3 className="mt-2 text-lg font-black leading-snug text-foreground">
            {competency.title}
          </h3>
        </div>
        <PublicStatusBadge status={competency.status} className="shrink-0" />
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        <span className="rounded border border-white/10 bg-ink/30 px-2 py-1 text-xs font-bold text-muted">
          {formatTaxonomyLabel(competency.domainSlug)}
        </span>
        <span className="rounded border border-white/10 bg-ink/30 px-2 py-1 text-xs font-bold text-muted">
          {formatTaxonomyLabel(competency.subdomainSlug)}
        </span>
        <span className="rounded border border-sky/25 bg-sky/10 px-2 py-1 text-xs font-bold text-sky">
          Compétence structurée
        </span>
      </div>

      <ResourceSlotsSummary slots={competency.resourceSlots} />

      <details className="mt-4 border-t border-white/10 pt-3">
        <summary className="cursor-pointer select-none text-xs font-bold uppercase tracking-[0.14em] text-muted transition hover:text-foreground">
          Détail de structuration
        </summary>

        <div className="mt-3 grid gap-4">
          <section>
            <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
              Objectif observable
            </h4>
            <p className="mt-1 text-sm leading-6 text-muted">
              {competency.observableObjective}
            </p>
          </section>

          {competency.successCriteria.length > 0 && (
            <section>
              <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
                Critères de réussite
              </h4>
              <ul className="mt-2 grid gap-1.5">
                {competency.successCriteria.map((criterion) => (
                  <li
                    key={criterion}
                    className="flex gap-2 text-xs leading-5 text-muted"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 size-1 shrink-0 rounded-full bg-sky/60"
                    />
                    <span>{criterion}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <TeachingSequencePreview sequence={competency.sequence} />

          <ResourceSlotsDetail slots={competency.resourceSlots} />
        </div>
      </details>
    </article>
  );
}

export function AnnualPathCard({ path }: AnnualPathCardProps) {
  const statusKey = getPublicStatusKey(path.status);
  const isUpcoming = statusKey === "upcoming";

  return (
    <article
      className={[
        "flex min-h-full flex-col rounded-md border border-white/10 bg-white/[0.04] p-5",
        isUpcoming ? "opacity-65" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">
            {path.levelSlug.toUpperCase()} · {path.subject}
          </p>
          <h3 className="mt-3 text-xl font-black text-foreground">
            {path.title}
          </h3>
        </div>
        <PublicStatusBadge status={path.status} className="shrink-0" />
      </div>

      <p className="mt-4 text-sm leading-7 text-muted">
        {path.annualObjective}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded border border-white/10 bg-white/[0.04] px-2 py-1 text-xs font-bold uppercase tracking-[0.12em] text-muted">
          {path.durationLabel}
        </span>
        <span className="rounded border border-white/10 bg-white/[0.04] px-2 py-1 text-xs font-bold uppercase tracking-[0.12em] text-muted">
          {path.weekCount} semaines
        </span>
      </div>

      <ol className="mt-5 grid gap-2">
        {path.weeks.slice(0, 3).map((week) => (
          <li
            key={`${path.id}-${week.week}`}
            className="rounded border border-white/10 bg-ink/30 px-3 py-2"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
                Semaine {week.week}
              </p>
              <PublicStatusBadge status={week.status} />
            </div>
            <p className="mt-2 text-sm font-bold text-foreground">{week.title}</p>
            <p className="mt-1 text-xs leading-5 text-muted">{week.focus}</p>
          </li>
        ))}
      </ol>
    </article>
  );
}

export function TeachingSequencePreview({
  sequence,
}: {
  sequence: TeachingSequence;
}) {
  const steps = sequence.steps
    .slice()
    .sort((a, b) => a.order - b.order)
    .slice(0, 3);

  if (steps.length === 0) return null;

  return (
    <section>
      <div className="flex items-center justify-between gap-3">
        <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
          Séquence · {sequence.title}
        </h4>
        <PublicStatusBadge status={sequence.status} />
      </div>
      <ol className="mt-2 grid gap-2">
        {steps.map((step) => (
          <li key={step.id} className="flex gap-3 text-xs leading-5 text-muted">
            <span className="font-mono font-black text-sky">
              {step.order}
            </span>
            <span>
              <span className="font-bold text-foreground">{step.title}</span>
              {" · "}
              {step.objective}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}

function ResourceSlotsSummary({ slots }: { slots?: ResourceSlot[] }) {
  if (!slots?.length) {
    return (
      <p className="mt-3 rounded border border-white/10 bg-ink/30 px-3 py-2 text-xs font-bold text-muted">
        Ressources PDF prévues
      </p>
    );
  }

  const visibleLabels = slots.slice(0, 3).map((slot) => slot.label);
  const remainingCount = Math.max(slots.length - visibleLabels.length, 0);

  return (
    <div className="mt-3 rounded border border-white/10 bg-ink/30 px-3 py-2">
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted">
        {slots.length} ressources PDF prévues
      </p>
      <p className="mt-1 text-xs leading-5 text-muted">
        {visibleLabels.join(" · ")}
        {remainingCount > 0 ? ` · +${remainingCount}` : ""}
      </p>
    </div>
  );
}

function ResourceSlotsDetail({ slots }: { slots?: ResourceSlot[] }) {
  if (!slots?.length) return null;

  const allAbsent = slots.every((slot) => !slot.resource);

  if (allAbsent) {
    return (
      <section>
        <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
          Ressources prévues
        </h4>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {slots.map((slot) => (
            <span
              key={slot.kind}
              className="rounded border border-white/10 bg-ink/30 px-2 py-1 text-xs text-muted"
            >
              {slot.label}
            </span>
          ))}
        </div>
      </section>
    );
  }

  return <ResourceSlotList slots={slots} />;
}

export function ResourceSlotList({ slots }: { slots: ResourceSlot[] }) {
  return (
    <dl className="grid gap-2">
      {slots.map((slot) => {
        const resource = slot.resource;
        const isAbsent = isPedagogicalResourceAbsent(resource);
        const isLinkable = isPedagogicalResourceLinkable(resource);

        return (
          <div
            key={slot.kind}
            className="rounded border border-white/10 bg-ink/30 px-3 py-2"
          >
            <dt className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
              {slot.label}
            </dt>
            <dd className="mt-2">
              {isAbsent ? (
                <span className="text-xs font-bold text-white/40">Absente</span>
              ) : isLinkable ? (
                <Link
                  href={resource.href}
                  className="inline-flex rounded border border-jade/35 bg-jade/10 px-2.5 py-1 text-xs font-bold uppercase tracking-[0.12em] text-jade transition hover:bg-jade/20"
                >
                  Ouvrir le PDF
                </Link>
              ) : (
                <PublicStatusBadge status={resource?.status} />
              )}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}

function formatTaxonomyLabel(slug: string) {
  const override = taxonomyLabelOverrides[slug];
  if (override) return override;

  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

const taxonomyLabelOverrides: Record<string, string> = {
  antiquite: "Antiquité",
  "calcul-mental": "Calcul mental",
  "calcul-pose": "Calcul posé",
  decodage: "Décodage",
  ecriture: "Écriture",
  "espace-temps": "Espace et temps",
  "etude-de-la-langue": "Étude de la langue",
  francais: "Français",
  geographie: "Géographie",
  geometrie: "Géométrie",
  "grandeurs-mesures": "Grandeurs et mesures",
  "histoire-geographie": "Histoire-Géographie",
  "lecture-comprehension": "Lecture compréhension",
  "mathematiques": "Mathématiques",
  "matiere-objets": "Matière et objets",
  numeration: "Numération",
  "questionner-le-monde": "Questionner le monde",
};
