import Link from "next/link";
import { Icon, type IconName } from "@/components/icons/Icon";
import { Onboarding } from "@/components/workspace/Onboarding";
import { HomeSwitch } from "@/components/workspace/HomeCockpit";
import { getVisibleCollections, publishedResources } from "@/lib/resources/library";

const TODAY_ACTIONS: { href: string; title: string; text: string; icon: IconName }[] = [
  { href: "/ressources", title: "Trouver une ressource", text: "Leçons, exercices, évaluations prêts à imprimer.", icon: "search" },
  { href: "/enseigner", title: "Préparer ma journée", text: "Votre emploi du temps est déjà là.", icon: "calendar" },
  { href: "/enseigner/semaine", title: "Construire une séance", text: "Matière, notion, ressource : quelques clics.", icon: "presentation" },
  { href: "/enseigner/periode", title: "Voir ma progression", text: "Ce qui est prévu, commencé, travaillé.", icon: "check-circle" },
];

const LEVEL_GROUPS: { title: string; levels: string[]; detail: string; href: string }[] = [
  { title: "Maternelle", levels: ["ps", "ms", "gs"], detail: "PS · MS · GS", href: "/ressources?niveau=ms" },
  { title: "Élémentaire", levels: ["cp", "ce1", "ce2", "cm1", "cm2"], detail: "CP · CE1 · CE2 · CM1 · CM2", href: "/ressources?niveau=ce1" },
  { title: "Collège", levels: ["6e", "5e", "4e", "3e"], detail: "6e · 5e · 4e · 3e", href: "/ressources?niveau=6e" },
];

export default function Home() {
  const count = (levels: string[]) =>
    publishedResources.filter((u) => levels.includes(u.level)).reduce((sum, u) => sum + u.files.length, 0);
  const liaison = getVisibleCollections().find((c) => c.id === "liaison-cm2-6e");

  return (
    <main id="contenu-principal" className="px-4 pb-20 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <HomeSwitch
          landing={
            <>
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold">Académie Kerboeuf</p>
        <h1 className="mt-3 max-w-3xl font-serif text-[2.1rem] font-semibold leading-[1.12] text-foreground sm:text-5xl">
          Préparer sa classe. Piloter son école. Trouver les bonnes ressources.
        </h1>

        <section aria-labelledby="aujourdhui" className="mt-10">
          <h2 id="aujourdhui" className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            Pour enseigner aujourd&apos;hui
          </h2>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {TODAY_ACTIONS.map((action) => (
              <li key={action.href}>
                <Link
                  href={action.href}
                  className="group flex h-full flex-col rounded-2xl border border-line bg-panel-soft p-5 transition hover:-translate-y-0.5 hover:border-ink/25 hover:shadow-[0_18px_40px_-28px_rgba(43,36,32,0.6)]"
                >
                  <span className="grid size-10 place-items-center rounded-xl bg-gold/10 text-gold">
                    <Icon name={action.icon} className="h-5 w-5" />
                  </span>
                  <span className="mt-4 font-serif text-xl font-semibold leading-snug">{action.title}</span>
                  <span className="mt-1 text-sm leading-6 text-muted">{action.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-10">
          <Onboarding />
        </div>

        <section aria-labelledby="diriger" className="mt-10 rounded-2xl border border-line p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 id="diriger" className="font-serif text-2xl font-semibold">Direction d&apos;école</h2>
              <p className="mt-1 text-sm text-muted">Savoir quoi préparer, anticiper et ne pas oublier. Sources officielles citées.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href="/direction" className="btn btn-primary">Tableau de bord</Link>
              <Link href="/direction/reunions?nouveau=conseil-ecole" className="btn btn-secondary">Conseil d&apos;école</Link>
              <Link href="/direction/demarches/sortie" className="btn btn-secondary">Organiser une sortie</Link>
            </div>
          </div>
        </section>

        <section aria-labelledby="niveaux" className="mt-10">
          <h2 id="niveaux" className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Ressources par niveau</h2>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {LEVEL_GROUPS.map((group) => (
              <li key={group.title}>
                <Link href={group.href} className="flex h-full flex-col rounded-2xl border border-line bg-panel-soft p-5 transition hover:border-ink/25">
                  <span className="font-serif text-xl font-semibold">{group.title}</span>
                  <span className="mt-1 text-sm text-muted">{group.detail}</span>
                  <span className="mt-4 text-sm font-medium text-gold">{count(group.levels)} PDF disponibles</span>
                </Link>
              </li>
            ))}
            {liaison ? (
              <li>
                <Link href="/ressources?collection=liaison-cm2-6e" className="flex h-full flex-col rounded-2xl border border-line bg-panel-soft p-5 transition hover:border-ink/25">
                  <span className="font-serif text-xl font-semibold">Liaison CM2 → 6e</span>
                  <span className="mt-1 text-sm text-muted">La continuité école-collège</span>
                  <span className="mt-4 text-sm font-medium text-gold">{liaison.count} ressources</span>
                </Link>
              </li>
            ) : null}
          </ul>
        </section>

        <p className="mt-10 text-sm text-muted">
          Sans inscription : vos préparations, favoris et récents restent sur cet appareil.{" "}
          <Link href="/mon-espace" className="underline decoration-ink/25 hover:text-foreground">Mon espace</Link>
        </p>
            </>
          }
        />
      </div>
    </main>
  );
}
