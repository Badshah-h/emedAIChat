import { useState, useEffect, useCallback } from "react";
import { Widget, WidgetFilters } from "@/types/widget";
import { widgetService } from "@/services/widget";

/**
 * Hook for managing widgets
 * 
 * This hook provides state and methods for managing widgets.
 */
export function useWidgets() {
  // Data state
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filters state
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [modelFilter, setModelFilter] = useState<string>("all");
  
  // Dialog state
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedWidget, setSelectedWidget] = useState<Widget | null>(null);

  // Get filtered widgets
  const filteredWidgets = widgetService.filterWidgets(widgets, {
    searchQuery,
    statusFilter,
    modelFilter,
  });

  /**
   * Fetch widgets
   */
  const fetchWidgets = useCallback(async () => {
    try {
      setLoading(true);
      const data = await widgetService.getWidgets();
      setWidgets(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch widgets");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Create widget
   * @param widgetData Widget data
   * @returns Promise<boolean> Success status
   */
  const createWidget = useCallback(async (widgetData: Partial<Widget>) => {
    try {
      setLoading(true);
      const newWidget = await widgetService.createWidget(widgetData);
      setWidgets((prevWidgets) => [...prevWidgets, newWidget]);
      setIsCreateDialogOpen(false);
      return true;
    } catch (err) {
      setError("Failed to create widget");
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Delete widget
   * @returns Promise<boolean> Success status
   */
  const deleteWidget = useCallback(async () => {
    if (!selectedWidget) return false;
    
    try {
      setLoading(true);
      await widgetService.deleteWidget(selectedWidget.id);
      setWidgets((prevWidgets) => prevWidgets.filter((widget) => widget.id !== selectedWidget.id));
      setSelectedWidget(null);
      setIsDeleteDialogOpen(false);
      return true;
    } catch (err) {
      setError("Failed to delete widget");
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [selectedWidget]);

  /**
   * Update widget
   * @param widgetId Widget ID
   * @param widgetData Widget data
   * @returns Promise<boolean> Success status
   */
  const updateWidget = useCallback(async (widgetId: string, widgetData: Partial<Widget>) => {
    try {
      setLoading(true);
      const updatedWidget = await widgetService.updateWidget(widgetId, widgetData);
      setWidgets((prevWidgets) => 
        prevWidgets.map((widget) => widget.id === widgetId ? updatedWidget : widget)
      );
      return true;
    } catch (err) {
      setError("Failed to update widget");
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Get widget by ID
   * @param widgetId Widget ID
   * @returns Promise<Widget | null> Widget or null if not found
   */
  const getWidgetById = useCallback(async (widgetId: string) => {
    try {
      setLoading(true);
      const widget = await widgetService.getWidgetById(widgetId);
      return widget;
    } catch (err) {
      setError("Failed to get widget");
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Get widget analytics
   * @param widgetId Widget ID
   * @returns Promise<any | null> Analytics data or null if error
   */
  const getWidgetAnalytics = useCallback(async (widgetId: string) => {
    try {
      setLoading(true);
      const analytics = await widgetService.getWidgetAnalytics(widgetId);
      return analytics;
    } catch (err) {
      setError("Failed to get widget analytics");
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Load widgets on component mount
  useEffect(() => {
    fetchWidgets();
  }, [fetchWidgets]);

  return {
    // Data
    widgets,
    filteredWidgets,
    loading,
    error,
    
    // Filters
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    modelFilter,
    setModelFilter,
    
    // Dialog state
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    selectedWidget,
    setSelectedWidget,
    
    // Actions
    fetchWidgets,
    createWidget,
    deleteWidget,
    updateWidget,
    getWidgetById,
    getWidgetAnalytics,
    
    // Utility functions
    getStatusBadgeClass: widgetService.getStatusBadgeClass,
  };
}
