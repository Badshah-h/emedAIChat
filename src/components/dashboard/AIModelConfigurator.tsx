import { useState } from "react";
import {
  PlusCircle,
  Search,
  TestTube,
  Save,
  Trash2,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DashboardPage } from "@/components/dashboard/base/DashboardPage";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Slider } from "@/components/ui/slider";

interface AIModel {
  id: string;
  name: string;
  provider: string;
  type: string;
  description: string;
  isActive: boolean;
}

interface ModelConfig {
  id: string;
  name: string;
  modelId: string;
  temperature: number;
  maxTokens: number;
  systemPrompt: string;
  contextAwareness: boolean;
  contextDepth: number;
  customInstructions: string;
}

const AIModelConfigurator = () => {
  const [models, setModels] = useState<AIModel[]>([
    {
      id: "1",
      name: "GPT-4",
      provider: "OpenAI",
      type: "Large Language Model",
      description: "Advanced language model with strong reasoning capabilities",
      isActive: true,
    },
    {
      id: "2",
      name: "Claude 3 Opus",
      provider: "Anthropic",
      type: "Large Language Model",
      description: "Balanced model for general purpose tasks",
      isActive: true,
    },
    {
      id: "3",
      name: "Llama 3",
      provider: "Meta",
      type: "Large Language Model",
      description: "Open source model with good performance",
      isActive: false,
    },
    {
      id: "4",
      name: "Gemini Pro",
      provider: "Google",
      type: "Large Language Model",
      description: "Google's multimodal model with strong capabilities",
      isActive: true,
    },
  ]);

  const [configs, setConfigs] = useState<ModelConfig[]>([
    {
      id: "1",
      name: "Customer Support Agent",
      modelId: "1",
      temperature: 0.7,
      maxTokens: 2048,
      systemPrompt:
        "You are a helpful customer support agent for our company. Answer questions politely and concisely.",
      contextAwareness: true,
      contextDepth: 5,
      customInstructions: "Always ask if the customer needs additional help.",
    },
    {
      id: "2",
      name: "Technical Documentation Assistant",
      modelId: "2",
      temperature: 0.3,
      maxTokens: 4096,
      systemPrompt:
        "You are a technical documentation assistant. Provide detailed and accurate information about our products.",
      contextAwareness: true,
      contextDepth: 10,
      customInstructions: "Include code examples when appropriate.",
    },
  ]);

  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedConfig, setSelectedConfig] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [testPrompt, setTestPrompt] = useState<string>("");
  const [testResponse, setTestResponse] = useState<string>("");
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const [showTestDialog, setShowTestDialog] = useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState<string>("models");

  // Form state for new/edit model configuration
  const [formConfig, setFormConfig] = useState<Partial<ModelConfig>>({
    name: "",
    modelId: "",
    temperature: 0.7,
    maxTokens: 2048,
    systemPrompt: "",
    contextAwareness: true,
    contextDepth: 5,
    customInstructions: "",
  });

  const filteredModels = models.filter(
    (model) =>
      model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      model.provider.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const filteredConfigs = configs.filter((config) =>
    config.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleSelectModel = (modelId: string) => {
    setSelectedModel(modelId);
    setFormConfig((prev) => ({ ...prev, modelId }));
  };

  const handleSelectConfig = (configId: string) => {
    setSelectedConfig(configId);
    const config = configs.find((c) => c.id === configId);
    if (config) {
      setFormConfig(config);
    }
  };

  const handleCreateNewConfig = () => {
    setSelectedConfig("");
    setFormConfig({
      name: "",
      modelId: selectedModel || "",
      temperature: 0.7,
      maxTokens: 2048,
      systemPrompt: "",
      contextAwareness: true,
      contextDepth: 5,
      customInstructions: "",
    });
  };

  const handleSaveConfig = () => {
    if (!formConfig.name || !formConfig.modelId) {
      alert("Please provide a name and select a model");
      return;
    }

    if (selectedConfig) {
      // Update existing config
      setConfigs(
        configs.map((config) =>
          config.id === selectedConfig
            ? { ...config, ...(formConfig as ModelConfig) }
            : config,
        ),
      );
    } else {
      // Create new config
      const newConfig: ModelConfig = {
        id: Date.now().toString(),
        name: formConfig.name || "",
        modelId: formConfig.modelId || "",
        temperature: formConfig.temperature || 0.7,
        maxTokens: formConfig.maxTokens || 2048,
        systemPrompt: formConfig.systemPrompt || "",
        contextAwareness: formConfig.contextAwareness || false,
        contextDepth: formConfig.contextDepth || 5,
        customInstructions: formConfig.customInstructions || "",
      };
      setConfigs([...configs, newConfig]);
      setSelectedConfig(newConfig.id);
    }
  };

  const handleDeleteConfig = () => {
    if (selectedConfig) {
      setConfigs(configs.filter((config) => config.id !== selectedConfig));
      setSelectedConfig("");
      handleCreateNewConfig();
    }
  };

  const handleTestModel = () => {
    if (!testPrompt) {
      alert("Please enter a test prompt");
      return;
    }

    setIsTesting(true);
    // Simulate API call to test the model
    setTimeout(() => {
      const selectedModelData = models.find((m) => m.id === formConfig.modelId);
      setTestResponse(
        `Response from ${selectedModelData?.name || "AI Model"}:\n\n` +
        `Based on your configuration (Temperature: ${formConfig.temperature}, Context: ${formConfig.contextAwareness ? "Enabled" : "Disabled"}), ` +
        `here is a simulated response to your prompt:\n\n` +
        `This is a simulated response to demonstrate how the AI would respond with your current settings. ` +
        `In a production environment, this would be an actual response from the selected AI model using your configured parameters.`,
      );
      setIsTesting(false);
    }, 1500);
  };

  return (
    <DashboardPage
      title="AI Model Configuration"
      description="Configure and manage AI models for your chat widgets"
      actions={
        <>
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search models or configurations..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button onClick={handleCreateNewConfig}>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Configuration
          </Button>
        </>
      }
    >
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-3">
          <Tabs
            value={currentTab}
            onValueChange={setCurrentTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="models">AI Models</TabsTrigger>
              <TabsTrigger value="configs">Configurations</TabsTrigger>
            </TabsList>

            <TabsContent value="models" className="mt-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Available Models</CardTitle>
                  <CardDescription>Select a model to configure</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[500px] pr-4">
                    <div className="space-y-2 px-4 pb-4">
                      {filteredModels.map((model) => (
                        <div
                          key={model.id}
                          className={`p-3 rounded-md cursor-pointer flex justify-between items-center ${selectedModel === model.id ? "bg-primary/10 border border-primary/30" : "hover:bg-muted"}`}
                          onClick={() => handleSelectModel(model.id)}
                        >
                          <div>
                            <div className="font-medium">{model.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {model.provider}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {model.isActive ? (
                              <Badge
                                variant="outline"
                                className="bg-green-50 text-green-700 border-green-200"
                              >
                                Active
                              </Badge>
                            ) : (
                              <Badge
                                variant="outline"
                                className="bg-gray-50 text-gray-500 border-gray-200"
                              >
                                Inactive
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="configs" className="mt-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Model Configurations</CardTitle>
                  <CardDescription>
                    Your saved model configurations
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[500px] pr-4">
                    <div className="space-y-2 px-4 pb-4">
                      {filteredConfigs.length > 0 ? (
                        filteredConfigs.map((config) => {
                          const modelData = models.find(
                            (m) => m.id === config.modelId,
                          );
                          return (
                            <div
                              key={config.id}
                              className={`p-3 rounded-md cursor-pointer ${selectedConfig === config.id ? "bg-primary/10 border border-primary/30" : "hover:bg-muted"}`}
                              onClick={() => handleSelectConfig(config.id)}
                            >
                              <div className="font-medium">{config.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {modelData?.name || "Unknown model"}
                              </div>
                              <div className="flex gap-2 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  Temp: {config.temperature}
                                </Badge>
                                {config.contextAwareness && (
                                  <Badge variant="outline" className="text-xs">
                                    Context: {config.contextDepth}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="p-4 text-center text-muted-foreground">
                          No configurations found. Create one to get started.
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="col-span-12 lg:col-span-9">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>
                {selectedConfig ? "Edit Configuration" : "New Configuration"}
              </CardTitle>
              <CardDescription>
                {selectedConfig
                  ? "Modify your existing AI model configuration"
                  : "Create a new AI model configuration"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="config-name">Configuration Name</Label>
                      <Input
                        id="config-name"
                        placeholder="E.g., Customer Support Bot"
                        value={formConfig.name || ""}
                        onChange={(e) =>
                          setFormConfig({ ...formConfig, name: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="model-select">AI Model</Label>
                      <Select
                        value={formConfig.modelId}
                        onValueChange={(value) =>
                          setFormConfig({ ...formConfig, modelId: value })
                        }
                      >
                        <SelectTrigger id="model-select">
                          <SelectValue placeholder="Select a model" />
                        </SelectTrigger>
                        <SelectContent>
                          {models.map((model) => (
                            <SelectItem key={model.id} value={model.id}>
                              {model.name} ({model.provider})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="w-0.5 h-2.5"></div>
                    </div>
                    <div>
                      <Label htmlFor="model-select">AI Model</Label>
                      <Select
                        value={formConfig.modelId}
                        onValueChange={(value) =>
                          setFormConfig({
                            ...formConfig,
                            modelId: value,
                          })
                        }
                      >
                        <SelectTrigger id="model-select">
                          <SelectValue placeholder="Select a model" />
                        </SelectTrigger>
                        <SelectContent>
                          {models.map((model) => (
                            <SelectItem key={model.id} value={model.id}>
                              {model.name}({model.provider})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="w-0.5 h-2.5"></div>
                    </div>
                    <div>
                      <Label htmlFor="temperature">
                        Temperature: {formConfig.temperature}
                      </Label>
                      <Slider
                        id="temperature"
                        min={0}
                        max={1}
                        step={0.1}
                        value={[formConfig.temperature || 0.7]}
                        onValueChange={(value) =>
                          setFormConfig({
                            ...formConfig,
                            temperature: value[0],
                          })
                        }
                        className="mt-2"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>More Deterministic</span>
                        <span>More Creative</span>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="max-tokens">Max Tokens</Label>
                      <Input
                        id="max-tokens"
                        type="number"
                        value={formConfig.maxTokens || 2048}
                        onChange={(e) =>
                          setFormConfig({
                            ...formConfig,
                            maxTokens: parseInt(e.target.value),
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="context-awareness"
                        checked={formConfig.contextAwareness}
                        onCheckedChange={(checked) =>
                          setFormConfig({
                            ...formConfig,
                            contextAwareness: checked,
                          })
                        }
                      />
                      <Label htmlFor="context-awareness">
                        Enable Context Awareness
                      </Label>
                    </div>
                    {formConfig.contextAwareness && (
                      <div>
                        <Label htmlFor="context-depth">
                          Context Depth: {formConfig.contextDepth} messages
                        </Label>
                        <Slider
                          id="context-depth"
                          min={1}
                          max={20}
                          step={1}
                          value={[formConfig.contextDepth || 5]}
                          onValueChange={(value) =>
                            setFormConfig({
                              ...formConfig,
                              contextDepth: value[0],
                            })
                          }
                          className="mt-2"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="system-prompt">System Prompt</Label>
                    <Textarea
                      id="system-prompt"
                      placeholder="Instructions for the AI model..."
                      className="min-h-[120px]"
                      value={formConfig.systemPrompt || ""}
                      onChange={(e) =>
                        setFormConfig({
                          ...formConfig,
                          systemPrompt: e.target.value,
                        })
                      }
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      This prompt sets the behavior and personality of the AI
                      model.
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="custom-instructions">
                      Custom Instructions
                    </Label>
                    <Textarea
                      id="custom-instructions"
                      placeholder="Additional instructions or constraints..."
                      className="min-h-[120px]"
                      value={formConfig.customInstructions || ""}
                      onChange={(e) =>
                        setFormConfig({
                          ...formConfig,
                          customInstructions: e.target.value,
                        })
                      }
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Additional instructions that will guide the AI's
                      responses.
                    </p>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <div>
                <h3 className="text-lg font-medium mb-2">Test Configuration</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Test your configuration with a sample prompt to see how the AI
                  responds.
                </p>

                <div className="flex gap-4">
                  <Input
                    placeholder="Enter a test prompt..."
                    value={testPrompt}
                    onChange={(e) => setTestPrompt(e.target.value)}
                    className="flex-1"
                  />
                  <Dialog
                    open={showTestDialog}
                    onOpenChange={setShowTestDialog}
                  >
                    <DialogTrigger asChild>
                      <Button
                        onClick={handleTestModel}
                        disabled={!formConfig.modelId || isTesting}
                      >
                        {isTesting ? (
                          <>Testing...</>
                        ) : (
                          <>
                            <TestTube className="mr-2 h-4 w-4" />
                            Test Response
                          </>
                        )}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>AI Model Test Results</DialogTitle>
                        <DialogDescription>
                          Response from the AI model based on your
                          configuration.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="bg-muted/50 p-4 rounded-md whitespace-pre-wrap max-h-[300px] overflow-y-auto">
                        {testResponse || "No response generated yet."}
                      </div>
                      <DialogFooter>
                        <Button onClick={() => setShowTestDialog(false)}>
                          Close
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              <Button variant="outline" onClick={handleCreateNewConfig}>
                Reset
              </Button>
              <div className="flex gap-2">
                {selectedConfig && (
                  <Button variant="destructive" onClick={handleDeleteConfig}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                )}
                <Button onClick={handleSaveConfig}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Configuration
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </DashboardPage>
  );
};

// Wrap the component with DashboardLayout
const AIModelConfiguratorWithLayout = () => (
  <DashboardLayout title="AI Model Configuration">
    <AIModelConfigurator />
  </DashboardLayout>
);

export default AIModelConfiguratorWithLayout;
