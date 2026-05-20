import { CurriculumEntryRow } from "@/components/academy/curriculum-entry-row";
import type { CurriculumDomainMap } from "@/content/curriculum-map-types";

type CurriculumMapSectionProps = {
  domain: CurriculumDomainMap;
};

export function CurriculumMapSection({ domain }: CurriculumMapSectionProps) {
  return (
    <section aria-labelledby={`domain-${domain.domainSlug}`}>
      <div className="rounded-md border border-white/10 bg-white/[0.02]">
        <div className="border-b border-white/10 px-4 py-3">
          <p
            id={`domain-${domain.domainSlug}`}
            className="text-sm font-bold text-foreground"
          >
            {domain.label}
          </p>
        </div>
        <div className="divide-y divide-white/[0.06] px-4">
          {domain.subdomains.map((subdomain) => (
            <div key={subdomain.subdomainSlug} className="py-3">
              <p
                className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-muted"
                id={`subdomain-${subdomain.subdomainSlug}`}
              >
                {subdomain.label}
              </p>
              <div
                className="grid gap-3 lg:grid-cols-2 2xl:grid-cols-3"
                role="list"
                aria-labelledby={`subdomain-${subdomain.subdomainSlug}`}
              >
                {subdomain.entries.map((entry) => (
                  <div key={entry.id} role="listitem">
                    <CurriculumEntryRow entry={entry} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
