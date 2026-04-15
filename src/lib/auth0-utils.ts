// auth0-utils.ts
import type { User } from "@auth0/nextjs-auth0/types";

// Returns true if the user's org_roles claim contains the exact role "admin".
export function isOrgAdmin(user: User): boolean {
  const roles: string[] = Array.isArray(user.org_roles) ? user.org_roles : [];
  return roles.includes("admin");
}
