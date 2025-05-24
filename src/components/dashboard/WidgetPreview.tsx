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
      secondaryColor?: string;
      fontFamily: string;
      fontSize?: string;
      fontWeight?: string;
      borderRadius: number;
      position: string;
      width?: number;
      height?: number;
      bubbleStyle?: "rounded" | "square" | "soft";
      logoUrl?: string;
      showBranding?: boolean;
    };
    behavior: {
      autoOpen: boolean;
      autoOpenDelay?: number;
      autoOpenScrollPercent?: number;
      exitIntentEnabled?: boolean;
      welcomeMessage: string;
      showBranding: boolean;
      collectUserInfo: boolean;
      notificationSound?: boolean;
      notificationStyle?: string;
      animationTiming?: number;
      mobilePosition?: string;
      soundEffects?: {
        newMessage?: boolean;
        sendMessage?: boolean;
      };
    };
    content?: {
      botName?: string;
      botAvatar?: string;
      inputPlaceholder?: string;
      offlineMessage?: string;
    };
  };
  previewState?: "open" | "closed";
  previewMode?: "desktop" | "mobile";
}

const WidgetPreview: React.FC<WidgetPreviewProps> = ({
  widget,
  previewState = "open",
  previewMode = "desktop",
}) => {
  const [isOpen, setIsOpen] = React.useState(previewState === "open");
  const [messages, setMessages] = React.useState([
    {
      type: "bot",
      content:
        widget?.behavior?.welcomeMessage || "Hello! How can I help you today?",
    },
  ]);

  // Update open state when previewState prop changes
  React.useEffect(() => {
    setIsOpen(previewState === "open");
  }, [previewState]);

  const getPositionClasses = () => {
    switch (widget?.appearance?.position) {
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
    return widget?.appearance?.theme === "dark"
      ? "bg-gray-800 text-white"
      : "bg-white text-gray-800";
  };

  const getBorderRadiusStyle = () => {
    return { borderRadius: `${widget?.appearance?.borderRadius || 8}px` };
  };

  const getFontFamilyStyle = () => {
    const fontFamily = widget?.appearance?.fontFamily || "Inter";
    const fontSize = widget?.appearance?.fontSize || "medium";
    const fontWeight = widget?.appearance?.fontWeight || "normal";

    return {
      fontFamily,
      fontSize:
        fontSize === "small"
          ? "0.875rem"
          : fontSize === "large"
            ? "1.125rem"
            : "1rem",
      fontWeight,
    };
  };

  const getBubbleStyle = () => {
    const style = widget?.appearance?.bubbleStyle || "rounded";
    switch (style) {
      case "square":
        return { borderRadius: "4px" };
      case "soft":
        return { borderRadius: "12px" };
      case "rounded":
      default:
        return { borderRadius: "18px" };
    }
  };

  const getPrimaryColorStyle = () => {
    return { backgroundColor: widget?.appearance?.primaryColor || "#7C3AED" };
  };

  const getTextColorStyle = () => {
    return { color: widget?.appearance?.primaryColor || "#7C3AED" };
  };

  const getButtonStyle = () => {
    return {
      backgroundColor: widget?.appearance?.primaryColor || "#7C3AED",
      color: "white",
      borderRadius: `${widget?.appearance?.borderRadius || 8}px`,
    };
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Chat widget button */}
      {!isOpen && (
        <motion.button
          style={{
            ...getButtonStyle(),
            width: "60px",
            height: "60px",
            ...getBorderRadiusStyle(),
          }}
          onClick={() => setIsOpen(true)}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            duration: (widget?.behavior?.animationTiming || 300) / 1000,
          }}
          className={`absolute ${getPositionClasses()} flex items-center justify-center shadow-lg`}
        >
          {widget?.appearance?.logoUrl ? (
            <img
              src={widget.appearance.logoUrl}
              alt="Widget logo"
              className="h-6 w-6 object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
                const parent = (e.target as HTMLImageElement).parentNode;
                if (parent) {
                  const icon = document.createElement("div");
                  icon.innerHTML =
                    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>';
                  parent.appendChild(icon);
                }
              }}
            />
          ) : (
            <MessageSquare className="h-6 w-6" />
          )}
        </motion.button>
      )}

      {/* Chat widget window */}
      {isOpen && (
        <motion.div
          className={`absolute ${getPositionClasses()} ${getThemeClasses()} shadow-xl flex flex-col`}
          style={{
            ...getBorderRadiusStyle(),
            ...getFontFamilyStyle(),
            width: `${widget?.appearance?.width || 300}px`,
            height: `${widget?.appearance?.height || 400}px`,
            overflow: "hidden",
            maxWidth:
              previewMode === "mobile"
                ? "100%"
                : `${widget?.appearance?.width || 300}px`,
            maxHeight:
              previewMode === "mobile"
                ? "100%"
                : `${widget?.appearance?.height || 400}px`,
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            duration: (widget?.behavior?.animationTiming || 300) / 1000,
          }}
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
              <div className="font-medium text-white">
                {widget?.content?.botName || widget?.name || "Chat Widget"}
              </div>
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
                  className={`max-w-[80%] p-3 ${message.type === "user" ? "bg-primary text-white" : widget?.appearance?.theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}
                  style={{
                    ...(message.type === "user" ? getPrimaryColorStyle() : {}),
                    ...getBubbleStyle(),
                  }}
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
                placeholder={
                  widget?.content?.inputPlaceholder || "Type your message..."
                }
                className="flex-1"
                style={{
                  ...getBorderRadiusStyle(),
                  borderColor: widget?.appearance?.primaryColor || "#7C3AED",
                }}
              />
              <Button style={getButtonStyle()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
            {(widget?.behavior?.showBranding ||
              widget?.appearance?.showBranding) && (
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
