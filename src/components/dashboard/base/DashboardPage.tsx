import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface DashboardPageProps {
  title: string;
  description?: string;
  children: ReactNode;
  actions?: ReactNode;
  fullWidth?: boolean;
}

/**
 * Base component for dashboard pages with consistent header and layout
 */
export function DashboardPage({
  title,
  description,
  children,
  actions,
  fullWidth = false,
}: DashboardPageProps) {
  return (
    <div className="bg-background p-6 h-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className={`${fullWidth ? "text-3xl" : "text-2xl"} font-bold`}>{title}</h1>
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </div>
        {actions && <div className="flex gap-2">{actions}</div>}
      </div>
      {children}
    </div>
  );
}

interface DashboardCardProps {
  title?: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

/**
 * Consistent card component for dashboard pages
 */
export function DashboardCard({
  title,
  description,
  children,
  footer,
  className = "",
}: DashboardCardProps) {
  return (
    <Card className={`h-full ${className}`}>
      {(title || description) && (
        <div className="p-6 pb-3 border-b">
          {title && <h2 className="text-xl font-semibold">{title}</h2>}
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
      )}
      <div className="p-6">{children}</div>
      {footer && <div className="p-6 pt-3 border-t">{footer}</div>}
    </Card>
  );
}

interface DashboardHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
}

/**
 * Consistent section header for dashboard pages
 */
export function DashboardHeader({
  title,
  description,
  actions,
}: DashboardHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h2 className="text-xl font-semibold">{title}</h2>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {actions && <div className="flex gap-2">{actions}</div>}
    </div>
  );
}

interface DashboardEmptyStateProps {
  title: string;
  description: string;
  icon?: ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

/**
 * Empty state component for dashboard pages
 */
export function DashboardEmptyState({
  title,
  description,
  icon,
  action,
}: DashboardEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-muted/30 rounded-lg border border-dashed p-8 text-center">
      {icon && <div className="mb-4 text-muted-foreground">{icon}</div>}
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6 max-w-md">{description}</p>
      {action && <Button onClick={action.onClick}>{action.label}</Button>}
    </div>
  );
}
