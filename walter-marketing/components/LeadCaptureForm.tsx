"use client";

import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Check, Loader2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LeadCaptureFormProps {
  source: string;
  variant?: "inline" | "card" | "minimal";
  showInterest?: boolean;
  className?: string;
  onSuccess?: () => void;
}

export default function LeadCaptureForm({
  source,
  variant = "inline",
  showInterest = true,
  className,
  onSuccess,
}: LeadCaptureFormProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [interest, setInterest] = useState("");
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  // Honeypot field for spam prevention
  const [honeypot, setHoneypot] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    // Honeypot check
    if (honeypot) {
      setError("Invalid submission");
      return;
    }

    // Validation
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    if (!consent) {
      setError("Please accept the privacy policy");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name: name.trim() || null,
          primary_interest: interest || null,
          source,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit");
      }

      setIsSuccess(true);

      // Track analytics if available
      if (typeof window !== "undefined" && (window as any).posthog) {
        (window as any).posthog.capture("lead_captured", {
          source,
          interest,
        });
      }

      // Call success callback
      onSuccess?.();

      // Reset form
      setEmail("");
      setName("");
      setInterest("");
      setConsent(false);

    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div
        className={cn(
          "rounded-lg border border-[#E2C379] bg-[#E2C379]/5 p-6 text-center",
          className
        )}
      >
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#E2C379]/20">
          <Check className="h-6 w-6 text-[#E2C379]" />
        </div>
        <h3 className="mb-2 text-lg font-semibold">Welcome to Camino!</h3>
        <p className="text-sm text-muted-foreground">
          Check your email to get started on your transformation journey.
        </p>
      </div>
    );
  }

  const isCard = variant === "card";
  const isMinimal = variant === "minimal";

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "space-y-4",
        isCard && "rounded-2xl border bg-card p-6 shadow-sm",
        className
      )}
    >
      {/* Honeypot field - hidden from users */}
      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        className="absolute left-[-9999px]"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      {isCard && (
        <div className="text-center">
          <h3 className="text-xl font-bold mb-2">Start Your Journey</h3>
          <p className="text-sm text-muted-foreground">
            Join thousands on the path to clarity and purpose
          </p>
        </div>
      )}

      <div className="space-y-3">
        {/* Email */}
        <div>
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            disabled={isSubmitting}
            className={cn(
              "w-full rounded-md border border-input bg-background px-4 py-2 text-sm transition-colors",
              "placeholder:text-muted-foreground",
              "focus:outline-none focus:ring-2 focus:ring-[#E2C379] focus:border-transparent",
              "disabled:cursor-not-allowed disabled:opacity-50"
            )}
            aria-label="Email address"
          />
        </div>

        {/* Name - Optional */}
        {!isMinimal && (
          <div>
            <label htmlFor="name" className="sr-only">
              Name (optional)
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name (optional)"
              disabled={isSubmitting}
              className={cn(
                "w-full rounded-md border border-input bg-background px-4 py-2 text-sm transition-colors",
                "placeholder:text-muted-foreground",
                "focus:outline-none focus:ring-2 focus:ring-[#E2C379] focus:border-transparent",
                "disabled:cursor-not-allowed disabled:opacity-50"
              )}
              aria-label="Name (optional)"
            />
          </div>
        )}

        {/* Primary Interest */}
        {showInterest && !isMinimal && (
          <div>
            <label htmlFor="interest" className="sr-only">
              What interests you most?
            </label>
            <select
              id="interest"
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              disabled={isSubmitting}
              className={cn(
                "w-full rounded-md border border-input bg-background px-4 py-2 text-sm transition-colors",
                "focus:outline-none focus:ring-2 focus:ring-[#E2C379] focus:border-transparent",
                "disabled:cursor-not-allowed disabled:opacity-50",
                !interest && "text-muted-foreground"
              )}
              aria-label="Primary interest"
            >
              <option value="">What interests you most?</option>
              <option value="identity">Identity - Understanding myself</option>
              <option value="worldview">Worldview - How I see the world</option>
              <option value="relationships">Relationships - Connection with others</option>
            </select>
          </div>
        )}

        {/* Privacy Consent */}
        <div className="flex items-start gap-2">
          <input
            id="consent"
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            disabled={isSubmitting}
            required
            className={cn(
              "mt-1 h-4 w-4 rounded border-input text-[#E2C379] transition-colors",
              "focus:ring-2 focus:ring-[#E2C379] focus:ring-offset-2",
              "disabled:cursor-not-allowed disabled:opacity-50"
            )}
            aria-label="Privacy consent"
          />
          <label htmlFor="consent" className="text-xs text-muted-foreground">
            I agree to receive emails from Camino and accept the{" "}
            <a
              href="/legal/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground"
            >
              privacy policy
            </a>
            . Unsubscribe anytime.
          </label>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-start gap-2 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#E2C379] hover:bg-[#E2C379]/90 text-[#2D2F33] font-semibold"
        size="lg"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Start Your Journey"
        )}
      </Button>

      {/* Trust Indicators */}
      {isCard && (
        <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground pt-2">
          <div className="flex items-center gap-1">
            <Check className="h-3 w-3 text-[#E2C379]" />
            <span>No spam</span>
          </div>
          <div className="flex items-center gap-1">
            <Check className="h-3 w-3 text-[#E2C379]" />
            <span>Unsubscribe anytime</span>
          </div>
          <div className="flex items-center gap-1">
            <Check className="h-3 w-3 text-[#E2C379]" />
            <span>Privacy first</span>
          </div>
        </div>
      )}
    </form>
  );
}
