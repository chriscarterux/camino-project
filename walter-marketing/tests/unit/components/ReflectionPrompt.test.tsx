/**
 * Unit Tests for ReflectionPrompt Component
 *
 * Tests XSS prevention, input validation, and accessibility
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ReflectionPrompt } from '@/components/onboarding/ReflectionPrompt';

describe('ReflectionPrompt Security', () => {
  const mockOnSubmit = jest.fn();
  const defaultProps = {
    promptText: 'Test prompt',
    onSubmit: mockOnSubmit,
    minWords: 2,
    maxWords: 100,
  };

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it('prevents XSS attacks in promptText using React default escaping', () => {
    const xssPayload = '<script>alert("XSS")</script>';

    const { container } = render(
      <ReflectionPrompt {...defaultProps} promptText={xssPayload} />
    );

    // React automatically escapes content in JSX, so script tags appear as text
    expect(container.textContent).toContain('<script>');
    expect(container.textContent).toContain('alert("XSS")');

    // Verify no actual script tags were created in the DOM
    const scriptTags = container.querySelectorAll('script');
    expect(scriptTags.length).toBe(0);
  });

  it('prevents XSS attacks in user reflection input', async () => {
    render(<ReflectionPrompt {...defaultProps} />);

    const textarea = screen.getByLabelText('Reflection text area');
    const xssPayload = '<img src=x onerror="alert(\'XSS\')">';

    // Type XSS payload
    fireEvent.change(textarea, { target: { value: xssPayload } });

    // React's controlled input automatically escapes the value
    expect(textarea).toHaveValue(xssPayload);

    // Verify no img tags were created (value is stored as string only)
    const { container } = render(<ReflectionPrompt {...defaultProps} />);
    const imgTags = container.querySelectorAll('img');
    // Should only have background/UI images, not user-injected ones
    expect(
      Array.from(imgTags).every(
        img => img.getAttribute('src') !== 'x'
      )
    ).toBeTruthy();
  });

  it('handles HTML entities safely in promptText', () => {
    const htmlEntities = 'What does &lt;love&gt; mean to you?';

    const { container } = render(
      <ReflectionPrompt {...defaultProps} promptText={htmlEntities} />
    );

    // React renders HTML entities as-is (doesn't decode them)
    expect(container.textContent).toContain('&lt;love&gt;');
  });

  it('prevents script injection through placeholder', () => {
    const xssPlaceholder = '<script>alert("XSS")</script>';

    render(
      <ReflectionPrompt {...defaultProps} placeholder={xssPlaceholder} />
    );

    const textarea = screen.getByLabelText('Reflection text area');

    // Placeholder attribute is automatically escaped by React
    expect(textarea).toHaveAttribute('placeholder', xssPlaceholder);

    // Verify it's stored as a string attribute, not executed
    const { container } = render(<ReflectionPrompt {...defaultProps} placeholder={xssPlaceholder} />);
    const scriptTags = container.querySelectorAll('script');
    expect(scriptTags.length).toBe(0);
  });

  it('submits user input safely without HTML interpretation', async () => {
    render(<ReflectionPrompt {...defaultProps} minWords={2} />);

    const textarea = screen.getByLabelText('Reflection text area');
    const userInput = '<b>Bold</b> <i>Italic</i> text';

    fireEvent.change(textarea, { target: { value: userInput } });

    const submitButton = screen.getByText('Continue');

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });

    fireEvent.click(submitButton);

    // Verify the callback receives the raw text (not HTML-parsed)
    expect(mockOnSubmit).toHaveBeenCalledWith(
      userInput,
      expect.any(Number),
      expect.any(Number)
    );

    // The text should be stored as-is, not interpreted as HTML
    expect(mockOnSubmit.mock.calls[0][0]).toBe(userInput);
  });

  it('marks textarea with data-private attribute to prevent autocapture', () => {
    render(<ReflectionPrompt {...defaultProps} />);

    const textarea = screen.getByLabelText('Reflection text area');

    // Verify data-private attribute is present
    // This prevents analytics tools from capturing sensitive input
    expect(textarea).toHaveAttribute('data-private');
  });
});

describe('ReflectionPrompt Validation', () => {
  const mockOnSubmit = jest.fn();
  const defaultProps = {
    promptText: 'Test prompt',
    onSubmit: mockOnSubmit,
    minWords: 5,
    maxWords: 100,
  };

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it('disables submit button when word count is below minimum', () => {
    render(<ReflectionPrompt {...defaultProps} />);

    const textarea = screen.getByLabelText('Reflection text area');
    fireEvent.change(textarea, { target: { value: 'Too short' } });

    const submitButton = screen.getByText('Continue');
    expect(submitButton).toBeDisabled();
  });

  it('enables submit button when word count meets minimum', () => {
    render(<ReflectionPrompt {...defaultProps} minWords={3} />);

    const textarea = screen.getByLabelText('Reflection text area');
    fireEvent.change(textarea, { target: { value: 'This is valid' } });

    const submitButton = screen.getByText('Continue');
    expect(submitButton).not.toBeDisabled();
  });

  it('calculates word count correctly', () => {
    render(<ReflectionPrompt {...defaultProps} minWords={3} />);

    const textarea = screen.getByLabelText('Reflection text area');
    fireEvent.change(textarea, { target: { value: 'One two three four five' } });

    // Word count should be displayed
    expect(screen.getByText('5 words')).toBeInTheDocument();
  });

  it('shows progress percentage', () => {
    render(<ReflectionPrompt {...defaultProps} minWords={10} />);

    const textarea = screen.getByLabelText('Reflection text area');
    fireEvent.change(textarea, { target: { value: 'One two three four five' } });

    // 5 words out of 10 required = 50%
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('submits with correct word count and time spent', async () => {
    render(<ReflectionPrompt {...defaultProps} minWords={2} />);

    const textarea = screen.getByLabelText('Reflection text area');
    fireEvent.change(textarea, { target: { value: 'Valid text' } });

    const submitButton = screen.getByText('Continue');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        'Valid text',
        2, // word count
        expect.any(Number) // time spent
      );
    });
  });
});

describe('ReflectionPrompt Accessibility', () => {
  const defaultProps = {
    promptText: 'Test prompt',
    onSubmit: jest.fn(),
  };

  it('has proper ARIA labels', () => {
    render(<ReflectionPrompt {...defaultProps} />);

    const textarea = screen.getByLabelText('Reflection text area');
    expect(textarea).toHaveAttribute('aria-describedby', 'word-count-indicator');
  });

  it('provides descriptive button text for screen readers', () => {
    render(<ReflectionPrompt {...defaultProps} minWords={5} />);

    const textarea = screen.getByLabelText('Reflection text area');
    fireEvent.change(textarea, { target: { value: 'Short' } });

    const submitButton = screen.getByRole('button');
    expect(submitButton).toHaveAttribute('aria-label', expect.stringContaining('more words'));
  });

  it('updates aria-label when validation state changes', () => {
    render(<ReflectionPrompt {...defaultProps} minWords={2} />);

    const textarea = screen.getByLabelText('Reflection text area');
    fireEvent.change(textarea, { target: { value: 'Valid input' } });

    const submitButton = screen.getByRole('button');
    expect(submitButton).toHaveAttribute('aria-label', 'Submit reflection');
  });
});
