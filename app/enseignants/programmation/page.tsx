import type { Metadata } from "next";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { TeacherYearlyProgrammation } from "@/components/academy/TeacherYearlyProgrammationClient";

export const metadata: Metadata = {
  title: "Programmation annuelle | Espace enseignants | Académie Kerboeuf",
  description:
    "Choisissez un niveau, puis organisez les séquences de l'année par période et par matière.",
};

export default function TeacherYearlyProgrammationPage() {
  return (
    <main className="px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Enseignants", href: "/enseignants" },
            { label: "Programmation" },
          ]}
        />

        <header className="mt-6 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Espace enseignants
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Créer ma programmation
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Organisez les séquences de l&apos;année par période, matière et
            niveau.
          </p>
        </header>

        <div className="mt-10">
          <TeacherYearlyProgrammation />
        </div>
      </div>
    </main>
  );
}
