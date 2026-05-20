import Link from "next/link";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import { getPublicStatusKey } from "@/content/public-status";
import type { MaternelleDomainEntry } from "@/content/levels/maternelle/types";

type MaternelleDomainCardProps = {
  domain: MaternelleDomainEntry;
  index: number;
};

export function MaternelleDomainCard({
  domain,
  index,
}: MaternelleDomainCardProps) {
  const observables = domain.observables.slice(0, 3);
  const card = (
    <article className="group flex h-full min-h-[22rem] flex-col rounded-md border border-white/10 bg-white/[0.04] p-5 transition hover:border-jade/30 hover:bg-white/[0.065]">
      <div className="flex items-start justify-between gap-3">
        <span className="flex size-8 shrink-0 items-center justify-center rounded border border-white/10 bg-ink/40 text-xs font-black text-muted">
          {index + 1}
        </span>
        <PublicStatusBadge status={domain.status} className="shrink-0" />
      </div>

      <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-jade">
        Domaine {index + 1}
      </p>
      <h2 className="mt-1.5 text-base font-black leading-snug text-foreground">
        {domain.label}
      </h2>
      <p className="mt-3 text-sm leading-6 text-muted">{domain.description}</p>

      <div className="mt-4 border-t border-white/10 pt-4">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
          Observables
        </p>
        <ul className="mt-3 grid gap-2">
          {observables.map((observable) => (
            <li key={observable.id} className="flex items-start gap-2">
              <span
                aria-hidden="true"
                className="mt-2 size-1.5 shrink-0 rounded-full bg-jade/60"
              />
              <span className="text-xs leading-5 text-muted">
                {observable.title}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 border-t border-white/10 pt-4">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
          Ressources prévues
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {domain.resourceSlots.slice(0, 3).map((slot) => (
            <span
              key={slot.kind}
              className="rounded border border-white/10 bg-ink/35 px-2 py-1 text-xs text-muted"
            >
              {slot.label}
            </span>
          ))}
        </div>
      </div>

      {domain.href && (
        <span className="mt-auto pt-5 text-sm font-black text-jade transition group-hover:translate-x-1">
          Ouvrir le domaine
        </span>
      )}
    </article>
  );

  if (!domain.href || getPublicStatusKey(domain.status) === "upcoming") {
    return card;
  }

  return (
    <Link href={domain.href} aria-label={`Ouvrir le domaine ${domain.label}`}>
      {card}
    </Link>
  );
}
