import { Button } from "@/components/ui/button";
import { TrendingUp, Target, Calendar, ArrowRight } from "lucide-react";

export default function LearningPathsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-bold mb-2">Learning Paths</h1>
        <p className="text-muted-foreground">
          Personalized 8-week transformation programs
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-lg bg-primary/10 p-2">
              <Target className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-bold text-lg">Current Path</h3>
          </div>
          <h2 className="text-xl font-bold mb-2">Foundations of Self-Awareness</h2>
          <p className="text-muted-foreground mb-4">
            Week 2 of 8 • 65% complete
          </p>
          <Button className="w-full">
            Continue Path
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-lg bg-primary/10 p-2">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-bold text-lg">Recommended Next</h3>
          </div>
          <h2 className="text-xl font-bold mb-2">Values-Based Living</h2>
          <p className="text-muted-foreground mb-4">
            Based on your reflections and insights
          </p>
          <Button variant="outline" className="w-full">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
}
