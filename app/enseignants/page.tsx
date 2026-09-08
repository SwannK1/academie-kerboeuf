import { buildPageMetadata } from "@/content/seo";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { teacherHubs } from "@/content/teacher-hubs";

export const metadata = buildPageMetadata({
  title: "Préparer ma classe",
  description: "Préparez votre année, votre semaine et l’organisation de votre classe.",
  path: "/enseignants",
});

export default function TeachersPage() {
  return (
    <main id="contenu-principal" className="px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Préparer ma classe" },
          ]}
        />

        <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-gold">
          Espace enseignants
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight text-foreground sm:text-5xl">
          Préparer ma classe
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-muted">
          Choisissez le moment de préparation qui correspond à votre besoin.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {teacherHubs.map((hub, index) => (
            <Link
              key={hub.slug}
              href={`/enseignants/${hub.slug}`}
              className={`group flex min-h-56 flex-col rounded-md border p-6 transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
                index === 0
                  ? "border-gold/40 bg-gold/[0.07] hover:bg-gold/[0.11]"
                  : "border-white/12 bg-white/[0.04] hover:border-gold/30 hover:bg-white/[0.07]"
              }`}
            >
              <span aria-hidden="true" className="text-3xl">{hub.icon}</span>
              <h2 className="mt-4 text-2xl font-black text-foreground">
                {hub.title}
              </h2>
              <p className="mt-3 flex-1 text-sm leading-7 text-muted">
                {hub.shortDescription}
              </p>
              <span className="mt-5 text-sm font-black text-gold transition group-hover:translate-x-1">
                Ouvrir →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
