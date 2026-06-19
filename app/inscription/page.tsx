import type { Metadata } from "next";
import Link from "next/link";
import { SignupForm } from "./signup-form";

export const metadata: Metadata = {
  title: "Créer un compte | Académie Kerboeuf",
  description: "Créez votre compte enseignant pour accéder à votre espace privé.",
};

export default function InscriptionPage() {
  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-md flex-col justify-center px-4 py-16 sm:px-6">
      <h1 className="text-2xl font-black text-foreground">Créer un compte</h1>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        Créez votre compte enseignant pour retrouver vos classes depuis plusieurs appareils.
      </p>

      <SignupForm />

      <p className="mt-6 text-sm text-muted">
        Déjà un compte ?{" "}
        <Link href="/connexion" className="font-bold text-sky hover:underline">
          Se connecter
        </Link>
      </p>
    </main>
  );
}
