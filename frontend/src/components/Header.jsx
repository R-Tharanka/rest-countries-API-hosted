import React from 'react';

export default function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-4">
      <h1 className="text-2xl font-bold">REST Countries Explorer</h1>
      <button className="px-4 py-2 rounded shadow hover:bg-gray-100">
        Favorites
      </button>
    </header>
  );
}
