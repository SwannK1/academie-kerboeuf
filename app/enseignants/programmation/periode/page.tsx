import type { Metadata } from "next";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { TeacherPeriodProgression } from "@/components/academy/TeacherPeriodProgressionClient";

export const metadata: Metadata = {
  title: "Progression de période | Espace enseignants | Académie Kerboeuf",
  description:
    "Ordonnez les séquences d'une période en respectant la logique d'une séquence pour une compétence.",
};

export default function PeriodProgressionPage() {
  return (
    <main className="px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Enseignants", href: "/enseignants" },
            { label: "Programmation", href: "/enseignants/programmation" },
            { label: "Progression de période" },
          ]}
        />

        <header className="mt-6 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-sky">
            Espace enseignants
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Progression de période
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Choisissez un niveau et une période pour ordonner concrètement les
            séquences prévues, sans réorganiser la programmation annuelle.
          </p>
        </header>

        <div className="mt-10">
          <TeacherPeriodProgression />
        </div>
      </div>
    </main>
  );
}
