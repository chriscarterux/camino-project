/**
 * Integration tests for the Reflect page daily prompt experience.
 *
 * Covers HOW-511 acceptance criteria that require:
 * - Fetching the daily prompt from the API
 * - Displaying loading and error states
 * - Rendering the prompt content once loaded
 */

import { render, screen, waitFor } from '@testing-library/react';
import ReflectPage from '@/app/app/reflect/page';

const originalFetch = global.fetch;

const mockPrompt = {
  id: '550e8400-e29b-41d4-a716-446655440000',
  text: 'What did you learn about yourself today?',
  dimension: 'identity',
  dayNumber: 12,
};

describe('ReflectPage daily prompt integration', () => {
  afterEach(() => {
    if (originalFetch) {
      global.fetch = originalFetch;
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (global as any).fetch;
    }
    jest.resetAllMocks();
  });

  it('shows loading state and then renders the fetched prompt', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => mockPrompt,
    }) as unknown as typeof fetch;

    render(<ReflectPage />);

    expect(
      screen.getByText(/loading today's prompt/i)
    ).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByText(mockPrompt.text)).toBeInTheDocument()
    );
    expect(
      screen.getByText(`Day ${mockPrompt.dayNumber} • ${mockPrompt.dimension}`)
    ).toBeInTheDocument();
  });

  it('surfaces a user-friendly error when the API request fails', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
    }) as unknown as typeof fetch;

    render(<ReflectPage />);

    await waitFor(() =>
      expect(
        screen.getByText(/could not load today's prompt/i)
      ).toBeInTheDocument()
    );
    expect(
      screen.getByRole('button', { name: /try again/i })
    ).toBeInTheDocument();
  });
});
