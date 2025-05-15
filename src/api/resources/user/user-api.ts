import { User, UserWithRole } from "@/types/user";
import { httpClient } from '@/api/core/http-client';
import { USER_ENDPOINTS } from '@/api/core/api-endpoints';

// Check if we're in development mode to use mock data
const isDevelopment = import.meta.env.DEV;

// Mock data for development
import { mockUsers, getUserWithRoleDetails } from './user-mock-data';

/**
 * User API module
 *
 * This module provides methods for interacting with the user-related API endpoints.
 * In development mode, it uses mock data. In production, it makes actual API calls.
 */
export const userApi = {
  /**
   * Get all users
   * @returns Promise<User[]> Array of users
   */
  getUsers: async (): Promise<User[]> => {
    if (isDevelopment) {
      // Use mock data in development
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([...mockUsers]);
        }, 500);
      });
    }

    // Make actual API call in production
    return httpClient.get<User[]>(USER_ENDPOINTS.GET_ALL);
  },

  /**
   * Get all users with role details
   * @returns Promise<UserWithRole[]> Array of users with role details
   */
  getUsersWithRoles: async (): Promise<UserWithRole[]> => {
    if (isDevelopment) {
      // Use mock data in development
      return new Promise((resolve) => {
        setTimeout(() => {
          const usersWithRoles = mockUsers.map(user => getUserWithRoleDetails(user));
          resolve(usersWithRoles);
        }, 500);
      });
    }

    // Make actual API call in production
    return httpClient.get<UserWithRole[]>(`${USER_ENDPOINTS.GET_ALL}/with-roles`);
  },

  /**
   * Create a new user
   * @param userData Partial user data
   * @returns Promise<User> Created user
   */
  createUser: async (userData: Partial<User>): Promise<User> => {
    if (isDevelopment) {
      // Use mock data in development
      return new Promise((resolve) => {
        setTimeout(() => {
          const now = new Date().toISOString();
          const newUser: User = {
            id: `user-${Date.now()}`,
            name: userData.name || "New User",
            email: userData.email || "new.user@example.com",
            role: userData.role || "viewer",
            roleId: userData.roleId,
            status: userData.status || "pending",
            lastActive: "Never",
            avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}`,
            createdAt: now,
            updatedAt: now,
          };
          mockUsers.push(newUser);
          resolve(newUser);
        }, 500);
      });
    }

    // Make actual API call in production
    return httpClient.post<User>(USER_ENDPOINTS.CREATE, userData);
  },

  /**
   * Delete a user
   * @param userId User ID to delete
   * @returns Promise<boolean> Success status
   */
  deleteUser: async (userId: string): Promise<boolean> => {
    if (isDevelopment) {
      // Use mock data in development
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 500);
      });
    }

    // Make actual API call in production
    await httpClient.delete(USER_ENDPOINTS.DELETE(userId));
    return true;
  },

  /**
   * Update a user
   * @param userId User ID to update
   * @param userData Partial user data to update
   * @returns Promise<User> Updated user
   */
  updateUser: async (userId: string, userData: Partial<User>): Promise<User> => {
    if (isDevelopment) {
      // Use mock data in development
      return new Promise((resolve) => {
        setTimeout(() => {
          const userIndex = mockUsers.findIndex((u: User) => u.id === userId);
          if (userIndex === -1) {
            throw new Error("User not found");
          }

          const updatedUser: User = {
            ...mockUsers[userIndex],
            ...userData,
            updatedAt: new Date().toISOString(),
          };

          // Update the user in the mock data
          mockUsers[userIndex] = updatedUser;

          resolve(updatedUser);
        }, 500);
      });
    }

    // Make actual API call in production
    return httpClient.put<User>(USER_ENDPOINTS.UPDATE(userId), userData);
  },

  /**
   * Update a user's role
   * @param userId User ID
   * @param role New role
   * @returns Promise<User> Updated user
   */
  updateUserRole: async (userId: string, role: User['role']): Promise<User> => {
    if (isDevelopment) {
      return userApi.updateUser(userId, { role });
    }

    // Make actual API call in production
    return httpClient.patch<User>(USER_ENDPOINTS.UPDATE_ROLE(userId), { role });
  },

  /**
   * Update a user's status
   * @param userId User ID
   * @param status New status
   * @returns Promise<User> Updated user
   */
  updateUserStatus: async (userId: string, status: User['status']): Promise<User> => {
    if (isDevelopment) {
      return userApi.updateUser(userId, { status });
    }

    // Make actual API call in production
    return httpClient.patch<User>(USER_ENDPOINTS.UPDATE_STATUS(userId), { status });
  },
};
