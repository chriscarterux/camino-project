import { Button } from "@/components/ui/button";
import { Plus, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function AdminCoursesPage() {
  const modules = [
    { id: 1, title: 'Awareness', slug: 'camino-module-1-awareness', lessons: 8, enrollments: 42, status: 'Published' },
    { id: 2, title: 'Belonging', slug: 'camino-module-2-belonging', lessons: 8, enrollments: 38, status: 'Published' },
    { id: 3, title: 'Resilience', slug: 'camino-module-3-resilience', lessons: 8, enrollments: 28, status: 'Draft' },
    { id: 4, title: 'Purpose & Performance', slug: 'camino-module-4-purpose', lessons: 8, enrollments: 0, status: 'Draft' },
  ];

  return (
    <div className="p-6 md:p-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold mb-2">Course Management</h1>
          <p className="text-muted-foreground">Manage Journey modules and lessons</p>
        </div>
        <div className="flex gap-3">
          <Button asChild variant="outline">
            <a
              href="http://lms.localhost:8000/app/lms-course"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Open Frappe Admin
            </a>
          </Button>
          <Button asChild className="bg-[#E2C379] hover:bg-[#E2C379]/90 text-[#2D2F33]">
            <a
              href="http://lms.localhost:8000/app/lms-course/new"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Plus className="mr-2 h-4 w-4" />
              New Course
            </a>
          </Button>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {modules.map((module) => (
          <div key={module.id} className="border rounded-xl p-6 bg-card">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-10 h-10 rounded-full bg-[#E2C379]/20 flex items-center justify-center">
                    <span className="font-bold text-[#2D2F33]">{module.id}</span>
                  </div>
                  <h3 className="text-xl font-bold">{module.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{module.slug}</p>
              </div>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                module.status === 'Published'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-yellow-100 text-yellow-700'
              }`}>
                {module.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div>
                <div className="text-muted-foreground">Lessons</div>
                <div className="font-semibold">{module.lessons}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Enrollments</div>
                <div className="font-semibold">{module.enrollments}</div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button asChild variant="outline" size="sm" className="flex-1">
                <Link href={`/journey/learn/${module.slug}`}>
                  Preview
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="flex-1">
                <a
                  href={`http://lms.localhost:8000/app/lms-course/${module.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Edit in Frappe
                </a>
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Instructions */}
      <div className="mt-8 border rounded-xl p-6 bg-[#F4E9D8]/50">
        <h3 className="font-bold mb-3">Managing Courses</h3>
        <div className="text-sm text-muted-foreground space-y-2">
          <p>• <strong>Create courses</strong> in Frappe LMS admin (opens in new tab)</p>
          <p>• <strong>Upload videos</strong> via YouTube links or direct uploads</p>
          <p>• <strong>Add quizzes</strong> to track understanding</p>
          <p>• <strong>Preview</strong> courses as students see them in Camino</p>
          <p>• <strong>Enrollments</strong> happen automatically when users subscribe to Journey</p>
        </div>
      </div>
    </div>
  );
}
