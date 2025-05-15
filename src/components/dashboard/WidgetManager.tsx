import React, { useState } from "react";
import { Search, Plus, Edit, Trash2, Filter } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

import WidgetPreview from "./WidgetPreview";

interface Widget {
  id: string;
  name: string;
  description: string;
  model: string;
  createdAt: string;
  status: "active" | "inactive" | "draft";
  appearance: {
    theme: string;
    primaryColor: string;
    fontFamily: string;
    borderRadius: number;
    position: string;
  };
  behavior: {
    autoOpen: boolean;
    welcomeMessage: string;
    showBranding: boolean;
    collectUserInfo: boolean;
  };
}

const defaultWidget: Widget = {
  id: "",
  name: "New Widget",
  description: "A new chat widget",
  model: "gpt-4",
  createdAt: new Date().toISOString(),
  status: "draft",
  appearance: {
    theme: "light",
    primaryColor: "#7C3AED",
    fontFamily: "Inter",
    borderRadius: 8,
    position: "bottom-right",
  },
  behavior: {
    autoOpen: false,
    welcomeMessage: "Hello! How can I help you today?",
    showBranding: true,
    collectUserInfo: false,
  },
};

const mockWidgets: Widget[] = [
  {
    id: "1",
    name: "Customer Support",
    description: "Widget for customer support inquiries",
    model: "gpt-4",
    createdAt: "2023-06-15T10:30:00Z",
    status: "active",
    appearance: {
      theme: "light",
      primaryColor: "#7C3AED",
      fontFamily: "Inter",
      borderRadius: 8,
      position: "bottom-right",
    },
    behavior: {
      autoOpen: false,
      welcomeMessage:
        "Hello! How can I help you with your support needs today?",
      showBranding: true,
      collectUserInfo: true,
    },
  },
  {
    id: "2",
    name: "Sales Assistant",
    description: "Widget for sales inquiries and product information",
    model: "gpt-3.5-turbo",
    createdAt: "2023-07-20T14:45:00Z",
    status: "active",
    appearance: {
      theme: "dark",
      primaryColor: "#2563EB",
      fontFamily: "Roboto",
      borderRadius: 12,
      position: "bottom-left",
    },
    behavior: {
      autoOpen: true,
      welcomeMessage: "Hi there! Looking for product information? I can help!",
      showBranding: false,
      collectUserInfo: true,
    },
  },
  {
    id: "3",
    name: "FAQ Bot",
    description: "Widget for frequently asked questions",
    model: "gpt-3.5-turbo",
    createdAt: "2023-08-05T09:15:00Z",
    status: "inactive",
    appearance: {
      theme: "light",
      primaryColor: "#10B981",
      fontFamily: "Poppins",
      borderRadius: 4,
      position: "bottom-right",
    },
    behavior: {
      autoOpen: false,
      welcomeMessage: "Hello! I can answer your frequently asked questions.",
      showBranding: true,
      collectUserInfo: false,
    },
  },
];

const WidgetManager: React.FC = () => {
  const [widgets, setWidgets] = useState<Widget[]>(mockWidgets);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentWidget, setCurrentWidget] = useState<Widget | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const filteredWidgets = widgets.filter((widget) => {
    const matchesSearch =
      widget.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      widget.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || widget.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateWidget = () => {
    const newWidget = { ...defaultWidget, id: `widget-${Date.now()}` };
    setWidgets([...widgets, newWidget]);
    setCurrentWidget(newWidget);
    setIsEditing(true);
    setIsCreateDialogOpen(false);
  };

  const handleEditWidget = (widget: Widget) => {
    setCurrentWidget(widget);
    setIsEditing(true);
  };

  const handleSaveWidget = (updatedWidget: Widget) => {
    setWidgets(
      widgets.map((w) => (w.id === updatedWidget.id ? updatedWidget : w)),
    );
    setIsEditing(false);
  };

  const handleDeleteWidget = (widgetId: string) => {
    setWidgets(widgets.filter((w) => w.id !== widgetId));
    setIsDeleteDialogOpen(false);
    if (currentWidget?.id === widgetId) {
      setCurrentWidget(null);
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    if (!widgets.some((w) => w.id === currentWidget?.id)) {
      setCurrentWidget(null);
    }
  };

  return (
    <div className="bg-background p-6 h-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Widget Manager</h1>
          <p className="text-muted-foreground">
            Create and manage your chat widgets
          </p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Create Widget
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Widget List */}
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Widgets</CardTitle>
              <CardDescription>Manage your chat widgets</CardDescription>
              <div className="flex gap-2 mt-2">
                <div className="relative flex-grow">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search widgets..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[120px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px] pr-4">
                {filteredWidgets.length > 0 ? (
                  <div className="space-y-2">
                    {filteredWidgets.map((widget) => (
                      <motion.div
                        key={widget.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card
                          className={`cursor-pointer hover:bg-accent/50 ${currentWidget?.id === widget.id ? "border-primary" : ""}`}
                          onClick={() => setCurrentWidget(widget)}
                        >
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium">{widget.name}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {widget.description}
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                  <Badge
                                    variant={
                                      widget.status === "active"
                                        ? "default"
                                        : widget.status === "inactive"
                                          ? "secondary"
                                          : "outline"
                                    }
                                  >
                                    {widget.status}
                                  </Badge>
                                  <span className="text-xs text-muted-foreground">
                                    {widget.model}
                                  </span>
                                </div>
                              </div>
                              <div className="flex gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEditWidget(widget);
                                  }}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>
                                        Delete Widget
                                      </AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to delete "
                                        {widget.name}"? This action cannot be
                                        undone.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>
                                        Cancel
                                      </AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() =>
                                          handleDeleteWidget(widget.id)
                                        }
                                        className="bg-destructive text-destructive-foreground"
                                      >
                                        Delete
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[400px] text-center">
                    <p className="text-muted-foreground">No widgets found</p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => setIsCreateDialogOpen(true)}
                    >
                      <Plus className="mr-2 h-4 w-4" /> Create Widget
                    </Button>
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Widget Editor */}
        <div className="lg:col-span-2">
          {currentWidget ? (
            <Card className="h-full">
              <CardHeader>
                <CardTitle>
                  {isEditing ? "Edit Widget" : "Widget Details"}
                </CardTitle>
                <CardDescription>
                  {isEditing
                    ? "Customize your widget settings"
                    : "View widget configuration"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <WidgetEditor
                    widget={currentWidget}
                    onSave={handleSaveWidget}
                    onCancel={handleCancelEdit}
                  />
                ) : (
                  <WidgetDetails
                    widget={currentWidget}
                    onEdit={() => setIsEditing(true)}
                    onDelete={() => setIsDeleteDialogOpen(true)}
                  />
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="flex flex-col items-center justify-center h-full bg-muted/30 rounded-lg border border-dashed p-8">
              <h3 className="text-xl font-medium mb-2">No Widget Selected</h3>
              <p className="text-muted-foreground text-center mb-6">
                Select a widget from the list or create a new one to get started
              </p>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" /> Create Widget
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Create Widget Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Widget</DialogTitle>
            <DialogDescription>
              Create a new chat widget for your website or application.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="widget-name">Widget Name</Label>
              <Input
                id="widget-name"
                placeholder="e.g., Customer Support Bot"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="widget-description">Description</Label>
              <Input
                id="widget-description"
                placeholder="Brief description of the widget's purpose"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="widget-model">AI Model</Label>
              <Select defaultValue="gpt-4">
                <SelectTrigger id="widget-model">
                  <SelectValue placeholder="Select AI model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-4">GPT-4</SelectItem>
                  <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                  <SelectItem value="claude-2">Claude 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleCreateWidget}>Create Widget</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Widget Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Widget</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this widget? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                currentWidget && handleDeleteWidget(currentWidget.id)
              }
              className="bg-destructive text-destructive-foreground"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

interface WidgetEditorProps {
  widget: Widget;
  onSave: (widget: Widget) => void;
  onCancel: () => void;
}

const WidgetEditor: React.FC<WidgetEditorProps> = ({
  widget,
  onSave,
  onCancel,
}) => {
  const [editedWidget, setEditedWidget] = useState<Widget>({ ...widget });

  const handleChange = (field: string, value: any) => {
    setEditedWidget({ ...editedWidget, [field]: value });
  };

  const handleAppearanceChange = (field: string, value: any) => {
    setEditedWidget({
      ...editedWidget,
      appearance: { ...editedWidget.appearance, [field]: value },
    });
  };

  const handleBehaviorChange = (field: string, value: any) => {
    setEditedWidget({
      ...editedWidget,
      behavior: { ...editedWidget.behavior, [field]: value },
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <Tabs defaultValue="general">
          <TabsList className="mb-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="behavior">Behavior</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Widget Name</Label>
              <Input
                id="edit-name"
                value={editedWidget.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Description</Label>
              <Input
                id="edit-description"
                value={editedWidget.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-model">AI Model</Label>
              <Select
                value={editedWidget.model}
                onValueChange={(value) => handleChange("model", value)}
              >
                <SelectTrigger id="edit-model">
                  <SelectValue placeholder="Select AI model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-4">GPT-4</SelectItem>
                  <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                  <SelectItem value="claude-2">Claude 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-status">Status</Label>
              <Select
                value={editedWidget.status}
                onValueChange={(value: "active" | "inactive" | "draft") =>
                  handleChange("status", value)
                }
              >
                <SelectTrigger id="edit-status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-theme">Theme</Label>
              <Select
                value={editedWidget.appearance.theme}
                onValueChange={(value) =>
                  handleAppearanceChange("theme", value)
                }
              >
                <SelectTrigger id="edit-theme">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-color">Primary Color</Label>
              <div className="flex gap-2">
                <Input
                  id="edit-color"
                  type="color"
                  value={editedWidget.appearance.primaryColor}
                  onChange={(e) =>
                    handleAppearanceChange("primaryColor", e.target.value)
                  }
                  className="w-12 h-9 p-1"
                />
                <Input
                  value={editedWidget.appearance.primaryColor}
                  onChange={(e) =>
                    handleAppearanceChange("primaryColor", e.target.value)
                  }
                  className="flex-1"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-font">Font Family</Label>
              <Select
                value={editedWidget.appearance.fontFamily}
                onValueChange={(value) =>
                  handleAppearanceChange("fontFamily", value)
                }
              >
                <SelectTrigger id="edit-font">
                  <SelectValue placeholder="Select font" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Inter">Inter</SelectItem>
                  <SelectItem value="Roboto">Roboto</SelectItem>
                  <SelectItem value="Poppins">Poppins</SelectItem>
                  <SelectItem value="System">System UI</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-radius">Border Radius</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="edit-radius"
                  type="number"
                  value={editedWidget.appearance.borderRadius}
                  onChange={(e) =>
                    handleAppearanceChange(
                      "borderRadius",
                      parseInt(e.target.value),
                    )
                  }
                  className="w-20"
                />
                <span className="text-sm text-muted-foreground">px</span>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-position">Widget Position</Label>
              <Select
                value={editedWidget.appearance.position}
                onValueChange={(value) =>
                  handleAppearanceChange("position", value)
                }
              >
                <SelectTrigger id="edit-position">
                  <SelectValue placeholder="Select position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bottom-right">Bottom Right</SelectItem>
                  <SelectItem value="bottom-left">Bottom Left</SelectItem>
                  <SelectItem value="top-right">Top Right</SelectItem>
                  <SelectItem value="top-left">Top Left</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>

          <TabsContent value="behavior" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auto-open">Auto Open</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically open the chat when page loads
                </p>
              </div>
              <Switch
                id="auto-open"
                checked={editedWidget.behavior.autoOpen}
                onCheckedChange={(checked) =>
                  handleBehaviorChange("autoOpen", checked)
                }
              />
            </div>
            <Separator />
            <div className="grid gap-2">
              <Label htmlFor="welcome-message">Welcome Message</Label>
              <Input
                id="welcome-message"
                value={editedWidget.behavior.welcomeMessage}
                onChange={(e) =>
                  handleBehaviorChange("welcomeMessage", e.target.value)
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="show-branding">Show Branding</Label>
                <p className="text-sm text-muted-foreground">
                  Display "Powered by" branding in the widget
                </p>
              </div>
              <Switch
                id="show-branding"
                checked={editedWidget.behavior.showBranding}
                onCheckedChange={(checked) =>
                  handleBehaviorChange("showBranding", checked)
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="collect-info">Collect User Info</Label>
                <p className="text-sm text-muted-foreground">
                  Ask for user's name and email before starting chat
                </p>
              </div>
              <Switch
                id="collect-info"
                checked={editedWidget.behavior.collectUserInfo}
                onCheckedChange={(checked) =>
                  handleBehaviorChange("collectUserInfo", checked)
                }
              />
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={() => onSave(editedWidget)}>Save Changes</Button>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <h3 className="text-lg font-medium mb-4">Widget Preview</h3>
        <div className="bg-muted/30 rounded-lg p-4 w-full h-[500px] flex items-center justify-center">
          <WidgetPreview widget={editedWidget} />
        </div>
      </div>
    </div>
  );
};

interface WidgetDetailsProps {
  widget: Widget;
  onEdit: () => void;
  onDelete: () => void;
}

const WidgetDetails: React.FC<WidgetDetailsProps> = ({
  widget,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">General Information</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-muted-foreground">Name:</div>
              <div>{widget.name}</div>
              <div className="text-muted-foreground">Description:</div>
              <div>{widget.description}</div>
              <div className="text-muted-foreground">AI Model:</div>
              <div>{widget.model}</div>
              <div className="text-muted-foreground">Status:</div>
              <div>
                <Badge
                  variant={
                    widget.status === "active"
                      ? "default"
                      : widget.status === "inactive"
                        ? "secondary"
                        : "outline"
                  }
                >
                  {widget.status}
                </Badge>
              </div>
              <div className="text-muted-foreground">Created:</div>
              <div>{new Date(widget.createdAt).toLocaleDateString()}</div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-medium mb-2">Appearance</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-muted-foreground">Theme:</div>
              <div className="capitalize">{widget.appearance.theme}</div>
              <div className="text-muted-foreground">Primary Color:</div>
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: widget.appearance.primaryColor }}
                ></div>
                {widget.appearance.primaryColor}
              </div>
              <div className="text-muted-foreground">Font Family:</div>
              <div>{widget.appearance.fontFamily}</div>
              <div className="text-muted-foreground">Border Radius:</div>
              <div>{widget.appearance.borderRadius}px</div>
              <div className="text-muted-foreground">Position:</div>
              <div className="capitalize">
                {widget.appearance.position.replace("-", " ")}
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-medium mb-2">Behavior</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-muted-foreground">Auto Open:</div>
              <div>{widget.behavior.autoOpen ? "Yes" : "No"}</div>
              <div className="text-muted-foreground">Welcome Message:</div>
              <div>"{widget.behavior.welcomeMessage}"</div>
              <div className="text-muted-foreground">Show Branding:</div>
              <div>{widget.behavior.showBranding ? "Yes" : "No"}</div>
              <div className="text-muted-foreground">Collect User Info:</div>
              <div>{widget.behavior.collectUserInfo ? "Yes" : "No"}</div>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-6">
          <Button onClick={onEdit}>Edit Widget</Button>
          <Button
            variant="outline"
            onClick={onDelete}
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4 mr-2" /> Delete Widget
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <h3 className="text-lg font-medium mb-4">Widget Preview</h3>
        <div className="bg-muted/30 rounded-lg p-4 w-full h-[500px] flex items-center justify-center">
          <WidgetPreview widget={widget} />
        </div>
      </div>
    </div>
  );
};

export default WidgetManager;
