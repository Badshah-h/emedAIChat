import { useState, useEffect } from "react";
import { Search, Edit, Trash2, UserPlus, Mail, Shield, Link } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { RoleBadge, StatusBadge } from "@/components/dashboard/ui/badges";
import { useUsers } from "@/hooks/user";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { User } from "@/types/user";
import { UserPermissionsTab } from "./UserPermissionsTab";
import { Permission } from "@/types/permission";
import { PermissionsGuard } from "@/components/auth/PermissionsGuard";
import { useCurrentUser } from "@/hooks/auth";

import { UserFormValues } from "@/types/user";
import { RoleType } from "@/types/role";

const UserManagement = () => {
  const {
    filteredUsers,
    filteredUsersWithRoles,
    roles,
    searchQuery,
    setSearchQuery,
    roleFilter,
    setRoleFilter,
    statusFilter,
    setStatusFilter,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    selectedUser,
    setSelectedUser,
    createUser,
    deleteUser,
    updateUser,
    updateUserRole,
  } = useUsers();

  // Current user with permissions
  const { user: currentUser } = useCurrentUser();

  // Tab state
  const [activeTab, setActiveTab] = useState("all-users");

  // State for custom role selection
  const [selectedRoleId, setSelectedRoleId] = useState<string | undefined>();

  // State for permissions management
  const [userForPermissions, setUserForPermissions] = useState<User | null>(null);

  // Form for adding a new user
  const addUserForm = useForm<UserFormValues>({
    defaultValues: {
      name: "",
      email: "",
      role: "viewer",
      status: "pending",
      sendInvite: true,
    },
  });

  // Form for editing a user
  const editUserForm = useForm<UserFormValues>({
    defaultValues: {
      name: selectedUser?.name || "",
      email: selectedUser?.email || "",
      role: selectedUser?.role || "viewer",
      roleId: selectedUser?.roleId,
      status: selectedUser?.status || "active",
      sendInvite: false,
    },
  });

  // Reset and update edit form when selected user changes
  useEffect(() => {
    if (selectedUser) {
      editUserForm.reset({
        name: selectedUser.name,
        email: selectedUser.email,
        role: selectedUser.role,
        roleId: selectedUser.roleId,
        status: selectedUser.status,
        sendInvite: false,
      });

      // Set selected role ID for custom roles
      if (selectedUser.role === "custom" && selectedUser.roleId) {
        setSelectedRoleId(selectedUser.roleId);
      } else {
        setSelectedRoleId(undefined);
      }
    }
  }, [selectedUser, editUserForm, setSelectedRoleId]);

  const handleCreateUser = (data: UserFormValues) => {
    // Prepare user data
    const userData: Partial<User> = {
      name: data.name,
      email: data.email,
      role: data.role,
      status: data.status,
    };

    // Add roleId for custom roles
    if (data.role === "custom" && data.roleId) {
      userData.roleId = data.roleId;
    }

    createUser(userData);

    // Reset form and go back to users list
    addUserForm.reset();
    setActiveTab("all-users");
  };

  const handleUpdateUser = (data: UserFormValues) => {
    if (selectedUser) {
      // Prepare user data
      const userData: Partial<User> = {
        name: data.name,
        email: data.email,
        role: data.role,
        status: data.status,
      };

      // Add roleId for custom roles
      if (data.role === "custom" && data.roleId) {
        userData.roleId = data.roleId;
      } else {
        // Clear roleId if not a custom role
        userData.roleId = undefined;
      }

      updateUser(selectedUser.id, userData);

      // Go back to users list
      setActiveTab("all-users");
    }
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    editUserForm.reset({
      name: user.name,
      email: user.email,
      role: user.role,
      roleId: user.roleId,
      status: user.status,
      sendInvite: false,
    });

    // Set selected role ID for custom roles
    if (user.role === "custom" && user.roleId) {
      setSelectedRoleId(user.roleId);
    } else {
      setSelectedRoleId(undefined);
    }

    setActiveTab("edit-user");
  };

  return (
    <div className="bg-background p-6 h-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground">
            Manage users and their permissions
          </p>
        </div>
        <Button onClick={() => setActiveTab("add-user")}>
          <UserPlus className="mr-2 h-4 w-4" /> Add User
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all-users">All Users</TabsTrigger>
          <TabsTrigger value="add-user">Add User</TabsTrigger>
          {selectedUser && <TabsTrigger value="edit-user">Edit User</TabsTrigger>}
          {userForPermissions && <TabsTrigger value="user-permissions">User Permissions</TabsTrigger>}
        </TabsList>

        {/* All Users Tab */}
        <TabsContent value="all-users">
          <Card>
            <CardHeader>
              <CardTitle>Users</CardTitle>
              <CardDescription>Manage your team members and their access</CardDescription>
              <div className="flex flex-col sm:flex-row gap-2 mt-2">
                <div className="relative flex-grow">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="editor">Editor</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px]">
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="p-3 text-left font-medium">User</th>
                        <th className="p-3 text-left font-medium">Role</th>
                        <th className="p-3 text-left font-medium">Status</th>
                        <th className="p-3 text-left font-medium">Last Active</th>
                        <th className="p-3 text-right font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="border-b">
                          <td className="p-3">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={user.avatarUrl} />
                                <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{user.name}</div>
                                <div className="text-sm text-muted-foreground">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-3"><RoleBadge role={user.role} /></td>
                          <td className="p-3"><StatusBadge status={user.status} /></td>
                          <td className="p-3">{user.lastActive}</td>
                          <td className="p-3 text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon">
                                <Mail className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  setUserForPermissions(user);
                                  setActiveTab("user-permissions");
                                }}
                              >
                                <Shield className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEditUser(user)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  setSelectedUser(user);
                                  setIsDeleteDialogOpen(true);
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Add User Tab */}
        <TabsContent value="add-user">
          <Card>
            <CardHeader>
              <CardTitle>Add New User</CardTitle>
              <CardDescription>
                Add a new user to your team and set their permissions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={addUserForm.handleSubmit(handleCreateUser)} className="space-y-6">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="add-name">Full Name</Label>
                    <Input
                      id="add-name"
                      placeholder="John Doe"
                      {...addUserForm.register("name", { required: true })}
                    />
                    {addUserForm.formState.errors.name && (
                      <p className="text-sm text-destructive">Name is required</p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="add-email">Email</Label>
                    <Input
                      id="add-email"
                      type="email"
                      placeholder="john.doe@example.com"
                      {...addUserForm.register("email", {
                        required: true,
                        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                      })}
                    />
                    {addUserForm.formState.errors.email?.type === "required" && (
                      <p className="text-sm text-destructive">Email is required</p>
                    )}
                    {addUserForm.formState.errors.email?.type === "pattern" && (
                      <p className="text-sm text-destructive">Invalid email address</p>
                    )}
                  </div>

                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="add-role">Role</Label>
                      <Select
                        defaultValue={addUserForm.getValues("role")}
                        onValueChange={(value) => {
                          const roleType = value as RoleType;
                          addUserForm.setValue("role", roleType);

                          // Clear roleId if not custom
                          if (roleType !== "custom") {
                            addUserForm.setValue("roleId", undefined);
                            setSelectedRoleId(undefined);
                          }
                        }}
                      >
                        <SelectTrigger id="add-role">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="editor">Editor</SelectItem>
                          <SelectItem value="viewer">Viewer</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Custom role selection */}
                    {addUserForm.watch("role") === "custom" && (
                      <div className="grid gap-2">
                        <Label htmlFor="add-custom-role">Custom Role</Label>
                        <Select
                          value={addUserForm.watch("roleId")}
                          onValueChange={(value) => {
                            addUserForm.setValue("roleId", value);
                            setSelectedRoleId(value);
                          }}
                        >
                          <SelectTrigger id="add-custom-role">
                            <SelectValue placeholder="Select custom role" />
                          </SelectTrigger>
                          <SelectContent>
                            {roles.filter(role => !role.isSystem).map(role => (
                              <SelectItem key={role.id} value={role.id}>
                                {role.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="add-status">Status</Label>
                    <Select
                      defaultValue={addUserForm.getValues("status")}
                      onValueChange={(value) => addUserForm.setValue("status", value as "active" | "inactive" | "pending")}
                    >
                      <SelectTrigger id="add-status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center gap-2">
                    <Switch
                      id="add-send-invite"
                      checked={addUserForm.watch("sendInvite")}
                      onCheckedChange={(checked) => addUserForm.setValue("sendInvite", checked)}
                    />
                    <Label htmlFor="add-send-invite">Send invitation email</Label>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setActiveTab("all-users")}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Add User</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Edit User Tab */}
        {selectedUser && (
          <TabsContent value="edit-user">
            <Card>
              <CardHeader>
                <CardTitle>Edit User</CardTitle>
                <CardDescription>
                  Update user information and permissions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={editUserForm.handleSubmit(handleUpdateUser)} className="space-y-6">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="edit-name">Full Name</Label>
                      <Input
                        id="edit-name"
                        placeholder="John Doe"
                        {...editUserForm.register("name", { required: true })}
                      />
                      {editUserForm.formState.errors.name && (
                        <p className="text-sm text-destructive">Name is required</p>
                      )}
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="edit-email">Email</Label>
                      <Input
                        id="edit-email"
                        type="email"
                        placeholder="john.doe@example.com"
                        {...editUserForm.register("email", {
                          required: true,
                          pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                        })}
                      />
                      {editUserForm.formState.errors.email?.type === "required" && (
                        <p className="text-sm text-destructive">Email is required</p>
                      )}
                      {editUserForm.formState.errors.email?.type === "pattern" && (
                        <p className="text-sm text-destructive">Invalid email address</p>
                      )}
                    </div>

                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="edit-role">Role</Label>
                        <Select
                          defaultValue={editUserForm.getValues("role")}
                          onValueChange={(value) => {
                            const roleType = value as RoleType;
                            editUserForm.setValue("role", roleType);

                            // Clear roleId if not custom
                            if (roleType !== "custom") {
                              editUserForm.setValue("roleId", undefined);
                              setSelectedRoleId(undefined);
                            }
                          }}
                        >
                          <SelectTrigger id="edit-role">
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="editor">Editor</SelectItem>
                            <SelectItem value="viewer">Viewer</SelectItem>
                            <SelectItem value="custom">Custom</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Custom role selection */}
                      {editUserForm.watch("role") === "custom" && (
                        <div className="grid gap-2">
                          <Label htmlFor="edit-custom-role">Custom Role</Label>
                          <Select
                            value={editUserForm.watch("roleId")}
                            onValueChange={(value) => {
                              editUserForm.setValue("roleId", value);
                              setSelectedRoleId(value);
                            }}
                          >
                            <SelectTrigger id="edit-custom-role">
                              <SelectValue placeholder="Select custom role" />
                            </SelectTrigger>
                            <SelectContent>
                              {roles.filter(role => !role.isSystem).map(role => (
                                <SelectItem key={role.id} value={role.id}>
                                  {role.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="edit-status">Status</Label>
                      <Select
                        defaultValue={editUserForm.getValues("status")}
                        onValueChange={(value) => editUserForm.setValue("status", value as "active" | "inactive" | "pending")}
                      >
                        <SelectTrigger id="edit-status">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setActiveTab("all-users")}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">Update User</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {/* User Permissions Tab */}
        {userForPermissions && (
          <TabsContent value="user-permissions">
            <UserPermissionsTab
              user={userForPermissions}
              onClose={() => {
                setUserForPermissions(null);
                setActiveTab("all-users");
              }}
            />
          </TabsContent>
        )}
      </Tabs>

      {/* Delete User Dialog */}
      {isDeleteDialogOpen && (
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete the user{" "}
                <span className="font-medium">{selectedUser?.name}</span> and remove
                their access to the platform.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={deleteUser}
                className="bg-destructive text-destructive-foreground"
              >
                Delete User
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

// Wrap the component with DashboardLayout
const UserManagementWithLayout = () => (
  <DashboardLayout title="User Management">
    <UserManagement />
  </DashboardLayout>
);

export default UserManagementWithLayout;
