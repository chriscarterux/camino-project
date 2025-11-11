import { Resend } from 'resend';

// Lazy initialization to avoid build-time errors
let resendInstance: Resend | null = null;

function getResend(): Resend {
  if (!resendInstance) {
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not set in environment variables');
    }
    resendInstance = new Resend(process.env.RESEND_API_KEY);
  }
  return resendInstance;
}

export const resend = new Proxy({} as Resend, {
  get(target, prop) {
    return (getResend() as any)[prop];
  }
});

export const RESEND_FROM = process.env.RESEND_FROM_EMAIL || 'Camino <noreply@camino.app>';
