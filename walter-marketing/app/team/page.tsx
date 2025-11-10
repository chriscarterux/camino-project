"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Linkedin, Mail } from "lucide-react";

const teamMembers = [
  {
    name: "Jon Carter",
    role: "Co-Founder & Lead Coach",
    credentials: "ADHD + Autism",
    bio: "Jon brings lived experience with ADHD and autism to create coaching frameworks that actually work for neurodivergent minds. With a background in systems thinking and personal development, he specializes in helping neurodivergent individuals design lives that work with their brains, not against them.",
    focus: "Neurodivergent Life Design, Career Clarity",
    image: "/team/jon-carter.jpg",
    linkedin: "https://linkedin.com/in/joncarter",
    email: "jon@camino.app",
  },
  {
    name: "Dr. Christopher Walter",
    role: "Co-Founder & Clinical Director",
    credentials: "PhD in Psychology",
    bio: "Dr. Walter combines clinical expertise with a passion for making psychological insights accessible. With a PhD in Psychology and years of therapeutic practice, he brings evidence-based frameworks to personal growth. His approach bridges the gap between academic psychology and practical self-development.",
    focus: "Relationship Intelligence, Emotional Wellness",
    image: "/team/christopher-walter.jpg",
    linkedin: "https://linkedin.com/in/christopherwalter",
    email: "walter@camino.app",
  },
  {
    name: "Christopher Carter",
    role: "Co-Founder & Technology Lead",
    credentials: "17 years software engineering",
    bio: "Christopher has spent 17 years building products that solve real human problems. As a software engineer turned product builder, he focuses on creating technology that enhances rather than replaces human connection. His expertise lies in translating complex personal growth frameworks into intuitive digital experiences.",
    focus: "Product & Technology",
    image: "/team/christopher-carter.jpg",
    linkedin: "https://linkedin.com/in/howdycarter",
    email: "christopher@camino.app",
  },
];

export default function TeamPage() {
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
          <div className="hidden md:flex gap-8 items-center">
            <Link href="/how-it-works" className="text-sm font-medium hover:text-foreground/80 transition-colors">
              How it works
            </Link>
            <Link href="/pricing" className="text-sm font-medium hover:text-foreground/80 transition-colors">
              Pricing
            </Link>
            <Link href="/team" className="text-sm font-medium hover:text-foreground/80 transition-colors">
              Team
            </Link>
            <Link href="/essays" className="text-sm font-medium hover:text-foreground/80 transition-colors">
              Essays
            </Link>
          </div>
          <div className="flex gap-3 items-center">
            <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
              <Link href={process.env.NEXT_PUBLIC_LMS_URL || "http://lms.localhost:8000/lms"}>Sign In</Link>
            </Button>
            <Button asChild size="sm" className="bg-[#E2C379] hover:bg-[#E2C379]/90 text-[#2D2F33]">
              <Link href="#waitlist">Join Waitlist</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-16 md:py-20 border-b bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Meet the Team
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              We're builders, coaches, and lifelong learners committed to making personal growth accessible and effective.
            </p>
            <p className="text-lg text-muted-foreground">
              Our diverse backgrounds in psychology, neurodivergence, and technology come together to create tools that actually work for real people.
            </p>
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-16">
            {teamMembers.map((member, index) => (
              <div
                key={member.name}
                className={`flex flex-col ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } gap-8 md:gap-12 items-center md:items-start`}
              >
                {/* Photo */}
                <div className="flex-shrink-0">
                  <div className="w-48 h-48 md:w-64 md:h-64 rounded-2xl bg-muted overflow-hidden">
                    {/* Placeholder for team photo */}
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#E2C379]/20 to-[#2D2F33]/5">
                      <div className="text-center">
                        <div className="text-4xl md:text-5xl font-serif font-bold text-[#E2C379] mb-2">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="text-xs text-muted-foreground">Photo coming soon</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div className="flex-1">
                  <h2 className="text-3xl font-serif font-bold mb-2">{member.name}</h2>
                  <p className="text-lg font-medium text-[#E2C379] mb-1">{member.role}</p>
                  <p className="text-sm text-muted-foreground mb-4">{member.credentials}</p>

                  <p className="text-base text-muted-foreground mb-4 leading-relaxed">
                    {member.bio}
                  </p>

                  <div className="mb-4">
                    <p className="text-sm font-semibold mb-1">Focus Areas:</p>
                    <p className="text-sm text-muted-foreground">{member.focus}</p>
                  </div>

                  {/* Contact */}
                  <div className="flex gap-3">
                    <Button asChild variant="outline" size="sm">
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-4 w-4 mr-2" />
                        LinkedIn
                      </a>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <a href={`mailto:${member.email}`}>
                        <Mail className="h-4 w-4 mr-2" />
                        Email
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 md:py-20 border-t bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8 text-center">
              Our Mission & Values
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-card border rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3">Human-First Technology</h3>
                <p className="text-muted-foreground">
                  We believe technology should enhance human connection and growth, not replace it. Every feature we build starts with real human needs.
                </p>
              </div>

              <div className="bg-card border rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3">Evidence-Based Methods</h3>
                <p className="text-muted-foreground">
                  Our frameworks are grounded in psychological research and validated through real-world coaching experience, not pop psychology trends.
                </p>
              </div>

              <div className="bg-card border rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3">Neurodiversity Awareness</h3>
                <p className="text-muted-foreground">
                  We design for different minds, not just neurotypical ones. Our tools work with your brain, not against it.
                </p>
              </div>

              <div className="bg-card border rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3">Privacy & Ownership</h3>
                <p className="text-muted-foreground">
                  Your reflections and insights belong to you. We never share, sell, or use your data to train external AI systems.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 border-t" id="waitlist">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Work With Us
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join the waitlist to be first to access Camino when we launch in Q1 2026.
            </p>
            <Button asChild size="lg" className="bg-[#E2C379] hover:bg-[#E2C379]/90 text-[#2D2F33]">
              <Link href="/">Join Waitlist</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 md:py-16 bg-card mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12">
            <div className="md:col-span-1">
              <Link href="/" className="inline-block mb-4">
                <Image
                  src="/camino-logo.svg"
                  alt="Camino"
                  width={100}
                  height={32}
                />
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Context engineering for personalized AI.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-sm">Product</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
                    How it works
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-sm">Company</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/team" className="text-muted-foreground hover:text-foreground transition-colors">
                    Team
                  </Link>
                </li>
                <li>
                  <Link href="/essays" className="text-muted-foreground hover:text-foreground transition-colors">
                    Essays
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-sm">Legal</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/legal/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/legal/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © 2025 Camino
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
