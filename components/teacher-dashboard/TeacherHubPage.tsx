import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import type { TeacherHub } from "@/content/teacher-hubs";

export function TeacherHubPage({ hub }: { hub: TeacherHub }) {
  return (
    <main id="contenu-principal" className="px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Préparer ma classe", href: "/enseignants" },
            { label: hub.title },
          ]}
        />

        <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-gold">
          Préparer ma classe
        </p>
        <h1 className="mt-4 text-4xl font-black text-foreground sm:text-5xl">
          {hub.title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-muted">
          {hub.description}
        </p>

        <section aria-labelledby="outils-du-parcours" className="mt-10">
          <h2 id="outils-du-parcours" className="text-xl font-black text-foreground">
            Outils de ce parcours
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {hub.tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group flex min-h-44 flex-col rounded-md border border-white/12 bg-white/[0.04] p-5 transition hover:border-gold/40 hover:bg-gold/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                <span aria-hidden="true" className="text-2xl">{tool.icon}</span>
                <h3 className="mt-3 text-lg font-black text-foreground">{tool.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-muted">{tool.description}</p>
                <span className="mt-4 text-sm font-black text-gold transition group-hover:translate-x-1">
                  Ouvrir →
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
