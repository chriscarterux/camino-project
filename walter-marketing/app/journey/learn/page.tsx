"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Lock, ArrowRight, BookOpen, Library } from "lucide-react";
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
          <div className="max-w-5xl mx-auto">
            <Link href="/app" className="text-sm text-muted-foreground hover:text-foreground mb-4 inline-block">
              ← Back to Dashboard
            </Link>
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">
              Your Camino Journey
            </h1>
            <p className="text-muted-foreground">
              Guided reflection modules + 150+ professional development courses
            </p>
          </div>
        </div>
      </div>

      {/* Upgrade Banner for Free Users */}
      {!hasAccess && (
        <div className="bg-[#F4E9D8] border-b border-[#E2C379]">
          <div className="container mx-auto px-4 py-6">
            <div className="max-w-5xl mx-auto flex items-center justify-between gap-6">
              <div>
                <h2 className="font-bold text-[#2D2F33] mb-1">Unlock the Journey</h2>
                <p className="text-sm text-[#2D2F33]/80">
                  Access 4 guided modules + 150+ professional courses for $19.95/month
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

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Core Modules Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Core Reflection Modules</h2>
            <p className="text-muted-foreground mb-8">
              Your primary path through awareness, belonging, resilience, and purpose
            </p>

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
                  {/* Lock or Progress Indicator */}
                  <div className="absolute top-4 right-4">
                    {module.locked ? (
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                        <Lock className="h-5 w-5 text-muted-foreground" />
                      </div>
                    ) : (
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
                    )}
                  </div>

                  {/* Module Number Badge */}
                  <div className="w-14 h-14 rounded-full bg-[#E2C379]/20 flex items-center justify-center mb-6">
                    <span className="text-2xl font-bold text-[#2D2F33]">{module.id}</span>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold mb-3">{module.title}</h3>
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
                      variant="outline"
                      className="w-full"
                      disabled
                    >
                      <Lock className="mr-2 h-4 w-4" />
                      Locked
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
          </div>

          {/* Course Library Section */}
          {hasAccess && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Professional Development Library</h2>
                  <p className="text-muted-foreground">
                    150+ courses to support your awareness, belonging, resilience, and purpose
                  </p>
                </div>
                <Button asChild variant="outline">
                  <Link href="/journey/library">
                    <Library className="mr-2 h-4 w-4" />
                    Browse All
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              {/* Featured Categories */}
              <div className="grid md:grid-cols-3 gap-6">
                <Link
                  href="/journey/library?category=personal-development"
                  className="border rounded-xl p-6 bg-card hover:shadow-lg hover:border-[#E2C379]/50 transition-all group"
                >
                  <h3 className="font-bold mb-2 group-hover:text-[#E2C379] transition-colors">
                    Personal Development
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    22 courses on mindfulness, emotional intelligence, and self-awareness
                  </p>
                  <div className="text-sm text-[#E2C379] flex items-center gap-2">
                    Explore courses
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>

                <Link
                  href="/journey/library?category=career-development"
                  className="border rounded-xl p-6 bg-card hover:shadow-lg hover:border-[#E2C379]/50 transition-all group"
                >
                  <h3 className="font-bold mb-2 group-hover:text-[#E2C379] transition-colors">
                    Career Development
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    18 courses on leadership, communication, and professional growth
                  </p>
                  <div className="text-sm text-[#E2C379] flex items-center gap-2">
                    Explore courses
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>

                <Link
                  href="/journey/library?category=supervisors-and-managers"
                  className="border rounded-xl p-6 bg-card hover:shadow-lg hover:border-[#E2C379]/50 transition-all group"
                >
                  <h3 className="font-bold mb-2 group-hover:text-[#E2C379] transition-colors">
                    Leadership & Management
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    18 courses on team building, coaching, and effective management
                  </p>
                  <div className="text-sm text-[#E2C379] flex items-center gap-2">
                    Explore courses
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </div>
            </div>
          )}

          {/* Quote */}
          {hasAccess && (
            <div className="bg-[#F4E9D8] border-l-4 border-[#E2C379] rounded-lg p-6">
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
