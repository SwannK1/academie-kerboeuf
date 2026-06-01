import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { cm1Subjects, type Cm1Subject } from "@/content/cm1-subjects";
import { getPublicStatusKey } from "@/content/public-status";

export const metadata: Metadata = {
  title: "Matières CM1 | Académie Kerboeuf",
  description:
    "Les 8 matières du programme CM1 à l'Académie Kerboeuf : Français, Mathématiques, Histoire-Géographie, Sciences, EMC, Anglais, Arts, EPS.",
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

export default function Cm1MatieresPage() {
  const available = cm1Subjects.filter((s) => getPublicStatusKey(s.status) === "available");
  const upcoming  = cm1Subjects.filter((s) => getPublicStatusKey(s.status) !== "available");

  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[
              { label: "Accueil",  href: "/"            },
              { label: "Primaire", href: "/primaire"    },
              { label: "CM1",      href: "/primaire/cm1"},
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
          <p className="inline-flex rounded-md border border-gold/35 bg-gold/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-gold">
            Programmes CM1
          </p>
          <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.98] text-foreground sm:text-6xl">
            Les matières du CM1
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">
            Chaque matière est structurée en domaines et sous-domaines.
            Les séquences-compétences (1 séquence = 1 compétence) s&apos;y
            rattachent progressivement au fil de l&apos;année.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/primaire/cm1"
              className="rounded-md border border-white/15 bg-white/[0.05] px-5 py-3 text-sm font-bold text-foreground transition hover:bg-white/10"
            >
              ← Retour CM1
            </Link>
          </div>
        </div>
      </section>

      {/* ── Matières disponibles ──────────────────────────────────────────── */}
      {available.length > 0 && (
        <section className="px-4 pb-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 border-b border-white/10 pb-5">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">
                Disponible
              </p>
              <h2 className="mt-2 text-2xl font-black text-foreground">
                Matières actives
              </h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {available.map((subject) => (
                <SubjectCard key={subject.slug} subject={subject} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Matières à venir ──────────────────────────────────────────────── */}
      {upcoming.length > 0 && (
        <section className="border-t border-white/10 px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 border-b border-white/10 pb-5">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted">
                En construction
              </p>
              <h2 className="mt-2 text-2xl font-black text-foreground">
                Matières à venir
              </h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {upcoming.map((subject) => (
                <SubjectCard key={subject.slug} subject={subject} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Pied de page ──────────────────────────────────────────────────── */}
      <section className="border-t border-white/10 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-muted">
            Aller plus loin
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/primaire/cm1"
              className="rounded-md border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-bold text-muted transition hover:bg-white/[0.08] hover:text-foreground"
            >
              ← Vue d&apos;ensemble CM1
            </Link>
            <Link
              href="/primaire/cm2/matieres"
              className="rounded-md border border-jade/25 bg-jade/[0.05] px-4 py-2.5 text-sm font-bold text-jade transition hover:bg-jade/[0.09]"
            >
              Matières CM2
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

// ── Composant carte matière ────────────────────────────────────────────────────

function SubjectCard({ subject }: { subject: Cm1Subject }) {
  const a = ACCENT[subject.accent] ?? ACCENT.gold;
  return (
    <Link
      href={`/primaire/cm1/matieres/${subject.slug}`}
      className={`group flex flex-col rounded-md border ${a.border} ${a.hoverBorder} ${a.hoverBg} bg-white/[0.03] p-5 transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-gold/60`}
    >
      <p className={`text-xs font-bold uppercase tracking-[0.18em] ${a.text}`}>
        CM1 · Cycle 3
      </p>
      <h3 className="mt-3 text-xl font-black text-foreground">{subject.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-6 text-muted">
        {subject.shortDescription}
      </p>
      {subject.domains.length > 0 && (
        <p className="mt-3 text-xs text-white/35">
          {subject.domains.length} domaine{subject.domains.length > 1 ? "s" : ""}
        </p>
      )}
      <span className={`mt-4 text-sm font-black transition group-hover:translate-x-1 ${a.text}`}>
        Voir la matière →
      </span>
    </Link>
  );
}
