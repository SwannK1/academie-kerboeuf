"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/icons/Icon";
import { CheckRow } from "@/components/workspace/ui";
import { MILESTONES_2026_2027 } from "@/content/direction/catalog";
import { levelLabel } from "@/lib/workspace/curriculum";
import { toggleMilestone, updateTask, useDirection } from "@/lib/workspace/direction";
import { isDirector, isTeacher, useProfile } from "@/lib/workspace/profile";
import { useActivity } from "@/lib/workspace/activity";
import { addDays, formatLongDate, formatShortDate, getPeriodFor, isHoliday, todayIso, weekday } from "@/lib/workspace/school-year";
import { freeSlotsOn, nextSchoolDay, sessionsOn, useTeach } from "@/lib/workspace/teach";

const QUICK: { href: string; label: string; icon: IconName }[] = [
  { href: "/enseigner/semaine", label: "Ma semaine", icon: "calendar" },
  { href: "/ressources", label: "Trouver un PDF", icon: "search" },
  { href: "/enseigner/cahier-journal", label: "Cahier journal", icon: "notebook" },
  { href: "/enseigner/periode", label: "Ma progression", icon: "check-circle" },
];

/** Écrans déjà accessibles depuis le cockpit : « Continuer » n'y renvoie pas. */
const ALREADY_ON_COCKPIT = new Set(["/", "/enseigner", "/direction", ...QUICK.map((q) => q.href)]);

const KIND_ICON: Record<string, IconName> = { ressource: "book-open", outil: "grid", page: "calendar" };

/** Accueil : page explicative pour un nouveau venu, cockpit dès que le profil est connu. */
export function HomeSwitch({ landing }: { landing: ReactNode }) {
  const profile = useProfile();
  if (!profile?.role) return <>{landing}</>;
  return <Cockpit />;
}

function Cockpit() {
  const profile = useProfile();
  const teach = useTeach();
  const direction = useDirection();
  const activity = useActivity();
  if (!profile || !teach || !direction || !activity) return null;

  const zone = profile.zone ?? "A";
  const today = todayIso();
  const hour = new Date().getHours();
  const classToday = teach.schoolDays.includes(weekday(today)) && !isHoliday(today, zone);
  const day = classToday ? today : nextSchoolDay(teach, today, zone);
  const sessions = sessionsOn(teach, day);
  const ready = sessions.filter((s) => s.notionId || s.notionLabel).length;
  const toPrepare = freeSlotsOn(teach, day).length + sessions.length - ready;
  const period = getPeriodFor(today, zone);

  const weekEnd = addDays(today, 7);
  const directionItems = [
    ...MILESTONES_2026_2027.filter((m) => !direction.milestonesDone.includes(m.id) && m.date <= weekEnd).map((m) => ({
      id: m.id,
      label: m.label,
      due: m.date,
      toggle: () => toggleMilestone(m.id),
    })),
    ...direction.tasks.filter((t) => !t.done && (!t.due || t.due <= weekEnd)).map((t) => ({
      id: t.id,
      label: t.label,
      due: t.due,
      toggle: () => updateTask(t.id, { done: true }),
    })),
  ].sort((a, b) => (a.due ?? "9").localeCompare(b.due ?? "9"));

  const recents = activity.recents.slice(0, 5);

  return (
    <div className="grid gap-8">
      <header>
        <h1 className="font-serif text-3xl font-semibold sm:text-4xl">{hour >= 18 ? "Bonsoir" : "Bonjour"}</h1>
        <p className="mt-1 text-muted">
          {profile.level ? `${levelLabel(profile.level)} · ` : ""}Période {period.id}
        </p>
      </header>

      {isTeacher(profile) ? (
        <section aria-labelledby="journee" className="rounded-2xl border border-line bg-panel-soft p-5 sm:p-6">
          <p id="journee" className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            {classToday ? "Aujourd'hui" : "Prochaine journée"} · {formatLongDate(day)}
          </p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <p className="font-serif text-2xl font-semibold">
              {sessions.length ? (
                <>
                  {sessions.length} séance{sessions.length > 1 ? "s" : ""} · <span className="text-jade">{ready} prête{ready > 1 ? "s" : ""}</span>
                </>
              ) : toPrepare ? (
                `${toPrepare} créneau${toPrepare > 1 ? "x" : ""} à préparer`
              ) : (
                "Rien de prévu"
              )}
            </p>
            <Link href="/enseigner" className="btn btn-primary min-h-12 px-5 text-[15px]">
              {sessions.length ? "Continuer ma journée" : "Préparer ma journée"}
              <Icon name="arrow-right" className="h-4 w-4" />
            </Link>
          </div>
        </section>
      ) : null}

      {profile.lastPath && profile.lastLabel && !ALREADY_ON_COCKPIT.has(profile.lastPath.split("?")[0]) ? (
        <Link href={profile.lastPath} className="-mt-3 flex min-h-12 items-center justify-between gap-3 rounded-2xl border border-gold/30 bg-gold/[0.06] px-4 font-medium transition hover:bg-gold/[0.1]">
          <span className="min-w-0 truncate">
            <span className="text-muted">Continuer : </span>
            {profile.lastLabel}
          </span>
          <Icon name="arrow-right" className="h-4 w-4 shrink-0 text-gold" />
        </Link>
      ) : null}

      {isTeacher(profile) ? (
        <nav aria-label="Actions rapides" className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {QUICK.map((action) => (
            <Link key={action.label} href={action.href} className="flex min-h-16 items-center gap-3 rounded-2xl border border-line bg-panel-soft px-4 font-medium transition hover:border-ink/25">
              <Icon name={action.icon} className="h-5 w-5 shrink-0 text-gold" />
              {action.label}
            </Link>
          ))}
        </nav>
      ) : null}

      {isDirector(profile) ? (
        <section aria-labelledby="direction-semaine" className="rounded-2xl border border-line p-5 sm:p-6">
          <div className="flex items-baseline justify-between gap-3">
            <h2 id="direction-semaine" className="font-serif text-xl font-semibold">
              Direction · {directionItems.length ? `${directionItems.length} chose${directionItems.length > 1 ? "s" : ""} cette semaine` : "semaine dégagée"}
            </h2>
            <Link href="/direction" className="text-sm font-medium text-gold hover:underline">
              Tableau de bord
            </Link>
          </div>
          {directionItems.length ? (
            <ul className="mt-2 grid gap-0.5">
              {directionItems.slice(0, 4).map((item) => (
                <li key={item.id}>
                  <CheckRow checked={false} onToggle={item.toggle} meta={item.due ? formatShortDate(item.due) : undefined}>
                    {item.label}
                  </CheckRow>
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      ) : null}

      {recents.length ? (
        <section aria-labelledby="recents">
          <div className="flex items-baseline justify-between">
            <h2 id="recents" className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
              Récents
            </h2>
            <Link href="/recents" className="text-sm text-muted hover:text-foreground">
              Tout voir
            </Link>
          </div>
          <ul className="mt-2 divide-y divide-line rounded-2xl border border-line">
            {recents.map((item) => (
              <li key={`${item.kind}-${item.id}`}>
                <Link href={item.href} className="flex min-h-12 items-center gap-3 px-4 hover:bg-ink/[0.03]">
                  <Icon name={KIND_ICON[item.kind]} className="h-4 w-4 shrink-0 text-gold" />
                  <span className="min-w-0 flex-1 truncate">{item.label}</span>
                  {item.detail ? <span className="hidden text-xs text-muted sm:inline">{item.detail}</span> : null}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <p className="text-sm text-muted">
        <Link href="/ressources" className="underline decoration-ink/25 hover:text-foreground">Toutes les ressources</Link>
        {" · "}
        <Link href="/direction" className="underline decoration-ink/25 hover:text-foreground">Direction</Link>
        {" · "}
        <Link href="/mon-espace" className="underline decoration-ink/25 hover:text-foreground">Mon espace</Link>
      </p>
    </div>
  );
}
