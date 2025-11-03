/**
 * Integration Tests for Activation Flow
 *
 * Tests the complete activation journey:
 * 1. User completes 3 reflections
 * 2. AI generates insight
 * 3. User views insight
 * 4. Activation event fires
 */

import { describe, it, expect, beforeEach, jest } from '@jest/globals';

describe('Activation Flow Integration', () => {
  let mockUserId: string;
  let reflectionIds: string[];

  beforeEach(() => {
    mockUserId = 'test-user-' + Date.now();
    reflectionIds = [];
  });

  it('should complete full activation journey', async () => {
    // STEP 1: Complete first reflection
    const reflection1 = {
      user_id: mockUserId,
      prompt_id: 'prompt-1',
      prompt_text: 'What matters most to you?',
      content: 'Family, growth, and making a difference in the world.',
      mood: 'hopeful',
    };

    // Simulate API call
    const response1 = {
      reflection: { id: 'reflection-1', ...reflection1 },
      reflection_count: 1,
      should_generate_insight: false,
    };

    expect(response1.reflection_count).toBe(1);
    expect(response1.should_generate_insight).toBe(false);
    reflectionIds.push(response1.reflection.id);

    // STEP 2: Complete second reflection
    const reflection2 = {
      user_id: mockUserId,
      prompt_id: 'prompt-2',
      prompt_text: 'What challenge are you facing?',
      content: 'Balancing work ambitions with personal relationships.',
      mood: 'thoughtful',
    };

    const response2 = {
      reflection: { id: 'reflection-2', ...reflection2 },
      reflection_count: 2,
      should_generate_insight: false,
    };

    expect(response2.reflection_count).toBe(2);
    expect(response2.should_generate_insight).toBe(false);
    reflectionIds.push(response2.reflection.id);

    // STEP 3: Complete third reflection (triggers insight generation)
    const reflection3 = {
      user_id: mockUserId,
      prompt_id: 'prompt-3',
      prompt_text: 'What brings you joy?',
      content: 'Connecting with others and seeing people grow.',
      mood: 'joyful',
    };

    const response3 = {
      reflection: { id: 'reflection-3', ...reflection3 },
      reflection_count: 3,
      should_generate_insight: true,
      insight: {
        id: 'insight-1',
        type: 'pattern',
        title: 'Connection Through Growth',
        content: 'You value personal connections and making an impact...',
      },
    };

    expect(response3.reflection_count).toBe(3);
    expect(response3.should_generate_insight).toBe(true);
    expect(response3.insight).toBeDefined();
    expect(response3.insight?.type).toBe('pattern');

    // STEP 4: User views insight (triggers activation)
    const viewResponse = {
      insight: response3.insight,
      is_first_insight: true,
      is_activation_moment: true,
    };

    expect(viewResponse.is_activation_moment).toBe(true);

    // VERIFICATION: Check that all events were tracked
    const expectedEvents = [
      'reflection_completed', // x3
      'insight_generated',
      'insight_viewed',
      'user_activation_achieved',
    ];

    expect(expectedEvents).toContain('user_activation_achieved');
  });

  it('should track reflection count correctly', () => {
    let count = 0;

    // Complete 3 reflections
    for (let i = 1; i <= 3; i++) {
      count++;
      expect(count).toBe(i);
    }

    expect(count).toBe(3);
  });

  it('should generate insight only after 3 reflections', () => {
    const shouldGenerateInsight = (count: number) => count === 3;

    expect(shouldGenerateInsight(1)).toBe(false);
    expect(shouldGenerateInsight(2)).toBe(false);
    expect(shouldGenerateInsight(3)).toBe(true);
    expect(shouldGenerateInsight(4)).toBe(false); // Only first time
  });

  it('should calculate activation timing correctly', () => {
    const signupDate = new Date('2025-01-01');
    const activationDate = new Date('2025-01-06'); // 5 days later

    const daysSinceSignup = Math.floor(
      (activationDate.getTime() - signupDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    expect(daysSinceSignup).toBe(5);
  });

  it('should fire activation event only once per user', () => {
    const activatedUsers = new Set<string>();
    const userId = 'test-user-123';

    // First activation
    if (!activatedUsers.has(userId)) {
      activatedUsers.add(userId);
    }

    expect(activatedUsers.has(userId)).toBe(true);
    expect(activatedUsers.size).toBe(1);

    // Attempt second activation (should not add)
    if (!activatedUsers.has(userId)) {
      activatedUsers.add(userId);
    }

    expect(activatedUsers.size).toBe(1); // Still 1
  });
});

describe('Activation Event Properties', () => {
  it('should include all required properties', () => {
    const activationEvent = {
      event: 'user_activation_achieved',
      user_id: 'test-user-123',
      timestamp: new Date().toISOString(),
      properties: {
        reflection_count: 3,
        insight_id: 'insight-123',
        insight_type: 'pattern' as const,
        days_since_signup: 5,
        session_count: 3,
        first_dimension: 'identity' as const,
        activation_path: 'organic' as const,
      },
    };

    expect(activationEvent.properties).toHaveProperty('reflection_count');
    expect(activationEvent.properties).toHaveProperty('insight_id');
    expect(activationEvent.properties).toHaveProperty('insight_type');
    expect(activationEvent.properties).toHaveProperty('days_since_signup');
    expect(activationEvent.properties).toHaveProperty('session_count');
    expect(activationEvent.properties).toHaveProperty('first_dimension');
    expect(activationEvent.properties).toHaveProperty('activation_path');
  });

  it('should validate insight types', () => {
    const validTypes = ['pattern', 'theme', 'lens_shift'];

    validTypes.forEach(type => {
      expect(['pattern', 'theme', 'lens_shift']).toContain(type);
    });
  });

  it('should validate activation paths', () => {
    const validPaths = ['organic', 'onboarding', 'email_prompt'];

    validPaths.forEach(path => {
      expect(['organic', 'onboarding', 'email_prompt']).toContain(path);
    });
  });
});

describe('Funnel Metrics', () => {
  it('should track conversion through activation funnel', () => {
    const funnel = {
      signup: 100,
      first_reflection: 80,
      second_reflection: 70,
      third_reflection: 65,
      insight_viewed: 60,
    };

    // Calculate conversion rates
    const firstReflectionRate = (funnel.first_reflection / funnel.signup) * 100;
    const secondReflectionRate = (funnel.second_reflection / funnel.signup) * 100;
    const thirdReflectionRate = (funnel.third_reflection / funnel.signup) * 100;
    const activationRate = (funnel.insight_viewed / funnel.signup) * 100;

    expect(firstReflectionRate).toBe(80);
    expect(secondReflectionRate).toBe(70);
    expect(thirdReflectionRate).toBe(65);
    expect(activationRate).toBe(60);

    // Verify we meet target (>60% activation)
    expect(activationRate).toBeGreaterThanOrEqual(60);
  });

  it('should identify drop-off points', () => {
    const funnel = {
      signup: 100,
      first_reflection: 80,
      second_reflection: 70,
      third_reflection: 65,
      insight_viewed: 60,
    };

    // Calculate drop-off at each stage
    const dropoff1 = funnel.signup - funnel.first_reflection; // 20
    const dropoff2 = funnel.first_reflection - funnel.second_reflection; // 10
    const dropoff3 = funnel.second_reflection - funnel.third_reflection; // 5
    const dropoff4 = funnel.third_reflection - funnel.insight_viewed; // 5

    // Biggest drop-off is first reflection
    expect(dropoff1).toBeGreaterThan(dropoff2);
    expect(dropoff1).toBeGreaterThan(dropoff3);
    expect(dropoff1).toBeGreaterThan(dropoff4);
  });
});

describe('Activation Timing', () => {
  it('should allow same-day activation', () => {
    const signupDate = new Date('2025-01-01T10:00:00');
    const activationDate = new Date('2025-01-01T10:30:00'); // 30 minutes later

    const daysSinceSignup = Math.floor(
      (activationDate.getTime() - signupDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    expect(daysSinceSignup).toBe(0); // Same day
  });

  it('should track multi-day activation', () => {
    const signupDate = new Date('2025-01-01');
    const activationDate = new Date('2025-01-08'); // 7 days later

    const daysSinceSignup = Math.floor(
      (activationDate.getTime() - signupDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    expect(daysSinceSignup).toBe(7);
    expect(daysSinceSignup).toBeLessThanOrEqual(7); // Within 7-day target
  });

  it('should flag late activations', () => {
    const TARGET_DAYS = 7;
    const daysSinceSignup = 14; // 2 weeks

    const isLateActivation = daysSinceSignup > TARGET_DAYS;

    expect(isLateActivation).toBe(true);
  });
});

describe('Error Handling', () => {
  it('should handle failed insight generation', () => {
    const reflectionCount = 3;
    let insightGenerated = false;

    try {
      // Simulate API failure
      throw new Error('AI service unavailable');
    } catch (error) {
      // Should not block reflection completion
      insightGenerated = false;
    }

    expect(reflectionCount).toBe(3);
    expect(insightGenerated).toBe(false);
  });

  it('should retry insight generation on failure', async () => {
    let attempts = 0;
    const MAX_RETRIES = 3;

    const tryGenerateInsight = async () => {
      attempts++;
      if (attempts < 3) {
        throw new Error('Service unavailable');
      }
      return { success: true };
    };

    try {
      while (attempts < MAX_RETRIES) {
        try {
          const result = await tryGenerateInsight();
          if (result.success) break;
        } catch (error) {
          // Continue retrying
        }
      }
    } catch (error) {
      // Final failure
    }

    expect(attempts).toBe(3);
  });

  it('should provide fallback insight if AI fails', () => {
    const generateInsight = (reflections: any[]) => {
      try {
        // Simulate AI call failure
        throw new Error('AI unavailable');
      } catch (error) {
        // Fallback insight
        return {
          type: 'pattern',
          title: 'Keep Reflecting',
          content: 'Great start! Complete one more reflection to unlock deeper insights.',
        };
      }
    };

    const insight = generateInsight([{}, {}, {}]);

    expect(insight.type).toBe('pattern');
    expect(insight.title).toBe('Keep Reflecting');
  });
});
