"use client";

import { useMemo } from "react";
import { useState } from "react";
import { StudentCard } from "@/app/eleves/_components/student-card";
import type { EmblematicStudent } from "@/content/students";

type FilterValue = "Tous";

const allLabel: FilterValue = "Tous";

export function StudentGallery({ students }: { students: EmblematicStudent[] }) {
  const [cycle, setCycle] = useState<FilterValue | string>(allLabel);
  const [level, setLevel] = useState<FilterValue | string>(allLabel);
  const [type, setType] = useState<FilterValue | string>(allLabel);
  const [trait, setTrait] = useState<FilterValue | string>(allLabel);

  const cycles = useMemo(
    () => [allLabel, ...Array.from(new Set(students.map((student) => student.cycle)))],
    [students],
  );
  const levels = useMemo(
    () => [allLabel, ...Array.from(new Set(students.map((student) => student.level)))],
    [students],
  );
  const types = useMemo(
    () => [allLabel, ...Array.from(new Set(students.map((student) => student.animal)))],
    [students],
  );
  const traits = useMemo(
    () => [
      allLabel,
      ...Array.from(
        new Set(
          students.flatMap((student) =>
            student.personalityProfile.dominantTraits.slice(0, 3),
          ),
        ),
      ).sort(),
    ],
    [students],
  );

  const filteredStudents = students.filter((student) => {
    const matchesCycle = cycle === allLabel || student.cycle === cycle;
    const matchesLevel = level === allLabel || student.level === level;
    const matchesType = type === allLabel || student.animal === type;
    const matchesTrait =
      trait === allLabel || student.personalityProfile.dominantTraits.includes(trait);

    return matchesCycle && matchesLevel && matchesType && matchesTrait;
  });

  return (
    <section className="px-4 pb-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 rounded-md border border-white/10 bg-white/[0.035] p-5">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            <SelectFilter label="Cycle" value={cycle} options={cycles} onChange={setCycle} />
            <SelectFilter label="Niveau" value={level} options={levels} onChange={setLevel} />
            <SelectFilter label="Type" value={type} options={types} onChange={setType} />
            <SelectFilter
              label="Personnalité"
              value={trait}
              options={traits}
              onChange={setTrait}
            />
            <button
              type="button"
              onClick={() => {
                setCycle(allLabel);
                setLevel(allLabel);
                setType(allLabel);
                setTrait(allLabel);
              }}
              className="h-11 self-end rounded-md border border-white/15 bg-white/[0.04] px-4 text-sm font-bold text-muted transition hover:bg-white/[0.08] hover:text-foreground"
            >
              Réinitialiser
            </button>
          </div>
        </div>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
            Galerie filtrée
          </p>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
            {filteredStudents.length} profil{filteredStudents.length > 1 ? "s" : ""}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredStudents.map((student) => (
            <StudentCard key={student.slug} student={student} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SelectFilter({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 rounded-md border border-white/15 bg-ink/80 px-3 text-sm font-bold text-foreground outline-none transition focus:border-gold/60"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
