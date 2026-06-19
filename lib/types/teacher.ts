export type TeacherProfile = {
  id: string;
  email: string;
  displayName: string | null;
  createdAt: string;
  updatedAt: string;
};

export type TeacherClassLevel = "CP" | "CE1" | "CE2" | "CM1" | "CM2";

export type TeacherClassPeriod = "P1" | "P2" | "P3" | "P4" | "P5";

export type TeacherClass = {
  id: string;
  teacherId: string;
  schoolYear: string;
  level: TeacherClassLevel;
  className: string | null;
  studentCount: number | null;
  activePeriod: TeacherClassPeriod;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TeacherClassInput = {
  schoolYear: string;
  level: TeacherClassLevel;
  className: string | null;
  studentCount: number | null;
  activePeriod: TeacherClassPeriod;
};
