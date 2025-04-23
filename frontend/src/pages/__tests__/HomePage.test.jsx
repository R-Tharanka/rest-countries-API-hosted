import { render, screen, waitFor } from '@testing-library/react';
import HomePage from '../HomePage';
import { BrowserRouter } from 'react-router-dom';
import * as countriesAPI from '../../services/countries';

jest.mock('../../services/countries');

test('renders list of countries', async () => {
  countriesAPI.fetchAllCountries.mockResolvedValue([
    {
      cca3: 'LKA',
      name: { common: 'Sri Lanka' },
      flags: { svg: 'https://flagcdn.com/lk.svg' },
      population: 21000000,
      region: 'Asia',
      capital: ['Colombo'],
    },
  ]);

  render(
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
  );

  await waitFor(() => {
    expect(screen.getByText(/Sri Lanka/i)).toBeInTheDocument();
  });
});

test('displays error message on API failure', async () => {
  countriesAPI.fetchAllCountries.mockRejectedValue(new Error('Failed to fetch countries'));

  render(
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
  );

  await waitFor(() => {
    expect(screen.getByText(/Failed to fetch countries/i)).toBeInTheDocument();
  });
});

test('filters countries by region', async () => {
  countriesAPI.fetchByRegion.mockResolvedValue([
    {
      cca3: 'LKA',
      name: { common: 'Sri Lanka' },
      flags: { svg: 'https://flagcdn.com/lk.svg' },
      population: 21000000,
      region: 'Asia',
      capital: ['Colombo'],
    },
  ]);

  render(
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
  );

  const filterSelect = screen.getByRole('combobox');
  filterSelect.value = 'Asia';
  filterSelect.dispatchEvent(new Event('change'));

  await waitFor(() => {
    expect(screen.getByText(/Sri Lanka/i)).toBeInTheDocument();
  });
});
