import type { Metadata } from "next";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { BackToSchoolChecklist } from "@/components/academy/TeacherBackToSchool";

export const metadata: Metadata = {
  title: "Préparer les premières semaines | Académie Kerboeuf",
  description:
    "Préparez les rituels, les règles de classe, les évaluations diagnostiques et les premières séquences et séances.",
};

export default function BackToSchoolFirstWeeksPage() {
  return (
    <main className="px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Enseignants", href: "/enseignants" },
            { label: "Préparer ma rentrée", href: "/enseignants/rentree" },
            { label: "Préparer les premières semaines" },
          ]}
        />

        <header className="mt-6">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Espace enseignants
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Préparer les premières semaines
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Rituels, règles de classe, évaluations diagnostiques, premières
            séquences et premières séances.
          </p>
        </header>

        <div className="mt-8">
          <BackToSchoolChecklist category="premieres-semaines" />
        </div>
      </div>
    </main>
  );
}
