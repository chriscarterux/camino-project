import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// GET - Fetch single reflection
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
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
  { params }: { params: { id: string } }
) {
  try {
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

// DELETE - Delete reflection
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { error } = await supabase
      .from('reflections')
      .delete()
      .eq('id', params.id)
      .eq('user_id', user.id);

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
