import { NextRequest, NextResponse } from 'next/server';
import { resend, RESEND_FROM } from '@/lib/resend';
import { WeeklySummaryEmail } from '@/lib/emails/weekly-summary';

export async function POST(request: NextRequest) {
  try {
    const { email, name, themes, reflectionCount } = await request.json();

    if (!email || !themes) {
      return NextResponse.json(
        { error: 'Email and themes are required' },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: RESEND_FROM,
      to: email,
      subject: 'Your weekly reflection summary',
      react: WeeklySummaryEmail({ name, themes, reflectionCount }),
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Weekly summary email error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
