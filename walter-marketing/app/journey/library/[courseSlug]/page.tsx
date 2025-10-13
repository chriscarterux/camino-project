"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Circle,
  Award,
  Download,
  Sparkles,
} from "lucide-react";
import { ProgressRing } from "@/components/lms/ProgressRing";
import { ConfettiCelebration } from "@/components/lms/ConfettiCelebration";
import { EncouragingToast } from "@/components/lms/EncouragingToast";
import courseLibrary from "@/data/course-library.json";

// Milestone celebration messages
const milestoneMessages: Record<number, string> = {
  25: "Great start! You're building momentum.",
  50: "Halfway there! Your dedication is impressive.",
  75: "Almost complete! You're so close to finishing.",
  100: "Congratulations! You've completed this course!",
};

export default function LibraryCourseDetailPage() {
  const params = useParams();
  const courseSlug = params.courseSlug as string;

  const [course, setCourse] = useState<any>(null);
  const [lessons, setLessons] = useState<any[]>([]);
  const [progress, setProgress] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [certificateEarned, setCertificateEarned] = useState(false);
  const [showMilestoneConfetti, setShowMilestoneConfetti] = useState(false);
  const [showMilestoneToast, setShowMilestoneToast] = useState(false);
  const [milestoneMessage, setMilestoneMessage] = useState("");

  useEffect(() => {
    async function loadCourseFromFrappe() {
      try {
        const response = await fetch(`/api/lms/course/${courseSlug}`);

        if (!response.ok) {
          throw new Error("Course not found");
        }

        const { chapters } = await response.json();

        // Find in catalog for theme info
        let catalogCourse = null;
        let category = null;

        for (const cat of courseLibrary.categories) {
          const found = cat.courses.find((c: any) => c.slug === courseSlug);
          if (found) {
            catalogCourse = found;
            category = cat;
            break;
          }
        }

        setCourse({
          ...catalogCourse,
          category: category?.name || "Unknown",
          categoryId: category?.id || "",
        });

        // Extract lessons from chapters
        const allLessons = chapters.flatMap((chapter: any) =>
          (chapter.lessons || []).map((lesson: any) => ({
            id: lesson.name,
            number: lesson.idx,
            title: lesson.title,
            duration: "5-10 min",
            type: "content",
          }))
        );

        setLessons(allLessons);
        setProgress(0); // TODO: Fetch real progress
        setCompletedLessons([]);
        setCertificateEarned(false);
      } catch (error) {
        console.error("Error loading course:", error);
      }
    }

    loadCourseFromFrappe();
  }, [courseSlug]);

  const handleMilestone = (milestone: number) => {
    const message = milestoneMessages[milestone];
    if (message) {
      setMilestoneMessage(message);
      setShowMilestoneToast(true);

      if (milestone === 100 || milestone === 50 || milestone === 75) {
        setShowMilestoneConfetti(true);
        setTimeout(() => setShowMilestoneConfetti(false), 4000);
      }
    }
  };

  if (!course) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FFFBF5]">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-[#F4E9D8] rounded-full"></div>
            <div className="absolute inset-0 border-4 border-[#E2C379] border-t-transparent rounded-full animate-spin"></div>
            <BookOpen className="absolute inset-0 m-auto h-8 w-8 text-[#E2C379] animate-pulse" />
          </div>
          <p className="text-sm text-[#2D2F33]/60 font-serif">
            Loading your course...
          </p>
        </div>
      </div>
    );
  }

  const allLessonsComplete = progress === 100;

  return (
    <div className="min-h-screen bg-[#FFFBF5]">
      {/* Milestone Celebrations */}
      <ConfettiCelebration trigger={showMilestoneConfetti} />
      <EncouragingToast
        message={milestoneMessage}
        visible={showMilestoneToast}
        onClose={() => setShowMilestoneToast(false)}
        type="milestone"
      />

      {/* Header */}
      <div className="border-b border-[#F4E9D8] bg-white/90 backdrop-blur-md">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-5xl mx-auto">
            <Link
              href="/journey/library"
              className="text-sm text-[#2D2F33]/60 hover:text-[#2D2F33] mb-6 inline-flex items-center gap-2 transition-all group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="group-hover:underline underline-offset-4">
                Back to Library
              </span>
            </Link>

            <div className="flex items-start justify-between gap-8 mt-6">
              <div className="flex-1 animate-fade-in">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#E2C379]/20 flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-[#E2C379]" />
                  </div>
                  <span className="text-sm text-[#2D2F33]/60 font-medium">
                    {course.category}
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-[#2D2F33] leading-tight">
                  {course.title}
                </h1>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-4 py-1.5 rounded-full bg-[#E2C379]/10 text-sm font-medium text-[#2D2F33] border border-[#E2C379]/20">
                    {course.theme}
                  </span>
                  <span className="px-4 py-1.5 rounded-full bg-[#F4E9D8] text-sm text-[#2D2F33]/70">
                    {lessons.length} lessons
                  </span>
                </div>
              </div>

              {/* Progress Ring with milestone detection */}
              <div className="flex-shrink-0 animate-scale-in">
                <ProgressRing
                  progress={progress}
                  size={120}
                  strokeWidth={8}
                  onMilestone={handleMilestone}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Banner - Celebration moment */}
      {allLessonsComplete && (
        <div className="bg-gradient-to-r from-[#E2C379]/30 via-[#F4E9D8] to-[#E2C379]/30 border-b border-[#E2C379] animate-slide-down">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#E2C379] to-[#C9A961] flex items-center justify-center shadow-lg animate-pulse">
                  <Award className="h-8 w-8 text-[#2D2F33]" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-2xl text-[#2D2F33] mb-1 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-[#E2C379]" />
                    Course Complete!
                  </h3>
                  <p className="text-sm text-[#2D2F33]/70">
                    You've earned your certificate for {course.title}
                  </p>
                </div>
              </div>
              <Button className="bg-[#E2C379] hover:bg-[#C9A961] text-[#2D2F33] font-semibold px-6 py-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                <Download className="mr-2 h-5 w-5" />
                Download Certificate
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Lessons List */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-serif font-bold text-[#2D2F33]">
              Course Lessons
            </h2>
            <p className="text-sm text-[#2D2F33]/60">
              {completedLessons.length} of {lessons.length} completed
            </p>
          </div>

          <div className="space-y-3">
            {lessons.map((lesson, index) => {
              const isCompleted = completedLessons.includes(lesson.id);
              const isNext = !isCompleted && index > 0 && completedLessons.includes(lessons[index - 1]?.id);

              return (
                <Link
                  key={lesson.id}
                  href={`/journey/library/${courseSlug}/${lesson.id}`}
                  className={`block border-2 rounded-2xl p-5 bg-white transition-all duration-300 group ${
                    isCompleted
                      ? "border-[#E2C379]/30 hover:border-[#E2C379]/60 hover:shadow-md"
                      : isNext
                      ? "border-[#E2C379]/50 hover:border-[#E2C379] hover:shadow-lg ring-2 ring-[#E2C379]/20"
                      : "border-[#F4E9D8] hover:border-[#E2C379]/40 hover:shadow-md"
                  } hover:scale-[1.01]`}
                  style={{
                    animationDelay: `${index * 0.05}s`,
                  }}
                >
                  <div className="flex items-center gap-4">
                    {/* Status Icon with smooth animations */}
                    <div className="flex-shrink-0">
                      {isCompleted ? (
                        <div className="relative">
                          <CheckCircle2 className="h-7 w-7 text-[#E2C379] drop-shadow-sm" />
                          <div className="absolute inset-0 animate-ping opacity-20">
                            <CheckCircle2 className="h-7 w-7 text-[#E2C379]" />
                          </div>
                        </div>
                      ) : (
                        <Circle
                          className={`h-7 w-7 transition-colors duration-300 ${
                            isNext
                              ? "text-[#E2C379] animate-pulse"
                              : "text-[#2D2F33]/20 group-hover:text-[#E2C379]/60"
                          }`}
                        />
                      )}
                    </div>

                    {/* Lesson Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-sm font-medium text-[#2D2F33]/60">
                          Lesson {lesson.number}
                        </span>
                        {lesson.type === "quiz" && (
                          <span className="px-2 py-0.5 rounded-full text-xs bg-blue-100 text-blue-700 font-medium">
                            Quiz
                          </span>
                        )}
                        {isNext && (
                          <span className="px-2 py-0.5 rounded-full text-xs bg-[#E2C379]/20 text-[#2D2F33] font-medium flex items-center gap-1">
                            <Sparkles className="h-3 w-3" />
                            Continue here
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold text-[#2D2F33] group-hover:text-[#E2C379] transition-colors duration-300">
                        {lesson.title}
                      </h3>
                    </div>

                    {/* Duration */}
                    <div className="text-sm text-[#2D2F33]/50 hidden md:block">
                      {lesson.duration}
                    </div>

                    <ArrowRight className="h-5 w-5 text-[#2D2F33]/30 group-hover:text-[#E2C379] group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Certificate Info Box */}
          {!allLessonsComplete && (
            <div className="mt-12 border-2 border-[#E2C379]/30 rounded-2xl p-8 bg-gradient-to-br from-[#F4E9D8]/50 to-white shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#E2C379]/20 flex items-center justify-center flex-shrink-0">
                  <Award className="h-6 w-6 text-[#E2C379]" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#2D2F33] mb-2">
                    Certificate of Completion
                  </h3>
                  <p className="text-sm text-[#2D2F33]/70 leading-relaxed">
                    Complete all {lessons.length} lessons to earn your
                    certificate for {course.title}. Certificates are
                    automatically generated and available for download upon
                    completion.
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm text-[#2D2F33]/60">
                    <div className="w-full max-w-xs h-2 bg-[#F4E9D8] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#E2C379] to-[#C9A961] transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="font-medium">{Math.round(progress)}%</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Global Animations */}
      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .animate-slide-down {
          animation: slide-down 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}
