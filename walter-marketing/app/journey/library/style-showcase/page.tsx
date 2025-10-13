"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LessonStyleShowcase() {
  return (
    <div className="min-h-screen bg-[#FFFBF5]">
      {/* Header */}
      <div className="border-b border-[#F4E9D8] bg-white/90 backdrop-blur-md sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <Link
              href="/journey/library"
              className="text-sm text-[#2D2F33]/60 hover:text-[#2D2F33] inline-flex items-center gap-2 transition-all group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="group-hover:underline underline-offset-4">
                Back to Library
              </span>
            </Link>
            <div className="flex items-center gap-2 text-sm text-[#2D2F33]/60">
              <BookOpen className="h-4 w-4" />
              Style Showcase
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-5xl font-serif font-bold text-[#2D2F33] mb-4">
              Lesson Content Style Showcase
            </h1>
            <p className="text-xl text-[#2D2F33]/70">
              A complete reference of all available content styles for Camino LMS lessons
            </p>
          </div>

          {/* Lesson Content Styles */}
          <div className="lesson-content">
            <h2>Typography Hierarchy</h2>
            <p>
              This section demonstrates the beautiful typography system designed for
              optimal readability and professional presentation. The Camino design system
              uses a carefully crafted combination of serif headings and sans-serif body
              text.
            </p>

            <h3>Section Heading (H3)</h3>
            <p>
              This is a standard paragraph with comfortable line height and spacing.
              The text size is optimized for long-form reading, making complex
              professional development content approachable and engaging.
            </p>

            <h4>Subsection Heading (H4)</h4>
            <p>
              Notice how each heading level creates clear visual hierarchy while
              maintaining elegant proportions. This helps readers scan and navigate
              content effortlessly.
            </p>

            <hr />

            <h2>Text Formatting Options</h2>
            <p>
              You can use <strong>bold text</strong> to emphasize important concepts,
              or <em>italic text</em> for subtle emphasis. Combine them when needed:
              <strong><em>bold and italic</em></strong> text for maximum impact.
            </p>

            <p>
              Links are styled with the Camino gold color:{" "}
              <a href="#">this is a styled link</a>. They include a subtle underline
              that increases on hover for clear interactivity.
            </p>

            <hr />

            <h2>List Styles</h2>

            <h3>Unordered Lists (Bullets)</h3>
            <p>Use bullet lists for collections of related items without specific order:</p>

            <ul>
              <li>Beautiful gold circular bullets that align with the brand</li>
              <li>Comfortable spacing between items for easy reading</li>
              <li>Nested lists are supported:
                <ul>
                  <li>First nested item with smaller bullets</li>
                  <li>Second nested item maintains hierarchy</li>
                </ul>
              </li>
              <li>Clear visual distinction from body text</li>
            </ul>

            <h3>Ordered Lists (Numbers)</h3>
            <p>Use numbered lists for sequential steps or ranked items:</p>

            <ol>
              <li>First step with elegant gold numbering</li>
              <li>Second step maintains consistent spacing</li>
              <li>Third step shows how the pattern continues</li>
              <li>Nested ordered lists work too:
                <ol>
                  <li>Sub-step one</li>
                  <li>Sub-step two</li>
                </ol>
              </li>
              <li>Final step demonstrates the complete pattern</li>
            </ol>

            <hr />

            <h2>Blockquotes and Emphasis</h2>
            <p>Blockquotes are perfect for highlighting key concepts or insights:</p>

            <blockquote>
              <p>
                Leadership is not about being in charge. It's about taking care of
                those in your charge. This quote demonstrates how blockquotes can
                emphasize important ideas with elegant styling.
              </p>
            </blockquote>

            <p>
              The sandstone gradient background and gold left border create a warm,
              inviting feel that draws attention without being overwhelming.
            </p>

            <hr />

            <h2>Callout Boxes</h2>
            <p>
              Use callout boxes to highlight different types of information. Each type
              has a distinct color scheme:
            </p>

            <div className="callout">
              <p>
                <strong>Note:</strong> This is a general callout box with the default
                sandstone theme. Use it for important information that readers should
                pay attention to.
              </p>
            </div>

            <div className="info">
              <p>
                <strong>Info:</strong> This blue-themed info box is perfect for
                additional context, background information, or helpful explanations
                that complement the main content.
              </p>
            </div>

            <div className="warning">
              <p>
                <strong>Warning:</strong> This amber-themed warning box should be used
                for cautions, common mistakes to avoid, or important considerations
                that could impact results.
              </p>
            </div>

            <div className="tip">
              <p>
                <strong>Tip:</strong> This green-themed tip box is ideal for best
                practices, pro tips, or suggestions that can help readers achieve
                better outcomes.
              </p>
            </div>

            <hr />

            <h2>Tables for Structured Data</h2>
            <p>
              Tables provide a clean way to present structured information with clear
              visual hierarchy:
            </p>

            <table>
              <thead>
                <tr>
                  <th>Leadership Style</th>
                  <th>Best Used When</th>
                  <th>Key Benefit</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Democratic</td>
                  <td>Team input is valuable</td>
                  <td>High engagement and buy-in</td>
                </tr>
                <tr>
                  <td>Autocratic</td>
                  <td>Quick decisions needed</td>
                  <td>Fast execution and clarity</td>
                </tr>
                <tr>
                  <td>Transformational</td>
                  <td>Change is required</td>
                  <td>Innovation and motivation</td>
                </tr>
                <tr>
                  <td>Servant</td>
                  <td>Team development focus</td>
                  <td>Long-term team growth</td>
                </tr>
              </tbody>
            </table>

            <p>
              Notice the sandstone header background, gold bottom border, and subtle
              hover effects on rows.
            </p>

            <hr />

            <h2>Code Examples</h2>
            <p>
              For technical content, inline code looks like <code>this example</code>.
              It's subtle but clearly distinct from regular text.
            </p>

            <p>Code blocks are formatted for readability:</p>

            <pre><code>function greet(name) {
  return `Hello, ${name}!`;
}

const message = greet("Leader");
console.log(message);</code></pre>

            <hr />

            <h2>Image Styling</h2>
            <p>
              Images are automatically styled with rounded corners and elegant shadows.
              They're centered and responsive, adjusting to screen size:
            </p>

            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop"
              alt="Team collaboration"
            />

            <p>
              Images include a subtle hover effect that scales them slightly, adding
              interactivity to the reading experience.
            </p>

            <hr />

            <h2>Combining Elements</h2>
            <p>
              The real power comes from combining these elements effectively. Here's
              an example of a complete lesson section:
            </p>

            <h3>Effective Team Communication</h3>
            <p>
              Communication is the foundation of successful teamwork. Without clear,
              consistent communication, even the most talented teams can struggle to
              achieve their goals.
            </p>

            <div className="tip">
              <p>
                <strong>Pro Tip:</strong> Schedule regular check-ins even when things
                are going well. Prevention is easier than problem-solving.
              </p>
            </div>

            <p>Research shows that high-performing teams share these characteristics:</p>

            <ul>
              <li>Open and honest communication channels</li>
              <li>Regular feedback loops</li>
              <li>Clear expectations and goals</li>
              <li>Psychological safety for all members</li>
            </ul>

            <blockquote>
              <p>
                The single biggest problem in communication is the illusion that it
                has taken place.
              </p>
              <p>— George Bernard Shaw</p>
            </blockquote>

            <p>
              To improve your team communication, follow this systematic approach:
            </p>

            <ol>
              <li>Assess current communication patterns and pain points</li>
              <li>Establish clear protocols for different types of communication</li>
              <li>Implement regular team meetings and one-on-ones</li>
              <li>Create feedback mechanisms and act on input</li>
              <li>Review and refine your approach quarterly</li>
            </ol>

            <div className="callout">
              <p>
                <strong>Key Takeaway:</strong> Great communication doesn't happen by
                accident—it requires intentional systems, regular practice, and
                continuous improvement.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-[#F4E9D8] to-[#FFFBF5] border-2 border-[#E2C379]/30 shadow-lg">
            <h3 className="font-serif font-bold text-xl text-[#2D2F33] mb-4">
              Implementation Reference
            </h3>
            <p className="text-[#2D2F33]/70 mb-6">
              All these styles are automatically applied to lesson content. Content
              creators simply need to use standard HTML elements, and the Camino design
              system handles the beautiful presentation.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                className="bg-[#E2C379] hover:bg-[#C9A961] text-[#2D2F33] font-semibold"
              >
                <Link href="/LESSON_DESIGN_GUIDE.md">
                  View Complete Design Guide
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-[#E2C379]/30 hover:bg-[#E2C379]/10 text-[#2D2F33]"
              >
                <Link href="/LESSON_CONTENT_QUICK_REF.md">
                  Quick Reference
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
