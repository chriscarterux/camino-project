import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TrendingUp, Calendar, Download } from "lucide-react";

export default function InsightsPage() {
  const themes = [
    { name: "Resilience", description: "You've been reflecting on how challenges are shaping your confidence" },
    { name: "Connection", description: "You're valuing time spent with others and seeking more meaningful interactions" },
    { name: "Direction", description: "You're questioning next steps and redefining success on your own terms" },
  ];

  const tags = ["clarity", "purpose", "growth", "focus", "balance", "connection"];

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">
          Discover what your reflections are telling you
        </h1>
        <p className="text-muted-foreground">
          Camino helps you see the invisible threads connecting your thoughts, emotions, and experiences.
        </p>
      </div>

      {/* Weekly Summary */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">This week's reflection themes</h2>
          <span className="text-sm text-muted-foreground flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Last 7 days
          </span>
        </div>

        <div className="space-y-4">
          {themes.map((theme, index) => (
            <div key={index} className="border rounded-2xl p-6 bg-card">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E2C379]/20 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-[#2D2F33]">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold mb-2">{theme.name}</h3>
                  <p className="text-sm text-muted-foreground">{theme.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Button asChild className="bg-[#E2C379] hover:bg-[#E2C379]/90 text-[#2D2F33]">
            <Link href="/journey">Deepen these insights</Link>
          </Button>
        </div>
      </div>

      {/* Emotional Patterns */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">How your emotions evolve over time</h2>
        <div className="border rounded-2xl p-8 bg-card">
          <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg">
            <p className="text-muted-foreground">Emotional trend chart placeholder</p>
          </div>
          <p className="text-sm text-muted-foreground text-center mt-4">
            You've felt most centered when focusing on connection and gratitude.
          </p>
        </div>
      </div>

      {/* Reflection History */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">See how your thinking has evolved</h2>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <button
              key={tag}
              className="px-3 py-1 rounded-full border text-xs font-medium hover:bg-[#E2C379]/10 hover:border-[#E2C379] transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Link
              key={i}
              href={`/app/reflect/${i}`}
              className="block border rounded-lg p-4 hover:shadow-md transition-shadow bg-card"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium">Reflection from Oct {10 - i}</h3>
                <span className="text-xs text-muted-foreground">3 min read</span>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">
                When I think about what matters most, I keep coming back to...
              </p>
              <div className="flex gap-2 mt-3">
                <span className="px-2 py-0.5 rounded text-xs bg-muted text-muted-foreground">
                  purpose
                </span>
                <span className="px-2 py-0.5 rounded text-xs bg-muted text-muted-foreground">
                  clarity
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recommended Lessons */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Continue your growth with guided lessons</h2>
        <p className="text-muted-foreground mb-6">
          Based on your recent reflections, Camino recommends these lessons from the Journey curriculum.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { module: "Module 2: Belonging", title: "Understanding what anchors you" },
            { module: "Module 3: Resilience", title: "Turning challenge into growth" },
            { module: "Module 4: Purpose", title: "Clarify what matters most" },
          ].map((lesson, i) => (
            <div key={i} className="border rounded-lg p-6 bg-card hover:shadow-md transition-shadow">
              <p className="text-xs font-medium text-[#E2C379] mb-2">{lesson.module}</p>
              <h3 className="font-bold mb-4">{lesson.title}</h3>
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link href="/journey">Start Lesson</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
