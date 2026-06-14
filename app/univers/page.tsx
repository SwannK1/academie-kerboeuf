import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";

export const metadata: Metadata = {
  title: "Univers | Académie Kerboeuf",
  description:
    "L'Académie Kerboeuf — un univers pédagogique où personnages et lieux servent les apprentissages.",
};

const portalCards = [
  {
    title: "Personnages",
    description:
      "Les héros et figures que les élèves rencontrent dans leurs missions.",
    href: "/personnages",
    accent: "text-jade",
    border: "border-jade/35",
  },
  {
    title: "Professeurs",
    description:
      "Les personnages référents de l'Académie, chacun lié à une matière.",
    href: "/professeurs",
    accent: "text-gold",
    border: "border-gold/35",
  },
  {
    title: "Carte de l'Académie",
    description: "Les lieux pédagogiques et leur fonction dans les apprentissages.",
    href: "/carte",
    accent: "text-sky",
    border: "border-sky/35",
  },
];

export default function UniversPage() {
  return (
    <main>
      {/* ── Breadcrumb ──────────────────────────────────────────────────────── */}
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[{ label: "Accueil", href: "/" }, { label: "Univers" }]}
          />
        </div>
      </div>

      {/* ── Introduction ────────────────────────────────────────────────────── */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-jade">
            Académie Kerboeuf
          </p>
          <h1 className="mt-4 text-4xl font-black text-foreground sm:text-5xl">
            L&apos;univers Académie Kerboeuf
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted">
            L&apos;Académie Kerboeuf est un univers pédagogique fictif. Les
            personnages et les lieux ne sont pas une fin en soi — ils donnent
            du sens aux apprentissages et motivent l&apos;entrée dans les
            tâches scolaires.
          </p>
        </div>
      </section>

      {/* ── Portail ─────────────────────────────────────────────────────────── */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {portalCards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className={`group rounded-md border p-6 ${card.border} bg-white/[0.04] transition hover:bg-white/[0.07]`}
            >
              <h2 className="text-xl font-black text-foreground">
                {card.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted">
                {card.description}
              </p>
              <span
                className={`mt-4 inline-flex items-center gap-2 text-sm font-bold ${card.accent} transition group-hover:text-foreground`}
              >
                Découvrir →
              </span>
            </Link>
          ))}

          {/* Badges : route non existante, bloc non cliquable */}
          <div className="rounded-md border border-ember/35 bg-white/[0.04] p-6 opacity-70">
            <h2 className="text-xl font-black text-foreground">Badges</h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              Le système de badges de l&apos;Académie arrive prochainement.
            </p>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-ember">
              Bientôt disponible
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
