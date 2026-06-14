import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";

export const metadata: Metadata = {
  title: "Espace enseignant | Académie Kerboeuf",
  description:
    "L'Espace enseignant de l'Académie Kerboeuf : programmation, progression, sélection et fiches.",
};

export default function EnseignantsPage() {
  return (
    <main className="px-4 pt-24 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Breadcrumb
          items={[{ label: "Accueil", href: "/" }, { label: "Espace enseignant" }]}
        />

        <h1 className="mt-8 text-3xl font-bold text-foreground">
          Espace enseignant
        </h1>
        <p className="mt-4 text-muted">
          L&apos;Académie Kerboeuf propose un parcours complet, du niveau à la
          fiche : Niveau → Matière → Sous-domaine → Compétence → Fiches. Toutes
          les ressources publiées restent accessibles librement depuis les
          pages des matières.
        </p>
        <p className="mt-4 text-muted">
          L&apos;Espace enseignant personnel permettra bientôt de préparer sa
          programmation, sa progression et sa sélection de ressources, et de
          retrouver rapidement ses fiches.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/connexion"
            className="rounded-lg bg-gold px-4 py-2.5 font-semibold text-ink transition hover:opacity-90"
          >
            Connexion enseignant
          </Link>
          <Link
            href="/demande-acces-enseignant"
            className="rounded-lg border border-panel-soft px-4 py-2.5 font-semibold text-foreground transition hover:border-gold"
          >
            Demander un accès
          </Link>
        </div>
      </div>
    </main>
  );
}
