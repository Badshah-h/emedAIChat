import { useState, useEffect, useCallback } from "react";
import { User, UserFilters } from "@/types/user";
import { userService } from "@/services/user/user-service";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
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

  // Get filtered users
  const filteredUsers = userService.filterUsers(users, {
    searchQuery,
    roleFilter,
    statusFilter,
  });

  // Fetch users
  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await userService.getUsers();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch users");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create user
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

  // Delete user
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

  // Load users on component mount
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    // Data
    users,
    filteredUsers,
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
    
    // Actions
    createUser,
    deleteUser,
    
    // Utility functions
    getRoleBadgeClass: userService.getRoleBadgeClass,
    getStatusBadgeClass: userService.getStatusBadgeClass,
  };
}
