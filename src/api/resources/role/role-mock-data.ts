import { Role, SYSTEM_ROLES } from "@/types/role";
import { Permission } from "@/types/permission";

/**
 * Mock role data for development
 */
export const mockRoles: Role[] = [
  SYSTEM_ROLES.ADMIN,
  SYSTEM_ROLES.EDITOR,
  SYSTEM_ROLES.VIEWER,
  {
    id: "role-support",
    name: "Support Agent",
    description: "Can view and respond to customer inquiries",
    permissions: [
      Permission.VIEW_USERS,
      Permission.VIEW_WIDGETS,
      Permission.VIEW_AI_MODELS,
      Permission.VIEW_ANALYTICS,
    ],
    isSystem: false,
    createdAt: "2023-05-15T10:30:00Z",
    updatedAt: "2023-05-15T10:30:00Z",
  },
  {
    id: "role-analyst",
    name: "Analyst",
    description: "Focused on analytics and reporting",
    permissions: [
      Permission.VIEW_USERS,
      Permission.VIEW_WIDGETS,
      Permission.VIEW_AI_MODELS,
      Permission.VIEW_ANALYTICS,
      Permission.EXPORT_ANALYTICS,
    ],
    isSystem: false,
    createdAt: "2023-06-10T09:15:00Z",
    updatedAt: "2023-06-10T09:15:00Z",
  },
];
