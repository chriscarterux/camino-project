import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/camino-logo.svg"
              alt="Camino"
              width={120}
              height={40}
              priority
            />
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
            <h1 className="text-4xl font-serif font-bold mb-4">Privacy Policy</h1>
            <p className="text-sm text-muted-foreground mb-12">Last updated: October 2025</p>

            <h2>1. Overview</h2>
            <p>
              Camino values your privacy. Your reflections, insights, and data are encrypted and never shared or sold.
              This policy explains how we collect, use, and protect your information.
            </p>

            <h2>2. Information We Collect</h2>
            <ul>
              <li><strong>Account Data:</strong> Name, email, password (hashed).</li>
              <li><strong>Reflection Data:</strong> Journal entries and insights generated through the app.</li>
              <li><strong>Usage Data:</strong> Basic analytics (page views, clicks, device type) to improve experience.</li>
            </ul>

            <h2>3. How We Use Your Data</h2>
            <ul>
              <li>To deliver and improve the Camino experience.</li>
              <li>To provide AI-generated insights based on your reflections.</li>
              <li>To manage your account, billing, and support requests.</li>
            </ul>

            <h2>4. Data Ownership</h2>
            <p>
              You own your reflections. Camino simply provides the tools to store and process them securely.
            </p>

            <h2>5. AI Processing</h2>
            <p>
              AI is used only to generate insights for your personal account. No reflections are shared externally
              or used for training external AI systems.
            </p>

            <h2>6. Data Storage & Security</h2>
            <p>
              All data is encrypted in transit and at rest using Supabase's secure infrastructure.
            </p>

            <h2>7. Your Rights</h2>
            <p>You may:</p>
            <ul>
              <li>Export your data (.txt, .json, or .pdf)</li>
              <li>Delete your account and all data</li>
              <li>Opt out of AI summaries</li>
            </ul>

            <h2>8. Contact</h2>
            <p>
              For privacy inquiries: <a href="mailto:privacy@camino.app" className="text-[#E2C379] hover:underline">privacy@camino.app</a>
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
