import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

describe('Homepage Hero Section', () => {
  beforeEach(() => {
    render(<Home />)
  })

  describe('Main Heading', () => {
    it('renders the transformation narrative heading', () => {
      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toHaveTextContent("You're Not Broken")
      expect(heading).toHaveTextContent("You're Just Seeing Through the Wrong Lens")
    })

    it('applies correct styling classes', () => {
      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toHaveClass('text-center', 'font-serif', 'font-bold')
    })
  })

  describe('Subheading', () => {
    it('explains the 12-week journey structure', () => {
      const subheading = screen.getByText(/A 12-week integrated transformation journey that shifts/i)
      expect(subheading).toBeInTheDocument()
    })

    it('mentions all three dimensions', () => {
      const subheading = screen.getByText(/A 12-week integrated transformation journey that shifts/i)
      expect(subheading).toHaveTextContent('Identity')
      expect(subheading).toHaveTextContent('Worldview')
      expect(subheading).toHaveTextContent('Your Place in the World')
    })
  })

  describe('Three Dimensions Visual', () => {
    it('renders all three dimension cards', () => {
      expect(screen.getByText('Identity')).toBeInTheDocument()
      expect(screen.getByText('Worldview')).toBeInTheDocument()
      expect(screen.getByText('Relationships')).toBeInTheDocument()
    })

    it('displays transformation descriptions for each dimension', () => {
      expect(screen.getByText('From self-criticism to inherent worth')).toBeInTheDocument()
      expect(screen.getByText('From scarcity to abundance')).toBeInTheDocument()
      expect(screen.getByText('From isolation to interconnection')).toBeInTheDocument()
    })

    it('renders numbered badges for each dimension', () => {
      const badges = screen.getAllByText(/^[1-3]$/)
      expect(badges).toHaveLength(3)
    })
  })

  describe('CTA Buttons', () => {
    it('renders "Start Your Transformation" primary CTA', () => {
      const primaryCTA = screen.getByRole('link', { name: /start your transformation/i })
      expect(primaryCTA).toBeInTheDocument()
      expect(primaryCTA).toHaveAttribute('href', '/journal')
    })

    it('renders "See how it works" secondary CTA', () => {
      const secondaryCTA = screen.getByRole('link', { name: /see how it works/i })
      expect(secondaryCTA).toBeInTheDocument()
      expect(secondaryCTA).toHaveAttribute('href', '/how-it-works')
    })

    it('applies correct styling to primary CTA', () => {
      const primaryCTA = screen.getByRole('link', { name: /start your transformation/i })
      expect(primaryCTA).toHaveClass('bg-[#E2C379]')
    })
  })

  describe('Social Proof', () => {
    it('displays "12 weeks to complete coherence" message', () => {
      expect(screen.getByText('12 weeks to complete coherence')).toBeInTheDocument()
    })

    it('shows program details', () => {
      expect(screen.getByText('84 days of AI-guided reflection')).toBeInTheDocument()
      expect(screen.getByText('6 private coaching sessions')).toBeInTheDocument()
      expect(screen.getByText('24/7 AI pattern recognition')).toBeInTheDocument()
    })

    it('displays program features with accompanying text', () => {
      // Verify that all three features are displayed in the social proof section
      const feature1 = screen.getByText('84 days of AI-guided reflection')
      const feature2 = screen.getByText('6 private coaching sessions')
      const feature3 = screen.getByText('24/7 AI pattern recognition')

      expect(feature1).toBeInTheDocument()
      expect(feature2).toBeInTheDocument()
      expect(feature3).toBeInTheDocument()
    })
  })

  describe('Responsive Design', () => {
    it('uses responsive text sizing classes', () => {
      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toHaveClass('text-4xl', 'sm:text-5xl', 'md:text-6xl', 'lg:text-7xl', 'xl:text-8xl')
    })

    it('uses responsive grid for dimension cards', () => {
      const dimensionContainer = screen.getByText('Identity').closest('.grid')
      expect(dimensionContainer).toHaveClass('grid-cols-1', 'md:grid-cols-3')
    })
  })

  describe('Accessibility', () => {
    it('uses semantic HTML heading hierarchy', () => {
      const h1 = screen.getByRole('heading', { level: 1 })
      expect(h1).toBeInTheDocument()

      const h3s = screen.getAllByRole('heading', { level: 3 })
      expect(h3s.length).toBeGreaterThanOrEqual(3) // At least the 3 dimension headings
    })

    it('provides descriptive link text for CTAs', () => {
      const links = screen.getAllByRole('link')
      links.forEach(link => {
        expect(link).toHaveAccessibleName()
      })
    })
  })

  describe('Brand Consistency', () => {
    it('uses Camino brand color #E2C379', () => {
      const primaryCTA = screen.getByRole('link', { name: /start your transformation/i })
      expect(primaryCTA).toHaveClass('bg-[#E2C379]')
    })

    it('maintains serif font for headings', () => {
      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toHaveClass('font-serif')
    })
  })

  describe('Content Accuracy', () => {
    it('does not use generic self-help language', () => {
      expect(screen.queryByText(/meaningful life/i)).not.toBeInTheDocument()
      expect(screen.queryByText(/guided reflection for a meaningful life/i)).not.toBeInTheDocument()
    })

    it('emphasizes dimensional transformation', () => {
      expect(screen.getByText(/A 12-week integrated transformation journey/i)).toBeInTheDocument()
      expect(screen.getByText(/wrong lens/i)).toBeInTheDocument()
    })

    it('mentions AI + human coaching synergy', () => {
      expect(screen.getByText(/AI-guided reflection/i)).toBeInTheDocument()
      expect(screen.getByText(/coaching sessions/i)).toBeInTheDocument()
    })
  })
})
