import { validateReflectionInput } from '@/lib/validation/reflection';

describe('validateReflectionInput', () => {
  const basePayload = {
    prompt_id: '550e8400-e29b-41d4-a716-446655440000',
    prompt_text: 'How did today align with your intentions?',
    content: 'I made progress on my goals and stayed mindful throughout the day.',
    session_number: 1,
  } as const;

  it('accepts a well-formed payload', () => {
    const result = validateReflectionInput(basePayload);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.prompt_text).toBe(basePayload.prompt_text);
      expect(result.data.content).toBe(basePayload.content);
    }
  });

  it('rejects missing required fields', () => {
    const { prompt_text, ...rest } = basePayload;
    const result = validateReflectionInput(rest);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toContain('prompt_text');
    }
  });

  it('rejects obvious SQL injection patterns', () => {
    const result = validateReflectionInput({
      ...basePayload,
      content: "'; DROP TABLE reflections; --",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.issues).toEqual(
        expect.arrayContaining([expect.stringContaining('content contains disallowed SQL patterns')])
      );
    }
  });

  it('rejects XSS payloads', () => {
    const result = validateReflectionInput({
      ...basePayload,
      prompt_text: '<script>alert("xss")</script>',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.issues).toEqual(
        expect.arrayContaining([expect.stringContaining('prompt_text contains disallowed HTML/JS patterns')])
      );
    }
  });
});
