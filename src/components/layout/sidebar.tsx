import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  MessageSquare,
  Brain,
  BarChart3,
  Code,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Bot,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/widgets", label: "Widgets", icon: MessageSquare },
  { path: "/ai-models", label: "AI Models", icon: Brain },
  { path: "/analytics", label: "Analytics", icon: BarChart3 },
  { path: "/integration", label: "Integration", icon: Code },
  { path: "/users", label: "Users", icon: Users },
  { path: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <motion.div
      className={cn("sidebar", collapsed && "collapsed")}
      initial={false}
      animate={
        collapsed
          ? { width: "var(--sidebar-width-collapsed)" }
          : { width: "var(--sidebar-width)" }
      }
      transition={{
        duration: 0.5,
        type: "spring",
        stiffness: 200,
        damping: 25,
      }}
    >
      <div className="flex h-16 items-center px-4 justify-between">
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                <Bot className="h-6 w-6 text-primary" />
                <motion.div
                  className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-primary"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              </div>
              <motion.div
                className="gradient-text text-lg font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                AI Chat Admin
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="rounded-full hover:bg-primary/10 transition-all duration-300"
        >
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: collapsed ? 180 : 0 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <ChevronLeft size={18} />
          </motion.div>
        </Button>
      </div>

      <div className="flex-1 overflow-auto py-4 px-2">
        <TooltipProvider delayDuration={100}>
          <nav className="grid items-start text-sm font-medium gap-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;

              return (
                <Tooltip key={item.path}>
                  <TooltipTrigger asChild>
                    <Link
                      to={item.path}
                      className={cn("sidebar-item", isActive && "active")}
                      onMouseEnter={() => setHoveredItem(item.path)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <motion.div
                        initial={{ scale: 1 }}
                        animate={{
                          scale: hoveredItem === item.path ? 1.1 : 1,
                          rotate: hoveredItem === item.path ? 5 : 0,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                        }}
                      >
                        <Icon className="h-5 w-5" />
                      </motion.div>

                      <AnimatePresence>
                        {!collapsed && (
                          <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.3 }}
                            className="font-medium"
                          >
                            {item.label}
                          </motion.span>
                        )}
                      </AnimatePresence>

                      {isActive && (
                        <motion.div
                          className="absolute right-2 w-1.5 h-1.5 rounded-full bg-primary-foreground"
                          layoutId="activeIndicator"
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                          }}
                        />
                      )}
                    </Link>
                  </TooltipTrigger>
                  {collapsed && (
                    <TooltipContent
                      side="right"
                      className="glass-effect border-none"
                    >
                      {item.label}
                    </TooltipContent>
                  )}
                </Tooltip>
              );
            })}
          </nav>
        </TooltipProvider>
      </div>

      <div className="p-4 card-gradient-border mx-2 mb-4">
        <div className="card-gradient-border-content p-3">
          <div className="flex items-center justify-between">
            {!collapsed ? (
              <>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border-2 border-primary/20 p-0.5">
                    <AvatarImage
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
                      alt="Admin"
                      className="rounded-full"
                    />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      AD
                    </AvatarFallback>
                  </Avatar>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="font-medium">Admin User</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-green-500"></span>
                      admin@example.com
                    </div>
                  </motion.div>
                </div>
                <ThemeToggle />
              </>
            ) : (
              <div className="flex flex-col items-center gap-3 w-full">
                <Avatar className="h-10 w-10 border-2 border-primary/20 p-0.5">
                  <AvatarImage
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
                    alt="Admin"
                  />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <ThemeToggle />
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
