import { NextRequest, NextResponse } from 'next/server';
import { resend, RESEND_FROM } from '@/lib/resend';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Send welcome to newsletter email
    const { data, error } = await resend.emails.send({
      from: RESEND_FROM,
      to: email,
      subject: 'Welcome to the Camino Newsletter',
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <h1 style="font-size: 32px; font-weight: bold; color: #2D2F33; margin-bottom: 16px; text-align: center;">
            Welcome to Camino Reflections
          </h1>
          <p style="font-size: 16px; color: #666; line-height: 1.6; text-align: center; margin-bottom: 32px;">
            You're now part of a community that values awareness, belonging, and growth.
          </p>

          <div style="padding: 24px; background-color: #F4E9D8; border-left: 4px solid #E2C379; border-radius: 8px; margin-bottom: 32px;">
            <p style="font-size: 16px; color: #2D2F33; line-height: 1.6; margin: 0;">
              Every week, we'll share new essays and reflection prompts to help you live and lead with clarity. No noise, just insight.
            </p>
          </div>

          <div style="text-align: center;">
            <a
              href="https://camino.app/essays"
              style="display: inline-block; padding: 12px 32px; background-color: #E2C379; color: #2D2F33; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;"
            >
              Read our latest essays
            </a>
          </div>

          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #999; font-size: 12px;">
            <p>Guided reflection for a meaningful life.</p>
            <p style="margin-top: 8px;">© 2025 Camino</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to subscribe' },
        { status: 500 }
      );
    }

    // TODO: Add to your newsletter list (ConvertKit, MailerLite, etc.)

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Subscribe email error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
