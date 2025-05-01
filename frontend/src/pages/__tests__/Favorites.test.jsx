import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Favorites from '../Favorites';
import * as countriesAPI from '../../services/countries';

jest.mock('../../services/countries');

describe('Favorites page', () => {
  beforeEach(() => {
    countriesAPI.fetchByAlpha.mockReset();
    localStorage.clear();
  });

  test('renders message when no user is logged in', () => {
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

    countriesAPI.fetchByAlpha.mockResolvedValue([
      {
        cca3: 'LKA',
        name: { common: 'Sri Lanka' },
        flags: { svg: 'https://flagcdn.com/lk.svg' },
        population: 21000000,
        region: 'Asia',
        capital: ['Colombo']
      }
    ]);

    await act(async () => {
      render(
        <BrowserRouter>
          <Favorites />
        </BrowserRouter>
      );
    });

    await waitFor(() => {
      expect(screen.getByText(/Sri Lanka/i)).toBeInTheDocument();
    });
  });

  test('handles error when fetching favorite countries', async () => {
    localStorage.setItem('user', 'Test User');
    localStorage.setItem('favorites', JSON.stringify(['LKA']));

    countriesAPI.fetchByAlpha.mockRejectedValue(new Error('boom'));

    await act(async () => {
      render(
        <BrowserRouter>
          <Favorites />
        </BrowserRouter>
      );
    });

    await waitFor(() => {
      expect(screen.getByText(/Failed to fetch favorites/i)).toBeInTheDocument();
    });
  });
});
