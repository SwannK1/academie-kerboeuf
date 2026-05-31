import type { Metadata } from "next";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import {
  cm2Sequences,
  getCm2SequenceDomains,
  getCm2SequencesByDomain,
} from "@/content/cm2-sequences";

export const metadata: Metadata = {
  title: "Séquences CM2 — Cartographie pédagogique | Académie Kerboeuf",
  description:
    "Cartographie des séquences CM2 par domaine et sous-domaine. Structure pédagogique en préparation : une compétence par séquence.",
};

const DOMAIN_ACCENT: Record<string, { text: string; border: string; bg: string }> = {
  "Français":      { text: "text-jade",  border: "border-jade/30",  bg: "bg-jade/[0.06]"  },
  "Mathématiques": { text: "text-gold",  border: "border-gold/30",  bg: "bg-gold/[0.06]"  },
  "Sciences":      { text: "text-sky",   border: "border-sky/30",   bg: "bg-sky/[0.06]"   },
  "Histoire":      { text: "text-ember", border: "border-ember/30", bg: "bg-ember/[0.06]" },
  "Géographie":    { text: "text-sky",   border: "border-sky/25",   bg: "bg-sky/[0.04]"   },
};

const DEFAULT_ACCENT = { text: "text-muted", border: "border-white/15", bg: "bg-white/[0.03]" };

export default function Cm2SequencesPage() {
  const domains = getCm2SequenceDomains();
  const totalSequences = cm2Sequences.length;

  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Primaire", href: "/primaire" },
              { label: "CM2", href: "/primaire/cm2" },
              { label: "Séquences" },
            ]}
          />
        </div>
      </div>

      {/* ── En-tête ─────────────────────────────────────────────────────── */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="inline-flex rounded-md border border-gold/35 bg-gold/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-gold">
            Cycle 3 · CM2
          </p>
          <h1 className="mt-6 max-w-4xl text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Cartographie pédagogique
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted">
            {totalSequences} séquences structurées par domaine et sous-domaine.
            Chaque séquence correspond à une compétence principale.
            Les contenus détaillés sont en cours de préparation.
          </p>
        </div>
      </section>

      {/* ── Séquences par domaine ──────────────────────────────────────── */}
      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-16">
          {domains.map((domain) => {
            const sequences = getCm2SequencesByDomain(domain);
            const accent = DOMAIN_ACCENT[domain] ?? DEFAULT_ACCENT;

            // Regrouper par sous-domaine
            const subdomainMap = new Map<string, typeof sequences>();
            for (const seq of sequences) {
              const existing = subdomainMap.get(seq.subdomain) ?? [];
              subdomainMap.set(seq.subdomain, [...existing, seq]);
            }

            return (
              <div key={domain}>
                {/* En-tête domaine */}
                <div className="mb-8 border-b border-white/10 pb-4">
                  <p className={`text-xs font-bold uppercase tracking-[0.22em] ${accent.text}`}>
                    Domaine
                  </p>
                  <h2 className="mt-2 text-2xl font-black text-foreground sm:text-3xl">
                    {domain}
                  </h2>
                  <p className="mt-1 text-sm text-muted">
                    {sequences.length} séquence{sequences.length > 1 ? "s" : ""}
                  </p>
                </div>

                {/* Sous-domaines */}
                <div className="space-y-8">
                  {Array.from(subdomainMap.entries()).map(([subdomain, seqs]) => (
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
          })}
        </div>
      </section>
    </main>
  );
}

// ── Composant carte séquence ──────────────────────────────────────────────────

type AccentStyle = { text: string; border: string; bg: string };

function SequenceCard({
  seq,
  accent,
}: {
  seq: {
    title: string;
    subdomain: string;
    skill: string;
    status: string;
    felixMethodTag?: string;
    teacherReference?: string;
  };
  accent: AccentStyle;
}) {
  return (
    <div
      className={`flex flex-col gap-3 rounded-md border p-4 ${accent.border} ${accent.bg}`}
    >
      <p className="text-sm font-bold leading-snug text-foreground">
        {seq.title}
      </p>
      <p className="flex-1 text-xs leading-6 text-muted">
        {seq.skill}
      </p>
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
