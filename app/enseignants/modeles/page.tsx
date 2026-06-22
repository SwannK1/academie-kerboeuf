import type { Metadata } from "next";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { TeacherTemplateLibraryClient } from "@/components/teacher-template-library/TeacherTemplateLibraryClient";

export const metadata: Metadata = {
  title: "Mes modèles enseignants | Académie Kerboeuf",
  description:
    "Créez et organisez vos modèles personnels réutilisables : séance, réunion parents, commande, projet, checklist ou document.",
};

export default function TeacherTemplateLibraryPage() {
  return (
    <main className="px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Enseignants", href: "/enseignants" },
            { label: "Mes modèles" },
          ]}
        />

        <header className="mt-6 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Espace enseignants
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Mes modèles enseignants
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Sauvegardez vos propres modèles réutilisables (séance, réunion
            parents, commande, projet, checklist, document) pour gagner du
            temps. Ces modèles sont enregistrés uniquement sur cet appareil.
          </p>
        </header>

        <TeacherTemplateLibraryClient />
      </div>
    </main>
  );
}
