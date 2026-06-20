import type { Metadata } from "next";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { TeacherSubstituteFolder } from "@/components/academy/TeacherSubstituteFolder";

export const metadata: Metadata = {
  title: "Dossier remplaçant | Académie Kerboeuf",
  description:
    "Préparez un dossier générique pour un remplaçant : horaires, matériel, rituels et organisation de la journée, sans donnée personnelle.",
};

export default function TeacherSubstituteFolderPage() {
  return (
    <main className="px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Enseignants", href: "/enseignants" },
            { label: "Dossier remplaçant" },
          ]}
        />

        <header className="mt-6 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Espace enseignants
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Dossier remplaçant
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Rassemblez les informations générales utiles à un remplaçant :
            horaires, matériel, rituels et organisation de la journée. Ce
            dossier est sauvegardé sur cet appareil et ne doit contenir aucune
            donnée personnelle, médicale ou familiale.
          </p>
        </header>

        <TeacherSubstituteFolder />
      </div>
    </main>
  );
}
