import { buildPageMetadata } from "@/content/seo";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { TeacherRoutinesLibrary } from "@/components/teacher-routines-library/TeacherRoutinesLibrary";

export const metadata = buildPageMetadata({
  title: "Mes rituels de classe",
  description:
    "Organisez vos rituels quotidiens, hebdomadaires, mensuels ou ponctuels : créez, filtrez, dupliquez et imprimez vos rituels de classe.",
  path: "/enseignants/rituels",
  noIndex: true,
});

export default function TeacherRoutinesLibraryPage() {
  return (
    <main id="contenu-principal" className="px-4 pb-16 pt-24 sm:px-6 lg:px-8 print:px-0 print:pt-6">
      <div className="mx-auto max-w-5xl">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Enseignants", href: "/enseignants" },
            { label: "Mes rituels de classe" },
          ]}
        />

        <header className="mt-6 max-w-3xl print:hidden">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Espace enseignants
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Mes rituels de classe
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Créez et organisez vos rituels de classe : fréquence, jour, niveau,
            matière, durée, consigne, matériel et objectif. Vos rituels sont
            sauvegardés sur cet appareil — aucun nom d’élève, aucun compte,
            aucun suivi individuel.
          </p>
        </header>

        <TeacherRoutinesLibrary />
      </div>
    </main>
  );
}
