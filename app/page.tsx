import Link from "next/link";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import { getLevelGroupAvailability } from "@/content/site-availability";

type Accent = "jade" | "gold" | "sky" | "ember";

const accentClasses: Record<Accent, { text: string; border: string; bg: string }> = {
  jade: { text: "text-jade", border: "border-jade/35", bg: "bg-jade/10" },
  gold: { text: "text-gold", border: "border-gold/35", bg: "bg-gold/10" },
  sky: { text: "text-sky", border: "border-sky/35", bg: "bg-sky/10" },
  ember: { text: "text-ember", border: "border-ember/35", bg: "bg-ember/10" },
};

const levelCopy: Record<string, { text: string; accent: Accent; detail: string }> = {
  maternelle: {
    text: "Les domaines et ressources de PS, MS et GS.",
    accent: "jade",
    detail: "PS · MS · GS",
  },
  primaire: {
    text: "Les matières et ressources du CP au CM2.",
    accent: "gold",
    detail: "CP · CE1 · CE2 · CM1 · CM2",
  },
  college: {
    text: "Les ressources disponibles de la 6e à la 3e.",
    accent: "sky",
    detail: "6e · 5e · 4e · 3e",
  },
  lycee: {
    text: "Les ressources disponibles de la Seconde à la Terminale.",
    accent: "ember",
    detail: "Seconde · Première · Terminale",
  },
};

export default function Home() {
  const levelGroups = getLevelGroupAvailability().filter(
    (group) => group.id !== "enseignants",
  );

  return (
    <main id="contenu-principal">
      <section className="relative isolate overflow-hidden px-4 pb-16 pt-28 sm:px-6 lg:px-8">
        <div className="mission-grid absolute inset-0 -z-30 opacity-45" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,8,7,0.1),rgba(9,16,15,0.96))]" />

        <div className="mx-auto max-w-6xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-gold">
            Académie Kerboeuf
          </p>
          <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-black leading-tight text-foreground sm:text-6xl">
            Que voulez-vous faire aujourd&apos;hui&nbsp;?
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted">
            Le site organise. Les PDF enseignent.
          </p>

          <div className="mt-10 grid gap-4 text-left md:grid-cols-2">
            <PrimaryChoice
              href="/ressources"
              eyebrow="Ressources"
              title="Je cherche une ressource"
              description="Leçons, exercices et évaluations par niveau et matière."
              accent="jade"
            />
            <PrimaryChoice
              href="/enseignants"
              eyebrow="Préparation"
              title="Je prépare ma classe"
              description="Programmation, semaine, cahier journal et outils pratiques."
              accent="gold"
            />
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-panel/30 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted">
              Accès par niveau
            </p>
            <h2 className="mt-3 text-3xl font-black text-foreground">
              Parcourir les ressources
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted">
              Choisissez un univers scolaire, puis un niveau et une matière.
            </p>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {levelGroups.map((group) => {
              const copy = levelCopy[group.id];
              const accent = accentClasses[copy.accent];

              return (
                <Link
                  key={group.id}
                  href={group.href}
                  className={`group flex min-h-48 flex-col rounded-md border ${accent.border} bg-white/[0.035] p-5 transition hover:-translate-y-0.5 hover:bg-white/[0.07] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className={`rounded px-2 py-1 text-xs font-black ${accent.bg} ${accent.text}`}>
                      {copy.detail}
                    </span>
                    <PublicStatusBadge status={group.status} />
                  </div>
                  <h3 className="mt-5 text-2xl font-black text-foreground">
                    {group.label}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-muted">
                    {copy.text}
                  </p>
                  <span className={`mt-4 text-sm font-black ${accent.text}`}>
                    Choisir un niveau →
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-6 text-sm">
            <Link href="/univers" className="font-bold text-muted transition hover:text-foreground">
              Découvrir l&apos;univers pédagogique
            </Link>
            <Link href="/methode" className="font-bold text-muted transition hover:text-foreground">
              Comprendre la méthode
            </Link>
            <Link href="/carte" className="font-bold text-muted transition hover:text-foreground">
              Voir la carte de l&apos;Académie
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function PrimaryChoice({
  href,
  eyebrow,
  title,
  description,
  accent,
}: {
  href: string;
  eyebrow: string;
  title: string;
  description: string;
  accent: "jade" | "gold";
}) {
  const tone =
    accent === "jade"
      ? "border-jade/40 bg-jade/[0.07] text-jade hover:bg-jade/[0.12]"
      : "border-gold/40 bg-gold/[0.07] text-gold hover:bg-gold/[0.12]";

  return (
    <Link
      href={href}
      className={`group flex min-h-64 flex-col rounded-md border p-6 transition hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold sm:p-8 ${tone}`}
    >
      <p className="text-xs font-black uppercase tracking-[0.2em]">{eyebrow}</p>
      <h2 className="mt-5 text-3xl font-black leading-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 flex-1 text-base leading-7 text-muted">{description}</p>
      <span className="mt-6 text-base font-black transition group-hover:translate-x-1">
        Commencer →
      </span>
    </Link>
  );
}
