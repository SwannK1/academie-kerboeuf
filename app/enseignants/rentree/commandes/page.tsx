import type { Metadata } from "next";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { TeacherOrders } from "@/components/academy/TeacherOrders";

export const metadata: Metadata = {
  title: "Commandes et inventaire | Académie Kerboeuf",
  description:
    "Préparez vos commandes de rentrée et suivez la réception du matériel : articles, catégories, quantités, fournisseurs et budget estimé.",
};

export default function TeacherOrdersPage() {
  return (
    <main className="px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Enseignants", href: "/enseignants" },
            { label: "Rentrée", href: "/enseignants/rentree" },
            { label: "Commandes et inventaire" },
          ]}
        />

        <header className="mt-6 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Espace enseignants
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Commandes et inventaire
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Listez le matériel à commander pour la rentrée, suivez son statut
            de la demande jusqu’à la réception et gardez un œil sur le budget
            estimé. Les données restent uniquement sur cet appareil.
          </p>
        </header>

        <TeacherOrders />
      </div>
    </main>
  );
}
