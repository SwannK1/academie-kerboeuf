import type { Metadata } from "next";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { TeacherClassroomDisplays } from "@/components/teacher-classroom-displays/TeacherClassroomDisplays";

export const metadata: Metadata = {
  title: "Mes affichages de classe | Académie Kerboeuf",
  description:
    "Organisez la checklist des affichages et repères de classe par catégorie, suivez leur statut et imprimez votre liste.",
};

export default function TeacherClassroomDisplaysPage() {
  return (
    <main className="px-4 pb-16 pt-24 sm:px-6 lg:px-8 print:pt-4">
      <div className="mx-auto max-w-5xl">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Enseignants", href: "/enseignants" },
            { label: "Affichages" },
          ]}
        />

        <header className="mt-6 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Espace enseignants
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Mes affichages de classe
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Suivez la préparation de vos affichages par catégorie : indiquez le
            statut de chacun, ajoutez vos propres affichages et filtrez la
            liste. Votre checklist est sauvegardée sur cet appareil.
          </p>
        </header>

        <TeacherClassroomDisplays />
      </div>
    </main>
  );
}
