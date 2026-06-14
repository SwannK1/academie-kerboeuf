import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { isAuthConfigured } from "@/lib/auth/config";

export const metadata: Metadata = {
  title: "Connexion enseignant | Académie Kerboeuf",
  description: "Connexion à l'Espace enseignant de l'Académie Kerboeuf.",
};

export default function ConnexionPage() {
  const configured = isAuthConfigured();

  return (
    <main className="px-4 pt-24 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md">
        <Breadcrumb
          items={[{ label: "Accueil", href: "/" }, { label: "Connexion" }]}
        />

        <div className="mt-8 rounded-2xl border border-panel-soft bg-panel p-8">
          <h1 className="text-2xl font-bold text-foreground">
            Connexion enseignant
          </h1>
          <p className="mt-2 text-sm text-muted">
            Accédez à votre espace personnel : programmation, progression,
            sélection et fiches.
          </p>

          {configured ? (
            <form className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground"
                >
                  Adresse e-mail
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="mt-1 w-full rounded-lg border border-panel-soft bg-background px-3 py-2 text-foreground focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-foreground"
                >
                  Mot de passe
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="mt-1 w-full rounded-lg border border-panel-soft bg-background px-3 py-2 text-foreground focus:border-gold focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-gold px-4 py-2.5 font-semibold text-ink transition hover:opacity-90"
              >
                Se connecter
              </button>
            </form>
          ) : (
            <div
              role="status"
              className="mt-8 rounded-lg border border-panel-soft bg-background p-4 text-sm text-muted"
            >
              <p className="font-medium text-foreground">
                Configuration auth manquante
              </p>
              <p className="mt-1">
                La connexion enseignant n&apos;est pas encore activée sur cet
                environnement. Revenez bientôt.
              </p>
            </div>
          )}

          <p className="mt-6 text-center text-sm text-muted">
            Pas encore de compte ?{" "}
            <Link
              href="/demande-acces-enseignant"
              className="font-medium text-gold hover:underline"
            >
              Demander un accès enseignant
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
