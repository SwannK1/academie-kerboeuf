/**
 * Aide bas niveau partagée par les outils enseignants en localStorage
 * (programmation annuelle, progression de période, emploi du temps, cahier
 * journal, suivi de classe).
 *
 * Centralise uniquement l'accès brut (disponibilité, lecture, écriture,
 * suppression) qui serait sinon dupliqué cinq fois à l'identique. La
 * validation de forme des données reste de la responsabilité de chaque
 * outil, car leurs structures diffèrent.
 */

export function isLocalStorageAvailable(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const probeKey = "__academie-kerboeuf-storage-probe__";
    window.localStorage.setItem(probeKey, "1");
    window.localStorage.removeItem(probeKey);
    return true;
  } catch {
    return false;
  }
}

export function readLocalStorageRaw(key: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeLocalStorageRaw(key: string, raw: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.setItem(key, raw);
    return true;
  } catch {
    return false;
  }
}

export function removeLocalStorageKey(key: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

/**
 * Lit et parse une clé JSON. Si la clé est absente, illisible (JSON invalide)
 * ou ne correspond pas à `isValid`, retourne `fallback` et signale
 * `wasReset: true` pour que l'outil appelant puisse en informer
 * l'enseignant — on ne supprime jamais silencieusement une donnée invalide
 * sans le dire.
 */
export function readLocalStorageJson<T>(
  key: string,
  isValid: (value: unknown) => value is T,
  fallback: T,
): { value: T; wasReset: boolean } {
  const raw = readLocalStorageRaw(key);
  if (!raw) return { value: fallback, wasReset: false };
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (isValid(parsed)) return { value: parsed, wasReset: false };
    return { value: fallback, wasReset: true };
  } catch {
    return { value: fallback, wasReset: true };
  }
}

export function writeLocalStorageJson(key: string, value: unknown): boolean {
  try {
    return writeLocalStorageRaw(key, JSON.stringify(value));
  } catch {
    return false;
  }
}

export function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Filtre un tableau potentiellement corrompu pour ne garder que des objets. */
export function sanitizeObjectArray<T>(value: unknown): T[] {
  if (!Array.isArray(value)) return [];
  return value.filter(isPlainObject) as T[];
}
