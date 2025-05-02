// frontend/src/pages/__tests__/CountryDetail.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CountryDetail from '../CountryDetail';
import * as countriesAPI from '../../services/countries';
import * as router from 'react-router-dom';

jest.mock('../../services/countries');

describe('CountryDetail page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();

    // Stub out the router hooks
    jest.spyOn(router, 'useParams').mockReturnValue({ code: 'LKA' });
    jest.spyOn(router, 'useNavigate').mockReturnValue(() => { });
  });

  it('renders country details when API succeeds', async () => {
    countriesAPI.fetchByAlpha.mockResolvedValue([{
      cca3: 'LKA',
      name: {
        common: 'Sri Lanka',
        official: 'Democratic Socialist Republic of Sri Lanka'
      },
      flags: { svg: 'https://flagcdn.com/lk.svg' },
      population: 21000000,
      region: 'Asia',
      capital: ['Colombo'],
    }]);

    render(
      <BrowserRouter>
        <CountryDetail />
      </BrowserRouter>
    );

    expect(
      await screen.findByText(/Democratic Socialist Republic of Sri Lanka/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Colombo/i)).toBeInTheDocument();
  });

  it('toggles favorites when user is logged in', async () => {
    // simulate a logged-in user
    localStorage.setItem('user', 'Test User');
    localStorage.setItem('favorites', JSON.stringify([]));

    countriesAPI.fetchByAlpha.mockResolvedValue([{
      cca3: 'LKA',
      name: {
        common: 'Sri Lanka',
        official: 'Democratic Socialist Republic of Sri Lanka'
      },
      flags: { svg: 'https://flagcdn.com/lk.svg' },
      population: 21000000,
      region: 'Asia',
      capital: ['Colombo'],
    }]);

    render(
      <BrowserRouter>
        <CountryDetail />
      </BrowserRouter>
    );

    // Wait for the "Add to Favorites" button to appear
    const addBtn = await screen.findByRole('button', { name: /Add to Favorites/i });
    fireEvent.click(addBtn);

    // Now wait for the localStorage update to have happened
    await waitFor(() => {
      const favs = JSON.parse(localStorage.getItem('favorites'));
      expect(favs).toContain('LKA');
    });
  });

  it('shows an error message when the fetch fails', async () => {
    countriesAPI.fetchByAlpha.mockRejectedValue(new Error('boom'));

    render(
      <BrowserRouter>
        <CountryDetail />
      </BrowserRouter>
    );

    expect(
      await screen.findByText(/Failed to fetch country details/i)
    ).toBeInTheDocument();
  });
});
