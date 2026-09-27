import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

/**
 * Anciens outils, conservés le temps que chacun récupère ses données
 * locales. Ils ne sont plus liés depuis la navigation (voir
 * docs/refonte-2026/inventaire.md).
 */
export default function ArchivesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="no-print fixed inset-x-0 top-16 z-40 border-b border-gold/30 bg-[#f6ead2] px-4 py-2 text-center text-sm text-foreground">
        Outil archivé : vos données restent sur cet appareil.{" "}
        <Link href="/enseigner" className="font-semibold underline">
          Retrouver le nouvel espace Enseigner
        </Link>
      </div>
      <div className="pt-10">{children}</div>
    </>
  );
}
