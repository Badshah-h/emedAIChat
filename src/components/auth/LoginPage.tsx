import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Eye, EyeOff, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { ThemeToggle } from "@/components/ui/theme-toggle";

// Define the form schema with Zod
const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" }),
  rememberMe: z.boolean().optional(),
});

// Type for the form values
type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // Initialize form with react-hook-form and zod validation
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    mode: "onChange", // Validate on change for real-time feedback
  });

  // Helper function to show field validation errors in toast
  const showValidationErrors = () => {
    const errors = form.formState.errors;
    if (Object.keys(errors).length > 0) {
      const errorMessages = Object.values(errors)
        .map(error => error?.message)
        .filter(Boolean)
        .join('\n');

      toast({
        title: "Validation Error",
        description: errorMessages,
        variant: "destructive",
        className: "bg-red-500 text-white border-red-600",
      });
    }
  };

  // Handle form submission
  const onSubmit = (data: LoginFormValues) => {
    // In a real app, you would call an API here
    console.log("Login data:", data);

    // For demo purposes, show error toast for specific email
    if (data.email === "error@example.com") {
      toast({
        title: "Login failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
        className: "bg-red-500 text-white border-red-600",
      });
      return;
    }

    // Show success toast
    toast({
      title: "Login successful",
      description: "You have been logged in successfully.",
      variant: "default",
      className: "bg-green-500 text-white border-green-600",
    });

    // Redirect to dashboard
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <ThemeProvider>
      <div className="flex min-h-screen bg-background">
        {/* Left column - Login form */}
        <div className="flex flex-col w-full lg:w-1/2 p-4 sm:p-6 lg:p-10">
          <div className="flex justify-between items-center mb-8">
            <Link
              to="/"
              className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            <ThemeToggle />
          </div>

          <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome back</h1>
              <p className="text-muted-foreground">Enter your credentials to access your account</p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-card rounded-lg p-6 shadow-sm border border-border/50">
                <div className="bg-primary/5 -mx-6 -mt-6 mb-6 p-4 rounded-t-lg border-b border-border/30">
                  <h3 className="font-medium text-primary">Account Access</h3>
                  <p className="text-xs text-muted-foreground mt-1">Enter your credentials below</p>
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="bg-background/50 p-3 rounded-md border border-input/30 shadow-sm">
                      <FormLabel className="text-sm font-medium">Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="you@example.com"
                          type="email"
                          autoComplete="email"
                          className="border-input/50 focus:border-primary/50 bg-card/50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="bg-background/50 p-3 rounded-md border border-input/30 shadow-sm">
                      <FormLabel className="text-sm font-medium">Password</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            placeholder="••••••••"
                            type={showPassword ? "text" : "password"}
                            autoComplete="current-password"
                            className="border-input/50 focus:border-primary/50 bg-card/50"
                            {...field}
                          />
                        </FormControl>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-9 w-9"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                          <span className="sr-only">
                            {showPassword ? "Hide password" : "Show password"}
                          </span>
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-md">
                  <FormField
                    control={form.control}
                    name="rememberMe"
                    render={({ field }) => (
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="rememberMe"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="border-primary/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                        />
                        <Label
                          htmlFor="rememberMe"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Remember me
                        </Label>
                      </div>
                    )}
                  />

                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-md"
                    size="lg"
                    onClick={() => {
                      if (Object.keys(form.formState.errors).length > 0) {
                        showValidationErrors();
                      }
                    }}
                  >
                    <LogIn className="mr-2 h-4 w-4" /> Sign In
                  </Button>
                </div>
              </form>
            </Form>

            <div className="mt-6 text-center text-sm">
              Don't have an account?{" "}
              <Link to="/register" className="font-medium text-primary hover:underline">
                Create an account
              </Link>
            </div>
          </div>
        </div>

        {/* Right column - Illustration/branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/90 to-primary/70 text-primary-foreground">
          <div className="flex flex-col justify-center items-center w-full p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-md text-center"
            >
              <div className="flex justify-center mb-8">
                <div className="rounded-full bg-primary-foreground/20 p-6">
                  <LogIn className="h-12 w-12" />
                </div>
              </div>
              <h2 className="text-3xl font-bold mb-4">Secure Access to emedAIChat</h2>
              <p className="text-primary-foreground/80 mb-8">
                Log in to access your AI chat widgets, analytics, and customization options.
                Build intelligent conversational experiences for your users.
              </p>
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-primary-foreground/10 rounded-lg p-4">
                    <div className="aspect-square rounded-md bg-primary-foreground/20 mb-3"></div>
                    <div className="h-2 bg-primary-foreground/20 rounded-full mb-2"></div>
                    <div className="h-2 bg-primary-foreground/20 rounded-full w-2/3"></div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
