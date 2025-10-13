import { NextRequest, NextResponse } from 'next/server';
import { frappeClient } from '@/lib/lms/frappe-client';

/**
 * Fetch course details with chapters and lessons from Frappe
 */
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const params = await context.params;
    const courseSlug = params.slug;

    // Fetch course from Frappe
    const course = await frappeClient.getDoc('LMS Course', courseSlug);

    if (!course.data) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    // Fetch chapters for this course
    const chaptersRes = await frappeClient.getDocList(
      'Course Chapter',
      ['name', 'title', 'idx'],
      [['course', '=', courseSlug]]
    );

    const chapters = chaptersRes.data || [];

    // Fetch lessons for each chapter
    for (const chapter of chapters) {
      const lessonsRes = await frappeClient.getDocList(
        'Course Lesson',
        ['name', 'title', 'body', 'youtube', 'idx'],
        [['chapter', '=', chapter.name]]
      );

      chapter.lessons = (lessonsRes.data || []).sort((a: any, b: any) => a.idx - b.idx);
    }

    // Sort chapters
    chapters.sort((a: any, b: any) => a.idx - b.idx);

    return NextResponse.json({
      course: course.data,
      chapters,
    });
  } catch (error: any) {
    console.error('Get course error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch course', details: error.message },
      { status: 500 }
    );
  }
}
