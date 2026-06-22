import bcrypt from "bcryptjs";
import { getPool } from "@/lib/auth/db";
import type { AccountRole, SelfServiceRole } from "@/lib/auth/roles";

export type AuthUser = {
  id: string;
  email: string;
  role: AccountRole;
};

export async function findUserByCredentials(
  email: string,
  password: string,
): Promise<AuthUser | null> {
  const pool = getPool();
  const result = await pool.query<{
    id: string;
    email: string;
    password_hash: string;
    role: AccountRole;
  }>("select id, email, password_hash, role from users where email = $1", [
    email.toLowerCase(),
  ]);

  const row = result.rows[0];
  if (!row) {
    return null;
  }

  const passwordMatches = await bcrypt.compare(password, row.password_hash);
  if (!passwordMatches) {
    return null;
  }

  return { id: row.id, email: row.email, role: row.role };
}

export async function createUser(
  email: string,
  password: string,
  role: SelfServiceRole,
): Promise<AuthUser> {
  const pool = getPool();
  const passwordHash = await bcrypt.hash(password, 10);

  const result = await pool.query<{ id: string; email: string; role: AccountRole }>(
    `insert into users (email, password_hash, role)
     values ($1, $2, $3)
     returning id, email, role`,
    [email.toLowerCase(), passwordHash, role],
  );

  return result.rows[0];
}
