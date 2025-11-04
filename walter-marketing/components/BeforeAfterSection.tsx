"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import BeforeAfterCard, { BeforeAfterExample } from "@/components/BeforeAfterCard";
import Link from "next/link";

const examples: BeforeAfterExample[] = [
  {
    id: "career-decision",
    title: "Career Decision",
    scenario: "Asking for advice about changing careers from software engineering to UX design",
    genericAI: "Switching from software engineering to UX design can be a great move! Here are some steps: 1) Learn UX fundamentals through online courses 2) Build a portfolio 3) Network with UX designers 4) Consider a bootcamp 5) Apply for junior positions. The transition usually takes 6-12 months.",
    lifeModelAI: "Given your INTJ personality and pattern of deep work preference, the structured problem-solving in UX will appeal to you. However, I notice from your history that you've struggled with ambiguous feedback in collaborative environments (anxious attachment). Before transitioning, I'd recommend: 1) Shadow UX designers to see the reality of constant stakeholder feedback 2) Practice receiving critique through design communities first 3) Consider specialized UX research roles that lean more analytical. Your ADHD hyperfocus is an asset for research deep-dives.",
    contextUsed: ["INTJ personality", "Anxious attachment style", "ADHD", "Past struggle with ambiguous feedback"],
  },
  {
    id: "adhd-productivity",
    title: "ADHD Productivity",
    scenario: "Struggling to finish projects despite starting many with enthusiasm",
    genericAI: "Here are some productivity tips: 1) Break projects into smaller tasks 2) Use the Pomodoro technique 3) Set deadlines 4) Remove distractions 5) Use project management tools 6) Build accountability with friends. Stay focused and you'll finish more!",
    lifeModelAI: "Classic ADHD novelty-seeking + task initiation strength but completion weakness. Standard productivity advice won't work—you don't lack discipline, your dopamine system works differently. Here's what will work for YOUR brain: 1) Accept you're a 'serial starter'—build that into your system by having 3-5 projects in rotation 2) Use hyperfocus sessions (don't fight them, schedule around them) 3) Forget Pomodoro—do 90min sprints when engaged 4) External deadlines only (internal ones don't create enough urgency) 5) Body doubling (virtual coworking) for boring tasks.",
    contextUsed: ["ADHD diagnosis", "Novelty-seeking pattern", "Strong task initiation", "Weak task completion", "Hyperfocus capability"],
  },
  {
    id: "relationship-conflict",
    title: "Relationship Conflict",
    scenario: "Partner forgot our anniversary dinner plans",
    genericAI: "It's understandable to feel hurt when someone forgets an important date. Try to: 1) Communicate calmly how you feel 2) Don't assume intent 3) Ask what happened 4) Set reminders together for future events 5) Remember everyone makes mistakes. Approach with empathy and clear communication.",
    lifeModelAI: "Your anxious attachment is activating hard right now—that spiral of 'they don't care' is the pattern we've seen before. This triggers your childhood narrative of feeling forgotten by busy parents. Before the conversation, ground yourself: This one incident doesn't mean abandonment. Given your partner's avoidant attachment (from what you've shared), they likely didn't connect the date to emotional significance the way you do. Script: 'When plans I'm excited about get missed, I feel unimportant. I know that's not your intent. Can we talk about how we both think about important dates?'",
    contextUsed: ["Anxious attachment style", "Childhood narrative of busy parents", "Partner's avoidant attachment", "Pattern of catastrophizing"],
  },
];

export default function BeforeAfterSection() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="py-20 md:py-28 lg:py-32 bg-muted/30 border-t">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4">
              Generic AI vs Life Model AI
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See the difference context makes: same questions, dramatically different answers
            </p>
          </div>

          {/* Tab Buttons */}
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {examples.map((example, idx) => (
              <Button
                key={example.id}
                onClick={() => setActiveTab(idx)}
                variant={activeTab === idx ? "default" : "outline"}
                className={
                  activeTab === idx
                    ? "bg-[#E2C379] hover:bg-[#E2C379]/90 text-[#2D2F33]"
                    : ""
                }
              >
                {example.title}
              </Button>
            ))}
          </div>

          {/* Active Example */}
          <div className="mb-10">
            <BeforeAfterCard example={examples[activeTab]} />
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-muted-foreground mb-6">
              Want to see more examples?
            </p>
            <Button asChild variant="outline" size="lg">
              <Link href="/before-after">View All Examples</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
