"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components/icons/Icon";
import { Button, ChipGroup, Skeleton } from "@/components/workspace/ui";
import { TEACH_LEVELS, levelLabel, type TeachLevel } from "@/lib/workspace/curriculum";
import { updateProfile, useProfile, type Role, type SchoolType } from "@/lib/workspace/profile";
import { useActivity } from "@/lib/workspace/activity";

const ROLE_OPTIONS: { id: Role; label: string }[] = [
  { id: "enseignant", label: "J'enseigne" },
  { id: "direction", label: "Je dirige une école" },
  { id: "les-deux", label: "Les deux" },
];

const SCHOOL_OPTIONS: { id: SchoolType; label: string }[] = [
  { id: "maternelle", label: "Maternelle" },
  { id: "elementaire", label: "Élémentaire" },
  { id: "primaire", label: "Primaire" },
];

/**
 * Deux questions au plus, puis on entre dans le produit. Rien n'est
 * obligatoire : « Passer » mène directement aux ressources.
 */
export function Onboarding({ compact = false }: { compact?: boolean }) {
  const profile = useProfile();
  const router = useRouter();
  const [role, setRole] = useState<Role | null>(null);
  const [level, setLevel] = useState<TeachLevel | null>(null);
  const [school, setSchool] = useState<SchoolType | null>(null);

  if (!profile) return <Skeleton className="h-48" />;

  if (profile.role && !compact) {
    return <ContinueCard />;
  }

  const teaches = role === "enseignant" || role === "les-deux";
  const directs = role === "direction" || role === "les-deux";
  const ready = role && (!teaches || level) && (!directs || school);

  function finish() {
    if (!role) return;
    updateProfile({ role, level: teaches ? level : profile?.level ?? null, schoolType: directs ? school : null });
    router.push(role === "direction" ? "/direction" : "/enseigner");
  }

  return (
    <section aria-labelledby="onboarding-title" className="rounded-2xl border border-line bg-panel-soft p-5 sm:p-7">
      <h2 id="onboarding-title" className="font-serif text-2xl font-semibold text-foreground">
        Que faites-vous&nbsp;?
      </h2>
      <p className="mt-1 text-sm text-muted">Deux clics, et Académie Kerboeuf s&apos;adapte. Aucun compte nécessaire.</p>
      <div className="mt-5 grid gap-5">
        <ChipGroup label="Votre rôle" hideLabel options={ROLE_OPTIONS} value={role} onChange={setRole} />
        {teaches ? (
          <ChipGroup label="Votre niveau principal" options={TEACH_LEVELS} value={level} onChange={setLevel} size="sm" />
        ) : null}
        {directs ? (
          <ChipGroup label="Votre école" options={SCHOOL_OPTIONS} value={school} onChange={setSchool} size="sm" />
        ) : null}
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        {ready ? (
          <Button variant="primary" icon="arrow-right" onClick={finish}>
            Entrer
          </Button>
        ) : null}
        <Link href="/ressources" className="text-sm text-muted underline decoration-ink/25 hover:text-foreground">
          Passer, je cherche juste une ressource
        </Link>
      </div>
    </section>
  );
}

function ContinueCard() {
  const profile = useProfile();
  const activity = useActivity();
  if (!profile || !activity) return null;
  const lastOf = (kind: "page" | "ressource" | "outil") => activity.recents.find((r) => r.kind === kind);
  const home = profile.role === "direction" ? { href: "/direction", label: "Tableau de bord Direction" } : { href: "/enseigner", label: "Ma journée" };
  const page = lastOf("page") ?? { href: home.href, label: home.label };
  const cards = [
    { eyebrow: profile.level ? `Continuer ma préparation ${levelLabel(profile.level)}` : "Continuer", label: page.label, href: page.href, icon: "calendar" as const },
    lastOf("ressource") ? { eyebrow: "Revoir ma dernière ressource", label: lastOf("ressource")!.label, href: lastOf("ressource")!.href, icon: "book-open" as const } : null,
    lastOf("outil") ? { eyebrow: "Dernier outil utilisé", label: lastOf("outil")!.label, href: lastOf("outil")!.href, icon: "grid" as const } : null,
  ].filter((c): c is NonNullable<typeof c> => c !== null);

  return (
    <section aria-labelledby="continuer">
      <div className="flex items-baseline justify-between gap-3">
        <h2 id="continuer" className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Continuer</h2>
        <Link href="/recents" className="text-sm text-muted underline decoration-ink/25 hover:text-foreground">Tout l&apos;historique</Link>
      </div>
      <ul className="mt-3 grid gap-3 md:grid-cols-3">
        {cards.map((card) => (
          <li key={card.eyebrow}>
            <Link href={card.href} className="flex h-full items-start gap-3 rounded-2xl border border-line bg-panel-soft p-4 transition hover:border-ink/25">
              <Icon name={card.icon} className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
              <span className="min-w-0">
                <span className="block text-xs text-muted">{card.eyebrow}</span>
                <span className="mt-0.5 line-clamp-2 block font-medium leading-snug">{card.label}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
