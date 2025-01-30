import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaBars } from 'react-icons/fa'; // Ensure react-icons is installed

export default function Header({ onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white text-gray-800 border-4 border-blue-400 shadow-xl w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4 relative">
        {/* Logo Section */}
        <h1 className="font-extrabold text-xl sm:text-2xl flex items-center">
          <span className="text-blue-600 mr-2">Kriyanighantu</span>
        </h1>

        {/* Hamburger Menu for Mobile */}
        <button
          className="lg:hidden text-2xl text-blue-600 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
          aria-expanded={isMenuOpen}
        >
          <FaBars />
        </button>

        {/* Navigation Links */}
        <ul
          className={`absolute lg:static left-0 top-full bg-white w-full lg:w-auto md:right-0 lg:flex lg:items-center lg:gap-8 transition-all duration-300 ease-in-out z-50 ${
            isMenuOpen ? 'block bg-blue-100' : 'hidden'
          }`}
        >
          <li className="text-center sm:inline-block">
            <Link
              to="/home"
              className="block py-3 px-6 text-gray-800 hover:bg-blue-100 hover:text-blue-700 sm:hover:bg-transparent sm:hover:text-blue-600 transition-colors rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li className="text-center sm:inline-block">
            <Link
              to="/verb-entry"
              className="block py-3 px-6 text-gray-800 hover:bg-blue-100 hover:text-blue-700 sm:hover:bg-transparent sm:hover:text-blue-600 transition-colors rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Verb Entry
            </Link>
          </li>
          <li className="text-center sm:inline-block">
            <Link
              to="/lookup-entry"
              className="block py-3 px-6 text-gray-800 hover:bg-blue-100 hover:text-blue-700 sm:hover:bg-transparent sm:hover:text-blue-600 transition-colors rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Lookup Entry
            </Link>
          </li>
          <li className="text-center sm:inline-block">
            <Link
              to="/root-entry"
              className="block py-3 px-6 text-gray-800 hover:bg-blue-100 hover:text-blue-700 sm:hover:bg-transparent sm:hover:text-blue-600 transition-colors rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Root Entry
            </Link>
          </li>
          <li className="text-center sm:inline-block">
            <Link
              to="/view"
              className="block py-3 px-6 text-gray-800 hover:bg-blue-100 hover:text-blue-700 sm:hover:bg-transparent sm:hover:text-blue-600 transition-colors rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              View
            </Link>
          </li>
          <li className="text-center sm:inline-block">
            <button
              onClick={onLogout}
              className="block w-full py-3 px-6 text-gray-800 hover:bg-red-100 hover:text-red-700 sm:hover:bg-transparent sm:hover:text-red-600 transition-colors rounded-md text-center"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
