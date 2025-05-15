import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";
type ThemeColor = "purple" | "blue" | "green" | "orange" | "pink";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  defaultColor?: ThemeColor;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  color: ThemeColor;
  setTheme: (theme: Theme) => void;
  setColor: (color: ThemeColor) => void;
};

const initialState: ThemeProviderState = {
  theme: "light",
  color: "purple",
  setTheme: () => null,
  setColor: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "light",
  defaultColor = "purple",
  storageKey = "ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(`${storageKey}-mode`) as Theme) || defaultTheme,
  );

  const [color, setColor] = useState<ThemeColor>(
    () =>
      (localStorage.getItem(`${storageKey}-color`) as ThemeColor) ||
      defaultColor,
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");
    root.classList.add(theme);

    root.removeAttribute("data-theme");
    if (color !== "purple") {
      root.setAttribute("data-theme", color);
    }
  }, [theme, color]);

  const value = {
    theme,
    color,
    setTheme: (theme: Theme) => {
      localStorage.setItem(`${storageKey}-mode`, theme);
      setTheme(theme);
    },
    setColor: (color: ThemeColor) => {
      localStorage.setItem(`${storageKey}-color`, color);
      setColor(color);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
