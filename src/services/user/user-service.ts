import { User, UserFilters, UserWithRole, userHasPermission } from "@/types/user";
import { userApi } from "@/api/resources/user";
import { Permission } from "@/types/permission";
import { Role } from "@/types/role";
import { roleService } from "@/services/role";

/**
 * User service
 *
 * This service provides business logic for user-related operations.
 */
export const userService = {
  /**
   * Get all users
   * @returns Promise<User[]> Array of users
   */
  getUsers: async (): Promise<User[]> => {
    return await userApi.getUsers();
  },

  /**
   * Get all users with role details
   * @returns Promise<UserWithRole[]> Array of users with role details
   */
  getUsersWithRoles: async (): Promise<UserWithRole[]> => {
    return await userApi.getUsersWithRoles();
  },

  /**
   * Create a new user
   * @param userData Partial user data
   * @returns Promise<User> Created user
   */
  createUser: async (userData: Partial<User>): Promise<User> => {
    const newUser = await userApi.createUser(userData);
    return newUser;
  },

  /**
   * Delete a user
   * @param userId User ID to delete
   * @returns Promise<boolean> Success status
   */
  deleteUser: async (userId: string): Promise<boolean> => {
    return await userApi.deleteUser(userId);
  },

  /**
   * Update a user
   * @param userId User ID to update
   * @param userData Partial user data to update
   * @returns Promise<User> Updated user
   */
  updateUser: async (userId: string, userData: Partial<User>): Promise<User> => {
    return await userApi.updateUser(userId, userData);
  },

  /**
   * Update a user's role
   * @param userId User ID
   * @param role New role
   * @param roleId Optional role ID for custom roles
   * @returns Promise<User> Updated user
   */
  updateUserRole: async (
    userId: string,
    role: User['role'],
    roleId?: string
  ): Promise<User> => {
    // If role is custom, roleId is required
    if (role === 'custom' && !roleId) {
      throw new Error("Role ID is required for custom roles");
    }

    // Update the user with the new role
    return await userApi.updateUser(userId, {
      role,
      roleId: role === 'custom' ? roleId : undefined
    });
  },

  /**
   * Update a user's status
   * @param userId User ID
   * @param status New status
   * @returns Promise<User> Updated user
   */
  updateUserStatus: async (userId: string, status: User['status']): Promise<User> => {
    return await userApi.updateUser(userId, { status });
  },

  /**
   * Check if a user has a specific permission
   * @param user User with role details
   * @param permission Permission to check
   * @returns boolean True if the user has the permission
   */
  hasPermission: (user: UserWithRole, permission: Permission): boolean => {
    return userHasPermission(user, permission);
  },

  /**
   * Get all available roles
   * @returns Promise<Role[]> Array of roles
   */
  getRoles: async (): Promise<Role[]> => {
    return await roleService.getRoles();
  },

  /**
   * Filter users based on search query and filters
   * @param users Array of users to filter
   * @param filters Filters to apply
   * @returns Array of filtered users
   */
  filterUsers: (users: User[], filters: UserFilters): User[] => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(filters.searchQuery.toLowerCase());

      const matchesRole = filters.roleFilter === "all" || user.role === filters.roleFilter;

      const matchesStatus = filters.statusFilter === "all" || user.status === filters.statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  },

  /**
   * Get role badge class based on role
   * @param role User role
   * @returns CSS class for the badge
   */
  getRoleBadgeClass: (role: string): string => {
    switch (role) {
      case "admin":
        return "bg-primary";
      case "editor":
        return "bg-blue-500";
      case "viewer":
        return "bg-slate-500";
      default:
        return "";
    }
  },

  /**
   * Get status badge class based on status
   * @param status User status
   * @returns CSS class for the badge
   */
  getStatusBadgeClass: (status: string): string => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "inactive":
        return "bg-yellow-500";
      case "pending":
        return "bg-orange-500";
      default:
        return "";
    }
  },
};
