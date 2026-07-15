import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import type { AccentKey } from "@/content/universe";

export const metadata: Metadata = {
  title: "Univers | Académie Kerboeuf",
  description:
    "L'univers Académie Kerboeuf — une entrée claire vers l'histoire, les guides, les professeurs, les lieux, les missions et les valeurs pédagogiques.",
};

type UniversEntry = {
  title: string;
  description: string;
  href?: string;
  accent: AccentKey;
};

const entries: UniversEntry[] = [
  {
    title: "L'histoire de l'Académie",
    description:
      "Une école secrète née d'une conviction simple : apprendre peut être immersif sans jamais sacrifier l'exigence scolaire.",
    accent: "jade",
  },
  {
    title: "Les guides de niveau",
    description:
      "Un élève-guide par niveau, de la maternelle au lycée, qui incarne une posture d'apprentissage propre à son étage de l'Académie.",
    href: "/personnages",
    accent: "gold",
  },
  {
    title: "Les professeurs référents",
    description:
      "Des méthodes signature, un espace reconnaissable, une façon unique d'accompagner chaque niveau.",
    href: "/professeurs",
    accent: "sky",
  },
  {
    title: "Les lieux de l'Académie",
    description:
      "Chaque lieu correspond à une manière d'apprendre — de la Salle des lanternes au Conseil des synthèses.",
    href: "/univers/lieux",
    accent: "ember",
  },
  {
    title: "Les missions",
    description:
      "La vitrine des missions pédagogiques de l'Académie, classées par statut et par niveau scolaire.",
    href: "/missions-recentes",
    accent: "gold",
  },
  {
    title: "Les valeurs pédagogiques",
    description:
      "Comprendre avant de réussir, l'erreur comme étape, la méthode avant tout : l'exigence qui tient l'immersion debout.",
    accent: "jade",
  },
];

const accentText: Record<AccentKey, string> = {
  gold: "text-gold",
  jade: "text-jade",
  sky: "text-sky",
  ember: "text-ember",
};
const accentBorder: Record<AccentKey, string> = {
  gold: "border-gold/35",
  jade: "border-jade/35",
  sky: "border-sky/35",
  ember: "border-ember/35",
};

export default function UniversPage() {
  return (
    <main>
      {/* ── Breadcrumb ──────────────────────────────────────────────────────── */}
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[{ label: "Accueil", href: "/" }, { label: "Univers" }]}
          />
        </div>
      </div>

      {/* ── Introduction ────────────────────────────────────────────────────── */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-jade">
            Académie Kerboeuf
          </p>
          <h1 className="mt-4 text-4xl font-black text-foreground sm:text-5xl">
            L&apos;univers Académie Kerboeuf
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted">
            Une école secrète où chaque savoir devient une porte à ouvrir.
            Personnages et lieux ne sont pas une fin en soi — ils donnent du
            sens aux apprentissages. Six entrées pour tout explorer.
          </p>
        </div>
      </section>

      {/* ── Sommaire visuel ─────────────────────────────────────────────────── */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {entries.map((entry) => (
              <EntryCard key={entry.title} entry={entry} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function EntryCard({ entry }: { entry: UniversEntry }) {
  const content = (
    <>
      <h2 className={`text-2xl font-black ${accentText[entry.accent]}`}>
        {entry.title}
      </h2>
      <p className="mt-3 text-sm leading-7 text-muted">{entry.description}</p>
      {entry.href ? (
        <p
          className={`mt-5 text-sm font-bold transition group-hover:translate-x-1 ${accentText[entry.accent]}`}
        >
          Explorer →
        </p>
      ) : (
        <p className="mt-5 text-sm font-bold text-muted">Bientôt disponible</p>
      )}
    </>
  );

  const cardClass = `rounded-md border p-6 ${accentBorder[entry.accent]} bg-white/[0.04]`;

  if (entry.href) {
    return (
      <Link
        href={entry.href}
        className={`group transition hover:-translate-y-1 hover:bg-white/[0.06] ${cardClass}`}
      >
        {content}
      </Link>
    );
  }

  return <article className={cardClass}>{content}</article>;
}
