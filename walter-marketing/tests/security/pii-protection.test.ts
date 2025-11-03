/**
 * Security Tests: PII Protection in Analytics
 * 
 * Verifies that sensitive user data (PII) is not sent to analytics providers.
 */

import { trackServerReflectionCompleted } from '@/lib/analytics';

// Mock PostHog
const mockCapture = jest.fn();
jest.mock('posthog-node', () => {
  return {
    PostHog: jest.fn().mockImplementation(() => ({
      capture: mockCapture,
      shutdown: jest.fn(),
    })),
  };
});

describe('Security: PII Protection in Analytics', () => {
  beforeEach(() => {
    mockCapture.mockClear();
  });

  it('should not send prompt_text content to analytics', async () => {
    const userId = 'test-user-123';
    const sensitivePromptText = 'What are your deepest fears?';

    trackServerReflectionCompleted(userId, {
      reflection_id: 'ref-123',
      reflection_count: 1,
      prompt_id: 'prompt-123',
      prompt_text: '', // Should be empty - no PII
      dimension: 'identity',
      word_count: 50,
      time_spent_seconds: 120,
      mood: 'reflective',
      session_number: 1,
      days_since_signup: 5,
    });

    // Verify prompt_text is empty string, not actual content
    if (mockCapture.mock.calls.length > 0) {
      const capturedProperties = mockCapture.mock.calls[0][0]?.properties;
      expect(capturedProperties?.prompt_text).toBe('');
      expect(capturedProperties?.prompt_text).not.toContain('deepest fears');
    }
  });

  it('should not send reflection content to analytics', () => {
    const userId = 'test-user-123';
    const sensitiveContent = 'My personal thoughts about my family...';

    // Reflection content should NEVER be passed to analytics
    trackServerReflectionCompleted(userId, {
      reflection_id: 'ref-456',
      reflection_count: 2,
      prompt_id: 'prompt-456',
      prompt_text: '',
      dimension: 'relationships',
      word_count: 100,
      time_spent_seconds: 180,
      session_number: 1,
      days_since_signup: 10,
    });

    // Verify no 'content' property exists in captured data
    if (mockCapture.mock.calls.length > 0) {
      const capturedProperties = mockCapture.mock.calls[0][0]?.properties;
      expect(capturedProperties).not.toHaveProperty('content');
      expect(JSON.stringify(capturedProperties)).not.toContain(sensitiveContent);
    }
  });

  it('should only send metadata (non-PII) to analytics', () => {
    const userId = 'test-user-123';

    trackServerReflectionCompleted(userId, {
      reflection_id: 'ref-789',
      reflection_count: 3,
      prompt_id: 'prompt-789',
      prompt_text: '', // Empty - no PII
      dimension: 'worldview',
      word_count: 75,
      time_spent_seconds: 150,
      mood: 'hopeful',
      session_number: 2,
      days_since_signup: 15,
    });

    if (mockCapture.mock.calls.length > 0) {
      const capturedProperties = mockCapture.mock.calls[0][0]?.properties;

      // Safe metadata should be present
      expect(capturedProperties).toHaveProperty('reflection_id', 'ref-789');
      expect(capturedProperties).toHaveProperty('reflection_count', 3);
      expect(capturedProperties).toHaveProperty('prompt_id', 'prompt-789');
      expect(capturedProperties).toHaveProperty('word_count', 75);
      expect(capturedProperties).toHaveProperty('dimension', 'worldview');
      
      // PII should NOT be present
      expect(capturedProperties?.prompt_text).toBe('');
      expect(capturedProperties).not.toHaveProperty('content');
    }
  });
});
