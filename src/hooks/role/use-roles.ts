import { useState, useEffect, useCallback } from "react";
import { Role } from "@/types/role";
import { Permission, PermissionCategory } from "@/types/permission";
import { roleService } from "@/services/role";

/**
 * Hook for managing roles
 * 
 * This hook provides state and methods for managing roles.
 */
export function useRoles() {
  // Data state
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [permissionsByCategory, setPermissionsByCategory] = useState<Record<PermissionCategory, Permission[]>>({} as Record<PermissionCategory, Permission[]>);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Selected role state
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  
  // Dialog state
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  /**
   * Fetch roles
   */
  const fetchRoles = useCallback(async () => {
    try {
      setLoading(true);
      const data = await roleService.getRoles();
      setRoles(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch roles");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Fetch permissions
   */
  const fetchPermissions = useCallback(async () => {
    try {
      setLoading(true);
      const data = await roleService.getPermissions();
      setPermissions(data);
      
      // Get permissions by category
      const categorizedPermissions = await roleService.getPermissionsByCategory();
      setPermissionsByCategory(categorizedPermissions);
      
      setError(null);
    } catch (err) {
      setError("Failed to fetch permissions");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Create role
   * @param roleData Role data
   * @returns Promise<boolean> Success status
   */
  const createRole = useCallback(async (roleData: Partial<Role>) => {
    try {
      setLoading(true);
      const newRole = await roleService.createRole(roleData);
      setRoles((prevRoles) => [...prevRoles, newRole]);
      setIsCreateDialogOpen(false);
      return true;
    } catch (err) {
      setError("Failed to create role");
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Update role
   * @param id Role ID
   * @param roleData Role data
   * @returns Promise<boolean> Success status
   */
  const updateRole = useCallback(async (id: string, roleData: Partial<Role>) => {
    try {
      setLoading(true);
      const updatedRole = await roleService.updateRole(id, roleData);
      setRoles((prevRoles) => 
        prevRoles.map((role) => role.id === id ? updatedRole : role)
      );
      setSelectedRole(null);
      setIsEditDialogOpen(false);
      return true;
    } catch (err) {
      setError("Failed to update role");
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Delete role
   * @returns Promise<boolean> Success status
   */
  const deleteRole = useCallback(async () => {
    if (!selectedRole) return false;
    
    try {
      setLoading(true);
      await roleService.deleteRole(selectedRole.id);
      setRoles((prevRoles) => prevRoles.filter((role) => role.id !== selectedRole.id));
      setSelectedRole(null);
      setIsDeleteDialogOpen(false);
      return true;
    } catch (err) {
      setError("Failed to delete role");
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [selectedRole]);

  /**
   * Handle edit role
   * @param role Role
   */
  const handleEditRole = useCallback((role: Role) => {
    setSelectedRole(role);
    setIsEditDialogOpen(true);
  }, []);

  /**
   * Handle delete role
   * @param role Role
   */
  const handleDeleteRole = useCallback((role: Role) => {
    setSelectedRole(role);
    setIsDeleteDialogOpen(true);
  }, []);

  // Load roles and permissions on component mount
  useEffect(() => {
    fetchRoles();
    fetchPermissions();
  }, [fetchRoles, fetchPermissions]);

  return {
    // Data
    roles,
    permissions,
    permissionsByCategory,
    loading,
    error,
    
    // Selected role
    selectedRole,
    setSelectedRole,
    
    // Dialog state
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    
    // Actions
    fetchRoles,
    fetchPermissions,
    createRole,
    updateRole,
    deleteRole,
    handleEditRole,
    handleDeleteRole,
    
    // Utility functions
    hasPermission: roleService.hasPermission,
    hasAllPermissions: roleService.hasAllPermissions,
    hasAnyPermission: roleService.hasAnyPermission,
  };
}
