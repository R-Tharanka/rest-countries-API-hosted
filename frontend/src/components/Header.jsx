// src/components/Header.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GlobeAltIcon, UserCircleIcon, HeartIcon } from '@heroicons/react/24/outline';

export default function Header() {
  const [user, setUser] = useState(localStorage.getItem('user'));
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  // Sync `user` state with localStorage
  useEffect(() => {
    const handleStorage = () => setUser(localStorage.getItem('user'));
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const onClickOutside = e => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  // Morphing hamburger icon
  function HamburgerIcon({ isOpen }) {
    return (
      <button
        aria-label="Toggle menu"
        className="relative w-6 h-6 focus:outline-none"
      >
        <span
          className={`
            block absolute h-0.5 w-full bg-gray-700
            transition-all duration-300
            ${isOpen ? 'rotate-45 top-2.5' : 'top-1'}
          `}
        />
        <span
          className={`
            block absolute h-0.5 w-full bg-gray-700
            transition-all duration-300
            ${isOpen ? 'opacity-0' : 'top-2.5'}
          `}
        />
        <span
          className={`
            block absolute h-0.5 w-full bg-gray-700
            transition-all duration-300
            ${isOpen ? '-rotate-45 top-2.5' : 'top-4'}
          `}
        />
      </button>
    );
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/60 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
          
          {/* Logo / Title with subtle scale on hover */}
          <Link
            to="/"
            className="flex items-center space-x-2 hover:scale-105 transition-transform"
          >
            <GlobeAltIcon className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-extrabold text-[#12445b]">
              REST Countries
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center space-x-4">
            {!user ? (
              <Link
                to="/login"
                className="px-4 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition"
              >
                Login
              </Link>
            ) : (
              <>
                <Link
                  to="/favorites"
                  className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:text-red-600 hover:bg-gray-100 transition active:scale-95 active:shadow-inner"
                >
                  <HeartIcon className="h-5 w-5 mr-1" />
                  Favorites
                </Link>

                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(o => !o)}
                    className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition"
                  >
                    <UserCircleIcon className="h-6 w-6" />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg animate-slide-down origin-top-right">
                      <p className="px-4 py-2 text-gray-800 border-b border-gray-100">
                        Hello, <span className="font-medium">{user}</span>
                      </p>
                      <button
                        onClick={handleLogout}
                        className="relative w-full text-left px-4 py-2 text-gray-700 transition-all duration-300 hover:text-blue-600
                                after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-blue-600
                                after:transition-all after:duration-300 hover:after:w-full after:ease-in-out after:content-['']"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </nav>

          {/* Mobile hamburger */}
          <div className="md:hidden">
            <button onClick={() => setDrawerOpen(o => !o)}>
              <HamburgerIcon isOpen={drawerOpen} />
            </button>
          </div>
        </div>
      </header>

      {/* Left‑side mobile drawer */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200
          transform transition-transform duration-300 ease-in-out mt-[56px]
          ${drawerOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="px-4 py-6 space-y-4">
          {!user ? (
            <Link
              to="/login"
              onClick={() => setDrawerOpen(false)}
              className="block px-4 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition"
            >
              Login
            </Link>
          ) : (
            <>
              <Link
                to="/favorites"
                onClick={() => setDrawerOpen(false)}
                className="flex items-center px-4 py-2 rounded-md text-gray-700 hover:text-red-600 hover:bg-gray-100 transition"
              >
                <HeartIcon className="h-5 w-5 mr-2" />
                Favorites
              </Link>
              <div className="border-t border-gray-100" />
              <p className="px-4 py-2 text-gray-800">
                Hello, <span className="font-medium">{user}</span>
              </p>
              <button
                onClick={() => { setDrawerOpen(false); handleLogout(); }}
                className="w-full text-left px-4 py-2 rounded-md text-gray-700 hover:text-red-600 hover:bg-gray-100 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </aside>
    </>
  );
}
