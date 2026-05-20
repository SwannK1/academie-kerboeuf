import type { Metadata } from "next";
import Link from "next/link";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { cm2Subjects, type Cm2Subject } from "@/content/cm2-subjects";
import { getPublicStatusKey } from "@/content/public-status";

export const metadata: Metadata = {
  title: "Matières CM2 | Académie Kerboeuf",
  description:
    "Les 8 matières du programme CM2 à l'Académie Kerboeuf : Français, Mathématiques, Histoire-Géographie, Sciences, EMC, Anglais, Arts, EPS.",
};

const ACCENT: Record<
  string,
  { text: string; border: string; hoverBorder: string; hoverBg: string }
> = {
  jade:  { text: "text-jade",  border: "border-jade/30",  hoverBorder: "hover:border-jade/55",  hoverBg: "hover:bg-jade/[0.08]"  },
  gold:  { text: "text-gold",  border: "border-gold/30",  hoverBorder: "hover:border-gold/55",  hoverBg: "hover:bg-gold/[0.08]"  },
  sky:   { text: "text-sky",   border: "border-sky/30",   hoverBorder: "hover:border-sky/55",   hoverBg: "hover:bg-sky/[0.08]"   },
  ember: { text: "text-ember", border: "border-ember/30", hoverBorder: "hover:border-ember/55", hoverBg: "hover:bg-ember/[0.08]" },
};

export default function Cm2MatieresPage() {
  const available = cm2Subjects.filter((s) => getPublicStatusKey(s.status) === "available");
  const upcoming  = cm2Subjects.filter((s) => getPublicStatusKey(s.status) !== "available");

  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[
              { label: "Accueil",  href: "/"            },
              { label: "Primaire", href: "/primaire"    },
              { label: "CM2",      href: "/primaire/cm2"},
              { label: "Matières"                       },
            ]}
          />
        </div>
      </div>

      {/* ── En-tête ───────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        <div className="mission-grid absolute inset-0 -z-20 opacity-20" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,8,7,0.03),rgba(9,16,15,0.95))]" />
        <div className="mx-auto max-w-7xl">
          <p className="inline-flex rounded-md border border-jade/35 bg-jade/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Programmes CM2
          </p>
          <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.98] text-foreground sm:text-6xl">
            Les matières du CM2
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">
            Chaque matière est structurée en domaines et notions. Les missions
            s&apos;y rattachent progressivement au fil de l&apos;année.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/primaire/cm2"
              className="rounded-md border border-white/15 bg-white/[0.05] px-5 py-3 text-sm font-bold text-foreground transition hover:bg-white/10"
            >
              ← Retour CM2
            </Link>
            <Link
              href="/primaire/cm2/missions"
              className="rounded-md border border-gold/35 bg-gold/10 px-5 py-3 text-sm font-bold text-gold transition hover:bg-gold hover:text-ink"
            >
              Toutes les missions CM2
            </Link>
          </div>
        </div>
      </section>

      {/* ── Matières disponibles ──────────────────────────────────────────── */}
      {available.length > 0 ? (
        <section className="px-4 pb-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6 border-b border-white/10 pb-5">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
                Missions disponibles
              </p>
              <h2 className="mt-2 text-2xl font-black text-foreground">
                Matières structurées
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {available.map((subject) => (
                <SubjectCard key={subject.slug} subject={subject} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* ── Matières à venir ──────────────────────────────────────────────── */}
      {upcoming.length > 0 ? (
        <section className="border-t border-white/10 px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6 pb-5">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted">
                À structurer
              </p>
              <h2 className="mt-2 text-2xl font-black text-foreground">
                Matières en attente de missions
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {upcoming.map((subject) => (
                <SubjectCard key={subject.slug} subject={subject} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}

function SubjectCard({ subject }: { subject: Cm2Subject }) {
  const t = ACCENT[subject.accent];
  const isAvailable = getPublicStatusKey(subject.status) === "available";
  const card = (
    <article
      className={`group flex min-h-full flex-col rounded-md border p-5 transition ${
        isAvailable
          ? `${t.border} bg-white/[0.04] hover:-translate-y-0.5 ${t.hoverBorder} ${t.hoverBg}`
          : "border-white/10 bg-white/[0.025] opacity-70"
      }`}
    >
      <p
        className={`text-xs font-bold uppercase tracking-[0.18em] ${
          isAvailable ? t.text : "text-muted"
        }`}
      >
        {subject.title}
      </p>
      <p className="mt-3 flex-1 text-sm leading-7 text-muted">
        {subject.shortDescription}
      </p>

      {subject.domains.length > 0 ? (
        <ul className="mt-4 space-y-1.5" aria-label="Domaines">
          {subject.domains.map((domain) => (
            <li
              key={domain}
              className="flex items-start gap-2 text-xs leading-5 text-muted"
            >
              <span className="mt-0.5 shrink-0 text-white/30" aria-hidden="true">
                ·
              </span>
              {domain}
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
        {isAvailable ? (
          <>
            <span className={`text-xs font-bold uppercase tracking-[0.12em] ${t.text}`}>
              Missions disponibles
            </span>
            <span className={`text-xs transition group-hover:translate-x-0.5 ${t.text}`} aria-hidden="true">
              →
            </span>
          </>
        ) : (
          <PublicStatusBadge status={subject.status} />
        )}
      </div>
    </article>
  );

  if (!isAvailable) {
    return card;
  }

  return (
    <Link
      href={`/primaire/cm2/matieres/${subject.slug}`}
      className="block focus:outline-none focus:ring-2 focus:ring-gold/60"
    >
      {card}
    </Link>
  );
}
