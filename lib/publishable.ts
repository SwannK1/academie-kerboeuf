const PLACEHOLDERS = new Set(["à vérifier", "À vérifier"]);

export function isPublishable(value: string | null | undefined): value is string {
  if (!value || !value.trim()) return false;
  return !PLACEHOLDERS.has(value.trim());
}
