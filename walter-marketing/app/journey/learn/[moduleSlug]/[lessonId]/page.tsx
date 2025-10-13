"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import dynamic from 'next/dynamic';

// Dynamic import to avoid SSR issues with react-player
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

interface LessonData {
  id: string;
  title: string;
  description?: string;
  videoUrl?: string;
  content?: string;
  duration: string;
  completed: boolean;
  nextLesson?: { id: string; title: string };
  prevLesson?: { id: string; title: string };
  reflectionPrompt?: string;
}

export default function LessonPlayerPage() {
  const params = useParams();
  const router = useRouter();
  const moduleSlug = params.moduleSlug as string;
  const lessonId = params.lessonId as string;

  const [lesson, setLesson] = useState<LessonData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCompleting, setIsCompleting] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);

  useEffect(() => {
    async function loadLesson() {
      try {
        // TODO: Fetch from Frappe API
        // Mock data for now
        const mockLesson: LessonData = {
          id: lessonId,
          title: 'Welcome to Awareness',
          description: 'Begin your journey into understanding your patterns and how they shape your reality.',
          videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Replace with actual video
          content: `
# Understanding Awareness

Awareness is the foundation of all growth. Before we can change, we must first see clearly.

## Key Concepts

1. **Pattern Recognition** - Noticing the recurring themes in your thoughts and behaviors
2. **Emotional Intelligence** - Understanding what you feel and why
3. **Conscious Choice** - Moving from reaction to response

## Reflection

Take a moment to consider: What patterns have you noticed in your own life this week?
          `,
          duration: '8 min',
          completed: false,
          nextLesson: { id: 'l2', title: 'Understanding Your Patterns' },
          reflectionPrompt: 'What patterns have you noticed in your thoughts or behaviors this week?',
        };

        setLesson(mockLesson);
      } catch (error) {
        console.error('Error loading lesson:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadLesson();
  }, [lessonId]);

  const handleMarkComplete = async () => {
    setIsCompleting(true);
    try {
      // TODO: Call API to mark lesson complete
      await fetch('/api/lms/complete-lesson', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lessonId: lesson?.id,
          moduleSlug,
        }),
      });

      // Navigate to next lesson or back to module
      if (lesson?.nextLesson) {
        router.push(`/journey/learn/${moduleSlug}/${lesson.nextLesson.id}`);
      } else {
        router.push(`/journey/learn/${moduleSlug}`);
      }
    } catch (error) {
      console.error('Error completing lesson:', error);
    } finally {
      setIsCompleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-16 h-16 border-4 border-[#E2C379] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Lesson not found</h2>
          <Button asChild>
            <Link href="/journey/learn">Back to Modules</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <Link
              href={`/journey/learn/${moduleSlug}`}
              className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Module
            </Link>
            {lesson.completed && (
              <div className="flex items-center gap-2 text-sm text-green-600">
                <CheckCircle2 className="h-4 w-4" />
                Completed
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Video Player */}
      {lesson.videoUrl && (
        <div className="bg-black">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="aspect-video">
                <ReactPlayer
                  url={lesson.videoUrl}
                  width="100%"
                  height="100%"
                  controls
                  onProgress={(state: any) => setVideoProgress(state.played * 100)}
                  config={{
                    youtube: {
                      playerVars: { modestbranding: 1 }
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lesson Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            {lesson.title}
          </h1>

          {lesson.description && (
            <p className="text-lg text-muted-foreground mb-8">
              {lesson.description}
            </p>
          )}

          {/* Lesson Body */}
          {lesson.content && (
            <div className="prose prose-lg max-w-none mb-12">
              <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
            </div>
          )}

          {/* Reflection Prompt */}
          {lesson.reflectionPrompt && (
            <div className="bg-[#F4E9D8] border-l-4 border-[#E2C379] rounded-lg p-6 mb-8">
              <h3 className="font-bold mb-2">Reflection</h3>
              <p className="italic text-[#2D2F33]">{lesson.reflectionPrompt}</p>
              <Button asChild variant="outline" size="sm" className="mt-4">
                <Link href="/app/reflect">Open Reflection Journal</Link>
              </Button>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between pt-8 border-t">
            {lesson.prevLesson ? (
              <Button asChild variant="outline">
                <Link href={`/journey/learn/${moduleSlug}/${lesson.prevLesson.id}`}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Link>
              </Button>
            ) : (
              <div></div>
            )}

            <div className="flex gap-3">
              {!lesson.completed && (
                <Button
                  onClick={handleMarkComplete}
                  disabled={isCompleting || videoProgress < 80}
                  className="bg-[#E2C379] hover:bg-[#E2C379]/90 text-[#2D2F33]"
                >
                  {isCompleting ? 'Marking...' : 'Mark Complete'}
                  <CheckCircle2 className="ml-2 h-4 w-4" />
                </Button>
              )}

              {lesson.nextLesson && (
                <Button asChild className="bg-[#E2C379] hover:bg-[#E2C379]/90 text-[#2D2F33]">
                  <Link href={`/journey/learn/${moduleSlug}/${lesson.nextLesson.id}`}>
                    Next Lesson
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
