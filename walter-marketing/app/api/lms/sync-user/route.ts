import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { syncUserToFrappe } from '@/lib/lms/auth-bridge';

/**
 * Sync Supabase user to Frappe LMS
 * Called after signup or when user first accesses LMS
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('lms_user_id, lms_api_token, name')
      .eq('id', user.id)
      .single();

    // If already synced, return existing data
    if (profile?.lms_user_id && profile?.lms_api_token) {
      return NextResponse.json({
        success: true,
        lmsUserId: profile.lms_user_id,
        alreadySynced: true,
      });
    }

    // Sync to Frappe
    const result = await syncUserToFrappe(
      user.id,
      user.email!,
      profile?.name
    );

    if (!result.success) {
      return NextResponse.json(
        { error: 'Failed to sync user to LMS' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      lmsUserId: result.lmsUserId,
      alreadySynced: false,
    });
  } catch (error) {
    console.error('Sync user error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
