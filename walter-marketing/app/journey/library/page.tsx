"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, BookOpen, ArrowRight } from "lucide-react";
import courseLibrary from "@/data/course-library.json";

export default function CourseLibraryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = courseLibrary.categories;

  // Filter courses by search and category
  const filteredCategories = selectedCategory
    ? categories.filter(cat => cat.id === selectedCategory)
    : categories;

  const getFilteredCourses = (category: any) => {
    if (!searchQuery) return category.courses;

    return category.courses.filter((course: any) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const totalCourses = categories.reduce((sum, cat) => sum + cat.courses.length, 0);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <Link href="/journey/learn" className="text-sm text-muted-foreground hover:text-foreground mb-4 inline-block">
              ← Back to Journey
            </Link>
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">
              Course Library
            </h1>
            <p className="text-muted-foreground">
              {totalCourses} professional development courses to deepen your Camino practice
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E2C379] focus:border-transparent"
              />
            </div>

            <select
              value={selectedCategory || ''}
              onChange={(e) => setSelectedCategory(e.target.value || null)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E2C379] focus:border-transparent min-w-[200px]"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.name} ({cat.courses.length})
                </option>
              ))}
            </select>
          </div>

          {/* Course Categories */}
          <div className="space-y-12">
            {filteredCategories.map(category => {
              const courses = getFilteredCourses(category);

              if (courses.length === 0 && searchQuery) return null;

              return (
                <div key={category.id}>
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-2">{category.name}</h2>
                    <p className="text-muted-foreground">{category.description}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {category.caminoThemes.map((theme: string) => (
                        <span
                          key={theme}
                          className="px-3 py-1 rounded-full bg-[#E2C379]/10 text-xs font-medium text-[#2D2F33]"
                        >
                          {theme}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {courses.map((course: any) => (
                      <Link
                        key={course.slug}
                        href={`/journey/library/${course.slug}`}
                        className="border rounded-xl p-6 bg-card hover:shadow-lg hover:border-[#E2C379]/50 transition-all group"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <BookOpen className="h-5 w-5 text-[#E2C379] flex-shrink-0" />
                          <span className="px-2 py-0.5 rounded text-xs bg-muted text-muted-foreground">
                            {course.theme}
                          </span>
                        </div>
                        <h3 className="font-bold mb-2 group-hover:text-[#E2C379] transition-colors">
                          {course.title}
                        </h3>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>Multiple lessons</span>
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* No Results */}
          {searchQuery && filteredCategories.every(cat => getFilteredCourses(cat).length === 0) && (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No courses found for "{searchQuery}"</p>
              <Button
                variant="outline"
                onClick={() => setSearchQuery('')}
              >
                Clear search
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
