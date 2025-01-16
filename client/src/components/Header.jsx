import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaBars } from 'react-icons/fa'; // Ensure react-icons is installed

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white text-gray-800 border-t-4 border-b-4 border-blue-400 shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo Section */}
        <h1 className="font-extrabold text-lg sm:text-2xl flex items-center">
          <span className="text-blue-600 mr-1">Kriyanighantu</span>
        </h1>

        {/* Hamburger Menu for Mobile */}
        <button
          className="sm:hidden text-2xl text-blue-600 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
          aria-expanded={isMenuOpen}
        >
          <FaBars />
        </button>

        {/* Navigation Links */}
        <ul
          className={`absolute sm:static left-0 top-full bg-white w-full sm:w-auto sm:right-0 sm:flex sm:items-center sm:gap-6 transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'block bg-blue-50' : 'hidden'
          }`}
        >
          <li className="text-center sm:inline-block">
            <Link
              to="/"
              className="block py-2 px-4 text-gray-800 hover:bg-blue-100 hover:text-blue-700 sm:hover:bg-transparent sm:hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li className="text-center sm:inline-block">
            <Link
              to="/verb-entry"
              className="block py-2 px-4 text-gray-800 hover:bg-blue-100 hover:text-blue-700 sm:hover:bg-transparent sm:hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Verb Entry
            </Link>
          </li>
          <li className="text-center sm:inline-block">
            <Link
              to="/lookup-entry"
              className="block py-2 px-4 text-gray-800 hover:bg-blue-100 hover:text-blue-700 sm:hover:bg-transparent sm:hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Lookup Entry
            </Link>
          </li>
          <li className="text-center sm:inline-block">
            <Link
              to="/root"
              className="block py-2 px-4 text-gray-800 hover:bg-blue-100 hover:text-blue-700 sm:hover:bg-transparent sm:hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Root Entry
            </Link>
          </li>
          <li className="text-center sm:inline-block">
            <Link
              to="/view"
              className="block py-2 px-4 text-gray-800 hover:bg-blue-100 hover:text-blue-700 sm:hover:bg-transparent sm:hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              View
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
