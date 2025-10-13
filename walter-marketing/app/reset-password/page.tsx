"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();

      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password/confirm`,
      });

      if (resetError) {
        throw resetError;
      }

      setSubmitted(true);
    } catch (error: any) {
      console.error('Reset password error:', error);
      setError(error.message || 'Failed to send reset link. Please try again.');
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
            Reset your password
          </h1>
          <p className="text-muted-foreground">
            Enter your email address and we'll send you a secure link to reset it.
          </p>
        </div>

        <div className="bg-card border rounded-2xl p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E2C379] focus:border-transparent"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isLoading}
                className="w-full bg-[#E2C379] hover:bg-[#E2C379]/90 text-[#2D2F33]"
              >
                {isLoading ? 'Sending...' : 'Send reset link'}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                <Link href="/login" className="text-foreground font-medium hover:text-[#E2C379]">
                  Back to login
                </Link>
              </p>
            </form>
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-[#E2C379]/20 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="h-8 w-8 text-[#E2C379]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-2">Check your email</h2>
              <p className="text-muted-foreground mb-6">
                We've sent a password reset link to <strong>{email}</strong>
              </p>
              <p className="text-xs text-muted-foreground">
                Password resets are valid for 24 hours.
              </p>
              <Button asChild variant="outline" className="mt-6 w-full">
                <Link href="/login">Back to login</Link>
              </Button>
            </div>
          )}

          <p className="text-xs text-muted-foreground text-center mt-6">
            Need help?{" "}
            <Link href="/support" className="underline hover:text-foreground">
              Contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
