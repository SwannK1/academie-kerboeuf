import Link from "next/link";

export function ToolPlaceholder({
  classId,
  title,
  description,
  existingLocalTool,
}: {
  classId: string;
  title: string;
  description: string;
  existingLocalTool?: { label: string; href: string };
}) {
  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-12 sm:px-6">
      <Link
        href={`/espace/classes/${classId}`}
        className="text-sm font-bold text-sky hover:underline"
      >
        ← Retour à la classe
      </Link>

      <h1 className="mt-3 text-2xl font-black text-foreground">{title}</h1>
      <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>

      <p className="mt-6 rounded-md border border-white/10 bg-background/45 p-4 text-sm text-muted">
        Cet outil n&apos;est pas encore migré vers votre compte. Cette page réserve la place pour
        une future synchronisation, sans dupliquer vos données actuelles.
      </p>

      {existingLocalTool ? (
        <Link
          href={existingLocalTool.href}
          className="mt-4 inline-flex min-h-11 items-center justify-center rounded-md border border-sky/35 bg-sky/10 px-4 text-sm font-black text-sky transition hover:bg-sky hover:text-ink"
        >
          Ouvrir l&apos;outil actuel ({existingLocalTool.label})
        </Link>
      ) : null}
    </main>
  );
}
