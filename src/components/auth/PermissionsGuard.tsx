import { ReactNode } from "react";
import { Permission } from "@/types/permission";
import { UserWithRole, userHasPermission, userHasAllPermissions, userHasAnyPermission } from "@/types/user";

interface PermissionsGuardProps {
  user: UserWithRole;
  permission?: Permission;
  permissions?: Permission[];
  requireAll?: boolean;
  fallback?: ReactNode;
  children: ReactNode;
}

/**
 * Permissions Guard Component
 * 
 * This component conditionally renders its children based on user permissions.
 * It can check for a single permission, or multiple permissions with AND/OR logic.
 * 
 * @param user The user with role details
 * @param permission A single permission to check
 * @param permissions Multiple permissions to check
 * @param requireAll If true, the user must have all permissions (AND logic), otherwise any permission is sufficient (OR logic)
 * @param fallback Content to render if the user doesn't have the required permissions
 * @param children Content to render if the user has the required permissions
 */
export function PermissionsGuard({
  user,
  permission,
  permissions = [],
  requireAll = false,
  fallback = null,
  children,
}: PermissionsGuardProps) {
  // If no permissions are specified, render the children
  if (!permission && permissions.length === 0) {
    return <>{children}</>;
  }

  // Check for a single permission
  if (permission && !permissions.length) {
    return userHasPermission(user, permission) ? <>{children}</> : <>{fallback}</>;
  }

  // Check for multiple permissions
  const allPermissions = permission ? [permission, ...permissions] : permissions;
  
  if (requireAll) {
    // AND logic - user must have all permissions
    return userHasAllPermissions(user, allPermissions) ? <>{children}</> : <>{fallback}</>;
  } else {
    // OR logic - user must have at least one permission
    return userHasAnyPermission(user, allPermissions) ? <>{children}</> : <>{fallback}</>;
  }
}
