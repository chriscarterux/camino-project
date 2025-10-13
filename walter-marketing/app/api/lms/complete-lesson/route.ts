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

    // TODO: Update progress cache in Supabase for fast dashboard queries

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Complete lesson error:', error);
    return NextResponse.json(
      { error: 'Failed to complete lesson' },
      { status: 500 }
    );
  }
}
