import { lazy, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import {
  LayoutDashboard,
  MessageSquare,
  Brain,
  BarChart3,
  Code,
  Users,
  Settings,
  Home as HomeIcon,
  LogIn,
  UserPlus,
  Shield,
} from "lucide-react";

// Lazy load components
const LandingPage = lazy(() => import("@/components/landing/LandingPage"));
const LoginPage = lazy(() => import("@/components/auth/LoginPage"));
const RegisterPage = lazy(() => import("@/components/auth/RegisterPage"));
const Home = lazy(() => import("@/components/home"));
const WidgetManager = lazy(() => import("@/components/dashboard/WidgetManager"));
const AIModelConfigurator = lazy(() => import("@/components/dashboard/AIModelConfigurator"));
const IntegrationCodeGenerator = lazy(() => import("@/components/dashboard/IntegrationCodeGenerator"));
const Analytics = lazy(() => import("@/components/dashboard/Analytics"));
const UserManagement = lazy(() => import("@/components/dashboard/UserManagement"));
const RoleManagement = lazy(() => import("@/components/dashboard/RoleManagementWithLayout"));
const SettingsPage = lazy(() => import("@/components/dashboard/Settings"));

// Route interface
export interface AppRoute {
  path: string;
  element: ReactNode;
  children?: AppRoute[];
  icon?: React.ComponentType<{ className?: string }>;
  label?: string;
  showInNav?: boolean;
}

// Define routes
export const routes: AppRoute[] = [
  {
    path: "/landing",
    element: <LandingPage />,
    icon: HomeIcon,
    label: "Home",
    showInNav: false,
  },
  {
    path: "/login",
    element: <LoginPage />,
    icon: LogIn,
    label: "Login",
    showInNav: false,
  },
  {
    path: "/register",
    element: <RegisterPage />,
    icon: UserPlus,
    label: "Register",
    showInNav: false,
  },
  {
    path: "/dashboard",
    element: <Home />,
    icon: LayoutDashboard,
    label: "Dashboard",
    showInNav: true,
  },
  {
    path: "/",
    element: <Home />,
    icon: LayoutDashboard,
    label: "Dashboard",
    showInNav: false,
  },
  {
    path: "/widgets",
    element: <WidgetManager />,
    icon: MessageSquare,
    label: "Widgets",
    showInNav: true,
  },
  {
    path: "/ai-models",
    element: <AIModelConfigurator />,
    icon: Brain,
    label: "AI Models",
    showInNav: true,
  },
  {
    path: "/integration",
    element: <IntegrationCodeGenerator />,
    icon: Code,
    label: "Integration",
    showInNav: true,
  },
  {
    path: "/analytics",
    element: <Analytics />,
    icon: BarChart3,
    label: "Analytics",
    showInNav: true,
  },
  {
    path: "/users",
    element: <UserManagement />,
    icon: Users,
    label: "Users",
    showInNav: true,
  },
  {
    path: "/roles",
    element: <RoleManagement />,
    icon: Shield,
    label: "Roles",
    showInNav: true,
  },
  {
    path: "/settings",
    element: <SettingsPage />,
    icon: Settings,
    label: "Settings",
    showInNav: true,
  },
  // Catch-all redirect to home
  {
    path: "*",
    element: <Navigate to="/" replace />,
    showInNav: false,
  },
];

// Helper function to get navigation items
export const getNavItems = () => {
  return routes.filter(route => route.showInNav).map(route => ({
    path: route.path,
    label: route.label || "",
    icon: route.icon || LayoutDashboard
  }));
};

export default routes;
