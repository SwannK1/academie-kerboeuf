import type { Metadata } from "next";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { BackToSchoolChecklist } from "@/components/academy/TeacherBackToSchool";

export const metadata: Metadata = {
  title: "Installer ma classe | Académie Kerboeuf",
  description:
    "Préparez l'installation de la classe : plan provisoire, étiquettes, rangements et affichages.",
};

export default function BackToSchoolInstallationPage() {
  return (
    <main className="px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Enseignants", href: "/enseignants" },
            { label: "Préparer ma rentrée", href: "/enseignants/rentree" },
            { label: "Installer ma classe" },
          ]}
        />

        <header className="mt-6">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Espace enseignants
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Installer ma classe
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Plan de classe provisoire, étiquettes, porte-manteaux, cahiers,
            casiers, rangements et affichages à préparer.
          </p>
        </header>

        <div className="mt-8">
          <BackToSchoolChecklist category="installation" />
        </div>
      </div>
    </main>
  );
}
