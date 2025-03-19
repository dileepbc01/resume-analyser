"use client";

import { useAuth } from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { useForm } from "react-hook-form";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// TODO: split the comps
export default function SignInPage() {
  const { loginMutation } = useAuth();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    loginMutation.mutate({
      email: values.email,
      password: values.password,
    });
  }

  const handleGoogleSignIn = () => {
    // Implement Google OAuth sign-in logic here
    // This would typically redirect to your OAuth endpoint
    window.location.href = "/api/auth/google";
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="w-full max-w-md px-4">
        <Card className="border-0 shadow-lg dark:bg-slate-800">
          <CardHeader className="space-y-1 pb-2 pt-6">
            <div className="mb-4 flex justify-center">
              <Image src="/app-logo.png" alt="App Logo" className="h-16 w-auto" width={64} height={64} />
            </div>
            <h1 className="text-center text-2xl font-bold tracking-tight">Welcome back</h1>
            <p className="text-muted-foreground text-center text-sm">
              Enter your credentials to access your account
            </p>
          </CardHeader>
          <CardContent className="pt-4">
            <Form {...form}>
              {loginMutation.isError ? (
                <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-500 dark:bg-red-900/30">
                  {loginMutation.error.response.data.message}
                </div>
              ) : null}

              <Button
                type="button"
                variant="outline"
                className="mb-4 flex h-11 w-full items-center justify-center gap-2 font-medium"
                onClick={handleGoogleSignIn}>
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Sign in with Google
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="text-muted-foreground bg-white px-2 dark:bg-slate-800">
                    Or continue with
                  </span>
                </div>
              </div>

              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="email@example.com" {...field} className="h-11" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel>Password</FormLabel>
                        <a href="/forgot-password" className="text-primary text-xs hover:underline">
                          Forgot password?
                        </a>
                      </div>
                      <FormControl>
                        <Input type="password" placeholder="••••••" {...field} className="h-11" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="h-11 w-full font-medium shadow-sm"
                  disabled={loginMutation.isLoading}>
                  {loginMutation.isLoading ? (
                    <>
                      <svg
                        className="mr-2 h-4 w-4 animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </>
                  ) : (
                    "Sign in"
                  )}
                </Button>
                <div className="mt-4 text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <a href="/signup" className="text-primary hover:underline">
                    Create an account
                  </a>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
