import * as React from 'react';

interface WelcomeEmailProps {
  name?: string;
}

export const WelcomeEmail: React.FC<WelcomeEmailProps> = ({ name }) => (
  <div style={{ fontFamily: 'Georgia, serif', maxWidth: '600px', margin: '0 auto' }}>
    <div style={{ padding: '40px 20px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#2D2F33', marginBottom: '16px' }}>
        Welcome to your Camino
      </h1>
      <p style={{ fontSize: '18px', color: '#666', lineHeight: '1.6', marginBottom: '32px' }}>
        {name ? `Hi ${name}, ` : 'Hi, '}you've taken the first step toward a more meaningful life.
      </p>
    </div>

    <div style={{ padding: '32px 20px', backgroundColor: '#F4E9D8', borderLeft: '4px solid #E2C379' }}>
      <p style={{ fontSize: '16px', fontStyle: 'italic', color: '#2D2F33', margin: 0 }}>
        "The path is made by walking."
      </p>
      <p style={{ fontSize: '14px', color: '#666', marginTop: '8px' }}>
        — Antonio Machado
      </p>
    </div>

    <div style={{ padding: '40px 20px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#2D2F33', marginBottom: '16px' }}>
        What happens next?
      </h2>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#E2C379', color: '#2D2F33', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>
            1
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '4px' }}>Start your first reflection</h3>
            <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
              Take 3 minutes with today's guided prompt
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#E2C379', color: '#2D2F33', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>
            2
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '4px' }}>Build your streak</h3>
            <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
              Consistency reveals patterns you never knew existed
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#E2C379', color: '#2D2F33', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>
            3
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '4px' }}>Discover your insights</h3>
            <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
              Watch as AI mirrors your themes and patterns back to you
            </p>
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '32px' }}>
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
          Take your first reflection
        </a>
      </div>
    </div>

    <div style={{ padding: '20px', textAlign: 'center', borderTop: '1px solid #eee', color: '#999', fontSize: '12px' }}>
      <p>Guided reflection for a meaningful life.</p>
      <p style={{ marginTop: '8px' }}>
        © 2025 Camino
      </p>
    </div>
  </div>
);

export default WelcomeEmail;
