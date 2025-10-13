import * as React from 'react';

interface ContactNotificationEmailProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const ContactNotificationEmail: React.FC<ContactNotificationEmailProps> = ({
  name,
  email,
  subject,
  message
}) => (
  <div style={{ fontFamily: 'Georgia, serif', maxWidth: '600px', margin: '0 auto' }}>
    <div style={{ padding: '40px 20px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#2D2F33', marginBottom: '8px' }}>
        New Contact Form Submission
      </h1>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '32px' }}>
        From: {name} ({email})
      </p>

      <div style={{ backgroundColor: '#F4E9D8', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #E2C379' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 'bold', color: '#2D2F33', marginBottom: '8px' }}>
          Subject: {subject}
        </h2>
        <p style={{ fontSize: '14px', color: '#2D2F33', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
          {message}
        </p>
      </div>

      <div style={{ marginTop: '32px', padding: '16px', backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '8px' }}>
        <p style={{ fontSize: '12px', color: '#666', margin: 0 }}>
          <strong>Reply to:</strong> {email}
        </p>
      </div>
    </div>

    <div style={{ padding: '20px', textAlign: 'center', borderTop: '1px solid #eee', color: '#999', fontSize: '12px' }}>
      <p>© 2025 Camino Support System</p>
    </div>
  </div>
);

export default ContactNotificationEmail;
