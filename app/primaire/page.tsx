import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import {
  getLevelPath,
  getLevelsByStage,
  type AcademyLevel,
} from "@/content/academy";

export const metadata: Metadata = {
  title: "Primaire — Les Lisières des Explorateurs | Académie Kerboeuf",
  description:
    "Homepage du cycle élémentaire de l'Académie Kerboeuf : niveaux, professeurs, élèves repères et zones pédagogiques des Lisières des Explorateurs.",
};

// Narrative data per level slug — character species and posture, not in content files
const LEVEL_GUIDES: Record<
  string,
  { character: string; species: string; focus: string }
> = {
  cp: {
    character: "Kiwi",
    species: "la Grenouille",
    focus: "Oser entrer dans les premiers codes",
  },
  ce1: {
    character: "Gaston",
    species: "le Hérisson",
    focus: "Choisir une stratégie et l'expliquer",
  },
  ce2: {
    character: "Esteban",
    species: "le Manchot",
    focus: "Observer, classer, garder une trace",
  },
  cm1: {
    character: "Noisette",
    species: "l'Écureuille",
    focus: "Relier les documents, construire une réponse",
  },
  cm2: {
    character: "Félix",
    species: "le Lynx",
    focus: "Justifier, transférer, préparer le collège",
  },
};

const LEVEL_ACCENT: Record<
  string,
  { text: string; border: string; hoverBorder: string; hoverBg: string; ring: string }
> = {
  cp:  { text: "text-jade",  border: "border-jade/30",  hoverBorder: "hover:border-jade/55",  hoverBg: "hover:bg-jade/[0.08]",  ring: "focus:ring-jade/60"  },
  ce1: { text: "text-sky",   border: "border-sky/30",   hoverBorder: "hover:border-sky/55",   hoverBg: "hover:bg-sky/[0.08]",   ring: "focus:ring-sky/60"   },
  ce2: { text: "text-ember", border: "border-ember/30", hoverBorder: "hover:border-ember/55", hoverBg: "hover:bg-ember/[0.08]", ring: "focus:ring-ember/60" },
  cm1: { text: "text-gold",  border: "border-gold/30",  hoverBorder: "hover:border-gold/55",  hoverBg: "hover:bg-gold/[0.08]",  ring: "focus:ring-gold/60"  },
  cm2: { text: "text-gold",  border: "border-gold/30",  hoverBorder: "hover:border-gold/55",  hoverBg: "hover:bg-gold/[0.08]",  ring: "focus:ring-gold/60"  },
};

export default function PrimairePage() {
  const levels = getLevelsByStage("primaire");

  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Primaire" }]} />
        </div>
      </div>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        <div className="mission-grid absolute inset-0 -z-20 opacity-25" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(80,200,164,0.16),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(243,196,91,0.14),transparent_30%),linear-gradient(180deg,rgba(5,8,7,0.04),rgba(9,16,15,0.94))]" />
        <div className="mx-auto max-w-7xl">
          <p className="inline-flex rounded-md border border-jade/35 bg-jade/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Cycle 2 · Cycle 3
          </p>
          <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.98] text-foreground sm:text-6xl">
            Les Lisières<br />des Explorateurs
          </h1>
          <p className="mt-5 text-2xl font-black text-gold">
            Explorer, comprendre, créer, coopérer.
          </p>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">
            Cinq niveaux, cinq personnages repères. Chaque guide accompagne une
            posture d&apos;explorateur différente — du premier décodage en CP à la
            préparation du collège en CM2.
          </p>
        </div>
      </section>

      {/* ── Choix du niveau / personnage ──────────────────────────────────── */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 border-b border-white/10 pb-6">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
              CP · CE1 · CE2 · CM1 · CM2
            </p>
            <h2 className="mt-3 text-3xl font-black text-foreground sm:text-4xl">
              Choisis ton guide
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
              Chaque niveau a son univers et ses missions. Clique sur un niveau
              pour entrer dans l&apos;espace de ton guide.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {levels.map((level) => (
              <LevelGuideCard key={level.slug} level={level} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Professeurs associés (secondaire) ─────────────────────────────── */}
      <section className="border-t border-white/10 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted">
                Équipe pédagogique
              </p>
              <h2 className="mt-2 text-2xl font-black text-foreground">
                Les professeurs des Lisières
              </h2>
            </div>
            <Link
              href="/professeurs"
              className="rounded-md border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm font-bold text-muted transition hover:bg-white/[0.07] hover:text-foreground"
            >
              Tous les professeurs →
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {levels.map((level) => (
              <Link
                key={level.professor.slug}
                href={`/professeurs/${level.professor.slug}`}
                className="group rounded border border-white/10 bg-ink/30 p-4 transition hover:border-white/25 hover:bg-white/[0.06]"
              >
                <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-jade">
                  {level.label}
                </p>
                <p className="mt-2 text-base font-black text-foreground">
                  {level.professor.name}
                </p>
                <p className="mt-1 text-xs leading-5 text-muted">
                  {level.professor.mainSubject}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Lieux des Lisières — accès secondaire ─────────────────────────── */}
      <section className="border-t border-white/10 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/primaire/lieux"
            className="group flex flex-col gap-5 rounded-md border border-jade/25 bg-jade/[0.05] p-6 transition hover:border-jade/45 hover:bg-jade/[0.08] sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
                Géographie pédagogique
              </p>
              <h2 className="mt-2 text-2xl font-black text-foreground">
                Explorer les lieux des Lisières
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
                La Bibliothèque des Explorateurs, la Cartothèque des Lisières,
                l&apos;Atelier des Mathématiques&hellip; Chaque lieu correspond à
                une fonction pédagogique précise dans l&apos;école élémentaire.
              </p>
            </div>
            <span className="shrink-0 text-sm font-black text-jade transition group-hover:translate-x-1">
              Voir les lieux →
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}

function LevelGuideCard({ level }: { level: AcademyLevel }) {
  const guide = LEVEL_GUIDES[level.slug] ?? {
    character: level.professor.name,
    species: "",
    focus: level.description,
  };
  const accent = LEVEL_ACCENT[level.slug] ?? {
    text: "text-gold",
    border: "border-gold/30",
    hoverBorder: "hover:border-gold/55",
    hoverBg: "hover:bg-gold/[0.08]",
    ring: "focus:ring-gold/60",
  };

  return (
    <Link
      href={getLevelPath(level)}
      className={`group flex min-h-full flex-col rounded-md border ${accent.border} bg-white/[0.04] p-5 transition hover:-translate-y-1 ${accent.hoverBorder} ${accent.hoverBg} focus:outline-none focus:ring-2 ${accent.ring}`}
    >
      <p className={`font-mono text-xs font-bold uppercase tracking-[0.18em] ${accent.text}`}>
        {level.cycle}
      </p>
      <p className="mt-4 text-4xl font-black text-foreground">{level.label}</p>
      <p className={`mt-1 text-sm font-bold ${accent.text}`}>
        {guide.character}
        {guide.species ? (
          <span className="font-normal text-muted"> · {guide.species}</span>
        ) : null}
      </p>
      <p className="mt-4 flex-1 text-sm leading-7 text-muted">{guide.focus}</p>
      <div className="mt-5 border-t border-white/10 pt-4">
        <p className="text-xs text-muted">
          {level.professor.name} · {level.professor.mainSubject}
        </p>
      </div>
    </Link>
  );
}
