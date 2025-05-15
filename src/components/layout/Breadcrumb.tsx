import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { routes } from "@/routes";

interface BreadcrumbProps {
  className?: string;
}

export function Breadcrumb({ className = "" }: BreadcrumbProps) {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Generate path map from routes
  const pathMap: Record<string, string> = routes.reduce((acc, route) => {
    const path = route.path.replace(/^\//, ""); // Remove leading slash
    acc[path || ""] = route.label || "";
    return acc;
  }, {} as Record<string, string>);

  // Add home explicitly
  pathMap[""] = "Home";

  return (
    <nav className={`flex items-center text-sm text-muted-foreground ${className}`}>
      <ol className="flex items-center space-x-1">
        <li>
          <Link
            to="/"
            className="flex items-center hover:text-foreground transition-colors"
          >
            <Home className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Home</span>
          </Link>
        </li>

        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const name = pathMap[value] || value;

          return (
            <li key={to} className="flex items-center">
              <ChevronRight className="h-4 w-4 mx-1" />
              {last ? (
                <span className="font-medium text-foreground">{name}</span>
              ) : (
                <Link
                  to={to}
                  className="hover:text-foreground transition-colors"
                >
                  {name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
