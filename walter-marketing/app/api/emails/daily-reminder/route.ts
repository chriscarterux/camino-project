import { NextRequest, NextResponse } from 'next/server';
import { resend, RESEND_FROM } from '@/lib/resend';
import DailyReminderEmail from '@/lib/emails/daily-reminder';
import React from 'react';

export async function POST(request: NextRequest) {
  try {
    const { email, name, prompt, streakDays } = await request.json();

    if (!email || !prompt) {
      return NextResponse.json(
        { error: 'Email and prompt are required' },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: RESEND_FROM,
      to: email,
      subject: `Your daily reflection awaits ${streakDays > 0 ? `🔥 ${streakDays} day streak!` : ''}`,
      react: React.createElement(DailyReminderEmail, { name, prompt, streakDays }),
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
    console.error('Daily reminder email error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
