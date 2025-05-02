// src/components/__tests__/CountryCard.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import CountryCard from '../CountryCard';
import { BrowserRouter } from 'react-router-dom';

describe('CountryCard', () => {
  it('renders country details', () => {
    render(
      <BrowserRouter>
        <CountryCard
          code="LKA"
          flag="https://flagcdn.com/lk.svg"
          name="Sri Lanka"
          population="21,000,000"
          region="Asia"
          capital="Colombo"
        />
      </BrowserRouter>
    );

    // Country name
    expect(
      screen.getByRole('heading', { name: /Sri Lanka/i })
    ).toBeInTheDocument();

    // Capital, region, population
    expect(screen.getByText((content, node) =>
      node.textContent === 'Capital: Colombo'
    )).toBeInTheDocument();

    expect(screen.getByText((content, node) =>
      node.textContent === 'Region: Asia'
    )).toBeInTheDocument();

    expect(screen.getByText((content, node) =>
      node.textContent === 'Population: 21,000,000'
    )).toBeInTheDocument();


    // Flag image
    expect(
      screen.getByRole('img', { name: /Sri Lanka flag/i })
    ).toHaveAttribute('src', 'https://flagcdn.com/lk.svg');
  });

  it('renders fallback values when props are missing', () => {
    render(
      <BrowserRouter>
        <CountryCard
          code=""
          flag={null}
          name="Unknown"
          population="0"
          region="Unknown"
          capital="Unknown"
        />
      </BrowserRouter>
    );

    // Fallback name
    expect(
      screen.getByRole('heading', { name: 'Unknown' })
    ).toBeInTheDocument();

    // Fallback capital / region / population lines
    expect(screen.getByText((content, node) =>
      node.textContent === 'Capital: Unknown'
    )).toBeInTheDocument();

    expect(screen.getByText((content, node) =>
      node.textContent === 'Region: Unknown'
    )).toBeInTheDocument();

    expect(screen.getByText((content, node) =>
      node.textContent === 'Population: 0'
    )).toBeInTheDocument();

  });
});
