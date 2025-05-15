import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
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
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Check, Save } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Settings = () => {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="bg-background p-6 h-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account and application preferences
          </p>
        </div>
      </div>

      <Tabs defaultValue="account" className="space-y-6">
        <TabsList className="w-full md:w-auto">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-6">
          {saved && (
            <Alert className="bg-green-500/10 text-green-500 border-green-500/20">
              <Check className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>Your account settings have been saved.</AlertDescription>
            </Alert>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your account profile information and email address
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center gap-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">
                    Change Avatar
                  </Button>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" defaultValue="Admin" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" defaultValue="User" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="admin@example.com" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Update your password to keep your account secure
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="outline" className="mr-2">
                Cancel
              </Button>
              <Button>Update Password</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Customize the appearance of the application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Theme</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center gap-2">
                    <div className="border rounded-md p-2 w-full h-24 bg-white">
                      <div className="bg-blue-500 h-4 rounded mb-2"></div>
                      <div className="bg-gray-200 h-3 rounded mb-2 w-3/4"></div>
                      <div className="bg-gray-200 h-3 rounded w-1/2"></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="radio" id="light" name="theme" defaultChecked />
                      <Label htmlFor="light" className="cursor-pointer">Light</Label>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="border rounded-md p-2 w-full h-24 bg-gray-900">
                      <div className="bg-blue-500 h-4 rounded mb-2"></div>
                      <div className="bg-gray-700 h-3 rounded mb-2 w-3/4"></div>
                      <div className="bg-gray-700 h-3 rounded w-1/2"></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="radio" id="dark" name="theme" />
                      <Label htmlFor="dark" className="cursor-pointer">Dark</Label>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="border rounded-md p-2 w-full h-24 bg-gradient-to-b from-white to-gray-900">
                      <div className="bg-blue-500 h-4 rounded mb-2"></div>
                      <div className="bg-gray-400 h-3 rounded mb-2 w-3/4"></div>
                      <div className="bg-gray-500 h-3 rounded w-1/2"></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="radio" id="system" name="theme" />
                      <Label htmlFor="system" className="cursor-pointer">System</Label>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Accent Color</Label>
                <div className="grid grid-cols-6 gap-2">
                  <div className="h-8 w-8 rounded-full bg-blue-500 cursor-pointer ring-2 ring-offset-2 ring-blue-500"></div>
                  <div className="h-8 w-8 rounded-full bg-purple-500 cursor-pointer"></div>
                  <div className="h-8 w-8 rounded-full bg-pink-500 cursor-pointer"></div>
                  <div className="h-8 w-8 rounded-full bg-orange-500 cursor-pointer"></div>
                  <div className="h-8 w-8 rounded-full bg-green-500 cursor-pointer"></div>
                  <div className="h-8 w-8 rounded-full bg-slate-500 cursor-pointer"></div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="animations" className="block">Animations</Label>
                    <p className="text-sm text-muted-foreground">Enable animations throughout the interface</p>
                  </div>
                  <Switch id="animations" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="reduced-motion" className="block">Reduced Motion</Label>
                    <p className="text-sm text-muted-foreground">Respect system reduced motion settings</p>
                  </div>
                  <Switch id="reduced-motion" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSave}>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Manage how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Notifications</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-system" className="block">System Updates</Label>
                      <p className="text-sm text-muted-foreground">Receive emails about system updates and maintenance</p>
                    </div>
                    <Switch id="email-system" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-widgets" className="block">Widget Activity</Label>
                      <p className="text-sm text-muted-foreground">Receive emails about widget performance and usage</p>
                    </div>
                    <Switch id="email-widgets" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-marketing" className="block">Marketing</Label>
                      <p className="text-sm text-muted-foreground">Receive emails about new features and promotions</p>
                    </div>
                    <Switch id="email-marketing" />
                  </div>
                </div>

                <Separator />

                <h3 className="text-lg font-medium">In-App Notifications</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="inapp-activity" className="block">Activity Updates</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications about widget activity</p>
                    </div>
                    <Switch id="inapp-activity" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="inapp-comments" className="block">Comments & Mentions</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications when you're mentioned</p>
                    </div>
                    <Switch id="inapp-comments" defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSave}>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>
                Manage your API keys for integrating with our services
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Important</AlertTitle>
                <AlertDescription>
                  API keys provide full access to your account. Keep them secure and never share them publicly.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <Label>Production API Key</Label>
                  <div className="flex">
                    <Input
                      value="sk_prod_xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                      readOnly
                      type="password"
                      className="rounded-r-none"
                    />
                    <Button variant="secondary" className="rounded-l-none">
                      Show
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Last used: 2 hours ago from 192.168.1.1
                  </p>
                </div>

                <div className="flex flex-col space-y-2">
                  <Label>Development API Key</Label>
                  <div className="flex">
                    <Input
                      value="sk_dev_xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                      readOnly
                      type="password"
                      className="rounded-r-none"
                    />
                    <Button variant="secondary" className="rounded-l-none">
                      Show
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Last used: 1 day ago from 192.168.1.1
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <Button variant="outline">
                  Regenerate API Keys
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
              <CardDescription>
                Manage your subscription and billing details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
                <div>
                  <h3 className="font-medium">Current Plan</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">Pro</span>
                    <Badge className="bg-primary">Active</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Renews on November 15, 2023
                  </p>
                </div>
                <Button variant="outline">Change Plan</Button>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Payment Method</h3>
                <div className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="h-10 w-14 bg-gradient-to-r from-blue-600 to-blue-800 rounded"></div>
                  <div>
                    <div className="font-medium">Visa ending in 4242</div>
                    <div className="text-sm text-muted-foreground">Expires 12/2025</div>
                  </div>
                  <div className="ml-auto">
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Billing Address</h3>
                <div className="p-4 border rounded-lg">
                  <div className="font-medium">John Doe</div>
                  <div className="text-sm text-muted-foreground">
                    123 Main St<br />
                    San Francisco, CA 94103<br />
                    United States
                  </div>
                  <Button variant="ghost" size="sm" className="mt-2">
                    Edit Address
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Billing History</h3>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="text-left p-3 font-medium">Date</th>
                        <th className="text-left p-3 font-medium">Description</th>
                        <th className="text-left p-3 font-medium">Amount</th>
                        <th className="text-left p-3 font-medium">Status</th>
                        <th className="text-right p-3 font-medium">Invoice</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t">
                        <td className="p-3">Oct 15, 2023</td>
                        <td className="p-3">Pro Plan - Monthly</td>
                        <td className="p-3">$49.00</td>
                        <td className="p-3">
                          <Badge className="bg-green-500">Paid</Badge>
                        </td>
                        <td className="p-3 text-right">
                          <Button variant="ghost" size="sm">
                            Download
                          </Button>
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="p-3">Sep 15, 2023</td>
                        <td className="p-3">Pro Plan - Monthly</td>
                        <td className="p-3">$49.00</td>
                        <td className="p-3">
                          <Badge className="bg-green-500">Paid</Badge>
                        </td>
                        <td className="p-3 text-right">
                          <Button variant="ghost" size="sm">
                            Download
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Wrap the component with DashboardLayout
const SettingsWithLayout = () => (
  <DashboardLayout title="Settings">
    <Settings />
  </DashboardLayout>
);

export default SettingsWithLayout;
