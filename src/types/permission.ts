/**
 * Permission types
 */

// Define all possible permissions in the system
export enum Permission {
  // User management permissions
  VIEW_USERS = "view_users",
  CREATE_USER = "create_user",
  EDIT_USER = "edit_user",
  DELETE_USER = "delete_user",
  MANAGE_USER_ROLES = "manage_user_roles",
  
  // Widget permissions
  VIEW_WIDGETS = "view_widgets",
  CREATE_WIDGET = "create_widget",
  EDIT_WIDGET = "edit_widget",
  DELETE_WIDGET = "delete_widget",
  
  // AI model permissions
  VIEW_AI_MODELS = "view_ai_models",
  CREATE_AI_MODEL = "create_ai_model",
  EDIT_AI_MODEL = "edit_ai_model",
  DELETE_AI_MODEL = "delete_ai_model",
  
  // Analytics permissions
  VIEW_ANALYTICS = "view_analytics",
  EXPORT_ANALYTICS = "export_analytics",
  
  // Settings permissions
  VIEW_SETTINGS = "view_settings",
  EDIT_SETTINGS = "edit_settings",
}

// Define permission categories for UI organization
export enum PermissionCategory {
  USER_MANAGEMENT = "User Management",
  WIDGET_MANAGEMENT = "Widget Management",
  AI_MODEL_MANAGEMENT = "AI Model Management",
  ANALYTICS = "Analytics",
  SETTINGS = "Settings",
}

// Map permissions to categories
export const permissionCategoryMap: Record<Permission, PermissionCategory> = {
  [Permission.VIEW_USERS]: PermissionCategory.USER_MANAGEMENT,
  [Permission.CREATE_USER]: PermissionCategory.USER_MANAGEMENT,
  [Permission.EDIT_USER]: PermissionCategory.USER_MANAGEMENT,
  [Permission.DELETE_USER]: PermissionCategory.USER_MANAGEMENT,
  [Permission.MANAGE_USER_ROLES]: PermissionCategory.USER_MANAGEMENT,
  
  [Permission.VIEW_WIDGETS]: PermissionCategory.WIDGET_MANAGEMENT,
  [Permission.CREATE_WIDGET]: PermissionCategory.WIDGET_MANAGEMENT,
  [Permission.EDIT_WIDGET]: PermissionCategory.WIDGET_MANAGEMENT,
  [Permission.DELETE_WIDGET]: PermissionCategory.WIDGET_MANAGEMENT,
  
  [Permission.VIEW_AI_MODELS]: PermissionCategory.AI_MODEL_MANAGEMENT,
  [Permission.CREATE_AI_MODEL]: PermissionCategory.AI_MODEL_MANAGEMENT,
  [Permission.EDIT_AI_MODEL]: PermissionCategory.AI_MODEL_MANAGEMENT,
  [Permission.DELETE_AI_MODEL]: PermissionCategory.AI_MODEL_MANAGEMENT,
  
  [Permission.VIEW_ANALYTICS]: PermissionCategory.ANALYTICS,
  [Permission.EXPORT_ANALYTICS]: PermissionCategory.ANALYTICS,
  
  [Permission.VIEW_SETTINGS]: PermissionCategory.SETTINGS,
  [Permission.EDIT_SETTINGS]: PermissionCategory.SETTINGS,
};

// Human-readable permission descriptions
export const permissionDescriptions: Record<Permission, string> = {
  [Permission.VIEW_USERS]: "View user list and details",
  [Permission.CREATE_USER]: "Create new users",
  [Permission.EDIT_USER]: "Edit user information",
  [Permission.DELETE_USER]: "Delete users",
  [Permission.MANAGE_USER_ROLES]: "Assign and modify user roles",
  
  [Permission.VIEW_WIDGETS]: "View widget list and details",
  [Permission.CREATE_WIDGET]: "Create new widgets",
  [Permission.EDIT_WIDGET]: "Edit widget settings",
  [Permission.DELETE_WIDGET]: "Delete widgets",
  
  [Permission.VIEW_AI_MODELS]: "View AI model list and details",
  [Permission.CREATE_AI_MODEL]: "Create new AI models",
  [Permission.EDIT_AI_MODEL]: "Edit AI model settings",
  [Permission.DELETE_AI_MODEL]: "Delete AI models",
  
  [Permission.VIEW_ANALYTICS]: "View analytics data",
  [Permission.EXPORT_ANALYTICS]: "Export analytics data",
  
  [Permission.VIEW_SETTINGS]: "View system settings",
  [Permission.EDIT_SETTINGS]: "Edit system settings",
};
