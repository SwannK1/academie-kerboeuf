import type { Metadata } from "next";
import Link from "next/link";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { getPublicStatus } from "@/content/public-status";

export const metadata: Metadata = {
  title: "Réussir son entrée en 6e | Parcours | Académie Kerboeuf",
  description:
    "Un parcours pour passer du CM2 au collège avec méthode : organisation, lecture de consigne, tenue du cahier, préparation du cartable, apprentissage d'une leçon.",
};

type Bloc = {
  title: string;
  objectif: string;
  competence: string;
  status: unknown;
};

const blocs: Bloc[] = [
  {
    title: "S'organiser",
    objectif:
      "Apprendre à planifier son travail sur la semaine et à respecter les échéances.",
    competence: "Autonomie et organisation personnelle",
    status: "bientôt",
  },
  {
    title: "Lire une consigne",
    objectif:
      "Identifier les mots-clés d'une consigne pour savoir exactement ce qui est attendu.",
    competence: "Compréhension de l'écrit — lecture fonctionnelle",
    status: "bientôt",
  },
  {
    title: "Tenir un cahier",
    objectif:
      "Structurer ses notes : date, titre, soulignement, marges et lisibilité.",
    competence: "Production d'écrits — organisation visuelle",
    status: "bientôt",
  },
  {
    title: "Préparer son cartable",
    objectif:
      "Vérifier son emploi du temps et anticiper le matériel nécessaire pour chaque jour.",
    competence: "Autonomie — gestion matérielle",
    status: "bientôt",
  },
  {
    title: "Apprendre une leçon",
    objectif:
      "Utiliser des stratégies efficaces : relecture active, auto-évaluation, répétition espacée.",
    competence: "Mémorisation — méthodologie d'étude",
    status: "bientôt",
  },
  {
    title: "Demander de l'aide",
    objectif:
      "Reconnaître quand on est bloqué et savoir formuler une question précise à l'enseignant ou à un camarade.",
    competence: "Communication — coopération",
    status: "bientôt",
  },
];

export default function ReussirEntreeSixiemePage() {
  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Parcours", href: "/parcours" },
              { label: "Réussir son entrée en 6e" },
            ]}
          />
        </div>
      </div>

      {/* Hero */}
      <section className="relative isolate overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        <div className="mission-grid absolute inset-0 -z-20 opacity-25" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(75,180,140,0.16),transparent_36%),linear-gradient(180deg,rgba(5,8,7,0.06),rgba(9,16,15,0.94))]" />
        <div className="mx-auto max-w-4xl">
          <p className="inline-flex rounded-md border border-jade/35 bg-jade/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Parcours de transition
          </p>
          <h1 className="mt-6 text-5xl font-black leading-[0.98] text-foreground sm:text-6xl">
            Réussir son entrée en 6e
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
            Un parcours pour passer du CM2 au collège avec méthode.
          </p>
        </div>
      </section>

      {/* Blocs */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">
            Les 6 compétences du parcours
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {blocs.map((bloc) => {
              const status = getPublicStatus(bloc.status);
              return (
                <div
                  key={bloc.title}
                  className="rounded-md border border-white/10 bg-white/[0.04] p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-lg font-black text-foreground">
                      {bloc.title}
                    </h2>
                    <PublicStatusBadge status={status} />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-muted">
                    {bloc.objectif}
                  </p>
                  <p className="mt-3 rounded border border-white/8 bg-white/[0.03] px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-jade">
                    {bloc.competence}
                  </p>
                  <p className="mt-3 text-xs leading-5 text-muted/70">
                    Ressource en préparation — disponible prochainement.
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pour qui ? */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-md border border-white/10 bg-panel/72 p-6">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">
            Pour qui ?
          </p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              "Élèves de CM2 en fin d'année",
              "Futurs collégiens de 6e",
              "Familles souhaitant accompagner la transition",
              "Enseignants préparant leurs élèves au collège",
            ].map((item) => (
              <li
                key={item}
                className="rounded border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-6 text-muted"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Liens retour */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl flex flex-wrap gap-3">
          <Link
            href="/parcours"
            className="rounded-md bg-gold px-5 py-3 text-sm font-extrabold text-ink transition hover:bg-[#ffd778]"
          >
            Tous les parcours
          </Link>
          <Link
            href="/college"
            className="rounded-md border border-white/15 bg-white/[0.05] px-5 py-3 text-sm font-bold text-foreground transition hover:bg-white/10"
          >
            Collège
          </Link>
          <Link
            href="/primaire/cm2"
            className="rounded-md border border-white/15 bg-white/[0.05] px-5 py-3 text-sm font-bold text-foreground transition hover:bg-white/10"
          >
            CM2
          </Link>
        </div>
      </section>
    </main>
  );
}
