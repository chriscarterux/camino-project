/**
 * Unit Tests for Onboarding Components
 *
 * Tests individual components in isolation
 */

import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProgressBar } from '@/components/onboarding/ProgressBar';
import { IntentSelector } from '@/components/onboarding/IntentSelector';
import { EncouragementCard } from '@/components/onboarding/EncouragementCard';

describe('ProgressBar', () => {
  it('renders with correct progress percentage', () => {
    render(<ProgressBar currentStep={3} totalSteps={9} />);

    expect(screen.getByText('Step 3 of 9')).toBeInTheDocument();
    expect(screen.getByText('33% complete')).toBeInTheDocument();
  });

  it('has proper ARIA labels', () => {
    render(<ProgressBar currentStep={5} totalSteps={9} />);

    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '5');
    expect(progressBar).toHaveAttribute('aria-valuemin', '0');
    expect(progressBar).toHaveAttribute('aria-valuemax', '9');
  });

  it('renders correct number of step dots', () => {
    const { container } = render(<ProgressBar currentStep={3} totalSteps={9} />);

    const dots = container.querySelectorAll('[aria-hidden="true"] > div');
    expect(dots).toHaveLength(9);
  });
});

describe('IntentSelector', () => {
  it('renders all intent options', () => {
    const mockOnSelect = jest.fn();
    render(<IntentSelector onSelect={mockOnSelect} />);

    expect(screen.getByText('Identity')).toBeInTheDocument();
    expect(screen.getByText('Worldview')).toBeInTheDocument();
    expect(screen.getByText('Relationships')).toBeInTheDocument();
    expect(screen.getByText('All Dimensions')).toBeInTheDocument();
  });

  it('calls onSelect when an option is clicked', () => {
    const mockOnSelect = jest.fn();
    render(<IntentSelector onSelect={mockOnSelect} />);

    const identityButton = screen.getByRole('button', { name: /Select Identity/i });
    fireEvent.click(identityButton);

    expect(mockOnSelect).toHaveBeenCalledWith('identity');
  });

  it('shows selected state correctly', () => {
    const mockOnSelect = jest.fn();
    render(<IntentSelector onSelect={mockOnSelect} selected="worldview" />);

    const worldviewButton = screen.getByRole('button', { name: /Select Worldview/i });
    expect(worldviewButton).toHaveAttribute('aria-pressed', 'true');
  });

  it('is keyboard navigable', () => {
    const mockOnSelect = jest.fn();
    render(<IntentSelector onSelect={mockOnSelect} />);

    const firstButton = screen.getByRole('button', { name: /Select Identity/i });
    firstButton.focus();

    expect(firstButton).toHaveFocus();
  });
});

describe('EncouragementCard', () => {
  it('renders encouragement for first reflection', () => {
    render(<EncouragementCard reflectionCount={1} totalNeeded={3} />);

    expect(screen.getByText('Great start!')).toBeInTheDocument();
    expect(screen.getByText(/Two more reflections/i)).toBeInTheDocument();
  });

  it('renders encouragement for second reflection', () => {
    render(<EncouragementCard reflectionCount={2} totalNeeded={3} />);

    expect(screen.getByText("You're doing amazing!")).toBeInTheDocument();
    expect(screen.getByText(/One more reflection/i)).toBeInTheDocument();
  });

  it('shows correct progress', () => {
    render(<EncouragementCard reflectionCount={2} totalNeeded={3} />);

    expect(screen.getByText('2 / 3 reflections')).toBeInTheDocument();

    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '2');
    expect(progressBar).toHaveAttribute('aria-valuemax', '3');
  });

  it('renders motivational quote on second reflection', () => {
    render(<EncouragementCard reflectionCount={2} totalNeeded={3} />);

    expect(screen.getByText(/The unexamined life/i)).toBeInTheDocument();
  });
});
