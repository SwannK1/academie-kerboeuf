import type { Metadata } from "next";
import Link from "next/link";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import { Badge } from "@/components/cm2/badge";
import { Metric } from "@/components/cm2/metric";
import { SectionHeader } from "@/components/cm2/section-header";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { cm2Missions, type Cm2Mission } from "@/content/cm2";
import { getLearningPathsWithSteps } from "@/content/learning-paths";
import { getPublicStatusKey } from "@/content/public-status";

export const metadata: Metadata = {
  title: "Parcours CM2 — L’année des grands explorateurs | Académie Kerboeuf",
  description:
    "Progression CM2 lisible pour organiser les missions de Félix en lecture, écriture, mathématiques, sciences, histoire-géographie et méthode.",
};

const domainGroups = [
  {
    name: "Français",
    description:
      "Comprendre, écrire et observer le fonctionnement de la langue.",
    slugs: ["mission-inference", "lecture-strategique", "production-ecrit", "enquete-grammaticale"],
  },
  {
    name: "Lecture",
    description:
      "Prélever des indices, interpréter et justifier avec le texte.",
    slugs: ["mission-inference", "lecture-strategique"],
  },
  {
    name: "Production d’écrit",
    description:
      "Organiser ses idées pour transmettre une réponse claire.",
    slugs: ["production-ecrit"],
  },
  {
    name: "Étude de la langue",
    description:
      "Observer les phrases, les accords et les choix grammaticaux.",
    slugs: ["enquete-grammaticale"],
  },
  {
    name: "Mathématiques",
    description:
      "Calculer, choisir une stratégie et résoudre des défis progressifs.",
    slugs: ["mission-calcul", "defis-mathematiques"],
  },
  {
    name: "Sciences",
    description:
      "Observer, formuler des hypothèses et structurer une investigation.",
    slugs: ["laboratoire-scientifique"],
  },
  {
    name: "Histoire-Géographie",
    description:
      "Lire les traces du passé, les cartes et les repères du monde.",
    slugs: ["archives-historiques", "cartographe-du-monde"],
  },
  {
    name: "Méthodologie",
    description:
      "Apprendre à expliquer ses choix, vérifier et garder une trace utile.",
    slugs: ["lecture-strategique", "defis-mathematiques", "mission-inference"],
  },
];

const progressionSteps = [
  {
    focus: "Lire comme un détective",
    slugs: ["mission-inference", "lecture-strategique"],
  },
  {
    focus: "Résoudre des défis mathématiques",
    slugs: ["mission-calcul", "defis-mathematiques"],
  },
  {
    focus: "Explorer les sciences",
    slugs: ["laboratoire-scientifique"],
  },
  {
    focus: "Comprendre l’histoire",
    slugs: ["archives-historiques"],
  },
  {
    focus: "Lire les cartes et le monde",
    slugs: ["cartographe-du-monde"],
  },
  {
    focus: "Écrire pour transmettre",
    slugs: ["production-ecrit"],
  },
  {
    focus: "Enquêter sur la langue",
    slugs: ["enquete-grammaticale"],
  },
];

export default function Cm2ParcoursPage() {
  const missionMap = new Map(cm2Missions.map((mission) => [mission.slug, mission]));
  const cm2Path = getLearningPathsWithSteps().find(
    (path) => path.levelSlug === "cm2",
  );

  const populatedDomains = domainGroups
    .map((domain) => ({
      ...domain,
      missions: domain.slugs
        .map((slug) => missionMap.get(slug))
        .filter((mission): mission is Cm2Mission => Boolean(mission)),
    }))
    .filter((domain) => domain.missions.length > 0);

  const populatedSteps = progressionSteps
    .map((step) => ({
      ...step,
      missions: step.slugs
        .map((slug) => missionMap.get(slug))
        .filter((mission): mission is Cm2Mission => Boolean(mission)),
    }))
    .filter((step) => step.missions.length > 0);

  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Primaire", href: "/primaire" },
              { label: "CM2", href: "/primaire/cm2" },
              { label: "Parcours" },
            ]}
          />
        </div>
      </div>

      <section className="relative isolate overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        <div className="mission-grid absolute inset-0 -z-20 opacity-25" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(243,196,91,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(80,200,164,0.13),transparent_30%),linear-gradient(180deg,rgba(5,8,7,0.02),rgba(9,16,15,0.94))]" />
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.7fr] lg:items-end">
          <div>
            <p className="inline-flex rounded-md border border-gold/35 bg-gold/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-gold">
              Progression CM2 · Félix
            </p>
            <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.98] text-foreground sm:text-6xl">
              Parcours CM2 — L’année des grands explorateurs
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">
              Les missions permettent de progresser en lecture, écriture,
              mathématiques, sciences, histoire-géographie et méthodologie, avec
              une progression claire pour l’élève, la famille et la classe.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/primaire/cm2"
                className="rounded-md bg-gold px-5 py-3 text-sm font-extrabold text-ink transition hover:bg-[#ffd778]"
              >
                Retour au niveau CM2
              </Link>
              <Link
                href="/primaire/cm2/missions"
                className="rounded-md border border-white/15 bg-white/[0.05] px-5 py-3 text-sm font-bold text-foreground transition hover:bg-white/10"
              >
                Voir toutes les missions
              </Link>
            </div>
          </div>

          <aside className="rounded-md border border-white/12 bg-panel/72 p-5 shadow-2xl shadow-black/35">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
              Repères de progression
            </p>
            <div className="mt-5 grid gap-3">
              <Metric value={cm2Missions.length} label="missions CM2" />
              <Metric value={populatedDomains.length} label="domaines" />
              <Metric value={populatedSteps.length} label="étapes" />
            </div>
          </aside>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Progression par domaines"
            title="Organiser les missions dans l’année"
            description="Chaque domaine regroupe uniquement des missions CM2 déjà présentes dans le catalogue."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {populatedDomains.map((domain) => (
              <DomainCard key={domain.name} domain={domain} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Timeline"
            title="Une progression en sept temps"
            description="Les étapes donnent un ordre de lecture possible, tout en renvoyant vers les vrais titres de missions existants."
          />
          <div className="mt-8 grid gap-4">
            {populatedSteps.map((step, index) => (
              <ProgressionStep
                key={step.focus}
                index={index + 1}
                focus={step.focus}
                missions={step.missions}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-2">
          <AudiencePanel
            eyebrow="Pour l’élève"
            title="Avancer avec méthode"
            items={[
              "Mieux comprendre les textes.",
              "Justifier ses réponses avec des indices.",
              "Calculer avec méthode.",
              "Résoudre des problèmes.",
              "Écrire plus clairement.",
              "Construire une méthode de travail.",
            ]}
          />
          <AudiencePanel
            eyebrow="Pour l’enseignant"
            title="Organiser les séances"
            items={[
              "Classer les missions par domaine.",
              "Projeter les activités en classe.",
              "Relier les contenus aux compétences.",
              "Préparer une progression souple.",
              "Identifier les supports imprimables.",
              "Réutiliser les missions dans un rituel.",
            ]}
          />
        </div>
      </section>

      {cm2Path ? (
        <section className="px-4 pb-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-md border border-gold/20 bg-gold/[0.055] p-6">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">
                Parcours existant
              </p>
              <div className="mt-4 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
                <div>
                  <h2 className="text-3xl font-black text-foreground">
                    {cm2Path.title}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-muted">
                    {cm2Path.globalObjective}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <Badge>{cm2Path.subject}</Badge>
                    <Badge>{cm2Path.estimatedDuration}</Badge>
                    <PublicStatusBadge status={cm2Path.status} />
                  </div>
                </div>
                <div className="grid gap-3">
                  {cm2Path.steps.map((step, index) => (
                    <Link
                      key={step.href}
                      href={step.href}
                      className="rounded border border-white/10 bg-ink/35 p-4 transition hover:border-gold/30 hover:bg-white/[0.06]"
                    >
                      <span className="font-mono text-xs font-black text-gold">
                        Étape {index + 1}
                      </span>
                      <span className="mt-2 block font-bold text-foreground">
                        {step.title}
                      </span>
                      <span className="mt-1 block text-sm leading-6 text-muted">
                        {step.objective}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-md border border-white/10 bg-white/[0.04] p-6">
            <SectionHeader
              eyebrow="Liens utiles"
              title="Continuer l’exploration"
              description="Quelques accès directs pour passer du parcours aux missions, au niveau ou aux programmes."
            />
            <div className="mt-6 flex flex-wrap gap-3">
              <UsefulLink href="/primaire/cm2">Retour vers le CM2</UsefulLink>
              <UsefulLink href="/primaire/cm2/missions">
                Voir toutes les missions
              </UsefulLink>
              <UsefulLink href="/programmes">Voir les programmes</UsefulLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function DomainCard({
  domain,
}: {
  domain: {
    name: string;
    description: string;
    missions: Cm2Mission[];
  };
}) {
  return (
    <article className="flex min-h-full flex-col rounded-md border border-white/10 bg-white/[0.045] p-5">
      <h3 className="text-xl font-black text-foreground">{domain.name}</h3>
      <p className="mt-3 flex-1 text-sm leading-7 text-muted">
        {domain.description}
      </p>
      <div className="mt-5 grid gap-2">
        {domain.missions.map((mission) => {
          const isAvailable = getPublicStatusKey(mission.status) === "available";
          if (isAvailable) {
            return (
              <Link
                key={mission.slug}
                href={`/primaire/cm2/missions/${mission.slug}`}
                className="rounded border border-white/10 bg-ink/35 p-3 text-sm font-bold text-foreground transition hover:border-gold/30 hover:text-gold"
              >
                {mission.title}
              </Link>
            );
          }
          return (
            <div
              key={mission.slug}
              className="flex items-center justify-between gap-2 rounded border border-white/10 bg-ink/20 p-3 opacity-60"
            >
              <span className="text-sm font-bold text-muted">{mission.title}</span>
              <PublicStatusBadge status={mission.status} />
            </div>
          );
        })}
      </div>
    </article>
  );
}

function ProgressionStep({
  index,
  focus,
  missions,
}: {
  index: number;
  focus: string;
  missions: Cm2Mission[];
}) {
  return (
    <article className="grid gap-4 rounded-md border border-white/10 bg-white/[0.04] p-5 sm:grid-cols-[auto_1fr]">
      <span className="grid size-12 place-items-center rounded bg-gold/10 font-mono text-sm font-black text-gold">
        {String(index).padStart(2, "0")}
      </span>
      <div>
        <h3 className="text-2xl font-black text-foreground">{focus}</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {missions.map((mission) => {
            const isAvailable = getPublicStatusKey(mission.status) === "available";
            const innerContent = (
              <>
                <span
                  className={`text-xs font-bold uppercase tracking-[0.16em] ${isAvailable ? mission.theme.textClass : "text-muted"}`}
                >
                  {mission.subject}
                </span>
                <span className="mt-2 block font-bold text-foreground">
                  {mission.title}
                </span>
                <span className="mt-2 block text-sm leading-6 text-muted">
                  {mission.description}
                </span>
                <PublicStatusBadge status={mission.status} className="mt-3" />
              </>
            );
            if (isAvailable) {
              return (
                <Link
                  key={mission.slug}
                  href={`/primaire/cm2/missions/${mission.slug}`}
                  className="rounded border border-white/10 bg-ink/35 p-4 transition hover:border-gold/30 hover:bg-white/[0.06]"
                >
                  {innerContent}
                </Link>
              );
            }
            return (
              <article
                key={mission.slug}
                className="rounded border border-white/10 bg-ink/20 p-4 opacity-60"
              >
                {innerContent}
              </article>
            );
          })}
        </div>
      </div>
    </article>
  );
}

function AudiencePanel({
  eyebrow,
  title,
  items,
}: {
  eyebrow: string;
  title: string;
  items: string[];
}) {
  return (
    <article className="rounded-md border border-white/10 bg-white/[0.045] p-6">
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-black text-foreground">{title}</h2>
      <ul className="mt-5 grid gap-3">
        {items.map((item) => (
          <li
            key={item}
            className="rounded border border-white/10 bg-ink/35 p-3 text-sm leading-6 text-muted"
          >
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}

function UsefulLink({
  href,
  children,
}: {
  href: string;
  children: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-md border border-white/15 bg-white/[0.05] px-4 py-3 text-sm font-bold text-foreground transition hover:border-gold/35 hover:bg-gold/10 hover:text-gold"
    >
      {children}
    </Link>
  );
}
