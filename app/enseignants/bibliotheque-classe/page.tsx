import type { Metadata } from "next";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { ClassLibraryClient } from "@/components/teacher-class-library/ClassLibraryClient";

export const metadata: Metadata = {
  title: "Ma bibliothèque de classe | Académie Kerboeuf",
  description:
    "Inventoriez et organisez votre bibliothèque de classe : livres, BD, documentaires et autres ressources, avec recherche, filtres et favoris.",
};

export default function ClassLibraryPage() {
  return (
    <main className="px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Enseignants", href: "/enseignants" },
            { label: "Ma bibliothèque de classe" },
          ]}
        />

        <header className="mt-6 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Espace enseignants
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Ma bibliothèque de classe
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Ajoutez vos livres et ressources, organisez-les par catégorie,
            niveau et thème, marquez vos favoris et imprimez l’inventaire.
            Les données sont sauvegardées sur cet appareil.
          </p>
        </header>

        <ClassLibraryClient />
      </div>
    </main>
  );
}
