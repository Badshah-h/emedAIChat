import { BarChart3, LineChart, PieChart, TrendingUp } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
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

const Analytics = () => {
  return (
    <div className="bg-background p-6 h-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor and analyze your chat widget performance
          </p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="30days">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="year">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Conversations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">2,543</div>
              <div className="p-2 bg-primary/10 rounded-full text-primary">
                <MessageIcon className="h-4 w-4" />
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500 font-medium">12%</span>
              <span className="ml-1">vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">1.2s</div>
              <div className="p-2 bg-primary/10 rounded-full text-primary">
                <ClockIcon className="h-4 w-4" />
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500 font-medium">5%</span>
              <span className="ml-1">faster than before</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">User Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">94%</div>
              <div className="p-2 bg-primary/10 rounded-full text-primary">
                <SmileIcon className="h-4 w-4" />
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500 font-medium">2%</span>
              <span className="ml-1">improvement</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">1,832</div>
              <div className="p-2 bg-primary/10 rounded-full text-primary">
                <UserIcon className="h-4 w-4" />
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500 font-medium">8%</span>
              <span className="ml-1">increase</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="conversations">Conversations</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="users">User Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Conversations Over Time</CardTitle>
                <CardDescription>Daily conversation volume</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <LineChart className="h-16 w-16 text-muted-foreground" />
                <p className="text-muted-foreground ml-4">Chart visualization will appear here</p>
              </CardContent>
            </Card>
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>User Satisfaction</CardTitle>
                <CardDescription>Based on feedback ratings</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <PieChart className="h-16 w-16 text-muted-foreground" />
                <p className="text-muted-foreground ml-4">Chart visualization will appear here</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="conversations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Conversation Analytics</CardTitle>
              <CardDescription>Detailed conversation metrics</CardDescription>
            </CardHeader>
            <CardContent className="h-96 flex items-center justify-center">
              <BarChart3 className="h-16 w-16 text-muted-foreground" />
              <p className="text-muted-foreground ml-4">Conversation analytics will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Performance</CardTitle>
              <CardDescription>Response times and system metrics</CardDescription>
            </CardHeader>
            <CardContent className="h-96 flex items-center justify-center">
              <LineChart className="h-16 w-16 text-muted-foreground" />
              <p className="text-muted-foreground ml-4">Performance metrics will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Demographics</CardTitle>
              <CardDescription>User statistics and behavior</CardDescription>
            </CardHeader>
            <CardContent className="h-96 flex items-center justify-center">
              <BarChart3 className="h-16 w-16 text-muted-foreground" />
              <p className="text-muted-foreground ml-4">User analytics will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Icons
const MessageIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const ClockIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const SmileIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
    <line x1="9" y1="9" x2="9.01" y2="9" />
    <line x1="15" y1="9" x2="15.01" y2="9" />
  </svg>
);

const UserIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

// Wrap the component with DashboardLayout
const AnalyticsWithLayout = () => (
  <DashboardLayout title="Analytics">
    <Analytics />
  </DashboardLayout>
);

export default AnalyticsWithLayout;
