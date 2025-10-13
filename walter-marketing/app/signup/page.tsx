"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    agreedToTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();

      // Create user account with Supabase Auth
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
          },
          emailRedirectTo: `${window.location.origin}/app`,
        },
      });

      if (signUpError) {
        throw signUpError;
      }

      // Sync user to Frappe LMS
      await fetch('/api/lms/sync-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      // Send welcome email
      await fetch('/api/emails/welcome', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
        }),
      });

      // Redirect to app
      window.location.href = '/app';
    } catch (error: any) {
      console.error('Signup error:', error);
      setError(error.message || 'There was an error creating your account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-serif font-bold tracking-tight inline-block mb-4">
            Camino
          </Link>
          <h1 className="text-3xl font-serif font-bold mb-2">
            Start your Camino
          </h1>
          <p className="text-muted-foreground">
            Guided reflection begins with a single step. Create your free account to start writing, saving your reflections, and discovering insights about yourself.
          </p>
        </div>

        <div className="bg-card border rounded-2xl p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name (optional)
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E2C379] focus:border-transparent"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E2C379] focus:border-transparent"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                required
                minLength={8}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E2C379] focus:border-transparent"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <p className="text-xs text-muted-foreground mt-1">
                Minimum 8 characters
              </p>
            </div>

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="terms"
                required
                className="mt-1"
                checked={formData.agreedToTerms}
                onChange={(e) =>
                  setFormData({ ...formData, agreedToTerms: e.target.checked })
                }
              />
              <label htmlFor="terms" className="text-sm text-muted-foreground">
                I agree to the{" "}
                <Link href="/legal/terms" className="text-foreground underline hover:text-[#E2C379]">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/legal/privacy" className="text-foreground underline hover:text-[#E2C379]">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={isLoading}
              className="w-full bg-[#E2C379] hover:bg-[#E2C379]/90 text-[#2D2F33]"
            >
              {isLoading ? 'Creating account...' : 'Create account'}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-foreground font-medium hover:text-[#E2C379]">
                Log in
              </Link>
            </p>
          </form>

          <p className="text-xs text-muted-foreground text-center mt-6">
            Your reflections are private, encrypted, and belong to you.
          </p>
        </div>
      </div>
    </div>
  );
}
