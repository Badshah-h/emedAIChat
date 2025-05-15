import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Eye, EyeOff, UserPlus, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "Name is required" })
      .min(2, { message: "Name must be at least 2 characters" }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
      .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
      .regex(/[0-9]/, { message: "Password must contain at least one number" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password" }),
    terms: z
      .boolean()
      .refine((val) => val === true, { message: "You must accept the terms and conditions" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Type for the form values
type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Initialize form with react-hook-form and zod validation
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
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
  const onSubmit = (data: RegisterFormValues) => {
    // In a real app, you would call an API here
    console.log("Registration data:", data);

    // For demo purposes, show error toast for specific email
    if (data.email === "taken@example.com") {
      toast({
        title: "Registration failed",
        description: "This email address is already registered. Please use a different email or try logging in.",
        variant: "destructive",
        className: "bg-red-500 text-white border-red-600",
      });
      return;
    }

    // Show success toast
    toast({
      title: "Registration successful",
      description: "Your account has been created successfully.",
      variant: "default",
      className: "bg-green-500 text-white border-green-600",
    });

    // Redirect to login
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <ThemeProvider>
      <div className="flex min-h-screen bg-background">
        {/* Left column - Registration form */}
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
              <h1 className="text-3xl font-bold tracking-tight mb-2">Create an account</h1>
              <p className="text-muted-foreground">Enter your information to get started</p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 bg-card rounded-lg p-6 shadow-sm border border-border/50">
                <div className="bg-primary/5 -mx-6 -mt-6 mb-6 p-4 rounded-t-lg border-b border-border/30">
                  <h3 className="font-medium text-primary">Create Your Account</h3>
                  <p className="text-xs text-muted-foreground mt-1">Fill in your details to get started</p>
                </div>

                <div className="grid grid-cols-1 gap-5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="bg-background/50 p-3 rounded-md border border-input/30 shadow-sm">
                        <FormLabel className="text-sm font-medium">Full Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="John Doe"
                            autoComplete="name"
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                              autoComplete="new-password"
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

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem className="bg-background/50 p-3 rounded-md border border-input/30 shadow-sm">
                        <FormLabel className="text-sm font-medium">Confirm Password</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input
                              placeholder="••••••••"
                              type={showConfirmPassword ? "text" : "password"}
                              autoComplete="new-password"
                              className="border-input/50 focus:border-primary/50 bg-card/50"
                              {...field}
                            />
                          </FormControl>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-9 w-9"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                            <span className="sr-only">
                              {showConfirmPassword ? "Hide password" : "Show password"}
                            </span>
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 border border-input/30 bg-muted/20 shadow-sm">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="border-primary/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          I agree to the{" "}
                          <Link
                            to="/terms"
                            className="text-primary hover:underline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            terms of service
                          </Link>{" "}
                          and{" "}
                          <Link
                            to="/privacy"
                            className="text-primary hover:underline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            privacy policy
                          </Link>
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

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
                    <UserPlus className="mr-2 h-4 w-4" /> Create Account
                  </Button>
                </div>
              </form>
            </Form>

            <div className="mt-6 text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-primary hover:underline">
                Sign in
              </Link>
            </div>
          </div>
        </div>

        {/* Right column - Illustration/branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/70 to-primary/90 text-primary-foreground">
          <div className="flex flex-col justify-center items-center w-full p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-md text-center"
            >
              <div className="flex justify-center mb-8">
                <div className="rounded-full bg-primary-foreground/20 p-6">
                  <CheckCircle className="h-12 w-12" />
                </div>
              </div>
              <h2 className="text-3xl font-bold mb-4">Join emedAIChat Today</h2>
              <p className="text-primary-foreground/80 mb-8">
                Create your account to start building AI-powered chat widgets for your website.
                Enhance customer support and engagement with intelligent conversations.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-primary-foreground/10 rounded-lg p-4 text-left">
                  <CheckCircle className="h-5 w-5 mb-2" />
                  <h3 className="font-medium mb-1">Easy Integration</h3>
                  <p className="text-sm text-primary-foreground/70">Simple code snippet for any website</p>
                </div>
                <div className="bg-primary-foreground/10 rounded-lg p-4 text-left">
                  <CheckCircle className="h-5 w-5 mb-2" />
                  <h3 className="font-medium mb-1">AI-Powered</h3>
                  <p className="text-sm text-primary-foreground/70">Advanced models for natural conversations</p>
                </div>
                <div className="bg-primary-foreground/10 rounded-lg p-4 text-left">
                  <CheckCircle className="h-5 w-5 mb-2" />
                  <h3 className="font-medium mb-1">Customizable</h3>
                  <p className="text-sm text-primary-foreground/70">Match your brand and requirements</p>
                </div>
                <div className="bg-primary-foreground/10 rounded-lg p-4 text-left">
                  <CheckCircle className="h-5 w-5 mb-2" />
                  <h3 className="font-medium mb-1">Analytics</h3>
                  <p className="text-sm text-primary-foreground/70">Track performance and engagement</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
