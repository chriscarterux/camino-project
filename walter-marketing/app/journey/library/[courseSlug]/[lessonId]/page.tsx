"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

export default function LibraryLessonPage() {
  const params = useParams();
  const router = useRouter();
  const courseSlug = params.courseSlug as string;
  const lessonId = params.lessonId as string;

  const [lesson, setLesson] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCompleting, setIsCompleting] = useState(false);

  useEffect(() => {
    async function loadLesson() {
      try {
        // Fetch real lesson from Frappe API
        const response = await fetch(`/api/lms/lesson/${lessonId}`);

        if (!response.ok) {
          throw new Error('Lesson not found');
        }

        const { lesson: frappeLesson } = await response.json();

        setLesson({
          id: frappeLesson.name,
          number: frappeLesson.idx || 1,
          title: frappeLesson.title,
          content: frappeLesson.body || '<p>Lesson content loading...</p>',
          completed: false, // TODO: Check actual completion status
        });
      } catch (error) {
        console.error('Error loading lesson:', error);
        setLesson(null);
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
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Go back to course
      router.push(`/journey/library/${courseSlug}`);
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
            <Link href={`/journey/library/${courseSlug}`}>Back to Course</Link>
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
              href={`/journey/library/${courseSlug}`}
              className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Course
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

      {/* Lesson Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Lesson Number */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-[#E2C379]/20 flex items-center justify-center">
              <span className="font-bold text-[#2D2F33]">{lesson.number}</span>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Lesson {lesson.number}</p>
              <h1 className="text-3xl font-serif font-bold">{lesson.title}</h1>
            </div>
          </div>

          {/* Lesson Body */}
          <div className="prose prose-lg max-w-none mb-12">
            <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
          </div>

          {/* Admin Note */}
          <div className="bg-[#F4E9D8] border-l-4 border-[#E2C379] rounded-lg p-6 mb-8">
            <h3 className="font-bold mb-2 text-[#2D2F33]">📝 Admin Note</h3>
            <p className="text-sm text-[#2D2F33]/80">
              Lesson content needs to be added from the Training Manual documents.
              Go to Frappe admin to edit this course and add the full lesson content.
            </p>
            <Button asChild variant="outline" size="sm" className="mt-4">
              <a
                href={`http://46.202.93.22:8000/app/lms-course/${courseSlug}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Edit in Frappe Admin
              </a>
            </Button>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-8 border-t">
            <Button asChild variant="outline">
              <Link href={`/journey/library/${courseSlug}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Course
              </Link>
            </Button>

            {!lesson.completed && (
              <Button
                onClick={handleMarkComplete}
                disabled={isCompleting}
                className="bg-[#E2C379] hover:bg-[#E2C379]/90 text-[#2D2F33]"
              >
                {isCompleting ? 'Marking...' : 'Mark Complete'}
                <CheckCircle2 className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
