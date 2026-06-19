import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTeacherClass } from "@/lib/services/teacher-classes";

export const metadata: Metadata = {
  title: "Ma classe | Académie Kerboeuf",
};

const TOOLS = [
  { label: "Programmation", path: "programmation" },
  { label: "Progression", path: "progression" },
  { label: "Emploi du temps", path: "emploi-du-temps" },
  { label: "Séances", path: "seances" },
  { label: "Rentrée", path: "rentree" },
  { label: "Commandes", path: "commandes" },
  { label: "Réunion parents", path: "reunion-parents" },
] as const;

export default async function ClassDetailPage({
  params,
}: {
  params: Promise<{ classId: string }>;
}) {
  const { classId } = await params;
  const klass = await getTeacherClass(classId);

  if (!klass) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
      <Link href="/espace/classes" className="text-sm font-bold text-sky hover:underline">
        ← Mes classes
      </Link>

      <h1 className="mt-3 text-2xl font-black text-foreground">
        {klass.level}
        {klass.className ? ` — ${klass.className}` : ""}
      </h1>
      <p className="mt-1 text-sm text-muted">
        Année {klass.schoolYear} · Période {klass.activePeriod}
        {klass.studentCount !== null ? ` · ${klass.studentCount} élèves` : ""}
      </p>

      <div className="mt-6 grid gap-2 sm:grid-cols-2">
        {TOOLS.map((tool) => (
          <Link
            key={tool.path}
            href={`/espace/classes/${klass.id}/${tool.path}`}
            className="flex min-h-11 items-center justify-between rounded-md border border-white/10 bg-background/45 px-4 text-sm font-bold text-foreground transition hover:border-sky/40 hover:bg-sky/[0.08]"
          >
            {tool.label}
            <span aria-hidden="true">→</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
