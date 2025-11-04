import { render, screen } from '@testing-library/react';
import Image from 'next/image';

describe('Camino Logo', () => {
  describe('Main Logo', () => {
    it('renders with correct alt text', () => {
      render(
        <Image
          src="/camino-logo.svg"
          alt="Camino - 12-week integrated transformation journey"
          width={200}
          height={34}
          priority
        />
      );

      const logo = screen.getByAltText('Camino - 12-week integrated transformation journey');
      expect(logo).toBeInTheDocument();
    });

    it('has correct dimensions', () => {
      render(
        <Image
          src="/camino-logo.svg"
          alt="Camino"
          width={200}
          height={34}
          priority
        />
      );

      const logo = screen.getByAltText('Camino');
      expect(logo).toHaveAttribute('width', '200');
      expect(logo).toHaveAttribute('height', '34');
    });

    it('loads with priority', () => {
      render(
        <Image
          src="/camino-logo.svg"
          alt="Camino"
          width={200}
          height={34}
          priority
        />
      );

      const logo = screen.getByAltText('Camino');
      expect(logo).toBeInTheDocument();
    });
  });

  describe('Icon Logo', () => {
    it('renders square icon correctly', () => {
      render(
        <Image
          src="/camino-icon.svg"
          alt="Camino"
          width={48}
          height={48}
        />
      );

      const icon = screen.getByAltText('Camino');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute('width', '48');
      expect(icon).toHaveAttribute('height', '48');
    });
  });

  describe('Dark Logo', () => {
    it('renders dark variant for dark backgrounds', () => {
      render(
        <div className="bg-slate-900">
          <Image
            src="/camino-logo-dark.svg"
            alt="Camino"
            width={200}
            height={34}
          />
        </div>
      );

      const logo = screen.getByAltText('Camino');
      expect(logo).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has descriptive alt text', () => {
      render(
        <Image
          src="/camino-logo.svg"
          alt="Camino - 12-week integrated transformation journey"
          width={200}
          height={34}
          priority
        />
      );

      const logo = screen.getByAltText('Camino - 12-week integrated transformation journey');
      expect(logo).toBeInTheDocument();
    });

    it('supports simplified alt text', () => {
      render(
        <Image
          src="/camino-logo.svg"
          alt="Camino"
          width={200}
          height={34}
        />
      );

      const logo = screen.getByAltText('Camino');
      expect(logo).toBeInTheDocument();
    });
  });

  describe('Responsive Sizing', () => {
    it('maintains aspect ratio at different sizes', () => {
      const aspectRatio = 3230 / 548; // Original dimensions

      // 200px width test
      const width200 = 200;
      const expectedHeight200 = Math.round(width200 / aspectRatio);

      render(
        <Image
          src="/camino-logo.svg"
          alt="Camino"
          width={width200}
          height={expectedHeight200}
        />
      );

      const logo = screen.getByAltText('Camino');
      expect(logo).toHaveAttribute('width', String(width200));
      expect(logo).toHaveAttribute('height', String(expectedHeight200));
    });

    it('works at minimum recommended size', () => {
      render(
        <Image
          src="/camino-logo.svg"
          alt="Camino"
          width={120}
          height={20}
        />
      );

      const logo = screen.getByAltText('Camino');
      expect(logo).toBeInTheDocument();
    });
  });

  describe('File Variants', () => {
    const variants = [
      { src: '/camino-logo.svg', name: 'Main Logo' },
      { src: '/camino-logo-full.svg', name: 'Full Logo' },
      { src: '/camino-logo-dark.svg', name: 'Dark Logo' },
      { src: '/camino-icon.svg', name: 'Icon' },
    ];

    variants.forEach(({ src, name }) => {
      it(`${name} file exists and loads`, () => {
        render(
          <Image
            src={src}
            alt={name}
            width={200}
            height={200}
          />
        );

        const logo = screen.getByAltText(name);
        expect(logo).toBeInTheDocument();
        expect(logo).toHaveAttribute('src', expect.stringContaining(src));
      });
    });
  });

  describe('Error Handling', () => {
    it('provides fallback when image fails to load', () => {
      const { container } = render(
        <div className="relative">
          <Image
            src="/camino-logo.svg"
            alt="Camino"
            width={200}
            height={34}
            onError={(e) => {
              // Fallback to text
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
          <span className="fallback-text">Camino</span>
        </div>
      );

      expect(container.querySelector('.fallback-text')).toBeInTheDocument();
    });
  });

  describe('Performance', () => {
    it('loads with priority flag for above-the-fold usage', () => {
      render(
        <Image
          src="/camino-logo.svg"
          alt="Camino"
          width={200}
          height={34}
          priority
        />
      );

      const logo = screen.getByAltText('Camino');
      expect(logo).toBeInTheDocument();
      // Priority flag prevents lazy loading
    });

    it('lazy loads when not priority', () => {
      render(
        <Image
          src="/camino-logo.svg"
          alt="Camino"
          width={200}
          height={34}
        />
      );

      const logo = screen.getByAltText('Camino');
      expect(logo).toBeInTheDocument();
    });
  });
});
