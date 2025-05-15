import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  ChevronRight,
  LayoutDashboard,
  MessageSquare,
  Settings,
  User,
  Users,
  Code,
  Brain,
} from "lucide-react";

const Home = () => {
  // Mock data for dashboard statistics
  const stats = [
    {
      title: "Total Widgets",
      value: "12",
      change: "+2",
      changeType: "positive",
    },
    {
      title: "Active Users",
      value: "1,234",
      change: "+5.2%",
      changeType: "positive",
    },
    {
      title: "Messages Processed",
      value: "45.2k",
      change: "+12.3%",
      changeType: "positive",
    },
    {
      title: "Avg. Response Time",
      value: "1.2s",
      change: "-0.3s",
      changeType: "positive",
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
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col fixed inset-y-0 z-50 bg-card border-r">
        <div className="flex h-14 items-center border-b px-4">
          <h2 className="text-lg font-semibold">AI Chat Admin</h2>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-2 text-sm font-medium">
            <Link
              to="/"
              className="flex items-center gap-3 rounded-lg bg-accent px-3 py-2 text-accent-foreground"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              to="/widgets"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent/50"
            >
              <MessageSquare className="h-4 w-4" />
              Widgets
            </Link>
            <Link
              to="/ai-models"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent/50"
            >
              <Brain className="h-4 w-4" />
              AI Models
            </Link>
            <Link
              to="/analytics"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent/50"
            >
              <BarChart3 className="h-4 w-4" />
              Analytics
            </Link>
            <Link
              to="/integration"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent/50"
            >
              <Code className="h-4 w-4" />
              Integration
            </Link>
            <Link
              to="/users"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent/50"
            >
              <Users className="h-4 w-4" />
              Users
            </Link>
            <Link
              to="/settings"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent/50"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 md:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-40 border-b bg-background">
          <div className="flex h-14 items-center justify-between px-4">
            <div className="hidden md:block">
              <h1 className="text-xl font-semibold">Dashboard</h1>
            </div>
            <div className="md:hidden">
              <h2 className="text-lg font-semibold">AI Chat Admin</h2>
            </div>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
                        alt="Admin"
                      />
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          {/* Dashboard overview */}
          <div className="grid gap-6">
            {/* Stats cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      {stat.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p
                      className={`text-xs ${stat.changeType === "positive" ? "text-green-500" : "text-red-500"}`}
                    >
                      {stat.change} from last month
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Tabs for different views */}
            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="widgets">Widgets</TabsTrigger>
                <TabsTrigger value="models">AI Models</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                {/* Recent widgets */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Widgets</CardTitle>
                    <CardDescription>
                      Recently created or updated chat widgets
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentWidgets.map((widget) => (
                        <div
                          key={widget.id}
                          className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                        >
                          <div>
                            <div className="font-medium">{widget.name}</div>
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
                            <Button variant="ghost" size="sm">
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View All Widgets
                    </Button>
                  </CardFooter>
                </Card>

                {/* Quick actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>
                      Common tasks and shortcuts
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <Button className="flex flex-col items-center justify-center h-24 space-y-2">
                        <MessageSquare className="h-6 w-6" />
                        <span>Create Widget</span>
                      </Button>
                      <Button
                        className="flex flex-col items-center justify-center h-24 space-y-2"
                        variant="outline"
                      >
                        <Brain className="h-6 w-6" />
                        <span>Configure AI</span>
                      </Button>
                      <Button
                        className="flex flex-col items-center justify-center h-24 space-y-2"
                        variant="outline"
                      >
                        <Code className="h-6 w-6" />
                        <span>Get Code</span>
                      </Button>
                      <Button
                        className="flex flex-col items-center justify-center h-24 space-y-2"
                        variant="outline"
                      >
                        <BarChart3 className="h-6 w-6" />
                        <span>View Analytics</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="widgets">
                <Card>
                  <CardHeader>
                    <CardTitle>All Widgets</CardTitle>
                    <CardDescription>Manage your chat widgets</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Widget management content will appear here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="models">
                <Card>
                  <CardHeader>
                    <CardTitle>AI Models</CardTitle>
                    <CardDescription>Configure your AI models</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>AI model configuration content will appear here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
