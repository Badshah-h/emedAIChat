import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  ChevronRight,
  MessageSquare,
  Brain,
  Code,
  ArrowRight,
  TrendingUp,
  Users as UsersIcon,
  Activity,
} from "lucide-react";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";

const Home = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Mock data for dashboard statistics
  const stats = [
    {
      title: "Total Widgets",
      value: "12",
      change: "+2",
      changeType: "positive",
      icon: MessageSquare,
    },
    {
      title: "Active Users",
      value: "1,234",
      change: "+5.2%",
      changeType: "positive",
      icon: UsersIcon,
    },
    {
      title: "Messages Processed",
      value: "45.2k",
      change: "+12.3%",
      changeType: "positive",
      icon: Activity,
    },
    {
      title: "Avg. Response Time",
      value: "1.2s",
      change: "-0.3s",
      changeType: "positive",
      icon: TrendingUp,
    },
  ];

  // Mock data for recent widgets
  const recentWidgets = [
    {
      id: 1,
      name: "Customer Support",
      model: "GPT-4",
      status: "active",
      lastUpdated: "2 hours ago",
    },
    {
      id: 2,
      name: "Product Assistant",
      model: "Claude 3",
      status: "active",
      lastUpdated: "1 day ago",
    },
    {
      id: 3,
      name: "Sales Helper",
      model: "Custom GPT",
      status: "inactive",
      lastUpdated: "3 days ago",
    },
  ];

  return (
    <ThemeProvider>
      <div className="flex h-screen bg-background overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />

        {/* Main content */}
        <div
          className={`flex flex-col flex-1 ${sidebarCollapsed ? "main-content sidebar-collapsed" : "main-content"}`}
        >
          {/* Header */}
          <Header
            title="Dashboard"
            onMenuClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          />

          {/* Main content area */}
          <main className="flex-1 overflow-auto p-4 md:p-6">
            {/* Dashboard overview */}
            <div className="grid gap-6">
              {/* Stats cards */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Card className="card-hover shadow-card overflow-hidden">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                          <CardTitle className="text-sm font-medium">
                            {stat.title}
                          </CardTitle>
                          <div className="rounded-full p-2 bg-primary/10">
                            <Icon className="h-4 w-4 text-primary" />
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{stat.value}</div>
                          <p
                            className={`text-xs flex items-center gap-1 ${stat.changeType === "positive" ? "text-green-500" : "text-red-500"}`}
                          >
                            {stat.change} from last month
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>

              {/* Tabs for different views */}
              <Tabs defaultValue="overview" className="mt-6">
                <TabsList className="w-full md:w-auto">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="widgets">Widgets</TabsTrigger>
                  <TabsTrigger value="models">AI Models</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-6 mt-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Recent widgets */}
                    <motion.div
                      className="md:col-span-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      <Card className="shadow-card h-full">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div>
                              <CardTitle>Recent Widgets</CardTitle>
                              <CardDescription>
                                Recently created or updated chat widgets
                              </CardDescription>
                            </div>
                            <Button variant="ghost" size="sm" className="gap-1">
                              View all <ArrowRight className="h-3 w-3" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <AnimatePresence>
                              {recentWidgets.map((widget, idx) => (
                                <motion.div
                                  key={widget.id}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{
                                    duration: 0.2,
                                    delay: idx * 0.1,
                                  }}
                                  className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0 hover:bg-muted/30 p-2 rounded-md -mx-2"
                                >
                                  <div>
                                    <div className="font-medium">
                                      {widget.name}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                      Model: {widget.model}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                      Updated {widget.lastUpdated}
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div
                                      className={`h-2 w-2 rounded-full ${widget.status === "active" ? "bg-green-500" : "bg-gray-300"}`}
                                    />
                                    <span className="text-sm">
                                      {widget.status === "active"
                                        ? "Active"
                                        : "Inactive"}
                                    </span>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="rounded-full h-8 w-8"
                                    >
                                      <ChevronRight className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </motion.div>
                              ))}
                            </AnimatePresence>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>

                    {/* Quick actions */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                    >
                      <Card className="shadow-card h-full">
                        <CardHeader>
                          <CardTitle>Quick Actions</CardTitle>
                          <CardDescription>
                            Common tasks and shortcuts
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 gap-3">
                            <Button className="justify-start h-auto py-4 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-lg">
                              <MessageSquare className="mr-2 h-5 w-5" />
                              <div className="text-left">
                                <div className="font-semibold">
                                  Create Widget
                                </div>
                                <div className="text-xs opacity-90">
                                  Build a new chat widget
                                </div>
                              </div>
                            </Button>
                            <Button
                              variant="outline"
                              className="justify-start h-auto py-4 border-primary/20 hover:border-primary/40"
                            >
                              <Brain className="mr-2 h-5 w-5 text-primary" />
                              <div className="text-left">
                                <div className="font-semibold">
                                  Configure AI
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  Set up AI models
                                </div>
                              </div>
                            </Button>
                            <Button
                              variant="outline"
                              className="justify-start h-auto py-4 border-primary/20 hover:border-primary/40"
                            >
                              <Code className="mr-2 h-5 w-5 text-primary" />
                              <div className="text-left">
                                <div className="font-semibold">Get Code</div>
                                <div className="text-xs text-muted-foreground">
                                  Integration snippets
                                </div>
                              </div>
                            </Button>
                            <Button
                              variant="outline"
                              className="justify-start h-auto py-4 border-primary/20 hover:border-primary/40"
                            >
                              <BarChart3 className="mr-2 h-5 w-5 text-primary" />
                              <div className="text-left">
                                <div className="font-semibold">Analytics</div>
                                <div className="text-xs text-muted-foreground">
                                  View performance data
                                </div>
                              </div>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>

                  {/* Activity Timeline */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.6 }}
                  >
                    <Card className="shadow-card">
                      <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>
                          Latest actions and system events
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="relative pl-6 border-l border-border/50 space-y-6 py-2">
                          {[
                            {
                              time: "10:32 AM",
                              title: "Widget Created",
                              description:
                                "New widget 'Product Support' was created",
                            },
                            {
                              time: "Yesterday",
                              title: "AI Model Updated",
                              description:
                                "GPT-4 model configuration was updated",
                            },
                            {
                              time: "2 days ago",
                              title: "New User",
                              description:
                                "User 'marketing@example.com' was added to the system",
                            },
                          ].map((item, idx) => (
                            <div key={idx} className="relative">
                              <div className="absolute -left-[25px] h-4 w-4 rounded-full bg-primary"></div>
                              <div className="text-xs text-muted-foreground mb-1">
                                {item.time}
                              </div>
                              <div className="font-medium">{item.title}</div>
                              <div className="text-sm text-muted-foreground">
                                {item.description}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>
                <TabsContent value="widgets">
                  <Card className="shadow-card">
                    <CardHeader>
                      <CardTitle>All Widgets</CardTitle>
                      <CardDescription>
                        Manage your chat widgets
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>Widget management content will appear here.</p>
                      <Link to="/widgets">
                        <Button className="mt-4">Go to Widget Manager</Button>
                      </Link>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="models">
                  <Card className="shadow-card">
                    <CardHeader>
                      <CardTitle>AI Models</CardTitle>
                      <CardDescription>
                        Configure your AI models
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>AI model configuration content will appear here.</p>
                      <Link to="/ai-models">
                        <Button className="mt-4">
                          Go to AI Model Configurator
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Home;
