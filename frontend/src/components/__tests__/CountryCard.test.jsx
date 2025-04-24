import { render, screen } from '@testing-library/react';
import CountryCard from '../CountryCard';
import { BrowserRouter } from 'react-router-dom';

test('renders country details', () => {
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

  expect(screen.getByText(/Sri Lanka/i)).toBeInTheDocument();
  expect(screen.getByText(/Asia/i)).toBeInTheDocument();
  expect(screen.getByText(/Colombo/i)).toBeInTheDocument();
  expect(screen.getByText(/21,000,000/i)).toBeInTheDocument();
});

test('renders fallback values when props are missing', () => {
  render(
    <BrowserRouter>
      <CountryCard
        code=""
        flag=""
        name="Unknown"
        population="0"
        region="Unknown"
        capital="Unknown"
      />
    </BrowserRouter>
  );

  expect(screen.getByText(/Unknown/i)).toBeInTheDocument();
  expect(screen.getByText(/0/i)).toBeInTheDocument();
});
