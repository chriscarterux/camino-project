import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// GET - Fetch single reflection
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: reflection, error } = await supabase
      .from('reflections')
      .select('*')
      .eq('id', params.id)
      .eq('user_id', user.id)
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({ reflection });
  } catch (error) {
    console.error('Get reflection error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reflection' },
      { status: 500 }
    );
  }
}

// PATCH - Update reflection
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { content, mood } = await request.json();

    const { data: reflection, error } = await supabase
      .from('reflections')
      .update({ content, mood })
      .eq('id', params.id)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({ reflection });
  } catch (error) {
    console.error('Update reflection error:', error);
    return NextResponse.json(
      { error: 'Failed to update reflection' },
      { status: 500 }
    );
  }
}

/**
 * DELETE - Delete reflection with proper ownership verification
 * SECURITY: Verifies ownership before deletion to prevent unauthorized access
 */
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // SECURITY FIX: First verify the reflection exists and user owns it
    // This prevents information disclosure about reflection existence
    const { data: reflection, error: fetchError } = await supabase
      .from('reflections')
      .select('user_id')
      .eq('id', params.id)
      .single();

    if (fetchError || !reflection) {
      // Don't reveal whether reflection exists - always return 404
      return NextResponse.json({ error: 'Reflection not found' }, { status: 404 });
    }

    // Verify ownership - return 403 Forbidden if not owned by user
    if (reflection.user_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Now safe to delete - user owns the reflection
    const { error } = await supabase
      .from('reflections')
      .delete()
      .eq('id', params.id)
      .eq('user_id', user.id); // Belt-and-suspenders: double-check ownership

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete reflection error:', error);
    return NextResponse.json(
      { error: 'Failed to delete reflection' },
      { status: 500 }
    );
  }
}
