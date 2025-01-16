import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

function ViewVerb() {
  const [data, setData] = useState([]); // State to store fetched data
  const [expandedEntry, setExpandedEntry] = useState(null); // State to manage expanded entry
  const [searchTerm, setSearchTerm] = useState(''); // State for the search term
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/server/entry/view', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const result = await response.json();
        setData(result); // Set the fetched data
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };
    fetchData();
  }, []); 

  const handleViewClick = (entry) => {
    // Toggle the expanded entry to show/hide the details
    setExpandedEntry(expandedEntry === entry ? null : entry);
  };

  // Function to calculate match score for sorting
  const calculateMatchScore = (entry, searchTerm) => {
    const verbMatch = entry.verb.toLowerCase().includes(searchTerm.toLowerCase()) ? 1 : 0;
    const meaningMatch = entry.englishMeaning?.toLowerCase().includes(searchTerm.toLowerCase()) ? 0.5 : 0;
    const lookupMatch = entry.lookup?.join(', ')?.toLowerCase().includes(searchTerm.toLowerCase()) ? 0.5 : 0;

    return verbMatch + meaningMatch + lookupMatch;
  };

  // Filter and sort data based on the search term
  const filteredData = searchTerm
    ? data
        .map((entry) => ({
          ...entry,
          matchScore: calculateMatchScore(entry, searchTerm),
        }))
        .filter((entry) => entry.matchScore > 0) // Only show entries with a match score
        .sort((a, b) => b.matchScore - a.matchScore) // Sort by match score (descending)
    : data; // If no search term, show all data

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-center my-6 text-blue-600">
        Sanskrit Verb Entries
      </h1>

      {/* Search bar with magnifying glass icon */}
      <div className="flex justify-center mb-6">
        <div className="relative w-full sm:w-3/4 lg:w-1/2 xl:w-1/3">
          <input
            type="text"
            placeholder="Search for a verb..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pl-12 pr-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
        </div>
      </div>

      {filteredData.length > 0 ? (
        <div className="flex flex-col space-y-6">
          {filteredData.map((entry, index) => (
            <div
              key={index}
              className="p-5 bg-gradient-to-r from-blue-50 to-blue-100 border border-gray-200 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-semibold text-blue-400">{entry.verb}</h2>
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleViewClick(entry)}
                    className="text-black hover:text-blue-800 transition-colors"
                  >
                    View
                  </button>
                  <button
                    onClick={() => navigate(`/edit/${entry._id}`)}
                    className="text-black hover:text-blue-800 transition-colors"
                  >
                    Edit
                  </button>
                </div>
              </div>

              {/* Show additional info when View is clicked */}
              {expandedEntry === entry && (
                <div className="text-gray-700 space-y-2">
                  <ul>
                    <li>
                      <strong>English Meaning:</strong> {entry.englishMeaning}
                    </li>
                    <li>
                      <strong>Lookup:</strong> {entry.lookup.join(', ')}
                    </li>
                    <li>
                      <strong>Root:</strong> {entry.root}
                    </li>
                    <li>
                      <strong>Ganam:</strong> {entry.ganam}
                    </li>
                    <li>
                      <strong>Trans/Non-trans:</strong> {entry.transVerb}
                    </li>
                    <li>
                      <strong>It-Agma:</strong> {entry.ItAgma}
                    </li>
                    <li>
                      <strong>Derivation:</strong> {entry.derivation || 'N/A'}
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">
          No entries available. Add some to get started!
        </p>
      )}
    </div>
  );
}

export default ViewVerb;
