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

const UNIVERSES: Array<{
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
  {
    label: "Professeurs",
    text: "L'équipe pédagogique de l'Académie.",
    href: "/professeurs",
    cta: "Voir l'équipe",
    accent: "jade",
    status: "available",
  },
  {
    label: "Personnages",
    text: "Les guides qui accompagnent chaque niveau.",
    href: "/personnages",
    cta: "Découvrir",
    accent: "gold",
    status: "available",
  },
  {
    label: "Carte",
    text: "Explorer les lieux de l'Académie.",
    href: "/carte",
    cta: "Explorer",
    accent: "sky",
    status: "available",
  },
  {
    label: "Enseignants",
    text: "Préparez vos séances et organisez votre programmation.",
    href: "/enseignants",
    cta: "Accéder",
    accent: "ember",
    status: "available",
  },
  {
    label: "Programmation",
    text: "Planifiez les séquences sur l'année scolaire.",
    href: "/programmation",
    cta: "Voir",
    accent: "jade",
    status: "available",
  },
  {
    label: "Méthode",
    text: "Comment fonctionne l'Académie : séquences, fiches et progressions.",
    href: "/methode",
    cta: "Découvrir",
    accent: "gold",
    status: "available",
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
          <p className="mt-5 text-xl font-bold text-gold sm:text-2xl">
            Choisis ton univers d&apos;apprentissage.
          </p>
        </div>
      </section>

      {/* ── Univers ───────────────────────────────────────────────────────── */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {UNIVERSES.map((universe) => {
            const t = ACCENT[universe.accent];
            return (
              <Link
                key={universe.href}
                href={universe.href}
                className={`group flex min-h-48 flex-col justify-between rounded-md border ${t.border} bg-white/[0.04] p-7 transition hover:-translate-y-1 ${t.hoverBorder} ${t.hoverBg} focus:outline-none focus:ring-2 focus:ring-gold/60`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-2xl font-black text-foreground sm:text-3xl">
                      {universe.label}
                    </h2>
                    <PublicStatusBadge status={universe.status} />
                  </div>
                  <p className="mt-4 text-sm leading-7 text-muted">{universe.text}</p>
                </div>
                <span className="mt-6 inline-flex text-sm font-black text-foreground transition group-hover:translate-x-1">
                  {universe.cta} →
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
