import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { cm2Level, cm2Missions } from "@/content/cm2";
import { cm2Subjects, type Cm2Subject } from "@/content/cm2-subjects";
import { getPublicStatusKey } from "@/content/public-status";

export const metadata: Metadata = {
  title: "CM2 — La Grande Classe des Explorateurs | Académie Kerboeuf",
  description:
    "Page niveau CM2 : matières, domaines et missions de la Grande Classe des Explorateurs, guidée par Félix le Lynx.",
};

// ── Données UI ─────────────────────────────────────────────────────────────────

const ACCENT: Record<string, { text: string; border: string }> = {
  jade:  { text: "text-jade",  border: "border-jade/30"  },
  gold:  { text: "text-gold",  border: "border-gold/30"  },
  sky:   { text: "text-sky",   border: "border-sky/30"   },
  ember: { text: "text-ember", border: "border-ember/30" },
};

// ── Page ───────────────────────────────────────────────────────────────────────

export default function Cm2Page() {
  const missionCount = cm2Missions.length;

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

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        <div className="mission-grid absolute inset-0 -z-20 opacity-25" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(243,196,91,0.17),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(80,200,164,0.12),transparent_32%),linear-gradient(180deg,rgba(5,8,7,0.04),rgba(9,16,15,0.94))]" />
        <div className="mx-auto max-w-7xl">
          <p className="inline-flex rounded-md border border-gold/35 bg-gold/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-gold">
            Cycle 3 · Guide : {cm2Level.character} le Lynx
          </p>
          <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.98] text-foreground sm:text-6xl">
            CM2 — La Grande Classe<br className="hidden sm:block" /> des Explorateurs
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">
            {cm2Level.description} Le niveau consolide les méthodes du Cycle 3 :
            lire avec précision, calculer avec stratégie, enquêter dans les
            documents et préparer l&apos;entrée au collège.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/primaire/cm2/matieres"
              className="rounded-md bg-gold px-5 py-3 text-sm font-extrabold text-ink transition hover:bg-[#ffd778]"
            >
              Explorer les matières CM2
            </Link>
            <Link
              href="/primaire/cm2/parcours"
              className="rounded-md border border-gold/35 bg-gold/10 px-5 py-3 text-sm font-bold text-gold transition hover:bg-gold hover:text-ink"
            >
              Parcours de l&apos;année
            </Link>
            <Link
              href="/primaire/cm2/sequences"
              className="rounded-md border border-white/15 bg-white/[0.05] px-5 py-3 text-sm font-bold text-foreground transition hover:bg-white/10"
            >
              Cartographie des séquences
            </Link>
          </div>
        </div>
      </section>

      {/* ── Matières ──────────────────────────────────────────────────────── */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
                Programmes CM2 · Cycle 3
              </p>
              <h2 className="mt-3 text-3xl font-black text-foreground sm:text-4xl">
                Matières, domaines et séquences
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
                Chaque matière est structurée en domaines et sous-domaines.
                Les séquences s&apos;y rattachent progressivement selon les programmes.
              </p>
            </div>
            <Link
              href="/primaire/cm2/matieres"
              className="shrink-0 rounded-md border border-jade/30 bg-jade/[0.05] px-4 py-2.5 text-sm font-bold text-jade transition hover:bg-jade/[0.09]"
            >
              Voir toutes les matières →
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {cm2Subjects.map((subject) => (
              <SubjectCard key={subject.slug} subject={subject} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Accès secondaires ─────────────────────────────────────────────── */}
      <section className="border-t border-white/10 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.22em] text-muted">
            Aller plus loin
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/primaire/cm2/fiches/mathematiques"
              className="group flex flex-col gap-2 rounded-md border border-gold/25 bg-gold/[0.05] p-5 transition hover:border-gold/45 hover:bg-gold/[0.09]"
            >
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">
                Fiches imprimables
              </p>
              <p className="text-lg font-black text-foreground">
                Fiches mathématiques CM2
              </p>
              <p className="text-sm leading-6 text-muted">
                108 notions en fiches 3 feuilles : mini-leçon, exercices,
                évaluation courte. Organisées par domaine.
              </p>
              <span className="mt-1 text-sm font-black text-gold transition group-hover:translate-x-1">
                Voir les fiches →
              </span>
            </Link>
            <Link
              href="/primaire/cm2/missions"
              className="group flex flex-col gap-2 rounded-md border border-white/10 bg-white/[0.04] p-5 transition hover:border-white/20 hover:bg-white/[0.07]"
            >
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
                Ressources complémentaires
              </p>
              <p className="text-lg font-black text-foreground">
                Missions pédagogiques CM2
              </p>
              <p className="text-sm leading-6 text-muted">
                {missionCount} missions organisées par domaine, avec statut et
                supports pédagogiques.
              </p>
              <span className="mt-1 text-sm font-black text-muted transition group-hover:translate-x-1 group-hover:text-foreground">
                Voir les missions →
              </span>
            </Link>

            <Link
              href="/primaire/cm2/parcours"
              className="group flex flex-col gap-2 rounded-md border border-jade/25 bg-jade/[0.05] p-5 transition hover:border-jade/45 hover:bg-jade/[0.09]"
            >
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-jade">
                Progression de l&apos;année
              </p>
              <p className="text-lg font-black text-foreground">
                Parcours pédagogique CM2
              </p>
              <p className="text-sm leading-6 text-muted">
                Une séquence complète pour installer les compétences étape par
                étape avec {cm2Level.character}.
              </p>
              <span className="mt-1 text-sm font-black text-jade transition group-hover:translate-x-1">
                Ouvrir le parcours →
              </span>
            </Link>

            <Link
              href="/professeurs/felix"
              className="group flex flex-col gap-2 rounded-md border border-white/10 bg-white/[0.04] p-5 transition hover:border-white/20 hover:bg-white/[0.07]"
            >
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
                Guide pédagogique
              </p>
              <p className="text-lg font-black text-foreground">
                {cm2Level.character} le Lynx
              </p>
              <p className="text-sm leading-6 text-muted">
                Méthodes, compétences observables et conseils de mise en œuvre
                pour la classe.
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

  return (
    <Link
      href={`/primaire/cm2/matieres/${subject.slug}`}
      className={`group flex min-h-full flex-col rounded-md border p-5 transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-gold/60 ${
        isAvailable
          ? `${t.border} bg-white/[0.04] hover:bg-white/[0.07]`
          : "border-white/10 bg-white/[0.025] hover:bg-white/[0.04]"
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
            <li key={domain} className="flex items-start gap-2 text-xs leading-5 text-muted">
              <span className="mt-0.5 shrink-0 text-white/30" aria-hidden="true">·</span>
              {domain}
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
        <span
          className={`text-xs font-bold uppercase tracking-[0.12em] ${
            isAvailable ? t.text : "text-white/25"
          }`}
        >
          {isAvailable ? "Voir les domaines" : "À structurer"}
        </span>
        <span
          className={`text-xs transition group-hover:translate-x-0.5 ${
            isAvailable ? t.text : "text-white/20"
          }`}
          aria-hidden="true"
        >
          →
        </span>
      </div>
    </Link>
  );
}
