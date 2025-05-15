import { User } from "@/types/user";
import { mockRoles } from "../role/role-mock-data";

/**
 * Mock user data for development
 */
export const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "admin",
    status: "active",
    lastActive: "Just now",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    createdAt: "2023-01-15T10:30:00Z",
    updatedAt: "2023-01-15T10:30:00Z",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "editor",
    status: "active",
    lastActive: "2 hours ago",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
    createdAt: "2023-02-20T14:45:00Z",
    updatedAt: "2023-02-20T14:45:00Z",
  },
  {
    id: "3",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    role: "viewer",
    status: "inactive",
    lastActive: "3 days ago",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=robert",
    createdAt: "2023-03-10T09:15:00Z",
    updatedAt: "2023-03-10T09:15:00Z",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    role: "editor",
    status: "active",
    lastActive: "1 hour ago",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
    createdAt: "2023-04-05T11:20:00Z",
    updatedAt: "2023-04-05T11:20:00Z",
  },
  {
    id: "5",
    name: "Michael Wilson",
    email: "michael.wilson@example.com",
    role: "viewer",
    status: "pending",
    lastActive: "Never",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
    createdAt: "2023-05-12T16:30:00Z",
    updatedAt: "2023-05-12T16:30:00Z",
  },
  {
    id: "6",
    name: "Sarah Thompson",
    email: "sarah.thompson@example.com",
    role: "custom",
    roleId: "role-support",
    status: "active",
    lastActive: "5 hours ago",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    createdAt: "2023-06-18T13:45:00Z",
    updatedAt: "2023-06-18T13:45:00Z",
  },
  {
    id: "7",
    name: "David Miller",
    email: "david.miller@example.com",
    role: "custom",
    roleId: "role-analyst",
    status: "active",
    lastActive: "1 day ago",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
    createdAt: "2023-07-22T10:15:00Z",
    updatedAt: "2023-07-22T10:15:00Z",
  },
];

/**
 * Get user with role details
 * @param user User
 * @returns User with role details
 */
export function getUserWithRoleDetails(user: User) {
  let roleDetails;

  if (user.role === "custom" && user.roleId) {
    roleDetails = mockRoles.find(role => role.id === user.roleId);
    if (!roleDetails) {
      // Fallback to viewer if custom role not found
      roleDetails = mockRoles.find(role => role.name.toLowerCase() === "viewer");
    }
  } else {
    roleDetails = mockRoles.find(role => role.name.toLowerCase() === user.role);
  }

  return {
    ...user,
    roleDetails: roleDetails!,
  };
}
