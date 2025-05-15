import React from "react";
import { motion } from "framer-motion";
import { MessageSquare, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

interface WidgetPreviewProps {
  widget: {
    name: string;
    appearance: {
      theme: string;
      primaryColor: string;
      fontFamily: string;
      borderRadius: number;
      position: string;
    };
    behavior: {
      autoOpen: boolean;
      welcomeMessage: string;
      showBranding: boolean;
      collectUserInfo: boolean;
    };
  };
}

const WidgetPreview: React.FC<WidgetPreviewProps> = ({ widget }) => {
  const [isOpen, setIsOpen] = React.useState(true);
  const [messages, setMessages] = React.useState([
    { type: "bot", content: widget.behavior.welcomeMessage },
  ]);

  const getPositionClasses = () => {
    switch (widget.appearance.position) {
      case "bottom-right":
        return "bottom-4 right-4";
      case "bottom-left":
        return "bottom-4 left-4";
      case "top-right":
        return "top-4 right-4";
      case "top-left":
        return "top-4 left-4";
      default:
        return "bottom-4 right-4";
    }
  };

  const getThemeClasses = () => {
    return widget.appearance.theme === "dark"
      ? "bg-gray-800 text-white"
      : "bg-white text-gray-800";
  };

  const getBorderRadiusStyle = () => {
    return { borderRadius: `${widget.appearance.borderRadius}px` };
  };

  const getFontFamilyStyle = () => {
    return { fontFamily: widget.appearance.fontFamily };
  };

  const getPrimaryColorStyle = () => {
    return { backgroundColor: widget.appearance.primaryColor };
  };

  const getTextColorStyle = () => {
    return { color: widget.appearance.primaryColor };
  };

  const getButtonStyle = () => {
    return {
      backgroundColor: widget.appearance.primaryColor,
      color: "white",
      borderRadius: `${widget.appearance.borderRadius}px`,
    };
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Chat widget button */}
      {!isOpen && (
        <motion.button
          className="absolute shadow-lg"
          style={{
            ...getButtonStyle(),
            width: "60px",
            height: "60px",
            ...getBorderRadiusStyle(),
          }}
          onClick={() => setIsOpen(true)}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className={`absolute ${getPositionClasses()} flex items-center justify-center shadow-lg`}
        >
          <MessageSquare className="h-6 w-6" />
        </motion.button>
      )}

      {/* Chat widget window */}
      {isOpen && (
        <motion.div
          className={`absolute ${getPositionClasses()} ${getThemeClasses()} shadow-xl flex flex-col`}
          style={{
            ...getBorderRadiusStyle(),
            ...getFontFamilyStyle(),
            width: "300px",
            height: "400px",
            overflow: "hidden",
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          {/* Header */}
          <div
            className="p-4 flex justify-between items-center"
            style={getPrimaryColorStyle()}
          >
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 bg-white/20">
                <AvatarImage src="https://api.dicebear.com/7.x/bottts/svg?seed=widget" />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <div className="font-medium text-white">{widget.name}</div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 rounded-full h-8 w-8 p-0"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${message.type === "user" ? "bg-primary text-white" : widget.appearance.theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}
                  style={message.type === "user" ? getPrimaryColorStyle() : {}}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                className="flex-1"
                style={{
                  ...getBorderRadiusStyle(),
                  borderColor: widget.appearance.primaryColor,
                }}
              />
              <Button style={getButtonStyle()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
            {widget.behavior.showBranding && (
              <div className="mt-2 text-xs text-center text-gray-500 dark:text-gray-400">
                Powered by AI Chat Admin
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default WidgetPreview;
