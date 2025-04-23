import { render, screen, fireEvent } from '@testing-library/react';
import ControlsBar from '../ControlsBar';

test('renders search and filter controls', () => {
  render(<ControlsBar onSearch={jest.fn()} onFilter={jest.fn()} />);

  expect(screen.getByPlaceholderText(/search for a country/i)).toBeInTheDocument();
  expect(screen.getByText(/filter by region/i)).toBeInTheDocument();
});

test('calls onSearch when typing in search input', () => {
  const onSearchMock = jest.fn();
  render(<ControlsBar onSearch={onSearchMock} onFilter={jest.fn()} />);

  fireEvent.change(screen.getByPlaceholderText(/search for a country/i), {
    target: { value: 'Sri Lanka' },
  });

  expect(onSearchMock).toHaveBeenCalledWith('Sri Lanka');
});

test('calls onFilter when selecting a region', () => {
  const onFilterMock = jest.fn();
  render(<ControlsBar onSearch={jest.fn()} onFilter={onFilterMock} />);

  fireEvent.change(screen.getByText(/filter by region/i), {
    target: { value: 'Asia' },
  });

  expect(onFilterMock).toHaveBeenCalledWith('Asia');
});