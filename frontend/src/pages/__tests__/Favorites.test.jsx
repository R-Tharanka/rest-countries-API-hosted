import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Favorites from '../Favorites';

jest.mock('../../services/countries', () => ({
  fetchByAlpha: jest.fn().mockResolvedValue([{ cca3: 'LKA', name: { common: 'Sri Lanka' }, flags: { svg: 'https://flagcdn.com/lk.svg' }, population: 21000000, region: 'Asia', capital: ['Colombo'] }]),
}));

test('renders message when no user is logged in', () => {
  localStorage.removeItem('user');

  render(
    <BrowserRouter>
      <Favorites />
    </BrowserRouter>
  );

  expect(screen.getByText(/please login to view favorites/i)).toBeInTheDocument();
});

test('renders favorite countries when user is logged in', async () => {
  localStorage.setItem('user', 'Test User');
  localStorage.setItem('favorites', JSON.stringify(['LKA']));

  render(
    <BrowserRouter>
      <Favorites />
    </BrowserRouter>
  );

  expect(await screen.findByText(/sri lanka/i)).toBeInTheDocument();

  localStorage.removeItem('user');
  localStorage.removeItem('favorites');
});

test('handles error when fetching favorite countries', async () => {
  jest.spyOn(console, 'error').mockImplementation(() => {}); // Suppress console errors
  localStorage.setItem('user', 'Test User');
  localStorage.setItem('favorites', JSON.stringify(['LKA']));

  jest.mock('../../services/countries', () => ({
    fetchByAlpha: jest.fn().mockRejectedValue(new Error('Failed to fetch favorites')),
  }));

  render(
    <BrowserRouter>
      <Favorites />
    </BrowserRouter>
  );

  expect(await screen.findByText(/failed to fetch favorites/i)).toBeInTheDocument();

  localStorage.removeItem('user');
  localStorage.removeItem('favorites');
  console.error.mockRestore();
});