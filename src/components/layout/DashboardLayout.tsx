import { ReactNode, useState } from "react";
import { useLocation } from "react-router-dom";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { LayoutProvider, useLayout } from "@/components/layout/LayoutContext";
import { routes } from "@/routes";

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
}

// Inner layout component that uses the context
function DashboardLayoutInner({ children, title = "Dashboard" }: DashboardLayoutProps) {
  const { sidebarCollapsed, setSidebarCollapsed, toggleSidebar } = useLayout();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Extract page title from the current path using routes
  const getPageTitle = () => {
    const path = location.pathname;

    // Find matching route
    const route = routes.find(r => r.path === path);

    if (route && route.label) {
      return route.label;
    }

    // Use provided title as fallback
    return title;
  };

  // Custom header menu click handler
  const handleMenuClick = () => {
    // On mobile, open the mobile menu
    if (window.innerWidth < 768) {
      setMobileMenuOpen(true);
    } else {
      // On desktop, toggle the sidebar
      toggleSidebar();
    }
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar - hidden on mobile */}
      <div className="hidden md:block">
        <Sidebar
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Main content */}
      <div
        className={`flex flex-col flex-1 ${sidebarCollapsed ? "main-content sidebar-collapsed" : "main-content"
          }`}
      >
        {/* Header */}
        <Header
          title={getPageTitle()}
          onMenuClick={handleMenuClick}
        />

        {/* Main content area */}
        <main className="flex-1 overflow-auto">
          <div className="px-6 py-4 border-b border-border/40">
            <Breadcrumb />
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}

// Wrapper component that provides the context
export function DashboardLayout(props: DashboardLayoutProps) {
  return (
    <ThemeProvider>
      <LayoutProvider>
        <DashboardLayoutInner {...props} />
      </LayoutProvider>
    </ThemeProvider>
  );
}
