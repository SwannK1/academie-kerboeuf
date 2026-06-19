import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Connexion | Académie Kerboeuf",
  description: "Connectez-vous à votre espace enseignant privé.",
};

export default async function ConnexionPage({
  searchParams,
}: {
  searchParams: Promise<{ redirectTo?: string; confirmation?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-md flex-col justify-center px-4 py-16 sm:px-6">
      <h1 className="text-2xl font-black text-foreground">Connexion</h1>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        Accédez à votre espace enseignant privé.
      </p>

      {params.confirmation === "envoyee" ? (
        <p className="mt-4 rounded-md border border-sky/25 bg-sky/[0.05] p-3 text-sm text-foreground">
          Un email de confirmation vous a été envoyé. Validez-le avant de vous connecter.
        </p>
      ) : null}

      <LoginForm redirectTo={params.redirectTo ?? "/espace"} />

      <p className="mt-6 text-sm text-muted">
        Pas encore de compte ?{" "}
        <Link href="/inscription" className="font-bold text-sky hover:underline">
          Créer un compte
        </Link>
      </p>
    </main>
  );
}
