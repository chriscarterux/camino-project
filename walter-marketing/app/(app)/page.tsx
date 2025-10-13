import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Calendar } from "lucide-react";

export default function AppDashboard() {
  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">
          Welcome back to your Camino
        </h1>
        <p className="text-muted-foreground">
          Your reflections, insights, and growth all in one place.
        </p>
      </div>

      {/* Main Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {/* Today's Reflection */}
        <Link
          href="/app/reflect"
          className="border rounded-2xl p-6 bg-card hover:shadow-lg transition-all duration-300 group col-span-full lg:col-span-2"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold mb-2 group-hover:text-[#E2C379] transition-colors">
                Today's prompt awaits
              </h2>
              <p className="text-muted-foreground text-sm">
                You've reflected 7 days in a row — consistency builds clarity
              </p>
            </div>
            <ArrowRight className="h-6 w-6 text-[#E2C379] group-hover:translate-x-2 transition-transform" />
          </div>

          <div className="bg-[#F4E9D8] border-l-4 border-[#E2C379] rounded-lg p-4">
            <p className="text-sm italic text-[#2D2F33]">
              What's one thing you learned about yourself this week?
            </p>
          </div>

          <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-[#E2C379]" />
              <span>2-4 minutes</span>
            </div>
            <span>•</span>
            <span>Streak: 7 days</span>
          </div>
        </Link>

        {/* Insights Snapshot */}
        <Link
          href="/app/insights"
          className="border rounded-2xl p-6 bg-card hover:shadow-lg transition-all duration-300 group"
        >
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-xl font-bold group-hover:text-[#E2C379] transition-colors">
              Your patterns
            </h2>
            <TrendingUp className="h-5 w-5 text-[#E2C379]" />
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Top themes from your reflections this week
          </p>

          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full bg-[#E2C379]/10 text-xs font-medium text-[#2D2F33]">
              connection
            </span>
            <span className="px-3 py-1 rounded-full bg-[#E2C379]/10 text-xs font-medium text-[#2D2F33]">
              growth
            </span>
            <span className="px-3 py-1 rounded-full bg-[#E2C379]/10 text-xs font-medium text-[#2D2F33]">
              focus
            </span>
          </div>
        </Link>
      </div>

      {/* Journey Progress */}
      <div className="border rounded-2xl p-8 bg-card mb-12">
        <h2 className="text-2xl font-bold mb-4">Reflection turns into growth</h2>
        <p className="text-muted-foreground mb-6">
          As you reflect and review your insights, Camino tracks your journey through modules on awareness, belonging, resilience, and purpose.
        </p>

        {/* Progress Visualization */}
        <div className="bg-muted/30 rounded-lg h-4 mb-6 overflow-hidden">
          <div className="bg-[#E2C379] h-full" style={{ width: "35%" }}></div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground">
            35% complete • Module 2 of 4
          </p>
          <Link href="/journey" className="text-sm font-medium text-[#E2C379] hover:underline">
            Continue your journey →
          </Link>
        </div>
      </div>

      {/* Quote */}
      <div className="bg-[#F4E9D8] border-l-4 border-[#E2C379] rounded-lg p-6">
        <p className="text-lg font-serif italic text-[#2D2F33] mb-2">
          "The path is made by walking."
        </p>
        <p className="text-sm text-muted-foreground">— Antonio Machado</p>
        <p className="text-xs text-muted-foreground mt-4">
          Every reflection adds another step forward.
        </p>
      </div>
    </div>
  );
}
