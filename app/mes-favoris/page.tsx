import type { Metadata } from "next";
import Link from "next/link";
import { ActivityList } from "@/components/workspace/ActivityList";

export const metadata: Metadata = { title: "Mes favoris", robots: { index: false, follow: true } };

export default function Page() {
  return (
    <main id="contenu-principal" className="px-4 pb-24 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm text-muted">
          <Link href="/mon-espace" className="underline decoration-ink/25">Mon espace</Link>
        </p>
        <h1 className="mb-6 mt-2 font-serif text-3xl font-semibold sm:text-4xl">Mes favoris</h1>
        <ActivityList mode="favoris" />
      </div>
    </main>
  );
}
