"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import BeforeAfterCard, { BeforeAfterExample } from "@/components/BeforeAfterCard";
import LeadCaptureForm from "@/components/LeadCaptureForm";

const examples: BeforeAfterExample[] = [
  {
    id: "career-decision",
    title: "Career Decision",
    scenario: "Asking for advice about changing careers from software engineering to UX design",
    genericAI: "Switching from software engineering to UX design can be a great move! Here are some steps: 1) Learn UX fundamentals through online courses 2) Build a portfolio 3) Network with UX designers 4) Consider a bootcamp 5) Apply for junior positions. The transition usually takes 6-12 months.",
    lifeModelAI: "Given your INTJ personality and pattern of deep work preference, the structured problem-solving in UX will appeal to you. However, I notice from your history that you've struggled with ambiguous feedback in collaborative environments (anxious attachment). Before transitioning, I'd recommend: 1) Shadow UX designers to see the reality of constant stakeholder feedback 2) Practice receiving critique through design communities first 3) Consider specialized UX research roles that lean more analytical. Your ADHD hyperfocus is an asset for research deep-dives. The transition fits your skills, but prep for the collaboration intensity.",
    contextUsed: ["INTJ personality", "Anxious attachment style", "ADHD", "Past struggle with ambiguous feedback"],
  },
  {
    id: "relationship-conflict",
    title: "Relationship Conflict",
    scenario: "Partner forgot our anniversary dinner plans",
    genericAI: "It's understandable to feel hurt when someone forgets an important date. Try to: 1) Communicate calmly how you feel 2) Don't assume intent 3) Ask what happened 4) Set reminders together for future events 5) Remember everyone makes mistakes. Approach with empathy and clear communication.",
    lifeModelAI: "Your anxious attachment is activating hard right now—that spiral of 'they don't care' is the pattern we've seen before. This triggers your childhood narrative of feeling forgotten by busy parents. Before the conversation, ground yourself: This one incident doesn't mean abandonment. Given your partner's avoidant attachment (from what you've shared), they likely didn't connect the date to emotional significance the way you do. Script: 'When plans I'm excited about get missed, I feel unimportant. I know that's not your intent. Can we talk about how we both think about important dates?' Focus on the system, not the incident.",
    contextUsed: ["Anxious attachment style", "Childhood narrative of busy parents", "Partner's avoidant attachment", "Pattern of catastrophizing"],
  },
  {
    id: "adhd-productivity",
    title: "ADHD Productivity",
    scenario: "Struggling to finish projects despite starting many with enthusiasm",
    genericAI: "Here are some productivity tips: 1) Break projects into smaller tasks 2) Use the Pomodoro technique 3) Set deadlines 4) Remove distractions 5) Use project management tools 6) Build accountability with friends. Stay focused and you'll finish more!",
    lifeModelAI: "Classic ADHD novelty-seeking + task initiation strength but completion weakness. Standard productivity advice won't work—you don't lack discipline, your dopamine system works differently. Here's what will work for YOUR brain: 1) Accept you're a 'serial starter'—build that into your system by having 3-5 projects in rotation 2) Use hyperfocus sessions (don't fight them, schedule around them) 3) Forget Pomodoro—do 90min sprints when engaged 4) External deadlines only (internal ones don't create enough urgency) 5) Body doubling (virtual coworking) for boring tasks. The goal isn't to fight your wiring, it's to architect around it. Most of your unfinished projects can be paused, not abandoned—that's a feature, not a bug.",
    contextUsed: ["ADHD diagnosis", "Novelty-seeking pattern", "Strong task initiation", "Weak task completion", "Hyperfocus capability"],
  },
  {
    id: "anxiety-management",
    title: "Anxiety Management",
    scenario: "Sunday evening anxiety about the work week ahead",
    genericAI: "Sunday scaries are common! Try these: 1) Plan your week in advance 2) Practice mindfulness meditation 3) Exercise Sunday afternoon 4) Avoid work emails on weekends 5) Do something relaxing Sunday evening 6) Get good sleep. Creating a Sunday routine can help ease the transition.",
    lifeModelAI: "Your Sunday anxiety pattern connects to three things in your Life Model: 1) Type-A perfectionism + need for control (impossible to have for the whole week) 2) Anxious attachment activating around your demanding boss (authority figure who mirrors critical parent) 3) Your therapist noted you catastrophize unknowns. Here's the reframe: The anxiety isn't about Monday—it's about sitting with uncertainty. Instead of planning to eliminate anxiety, practice tolerating it. Specific: Sunday 4pm, 10min 'worry window' to write worst-case scenarios. Then Evidence column: how often do they actually happen? You'll see 5% hit rate. The anxiety won't disappear, but you'll stop avoiding it, which paradoxically reduces it. Also: your SSRI works better with consistent sleep—Sunday is when you stay up latest.",
    contextUsed: ["Type-A perfectionism", "Anxious attachment with authority", "Critical parent pattern", "Catastrophizing tendency", "SSRI medication"],
  },
  {
    id: "goal-setting",
    title: "Goal Setting",
    scenario: "Want to set better goals for personal growth this year",
    genericAI: "Setting SMART goals is key: 1) Make them Specific and Measurable 2) Ensure they're Achievable and Realistic 3) Set Time-bound deadlines 4) Write them down 5) Review progress monthly 6) Celebrate small wins 7) Adjust as needed. Popular areas: health, career, relationships, hobbies.",
    lifeModelAI: "SMART goals will backfire for you—here's why: Your Enneagram 4 + ADHD combo means you need emotional resonance and novelty, not rigid metrics. Every January you set ambitious goals, lose steam by March (dopamine drops), then feel like a failure (reinforcing your 'never finish anything' narrative). Different approach: Theme-based years instead of goals. This year's theme might be 'Foundations' (health, systems, relationships). Then monthly experiments—not commitments. January: try morning routine. If it sticks, great. If not, February is different experiment. Track what energizes you, not what you complete. Your pattern shows you thrive on exploration, not execution—stop trying to be someone else. The growth IS the experimentation process.",
    contextUsed: ["Enneagram 4", "ADHD", "Pattern of abandoning January goals", "Need for emotional resonance", "Exploration over execution"],
  },
  {
    id: "communication-style",
    title: "Communication Style",
    scenario: "Teammates say I'm too blunt in feedback",
    genericAI: "Being perceived as blunt is common. Try these communication strategies: 1) Start with positive feedback 2) Use 'sandwich method' 3) Ask questions instead of stating 4) Use 'I' statements 5) Consider timing and setting 6) Practice active listening 7) Be aware of tone. Remember: it's not what you say, it's how you say it.",
    lifeModelAI: "You're not 'too blunt'—you have high IQ + low EQ awareness + direct communication preference (INTJ) + possible autism spectrum traits (pattern recognition, literal communication). The sandwich method will feel fake and you'll abandon it. Instead: 1) Signal intent upfront: 'I'm about to be direct because I respect your time—would you prefer context first?' 2) Your teammates mistake directness for hostility (their anxious attachment interpreting through criticism lens, not yours to fix entirely) 3) Add ONE buffer sentence: 'This might be uncomfortable' before critical feedback. That's it. Don't overcompensate into fake niceness—you'll resent it and they'll sense inauthenticity. You need teammates who value direct feedback (most do, despite claims). Your communication style is an asset in the right culture. The real question: is this the right team for you?",
    contextUsed: ["INTJ personality", "High IQ/low EQ pattern", "Possible autism spectrum traits", "Direct communication preference", "Pattern of abandoning fake behaviors"],
  },
];

export default function BeforeAfterPage() {
  const handleShare = (id: string) => {
    // Share functionality
    if (navigator.share) {
      navigator.share({
        title: "Generic AI vs Life Model AI",
        url: `${window.location.origin}/before-after#${id}`,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${window.location.origin}/before-after#${id}`);
    }
  };

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
            <Link href="/before-after" className="text-sm font-medium hover:text-foreground/80 transition-colors">
              Examples
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
      <section className="container mx-auto px-4 py-20 md:py-28">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
            Before/After: Generic AI vs Life Model AI
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            See how context transforms generic advice into personalized guidance
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Same questions, dramatically different answers. The difference? Your Life Model provides the psychological context AI needs to truly help you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-[#E2C379] hover:bg-[#E2C379]/90 text-[#2D2F33]">
              <Link href="#waitlist">Build Your Life Model</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/life-model-framework">Learn the Framework</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Examples Grid */}
      <section className="py-16 border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-12">
            {examples.map((example, idx) => (
              <div key={example.id} id={example.id}>
                <BeforeAfterCard example={example} onShare={handleShare} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download PDF CTA */}
      <section className="py-16 border-t bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-serif font-bold mb-4">
              Download All Examples
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Get all 6 before/after examples as shareable PDFs for social media or presentations.
            </p>
            <Button size="lg" className="bg-[#E2C379] hover:bg-[#E2C379]/90 text-[#2D2F33]">
              <Download className="h-5 w-5 mr-2" />
              Download PDF (Coming Soon)
            </Button>
          </div>
        </div>
      </section>

      {/* Why This Matters */}
      <section className="py-16 border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-serif font-bold mb-8 text-center">
              Why Context Changes Everything
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground">
              <p>
                Generic AI gives you <strong>advice for everyone</strong>. Life Model AI gives you <strong>advice for you</strong>.
              </p>
              <p>
                The difference isn't just quality—it's relevance. When AI understands your:
              </p>
              <ul className="space-y-3 list-disc list-inside ml-4">
                <li>Personality type (MBTI, Enneagram, Big 5)</li>
                <li>Attachment style and relationship patterns</li>
                <li>Neurodivergence (ADHD, autism, etc.)</li>
                <li>Formative experiences and core narratives</li>
                <li>Strengths, triggers, and coping mechanisms</li>
              </ul>
              <p>
                ...it can give you guidance that actually fits your psychological wiring, not just surface-level tips that work for a hypothetical average person.
              </p>
              <p>
                That's the power of a Life Model: turning AI from a search engine with personality into a tool that actually knows you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist CTA */}
      <section id="waitlist" className="py-20 border-t bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-center">
              Ready for AI That Actually Gets You?
            </h2>
            <p className="text-lg text-muted-foreground mb-10 text-center">
              Join the waitlist to build your Life Model and transform generic AI into personalized intelligence.
            </p>

            <LeadCaptureForm
              source="before-after"
              variant="card"
              showInterest={true}
            />
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
                <li>
                  <Link href="/before-after" className="text-muted-foreground hover:text-foreground transition-colors">
                    Examples
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-sm">Company</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                    About
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
