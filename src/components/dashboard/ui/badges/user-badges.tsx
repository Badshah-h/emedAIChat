import { Badge } from "@/components/ui/badge";
import { userService } from "@/services/user";

interface RoleBadgeProps {
  role: string;
}

/**
 * Role badge component
 * 
 * This component displays a badge for a user role.
 */
export function RoleBadge({ role }: RoleBadgeProps) {
  const badgeClass = userService.getRoleBadgeClass(role);
  
  return (
    <Badge className={badgeClass}>
      {role.charAt(0).toUpperCase() + role.slice(1)}
    </Badge>
  );
}

interface StatusBadgeProps {
  status: string;
}

/**
 * Status badge component
 * 
 * This component displays a badge for a user status.
 */
export function StatusBadge({ status }: StatusBadgeProps) {
  const badgeClass = userService.getStatusBadgeClass(status);
  
  return (
    <Badge className={badgeClass}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}
