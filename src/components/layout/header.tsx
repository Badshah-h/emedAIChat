import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLayout } from "@/components/layout/LayoutContext";
import {
  Bell,
  Search,
  Menu,
  Sparkles,
  X,
  Settings,
  LogOut,
  User,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  title: string;
  onMenuClick?: () => void;
}

export function Header({ title, onMenuClick }: HeaderProps) {
  const layoutContext = useLayout();
  const [notifications] = useState([
    { id: 1, title: "New widget created", time: "2 min ago", read: false },
    { id: 2, title: "User feedback received", time: "1 hour ago", read: false },
    {
      id: 3,
      title: "System update available",
      time: "5 hours ago",
      read: true,
    },
  ]);

  const [searchFocused, setSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  // Use context toggle if available, otherwise use prop
  const handleMenuClick = () => {
    if (layoutContext && layoutContext.toggleSidebar) {
      layoutContext.toggleSidebar();
    } else if (onMenuClick) {
      onMenuClick();
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-40 header-glass">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-full hover:bg-primary/10"
            onClick={handleMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <motion.div
            className="hidden md:flex items-center gap-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <Sparkles className="h-5 w-5 text-primary animate-pulse" />
            <h1 className="text-2xl font-bold gradient-text">{title}</h1>
          </motion.div>
        </div>

        <div className="md:hidden">
          <h2 className="text-lg font-bold gradient-text">AI Chat Admin</h2>
        </div>

        <div className="flex items-center gap-4">
          <motion.div
            className="relative hidden md:block"
            initial={false}
            animate={{
              width: searchFocused ? 350 : 250,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
              <Search className="h-4 w-4" />
            </div>
            <Input
              type="search"
              placeholder="Search anything..."
              className="w-full pl-10 pr-10 h-10 rounded-full bg-background/50 border-primary/10 focus:border-primary/30 transition-all duration-300"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <AnimatePresence>
              {searchValue && (
                <motion.button
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => setSearchValue("")}
                >
                  <X className="h-4 w-4" />
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-full hover:bg-primary/10"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  >
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary">
                      {unreadCount}
                    </Badge>
                  </motion.div>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-80 glass-effect border-none shadow-glass"
            >
              <DropdownMenuLabel className="flex items-center justify-between">
                <span className="font-semibold">Notifications</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-xs hover:bg-primary/10"
                >
                  Mark all as read
                </Button>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-[300px] overflow-auto">
                {notifications.map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    className={`p-3 cursor-pointer ${notification.read ? "opacity-70" : ""}`}
                  >
                    <div className="flex items-start gap-3 w-full">
                      <div
                        className={`h-2 w-2 rounded-full mt-2 flex-shrink-0 ${notification.read ? "bg-muted" : "bg-primary animate-pulse"}`}
                      />
                      <div className="flex-grow">
                        <div className="font-medium">{notification.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {notification.time}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 rounded-full hover:bg-primary/10"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center text-primary hover:text-primary hover:bg-primary/10">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-primary/10 hover:border-primary/30 transition-all duration-300 p-0"
              >
                <Avatar className="h-full w-full">
                  <AvatarImage
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
                    alt="Admin"
                  />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    AD
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 glass-effect border-none shadow-glass"
            >
              <div className="flex items-center justify-center flex-col p-4">
                <Avatar className="h-16 w-16 mb-2 border-2 border-primary/20">
                  <AvatarImage
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
                    alt="Admin"
                  />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div className="font-semibold">Admin User</div>
                <div className="text-xs text-muted-foreground">
                  admin@example.com
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                <User className="h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                <Settings className="h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                <HelpCircle className="h-4 w-4" />
                Help & Support
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-2 text-destructive cursor-pointer">
                <LogOut className="h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
