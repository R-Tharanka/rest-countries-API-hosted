import React from 'react';
import Header from '../components/Header';
import ControlsBar from '../components/ControlsBar';
import CountryCard from '../components/CountryCard'; // optional for now if you're not using it yet

export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl p-4">
      <Header />
      <ControlsBar />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* <CountryCard /> placeholders */}
      </div>
    </div>
  );
}
