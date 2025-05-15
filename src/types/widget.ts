/**
 * Widget types
 */

export interface Widget {
  id: string;
  name: string;
  description: string;
  modelId: string;
  status: 'active' | 'inactive' | 'draft';
  createdAt: string;
  updatedAt: string;
  settings: WidgetSettings;
}

export interface WidgetSettings {
  theme: string;
  position: string;
  initialMessage: string;
  allowAttachments?: boolean;
  showTimestamp?: boolean;
  [key: string]: any;
}

export interface WidgetFilters {
  searchQuery: string;
  statusFilter: string;
  modelFilter: string;
}
