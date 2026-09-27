import type { Metadata } from "next";
import { MySpace } from "@/components/workspace/MySpace";

export const metadata: Metadata = {
  title: "Mon espace",
  description: "Profil, sauvegarde et restauration de votre travail.",
  robots: { index: false, follow: true },
};

export default function MonEspacePage() {
  return (
    <main id="contenu-principal" className="px-4 pb-24 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 font-serif text-3xl font-semibold sm:text-4xl">Mon espace</h1>
        <MySpace />
      </div>
    </main>
  );
}
