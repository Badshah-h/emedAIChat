import { Widget, WidgetFilters } from "@/types/widget";
import { widgetApi } from "@/api/resources/widget";

/**
 * Widget service
 * 
 * This service provides business logic for widget-related operations.
 */
export const widgetService = {
  /**
   * Get all widgets
   * @returns Promise<Widget[]> Array of widgets
   */
  getWidgets: async (): Promise<Widget[]> => {
    return await widgetApi.getWidgets();
  },

  /**
   * Get widget by ID
   * @param id Widget ID
   * @returns Promise<Widget> Widget
   */
  getWidgetById: async (id: string): Promise<Widget> => {
    return await widgetApi.getWidgetById(id);
  },

  /**
   * Create a new widget
   * @param widgetData Widget data
   * @returns Promise<Widget> Created widget
   */
  createWidget: async (widgetData: Partial<Widget>): Promise<Widget> => {
    return await widgetApi.createWidget(widgetData);
  },

  /**
   * Update a widget
   * @param id Widget ID
   * @param widgetData Widget data to update
   * @returns Promise<Widget> Updated widget
   */
  updateWidget: async (id: string, widgetData: Partial<Widget>): Promise<Widget> => {
    return await widgetApi.updateWidget(id, widgetData);
  },

  /**
   * Delete a widget
   * @param id Widget ID
   * @returns Promise<boolean> Success status
   */
  deleteWidget: async (id: string): Promise<boolean> => {
    return await widgetApi.deleteWidget(id);
  },

  /**
   * Get widget analytics
   * @param id Widget ID
   * @returns Promise<any> Analytics data
   */
  getWidgetAnalytics: async (id: string): Promise<any> => {
    return await widgetApi.getWidgetAnalytics(id);
  },

  /**
   * Filter widgets based on search query and filters
   * @param widgets Array of widgets to filter
   * @param filters Filters to apply
   * @returns Array of filtered widgets
   */
  filterWidgets: (widgets: Widget[], filters: WidgetFilters): Widget[] => {
    return widgets.filter((widget) => {
      const matchesSearch =
        widget.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        widget.description.toLowerCase().includes(filters.searchQuery.toLowerCase());
      
      const matchesStatus = filters.statusFilter === "all" || widget.status === filters.statusFilter;
      
      const matchesModel = filters.modelFilter === "all" || widget.modelId === filters.modelFilter;
      
      return matchesSearch && matchesStatus && matchesModel;
    });
  },

  /**
   * Get status badge class based on status
   * @param status Widget status
   * @returns CSS class for the badge
   */
  getStatusBadgeClass: (status: string): string => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "inactive":
        return "bg-yellow-500";
      case "draft":
        return "bg-slate-500";
      default:
        return "";
    }
  },
};
