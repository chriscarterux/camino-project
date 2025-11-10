"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Download, FileText, Video, BookOpen, Headphones } from "lucide-react";
import { useState } from "react";

// Resource categories
const categories = [
  { id: "all", name: "All Resources" },
  { id: "frameworks", name: "Frameworks" },
  { id: "guides", name: "Guides" },
  { id: "videos", name: "Videos" },
  { id: "podcasts", name: "Podcasts" },
];

// Sample resources
const resources = [
  {
    id: 1,
    title: "Life Model Framework Overview",
    description: "Comprehensive guide to the 5-phase Life Model Framework for personal growth and AI integration.",
    category: "frameworks",
    type: "PDF",
    icon: FileText,
    downloadUrl: "/downloads/life-model-framework.pdf",
  },
  {
    id: 2,
    title: "Context Engineering Starter Guide",
    description: "Learn how to build effective context for personalized AI interactions. Perfect for beginners.",
    category: "guides",
    type: "PDF",
    icon: FileText,
    downloadUrl: "/downloads/context-engineering-guide.pdf",
  },
  {
    id: 3,
    title: "Neurodivergent Productivity Framework",
    description: "Evidence-based strategies for ADHD and autism that work with your brain, not against it.",
    category: "frameworks",
    type: "PDF",
    icon: FileText,
    downloadUrl: "/downloads/neurodivergent-framework.pdf",
  },
  {
    id: 4,
    title: "AI-Powered Reflection Techniques",
    description: "Video walkthrough of using AI to enhance self-reflection and insight discovery.",
    category: "videos",
    type: "Video",
    icon: Video,
    downloadUrl: "/videos/reflection-techniques",
  },
  {
    id: 5,
    title: "Getting Started with Psychometrics",
    description: "Understanding personality assessments and how to use them for growth, not labels.",
    category: "guides",
    type: "PDF",
    icon: BookOpen,
    downloadUrl: "/downloads/psychometrics-guide.pdf",
  },
  {
    id: 6,
    title: "The Future of Personal Growth (Podcast)",
    description: "Founders discuss how AI and evidence-based coaching are transforming personal development.",
    category: "podcasts",
    type: "Audio",
    icon: Headphones,
    downloadUrl: "/podcasts/future-of-growth",
  },
  {
    id: 7,
    title: "Relationship Intelligence Framework",
    description: "Dr. Walter's framework for understanding and improving relationship dynamics.",
    category: "frameworks",
    type: "PDF",
    icon: FileText,
    downloadUrl: "/downloads/relationship-intelligence.pdf",
  },
  {
    id: 8,
    title: "Building Sustainable Habits",
    description: "Why most habit-building advice fails and what actually works for long-term change.",
    category: "guides",
    type: "PDF",
    icon: BookOpen,
    downloadUrl: "/downloads/sustainable-habits.pdf",
  },
];

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredResources = selectedCategory === "all"
    ? resources
    : resources.filter((r) => r.category === selectedCategory);

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
              <Link href="/#waitlist">Join Waitlist</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-16 md:py-20 border-b bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Free Resources
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              Frameworks, guides, and tools to kickstart your personal growth journey.
            </p>
            <p className="text-lg text-muted-foreground">
              All resources are free and based on evidence-based coaching methods. No signup required.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-b bg-background sticky top-[73px] z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={selectedCategory === category.id ? "bg-[#E2C379] hover:bg-[#E2C379]/90 text-[#2D2F33]" : ""}
              >
                {category.name}
              </Button>
            ))}
          </div>
          <div className="text-center mt-4 text-sm text-muted-foreground">
            Showing {filteredResources.length} {filteredResources.length === 1 ? 'resource' : 'resources'}
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => {
              const Icon = resource.icon;
              return (
                <div
                  key={resource.id}
                  className="bg-card border rounded-xl p-6 flex flex-col hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#E2C379]/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-6 w-6 text-[#E2C379]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-muted-foreground mb-1">{resource.type}</div>
                      <h3 className="text-lg font-bold mb-2 line-clamp-2">{resource.title}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 flex-1 line-clamp-3">
                    {resource.description}
                  </p>
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <a href={resource.downloadUrl} target="_blank" rel="noopener noreferrer">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </a>
                  </Button>
                </div>
              );
            })}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No resources found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 border-t bg-muted/30" id="waitlist">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Want More?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join the Camino platform for personalized AI-powered coaching, structured frameworks, and ongoing support. Launching Q1 2026.
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
