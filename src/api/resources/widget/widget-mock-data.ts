import { Widget } from "@/types/widget";

/**
 * Mock widget data for development
 */
export const mockWidgets: Widget[] = [
  {
    id: "widget-1",
    name: "Customer Support",
    description: "Widget for customer support on the main website",
    modelId: "model-1",
    status: "active",
    createdAt: "2023-05-15T10:30:00Z",
    updatedAt: "2023-05-20T14:45:00Z",
    settings: {
      theme: "light",
      position: "bottom-right",
      initialMessage: "Hello! How can I help you today?",
      allowAttachments: true,
      showTimestamp: true,
    },
  },
  {
    id: "widget-2",
    name: "Product Assistant",
    description: "Widget for product pages to help with questions",
    modelId: "model-2",
    status: "active",
    createdAt: "2023-06-10T09:15:00Z",
    updatedAt: "2023-06-12T11:20:00Z",
    settings: {
      theme: "dark",
      position: "bottom-left",
      initialMessage: "Have questions about this product? Ask me!",
      allowAttachments: false,
      showTimestamp: false,
    },
  },
];
