import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  MessageSquare,
  Brain,
  BarChart3,
  Code,
  CheckCircle,
  Zap,
  Shield,
  Users,
  Bell,
  User,
  MessageCircle,
  Clock,
  Send,
  X as XIcon,
  Menu as MenuIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import LiveChatDemo from "./LiveChatDemo";

// Chat message type
interface ChatMessage {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Demo conversation data
const demoConversation: ChatMessage[] = [
  {
    id: 1,
    role: "user",
    content: "Hi there! I'm interested in adding a chat widget to my e-commerce website. Can you help?",
    timestamp: new Date(),
  },
  {
    id: 2,
    role: "assistant",
    content: "Hello! I'd be happy to help you set up a chat widget for your e-commerce site. Our AI-powered widgets can help answer customer questions, provide product recommendations, and assist with checkout.",
    timestamp: new Date(),
  },
  {
    id: 3,
    role: "user",
    content: "That sounds great. How difficult is it to set up?",
    timestamp: new Date(),
  },
  {
    id: 4,
    role: "assistant",
    content: "It's very simple! You can create a custom widget in our dashboard in just a few minutes. Then you'll get a small code snippet to add to your website. No coding experience required.",
    timestamp: new Date(),
  },
  {
    id: 5,
    role: "user",
    content: "Can I customize how it looks to match my brand?",
    timestamp: new Date(),
  },
  {
    id: 6,
    role: "assistant",
    content: "Absolutely! You can customize colors, fonts, icons, and the overall appearance to match your brand perfectly. You can also choose between different widget styles like a chat bubble, sidebar, or full-page chat.",
    timestamp: new Date(),
  },
];

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showChatDemo, setShowChatDemo] = useState(false);

  const features = [
    {
      icon: <MessageSquare className="h-6 w-6 text-primary" />,
      title: "AI Chat Widgets",
      description:
        "Create customizable chat widgets powered by advanced AI models for your website or application.",
    },
    {
      icon: <Brain className="h-6 w-6 text-primary" />,
      title: "Multiple AI Models",
      description:
        "Connect to various AI models including GPT-4, Claude, and more to power your chat experiences.",
    },
    {
      icon: <Code className="h-6 w-6 text-primary" />,
      title: "Easy Integration",
      description:
        "Simple integration with any website or application using our JavaScript snippet or API.",
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-primary" />,
      title: "Analytics & Insights",
      description:
        "Track performance, user engagement, and conversation quality with detailed analytics.",
    },
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: "Secure & Compliant",
      description:
        "Enterprise-grade security with data encryption and compliance with privacy regulations.",
    },
    {
      icon: <Zap className="h-6 w-6 text-primary" />,
      title: "Fast & Responsive",
      description:
        "Optimized for speed and responsiveness across all devices and platforms.",
    },
  ];

  return (
    <ThemeProvider>
      <div className="flex min-h-screen flex-col bg-background">
        {/* Header */}
        <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">emedAIChat</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link to="#features" className="text-sm font-medium hover:text-primary">
                Features
              </Link>
              <Link to="#pricing" className="text-sm font-medium hover:text-primary">
                Pricing
              </Link>
              <Link to="#faq" className="text-sm font-medium hover:text-primary">
                FAQ
              </Link>
              <Link to="/contact" className="text-sm font-medium hover:text-primary">
                Contact
              </Link>
            </nav>

            <div className="flex items-center gap-4">
              <ThemeToggle />
              <div className="hidden md:flex gap-2">
                <Link to="/login">
                  <Button variant="outline">Log In</Button>
                </Link>
                <Link to="/register">
                  <Button>Sign Up</Button>
                </Link>
              </div>

              {/* Mobile menu button */}
              <button
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <XIcon className="h-6 w-6" />
                ) : (
                  <MenuIcon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t p-4">
              <nav className="flex flex-col space-y-4">
                <Link
                  to="#features"
                  className="text-sm font-medium hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Features
                </Link>
                <Link
                  to="#pricing"
                  className="text-sm font-medium hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Pricing
                </Link>
                <Link
                  to="#faq"
                  className="text-sm font-medium hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  FAQ
                </Link>
                <Link
                  to="/contact"
                  className="text-sm font-medium hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
                <div className="flex items-center justify-between pt-4 pb-2">
                  <div className="text-sm font-medium">Theme</div>
                  <ThemeToggle />
                </div>
                <div className="flex gap-2 pt-2">
                  <Link to="/login" className="flex-1">
                    <Button variant="outline" className="w-full" onClick={() => setIsMenuOpen(false)}>
                      Log In
                    </Button>
                  </Link>
                  <Link to="/register" className="flex-1">
                    <Button className="w-full" onClick={() => setIsMenuOpen(false)}>
                      Sign Up
                    </Button>
                  </Link>
                </div>
              </nav>
            </div>
          )}
        </header>

        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute -top-[40%] -right-[30%] w-[80%] h-[80%] rounded-full bg-primary/5 blur-3xl"></div>
            <div className="absolute -bottom-[40%] -left-[30%] w-[80%] h-[80%] rounded-full bg-primary/5 blur-3xl"></div>
            <div className="absolute top-[20%] left-[10%] w-2 h-2 rounded-full bg-primary animate-ping"></div>
            <div className="absolute top-[60%] right-[20%] w-2 h-2 rounded-full bg-primary animate-ping" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-[30%] left-[50%] w-2 h-2 rounded-full bg-primary animate-ping" style={{ animationDelay: '2s' }}></div>
          </div>

          <div className="container py-20 md:py-32 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left side: Hero content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center lg:text-left"
              >
                <div className="inline-block mb-6">
                  <motion.div
                    className="px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium flex items-center gap-2"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    Introducing emedAIChat — AI-powered customer support
                  </motion.div>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                  Create Intelligent AI Chat Widgets
                </h1>
                <p className="text-xl text-muted-foreground mb-10 max-w-2xl lg:max-w-none mx-auto">
                  Build, customize, and deploy AI-powered chat widgets that engage your users and provide instant support.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link to="/register">
                    <Button size="lg" className="gap-2 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary">
                      Get Started <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => setShowChatDemo(true)}
                    className="border-primary/20 hover:border-primary/40 hover:bg-primary/5"
                  >
                    View Demo
                  </Button>
                </div>

                {/* Dashboard Preview (Mobile Only) */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="mt-16 w-full max-w-md mx-auto lg:hidden"
                >
                  <div className="relative rounded-xl overflow-hidden border shadow-xl">
                    <div className="bg-background p-4 rounded-xl border">
                      <div className="flex items-center justify-between mb-4 p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                            <MessageSquare className="h-4 w-4" />
                          </div>
                          <div className="font-semibold">emedAIChat</div>
                        </div>
                      </div>

                      <div className="space-y-3 p-2">
                        <div className="flex justify-end">
                          <div className="bg-primary text-primary-foreground p-3 rounded-lg rounded-tr-none max-w-[80%]">
                            <p className="text-sm">How can I integrate your chat widget with my embedded system?</p>
                          </div>
                        </div>
                        <div className="flex justify-start">
                          <div className="bg-muted p-3 rounded-lg rounded-tl-none max-w-[80%]">
                            <p className="text-sm">Our API supports integration with embedded systems. You'll need to use our REST API or WebSocket connection.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right side: Live Chat Demo */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="hidden lg:block"
              >
                {showChatDemo ? (
                  <div className="w-full max-w-md bg-background border rounded-xl shadow-lg overflow-hidden">
                    {/* Chat Header */}
                    <div className="bg-blue-600 text-white p-3 flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-sm font-medium">AI Assistant</span>
                      </div>
                      <button
                        onClick={() => setShowChatDemo(false)}
                        className="text-white/80 hover:text-white"
                      >
                        <XIcon className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Chat Messages */}
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
                      </div>
                    </div>

                    {/* Chat Input */}
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
                ) : (
                  <LiveChatDemo />
                )}
              </motion.div>
            </div>
          </div>
        </section>
      </div>


    </ThemeProvider>
  );
}
