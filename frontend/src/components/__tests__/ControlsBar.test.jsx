import { render, screen, fireEvent } from '@testing-library/react';
import ControlsBar from '../ControlsBar';

test('renders search and filter controls', () => {
  render(<ControlsBar onSearch={jest.fn()} onFilter={jest.fn()} />);

  expect(screen.getByPlaceholderText(/search for a country/i)).toBeInTheDocument();
  expect(screen.getByRole('combobox')).toBeInTheDocument();
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
  render(<ControlsBar onFilter={onFilterMock} onSearch={() => {}} />);

  const select = screen.getByRole('combobox');
  fireEvent.change(select, { target: { value: 'Asia' } });

  expect(onFilterMock).toHaveBeenCalledWith('Asia');
});

test('calls onFilter with empty value when no region is selected', () => {
  const onFilterMock = jest.fn();
  render(<ControlsBar onFilter={onFilterMock} onSearch={() => {}} />);

  const select = screen.getByRole('combobox');
  fireEvent.change(select, { target: { value: '' } });

  expect(onFilterMock).toHaveBeenCalledWith('', undefined);
});