import Link from "next/link";
import { Suspense } from "react";
import { ResourceLibrary } from "@/components/ressources/ResourceLibrary";
import { Skeleton } from "@/components/workspace/ui";
import { buildPageMetadata } from "@/content/seo";
import { publishedResources } from "@/lib/resources/library";

export const metadata = buildPageMetadata({
  title: "Ressources",
  description: "Leçons, exercices et évaluations en PDF de la PS à la 3e : cherchez, prévisualisez, imprimez, ajoutez à votre semaine.",
  path: "/ressources",
});

export default function RessourcesPage() {
  const files = publishedResources.reduce((sum, unit) => sum + unit.files.length, 0);

  return (
    <main id="contenu-principal" className="px-4 pb-24 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Ressources</h1>
        <p className="mt-2 max-w-2xl text-muted">
          {files} PDF prêts à imprimer. Seules les ressources réellement disponibles sont affichées.
        </p>
        <div className="mt-6">
          <Suspense fallback={<Skeleton className="h-14" />}>
            <ResourceLibrary />
          </Suspense>
        </div>
        <nav aria-label="Parcourir par niveau" className="mt-16 border-t border-line pt-6 text-sm text-muted">
          Parcourir aussi par programme :{" "}
          <Link href="/maternelle" className="underline decoration-ink/25 hover:text-foreground">maternelle</Link>,{" "}
          <Link href="/primaire" className="underline decoration-ink/25 hover:text-foreground">élémentaire</Link>,{" "}
          <Link href="/college" className="underline decoration-ink/25 hover:text-foreground">collège</Link>,{" "}
          <Link href="/enseignants/liaison-cm2-6e" className="underline decoration-ink/25 hover:text-foreground">liaison CM2 → 6e</Link>.
        </nav>
      </div>
    </main>
  );
}
