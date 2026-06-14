import Link from "next/link";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import type { PublicStatus } from "@/content/public-status";

type Accent = "jade" | "gold" | "sky" | "ember";

const ACCENT: Record<
  Accent,
  { border: string; hoverBorder: string; hoverBg: string }
> = {
  jade:  { border: "border-jade/30",  hoverBorder: "hover:border-jade/55",  hoverBg: "hover:bg-jade/[0.09]"  },
  gold:  { border: "border-gold/30",  hoverBorder: "hover:border-gold/55",  hoverBg: "hover:bg-gold/[0.09]"  },
  sky:   { border: "border-sky/30",   hoverBorder: "hover:border-sky/55",   hoverBg: "hover:bg-sky/[0.09]"   },
  ember: { border: "border-ember/30", hoverBorder: "hover:border-ember/55", hoverBg: "hover:bg-ember/[0.09]" },
};

const NIVEAUX: Array<{
  label: string;
  text: string;
  href: string;
  cta: string;
  accent: Accent;
  status: PublicStatus["key"];
}> = [
  {
    label: "Maternelle",
    text: "Petite, Moyenne et Grande Section.",
    href: "/maternelle",
    cta: "Découvrir",
    accent: "jade",
    status: "available",
  },
  {
    label: "Primaire",
    text: "Du CP au CM2, leçons et fiches.",
    href: "/primaire",
    cta: "Explorer",
    accent: "gold",
    status: "available",
  },
  {
    label: "Collège",
    text: "6e à la 3e, programmes en préparation.",
    href: "/college",
    cta: "Découvrir",
    accent: "sky",
    status: "upcoming",
  },
  {
    label: "Lycée",
    text: "Seconde à la Terminale, programmes en préparation.",
    href: "/lycee",
    cta: "Découvrir",
    accent: "ember",
    status: "upcoming",
  },
];

const AUTRES_ACCES: Array<{ label: string; href: string }> = [
  { label: "Professeurs", href: "/professeurs" },
  { label: "Personnages", href: "/personnages" },
  { label: "Carte de l'Académie", href: "/carte" },
];

const ETAPES = [
  {
    numero: "1",
    titre: "Choisir un niveau",
    text: "Maternelle, primaire, collège ou lycée.",
  },
  {
    numero: "2",
    titre: "Choisir une matière",
    text: "Français, mathématiques et autres domaines selon le niveau.",
  },
  {
    numero: "3",
    titre: "Ouvrir une fiche disponible",
    text: "Repère le statut « Disponible » et télécharge la ressource.",
  },
];

export default function Home() {
  return (
    <main>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden px-4 pt-32 pb-16 sm:px-6 lg:px-8">
        <div className="mission-grid absolute inset-0 -z-30 opacity-45" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,8,7,0.12),rgba(9,16,15,0.96))]" />

        <div className="mx-auto max-w-7xl text-center">
          <h1 className="text-5xl font-black leading-[0.98] text-foreground sm:text-6xl lg:text-7xl">
            Académie Kerboeuf
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-7 text-muted sm:text-xl">
            Des fiches pédagogiques classées par niveau, matière et compétence,
            pour préparer rapidement vos séances.
          </p>
          <p className="mt-4 text-base font-bold text-gold sm:text-lg">
            Choisis un niveau pour commencer.
          </p>
        </div>
      </section>

      {/* ── Niveaux ───────────────────────────────────────────────────────── */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {NIVEAUX.map((niveau) => {
            const t = ACCENT[niveau.accent];
            return (
              <Link
                key={niveau.href}
                href={niveau.href}
                className={`group flex min-h-48 flex-col justify-between rounded-md border ${t.border} bg-white/[0.04] p-7 transition hover:-translate-y-1 ${t.hoverBorder} ${t.hoverBg} focus:outline-none focus:ring-2 focus:ring-gold/60`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-2xl font-black text-foreground sm:text-3xl">
                      {niveau.label}
                    </h2>
                    <PublicStatusBadge status={niveau.status} />
                  </div>
                  <p className="mt-4 text-sm leading-7 text-muted">{niveau.text}</p>
                </div>
                <span className="mt-6 inline-flex text-sm font-black text-foreground transition group-hover:translate-x-1">
                  {niveau.cta} →
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── Comment utiliser le site ─────────────────────────────────────── */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-md border border-white/10 bg-white/[0.03] p-7 sm:p-10">
          <h2 className="text-xl font-black text-foreground sm:text-2xl">
            Comment utiliser le site ?
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {ETAPES.map((etape) => (
              <div key={etape.numero}>
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/20 text-sm font-black text-gold">
                    {etape.numero}
                  </span>
                  <h3 className="text-base font-black text-foreground">{etape.titre}</h3>
                </div>
                <p className="mt-2 text-sm leading-6 text-muted">{etape.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Autres accès ──────────────────────────────────────────────────── */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-sm font-black uppercase tracking-wide text-muted">
            Autres accès
          </h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {AUTRES_ACCES.map((acces) => (
              <Link
                key={acces.href}
                href={acces.href}
                className="rounded-md border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-bold text-foreground transition hover:-translate-y-0.5 hover:border-gold/55 hover:bg-gold/[0.09] focus:outline-none focus:ring-2 focus:ring-gold/60"
              >
                {acces.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
