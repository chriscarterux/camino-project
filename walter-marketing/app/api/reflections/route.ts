import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// GET - Fetch user's reflections
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: reflections, error } = await supabase
      .from('reflections')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return NextResponse.json({ reflections });
  } catch (error) {
    console.error('Get reflections error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reflections' },
      { status: 500 }
    );
  }
}

// POST - Create new reflection
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { prompt_id, prompt_text, content, mood } = await request.json();

    if (!prompt_id || !prompt_text || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const { data: reflection, error } = await supabase
      .from('reflections')
      .insert({
        user_id: user.id,
        prompt_id,
        prompt_text,
        content,
        mood,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    // Update streak
    await updateStreak(supabase, user.id);

    return NextResponse.json({ reflection });
  } catch (error) {
    console.error('Create reflection error:', error);
    return NextResponse.json(
      { error: 'Failed to save reflection' },
      { status: 500 }
    );
  }
}

// Helper function to update user streak
async function updateStreak(supabase: any, userId: string) {
  const { data: reflections } = await supabase
    .from('reflections')
    .select('created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(30);

  if (!reflections || reflections.length === 0) {
    return;
  }

  // Calculate streak
  let streak = 1;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < reflections.length - 1; i++) {
    const current = new Date(reflections[i].created_at);
    const next = new Date(reflections[i + 1].created_at);

    current.setHours(0, 0, 0, 0);
    next.setHours(0, 0, 0, 0);

    const diffDays = Math.floor((current.getTime() - next.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      streak++;
    } else if (diffDays > 1) {
      break;
    }
  }

  // Update profile
  await supabase
    .from('profiles')
    .update({ streak_days: streak })
    .eq('id', userId);
}
