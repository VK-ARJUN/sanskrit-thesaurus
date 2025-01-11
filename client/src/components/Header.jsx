import { FaSearch, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-gray-100 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo Section */}
        <h1 className="font-extrabold text-lg sm:text-2xl flex items-center">
          <span className="text-gray-300 mr-1">Sanskrit</span>
          <span className="text-gray-100">Thesaurus</span>
        </h1>

        {/* Search Bar */}
        <form className="hidden sm:flex bg-gray-100 text-gray-800 rounded-full shadow-md items-center px-3 py-1 w-full max-w-xs sm:max-w-sm lg:max-w-md">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-full px-2"
          />
          <button type="submit">
            <FaSearch className="text-gray-600 hover:text-gray-900 transition-colors duration-200" />
          </button>
        </form>

        {/* Hamburger Menu for Mobile */}
        <button
          className="sm:hidden text-2xl text-gray-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <FaBars />
        </button>

        {/* Navigation Links */}
        <ul
          className={`absolute sm:static left-0 top-full sm:flex sm:items-center sm:gap-6 bg-gradient-to-b from-gray-800 to-gray-900 sm:bg-transparent w-full sm:w-auto z-50 transform ${
            isMenuOpen ? 'block' : 'hidden'
          }`}
        >
          <li className="text-center sm:inline-block">
            <Link
              to="/"
              className="block py-2 px-4 text-gray-100 hover:bg-gray-200 hover:text-gray-800 sm:hover:bg-transparent sm:hover:text-gray-300 transition-colors"
            >
              Home
            </Link>
          </li>
          <li className="text-center sm:inline-block">
            <Link
              to="/verb-entry"
              className="block py-2 px-4 text-gray-100 hover:bg-gray-200 hover:text-gray-800 sm:hover:bg-transparent sm:hover:text-gray-300 transition-colors"
            >
              Verb Entry
            </Link>
          </li>
          <li className="text-center sm:inline-block">
            <Link
              to="/lookup-entry"
              className="block py-2 px-4 text-gray-100 hover:bg-gray-200 hover:text-gray-800 sm:hover:bg-transparent sm:hover:text-gray-300 transition-colors"
            >
              Lookup Entry
            </Link>
          </li>
        </ul>
      </div>

      {/* Expanded Search for Small Screens */}
      {isMenuOpen && (
        <form className="flex sm:hidden bg-gray-100 text-gray-800 rounded-md shadow-md items-center mx-4 mt-2 px-3 py-2">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-full px-2"
          />
          <button type="submit">
            <FaSearch className="text-gray-600 hover:text-gray-900 transition-colors duration-200" />
          </button>
        </form>
      )}
    </header>
  );
}
