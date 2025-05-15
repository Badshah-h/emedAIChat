import { useState, useEffect } from "react";
import { User, UserWithRole } from "@/types/user";
import { Role } from "@/types/role";
import { Permission, PermissionCategory, permissionCategoryMap, permissionDescriptions } from "@/types/permission";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useRoles } from "@/hooks/role";
import { useUsers } from "@/hooks/user";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, Shield, CheckCircle2, XCircle, ChevronRight, Lock, Unlock } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface UserPermissionsTabProps {
  user: User;
  onClose: () => void;
}

/**
 * User Permissions Tab Component
 *
 * This component displays and manages user permissions.
 */
export function UserPermissionsTab({ user, onClose }: UserPermissionsTabProps) {
  const { roles, permissionsByCategory, loading: rolesLoading } = useRoles();
  const { updateUserRole } = useUsers();

  // State
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [customPermissions, setCustomPermissions] = useState<Permission[]>([]);
  const [activeTab, setActiveTab] = useState<string>("role-based");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Find the user's current role
  useEffect(() => {
    if (roles.length > 0) {
      if (user.role === "custom" && user.roleId) {
        const customRole = roles.find(role => role.id === user.roleId);
        if (customRole) {
          setSelectedRole(customRole);
        }
      } else {
        const systemRole = roles.find(role => role.name.toLowerCase() === user.role);
        if (systemRole) {
          setSelectedRole(systemRole);
        }
      }
    }
  }, [user, roles]);

  // Initialize custom permissions from the selected role
  useEffect(() => {
    if (selectedRole) {
      setCustomPermissions([...selectedRole.permissions]);
    }
  }, [selectedRole]);

  // Handle role change
  const handleRoleChange = (roleId: string) => {
    const role = roles.find(r => r.id === roleId);
    if (role) {
      setSelectedRole(role);
      setCustomPermissions([...role.permissions]);
    }
  };

  // Toggle permission in custom permissions
  const togglePermission = (permission: Permission) => {
    if (customPermissions.includes(permission)) {
      setCustomPermissions(customPermissions.filter(p => p !== permission));
    } else {
      setCustomPermissions([...customPermissions, permission]);
    }
  };

  // Toggle all permissions in a category
  const toggleCategoryPermissions = (category: PermissionCategory) => {
    const categoryPermissions = permissionsByCategory[category] || [];

    // Check if all permissions in this category are already selected
    const allSelected = categoryPermissions.every(p =>
      customPermissions.includes(p)
    );

    if (allSelected) {
      // Remove all permissions in this category
      setCustomPermissions(
        customPermissions.filter(p => !categoryPermissions.includes(p))
      );
    } else {
      // Add all permissions in this category
      const newPermissions = [...customPermissions];

      categoryPermissions.forEach(p => {
        if (!newPermissions.includes(p)) {
          newPermissions.push(p);
        }
      });

      setCustomPermissions(newPermissions);
    }
  };

  // Save changes
  const saveChanges = async () => {
    try {
      setSaving(true);
      setError(null);

      if (activeTab === "role-based" && selectedRole) {
        // Update user's role
        if (selectedRole.isSystem) {
          // System role
          await updateUserRole(user.id, selectedRole.name.toLowerCase() as User["role"]);
        } else {
          // Custom role
          await updateUserRole(user.id, "custom", selectedRole.id);
        }
      } else if (activeTab === "custom") {
        // TODO: In a real app, you would create a custom role with these permissions
        // For now, we'll just show an alert
        setError("Custom permissions are not supported in this demo");
      }

      onClose();
    } catch (err) {
      setError("Failed to update user permissions");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  // Render permission checkboxes grouped by category
  const renderPermissionCheckboxes = () => {
    return Object.entries(permissionsByCategory).map(([category, categoryPermissions]) => (
      <div key={category} className="mb-6">
        <div className="flex items-center space-x-2 mb-2">
          <Checkbox
            id={`category-${category}`}
            checked={categoryPermissions.every(p =>
              customPermissions.includes(p)
            )}
            onCheckedChange={() => toggleCategoryPermissions(
              category as PermissionCategory
            )}
          />
          <Label
            htmlFor={`category-${category}`}
            className="text-base font-semibold"
          >
            {category}
          </Label>
        </div>

        <div className="grid grid-cols-1 gap-2 ml-6">
          {categoryPermissions.map(permission => (
            <div key={permission} className="flex items-center space-x-2">
              <Checkbox
                id={`permission-${permission}`}
                checked={customPermissions.includes(permission)}
                onCheckedChange={() => togglePermission(permission)}
              />
              <div>
                <Label htmlFor={`permission-${permission}`} className="font-medium">
                  {permission.split('_').map(word =>
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')}
                </Label>
                <p className="text-sm text-muted-foreground">
                  {permissionDescriptions[permission]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ));
  };

  if (rolesLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>User Permissions</CardTitle>
          <CardDescription>Loading permissions...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Permissions for {user.name}</CardTitle>
        <CardDescription>Manage what this user can do in the system</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="role-based">Role-Based Permissions</TabsTrigger>
            <TabsTrigger value="custom">Custom Permissions</TabsTrigger>
          </TabsList>

          <TabsContent value="role-based">
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                {roles.map(role => {
                  // Calculate permission coverage percentage
                  const totalPermissions = Object.values(Permission).length;
                  const coveragePercentage = Math.round((role.permissions.length / totalPermissions) * 100);

                  return (
                    <Card
                      key={role.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${selectedRole?.id === role.id
                        ? 'border-primary ring-2 ring-primary/20'
                        : 'hover:border-primary/50'
                        }`}
                      onClick={() => handleRoleChange(role.id)}
                    >
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          {/* Role info section */}
                          <div className="flex-1 p-6">
                            <div className="flex items-center gap-3 mb-2">
                              <div className={`p-2 rounded-full ${selectedRole?.id === role.id
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted'
                                }`}>
                                <Shield className="h-5 w-5" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold text-lg">{role.name}</h3>
                                  {role.isSystem && (
                                    <Badge variant="secondary" className="font-normal">System</Badge>
                                  )}
                                  {selectedRole?.id === role.id && (
                                    <Badge variant="default" className="font-normal">
                                      <CheckCircle2 className="h-3 w-3 mr-1" />
                                      Selected
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-muted-foreground text-sm">{role.description}</p>
                              </div>
                            </div>

                            <div className="mt-4">
                              <div className="flex justify-between text-sm mb-1">
                                <span>Permission coverage</span>
                                <span className="font-medium">{coveragePercentage}%</span>
                              </div>
                              <Progress value={coveragePercentage} className="h-2" />
                            </div>

                            <div className="mt-4">
                              <h4 className="text-sm font-medium mb-2">Key permissions:</h4>
                              <div className="flex flex-wrap gap-1.5">
                                {Object.values(PermissionCategory).slice(0, 3).map(category => {
                                  const categoryPermissions = Object.entries(permissionCategoryMap)
                                    .filter(([_, cat]) => cat === category)
                                    .map(([perm]) => perm as Permission);

                                  const hasAllInCategory = categoryPermissions.every(p =>
                                    role.permissions.includes(p)
                                  );

                                  const hasSomeInCategory = categoryPermissions.some(p =>
                                    role.permissions.includes(p)
                                  );

                                  return (
                                    <TooltipProvider key={category}>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Badge
                                            variant={hasAllInCategory ? "default" : hasSomeInCategory ? "outline" : "secondary"}
                                            className="text-xs cursor-help"
                                          >
                                            {hasAllInCategory ? (
                                              <CheckCircle2 className="h-3 w-3 mr-1" />
                                            ) : hasSomeInCategory ? (
                                              <Unlock className="h-3 w-3 mr-1" />
                                            ) : (
                                              <Lock className="h-3 w-3 mr-1" />
                                            )}
                                            {category}
                                          </Badge>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          {hasAllInCategory
                                            ? `Full access to ${category}`
                                            : hasSomeInCategory
                                              ? `Partial access to ${category}`
                                              : `No access to ${category}`}
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  );
                                })}
                                {Object.values(PermissionCategory).length > 3 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{Object.values(PermissionCategory).length - 3} more
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Action section */}
                          <div className="flex items-center justify-center p-4 md:p-6 bg-muted/30 md:border-l">
                            <Button
                              variant={selectedRole?.id === role.id ? "default" : "outline"}
                              size="sm"
                              className="gap-1"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRoleChange(role.id);
                              }}
                            >
                              {selectedRole?.id === role.id ? (
                                <>Selected</>
                              ) : (
                                <>Select<ChevronRight className="h-4 w-4" /></>
                              )}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <div className="bg-muted/30 rounded-lg p-4 border">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h4 className="font-medium mb-1">About Role-Based Permissions</h4>
                    <p className="text-sm text-muted-foreground">
                      Roles provide a predefined set of permissions that determine what actions a user can perform.
                      Selecting a role will automatically assign all associated permissions to this user.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="custom">
            <div className="space-y-6">
              <div className="bg-muted/30 rounded-lg p-4 border">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium mb-1">Custom Permission Assignment</h4>
                    <p className="text-sm text-muted-foreground">
                      Customize exactly which permissions this user has access to. This overrides the role-based permissions.
                      Use the checkboxes below to grant or revoke specific permissions.
                    </p>
                  </div>
                </div>
              </div>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Permission Categories
                  </CardTitle>
                  <CardDescription>
                    Select permissions by category or individually
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[400px]">
                    <div className="px-6">
                      {Object.entries(permissionsByCategory).map(([category, categoryPermissions], index, array) => {
                        const isLastCategory = index === array.length - 1;
                        const allSelected = categoryPermissions.every(p => customPermissions.includes(p));
                        const someSelected = categoryPermissions.some(p => customPermissions.includes(p));
                        const selectedCount = categoryPermissions.filter(p => customPermissions.includes(p)).length;

                        return (
                          <div key={category} className={`py-4 ${!isLastCategory ? 'border-b' : ''}`}>
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <Checkbox
                                  id={`category-${category}`}
                                  checked={allSelected}
                                  className={someSelected && !allSelected ? "bg-primary/50 text-primary-foreground" : ""}
                                  onCheckedChange={() => toggleCategoryPermissions(category as PermissionCategory)}
                                />
                                <div>
                                  <Label
                                    htmlFor={`category-${category}`}
                                    className="text-base font-semibold cursor-pointer"
                                  >
                                    {category}
                                  </Label>
                                  <p className="text-xs text-muted-foreground">
                                    {selectedCount} of {categoryPermissions.length} permissions selected
                                  </p>
                                </div>
                              </div>
                              <Badge variant={allSelected ? "default" : someSelected ? "outline" : "secondary"}>
                                {allSelected ? "Full Access" : someSelected ? "Partial Access" : "No Access"}
                              </Badge>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-8 mt-3">
                              {categoryPermissions.map(permission => {
                                const isSelected = customPermissions.includes(permission);
                                const permissionName = permission.split('_').map(word =>
                                  word.charAt(0).toUpperCase() + word.slice(1)
                                ).join(' ');

                                return (
                                  <div key={permission} className="flex items-start space-x-3 p-2 rounded-md hover:bg-muted/50 transition-colors">
                                    <Checkbox
                                      id={`permission-${permission}`}
                                      checked={isSelected}
                                      onCheckedChange={() => togglePermission(permission)}
                                      className="mt-1"
                                    />
                                    <div>
                                      <Label
                                        htmlFor={`permission-${permission}`}
                                        className="font-medium cursor-pointer"
                                      >
                                        {permissionName}
                                      </Label>
                                      <p className="text-xs text-muted-foreground">
                                        {permissionDescriptions[permission]}
                                      </p>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </ScrollArea>
                </CardContent>
                <CardFooter className="flex justify-between border-t p-4">
                  <div className="text-sm text-muted-foreground">
                    {customPermissions.length} of {Object.values(Permission).length} permissions selected
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCustomPermissions([])}
                    >
                      Clear All
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (selectedRole) {
                          setCustomPermissions([...selectedRole.permissions]);
                        }
                      }}
                    >
                      Reset to Role
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex items-center justify-between mt-6 pt-4 border-t">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4" />
            <span>
              {activeTab === "role-based"
                ? `Role: ${selectedRole?.name || "None selected"}`
                : `${customPermissions.length} custom permissions selected`}
            </span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={saveChanges}
              disabled={saving}
              className="gap-2"
            >
              {saving ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                  Saving...
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
