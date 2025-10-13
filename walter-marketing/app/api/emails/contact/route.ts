import { NextRequest, NextResponse } from 'next/server';
import { resend, RESEND_FROM } from '@/lib/resend';
import { ContactNotificationEmail } from '@/lib/emails/contact-notification';

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!email || !name || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Send notification to support team
    const { data, error } = await resend.emails.send({
      from: RESEND_FROM,
      to: 'support@camino.app', // Update with actual support email
      replyTo: email,
      subject: `Contact Form: ${subject}`,
      react: ContactNotificationEmail({ name, email, subject, message }),
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send message' },
        { status: 500 }
      );
    }

    // Optionally send confirmation to user
    await resend.emails.send({
      from: RESEND_FROM,
      to: email,
      subject: 'We received your message',
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <h1 style="font-size: 28px; font-weight: bold; color: #2D2F33; margin-bottom: 16px;">
            Thank you for reaching out
          </h1>
          <p style="font-size: 16px; color: #666; line-height: 1.6;">
            Hi ${name}, we've received your message and will respond within 24 hours.
          </p>
          <div style="margin-top: 32px; padding: 20px; background-color: #F4E9D8; border-left: 4px solid #E2C379; border-radius: 8px;">
            <p style="font-size: 14px; color: #2D2F33; margin: 0;">
              Your message: "${subject}"
            </p>
          </div>
          <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #999; font-size: 12px;">
            <p>© 2025 Camino</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Contact email error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
