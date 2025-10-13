import { NextRequest, NextResponse } from 'next/server';
import { frappeClient } from '@/lib/lms/frappe-client';

/**
 * Fetch single lesson from Frappe
 */
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ name: string }> }
) {
  try {
    const params = await context.params;
    const lessonName = params.name;

    // Fetch lesson from Frappe
    const lesson = await frappeClient.getDoc('Course Lesson', lessonName);

    if (!lesson.data) {
      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 });
    }

    return NextResponse.json({ lesson: lesson.data });
  } catch (error: any) {
    console.error('Get lesson error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch lesson', details: error.message },
      { status: 500 }
    );
  }
}
