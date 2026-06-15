import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";

export const metadata: Metadata = {
  title: "Univers | Académie Kerboeuf",
  description:
    "L'Académie Kerboeuf — un univers pédagogique où personnages et lieux servent les apprentissages.",
};

const entries = [
  {
    title: "Personnages",
    description:
      "Les élèves-guides et les professeurs qui accompagnent les apprentissages, de la maternelle au lycée.",
    href: "/personnages",
    accent: "gold",
  },
  {
    title: "Carte",
    description:
      "Vue d'ensemble de l'Académie — les quatre ailes, les lieux transversaux et toutes les portes d'entrée.",
    href: "/carte",
    accent: "jade",
  },
  {
    title: "Méthode",
    description:
      "Comment fonctionne l'Académie : le rôle du site, des PDF, des séquences et des progressions.",
    href: "/methode",
    accent: "sky",
  },
] as const;

const accentText: Record<(typeof entries)[number]["accent"], string> = {
  gold: "text-gold",
  jade: "text-jade",
  sky: "text-sky",
};
const accentBorder: Record<(typeof entries)[number]["accent"], string> = {
  gold: "border-gold/35",
  jade: "border-jade/35",
  sky: "border-sky/35",
};

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
            Un univers au service des apprentissages
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted">
            L&apos;Académie Kerboeuf est un univers pédagogique fictif. Les
            personnages et les lieux ne sont pas une fin en soi — ils donnent
            du sens aux apprentissages, structurent les démarches et motivent
            l&apos;entrée dans les tâches scolaires.
          </p>
        </div>
      </section>

      {/* ── Portail ─────────────────────────────────────────────────────────── */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 sm:grid-cols-3">
            {entries.map((entry) => (
              <Link
                key={entry.href}
                href={entry.href}
                className={`group rounded-md border p-6 transition hover:-translate-y-1 hover:bg-white/[0.06] ${accentBorder[entry.accent]} bg-white/[0.04]`}
              >
                <h2 className={`text-2xl font-black ${accentText[entry.accent]}`}>
                  {entry.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-muted">
                  {entry.description}
                </p>
                <p
                  className={`mt-5 text-sm font-bold transition group-hover:translate-x-1 ${accentText[entry.accent]}`}
                >
                  Explorer →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
