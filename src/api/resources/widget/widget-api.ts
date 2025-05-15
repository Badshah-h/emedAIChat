import { Widget } from "@/types/widget";
import { httpClient } from '@/api/core/http-client';
import { WIDGET_ENDPOINTS } from '@/api/core/api-endpoints';

// Check if we're in development mode to use mock data
const isDevelopment = import.meta.env.DEV;

// Import mock data
import { mockWidgets } from './widget-mock-data';

/**
 * Widget API module
 * 
 * This module provides methods for interacting with the widget-related API endpoints.
 * In development mode, it uses mock data. In production, it makes actual API calls.
 */
export const widgetApi = {
  /**
   * Get all widgets
   * @returns Promise<Widget[]> Array of widgets
   */
  getWidgets: async (): Promise<Widget[]> => {
    if (isDevelopment) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([...mockWidgets]);
        }, 500);
      });
    }
    
    return httpClient.get<Widget[]>(WIDGET_ENDPOINTS.GET_ALL);
  },

  /**
   * Get widget by ID
   * @param id Widget ID
   * @returns Promise<Widget> Widget
   */
  getWidgetById: async (id: string): Promise<Widget> => {
    if (isDevelopment) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const widget = mockWidgets.find(w => w.id === id);
          if (widget) {
            resolve({...widget});
          } else {
            reject(new Error("Widget not found"));
          }
        }, 500);
      });
    }
    
    return httpClient.get<Widget>(WIDGET_ENDPOINTS.GET_BY_ID(id));
  },

  /**
   * Create a new widget
   * @param widgetData Widget data
   * @returns Promise<Widget> Created widget
   */
  createWidget: async (widgetData: Partial<Widget>): Promise<Widget> => {
    if (isDevelopment) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const newWidget: Widget = {
            id: `widget-${Date.now()}`,
            name: widgetData.name || "New Widget",
            description: widgetData.description || "",
            modelId: widgetData.modelId || "model-1",
            status: widgetData.status || "draft",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            settings: widgetData.settings || {
              theme: "light",
              position: "bottom-right",
              initialMessage: "Hello! How can I help you today?",
            },
          };
          resolve(newWidget);
        }, 500);
      });
    }
    
    return httpClient.post<Widget>(WIDGET_ENDPOINTS.CREATE, widgetData);
  },

  /**
   * Update a widget
   * @param id Widget ID
   * @param widgetData Widget data to update
   * @returns Promise<Widget> Updated widget
   */
  updateWidget: async (id: string, widgetData: Partial<Widget>): Promise<Widget> => {
    if (isDevelopment) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const widgetIndex = mockWidgets.findIndex(w => w.id === id);
          if (widgetIndex >= 0) {
            const updatedWidget: Widget = {
              ...mockWidgets[widgetIndex],
              ...widgetData,
              updatedAt: new Date().toISOString(),
            };
            resolve(updatedWidget);
          } else {
            reject(new Error("Widget not found"));
          }
        }, 500);
      });
    }
    
    return httpClient.put<Widget>(WIDGET_ENDPOINTS.UPDATE(id), widgetData);
  },

  /**
   * Delete a widget
   * @param id Widget ID
   * @returns Promise<boolean> Success status
   */
  deleteWidget: async (id: string): Promise<boolean> => {
    if (isDevelopment) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 500);
      });
    }
    
    await httpClient.delete(WIDGET_ENDPOINTS.DELETE(id));
    return true;
  },

  /**
   * Get widget analytics
   * @param id Widget ID
   * @returns Promise<any> Analytics data
   */
  getWidgetAnalytics: async (id: string): Promise<any> => {
    if (isDevelopment) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            totalConversations: 256,
            averageRating: 4.7,
            responseTime: "1.2s",
            topQuestions: [
              { question: "How do I reset my password?", count: 45 },
              { question: "What are your business hours?", count: 32 },
              { question: "How do I return a product?", count: 28 },
            ],
            dailyUsage: [
              { date: "2023-05-01", count: 24 },
              { date: "2023-05-02", count: 31 },
              { date: "2023-05-03", count: 28 },
              { date: "2023-05-04", count: 35 },
              { date: "2023-05-05", count: 42 },
            ],
          });
        }, 500);
      });
    }
    
    return httpClient.get(WIDGET_ENDPOINTS.GET_ANALYTICS(id));
  },
};
