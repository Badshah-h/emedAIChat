/**
 * Role types
 */

import { Permission } from "./permission";

// Define role interface
export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  isSystem: boolean; // System roles cannot be modified or deleted
  createdAt: string;
  updatedAt: string;
}

// Define role types
export type RoleType = "admin" | "editor" | "viewer" | "custom";

// Define predefined system roles
export const SYSTEM_ROLES: Record<string, Role> = {
  ADMIN: {
    id: "role-admin",
    name: "Admin",
    description: "Full access to all system features",
    permissions: Object.values(Permission),
    isSystem: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  EDITOR: {
    id: "role-editor",
    name: "Editor",
    description: "Can create and edit content, but cannot manage users or system settings",
    permissions: [
      Permission.VIEW_USERS,
      Permission.VIEW_WIDGETS,
      Permission.CREATE_WIDGET,
      Permission.EDIT_WIDGET,
      Permission.VIEW_AI_MODELS,
      Permission.CREATE_AI_MODEL,
      Permission.EDIT_AI_MODEL,
      Permission.VIEW_ANALYTICS,
    ],
    isSystem: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  VIEWER: {
    id: "role-viewer",
    name: "Viewer",
    description: "Read-only access to content",
    permissions: [
      Permission.VIEW_USERS,
      Permission.VIEW_WIDGETS,
      Permission.VIEW_AI_MODELS,
      Permission.VIEW_ANALYTICS,
    ],
    isSystem: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
};

// Map role types to system roles
export const roleTypeToSystemRole: Record<RoleType, Role> = {
  admin: SYSTEM_ROLES.ADMIN,
  editor: SYSTEM_ROLES.EDITOR,
  viewer: SYSTEM_ROLES.VIEWER,
  custom: {
    id: "role-custom",
    name: "Custom",
    description: "Custom role with specific permissions",
    permissions: [],
    isSystem: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
};

// Get role by type
export function getRoleByType(type: RoleType): Role {
  return roleTypeToSystemRole[type];
}

// Check if a role has a specific permission
export function hasPermission(role: Role, permission: Permission): boolean {
  return role.permissions.includes(permission);
}

// Check if a role has all specified permissions
export function hasAllPermissions(role: Role, permissions: Permission[]): boolean {
  return permissions.every(permission => role.permissions.includes(permission));
}

// Check if a role has any of the specified permissions
export function hasAnyPermission(role: Role, permissions: Permission[]): boolean {
  return permissions.some(permission => role.permissions.includes(permission));
}
