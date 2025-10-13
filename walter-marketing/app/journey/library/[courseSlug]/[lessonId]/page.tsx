"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  CheckCircle2,
  BookOpen,
  Sparkles,
  Clock,
  Award,
} from "lucide-react";
import { ConfettiCelebration } from "@/components/lms/ConfettiCelebration";
import { EncouragingToast } from "@/components/lms/EncouragingToast";

// Warm, encouraging messages for lesson completion
const completionMessages = [
  "Beautiful work! You're making real progress.",
  "Well done! Your dedication is inspiring.",
  "Fantastic! You're building valuable skills.",
  "Amazing work! Keep this momentum going.",
  "Excellent! You're investing in your future.",
  "Great job! Learning is a journey, not a race.",
  "Wonderful! You're growing every day.",
  "Outstanding! Your commitment shows.",
];

export default function LibraryLessonPage() {
  const params = useParams();
  const router = useRouter();
  const courseSlug = params.courseSlug as string;
  const lessonId = params.lessonId as string;

  const [lesson, setLesson] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCompleting, setIsCompleting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    async function loadLesson() {
      try {
        const response = await fetch(`/api/lms/lesson/${lessonId}`);

        if (!response.ok) {
          throw new Error("Lesson not found");
        }

        const { lesson: frappeLesson } = await response.json();

        setLesson({
          id: frappeLesson.name,
          number: frappeLesson.idx || 1,
          title: frappeLesson.title,
          content: frappeLesson.body || "<p>Lesson content loading...</p>",
          completed: false, // TODO: Check actual completion status
          estimatedTime: "10 min",
        });
      } catch (error) {
        console.error("Error loading lesson:", error);
        setLesson(null);
      } finally {
        setIsLoading(false);
      }
    }

    loadLesson();
  }, [lessonId]);

  // Reading progress tracker
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setReadingProgress(Math.min(progress, 100));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMarkComplete = async () => {
    setIsCompleting(true);

    try {
      // TODO: Call API to mark lesson complete
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Show celebration
      setShowConfetti(true);
      const randomMessage =
        completionMessages[Math.floor(Math.random() * completionMessages.length)];
      setToastMessage(randomMessage);
      setShowToast(true);

      // Navigate back after celebration
      setTimeout(() => {
        router.push(`/journey/library/${courseSlug}`);
      }, 2500);
    } catch (error) {
      console.error("Error completing lesson:", error);
      setShowConfetti(false);
    } finally {
      setIsCompleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FFFBF5]">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-[#F4E9D8] rounded-full"></div>
            <div className="absolute inset-0 border-4 border-[#E2C379] border-t-transparent rounded-full animate-spin"></div>
            <BookOpen className="absolute inset-0 m-auto h-8 w-8 text-[#E2C379] animate-pulse" />
          </div>
          <p className="text-sm text-[#2D2F33]/60 font-serif animate-pulse">
            Loading your lesson...
          </p>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FFFBF5]">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-[#F4E9D8] flex items-center justify-center mx-auto mb-6">
            <BookOpen className="h-10 w-10 text-[#E2C379]" />
          </div>
          <h2 className="text-2xl font-serif font-bold mb-3 text-[#2D2F33]">
            Lesson not found
          </h2>
          <p className="text-[#2D2F33]/60 mb-6">
            This lesson may have been moved or removed.
          </p>
          <Button
            asChild
            className="bg-[#E2C379] hover:bg-[#E2C379]/90 text-[#2D2F33] font-medium hover:scale-105 transition-transform"
          >
            <Link href={`/journey/library/${courseSlug}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Course
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFBF5]">
      {/* Confetti Celebration */}
      <ConfettiCelebration trigger={showConfetti} />

      {/* Success Toast */}
      <EncouragingToast
        message={toastMessage}
        visible={showToast}
        onClose={() => setShowToast(false)}
        type="success"
      />

      {/* Reading Progress Bar - Subtle and calming */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-[#F4E9D8]/50 z-50">
        <div
          className="h-full bg-gradient-to-r from-[#E2C379] to-[#C9A961] transition-all duration-300 ease-out shadow-sm"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Header with smooth hover effects */}
      <div className="border-b border-[#F4E9D8] bg-white/90 backdrop-blur-md sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <Link
              href={`/journey/library/${courseSlug}`}
              className="text-sm text-[#2D2F33]/60 hover:text-[#2D2F33] inline-flex items-center gap-2 transition-all group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="group-hover:underline underline-offset-4">
                Back to Course
              </span>
            </Link>
            <div className="flex items-center gap-4">
              {lesson.estimatedTime && (
                <div className="hidden sm:flex items-center gap-2 text-sm text-[#2D2F33]/60">
                  <Clock className="h-4 w-4" />
                  {lesson.estimatedTime}
                </div>
              )}
              {lesson.completed && (
                <div className="flex items-center gap-2 text-sm text-green-600 font-medium animate-fade-in">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Completed</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Lesson Content */}
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="max-w-3xl mx-auto">
          {/* Lesson Header - Entrance animation */}
          <div className="mb-12 animate-fade-in">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative group">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#E2C379] to-[#C9A961] flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <span className="font-bold text-xl text-[#2D2F33]">
                    {lesson.number}
                  </span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#FFFBF5] border-2 border-[#E2C379] flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                  <Sparkles className="h-3 w-3 text-[#E2C379]" />
                </div>
              </div>
              <div>
                <p className="text-sm text-[#2D2F33]/50 font-medium uppercase tracking-wide mb-1">
                  Lesson {lesson.number}
                </p>
                <h1 className="text-4xl lg:text-5xl font-serif font-bold text-[#2D2F33] leading-tight">
                  {lesson.title}
                </h1>
              </div>
            </div>

            {/* Lesson Meta */}
            <div className="flex items-center gap-6 pb-8 border-b border-[#F4E9D8]">
              {lesson.estimatedTime && (
                <div className="flex items-center gap-2 text-sm text-[#2D2F33]/60">
                  <Clock className="h-4 w-4" />
                  <span>{lesson.estimatedTime} read</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm text-[#2D2F33]/60">
                <BookOpen className="h-4 w-4" />
                <span>Professional Development</span>
              </div>
            </div>
          </div>

          {/* Lesson Body - Beautiful typography from globals.css */}
          <div className="lesson-content mb-16">
            <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
          </div>

          {/* Completion Card - Warm and inviting */}
          <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-[#F4E9D8] to-[#FFFBF5] border-2 border-[#E2C379]/30 shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-up">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#E2C379] flex items-center justify-center flex-shrink-0 shadow-md">
                <Award className="h-6 w-6 text-[#2D2F33]" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-xl text-[#2D2F33] mb-2">
                  Ready to continue your journey?
                </h3>
                <p className="text-[#2D2F33]/70 text-sm leading-relaxed">
                  Mark this lesson as complete to track your progress and
                  celebrate your learning momentum.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Button
                onClick={handleMarkComplete}
                disabled={isCompleting || lesson.completed}
                className="flex-1 bg-[#E2C379] hover:bg-[#C9A961] text-[#2D2F33] font-semibold py-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isCompleting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#2D2F33] border-t-transparent mr-2" />
                    Completing...
                  </>
                ) : lesson.completed ? (
                  <>
                    <CheckCircle2 className="mr-2 h-5 w-5" />
                    Completed
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="mr-2 h-5 w-5" />
                    Mark as Complete
                  </>
                )}
              </Button>

              <Button
                asChild
                variant="outline"
                className="border-[#E2C379]/30 hover:bg-[#E2C379]/10 text-[#2D2F33] py-6 rounded-xl hover:border-[#E2C379] transition-all duration-300"
              >
                <Link href={`/journey/library/${courseSlug}`}>
                  Back to Course
                </Link>
              </Button>
            </div>
          </div>

          {/* Admin Note - Only visible in development */}
          {process.env.NODE_ENV === "development" && (
            <div className="mt-8 bg-blue-50 border-l-4 border-blue-400 rounded-lg p-6">
              <h3 className="font-bold mb-2 text-blue-900 flex items-center gap-2">
                <span>🔧</span>
                Development Note
              </h3>
              <p className="text-sm text-blue-800 mb-3">
                Lesson content should be managed in Frappe. This is a
                development-only notice.
              </p>
              <Button asChild variant="outline" size="sm" className="bg-white">
                <a
                  href={`http://46.202.93.22:8000/app/lms-course/${courseSlug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Edit in Frappe Admin
                </a>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
