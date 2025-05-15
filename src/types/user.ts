/**
 * User types
 */

import { Role, RoleType } from "./role";
import { Permission } from "./permission";

export interface User {
  id: string;
  name: string;
  email: string;
  role: RoleType;
  roleId?: string; // For custom roles
  status: "active" | "inactive" | "pending";
  lastActive: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
  permissions?: Permission[]; // Cached permissions for quick access
}

export interface UserWithRole extends User {
  roleDetails: Role;
}

export interface UserFilters {
  searchQuery: string;
  roleFilter: string;
  statusFilter: string;
}

// User creation/update form values
export interface UserFormValues {
  name: string;
  email: string;
  role: RoleType;
  roleId?: string;
  status: "active" | "inactive" | "pending";
  sendInvite?: boolean;
}

// Check if a user has a specific permission
export function userHasPermission(user: UserWithRole, permission: Permission): boolean {
  // If user has cached permissions, check there first
  if (user.permissions && user.permissions.includes(permission)) {
    return true;
  }

  // Otherwise check the role permissions
  return user.roleDetails.permissions.includes(permission);
}

// Check if a user has all specified permissions
export function userHasAllPermissions(user: UserWithRole, permissions: Permission[]): boolean {
  return permissions.every(permission => userHasPermission(user, permission));
}

// Check if a user has any of the specified permissions
export function userHasAnyPermission(user: UserWithRole, permissions: Permission[]): boolean {
  return permissions.some(permission => userHasPermission(user, permission));
}
