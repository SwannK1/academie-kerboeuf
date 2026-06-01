"use client";

export default function GlobalError({
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <html lang="fr">
      <body>
        <main>
          <h1>Une erreur est survenue</h1>
          <button type="button" onClick={() => unstable_retry()}>
            Réessayer
          </button>
        </main>
      </body>
    </html>
  );
}
