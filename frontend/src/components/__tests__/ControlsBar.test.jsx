// src/components/__tests__/ControlsBar.test.jsx
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import ControlsBar from '../ControlsBar';

// Stub out the Globe animation so we never pull in amcharts5 in tests
jest.mock('../Globe', () => () => <div data-testid="globe" />);

describe('ControlsBar', () => {
  it('renders search input and two filter dropdowns', () => {
    render(<ControlsBar onSearch={jest.fn()} onFilter={jest.fn()} />);
    // search box
    expect(
      screen.getByPlaceholderText(/search for a country/i)
    ).toBeInTheDocument();

    // exactly two <select>s = two comboboxes
    const selects = screen.getAllByRole('combobox');
    expect(selects).toHaveLength(2);
  });

  it('calls onSearch when typing in the search box', () => {
    const onSearch = jest.fn();
    render(<ControlsBar onSearch={onSearch} onFilter={jest.fn()} />);

    fireEvent.change(screen.getByPlaceholderText(/search for a country/i), {
      target: { value: 'Brazil' },
    });
    expect(onSearch).toHaveBeenCalledWith('Brazil');
  });

  it('calls onFilter(region, language) when changing the region dropdown', () => {
    const onFilter = jest.fn();
    render(<ControlsBar onSearch={jest.fn()} onFilter={onFilter} />);

    const [regionSelect, languageSelect] = screen.getAllByRole('combobox');
    fireEvent.change(regionSelect, { target: { value: 'Asia' } });

    // language should still be the empty string
    expect(onFilter).toHaveBeenCalledWith('Asia', '');
  });

  it('calls onFilter(region, language) when changing the language dropdown', () => {
    const onFilter = jest.fn();
    render(<ControlsBar onSearch={jest.fn()} onFilter={onFilter} />);

    const [regionSelect, languageSelect] = screen.getAllByRole('combobox');
    fireEvent.change(languageSelect, { target: { value: 'French' } });

    // region should still be the empty string
    expect(onFilter).toHaveBeenCalledWith('', 'French');
  });

  it('reveals the Globe after the typing effect finishes', async () => {
    jest.useFakeTimers();
    render(<ControlsBar onSearch={jest.fn()} onFilter={jest.fn()} />);

    const fullText = 'Explore Countries Around the Globe';
    // Typing happens at 50ms intervals, and showGlobe is set after fullText.length + 1 steps
    act(() => {
      jest.advanceTimersByTime((fullText.length + 1) * 50 + 5);
    });

    expect(await screen.findByTestId('globe')).toBeInTheDocument();
    jest.useRealTimers();
  });

});
