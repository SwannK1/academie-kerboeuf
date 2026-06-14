import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import { cm2SciencesFiches } from "@/content/cm2-sciences-fiches";

export function Cm2SciencesFichesPreview() {
  return (
    <section className="border-t border-white/10 px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 border-b border-white/10 pb-5">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-ember">
            Fiches en préparation
          </p>
          <h2 className="mt-2 text-2xl font-black text-foreground">
            Fiches Sciences et technologie
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            Ces fiches sont en cours de création et seront bientôt disponibles
            au format PDF.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cm2SciencesFiches.map((fiche) => (
            <div
              key={fiche.id}
              className="flex flex-col rounded-md border border-white/10 bg-white/[0.04] p-5"
            >
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
                {fiche.domain}
              </p>
              <h3 className="mt-3 text-lg font-black text-foreground">
                {fiche.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-muted">
                {fiche.skill}
              </p>
              <div className="mt-4">
                <PublicStatusBadge status={fiche.status} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
