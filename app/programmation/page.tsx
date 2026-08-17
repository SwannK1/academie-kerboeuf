import type { Metadata } from "next";
import Link from "next/link";
import { ProgrammingLevelPicker } from "./_components/programming-level-picker";

export const metadata: Metadata = {
  alternates: { canonical: "/programmation" },
  title: "Programmation et progression | Académie Kerboeuf",
  description:
    "Outil enseignant pour choisir un niveau, consulter sa programmation par période et préparer une progression pour l'année scolaire.",
};

export default function ProgrammingPage() {
  return (
    <main className="px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Outil public pour toutes les classes
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Programmation et progression
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Choisissez un niveau pour voir sa programmation, organisez vos
            progressions par période et préparez l’année scolaire.
          </p>
        </header>

        <nav
          aria-label="Actions rapides"
          className="mt-8 flex flex-col gap-3 sm:flex-row"
        >
          <Link
            href="#choisir-niveau"
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-jade px-5 text-sm font-black text-ink transition hover:bg-jade/90"
          >
            Créer ma programmation
          </Link>
          <Link
            href="#progression"
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/15 px-5 text-sm font-black text-foreground transition hover:border-jade/50 hover:text-jade"
          >
            Créer ma progression
          </Link>
          <Link
            href="#organisation"
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/15 px-5 text-sm font-black text-foreground transition hover:border-jade/50 hover:text-jade"
          >
            Organiser mes classes
          </Link>
        </nav>

        <ProgrammingLevelPicker />

        <section
          id="progression"
          className="mt-10 scroll-mt-24 rounded-lg border border-white/10 bg-white/[0.04] p-5 sm:p-6"
        >
          <h2 className="text-xl font-black text-foreground">
            Organiser une progression
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted">
            Ordonnez les notions et les compétences du niveau choisi pour
            construire une progression cohérente sur l’année.
          </p>
        </section>

        <section
          id="organisation"
          className="mt-6 scroll-mt-24 rounded-lg border border-white/10 bg-white/[0.04] p-5 sm:p-6"
        >
          <h2 className="text-xl font-black text-foreground">
            Organiser mes classes
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted">
            Retrouvez la programmation et la progression de chacune de vos
            classes à partir d’un même point d’entrée.
          </p>
        </section>

        <section className="mt-6 rounded-lg border border-gold/25 bg-gold/[0.05] p-5 sm:p-6">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">
            Fonctionnalités à venir
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-7 text-muted">
            <li>Déplacer les items entre les périodes</li>
            <li>Ajouter une compétence ou un élément personnalisé</li>
            <li>Réordonner la progression par période</li>
            <li>Sauvegarder sa progression</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
