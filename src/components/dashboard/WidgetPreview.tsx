import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendIcon, XIcon, MinimizeIcon, MaximizeIcon } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface WidgetPreviewProps {
  headerColor?: string;
  headerText?: string;
  botName?: string;
  botAvatar?: string;
  primaryColor?: string;
  secondaryColor?: string;
  fontFamily?: string;
  fontSize?: string;
  borderRadius?: string;
  showTimestamp?: boolean;
  initialMessage?: string;
  placeholderText?: string;
  width?: number;
  height?: number;
}

const WidgetPreview = ({
  headerColor = "#4f46e5",
  headerText = "Chat with our AI Assistant",
  botName = "AI Assistant",
  botAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=assistant",
  primaryColor = "#4f46e5",
  secondaryColor = "#e5e7eb",
  fontFamily = "Inter, system-ui, sans-serif",
  fontSize = "14px",
  borderRadius = "8px",
  showTimestamp = true,
  initialMessage = "Hello! How can I help you today?",
  placeholderText = "Type your message here...",
  width = 350,
  height = 500,
}: WidgetPreviewProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: initialMessage,
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputValue("");

    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "This is a simulated response from the AI assistant.",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const widgetStyle = {
    fontFamily,
    fontSize,
    "--primary-color": primaryColor,
    "--secondary-color": secondaryColor,
    "--border-radius": borderRadius,
    width: `${width}px`,
    height: isMinimized ? "auto" : `${height}px`,
  } as React.CSSProperties;

  return (
    <Card className="bg-white shadow-lg" style={widgetStyle}>
      {/* Widget Header */}
      <div
        className="flex items-center justify-between p-3 rounded-t-lg"
        style={{
          backgroundColor: headerColor,
          borderRadius: `${borderRadius} ${borderRadius} 0 0`,
        }}
      >
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={botAvatar} alt={botName} />
            <AvatarFallback>{botName.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <span className="font-medium text-white">{headerText}</span>
        </div>
        <div className="flex space-x-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-white hover:bg-white/20"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            {isMinimized ? (
              <MaximizeIcon size={14} />
            ) : (
              <MinimizeIcon size={14} />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-white hover:bg-white/20"
          >
            <XIcon size={14} />
          </Button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages Container */}
          <CardContent
            className="p-0 overflow-y-auto"
            style={{ height: "calc(100% - 110px)" }}
          >
            <div className="p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === "user"
                        ? "bg-primary text-white"
                        : "bg-secondary text-foreground"
                    }`}
                    style={{
                      backgroundColor:
                        message.sender === "user"
                          ? primaryColor
                          : secondaryColor,
                      color: message.sender === "user" ? "#fff" : "#000",
                      borderRadius,
                    }}
                  >
                    <p>{message.content}</p>
                    {showTimestamp && (
                      <div
                        className="text-xs mt-1 opacity-70"
                        style={{
                          textAlign:
                            message.sender === "user" ? "right" : "left",
                        }}
                      >
                        {formatTime(message.timestamp)}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>

          {/* Input Area */}
          <div className="p-3 border-t flex items-center gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={placeholderText}
              className="flex-1"
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <Button
              onClick={handleSendMessage}
              size="icon"
              style={{ backgroundColor: primaryColor }}
            >
              <SendIcon size={18} />
            </Button>
          </div>
        </>
      )}
    </Card>
  );
};

export default WidgetPreview;
