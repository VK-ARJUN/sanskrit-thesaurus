import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ViewLookup() {
  const [data, setData] = useState([]); // State to store fetched data
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
        setData(result); // Fixed data structure access
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-center my-6 text-green-600">
        Sanskrit Lookup - View Entries
      </h1>

      {data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((entry, index) => (
            <div
              key={index}
              className="p-5 bg-gradient-to-r from-green-50 to-green-100 border border-gray-200 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-xl font-semibold text-green-700 mb-3">
                {entry.lookupWord}
              </h2>
              <ul className="text-gray-700 space-y-2">
                <li>
                  <strong>Meaning:</strong> {entry.meaning}
                </li>
                <li>
                  <strong>Synonyms:</strong> {entry.synonyms.join(', ')}
                </li>
                <li>
                  <strong>Category:</strong> {entry.category}
                </li>
                <li>
                  <strong>Usage:</strong> {entry.usage || 'N/A'}
                </li>
              </ul>
              <button
                onClick={() => navigate(`/edit/${entry._id}`)}
                className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
              >
                Edit Entry
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">
          No lookup entries available. Add some to get started!
        </p>
      )}
    </div>
  );
}

export default ViewLookup;
