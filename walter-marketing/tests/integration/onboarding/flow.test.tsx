/**
 * Integration Tests for Onboarding Flow
 *
 * Tests the complete flow progression and state management
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { OnboardingProvider, useOnboarding } from '@/lib/onboarding/context';
import { getPrompt } from '@/lib/onboarding/prompts';

// Mock router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock analytics
jest.mock('@/lib/analytics', () => ({
  trackOnboardingStepViewed: jest.fn(),
  trackOnboardingStepCompleted: jest.fn(),
  trackReflectionCompleted: jest.fn(),
  trackActivation: jest.fn(),
}));

describe('Onboarding Context', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('initializes with default state', () => {
    let contextValue: any;

    function TestComponent() {
      contextValue = useOnboarding();
      return null;
    }

    render(
      <OnboardingProvider>
        <TestComponent />
      </OnboardingProvider>
    );

    expect(contextValue.state.intent).toBeNull();
    expect(contextValue.state.reflections).toEqual([]);
    expect(contextValue.state.currentStep).toBe(1);
  });

  it('updates intent correctly', () => {
    let contextValue: any;

    function TestComponent() {
      contextValue = useOnboarding();
      return (
        <button onClick={() => contextValue.setIntent('identity')}>
          Set Intent
        </button>
      );
    }

    render(
      <OnboardingProvider>
        <TestComponent />
      </OnboardingProvider>
    );

    fireEvent.click(screen.getByText('Set Intent'));

    expect(contextValue.state.intent).toBe('identity');
  });

  it('adds reflections correctly', () => {
    let contextValue: any;

    function TestComponent() {
      contextValue = useOnboarding();
      return (
        <button
          onClick={() =>
            contextValue.addReflection({
              promptId: 'test_prompt',
              promptText: 'Test prompt',
              text: 'Test reflection',
              wordCount: 50,
              timeSpent: 120,
            })
          }
        >
          Add Reflection
        </button>
      );
    }

    render(
      <OnboardingProvider>
        <TestComponent />
      </OnboardingProvider>
    );

    fireEvent.click(screen.getByText('Add Reflection'));

    expect(contextValue.state.reflections).toHaveLength(1);
    expect(contextValue.state.reflections[0].text).toBe('Test reflection');
    expect(contextValue.state.reflections[0].wordCount).toBe(50);
  });

  it('persists state to localStorage', async () => {
    let contextValue: any;

    function TestComponent() {
      contextValue = useOnboarding();
      return (
        <button onClick={() => contextValue.setIntent('worldview')}>
          Set Intent
        </button>
      );
    }

    render(
      <OnboardingProvider>
        <TestComponent />
      </OnboardingProvider>
    );

    fireEvent.click(screen.getByText('Set Intent'));

    await waitFor(() => {
      const saved = localStorage.getItem('camino_onboarding_state');
      expect(saved).toBeTruthy();
      const parsed = JSON.parse(saved!);
      expect(parsed.intent).toBe('worldview');
    });
  });

  it('loads state from localStorage on mount', () => {
    const savedState = {
      intent: 'relationships',
      reflections: [
        {
          id: 'ref_1',
          promptId: 'prompt_1',
          promptText: 'Test',
          text: 'Reflection',
          wordCount: 50,
          timeSpent: 100,
          timestamp: new Date().toISOString(),
        },
      ],
      currentStep: 5,
      insightId: null,
      startTime: Date.now(),
    };

    localStorage.setItem('camino_onboarding_state', JSON.stringify(savedState));

    let contextValue: any;

    function TestComponent() {
      contextValue = useOnboarding();
      return null;
    }

    render(
      <OnboardingProvider>
        <TestComponent />
      </OnboardingProvider>
    );

    expect(contextValue.state.intent).toBe('relationships');
    expect(contextValue.state.reflections).toHaveLength(1);
    expect(contextValue.state.currentStep).toBe(5);
  });

  it('resets onboarding state correctly', () => {
    let contextValue: any;

    function TestComponent() {
      contextValue = useOnboarding();
      return (
        <>
          <button onClick={() => contextValue.setIntent('identity')}>
            Set Intent
          </button>
          <button onClick={() => contextValue.resetOnboarding()}>
            Reset
          </button>
        </>
      );
    }

    render(
      <OnboardingProvider>
        <TestComponent />
      </OnboardingProvider>
    );

    fireEvent.click(screen.getByText('Set Intent'));
    expect(contextValue.state.intent).toBe('identity');

    fireEvent.click(screen.getByText('Reset'));
    expect(contextValue.state.intent).toBeNull();
    expect(contextValue.state.reflections).toEqual([]);
    expect(contextValue.state.currentStep).toBe(1);
  });
});

describe('Reflection Prompts', () => {
  it('returns correct prompts for identity intent', () => {
    const prompts = [
      getPrompt('identity', 1),
      getPrompt('identity', 2),
      getPrompt('identity', 3),
    ];

    expect(prompts[0].dimension).toBe('identity');
    expect(prompts[0].text).toContain('belief');
    expect(prompts).toHaveLength(3);
  });

  it('returns correct prompts for worldview intent', () => {
    const prompts = [
      getPrompt('worldview', 1),
      getPrompt('worldview', 2),
      getPrompt('worldview', 3),
    ];

    expect(prompts[0].dimension).toBe('worldview');
    expect(prompts).toHaveLength(3);
  });

  it('returns correct prompts for relationships intent', () => {
    const prompts = [
      getPrompt('relationships', 1),
      getPrompt('relationships', 2),
      getPrompt('relationships', 3),
    ];

    expect(prompts[0].dimension).toBe('relationships');
    expect(prompts[0].text).toContain('pattern');
    expect(prompts).toHaveLength(3);
  });

  it('returns mixed prompts for all dimensions', () => {
    const prompts = [
      getPrompt('all', 1),
      getPrompt('all', 2),
      getPrompt('all', 3),
    ];

    const dimensions = prompts.map((p) => p.dimension);
    expect(new Set(dimensions).size).toBe(3); // All three dimensions represented
  });
});
