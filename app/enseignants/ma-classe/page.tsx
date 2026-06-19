import type { Metadata } from "next";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { TeacherClassProfile } from "@/components/academy/TeacherClassProfile";

export const metadata: Metadata = {
  title: "Ma classe | Espace enseignants | Académie Kerboeuf",
  description:
    "Configurez le niveau, le nom de la classe, le nombre d'élèves et la période active. Ce profil reste sur cet appareil.",
};

export default function TeacherClassProfilePage() {
  return (
    <main className="px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Enseignants", href: "/enseignants" },
            { label: "Ma classe" },
          ]}
        />

        <header className="mt-6 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Espace enseignants
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Ma classe
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Ce profil aide les outils de l’organisateur à se présenter avec votre
            niveau et votre période active. Il reste uniquement sur cet appareil :
            aucune donnée n’est envoyée ni partagée.
          </p>
        </header>

        <TeacherClassProfile />
      </div>
    </main>
  );
}
