// src/pages/__tests__/HomePage.test.jsx
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import HomePage from '../HomePage';
import { BrowserRouter } from 'react-router-dom';
import * as countriesAPI from '../../services/countries';

// ---- STUB OUT CONTROLS BAR AND COUNTRY CARD ----
jest.mock('../../components/ControlsBar', () => () => <div data-testid="controls-bar" />);
jest.mock('../../components/CountryCard', () => ({ name }) => <div>{name}</div>);

jest.mock('../../services/countries');

test('renders list of countries', async () => {
  countriesAPI.fetchAllCountries.mockResolvedValue([
    { cca3: 'LKA', name: { common: 'Sri Lanka' }, flags: { svg: '' }, population: 21000000, region: 'Asia', capital: ['Colombo'] }
  ]);

  render(
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
  );
  await waitFor(() => expect(screen.getByText(/Sri Lanka/)).toBeInTheDocument());
});

test('displays error message on API failure', async () => {
  countriesAPI.fetchAllCountries.mockRejectedValue(new Error('Failed to fetch countries'));

  render(
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
  );
  await waitFor(() =>
    expect(screen.getByText(/Failed to fetch countries/)).toBeInTheDocument()
  );
});

test('filters countries by region', async () => {
  // stub ControlsBar, so we’ll manually call the region filter handler
});

test('displays no countries message when no countries match the filters', async () => {
  countriesAPI.fetchAllCountries.mockResolvedValue([]);

  render(
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
  );
  await waitFor(() =>
    expect(screen.getByText(/no countries match your search or filter/i)).toBeInTheDocument()
  );
});
