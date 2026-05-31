import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import { getCm2SequenceDomains, getCm2SequencesByDomain } from "@/content/cm2-sequences";
import type { Cm2Sequence } from "@/content/cm2-sequences";

type AccentStyle = { text: string; border: string; bg: string };

const DOMAIN_ACCENT: Record<string, AccentStyle> = {
  "Français":      { text: "text-jade",  border: "border-jade/30",  bg: "bg-jade/[0.06]"  },
  "Mathématiques": { text: "text-gold",  border: "border-gold/30",  bg: "bg-gold/[0.06]"  },
  "Sciences":      { text: "text-sky",   border: "border-sky/30",   bg: "bg-sky/[0.06]"   },
  "Histoire":      { text: "text-ember", border: "border-ember/30", bg: "bg-ember/[0.06]" },
  "Géographie":    { text: "text-sky",   border: "border-sky/25",   bg: "bg-sky/[0.04]"   },
};

const DEFAULT_ACCENT: AccentStyle = {
  text: "text-muted",
  border: "border-white/15",
  bg: "bg-white/[0.03]",
};

function groupBySubdomain(sequences: Cm2Sequence[]): Map<string, Cm2Sequence[]> {
  const map = new Map<string, Cm2Sequence[]>();
  for (const seq of sequences) {
    map.set(seq.subdomain, [...(map.get(seq.subdomain) ?? []), seq]);
  }
  return map;
}

// ── Carte d'une séquence ──────────────────────────────────────────────────────

function SequenceCard({ seq, accent }: { seq: Cm2Sequence; accent: AccentStyle }) {
  return (
    <div className={`flex flex-col gap-3 rounded-md border p-4 ${accent.border} ${accent.bg}`}>
      <p className="text-sm font-bold leading-snug text-foreground">{seq.title}</p>
      <p className="flex-1 text-xs leading-6 text-muted">{seq.skill}</p>
      <div className="flex flex-wrap items-center gap-2 border-t border-white/10 pt-3">
        <PublicStatusBadge status={seq.status} />
        {seq.felixMethodTag ? (
          <span className="rounded border border-white/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white/30">
            {seq.felixMethodTag}
          </span>
        ) : null}
      </div>
    </div>
  );
}

// ── Groupe domaine + sous-domaines ────────────────────────────────────────────

function DomainGroup({ domain }: { domain: string }) {
  const sequences = getCm2SequencesByDomain(domain);
  const accent = DOMAIN_ACCENT[domain] ?? DEFAULT_ACCENT;
  const subdomains = groupBySubdomain(sequences);

  return (
    <div>
      <div className="mb-8 border-b border-white/10 pb-4">
        <p className={`text-xs font-bold uppercase tracking-[0.22em] ${accent.text}`}>
          Domaine
        </p>
        <h2 className="mt-2 text-2xl font-black text-foreground sm:text-3xl">{domain}</h2>
        <p className="mt-1 text-sm text-muted">
          {sequences.length} séquence{sequences.length > 1 ? "s" : ""}
        </p>
      </div>

      <div className="space-y-8">
        {Array.from(subdomains.entries()).map(([subdomain, seqs]) => (
          <div key={subdomain}>
            <p className={`mb-4 text-xs font-bold uppercase tracking-[0.18em] ${accent.text}`}>
              {subdomain}
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {seqs.map((seq) => (
                <SequenceCard key={seq.slug} seq={seq} accent={accent} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Registre complet ──────────────────────────────────────────────────────────

export function Cm2SequenceRegistry() {
  const domains = getCm2SequenceDomains();

  return (
    <div className="space-y-16">
      {domains.map((domain) => (
        <DomainGroup key={domain} domain={domain} />
      ))}
    </div>
  );
}
