import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";

export const metadata: Metadata = {
  title: "Préparer la rentrée | Académie Kerboeuf",
  description:
    "Outils pour préparer la rentrée : étiquettes élèves, repères de classe et checklist de documents, à imprimer depuis le navigateur.",
};

export default function TeacherBackToSchoolPage() {
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
            Des outils simples pour préparer la classe avant l’arrivée des
            élèves.
          </p>
        </header>

        <article className="mt-8 flex flex-col rounded-lg border border-sky/25 bg-sky/[0.05] p-5 sm:p-6">
          <h2 className="text-xl font-black text-foreground">
            Étiquettes et documents de rentrée
          </h2>
          <p className="mt-3 flex-1 text-sm leading-7 text-muted">
            Préparez des étiquettes pour les cahiers, le porte-manteau, les
            casiers et les boîtes, des repères de classe et une checklist de
            documents à préparer.
          </p>
          <Link
            href="/enseignants/rentree/etiquettes"
            className="mt-5 inline-flex min-h-11 items-center justify-center rounded-md border border-sky/35 bg-sky/10 px-4 text-center text-sm font-black text-sky transition hover:bg-sky hover:text-ink"
          >
            Ouvrir les étiquettes de rentrée
          </Link>
        </article>
      </div>
    </main>
  );
}
