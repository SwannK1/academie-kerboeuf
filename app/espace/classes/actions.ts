"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  createTeacherClass,
  deleteTeacherClass,
  updateTeacherClass,
} from "@/lib/services/teacher-classes";
import type { TeacherClassLevel, TeacherClassPeriod } from "@/lib/types/teacher";

const LEVELS: TeacherClassLevel[] = ["CP", "CE1", "CE2", "CM1", "CM2"];
const PERIODS: TeacherClassPeriod[] = ["P1", "P2", "P3", "P4", "P5"];

export async function createClassAction(formData: FormData): Promise<{ error: string } | undefined> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) {
    redirect("/connexion");
  }

  const schoolYear = String(formData.get("schoolYear") ?? "").trim();
  const level = String(formData.get("level") ?? "") as TeacherClassLevel;
  const className = String(formData.get("className") ?? "").trim();
  const studentCountRaw = String(formData.get("studentCount") ?? "").trim();
  const activePeriod = String(formData.get("activePeriod") ?? "P1") as TeacherClassPeriod;

  if (!schoolYear || !LEVELS.includes(level) || !PERIODS.includes(activePeriod)) {
    return { error: "Veuillez compléter l'année scolaire, le niveau et la période." };
  }

  await createTeacherClass(data.user.id, {
    schoolYear,
    level,
    className: className || null,
    studentCount: studentCountRaw ? Number(studentCountRaw) : null,
    activePeriod,
  });

  revalidatePath("/espace/classes");
  revalidatePath("/espace");
}

export async function archiveClassAction(formData: FormData): Promise<void> {
  const classId = String(formData.get("classId") ?? "");
  const isArchived = formData.get("isArchived") === "true";
  await updateTeacherClass(classId, { isArchived: !isArchived });
  revalidatePath("/espace/classes");
  revalidatePath("/espace");
}

export async function deleteClassAction(formData: FormData): Promise<void> {
  const classId = String(formData.get("classId") ?? "");
  await deleteTeacherClass(classId);
  revalidatePath("/espace/classes");
  revalidatePath("/espace");
}
