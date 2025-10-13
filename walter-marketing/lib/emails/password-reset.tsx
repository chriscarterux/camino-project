import * as React from 'react';

interface PasswordResetEmailProps {
  resetLink: string;
}

export const PasswordResetEmail: React.FC<PasswordResetEmailProps> = ({ resetLink }) => (
  <div style={{ fontFamily: 'Georgia, serif', maxWidth: '600px', margin: '0 auto' }}>
    <div style={{ padding: '40px 20px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#2D2F33', marginBottom: '16px' }}>
        Reset your password
      </h1>
      <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.6' }}>
        We received a request to reset your Camino password.
      </p>
    </div>

    <div style={{ padding: '32px 20px', textAlign: 'center' }}>
      <a
        href={resetLink}
        style={{
          display: 'inline-block',
          padding: '12px 32px',
          backgroundColor: '#E2C379',
          color: '#2D2F33',
          textDecoration: 'none',
          borderRadius: '8px',
          fontWeight: 'bold',
          fontSize: '16px'
        }}
      >
        Reset Password
      </a>
    </div>

    <div style={{ padding: '20px', backgroundColor: '#F4E9D8', margin: '20px', borderRadius: '8px' }}>
      <p style={{ fontSize: '14px', color: '#2D2F33', margin: 0, textAlign: 'center' }}>
        This link expires in 24 hours.
      </p>
    </div>

    <div style={{ padding: '20px', textAlign: 'center' }}>
      <p style={{ fontSize: '14px', color: '#666' }}>
        If you didn't request this, you can safely ignore this email.
      </p>
    </div>

    <div style={{ padding: '20px', textAlign: 'center', borderTop: '1px solid #eee', color: '#999', fontSize: '12px' }}>
      <p>Guided reflection for a meaningful life.</p>
      <p style={{ marginTop: '8px' }}>
        © 2025 Camino
      </p>
    </div>
  </div>
);

export default PasswordResetEmail;
