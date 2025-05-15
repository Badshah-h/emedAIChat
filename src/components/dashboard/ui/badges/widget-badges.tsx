import { Badge } from "@/components/ui/badge";
import { widgetService } from "@/services/widget";

interface StatusBadgeProps {
  status: string;
}

/**
 * Status badge component
 * 
 * This component displays a badge for a widget status.
 */
export function WidgetStatusBadge({ status }: StatusBadgeProps) {
  const badgeClass = widgetService.getStatusBadgeClass(status);
  
  return (
    <Badge className={badgeClass}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}
