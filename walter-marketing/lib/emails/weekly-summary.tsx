import * as React from 'react';

interface WeeklySummaryEmailProps {
  name?: string;
  themes: Array<{ name: string; description: string }>;
  reflectionCount: number;
}

export const WeeklySummaryEmail: React.FC<WeeklySummaryEmailProps> = ({
  name,
  themes,
  reflectionCount
}) => (
  <div style={{ fontFamily: 'Georgia, serif', maxWidth: '600px', margin: '0 auto' }}>
    <div style={{ padding: '40px 20px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#2D2F33', marginBottom: '8px' }}>
        Your weekly reflection summary
      </h1>
      <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.6' }}>
        {name ? `${name}, here's ` : "Here's "}what your reflections revealed this week.
      </p>
    </div>

    <div style={{ padding: '20px', backgroundColor: '#F4E9D8', borderRadius: '12px', margin: '20px', textAlign: 'center' }}>
      <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#E2C379', marginBottom: '8px' }}>
        {reflectionCount}
      </div>
      <p style={{ fontSize: '14px', color: '#2D2F33', margin: 0 }}>
        reflections this week
      </p>
    </div>

    <div style={{ padding: '0 20px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#2D2F33', marginBottom: '16px' }}>
        Your themes
      </h2>
      <div style={{ marginBottom: '32px' }}>
        {themes.map((theme, index) => (
          <div key={index} style={{ marginBottom: '16px', padding: '16px', backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '8px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#E2C379', color: '#2D2F33', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px', flexShrink: 0 }}>
                {index + 1}
              </div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#2D2F33', marginBottom: '4px' }}>
                  {theme.name}
                </h3>
                <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
                  {theme.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '32px' }}>
        <p style={{ fontSize: '14px', color: '#666', marginBottom: '24px' }}>
          Want to go deeper? The Journey curriculum can help you transform these insights into lasting growth.
        </p>
        <a
          href="https://camino.app/journey"
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
          Explore Journey
        </a>
      </div>
    </div>

    <div style={{ padding: '20px', textAlign: 'center', marginTop: '32px', borderTop: '1px solid #eee', color: '#999', fontSize: '12px' }}>
      <p>Guided reflection for a meaningful life.</p>
      <p style={{ marginTop: '8px' }}>
        © 2025 Camino
      </p>
    </div>
  </div>
);

export default WeeklySummaryEmail;
