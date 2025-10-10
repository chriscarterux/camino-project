import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function BookingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-serif font-bold">
            Walter
          </Link>
          <Button asChild variant="outline" size="sm">
            <Link href="/pricing">Back to Pricing</Link>
          </Button>
        </div>
      </nav>

      {/* Booking Content */}
      <section className="container mx-auto px-4 py-16 flex-grow">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Book Your Coaching Consultation
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Schedule a 30-minute call with a Walter coach to discuss the Mastery tier
            and life architecture sessions.
          </p>

          {/* Cal.com Embed Placeholder */}
          <div className="border rounded-lg p-8 bg-muted/30 min-h-[600px] flex items-center justify-center">
            <div className="text-center max-w-md">
              <h2 className="text-2xl font-bold mb-4">
                Calendar Integration Ready
              </h2>
              <p className="text-muted-foreground mb-6">
                Embed Cal.com or Calendly widget here for direct booking.
              </p>
              <div className="space-y-4">
                <h3 className="font-bold text-lg">Setup Instructions:</h3>
                <ol className="text-left text-sm space-y-2">
                  <li>
                    1. Create account at{" "}
                    <a
                      href="https://cal.com"
                      target="_blank"
                      className="underline"
                    >
                      cal.com
                    </a>
                  </li>
                  <li>2. Set up your coaching calendar</li>
                  <li>3. Get embed code</li>
                  <li>
                    4. Replace this div with:
                    <pre className="bg-background p-2 rounded mt-2 text-xs overflow-x-auto">
                      {`<Cal
  calLink="walter/consultation"
  config={{theme: "light"}}
/>`}
                    </pre>
                  </li>
                </ol>
              </div>
              <Button asChild className="mt-6">
                <a
                  href="mailto:hello@walter.app?subject=Mastery Consultation"
                >
                  Or Email Us Directly
                </a>
              </Button>
            </div>
          </div>

          {/* What to Expect */}
          <div className="mt-12 space-y-6">
            <h2 className="text-2xl font-bold">What to Expect</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="border rounded-lg p-6">
                <h3 className="font-bold mb-2">Before the Call</h3>
                <p className="text-sm text-muted-foreground">
                  Complete a brief intake form about your goals and current challenges.
                </p>
              </div>
              <div className="border rounded-lg p-6">
                <h3 className="font-bold mb-2">During the Call</h3>
                <p className="text-sm text-muted-foreground">
                  Discuss your vision, explore the Mastery program, and see if it's the right fit.
                </p>
              </div>
              <div className="border rounded-lg p-6">
                <h3 className="font-bold mb-2">After the Call</h3>
                <p className="text-sm text-muted-foreground">
                  Receive a custom proposal and next steps to begin your transformation journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-muted-foreground">
            © 2025 Walter. Built with intention for those who seek clarity.
          </p>
        </div>
      </footer>
    </div>
  );
}
