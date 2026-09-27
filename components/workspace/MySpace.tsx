"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Icon } from "@/components/icons/Icon";
import { Button, ChipGroup, Skeleton, toast } from "@/components/workspace/ui";
import { TEACH_LEVELS } from "@/lib/workspace/curriculum";
import { profileStore, updateProfile, useProfile, type Role, type SchoolType } from "@/lib/workspace/profile";
import { teachStore, useTeach } from "@/lib/workspace/teach";
import { directionStore, useDirection } from "@/lib/workspace/direction";
import { activityStore, useActivity } from "@/lib/workspace/activity";
import type { Zone } from "@/lib/workspace/school-year";

const EXPORT_FORMAT = "academie-kerboeuf-espace";

const ARCHIVED = [
  { href: "/archives/cahier-journal", label: "Ancien cahier journal" },
  { href: "/archives/emploi-du-temps", label: "Ancien emploi du temps" },
  { href: "/archives/preparer-une-seance", label: "Anciennes fiches de séance" },
  { href: "/archives/programmation", label: "Ancienne programmation" },
  { href: "/archives/progression", label: "Ancienne progression" },
  { href: "/archives/conseil-ecole", label: "Ancien outil conseil d'école" },
  { href: "/archives/conseils-cycle", label: "Anciens conseils de cycle" },
  { href: "/archives/projets-sorties", label: "Anciens projets et sorties" },
  { href: "/archives/organisation-classe", label: "Plan de classe" },
  { href: "/archives/bibliotheque-classe", label: "Bibliothèque de classe" },
  { href: "/archives/materiel-classe", label: "Matériel de classe" },
  { href: "/archives/formations", label: "Formations" },
];

export function MySpace() {
  const profile = useProfile();
  const teach = useTeach();
  const direction = useDirection();
  const activity = useActivity();
  const fileRef = useRef<HTMLInputElement>(null);
  const [confirmErase, setConfirmErase] = useState(false);

  if (!profile || !teach || !direction || !activity) return <Skeleton className="h-96" />;

  const teaches = profile.role !== "direction";
  const directs = profile.role === "direction" || profile.role === "les-deux";

  function exportFile() {
    const payload = {
      format: EXPORT_FORMAT,
      version: 1,
      exportedAt: new Date().toISOString(),
      profile: profileStore.get(),
      enseigner: teachStore.get(),
      direction: directionStore.get(),
      activite: activityStore.get(),
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `academie-kerboeuf-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  async function importFile(file: File) {
    try {
      const data = JSON.parse(await file.text()) as Record<string, unknown>;
      if (data.format !== EXPORT_FORMAT) throw new Error("format");
      const before = { p: profileStore.get(), t: teachStore.get(), d: directionStore.get() };
      const ok = profileStore.replace(data.profile) && teachStore.replace(data.enseigner) && directionStore.replace(data.direction);
      if (ok && data.activite) activityStore.replace(data.activite);
      if (!ok) {
        profileStore.set(before.p);
        teachStore.set(before.t);
        directionStore.set(before.d);
        throw new Error("contenu");
      }
      toast("Sauvegarde restaurée", () => {
        profileStore.set(before.p);
        teachStore.set(before.t);
        directionStore.set(before.d);
      });
    } catch {
      toast("Ce fichier n'est pas une sauvegarde Académie Kerboeuf lisible");
    }
  }

  const counts = [
    { label: "séances préparées", value: teach.sessions.length },
    { label: "créneaux dans la semaine type", value: teach.slots.length },
    { label: "modèles de séance", value: teach.templates.length },
    { label: "notions placées dans l'année", value: Object.values(teach.progress).filter((p) => p.period > 0).length },
    { label: "favoris", value: activity.favorites.length },
    { label: "réunions", value: direction.meetings.length },
    { label: "tâches de direction", value: direction.tasks.length },
  ];

  return (
    <div className="grid gap-10">
      <nav aria-label="Raccourcis" className="grid gap-3 sm:grid-cols-2">
        <Link href="/mes-favoris" className="flex items-center justify-between rounded-2xl border border-line bg-panel-soft p-5 hover:border-ink/25">
          <span>
            <span className="block font-serif text-lg font-semibold">Mes favoris</span>
            <span className="text-sm text-muted">{activity.favorites.length} élément{activity.favorites.length > 1 ? "s" : ""}</span>
          </span>
          <Icon name="star" className="h-5 w-5 text-gold" />
        </Link>
        <Link href="/recents" className="flex items-center justify-between rounded-2xl border border-line bg-panel-soft p-5 hover:border-ink/25">
          <span>
            <span className="block font-serif text-lg font-semibold">Récemment consulté</span>
            <span className="text-sm text-muted">{activity.recents.length} élément{activity.recents.length > 1 ? "s" : ""}</span>
          </span>
          <Icon name="clock" className="h-5 w-5 text-gold" />
        </Link>
      </nav>
      <section aria-labelledby="profil" className="rounded-2xl border border-line bg-panel-soft p-5 sm:p-7">
        <h2 id="profil" className="font-serif text-2xl font-semibold">Mon profil</h2>
        <div className="mt-5 grid gap-6">
          <ChipGroup<Role>
            label="Je suis"
            options={[
              { id: "enseignant", label: "Enseignant·e" },
              { id: "direction", label: "Direction" },
              { id: "les-deux", label: "Les deux" },
            ]}
            value={profile.role}
            onChange={(role) => role && updateProfile({ role })}
          />
          {teaches ? (
            <ChipGroup label="Niveau principal" size="sm" options={TEACH_LEVELS} value={profile.level} onChange={(level) => level && updateProfile({ level })} />
          ) : null}
          {directs ? (
            <ChipGroup<SchoolType>
              label="Type d'école"
              size="sm"
              options={[
                { id: "maternelle", label: "Maternelle" },
                { id: "elementaire", label: "Élémentaire" },
                { id: "primaire", label: "Primaire" },
              ]}
              value={profile.schoolType}
              onChange={(schoolType) => schoolType && updateProfile({ schoolType })}
            />
          ) : null}
          <ChipGroup<Zone>
            label="Zone de vacances"
            size="sm"
            options={[
              { id: "A", label: "Zone A" },
              { id: "B", label: "Zone B" },
              { id: "C", label: "Zone C" },
            ]}
            value={profile.zone}
            onChange={(zone) => zone && updateProfile({ zone })}
          />
        </div>
      </section>

      <section aria-labelledby="donnees">
        <h2 id="donnees" className="font-serif text-2xl font-semibold">Mon travail</h2>
        <p className="mt-2 max-w-2xl text-muted">
          Tout est enregistré sur cet appareil, dans ce navigateur, sans compte. Aucune donnée d&apos;élève n&apos;est demandée ni stockée.
        </p>
        <ul className="mt-4 grid gap-x-8 gap-y-1 text-sm sm:grid-cols-2">
          {counts.map((c) => (
            <li key={c.label} className="flex justify-between border-b border-line py-2">
              <span className="text-muted">{c.label}</span>
              <span className="font-semibold tabular-nums">{c.value}</span>
            </li>
          ))}
        </ul>
        <div className="mt-5 flex flex-wrap gap-2">
          <Button variant="primary" icon="download" onClick={exportFile}>
            Enregistrer une sauvegarde
          </Button>
          <Button icon="folder-open" onClick={() => fileRef.current?.click()}>
            Restaurer une sauvegarde
          </Button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            className="sr-only"
            tabIndex={-1}
            aria-hidden="true"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void importFile(file);
              event.target.value = "";
            }}
          />
        </div>
        <p className="mt-4 max-w-2xl text-sm text-muted">
          Pour passer d&apos;un ordinateur à un autre, enregistrez une sauvegarde puis restaurez-la sur l&apos;autre appareil. La synchronisation
          automatique par compte n&apos;est pas encore disponible.
        </p>
      </section>

      <section aria-labelledby="anciens">
        <h2 id="anciens" className="font-serif text-2xl font-semibold">Anciens outils</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Ils ont été remplacés par Enseigner et Direction. Leurs données sont intactes : ouvrez-les pour les consulter ou les exporter.
        </p>
        <ul className="mt-3 grid gap-1 sm:grid-cols-2 lg:grid-cols-3">
          {ARCHIVED.map((tool) => (
            <li key={tool.href}>
              <Link href={tool.href} className="flex min-h-11 items-center justify-between rounded-lg px-3 text-sm hover:bg-ink/5">
                {tool.label}
                <Icon name="arrow-right" className="h-4 w-4 text-muted" />
              </Link>
            </li>
          ))}
          <li>
            <Link href="/enseignants/sauvegardes" className="flex min-h-11 items-center justify-between rounded-lg px-3 text-sm hover:bg-ink/5">
              Sauvegarde des anciens outils
              <Icon name="arrow-right" className="h-4 w-4 text-muted" />
            </Link>
          </li>
        </ul>
      </section>

      <section className="border-t border-line pt-6">
        {confirmErase ? (
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span>Effacer séances, emploi du temps, réunions et profil de cet appareil&nbsp;?</span>
            <Button
              onClick={() => {
                const before = { p: profileStore.get(), t: teachStore.get(), d: directionStore.get(), a: activityStore.get() };
                profileStore.set({ role: null, level: null, schoolType: null, zone: null, lastPath: null, lastLabel: null });
                teachStore.set({ version: 1, schoolDays: [1, 2, 4, 5], slots: [], sessions: [], templates: [], progress: {}, favorites: [], dismissed: [], timetableReady: false });
                directionStore.set({ version: 1, tasks: [], meetings: [], runs: [], milestonesDone: [] });
                activityStore.set({ version: 1, favorites: [], recents: [] });
                setConfirmErase(false);
                toast("Données effacées", () => {
                  profileStore.set(before.p);
                  teachStore.set(before.t);
                  directionStore.set(before.d);
                  activityStore.set(before.a);
                });
              }}
              className="text-ember"
            >
              Oui, tout effacer
            </Button>
            <Button variant="quiet" onClick={() => setConfirmErase(false)}>
              Annuler
            </Button>
          </div>
        ) : (
          <button type="button" onClick={() => setConfirmErase(true)} className="text-sm text-muted underline decoration-ink/25 hover:text-ember">
            Effacer mes données de cet appareil
          </button>
        )}
      </section>
    </div>
  );
}
