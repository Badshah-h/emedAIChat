import { Role } from "@/types/role";
import { Permission } from "@/types/permission";
import { httpClient } from '@/api/core/http-client';
import { USER_ENDPOINTS } from '@/api/core/api-endpoints';

// Check if we're in development mode to use mock data
const isDevelopment = import.meta.env.DEV;

// Import mock data
import { mockRoles } from './role-mock-data';

/**
 * Role API module
 * 
 * This module provides methods for interacting with the role-related API endpoints.
 * In development mode, it uses mock data. In production, it makes actual API calls.
 */
export const roleApi = {
  /**
   * Get all roles
   * @returns Promise<Role[]> Array of roles
   */
  getRoles: async (): Promise<Role[]> => {
    if (isDevelopment) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([...mockRoles]);
        }, 500);
      });
    }
    
    return httpClient.get<Role[]>(`${USER_ENDPOINTS.GET_ALL}/roles`);
  },

  /**
   * Get role by ID
   * @param id Role ID
   * @returns Promise<Role> Role
   */
  getRoleById: async (id: string): Promise<Role> => {
    if (isDevelopment) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const role = mockRoles.find(r => r.id === id);
          if (role) {
            resolve({...role});
          } else {
            reject(new Error("Role not found"));
          }
        }, 500);
      });
    }
    
    return httpClient.get<Role>(`${USER_ENDPOINTS.GET_ALL}/roles/${id}`);
  },

  /**
   * Create a new role
   * @param roleData Role data
   * @returns Promise<Role> Created role
   */
  createRole: async (roleData: Partial<Role>): Promise<Role> => {
    if (isDevelopment) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const newRole: Role = {
            id: `role-${Date.now()}`,
            name: roleData.name || "New Role",
            description: roleData.description || "",
            permissions: roleData.permissions || [],
            isSystem: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          mockRoles.push(newRole);
          resolve(newRole);
        }, 500);
      });
    }
    
    return httpClient.post<Role>(`${USER_ENDPOINTS.GET_ALL}/roles`, roleData);
  },

  /**
   * Update a role
   * @param id Role ID
   * @param roleData Role data to update
   * @returns Promise<Role> Updated role
   */
  updateRole: async (id: string, roleData: Partial<Role>): Promise<Role> => {
    if (isDevelopment) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const roleIndex = mockRoles.findIndex(r => r.id === id);
          if (roleIndex >= 0) {
            // Check if it's a system role
            if (mockRoles[roleIndex].isSystem) {
              reject(new Error("Cannot modify system roles"));
              return;
            }
            
            const updatedRole: Role = {
              ...mockRoles[roleIndex],
              ...roleData,
              updatedAt: new Date().toISOString(),
            };
            
            mockRoles[roleIndex] = updatedRole;
            resolve(updatedRole);
          } else {
            reject(new Error("Role not found"));
          }
        }, 500);
      });
    }
    
    return httpClient.put<Role>(`${USER_ENDPOINTS.GET_ALL}/roles/${id}`, roleData);
  },

  /**
   * Delete a role
   * @param id Role ID
   * @returns Promise<boolean> Success status
   */
  deleteRole: async (id: string): Promise<boolean> => {
    if (isDevelopment) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const roleIndex = mockRoles.findIndex(r => r.id === id);
          if (roleIndex >= 0) {
            // Check if it's a system role
            if (mockRoles[roleIndex].isSystem) {
              reject(new Error("Cannot delete system roles"));
              return;
            }
            
            mockRoles.splice(roleIndex, 1);
            resolve(true);
          } else {
            reject(new Error("Role not found"));
          }
        }, 500);
      });
    }
    
    return httpClient.delete(`${USER_ENDPOINTS.GET_ALL}/roles/${id}`).then(() => true);
  },

  /**
   * Get all available permissions
   * @returns Promise<Permission[]> Array of permissions
   */
  getPermissions: async (): Promise<Permission[]> => {
    if (isDevelopment) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(Object.values(Permission));
        }, 500);
      });
    }
    
    return httpClient.get<Permission[]>(`${USER_ENDPOINTS.GET_ALL}/permissions`);
  },
};
