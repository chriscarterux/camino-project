# Lesson Content Quick Reference

## Common HTML Patterns for Word Document Content

When creating lesson content that will be parsed from Word documents (via mammoth.js), use these patterns:

### Basic Text Formatting

```html
<!-- Paragraph -->
<p>This is a standard paragraph with good readability.</p>

<!-- Emphasis -->
<p>Use <strong>bold text</strong> for important concepts.</p>
<p>Use <em>italic text</em> for subtle emphasis.</p>

<!-- Links -->
<p>Learn more at <a href="https://example.com">this resource</a>.</p>
```

### Headings

```html
<!-- Main Section (H2) -->
<h2>Introduction to Leadership</h2>

<!-- Subsection (H3) -->
<h3>Key Leadership Qualities</h3>

<!-- Minor Heading (H4) -->
<h4>Communication Skills</h4>
```

### Lists

```html
<!-- Unordered List (Bullets) -->
<ul>
  <li>First key point about the topic</li>
  <li>Second important consideration</li>
  <li>Third essential element</li>
</ul>

<!-- Ordered List (Numbers) -->
<ol>
  <li>Step one: Assess the situation</li>
  <li>Step two: Develop a strategy</li>
  <li>Step three: Execute with confidence</li>
</ol>

<!-- Nested Lists -->
<ul>
  <li>Main point
    <ul>
      <li>Supporting detail</li>
      <li>Additional context</li>
    </ul>
  </li>
  <li>Second main point</li>
</ul>
```

### Blockquotes

```html
<!-- Standard Quote -->
<blockquote>
  <p>Leadership is not about being in charge. It's about taking care of those in your charge.</p>
</blockquote>

<!-- Quote with Attribution -->
<blockquote>
  <p>The best way to predict the future is to create it.</p>
  <p>— Peter Drucker</p>
</blockquote>
```

### Callout Boxes

```html
<!-- Note / Important Info -->
<div class="callout">
  <p>Remember: This concept is fundamental to understanding the rest of the module.</p>
</div>

<!-- Informational Callout -->
<div class="info">
  <p>Additional context: Research shows that 80% of managers benefit from this approach.</p>
</div>

<!-- Warning / Caution -->
<div class="warning">
  <p>Caution: Avoid this common mistake that many beginners make.</p>
</div>

<!-- Tip / Best Practice -->
<div class="tip">
  <p>Pro Tip: Here's a shortcut that experienced professionals use.</p>
</div>
```

### Tables

```html
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
      <td>High engagement</td>
    </tr>
    <tr>
      <td>Autocratic</td>
      <td>Quick decisions needed</td>
      <td>Fast execution</td>
    </tr>
    <tr>
      <td>Transformational</td>
      <td>Change is required</td>
      <td>Innovation focus</td>
    </tr>
  </tbody>
</table>
```

### Code Examples

```html
<!-- Inline Code -->
<p>Use the <code>STAR method</code> for behavioral interviews.</p>

<!-- Code Block -->
<pre><code>Situation: Describe the context
Task: Explain what needed to be done
Action: Detail what you did
Result: Share the outcome</code></pre>
```

### Images

```html
<!-- Basic Image -->
<img src="/images/leadership-diagram.png" alt="Leadership framework diagram" />

<!-- Image with Caption -->
<figure>
  <img src="/images/communication-styles.png" alt="Four communication styles" />
  <figcaption>Figure 1: The four primary communication styles</figcaption>
</figure>
```

### Horizontal Rules

```html
<!-- Section Divider -->
<hr />
```

---

## Styling Classes Reference

### Typography Classes
- `.lesson-content` - Main container (automatically applied)
- No additional classes needed - HTML elements are auto-styled

### Custom Elements
- `.callout` - General important information box
- `.note` - Same as callout (blue theme)
- `.info` - Informational context (blue theme)
- `.warning` - Cautions and important notes (amber theme)
- `.tip` - Best practices and suggestions (green theme)

---

## Content Writing Guidelines

### Paragraph Length
- **Ideal**: 3-5 sentences
- **Maximum**: 7-8 sentences
- **Why**: Easier scanning and comprehension

### Heading Hierarchy
- **H2**: Major section breaks (2-4 per lesson)
- **H3**: Subsections within major sections
- **H4**: Minor divisions (use sparingly)
- **Don't skip levels**: Always go H2 → H3 → H4

### List Usage
- **Use lists when**: You have 3+ related items
- **Bullet lists**: For unordered information
- **Numbered lists**: For steps or ranked items
- **Keep items parallel**: Same structure/length

### Callout Box Usage
- **Note/Callout**: Key takeaways, summary points
- **Info**: Additional context or background
- **Warning**: Common mistakes, things to avoid
- **Tip**: Pro tips, shortcuts, best practices
- **Frequency**: 1-3 per lesson (don't overuse)

### Quote Usage
- **Purpose**: Highlight key concepts or provide authority
- **Length**: 1-3 sentences ideal
- **Frequency**: 1-2 per lesson
- **Attribution**: Include author when possible

---

## Real-World Example

```html
<h2>Effective Communication in Leadership</h2>

<p>Communication is the cornerstone of effective leadership. Without clear, consistent communication, even the best strategies can fail. Great leaders understand that communication is not just about talking—it's about ensuring understanding.</p>

<h3>The Three Pillars of Clear Communication</h3>

<p>Research has identified three essential elements that make communication effective:</p>

<ol>
  <li><strong>Clarity</strong>: Your message should be easily understood by your audience</li>
  <li><strong>Consistency</strong>: Align your words with your actions and values</li>
  <li><strong>Context</strong>: Provide the background information needed for comprehension</li>
</ol>

<div class="tip">
  <p>Pro Tip: Before important conversations, ask yourself: "What does my audience need to know, and what's the simplest way to convey it?"</p>
</div>

<h3>Active Listening: The Other Half of Communication</h3>

<p>Effective communication isn't just about speaking—it's equally about listening. Active listening involves fully concentrating on what's being said rather than passively hearing the message.</p>

<blockquote>
  <p>The most important thing in communication is hearing what isn't said.</p>
  <p>— Peter Drucker</p>
</blockquote>

<p>To practice active listening:</p>

<ul>
  <li>Maintain eye contact and open body language</li>
  <li>Avoid interrupting or formulating responses while others speak</li>
  <li>Ask clarifying questions to ensure understanding</li>
  <li>Summarize what you've heard to confirm comprehension</li>
</ul>

<div class="warning">
  <p>Common mistake: Many leaders focus so much on what they want to say next that they miss important information from their team members.</p>
</div>

<hr />

<h3>Adapting Your Communication Style</h3>

<p>Different situations and audiences require different communication approaches. A skilled leader adapts their style based on context.</p>

<table>
  <thead>
    <tr>
      <th>Situation</th>
      <th>Recommended Style</th>
      <th>Why It Works</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Crisis Management</td>
      <td>Direct and authoritative</td>
      <td>Reduces confusion and enables quick action</td>
    </tr>
    <tr>
      <td>Team Brainstorming</td>
      <td>Open and collaborative</td>
      <td>Encourages creativity and diverse input</td>
    </tr>
    <tr>
      <td>Performance Review</td>
      <td>Balanced and constructive</td>
      <td>Provides growth opportunities while maintaining morale</td>
    </tr>
  </tbody>
</table>

<div class="callout">
  <p>Key Takeaway: The best communicators don't have a single style—they have a toolkit of approaches they can deploy based on the situation and audience.</p>
</div>
```

---

## Accessibility Checklist

When creating content:

- [ ] All images have descriptive alt text
- [ ] Headings follow logical hierarchy (no skipped levels)
- [ ] Links have descriptive text (avoid "click here")
- [ ] Tables have proper header rows
- [ ] Color is not the only way information is conveyed
- [ ] Text has sufficient contrast with background
- [ ] Lists are used for appropriate content
- [ ] Code blocks are properly formatted

---

## Testing Your Content

Before publishing:

1. **Preview on mobile** - Check readability and layout
2. **Test all links** - Ensure they work and open correctly
3. **Check images** - Verify they load and are relevant
4. **Read aloud** - Listen for awkward phrasing
5. **Review callouts** - Ensure they add value
6. **Verify hierarchy** - Headings make sense in outline view
7. **Check length** - Aim for 5-10 minute read time

---

## Content Length Guidelines

### Ideal Lesson Length
- **Word count**: 800-1,500 words
- **Reading time**: 5-10 minutes
- **Sections**: 3-5 major sections
- **Why**: Maintains engagement, completable in one sitting

### Too Short (< 500 words)
- May feel incomplete
- Limited learning value
- Consider combining with another topic

### Too Long (> 2,000 words)
- Risk of overwhelming learners
- Lower completion rates
- Consider splitting into multiple lessons

---

## Common Mistakes to Avoid

1. **Wall of text**: Break up long paragraphs
2. **Too many headings**: Don't over-segment content
3. **Excessive callouts**: They lose impact when overused
4. **Unclear hierarchy**: Maintain proper heading levels
5. **No visual breaks**: Add lists, quotes, or images
6. **Passive voice**: Use active voice for clarity
7. **Jargon overload**: Explain technical terms
8. **Missing examples**: Include concrete illustrations

---

## Quick Formatting Shortcuts

### In Microsoft Word (before conversion)

1. **Headings**: Use Word's built-in heading styles
2. **Lists**: Use Word's list formatting (not manual bullets)
3. **Bold/Italic**: Use formatting buttons, not manual styling
4. **Tables**: Use Word's table tool for proper structure
5. **Quotes**: Use indentation or special paragraph style
6. **Links**: Add hyperlinks properly (Ctrl+K / Cmd+K)

### After Mammoth.js Conversion

The HTML will automatically receive styling from `/app/globals.css`

---

## Need Help?

- **Design guide**: See `LESSON_DESIGN_GUIDE.md` for full styling details
- **CSS reference**: Check `/app/globals.css` for implementation
- **Component code**: Review `/app/journey/library/[courseSlug]/[lessonId]/page.tsx`
- **Live preview**: Test in development environment before publishing

---

**Quick Reference Version**: 1.0.0
**Last Updated**: 2025-10-13
