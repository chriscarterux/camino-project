import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getCourseProgress, getCompletedLessons } from '@/lib/lms/progress';

/**
 * Get user's LMS progress across all modules
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user profile with LMS token
    const { data: profile } = await supabase
      .from('profiles')
      .select('lms_api_token, plan')
      .eq('id', user.id)
      .single();

    // Check if user has Journey access
    if (profile?.plan === 'reflect') {
      return NextResponse.json({
        overallProgress: 0,
        modules: [],
        message: 'Upgrade to Journey to access learning modules'
      });
    }

    // Define modules
    const modules = [
      { slug: 'camino-module-1-awareness', name: 'Awareness' },
      { slug: 'camino-module-2-belonging', name: 'Belonging' },
      { slug: 'camino-module-3-resilience', name: 'Resilience' },
      { slug: 'camino-module-4-purpose', name: 'Purpose & Performance' },
    ];

    // Try to get cached progress from Supabase first (FAST)
    const { data: cachedLessons } = await supabase
      .from('lesson_progress')
      .select('*')
      .eq('user_id', user.id);

    const progressData = await Promise.all(
      modules.map(async (module) => {
        // Get cached progress for this module
        const moduleLessons = cachedLessons?.filter(l => l.course_slug === module.slug) || [];
        const completedCount = moduleLessons.filter(l => l.is_completed).length;
        const totalLessons = 8; // TODO: Get from LMS or hardcode per module

        // Calculate progress percentage
        const progress = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

        return {
          moduleSlug: module.slug,
          moduleName: module.name,
          progress,
          completedLessons: completedCount,
          totalLessons,
          completedLessonIds: moduleLessons
            .filter(l => l.is_completed)
            .map(l => l.lesson_id),
        };
      })
    );

    // Calculate overall progress
    const totalProgress = progressData.reduce((sum, m) => sum + m.progress, 0) / modules.length;

    // Get certificates
    const { data: certificates } = await supabase
      .from('certificates')
      .select('*')
      .eq('user_id', user.id);

    return NextResponse.json({
      overallProgress: Math.round(totalProgress),
      modules: progressData,
      certificates: certificates || [],
    });
  } catch (error) {
    console.error('Get progress error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch progress' },
      { status: 500 }
    );
  }
}
