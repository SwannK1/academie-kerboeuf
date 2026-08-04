import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { TeacherEndOfPeriodClient } from "@/components/teacher-end-of-period/TeacherEndOfPeriodClient";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Préparer ma fin de période",
  description:
    "Organisez la clôture d'une période scolaire : checklist par catégorie, tâches personnalisées et notes de bilan. Sauvegarde sur cet appareil.",
  path: "/enseignants/fin-periode",
});

export default function TeacherEndOfPeriodPage() {
  return (
    <main id="main-content" className="px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Enseignants", href: "/enseignants" },
            { label: "Fin de période" },
          ]}
        />

        <header className="mt-6 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Espace enseignants
          </p>
          <h1 className="mt-4 break-words text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Préparer ma fin de période
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Choisissez une période, suivez votre checklist de clôture par
            catégorie et notez votre bilan. Votre progression est sauvegardée
            sur cet appareil.
          </p>
        </header>

        <TeacherEndOfPeriodClient />
      </div>
    </main>
  );
}
