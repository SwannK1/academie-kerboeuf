"use client";

import { useState } from "react";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";

type TabKey = "programmation" | "progression";

const TABS: { key: TabKey; label: string }[] = [
  { key: "programmation", label: "Créer sa programmation" },
  { key: "progression", label: "Créer sa progression" },
];

export default function EnseignantsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("programmation");

  return (
    <main className="px-4 pt-24 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Breadcrumb
          items={[{ label: "Accueil", href: "/" }, { label: "Enseignants" }]}
        />

        <h1 className="mt-6 text-3xl font-bold">Espace enseignant</h1>
        <p className="mt-2 text-sm text-[var(--muted-foreground)]">
          Deux outils simples pour organiser votre année.
        </p>

        <div role="tablist" className="mt-8 flex gap-2 border-b border-[var(--border)]">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              role="tab"
              type="button"
              aria-selected={activeTab === tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? "border-b-2 border-[var(--primary)] text-[var(--primary)]"
                  : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-6">
          {activeTab === "programmation" && (
            <section>
              <h2 className="text-xl font-semibold">Créer sa programmation</h2>
              <p className="mt-3 text-sm leading-relaxed">
                La programmation répartit les compétences sur l&apos;année, période
                par période.
              </p>
              <p className="mt-4 text-sm text-[var(--muted-foreground)]">
                En préparation.
              </p>
              <Link
                href="/primaire/programmation"
                className="mt-4 inline-block text-sm font-semibold text-[var(--primary)] underline"
              >
                Voir la programmation et progression CM2 →
              </Link>
            </section>
          )}

          {activeTab === "progression" && (
            <section>
              <h2 className="text-xl font-semibold">Créer sa progression</h2>
              <p className="mt-3 text-sm leading-relaxed">
                La progression organise l&apos;ordre logique des apprentissages
                dans une matière.
              </p>
              <p className="mt-4 text-sm text-[var(--muted-foreground)]">
                En préparation.
              </p>
            </section>
          )}
        </div>

        <div className="mt-10 border-t border-[var(--border)] pt-6">
          <h2 className="text-xl font-semibold">Fiches par matière</h2>
          <p className="mt-2 text-sm text-[var(--muted-foreground)]">
            Catalogues complets des fiches imprimables, classées par
            sous-domaine et compétence.
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold">
            <Link href="/primaire/cm2/fiches/mathematiques" className="text-[var(--primary)] underline">
              Fiches Mathématiques CM2 →
            </Link>
            <Link href="/primaire/cm2/fiches/francais" className="text-[var(--primary)] underline">
              Fiches Français CM2 →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
