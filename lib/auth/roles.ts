export const ACCOUNT_ROLES = ["teacher", "member", "admin"] as const;

export type AccountRole = (typeof ACCOUNT_ROLES)[number];

export const SELF_SERVICE_ROLES = ["teacher", "member"] as const satisfies readonly AccountRole[];

export type SelfServiceRole = (typeof SELF_SERVICE_ROLES)[number];

export function isSelfServiceRole(value: string): value is SelfServiceRole {
  return (SELF_SERVICE_ROLES as readonly string[]).includes(value);
}
