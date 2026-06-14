import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import { cm2SciencesFiches } from "@/content/cm2-sciences-fiches";
import { CM2_ACCENT } from "@/lib/cm2-accent";

export function Cm2SciencesFichesPreview() {
  const t = CM2_ACCENT.ember;

  const domains = Array.from(new Set(cm2SciencesFiches.map((f) => f.domain)));

  return (
    <section className="border-t border-white/10 px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 border-b border-white/10 pb-5">
          <p className={`text-xs font-bold uppercase tracking-[0.22em] ${t.text}`}>
            Ressources
          </p>
          <h2 className="mt-2 text-2xl font-black text-foreground">
            Fiches imprimables Sciences CM2
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            Leçon, exercices, correction, projection et fiche parent à venir pour
            chaque compétence.
          </p>
        </div>

        <div className="space-y-5">
          {domains.map((domain) => {
            const fiches = cm2SciencesFiches.filter((f) => f.domain === domain);
            return (
              <div
                key={domain}
                className="rounded-md border border-white/10 bg-white/[0.025] p-5"
              >
                <h3 className="text-sm font-black text-foreground">{domain}</h3>
                <ul className="mt-3 space-y-2">
                  {fiches.map((fiche) => (
                    <li
                      key={fiche.id}
                      className="flex flex-col gap-2 rounded border border-white/5 bg-white/[0.02] p-3 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
                          {fiche.skill}
                        </p>
                        <p className="mt-1 text-sm text-foreground">{fiche.title}</p>
                      </div>
                      <PublicStatusBadge status={fiche.status} className="w-fit shrink-0" />
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
