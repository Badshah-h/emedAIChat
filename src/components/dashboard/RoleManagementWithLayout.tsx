import { DashboardLayout } from "@/components/layout/DashboardLayout";
import RoleManagement from "./RoleManagement";

/**
 * Role Management with Dashboard Layout
 * 
 * This component wraps the RoleManagement component with the DashboardLayout.
 */
const RoleManagementWithLayout = () => (
  <DashboardLayout title="Role Management">
    <RoleManagement />
  </DashboardLayout>
);

export default RoleManagementWithLayout;
