import * as React from "react";

interface WelcomeLeadEmailProps {
  name?: string;
}

export default function WelcomeLeadEmail({ name }: WelcomeLeadEmailProps) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
      </head>
      <body style={{ fontFamily: "sans-serif", padding: "40px 20px", backgroundColor: "#fafafa" }}>
        <table
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <tr>
            <td
              style={{
                padding: "40px 40px 20px",
                textAlign: "center",
                borderBottom: "1px solid #e5e5e5",
              }}
            >
              <h1 style={{ margin: 0, fontSize: "24px", fontWeight: "600", color: "#2D2F33" }}>
                Welcome to Camino
              </h1>
            </td>
          </tr>

          {/* Body */}
          <tr>
            <td style={{ padding: "40px" }}>
              <p style={{ fontSize: "16px", lineHeight: "1.6", color: "#2D2F33", marginTop: 0 }}>
                {name ? `Hi ${name},` : "Hi there,"}
              </p>

              <p style={{ fontSize: "16px", lineHeight: "1.6", color: "#2D2F33" }}>
                Thank you for joining Camino. You've taken the first step on a journey of self-discovery,
                clarity, and purpose.
              </p>

              <p style={{ fontSize: "16px", lineHeight: "1.6", color: "#2D2F33" }}>
                Camino is more than just an app—it's a structured 12-week transformation journey that helps you:
              </p>

              <ul style={{ fontSize: "16px", lineHeight: "1.8", color: "#2D2F33", paddingLeft: "20px" }}>
                <li>
                  <strong>Shift your Identity</strong> – Move from self-criticism to inherent worth
                </li>
                <li>
                  <strong>Reframe your Worldview</strong> – See the world through abundance, not scarcity
                </li>
                <li>
                  <strong>Deepen Relationships</strong> – Connect authentically with yourself and others
                </li>
              </ul>

              <p style={{ fontSize: "16px", lineHeight: "1.6", color: "#2D2F33" }}>
                Here's what you can do next:
              </p>

              {/* CTA Button */}
              <table style={{ margin: "30px 0" }}>
                <tr>
                  <td style={{ textAlign: "center" }}>
                    <a
                      href={`${process.env.NEXT_PUBLIC_SITE_URL || "https://camino.app"}/journal`}
                      style={{
                        display: "inline-block",
                        padding: "14px 32px",
                        backgroundColor: "#E2C379",
                        color: "#2D2F33",
                        textDecoration: "none",
                        borderRadius: "6px",
                        fontWeight: "600",
                        fontSize: "16px",
                      }}
                    >
                      Start Your First Reflection
                    </a>
                  </td>
                </tr>
              </table>

              <p style={{ fontSize: "16px", lineHeight: "1.6", color: "#2D2F33" }}>
                It only takes 2-4 minutes. No commitment required—just you and a gentle prompt to help
                you connect with what matters.
              </p>

              {/* Features */}
              <div
                style={{
                  backgroundColor: "#F4E9D8",
                  borderRadius: "8px",
                  padding: "24px",
                  margin: "30px 0",
                }}
              >
                <h2
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#2D2F33",
                    marginTop: 0,
                    marginBottom: "16px",
                  }}
                >
                  What's included:
                </h2>
                <ul style={{ fontSize: "15px", lineHeight: "1.8", color: "#2D2F33", margin: 0, paddingLeft: "20px" }}>
                  <li>Daily reflection prompts</li>
                  <li>AI-powered insights that reveal your patterns</li>
                  <li>Weekly summaries to track your growth</li>
                  <li>A structured learning path (optional)</li>
                  <li>Private, encrypted, and always yours</li>
                </ul>
              </div>

              <p style={{ fontSize: "16px", lineHeight: "1.6", color: "#2D2F33" }}>
                If you have any questions, just reply to this email. We're here to support you.
              </p>

              <p style={{ fontSize: "16px", lineHeight: "1.6", color: "#2D2F33", marginBottom: 0 }}>
                Welcome aboard,
                <br />
                <strong>The Camino Team</strong>
              </p>
            </td>
          </tr>

          {/* Footer */}
          <tr>
            <td
              style={{
                padding: "30px 40px",
                borderTop: "1px solid #e5e5e5",
                backgroundColor: "#fafafa",
              }}
            >
              <p style={{ fontSize: "13px", lineHeight: "1.6", color: "#666", margin: 0, textAlign: "center" }}>
                You're receiving this email because you signed up for Camino.
                <br />
                <a
                  href={`${process.env.NEXT_PUBLIC_SITE_URL || "https://camino.app"}/legal/privacy`}
                  style={{ color: "#666", textDecoration: "underline" }}
                >
                  Privacy Policy
                </a>
                {" · "}
                <a
                  href={`${process.env.NEXT_PUBLIC_SITE_URL || "https://camino.app"}/support`}
                  style={{ color: "#666", textDecoration: "underline" }}
                >
                  Contact Support
                </a>
              </p>
            </td>
          </tr>
        </table>
      </body>
    </html>
  );
}
