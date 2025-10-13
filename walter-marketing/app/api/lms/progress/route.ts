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

    if (!profile?.lms_api_token) {
      return NextResponse.json(
        { error: 'LMS not synced' },
        { status: 400 }
      );
    }

    // Fetch progress for each module
    const modules = [
      { slug: 'camino-module-1-awareness', name: 'Awareness' },
      { slug: 'camino-module-2-belonging', name: 'Belonging' },
      { slug: 'camino-module-3-resilience', name: 'Resilience' },
      { slug: 'camino-module-4-purpose', name: 'Purpose & Performance' },
    ];

    const progressData = await Promise.all(
      modules.map(async (module) => {
        try {
          const progress = await getCourseProgress(
            module.slug,
            user.email!,
            profile.lms_api_token
          );

          const completedLessons = await getCompletedLessons(
            module.slug,
            user.email!,
            profile.lms_api_token
          );

          return {
            moduleSlug: module.slug,
            moduleName: module.name,
            progress: progress.percentage || 0,
            completedLessons: progress.completedLessons || 0,
            totalLessons: progress.totalLessons || 8,
            completedLessonIds: completedLessons,
          };
        } catch (error) {
          console.error(`Error fetching progress for ${module.slug}:`, error);
          return {
            moduleSlug: module.slug,
            moduleName: module.name,
            progress: 0,
            completedLessons: 0,
            totalLessons: 8,
            completedLessonIds: [],
          };
        }
      })
    );

    // Calculate overall progress
    const totalProgress = progressData.reduce((sum, m) => sum + m.progress, 0) / modules.length;

    return NextResponse.json({
      overallProgress: Math.round(totalProgress),
      modules: progressData,
    });
  } catch (error) {
    console.error('Get progress error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch progress' },
      { status: 500 }
    );
  }
}
