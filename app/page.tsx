import Link from "next/link";
import { Icon, type IconName } from "@/components/icons/Icon";
import { Onboarding } from "@/components/workspace/Onboarding";
import { publishedResources } from "@/lib/resources/library";

const SPACES: { href: string; title: string; promise: string; detail: string; icon: IconName }[] = [
  {
    href: "/enseigner",
    title: "Enseigner",
    promise: "Préparer mes journées et mon année.",
    detail: "Emploi du temps, semaine, séances, cahier journal, progression.",
    icon: "calendar",
  },
  {
    href: "/direction",
    title: "Direction",
    promise: "Organiser et piloter mon école.",
    detail: "Échéances, conseils, démarches guidées, sources officielles.",
    icon: "building",
  },
  {
    href: "/ressources",
    title: "Ressources",
    promise: "Trouver un support prêt à utiliser.",
    detail: "Leçons, exercices, évaluations en PDF, de la PS à la 3e.",
    icon: "books",
  },
];

export default function Home() {
  const pdfCount = publishedResources.reduce((sum, unit) => sum + unit.files.length, 0);

  return (
    <main id="contenu-principal" className="px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold">Académie Kerboeuf</p>
        <h1 className="mt-4 max-w-3xl font-serif text-4xl font-semibold leading-[1.1] text-foreground sm:text-[3.4rem]">
          Préparer sa classe. Piloter son école. Trouver les bonnes ressources.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
          On clique, on choisit, on déplace, on imprime. On écrit seulement quand c&apos;est vraiment utile.
        </p>

        <div className="mt-10">
          <Onboarding />
        </div>

        <nav aria-label="Espaces" className="mt-10 grid gap-4 md:grid-cols-3">
          {SPACES.map((space) => (
            <Link
              key={space.href}
              href={space.href}
              className="group flex flex-col rounded-2xl border border-line bg-panel-soft p-6 transition hover:-translate-y-0.5 hover:border-ink/25 hover:shadow-[0_18px_40px_-28px_rgba(43,36,32,0.6)]"
            >
              <span className="grid size-11 place-items-center rounded-xl bg-gold/10 text-gold">
                <Icon name={space.icon} className="h-5 w-5" />
              </span>
              <span className="mt-5 font-serif text-2xl font-semibold text-foreground">{space.title}</span>
              <span className="mt-1 text-[15px] font-medium text-foreground">{space.promise}</span>
              <span className="mt-2 text-sm leading-6 text-muted">{space.detail}</span>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold">
                Ouvrir
                <Icon name="arrow-right" className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </nav>

        <p className="mt-10 text-sm text-muted">
          {pdfCount} PDF disponibles aujourd&apos;hui, tous téléchargeables et imprimables. Vos préparations restent sur cet
          appareil, sans inscription.
        </p>
      </div>
    </main>
  );
}
