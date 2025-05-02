import { render, screen, fireEvent } from '@testing-library/react';
import BackToTop from '../BackToTop';

// Mock window.scrollTo
Object.defineProperty(window, 'scrollTo', {
  value: jest.fn(),
  writable: true,
});

test('BackToTop button is not visible initially', () => {
  render(<BackToTop />);
  expect(screen.queryByRole('button', { name: /back to top/i })).not.toBeInTheDocument();
});

test('BackToTop button becomes visible after scrolling down', () => {
  render(<BackToTop />);

  // Simulate scrolling down
  fireEvent.scroll(window, { target: { scrollY: 400 } });

  expect(screen.getByRole('button', { name: /back to top/i })).toBeInTheDocument();
});

test('Clicking BackToTop button scrolls to the top', () => {
  render(<BackToTop />);

  // Simulate scrolling down
  fireEvent.scroll(window, { target: { scrollY: 400 } });

  const button = screen.getByRole('button', { name: /back to top/i });
  fireEvent.click(button);

  expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
});