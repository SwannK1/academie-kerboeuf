import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import type { Cm2Sequence } from "@/content/cm2-sequences";

type SequenceDomainGroup = {
  domain: string;
  subdomains: {
    subdomain: string;
    sequences: Cm2Sequence[];
  }[];
};

type SequenceRegistryProps = {
  groups: SequenceDomainGroup[];
};

export function SequenceRegistry({ groups }: SequenceRegistryProps) {
  return (
    <div className="grid gap-5">
      {groups.map((group) => (
        <section
          key={group.domain}
          id={domainId(group.domain)}
          className="cm2-print-section scroll-mt-24 rounded-md border border-white/10 bg-white/[0.035] p-5 sm:p-6"
          aria-labelledby={`${domainId(group.domain)}-title`}
        >
          <div className="flex flex-col gap-2 border-b border-white/10 pb-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">
                Domaine
              </p>
              <h2
                id={`${domainId(group.domain)}-title`}
                className="mt-2 text-2xl font-black text-foreground"
              >
                {group.domain}
              </h2>
            </div>
            <p className="text-sm font-bold text-muted">
              {countSequences(group)} compétence
              {countSequences(group) > 1 ? "s" : ""}
            </p>
          </div>

          <div className="mt-5 grid gap-4">
            {group.subdomains.map((subdomain) => (
              <section
                key={subdomain.subdomain}
                className="rounded border border-white/10 bg-ink/35 p-4"
                aria-labelledby={`${domainId(group.domain)}-${domainId(subdomain.subdomain)}-title`}
              >
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <h3
                    id={`${domainId(group.domain)}-${domainId(subdomain.subdomain)}-title`}
                    className="text-base font-black text-foreground"
                  >
                    {subdomain.subdomain}
                  </h3>
                  <span className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
                    {subdomain.sequences.length} séquence
                    {subdomain.sequences.length > 1 ? "s" : ""}
                  </span>
                </div>

                <ol className="mt-4 grid gap-3">
                  {subdomain.sequences.map((sequence) => (
                    <li
                      key={sequence.slug}
                      className="grid gap-3 rounded border border-white/10 bg-white/[0.035] p-4 md:grid-cols-[minmax(0,1fr)_auto]"
                    >
                      <div>
                        <p className="text-sm font-black text-foreground">
                          {sequence.title}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-muted">
                          {sequence.skill}
                        </p>
                      </div>
                      <div className="flex items-start md:justify-end">
                        <PublicStatusBadge status={sequence.status} />
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export function domainId(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function countSequences(group: SequenceDomainGroup) {
  return group.subdomains.reduce(
    (total, subdomain) => total + subdomain.sequences.length,
    0,
  );
}
