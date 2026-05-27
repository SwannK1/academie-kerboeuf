import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Académie Kerboeuf — Plateforme pédagogique",
  description:
    "Académie Kerboeuf : une plateforme pédagogique structurée pour apprendre, s'entraîner et progresser, de la maternelle au lycée.",
};

const LEVELS = [
  {
    label: "Maternelle",
    href: "/maternelle",
    desc: "PS, MS, GS — Découvrir le monde, le langage et les premières structures.",
    accent: "jade",
  },
  {
    label: "Primaire",
    href: "/primaire",
    desc: "CP, CE1, CE2, CM2 — Lire, compter, comprendre et s'entraîner avec méthode.",
    accent: "gold",
  },
  {
    label: "Collège",
    href: "/college",
    desc: "6e à 3e — Approfondir les compétences et préparer les grandes étapes.",
    accent: "sky",
  },
  {
    label: "Lycée",
    href: "/lycee",
    desc: "Seconde, Première, Terminale — Maîtriser, raisonner et réinvestir.",
    accent: "ember",
  },
  {
    label: "Professeurs",
    href: "/professeurs",
    desc: "Guides pédagogiques, méthodes et fiches par personnage.",
    accent: "jade",
  },
  {
    label: "Ressources",
    href: "/ressources",
    desc: "Supports, outils et documents pour accompagner l'apprentissage.",
    accent: "gold",
  },
] as const;

const ACCENT = {
  jade:  { text: "text-jade",  border: "border-jade/30",  bg: "bg-jade/[0.05]",  hover: "hover:border-jade/50 hover:bg-jade/[0.09]"  },
  gold:  { text: "text-gold",  border: "border-gold/30",  bg: "bg-gold/[0.05]",  hover: "hover:border-gold/50 hover:bg-gold/[0.09]"  },
  sky:   { text: "text-sky",   border: "border-sky/30",   bg: "bg-sky/[0.05]",   hover: "hover:border-sky/50 hover:bg-sky/[0.09]"   },
  ember: { text: "text-ember", border: "border-ember/30", bg: "bg-ember/[0.05]", hover: "hover:border-ember/50 hover:bg-ember/[0.09]" },
};

export default function HomePage() {
  return (
    <main>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
        <div className="mission-grid absolute inset-0 -z-20 opacity-20" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(80,200,164,0.14),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(243,196,91,0.10),transparent_34%),linear-gradient(180deg,rgba(5,8,7,0.06),rgba(9,16,15,0.95))]" />
        <div className="mx-auto max-w-4xl">
          <p className="inline-flex rounded-md border border-jade/35 bg-jade/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Plateforme pédagogique
          </p>
          <h1 className="mt-6 text-5xl font-black leading-[0.98] text-foreground sm:text-6xl lg:text-7xl">
            Académie Kerboeuf
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
            Une plateforme pédagogique structurée pour apprendre,
            s&apos;entraîner et progresser — de la maternelle au lycée.
          </p>
        </div>
      </section>

      {/* ── Niveaux ───────────────────────────────────────────────────────── */}
      <section className="border-t border-white/10 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="mb-8 text-xs font-bold uppercase tracking-[0.22em] text-muted">
            Accès par niveau
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {LEVELS.map((level) => {
              const a = ACCENT[level.accent];
              return (
                <Link
                  key={level.href}
                  href={level.href}
                  className={`group flex flex-col gap-2 rounded-md border p-5 transition ${a.border} ${a.bg} ${a.hover}`}
                >
                  <p className={`text-xs font-bold uppercase tracking-[0.18em] ${a.text}`}>
                    {level.label}
                  </p>
                  <p className="flex-1 text-sm leading-6 text-muted">
                    {level.desc}
                  </p>
                  <span className={`mt-1 text-sm font-black transition group-hover:translate-x-1 ${a.text}`}>
                    Accéder →
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
