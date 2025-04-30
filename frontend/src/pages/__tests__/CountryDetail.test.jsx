import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CountryDetail from '../CountryDetail';

jest.mock('../../services/countries', () => ({
  fetchByAlpha: jest.fn().mockResolvedValue([{ cca3: 'LKA', name: { common: 'Sri Lanka', official: 'Democratic Socialist Republic of Sri Lanka' }, flags: { svg: 'https://flagcdn.com/lk.svg' }, population: 21000000, region: 'Asia', capital: ['Colombo'] }]),
}));

test('renders country details', async () => {
  render(
    <BrowserRouter>
      <CountryDetail />
    </BrowserRouter>
  );

  expect(await screen.findByText(/democratic socialist republic of sri lanka/i)).toBeInTheDocument();
  expect(screen.getByText(/colombo/i)).toBeInTheDocument();
});

test('handles add to favorites', async () => {
  localStorage.setItem('user', 'Test User');
  localStorage.setItem('favorites', JSON.stringify([]));

  render(
    <BrowserRouter>
      <CountryDetail />
    </BrowserRouter>
  );

  const button = await screen.findByText(/🤍 add to favorites/i);
  fireEvent.click(button);

  expect(localStorage.getItem('favorites')).toContain('LKA');

  localStorage.removeItem('user');
  localStorage.removeItem('favorites');
});

test('handles error when fetching country details', async () => {
  jest.spyOn(console, 'error').mockImplementation(() => {}); // Suppress console errors

  jest.mock('../../services/countries', () => ({
    fetchByAlpha: jest.fn().mockRejectedValue(new Error('Failed to fetch country details')),
  }));

  render(
    <BrowserRouter>
      <CountryDetail />
    </BrowserRouter>
  );

  expect(await screen.findByText(/failed to fetch country details/i)).toBeInTheDocument();

  console.error.mockRestore();
});