"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, CheckCircle2, Circle, Lock } from "lucide-react";

interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  locked: boolean;
}

interface Chapter {
  id: string;
  title: string;
  lessons: Lesson[];
}

export default function ModuleDetailPage() {
  const params = useParams();
  const moduleSlug = params.moduleSlug as string;

  const [module, setModule] = useState<any>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadModule() {
      try {
        // TODO: Fetch from Frappe API
        // For now, mock data
        const mockModule = {
          id: 1,
          title: moduleSlug.includes('awareness') ? 'Awareness' : 'Module',
          description: 'Understand your patterns and how they shape your world',
          progress: 35,
        };

        const mockChapters: Chapter[] = [
          {
            id: 'ch1',
            title: 'Introduction to Awareness',
            lessons: [
              { id: 'l1', title: 'Welcome to Awareness', duration: '5 min', completed: true, locked: false },
              { id: 'l2', title: 'Understanding Your Patterns', duration: '8 min', completed: true, locked: false },
              { id: 'l3', title: 'Reflection Practice', duration: '6 min', completed: false, locked: false },
            ],
          },
          {
            id: 'ch2',
            title: 'Emotional Triggers',
            lessons: [
              { id: 'l4', title: 'Identifying Triggers', duration: '7 min', completed: false, locked: false },
              { id: 'l5', title: 'Response vs Reaction', duration: '9 min', completed: false, locked: false },
            ],
          },
        ];

        setModule(mockModule);
        setChapters(mockChapters);
      } catch (error) {
        console.error('Error loading module:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadModule();
  }, [moduleSlug]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-16 h-16 border-4 border-[#E2C379] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-4xl mx-auto">
            <Link href="/journey/learn" className="text-sm text-muted-foreground hover:text-foreground mb-4 inline-flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              All Modules
            </Link>
            <div className="flex items-start justify-between gap-6">
              <div>
                <h1 className="text-3xl font-serif font-bold mb-2">{module?.title}</h1>
                <p className="text-muted-foreground">{module?.description}</p>
              </div>
              {/* Progress Ring */}
              <div className="relative w-20 h-20 flex-shrink-0">
                <svg className="w-20 h-20 transform -rotate-90">
                  <circle
                    cx="40"
                    cy="40"
                    r="34"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="transparent"
                    className="text-muted"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="34"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="transparent"
                    strokeDasharray={`${(module?.progress || 0) * 2.135} 213.5`}
                    className="text-[#E2C379]"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-lg font-bold text-[#2D2F33]">
                    {module?.progress || 0}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lessons List */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {chapters.map((chapter) => (
            <div key={chapter.id}>
              <h2 className="text-xl font-bold mb-4">{chapter.title}</h2>
              <div className="space-y-2">
                {chapter.lessons.map((lesson, index) => (
                  <Link
                    key={lesson.id}
                    href={lesson.locked ? '#' : `/journey/learn/${moduleSlug}/${lesson.id}`}
                    className={`block border rounded-xl p-4 bg-card transition-all ${
                      lesson.locked
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:shadow-md hover:border-[#E2C379]/50'
                    }`}
                    onClick={(e) => lesson.locked && e.preventDefault()}
                  >
                    <div className="flex items-center gap-4">
                      {/* Status Icon */}
                      <div className="flex-shrink-0">
                        {lesson.completed ? (
                          <CheckCircle2 className="h-6 w-6 text-[#E2C379]" />
                        ) : lesson.locked ? (
                          <Lock className="h-6 w-6 text-muted-foreground" />
                        ) : (
                          <Circle className="h-6 w-6 text-muted-foreground" />
                        )}
                      </div>

                      {/* Lesson Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-muted-foreground">
                            Lesson {index + 1}
                          </span>
                          {!lesson.locked && (
                            <Play className="h-3 w-3 text-muted-foreground" />
                          )}
                        </div>
                        <h3 className="font-semibold">{lesson.title}</h3>
                      </div>

                      {/* Duration */}
                      <div className="text-sm text-muted-foreground">
                        {lesson.duration}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
