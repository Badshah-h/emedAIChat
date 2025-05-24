import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Check,
  Upload,
  X,
  Info,
  Palette,
  Laptop,
  Smartphone,
  Volume2,
  Clock,
  Layout,
  Type,
  MessageSquare,
  Settings,
  Save,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

import WidgetPreview from "./WidgetPreview";

export interface Widget {
  id: string;
  name: string;
  description: string;
  model: string;
  createdAt: string;
  status: "active" | "inactive" | "draft";
  appearance: {
    theme: string;
    primaryColor: string;
    secondaryColor?: string;
    fontFamily: string;
    fontSize?: string;
    fontWeight?: string;
    borderRadius: number;
    position: string;
    width?: number;
    height?: number;
    bubbleStyle?: "rounded" | "square" | "soft";
    logoUrl?: string;
    showBranding?: boolean;
  };
  behavior: {
    autoOpen: boolean;
    autoOpenDelay?: number;
    autoOpenScrollPercent?: number;
    exitIntentEnabled?: boolean;
    welcomeMessage: string;
    showBranding: boolean;
    collectUserInfo: boolean;
    notificationSound?: boolean;
    notificationStyle?: string;
    animationTiming?: number;
    mobilePosition?: string;
    soundEffects?: {
      newMessage?: boolean;
      sendMessage?: boolean;
    };
  };
  content?: {
    botName?: string;
    botAvatar?: string;
    inputPlaceholder?: string;
    offlineMessage?: string;
    preChatFields?: Array<{
      id: string;
      type: string;
      label: string;
      required: boolean;
    }>;
    postChatSurvey?: Array<{
      id: string;
      type: string;
      question: string;
      options?: string[];
    }>;
  };
}

interface WidgetEditorProps {
  widget: Widget;
  onSave: (widget: Widget) => void;
  onCancel: () => void;
}

interface TemplatePreset {
  name: string;
  description: string;
  preview: string;
  settings: Partial<Widget>;
}

const templatePresets: TemplatePreset[] = [
  {
    name: "Modern Clean",
    description: "Clean, minimal design with sharp edges",
    preview: "modern",
    settings: {
      appearance: {
        theme: "light",
        primaryColor: "#7C3AED",
        secondaryColor: "#E9D5FF",
        fontFamily: "Inter",
        fontSize: "medium",
        borderRadius: 8,
        bubbleStyle: "rounded",
      },
    },
  },
  {
    name: "Glass Effect",
    description: "Translucent design with blur effects",
    preview: "glass",
    settings: {
      appearance: {
        theme: "light",
        primaryColor: "#2563EB",
        secondaryColor: "#DBEAFE",
        fontFamily: "Poppins",
        fontSize: "medium",
        borderRadius: 16,
        bubbleStyle: "soft",
      },
    },
  },
  {
    name: "Dark Mode",
    description: "High contrast dark theme",
    preview: "dark",
    settings: {
      appearance: {
        theme: "dark",
        primaryColor: "#10B981",
        secondaryColor: "#064E3B",
        fontFamily: "Roboto",
        fontSize: "medium",
        borderRadius: 8,
        bubbleStyle: "square",
      },
    },
  },
  {
    name: "Soft Rounded",
    description: "Friendly design with rounded corners",
    preview: "soft",
    settings: {
      appearance: {
        theme: "light",
        primaryColor: "#F59E0B",
        secondaryColor: "#FEF3C7",
        fontFamily: "Nunito",
        fontSize: "large",
        borderRadius: 24,
        bubbleStyle: "rounded",
      },
    },
  },
  {
    name: "Minimalist",
    description: "Ultra-minimal design with subtle accents",
    preview: "minimal",
    settings: {
      appearance: {
        theme: "light",
        primaryColor: "#6B7280",
        secondaryColor: "#F3F4F6",
        fontFamily: "System",
        fontSize: "small",
        borderRadius: 4,
        bubbleStyle: "square",
      },
    },
  },
];

const fontOptions = [
  { value: "Inter", label: "Inter" },
  { value: "Roboto", label: "Roboto" },
  { value: "Poppins", label: "Poppins" },
  { value: "Nunito", label: "Nunito" },
  { value: "System", label: "System UI" },
];

const fontSizeOptions = [
  { value: "small", label: "Small" },
  { value: "medium", label: "Medium" },
  { value: "large", label: "Large" },
];

const fontWeightOptions = [
  { value: "normal", label: "Normal" },
  { value: "medium", label: "Medium" },
  { value: "bold", label: "Bold" },
];

const bubbleStyleOptions = [
  { value: "rounded", label: "Rounded" },
  { value: "square", label: "Square" },
  { value: "soft", label: "Soft" },
];

const positionOptions = [
  { value: "bottom-right", label: "Bottom Right" },
  { value: "bottom-left", label: "Bottom Left" },
  { value: "top-right", label: "Top Right" },
  { value: "top-left", label: "Top Left" },
];

const notificationStyleOptions = [
  { value: "subtle", label: "Subtle" },
  { value: "prominent", label: "Prominent" },
  { value: "minimal", label: "Minimal" },
];

const WidgetEditor: React.FC<WidgetEditorProps> = ({
  widget,
  onSave,
  onCancel,
}) => {
  const [editedWidget, setEditedWidget] = useState<Widget>({ ...widget });
  const [activeTab, setActiveTab] = useState("appearance");
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">(
    "desktop",
  );
  const [previewState, setPreviewState] = useState<"closed" | "open">("open");
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  // Track changes to detect unsaved modifications
  useEffect(() => {
    setUnsavedChanges(true);
  }, [editedWidget]);

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

  const handleContentChange = (field: string, value: any) => {
    setEditedWidget({
      ...editedWidget,
      content: { ...editedWidget.content, [field]: value },
    });
  };

  const handleSoundEffectChange = (field: string, value: boolean) => {
    setEditedWidget({
      ...editedWidget,
      behavior: {
        ...editedWidget.behavior,
        soundEffects: {
          ...editedWidget.behavior.soundEffects,
          [field]: value,
        },
      },
    });
  };

  const applyTemplate = (template: TemplatePreset) => {
    const newWidget = { ...editedWidget };

    // Apply template settings
    if (template.settings.appearance) {
      newWidget.appearance = {
        ...newWidget.appearance,
        ...template.settings.appearance,
      };
    }

    if (template.settings.behavior) {
      newWidget.behavior = {
        ...newWidget.behavior,
        ...template.settings.behavior,
      };
    }

    if (template.settings.content) {
      newWidget.content = {
        ...newWidget.content,
        ...template.settings.content,
      };
    }

    setEditedWidget(newWidget);
    setShowTemplateSelector(false);
  };

  const handleSaveClick = () => {
    onSave(editedWidget);
    setUnsavedChanges(false);
  };

  // Ensure content object exists
  if (!editedWidget.content) {
    editedWidget.content = {
      botName: "AI Assistant",
      botAvatar: "",
      inputPlaceholder: "Type your message...",
      offlineMessage:
        "We're currently offline. Please leave a message and we'll get back to you soon.",
      preChatFields: [],
      postChatSurvey: [],
    };
  }

  // Ensure behavior.soundEffects exists
  if (!editedWidget.behavior.soundEffects) {
    editedWidget.behavior.soundEffects = {
      newMessage: false,
      sendMessage: false,
    };
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger
                  value="appearance"
                  className="flex items-center gap-1"
                >
                  <Palette className="h-4 w-4" />
                  <span className="hidden sm:inline">Appearance</span>
                </TabsTrigger>
                <TabsTrigger
                  value="behavior"
                  className="flex items-center gap-1"
                >
                  <Settings className="h-4 w-4" />
                  <span className="hidden sm:inline">Behavior</span>
                </TabsTrigger>
                <TabsTrigger
                  value="content"
                  className="flex items-center gap-1"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span className="hidden sm:inline">Content</span>
                </TabsTrigger>
                <TabsTrigger
                  value="general"
                  className="flex items-center gap-1"
                >
                  <Layout className="h-4 w-4" />
                  <span className="hidden sm:inline">General</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setShowTemplateSelector(!showTemplateSelector)
                    }
                  >
                    Templates
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Apply a pre-designed template</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <ScrollArea className="h-[600px] pr-4">
          {showTemplateSelector && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">Template Presets</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowTemplateSelector(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {templatePresets.map((template) => (
                      <div
                        key={template.name}
                        className="border rounded-lg p-3 cursor-pointer hover:border-primary transition-all"
                        onClick={() => applyTemplate(template)}
                      >
                        <div
                          className="h-20 mb-2 rounded-md bg-muted flex items-center justify-center"
                          style={{
                            backgroundColor:
                              template.settings.appearance?.primaryColor ||
                              "#7C3AED",
                          }}
                        >
                          <span className="text-white text-xs font-medium">
                            {template.preview}
                          </span>
                        </div>
                        <h4 className="text-sm font-medium">{template.name}</h4>
                        <p className="text-xs text-muted-foreground">
                          {template.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          <TabsContent value="general" className="space-y-4 mt-0">
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
                  <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
                  <SelectItem value="llama-3">Llama 3</SelectItem>
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

          <TabsContent value="appearance" className="space-y-4 mt-0">
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
                  <SelectItem value="system">System (Auto)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Colors</Label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-primary-color" className="text-xs">
                    Primary Color
                  </Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      id="edit-primary-color"
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
                <div>
                  <Label htmlFor="edit-secondary-color" className="text-xs">
                    Secondary Color
                  </Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      id="edit-secondary-color"
                      type="color"
                      value={
                        editedWidget.appearance.secondaryColor || "#E9D5FF"
                      }
                      onChange={(e) =>
                        handleAppearanceChange("secondaryColor", e.target.value)
                      }
                      className="w-12 h-9 p-1"
                    />
                    <Input
                      value={
                        editedWidget.appearance.secondaryColor || "#E9D5FF"
                      }
                      onChange={(e) =>
                        handleAppearanceChange("secondaryColor", e.target.value)
                      }
                      className="flex-1"
                    />
                  </div>
                </div>
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
                  {positionOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-font">Typography</Label>
              <div className="grid grid-cols-3 gap-2">
                <Select
                  value={editedWidget.appearance.fontFamily}
                  onValueChange={(value) =>
                    handleAppearanceChange("fontFamily", value)
                  }
                >
                  <SelectTrigger id="edit-font">
                    <SelectValue placeholder="Font" />
                  </SelectTrigger>
                  <SelectContent>
                    {fontOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={editedWidget.appearance.fontSize || "medium"}
                  onValueChange={(value) =>
                    handleAppearanceChange("fontSize", value)
                  }
                >
                  <SelectTrigger id="edit-font-size">
                    <SelectValue placeholder="Size" />
                  </SelectTrigger>
                  <SelectContent>
                    {fontSizeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={editedWidget.appearance.fontWeight || "normal"}
                  onValueChange={(value) =>
                    handleAppearanceChange("fontWeight", value)
                  }
                >
                  <SelectTrigger id="edit-font-weight">
                    <SelectValue placeholder="Weight" />
                  </SelectTrigger>
                  <SelectContent>
                    {fontWeightOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <div className="flex justify-between">
                <Label htmlFor="edit-radius">Border Radius</Label>
                <span className="text-sm text-muted-foreground">
                  {editedWidget.appearance.borderRadius}px
                </span>
              </div>
              <Slider
                id="edit-radius"
                min={0}
                max={24}
                step={1}
                value={[editedWidget.appearance.borderRadius]}
                onValueChange={(value) =>
                  handleAppearanceChange("borderRadius", value[0])
                }
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-bubble-style">Chat Bubble Style</Label>
              <RadioGroup
                value={editedWidget.appearance.bubbleStyle || "rounded"}
                onValueChange={(value) =>
                  handleAppearanceChange("bubbleStyle", value)
                }
                className="grid grid-cols-3 gap-2"
              >
                {bubbleStyleOptions.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-2"
                  >
                    <RadioGroupItem
                      value={option.value}
                      id={`bubble-${option.value}`}
                    />
                    <Label htmlFor={`bubble-${option.value}`}>
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-logo">Custom Logo</Label>
              <div className="flex gap-2">
                <Input
                  id="edit-logo"
                  placeholder="Logo URL"
                  value={editedWidget.appearance.logoUrl || ""}
                  onChange={(e) =>
                    handleAppearanceChange("logoUrl", e.target.value)
                  }
                  className="flex-1"
                />
                <Button variant="outline" size="icon">
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
              {editedWidget.appearance.logoUrl && (
                <div className="mt-2 p-2 border rounded-md flex items-center justify-center bg-muted/30">
                  <img
                    src={editedWidget.appearance.logoUrl}
                    alt="Logo preview"
                    className="max-h-16 max-w-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://via.placeholder.com/150x50?text=Invalid+URL";
                    }}
                  />
                </div>
              )}
            </div>

            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="show-branding">Show Branding</Label>
                  <p className="text-xs text-muted-foreground">
                    Display "Powered by" branding in the widget
                  </p>
                </div>
                <Switch
                  id="show-branding"
                  checked={editedWidget.appearance.showBranding || false}
                  onCheckedChange={(checked) =>
                    handleAppearanceChange("showBranding", checked)
                  }
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Size & Dimensions</Label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-width" className="text-xs">
                    Width (px)
                  </Label>
                  <Input
                    id="edit-width"
                    type="number"
                    value={editedWidget.appearance.width || 350}
                    onChange={(e) =>
                      handleAppearanceChange("width", parseInt(e.target.value))
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-height" className="text-xs">
                    Height (px)
                  </Label>
                  <Input
                    id="edit-height"
                    type="number"
                    value={editedWidget.appearance.height || 500}
                    onChange={(e) =>
                      handleAppearanceChange("height", parseInt(e.target.value))
                    }
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="behavior" className="space-y-4 mt-0">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auto-open">Auto Open</Label>
                <p className="text-xs text-muted-foreground">
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

            {editedWidget.behavior.autoOpen && (
              <div className="pl-6 border-l-2 border-muted space-y-4">
                <div className="grid gap-2">
                  <div className="flex justify-between">
                    <Label htmlFor="auto-open-delay">
                      Time Delay (seconds)
                    </Label>
                    <span className="text-sm text-muted-foreground">
                      {editedWidget.behavior.autoOpenDelay || 5}s
                    </span>
                  </div>
                  <Slider
                    id="auto-open-delay"
                    min={0}
                    max={30}
                    step={1}
                    value={[editedWidget.behavior.autoOpenDelay || 5]}
                    onValueChange={(value) =>
                      handleBehaviorChange("autoOpenDelay", value[0])
                    }
                  />
                </div>

                <div className="grid gap-2">
                  <div className="flex justify-between">
                    <Label htmlFor="auto-open-scroll">Scroll Percentage</Label>
                    <span className="text-sm text-muted-foreground">
                      {editedWidget.behavior.autoOpenScrollPercent || 50}%
                    </span>
                  </div>
                  <Slider
                    id="auto-open-scroll"
                    min={0}
                    max={100}
                    step={5}
                    value={[editedWidget.behavior.autoOpenScrollPercent || 50]}
                    onValueChange={(value) =>
                      handleBehaviorChange("autoOpenScrollPercent", value[0])
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="exit-intent">Exit Intent Trigger</Label>
                    <p className="text-xs text-muted-foreground">
                      Open chat when user moves cursor to leave page
                    </p>
                  </div>
                  <Switch
                    id="exit-intent"
                    checked={editedWidget.behavior.exitIntentEnabled || false}
                    onCheckedChange={(checked) =>
                      handleBehaviorChange("exitIntentEnabled", checked)
                    }
                  />
                </div>
              </div>
            )}

            <Separator />

            <div className="grid gap-2">
              <Label htmlFor="notification-style">Notification Style</Label>
              <Select
                value={editedWidget.behavior.notificationStyle || "subtle"}
                onValueChange={(value) =>
                  handleBehaviorChange("notificationStyle", value)
                }
              >
                <SelectTrigger id="notification-style">
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  {notificationStyleOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="notification-sound">Notification Sound</Label>
                <p className="text-xs text-muted-foreground">
                  Play sound when notifications appear
                </p>
              </div>
              <Switch
                id="notification-sound"
                checked={editedWidget.behavior.notificationSound || false}
                onCheckedChange={(checked) =>
                  handleBehaviorChange("notificationSound", checked)
                }
              />
            </div>

            <Separator />

            <div>
              <Label className="mb-2 block">Sound Effects</Label>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="sound-new-message"
                    className="text-sm font-normal cursor-pointer flex items-center gap-2"
                  >
                    <Volume2 className="h-4 w-4 text-muted-foreground" />
                    New message received
                  </Label>
                  <Switch
                    id="sound-new-message"
                    checked={
                      editedWidget.behavior.soundEffects?.newMessage || false
                    }
                    onCheckedChange={(checked) =>
                      handleSoundEffectChange("newMessage", checked)
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="sound-send-message"
                    className="text-sm font-normal cursor-pointer flex items-center gap-2"
                  >
                    <Volume2 className="h-4 w-4 text-muted-foreground" />
                    Message sent
                  </Label>
                  <Switch
                    id="sound-send-message"
                    checked={
                      editedWidget.behavior.soundEffects?.sendMessage || false
                    }
                    onCheckedChange={(checked) =>
                      handleSoundEffectChange("sendMessage", checked)
                    }
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div className="grid gap-2">
              <div className="flex justify-between">
                <Label htmlFor="animation-timing">Animation Speed</Label>
                <span className="text-sm text-muted-foreground">
                  {editedWidget.behavior.animationTiming || 300}ms
                </span>
              </div>
              <Slider
                id="animation-timing"
                min={100}
                max={1000}
                step={50}
                value={[editedWidget.behavior.animationTiming || 300]}
                onValueChange={(value) =>
                  handleBehaviorChange("animationTiming", value[0])
                }
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="mobile-position">Mobile Position</Label>
              <Select
                value={
                  editedWidget.behavior.mobilePosition ||
                  editedWidget.appearance.position
                }
                onValueChange={(value) =>
                  handleBehaviorChange("mobilePosition", value)
                }
              >
                <SelectTrigger id="mobile-position">
                  <SelectValue placeholder="Select position" />
                </SelectTrigger>
                <SelectContent>
                  {positionOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Override default position on mobile devices
              </p>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="collect-info">Collect User Info</Label>
                <p className="text-xs text-muted-foreground">
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

          <TabsContent value="content" className="space-y-4 mt-0">
            <div className="grid gap-2">
              <Label htmlFor="welcome-message">Welcome Message</Label>
              <Textarea
                id="welcome-message"
                value={editedWidget.behavior.welcomeMessage}
                onChange={(e) =>
                  handleBehaviorChange("welcomeMessage", e.target.value)
                }
                rows={3}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="bot-name">Bot Name</Label>
              <Input
                id="bot-name"
                value={editedWidget.content?.botName || "AI Assistant"}
                onChange={(e) => handleContentChange("botName", e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="bot-avatar">Bot Avatar URL</Label>
              <div className="flex gap-2">
                <Input
                  id="bot-avatar"
                  placeholder="Avatar URL"
                  value={editedWidget.content?.botAvatar || ""}
                  onChange={(e) =>
                    handleContentChange("botAvatar", e.target.value)
                  }
                  className="flex-1"
                />
                <Button variant="outline" size="icon">
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
              {editedWidget.content?.botAvatar && (
                <div className="mt-2 p-2 border rounded-md flex items-center justify-center bg-muted/30">
                  <img
                    src={editedWidget.content.botAvatar}
                    alt="Avatar preview"
                    className="h-12 w-12 rounded-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://api.dicebear.com/7.x/avataaars/svg?seed=widget";
                    }}
                  />
                </div>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="input-placeholder">Input Placeholder</Label>
              <Input
                id="input-placeholder"
                value={
                  editedWidget.content?.inputPlaceholder ||
                  "Type your message..."
                }
                onChange={(e) =>
                  handleContentChange("inputPlaceholder", e.target.value)
                }
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="offline-message">Offline Message</Label>
              <Textarea
                id="offline-message"
                value={
                  editedWidget.content?.offlineMessage ||
                  "We're currently offline. Please leave a message and we'll get back to you soon."
                }
                onChange={(e) =>
                  handleContentChange("offlineMessage", e.target.value)
                }
                rows={3}
              />
            </div>

            <Separator />

            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label>Pre-Chat Form Fields</Label>
                <Button variant="outline" size="sm">
                  <Plus className="h-3 w-3 mr-1" /> Add Field
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Configure fields to collect before starting the chat
              </p>

              {/* This would be expanded with a full form builder UI */}
              <div className="bg-muted/30 rounded-md p-4 text-center text-sm text-muted-foreground">
                <p>Form builder coming soon</p>
                <p className="text-xs">
                  Will allow adding name, email, and custom fields
                </p>
              </div>
            </div>

            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label>Post-Chat Survey</Label>
                <Button variant="outline" size="sm">
                  <Plus className="h-3 w-3 mr-1" /> Add Question
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Configure survey questions to show after chat ends
              </p>

              {/* This would be expanded with a full survey builder UI */}
              <div className="bg-muted/30 rounded-md p-4 text-center text-sm text-muted-foreground">
                <p>Survey builder coming soon</p>
                <p className="text-xs">
                  Will allow adding rating, multiple choice, and text questions
                </p>
              </div>
            </div>
          </TabsContent>
        </ScrollArea>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            onClick={handleSaveClick}
            className="relative overflow-hidden"
            disabled={!unsavedChanges}
          >
            {unsavedChanges && (
              <motion.span
                className="absolute inset-0 bg-primary/10"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              />
            )}
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="flex items-center justify-between w-full mb-4">
          <h3 className="text-lg font-medium">Widget Preview</h3>
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className={previewMode === "desktop" ? "bg-muted" : ""}
                    onClick={() => setPreviewMode("desktop")}
                  >
                    <Laptop className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Desktop Preview</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className={previewMode === "mobile" ? "bg-muted" : ""}
                    onClick={() => setPreviewMode("mobile")}
                  >
                    <Smartphone className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Mobile Preview</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Separator orientation="vertical" className="h-6" />

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setPreviewState(
                        previewState === "open" ? "closed" : "open",
                      )
                    }
                  >
                    {previewState === "open" ? "Show Closed" : "Show Open"}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Toggle widget state</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <div
          className={`bg-muted/30 rounded-lg p-4 w-full flex items-center justify-center ${previewMode === "mobile" ? "max-w-[375px]" : ""}`}
          style={{ height: "600px" }}
        >
          <div
            className={`relative ${previewMode === "mobile" ? "w-full h-full max-w-[375px]" : "w-full h-full"}`}
          >
            <div
              className={`absolute ${editedWidget.appearance.position.includes("bottom") ? "bottom-0" : "top-0"} ${editedWidget.appearance.position.includes("right") ? "right-0" : "left-0"}`}
            >
              <WidgetPreview
                widget={editedWidget}
                previewState={previewState}
                previewMode={previewMode}
              />
            </div>
          </div>
        </div>

        <div className="mt-4 w-full">
          <Card className="bg-muted/30 border-dashed">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Info className="h-4 w-4 text-muted-foreground" />
                <h4 className="text-sm font-medium">Preview Notes</h4>
              </div>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li className="flex items-center gap-1">
                  <Check className="h-3 w-3 text-primary" />
                  Preview shows approximate appearance
                </li>
                <li className="flex items-center gap-1">
                  <Check className="h-3 w-3 text-primary" />
                  Toggle between desktop and mobile views
                </li>
                <li className="flex items-center gap-1">
                  <Check className="h-3 w-3 text-primary" />
                  Some advanced features may not be visible in preview
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WidgetEditor;
