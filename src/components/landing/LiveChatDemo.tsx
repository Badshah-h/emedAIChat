import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  MessageSquare,
  MessageCircle,
  Send,
  Zap,
  Code,
  Server,
  Cpu,
  Wifi,
  Database,
  User,
  X as XIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Chat message type
interface ChatMessage {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Static conversation data for the demo
const staticConversation: ChatMessage[] = [
  {
    id: 1,
    role: 'assistant',
    content: "Hello! How can I help you today?",
    timestamp: new Date(),
  },
  {
    id: 2,
    role: 'user',
    content: "Can you tell me about your context-aware features?",
    timestamp: new Date(),
  },
  {
    id: 3,
    role: 'assistant',
    content: "Our chat system can be configured to understand specific business contexts and deliver relevant responses tailored to your industry.",
    timestamp: new Date(),
  },
];

export default function LiveChatDemo() {
  const [showChatWidget, setShowChatWidget] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Function to toggle the chat widget
  const toggleChatWidget = () => {
    setShowChatWidget(!showChatWidget);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-background border rounded-xl shadow-lg overflow-hidden">
      {/* Browser mockup header */}
      <div className="bg-gray-100 dark:bg-gray-800 p-2 flex items-center border-b">
        <div className="flex space-x-1.5 mr-4">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="bg-white dark:bg-gray-700 rounded-full text-xs py-1 px-3 flex items-center shadow-sm">
            <span className="mr-2">yourwebsite.com</span>
          </div>
        </div>
      </div>

      {/* Browser content */}
      <div className="relative h-[500px] bg-gradient-to-br from-pink-100 to-blue-100 dark:from-pink-950/20 dark:to-blue-950/20 p-4 flex items-center justify-center">
        {/* Prompt to view demo when chat widget is not shown */}
        {!showChatWidget && (
          <div className="text-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <p className="text-base text-gray-600 dark:text-gray-300 mb-4">See our AI chat widget in action</p>
            <Button
              size="lg"
              variant="default"
              onClick={toggleChatWidget}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2"
            >
              View Live Demo
            </Button>
          </div>
        )}

        {/* Chat Widget */}
        {showChatWidget && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[350px]">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden border">
              {/* Chat Widget Header */}
              <div className="bg-blue-600 text-white p-3 flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-sm font-medium">AI Assistant</span>
                </div>
                <button
                  onClick={toggleChatWidget}
                  className="text-white/80 hover:text-white"
                >
                  <XIcon className="h-4 w-4" />
                </button>
              </div>

              {/* Chat Widget Messages */}
              <div className="p-4 h-[350px] overflow-y-auto bg-white dark:bg-gray-900 flex flex-col">
                <div className="space-y-4">
                  {/* Assistant message */}
                  <div className="flex justify-start">
                    <div className="max-w-[80%] p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-gray-800 dark:text-gray-200 rounded-bl-none">
                      <p className="text-sm whitespace-pre-wrap">Hello! How can I help you today?</p>
                    </div>
                  </div>

                  {/* User message */}
                  <div className="flex justify-end">
                    <div className="max-w-[80%] p-3 rounded-lg bg-blue-600 text-white rounded-br-none">
                      <p className="text-sm whitespace-pre-wrap">Can you tell me about your context-aware features?</p>
                    </div>
                  </div>

                  {/* Assistant message */}
                  <div className="flex justify-start">
                    <div className="max-w-[80%] p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-gray-800 dark:text-gray-200 rounded-bl-none">
                      <p className="text-sm whitespace-pre-wrap">Our chat system can be configured to understand specific business contexts and deliver relevant responses tailored to your industry.</p>
                    </div>
                  </div>

                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Chat Widget Input */}
              <div className="p-3 border-t flex">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 text-sm p-2.5 rounded-md border focus:outline-none"
                  disabled
                />
                <button className="bg-blue-600 text-white p-2.5 rounded-md ml-2 flex items-center justify-center">
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
