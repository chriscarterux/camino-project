import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

// Example component to test
function Button({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button onClick={onClick} className="px-4 py-2 bg-blue-500 text-white rounded">
      {children}
    </button>
  )
}

describe('Button Component', () => {
  it('renders button with correct text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)

    const button = screen.getByText('Click me')
    button.click()

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('applies correct CSS classes', () => {
    render(<Button>Styled button</Button>)
    const button = screen.getByText('Styled button')

    expect(button).toHaveClass('px-4', 'py-2', 'bg-blue-500', 'text-white', 'rounded')
  })
})
