import type { Metadata } from "next";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { TeacherClassroomMaterials } from "@/components/teacher-classroom-materials/TeacherClassroomMaterials";

export const metadata: Metadata = {
  title: "Gérer mon matériel de classe | Académie Kerboeuf",
  description:
    "Inventoriez le matériel de votre classe par catégorie, suivez les quantités disponibles et préparez vos commandes.",
};

export default function TeacherClassroomMaterialsPage() {
  return (
    <main className="px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Enseignants", href: "/enseignants" },
            { label: "Matériel de classe" },
          ]}
        />

        <header className="mt-6 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Espace enseignants
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Gérer mon matériel de classe
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Ajoutez le matériel de votre classe, suivez les quantités
            disponibles et repérez en un coup d’œil ce qu’il faut commander.
            Votre inventaire est sauvegardé sur cet appareil.
          </p>
        </header>

        <TeacherClassroomMaterials />
      </div>
    </main>
  );
}
