import { useState } from "react";
import {
  Search,
  Edit,
  Trash2,
  PlusCircle,
  Check,
  X,
  Shield,
  CheckCircle2,
  Lock,
  Unlock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useRoles } from "@/hooks/role";
import { Role } from "@/types/role";
import { Permission, PermissionCategory, permissionCategoryMap } from "@/types/permission";
import { useForm } from "react-hook-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Define form types
type RoleFormValues = {
  name: string;
  description: string;
  permissions: Permission[];
};

const RoleManagement = () => {
  const {
    roles,
    permissions,
    permissionsByCategory,
    loading,
    error,
    selectedRole,
    setSelectedRole,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    createRole,
    updateRole,
    deleteRole,
    handleEditRole,
    handleDeleteRole,
  } = useRoles();

  // Tab state
  const [activeTab, setActiveTab] = useState("all-roles");

  // Search state
  const [searchQuery, setSearchQuery] = useState("");

  // Form for adding a new role
  const addRoleForm = useForm<RoleFormValues>({
    defaultValues: {
      name: "",
      description: "",
      permissions: [],
    },
  });

  // Form for editing a role
  const editRoleForm = useForm<RoleFormValues>({
    defaultValues: {
      name: selectedRole?.name || "",
      description: selectedRole?.description || "",
      permissions: selectedRole?.permissions || [],
    },
  });

  // Reset and update edit form when selected role changes
  useState(() => {
    if (selectedRole) {
      editRoleForm.reset({
        name: selectedRole.name,
        description: selectedRole.description,
        permissions: selectedRole.permissions,
      });
    }
  });

  // Filter roles based on search query
  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    role.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateRole = (data: RoleFormValues) => {
    createRole({
      name: data.name,
      description: data.description,
      permissions: data.permissions,
      isSystem: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    // Reset form and go back to roles list
    addRoleForm.reset();
    setActiveTab("all-roles");
  };

  const handleUpdateRole = (data: RoleFormValues) => {
    if (selectedRole) {
      updateRole(selectedRole.id, {
        name: data.name,
        description: data.description,
        permissions: data.permissions,
        updatedAt: new Date().toISOString(),
      });

      // Go back to roles list
      setActiveTab("all-roles");
    }
  };

  const handleEditRoleClick = (role: Role) => {
    setSelectedRole(role);
    editRoleForm.reset({
      name: role.name,
      description: role.description,
      permissions: role.permissions,
    });
    setActiveTab("edit-role");
  };

  // Toggle permission in form
  const togglePermission = (
    permission: Permission,
    formMethod: typeof addRoleForm | typeof editRoleForm
  ) => {
    const currentPermissions = formMethod.getValues("permissions");

    if (currentPermissions.includes(permission)) {
      formMethod.setValue(
        "permissions",
        currentPermissions.filter(p => p !== permission)
      );
    } else {
      formMethod.setValue(
        "permissions",
        [...currentPermissions, permission]
      );
    }
  };

  // Toggle all permissions in a category
  const toggleCategoryPermissions = (
    category: PermissionCategory,
    formMethod: typeof addRoleForm | typeof editRoleForm
  ) => {
    const currentPermissions = formMethod.getValues("permissions");
    const categoryPermissions = permissionsByCategory[category] || [];

    // Check if all permissions in this category are already selected
    const allSelected = categoryPermissions.every(p =>
      currentPermissions.includes(p)
    );

    if (allSelected) {
      // Remove all permissions in this category
      formMethod.setValue(
        "permissions",
        currentPermissions.filter(p => !categoryPermissions.includes(p))
      );
    } else {
      // Add all permissions in this category
      const newPermissions = [...currentPermissions];

      categoryPermissions.forEach(p => {
        if (!newPermissions.includes(p)) {
          newPermissions.push(p);
        }
      });

      formMethod.setValue("permissions", newPermissions);
    }
  };

  // Render permission checkboxes grouped by category
  const renderPermissionCheckboxes = (formMethod: typeof addRoleForm | typeof editRoleForm) => {
    return Object.entries(permissionsByCategory).map(([category, categoryPermissions], index, array) => {
      const isLastCategory = index === array.length - 1;
      const allSelected = categoryPermissions.every(p =>
        formMethod.getValues("permissions").includes(p)
      );
      const someSelected = categoryPermissions.some(p =>
        formMethod.getValues("permissions").includes(p)
      );
      const selectedCount = categoryPermissions.filter(p =>
        formMethod.getValues("permissions").includes(p)
      ).length;

      return (
        <div key={category} className={`py-4 ${!isLastCategory ? 'border-b' : ''}`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <Checkbox
                id={`category-${category}`}
                checked={allSelected}
                className={someSelected && !allSelected ? "bg-primary/50 text-primary-foreground" : ""}
                onCheckedChange={() => toggleCategoryPermissions(
                  category as PermissionCategory,
                  formMethod
                )}
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
              const isSelected = formMethod.getValues("permissions").includes(permission);
              const permissionName = permission.split('_').map(word =>
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(' ');

              return (
                <div key={permission} className="flex items-start space-x-3 p-2 rounded-md hover:bg-muted/50 transition-colors">
                  <Checkbox
                    id={`permission-${permission}`}
                    checked={isSelected}
                    onCheckedChange={() => togglePermission(permission, formMethod)}
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
                      {permission.split('_')[0]} {permission.split('_').slice(1).join(' ')}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="bg-background p-6 h-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Role Management</h1>
          <p className="text-muted-foreground">
            Manage roles and permissions
          </p>
        </div>
        <Button onClick={() => setActiveTab("add-role")}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Role
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all-roles">All Roles</TabsTrigger>
          <TabsTrigger value="add-role">Add Role</TabsTrigger>
          {selectedRole && <TabsTrigger value="edit-role">Edit Role</TabsTrigger>}
        </TabsList>

        {/* All Roles Tab */}
        <TabsContent value="all-roles">
          <Card>
            <CardHeader>
              <CardTitle>Roles</CardTitle>
              <CardDescription>Manage roles and their permissions</CardDescription>
              <div className="relative flex-grow mt-2">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search roles..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px]">
                <div className="space-y-4">
                  {filteredRoles.map((role) => {
                    // Calculate permission coverage percentage
                    const totalPermissions = Object.values(Permission).length;
                    const coveragePercentage = Math.round((role.permissions.length / totalPermissions) * 100);

                    return (
                      <Card key={role.id} className="overflow-hidden hover:shadow-md transition-all">
                        <div className="flex flex-col md:flex-row">
                          {/* Role info section */}
                          <div className="flex-1 p-5">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="p-2 rounded-full bg-muted">
                                <Shield className="h-5 w-5" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold text-lg">{role.name}</h3>
                                  {role.isSystem && (
                                    <Badge variant="secondary" className="font-normal">System</Badge>
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
                          <div className="flex md:flex-col justify-end items-center p-4 md:p-5 bg-muted/30 md:border-l">
                            <div className="flex md:flex-col gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="gap-1"
                                onClick={() => handleEditRoleClick(role)}
                                disabled={role.isSystem}
                              >
                                <Edit className="h-4 w-4" />
                                Edit
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="gap-1 text-destructive hover:text-destructive-foreground hover:bg-destructive"
                                onClick={() => handleDeleteRole(role)}
                                disabled={role.isSystem}
                              >
                                <Trash2 className="h-4 w-4" />
                                Delete
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Add Role Tab */}
        <TabsContent value="add-role">
          <Card>
            <CardHeader>
              <CardTitle>Add New Role</CardTitle>
              <CardDescription>
                Create a new role and assign permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={addRoleForm.handleSubmit(handleCreateRole)} className="space-y-6">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="add-name">Role Name</Label>
                    <Input
                      id="add-name"
                      placeholder="Admin"
                      {...addRoleForm.register("name", { required: true })}
                    />
                    {addRoleForm.formState.errors.name && (
                      <p className="text-sm text-destructive">Name is required</p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="add-description">Description</Label>
                    <Textarea
                      id="add-description"
                      placeholder="Role description"
                      {...addRoleForm.register("description", { required: true })}
                    />
                    {addRoleForm.formState.errors.description && (
                      <p className="text-sm text-destructive">Description is required</p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-base">Permissions</Label>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addRoleForm.setValue("permissions", [])}
                        >
                          Clear All
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addRoleForm.setValue("permissions", Object.values(Permission))}
                        >
                          Select All
                        </Button>
                      </div>
                    </div>
                    <Card className="border rounded-md">
                      <CardContent className="p-4">
                        <ScrollArea className="h-[400px] pr-4">
                          {renderPermissionCheckboxes(addRoleForm)}
                        </ScrollArea>
                      </CardContent>
                      <CardFooter className="flex justify-between border-t p-4 bg-muted/20">
                        <div className="text-sm text-muted-foreground">
                          {addRoleForm.watch("permissions").length} of {Object.values(Permission).length} permissions selected
                        </div>
                        <Progress
                          value={(addRoleForm.watch("permissions").length / Object.values(Permission).length) * 100}
                          className="w-32 h-2"
                        />
                      </CardFooter>
                    </Card>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setActiveTab("all-roles")}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Add Role</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Edit Role Tab */}
        {selectedRole && (
          <TabsContent value="edit-role">
            <Card>
              <CardHeader>
                <CardTitle>Edit Role</CardTitle>
                <CardDescription>
                  Update role information and permissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={editRoleForm.handleSubmit(handleUpdateRole)} className="space-y-6">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="edit-name">Role Name</Label>
                      <Input
                        id="edit-name"
                        placeholder="Admin"
                        {...editRoleForm.register("name", { required: true })}
                        disabled={selectedRole.isSystem}
                      />
                      {editRoleForm.formState.errors.name && (
                        <p className="text-sm text-destructive">Name is required</p>
                      )}
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="edit-description">Description</Label>
                      <Textarea
                        id="edit-description"
                        placeholder="Role description"
                        {...editRoleForm.register("description", { required: true })}
                        disabled={selectedRole.isSystem}
                      />
                      {editRoleForm.formState.errors.description && (
                        <p className="text-sm text-destructive">Description is required</p>
                      )}
                    </div>

                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-base">Permissions</Label>
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => editRoleForm.setValue("permissions", [])}
                            disabled={selectedRole?.isSystem}
                          >
                            Clear All
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => editRoleForm.setValue("permissions", Object.values(Permission))}
                            disabled={selectedRole?.isSystem}
                          >
                            Select All
                          </Button>
                        </div>
                      </div>
                      <Card className="border rounded-md">
                        <CardContent className="p-4">
                          <ScrollArea className="h-[400px] pr-4">
                            {renderPermissionCheckboxes(editRoleForm)}
                          </ScrollArea>
                        </CardContent>
                        <CardFooter className="flex justify-between border-t p-4 bg-muted/20">
                          <div className="text-sm text-muted-foreground">
                            {editRoleForm.watch("permissions").length} of {Object.values(Permission).length} permissions selected
                          </div>
                          <Progress
                            value={(editRoleForm.watch("permissions").length / Object.values(Permission).length) * 100}
                            className="w-32 h-2"
                          />
                        </CardFooter>
                      </Card>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setActiveTab("all-roles")}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={selectedRole.isSystem}
                    >
                      Update Role
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>

      {/* Delete Role Dialog */}
      {isDeleteDialogOpen && selectedRole && (
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete the role{" "}
                <span className="font-medium">{selectedRole.name}</span>.
                Users with this role will lose their permissions.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={deleteRole}
                className="bg-destructive text-destructive-foreground"
              >
                Delete Role
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

export default RoleManagement;
