import type { Metadata } from "next";
import Link from "next/link";
import { PrimairePortalMap } from "@/components/academy/primaire-portal-map";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
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

// Conservative statuses — updated as content is published
const LEVEL_STATUS: Record<string, string> = {
  cp: "en construction",
  ce1: "en construction",
  ce2: "en construction",
  cm1: "en construction",
  cm2: "disponible",
};

// Routes that actually exist — no fictitious links
const LEVEL_MATIERES: Record<string, string> = {
  cp: "/primaire/cp/matieres",
  ce1: "/primaire/ce1/matieres",
  ce2: "/primaire/ce2/matieres",
  cm1: "/primaire/cm1/matieres",
  cm2: "/primaire/cm2/matieres",
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
      {/* ── Portail immersif ──────────────────────────────────────────────── */}
      {/* Desktop : image plein écran avec zones cliquables par personnage.   */}
      {/* Mobile  : image 16:9 + 5 cartes accessibles sous l'image.           */}
      <PrimairePortalMap />

      {/* ── Choix du niveau / personnage (desktop : accès secondaire) ─────── */}
      <section className="px-4 pb-16 pt-12 sm:px-6 lg:px-8">
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
  const status = LEVEL_STATUS[level.slug] ?? "bientôt";
  const matieresHref = LEVEL_MATIERES[level.slug] ?? null;

  return (
    <div
      className={`flex min-h-full flex-col rounded-md border ${accent.border} bg-white/[0.04] p-5`}
    >
      <div className="flex items-start justify-between gap-2">
        <p className={`font-mono text-xs font-bold uppercase tracking-[0.18em] ${accent.text}`}>
          {level.cycle}
        </p>
        <PublicStatusBadge status={status} />
      </div>
      <p className="mt-4 text-4xl font-black text-foreground">{level.label}</p>
      <p className={`mt-1 text-sm font-bold ${accent.text}`}>
        {guide.character}
        {guide.species ? (
          <span className="font-normal text-muted"> · {guide.species}</span>
        ) : null}
      </p>
      <p className="mt-4 flex-1 text-sm leading-7 text-muted">{guide.focus}</p>
      <div className="mt-5 flex flex-wrap gap-2 border-t border-white/10 pt-4">
        <Link
          href={getLevelPath(level)}
          className={`inline-flex items-center gap-1.5 rounded border border-white/15 bg-white/[0.04] px-3 py-1.5 text-xs font-bold text-foreground transition hover:bg-white/[0.08] focus:outline-none focus:ring-2 ${accent.ring}`}
        >
          Portail {level.label} →
        </Link>
        {matieresHref && (
          <Link
            href={matieresHref}
            className={`inline-flex items-center gap-1.5 rounded border ${accent.border} bg-transparent px-3 py-1.5 text-xs font-bold ${accent.text} transition ${accent.hoverBg} focus:outline-none focus:ring-2 ${accent.ring}`}
          >
            Matières →
          </Link>
        )}
      </div>
    </div>
  );
}
