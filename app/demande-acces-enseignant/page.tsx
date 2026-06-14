import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";

export const metadata: Metadata = {
  title: "Demande d'accès enseignant | Académie Kerboeuf",
  description:
    "L'accès enseignant à l'Académie Kerboeuf sera ouvert progressivement.",
};

export default function DemandeAccesEnseignantPage() {
  return (
    <main className="px-4 pt-24 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Demande d'accès enseignant" },
          ]}
        />

        <div className="mt-8 rounded-2xl border border-panel-soft bg-panel p-8">
          <h1 className="text-2xl font-bold text-foreground">
            Accès enseignant
          </h1>
          <p className="mt-4 text-muted">
            L&apos;Espace enseignant de l&apos;Académie Kerboeuf est en cours
            de construction. Il permettra bientôt de créer sa programmation,
            sa progression, de sauvegarder une sélection de ressources et de
            retrouver ses fiches.
          </p>
          <p className="mt-4 text-muted">
            L&apos;accès sera ouvert progressivement. Aucune inscription
            automatique n&apos;est disponible pour le moment.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/enseignants"
              className="rounded-lg border border-panel-soft px-4 py-2.5 font-semibold text-foreground transition hover:border-gold"
            >
              Découvrir l&apos;Espace enseignant
            </Link>
            <Link
              href="/connexion"
              className="rounded-lg bg-gold px-4 py-2.5 font-semibold text-ink transition hover:opacity-90"
            >
              Connexion enseignant
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
