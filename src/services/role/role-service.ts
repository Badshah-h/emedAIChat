import { Role } from "@/types/role";
import { Permission, PermissionCategory, permissionCategoryMap } from "@/types/permission";
import { roleApi } from "@/api/resources/role";

/**
 * Role service
 * 
 * This service provides business logic for role-related operations.
 */
export const roleService = {
  /**
   * Get all roles
   * @returns Promise<Role[]> Array of roles
   */
  getRoles: async (): Promise<Role[]> => {
    return await roleApi.getRoles();
  },

  /**
   * Get role by ID
   * @param id Role ID
   * @returns Promise<Role> Role
   */
  getRoleById: async (id: string): Promise<Role> => {
    return await roleApi.getRoleById(id);
  },

  /**
   * Create a new role
   * @param roleData Role data
   * @returns Promise<Role> Created role
   */
  createRole: async (roleData: Partial<Role>): Promise<Role> => {
    return await roleApi.createRole(roleData);
  },

  /**
   * Update a role
   * @param id Role ID
   * @param roleData Role data to update
   * @returns Promise<Role> Updated role
   */
  updateRole: async (id: string, roleData: Partial<Role>): Promise<Role> => {
    return await roleApi.updateRole(id, roleData);
  },

  /**
   * Delete a role
   * @param id Role ID
   * @returns Promise<boolean> Success status
   */
  deleteRole: async (id: string): Promise<boolean> => {
    return await roleApi.deleteRole(id);
  },

  /**
   * Get all available permissions
   * @returns Promise<Permission[]> Array of permissions
   */
  getPermissions: async (): Promise<Permission[]> => {
    return await roleApi.getPermissions();
  },

  /**
   * Get permissions grouped by category
   * @returns Record<PermissionCategory, Permission[]> Permissions grouped by category
   */
  getPermissionsByCategory: async (): Promise<Record<PermissionCategory, Permission[]>> => {
    const permissions = await roleApi.getPermissions();
    
    // Initialize categories
    const permissionsByCategory: Record<PermissionCategory, Permission[]> = {} as Record<PermissionCategory, Permission[]>;
    
    // Initialize all categories with empty arrays
    Object.values(PermissionCategory).forEach(category => {
      permissionsByCategory[category] = [];
    });
    
    // Group permissions by category
    permissions.forEach(permission => {
      const category = permissionCategoryMap[permission];
      permissionsByCategory[category].push(permission);
    });
    
    return permissionsByCategory;
  },

  /**
   * Check if a role has a specific permission
   * @param role Role
   * @param permission Permission
   * @returns boolean True if the role has the permission
   */
  hasPermission: (role: Role, permission: Permission): boolean => {
    return role.permissions.includes(permission);
  },

  /**
   * Check if a role has all specified permissions
   * @param role Role
   * @param permissions Permissions
   * @returns boolean True if the role has all permissions
   */
  hasAllPermissions: (role: Role, permissions: Permission[]): boolean => {
    return permissions.every(permission => role.permissions.includes(permission));
  },

  /**
   * Check if a role has any of the specified permissions
   * @param role Role
   * @param permissions Permissions
   * @returns boolean True if the role has any of the permissions
   */
  hasAnyPermission: (role: Role, permissions: Permission[]): boolean => {
    return permissions.some(permission => role.permissions.includes(permission));
  },
};
