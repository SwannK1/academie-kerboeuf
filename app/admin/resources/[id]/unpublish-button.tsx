"use client";

export function UnpublishButton({ action }: { action: () => Promise<void> }) {
  return (
    <form
      action={action}
      onSubmit={(event) => {
        const confirmed = window.confirm(
          "Dépublier cette ressource ? Elle ne sera plus affichée comme disponible sur le site public.",
        );
        if (!confirmed) {
          event.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        className="rounded-md border border-ember/35 bg-ember/10 px-4 py-2.5 text-sm font-bold uppercase tracking-[0.12em] text-ember transition hover:bg-ember/20"
      >
        Dépublier
      </button>
    </form>
  );
}
