import { Moon, Sun, Palette, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/ui/theme-provider";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme, color, setColor } = useTheme();

  const themeColors = [
    { name: "Purple", value: "purple", class: "bg-[hsl(262,83%,58%)]" },
    { name: "Blue", value: "blue", class: "bg-[hsl(221,83%,53%)]" },
    { name: "Green", value: "green", class: "bg-[hsl(142,71%,45%)]" },
    { name: "Orange", value: "orange", class: "bg-[hsl(32,95%,44%)]" },
    { name: "Pink", value: "pink", class: "bg-[hsl(330,81%,60%)]" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 glass-effect">
        <DropdownMenuLabel className="text-center font-semibold">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="h-4 w-4 text-primary animate-pulse" />
            <span className="gradient-text">Appearance</span>
            <Sparkles className="h-4 w-4 text-primary animate-pulse" />
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <div className="px-2 py-1.5">
          <div className="flex items-center justify-between rounded-lg p-1">
            <motion.div
              className={`flex-1 flex items-center justify-center p-2 rounded-l-lg cursor-pointer ${theme === "light" ? "bg-primary text-primary-foreground" : "hover:bg-muted/50"}`}
              onClick={() => setTheme("light")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Sun className="mr-2 h-4 w-4" />
              <span>Light</span>
            </motion.div>

            <motion.div
              className={`flex-1 flex items-center justify-center p-2 rounded-r-lg cursor-pointer ${theme === "dark" ? "bg-primary text-primary-foreground" : "hover:bg-muted/50"}`}
              onClick={() => setTheme("dark")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Moon className="mr-2 h-4 w-4" />
              <span>Dark</span>
            </motion.div>
          </div>
        </div>

        <DropdownMenuSeparator />
        <DropdownMenuLabel>
          <div className="flex items-center">
            <Palette className="mr-2 h-4 w-4 text-primary" />
            <span>Theme Color</span>
          </div>
        </DropdownMenuLabel>

        <div className="grid grid-cols-5 gap-2 p-3">
          {themeColors.map((themeColor) => (
            <motion.button
              key={themeColor.value}
              className={`theme-selector ${themeColor.class} ${color === themeColor.value ? "ring-2 ring-offset-2 ring-offset-background shadow-lg" : ""}`}
              onClick={() => setColor(themeColor.value as any)}
              title={themeColor.name}
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            />
          ))}
        </div>

        <div className="p-2 text-center text-xs text-muted-foreground">
          Customize your experience with theme options
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
