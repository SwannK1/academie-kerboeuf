import type { Metadata } from "next";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { TeacherSubstituteFolderClient } from "@/components/teacher-substitute-folder/TeacherSubstituteFolderClient";

export const metadata: Metadata = {
  title: "Préparer mon dossier remplaçant | Académie Kerboeuf",
  description:
    "Préparez un dossier remplaçant clair et imprimable : horaires, matériel, rituels, déroulé de la journée, consignes collectives et contacts institutionnels.",
};

export default function TeacherSubstituteFolderPage() {
  return (
    <main className="px-4 pb-16 pt-24 sm:px-6 lg:px-8 print:px-0 print:pb-0 print:pt-0">
      <div className="mx-auto max-w-5xl">
        <div className="print:hidden">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Enseignants", href: "/enseignants" },
              { label: "Dossier remplaçant" },
            ]}
          />
        </div>

        <header className="mt-6 max-w-3xl print:mt-0">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade print:text-black">
            Espace enseignants
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-foreground sm:text-5xl print:text-2xl print:text-black">
            Préparer mon dossier remplaçant
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted print:hidden">
            Construisez une checklist claire pour transmettre les repères
            essentiels à un remplaçant : horaires et récréations, matériel et
            lieux utiles, rituels de classe, déroulé de la journée, consignes
            collectives et contacts institutionnels génériques. Cet outil ne
            permet aucune saisie de texte libre. Votre dossier est sauvegardé
            sur cet appareil uniquement.
          </p>
        </header>

        <TeacherSubstituteFolderClient />
      </div>
    </main>
  );
}
