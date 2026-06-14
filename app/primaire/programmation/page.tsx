import type { Metadata } from "next";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { ProgrammationView } from "@/components/academy/programmation-view";

export const metadata: Metadata = {
  title: "Programmation et progression | Académie Kerboeuf",
  description:
    "Préparez l'année, organisez les périodes et suivez l'ordre des apprentissages pour le primaire.",
};

export default function ProgrammationPage() {
  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Primaire", href: "/primaire" },
              { label: "Programmation et progression" },
            ]}
          />
        </div>
      </div>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Programmation et progression
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
            Préparez l’année, organisez les périodes et suivez l’ordre des
            apprentissages.
          </p>
        </div>
      </section>

      <section className="border-t border-white/10 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <ProgrammationView />
        </div>
      </section>
    </main>
  );
}
