import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { cm2Subjects, getCm2SubjectBySlug } from "@/content/cm2-subjects";

export const metadata: Metadata = {
  title: "CM2 | Académie Kerboeuf",
  description:
    "Accès direct aux matières CM2 : Français, Mathématiques, Sciences.",
};

// ── Données UI ─────────────────────────────────────────────────────────────────

const PRIORITY_SLUGS = ["francais", "mathematiques", "sciences"] as const;

const ACCENT: Record<string, { text: string; border: string }> = {
  jade:  { text: "text-jade",  border: "border-jade/30"  },
  gold:  { text: "text-gold",  border: "border-gold/30"  },
  sky:   { text: "text-sky",   border: "border-sky/30"   },
  ember: { text: "text-ember", border: "border-ember/30" },
};

// ── Page ───────────────────────────────────────────────────────────────────────

export default function Cm2Page() {
  const prioritySubjects = PRIORITY_SLUGS.map((slug) =>
    getCm2SubjectBySlug(slug),
  ).filter((subject) => subject !== undefined);

  const otherSubjects = cm2Subjects.filter(
    (subject) => !PRIORITY_SLUGS.includes(subject.slug as (typeof PRIORITY_SLUGS)[number]),
  );

  return (
    <main className="px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Primaire", href: "/primaire" },
            { label: "CM2" },
          ]}
        />

        <h1 className="mt-6 text-4xl font-black text-foreground sm:text-5xl">
          CM2
        </h1>
        <p className="mt-3 text-base leading-7 text-muted">
          Choisissez une matière pour accéder directement à ses ressources.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {prioritySubjects.map((subject) => {
            const t = ACCENT[subject.accent];
            return (
              <Link
                key={subject.slug}
                href={`/primaire/cm2/matieres/${subject.slug}`}
                className={`group flex flex-col gap-2 rounded-md border ${t.border} bg-white/[0.04] p-6 transition hover:-translate-y-0.5 hover:bg-white/[0.07] focus:outline-none focus:ring-2 focus:ring-gold/60`}
              >
                <p className={`text-lg font-black ${t.text}`}>{subject.title}</p>
                <span className="mt-2 text-sm font-bold text-muted transition group-hover:translate-x-1 group-hover:text-foreground">
                  Accéder →
                </span>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 border-t border-white/10 pt-5">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
            À venir : {otherSubjects.map((subject) => subject.title).join(", ")}
          </p>
        </div>
      </div>
    </main>
  );
}
