import * as React from 'react';

interface DailyReminderEmailProps {
  name?: string;
  prompt: string;
  streakDays?: number;
}

export const DailyReminderEmail: React.FC<DailyReminderEmailProps> = ({
  name,
  prompt,
  streakDays = 0
}) => (
  <div style={{ fontFamily: 'Georgia, serif', maxWidth: '600px', margin: '0 auto' }}>
    <div style={{ padding: '40px 20px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#2D2F33', marginBottom: '8px' }}>
        Today's reflection awaits
      </h1>
      <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.6' }}>
        {name ? `Good morning, ${name}. ` : 'Good morning. '}Take a moment to pause and reflect.
      </p>
    </div>

    {streakDays > 0 && (
      <div style={{ padding: '16px 20px', backgroundColor: '#E2C379', textAlign: 'center' }}>
        <p style={{ fontSize: '14px', color: '#2D2F33', fontWeight: 'bold', margin: 0 }}>
          🔥 {streakDays} day{streakDays !== 1 ? 's' : ''} in a row — consistency builds clarity
        </p>
      </div>
    )}

    <div style={{ padding: '32px 20px', backgroundColor: '#F4E9D8', borderLeft: '4px solid #E2C379', margin: '20px' }}>
      <p style={{ fontSize: '18px', fontStyle: 'italic', color: '#2D2F33', lineHeight: '1.6', margin: 0 }}>
        {prompt}
      </p>
    </div>

    <div style={{ padding: '40px 20px', textAlign: 'center' }}>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '24px' }}>
        Just 2-4 minutes of reflection can shift your entire day.
      </p>
      <a
        href="https://camino.app/app/reflect"
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
        Reflect now
      </a>
    </div>

    <div style={{ padding: '20px', textAlign: 'center', color: '#999', fontSize: '12px' }}>
      <p style={{ fontStyle: 'italic', marginBottom: '16px' }}>
        Every reflection is a step forward. Keep walking your Camino.
      </p>
      <p style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #eee' }}>
        © 2025 Camino
      </p>
    </div>
  </div>
);

export default DailyReminderEmail;
