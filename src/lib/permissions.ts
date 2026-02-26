import { Role } from "@prisma/client";

type Permission =
  | "CREATE_TICKET"
  | "ASSIGN_TICKET"
  | "CLOSE_TICKET"
  | "MANAGE_USERS"
  | "MANAGE_CATEGORIES";

const rolePermissions: Record<Role, Permission[]> = {
  CLIENT: ["CREATE_TICKET"],

  SUPPORT: [
    "CREATE_TICKET",
    "ASSIGN_TICKET",
    "CLOSE_TICKET",
  ],

  ADMIN: [
    "CREATE_TICKET",
    "ASSIGN_TICKET",
    "CLOSE_TICKET",
    "MANAGE_USERS",
    "MANAGE_CATEGORIES",
  ],
};

export function hasPermission(role: Role, permission: Permission) {
  return rolePermissions[role].includes(permission);
}