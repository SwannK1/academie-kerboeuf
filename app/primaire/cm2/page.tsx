import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { cm2Level } from "@/content/cm2";
import { cm2Subjects, type Cm2Subject } from "@/content/cm2-subjects";
import { getPublicStatusKey } from "@/content/public-status";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";

export const metadata: Metadata = {
  title: "CM2 — Préparer la 6e avec méthode | Académie Kerboeuf",
  description:
    "Tableau de bord CM2 : matières, domaines et sous-domaines pour préparer l'entrée au collège avec Félix le Lynx.",
};

const ACCENT: Record<string, { text: string; border: string; bg: string }> = {
  jade:  { text: "text-jade",  border: "border-jade/30",  bg: "bg-jade/[0.04]"  },
  gold:  { text: "text-gold",  border: "border-gold/30",  bg: "bg-gold/[0.04]"  },
  sky:   { text: "text-sky",   border: "border-sky/30",   bg: "bg-sky/[0.04]"   },
  ember: { text: "text-ember", border: "border-ember/30", bg: "bg-ember/[0.04]" },
};

export default function Cm2Page() {
  return (
    <main className="cm2-catalog-print">
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Primaire", href: "/primaire" },
              { label: "CM2" },
            ]}
          />
        </div>
      </div>

      {/* ── En-tête ──────────────────────────────────────────────────────────── */}
      <section className="px-4 pt-10 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="inline-flex rounded-md border border-gold/35 bg-gold/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-gold">
            Cycle 3 · CM2
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight text-foreground sm:text-5xl">
            CM2 — Préparer la 6e avec méthode
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
            En CM2, l&apos;enjeu est de consolider les fondamentaux et d&apos;installer des
            méthodes de travail durables : lire avec précision, raisonner par étapes,
            structurer un écrit, explorer des documents.{" "}
            <span className="text-foreground/60">
              {cm2Level.character} accompagne la démarche.
            </span>
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/primaire/cm2/matieres"
              className="rounded-md bg-gold px-5 py-2.5 text-sm font-extrabold text-ink transition hover:bg-[#ffd778]"
            >
              Toutes les matières
            </Link>
            <Link
              href="/primaire/cm2/parcours"
              className="rounded-md border border-gold/35 bg-gold/10 px-5 py-2.5 text-sm font-bold text-gold transition hover:bg-gold hover:text-ink"
            >
              Progression de l&apos;année
            </Link>
            <Link
              href="/primaire/cm2/sequences"
              className="rounded-md border border-white/15 bg-white/[0.05] px-5 py-2.5 text-sm font-bold text-foreground transition hover:bg-white/10"
            >
              Cartographie des séquences
            </Link>
          </div>
        </div>
      </section>

      {/* ── Matières ─────────────────────────────────────────────────────────── */}
      <section className="border-t border-white/10 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted">
              Programmes CM2 · Cycle 3
            </p>
            <h2 className="mt-2 text-2xl font-black text-foreground">
              Matières, domaines et sous-domaines
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
              Chaque matière est structurée en domaines. Les sous-domaines et les
              ressources s&apos;y rattachent progressivement selon les programmes officiels.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {cm2Subjects.map((subject) => (
              <SubjectCard key={subject.slug} subject={subject} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Guide méthodo ────────────────────────────────────────────────────── */}
      <section className="border-t border-white/10 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/primaire/cm2/parcours"
              className="group flex flex-col gap-2 rounded-md border border-jade/25 bg-jade/[0.05] p-5 transition hover:border-jade/45 hover:bg-jade/[0.09]"
            >
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-jade">
                Progression annuelle
              </p>
              <p className="text-base font-black text-foreground">
                Parcours CM2
              </p>
              <p className="text-sm leading-6 text-muted">
                L&apos;organisation des séquences sur l&apos;année, étape par étape.
              </p>
              <span className="mt-1 text-sm font-black text-jade transition group-hover:translate-x-1">
                Voir le parcours →
              </span>
            </Link>

            <Link
              href={`/professeurs/felix`}
              className="group flex flex-col gap-2 rounded-md border border-white/10 bg-white/[0.04] p-5 transition hover:border-white/20 hover:bg-white/[0.07]"
            >
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
                Guide méthodologique
              </p>
              <p className="text-base font-black text-foreground">
                {cm2Level.character} le Lynx
              </p>
              <p className="text-sm leading-6 text-muted">
                Méthodes de travail, compétences observables et conseils de mise
                en œuvre pour la classe.
              </p>
              <span className="mt-1 text-sm font-black text-muted transition group-hover:translate-x-1 group-hover:text-foreground">
                Fiche de {cm2Level.character} →
              </span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

// ── Composants ────────────────────────────────────────────────────────────────

function SubjectCard({ subject }: { subject: Cm2Subject }) {
  const t = ACCENT[subject.accent];
  const isAvailable = getPublicStatusKey(subject.status) === "available";

  const content = (
    <>
      <div className="flex items-start justify-between gap-2">
        <p
          className={`text-sm font-extrabold ${
            isAvailable ? t.text : "text-muted"
          }`}
        >
          {subject.title}
        </p>
        <PublicStatusBadge status={subject.status} />
      </div>
      <p className="mt-2 flex-1 text-xs leading-5 text-muted">
        {subject.shortDescription}
      </p>
      {subject.domains.length > 0 ? (
        <ul className="mt-3 space-y-1" aria-label="Domaines">
          {subject.domains.slice(0, 4).map((domain) => (
            <li key={domain} className="flex items-start gap-2 text-xs leading-5 text-muted/70">
              <span className="mt-0.5 shrink-0 text-white/25" aria-hidden="true">·</span>
              {domain}
            </li>
          ))}
          {subject.domains.length > 4 ? (
            <li className="text-xs text-white/30">
              +{subject.domains.length - 4} domaine{subject.domains.length - 4 > 1 ? "s" : ""}
            </li>
          ) : null}
        </ul>
      ) : null}
    </>
  );

  if (!isAvailable) {
    return (
      <div
        className="flex min-h-full flex-col rounded-md border border-white/10 bg-white/[0.025] p-5 opacity-70"
        aria-label={`${subject.title} — en préparation`}
      >
        {content}
      </div>
    );
  }

  return (
    <Link
      href={`/primaire/cm2/matieres/${subject.slug}`}
      className={`group flex min-h-full flex-col rounded-md border p-5 transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-gold/60 ${t.border} ${t.bg} hover:bg-white/[0.07]`}
    >
      {content}
      <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
        <span className={`text-xs font-bold uppercase tracking-[0.12em] ${t.text}`}>
          Voir les domaines
        </span>
        <span
          className={`text-xs transition group-hover:translate-x-0.5 ${t.text}`}
          aria-hidden="true"
        >
          →
        </span>
      </div>
    </Link>
  );
}
