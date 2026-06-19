import type { Metadata } from "next";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { TeacherClassroomSetup } from "@/components/academy/TeacherClassroomSetup";

export const metadata: Metadata = {
  title: "Installer ma classe | Académie Kerboeuf",
  description:
    "Une checklist pratique pour préparer plans, étiquettes, affichages et vérifications avant la rentrée en classe.",
};

export default function BackToSchoolInstallationPage() {
  return (
    <main className="px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Enseignants", href: "/enseignants" },
            { label: "Préparer ma rentrée", href: "/enseignants/rentree" },
            { label: "Installer ma classe" },
          ]}
        />

        <header className="mt-6 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Espace enseignants
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Installer ma classe
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Suivez une checklist par section pour préparer votre salle avant
            la rentrée : plans et espaces, étiquettes et repères, affichages
            et vérifications. Votre avancement est sauvegardé sur cet
            appareil.
          </p>
        </header>

        <TeacherClassroomSetup />
      </div>
    </main>
  );
}
