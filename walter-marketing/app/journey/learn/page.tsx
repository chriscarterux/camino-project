"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Lock, ArrowRight, CheckCircle2, Circle } from "lucide-react";
import { getLMSAccess } from "@/lib/lms/access-control";

interface Module {
  id: number;
  slug: string;
  title: string;
  description: string;
  lessons: number;
  duration: string;
  progress: number;
  locked: boolean;
}

export default function JourneyLearnPage() {
  const [modules, setModules] = useState<Module[]>([]);
  const [userPlan, setUserPlan] = useState<'reflect' | 'journey' | 'coach'>('reflect');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        // Fetch user profile
        const profileRes = await fetch('/api/profile');
        const { profile } = await profileRes.json();
        setUserPlan(profile.plan);

        // Get access permissions
        const access = getLMSAccess(profile.plan);

        // Define modules
        const moduleData: Module[] = [
          {
            id: 1,
            slug: 'camino-module-1-awareness',
            title: 'Awareness',
            description: 'Understand your patterns and how they shape your world',
            lessons: 8,
            duration: '2-3 weeks',
            progress: 0,
            locked: !access.canAccessLMS,
          },
          {
            id: 2,
            slug: 'camino-module-2-belonging',
            title: 'Belonging',
            description: 'Cultivate connection and grounded relationships',
            lessons: 8,
            duration: '2-3 weeks',
            progress: 0,
            locked: !access.canAccessLMS,
          },
          {
            id: 3,
            slug: 'camino-module-3-resilience',
            title: 'Resilience',
            description: 'Build emotional strength and composure under pressure',
            lessons: 8,
            duration: '2-3 weeks',
            progress: 0,
            locked: !access.canAccessLMS,
          },
          {
            id: 4,
            slug: 'camino-module-4-purpose',
            title: 'Purpose & Performance',
            description: 'Align your daily actions with what truly matters',
            lessons: 8,
            duration: '2-3 weeks',
            progress: 0,
            locked: !access.canAccessLMS,
          },
        ];

        // TODO: Fetch actual progress from LMS API
        setModules(moduleData);
      } catch (error) {
        console.error('Error loading modules:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#E2C379] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your Journey...</p>
        </div>
      </div>
    );
  }

  const hasAccess = userPlan === 'journey' || userPlan === 'coach';

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <Link href="/app" className="text-sm text-muted-foreground hover:text-foreground mb-4 inline-block">
              ← Back to Dashboard
            </Link>
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">
              Your Camino Journey
            </h1>
            <p className="text-muted-foreground">
              A guided path toward awareness, belonging, resilience, and purpose
            </p>
          </div>
        </div>
      </div>

      {/* Upgrade Banner for Free Users */}
      {!hasAccess && (
        <div className="bg-[#F4E9D8] border-b border-[#E2C379]">
          <div className="container mx-auto px-4 py-6">
            <div className="max-w-4xl mx-auto flex items-center justify-between gap-6">
              <div>
                <h2 className="font-bold text-[#2D2F33] mb-1">Unlock the Journey</h2>
                <p className="text-sm text-[#2D2F33]/80">
                  Access all 4 modules, video lessons, and guided exercises for $19.95/month
                </p>
              </div>
              <Button asChild className="bg-[#E2C379] hover:bg-[#E2C379]/90 text-[#2D2F33] flex-shrink-0">
                <Link href="/pricing?unlock=journey">
                  Upgrade Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modules Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {modules.map((module) => (
              <div
                key={module.id}
                className={`border rounded-2xl p-8 bg-card relative transition-all ${
                  module.locked
                    ? 'opacity-60'
                    : 'hover:shadow-lg hover:border-[#E2C379]/50'
                }`}
              >
                {/* Lock Indicator */}
                {module.locked && (
                  <div className="absolute top-4 right-4">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <Lock className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                )}

                {/* Progress Ring */}
                {!module.locked && (
                  <div className="absolute top-4 right-4">
                    <div className="relative w-12 h-12">
                      <svg className="w-12 h-12 transform -rotate-90">
                        <circle
                          cx="24"
                          cy="24"
                          r="20"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="transparent"
                          className="text-muted"
                        />
                        <circle
                          cx="24"
                          cy="24"
                          r="20"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="transparent"
                          strokeDasharray={`${module.progress * 1.257} 125.7`}
                          className="text-[#E2C379]"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-bold text-[#2D2F33]">
                          {module.progress}%
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Module Number Badge */}
                <div className="w-14 h-14 rounded-full bg-[#E2C379]/20 flex items-center justify-center mb-6">
                  <span className="text-2xl font-bold text-[#2D2F33]">{module.id}</span>
                </div>

                {/* Content */}
                <h2 className="text-2xl font-bold mb-3">{module.title}</h2>
                <p className="text-muted-foreground mb-6">
                  {module.description}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <span>{module.lessons} lessons</span>
                  <span>•</span>
                  <span>{module.duration}</span>
                </div>

                {/* Action Button */}
                {module.locked ? (
                  <Button
                    asChild
                    variant="outline"
                    className="w-full"
                    disabled
                  >
                    <div>
                      <Lock className="mr-2 h-4 w-4" />
                      Locked
                    </div>
                  </Button>
                ) : (
                  <Button
                    asChild
                    className="w-full bg-[#E2C379] hover:bg-[#E2C379]/90 text-[#2D2F33]"
                  >
                    <Link href={`/journey/learn/${module.slug}`}>
                      {module.progress > 0 ? 'Continue' : 'Start Module'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                )}
              </div>
            ))}
          </div>

          {/* Quote */}
          {hasAccess && (
            <div className="mt-12 bg-[#F4E9D8] border-l-4 border-[#E2C379] rounded-lg p-6">
              <p className="text-lg font-serif italic text-[#2D2F33] mb-2">
                "The path is made by walking."
              </p>
              <p className="text-sm text-muted-foreground">— Antonio Machado</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
