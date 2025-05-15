import { useState, useEffect } from "react";
import { UserWithRole } from "@/types/user";
import { Permission } from "@/types/permission";
import { SYSTEM_ROLES } from "@/types/role";

/**
 * Hook for getting the current user with permissions
 * 
 * This is a mock implementation for demonstration purposes.
 * In a real application, this would fetch the current user from an API or context.
 */
export function useCurrentUser() {
  const [user, setUser] = useState<UserWithRole | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call to get current user
    const fetchCurrentUser = async () => {
      try {
        setLoading(true);
        
        // In a real app, this would be an API call
        // For demo purposes, we'll create a mock user
        const mockUser: UserWithRole = {
          id: "current-user",
          name: "Current User",
          email: "current.user@example.com",
          role: "admin",
          status: "active",
          lastActive: "Just now",
          avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=current",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          roleDetails: SYSTEM_ROLES.ADMIN,
        };
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setUser(mockUser);
        setError(null);
      } catch (err) {
        setError("Failed to fetch current user");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCurrentUser();
  }, []);

  /**
   * Check if the current user has a specific permission
   * @param permission Permission to check
   * @returns boolean True if the user has the permission
   */
  const hasPermission = (permission: Permission): boolean => {
    if (!user) return false;
    return user.roleDetails.permissions.includes(permission);
  };

  /**
   * Check if the current user has all specified permissions
   * @param permissions Permissions to check
   * @returns boolean True if the user has all permissions
   */
  const hasAllPermissions = (permissions: Permission[]): boolean => {
    if (!user) return false;
    return permissions.every(permission => user.roleDetails.permissions.includes(permission));
  };

  /**
   * Check if the current user has any of the specified permissions
   * @param permissions Permissions to check
   * @returns boolean True if the user has any of the permissions
   */
  const hasAnyPermission = (permissions: Permission[]): boolean => {
    if (!user) return false;
    return permissions.some(permission => user.roleDetails.permissions.includes(permission));
  };

  return {
    user,
    loading,
    error,
    hasPermission,
    hasAllPermissions,
    hasAnyPermission,
  };
}
