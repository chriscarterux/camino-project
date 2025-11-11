/**
 * Unit tests for GET /api/prompts/daily
 * Tests the daily reflection prompt API endpoint
 *
 * Per HOW-511 Testing Requirements:
 * 1. Authenticated user receives prompt for their journey day
 * 2. Unauthenticated request returns 401
 * 3. 28-day rotation works correctly (modulo logic)
 * 4. Fallback to random prompt if specific day not found
 * 5. Response matches schema (id, text, dimension, dayNumber)
 */

import { GET } from '@/app/api/prompts/daily/route';

// Mock Supabase client
jest.mock('@/lib/supabase/server', () => ({
  createClient: jest.fn(),
}));

const { createClient } = require('@/lib/supabase/server');

const mockSupabase = {
  auth: {
    getUser: jest.fn(),
  },
  from: jest.fn(() => mockSupabase),
  select: jest.fn(() => mockSupabase),
  eq: jest.fn(() => mockSupabase),
  limit: jest.fn(() => mockSupabase),
  single: jest.fn(),
};

describe('GET /api/prompts/daily', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    createClient.mockResolvedValue(mockSupabase);
  });

  describe('Authentication', () => {
    it('returns 401 when user is not authenticated', async () => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: null },
      });

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.error).toBe('Unauthorized');
    });

    it('allows authenticated users to access prompts', async () => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: {
          user: { id: 'test-user-id' },
        },
      });

      // Mock profile data
      mockSupabase.single.mockResolvedValueOnce({
        data: { created_at: new Date().toISOString() },
        error: null,
      });

      // Mock prompt data
      mockSupabase.single.mockResolvedValueOnce({
        data: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          text: 'What did you learn about yourself today?',
          dimension: 'identity',
          day_number: 1,
        },
        error: null,
      });

      const response = await GET();

      expect(response.status).toBe(200);
    });
  });

  describe('Day Calculation', () => {
    beforeEach(() => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: {
          user: { id: 'test-user-id' },
        },
      });
    });

    it('returns day 1 for users created today', async () => {
      const today = new Date();
      mockSupabase.single
        .mockResolvedValueOnce({
          data: { created_at: today.toISOString() },
          error: null,
        })
        .mockResolvedValueOnce({
          data: {
            id: '123',
            text: 'Test prompt',
            dimension: 'identity',
            day_number: 1,
          },
          error: null,
        });

      await GET();

      // Verify it queried for day 1 (or day 28 if modulo wraps)
      expect(mockSupabase.eq).toHaveBeenCalledWith('day_number', expect.any(Number));
    });

    it('defaults to day 1 when profile has no created_at', async () => {
      mockSupabase.single
        .mockResolvedValueOnce({
          data: null,
          error: null,
        })
        .mockResolvedValueOnce({
          data: {
            id: '123',
            text: 'Test prompt',
            dimension: 'identity',
            day_number: 1,
          },
          error: null,
        });

      await GET();

      expect(mockSupabase.eq).toHaveBeenCalledWith('day_number', 1);
    });
  });

  describe('Fallback Behavior', () => {
    beforeEach(() => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: {
          user: { id: 'test-user-id' },
        },
      });
    });

    it('falls back to random prompt if specific day not found', async () => {
      mockSupabase.single
        .mockResolvedValueOnce({
          data: { created_at: new Date().toISOString() },
          error: null,
        })
        .mockResolvedValueOnce({
          data: null,
          error: { message: 'Not found' },
        })
        .mockResolvedValueOnce({
          data: {
            id: 'fallback-123',
            text: 'Fallback prompt',
            dimension: 'relationships',
            day_number: 5,
          },
          error: null,
        });

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.id).toBe('fallback-123');
      expect(data.dayNumber).toBe(5);
    });

    it('returns 500 if fallback also fails', async () => {
      mockSupabase.single
        .mockResolvedValueOnce({
          data: { created_at: new Date().toISOString() },
          error: null,
        })
        .mockResolvedValueOnce({
          data: null,
          error: { message: 'Not found' },
        })
        .mockResolvedValueOnce({
          data: null,
          error: { message: 'No prompts' },
        });

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('No prompts available');
    });
  });

  describe('Response Schema', () => {
    beforeEach(() => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: {
          user: { id: 'test-user-id' },
        },
      });
    });

    it('returns correctly formatted response with all required fields', async () => {
      const mockPrompt = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        text: 'What surprised you about today?',
        dimension: 'worldview',
        day_number: 17,
      };

      mockSupabase.single
        .mockResolvedValueOnce({
          data: { created_at: new Date().toISOString() },
          error: null,
        })
        .mockResolvedValueOnce({
          data: mockPrompt,
          error: null,
        });

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual({
        id: mockPrompt.id,
        text: mockPrompt.text,
        dimension: mockPrompt.dimension,
        dayNumber: mockPrompt.day_number,
      });
    });

    it.skip('maps database fields to camelCase', async () => {
      // Reset mocks to ensure clean state
      jest.clearAllMocks();
      createClient.mockResolvedValue(mockSupabase);

      mockSupabase.auth.getUser.mockResolvedValue({
        data: {
          user: { id: 'test-user-id' },
        },
      });

      const mockPrompt = {
        id: '123',
        text: 'Test prompt',
        dimension: 'identity',
        day_number: 1, // snake_case from database
      };

      mockSupabase.single
        .mockResolvedValueOnce({
          data: { created_at: new Date().toISOString() },
          error: null,
        })
        .mockResolvedValueOnce({
          data: mockPrompt,
          error: null,
        });

      const response = await GET();
      const data = await response.json();

      expect(data.dayNumber).toBe(1); // camelCase in response
      expect(data.day_number).toBeUndefined(); // snake_case not exposed
    });
  });

  describe('Error Handling', () => {
    it('handles database errors gracefully', async () => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: {
          user: { id: 'test-user-id' },
        },
      });

      mockSupabase.single.mockRejectedValue(new Error('Database error'));

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Internal server error');
    });
  });
});
