"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, CheckCircle2, Circle, Award, Download } from "lucide-react";
import { ProgressRing } from "@/components/lms/ProgressRing";
import courseLibrary from "@/data/course-library.json";

export default function LibraryCourseDetailPage() {
  const params = useParams();
  const courseSlug = params.courseSlug as string;

  const [course, setCourse] = useState<any>(null);
  const [lessons, setLessons] = useState<any[]>([]);
  const [progress, setProgress] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [certificateEarned, setCertificateEarned] = useState(false);

  useEffect(() => {
    // Find course in catalog
    for (const category of courseLibrary.categories) {
      const foundCourse = category.courses.find((c: any) => c.slug === courseSlug);
      if (foundCourse) {
        setCourse({
          ...foundCourse,
          category: category.name,
          categoryId: category.id,
        });

        // Mock lessons (in production, fetch from Frappe API)
        const mockLessons = generateMockLessons(foundCourse.title);
        setLessons(mockLessons);

        // Mock progress
        setProgress(35);
        setCompletedLessons(['lesson-1', 'lesson-2']);
        setCertificateEarned(false); // Only true when progress === 100
        break;
      }
    }
  }, [courseSlug]);

  // Generate mock lessons based on typical course structure
  function generateMockLessons(courseTitle: string) {
    // Typical structure has 10-25 lessons
    const lessonCount = Math.floor(Math.random() * 15) + 10;
    const lessons = [];

    for (let i = 1; i <= lessonCount; i++) {
      lessons.push({
        id: `lesson-${i}`,
        number: i,
        title: `Lesson ${i}`,
        duration: '5-10 min',
        type: i % 5 === 0 ? 'quiz' : 'content',
      });
    }

    return lessons;
  }

  if (!course) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Course not found</h2>
          <Button asChild>
            <Link href="/journey/library">Back to Library</Link>
          </Button>
        </div>
      </div>
    );
  }

  const allLessonsComplete = progress === 100;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-5xl mx-auto">
            <Link href="/journey/library" className="text-sm text-muted-foreground hover:text-foreground mb-4 inline-block">
              <ArrowLeft className="inline mr-2 h-4 w-4" />
              Back to Library
            </Link>

            <div className="flex items-start justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <BookOpen className="h-6 w-6 text-[#E2C379]" />
                  <span className="text-sm text-muted-foreground">{course.category}</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                  {course.title}
                </h1>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-[#E2C379]/10 text-xs font-medium text-[#2D2F33]">
                    {course.theme}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-muted text-xs text-muted-foreground">
                    {lessons.length} lessons
                  </span>
                </div>
              </div>

              {/* Progress Ring */}
              <ProgressRing progress={progress} size={100} />
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Banner (shown when course complete) */}
      {allLessonsComplete && (
        <div className="bg-gradient-to-r from-[#E2C379]/20 to-[#F4E9D8] border-b border-[#E2C379]">
          <div className="container mx-auto px-4 py-6">
            <div className="max-w-5xl mx-auto flex items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#E2C379] flex items-center justify-center">
                  <Award className="h-6 w-6 text-[#2D2F33]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#2D2F33]">🎉 Course Complete!</h3>
                  <p className="text-sm text-[#2D2F33]/80">
                    You've earned your certificate for {course.title}
                  </p>
                </div>
              </div>
              <Button className="bg-[#E2C379] hover:bg-[#E2C379]/90 text-[#2D2F33]">
                <Download className="mr-2 h-4 w-4" />
                Download Certificate
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Lessons List */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Course Lessons</h2>

          <div className="space-y-2">
            {lessons.map((lesson) => {
              const isCompleted = completedLessons.includes(lesson.id);

              return (
                <Link
                  key={lesson.id}
                  href={`/journey/library/${courseSlug}/${lesson.id}`}
                  className="block border rounded-xl p-4 bg-card hover:shadow-md hover:border-[#E2C379]/50 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    {/* Status Icon */}
                    <div className="flex-shrink-0">
                      {isCompleted ? (
                        <CheckCircle2 className="h-6 w-6 text-[#E2C379]" />
                      ) : (
                        <Circle className="h-6 w-6 text-muted-foreground" />
                      )}
                    </div>

                    {/* Lesson Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-muted-foreground">
                          Lesson {lesson.number}
                        </span>
                        {lesson.type === 'quiz' && (
                          <span className="px-2 py-0.5 rounded text-xs bg-blue-100 text-blue-700">
                            Quiz
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold group-hover:text-[#E2C379] transition-colors">
                        {lesson.title}
                      </h3>
                    </div>

                    {/* Duration */}
                    <div className="text-sm text-muted-foreground hidden md:block">
                      {lesson.duration}
                    </div>

                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-[#E2C379] group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Certificate Info Box */}
          <div className="mt-12 border rounded-xl p-6 bg-[#F4E9D8]/50">
            <div className="flex items-start gap-4">
              <Award className="h-8 w-8 text-[#E2C379] flex-shrink-0" />
              <div>
                <h3 className="font-bold mb-2">Certificate of Completion</h3>
                <p className="text-sm text-muted-foreground">
                  Complete all {lessons.length} lessons to earn your certificate for {course.title}.
                  Certificates are automatically generated and available for download.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
