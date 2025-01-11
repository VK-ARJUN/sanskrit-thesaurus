import { FaSearch, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white text-gray-800 border-b-4 border-blue-400 shadow-md" >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo Section */}
        <h1 className="font-extrabold text-lg sm:text-2xl flex items-center">
          <span className="text-blue-600 mr-1">Kriyanighandu</span>
        </h1>

        {/* Search Bar */}
        <form className="hidden sm:flex bg-gray-100 text-gray-700 rounded-full shadow-sm items-center px-3 py-1 w-full max-w-xs sm:max-w-sm lg:max-w-md border border-gray-300">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-full px-2 placeholder-gray-500"
          />
          <button type="submit">
            <FaSearch className="text-blue-500 hover:text-blue-700 transition-colors duration-200" />
          </button>
        </form>

        {/* Hamburger Menu for Mobile */}
        <button
          className="sm:hidden text-2xl text-blue-600"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <FaBars />
        </button>

        {/* Navigation Links */}
        <ul
          className={`absolute sm:static left-0 top-full sm:flex sm:items-center sm:gap-6 sm:bg-transparent w-full sm:w-auto z-50 transform ${
            isMenuOpen ? 'block' : 'hidden'
          }`}
        >
          <li className="text-center sm:inline-block">
            <Link
              to="/"
              className="block py-2 px-4 text-gray-800 hover:bg-blue-100 hover:text-blue-700 sm:hover:bg-transparent sm:hover:text-blue-600 transition-colors"
            >
              Home
            </Link>
          </li>
          <li className="text-center sm:inline-block">
            <Link
              to="/verb-entry"
              className="block py-2 px-4 text-gray-800 hover:bg-blue-100 hover:text-blue-700 sm:hover:bg-transparent sm:hover:text-blue-600 transition-colors"
            >
              Verb Entry
            </Link>
          </li>
          <li className="text-center sm:inline-block">
            <Link
              to="/lookup-entry"
              className="block py-2 px-4 text-gray-800 hover:bg-blue-100 hover:text-blue-700 sm:hover:bg-transparent sm:hover:text-blue-600 transition-colors"
            >
              Lookup Entry
            </Link>
          </li>
        </ul>
      </div>

      {/* Expanded Search for Small Screens */}
      {isMenuOpen && (
        <form className="flex sm:hidden bg-gray-100 text-gray-700 rounded-md shadow-md items-center mx-4 mt-2 px-3 py-2 border border-gray-300">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-full px-2 placeholder-gray-500"
          />
          <button type="submit">
            <FaSearch className="text-blue-500 hover:text-blue-700 transition-colors duration-200" />
          </button>
        </form>
      )}
    </header>
  );
}
