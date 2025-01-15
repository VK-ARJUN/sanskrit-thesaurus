import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="relative h-screen flex flex-col justify-center items-center text-center text-white bg-cover bg-center">
        <img src='/images/cover-photo.jpg' alt="Cover" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
            Welcome to the <span className="text-blue-500">Kriyanighantu</span>
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Thesaurus of Synonymous Sanskrit Verbs
          </p>
          <a
            href="#options"
            className="mt-8 inline-block bg-white hover:bg-blue-300 text-black font-semibold py-3 px-8 rounded-lg shadow-lg transition-all transform hover:-translate-y-1"
          >
             Data Entry Portal
          </a>
        </div>
      </header>

      {/* Option Cards Section */}
      <section
        id="options"
        className="py-20 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-gray-100 to-gray-200"
      >
        <h2 className="text-4xl font-extrabold text-blue-700 text-center mb-12">
          What would you like to do?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Verb Entry Card */}
<div className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 p-8 transform hover:-translate-y-2">
  <h3 className="text-2xl font-bold text-gray-800 mb-4">Enter Sanskrit Verbs</h3>
  <p className="text-gray-600 mb-6">
    Seamlessly add new Sanskrit verbs into the thesaurus. This feature allows you to input
    verbs along with their meanings, references, and other details for a comprehensive
    understanding.
  </p>
  <Link
    to="/verb-entry"
    className="inline-block bg-blue-600 hover:bg-blue-900 text-white font-semibold py-2 px-6 rounded-md transition-all transform hover:-translate-y-1 text-center"
  >
    Go to Verb Entry <span className="text-xl ml-2">→</span>
  </Link>
</div>

{/* Lookup Entry Card */}
<div className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 p-8 transform hover:-translate-y-2">
  <h3 className="text-2xl font-bold text-gray-800 mb-4">Lookup Sanskrit Verbs</h3>
  <p className="text-gray-600 mb-6">
    Search for specific Sanskrit verbs and their meanings effortlessly. This feature helps
    you find detailed references and usage of verbs in various contexts.
  </p>
  <Link
    to="/lookup-entry"
    className="inline-block bg-blue-600 hover:bg-blue-900 text-white font-semibold py-2 px-6 rounded-md transition-all transform hover:-translate-y-1 text-center"
  >
    Go to Lookup Entry <span className="text-xl ml-2">→</span>
  </Link>
</div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-6 text-center">
        <p>
          Crafted with care for Sanskrit enthusiasts. © {new Date().getFullYear()} Sanskrit
          Thesaurus.
        </p>
      </footer>
    </div>
  );
}
