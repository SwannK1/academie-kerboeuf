import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { isAuthConfigured } from "@/lib/auth/config";
import { LoginForm } from "./login-form";

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
            <LoginForm />
          ) : (
            <div
              role="status"
              className="mt-8 rounded-lg border border-panel-soft bg-background p-4 text-sm text-muted"
            >
              <p className="font-medium text-foreground">
                La connexion enseignant n&apos;est pas encore configurée.
              </p>
              <p className="mt-1">Revenez bientôt.</p>
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
