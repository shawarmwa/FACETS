import { Role } from "@prisma/client";

export const rolePermissions: Record<Role, string[]> = {
  ADMIN: ["manage_users", "view_reports", "manage_evaluations"],
  FACULTY: ["view_own_reports"],
  STUDENT: ["submit_evaluation"]
};

export function hasPermission(role: Role, permission: string) {
  return rolePermissions[role]?.includes(permission) ?? false;
}
