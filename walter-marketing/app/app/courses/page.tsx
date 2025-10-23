import { Button } from "@/components/ui/button";
import { GraduationCap, Clock, Users, ArrowRight, ExternalLink, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function CoursesPage() {
  const courses = [
    {
      id: 1,
      title: "Foundations of Self-Awareness",
      description: "Build a strong foundation for understanding yourself, your values, and what drives your decisions.",
      duration: "8 weeks",
      lessons: 24,
      enrolled: 1234,
      progress: 65,
      status: "in-progress",
      category: "Foundation"
    },
    {
      id: 2,
      title: "Values-Based Decision Making",
      description: "Learn to make decisions that align with your core values and reduce decision fatigue.",
      duration: "6 weeks",
      lessons: 18,
      enrolled: 892,
      progress: 0,
      status: "available",
      category: "Transformation"
    },
    {
      id: 3,
      title: "Habit Architecture",
      description: "Design sustainable habits that support your transformation journey.",
      duration: "8 weeks",
      lessons: 32,
      enrolled: 1567,
      progress: 100,
      status: "completed",
      category: "Transformation"
    },
    {
      id: 4,
      title: "Mindful Reflection Practices",
      description: "Advanced techniques for deeper self-reflection and pattern recognition.",
      duration: "4 weeks",
      lessons: 16,
      enrolled: 543,
      progress: 0,
      status: "available",
      category: "Mastery"
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold mb-2">Learning Courses</h1>
          <p className="text-muted-foreground">
            Structured programs to guide your transformation journey
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href={process.env.NEXT_PUBLIC_LMS_URL || "http://lms.localhost:8000/lms"}>
            Browse All Courses
            <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Quick Access to LMS */}
      <div className="rounded-lg border-2 border-primary bg-gradient-to-r from-primary/5 to-primary/10 p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold mb-2">Full Course Library</h2>
            <p className="text-muted-foreground mb-4">
              Access all available courses, live sessions, and community discussions in the Learning Management System
            </p>
            <Button asChild>
              <Link href={process.env.NEXT_PUBLIC_LMS_URL || "http://lms.localhost:8000/lms"}>
                <GraduationCap className="mr-2 h-4 w-4" />
                Open Course Library
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b">
        {["All", "In Progress", "Completed", "Available"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
              tab === "All"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Courses Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {courses.map((course) => (
          <div
            key={course.id}
            className="rounded-lg border bg-card overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Course Header */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {course.category}
                </span>
                {course.status === "completed" && (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                )}
              </div>

              <h3 className="text-xl font-bold mb-2">{course.title}</h3>
              <p className="text-muted-foreground mb-4">{course.description}</p>

              {/* Course Meta */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <GraduationCap className="h-4 w-4" />
                  <span>{course.lessons} lessons</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{course.enrolled.toLocaleString()}</span>
                </div>
              </div>

              {/* Progress Bar */}
              {course.progress > 0 && (
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{course.progress}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* CTA Button */}
              <Button
                variant={course.status === "in-progress" ? "default" : "outline"}
                className="w-full"
              >
                {course.status === "in-progress" && "Continue Learning"}
                {course.status === "completed" && "Review Course"}
                {course.status === "available" && "Start Course"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* CTA to explore more */}
      <div className="rounded-lg border border-dashed bg-card p-8 text-center">
        <GraduationCap className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-lg font-semibold mb-2">Explore More Courses</h3>
        <p className="text-muted-foreground mb-4">
          Visit the full Learning Management System to browse all available courses, join live sessions, and connect with the community
        </p>
        <Button asChild>
          <Link href={process.env.NEXT_PUBLIC_LMS_URL || "http://lms.localhost:8000/lms"}>
            View All Courses in LMS
            <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
