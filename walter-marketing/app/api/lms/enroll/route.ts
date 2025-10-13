import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { enrollUserInJourneyModules } from '@/lib/lms/auth-bridge';

/**
 * Enroll user in Journey modules based on their subscription
 * Called when user upgrades to Journey or Coach tier
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user profile with subscription
    const { data: profile } = await supabase
      .from('profiles')
      .select('plan, lms_api_token')
      .eq('id', user.id)
      .single();

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    // Check if user has access
    if (profile.plan === 'reflect') {
      return NextResponse.json(
        { error: 'Upgrade to Journey to access courses' },
        { status: 403 }
      );
    }

    if (!profile.lms_api_token) {
      return NextResponse.json(
        { error: 'LMS not synced. Call /api/lms/sync-user first' },
        { status: 400 }
      );
    }

    // Enroll in all Journey modules
    await enrollUserInJourneyModules(
      user.email!,
      profile.plan,
      profile.lms_api_token
    );

    return NextResponse.json({ success: true, message: 'Enrolled in Journey modules' });
  } catch (error) {
    console.error('Enroll error:', error);
    return NextResponse.json(
      { error: 'Failed to enroll in courses' },
      { status: 500 }
    );
  }
}
