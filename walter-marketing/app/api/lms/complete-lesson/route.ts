import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { completelesson } from '@/lib/lms/progress';

/**
 * Mark a lesson as complete
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { lessonId, moduleSlug } = await request.json();

    if (!lessonId) {
      return NextResponse.json(
        { error: 'Lesson ID is required' },
        { status: 400 }
      );
    }

    // Get user's LMS API token
    const { data: profile } = await supabase
      .from('profiles')
      .select('lms_api_token')
      .eq('id', user.id)
      .single();

    if (!profile?.lms_api_token) {
      return NextResponse.json(
        { error: 'LMS not configured' },
        { status: 400 }
      );
    }

    // Mark lesson complete in Frappe
    await completelesson(lessonId, user.email!, profile.lms_api_token);

    // Cache lesson completion in Supabase for fast dashboard queries
    const { data: lessonProgress, error: progressError } = await supabase
      .from('lesson_progress')
      .upsert({
        user_id: user.id,
        course_slug: moduleSlug || 'unknown',
        lesson_id: lessonId,
        lesson_name: lessonId, // TODO: Pass actual lesson name from frontend
        is_completed: true,
        completed_at: new Date().toISOString(),
      }, {
        onConflict: 'user_id,course_slug,lesson_id'
      })
      .select()
      .single();

    if (progressError) {
      console.error('Failed to cache lesson progress:', progressError);
    }

    // Check if course is complete and generate certificate
    if (moduleSlug) {
      const { data: courseProgress } = await supabase
        .from('lesson_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('course_slug', moduleSlug);

      // If all lessons are complete, generate certificate
      // TODO: Get actual lesson count from LMS
      const totalLessons = 8; // Placeholder
      if (courseProgress && courseProgress.filter(l => l.is_completed).length >= totalLessons) {
        await supabase
          .from('certificates')
          .upsert({
            user_id: user.id,
            course_slug: moduleSlug,
            course_name: moduleSlug.replace(/-/g, ' '),
            certificate_url: null, // Will be generated later
          }, {
            onConflict: 'user_id,course_slug'
          });
      }
    }

    return NextResponse.json({ success: true, lessonProgress });
  } catch (error) {
    console.error('Complete lesson error:', error);
    return NextResponse.json(
      { error: 'Failed to complete lesson' },
      { status: 500 }
    );
  }
}
