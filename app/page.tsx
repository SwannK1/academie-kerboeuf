import Link from "next/link";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import { getPublicStatusLabel } from "@/content/public-status";
import {
  getAvailableClassroomResources,
  getClassroomResourceStatusCounts,
  getLevelGroupAvailability,
} from "@/content/site-availability";

type Accent = "jade" | "gold" | "sky" | "ember";

const accentClasses: Record<
  Accent,
  {
    text: string;
    border: string;
    bg: string;
    hoverBg: string;
  }
> = {
  jade: {
    text: "text-jade",
    border: "border-jade/35",
    bg: "bg-jade/10",
    hoverBg: "hover:bg-jade/[0.09]",
  },
  gold: {
    text: "text-gold",
    border: "border-gold/35",
    bg: "bg-gold/10",
    hoverBg: "hover:bg-gold/[0.09]",
  },
  sky: {
    text: "text-sky",
    border: "border-sky/35",
    bg: "bg-sky/10",
    hoverBg: "hover:bg-sky/[0.09]",
  },
  ember: {
    text: "text-ember",
    border: "border-ember/35",
    bg: "bg-ember/10",
    hoverBg: "hover:bg-ember/[0.09]",
  },
};

const levelCopy: Record<
  string,
  { text: string; accent: Accent; detail: string }
> = {
  maternelle: {
    text: "Cycle 1, domaines et premiers repères structurés.",
    accent: "jade",
    detail: "PS · MS · GS",
  },
  primaire: {
    text: "CP à CM2, avec ressources prêtes selon les niveaux.",
    accent: "gold",
    detail: "CP · CE1 · CE2 · CM1 · CM2",
  },
  college: {
    text: "6e à 3e, missions et méthodes ouvertes selon disponibilité réelle.",
    accent: "sky",
    detail: "6e · 5e · 4e · 3e",
  },
  lycee: {
    text: "Seconde à Terminale, repères et missions selon avancement.",
    accent: "ember",
    detail: "Seconde · Première · Terminale",
  },
  enseignants: {
    text: "Outils de préparation, organisation et suivi de classe.",
    accent: "gold",
    detail: "Espace professeur",
  },
};

const secondaryEntries = [
  {
    href: "/univers",
    label: "Univers pédagogique",
    text: "Personnages, lieux et cohérence narrative de l'Académie.",
    accent: "jade" as const,
  },
  {
    href: "/methode",
    label: "Méthode",
    text: "Principes pédagogiques et façon d'utiliser les missions.",
    accent: "sky" as const,
  },
  {
    href: "/carte",
    label: "Carte",
    text: "Vue d'ensemble des ailes, niveaux et lieux transversaux.",
    accent: "ember" as const,
  },
];

export default function Home() {
  const availableResources = getAvailableClassroomResources();
  const resourceStatusCounts = getClassroomResourceStatusCounts();
  const levelGroups = getLevelGroupAvailability();
  const projectionCount = availableResources.filter((resource) =>
    resource.modes.includes("projection"),
  ).length;
  const printCount = availableResources.filter((resource) =>
    resource.modes.includes("impression"),
  ).length;
  const correctionCount = availableResources.filter((resource) =>
    resource.modes.includes("correction"),
  ).length;
  const featuredResources = availableResources.slice(0, 3);

  return (
    <main id="contenu-principal">
      <section className="relative isolate overflow-hidden px-4 pb-16 pt-28 sm:px-6 lg:px-8">
        <div className="mission-grid absolute inset-0 -z-30 opacity-45" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,8,7,0.1),rgba(9,16,15,0.96))]" />

        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
          <div>
            <p className="inline-flex rounded-md border border-gold/35 bg-gold/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-gold">
              Académie Kerboeuf
            </p>
            <h1 className="mt-6 max-w-5xl text-5xl font-black leading-[0.98] text-foreground sm:text-6xl lg:text-7xl">
              Ressources pédagogiques structurées, du Cycle 1 au lycée
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">
              Accédez aux missions et fiches déjà prêtes, ou explorez
              l&apos;univers pédagogique niveau par niveau.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/ressources"
                className="rounded-md bg-gold px-5 py-3 text-sm font-black text-ink transition hover:bg-gold/90"
              >
                Voir les ressources prêtes
              </Link>
            </div>
          </div>

          <div className="rounded-md border border-white/10 bg-panel/75 p-5 shadow-2xl shadow-black/35">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
              Ressources utilisables
            </p>
            <div className="mt-5 grid grid-cols-3 gap-3">
              <Metric value={projectionCount} label="à projeter" />
              <Metric value={printCount} label="à imprimer" />
              <Metric value={correctionCount} label="corrigées" />
            </div>
            <p className="mt-4 text-xs leading-6 text-muted">
              Comptage limité aux ressources marquées disponibles dans le
              catalogue de classe.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-gold">
                Prêt pour la classe
              </p>
              <h2 className="mt-3 text-3xl font-black text-foreground sm:text-4xl">
                Ressources déjà disponibles
              </h2>
            </div>
            <Link
              href="/ressources"
              className="w-fit rounded-md border border-gold/35 bg-gold/10 px-4 py-2.5 text-sm font-black text-gold transition hover:bg-gold hover:text-ink"
            >
              Ouvrir le catalogue →
            </Link>
          </div>

          <div className="grid gap-4 lg:grid-cols-[0.75fr_1.25fr]">
            <div className="rounded-md border border-white/10 bg-white/[0.035] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
                État réel des ressources
              </p>
              <div className="mt-5 grid grid-cols-3 gap-3">
                <Metric
                  value={resourceStatusCounts.available}
                  label={getPublicStatusLabel("available")}
                />
                <Metric
                  value={resourceStatusCounts["in-progress"]}
                  label={getPublicStatusLabel("in-progress")}
                />
                <Metric
                  value={resourceStatusCounts.upcoming}
                  label={getPublicStatusLabel("upcoming")}
                />
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {featuredResources.map((resource) => (
                <Link
                  key={resource.id}
                  href={resource.href}
                  className="group rounded-md border border-jade/30 bg-white/[0.04] p-5 transition hover:-translate-y-1 hover:bg-jade/[0.08]"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded bg-jade/10 px-2 py-1 text-xs font-black uppercase tracking-[0.14em] text-jade">
                      {resource.level}
                    </span>
                    <PublicStatusBadge status={resource.status} />
                  </div>
                  <h3 className="mt-4 text-xl font-black leading-tight text-foreground">
                    {resource.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted">
                    {resource.subject}
                  </p>
                  <p className="mt-5 text-sm font-black text-jade transition group-hover:translate-x-1">
                    Ouvrir →
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-panel/35 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-sky">
              Navigation par niveau
            </p>
            <h2 className="mt-3 text-3xl font-black text-foreground sm:text-4xl">
              Choisir une entrée
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-[1.3fr_0.9fr_0.9fr_0.9fr]">
            {levelGroups
              .filter((group) => group.id !== "enseignants")
              .map((group) => {
              const copy = levelCopy[group.id];
              const accent = accentClasses[copy.accent];
              const isPrimaire = group.id === "primaire";

              return (
                <Link
                  key={group.id}
                  href={group.href}
                  className={`group flex flex-col rounded-md border ${accent.border} bg-white/[0.04] p-5 transition hover:-translate-y-1 ${accent.hoverBg} ${
                    isPrimaire ? "min-h-72 lg:p-6" : "min-h-64 opacity-90 hover:opacity-100"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className={`rounded px-2.5 py-1 text-xs font-black uppercase tracking-[0.14em] ${accent.bg} ${accent.text}`}
                    >
                      {copy.detail}
                    </span>
                    <PublicStatusBadge status={group.status} />
                  </div>
                  <h3
                    className={`mt-5 font-black text-foreground ${isPrimaire ? "text-3xl" : "text-2xl"}`}
                  >
                    {group.label}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-muted">
                    {copy.text}
                  </p>
                  <p className={`mt-5 text-sm font-black ${accent.text}`}>
                    {group.availableResources} accès prêt
                    {group.availableResources > 1 ? "s" : ""}
                  </p>
                  <span
                    className={`mt-4 text-sm font-black transition group-hover:translate-x-1 ${accent.text}`}
                  >
                    Explorer →
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-md border border-gold/30 bg-gold/[0.06] p-6">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-gold">
              Enseignants
            </p>
            <h2 className="mt-3 text-3xl font-black text-foreground">
              Préparer et organiser la classe
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted">
              L&apos;espace enseignants rassemble les outils déjà présents pour
              préparer une séance, suivre la classe et retrouver les ressources.
            </p>
            <Link
              href="/enseignants"
              className="mt-6 inline-flex rounded-md bg-gold px-5 py-3 text-sm font-black text-ink transition hover:bg-gold/90"
            >
              Ouvrir l&apos;espace enseignants
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {secondaryEntries.map((entry) => {
              const accent = accentClasses[entry.accent];

              return (
                <Link
                  key={entry.href}
                  href={entry.href}
                  className={`group rounded-md border ${accent.border} bg-white/[0.04] p-5 transition hover:-translate-y-1 ${accent.hoverBg}`}
                >
                  <p className={`text-sm font-black ${accent.text}`}>
                    {entry.label}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-muted">
                    {entry.text}
                  </p>
                  <p
                    className={`mt-5 text-sm font-black transition group-hover:translate-x-1 ${accent.text}`}
                  >
                    Explorer →
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

function Metric({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded border border-white/10 bg-white/[0.04] p-4">
      <p className="font-mono text-3xl font-black text-gold">{value}</p>
      <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-muted">
        {label}
      </p>
    </div>
  );
}
