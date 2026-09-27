"use client";

import Link from "next/link";
import { Icon } from "@/components/icons/Icon";
import { TEACHER_TOOLS } from "@/content/teacher-tools";
import { isFavorite, toggleFavoriteItem, useActivity } from "@/lib/workspace/activity";

/** Outils secondaires ; l'étoile épingle un outil dans « Mes favoris » et sur l'accueil. */
export function ToolsGrid() {
  const activity = useActivity();
  return (
    <>
      {TEACHER_TOOLS.map((group) => (
        <section key={group.group} className="mt-8">
          <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{group.group}</h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {group.items.map((tool) => {
              const pinned = isFavorite(activity, "outil", tool.href);
              return (
                <li key={tool.href} className="relative">
                  <Link href={tool.href} className="flex h-full items-start gap-3 rounded-xl border border-line bg-panel-soft p-4 pr-12 transition hover:border-ink/25">
                    <Icon name={tool.icon} className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                    <span>
                      <span className="block font-medium">{tool.title}</span>
                      <span className="text-sm text-muted">{tool.text}</span>
                    </span>
                  </Link>
                  <button
                    type="button"
                    aria-pressed={pinned}
                    aria-label={pinned ? `Retirer ${tool.title} des favoris` : `Ajouter ${tool.title} aux favoris`}
                    onClick={() => toggleFavoriteItem({ kind: "outil", id: tool.href, label: tool.title, href: tool.href })}
                    className={`absolute right-1.5 top-1.5 grid size-10 place-items-center rounded-md hover:bg-ink/6 ${pinned ? "text-gold" : "text-muted/60"}`}
                  >
                    <Icon name="star" className="h-4 w-4" />
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </>
  );
}
