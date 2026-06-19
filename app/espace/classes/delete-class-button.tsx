"use client";

import { deleteClassAction } from "./actions";

export function DeleteClassButton({ classId }: { classId: string }) {
  return (
    <form
      action={deleteClassAction}
      onSubmit={(event) => {
        if (!confirm("Supprimer définitivement cette classe ?")) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="classId" value={classId} />
      <button
        type="submit"
        className="min-h-9 rounded-md border border-red-400/30 px-3 py-1.5 text-xs font-bold text-red-400 transition hover:bg-red-400/10"
      >
        Supprimer
      </button>
    </form>
  );
}
