import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-serif font-bold tracking-tight">
            Camino
          </Link>
          <Button asChild variant="ghost" size="sm">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </nav>

      {/* Content */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <h1 className="text-4xl font-serif font-bold mb-4">Terms of Service</h1>
            <p className="text-sm text-muted-foreground mb-12">Effective Date: October 2025</p>

            <h2>1. Agreement</h2>
            <p>
              By creating an account or using Camino, you agree to these terms.
            </p>

            <h2>2. Eligibility</h2>
            <p>
              You must be 18 or older to use Camino's paid services.
            </p>

            <h2>3. Subscriptions & Billing</h2>
            <ul>
              <li>Monthly subscriptions renew automatically.</li>
              <li>Cancel anytime from your profile.</li>
              <li>Refunds are handled on a case-by-case basis.</li>
            </ul>

            <h2>4. Intellectual Property</h2>
            <p>
              All Camino content, including prompts, modules, and visuals, are property of Camino.
              You may not reproduce or resell materials without permission.
            </p>

            <h2>5. User Conduct</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Misuse Camino's platform.</li>
              <li>Attempt to access other users' data.</li>
              <li>Use Camino for illegal or harmful activity.</li>
            </ul>

            <h2>6. Disclaimers</h2>
            <p>
              Camino is not a substitute for therapy or medical advice. It is a reflective tool designed
              for personal growth and development.
            </p>

            <h2>7. Limitation of Liability</h2>
            <p>
              Camino and its team are not liable for indirect, incidental, or consequential damages
              arising from your use of the app.
            </p>

            <h2>8. Contact</h2>
            <p>
              For support or questions about these terms: <a href="mailto:support@camino.app" className="text-[#E2C379] hover:underline">support@camino.app</a>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 bg-card mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Camino
          </p>
        </div>
      </footer>
    </div>
  );
}
