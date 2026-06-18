import type { Metadata } from "next";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { TeacherYearlyProgrammation } from "@/components/academy/TeacherYearlyProgrammation";

export const metadata: Metadata = {
  title: "Programmation annuelle | Académie Kerboeuf",
  description:
    "Choisissez un niveau, puis organisez les séquences par période pour préparer votre programmation annuelle.",
};

export default function TeacherYearlyProgrammationPage() {
  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Enseignants", href: "/enseignants" },
              { label: "Programmation annuelle" },
            ]}
          />
        </div>
      </div>

      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
            Espace enseignants
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Programmation annuelle
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted">
            Choisissez un niveau, puis organisez les séquences par période.
          </p>

          <TeacherYearlyProgrammation />
        </div>
      </section>
    </main>
  );
}
