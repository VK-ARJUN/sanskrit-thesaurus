import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';  // Importing the magnifying glass icon from react-icons

function ViewLookup() {
  const [data, setData] = useState([]); // State to store fetched data
  const [searchTerm, setSearchTerm] = useState(''); // State for the search term
  const [expandedEntry, setExpandedEntry] = useState(null); // State to manage expanded entry
  const [confirmDeleteId, setConfirmDeleteId] = useState(null); // State to manage the entry to delete
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/server/entry/view/lookup', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const result = await response.json();
        setData(result.entries.reverse()); // Reverse the data to show most recent first
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

  // Filter data based on the search term
  const filteredData = data.filter((entry) =>
    entry.lookup.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (entryId) => {
    const confirm = window.confirm('Are you sure you want to delete this entry?');
    if (confirm) {
      try {
        const response = await fetch(`/server/entry/delete/lookup/${entryId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to delete entry');
        }
        setData(data.filter(entry => entry._id !== entryId)); // Remove entry from state
      } catch (error) {
        console.error('Delete failed', error);
      }
    }
    setConfirmDeleteId(null); // Reset the confirmation dialog state
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-center my-6 text-blue-500">
        Sanskrit Lookup Entries
      </h1>

      {/* Search bar with magnifying glass icon */}
      <div className="flex justify-center mb-6">
        <div className="relative w-full sm:w-3/4 lg:w-1/2 xl:w-1/3">
          <input
            type="text"
            placeholder="Search for a lookup entry..."
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
              className="p-5 bg-gradient-to-r from-green-50 to-green-100 border border-gray-200 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-semibold text-blue-400">{entry.lookup}</h2>
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleViewClick(entry)}
                    className="text-black hover:text-blue-800 transition-colors"
                  >
                    View
                  </button>
                  <button
                    onClick={() => navigate(`/edit/lookup/${entry._id}`)}
                    className="text-black hover:text-blue-800 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setConfirmDeleteId(entry._id)} // Trigger delete confirmation
                    className="text-black hover:text-red-800 transition-colors"
                  >
                    Delete
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
                      <strong>Reference (Bhattamalla):</strong> {entry.reference || 'N/A'}
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">
          No lookup entries available. Add some to get started!
        </p>
      )}

      {/* Confirmation Dialog */}
      {confirmDeleteId && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl mb-4">Confirm Deletion</h3>
            <p>Are you sure you want to delete this entry?</p>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => handleDelete(confirmDeleteId)}
                className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="bg-gray-600 text-white p-2 rounded-lg hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewLookup;
