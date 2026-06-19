import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { TeacherClass, TeacherClassInput } from "@/lib/types/teacher";

type TeacherClassRow = {
  id: string;
  teacher_id: string;
  school_year: string;
  level: TeacherClass["level"];
  class_name: string | null;
  student_count: number | null;
  active_period: TeacherClass["activePeriod"];
  is_archived: boolean;
  created_at: string;
  updated_at: string;
};

function fromRow(row: TeacherClassRow): TeacherClass {
  return {
    id: row.id,
    teacherId: row.teacher_id,
    schoolYear: row.school_year,
    level: row.level,
    className: row.class_name,
    studentCount: row.student_count,
    activePeriod: row.active_period,
    isArchived: row.is_archived,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function listTeacherClasses(): Promise<TeacherClass[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("teacher_classes")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(`Impossible de charger les classes : ${error.message}`);
  }

  return (data ?? []).map(fromRow);
}

export async function getTeacherClass(classId: string): Promise<TeacherClass | null> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("teacher_classes")
    .select("*")
    .eq("id", classId)
    .maybeSingle();

  if (error) {
    throw new Error(`Impossible de charger la classe : ${error.message}`);
  }

  return data ? fromRow(data) : null;
}

export async function createTeacherClass(
  teacherId: string,
  input: TeacherClassInput,
): Promise<TeacherClass> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("teacher_classes")
    .insert({
      teacher_id: teacherId,
      school_year: input.schoolYear,
      level: input.level,
      class_name: input.className,
      student_count: input.studentCount,
      active_period: input.activePeriod,
    })
    .select("*")
    .single();

  if (error) {
    throw new Error(`Impossible de créer la classe : ${error.message}`);
  }

  return fromRow(data);
}

export async function updateTeacherClass(
  classId: string,
  input: Partial<TeacherClassInput> & { isArchived?: boolean },
): Promise<TeacherClass> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("teacher_classes")
    .update({
      ...(input.schoolYear !== undefined && { school_year: input.schoolYear }),
      ...(input.level !== undefined && { level: input.level }),
      ...(input.className !== undefined && { class_name: input.className }),
      ...(input.studentCount !== undefined && { student_count: input.studentCount }),
      ...(input.activePeriod !== undefined && { active_period: input.activePeriod }),
      ...(input.isArchived !== undefined && { is_archived: input.isArchived }),
      updated_at: new Date().toISOString(),
    })
    .eq("id", classId)
    .select("*")
    .single();

  if (error) {
    throw new Error(`Impossible de modifier la classe : ${error.message}`);
  }

  return fromRow(data);
}

export async function deleteTeacherClass(classId: string): Promise<void> {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("teacher_classes").delete().eq("id", classId);

  if (error) {
    throw new Error(`Impossible de supprimer la classe : ${error.message}`);
  }
}
