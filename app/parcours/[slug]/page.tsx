import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import {
  getLearningPathWithSteps,
  learningPaths,
} from "@/content/learning-paths";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return learningPaths.map((path) => ({
    slug: path.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const path = getLearningPathWithSteps(slug);

  if (!path) {
    return { title: "Parcours introuvable | Académie Kerboeuf" };
  }

  return {
    title: `${path.title} | Parcours`,
    description: path.globalObjective,
  };
}

export default async function LearningPathDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const path = getLearningPathWithSteps(slug);

  if (!path) {
    notFound();
  }

  const projectionSteps = path.steps.filter((step) =>
    step.modes.includes("projection"),
  );
  const printSteps = path.steps.filter((step) =>
    step.modes.includes("impression"),
  );

  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Parcours", href: "/parcours" },
              { label: path.title },
            ]}
          />
        </div>
      </div>

      <section className="relative isolate overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        <div className="mission-grid absolute inset-0 -z-20 opacity-25" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(75,180,140,0.18),transparent_36%),linear-gradient(180deg,rgba(5,8,7,0.06),rgba(9,16,15,0.94))]" />
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-end">
          <div>
            <p className="inline-flex rounded-md border border-jade/35 bg-jade/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-jade">
              {path.level} · {path.subject}
            </p>
            <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.98] text-foreground sm:text-6xl">
              {path.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">
              {path.globalObjective}
            </p>
          </div>

          <aside className="rounded-md border border-white/12 bg-panel/72 p-5 shadow-2xl shadow-black/35">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">
              Dossier parcours
            </p>
            <div className="mt-5 grid gap-3">
              <Meta label="Statut" value={<PublicStatusBadge status={path.status} />} />
              <Meta label="Durée" value={path.estimatedDuration} />
              <Meta label="Professeur" value={path.professorName} />
              <Meta label="Étapes" value={`${path.steps.length} missions`} />
            </div>
          </aside>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.72fr_1.28fr]">
          <aside className="space-y-5">
            <Panel title="Compétences travaillées" accentClass="text-jade">
              <ul className="space-y-3">
                {path.competencies.map((competency) => (
                  <li
                    key={competency}
                    className="rounded border border-white/10 bg-white/[0.035] p-3 text-sm leading-6 text-muted"
                  >
                    {competency}
                  </li>
                ))}
              </ul>
            </Panel>

            <Panel title="À projeter" accentClass="text-sky">
              {projectionSteps.length > 0 ? (
                <ul className="space-y-2 text-sm leading-7 text-muted">
                  {projectionSteps.map((step) => (
                    <li key={step.href}>{step.title}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm leading-7 text-muted">
                  Aucun support de projection signalé pour ce parcours.
                </p>
              )}
            </Panel>

            <Panel title="À imprimer" accentClass="text-gold">
              {printSteps.length > 0 ? (
                <ul className="space-y-2 text-sm leading-7 text-muted">
                  {printSteps.map((step) => (
                    <li key={step.href}>{step.title}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm leading-7 text-muted">
                  Aucun support d’impression signalé pour ce parcours.
                </p>
              )}
            </Panel>
          </aside>

          <div>
            <div className="rounded-md border border-white/10 bg-white/[0.04] p-6">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">
                Progression étape par étape
              </p>
              <div className="mt-6 grid gap-4">
                {path.steps.map((step, index) => (
                  <Link
                    key={step.href}
                    href={step.href}
                    className="group grid gap-4 rounded-md border border-white/10 bg-ink/35 p-5 transition hover:border-gold/35 hover:bg-white/[0.065] md:grid-cols-[auto_1fr_auto] md:items-start"
                  >
                    <span className="grid size-11 place-items-center rounded-md border border-gold/30 bg-gold/10 font-mono text-sm font-black text-gold">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-jade">
                        {step.level} · {step.subject}
                      </p>
                      <h2 className="mt-2 text-2xl font-black text-foreground">
                        {step.title}
                      </h2>
                      <p className="mt-3 text-sm leading-7 text-muted">
                        {step.objective}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {step.modes.includes("projection") ? (
                          <Badge>À projeter</Badge>
                        ) : null}
                        {step.modes.includes("impression") ? (
                          <Badge>À imprimer</Badge>
                        ) : null}
                        {step.modes.includes("correction") ? (
                          <Badge>Correction</Badge>
                        ) : null}
                      </div>
                    </div>
                    <span className="text-sm font-bold text-gold transition group-hover:translate-x-1">
                      Ouvrir
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/ressources"
                className="rounded-md bg-gold px-5 py-3 text-sm font-extrabold text-ink transition hover:bg-[#ffd778]"
              >
                Retour aux ressources
              </Link>
              <Link
                href="/parcours"
                className="rounded-md border border-white/15 bg-white/[0.05] px-5 py-3 text-sm font-bold text-foreground transition hover:bg-white/10"
              >
                Tous les parcours
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Meta({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded border border-white/10 bg-white/[0.04] p-3">
      <span className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
        {label}
      </span>
      <span className="text-sm font-bold text-foreground">{value}</span>
    </div>
  );
}

function Panel({
  title,
  accentClass,
  children,
}: {
  title: string;
  accentClass: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-md border border-white/10 bg-white/[0.04] p-6">
      <p className={`text-xs font-bold uppercase tracking-[0.22em] ${accentClass}`}>
        {title}
      </p>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function Badge({ children }: { children: string }) {
  return (
    <span className="rounded border border-gold/25 bg-gold/10 px-2 py-1 text-xs font-bold uppercase tracking-[0.12em] text-gold">
      {children}
    </span>
  );
}
