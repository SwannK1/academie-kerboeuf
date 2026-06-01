import type { Metadata } from "next";
import Link from "next/link";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { cm1Subjects, type Cm1Subject } from "@/content/cm1-subjects";
import { cm1Level } from "@/content/levels/cm1";
import { getPublicStatusKey } from "@/content/public-status";

export const metadata: Metadata = {
  title: "CM1 — Les Explorations de Noisette | Académie Kerboeuf",
  description:
    "Page niveau CM1 : matières, domaines et ressources en préparation pour le Cycle 3 à l'Académie Kerboeuf.",
};

const ACCENT: Record<string, { text: string; border: string; bg: string }> = {
  jade: { text: "text-jade", border: "border-jade/30", bg: "bg-jade/[0.04]" },
  gold: { text: "text-gold", border: "border-gold/30", bg: "bg-gold/[0.04]" },
  sky: { text: "text-sky", border: "border-sky/30", bg: "bg-sky/[0.04]" },
  ember: { text: "text-ember", border: "border-ember/30", bg: "bg-ember/[0.04]" },
};

export default function Cm1Page() {
  const guideName = cm1Level.characterLink?.name ?? "Noisette";

  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Primaire", href: "/primaire" },
              { label: "CM1" },
            ]}
          />
        </div>
      </div>

      <section className="relative isolate overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        <div className="mission-grid absolute inset-0 -z-20 opacity-20" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,8,7,0.03),rgba(9,16,15,0.95))]" />
        <div className="mx-auto max-w-7xl">
          <p className="inline-flex rounded-md border border-gold/35 bg-gold/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-gold">
            Cycle 3 · Guide : {guideName}
          </p>
          <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.98] text-foreground sm:text-6xl">
            CM1 — Les Explorations de Noisette
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">
            Un portail court pour entrer dans les matières du CM1, suivre la
            structuration des domaines et garder une vue claire sur les
            ressources à venir.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/primaire/cm1/matieres"
              className="rounded-md bg-gold px-5 py-3 text-sm font-extrabold text-ink transition hover:bg-[#ffd778]"
            >
              Explorer les matières CM1
            </Link>
            <Link
              href="/primaire"
              className="rounded-md border border-white/15 bg-white/[0.05] px-5 py-3 text-sm font-bold text-foreground transition hover:bg-white/10"
            >
              Retour au primaire
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
                Programmes CM1 · Cycle 3
              </p>
              <h2 className="mt-3 text-3xl font-black text-foreground sm:text-4xl">
                Matières et domaines
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
                Les matières CM1 renvoient vers le nouveau catalogue par
                matière. Les statuts indiquent l&apos;avancement public, sans créer
                de lien vers des PDF inexistants.
              </p>
            </div>
            <Link
              href="/primaire/cm1/matieres"
              className="shrink-0 rounded-md border border-jade/30 bg-jade/[0.05] px-4 py-2.5 text-sm font-bold text-jade transition hover:bg-jade/[0.09]"
            >
              Explorer les matières CM1 →
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {cm1Subjects.map((subject) => (
              <SubjectCard key={subject.slug} subject={subject} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-md border border-white/10 bg-white/[0.035] p-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
              Ressources prévues
            </p>
            <p className="mt-1 text-sm leading-6 text-muted">
              Les supports PDF du CM1 sont en préparation. Aucun lien de
              téléchargement n&apos;est affiché tant que la ressource n&apos;existe pas.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

function SubjectCard({ subject }: { subject: Cm1Subject }) {
  const t = ACCENT[subject.accent] ?? ACCENT.gold;
  const isAvailable = getPublicStatusKey(subject.status) === "available";

  return (
    <Link
      href={`/primaire/cm1/matieres/${subject.slug}`}
      className={`group flex min-h-full flex-col rounded-md border ${t.border} ${t.bg} p-5 transition hover:-translate-y-0.5 hover:bg-white/[0.07] focus:outline-none focus:ring-2 focus:ring-gold/60`}
    >
      <div className="flex items-start justify-between gap-3">
        <p
          className={`text-xs font-bold uppercase tracking-[0.18em] ${
            isAvailable ? t.text : "text-muted"
          }`}
        >
          {subject.title}
        </p>
        <PublicStatusBadge status={subject.status} className="shrink-0" />
      </div>
      <p className="mt-3 flex-1 text-sm leading-7 text-muted">
        {subject.shortDescription}
      </p>

      <ul className="mt-4 space-y-1.5" aria-label={`Domaines ${subject.title}`}>
        {subject.domains.map((domain) => (
          <li key={domain} className="flex items-start gap-2 text-xs leading-5 text-muted">
            <span className="mt-0.5 shrink-0 text-white/30" aria-hidden="true">
              ·
            </span>
            {domain}
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
        <span className={`text-xs font-bold uppercase tracking-[0.12em] ${t.text}`}>
          Voir la structure
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
