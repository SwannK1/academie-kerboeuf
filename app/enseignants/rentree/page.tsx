import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";

export const metadata: Metadata = {
  title: "Préparer la rentrée | Académie Kerboeuf",
  description:
    "Outils pour préparer la rentrée de classe : commandes de matériel et suivi de réception.",
};

export default function TeacherRentreePage() {
  return (
    <main className="px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Enseignants", href: "/enseignants" },
            { label: "Rentrée" },
          ]}
        />

        <header className="mt-6 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Espace enseignants
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Préparer la rentrée
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Outils pratiques pour organiser le début d’année.
          </p>
        </header>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2" role="list">
          <li>
            <Link
              href="/enseignants/rentree/commandes"
              className="block rounded-lg border border-jade/25 bg-jade/[0.05] p-5 transition hover:border-jade/50 sm:p-6"
            >
              <p className="text-lg font-black text-foreground">
                Commandes et inventaire
              </p>
              <p className="mt-2 text-sm leading-7 text-muted">
                Listez le matériel à commander, suivez son statut et estimez
                le budget.
              </p>
            </Link>
          </li>
        </ul>
      </div>
    </main>
  );
}
