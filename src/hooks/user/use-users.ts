import { useState, useEffect, useCallback } from "react";
import { User, UserFilters, UserWithRole } from "@/types/user";
import { userService } from "@/services/user";
import { Role } from "@/types/role";
import { Permission } from "@/types/permission";

/**
 * Hook for managing users
 *
 * This hook provides state and methods for managing users.
 */
export function useUsers() {
  // Data state
  const [users, setUsers] = useState<User[]>([]);
  const [usersWithRoles, setUsersWithRoles] = useState<UserWithRole[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters state
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Dialog state
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedUserWithRole, setSelectedUserWithRole] = useState<UserWithRole | null>(null);

  // Get filtered users
  const filteredUsers = userService.filterUsers(users, {
    searchQuery,
    roleFilter,
    statusFilter,
  });

  // Get filtered users with roles
  const filteredUsersWithRoles = userService.filterUsers(usersWithRoles, {
    searchQuery,
    roleFilter,
    statusFilter,
  });

  /**
   * Fetch users
   */
  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);

      // Fetch users
      const userData = await userService.getUsers();
      setUsers(userData);

      // Fetch users with roles
      const usersWithRolesData = await userService.getUsersWithRoles();
      setUsersWithRoles(usersWithRolesData);

      // Fetch roles
      const rolesData = await userService.getRoles();
      setRoles(rolesData);

      setError(null);
    } catch (err) {
      setError("Failed to fetch users");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Create user
   * @param userData User data
   * @returns Promise<boolean> Success status
   */
  const createUser = useCallback(async (userData: Partial<User>) => {
    try {
      setLoading(true);
      const newUser = await userService.createUser(userData);
      setUsers((prevUsers) => [...prevUsers, newUser]);
      setIsCreateDialogOpen(false);
      return true;
    } catch (err) {
      setError("Failed to create user");
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Delete user
   * @returns Promise<boolean> Success status
   */
  const deleteUser = useCallback(async () => {
    if (!selectedUser) return false;

    try {
      setLoading(true);
      await userService.deleteUser(selectedUser.id);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== selectedUser.id));
      setSelectedUser(null);
      setIsDeleteDialogOpen(false);
      return true;
    } catch (err) {
      setError("Failed to delete user");
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [selectedUser]);

  /**
   * Update user
   * @param userId User ID
   * @param userData User data
   * @returns Promise<boolean> Success status
   */
  const updateUser = useCallback(async (userId: string, userData: Partial<User>) => {
    try {
      setLoading(true);
      const updatedUser = await userService.updateUser(userId, userData);
      setUsers((prevUsers) =>
        prevUsers.map((user) => user.id === userId ? updatedUser : user)
      );
      return true;
    } catch (err) {
      setError("Failed to update user");
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Update user role
   * @param userId User ID
   * @param role New role
   * @returns Promise<boolean> Success status
   */
  const updateUserRole = useCallback(async (userId: string, role: User['role']) => {
    try {
      setLoading(true);
      const updatedUser = await userService.updateUserRole(userId, role);
      setUsers((prevUsers) =>
        prevUsers.map((user) => user.id === userId ? updatedUser : user)
      );
      return true;
    } catch (err) {
      setError("Failed to update user role");
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Update user status
   * @param userId User ID
   * @param status New status
   * @returns Promise<boolean> Success status
   */
  const updateUserStatus = useCallback(async (userId: string, status: User['status']) => {
    try {
      setLoading(true);
      const updatedUser = await userService.updateUserStatus(userId, status);
      setUsers((prevUsers) =>
        prevUsers.map((user) => user.id === userId ? updatedUser : user)
      );
      return true;
    } catch (err) {
      setError("Failed to update user status");
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Load users on component mount
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    // Data
    users,
    filteredUsers,
    usersWithRoles,
    filteredUsersWithRoles,
    roles,
    loading,
    error,

    // Filters
    searchQuery,
    setSearchQuery,
    roleFilter,
    setRoleFilter,
    statusFilter,
    setStatusFilter,

    // Dialog state
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    selectedUser,
    setSelectedUser,
    selectedUserWithRole,
    setSelectedUserWithRole,

    // Actions
    fetchUsers,
    createUser,
    deleteUser,
    updateUser,
    updateUserRole,
    updateUserStatus,

    // Permission checks
    hasPermission: userService.hasPermission,

    // Utility functions
    getRoleBadgeClass: userService.getRoleBadgeClass,
    getStatusBadgeClass: userService.getStatusBadgeClass,
  };
}
